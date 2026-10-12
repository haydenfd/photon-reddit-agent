> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/frameworks/codex

# Run OpenAI Codex on Maritime

Codex is OpenAI's command-line coding agent: it reads and edits files, runs commands, and works through a task on its
own. Maritime gives it what a laptop session can't: its own always-on micro-VM in the cloud, a persistent workspace,
sleep/wake economics, and every chat channel Maritime supports. The template wraps the
[Codex CLI](https://learn.chatgpt.com/docs/codex/cli) in Maritime's
[bring-your-own-framework contract](https://maritime.sh/docs/frameworks/custom).

> **Note:** **Fastest path:** pick the **Codex** template in the dashboard (or
> `maritime create my-agent --template codex`) and deploy. No key is required: the agent uses Maritime's metered LLM
> access by default. Bring your own OpenAI key or sign in with your ChatGPT plan if you prefer (see below).

## How it fits together

- A small Node server speaks Maritime's contract: `GET /health` and `POST /chat` on `$PORT`.
- Each chat message becomes one `codex exec` run: full Codex with shell and file tools, running unattended inside the
  VM. Approvals and Codex's own sandbox are off because the micro-VM is the sandbox.
- The workspace, Codex's sessions, sign-in and config all live under `/data`, so context survives restarts,
  redeploys, and sleep/wake.
- Each `conversation_id` resumes its own Codex thread: real memory across messages, per conversation.
- The terminal tab runs the interactive `codex` TUI against the same workspace and the same sign-in.

## Three ways to reach the model

The server picks the mode on every message, in this order:

1. **ChatGPT sign-in.** Open the agent's Terminal tab and run `codex login --device-auth`. Codex prints a link and a
   one-time code; finish in your browser. The sign-in is stored at `/data/.codex/auth.json` and survives redeploys.
   It wins over a key when both exist; `codex logout` removes it.
2. **Your own OpenAI key.** Set `OPENAI_API_KEY` in the agent's Settings under Environment variables and restart the
   agent. The key passes through Maritime's proxy untouched and you pay OpenAI directly.
3. **Maritime metered access (default).** With no key set, Maritime injects a per-agent proxy token. Codex talks to
   the proxy over the Responses API and usage is billed to your AI budget per agent. The default model here is
   `gpt-5.5`; set `CODEX_MODEL` to change it in any mode.

Treat `auth.json` like a password: it holds access tokens for your account. It stays on the agent's volume and is
never included in a reply.

## Using the terminal

The template writes `/data/.codex/config.toml` so the interactive TUI reaches the model the same way chat does. The
first line of that file is a marker; while it is there the file is regenerated at boot. Delete the marker line to keep
your own edits.

```bash
# in the agent's Terminal tab
cd /data/workspace
codex                         # interactive Codex, same workspace as chat
codex login --device-auth     # sign in with your ChatGPT plan (optional)
codex login status
```

## Talk to it

```bash
maritime chat my-agent "Clone https://github.com/org/repo into the workspace and run the tests"
maritime chat my-agent "Now fix the failing test and show me the diff"
```

Or use the dashboard chat, the API, or Telegram: every channel lands on the same `POST /chat`. A task that needs
more than a few seconds keeps running in the background; message the agent again and it hands you the finished answer.

## Keep in mind

- Codex runs with `--dangerously-bypass-approvals-and-sandbox`. That is deliberate: nothing outside the VM is
  reachable, and approval prompts would hang a headless run.
- Workspace is `/data/workspace`. Anything written elsewhere can vanish on a redeploy.
- The image pins one Codex CLI version. Newer Codex releases arrive through a new image tag, not through
  `codex update`.
- Want to change the server? The template lives at `backend/templates/codex` in the Maritime repo; deploy your fork
  with [a custom image](https://maritime.sh/docs/frameworks/custom).
