> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Spectrum

```typescript
Spectrum(options: { projectId: string; projectSecret: string } & SpectrumFactoryOptions<Providers>): Promise<SpectrumLike<Providers> & CustomEventStreams<Providers> & { edit: void; messages: AsyncIterable<[Space<unknown>, Message<string, User, Space<unknown>>]>; responding: void; send: void; stop: void; webhook: void } & { config: ProjectData }>
```

## Parameters

<ResponseField name={"options"} type={"{ projectId: string; projectSecret: string } & SpectrumFactoryOptions<Providers>"} required />

## Returns

<code>{"Promise<SpectrumLike<Providers> & CustomEventStreams<Providers> & { edit: void; messages: AsyncIterable<["}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>, "}[Message](/docs/reference/stable/spectrum-ts/index/interfaces/Message){"<string, "}[User](/docs/reference/stable/spectrum-ts/index/interfaces/User){", "}[Space](/docs/reference/stable/spectrum-ts/index/interfaces/Space){"<unknown>>]>; responding: void; send: void; stop: void; webhook: void } & { config: "}[ProjectData](/docs/reference/stable/spectrum-ts/index/interfaces/ProjectData){" }>"}</code>

```typescript
Spectrum(options: { projectId: undefined; projectSecret: undefined } & SpectrumFactoryOptions<Providers>): Promise<SpectrumInstance<Providers>>
```

## Parameters

<ResponseField name={"options"} type={"{ projectId: undefined; projectSecret: undefined } & SpectrumFactoryOptions<Pro…"} required />

## Returns

<code>{"Promise<"}[SpectrumInstance](/docs/reference/stable/spectrum-ts/index/types/SpectrumInstance){"<Providers>>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.