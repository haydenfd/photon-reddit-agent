> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# whatsappTemplateSchema

> WhatsApp-only template message content.

WhatsApp-only template message content. Lives entirely under the WhatsApp
Business provider — never enters the universal `Content` discriminated
union. The framework recognizes it via the generic content-level platform
contract: `__platform: "whatsapp_business"` lets
`findUnsupportedPlatformContent` warn-and-skip when a different platform
receives it.

Templates are the only message type Meta accepts outside the 24-hour
customer-service window (free-form sends fail with error 131047), so this
is the escape hatch for re-engaging stale conversations. v1 covers the
common case: a pre-approved template addressed by name + language, with
positional `{{1}}..{{n}}` body text parameters. Header/button components
can be added later without breaking this shape.

```typescript
const whatsappTemplateSchema: z.ZodObject<{ __platform: z.ZodLiteral<"whatsapp_business">; bodyParams: z.ZodOptional<z.ZodArray<z.ZodString>>; languageCode: z.ZodString; name: z.ZodString; type: z.ZodLiteral<"whatsapp-template"> }, z.core.$strip>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.