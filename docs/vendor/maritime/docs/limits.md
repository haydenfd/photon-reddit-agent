> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/limits

# Limits & errors

Every number the platform enforces, in one place, so you never have to hunt for a cap in a guide.

## Runtime

| What | Limit |
| --- | --- |
| Wake from sleep | About a second, automatic on any message, trigger, or request |
| Chat reply budget (custom agents) | Reply within 30 seconds; run longer work in the background and deliver it on the next message |
| exec (run a command) | 60s attached default, 3,600s detached default; null or omission selects the default. Positive finite timeouts can exceed 120s. Each separate output stream retains 262,144 characters plus a truncation marker. Results are temporary and can be lost on restart or agent replacement. Older agents support attached commands only, capped at 120s, with combined output and no execution ID. |
| File transfers | 100 MB per file; any file call wakes a sleeping agent |

## Build & deploy

| What | Limit |
| --- | --- |
| Typical repo build + ship | 1 to 3 minutes (an idle builder cold-starts first, adding about a minute) |
| Silent build kill | A build that prints nothing for 5 minutes is killed |
| ZIP upload | 500 MB compressed, 2 GB unpacked |
| Template capture | Usually 1 to 10 minutes (snapshots the image and volume) |
| Registries | Pre-built images from public registries only; private code goes through repo builds |

## Resources & plans

| What | Limit |
| --- | --- |
| Base allocation per machine | 2 GB RAM, 5 GB SSD |
| Self-serve ceilings per machine | 8 GB RAM, 100 GB SSD (flat add-on prices) |
| Included machines | Free 3 · Starter 20 · Growth 100 · Scale 500. An agent and a Computer each take one machine (extras are flat per-machine prices). Computers need a paid plan |
| Machines awake at once | Free 1 · Starter 5 · Growth 25 · Scale 60. Sleeping machines are free and do not count; a wake past the limit answers 429 with a 15 second retry hint |

Sizing details in [Env vars & sizing](https://maritime.sh/docs/configuration#resource-limits),
prices in [Billing & plans](https://maritime.sh/docs/billing).

## HTTP errors

| Status | Meaning |
| --- | --- |
| `401` | Missing, invalid, revoked, or expired API key |
| `402` | Plan limit reached, or an add-on needs a paid plan |
| `403` | API key lacks the required scope for this endpoint |
| `404` | No such agent, or it belongs to a different account |
| `409` | Conflict: agent name taken, deploy already in progress, or a file-move destination exists |
| `429` | Rate limited; back off and retry |

The SDKs raise these as typed errors ([SDK error classes](https://maritime.sh/docs/sdk#errors));
the CLI maps them to exit codes ([CLI exit codes](https://maritime.sh/docs/cli#scripting-ai-agents)).
