> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# photon projects

> manage your Photon Dashboard projects

Generated from `@photon-ai/cli` `2.2.0`.

manage your Photon Dashboard projects

Aliases: `project`.

## Commands

* [photon projects check-phone](/docs/cli/reference/projects/check-phone) — check whether a phone number is available on Spectrum
* [photon projects create](/docs/cli/reference/projects/create) — create a new project
* [photon projects delete](/docs/cli/reference/projects/delete) — permanently delete a project (defaults to \$PHOTON\_PROJECT\_ID)
* [photon projects list](/docs/cli/reference/projects/list) — list your projects
* [photon projects open](/docs/cli/reference/projects/open) — open the project in the dashboard web UI (defaults to \$PHOTON\_PROJECT\_ID)
* [photon projects regenerate-secret](/docs/cli/reference/projects/regenerate-secret) — rotate the project's Spectrum API secret (defaults to \$PHOTON\_PROJECT\_ID)
* [photon projects secret](/docs/cli/reference/projects/secret) — print the project's Spectrum API secret (defaults to \$PHOTON\_PROJECT\_ID)
* [photon projects show](/docs/cli/reference/projects/show) — show details for one project (defaults to \$PHOTON\_PROJECT\_ID)
* [photon projects update](/docs/cli/reference/projects/update) — rename a project (defaults to \$PHOTON\_PROJECT\_ID)
* [photon projects upgrade](/docs/cli/reference/projects/upgrade) — subscribe / pay for a project (smart-routes to Stripe checkout or billing portal)

## Options

| Flag | Description | Details |
| - | - | - |
| `-v, --version` | output the current version | Global |
| `--debug` | verbose output incl. HTTP request/response | Global |
| `-h, --help` | Display help for command | Global |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.