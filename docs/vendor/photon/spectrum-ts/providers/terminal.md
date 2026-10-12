> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Terminal

> A full chat TUI for developing and testing agents locally.

```ts theme={null}
import { terminal } from "spectrum-ts/providers/terminal";
```

The terminal provider gives your agent a real chat interface in the terminal: multiple conversations in a sidebar, typing indicators, reactions, threaded replies, file attachments, and inline image rendering. It uses the same Spectrum APIs you use against iMessage or WhatsApp Business.

<Frame>
  <img src="https://framerusercontent.com/images/AMLYOPHgKunMxQPxUzQUFUTkvHM.png?width=2400&height=1260" alt="Terminal UI showing a chat sidebar with multiple conversations, message thread, and typing indicator" />
</Frame>

It is a drop-in test harness. Write your agent against the unified `app.messages` stream, and develop end-to-end without provisioning a phone number or pairing a device.

## Explore Terminal

<CardGroup cols={2}>
  <Card title="Setup and usage" icon="terminal" href="/docs/spectrum-ts/providers/terminal/setup-and-usage">
    Start the terminal provider, configure slash commands, and work with multiple spaces.
  </Card>

  <Card title="Interactions" icon="messages-square" href="/docs/spectrum-ts/providers/terminal/interactions">
    Use local reactions, replies, attachments, inline images, typing indicators, and console capture.
  </Card>
</CardGroup>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.