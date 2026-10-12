> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Inbound iMessage group events

> Handle iMessage membership and group metadata changes from other participants.

Inbound group events require a dedicated cloud line, available on the Business
plan. Group changes made by other members then arrive as inbound messages on
`app.messages`, carrying the same content types you send:

<Warning>
  Shared-pool cloud lines and `@spectrum-ts/imessage-local` do not subscribe to
  the group-event stream. Your app will not receive membership or
  group-metadata changes through `app.messages` in either case. Calling
  `space.get(chatGuid)` does not enable group events.
</Warning>

| Someone… | `content.type` | `message.sender` |
| - | - | - |
| adds a member | `"addMember"` (`members` = who was added) | who added them |
| removes a member | `"removeMember"` (`members` = who was removed) | who removed them |
| leaves the group | `"leaveSpace"` | the leaver |
| renames the group | `"rename"` (`displayName`) | who renamed it |
| changes the icon | `"avatar"` (`action.kind === "set"`, bytes behind `action.read()`) | who changed it |
| clears the icon | `"avatar"` (`action.kind === "clear"`) | who cleared it |

```ts theme={null}
for await (const [space, message] of app.messages) {
  if (message.content.type === "addMember") {
    console.log(
      `${message.sender?.id ?? "someone"} added ${message.content.members.join(", ")}`
    );
  }
}
```

Semantics to rely on:

* `message.sender` may be `undefined` — Apple does not always record the actor.
  The affected member is always present (in `members`, or as the sender for
  `leaveSpace`).
* The agent's own actions never echo back: `space.add(...)`,
  `space.rename(...)`, and friends are suppressed from the inbound stream,
  matching how self-sent messages behave.
* Icon-change events carry a snapshot of the icon fetched at event time; an
  icon that was already replaced or removed by then is skipped (the follow-up
  event carries the current state).
* On dedicated lines, group events ride the same durable catch-up log as
  messages and polls, so changes that happen while the app is down are replayed
  on reconnect. After a cursor gap, reconcile with `space.getMembers()` /
  `space.getAvatar()`.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.