# Architecture

## The big picture

```
                 ┌──────────────── Cloudflare ────────────────┐
 Reddit RSS ───▶ │ Worker (cron or crm run_scan)               │
                 │   fetch → grade with Jev → save to D1       │
                 │   CRM API: /api/<operation> (bearer token)  │
                 └──────┬───────────────────────▲──────────────┘
          scan failed?  │ wake URL              │ CRM CLI (list_scan_runs, get_lead, record_feedback…)
                        ▼                       │
                 ┌──────────────── Maritime VM ────────────────┐
 Photon webhook ▶│ Codex (follows AGENTS.md)                   │
 (your replies)  │   writes digests, reads replies, updates    │
                 │   leads, texts you via src/send-message.ts  │
                 └──────┬──────────────────────────────────────┘
                        ▼
                     Photon ───▶ iMessage on your phone
```

| Piece | Runs on | Job |
|---|---|---|
| **Scanner + CRM** | Cloudflare Worker + D1 | Read Reddit, grade posts, store leads, runs and feedback |
| **Agent** | Codex on a Maritime VM (sleeps when idle) | Write digests, interpret replies, update leads, send texts |
| **Messaging** | Photon | Deliver iMessages and forward replies as webhooks |

The Worker never talks to iMessage, and the agent never talks to Reddit. They only meet at the CRM API.

## What's live

| Flow | Status |
|---|---|
| Scheduled scans | Paused (`SCHEDULED_SCANS=false`). Cloudflare still has a stale `*/30 * * * *` trigger despite `crons: []`; it fires, and the Worker ignores it. Remove it in the dashboard: Worker → Settings → Triggers |
| Manual scan + digest | Live. Ask the agent and it scans, then sends one header text plus one text per lead |
| Failure alerts | Live. A failed scheduled scan texts you once per failure streak |
| Replies and tapbacks | Built, not connected. Needs the Photon webhook pointed at the Maritime wake URL |
| Automatic digest after each scan | Built, not deployed. A scheduled scan with new leads wakes the agent (not during quiet hours, 11 PM–8 AM) |

## The four flows

### 1. Scan (Worker)

1. The cron or `crm run_scan` calls `runScan` (`src/scan.ts`).
2. Guards: a 3-minute D1 lease (`run_lock`) prevents overlapping runs. A saved Reddit cooldown (`scan_state.not_before`) skips the run without making a request.
3. `src/reddit.ts` fetches `r/a+b+c+d/new/.rss?limit=100`, one request covering about a day of posts.
4. Posts already graded under the current rubric are reused. Up to 20 new ones go to Jev (`src/jev.ts`) together with the owner's rules (`rules` table), and each is saved as soon as it's graded.
5. The run is saved in `runs` with counts (`fetched`, `classified`, `grades`) and a report of the top high/urgent leads.

### 2. Digest (agent)

1. Either you ask the agent, or a scheduled scan's report has leads never texted before. In that case the Worker posts `{"event":"scan_completed"}` to the wake URL, except during quiet hours.
2. Codex reads the run's report and calls `get_lead` on each lead to write a one-line "why".
3. It sends a header text, then one text per lead, and saves the message IDs to `last-list.json`.
4. It runs `record_submission`, which marks those leads as texted. Later reports leave them out, so no lead is texted twice.

### 3. Reply (agent, once the webhook is connected)

1. You swipe-reply or tap 👍/👎 on a lead's text. Photon posts a webhook to Maritime, which wakes the VM.
2. Photon webhooks leave out which message you replied to, so `src/inbound.ts` re-fetches your message through the Spectrum SDK, which does include it. It then maps the target message ID to a lead using `last-list.json`.
3. Codex maps your words to a status ("reached out" → contacted, "too senior" → dismissed), runs `record_feedback`, and confirms with one short text.

### 4. Failure alert (Worker → agent)

1. A scheduled scan fails after its retries are used up.
2. If the previous run didn't fail, the Worker posts `{"event":"scan_failed"}` to the wake URL.
3. Codex confirms the failure in `list_scan_runs`, then texts you something like "Scan failed at 7:00 AM: …".

## Failure handling

| Failure | What happens |
|---|---|
| Reddit 403, 5xx, network error, timeout | Retried after 1s and 4s (`src/retry.ts`) |
| Jev 429, 5xx, network error | Retried once after 2s |
| Reddit 429 | No retry. The reset time is saved, and later runs skip until it passes |
| More than 20 new posts | The extra posts aren't saved, so the next run grades them |
| Still failing | Run marked `failed`, graded posts kept, owner alerted (scheduled runs only) |

The worst case is 43 outgoing requests per run, under the Workers Free limit of 50.

## Where state lives

| Where | What |
|---|---|
| D1 `leads`, `lead_revisions` | Every post (ID = Reddit URL path), its grade, status and earlier versions |
| D1 `feedback_history` | Every verdict and reason, append-only |
| D1 `runs`, `scan_state`, `run_lock` | Scan history, cooldown and the overlap lease |
| D1 `reports`, `report_items` | Saved digest reports |
| D1 `rules` | The owner's grading and style rules, passed to Jev on every scan |
| VM `/data/workspace/last-list.json` | The last digest: lead IDs in order, plus each one's message ID |
| VM `/data/workspace/seen-messages.json` | Webhook message IDs already handled (Photon retries up to 6 times) |
| VM `/data/.codex/` | Codex sign-in, model config (Luna 6, medium effort) and session history |
| Worker secrets | `CRM_API_TOKEN`, `JEV_API_KEY`, `MARITIME_WEBHOOK_URL` |
| Worker vars (`wrangler.jsonc`) | Subreddits, cron schedule, `SCAN_ENABLED` |
| Maritime env | `CRM_URL`, `CRM_API_TOKEN`, `SPECTRUM_PROJECT_ID`/`SECRET`, `OWNER_PHONE`, `NOTIFY_ENABLED`, `CODEX_BIN` |

Everything under `/data` survives VM sleep and redeploys. Nothing else on the VM is guaranteed to.

## Checking what's going on

```sh
bun run crm list_scan_runs                         # recent runs: status, counts, errors
bun run crm list_leads alerts                      # high/urgent leads not yet handled
bunx wrangler tail                                 # live Worker logs
maritime status photon-reddit-agent                # is the VM awake?
maritime logs photon-reddit-agent                  # wake/sleep and server logs
maritime chat photon-reddit-agent "what did you send last?"
maritime exec photon-reddit-agent -- cat /data/workspace/last-list.json
```

`crm` commands need `CRM_URL` and `CRM_API_TOKEN` in the environment. `maritime chat` replies within 30 seconds or says it's still working; ask again in the same conversation (`-c <id>`).

## Security

- The CRM API requires a bearer token (16+ characters). Inputs are validated and SQL is parameterized.
- Reddit text is untrusted. Jev and Codex are both told never to follow instructions found in posts.
- The Maritime wake URL has no auth, so the agent never trusts a webhook body directly. Replies are re-fetched from Photon, and failure alerts are checked against `list_scan_runs`.
- Only messages from `OWNER_PHONE` are acted on.

## Known limits

- Sending a text and recording it aren't atomic, so a crash between the two could repeat a text.
- Reddit sometimes blocks Cloudflare IPs (403). Retries and the next run cover it. On 2026-10-12, every cron run from 06:00 to 07:30 UTC got a 403 or 429 while manual runs in between succeeded. Likely cause: cron runs execute in a different Cloudflare location with worse-reputation IPs. Check before relying on the cron.
- If Jev is slow on every call, a run can outlast its 3-minute lease.
- Migrations in `migrations/` are additive. Never edit one that has already been applied.
