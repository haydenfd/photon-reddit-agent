> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk/webhooks

# Webhooks

Get notified when a customer's agent changes state, instead of polling. Subscribe a URL, and Maritime POSTs a signed
JSON body on every lifecycle event.

## Events

Each delivery carries the agent's `external_id`, so you route it to your own customer without a lookup.

| Event | Fires when |
| --- | --- |
| `agent.deployed` | the agent finished deploying and is ready |
| `agent.error` | the agent entered an error state |
| `agent.sleeping` | the agent auto-slept after going idle |
| `agent.woken` | a sleeping agent was woken |
| `agent.restarted` | the agent was restarted |
| `agent.stopped` | the agent was stopped |
| `agent.llm_limit_reached` | the agent reached its monthly AI spend limit |
| `message.reply` | an async API message got its reply |
| `message.failed` | an async API message failed |

## Subscribe

Create a subscription once, from the SDK below or from the dashboard under
[Settings → Webhooks](https://maritime.sh/settings/webhooks). The signing `secret` is returned once. Store it to
verify deliveries. Endpoints must be public `https://` URLs.

### TypeScript

```typescript
const hook = await maritime.webhooks.create({
  url: 'https://your-app.com/maritime/webhook',
  events: ['agent.error', 'agent.deployed'],   // omit for all events
})
// hook.secret is shown once. Store it to verify signatures.
await maritime.webhooks.test(hook.id)          // deliver a synthetic ping
```

### Python

```python
hook = client.webhooks.create(
    url="https://your-app.com/maritime/webhook",
    events=["agent.error", "agent.deployed"],   # omit for all events
)
# hook["secret"] is shown once. Store it to verify signatures.
client.webhooks.test(hook["id"])                # deliver a synthetic ping
```

## Verify the signature

Every delivery is signed. Verify the `X-Maritime-Signature` header (an HMAC-SHA256 of the *raw* body with your
secret) before trusting the payload. **Fail closed** if the secret is unset. Never verify against an empty key.

`your webhook handler`:

```typescript
import crypto from 'node:crypto'

const SECRET = process.env.MARITIME_WEBHOOK_SECRET
if (!SECRET) throw new Error('MARITIME_WEBHOOK_SECRET is required')

export async function POST(req: Request) {
  const raw = await req.text()  // exact bytes: the signature is over these
  const expected = 'sha256=' + crypto.createHmac('sha256', SECRET).update(raw).digest('hex')
  if (req.headers.get('x-maritime-signature') !== expected) {
    return new Response('bad signature', { status: 401 })
  }
  const event = JSON.parse(raw)
  // { event: 'agent.error', agent_id, external_id, timestamp, data: {...} }
  console.log(event.event, 'for your customer', event.external_id)
  return new Response('ok')
}
```

> **Note:** Deliveries are best-effort and carry `X-Maritime-Event` and `X-Maritime-Delivery` headers. An
> endpoint that fails repeatedly is auto-disabled; `maritime.webhooks.list()` shows which are disabled, and
> re-enabling happens in the dashboard under Settings → Webhooks.

### Runnable receivers

Full webhook receivers (Express + Flask) that verify the signature are in the
[examples](https://github.com/maritime-sh/maritime-sdk/tree/main/examples).
