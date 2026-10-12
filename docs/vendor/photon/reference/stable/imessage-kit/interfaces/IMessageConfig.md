> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# IMessageConfig

> SDK main configuration interface All options are optional and use default values

SDK main configuration interface

All options are optional and use default values

## Properties

<ResponseField name={"databasePath"} type={"string"}>
  Database path
  Default: \~/Library/Messages/chat.db
</ResponseField>

<ResponseField name={"debug"} type={"boolean"}>
  Debug mode (default: false)
</ResponseField>

<ResponseField name={"maxConcurrent"} type={"number"}>
  Maximum concurrent sends
  Default: 5, 0 means unlimited
</ResponseField>

<ResponseField name={"plugins"} type={"readonly Plugin[]"}>
  **Type:** <code>{"readonly "}[Plugin](/docs/reference/stable/imessage-kit/interfaces/Plugin){"[]"}</code>

  Plugin list (optional)
</ResponseField>

<ResponseField name={"retry"} type={"RetryConfig"} typeHref={"/reference/stable/imessage-kit/interfaces/RetryConfig"}>
  Retry configuration (optional)
</ResponseField>

<ResponseField name={"scriptTimeout"} type={"number"}>
  AppleScript execution timeout
  In milliseconds (default: 30000)
</ResponseField>

<ResponseField name={"tempFile"} type={"TempFileConfig"} typeHref={"/reference/stable/imessage-kit/interfaces/TempFileConfig"}>
  Temporary file configuration (optional)
</ResponseField>

<ResponseField name={"watcher"} type={"WatcherConfig"} typeHref={"/reference/stable/imessage-kit/interfaces/WatcherConfig"}>
  Watcher configuration (optional)
</ResponseField>

<ResponseField name={"webhook"} type={"WebhookConfig"} typeHref={"/reference/stable/imessage-kit/interfaces/WebhookConfig"}>
  Webhook configuration (optional)
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.