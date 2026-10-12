> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/ai-agents

# Drive Maritime from an AI agent

The Maritime CLI is built to be operated by other AI agents, not just humans: machine-readable
output on every command, stable exit codes, and a live self-describing contract. Paste one prompt
into Claude, Cursor, or any assistant and it can install the CLI, authenticate, and deploy agents
for you.

> **Note:** **Quick start:** a short prompt that teaches your assistant the auth flow, the JSON
> contract, the common tasks, and the gotchas.
>
> Copy button: "Copy prompt for your agent" copies the prompt below.

```
You are operating Maritime (https://maritime.sh) for me: a cloud platform that hosts AI agents. Each agent runs in its own serverless micro-VM with persistent storage at /data; it sleeps when idle, wakes on the next message, and hosting is flat-priced with no usage metering.

SETUP
1. Install the CLI: npm install -g maritime-cli (the package is maritime-cli, the command is maritime).
2. Authenticate: ask me for an API token, then export it as the MARITIME_TOKEN environment variable. I can mint a long-lived key (mk_...) at https://maritime.sh/developers, or grab a token at https://maritime.sh/cli/auth. Never run interactive "maritime login" yourself.
3. Verify: maritime whoami --json (exit code 2 means the token is missing or wrong).

RULES
- Pass --json on every command. Success prints one JSON value to stdout; failure prints {"ok": false, "error": {"code": "...", "message": "..."}} to stderr. Branch on exit codes: 0 success, 1 generic error, 2 auth, 3 not found, 4 usage.
- Run "maritime guide --json" once to discover the full command and flag surface. It is introspected live and authoritative; do not guess flags.
- Anywhere a command takes <agent>, use the exact agent name or an ID prefix.

COMMON TASKS
- List available templates: maritime templates --json
- Create an agent from a template: maritime create my-agent --template openclaw --json
- Deploy my own repo (any framework, needs a Dockerfile): create the agent, then: maritime deploy <agent> --source github --repo <url> --branch main --json
- Talk to an agent: maritime chat <agent> "your message" --json (read .response; sleeping serverless agents wake automatically)
- Set an encrypted secret: maritime env set <agent> KEY=value --reload --json (without --reload it applies on next boot)
- Inspect: maritime list --json, maritime status <agent> --json, maritime logs <agent> --json, maritime info <agent> --json; run a command inside the agent: maritime exec <agent> <cmd> --json
- Lifecycle: maritime start | stop | restart | sleep <agent> --json; deleting requires --yes

GOTCHAS
- mk_ API keys never expire; browser login tokens do. Use an mk_ key for anything long-running.
- If chat returns error code agent_unavailable, the agent is not running: maritime start <agent>, wait a few seconds, retry.
- create and delete never prompt; a missing name or --yes exits with code 4.

Full instructions file: https://maritime.sh/docs/cli/llms.txt

START by checking whether the maritime CLI is installed and MARITIME_TOKEN works, then ask me what I want to deploy.
```

> **Note:** **Permanent setup:** the full instructions file, made to live in your agent's context
> (CLAUDE.md, AGENTS.md, or a system prompt). Also served as plain text at
> [maritime.sh/docs/cli/llms.txt](https://maritime.sh/docs/cli/llms.txt) so an agent can fetch it
> directly.
>
> Copy button: "Copy the instructions file" copies the full CLI instructions file, also served at
> https://maritime.sh/docs/cli/llms.txt

## The contract

- **Authenticate with an env var, never interactively.** Mint a long-lived key (`mk_…`) with
  `maritime keys create` and export it as `MARITIME_TOKEN`. Keys never expire; browser-login
  tokens do.
- **Pass `--json` on every command.** Success prints one JSON value to stdout (stderr empty);
  failure prints `{ ok: false, error: { code, message } }` to stderr (stdout empty).
- **Branch on exit codes.** 0 success, 1 generic error, 2 auth, 3 not found, 4 usage. Full table
  in the [CLI reference](https://maritime.sh/docs/cli#scripting-ai-agents).
- **Never guess flags.** `maritime guide --json` emits a one-shot manifest of every command and
  flag, introspected live from the CLI itself, so it cannot drift.
- **Name resolution is forgiving.** Anywhere a command takes an agent, the exact name or an ID
  prefix works; inside a linked directory the agent argument can be omitted entirely.

## A session in six lines

```
export MARITIME_TOKEN=mk_xxxxxxxxxxxx

maritime whoami --json                                  # exit 2 = bad token
maritime templates --json                               # discover templates
maritime create runner --template openclaw --json
maritime chat runner "set up a daily digest of my repo" --json | jq -r '.response'
maritime logs runner --json
```

## Agent-followable docs

The [migration runbooks](https://maritime.sh/docs/migrations) are written to be executed by a
coding agent: point Claude Code or your Maritime agent at a provider's runbook page and it can
inventory the old provider with read-only credentials, recreate each workload as a Maritime agent,
and hand you a reversible cutover checklist.

> **Note: Driving vs. building**
>
> This page is about an AI agent *driving* Maritime through the CLI. To build a product where
> every customer gets their own Maritime-hosted agent, use the [SDK](https://maritime.sh/docs/build)
> from your backend instead.
