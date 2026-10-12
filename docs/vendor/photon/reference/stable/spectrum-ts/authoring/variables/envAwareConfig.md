> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# envAwareConfig

> Rewrite a platform's config schema so every string-leaf field falls back to when omitted which is the equivalent of hand-wrapping each field with .

Rewrite a platform's config schema so every string-leaf field falls back to
`SPECTRUM_<PLATFORM>_<KEY>` when omitted which is the equivalent of
hand-wrapping each field with [fromEnv](/docs/reference/stable/spectrum-ts/authoring/variables/fromEnv). Called once by
`definePlatform`, so adapters declare plain Zod and get env fallback for free.

* **object**: each string-leaf field is wrapped with `fromEnv`; non-string
  fields (records, arrays, nested objects, booleans, numbers) are left as-is.
  The object is only reconstructed when a field actually changed, and
  `.strict()` is preserved so an empty strict "cloud" branch is untouched.
* **union**: each option is rewritten independently, so an env value only
  satisfies the branch that declares that field (a direct/cloud union stays
  correctly discriminated).
* anything else is returned unchanged.

The output type is identical to the input schema's. Only omitted fields gain
an env fallback which means that `z.infer` and downstream contexts are unaffected.

```typescript
const envAwareConfig: (name: string, schema: T) => T
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.