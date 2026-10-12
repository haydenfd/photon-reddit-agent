> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# AppContextChangedEvent

> Reports what the user is currently viewing (Slack , agentview only).

Reports what the user is currently viewing (Slack `app_context_changed`, agent\_view only).

## Properties

<ResponseField name={"adapter"} type={"Adapter"} typeHref={"/reference/stable/chat/index/interfaces/Adapter"} required />

<ResponseField name={"channelId"} type={"string"} required>
  The agent conversation channel.
</ResponseField>

<ResponseField name={"entities"} type={"AppContextEntity[]"} required>
  **Type:** <code>[AppContextEntity](/docs/reference/stable/chat/index/types/AppContextEntity){"[]"}</code>

  Entities the user is viewing, ordered by relevance. Empty when Slack sends `context: {}`.
</ResponseField>

<ResponseField name={"raw"} type={"unknown"} required>
  Platform-specific raw payload (escape hatch).
</ResponseField>

<ResponseField name={"userId"} type={"string"} required>
  The user whose active view changed.
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.