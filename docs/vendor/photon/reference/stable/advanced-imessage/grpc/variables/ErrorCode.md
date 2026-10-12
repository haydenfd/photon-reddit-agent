> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# ErrorCode

> Canonical error codes returned by the server.

Modelled as an `as const` object so that both the runtime values and the
union type are available, with full autocomplete.

```typescript
const ErrorCode: { addressNotFound: "addressNotFound"; attachmentNotFound: "attachmentNotFound"; attachmentNotReady: "attachmentNotReady"; burstRateExceeded: "burstRateExceeded"; chatNotFound: "chatNotFound"; contentDuplicateExceeded: "contentDuplicateExceeded"; dailyLimitExceeded: "dailyLimitExceeded"; databaseError: "databaseError"; duplicateMessage: "duplicateMessage"; groupIconNotFound: "groupIconNotFound"; internalError: "internalError"; invalidArgument: "invalidArgument"; messageNotFound: "messageNotFound"; networkError: "networkError"; newContactThrottled: "newContactThrottled"; operationNotSupported: "operationNotSupported"; pollNotFound: "pollNotFound"; preconditionFailed: "preconditionFailed"; privateApiUnavailable: "privateApiUnavailable"; recipientCoolingDown: "recipientCoolingDown"; recipientLimitExceeded: "recipientLimitExceeded"; recipientLocked: "recipientLocked"; sendReceiveRatioExceeded: "sendReceiveRatioExceeded"; serviceUnavailable: "serviceUnavailable"; sharedFriendLocationNotFound: "sharedFriendLocationNotFound"; timeout: "timeout"; tokenBlocked: "tokenBlocked"; tokenExpired: "tokenExpired"; unauthenticated: "unauthenticated"; unauthorized: "unauthorized"; uploadRateExceeded: "uploadRateExceeded" }
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.