> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# UserInfo

> User information returned by adapter.getUser()

## Properties

<ResponseField name={"avatarUrl"} type={"string"}>
  URL to the user's avatar/profile image
</ResponseField>

<ResponseField name={"email"} type={"string"}>
  User's email address (requires appropriate scopes on some platforms)
</ResponseField>

<ResponseField name={"fullName"} type={"string"} required>
  User's display name / full name
</ResponseField>

<ResponseField name={"isBot"} type={"boolean"} required>
  Whether the user is a bot
</ResponseField>

<ResponseField name={"userId"} type={"string"} required>
  Platform-specific user ID
</ResponseField>

<ResponseField name={"userName"} type={"string"} required>
  Username/handle
</ResponseField>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.