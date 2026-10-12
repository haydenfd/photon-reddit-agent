> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Polls

> Send poll prompts and receive selected options as content.

Use `poll()` to send a poll with a title and a list of choices. Each choice can be a plain string or a [PollChoiceInput](/docs/reference/stable/spectrum-ts/symbols/pollchoiceinput) object. Use `option()` when you want the explicit form.

```ts theme={null}
import { poll, option } from "spectrum-ts";

// Variadic strings
await space.send(poll("Lunch?", "Pizza", "Sushi", "Tacos"));

// Or an array, optionally using option() for clarity
await space.send(poll("Lunch?", [
  option("Pizza"),
  option("Sushi"),
  option("Tacos"),
]));
```

Poll responses arrive as `poll_option` content. See [Messages](/docs/spectrum-ts/messages) for narrowing on incoming votes.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.