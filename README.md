# Photon Reddit lead agent

Run the local CRM first. No Cloudflare account, model account, or iMessage connection is needed.

```sh
bun --no-env-file install --frozen-lockfile
export CRM_API_TOKEN='local-example-token-change-me'
bun --no-env-file run crm:dev
```

This starts the Worker at `http://127.0.0.1:8787`, applies checked-in migrations,
and persists **local D1** under `data/d1`. It never reads `.env` or `.dev.vars`.
Notifications are disabled. Stop it with Ctrl-C; restarting preserves records.
Use this runner for local database access, rather than a separate Wrangler dev store.

## Two-minute smoke test

In a second terminal in this repo:

```sh
export CRM_API_TOKEN='local-example-token-change-me'
export CRM_URL='http://127.0.0.1:8787'
bun --no-env-file run crm upsert_leads examples/graded-leads.json
bun --no-env-file run crm process_feedback examples/feedback-event.json
bun --no-env-file run crm get_lead /r/demo/comments/crm_demo/practice
```

Expect one synthetic lead, status `useful`, its unchanged fixture grade, and one
feedback history entry. Run `process_feedback` again: `duplicate: true` and still
one history entry. Restart `crm:dev` and repeat `get_lead`: the record remains.
These fixtures make **zero model calls and send zero messages**. The source URL is invented.

## Scheduled and manual scan groundwork

Both triggers call the same Worker scan function. No Cloudflare account is needed
for this offline demo. Stop any existing local CRM process before starting it:

```sh
export CRM_API_TOKEN='local-example-token-change-me'
bun --no-env-file run crm:dev --scan-demo
```

In a second terminal:

```sh
export CRM_API_TOKEN='local-example-token-change-me'
export CRM_URL='http://127.0.0.1:8787'
bun --no-env-file run crm run_scan
bun --no-env-file run crm list_scan_runs
# Simulate Cloudflare's scheduled event locally; this is not a running timer:
curl 'http://127.0.0.1:8787/cdn-cgi/local/scheduled?cron=*/30%20*%20*%20*%20*'
```

Expect `source: fixture`, one saved synthetic lead, and a DEMO report preview.
Repeat `run_scan`: the grade and pending report are reused. `list_scan_runs`
shows separate manual/scheduled runs and their outcomes. This demo uses the
separate persistent store `data/scan-demo-d1`, rather than mixing synthetic
scanner records into the regular `data/d1` CRM. Both source selection and
credentials are server configuration, never supplied in scan tool arguments.
No Reddit request, model call, Photon send, or hosted schedule runs in demo mode.

The normal `crm:dev` command keeps scans disabled. `POST /api/run_scan` accepts
only `{}` and requires the same CRM bearer authentication. `list_scan_runs`
returns the latest ten executions (API `limit` can be 1–100). Runs record source,
subreddit, trigger, counts, report preview, timestamps, and success/failure.
An expiring D1 lease prevents manual and scheduled jobs from overlapping;
Reddit rate-limit cooldowns survive restarts. A failed run keeps already saved
grades, releases its lease, and can be retried. A hard runtime termination can
leave a `running` history entry; its lease expires after 180 seconds.

`wrangler.jsonc` declares `*/30 * * * *`, but **nothing is deployed or scheduled**.
The `scheduled()` handler is a no-op while `SCAN_ENABLED=false`. It reads the
same configuration and runs the same code as the manual API when enabled.
Scheduled invocations skip active leases/cooldowns; manual calls return 409/429.

The live adapter groundwork uses read-only Reddit app-only OAuth
(`client_credentials` for a confidential script/web client). It requests
`/r/<subreddit>/new?limit=5`, validates source posts, and reuses the existing Jev
rubric/thresholds. One subreddit is checked per run; up to five configured
subreddits rotate after successful runs. With three subreddits and a 30-minute
trigger, each is checked every 90 minutes. This is a bounded polling scaffold,
not an exhaustive crawler: posts beyond the latest five may be missed.
`moreAvailable` reports whether Reddit has older listing pages; pagination and
catch-up cursors remain later work. Saved reports include only eligible posts
from that poll; dismissed/contacted/submitted leads are suppressed.

Future live Worker configuration (not exercised in this slice):

| Binding | Purpose |
|---|---|
| `SCAN_ENABLED=true`, `SCAN_SOURCE=reddit` | Explicitly enable external scanning |
| `SCAN_SUBREDDITS=community_one,community_two` | 1–5 subreddit names, no URLs |
| `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET` | App-only OAuth credentials, stored as Worker secrets |
| `REDDIT_USER_AGENT` | Descriptive client/version/owner string |
| `JEV_API_KEY`, optional `JEV_MODEL` | Existing grading service credentials/model |

OAuth tokens are obtained afresh per live scan. The adapter stops on HTTP 429,
persists Retry-After cooldowns, respects exhausted quota headers, bounds upstream
response sizes, and refuses redirects. It has been tested with fake HTTP
responses only. Live OAuth eligibility, provider quotas, and Cloudflare CPU
usage are pending verification. The scanner saves previews and never sends
notifications; a hosted report sender/reconciliation path is still separate work.

## Agent tools

Codex uses these through its existing shell tools. Set `CRM_URL` and
`CRM_API_TOKEN` in the process environment; tokens are not CLI arguments.
No MCP server or extra agent framework is required.

```sh
bun --no-env-file run crm list_leads
bun --no-env-file run crm list_leads dismissed
bun --no-env-file run crm list_leads all 25 25   # offset, limit; follow nextOffset
bun --no-env-file run crm list_leads alerts 0 100
bun --no-env-file run crm get_lead '<lead ID>'
bun --no-env-file run crm set_lead_status '<lead ID>' contacted
bun --no-env-file run crm record_feedback '<lead ID>' dismissed 'Their interview already happened.'
bun --no-env-file run crm upsert_leads examples/graded-leads.json
bun --no-env-file run crm process_feedback examples/feedback-event.json
```

`set_lead_status` changes current workflow state. `record_feedback` also appends
a dated verdict/reason and sets that state. `get_lead` returns the current post,
grade, feedback history, grade revisions, and report/message references. History
is retained in full; the API returns the latest 100 feedback/revision entries.
Lead listing has explicit pagination (default 25, maximum 100).

The authenticated application API uses `POST /api/<operation>` with JSON objects:

| Operation | Input |
|---|---|
| `upsert_leads` | `{ "leads": [{ "id": "...", "post": { "title": "...", "body": "..." }, "result": { ... } }] }`; 1–20, ID optional and derived/validated |
| `list_leads` | `{ "status": "useful", "limit": 25, "offset": 0, "alertsOnly": false }`; all fields optional |
| `get_lead` | `{ "id": "..." }` |
| `set_lead_status` | `{ "id": "...", "status": "new|useful|dismissed|contacted" }` (choose one status) |
| `record_feedback` | `{ "id": "...", "verdict": "dismissed", "reason": "..." }` |

Requests require `Authorization: Bearer <CRM_API_TOKEN>` and `application/json`.
The token must have at least 16 characters. Bodies are capped at 1 MB, posts at
20,000 title/body characters, and feedback reasons at 2,000 characters. SQL uses
bound parameters. Invalid inputs return 400, missing credentials 401, unknown
lead IDs 404, and conflicting report operations 409. `result: null` explicitly
stores an ungraded post; grades must preserve the existing numeric thresholds.
Cloudflare management credentials are never accepted by these tools.

Internal application operations support `create_report`, `record_submission`,
`process_feedback`, `import_legacy` (1–10 records), and `get_config`.
`record_submission` is disabled in the local runner. Integration tests use fake
submission records in their own temporary D1 database, without Spectrum access.

## Database ownership and the old SQLite file

D1 now owns regular batches and CRM changes. No runtime writes `data/leads.sqlite`.
If an older checkout has that file, explicitly import it with the CRM running:

```sh
bun --no-env-file run crm:import data/leads.sqlite
```

The importer opens SQLite **read-only**, preserves grades/submission timestamps
and message IDs, and is safe to repeat: existing D1 lead rows are never overwritten.
Retain the SQLite source as a backup. This checkout had no legacy SQLite file at
implementation time; preservation was verified with a populated fixture.
Migrations are additive and tracked in `d1_migrations`. Do not edit an applied migration.

Old SQLite reports did not store item ordering or conversation IDs. Imported
links retain `item_index: null` / unknown conversation; numbered legacy replies
ask for clarification. Use an explicit lead ID for those records.

## Manual Jev batches

With the local CRM running and a Jev key explicitly exported into your shell:

```sh
# This command makes live Jev calls; it is not part of the offline smoke test.
bun --no-env-file run leads posts.json
```

Input is an array of `{ "title": "...", "body": "...", "url": "...", "subreddit": "..." }`.
Only title/body are required. URLs must be HTTPS Reddit post permalinks.
The app does not fetch the URL. Unchanged posts with the same rubric reuse their
grade; changed posts retain earlier grades as revisions. Existing Jev criteria
and thresholds remain: 2.5+ qualifies, 3.5+ is urgent, confidence below 0.5 goes
to review. The parser derives priority from those scores, rather than recalculating deadlines.

Manual batches select unsubmitted `new`/`useful` high/urgent leads by score and
save a preview containing up to five items. Dismissed/contacted leads are
excluded. Previewing does not mark leads submitted. `--demo` labels synthetic
reports; demo records now persist in the selected D1 store. For repeatable demos,
use the isolated integration suite. The legacy `leads:demo` command still makes
live Jev calls against synthetic input; the smoke fixture avoids those calls.

## Feedback and live messaging

The local feedback command accepts an event with `platform`, `spaceId`,
`messageId`, `text`, and optional `targetMessageId`. Explicit commands are:

```text
Useful <lead ID>: relevant practice request
Dismiss <lead ID>: their interview already happened
Contacted <lead ID>: reached out manually
```

For a threaded reply to a recorded report message:

```text
Dismiss 2: their interview already happened.
```

Spectrum 12.10.1 represents threaded text as `content.type === "reply"`, with
nested `content.content` and `content.target.id`. Resolution checks the stored
platform, conversation, target message, and item number. A bare verdict works
only on a one-item report. Missing, unknown, or ambiguous targets ask which lead;
no latest-report guess is made. Event IDs are deduplicated transactionally in D1,
including concurrent replays and restarts. Outgoing events are ignored.
Feedback is saved for later rubric/model context; it does not retrain Jev.

The Photon entry point remains `bun start`, but it now requires explicit
`NOTIFY_ENABLED=true`, owner authorization through `OWNER_PHONE`, application
CRM credentials, and an authenticated CRM whose notification setting is enabled.
The local runner always disables that setting, so it cannot open a live Photon
connection. For a future separately configured live sender, export
`SPECTRUM_PROJECT_ID`, `SPECTRUM_PROJECT_SECRET`, and `OWNER_PHONE`; if Photon
authentication fails, verify them at [Photon](https://app.photon.codes).
Only the owner's messages can change leads. Unrecognized owner text keeps the
old echo behavior; replayed events receive no second acknowledgement.

`--notify` on a batch has the same explicit opt-in and CRM preflight. A successful
send records a report/message relationship and submission time; submission is
not proof of delivery. Sending and saving are not atomic: a crash after Photon
accepts the message can cause a repeat on retry. Delivery reconciliation remains
pending before automatic notifications. A crash after saving inbound feedback
but before acknowledgement can leave feedback saved without a visible response.

## Verification

```sh
bun --no-env-file run check
bun --no-env-file test
bun --no-env-file run test:d1
```

`test:d1` builds the actual Worker, uses Miniflare/workerd's local D1 with isolated
credentials, runs **15 tests / 145 assertions**, and performs additional restart, legacy-migration, and manual/scheduled scan assertions. It covers authentication, invalid/bounded
requests, preserving grades, append-only feedback, report-item resolution,
concurrent/replayed inbound events, outgoing-event filtering, read-only SQLite
import, failed sends, and retaining candidates beyond five. Plain `bun test`
runs unit tests and explicitly skips cases requiring that D1 runtime.
No test calls live Reddit, sends a real iMessage, or invokes a paid model.

## Roadmap

1. [x] **Local CRM and scan groundwork:** shared scheduled/manual scan function, offline demo, bounded OAuth adapter, run history/leases/cooldowns; D1 schema/migrations, authenticated Worker API, shell tools, explicit legacy import, manual-batch integration, and tested feedback loop.
2. [ ] **Local conversation bridge:** review [the design proposal](docs/agent-design.md), then implement tool instructions, stable Codex routing, durable turn/delivery recovery, and event-safe feedback with fake runtime/messaging clients. Ordinary owner messages currently echo; Maritime remains separate.
3. [ ] **Connect external services later:** owner Cloudflare account, CLI authorization, real database/configuration, remote migrations/secrets, verified data transfer/read/write; Reddit OAuth/watchlist and one authenticated post read. See [the checklist](docs/connect-cloudflare.md); remote setup and live OAuth verification have not run.
4. [ ] **Complete monitoring and alerts:** add pagination/catch-up, verify real grading/CPU usage, review saved feedback, and implement notification reconciliation. Activate the prepared schedule/report sender after remote setup and delivery checks pass.
5. [ ] **Connect hosted chat and outreach:** verify Photon ingress/VM wake-up, model access, session continuation, and completion delivery; wire the app to Maritime. Add owner-reviewed drafts later. No runtime integration or automatic outreach is active.

See [the architecture guide](docs/architecture.md) for the running components and ownership boundaries.
