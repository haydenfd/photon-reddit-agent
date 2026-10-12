> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# photon billing

> view + manage your project's subscription

Generated from `@photon-ai/cli` `2.2.0`.

view + manage your project's subscription

## Commands

* [photon billing checkout](/docs/cli/reference/billing/checkout) — start a subscription checkout (interactive picker when no tier / --plan)
* [photon billing manage](/docs/cli/reference/billing/manage) — open the Stripe customer portal for this project
* [photon billing plans](/docs/cli/reference/billing/plans) — list available subscription plans
* [photon billing show](/docs/cli/reference/billing/show) — show the project's current subscription (defaults to \$PHOTON\_PROJECT\_ID)

## Options

| Flag | Description | Details |
| - | - | - |
| `-v, --version` | output the current version | Global |
| `--debug` | verbose output incl. HTTP request/response | Global |
| `-h, --help` | Display help for command | Global |


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.