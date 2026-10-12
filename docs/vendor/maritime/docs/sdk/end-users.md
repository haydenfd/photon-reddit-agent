> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk/end-users

# End users

An end user is one of **your** users, kept under the id you already hold for them. Their agents,
spend caps, delegated tokens and costs all hang off that one record, and the
[Users page](https://maritime.sh/users) in the dashboard shows the same list. Everything here is a
method on `maritime.endUsers` (TypeScript) or `client.end_users` (Python).

## Create or update

`upsert` is keyed on `externalId` (1 to 128 characters of letters, digits and `_ @ . : + -`). The first
call creates the end user, later calls update only the fields you pass, so it is safe to run on every
sign-in. `metadata` holds flat JSON values you want to see next to the user later; `tags` (at most
eight) are for filtering.

### TypeScript

```typescript
const endUser = await maritime.endUsers.upsert(`user_${user.id}`, {
  displayName: user.name,
  metadata: { plan: user.plan, region: 'eu' },
  tags: [user.plan],
})
```

### Python

```python
end_user = client.end_users.upsert(
    f"user_{user.id}",
    display_name=user.name,
    metadata={"plan": user.plan, "region": "eu"},
    tags=[user.plan],
)
```

## Give them an agent

`createAgent` creates the end user's agent exactly once: the first call creates it (and the end user,
if you skipped `upsert`), a repeat call returns the same agent. It takes the same options as
[agents.provision](https://maritime.sh/docs/sdk/agents#provision); leave `name` out and the external
id names the agent. `agents` lists everything the end user owns, in the full agent shape.

### TypeScript

```typescript
const agent = await maritime.endUsers.createAgent(`user_${user.id}`, {
  template: 'openclaw',
  instructions: "You are this customer's assistant.",
})
const owned = await maritime.endUsers.agents(`user_${user.id}`)   // [agent]
```

### Python

```python
agent = client.end_users.create_agent(
    f"user_{user.id}",
    template="openclaw",
    instructions="You are this customer's assistant.",
)
owned = client.end_users.agents(f"user_{user.id}")   # [agent]
```

Every agent call also accepts an `X-Maritime-End-User` header carrying an external id. With it,
`GET /api/agents` lists only that end user's agents and any other agent answers `404`, which keeps a
request made on behalf of one user from ever touching another's.

## Policy: caps and sizing

A policy caps what one end user can spend and sets how their agents are sized. `setPolicy` replaces
the whole policy and applies it to every agent the end user owns now (new agents get it on create).
`clearPolicy` removes it. When a cap is hit the agent sleeps and the `agent.llm_limit_reached` or
wake-gate webhook tells you; nothing is billed past the cap.

| Field | Caps or sets |
| --- | --- |
| `llm_spend_cap_cents_per_month` | AI spend this end user may use per calendar month, in cents |
| `compute_minutes_cap` | awake minutes per month across their agents |
| `wakes_per_hour` | how often their agents may be woken |
| `idle_sleep_seconds` | how long an agent stays awake with nothing to do |
| `mem_mb` | RAM for each of their agents |
| `vcpus` | CPU cores for each of their agents |
| `disk_gb` | persistent disk for each of their agents |

### TypeScript

```typescript
const { appliedToAgents } = await maritime.endUsers.setPolicy(`user_${user.id}`, {
  llmSpendCapCentsPerMonth: 500,   // $5 of AI per month
  wakesPerHour: 60,
  idleSleepSeconds: 600,
})
await maritime.endUsers.getPolicy(`user_${user.id}`)     // { policy, appliedToAgents }
await maritime.endUsers.clearPolicy(`user_${user.id}`)   // account defaults again
```

### Python

```python
result = client.end_users.set_policy(f"user_{user.id}", {
    "llm_spend_cap_cents_per_month": 500,   # $5 of AI per month
    "wakes_per_hour": 60,
    "idle_sleep_seconds": 600,
})
client.end_users.get_policy(f"user_{user.id}")     # {"policy": {...}, "appliedToAgents": n}
client.end_users.clear_policy(f"user_{user.id}")   # back to your account defaults
```

## Delegated tokens for their browser

Your `mk_` key never leaves your server. When the end user's own browser or app should talk to their
agent directly, mint a short-lived `eu_` token from your backend and hand it over. It opens that one
agent only, with the scopes you choose, until it expires (30 to 3600 seconds, default 900).
`revokeTokens` cuts every token the end user holds at once.

| Scope | Opens |
| --- | --- |
| `chat` | POST /chat on the agent |
| `files` | the files routes (list, download, upload, write, move, delete) |
| `console` | the terminal and desktop websockets, and POST /exec |
| `logs` | GET /logs and the logs websocket |
| `app` | the agent's own web UI under /ui |

### TypeScript

```typescript
// your backend, on page load:
const { token, agentId, expiresAt } = await maritime.endUsers.mintToken(`user_${user.id}`, {
  scopes: ['chat', 'files'],
  ttlSeconds: 900,
})

// the end user's browser, with only the eu_ token:
await fetch(`https://api.maritime.sh/api/agents/${agentId}/chat`, {
  method: 'POST',
  headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'hello' }),
})
// websockets take it as ?token=eu_...
```

### Python

```python
# your backend, on page load:
minted = client.end_users.mint_token(
    f"user_{user.id}", scopes=["chat", "files"], ttl_seconds=900
)
# hand minted["token"] and minted["agentId"] to the browser; it calls
# POST https://api.maritime.sh/api/agents/{agentId}/chat with
# Authorization: Bearer eu_... (websockets take ?token=eu_...)

client.end_users.revoke_tokens(f"user_{user.id}")   # sign them out everywhere
```

## Suspend, resume, delete

`suspend` puts the end user's agents to sleep and refuses every wake, message and spend until
`resume`; use it for an unpaid invoice or an abuse report. `delete` removes the end user with their
agents, tokens and policy; it returns at once and the cleanup finishes in the background. Each step
fires a webhook (`end_user.suspended`, `end_user.resumed`, `end_user.deleted`).

### TypeScript

```typescript
await maritime.endUsers.suspend(`user_${user.id}`)   // status: 'suspended'
await maritime.endUsers.resume(`user_${user.id}`)    // status: 'active'
await maritime.endUsers.delete(`user_${user.id}`)    // agents and tokens go with it
```

### Python

```python
client.end_users.suspend(f"user_{user.id}")   # status: "suspended"
client.end_users.resume(f"user_{user.id}")    # status: "active"
client.end_users.delete(f"user_{user.id}")    # agents and tokens go with it
```

## Webhooks know the end user

Every [webhook delivery](https://maritime.sh/docs/sdk/webhooks) about an end user's agent carries an
`end_user` object (its Maritime id and your external id) next to the agent, so your receiver
routes on your own id without a lookup. Events about an agent you own yourself carry
`end_user: null`.

```json
{
  "event": "agent.sleeping",
  "agent_id": "a1b2c3",
  "external_id": "user_42",
  "end_user": { "externalId": "user_42", "displayName": "Ada", "tags": ["pro"], "status": "active" }
}
```

## Usage and rebilling

The usage report lists every agent with its awake minutes, hosting cost and AI cost over a range,
and each row names its `externalUserId`. Group on it and you have a per-user invoice. Under a seat
plan the hosting cost is your plan price allocated over your agents day by day
(`hostingBasis: "allocated"`); AI cost is always the real spend from your credits. The daily series
gives the same numbers by day; the [Usage page](https://maritime.sh/usage) draws both.

### TypeScript

```typescript
const report = await maritime.billing.usage({ from: '2026-09-01', to: '2026-10-01' })
const byUser = new Map<string, number>()
for (const row of report.agents) {
  const key = row.externalUserId ?? 'you'
  byUser.set(key, (byUser.get(key) ?? 0) + row.totalCostCents)
}

const daily = await maritime.billing.usageDaily({ from: '2026-09-01', to: '2026-10-01' })
```

### Python

```python
report = client.billing.usage(from_="2026-09-01", to="2026-10-01")
by_user: dict[str, float] = {}
for row in report["agents"]:
    key = row["externalUserId"] or "you"
    by_user[key] = by_user.get(key, 0) + row["totalCostCents"]

daily = client.billing.usage_daily(from_="2026-09-01", to="2026-10-01")
```

## From the CLI

The same operations are one command away for support work and scripts. Every command takes `--json`.

```
maritime users list --tag pro
maritime users get user_42
maritime users create user_42 --template openclaw      # the end user's agent, exactly once
maritime users policy set user_42 --llm-cap-cents 500 --wakes-per-hour 60
maritime users token user_42 --scopes chat,files --ttl 900
maritime users suspend user_42 · resume · delete --yes
maritime usage --days 30 --by-user
```
