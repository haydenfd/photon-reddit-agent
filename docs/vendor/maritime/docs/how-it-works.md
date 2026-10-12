> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/how-it-works

# How Maritime works

The mental model behind every other page in these docs, on one page. Five minutes here saves an
hour of guessing later.

## The shape of an agent

An agent is a long-lived program running in its own isolated VM (a sandboxed container) with four
things attached:

- **A persistent volume**, mounted at `/data` for most templates. This is the agent's memory: it
  survives restarts, redeploys, and sleep/wake. Everything outside it is disposable.
- **Encrypted environment variables**: API keys and config, stored encrypted at rest and injected
  only into that agent's VM. See [Env vars & sizing](https://maritime.sh/docs/configuration).
- **A chat front door**. The dashboard chat, the CLI, the REST API, and channels like Telegram all
  deliver messages down the same path and wait for the agent's reply.
- **A framework**: the program that actually thinks. Pick a ready-made one
  ([choose a framework](https://maritime.sh/docs/frameworks)) or
  [bring any Docker container](https://maritime.sh/docs/frameworks/custom).

## Sleep and wake

Agents sleep when idle and wake when needed. This is the core economic idea: you can keep hundreds
of agents around because a sleeping agent costs nothing extra and loses nothing.

*Recording: maritime sleep pauses the agent, maritime list shows it sleeping, and the next chat
message wakes it from a VM snapshot. The lifecycle logs time each wake at 1.1 to 1.4 seconds.*

- **Falling asleep** happens automatically after an idle period. Full state is preserved, including
  everything on `/data`. On micro-VM hosts the process is snapshotted and resumed, not restarted.
- **Waking up** takes about a second and happens on its own when anything needs the agent: a chat
  message, a channel message, a [trigger](https://maritime.sh/docs/triggers), a request to a
  [public web URL](https://maritime.sh/docs/web-apps), or a file/exec API call.
- **Sleeping is not unreachability.** You never need to wake an agent by hand before talking to it;
  the platform does it for you and the call waits for the reply.
- **Always-on** is a flat add-on for the rare agent that must react in milliseconds around the
  clock. Most agents, including most public web agents, do not need it. See
  [Billing](https://maritime.sh/docs/billing#add-ons).

One consequence worth internalizing: **timers inside a sleeping agent do not fire**. Scheduled work
belongs in a platform trigger, not an in-process scheduler. That is what
[Triggers & schedules](https://maritime.sh/docs/triggers) is for.

## Projects and the front door

Every agent lives in a **project** (its `projectId` is on the agent object). Channels attach at the
project level: point a Telegram bot at a project and it becomes the front door for the agent inside
it. With the project's `newChatPolicy` set to `spawn`, each new person who messages the bot gets
their own agent instance, which is the same mechanism the [SDK](https://maritime.sh/docs/build)
uses to give every customer of your product their own agent.

## How agents reach a model

Hosting and model calls are separate. For LLM access there are two paths:

- **No key: the Maritime LLM proxy.** Agents created without a key get a per-agent token for
  Maritime's OpenAI-format proxy and draw down your prepaid
  [AI credits](https://maritime.sh/docs/billing#ai-credits) at provider list price. OpenClaw,
  Hermes, ZeroClaw, and DeepSeek Harness all work with no key at all.
- **Your own key: direct.** Set `OPENAI_API_KEY` (or the provider's equivalent) as a secret env var
  and the agent talks to the provider directly; the AI credits are never touched. Claude Code is
  the one template that *requires* this: it speaks the Anthropic API, which the proxy does not, so
  it needs your `ANTHROPIC_API_KEY`.

## What it costs

Flat prices only. A plan includes a number of agents; extra agents are flat monthly slots, and
add-ons (RAM, SSD, always-on) are flat monthly prices counted by day of use. Nothing is metered:
messages, tokens, and awake seconds never change the hosting bill. Model calls through the proxy
come out of the separate prepaid AI credits. Full tables in
[Billing & plans](https://maritime.sh/docs/billing).

## Four ways to drive it

- **Dashboard**: create, chat, configure, watch logs, no terminal needed.
- **CLI**: everything the dashboard does, scriptable. See the
  [CLI reference](https://maritime.sh/docs/cli), or hand it to
  [an AI agent](https://maritime.sh/docs/ai-agents).
- **REST API**: the same operations over HTTP. See the [REST API](https://maritime.sh/docs/api).
- **SDK**: TypeScript and Python clients built for provisioning one agent per customer from your
  own backend. See [Build on Maritime](https://maritime.sh/docs/build).

> **Note: Next**
>
> Deploy your first agent in the [quickstart](https://maritime.sh/docs/quickstart), pick a
> template on [Choose a framework](https://maritime.sh/docs/frameworks), or wrap your own code
> with [Deploy any container](https://maritime.sh/docs/frameworks/custom).
