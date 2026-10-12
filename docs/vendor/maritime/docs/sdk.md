> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk

# SDK Reference

Complete reference for both Maritime SDKs. New here? Start with the
[Build on Maritime](https://maritime.sh/docs/build) guide.

| Language | Package | Install |
| --- | --- | --- |
| TypeScript / JS | `maritime-sdk` | `npm install maritime-sdk` |
| Python | `maritime` | `pip install maritime` |

Both are zero-dependency. Source: [github.com/maritime-sh/maritime-sdk](https://github.com/maritime-sh/maritime-sdk).

## Client

The API key defaults to `MARITIME_API_KEY`; the base URL to `MARITIME_API_URL` or `api.maritime.sh`.

### TypeScript

```typescript
import { Maritime } from 'maritime-sdk'

const maritime = new Maritime({
  apiKey: 'mk_...',                     // or MARITIME_API_KEY
  baseUrl: 'https://api.maritime.sh',   // or MARITIME_API_URL
  timeout: 60_000,                      // per-request ms
  maxRetries: 2,                        // network + 5xx/429
})
```

### Python

```python
from maritime import Maritime

client = Maritime(
    api_key="mk_...",                   # or MARITIME_API_KEY
    base_url="https://api.maritime.sh", # or MARITIME_API_URL
    timeout=60.0,                       # per-request seconds
    max_retries=2,                      # network + 5xx/429
)
```

Retries are safe by construction: `GET`/`DELETE` retry on any transient failure; writes retry only on network
errors and `429`/`503` (never a `5xx` that might have applied).

## Agents

Access via `maritime.agents` (TS) / `client.agents` (Python).

| Method | Does |
| --- | --- |
| `create(params)` | Create an agent and start its deploy. Prefer `template`: a bare framework yields a broken image. |
| `provision({externalId, …})` | Idempotent get-or-create by `externalId`. The recommended per-customer entry point. |
| `get(id)` | Fetch one agent. |
| `list({externalId?, name?})` | List agents, optionally filtered. |
| `chat(id, message, opts?)` | Send a message, wait for the reply. Auto-wakes a sleeping agent. |
| `start / stop / sleep / restart(id)` | Lifecycle transitions. |
| `setEnv(id, key, value, {secret})` | Upsert an env var (secrets encrypted at rest). |
| `listEnv(id) / deleteEnv(id, key)` | Read / remove env vars. |
| `reloadEnv(id)` | Push env changes into the running container. |
| `logs(id, {limit?, level?})` | Recent log entries. |
| `delete(id)` | Tear down the agent (container + volume + network). |

**create / provision parameters**

| Param | Type | Notes |
| --- | --- | --- |
| `name` | `string` | Unique per account. Required. |
| `template` | `string` | openclaw · zeroclaw · hermes · claude_code · dsh · … (see [frameworks](https://maritime.sh/docs/frameworks)) |
| `externalId` | `string` | Your own id for this agent. Filterable; idempotency key for `provision`. |
| `instructions` | `string` | Plain-English persona / system prompt. |
| `env` | `{key,value,secret}[]` | Seed env vars. Secrets encrypted at rest. |
| `idleTtlSeconds` | `number` | Idle seconds before auto-sleep. 0 = always-on. |

### TypeScript

```typescript
// Idempotent per-customer provisioning (recommended)
const agent = await maritime.agents.provision({
  externalId: `customer_${userId}`,
  name: `assistant-${userId}`,
  template: 'openclaw',
})

const { response } = await maritime.agents.chat(agent.id, 'Hello')
await maritime.agents.setEnv(agent.id, 'STRIPE_KEY', 'sk_live_...', { secret: true })
const { root } = await maritime.agents.files.list(agent.id)   // browse / upload / download
await maritime.agents.exec(agent.id, ['ls', '-la', root])     // one-shot shell command
await maritime.agents.sleep(agent.id)
await maritime.agents.delete(agent.id)
```

### Python

```python
# Idempotent per-customer provisioning (recommended)
agent = client.agents.provision(
    external_id=f"customer_{user_id}",
    name=f"assistant-{user_id}",
    template="openclaw",
)

reply = client.agents.chat(agent["id"], "Hello")["response"]
client.agents.set_env(agent["id"], "STRIPE_KEY", "sk_live_...", secret=True)
root = client.agents.files.list(agent["id"])["root"]        # browse / upload / download
client.agents.exec(agent["id"], ["ls", "-la", root])        # one-shot shell command
client.agents.sleep(agent["id"])
client.agents.delete(agent["id"])
```

Exec waits by default. See [command execution](https://maritime.sh/docs/sdk/agents#exec) for detached Python submission, REST retrieval and cancellation, and timeout defaults.

## Keys

Mint scoped API keys programmatically. Minting requires the caller's key to carry the `manage` scope.

| Method | Does |
| --- | --- |
| `create({name, scopes?, expiresInDays?})` | Mint a key. The raw key is returned once. |
| `list()` | List your keys (raw values never returned again). |
| `revoke(id)` | Revoke a key. |

### TypeScript

```typescript
const worker = await maritime.keys.create({ name: 'chat-worker', scopes: ['deploy'] })
// worker.rawKey is shown once. Store it now.
```

### Python

```python
worker = client.keys.create("chat-worker", scopes=["deploy"])
# worker["raw_key"] is shown once. Store it now.
```

## Webhooks

Receive signed lifecycle events instead of polling. See the
[webhooks guide](https://maritime.sh/docs/sdk/webhooks) for signature verification.

| Method | Does |
| --- | --- |
| `create({url, events?})` | Subscribe a URL. Returns the signing `secret` once. |
| `list()` | List subscriptions. |
| `test(id)` | Deliver a synthetic ping. |
| `delete(id)` | Remove a subscription. |

Events: `agent.deployed · agent.error · agent.sleeping · agent.woken · agent.restarted · agent.stopped`.

## Errors

Every failure is a subclass of `MaritimeError`. API errors expose `.status` and `.detail`.

| Class | When |
| --- | --- |
| `MaritimeAuthError` | 401 / 403: bad or under-scoped key |
| `MaritimePaymentRequiredError` | 402: plan limit reached, or an add-on needs a paid plan |
| `MaritimeNotFoundError` | 404: no such agent (or not yours) |
| `MaritimeConflictError` | 409: name already taken |
| `MaritimeRateLimitError` | 429: rate limited |
| `MaritimeAPIError` | any other non-2xx |
| `MaritimeConnectionError` | never reached Maritime (network / timeout) |

```python
from maritime import MaritimeAPIError

try:
    client.agents.get("nope")
except MaritimeAPIError as err:
    print(err.status, err.detail, err.request_id)
```

### See also

The [Build on Maritime](https://maritime.sh/docs/build) guide (visual walkthrough), the raw
[REST API](https://maritime.sh/docs/api), and the [CLI](https://maritime.sh/docs/cli).
