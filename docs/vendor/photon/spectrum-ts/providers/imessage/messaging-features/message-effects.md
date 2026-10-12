> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# iMessage message effects

> Send iMessage bubble and screen effects with text, markdown, or attachments.

iMessage supports bubble effects, which animate the sent message bubble, and
screen effects, which play a full-screen animation on receive. Wrap any
content with `effect()`:

```ts theme={null}
import { attachment } from "spectrum-ts";
import { effect, imessage } from "spectrum-ts/providers/imessage";

await space.send(effect("Happy birthday!", imessage.effect.message.celebration));
await space.send(
  effect(
    attachment("/path/to/photo.jpg"),
    imessage.effect.message.confetti
  )
);
```

The wrapped content can be a string, `markdown(...)`, or any
`attachment(...)`. Effects only apply on iMessage. Other platforms see the
inner content unchanged.

<Note>
  Sending effects requires the cloud `@spectrum-ts/imessage` package. The local
  package exports the helper for API consistency but rejects effect sends with
  an [UnsupportedError](/docs/reference/stable/spectrum-ts/symbols/unsupportederror).
</Note>

<AccordionGroup>
  <Accordion title="Bubble effects">
    [MessageEffect reference](/docs/reference/stable/advanced-imessage/symbols/messageeffect)
  </Accordion>

  <Accordion title="Screen effects">
    [MessageEffect reference](/docs/reference/stable/advanced-imessage/symbols/messageeffect)
  </Accordion>
</AccordionGroup>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.