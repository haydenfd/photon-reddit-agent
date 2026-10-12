> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# WhatsApp Business conversations

> Resolve WhatsApp users and start supported 1:1 conversations.

WhatsApp Business supports 1:1 conversations. The provider rejects group creation explicitly.

## Starting a conversation

Resolve a user by their WhatsApp phone number in international format with digits only, then open a 1:1 space:

```ts theme={null}
const wa = whatsappBusiness(app);
const customer = await wa.user("15551234567");
const space = await wa.space.create(customer);

await space.send("Thanks for reaching out.");
```

Passing more than one user to `space.create()` throws.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.