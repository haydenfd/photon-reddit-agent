> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/configuration

# Environment variables & sizing

How agents are configured: encrypted env vars and secrets, how changes reach a running agent, and
how resources are sized. Creation options live in the
[quickstart](https://maritime.sh/docs/quickstart) and the
[CLI reference](https://maritime.sh/docs/cli#maritime-create).

## Environment variables

Managed from the agent's **Settings** tab in the [dashboard](https://maritime.sh/dashboard) or
from the CLI. Variables are **secret by default**: stored encrypted at rest, injected only into
that agent's VM, and always masked in the UI. Uncheck Secret (or pass `--no-secret`) for plain
config values you want readable.

```bash
# Set one or more (secret + encrypted by default)
maritime env set my-agent OPENAI_API_KEY=sk-... ANOTHER=value

# Plain, non-secret config
maritime env set my-agent LOG_LEVEL=debug --no-secret

# Bulk import from a .env file (or stdin), then hot-reload
maritime env import my-agent ./prod.env --reload

# List (secret values stay masked) / pull to a local .env / remove
maritime env list my-agent
maritime env pull my-agent .env
maritime env remove my-agent LOG_LEVEL
```

*Recording: Sets STRIPE_API_KEY as an encrypted secret and LOG_LEVEL as plain text, lists both
(the secret stays masked), pulls them into a local .env file, then removes the secret.*

### When changes take effect

Env changes apply on the agent's next boot unless you push them into the running container with
`--reload` (or `maritime env reload my-agent`). Config saved while an agent is asleep is applied
on the next wake.

### Secrets never travel

When you package an agent as a [template](https://maritime.sh/docs/templates), env var *keys* are
kept but secret *values* are blanked; whoever clones fills in their own. Programmatic access needs
an API key with the `secrets` scope: see the [SDK](https://maritime.sh/docs/sdk/agents#secrets) or
`maritime env` in the [CLI](https://maritime.sh/docs/cli).

## Triggers

Cron schedules, webhooks, and channel triggers wake sleeping agents automatically and have their
own page: [Triggers & schedules](https://maritime.sh/docs/triggers). List an agent's triggers from
the terminal with `maritime triggers list <agent>`.

## Resource sizing

Every agent starts with the same base allocation: **2 GB RAM, 5 GB SSD**, auto-sleep when idle.
Agents that need more can be sized up to 8 GB RAM and 100 GB SSD at creation or later from the
agent's settings, at flat monthly add-on prices (see
[Billing & plans](https://maritime.sh/docs/billing#add-ons)). Templates with special needs are
sized up by the platform on their own.

For hand-tuning a single agent, the CLI supports per-agent overrides:

```
maritime create acme-bot --ram 2048 --cpu 1.5 --idle 600 --disk 20
```

`--ram` (MB), `--cpu` (vCPUs), `--idle` (seconds before auto-sleep), `--disk` (GB), plus
`--always-on`; the full table is in the
[CLI reference](https://maritime.sh/docs/cli#maritime-create).
