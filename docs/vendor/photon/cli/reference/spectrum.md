> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# photon spectrum

> manage Spectrum users, lines, platforms, and profile

Generated from `@photon-ai/cli` `2.2.0`.

manage Spectrum users, lines, platforms, and profile

## Commands

* [photon spectrum avatar](/docs/cli/reference/spectrum/avatar) — manage the Spectrum avatar image
* [photon spectrum lines](/docs/cli/reference/spectrum/lines) — manage Spectrum phone lines on a project
* [photon spectrum platforms](/docs/cli/reference/spectrum/platforms) — manage Spectrum platform integrations on a project
* [photon spectrum profile](/docs/cli/reference/spectrum/profile) — view or update the Spectrum profile
* [photon spectrum users](/docs/cli/reference/spectrum/users) — manage Spectrum users on a project

## Options

| Flag | Description | Details |
| - | - | - |
| `-v, --version` | output the current version | Global |
| `--debug` | verbose output incl. HTTP request/response | Global |
| `-h, --help` | Display help for command | Global |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.