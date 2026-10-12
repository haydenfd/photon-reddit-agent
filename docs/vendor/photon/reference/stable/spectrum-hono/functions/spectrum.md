> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# spectrum

```typescript
spectrum(options: SpectrumPluginOptions): Hono<BlankEnv, object, "/", string>
```

Mount a Spectrum webhook endpoint on a Hono app.

```ts
import { Hono } from "hono";
import { Spectrum } from "spectrum-ts";
import { spectrum } from "@spectrum-ts/hono";

const app = await Spectrum({ ...,  webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET });

const server = new Hono().route("/", spectrum({
  app,
  onMessage: async (space, message) => {
    if (message.content.type === "text") await space.send(`echo: ${message.content.text}`);
  },
}));
```

## Parameters

<ResponseField name={"options"} type={"SpectrumPluginOptions"} typeHref={"/reference/stable/spectrum-hono/interfaces/SpectrumPluginOptions"} required />

## Returns

`Hono<BlankEnv, object, "/", string>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.