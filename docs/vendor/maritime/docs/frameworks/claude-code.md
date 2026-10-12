> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/frameworks/claude-code

# Run Claude Code on Maritime

Claude Code is an agent that writes and runs code with real tools: a shell, file edits, a workspace. Maritime gives it
what a laptop session can't: its own always-on micro-VM in the cloud, persistent storage, sleep/wake economics, and
every chat channel Maritime supports. This guide builds the whole thing from three small files, using the
[Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview) and Maritime's
[bring-your-own-framework contract](https://maritime.sh/docs/frameworks/custom).

> **Note:** **Fastest path:** pick the ready-made **Claude Code** template in the dashboard (or
> `maritime create my-agent --template claude_code`), add your `ANTHROPIC_API_KEY`, done. The rest of this page
> builds the same agent from scratch so you can see, and change, every part.

This is not a hypothetical: the exact code on this page runs in production as the agent `claude-code-adk`. Asked what
machine it was on, it ran `uname -a` inside its VM and reported the Firecracker guest kernel. Asked to save a poem,
it wrote the file to `/data/workspace` and recalled it from memory on the next message.

## How it fits together

- A ~150-line Node server speaks Maritime's contract: `GET /health` and `POST /chat` on `$PORT`.
- Each chat message becomes a Claude Agent SDK `query()`: full Claude Code with bash and file tools, running
  unattended inside the VM.
- The workspace, Claude Code's session transcripts, and a conversation map all live under `/data`, so context
  survives restarts, redeploys, and sleep/wake.
- Each `conversation_id` resumes its own Claude Code session: real memory across messages, per conversation.

## Step 1: The server

The complete file, exactly as deployed. The only Maritime-specific parts are the three endpoints and the reply budget:
Maritime's gateway gives each delivery attempt 30 seconds, so when a task needs longer, the server says so within the
window, keeps the query running in the background, and delivers the finished answer as the reply to the conversation's
next message.

`server.js`:

```javascript
// Claude Code agent for Maritime: speaks the BYO agent contract (docs/BYO_AGENT.md).
//
//   GET  /health          -> 200 (readiness probe / health checker)
//   POST /chat            -> {"response": "..."} within the 30s delivery budget
//   GET  /                -> status JSON
//
// Every message runs through the Claude Agent SDK (Claude Code as a library):
// full tool use (bash, file edits, etc.) inside this VM, workspace persisted
// under /data, per-conversation session resume so context carries across
// messages and sleep/wake cycles.
//
// Long tasks and the 30s delivery budget: a query is never cancelled. If it
// outlives the reply budget, it keeps running in the background and the
// finished answer is delivered as the reply to the conversation's next
// message. Nothing is lost; slow work just spans two messages.

import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { query } from '@anthropic-ai/claude-agent-sdk'

const PORT = Number(process.env.PORT ?? 8080)
const MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5'
const EFFORT = process.env.CLAUDE_EFFORT || undefined
const MAX_TURNS = Number(process.env.MAX_TURNS ?? 12)
// Maritime's gateway gives each delivery attempt 30s; answer inside it.
const REPLY_BUDGET_MS = Number(process.env.REPLY_BUDGET_MS ?? 24000)

// /data survives restarts, redeploys, and sleep/wake; everything else is disposable.
const DATA_DIR = fs.existsSync('/data') ? '/data' : path.join(process.cwd(), 'data')
const WORKSPACE = path.join(DATA_DIR, 'workspace')
const SESSIONS_FILE = path.join(DATA_DIR, 'chat-sessions.json')
fs.mkdirSync(WORKSPACE, { recursive: true })
// Keep Claude Code's own state (session transcripts) on the volume too, so
// `resume` still works after the container is recreated.
process.env.CLAUDE_CONFIG_DIR ||= path.join(DATA_DIR, '.claude')

let sessions = {}
try { sessions = JSON.parse(fs.readFileSync(SESSIONS_FILE, 'utf8')) } catch {}
const saveSessions = () => {
  try { fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions)) } catch {}
}

// Per-conversation delivery state: at most one query runs at a time, and a
// reply that finished after its delivery window waits here for the next
// message. In-memory only; a restart drops a pending reply but the session
// transcript on /data still has the work.
const conversations = new Map() // id -> { running: Promise|null, stashed: string|null }
const convoState = (id) => {
  let s = conversations.get(id)
  if (!s) { s = { running: null, stashed: null }; conversations.set(id, s) }
  return s
}

async function runQuery(message, conversationId) {
  const options = {
    cwd: WORKSPACE,
    model: MODEL,
    permissionMode: 'bypassPermissions',
    maxTurns: MAX_TURNS,
  }
  if (EFFORT) options.effort = EFFORT
  const priorSession = sessions[conversationId]
  if (priorSession) options.resume = priorSession

  let streamedText = ''
  let resultText = null
  let sessionId = priorSession ?? null

  for await (const msg of query({ prompt: message, options })) {
    if (msg.type === 'system' && msg.subtype === 'init') {
      sessionId = msg.session_id
    } else if (msg.type === 'assistant') {
      for (const block of msg.message?.content ?? []) {
        if (block.type === 'text' && block.text) streamedText += block.text + '\n'
      }
    } else if (msg.type === 'result') {
      sessionId = msg.session_id ?? sessionId
      if (msg.subtype === 'success' && typeof msg.result === 'string') {
        resultText = msg.result
      }
    }
  }

  if (sessionId) {
    sessions[conversationId] = sessionId
    saveSessions()
  }
  return (resultText ?? streamedText).trim() || 'Done.'
}

// A bad or missing API key must be said out loud: without this, every chat
// fails with an opaque error and the platform looks broken when the key is
// the problem. Set from warmup or any failed query; cleared by a restart
// (which is also how a fixed key takes effect).
let knownKeyProblem = null

function friendlyError(err) {
  const raw = String(err?.message ?? err)
  const t = raw.toLowerCase()
  if (!process.env.ANTHROPIC_API_KEY) {
    return "This agent has no ANTHROPIC_API_KEY set, so it cannot reach the model. Add one in the agent's Settings under Environment variables, then restart the agent."
  }
  if (t.includes('authenticat') || t.includes('invalid x-api-key') || t.includes('api key is invalid') || t.includes(' 401')) {
    return "Anthropic rejected this agent's API key (401), so I cannot reach the model. The key is mistyped, revoked, or expired. Update ANTHROPIC_API_KEY in the agent's Settings under Environment variables, restart the agent, and it will work. This is a key problem on the Anthropic side, not a Maritime outage."
  }
  if (t.includes('credit balance') || t.includes('insufficient credit')) {
    return "The Anthropic account behind this agent's API key is out of credits, so the model refused the request. Top up at console.anthropic.com and try again."
  }
  return `Something went wrong running Claude Code: ${raw}`
}

function isKeyProblem(err) {
  const t = String(err?.message ?? err).toLowerCase()
  return t.includes('authenticat') || t.includes('invalid x-api-key') || t.includes('api key is invalid') || t.includes(' 401')
}

async function handleChat(message, conversationId) {
  if (!process.env.ANTHROPIC_API_KEY) return friendlyError(null)
  if (knownKeyProblem) return friendlyError(knownKeyProblem)

  const s = convoState(conversationId)

  // A previous slow task finished while the user was away: deliver it now.
  if (s.stashed) {
    const out = s.stashed
    s.stashed = null
    return out
  }
  if (s.running) {
    return "Still working on your last request. Message me again in a moment and I'll have the answer."
  }

  let deliveredInline = false
  const task = runQuery(message, conversationId)
  s.running = task
  task
    .then((reply) => { if (!deliveredInline) s.stashed = reply })
    .catch((err) => {
      console.error('query failed:', err)
      if (isKeyProblem(err)) knownKeyProblem = err
      if (!deliveredInline) s.stashed = friendlyError(err)
    })
    .finally(() => { if (s.running === task) s.running = null })

  const winner = await Promise.race([
    task.then((r) => ({ reply: r }), (err) => ({ error: err })),
    new Promise((resolve) => setTimeout(() => resolve('timeout'), REPLY_BUDGET_MS)),
  ])
  if (winner !== 'timeout') {
    deliveredInline = true
    s.stashed = null
    if ('error' in winner) {
      if (isKeyProblem(winner.error)) knownKeyProblem = winner.error
      return friendlyError(winner.error)
    }
    return winner.reply
  }
  return "I'm on it. This needs more than a few seconds; message me again shortly and I'll have your answer ready."
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => { data += c; if (data.length > 1_000_000) req.destroy() })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const send = (code, obj) => {
    res.writeHead(code, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(obj))
  }

  if (req.method === 'GET' && (url.pathname === '/health' || url.pathname === '/healthz')) {
    return send(200, { ok: true })
  }
  if (req.method === 'GET' && url.pathname === '/') {
    return send(200, {
      agent: 'claude-code',
      model: MODEL,
      runtime: '@anthropic-ai/claude-agent-sdk',
      workspace: WORKSPACE,
      conversations: Object.keys(sessions).length,
    })
  }
  if (req.method === 'POST' && url.pathname === '/chat') {
    let payload
    try { payload = JSON.parse(await readBody(req) || '{}') } catch { return send(400, { error: 'invalid JSON' }) }
    const message = typeof payload.message === 'string' ? payload.message.trim() : ''
    if (!message) return send(400, { error: 'message is required' })
    const conversationId = payload.conversation_id || payload.conversationId || 'default'
    try {
      return send(200, { response: await handleChat(message, conversationId) })
    } catch (err) {
      console.error('chat failed:', err)
      return send(200, { response: `Something went wrong running Claude Code: ${err?.message ?? err}` })
    }
  }
  return send(404, { error: 'not found' })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`claude-code agent listening on 0.0.0.0:${PORT} (model=${MODEL}, workspace=${WORKSPACE})`)
})

// Boot sequence: verify the key with a free call (GET /v1/models answers in
// under a second and costs nothing), then warm the first real reply. The CLI
// retries auth failures for minutes, so without the preflight a bad key
// means a long silence before any explanation; with it, the very first chat
// gets the clear message instantly.
async function checkKey() {
  if (!process.env.ANTHROPIC_API_KEY) return false
  try {
    const res = await fetch('https://api.anthropic.com/v1/models', {
      headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    })
    if (res.status === 401 || res.status === 403) {
      knownKeyProblem = new Error(`key preflight: ${res.status} api key is invalid`)
      console.log('key check failed:', res.status)
      return false
    }
    console.log('key check ok')
    return true
  } catch (err) {
    // Network hiccup, not a key verdict; leave the key presumed good.
    console.log('key check skipped:', err?.message ?? err)
    return true
  }
}

;(async () => {
  const keyOk = await checkKey()
  if (!keyOk || process.env.WARMUP === '0') return
  // Warm the first real reply: spawning the CLI, resolving DNS, and the TLS
  // handshake to the Anthropic API all pay first-use costs inside a fresh VM.
  try {
    const warm = query({
      prompt: 'Reply with exactly: ok',
      options: { cwd: WORKSPACE, model: MODEL, maxTurns: 1, permissionMode: 'bypassPermissions', persistSession: false },
    })
    for await (const _ of warm) { /* drain */ }
    console.log('warmup complete')
  } catch (err) {
    if (isKeyProblem(err)) knownKeyProblem = err
    console.log('warmup skipped:', err?.message ?? err)
  }
})()
```

## Step 2: Package and Dockerfile

`package.json`:

```json
{
  "name": "claude-code-agent",
  "version": "1.0.0",
  "description": "Claude Code agent (Claude Agent SDK) speaking Maritime's BYO agent contract",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "@anthropic-ai/claude-agent-sdk": "^0.3.226"
  }
}
```

`Dockerfile`:

```dockerfile
# Claude Code agent on Maritime (BYO contract). The Agent SDK ships the
# Claude Code CLI as a platform-specific native dependency, so npm install
# must run inside this (linux) build, never copied in from a host.
FROM node:22-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates curl ripgrep procps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY server.js ./

ENV NODE_ENV=production \
    DISABLE_AUTOUPDATER=1 \
    CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

EXPOSE 8080
CMD ["node", "server.js"]
```

## Step 3: Deploy

Zip the three files and deploy them as a `custom`-framework agent. In the dashboard:
**New agent → GitHub → Upload a ZIP**, add the two environment variables below, done. Or from the terminal with an
[API key](https://maritime.sh/docs/sdk/authentication):

```
zip app.zip Dockerfile package.json server.js

# 1. Upload the source (returns an s3Key)
curl -X POST https://api.maritime.sh/api/upload/zip \
  -H "Authorization: Bearer $MARITIME_API_KEY" \
  -F "file=@app.zip"

# 2. Create the agent from it
curl -X POST https://api.maritime.sh/api/agents \
  -H "Authorization: Bearer $MARITIME_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "claude-code",
    "framework": "custom",
    "uploadS3Key": "<s3Key from step 1>",
    "hasWebUi": false,
    "initialEnvVars": [
      {"key": "ANTHROPIC_API_KEY", "value": "sk-ant-...", "isSecret": true},
      {"key": "IS_SANDBOX", "value": "1", "isSecret": false}
    ]
  }'
```

Maritime builds the image, places the agent on a micro-VM host, and auto-deploys. The build takes two or three
minutes; the agent flips to **active** when it's ready.

> **Note:** **IS_SANDBOX=1 is not optional**
>
> Agent containers run as root, and Claude Code refuses to run with `bypassPermissions` under root unless
> `IS_SANDBOX=1` tells it the environment is a disposable sandbox. Without it, every chat fails with
> "--dangerously-skip-permissions cannot be used with root/sudo privileges". An isolated Maritime micro-VM is exactly
> the sandbox that flag was made for. If you forget it, add the env var on the agent's page and restart.

## Step 4: Talk to it

Chat from the agent's page in the dashboard, from the [CLI](https://maritime.sh/docs/cli), or over the
[API](https://maritime.sh/docs/api). Replies come back in seconds; the agent runs real commands before answering.

```
maritime chat claude-code "Clone the repo I gave you yesterday and run its tests"

# or raw HTTP
curl -X POST https://api.maritime.sh/api/agents/<agent-id>/chat \
  -H "Authorization: Bearer $MARITIME_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message": "What files are in your workspace?", "conversation_id": "me"}'
```

Everything else in Maritime now applies to Claude Code for free:
[Telegram and email channels](https://maritime.sh/docs/channels),
[cron and webhook triggers](https://maritime.sh/docs/triggers), sleep/wake, and the
[SDK](https://maritime.sh/docs/build) if you want to provision one Claude Code agent per customer.

## How it reaches the model

The Claude Agent SDK reads `ANTHROPIC_API_KEY` from the environment and talks to `api.anthropic.com` directly;
agent VMs have normal outbound network access. You bring your own Anthropic key, stored as a secret environment
variable (encrypted at rest, injected only into your agent's VM), and model usage bills to your Anthropic account.
Maritime's [metered LLM proxy](https://maritime.sh/docs/billing#ai-credits) speaks the OpenAI API format, so Claude
Code does not route through it. Pick the model with `CLAUDE_MODEL` (default `claude-opus-5`). The server verifies
the key at boot with a free API call, so a mistyped or revoked key is reported plainly in chat, with the fix, instead
of surfacing as a cryptic failure.

## Keep in mind

- **IS_SANDBOX=1**, as above. The most common failure mode.
- **Build on Linux.** The Agent SDK ships the Claude Code CLI as a platform-specific native package. `npm install`
  must run inside the Docker build; never COPY a host `node_modules` into the image.
- **Bind $PORT.** Maritime injects `PORT=18789`. Hardcode 8080 and the VM boot-loops; that port is already taken
  inside the micro-VM.
- **Exec-form CMD.** Use `CMD ["node", "server.js"]`, not a shell string; shell-form CMDs break under the micro-VM
  init.
- **Respect the 30s reply budget.** Claude Code tasks can run for minutes; the server never cancels them. A long task
  keeps running in the background and its answer arrives as the reply to your next message.
- **Keep Claude Code's state on /data.** Setting `CLAUDE_CONFIG_DIR=/data/.claude` means session transcripts survive
  container recreation, which is what makes cross-restart memory work.

For the general contract this agent implements (any language, any framework), see
[Bring Your Own Framework](https://maritime.sh/docs/frameworks/custom). For the story of building and shipping this
exact agent, read the [blog post](https://maritime.sh/blog/running-claude-code-on-maritime).
