> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# SchedulerEvents

> Scheduler event callbacks

## Properties

<ResponseField name={"onComplete"} type={"(message: RecurringMessage) => void"}>
  **Type:** <code>{"(message: "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){") => void"}</code>

  Called when a recurring message completes (reaches endAt)
</ResponseField>

<ResponseField name={"onError"} type={"(message: ScheduledMessage | RecurringMessage, error: Error) => void"}>
  **Type:** <code>{"(message: "}[ScheduledMessage](/docs/reference/stable/imessage-kit/interfaces/ScheduledMessage){" | "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){", error: Error) => void"}</code>

  Called when a message fails to send
</ResponseField>

<ResponseField name={"onSent"} type={"(message: ScheduledMessage | RecurringMessage, result: SendResult) => void"}>
  **Type:** <code>{"(message: "}[ScheduledMessage](/docs/reference/stable/imessage-kit/interfaces/ScheduledMessage){" | "}[RecurringMessage](/docs/reference/stable/imessage-kit/interfaces/RecurringMessage){", result: "}[SendResult](/docs/reference/stable/imessage-kit/interfaces/SendResult){") => void"}</code>

  Called when a message is sent successfully
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.