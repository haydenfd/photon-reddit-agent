> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk/agents

# Agents

Everything you do to a customer's agent (create it, talk to it, configure it, and clean it up) is a method on
`maritime.agents`.

## Provision (get-or-create)

`provision` is idempotent on `externalId`: first call creates the agent, later calls return the same one. That
makes it safe to run on every sign-in: you never double-create, and you never have to store Maritime's agent id. Use
`create` instead if you want a hard failure when the name already exists.

### TypeScript

```typescript
const agent = await maritime.agents.provision({
  externalId: `customer_${user.id}`,
  name: `assistant-${user.id}`,
  template: 'openclaw',              // see /docs/frameworks
  instructions: 'You are a helpful assistant.',
  idleTtlSeconds: 3600,              // 0 = always-on
})
```

### Python

```python
agent = client.agents.provision(
    external_id=f"customer_{user.id}",
    name=f"assistant-{user.id}",
    template="openclaw",              # see /docs/frameworks
    instructions="You are a helpful assistant.",
    idle_ttl_seconds=3600,            # 0 = always-on
)
```

## Chat

Send a message and wait for the reply. Sleeping agents wake automatically. Pass a `conversationId` to keep a
thread. `chat` resolves with `{ response, error? }`. It does **not** throw on a delivery failure (a
still-deploying agent, an LLM error), so check `error`.

### TypeScript

```typescript
const { response, error } = await maritime.agents.chat(agent.id, 'What can you do?')
if (error) throw new Error(error)

// continue a thread:
await maritime.agents.chat(agent.id, 'And after that?', { conversationId: 'thread-1' })
```

### Python

```python
result = client.agents.chat(agent["id"], "What can you do?")
if result.get("error"):
    raise RuntimeError(result["error"])
reply = result["response"]

# continue a thread:
client.agents.chat(agent["id"], "And after that?", conversation_id="thread-1")
```

## Per-customer secrets & config

Give each customer's agent its own credentials and config as env vars. Secrets are encrypted at rest; changes reach a
running container after a reload.

### TypeScript

```typescript
await maritime.agents.setEnv(agent.id, 'ACME_API_KEY', user.acmeKey, { secret: true })
await maritime.agents.setEnv(agent.id, 'ACME_REGION', 'us-east', { secret: false })
await maritime.agents.reloadEnv(agent.id)   // push into the running container

// read them back (secret values come back masked):
for (const v of await maritime.agents.listEnv(agent.id)) {
  console.log(v.key, v.isSecret ? '(secret)' : v.value)
}
```

### Python

```python
client.agents.set_env(agent["id"], "ACME_API_KEY", user.acme_key, secret=True)
client.agents.set_env(agent["id"], "ACME_REGION", "us-east", secret=False)
client.agents.reload_env(agent["id"])   # push into the running container

# read them back (secret values come back masked):
for v in client.agents.list_env(agent["id"]):
    print(v["key"], "(secret)" if v.get("isSecret") else v["value"])
```

## Lifecycle, logs & teardown

Agents sleep and wake on their own, but you can drive the lifecycle directly. Find an agent by your own id, read its
logs, or tear it all down when a customer leaves.

### TypeScript

```typescript
const [agent] = await maritime.agents.list({ externalId: `customer_${user.id}` })

await maritime.agents.logs(agent.id, { limit: 100, level: 'error' })

await maritime.agents.sleep(agent.id)     // cheapest resting state
await maritime.agents.start(agent.id)     // wake it
await maritime.agents.restart(agent.id)

await maritime.agents.delete(agent.id)    // container + volume + network
```

### Python

```python
agent = client.agents.list(external_id=f"customer_{user.id}")[0]

client.agents.logs(agent["id"], limit=100, level="error")

client.agents.sleep(agent["id"])     # cheapest resting state
client.agents.start(agent["id"])     # wake it
client.agents.restart(agent["id"])

client.agents.delete(agent["id"])    # container + volume + network
```

## Files & commands

Requires SDK **0.8.0 or later** (`maritime-sdk` on npm, `maritime` on PyPI). On 0.7.x, call the underlying
[REST endpoints](https://maritime.sh/docs/api#files) directly.

`maritime.agents.files` moves bytes both ways and manages the agent's disk; `maritime.agents.exec` runs a one-shot
shell command. Browse and edit operations are scoped to the agent's persistent volume; take its mount from the
`root` that `list` reports rather than hardcoding `/data`. Every call here wakes a sleeping agent; transfers cap
at 100 MB per file. Uploading without `destDir` delivers the file as a chat attachment the agent is told about in
its current conversation.

### TypeScript

```typescript
const { root, entries } = await maritime.agents.files.list(agent.id)

await maritime.agents.files.upload(agent.id, {
  content: csvBytes,
  filename: 'report.csv',
  destDir: `${root}/inbox`,   // omit destDir to deliver as a chat attachment
})

await maritime.agents.files.write(agent.id, `${root}/notes.md`, '# notes')
const bytes = await maritime.agents.files.download(agent.id, `${root}/notes.md`)

await maritime.agents.files.mkdir(agent.id, `${root}/docs`)
await maritime.agents.files.move(agent.id, `${root}/notes.md`, `${root}/docs/notes.md`)
await maritime.agents.files.delete(agent.id, `${root}/docs/notes.md`)

const { exitCode, stdout } = await maritime.agents.exec(agent.id, ['ls', '-la', root])
```

### Python

```python
listing = client.agents.files.list(agent["id"])   # {path, root, entries}
root = listing["root"]

client.agents.files.upload(
    agent["id"], csv_bytes, "report.csv",
    dest_dir=f"{root}/inbox",   # omit dest_dir to deliver as a chat attachment
)

client.agents.files.write(agent["id"], f"{root}/notes.md", "# notes")
data = client.agents.files.download(agent["id"], f"{root}/notes.md")

client.agents.files.mkdir(agent["id"], f"{root}/docs")
client.agents.files.move(agent["id"], f"{root}/notes.md", f"{root}/docs/notes.md")
client.agents.files.delete(agent["id"], f"{root}/docs/notes.md")

result = client.agents.exec(agent["id"], ["ls", "-la", root])
result["exitCode"], result["stdout"]
```

Move raises a conflict (409) when the destination already exists, and move/delete answer 404 for a missing source, so
collisions surface as errors instead of silently doing nothing.

## Run commands with the SDK

Attached execution is the default. Omitting the execution timeout selects 60 seconds. Stdout and stderr are separate, and each returned stream is limited to 262,144 characters plus a truncation marker. On agents with detached support, every accepted command has an execution ID. Results are temporary and can be lost on restart or agent replacement.

The Python helper accepts `detached=True` and a positive `timeout` in seconds. Omitted timeout and `None` select 60 seconds when attached or 3,600 seconds when detached. If your installed SDK rejects `detached`, submit through the [REST API](https://maritime.sh/docs/api#exec).

```python
execution = client.agents.exec(
	agent["id"], ["sh", "-lc", "npm run build"],
	detached=True, timeout=600,
)
execution_id = execution["executionId"]
print(execution_id, execution["status"])
```

The Python and TypeScript SDKs do not provide named helpers for result retrieval or cancellation. Use `GET /api/agents/{agent_id}/exec/{execution_id}` to poll and `DELETE` on the same path to cancel. TypeScript's `agents.exec()` currently supports attached execution only, so use REST for detached submission as well. The [API reference](https://maritime.sh/docs/api#exec) includes all three requests and their response shapes.

The SDK client's request timeout is separate from the command's execution timeout. For a long attached call, set the client timeout above the execution timeout with room for agent wake-up. Python's client timeout is in seconds; TypeScript's is in milliseconds. Detached submission avoids waiting for completion within that request.

When detached execution is supported, disconnecting does not cancel commands in either mode. Repeating submission creates another execution, so do not resubmit solely because a response was lost. Some older agents support attached execution only, with a 120-second timeout cap, combined output in stdout, and no execution ID or status. Detached submission returns HTTP 501 with `unsupported: outdated vm. Please use a new agent.` Use a new agent for detached execution and retained results.

## Scheduled wakes (inside a custom agent)

A sleeping micro-VM's timers never fire, so an agent that must act on a schedule (daily digest, follow-up reminders)
publishes its schedule and lets Maritime be the alarm clock. These helpers run *inside* your agent image, not in your
backend: they read the credentials Maritime injects into every agent and are silent no-ops anywhere else, so they're
safe in local dev. Prefer `nextRunAt` (the next occurrence as your scheduler computed it); an entry with `prompt`
is delivered to your `POST /chat` right after the wake. No SDK? Serve `GET /schedules` returning the same array
and Maritime polls it.

### TypeScript

```typescript
import { observeScheduler, pushSchedules } from 'maritime-sdk'

// One line: every add/remove on your scheduler re-publishes the snapshot.
observeScheduler(myScheduler, {
  getSnapshot: (s) => s.jobs.map(j => ({ id: j.id, nextRunAt: j.next.toISOString() })),
})

// Or push explicitly. Send the FULL list; [] clears all synced wakes.
await pushSchedules([
  { id: 'digest', cron: '0 9 * * 1-5', tz: 'America/New_York', prompt: 'Send the digest' },
  { id: 'followup', nextRunAt: '2026-08-01T14:00:00Z' },
])
```

### Python

```python
from maritime import observe_scheduler, push_schedules

# One line: every add/remove on your scheduler re-publishes the snapshot.
observe_scheduler(
    my_scheduler,
    get_snapshot=lambda s: [
        {"id": j.id, "nextRunAt": j.next_run.isoformat()} for j in s.jobs()
    ],
)

# Or push explicitly. Send the FULL list; [] clears all synced wakes.
push_schedules([
    {"id": "digest", "cron": "0 9 * * 1-5", "tz": "America/New_York",
     "prompt": "Send the digest"},
    {"id": "followup", "nextRunAt": "2026-08-01T14:00:00Z"},
])
```

## Handling errors

Every failure is a typed subclass of `MaritimeError`. Catch the base to catch them all, or narrow by type.

### TypeScript

```typescript
import { MaritimeConflictError, MaritimePaymentRequiredError } from 'maritime-sdk'

try {
  await maritime.agents.create({ name: 'dupe', template: 'openclaw' })
} catch (err) {
  if (err instanceof MaritimeConflictError) {
    // 409: an agent with that name already exists
  } else if (err instanceof MaritimePaymentRequiredError) {
    // 402: plan limit reached, or an add-on needs a paid plan
  } else {
    throw err
  }
}
```

### Python

```python
from maritime import MaritimeConflictError, MaritimePaymentRequiredError

try:
    client.agents.create("dupe", template="openclaw")
except MaritimeConflictError:
    ...  # 409: an agent with that name already exists
except MaritimePaymentRequiredError:
    ...  # 402: plan limit reached, or an add-on needs a paid plan
```

The full error hierarchy (`MaritimeAuthError`, `MaritimeNotFoundError`, `MaritimeRateLimitError`,
`MaritimeConnectionError`) is in the [API reference](https://maritime.sh/docs/sdk).
