> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# EventsResource

## Constructor

```typescript
EventsResource(client: MessageServiceClient): EventsResource
```

### Parameters

<ResponseField name={"client"} type={"MessageServiceClient"} required />

### Returns

<code>[EventsResource](/docs/reference/stable/whatsapp-business/classes/EventsResource)</code>

## Methods

### fetchMissed()

```typescript
fetchMissed(options: FetchMissedOptions): Promise<FetchMissedResult>
```

#### Parameters

<ResponseField name={"options"} type={"FetchMissedOptions"} typeHref={"/reference/stable/whatsapp-business/interfaces/FetchMissedOptions"} required />

#### Returns

<code>{"Promise<"}[FetchMissedResult](/docs/reference/stable/whatsapp-business/interfaces/FetchMissedResult){">"}</code>

### subscribe()

```typescript
subscribe(options?: SubscribeOptions): TypedEventStream<WhatsAppEvent>
```

#### Parameters

<ResponseField name={"options"} type={"SubscribeOptions"} typeHref={"/reference/stable/whatsapp-business/interfaces/SubscribeOptions"} />

#### Returns

<code>[TypedEventStream](/docs/reference/stable/whatsapp-business/classes/TypedEventStream){"<"}[WhatsAppEvent](/docs/reference/stable/whatsapp-business/types/WhatsAppEvent){">"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.