> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/build

# Build on Maritime

SDK

Give every one of *your* users their own agent. One call on sign-up spins up an isolated agent on
Maritime's infrastructure; another sends it a message. You never touch a container. Maritime
handles provisioning, per-customer isolation, sleep/wake, and billing.

- [GitHub](https://github.com/maritime-sh/maritime-sdk)
- [npm · maritime-sdk](https://www.npmjs.com/package/maritime-sdk)
- [PyPI · maritime](https://pypi.org/project/maritime/)

*Diagram: How the Maritime SDK fits: your backend calls maritime-sdk, which calls the Maritime API,
which runs one isolated agent per customer. Your backend calls the SDK; Maritime runs an isolated
agent for every one of your customers.*

The whole thing: provision an agent for a customer, then chat with it. Real code, real agent, real
reply. The same three lines in either language:

### TypeScript

*Recording: The Maritime TypeScript SDK provisioning an agent and getting a reply.*

### Python

*Recording: The Maritime Python SDK provisioning an agent and getting a reply. provision() is
idempotent: the same call on every sign-in returns the same agent.*

## Install

### TypeScript

```bash
npm install maritime-sdk
```

### Python

```bash
pip install maritime
```

Zero dependencies. TypeScript needs Node 18+ (or Bun / Deno / edge); Python needs 3.9+.

## Explore the SDK

- [Quickstart](https://maritime.sh/docs/sdk/quickstart): Install, get a key, provision + chat with
  your first agent
- [Agents](https://maritime.sh/docs/sdk/agents): Provision, chat, per-customer secrets, lifecycle,
  logs
- [Webhooks](https://maritime.sh/docs/sdk/webhooks): Signed lifecycle events instead of polling
- [Authentication](https://maritime.sh/docs/sdk/authentication): API keys and scopes
- [API reference](https://maritime.sh/docs/sdk): Every method, both languages
- [Examples](https://maritime.sh/docs/sdk/examples): Real, runnable files on GitHub

> **Note: Prefer raw HTTP, or another language?**
>
> Every SDK call maps 1:1 to the [REST API](https://maritime.sh/docs/api). The
> [framework comparison](https://maritime.sh/docs/frameworks) covers the templates, and the SDK
> source (with runnable examples) lives at
> [github.com/maritime-sh/maritime-sdk](https://github.com/maritime-sh/maritime-sdk).
