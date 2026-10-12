> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# PlatformRuntime

## Properties

<ResponseField name={"client"} type={"unknown"} required />

<ResponseField name={"config"} type={"unknown"} required />

<ResponseField name={"definition"} type={"AnyPlatformDef"} typeHref={"/reference/stable/spectrum-ts/index/interfaces/AnyPlatformDef"} required />

<ResponseField name={"projectConfig"} type={"ProjectData | undefined"} required>
  **Type:** <code>[ProjectData](/docs/reference/stable/spectrum-ts/index/interfaces/ProjectData){" | undefined"}</code>
</ResponseField>

<ResponseField name={"store"} type={"Store"} typeHref={"/reference/stable/spectrum-ts/index/interfaces/Store"} required />

<ResponseField name={"subscribeEvent"} type={"(channel: string) => AsyncIterable<unknown, any, any> | undefined"} />

<ResponseField name={"subscribeMessages"} type={"() => ManagedStream<[Space<unknown>, Message<string, User, Space<unknown>>]>"} required>
  **Type:** <code>{"() => "}[ManagedStream](/docs/reference/stable/spectrum-ts/index/interfaces/ManagedStream){"<["}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>, "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>]>"}</code>
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.