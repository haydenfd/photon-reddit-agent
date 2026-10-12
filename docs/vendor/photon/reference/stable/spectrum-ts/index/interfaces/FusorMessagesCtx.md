> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# FusorMessagesCtx

## Properties

<ResponseField name={"config"} type={"TConfig"} required>
  Parsed provider config (`z.infer` of the platform's config schema).
</ResponseField>

<ResponseField name={"payload"} type={"TPayload"} required />

<ResponseField name={"projectConfig"} type={"ProjectData | undefined"} required>
  **Type:** <code>[ProjectData](/docs/reference/stable/spectrum-ts/index/interfaces/ProjectData){" | undefined"}</code>

  Spectrum Cloud project metadata, fetched once at `Spectrum()` init.
  `undefined` for local-only setups (no `projectId`/`projectSecret`). Read
  project-level toggles from `projectConfig.profile.<key>`.
</ResponseField>

<ResponseField name={"respond"} type={"FusorRespond"} typeHref={"/reference/stable/spectrum-ts/index/types/FusorRespond"} required />

<ResponseField name={"store"} type={"Store"} typeHref={"/reference/stable/spectrum-ts/index/interfaces/Store"} required>
  Per-platform in-memory key/value store, shared with the rest of the platform.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.