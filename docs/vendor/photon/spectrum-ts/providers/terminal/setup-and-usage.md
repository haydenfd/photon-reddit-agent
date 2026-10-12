> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Terminal setup and usage

> Start the terminal provider, configure slash commands, and work with multiple spaces.

The terminal provider works with no credentials and no required config.

## How it works

`terminal.config()` spawns the standalone [tuichat](https://github.com/photon-hq/tuichat) binary as a subprocess and drives it over JSON-RPC. The binary auto-downloads from GitHub Releases the first time you run it.

In a TTY it boots the rich UI. In a non-TTY context, such as CI or piped input, it falls back to a synchronous readline loop, so the same agent code works for scripted integration tests.

```ts theme={null}
import { Spectrum } from "spectrum-ts";
import { terminal } from "spectrum-ts/providers/terminal";

const app = await Spectrum({
  providers: [terminal.config()],
});

for await (const [space, message] of app.messages) {
  if (message.content.type === "text") {
    await space.send(`echo: ${message.content.text}`);
  }
}
```

No credentials, no config. Import and run.

## Config

```ts theme={null}
terminal.config({
  commands: [
    { name: "/clear", description: "Clear conversation memory" },
    { name: "/whoami", description: "Print sender details" },
  ],
});
```

| Option | Type | Default | Description |
| - | - | - | - |
| `commands` | `{ name: string; description?: string }[]` | `[]` | Slash commands surfaced in the TUI's command picker. Names must match `/^\/[A-Za-z0-9_-]+$/`. |

Slash commands arrive as regular text messages with the command string as the content. Handle them in your `for await` loop the same way you'd handle any text.

## Working with multiple spaces

By default the TUI starts on `chat-1`. New chats opened with `Ctrl+N` get `chat-2`, `chat-3`, and so on. To open a named space programmatically, pass an `id`:

```ts theme={null}
import { terminal } from "spectrum-ts/providers/terminal";

const t = terminal(app);
const debug = await t.space.get("debug");
await debug.send("agent online");
```

Calling `space.get()` ensures the chat exists in the sidebar. This is useful for kicking off a conversation before any user input.

## When to use it

* **Iterating on agent logic**: every Spectrum API works exactly as it would in production, so behavior you build here ships unchanged.
* **Integration tests**: pipe stdin in non-TTY mode and assert on stdout. CI does not need a TUI.
* **CLI tools**: use the same handler shape as any multi-platform deployment, with reactions and replies as first-class events.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.