> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# PluginHooks

> Plugin lifecycle hooks

## Properties

<ResponseField name={"onAfterQuery"} type={"(messages: readonly Message[]) => void | Promise<void>"}>
  **Type:** <code>{"(messages: readonly "}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){"[]) => void | Promise<void>"}</code>

  Called after querying messages (useful for data processing)
</ResponseField>

<ResponseField name={"onAfterSend"} type={"(to: string, result: SendResult) => void | Promise<void>"}>
  **Type:** <code>{"(to: string, result: "}[SendResult](/docs/reference/stable/imessage-kit/interfaces/SendResult){") => void | Promise<void>"}</code>

  Called after sending a message (useful for logging results)
</ResponseField>

<ResponseField name={"onBeforeQuery"} type={"(filter: unknown) => void | Promise<void>"}>
  Called before querying messages (useful for logging)
</ResponseField>

<ResponseField name={"onBeforeSend"} type={"(to: string, content: { attachments: string[]; text: string }) => void | Promis…"}>
  Called before sending a message (useful for validation, logging)
</ResponseField>

<ResponseField name={"onDestroy"} type={"() => void | Promise<void>"}>
  Called when SDK is destroyed (cleanup resources)
</ResponseField>

<ResponseField name={"onError"} type={"(error: Error, context: string) => void | Promise<void>"}>
  Called when an error occurs (global error handling)
</ResponseField>

<ResponseField name={"onInit"} type={"() => void | Promise<void>"}>
  Called when SDK initialization is complete
</ResponseField>

<ResponseField name={"onNewMessage"} type={"(message: Message) => void | Promise<void>"}>
  **Type:** <code>{"(message: "}[Message](/docs/reference/stable/imessage-kit/interfaces/Message){") => void | Promise<void>"}</code>

  Called when a new message is received (triggered by listener)
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.