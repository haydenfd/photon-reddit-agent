> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/api

# REST API

RESTful API for managing agents programmatically.

> **Note:** **Which API do I want?**
>
> - **Building a product on Maritime?** Use the [SDK](https://maritime.sh/docs/build)
>   (TypeScript/Python); see the SDK reference for supported helpers.
> - **Driving your own agents over HTTP?** This page: Bearer auth with an `mk_` key.

Base URL: `https://api.maritime.sh`

Check it's alive (no auth needed):

```
GET /health
```

```
curl https://api.maritime.sh/health
# response includes {"status":"ok","runtime":"fleet"}
```

## Authentication

Mint a personal API key with `maritime keys create` and send it as a Bearer token, the same token
the CLI itself uses. Every authenticated endpoint on this page accepts it.

```
curl -H "Authorization: Bearer mk_xxxxxxxxxxxx" \
  https://api.maritime.sh/api/agents
```

## Templates

List available agent templates. Public, no auth.

```
GET /api/templates
```

*Run it (web page only): GET /api/templates, public: works signed out.*

## Agents

```
GET /api/agents
```

*Run it (web page only): GET /api/agents, lists YOUR agents via your dashboard session (the raw
API returns a bare array).*

```
POST /api/agents
```

Create returns `201` and starts deploying immediately. Always pass `templateId` (see
`GET /api/templates`).

POST /api/agents (body):

```json
{
  "name": "my-agent",
  "templateId": "openclaw"
}
```

```
GET /api/agents/{agent_id}
```

```
DELETE /api/agents/{agent_id}
```

Delete returns `204` and removes the container and its data volume.

## Chat with an agent

Sends a message through the same delivery path Telegram and webhooks use. Sleeping serverless
agents **wake automatically**; the call waits for the reply.

```
POST /api/agents/{agent_id}/chat
```

```
curl -X POST https://api.maritime.sh/api/agents/AGENT_ID/chat \
  -H "Authorization: Bearer mk_xxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"message": "summarize today"}'

# → { "response": "..." }
# Optional: pass "conversation_id" to continue a thread.
```

## Lifecycle

Rarely needed (agents sleep and wake on their own), but available for ops:

```
POST /api/agents/{agent_id}/start
```

```
POST /api/agents/{agent_id}/stop
```

```
POST /api/agents/{agent_id}/sleep
```

```
POST /api/agents/{agent_id}/restart
```

## Logs

```
GET /api/agents/{agent_id}/logs
```

```
curl -H "Authorization: Bearer mk_xxxxxxxxxxxx" \
  "https://api.maritime.sh/api/agents/AGENT_ID/logs?limit=100&level=error"
```

## Files

Move files in and out of a running agent's sandbox and manage its disk. Browse, write, and
organize operations are scoped to the agent's persistent volume; the response of `list` reports
that volume's mount as `root` (`/data` for most templates), so don't hardcode it. Download accepts
any absolute in-container path, since agents also produce files in `/tmp` and workspace
directories. Any file call **wakes a sleeping agent**; transfers are capped at 100 MB per file.

```
GET /api/agents/{agent_id}/files/list?path=/data
```

```
GET /api/agents/{agent_id}/files/download?path=/data/report.pdf
```

```
POST /api/agents/{agent_id}/files/upload
```

Upload is multipart (`file` field). With a `dest_dir` form field the file lands in that exact
volume directory; without it, it's delivered as a chat attachment: the file lands in the agent's
inbox and the agent is notified in its current conversation (an optional `message` field rides
along).

```
PUT /api/agents/{agent_id}/files/write
```

```
POST /api/agents/{agent_id}/files/mkdir
```

```
POST /api/agents/{agent_id}/files/move
```

```
DELETE /api/agents/{agent_id}/files/delete?path=/data/old
```

`write` takes `{"path", "content"}` (UTF-8 text); `move` takes `{"from", "to"}` and answers
`409` if the destination exists and `404` if the source doesn't; delete of a missing path is
`404`, and deleting the volume root is refused.

```
curl -H "Authorization: Bearer mk_xxxxxxxxxxxx" \
  "https://api.maritime.sh/api/agents/AGENT_ID/files/list"
# → { "path": "/data", "root": "/data",
#     "entries": [{ "name": "notes.md", "isDir": false, "size": 182, "mtime": 1723900000 }] }

curl -X POST https://api.maritime.sh/api/agents/AGENT_ID/files/upload \
  -H "Authorization: Bearer mk_xxxxxxxxxxxx" \
  -F "file=@report.csv" -F "dest_dir=/data/inbox"
# → { "ok": true, "path": "/data/inbox/report.csv", "name": "report.csv", "size": 5321 }
```

> **Note:** These endpoints operate on the running agent's disk and never execute what you upload.

## Run a command

Run a non-interactive command in your agent. Submission wakes a sleeping agent. The behavior below applies to agents that support detached execution. Older agents can still run attached commands; see the compatibility note below. All three exec endpoints require a bearer key with the `deploy` scope.

```http
POST /api/agents/{agent_id}/exec
```

`command` is a nonempty shell string or a nonempty array of string arguments. Array arguments are shell-quoted by the server.

`detached` is a boolean that defaults to `false`. Attached submission waits for completion or the execution timeout and returns HTTP 200. Detached submission returns HTTP 202 once accepted, with an `executionId` and a `Location` header for retrieval. A very short command can already be complete when its detached submission returns.

`timeout` is a positive finite number of seconds. Omission and `null` both select the default, 60 seconds when attached or 3,600 seconds when detached. Explicit values can exceed 120 seconds. There is no unlimited-timeout value. This is the command's execution limit, separate from your HTTP client's request timeout.

```bash
curl -X POST https://api.maritime.sh/api/agents/AGENT_ID/exec \
	-H "Authorization: Bearer $MARITIME_API_KEY" \
	-H "Content-Type: application/json" \
	-d '{"command": ["printf", "hello\n"], "timeout": 30}'
```

```json
{"executionId":"EXECUTION_ID","status":"completed","exitCode":0,"stdout":"hello\n","stderr":""}
```

Every accepted execution gets an ID, including attached commands. Disconnecting or reaching your client's request timeout does not cancel execution. Use detached submission for long commands so you receive the ID before waiting for completion. Repeating a POST creates another execution. A lost submission response does not prove the command failed to start, so do not blindly resubmit it.

### Detached submission

```bash
curl -i -X POST https://api.maritime.sh/api/agents/AGENT_ID/exec \
	-H "Authorization: Bearer $MARITIME_API_KEY" \
	-H "Content-Type: application/json" \
	-d '{"command": "npm run build", "detached": true, "timeout": 600}'
```

```http
HTTP/1.1 202 Accepted
Location: /api/agents/AGENT_ID/exec/EXECUTION_ID
Content-Type: application/json

{"executionId":"EXECUTION_ID","status":"running"}
```

### Retrieve an execution

```http
GET /api/agents/{agent_id}/exec/{execution_id}
```

```bash
curl -H "Authorization: Bearer $MARITIME_API_KEY" \
	https://api.maritime.sh/api/agents/AGENT_ID/exec/EXECUTION_ID
```

Retrieval returns HTTP 200. A `running` response contains only `executionId` and `status`. Terminal responses also contain `exitCode`, `stdout`, and `stderr`. Terminal statuses are `completed`, `timed_out`, `cancelled`, and `failed`. A completed command can have a nonzero exit code. Timeout and successful cancellation use exit code -1 and retain captured partial output.

Stdout and stderr are separate. Each returned stream retains its last 262,144 characters, prefixed with [output truncated] and a newline when truncated. Results are temporary and can be lost on restart or agent replacement. Save output you need to keep. Polling returns the retained result without rerunning the command. An unknown or expired execution ID returns HTTP 404 with `{"detail":"Execution not found"}`.

### Cancel an execution

```http
DELETE /api/agents/{agent_id}/exec/{execution_id}
```

```bash
curl -X DELETE -H "Authorization: Bearer $MARITIME_API_KEY" \
	https://api.maritime.sh/api/agents/AGENT_ID/exec/EXECUTION_ID
```

Cancellation returns HTTP 200 with the terminal result. Cancelling an already finished execution returns its existing result unchanged. DELETE cancels execution; it does not delete the retained result. Completion can win a race with cancellation.

### Submission errors

Invalid commands, non-boolean `detached` values, and invalid timeouts return HTTP 400. An agent that is still starting can return HTTP 409 with `{"detail":{"code":"vm_not_ready","state":"starting","execution_started":false}}`. An unavailable agent can return HTTP 503 with `{"detail":{"code":"guest_command_unavailable","execution_started":false}}`. These two exact responses confirm that execution did not start, so submission can be retried when the agent is ready. Other failures do not provide that guarantee.

### Older agents

Some older agents support attached execution only. Their timeout defaults to 60 seconds and is capped at 120 seconds. Responses contain exitCode, stdout, and stderr. Output from both streams appears in stdout, and stderr is empty. These agents do not support execution IDs, result retrieval, or cancellation. Keep the request connected while waiting for the result.

Detached submission on an older agent returns HTTP 501 with `{"detail":"unsupported: outdated vm. Please use a new agent."}` and the command does not run. Create a new agent to use detached execution and retrieve results later.

## Deploy

Redeploy an agent from a GitHub repo or a Docker image:

```
POST /api/deploy
```

POST /api/deploy (body):

```json
{
  "agentId": "AGENT_ID",
  "source": "github",
  "repoUrl": "https://github.com/you/app",
  "branch": "main"
}
```

## Webhooks

Every agent has an invoke URL. A POST is accepted immediately and delivered to the agent in the
background, waking it first if it is asleep. Send the agent's invoke token as an
`X-Maritime-Webhook-Token` header or a `?token=` query parameter. Calls without a token still
work for now but are being phased out; get the token (and a ready-to-paste URL) from the token
endpoint while signed in:

```
POST /api/webhooks/{agent_id}
```

Fetch the token and a ready-to-paste URL while signed in:

```
GET /api/webhooks/{agent_id}/token
```

Rotate the token when a caller that holds the URL should lose it. The old token stops working at
once and the response carries the new token and URL. Needs a key with the `manage` scope.

```
POST /api/webhooks/{agent_id}/token/rotate
```

Invokes are rate limited per agent and caller (30/min) and share the agent's message budget, so a
burst returns `429` with a `Retry-After` header instead of queueing.

## End users

An end user is one of **your** users, keyed by the id you already hold for them (`externalId`: 1 to
128 characters of letters, digits and `_ @ . : + -`). Create or update one with a PUT; the same call
is safe to run on every sign-in. The response is `201` on create and `200` on update. The body may
carry `displayName`, `metadata` (flat JSON values) and up to eight `tags`; a field left out is kept.

```
PUT /api/v1/end-users/{external_id}
```

List one page at a time (newest first) with `status`, `tag`, `externalIdPrefix`,
`lastActiveBefore`, `lastActiveAfter`, `cursor` and `limit` (1 to 200) as query parameters. The
detail includes the end user's agents.

```
GET /api/v1/end-users
```

```
GET /api/v1/end-users/{external_id}
```

Create the end user's agent exactly once. The body is the agent create body with an optional `name`
(the external id names the agent when left out). The first call returns `201` and starts deploying;
a repeat call returns the existing agent with `200`. The end user is created on the way if it does
not exist. All of the end user's agents come back in the full agent shape.

```
POST /api/v1/end-users/{external_id}/agents
```

```
GET /api/v1/end-users/{external_id}/agents
```

A policy caps what one end user can spend and sets how their agents are sized. Set it as
`{ "policy": { ... } }` with any of `llm_spend_cap_cents_per_month`, `compute_minutes_cap`,
`wakes_per_hour`, `idle_sleep_seconds`, `mem_mb`, `vcpus` and `disk_gb`. A PUT replaces the whole
policy and applies it to every agent the end user owns now (the response counts them). A DELETE
removes it.

```
GET /api/v1/end-users/{external_id}/policy
```

```
PUT /api/v1/end-users/{external_id}/policy
```

```
DELETE /api/v1/end-users/{external_id}/policy
```

Mint a short-lived `eu_` token for the end user's own browser or app. It opens that one agent only,
with the scopes you choose (`chat`, `files`, `console`, `logs`, `app`; default `chat`) for
`ttlSeconds` (30 to 3600, default 900). The client sends it as `Authorization: Bearer` or as
`?token=` on websockets. Pass `agentId` when the end user has more than one agent. A DELETE
revokes every token the end user holds.

```
POST /api/v1/end-users/{external_id}/tokens
```

```
DELETE /api/v1/end-users/{external_id}/tokens
```

Suspend an end user to put their agents to sleep and refuse every wake and spend until you resume
them. Delete an end user to delete their agents and tokens; the response is `204` and the cleanup
finishes in the background.

```
POST /api/v1/end-users/{external_id}/suspend
```

```
POST /api/v1/end-users/{external_id}/resume
```

```
DELETE /api/v1/end-users/{external_id}
```

## Usage

What your agents cost over a range, per agent and per day, so you can rebill your own users. Both
take `from` and `to` as ISO timestamps (default: the last 30 days). Every row carries the agent's
`externalUserId`; group on it for a per-user invoice. Under a seat plan the hosting cost is
allocated from the plan price (`hostingBasis` is `allocated`); otherwise it is the metered spend.
AI cost is always the real spend from your credits.

```
GET /api/v1/usage
```

```
GET /api/v1/usage/daily
```

## Computers

Persistent desktops your own model drives, one per end user. These routes take a key with the
`computers` scope and are usually reached through the MCP server; see the
[Computers guide](https://maritime.sh/docs/computers).

```
POST /api/v1/computers
```

```
GET /api/v1/computers
```

```
GET /api/v1/computers/{computer_id}
```

```
DELETE /api/v1/computers/{computer_id}
```

```
POST /api/v1/computers/{computer_id}/wake
```

```
POST /api/v1/computers/{computer_id}/sleep
```

```
POST /api/v1/computers/{computer_id}/actions
```

```
GET /api/v1/computers/{computer_id}/screenshot
```

```
POST /api/v1/computers/{computer_id}/exec
```

```
GET /api/v1/computers/{computer_id}/files
```

```
PUT /api/v1/computers/{computer_id}/files
```

```
GET /api/v1/computers/{computer_id}/files/list
```

```
POST /api/v1/computers/{computer_id}/viewer
```

```
POST /api/v1/computers/{computer_id}/sessions/close
```

```
GET /api/v1/computers/{computer_id}/sessions
```

```
GET /api/v1/computers/usage
```

> **Note: Looking for more?**
>
> Everything else is scriptable via the [CLI](https://maritime.sh/docs/cli). Run
> `maritime guide --json` for the full machine-readable surface. Dashboard-internal endpoints are
> intentionally undocumented and may change without notice.
