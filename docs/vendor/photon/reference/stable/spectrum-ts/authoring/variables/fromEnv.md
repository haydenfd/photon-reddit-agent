> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# fromEnv

> Wrap a config-field schema so it falls back to an environment variable when the field is omitted.

Wrap a config-field schema so it falls back to an environment variable when
the field is omitted. Precedence is **explicit value > env var > the inner
schema's own default/required check**:

* An explicit value (anything other than `undefined`) is passed straight
  through — a caller-supplied config always wins over the environment.
* When the field is `undefined`, `process.env[envKey]` is substituted. An
  env var set to the empty string is treated as unset (a common deploy
  footgun) so it doesn't satisfy a `.min(1)` by accident.
* The inner `schema` then validates the resolved value, keeping its exact
  semantics — regex, `.min(1)`, `.url()`, `.optional()`, `.default(...)`.
  When both the field and the env var are absent, a required inner schema
  raises its normal "required" error.

The output type is the inner schema's output type, so call sites are
unchanged. Because substitution only happens on `undefined`, wrapping a
field inside a `z.object` leaves it a plain key on the parsed result — union
discriminators like `"accessToken" in config` keep working.

```ts
botToken: fromEnv("SPECTRUM_TELEGRAM_BOT_TOKEN", z.string().regex(BOT_TOKEN_PATTERN)),
```

```typescript
const fromEnv: (envKey: string, schema: T) => z.ZodPreprocess<T>
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.