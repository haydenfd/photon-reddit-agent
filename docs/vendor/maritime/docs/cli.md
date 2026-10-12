> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/cli

# CLI Reference

The Maritime CLI lets you deploy and manage agents from your terminal. First time here? The
[quickstart](https://maritime.sh/docs/quickstart) walks the happy path; this page is the full
reference.

> **Note:** **Driving this CLI from an LLM?** There's a ready-made instructions file at
> [maritime.sh/docs/cli/llms.txt](https://maritime.sh/docs/cli/llms.txt). Copy it into your
> agent's context (CLAUDE.md, AGENTS.md, or a system prompt) and it knows the auth flow, the JSON
> contract, and the gotchas. Guide:
> [Drive Maritime from an AI agent](https://maritime.sh/docs/ai-agents).
>
> Copy button: "Copy the instructions file" copies the full CLI instructions file, also served at
> https://maritime.sh/docs/cli/llms.txt

## Installation

```
npm install -g maritime-cli
```

Requires Node.js 20.12 or later.

## Authentication

### maritime login

Authenticate with your Maritime account. Opens your browser for login by default, or pass
credentials directly for non-interactive use. **Sign in with Google or GitHub?** You have no
password, so use the browser flow, or paste a token from
[maritime.sh/cli/auth](https://maritime.sh/cli/auth) (ideal for headless servers, SSH sessions,
and CI).

```
maritime login

# SSO / headless / CI: paste a token from https://maritime.sh/cli/auth
maritime login --token <token>
# ...or export it (equivalent, no stored config):
export MARITIME_TOKEN=<token>

# Non-interactive login (email/password accounts):
maritime login -e user@example.com -p yourpassword
```

| Flag | Description |
| --- | --- |
| `-e, --email` | Email address (skips browser login) |
| `-p, --password` | Password (skips browser login) |
| `-t, --token` | Paste a token from maritime.sh/cli/auth. Works for any account, including Google/GitHub SSO. Same value as the `MARITIME_TOKEN` env var. |

### maritime signup

Create a new Maritime account. Prompts interactively for any fields not provided.

```
maritime signup -e user@example.com -p yourpassword -n "Jane Doe"

# Or just run and follow the prompts:
maritime signup
```

| Flag | Description |
| --- | --- |
| `-e, --email` | Email address |
| `-p, --password` | Password |
| `-n, --name` | Display name (optional) |

### maritime logout

Log out and clear stored credentials.

```
maritime logout
```

### maritime whoami

Show the current authentication: the token source (`MARITIME_TOKEN` vs stored login), user, and
expiry. Add `--json` for a machine-readable `{ authenticated, method, source, expiresAt }` (exit
code 2 when unauthenticated).

```
maritime whoami
```

### maritime keys

Mint a long-lived API key (`mk_…`) for non-interactive use. Set it as `MARITIME_TOKEN` so an AI
agent, script, or CI never runs an interactive login. Keys don't expire; revoke anytime.

```
# Mint a key (shown once, store it securely):
maritime keys create --name my-agent --json

# Default is FULL access (provision,deploy,secrets,manage). Narrow it for
# anything you hand to an agent or CI ("manage" can mint further keys):
maritime keys create --name ci-deploy --scopes deploy

# Use it everywhere:
export MARITIME_TOKEN=mk_xxxxxxxxxxxx

# List / revoke:
maritime keys list
maritime keys revoke <id>
```

*Recording: Mints a key scoped to deploys, lists your keys, exports the new key as MARITIME_TOKEN,
and confirms the session with maritime whoami. No browser login involved. The key shown on screen
was revoked right after recording.*

## Projects: a directory is an agent

Like `vercel` or `railway`, you can link a directory to an agent. After that, the agent argument
is **optional on every command**; the CLI resolves the linked agent by walking up from the current
folder. Two files: `maritime.json` (committed config: name, template, persona, env keys) and
`.maritime/` (the machine-local link, git-ignored).

```
maritime init support-bot     # scaffold maritime.json + AGENTS.md, create & link
maritime chat "what's open?"  # talks to support-bot, no name needed
maritime logs                 # support-bot's logs
maritime deploy               # reconcile the agent to maritime.json, then redeploy
```

*Recording: maritime init scaffolds maritime.json and AGENTS.md, creates the agent, and links the
directory. maritime chat then works without naming the agent, and maritime deploy pushes the
edited persona to the running agent.*

### maritime init

Scaffold `maritime.json` + `AGENTS.md`, create the agent, and link this directory to it. Defaults
the template to `openclaw` and the name to the folder.

```
maritime init                 # name from the folder
maritime init support-bot     # explicit name
maritime init bot --no-create # just write the config files
```

### maritime link

Link this directory to an existing agent (interactive picker if no name is given). Re-run to
change it.

```
maritime link support-bot
maritime link                 # pick from your agents
```

## Agent Management

### maritime create

Create a new agent. Just give it a name: the platform picks an applicable size for the framework,
and the agent auto-sleeps when idle and wakes on the next message. No sizing required.

```
maritime create my-agent

# From a template (see maritime templates):
maritime create researcher --template openclaw

# With initial environment variables:
maritime create my-agent -e OPENAI_API_KEY=sk-... -e MY_VAR=hello

# From a GitHub repo (must contain a Dockerfile), served on a public URL:
maritime create my-app --repo https://github.com/you/app --public --port 3000
```

Serving a repo on a public URL is covered in [Public web agents](https://maritime.sh/docs/web-apps).

| Argument / flag | Description |
| --- | --- |
| `<name>` | Agent name (positional) |
| `-t, --template` | Template to base the agent on (see `maritime templates`) |
| `-e, --env` | Environment variables as KEY=value (repeatable) |
| `-r, --repo` | Deploy from a GitHub repo (must contain a Dockerfile) |
| `-b, --branch` | Git branch to deploy (with `--repo`) |
| `--public` | Serve a public, no-login web URL for this agent (web apps) |
| `--port` | Port your app listens on (exposed publicly; default 8080) |

**Advanced: per-agent resource overrides.** All optional; omit them and the agent gets the
platform defaults. Useful for hand-tuning a single agent (e.g. a reseller dialing resources per
client). Hidden from `--help`, but fully supported.

```
maritime create acme-bot --ram 2048 --cpu 1.5 --idle 600 --disk 20
maritime create always-up --always-on
```

| Flag | Description |
| --- | --- |
| `--ram` | RAM in MB (per-agent override of the default) |
| `--cpu` | vCPU cores, e.g. 0.5 or 2 (per-agent override) |
| `--idle` | Auto-sleep N seconds after the last request |
| `--always-on` | Never auto-sleep (mutually exclusive with --idle) |
| `--disk` | Workspace SSD in GB (clamped to your plan cap) |
| `--framework` | Framework when not using a template (default: custom) |

### maritime list

List all your agents with their status, framework, and creation date. Alias: `maritime ls`

```
maritime list

# Output:
# NAME            STATUS     FRAMEWORK    CREATED
# support-bot     active     openclaw     2026-04-12
# data-pipeline   sleeping   zeroclaw     2026-03-28
# code-reviewer   sleeping   openclaw     2026-05-01
```

### maritime deploy

Deploy an agent. Accepts an agent name or ID prefix.

```
maritime deploy my-agent

# Deploy from a GitHub repo:
maritime deploy my-agent --source github --repo https://github.com/user/repo

# Deploy a specific Docker image:
maritime deploy my-agent --source docker --image myimage:latest
```

| Flag | Description |
| --- | --- |
| `--source` | Deploy source: template, github, or docker (default: template) |
| `--repo` | GitHub repository URL |
| `--image` | Docker image name |
| `--branch` | Git branch (for GitHub deploys) |
| `-w, --wait` | Block until the deployment completes (useful in scripts and CI) |

### maritime start / stop / restart

Manual lifecycle control, **rarely needed**. Serverless agents auto-sleep when idle and auto-wake
on the next message or trigger; reach for these for ops or debugging. (Hidden from
`maritime --help`, still fully supported.)

```
maritime start my-agent
maritime stop my-agent
maritime restart my-agent
```

### maritime delete

Delete an agent. Prompts for confirmation unless `-y` is passed.

```
maritime delete my-agent

# Skip confirmation:
maritime delete my-agent -y
```

## Talking to agents

### maritime chat

Send a message to a running agent and print its reply. Reads the message from arguments or stdin
(handy for long prompts). Sleeping serverless agents auto-wake. Alias: `maritime send`.

```
maritime chat my-agent "summarize today's incidents"

# Long prompt via stdin:
cat prompt.txt | maritime chat my-agent

# Multi-turn with a conversation id:
maritime chat my-agent "and the one before?" --conversation-id abc123

# Machine-readable (returns { response }):
maritime chat my-agent "hi" --json
```

## Your end users

An end user is one of **your** users, keyed by the id you already hold for them. Their agents, spend
caps, delegated tokens and costs hang off that record; the [Users page](https://maritime.sh/users)
shows the same list and the [SDK guide](https://maritime.sh/docs/sdk/end-users) covers the model. The
CLI is for support work and scripts.

### maritime users

```
# Create or update one (safe to run on every sign-in):
maritime users upsert user_42 --name "Ada" --tag pro --meta plan=pro

# Their agent, exactly once (a repeat call returns the same agent):
maritime users create user_42 --template openclaw
maritime users agents user_42

# Caps and sizing, applied to every agent they own:
maritime users policy set user_42 --llm-cap-cents 500 --wakes-per-hour 60 --idle-seconds 600
maritime users policy get user_42
maritime users policy clear user_42

# A short-lived eu_ token for their own browser or app (shown once):
maritime users token user_42 --scopes chat,files --ttl 900 --json
maritime users revoke-tokens user_42

# Find, inspect, suspend, resume, delete:
maritime users list --tag pro --status active
maritime users get user_42
maritime users suspend user_42
maritime users resume user_42
maritime users delete user_42 --yes      # agents and tokens go with it
```

Policy flags: `--llm-cap-cents` (AI spend per month), `--compute-minutes`, `--wakes-per-hour`,
`--idle-seconds`, `--ram` (MB), `--cpu`, `--disk` (GB). `set` replaces the whole policy. Token
scopes: `chat`, `files`, `console`, `logs`, `app`; the TTL is 30 to 3600 seconds.

## Observability

*Recording: The agent gets a task over maritime chat, maritime logs prints its timestamped
lifecycle entries, and maritime info shows the full record: status, framework, image, env keys,
and server placement.*

### maritime logs

View logs from an agent.

```
maritime logs my-agent

# Show last 100 lines:
maritime logs my-agent -n 100

# Filter by level:
maritime logs my-agent --level error

# Stream logs live:
maritime logs my-agent -f
```

| Flag | Description |
| --- | --- |
| `-n, --lines` | Number of log lines to show (default: 50) |
| `--level` | Filter by level: info, warn, error, or debug |
| `-f, --follow` | Follow log output (stream new lines as they arrive) |

### maritime env

Manage environment variables for an agent.

```
# List variables:
maritime env list my-agent

# Set one or more (marked secret + encrypted by default):
maritime env set my-agent OPENAI_API_KEY=sk-... ANOTHER=value

# Bulk import from a .env file (or stdin), then hot-reload:
maritime env import my-agent ./prod.env --reload

# Set a non-secret variable:
maritime env set my-agent LOG_LEVEL=debug --no-secret

# Remove a variable:
maritime env remove my-agent LOG_LEVEL

# Apply pending changes to a running agent without a full restart:
maritime env reload my-agent

# Pull the agent's env into a local .env file (secret values are masked):
maritime env pull my-agent .env
```

Env changes apply on the next container boot unless you pass `--reload` (or run
`maritime env reload`). Secrets behavior is covered in
[Env vars & sizing](https://maritime.sh/docs/configuration#environment-variables).

### maritime status

Show detailed status for a single agent: health, last activity, container ID, host, and deployment
state.

```
maritime status my-agent
```

### maritime usage

What your agents cost over a range: per agent, per end user (`--by-user`, the rebilling view) or
per day (`--daily`). Under a seat plan the hosting number is your plan price allocated over your
agents day by day; AI is the real spend from your credits. The
[Usage page](https://maritime.sh/usage) draws the same report.

```
maritime usage                                  # last 30 days, per agent
maritime usage --by-user --json                 # cost per end user
maritime usage --daily --days 7
maritime usage --from 2026-09-01 --to 2026-10-01 --by-user
```

### maritime info

Print full metadata for an agent (env keys, framework, image, exposed ports, server placement).

```
maritime info my-agent
```

### maritime history

Show deployment history for an agent: every build/deploy attempt with its outcome.

```
maritime history my-agent

# Show last 30 deployments:
maritime history my-agent -n 30
```

### maritime triggers

Manage the cron/webhook/telegram/discord triggers wired to an agent. Subcommands, not a bare
argument:

```
maritime triggers list my-agent

maritime triggers create my-agent --type cron --cron "0 9 * * *"
maritime triggers create my-agent --type webhook

maritime triggers delete my-agent <trigger-id>
```

A cron trigger wakes the agent on schedule; give it a message to deliver by setting
`config.prompt` via the API, or let the agent publish its own schedule (see
[Triggers & schedules](https://maritime.sh/docs/triggers)).

## Lifecycle

### maritime sleep

Put an active agent to sleep. Sleeping agents keep their full state, still count against your
plan, and auto-wake on triggers. (Wake timings and the full model are in
[How Maritime works](https://maritime.sh/docs/how-it-works#sleep-and-wake).)

```
maritime sleep my-agent
```

### maritime open

Open the agent's dashboard page in your default browser.

```
maritime open my-agent
```

## Discovery

### maritime templates

List available agent templates. This command does not require authentication.

```
maritime templates
```

### maritime guide

Print the machine-readable usage guide for driving the CLI from code or an AI agent. `--json`
emits a one-shot manifest of every command, flag, and the contract, introspected live so it can't
drift.

```
maritime guide          # human-readable contract
maritime guide --json   # full command/flag manifest
```

## maritime exec

Runs an attached, non-interactive command. The CLI has no detached, timeout, retrieval, or cancellation flags. Its execution timeout defaults to 60 seconds. Use the [REST exec API](https://maritime.sh/docs/api#exec) for a custom timeout or detached execution.

```bash
maritime exec my-agent ls /data --json
```

On agents with detached support, JSON output includes `executionId`, `status`, `exitCode`, `stdout`, and `stderr`. Without `--json`, command output goes to the corresponding stdout and stderr streams. On agents with detached support, disconnecting does not cancel the command. Older agents still support this command, but return combined output in stdout and omit executionId and status. Use a new agent for detached execution through the REST API.

## Scripting & AI agents

Handing the CLI to Claude, Cursor, or another assistant? There's a ready-made prompt and a
walkthrough on [Drive Maritime from an AI agent](https://maritime.sh/docs/ai-agents); the tables
below are the underlying contract.

The CLI is built to be driven non-interactively. Authenticate with the `MARITIME_TOKEN` env var
(an `mk_…` key from `maritime keys create`), pass `--json` on every command, and branch on the
exit code.

With `--json`: success prints one JSON value to **stdout** (stderr empty); failure prints one JSON
object `{ ok: false, error: { code, message } }` to **stderr** (stdout empty).

```
export MARITIME_TOKEN=mk_xxxxxxxxxxxx

# results on stdout, errors on stderr, branch on exit code:
maritime list --json | jq '.[] | select(.status=="error") | .name'

reply=$(maritime chat my-agent "status?" --json | jq -r '.response')
```

| Exit code | Meaning |
| --- | --- |
| `0` | success |
| `1` | generic error (request / server / network) |
| `2` | auth (no token / expired / wrong) |
| `3` | not found (no such agent) |
| `4` | usage (missing / invalid arguments) |

> **Note: Agent name resolution**
>
> Any command that takes an `<agent>` argument accepts the full agent name or an ID prefix,
> matched by exact name first and then by ID prefix. If you omit it inside a linked directory, the
> CLI uses the linked agent.
