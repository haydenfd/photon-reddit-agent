# Maritime CLI: instructions for AI agents

Copy this file into your agent's context (CLAUDE.md, AGENTS.md, or a system
prompt), or let the agent fetch it from https://maritime.sh/docs/cli/llms.txt.
It teaches an LLM to operate Maritime (https://maritime.sh): a cloud that hosts
AI agents in serverless micro-VMs with persistent storage at /data. Agents
sleep when idle, wake in about a second on the next message or trigger, and
hosting is flat-priced with no usage metering.

The same contract is available offline: `maritime guide` prints a paste-able
version of this file, and `maritime guide --json` emits the full command and
flag manifest, introspected live from the installed CLI, so it can never drift.
Prefer that manifest over guessing flags.

## Setup

1. Install: npm install -g maritime-cli
   (the npm package is maritime-cli; the command is maritime; needs Node 20.12+;
   1.10.0 or later has `login --device`, `signup`, and `create --claim-later`)
2. Authenticate, first path that works wins:
   - MARITIME_TOKEN in the environment (an mk_ key or a login token); the CLI
     reads it before anything else.
   - No browser (a sandbox, SSH, a coding agent): maritime login --device --json
     prints one JSON line on stderr with user_code and verification_uri_complete;
     show both to the user and wait for their approval (15 minute expiry).
   - A browser on this machine: maritime login
   - No account, user present: maritime signup -e <email> -p <password> -n <name> --json
     (ask the user for the email and password; never invent them)
   - No account, do not stop: add --claim-later to maritime create. No login
     needed; the agent runs under a temporary account for 72 hours and the
     response carries a claimUrl the user opens to keep it. One agent only;
     template agents must bring their own model key (-e ANTHROPIC_API_KEY=...).
     Needs maritime-cli 1.10.0 or later.
3. Verify: maritime whoami --json
   (exit code 2 means the token is missing, expired, or wrong)
4. The email verification wall: until the user clicks the link Maritime
   emailed them, create, deploy, start, restart, keys create, and computer
   creation are refused with status 403 and error.code "email_not_verified".
   Ask the user to click the link (maritime login --resend sends it again),
   then retry the same command. List, status, logs, and templates work
   before verification.
5. Long-running automation: once verified, mint a key that never expires:
   maritime keys create --name my-agent --json (raw_key is shown once), and
   export MARITIME_TOKEN=mk_...

Full setup procedure, step by step: https://maritime.sh/agents.md

MARITIME_API_URL overrides the API base (default https://api.maritime.sh).

## The contract

- Pass --json on EVERY command.
  Success: one JSON value on stdout, stderr empty.
  Failure: {"ok": false, "error": {"code": "...", "message": "...", "status": 401}} on stderr, stdout empty.
  Read stdout for results, branch on the exit code, never scrape human text.
- Exit codes: 0 success, 1 generic error (request/server/network), 2 auth,
  3 not found (no such agent), 4 usage (missing or invalid arguments).
  Caveat: flag-parse errors (unknown option, missing required argument) exit 1
  with PLAIN TEXT on stderr even with --json; only CLI-validated errors use
  exit 4 and the JSON error shape. Treat unparseable stderr as a usage bug.
- Anywhere a command takes <agent>, pass the exact agent name or an ID prefix.
  Inside a directory linked with maritime init/link, the agent argument can be
  omitted; the CLI resolves the linked agent.

## Core tasks

# Discover templates, create an agent, wait for it, talk to it:
maritime templates --json
maritime create my-agent --template openclaw --json
maritime status my-agent --json          # wait for "active"
maritime chat my-agent "introduce yourself" --json | jq -r '.response'

# No account yet and nobody to ask: deploy now, claim later (72 h, 1 agent):
maritime create my-bot --repo https://github.com/you/agent --claim-later --json

# Deploy your own code (any framework; Dockerfile at the repo root):
maritime create my-bot --json
maritime deploy my-bot --source github --repo https://github.com/you/agent --branch main --wait --json

# Serve a repo on a public no-login URL (sleeps idle, wakes on the next visit):
maritime create my-app --repo https://github.com/you/app --public --port 3000 --json

# Encrypted env vars (secret by default; --reload pushes into the running agent):
maritime env set my-agent OPENAI_API_KEY=sk-... --reload --json
maritime env import my-agent ./prod.env --reload --json
maritime env list my-agent --json

# Inspect and debug:
maritime list --json
maritime logs my-agent --level error --json
maritime info my-agent --json
maritime history my-agent --json         # build/deploy attempts + buildLog
maritime exec my-agent ls /data --json | jq -r '.stdout'

# Message an agent AS one of your end users (sticky per-user routing through
# the project front door; same --user always reaches the same instance):
maritime message my-agent --user cust_42 "where is my order?" --json | jq -r '.reply'

# Your end users (the people your product serves), each with their own agent:
maritime users upsert user_42 --name "Ada" --tag pro --json       # safe on every sign-in
maritime users create user_42 --template openclaw --json         # their agent, exactly once
maritime users policy set user_42 --llm-cap-cents 500 --json     # caps + sizing for their agents
maritime users token user_42 --scopes chat --ttl 900 --json      # eu_ token for their browser
maritime users suspend user_42 --json · resume · delete --yes
maritime usage --by-user --json                                  # cost per end user, for rebilling

# Lifecycle (rarely needed; agents sleep and wake on their own):
maritime start my-agent --json
maritime sleep my-agent --json
maritime restart my-agent --json         # also picks up new env vars
maritime delete my-agent --yes --json    # --yes is REQUIRED non-interactively

## Scheduling

Timers inside a sleeping agent do not fire. Put scheduled work on platform
triggers: maritime triggers list <agent>, and
maritime triggers create <agent> --type cron --cron "0 9 * * *".
A cron trigger wakes the agent; set config.prompt via the API to also deliver
a message on each fire. A custom container can instead serve GET /schedules
and Maritime registers the wakes for it.
Details: https://maritime.sh/docs/triggers

maritime exec waits for completion and uses a 60-second execution timeout.
It has no detached or custom-timeout flags. Use the REST API for detached
submission, retrieval, and cancellation: https://maritime.sh/docs/api#exec
Null or omitted timeout selects 60 seconds attached or 3,600 seconds detached.
On agents with detached support, disconnecting does not cancel execution.
Do not repeat submission after a lost response without accounting for a command
that may already be running. Older agents support attached exec with combined
output and no execution ID. Detached submission on those agents returns HTTP 501 with
unsupported: outdated vm. Please use a new agent. Use a new agent for
detached execution. Restarting an older agent does not add this feature.

## Gotchas

- create and delete never prompt: a missing name or a missing --yes exits with
  code 4 instead of hanging.
- Env changes apply on the next boot unless you pass --reload (or run
  maritime env reload <agent>).
- If chat fails with error.code "agent_unavailable", the agent is not running:
  maritime start <agent>, wait a few seconds, retry.
- A 404 or "not running" on file/exec operations usually means the agent is
  asleep or errored: start it and retry; do not recreate it.
- mk_ keys never expire; browser-login tokens do. Use mk_ for automation.
- LLM access: most templates work with no model key (Maritime's metered LLM
  proxy). The claude_code template is the exception: it always needs your own
  ANTHROPIC_API_KEY as a secret env var.

## Something wrong with these docs?

If a command, flag or example here does not match what the CLI does, or a call
fails and the error does not tell you what to do, tell Maritime. Any mk_ key
works. Put the X-Request-Id of the failing call in requestId when there is one
and name yourself in tool. Never include keys, tokens or env values.

  curl -X POST https://api.maritime.sh/api/v1/feedback \
    -H "Authorization: Bearer $MARITIME_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"kind":"cli","subject":"maritime env set","message":"<what went wrong and what you expected>","tool":"claude-code/2.1.0"}'

kind is one of docs, sdk, api, cli, computers, dashboard, other. Capped at 5
reports a minute and 20 a day per account. Reference: https://maritime.sh/docs/sdk/feedback

## More

- Human-readable CLI reference: https://maritime.sh/docs/cli
- Drive-Maritime-from-an-AI-agent guide: https://maritime.sh/docs/ai-agents
- REST API: https://maritime.sh/docs/api
- Building a product where every customer gets an agent? Use the SDK from your
  backend instead: https://maritime.sh/docs/build
