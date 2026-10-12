> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Photon CLI

> Bring your agents to any interface — manage projects, Spectrum, billing, and your profile from the terminal

The Photon CLI replaces the [Dashboard](https://app.photon.codes) web UI for everyday work. Manage projects, Spectrum users and lines, billing, and your developer profile — all from a terminal.

```sh theme={null}
npx @photon-ai/cli login
```

You can run it on Node.js >= 18 — no additional runtime required.

## Quick demo

After [installing](/docs/cli/installation) the CLI:

```sh theme={null}
# Log in (opens a browser to approve the device)
photon login

# List your projects
photon projects ls

# Set a project for the current shell session
export PHOTON_PROJECT_ID=<project-id>

# Manage Spectrum resources
photon spectrum users ls
photon spectrum lines ls

# Check billing
photon billing show
```

## Command tree

[Browse the automatic command reference](/docs/cli/reference/index).

Run `photon <command> --help` for the full flag list of any command.

## The `pho` alias

After installing globally, a `pho` shortcut is created automatically the first time you run `photon`:

```sh theme={null}
pho projects ls     # same as: photon projects ls
pho whoami
```

The alias is only available for global installs — `npx` / `bunx` users don't get it since they're already typing the full package name.

## Global flags

[See the generated command and option reference](/docs/cli/reference/index).

All other flags (`--api-host`, `--project`, `--token`, `--json`, `--yes`, `--no-browser`) are **per-command** and must appear after the subcommand name.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.