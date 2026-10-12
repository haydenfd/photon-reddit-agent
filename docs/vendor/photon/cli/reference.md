> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# photon

> Photon CLI — bring your agents to any interface

Generated from `@photon-ai/cli` `2.2.0`.

Photon CLI — bring your agents to any interface

## Commands

* [photon auth](/docs/cli/reference/auth) — inspect authentication state across backends
* [photon billing](/docs/cli/reference/billing) — view + manage your project's subscription
* [photon config](/docs/cli/reference/config) — inspect Photon CLI configuration
* [photon env](/docs/cli/reference/env) — show the active backend (set via PHOTON\_API\_HOST or --api-host)
* [photon login](/docs/cli/reference/login) — authenticate via the device authorization flow
* [photon logout](/docs/cli/reference/logout) — clear stored credentials for the active backend
* [photon ping](/docs/cli/reference/ping) — hit the Photon Dashboard /api/health endpoint
* [photon profile](/docs/cli/reference/profile) — view or manage your developer / organization profile
* [photon projects](/docs/cli/reference/projects) — manage your Photon Dashboard projects
* [photon spectrum](/docs/cli/reference/spectrum) — manage Spectrum users, lines, platforms, and profile
* [photon update](/docs/cli/reference/update) — update Photon to the latest release
* [photon whoami](/docs/cli/reference/whoami) — show the user authenticated for the active backend

## Options

| Flag | Description | Details |
| - | - | - |
| `-v, --version` | output the current version | |
| `--debug` | verbose output incl. HTTP request/response | |
| `-h, --help` | Display help for command | Global |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.