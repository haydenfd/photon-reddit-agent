> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Message

## Properties

<ResponseField name={"appliedReactions"} type={"readonly MessageAppliedReaction[]"} required>
  **Type:** <code>{"readonly "}[MessageAppliedReaction](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessageAppliedReaction){"[]"}</code>
</ResponseField>

<ResponseField name={"cachedRoomNames"} type={"string"} />

<ResponseField name={"chatActionType"} type={"number"} />

<ResponseField name={"chatGuids"} type={"readonly string[]"} required />

<ResponseField name={"content"} type={"MessageContent"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MessageContent"} required />

<ResponseField name={"dataDetectorResultsPresent"} type={"boolean"} required />

<ResponseField name={"dateCreated"} type={"Date"} required />

<ResponseField name={"dateDelivered"} type={"Date"} />

<ResponseField name={"dateEdited"} type={"Date"} />

<ResponseField name={"dateExpressiveSendPlayed"} type={"Date"} />

<ResponseField name={"datePlayed"} type={"Date"} />

<ResponseField name={"dateRead"} type={"Date"} />

<ResponseField name={"dateRetracted"} type={"Date"} />

<ResponseField name={"destinationCallerId"} type={"string"} />

<ResponseField name={"didNotifyRecipient"} type={"boolean"} required />

<ResponseField name={"groupTitle"} type={"string"} />

<ResponseField name={"guid"} type={"string"} required />

<ResponseField name={"isArchived"} type={"boolean"} required />

<ResponseField name={"isAudioMessage"} type={"boolean"} required />

<ResponseField name={"isAutoReply"} type={"boolean"} required />

<ResponseField name={"isCorrupt"} type={"boolean"} required />

<ResponseField name={"isDelayed"} type={"boolean"} required />

<ResponseField name={"isDelivered"} type={"boolean"} required />

<ResponseField name={"isDeliveredQuietly"} type={"boolean"} required />

<ResponseField name={"isExpirable"} type={"boolean"} required />

<ResponseField name={"isForward"} type={"boolean"} required />

<ResponseField name={"isFromMe"} type={"boolean"} required />

<ResponseField name={"isSent"} type={"boolean"} required />

<ResponseField name={"isServiceMessage"} type={"boolean"} required />

<ResponseField name={"isSpam"} type={"boolean"} required />

<ResponseField name={"isSystemMessage"} type={"boolean"} required />

<ResponseField name={"itemType"} type={"MessageItemType"} typeHref={"/reference/stable/advanced-imessage/grpc/types/MessageItemType"} required />

<ResponseField name={"partCount"} type={"number"} />

<ResponseField name={"placedStickers"} type={"readonly MessagePlacedSticker[]"} required>
  **Type:** <code>{"readonly "}[MessagePlacedSticker](/docs/reference/stable/advanced-imessage/grpc/interfaces/MessagePlacedSticker){"[]"}</code>
</ResponseField>

<ResponseField name={"reaction"} type={"MessageReaction"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/MessageReaction"} />

<ResponseField name={"reactionSelected"} type={"boolean"} />

<ResponseField name={"reactionTargetGuid"} type={"string"} />

<ResponseField name={"reactionTargetPartIndex"} type={"number"} />

<ResponseField name={"replyTargetGuid"} type={"string"} />

<ResponseField name={"sender"} type={"SingleServiceAddressInfo"} typeHref={"/reference/stable/advanced-imessage/grpc/interfaces/SingleServiceAddressInfo"} />

<ResponseField name={"sendErrorCode"} type={"number"} required />

<ResponseField name={"shareDirection"} type={"number"} />

<ResponseField name={"shareStatus"} type={"number"} />

<ResponseField name={"subject"} type={"string"} />

<ResponseField name={"threadOriginatorGuid"} type={"string"} />

<ResponseField name={"threadOriginatorPart"} type={"string"} />


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.