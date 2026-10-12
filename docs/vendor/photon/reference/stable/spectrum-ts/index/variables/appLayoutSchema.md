> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# appLayoutSchema

> Visible layout of an app card.

Visible layout of an app card. Mirrors Apple's `MSMessageTemplateLayout`
(the iMessage mini-app surface) — the iMessage provider renders it natively;
other platforms ignore it and fall back to the bare URL. At least one of
`caption`, `subcaption`, `trailingCaption`, `trailingSubcaption`, or `image`
must be set so the bubble is not empty — `summary` is the fallback text shown
on surfaces that cannot render the card and is not a visible slot on its own.
`image` and `imageTitle` must be set together; `imageSubtitle` requires
`image`.

```typescript
const appLayoutSchema: z.ZodObject<{ caption: z.ZodOptional<z.ZodString>; image: z.ZodOptional<z.ZodCustom<Uint8Array<ArrayBuffer>, Uint8Array<ArrayBuffer>>>; imageSubtitle: z.ZodOptional<z.ZodString>; imageTitle: z.ZodOptional<z.ZodString>; subcaption: z.ZodOptional<z.ZodString>; summary: z.ZodOptional<z.ZodString>; trailingCaption: z.ZodOptional<z.ZodString>; trailingSubcaption: z.ZodOptional<z.ZodString> }, z.core.$strip>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.