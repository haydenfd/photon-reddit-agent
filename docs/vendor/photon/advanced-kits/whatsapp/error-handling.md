> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Error Handling

> Catch typed errors and classify with error.code

Every failure surfaced by the SDK is a [WhatsAppError](/docs/reference/stable/whatsapp-business/symbols/whatsapperror) or one of its subclasses. Branch on the subclass with `instanceof` for broad handling, or switch on `error.code` for precise recovery.

## The error hierarchy

```ts theme={null}
import {
  WhatsAppError,
  AuthenticationError,
  ConnectionError,
  NotFoundError,
  RateLimitError,
  ValidationError,
} from "@photon-ai/whatsapp-business";

try {
  await client.messages.send({ to: "+15551234567", text: "Hi" });
} catch (error) {
  if (error instanceof AuthenticationError) {
    // bad access token, missing scopes
  } else if (error instanceof RateLimitError) {
    // backoff and retry
  } else if (error instanceof ValidationError) {
    // recipient format, content shape, template parameters
  } else if (error instanceof ConnectionError) {
    // transient network / server issue
  } else if (error instanceof NotFoundError) {
    // mediaId expired, messageId unknown
  } else if (error instanceof WhatsAppError) {
    // anything else surfaced by the SDK
  }
}
```

| Subclass | Maps from gRPC |
| - | - |
| `AuthenticationError` | `UNAUTHENTICATED`, `PERMISSION_DENIED` |
| `NotFoundError` | `NOT_FOUND` |
| `RateLimitError` | `RESOURCE_EXHAUSTED` |
| `ValidationError` | `INVALID_ARGUMENT`, `FAILED_PRECONDITION` |
| `ConnectionError` | `UNAVAILABLE`, `DEADLINE_EXCEEDED` |
| `WhatsAppError` | Everything else |

## Error fields

Every `WhatsAppError` carries:

| Field | Description |
| - | - |
| `code` | Canonical error code — one of [`ErrorCode`](#error-codes). |
| `retryable` | `true` when the caller can safely retry with backoff. |
| `grpcCode` | Numeric gRPC status code (mirrors `nice-grpc-common`'s `Status` enum). |
| `context` | `Record<string, string>` of extra server-provided context. |
| `cause` | The underlying error, when one was thrown by the transport. |

## Error codes

<Accordion title="ErrorCode">
  [ErrorCode reference](/docs/reference/stable/whatsapp-business/symbols/errorcode)
</Accordion>

Switch on `code` when you want to react to a specific failure mode rather than a whole class:

```ts theme={null}
try {
  await client.messages.send({ to, text: "Hi" });
} catch (error) {
  if (error instanceof WhatsAppError) {
    switch (error.code) {
      case "rateLimitExceeded":
        await sleep(exponentialBackoff());
        break;
      case "preconditionFailed":
        // 24-hour window expired — send a template instead
        break;
      case "unauthenticated":
        // rotate token
        break;
    }
  }
}
```

## Retrying

The SDK can retry transient errors automatically. Opt in via `ClientOptions.retry`:

```ts theme={null}
const client = createClient({
  accessToken: "...",
  phoneNumberId: "...",
  appSecret: "...",
  retry: true, // default settings
});

// Or tune the behaviour
const client2 = createClient({
  accessToken: "...",
  phoneNumberId: "...",
  appSecret: "...",
  retry: {
    maxAttempts: 5,
    initialDelay: 250,
    maxDelay: 10_000,
  },
});
```

Retries only fire when `error.retryable === true`. Non-retryable errors (validation failures, auth issues) propagate immediately — don't wrap them in your own retry loop.

## Subscribe vs unary calls

Streaming errors in `events.subscribe()` trigger the reconnect machinery rather than throwing — see [Events → Reconnection](/docs/advanced-kits/whatsapp/events#reconnection). Errors from unary calls (`messages.send`, `media.upload`, `events.fetchMissed`) throw.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.