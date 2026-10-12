> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageFilter

> Message query filter All fields are optional, used to filter messages

Message query filter

All fields are optional, used to filter messages

## Properties

<ResponseField name={"chatId"} type={"string"}>
  Filter by chat ID
</ResponseField>

<ResponseField name={"excludeOwnMessages"} type={"boolean"}>
  Exclude messages sent by current user (default: true)
</ResponseField>

<ResponseField name={"excludeReactions"} type={"boolean"}>
  Exclude tapback reactions from results
</ResponseField>

<ResponseField name={"hasAttachments"} type={"boolean"}>
  Only query messages with attachments
</ResponseField>

<ResponseField name={"limit"} type={"number"}>
  Limit number of results
</ResponseField>

<ResponseField name={"search"} type={"string"}>
  Search message text content (case-insensitive)
</ResponseField>

<ResponseField name={"sender"} type={"string"}>
  Filter by sender
</ResponseField>

<ResponseField name={"service"} type={"ServiceType"} typeHref={"/reference/stable/imessage-kit/types/ServiceType"}>
  Filter by service type
</ResponseField>

<ResponseField name={"since"} type={"Date"}>
  Only query messages after this time
</ResponseField>

<ResponseField name={"unreadOnly"} type={"boolean"}>
  Only query unread messages
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.