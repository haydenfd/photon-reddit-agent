> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# definePlatform

```typescript
definePlatform(platformId: _Name, def: { lifecycle: { createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promise<_Client>; destroyClient: (ctx: { client: NoInferValue<_Client>; store: Store }) => Promise<void> } } & Omit<PlatformDef<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, _Client, _ResolvedUser, _ResolvedSpace, _MessageSchema, _MessageType, _Events, _SpaceActions, _MessageActions, _Actions>, "name" | "lifecycle"> & { static: _Static }): Platform<PlatformDef<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, _Client, _ResolvedUser, _ResolvedSpace, _MessageSchema, _MessageType, _Events, _SpaceActions, _MessageActions, _Actions>> & Readonly<_Static>
```

## Parameters

<ResponseField name={"platformId"} type={"_Name"} required />

<ResponseField name={"def"} type={"{ lifecycle: { createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promi…"} required>
  **Type:** <code>{"{ lifecycle: { createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promise<_Client>; destroyClient: (ctx: { client: NoInferValue<_Client>; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<void> } } & Omit<"}[PlatformDef](/docs/reference/stable/spectrum-ts/index/interfaces/PlatformDef){"<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, _Client, _ResolvedUser, _ResolvedSpace, _MessageSchema, _MessageType, _Events, _SpaceActions, _MessageActions, _Actions>, \"name\" | \"lifecycle\"> & { static: _Static }"}</code>
</ResponseField>

## Returns

<code>[Platform](/docs/reference/stable/spectrum-ts/index/interfaces/Platform){"<"}[PlatformDef](/docs/reference/stable/spectrum-ts/index/interfaces/PlatformDef){"<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, _Client, _ResolvedUser, _ResolvedSpace, _MessageSchema, _MessageType, _Events, _SpaceActions, _MessageActions, _Actions>> & Readonly<_Static>"}</code>

```typescript
definePlatform(platformId: _Name, def: Omit<PlatformDef<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, FusorClient<_TPayload>, _ResolvedUser, _ResolvedSpace, _MessageSchema, ProviderMessage<_ResolvedUser, _ResolvedSpace, _MessageSchema extends ZodType<object, unknown, $ZodTypeInternals<object, unknown>> ? output<_MessageSchema> : Record<never, never>>, _FusorEvents, _SpaceActions, _MessageActions, Record<never, never>>, "name" | "messages" | "lifecycle"> & { lifecycle: { createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promise<FusorClient<_TPayload>>; destroyClient: (ctx: { client: FusorClient<_TPayload>; store: Store }) => Promise<void> }; messages: FusorMessages<_TPayload, output<_ConfigSchema>>; static: _Static }): Platform<PlatformDef<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, FusorClient<_TPayload>, _ResolvedUser, _ResolvedSpace, _MessageSchema, ProviderMessage<_ResolvedUser, _ResolvedSpace, _MessageSchema extends ZodType<object, unknown, $ZodTypeInternals<object, unknown>> ? output<_MessageSchema> : Record<never, never>>, _FusorEvents, _SpaceActions, _MessageActions, Record<never, never>>> & Readonly<_Static>
```

## Parameters

<ResponseField name={"platformId"} type={"_Name"} required />

<ResponseField name={"def"} type={"Omit<PlatformDef<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsS…"} required>
  **Type:** <code>{"Omit<"}[PlatformDef](/docs/reference/stable/spectrum-ts/index/interfaces/PlatformDef){"<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, "}[FusorClient](/docs/reference/stable/spectrum-ts/index/interfaces/FusorClient){"<_TPayload>, _ResolvedUser, _ResolvedSpace, _MessageSchema, "}[ProviderMessage](/docs/reference/stable/spectrum-ts/index/types/ProviderMessage){"<_ResolvedUser, _ResolvedSpace, _MessageSchema extends ZodType<object, unknown, $ZodTypeInternals<object, unknown>> ? output<_MessageSchema> : Record<never, never>>, _FusorEvents, _SpaceActions, _MessageActions, Record<never, never>>, \"name\" | \"messages\" | \"lifecycle\"> & { lifecycle: { createClient: (ctx: CreateClientContext<_ConfigSchema>) => Promise<"}[FusorClient](/docs/reference/stable/spectrum-ts/index/interfaces/FusorClient){"<_TPayload>>; destroyClient: (ctx: { client: "}[FusorClient](/docs/reference/stable/spectrum-ts/index/interfaces/FusorClient){"<_TPayload>; store: "}[Store](/docs/reference/stable/spectrum-ts/index/interfaces/Store){" }) => Promise<void> }; messages: "}[FusorMessages](/docs/reference/stable/spectrum-ts/index/types/FusorMessages){"<_TPayload, output<_ConfigSchema>>; static: _Static }"}</code>
</ResponseField>

## Returns

<code>[Platform](/docs/reference/stable/spectrum-ts/index/interfaces/Platform){"<"}[PlatformDef](/docs/reference/stable/spectrum-ts/index/interfaces/PlatformDef){"<_Name, _ConfigSchema, _UserSchema, _SpaceSchema, _SpaceParamsSchema, "}[FusorClient](/docs/reference/stable/spectrum-ts/index/interfaces/FusorClient){"<_TPayload>, _ResolvedUser, _ResolvedSpace, _MessageSchema, "}[ProviderMessage](/docs/reference/stable/spectrum-ts/index/types/ProviderMessage){"<_ResolvedUser, _ResolvedSpace, _MessageSchema extends ZodType<object, unknown, $ZodTypeInternals<object, unknown>> ? output<_MessageSchema> : Record<never, never>>, _FusorEvents, _SpaceActions, _MessageActions, Record<never, never>>> & Readonly<_Static>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.