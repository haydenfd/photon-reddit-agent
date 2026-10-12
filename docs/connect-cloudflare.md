# Deploying the Worker

The Worker is the scanner and the CRM. It runs on the Cloudflare Workers Free plan with one D1 database.

## First deploy

```sh
bunx wrangler login
bunx wrangler d1 create reddit-tracker
```

Copy the printed `database_id` into `wrangler.jsonc`, then:

```sh
bunx wrangler d1 migrations apply reddit-tracker --remote
bunx wrangler secret put CRM_API_TOKEN          # random string, 16+ chars; the agent uses the same one
bunx wrangler secret put JEV_API_KEY
bunx wrangler secret put MARITIME_WEBHOOK_URL   # optional: the agent's invoke URL with ?token= (GET /api/webhooks/<agent>/token)
bunx wrangler deploy
```

If you keep a local `.env`, prefix wrangler commands with `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false` so it isn't uploaded.

## Configuration (`wrangler.jsonc`)

| Var | Meaning |
|---|---|
| `SCAN_ENABLED` | `true` to allow scans at all |
| `SCHEDULED_SCANS` | `true` to let the cron run scans; manual `run_scan` works either way |
| `SCAN_SOURCE` | `reddit` for live, `fixture` for offline demos |
| `SCAN_SUBREDDITS` | Comma-separated names, no `r/` |
| `REDDIT_USER_AGENT` | Sent with each RSS request |
| `JEV_MODEL` | Jev model, e.g. `jev-latest` |
| `triggers.crons` | Scan schedule, e.g. `["*/15 * * * *"]`; `[]` for manual only |

Redeploy after changing any of these.

## Checking it works

```sh
export CRM_URL=https://<your-worker>.workers.dev CRM_API_TOKEN=<token>
bun run crm run_scan          # expect fetched: 100 and a grade count
bun run crm list_scan_runs
bunx wrangler tail            # live logs, including scheduled runs
```

A wrong or missing token returns 401. A `Reddit feed failed: HTTP 403` now and then is Reddit blocking a Cloudflare IP; the retries and the next run cover it.

## Updating

```sh
bunx wrangler d1 migrations apply reddit-tracker --remote   # only if migrations/ changed
bunx wrangler deploy
```
