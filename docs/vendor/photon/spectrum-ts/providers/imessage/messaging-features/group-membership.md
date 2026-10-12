> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# iMessage group membership

> Add, remove, list, and leave members of an iMessage group chat.

Add or remove members with `space.add()` / `space.remove()`, or leave the group
with `space.leave()` — or use the canonical `addMember()` / `removeMember()` /
`leaveSpace()` content builders:

```ts theme={null}
import { addMember, leaveSpace, removeMember } from "spectrum-ts";

// Sugar
await space.add("+15553333333");
await space.add([alice, "carol@example.com"]); // batches land in one call
await space.remove("+15553333333");
await space.leave();

// Canonical
await space.send(addMember("+15553333333"));
await space.send(removeMember("+15553333333"));
await space.send(leaveSpace());
```

Members are E.164 phone numbers or emails — the same handles `space.create`
accepts.

List the current roster with `space.getMembers()`. Each entry's `id` is the
canonical address, so the results feed straight back into `add()` / `remove()`
/ `space.create()`; the agent's own number is excluded:

```ts theme={null}
import { imessage } from "spectrum-ts/providers/imessage";

const members = await space.getMembers();
await space.remove(members.filter((member) => member.id.endsWith("@example.com")));

// Typed extras (address/country/service) via the narrowed instance
const im = imessage(app);
const detailed = await im.getMembers(space);
for (const member of detailed) {
  console.log(member.address, member.service);
}
```

Membership management requires `@spectrum-ts/imessage` and only works on group
chats. With `@spectrum-ts/imessage-local`, or on a DM, it throws an
[UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror) — a DM cannot be converted into a group, so create a new
group with `space.create` instead. `getMembers()` has the same constraints.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.