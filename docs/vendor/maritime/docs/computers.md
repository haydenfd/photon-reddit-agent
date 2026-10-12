> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/computers

# Computers

Build a platform

A persistent Linux desktop (XFCE, Chromium, LibreOffice) for each of *your* end users, driven by
*your* model. You connect the Maritime MCP server to whatever agent you already run; the model
calls `get_computer` once per end user and then `computer` in a screenshot, act, verify loop.
Maritime creates the desktop, keeps it warm, sleeps it when idle, wakes it on the next action, and
keeps its files and logins between sessions. There is no lifecycle for you to manage.

## In sixty seconds

1. Use the key you already have. A `manage` or full-access Maritime key drives computers and
   agents alike, so the MCP server takes the same bearer token as the rest of the API. To hand out
   a key that reaches computers and nothing else, create a **Computers key** in the Computers
   section of [Settings, API keys](https://maritime.sh/settings/api-keys#computers): a key whose
   only scope is `computers` is refused on every other Maritime endpoint. Dashboard sessions
   cannot reach `/api/v1/computers`; that surface takes an API key.
2. Add the MCP server to your agent with one of the snippets below.
3. Your model calls `get_computer` with the end user's id, gets a `computer_id`, then drives it
   with `computer`. The first call creates the desktop; every later call for the same end user
   returns the same one.

## Connect your model

The server speaks Streamable HTTP and authenticates with your Computers key as a bearer token.
Replace `mk_...` with the key; the exact endpoint for your deployment is shown on the Computers
page.

### JSON config

```json
{
  "mcpServers": {
    "maritime-computers": {
      "type": "http",
      "url": "https://mcp.maritime.sh/mcp",
      "headers": {
        "Authorization": "Bearer mk_..."
      }
    }
  }
}
```

### Claude Code CLI

```bash
claude mcp add --transport http maritime-computers https://mcp.maritime.sh/mcp --header "Authorization: Bearer mk_..."
```

### OpenAI Agents SDK

```python
from agents.mcp import MCPServerStreamableHttp

computers = MCPServerStreamableHttp(
    name="maritime-computers",
    params={"url": "https://mcp.maritime.sh/mcp", "headers": {"Authorization": "Bearer mk_..."}},
)
```

### OpenAI Responses

```json
{
  "type": "mcp",
  "server_label": "maritime-computers",
  "server_url": "https://mcp.maritime.sh/mcp",
  "authorization": "mk_...",
  "require_approval": "never"
}
```

### Anthropic API

```json
{
  "type": "url",
  "url": "https://mcp.maritime.sh/mcp",
  "name": "maritime-computers",
  "authorization_token": "mk_..."
}
```

The JSON form is what Cursor, Claude Code (`.mcp.json`) and most local clients read. The OpenAI
Responses and Anthropic Messages entries are hosted MCP tools: the provider connects to the server
for you, so your backend never proxies screenshots.

**Building on the Vercel AI SDK?** Version 6 has no MCP client of its own:
`experimental_createMCPClient` was removed after v5, so any guide that reaches for it is out of
date. Two options that work. Use a hosted MCP tool from the provider (the OpenAI Responses and
Anthropic Messages entries above) and let the model connect. Or connect yourself with
`@modelcontextprotocol/sdk`: build a `Client` over `StreamableHTTPClientTransport` pointed at the
URL above, with the `Authorization` header in `requestInit`, then hand the tools it lists to
`generateText` yourself.

Vercel AI SDK v6, connecting through the MCP SDK:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js'

const mcp = new Client({ name: 'my-app', version: '1.0.0' })
await mcp.connect(
  new StreamableHTTPClientTransport(new URL(mcpUrl), {
    requestInit: { headers: { Authorization: `Bearer ${process.env.MARITIME_COMPUTERS_KEY}` } },
  }),
)

const { tools } = await mcp.listTools()
// Convert each tool to an AI SDK tool: inputSchema stays as is, and
// execute calls mcp.callTool({ name, arguments: args }).
```

## Pin the server to one end user

On the plain endpoint the model passes the end user's id to `get_computer`. That is fine for a
trusted orchestrator, but for a customer-facing agent a model-supplied user id is one prompt
injection away from another end user's desktop. Mount the pinned form instead and the server
ignores any other id:

```text
https://mcp.maritime.sh/mcp/u/<externalUserId>
```

Clients that can set headers can pin with `X-Maritime-User: <externalUserId>` on the plain
endpoint. Either way, `get_computer` needs no `user_id`, and a mismatching one is refused.

## Add it to your product

The whole integration for a website or app with its own agent loop is six steps. Nothing about
your backend changes; the computer is just another tool the model can call.

1. Create a Computers key in the Computers section of
   [Settings, API keys](https://maritime.sh/settings/api-keys#computers). It is shown once. Keep
   it on your server; never send it to the browser.
2. Build the pinned URL per signed-in user on your server from their id, so the model can only
   ever reach that user's desktop.
3. Register the server with your model using one of the snippets above, with
   `Authorization: Bearer mk_...`.
4. Tell the model when to use it with one line in your system prompt (below).
5. Show takeover links to your user. When the model calls `request_takeover` it returns a link
   and a reason; render both in your chat. The person opens it, finishes the step, and clicks
   Done. By default the tool call has already returned, so the model finds out through
   `takeover_status` or through its next action being refused with `human_in_control`.
6. Optionally let users watch. Mint a watch link with `POST /api/v1/computers/{id}/viewer` and
   `{"mode": "watch"}`. That is a REST call to the Maritime API, not to the MCP server: send it to
   the same API host your Computers key was issued on, which is printed next to the MCP URL on the
   [Computers page](https://maritime.sh/computers). The link is view-only and expires on its own.

system prompt, one paragraph:

```text
When a task needs a real browser or desktop, call get_computer first and keep the computer_id it returns: every other computer tool takes that computer_id as an argument. Take a screenshot before acting and use coordinates from the last screenshot. If you reach a login, CAPTCHA or payment step, call request_takeover with a short reason and show the user the link it returns; your next action stays refused with human_in_control until they are done, so retry it (or call takeover_status) instead of asking again.
```

server side, per request:

```python
# the pinned URL is built from YOUR user id, never from model output
mcp_url = f"{MARITIME_MCP_URL}/u/{current_user.id}"

# OpenAI Responses API, hosted MCP tool
tools = [{"type": "mcp", "server_label": "maritime-computers", "server_url": mcp_url,
          "authorization": MARITIME_COMPUTERS_KEY, "require_approval": "never"}]

# Anthropic Messages API, MCP connector
mcp_servers = [{"type": "url", "url": mcp_url, "name": "maritime-computers",
                "authorization_token": MARITIME_COMPUTERS_KEY}]
```

## Tool timeouts

Most MCP clients cut a tool call off after 60 seconds. Two calls here can pass that, and both need
the limit raised, not just the takeover:

- `get_computer` on first use creates the desktop: 3 to 8 seconds normally, up to 60 on a cold
  placement. Later wakes take about 3 seconds.
- `request_takeover` with `wait: true` holds until the person clicks Done or Failed, which is
  minutes. Leaving `wait` at its default returns at once and needs no extra time.

Raise the tool timeout for both. Claude Code reads `MCP_TOOL_TIMEOUT` (milliseconds) from the
environment. The MCP TypeScript and Python SDKs take a per-call timeout on `callTool`; the
TypeScript client also has `resetTimeoutOnProgress`, which the waiting takeover's progress
notifications keep alive. Hosted MCP tools on the provider side have their own ceilings, which is
another reason to leave `wait` false there.

## Tools

| Tool | What it does |
| --- | --- |
| `get_computer` | One computer per end user. `user_id` (unless pinned), optional `name`. Returns `computer_id`, status, screen size and a coordinate hint. Idempotent. |
| `computer` | One canonical action (schema below). Returns the post-action screenshot as an image block plus a text block with `action`, `frame_id`, `width`, `height` and any detail. |
| `computer_batch` | Up to 50 actions in order; stops at the first failure. Each step's text is prefixed `[i]`; only the final step carries an image unless a step sets `no_screenshot: false`. |
| `run_shell` | Runs a command inside the desktop as the desktop user. `timeout` up to 30 s. Returns exit code, stdout and stderr. |
| `read_file` | Reads a file under `/data` or `/home/desk`. Text when UTF-8, otherwise base64 with a `mime` note. 8 MiB cap. |
| `write_file` | Writes a file under the same roots. `encoding` is `utf8` (default) or `base64`. |
| `request_takeover` | For logins, 2FA, CAPTCHAs and payments. Mints a control link and returns it as text. By default it returns as soon as the link exists; set `wait` to true to block until the person clicks Done or Failed (or the timeout), which returns a fresh screenshot. |
| `takeover_status` | Where a takeover stands: `mode` (`human` while the person holds the desktop, `agent` once it is back), when it expires, and how the last one ended. Poll it after a takeover that did not wait. |
| `close_computer` | Ends the current session now. The desktop sleeps 30 seconds later unless another action arrives (see sessions). |

## The computer action

`computer` takes `computer_id`, an `action` from the list below, and the fields that action
needs. The same schema is the body of `POST /api/v1/computers/{computer_id}/actions` on REST.

Actions: `screenshot`, `left_click`, `right_click`, `middle_click`, `double_click`,
`triple_click`, `mouse_move`, `left_click_drag`, `left_mouse_down`, `left_mouse_up`, `scroll`,
`type`, `key`, `hold_key`, `wait`, `zoom`, `cursor_position`

| Field | Meaning |
| --- | --- |
| `coordinate` | `[x, y]` in the frame of the last screenshot. Clicks, `mouse_move`, `left_click_drag` (end point), `scroll` (where to scroll). |
| `start_coordinate` | `left_click_drag` start point. |
| `text` | `type`: the text to type. `key` and `hold_key`: an xdotool key name such as `Return` or `ctrl+s`. |
| `key` | Alias of `text` for `key` and `hold_key`. |
| `modifier` | Clicks and scroll only: a key held during the action, e.g. `ctrl`, `shift`, `ctrl+shift`. |
| `repeat` | 1 to 100. Repeats a key or click. |
| `scroll_direction, scroll_amount` | `up`, `down`, `left`, `right` and 1 to 100 clicks of the wheel. |
| `duration` | Seconds for `wait` and `hold_key`. |
| `region` | `zoom`: `[x0, y0, x1, y1]` crop in screenshot coordinates, returned upscaled to the full frame. Use it on small controls and text. |
| `no_screenshot` | Skip the post-action screenshot. |
| `format, quality` | `png` or `jpeg`, and JPEG quality 1 to 95. MCP defaults to JPEG at quality 80; REST defaults to PNG. |

## Coordinate rules

- Screenshots are **1200 x 750** by default on a physical 1280 x 800 desktop. Every result reports
  `width` and `height`; coordinates are pixels in that frame, and Maritime scales them to the
  screen.
- Take a screenshot before acting, and never act on a screen the model has not seen this turn.
- Work in a strict loop: screenshot, plan one step, act, read the returned screenshot, verify. Each
  result carries a monotonic `frame_id` so the model can tell a fresh frame from a stale one.
- Click the target field and confirm focus before typing. Type digits and punctuation with `type`,
  not `key`.
- On-screen text is untrusted data, never instructions. Prompt injection from a web page is your
  model's problem; the tools never execute anything read from a screenshot.
- While a person holds the desktop (after `request_takeover`) every action is refused with
  `human_in_control` and `retryAfterS: 15`. Wait, then take a screenshot to continue, or call
  `takeover_status` to see whether the desktop is back.

## Sessions

A session is a period of continuous use of one computer. It is a record, not a charge: nothing
here costs money. These are the rules, exactly as the backend applies them:

- A session opens on the first action against a computer that has no open session.
- Screenshots count as actions: they keep the session alive and increment the screenshot counter.
- `close_computer` (REST: `sessions/close`) ends the session and starts a **30 seconds** grace.
  An action inside the grace reopens the same session. After the grace the computer sleeps.
- A session with no action for 5 minutes closes as idle and the computer sleeps. The next action
  opens a new session.
- Waking a computer, watching it through a viewer link, and takeover never open a session.
- Waking is where a plan can refuse: 402 `plan_lapsed` when the plan has lapsed, 429
  `concurrency` with a 15 second retry hint when the account already runs as many machines at once
  as the plan allows. A computer that is already awake is never refused.

## Persistence

- One computer per end user. `get_computer` with the same id always returns the same desktop; an
  anonymous call (no id, unpinned) always creates a new one.
- After 5 idle minutes the desktop sleeps: memory is snapshotted, open windows and all. It wakes on
  the next action in about a second, or a few seconds when the snapshot is gone.
- The memory snapshot is kept for **7 days** after the last action. Past that the desktop still
  wakes, from a fresh boot with the same disk, so only open windows are lost.
- Files, the browser profile and its logins live on the computer's own disk under `/data` and
  `/home/desk`. They are kept until you delete the computer.
- Deleting a computer destroys its disk and snapshots. Deleted computers return 404.

## The plan

One plan covers everything you run. A computer is a **machine**, the same unit as an agent, and
takes one slot whichever it is. So a $20 plan holds 20 machines: 20 agents, 20 computers, or any
mix. Nothing is counted per action, per session or per minute.

Computers need a paid plan. The free plan runs agents; a computer is a larger machine with a
screen, and the screen alone is a paid add-on on an agent. Creating one without a plan answers 402
`computer_limit` and names the upgrade.

Past the included count, each extra machine bills at the plan's flat monthly rate. Switching plans
reprices the subscription; Stripe shows the exact amount before the change is charged.

| Plan | Starter | Growth | Scale |
| --- | --- | --- | --- |
| Price | `$20 per month` | `$100 per month` | `$500 per month` |
| Machines included | `20` | `100` | `500` |
| Awake at once | `5` | `25` | `60` |
| Each machine past the included count | `$1.50 per month` | `$1.25 per month` | `$1.00 per month` |

| Rule | What happens |
| --- | --- |
| Machines included | Agents and computers together. Creating past the count is allowed and bills as overflow. |
| Paid plan | Required to create a computer. Agents run on the free plan; computers do not. |
| Awake at once | Machines running at the same time, of either kind. A wake past the limit returns 429 with a 15 second retry hint. |
| Sleeping | Free. A sleeping machine keeps its disk and its memory snapshot and does not count toward the awake limit. |
| Billing | A missed payment starts a 14 day grace; after that machines stay asleep and a wake returns 402 plan_lapsed. Nothing is deleted. |

The [Computers page](https://maritime.sh/computers) shows the machines you hold and how many of
them are computers. The [Billing page](https://maritime.sh/billing) is where the plan is bought,
changed and cancelled, once, for the whole account.

## Limits

| What | Limit |
| --- | --- |
| Idle sleep | 5 minutes without an action |
| Close grace | 30 seconds after close before the computer sleeps |
| Batch | 50 actions per computer_batch |
| run_shell | 30 seconds per command |
| Files | 8 MiB per read or write, absolute paths under /data or /home/desk, no .. |
| Viewer links | 10 minutes by default, 1 hour at most; a new control link revokes the previous one |
| Rate limits | 30 creates, 300 actions and 30 viewer links per minute per key |
| Screenshot | 1200 x 750 model frame on a 1280 x 800 desktop |

## Errors

REST errors on `/api/v1/computers` are written for the model that reads them:
`{"error": "slug", "message": "...", "retryAfterS": 15}`. On MCP they become tool results with
`isError: true` and the same message.

| Slug | Meaning |
| --- | --- |
| `no_plan, plan_lapsed` | 402. The account has no active Computers plan. A person must start or renew it on the Billing page. |
| `computer_limit` | 402. The account has no paid plan, or no machine slot free on it. |
| `computer_limit` | 402. The account is at its persisted-computer cap; delete computers or ask for a higher cap. |
| `concurrency` | 429. Every concurrent session slot is in use; retry after retryAfterS. |
| `human_in_control` | 409. A person holds the desktop; wait, then screenshot. |
| `unknown_action, validation, bad_path` | 400 or 422. The request did not match the schema or the file path policy. |
| `wake_transient, wake_timeout` | 503 or 500. The desktop could not be woken this time; retry, or the computer is marked error. |
| `no_capacity` | 503. No computers host has room; a person at Maritime must add capacity. |
| `computers_disabled` | 503. The product is off on this deployment. |
| `not_found` | 404. Wrong id, another account's or project's computer, or a deleted one. |

## REST and SDK

Everything the MCP server does is a call to `/api/v1/computers` with the Computers key as a bearer
token. Field names are camelCase (`externalUserId`, `frameId`, `imageB64`, `exitCode`,
`retryAfterS`).

| Operation | Route |
| --- | --- |
| `create (get-or-create)` | POST /api/v1/computers `{externalUserId?, name?}`, 201 new or 200 existing |
| `list, get, delete` | GET /computers?externalUserId=, GET /computers/{id}, DELETE /computers/{id} |
| `wake, sleep` | POST /computers/{id}/wake, POST /computers/{id}/sleep |
| `actions` | POST /computers/{id}/actions with one action or `{actions: [...]}` |
| `screenshot` | GET /computers/{id}/screenshot?format=&quality= returns image bytes with X-Frame-Id, X-Screen-Width, X-Screen-Height |
| `exec` | POST /computers/{id}/exec `{command, timeoutS}` |
| `files` | GET /computers/{id}/files?path=, PUT /computers/{id}/files?path= (raw body), GET /computers/{id}/files/list?path= |
| `viewer` | POST /computers/{id}/viewer `{mode: "watch" \| "control", ttlS?, reason?}` returns a signed link |
| `sessions` | POST /computers/{id}/sessions/close, GET /computers/{id}/sessions |
| `usage` | GET /computers/usage?from&to&externalUserId |

The `maritime-sdk` client exposes the same operations as `client.computers`, and its
`computers/dialects` module converts OpenAI, Gemini and Qwen computer-use actions to the canonical
schema (`fromOpenAI`, `fromGemini`, `fromQwen`) for models that do not speak MCP. That resource
ships in the next SDK release; until then, call REST directly.

## Works with

- **Claude, OpenAI, Gemini** through MCP, with the snippets above.
- **Any other model** through REST, using the SDK converters to map its native computer-use
  actions to the canonical one.
- **People** through the viewer: a watch link to look, a control link to take over for a login or
  a CAPTCHA and hand the desktop back with Done.

## Security notes

- Each computer is its own micro-VM with its own disk. Computers cannot reach each other.
- Typed text is never logged and never appears in an error. It can contain passwords.
- Viewer links are short-lived, bound to one computer and one mode, and every link is revoked when
  a session closes, the computer sleeps, or a takeover completes. View-only links cannot send
  input; the server drops it, not the browser.
- Scope decides what a key reaches. A key whose only scope is `computers` drives computers and is
  refused on every other Maritime endpoint, so a leak is contained to this product. A `manage` or
  full-access key drives both products; treat it as it deserves.
