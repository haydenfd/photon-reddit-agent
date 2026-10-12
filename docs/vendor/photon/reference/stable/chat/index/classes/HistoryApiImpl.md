> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# HistoryApiImpl

> Unified History API implementation.

Composes `UserHistoryApiImpl`, `ThreadHistoryApiImpl`, and
`ChannelHistoryApiImpl` into the [HistoryApi](/docs/reference/stable/chat/index/interfaces/HistoryApi) facade.

Constructor receives a single config object so `Chat` can pass everything
cleanly without positional-argument confusion:

```typescript
this._history = new HistoryApiImpl({
  user: historyUserConfig
    ? { config: historyUserConfig, state: this._stateAdapter }
    : undefined,
  adapterResolver: (name) => this.adapters.get(name),
});
```

```typescript
class HistoryApiImpl implements HistoryApi
```

## Constructor

```typescript
HistoryApiImpl(config: HistoryApiImplConfig): HistoryApiImpl
```

### Parameters

<ResponseField name={"config"} type={"HistoryApiImplConfig"} required />

### Returns

<code>[HistoryApiImpl](/docs/reference/stable/chat/index/classes/HistoryApiImpl)</code>

## Properties

<ResponseField name={"channel"} type={"ChannelHistoryApi"} typeHref={"/reference/stable/chat/index/interfaces/ChannelHistoryApi"} required>
  Per-channel history operations.
  Individual methods throw when the adapter does not implement them.
</ResponseField>

<ResponseField name={"thread"} type={"ThreadHistoryApi"} typeHref={"/reference/stable/chat/index/interfaces/ThreadHistoryApi"} required>
  Per-thread message history.
  Always available — delegates to the adapter's `fetchMessages`.
</ResponseField>

<ResponseField name={"user"} type={"TranscriptsApi"} typeHref={"/reference/stable/chat/index/interfaces/TranscriptsApi"} required>
  Cross-platform per-user transcript store.
  Throws if `history.user` (or legacy `transcripts`) is not configured.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.