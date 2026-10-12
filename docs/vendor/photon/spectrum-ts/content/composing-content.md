> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Composing content

> Send multiple content items or reply with multiple parts.

All send methods take a variadic list. Spectrum sends each item sequentially as a separate message:

```ts theme={null}
await space.send(
  "Here's the file you requested:",
  attachment("/path/to/document.pdf"),
);
```

This runs one `send()` per item on the underlying provider. It is not a single compound message.

Reach for [`group()`](/docs/spectrum-ts/content/groups) when you specifically want multiple items rendered as one bundled unit.

## Reply with multiple items

`message.reply(...)` has the same variadic signature and delegates to `space.send(reply(...))` internally:

```ts theme={null}
await message.reply(
  "Thanks for the question.",
  attachment("/path/to/answer.png"),
);
```

On platforms without thread support, `reply()` resolves as a no-op. If you need guaranteed delivery, use `space.send(...)` instead. See [Replies](/docs/spectrum-ts/content/replies) for the canonical form.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.