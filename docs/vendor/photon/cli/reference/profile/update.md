> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# photon profile update

> update your existing profile (preserves unchanged fields)

Generated from `@photon-ai/cli` `2.2.0`.

update your existing profile (preserves unchanged fields)

Aliases: `edit`.

## Options

| Flag | Description | Details |
| - | - | - |
| `--type &lt;type>` | developer \| organization | Value required |
| `--platforms &lt;list>` | comma-separated platforms you're building on | Value required |
| `--background &lt;text>` | what you're building | Value required |
| `--company-name &lt;name>` | organization: company name | Value required |
| `--api-host &lt;url>` | API host URL (defaults to PHOTON\_API\_HOST or built-in production) | Value required |
| `-t, --token &lt;token>` | API token (overrides stored creds) | Value required |
| `--json` | output JSON | |
| `-v, --version` | output the current version | Global |
| `--debug` | verbose output incl. HTTP request/response | Global |
| `-h, --help` | Display help for command | Global |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.