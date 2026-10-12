> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk/authentication

# Authentication & scopes

The SDK authenticates with a Maritime API key (`mk_…`). It lives on *your* server and never touches a browser.

## Get a key

Mint one from the dashboard (**Settings → API keys**) or with `maritime keys create`. Set it as
`MARITIME_API_KEY` and both SDKs pick it up automatically.

*Screenshot: A default key is full-access; open Advanced to scope it down.*

## Scopes

Every key carries scopes. Hand a subsystem the *narrowest* key it needs. A leaked key can then only do what its scope
allows. `manage` is a wildcard.

| Scope | Grants |
| --- | --- |
| `provision` | create agents |
| `deploy` | start / stop / restart / sleep / chat |
| `secrets` | read / write env vars |
| `manage` | everything, incl. delete + key management (wildcard) |
| `computers` | the Computers product (MCP and /api/v1/computers); a key with only this scope reaches nothing else, and manage or full access reach Computers too |

## Mint a scoped key

A background worker that only chats to existing agents needs `deploy`, not `provision`, `secrets`, or
`manage`. Minting keys itself requires a `manage` key.

### TypeScript

```typescript
const worker = await maritime.keys.create({
  name: 'chat-worker',
  scopes: ['deploy'],   // chat/start/stop only
})
// worker.rawKey is shown once. Hand it to the worker as MARITIME_API_KEY.
```

### Python

```python
worker = client.keys.create("chat-worker", scopes=["deploy"])
# worker["raw_key"] is shown once. Hand it to the worker as MARITIME_API_KEY.
```

> **Note:** A key sent as a session token (dashboard) and an admin key are always full-access. Scope enforcement
> applies to user `mk_` keys, so restricted keys are genuinely restricted.
