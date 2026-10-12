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
spectrum(options: SpectrumPluginOptions): Elysia<"", { decorator: object; derive: object; resolve: object; store: object }, { error: object; typebox: object }, { macro: object; macroFn: object; parser: object; response: object; schema: object; standaloneSchema: object }, object, { derive: object; resolve: object; response: object; schema: object; standaloneSchema: object }, { derive: object; resolve: object; response: object; schema: object; standaloneSchema: object }>
```

Mount a Spectrum webhook endpoint on an Elysia app.

```ts
import { Elysia } from "elysia";
import { Spectrum } from "spectrum-ts";
import { spectrum } from "@spectrum-ts/elysia";

const app = await Spectrum({ ...,  webhookSecret: process.env.SPECTRUM_WEBHOOK_SECRET });

new Elysia()
  .use(spectrum({
    app,
    onMessage: async (space, message) => {
      if (message.content.type === "text") await space.send(`echo: ${message.content.text}`);
    },
  }))
  .listen(3000);
```

## Parameters

<ResponseField name={"options"} type={"SpectrumPluginOptions"} typeHref={"/reference/stable/spectrum-elysia/interfaces/SpectrumPluginOptions"} required />

## Returns

`Elysia<"", { decorator: object; derive: object; resolve: object; store: object }, { error: object; typebox: object }, { macro: object; macroFn: object; parser: object; response: object; schema: object; standaloneSchema: object }, object, { derive: object; resolve: object; response: object; schema: object; standaloneSchema: object }, { derive: object; resolve: object; response: object; schema: object; standaloneSchema: object }>`


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.