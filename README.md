# Photon Reddit Agent

A TypeScript app using [Photon Spectrum](https://photon.codes/docs/spectrum-ts)
to receive iMessages and reply with `echo: <your text>`.

Read [How this app works](docs/architecture.md) for diagrams of the current setup,
message and grading walkthroughs, beginner concepts, and the proposed future loop.

## Environment

The original local setup has credentials in the ignored `.env`.
For a fresh clone, copy `.env.example` to `.env` and set the two Spectrum
credentials from your Photon project settings.
Never commit or share that file. If authentication fails, verify `SPECTRUM_PROJECT_ID`
and `SPECTRUM_PROJECT_SECRET` in your project settings.

## Run

```sh
bun install --frozen-lockfile
bun start
```

1. Add your phone from the top-right avatar menu in the [Photon dashboard](https://app.photon.codes/dashboard/3693d23f-a283-4dcc-a8e9-3009bfa0bdeb/getting-started).
2. Refresh getting started to enroll your phone and show your assigned line.
3. Run `bun start` from this directory and leave it running.
4. Text `hello` to that line from your registered phone. Expect `echo: hello`.

Free/Pro uses Photon's shared number pool; recipients must be registered with
the project. No dedicated line is provisioned by this app.
The app runs on this Mac today: keep the process running and the Mac awake.
Deployment is only needed when you want it running independently of this Mac.

## Verify

```sh
bun run check
bun test
```

The automated tests check the echo loop, classifier validation, rubric requests,
deduplication, report ordering, and failed sends without contacting providers.
Actual iMessage delivery requires the phone test above.

## Classify a batch with Jev

Set `JEV_API_KEY` and `OWNER_PHONE` (your personal number, including `+` and
country code) in the local `.env`. `JEV_MODEL` defaults to `jev-latest`.

```sh
# Synthetic examples, live Jev classification, no message sent:
bun run leads:demo

# Classify your own JSON batch and send the top five matches:
bun run leads -- posts.json --notify

# Send an explicitly labeled synthetic demo to your phone:
bun run leads:demo --notify
```

Input is an array of `{ "title": "...", "body": "...", "url": "...", "subreddit": "..." }`.
Only title and body are required; URLs must be Reddit post permalinks.
The example file contains invented posts, not scraped Reddit content.

Upcoming SWE interviews, intern/new-grad recruiting cycles, interview-focused
LeetCode, and requests for mock platforms, partners, or feedback score highly.
An explicit relevant deadline within 14 days is urgent. Jev scores from 0–4;
scores of 2.5+ qualify, 3.5+ are urgent, and score confidence below 0.5 requires
review. Confidence is model certainty, not conversion likelihood. Report reasons
come from the rubric labels, not generated explanations.

Regular batches save posts, grades, and message-submission status in the ignored
`data/leads.sqlite`. Identical posts reuse their grade; submitted posts are not
sent again. Failed sends leave candidates pending. The demo uses memory only,
so it can be repeated. Submission does not prove phone delivery; a crash between
sending and saving can cause a repeat. Fetching, timers, feedback, and conversational
intelligence are still pending.

## Checkpoint — 2026-10-09

- Live inbound iMessage and `echo:` replies verified on the owner's phone.
- Proactive SDK sending verified: the owner received a Reddit post link from
  the assigned Photon bot line. The batch command above now sends lead reports.
- Only the correct personal recipient remains enrolled in Photon; the mistaken
  extra recipient was removed. `.env` stays local and excluded from Git.
- `bun run check` and all five tests pass. Live Jev graded the synthetic
  upcoming-interview example 3.99/4 urgent, mock-platform request 3.00/4 high,
  and new-grad cycle 3.02/4 high; graduation photos were skipped. Photon metadata
  confirmed the labeled three-candidate demo was sent and delivered with no
  send error. An initial send returned HTTP 502; the second attempt succeeded.
- Codex with the existing ChatGPT login is the selected future brain; it is
  not connected yet. Jev batch grading is implemented; Reddit scanning, scheduling,
  and migration of this Photon app are deferred.

## Maritime runtime checkpoint — 2026-10-09

The `photon-reddit-agent` agent was created on the owner's free Maritime account
using the built-in `codex` template. Open it at <https://maritime.sh/agents>.

- At provisioning, verified `status: active`, `sleepPolicy: auto-sleep`, and `desktopEnabled: false`.
- Remote execution returned `codex-cli 0.154.0`; the template's `/health` returned HTTP 200.
- This repository is linked through the ignored `.maritime/project.json`.
- Only the Codex runtime is hosted so far. This repo's Photon receiver and lead
  batch commands still run locally. No Photon or Jev credentials were uploaded,
  and no model call was made during verification.

Free hosting supports three saved agents, one awake at a time, with 2 GB RAM and
5 GB disk per agent. The workspace and sign-in persist under `/data`; tasks can
wake the VM and launch `codex exec`, then it sleeps when idle. Always-on and
desktop resources require a paid plan. See [runtime limits](https://maritime.sh/docs/limits)
and [Codex template](https://maritime.sh/docs/frameworks/codex).

Next, open the agent's Terminal and run `codex login --device-auth` to sign in
with the owner's ChatGPT account. Without that login or an explicitly configured
OpenAI key, the template defaults to Maritime's separately billed AI-credit proxy.
After login, verify one Codex task before connecting Photon webhooks or scheduling jobs.

The later documentation check observed the agent sleeping with zero chat-task
invocations. No Reddit scan, Photon connection, or recurring job is running there.

## Unfinished Cloudflare scaffold

`wrangler.jsonc`, `.dev.vars.example`, and `migrations/0001_cloud.sql` preserve an
earlier hosting experiment. They are not deployed or runnable as a Worker:
`src/worker.ts` is missing and the D1 ID is a placeholder. The declared cron is
inactive until deployment. See the [architecture guide](docs/architecture.md#where-cloudflare-stands)
before using these files; the local Bun app does not use that migration.

## Roadmap / todo docket

These steps are not complete. Manual Jev grading and SQLite processing/submission
records are the first slice; Reddit access, feedback, scheduling, and hosting remain open.

1. [ ] **Figure out Reddit access and credentials.** Confirm the permitted
   access route for AlgoVox lead discovery, obtain any required approval and
   OAuth credentials, and verify one post can be read before building a monitor.
2. [ ] **Persist leads and feedback as a mini CRM.** Choose the simplest storage
   that survives restarts. Keep post/user references, processing status, scoring
   results, and whether an alert was sent, so the agent can revisit and update
   records without sending duplicates. Record owner feedback such as
   “false positive,” “not relevant,” and the reason; keep dismissed, useful,
   and contacted leads distinguishable.
3. [ ] **Define the intelligence and scoring layer.** Decide what AlgoVox fit
   means and which signals matter: an upcoming coding interview, a request for
   practice or feedback, and a concrete need the product can address. Choose
   the input context, score/decision shape, explanation, and alert threshold.
   Evaluate Jev versus the Codex brain on real examples, including false
   positives; use saved feedback to refine the criteria and check whether
   quality improves. Do not assume every interview-related post is a lead.
4. [ ] **Choose subreddits and build the monitoring loop.** Start with a small
   watchlist and define relevant posts, comments, and lookback windows. Add
   fetching every 30–60 minutes, deduplication, classification, and iMessage reports containing
   the post link and why it matched. Persist processing and delivery outcomes.
5. [ ] **Later: draft outreach and run continuously.** Generate a suggested
   reachout message for useful leads and send the draft to the owner for review.
   Track the owner's outreach status. Connect hosted execution and external
   scheduling so monitoring can continue when the laptop is off, including
   a runtime that wakes for each task and sleeps between runs.
