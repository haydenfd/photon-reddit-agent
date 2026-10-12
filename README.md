# photon-reddit-agent

An agent that watches Reddit for people preparing for coding interviews and texts you the best leads over iMessage. Reply to a lead's text ("reached out", "too senior") and it updates that lead.

```
Reddit RSS ──▶ Cloudflare Worker ──▶ Jev (grades each post) ──▶ D1 database
                                                                    │
your iPhone ◀── Photon (iMessage) ◀── Codex on a Maritime VM ◀──────┘
     │                                        ▲
     └──── replies / tapbacks ── webhook ─────┘
```

## How it works

1. **Scan.** A Cloudflare cron reads the newest 100 posts from a few subreddits through Reddit's public RSS feed (no API key), then grades up to 20 new posts per run with [Jev](https://typesafe.ai). Transient failures are retried, and a 429 sets a cooldown.
2. **Digest.** Codex, running on a sleeping [Maritime](https://maritime.sh) VM, sends one header text and then one text per high-intent lead through [Photon](https://photon.codes).
3. **Feedback.** Swipe-reply or tap 👍/👎 on a lead. Photon's webhook wakes Codex, `src/inbound.ts` re-fetches the message to find which lead you replied to, and Codex records the status (`useful`, `dismissed` or `contacted`) along with your words.
4. **Alerts.** If a scheduled scan fails, the Worker wakes Codex, which texts you once per failure streak.

Codex follows [`AGENTS.md`](AGENTS.md), which covers the digest format, reply handling and alert rules.

More detail: [architecture](docs/architecture.md) (flows, state, how to check on it) · [agent design](docs/agent-design.md) · [deploying the Worker](docs/connect-cloudflare.md).

## Setup

You need Bun, plus accounts on Cloudflare, Jev, Photon and Maritime (all have free tiers).

```sh
bun install
```

**Cloudflare (scanner and database)**

```sh
bunx wrangler d1 create reddit-tracker          # put the id in wrangler.jsonc
bunx wrangler d1 migrations apply reddit-tracker --remote
bunx wrangler secret put CRM_API_TOKEN          # any random string, 16+ chars
bunx wrangler secret put JEV_API_KEY
bunx wrangler secret put MARITIME_WEBHOOK_URL   # https://api.maritime.sh/api/webhooks/<agent-id>
bunx wrangler deploy
```

Set the subreddits and schedule in `wrangler.jsonc` (`SCAN_SUBREDDITS`, `triggers.crons`).

**Maritime (the agent)**

1. Create an agent from the Codex template and sign it in to your ChatGPT account (`codex login --device-auth` in its terminal).
2. Clone this repo into `/data/workspace`, install Bun, run `bun install`, and symlink `/data/workspace/AGENTS.md` to the repo's `AGENTS.md`.
3. Set env vars: `CRM_URL` (your Worker URL), `CRM_API_TOKEN`, `SPECTRUM_PROJECT_ID`, `SPECTRUM_PROJECT_SECRET`, `OWNER_PHONE` (E.164) and `NOTIFY_ENABLED=true`.

**Photon (iMessage)**

Create a project, register your phone as a user, and add a webhook pointing to your Maritime agent's URL.

## Commands

```sh
bun run crm run_scan                      # scan now
bun run crm list_scan_runs                # recent runs and grade counts
bun run crm list_leads [status|all|alerts]
bun run crm get_lead <id>
bun run crm record_feedback <id> <useful|dismissed|contacted> "<reason>"
printf 'hi' | bun run send                # text the owner
```

These read `CRM_URL` and `CRM_API_TOKEN` from the environment.

## Local development

```sh
export CRM_API_TOKEN=local-example-token-change-me
bun run crm:dev               # local Worker + D1 at http://127.0.0.1:8787, no network calls
bun run crm:dev --scan-demo   # same, with offline fixture scans
```

Tests:

```sh
bun run check && bun run test && bun run test:d1
```

No test calls Reddit, sends a message or uses a paid model.

## Layout

| Path | What it is |
|---|---|
| `src/worker.ts` | Cloudflare Worker: CRM API, cron handler, failure alerts |
| `src/scan.ts`, `src/reddit.ts`, `src/jev.ts` | Scan pipeline: fetch, parse, grade |
| `src/retry.ts` | Shared retry wrapper for Reddit and Jev |
| `src/inbound.ts` | Resolves a Photon webhook to the lead it targets |
| `src/send-message.ts` | Texts the owner through Photon |
| `src/crm-cli.ts` | CLI for the CRM API |
| `migrations/` | D1 schema |
| `docs/vendor/` | Offline copies of the Maritime and Photon docs |
