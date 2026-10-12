> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/sdk/examples

# Examples

Real, runnable files on GitHub. Copy one, set `MARITIME_API_KEY`, and run. Every example is verified to compile
against the published packages.

## Browse the examples

- **Provision on signup**: One agent per customer, idempotent.
  [TypeScript](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/typescript/provision-on-signup.ts),
  [Python](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/python/provision_on_signup.py)
- **Express / FastAPI chat API**: An endpoint that provisions + chats.
  [TypeScript](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/typescript/express-chat-api.ts),
  [Python](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/python/fastapi_app.py)
- **Next.js route handler**: Drop-in app/api/assistant/route.ts.
  [TypeScript](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/typescript/nextjs-route.ts)
- **Webhook receiver**: Verify the HMAC signature, handle events.
  [TypeScript](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/typescript/webhook-receiver.ts),
  [Python](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/python/flask_webhook.py)
- **Scoped worker key**: Mint a deploy-only key for a subsystem.
  [TypeScript](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/typescript/scoped-key.ts),
  [Python](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/python/scoped_key.py)
- **Per-customer secrets**: Set + hot-reload encrypted env vars.
  [TypeScript](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/typescript/manage-secrets.ts),
  [Python](https://github.com/maritime-sh/maritime-sdk/blob/main/examples/python/manage_secrets.py)

The whole set lives in
[github.com/maritime-sh/maritime-sdk/examples](https://github.com/maritime-sh/maritime-sdk/tree/main/examples).

## A note on billing

Agents you provision count against *your* Maritime plan's included agents; extras and add-ons are flat monthly
prices, never metered. See the [billing page](https://maritime.sh/docs/billing). Idle agents auto-sleep, keep their
state, and how much they run never changes the bill.
