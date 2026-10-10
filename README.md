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
credentials, runs **11 tests / 106 assertions**, and performs additional restart
and legacy-migration assertions. It covers authentication, invalid/bounded
requests, preserving grades, append-only feedback, report-item resolution,
concurrent/replayed inbound events, outgoing-event filtering, read-only SQLite
import, failed sends, and retaining candidates beyond five. Plain `bun test`
runs unit tests and explicitly skips cases requiring that D1 runtime.
No test sends a real iMessage or invokes a paid model.

## Roadmap

1. [x] **Local mini CRM:** D1 schema/migrations, authenticated Worker API, shell tools, explicit legacy import, manual-batch integration, and tested feedback loop.
2. [ ] **Connect Cloudflare later:** owner account, CLI authorization, real database/configuration, remote migrations/secrets, and verified remote read/write. See [the checklist](docs/connect-cloudflare.md); none has run.
3. [ ] **Reddit access:** confirm the permitted access route and verify one authorized post read before implementing fetching or choosing a watchlist.
4. [ ] **Scanning and grading quality:** add fetching/scheduling after access works; use saved feedback to review rubric quality without assuming automatic training.
5. [ ] **Outreach and continuous operation:** owner-reviewed drafts, notification reconciliation, and deployment/runtime integration. Maritime's Codex runtime remains separate from this app.

See [the architecture guide](docs/architecture.md) for the running components and ownership boundaries.
