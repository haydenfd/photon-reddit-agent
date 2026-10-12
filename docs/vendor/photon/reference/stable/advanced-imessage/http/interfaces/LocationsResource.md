> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# LocationsResource

> Shared-location APIs.

* `list()` returns every friend currently sharing a location.
* `get(address)` fetches the latest snapshot for one friend.
* `request(chat, address)` sends a visible Find My request card.

## Methods

### get()

```typescript
get(address: string): Promise<SharedFriendLocation>
```

#### Parameters

<ResponseField name={"address"} type={"string"} required />

#### Returns

<code>{"Promise<"}[SharedFriendLocation](/docs/reference/stable/advanced-imessage/grpc/interfaces/SharedFriendLocation){">"}</code>

### list()

```typescript
list(): Promise<SharedFriendLocation[]>
```

#### Returns

<code>{"Promise<"}[SharedFriendLocation](/docs/reference/stable/advanced-imessage/grpc/interfaces/SharedFriendLocation){"[]>"}</code>

### request()

```typescript
request(chat: string, address: string, options?: IdempotencyOptions): Promise<LocationRequestReceipt>
```

#### Parameters

<ResponseField name={"chat"} type={"string"} required />

<ResponseField name={"address"} type={"string"} required />

<ResponseField name={"options"} type={"IdempotencyOptions"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/IdempotencyOptions"} />

#### Returns

<code>{"Promise<"}[LocationRequestReceipt](/docs/reference/stable/advanced-imessage/grpc/interfaces/LocationRequestReceipt){">"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.