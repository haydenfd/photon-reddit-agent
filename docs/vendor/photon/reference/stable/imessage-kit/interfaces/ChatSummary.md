> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ChatSummary

> Chat summary information Used by sdk.listChats() to help developers discover chatId

Chat summary information

Used by sdk.listChats() to help developers discover chatId

## Properties

<ResponseField name={"chatId"} type={"string"} required>
  Chat identifier (e.g., 'iMessage;+1234567890' or group guid)
</ResponseField>

<ResponseField name={"displayName"} type={"string | null"} required>
  Display name (group name or contact name); may be null
</ResponseField>

<ResponseField name={"isGroup"} type={"boolean"} required>
  Whether this chat is a group
</ResponseField>

<ResponseField name={"lastMessageAt"} type={"Date | null"} required>
  Time of the last message in this chat; may be null
</ResponseField>

<ResponseField name={"unreadCount"} type={"number"} required>
  Number of unread messages in this chat
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.