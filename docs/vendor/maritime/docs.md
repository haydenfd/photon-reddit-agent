> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs

# Maritime docs

Maritime is the cloud built for AI agents: serverless containers with memory, triggers, and
channels that sleep when idle and wake on the next message. Everything here is drivable from the
dashboard, the [CLI](https://maritime.sh/docs/cli), the [API](https://maritime.sh/docs/api), or
the [SDK](https://maritime.sh/docs/build). Start with whichever door matches what you came to do.

- [Run a ready-made agent](https://maritime.sh/docs/quickstart): Deploy a complete agent from a
  template and talk to it, in under 5 minutes. No code.
- [Build a platform with the SDK](https://maritime.sh/docs/build): Give every one of your users
  their own agent with the TypeScript or Python SDK.
- [Ship your own code](https://maritime.sh/docs/frameworks/custom): Any Docker container becomes
  an agent: three endpoints get you sleep/wake, channels, and triggers.
- [How Maritime works](https://maritime.sh/docs/how-it-works): The mental model in 5 minutes:
  agents, memory, sleep/wake, triggers, and what it costs.

## Popular pages

- [Choose a framework](https://maritime.sh/docs/frameworks)
- [Public web agents](https://maritime.sh/docs/web-apps)
- [Environment variables & secrets](https://maritime.sh/docs/configuration#environment-variables)
- [Triggers & schedules](https://maritime.sh/docs/triggers)
- [Connect Telegram, WhatsApp, or Google](https://maritime.sh/docs/channels)
- [Migrate from AWS, Heroku, or a VPS](https://maritime.sh/docs/migrations)

## References

- [CLI reference](https://maritime.sh/docs/cli)
- [REST API](https://maritime.sh/docs/api)
- [SDK reference](https://maritime.sh/docs/sdk)
- [Limits & errors](https://maritime.sh/docs/limits)

> **Note: Driving Maritime from an AI agent?**
>
> Paste one prompt into Claude, Cursor, or any assistant and it can install the CLI, authenticate,
> and deploy agents for you. The full machine-readable contract is always available via
> `maritime guide --json`.
>
> Copy button: "Copy prompt for your agent" copies the prompt below.
>
> [The AI-agent guide →](https://maritime.sh/docs/ai-agents)

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
