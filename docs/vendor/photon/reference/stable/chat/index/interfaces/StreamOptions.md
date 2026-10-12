> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# StreamOptions

> Options for streaming messages.

Options for streaming messages.
Platform-specific options are passed through to the adapter.

## Properties

<ResponseField name={"fallbackStreamingPlaceholderText"} type={"string | null"}>
  Placeholder text when explicitly configured for fallback streaming.
</ResponseField>

<ResponseField name={"recipientTeamId"} type={"string"}>
  Slack: The team/workspace ID
</ResponseField>

<ResponseField name={"recipientUserId"} type={"string"}>
  Slack: The user ID to stream to (for AI assistant context)
</ResponseField>

<ResponseField name={"sessionStatus"} type={"AgentSessionStatus"} typeHref={"/reference/stable/chat/index/types/AgentSessionStatus"}>
  Slack: Agent session state after the stream stops. Defaults to "active".
</ResponseField>

<ResponseField name={"signal"} type={"AbortSignal"}>
  Stop consuming the stream when this signal is aborted.
</ResponseField>

<ResponseField name={"stopBlocks"} type={"unknown[]"}>
  Block Kit elements to attach when stopping the stream (Slack only, via chat.stopStream)
</ResponseField>

<ResponseField name={"taskDisplayMode"} type={"\"plan\" | \"timeline\""}>
  Slack: Controls how task\_update chunks are displayed.

  * `"timeline"` — individual task cards shown inline with text (default)
  * `"plan"` — all tasks grouped into a single plan block
</ResponseField>

<ResponseField name={"updateIntervalMs"} type={"number"}>
  Minimum interval between updates in ms (default: 1000). Used for fallback mode (GChat/Teams).
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.