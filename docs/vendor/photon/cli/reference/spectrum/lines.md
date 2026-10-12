> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# photon spectrum lines

> manage Spectrum phone lines on a project

Generated from `@photon-ai/cli` `2.2.0`.

manage Spectrum phone lines on a project

## Commands

* [photon spectrum lines add](/docs/cli/reference/spectrum/lines/add) — add a new line (currently iMessage only)
* [photon spectrum lines avatar](/docs/cli/reference/spectrum/lines/avatar) — manage a dedicated iMessage line avatar
* [photon spectrum lines list](/docs/cli/reference/spectrum/lines/list) — list lines for the active project
* [photon spectrum lines profile](/docs/cli/reference/spectrum/lines/profile) — manage a dedicated iMessage line profile
* [photon spectrum lines remove](/docs/cli/reference/spectrum/lines/remove) — remove a line

## Options

| Flag | Description | Details |
| - | - | - |
| `-v, --version` | output the current version | Global |
| `--debug` | verbose output incl. HTTP request/response | Global |
| `-h, --help` | Display help for command | Global |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.