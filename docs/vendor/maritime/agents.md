# Maritime: setup procedure for AI agents

> You are an AI agent reading https://maritime.sh/agents.md. This is a procedure.
> Execute the steps in order. It is idempotent: a step that is already done
> is skipped, not repeated. Do not merely explain the steps to the user.

Maritime hosts AI agents. Each agent gets its own persistent micro-VM: a real
Firecracker VM with a disk at /data that survives sleep, restart, and
redeploy. Agents sleep when idle (free while asleep) and wake in about a
second. Hosting is a flat plan, nothing is metered. The free plan includes 3
machines, no card.

Ask the user a question only when their input is genuinely required: their
email and password for a new account, which agent to deploy when there are
several, and approving a device login or clicking a verification link in
their inbox.

## Step 1: identify yourself and your environment

Note which of these you are, it changes step 3:

- Claude Code, Codex CLI, Cursor, Gemini CLI, OpenCode, Aider: you run in the
  user's terminal, usually with no browser you can open. Prefer the device
  login.
- An agent inside a sandbox with no outbound browser at all: same as above.
- A desktop app with a browser: the browser login also works.

Check the environment:

```bash
node --version                 # need 20.12 or later
maritime --version             # absent, or older than 1.9.0, means install below
```

## Step 2: install the CLI

```bash
npm install -g maritime-cli    # the command is `maritime`
maritime --version
```

If a flag in this procedure is unknown to the installed CLI, run
`npm install -g maritime-cli@latest` and retry once.

## Step 3: authenticate

Try these in order and stop at the first that works.

1. Already signed in: `maritime whoami --json` exits 0. Continue to step 4.
2. `MARITIME_TOKEN` is set in the environment: the CLI reads it first. Run
   `maritime whoami --json`; exit 2 means the token is wrong.
3. The user has an account and you have no browser:
   `maritime login --device --json`. The CLI prints one JSON line on stderr
   with `user_code` and `verification_uri_complete`. Show both to the user,
   ask them to open the URL and approve, and wait. The command returns when
   they approve (it expires after 15 minutes).
4. The user has an account and a browser on this machine: `maritime login`.
5. The user has no account and is present: ask for an email and a password,
   then `maritime signup -e <email> -p <password> -n <name> --json`. Never
   invent an email. Signup saves a login token and returns
   `emailVerified: false`.
6. The user has no account and you should not stop to ask: deploy first and
   let them claim it later. Skip to step 6 and add `--claim-later` to the
   create command. It needs no login: the agent runs under a temporary
   account for 72 hours with a claim link, the CLI stays signed in with a
   temporary key, and one agent is the limit. A template agent must bring
   its own model key (`-e ANTHROPIC_API_KEY=...` or `-e OPENAI_API_KEY=...`)
   because the temporary account has no LLM credit. Put the claim link in
   your final report; the user opens it, signs in or signs up, and the agent
   moves into their account.

Do not print the password back. Do not paste tokens into chat.

## Step 4: the email verification wall

Until the user clicks the link Maritime emailed them, these are refused with
status 403 and `error.code` `email_not_verified`: create, deploy, start,
restart, keys create, computer creation. Listing, status, logs, and templates
work before verification.

When you see `email_not_verified`: tell the user to open their inbox and
click the link, offer `maritime login --resend` if it did not arrive, wait
for them to say it is done, then retry the same command. Do not create a
second account.

## Step 5: learn the contract

```bash
maritime guide --json          # every command and flag, from the installed CLI
```

Rules that apply to every command: pass `--json`; success is one JSON value
on stdout; failure is `{"ok": false, "error": {"code", "message", "status"}}`
on stderr; exit codes are 0 ok, 1 error, 2 auth, 3 not found, 4 usage. Never
guess flags. Full contract: https://maritime.sh/docs/cli/llms.txt

## Step 6: deploy

Choose exactly one recipe.

A. The user wants a ready-made agent (no code of their own):

```bash
maritime templates --json                                   # ids: openclaw, hermes, zeroclaw, claude_code, codex, dsh
maritime create <name> --template openclaw --json
```

B. The user has a repo with a Dockerfile at its root (any framework):

```bash
maritime create <name> --repo <git url> --json              # builds on Maritime, 1 to 3 minutes
```

The container must listen on 0.0.0.0:$PORT (injected, never hardcode 8080),
answer GET /health with any 2xx, answer POST /chat with JSON
{"message": "..."} within 30 seconds, and keep state under /data. If the repo
does not meet this, add the smallest server that does before deploying.
Contract and examples: https://maritime.sh/docs/frameworks/custom.md

C. The user wants a public web app on its own HTTPS URL:

```bash
maritime create <name> --repo <git url> --public --port <port> --json
```

D. The user's product should give every end user their own agent: stop, and
point them at the SDK instead of deploying by hand: https://maritime.sh/docs/build.md

Secrets the agent needs go in after create, never into the repo:

```bash
maritime env set <name> KEY=value --reload --json
```

Scheduled work: timers inside a sleeping VM do not fire. Use
`maritime triggers create <name> --type cron --cron "<expr>" --json`.

## Step 7: verify

```bash
maritime status <name> --json                               # poll until .status is "active"
maritime chat <name> "hello" --json | jq -r '.response'     # templates and chat-capable containers
maritime logs <name> --json                                 # custom containers: the server is listening
```

A build failure shows in `maritime history <name> --json` (buildLog). Fix
the Dockerfile and run `maritime deploy <name> --json`. Do not create a
second agent to work around a failed build.

## Step 8: leave the repo ready for next time

If you deployed from a repo and `.claude/skills/maritime/SKILL.md` does not
exist, run `maritime init --no-create` there (it writes the skill and a
maritime.json), or fetch https://maritime.sh/SKILL.md into that path. The next agent
session in that repo then knows Maritime without reading this page.

## Step 9: report

End with exactly this shape, filled in with what actually happened:

- Status: deployed and verified | deployed, not verified | blocked (why)
- Agent: <name>, <template or repo>, dashboard https://maritime.sh/agents
- Claim link, if you used --claim-later: the URL and the expiry time
- Auth: which path from step 3 was used; whether verification is pending
- Changes made: files added or edited in the repo, env vars set (names only)
- Verification: the status value and the chat reply or log line you saw
- Next action for the user: one line, or "none"

Do not finish with a list of steps that were not attempted. Execute the
procedure first, then report the actual result.

## Known behaviours

- `maritime login` (no flags) opens a browser and waits up to 120 seconds
  for a localhost callback. In a sandbox this hangs; use `--device`.
- `create` and `delete` never prompt. A missing name exits 4; `delete`
  needs `--yes`.
- Flag-parse errors (unknown option) exit 1 with plain text on stderr even
  under `--json`. Treat that as a usage bug, not an API failure.
- `error.code` `agent_unavailable` on chat: the agent is not running. Run
  `maritime start <name>`, wait a few seconds, retry.
- `error.code` `seat_limit` (status 402): the plan is full. Show
  `error.message` to the user unchanged; it names the fix.
- Most templates need no model key (Maritime's metered LLM proxy).
  `claude_code` needs ANTHROPIC_API_KEY as a secret env var.
- `--claim-later` needs maritime-cli 1.10.0 or later. The temporary key
  cannot create a second agent (`seat_limit`) and expires with the claim
  link. After the claim, the user mints a normal key.
- Long-running automation should use an API key, not a login token:
  `maritime keys create --name <purpose> --json` (after verification) and
  export `raw_key` as MARITIME_TOKEN. mk_ keys never expire.

## More

- Index of every page: https://maritime.sh/llms.txt
- Every docs page as markdown: append .md to its URL, for example
  https://maritime.sh/docs/quickstart.md
- REST API: https://api.maritime.sh/openapi.json
- The skill file for your skills directory: https://maritime.sh/SKILL.md
