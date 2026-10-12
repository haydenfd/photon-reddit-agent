> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Authentication

> Log in, manage tokens, work with multiple backends, and authenticate in CI

## Device flow login

The CLI uses a device authorization flow — you approve the login from a browser, no password is typed into the terminal.

```sh theme={null}
photon login
```

This opens your default browser to the Photon approval page. Once you approve, the CLI stores your access token locally and you're ready to go.

If you're on a headless machine (SSH session, container), pass `--no-browser` to get a URL you can open elsewhere:

```sh theme={null}
photon login --no-browser
```

## Verify your session

```sh theme={null}
photon whoami
```

Prints your user ID, email, and name. If the session has expired, you'll see a hint to re-run `photon login`.

## Log out

```sh theme={null}
photon logout
```

Revokes the session on the server and deletes the local credential file.

## Credential storage

Credentials are stored as JSON files with `600` permissions:

```
$PHOTON_CONFIG_DIR/credentials/<backend-key>.json
```

The config directory is resolved in this order:

1. `$PHOTON_CONFIG_DIR` — explicit override
2. `$XDG_CONFIG_HOME/photon` — XDG standard
3. `~/.config/photon/` — default

<Note>
  If a legacy `~/.config/photon-dashboard/` directory exists from a prior install, it migrates automatically on first run.
</Note>

### Multi-backend credentials

Credentials are stored **per backend**. You can be logged into production and a staging server simultaneously — each gets its own credential file keyed by a sanitized hostname (e.g. `production`, `staging-app_photon_codes`, `localhost_3000`).

```sh theme={null}
# Log in to production (default)
photon login

# Log in to staging
photon login --api-host https://staging-app.photon.codes

# Check all backends at once
photon auth status
```

`photon auth status` shows the login state for every backend you've authenticated against. Pass `--json` for machine-readable output.

## Backend host

Every command talks to a backend URL. The default is production (`https://app.photon.codes`). To target a different backend, set `PHOTON_API_HOST` or use the `--api-host` flag:

```sh theme={null}
# Environment variable — applies to every command in this shell
export PHOTON_API_HOST=https://staging-app.photon.codes
photon projects ls

# Per-command flag
photon projects ls --api-host https://staging-app.photon.codes

# Inline
PHOTON_API_HOST=http://localhost:3000 photon projects ls
```

Resolution order: `--api-host` flag > `PHOTON_API_HOST` env var > built-in production URL.

Check the resolved host with:

```sh theme={null}
photon env current
```

## Setting an active project

Most commands operate on a single project. Specify it per-command or per-shell:

```sh theme={null}
# Per command
photon spectrum users ls --project abc123

# Per shell session
export PHOTON_PROJECT_ID=abc123
photon spectrum users ls
```

Resolution order: `--project` flag > `$PHOTON_PROJECT_ID` > error with a hint.

<Note>
  Put `export PHOTON_PROJECT_ID='...'` in your shell rc, or use [direnv](https://direnv.net/) to scope it to a project directory.
</Note>

## CI and scripting

For non-interactive environments, pass a token directly instead of running the device flow:

```sh theme={null}
# Flag
photon projects ls --token "$PHOTON_TOKEN"

# Environment variable
PHOTON_TOKEN=ey... photon projects ls
```

Get the token from your local credentials file (under `$PHOTON_CONFIG_DIR/credentials/<key>.json`) after authenticating once with `photon login`.

Pair with `--json` for machine-readable output:

```sh theme={null}
photon projects ls --json | jq '.[] | .id'
photon billing show --json
```

[See the generated command and option reference](/docs/cli/reference/index).

<Note>
  `PHOTON_TOKEN` reuses the access token from the device flow (default 7-day expiry). Re-run `photon login` when it expires. A long-lived API key path is on the roadmap.
</Note>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.