> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# AdvancedIMessage

```typescript
interface AdvancedIMessage extends AsyncDisposable
```

## Properties

<ResponseField name={"addresses"} type={"AddressesResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/AddressesResource"} required>
  Address APIs.

  * `get(address)` returns the server's known address record, country, and
    available transport services.
  * `isFocusSilenced(address)` checks whether this device's Focus settings
    would silence notifications from the address.
  * `isIMessageAvailable(address)` checks live iMessage reachability.
</ResponseField>

<ResponseField name={"attachments"} type={"AttachmentsResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/AttachmentsResource"} required>
  Attachment APIs.

  * `get(attachment)` fetches metadata for an uploaded or received
    attachment.
  * `upload(input)` uploads file bytes and optional Live Photo companion
    data.
  * `downloadStream(attachment)` streams a header frame followed by byte
    chunks.
</ResponseField>

<ResponseField name={"chats"} type={"ChatsResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/ChatsResource"} required>
  Chat APIs.

  * `create(addresses, options)` creates a direct or group chat, optionally
    with an opening message.
  * `get(chat)` fetches one chat by guid.
  * `count(options)` counts visible chats, optionally including archived
    chats.
  * `hasBackground(chat)` checks whether a chat has a custom background.
  * `setBackground(chat, data)` replaces a chat background image.
  * `removeBackground(chat)` clears a chat background image.
  * `markRead(chat)` marks every unread message in the chat as read.
  * `shareContactInfo(chat)` sends the local account's contact card.
  * `setTyping(chat, isTyping)` starts or stops the transient typing
    indicator.
</ResponseField>

<ResponseField name={"groups"} type={"GroupsResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/GroupsResource"} required>
  Group APIs.

  * `setDisplayName(chat, displayName, options)` renames a group chat.
  * `addParticipants(chat, addresses, options)` invites addresses into a
    group chat.
  * `removeParticipants(chat, addresses, options)` removes addresses from a
    group chat.
  * `leave(chat, options)` makes the local account leave a group chat.
  * `setIcon(chat, data, options)` replaces the group photo.
  * `getIcon(chat)` downloads the group photo bytes and MIME type.
  * `removeIcon(chat, options)` clears the group photo.
</ResponseField>

<ResponseField name={"locations"} type={"LocationsResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/LocationsResource"} required>
  Shared-location APIs.

  * `list()` returns every friend currently sharing a location.
  * `get(address)` fetches the latest snapshot for one friend.
  * `request(chat, address)` sends a visible Find My request card.
</ResponseField>

<ResponseField name={"messages"} type={"MessagesResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/MessagesResource"} required>
  Message APIs.

  * `sendText(chat, text, options)` sends text with replies, subjects,
    effects, link previews, data-detector scanning, and formatting.
  * `sendAttachment(chat, attachment, options)` sends an uploaded attachment
    by GUID with replies, effects, and audio-message mode.
  * `sendMultipart(chat, parts, options)` sends multiple text / attachment /
    mention bubbles atomically.
  * `sendCustomizedMiniApp(chat, message, options)` sends a mini app card
    backed by the caller's own iMessage extension and returns the session
    needed for updates.
  * `updateCustomizedMiniApp(session, message, options)` updates a
    caller-owned mini app card in place.
  * `edit(chat, message, newText, options)` edits an existing message.
  * `unsend(chat, message, options)` retracts an existing message.
  * `setReaction(chat, message, reaction, isSet, options)` adds or removes
    a tapback / emoji reaction.
  * `placeSticker(chat, message, sticker, placement, options)` places an
    uploaded sticker attachment on a message.
  * `notifySilenced(chat, message, options)` triggers Apple's Notify Anyway
    action for a Focus-silenced conversation.
  * `get(message)` fetches one message by its guid.
  * `listRecent(filter)` pages through recent messages across chats.
  * `listInChat(chat, filter)` pages through messages in one chat.
  * `getEmbeddedMedia(chat, message)` downloads Digital Touch / handwritten
    embedded media bytes.
</ResponseField>

<ResponseField name={"polls"} type={"PollsResource"} typeHref={"/reference/stable/advanced-imessage/http/interfaces/PollsResource"} required>
  Poll APIs.

  * `create(chat, title, choices, options)` creates a poll message.
  * `get(pollMessage)` reads the latest poll state.
  * `vote(pollMessage, optionId, options)` casts or changes the local
    account's vote.
  * `unvote(pollMessage, options)` removes the local account's vote.
  * `addOption(pollMessage, text, options)` appends a new choice.
</ResponseField>

## Methods

### close()

```typescript
close(): Promise<void>
```

#### Returns

`Promise<void>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.