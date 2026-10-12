> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# AnyPlatformDef

## Properties

<ResponseField name={"actions"} type={"Record<string, InstanceActionFn>"} />

<ResponseField name={"config"} type={"ZodType<object>"} required />

<ResponseField name={"events"} type={"object"} />

<ResponseField name={"lifecycle"} type={"{ createClient: (ctx: any) => Promise<any>; destroyClient: (ctx: any) => Promis…"} required />

<ResponseField name={"message"} type={"{ actions: Record<string, MessageActionFn>; schema: ZodType<object, unknown, $Z…"} />

<ResponseField name={"messages"} type={"(ctx: any) => AsyncIterable<any>"} required />

<ResponseField name={"name"} type={"string"} required />

<ResponseField name={"send"} type={"(_: any) => Promise<ProviderMessageRecord | undefined>"} required>
  **Type:** <code>{"(_: any) => Promise<"}[ProviderMessageRecord](/docs/reference/stable/spectrum-ts/authoring/types/ProviderMessageRecord){" | undefined>"}</code>
</ResponseField>

<ResponseField name={"space"} type={"{ actions: Record<string, SpaceActionFn>; create: (_: any) => Promise<any>; get…"} required />

<ResponseField name={"user"} type={"{ resolve: (_: any) => Promise<any>; schema: ZodType<object, unknown, $ZodTypeI…"} required />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.