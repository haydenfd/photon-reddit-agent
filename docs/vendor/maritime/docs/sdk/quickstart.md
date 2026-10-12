> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk/quickstart

# Quickstart

From nothing to a live, per-customer agent in five minutes. Everything runs on *your* backend. Your API key never
touches a browser.

## 1. Install

### TypeScript

```bash
npm install maritime-sdk
```

### Python

```bash
pip install maritime
```

Zero dependencies. TypeScript needs Node 18+ (or Bun / Deno / edge); Python needs 3.9+.

## 2. Get an API key

Mint a key from the dashboard (**Settings → API keys**) or with `maritime keys create`. A default key is
full-access; use **Advanced** to scope it down (see
[Authentication](https://maritime.sh/docs/sdk/authentication)).

*Screenshot: Settings → API keys. Store the key as MARITIME_API_KEY in your backend.*

> **Note:** Both SDKs read `MARITIME_API_KEY` from the environment automatically, or you can pass it explicitly:
> `new Maritime({ apiKey })` / `Maritime(api_key=...)`.

## 3. Provision an agent per customer

Tag each agent with your own id via `externalId`. `provision` is **idempotent** on it: it returns the existing
agent if there is one, else creates a new one. Safe to call on every sign-in.

`when your user signs up`:

### TypeScript

```typescript
import { Maritime } from 'maritime-sdk'

const maritime = new Maritime({ apiKey: process.env.MARITIME_API_KEY })

const agent = await maritime.agents.provision({
  externalId: `customer_${user.id}`,   // your id for this agent
  name: `assistant-${user.id}`,
  template: 'openclaw',
  instructions: 'You are a helpful assistant for ' + user.name + '.',
})
```

### Python

```python
from maritime import Maritime

client = Maritime()  # reads MARITIME_API_KEY

agent = client.agents.provision(
    external_id=f"customer_{user.id}",   # your id for this agent
    name=f"assistant-{user.id}",
    template="openclaw",
    instructions=f"You are a helpful assistant for {user.name}.",
)
```

That agent is now live on Maritime's infrastructure, and it shows up in your dashboard like any other, so you can
watch, debug, or take over any customer's agent:

*Screenshot: Every agent you provision is a real, inspectable micro-VM in your dashboard.*

## 4. Talk to it

A freshly-provisioned agent boots in the background; a returning user's agent is already warm. Sleeping agents wake
automatically, and the call waits for the reply.

### TypeScript

```typescript
const { response } = await maritime.agents.chat(agent.id, 'What can you do?')

// continue a thread:
await maritime.agents.chat(agent.id, 'And after that?', { conversationId: 'thread-1' })
```

### Python

```python
reply = client.agents.chat(agent["id"], "What can you do?")["response"]

# continue a thread:
client.agents.chat(agent["id"], "And after that?", conversation_id="thread-1")
```

## Put it together

A single request handler that gives a user their agent and relays a message:

### Next.js

```typescript
import { Maritime } from 'maritime-sdk'

const maritime = new Maritime({ apiKey: process.env.MARITIME_API_KEY })

export async function POST(req: Request) {
  const { userId, message } = await req.json()

  const agent = await maritime.agents.provision({
    externalId: `customer_${userId}`,
    name: `assistant-${userId}`,
    template: 'openclaw',
  })

  const { response } = await maritime.agents.chat(agent.id, message)
  return Response.json({ reply: response })
}
```

### FastAPI

```python
from fastapi import FastAPI
from maritime import Maritime

app = FastAPI()
client = Maritime()  # reads MARITIME_API_KEY

@app.post("/assistant")
def assistant(user_id: str, message: str):
    agent = client.agents.provision(
        external_id=f"customer_{user_id}",
        name=f"assistant-{user_id}",
        template="openclaw",
    )
    reply = client.agents.chat(agent["id"], message)["response"]
    return {"reply": reply}
```

- [Agents →](https://maritime.sh/docs/sdk/agents): Provision, chat, configure, lifecycle
- [Webhooks →](https://maritime.sh/docs/sdk/webhooks): Get notified on lifecycle events
- [Examples →](https://maritime.sh/docs/sdk/examples): Runnable files on GitHub
