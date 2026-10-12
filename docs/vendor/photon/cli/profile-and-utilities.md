> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Profile & utilities

> Manage your developer profile and use diagnostic commands

## Profile

The `photon profile` commands manage your Photon developer or organization profile.

### View your profile

```sh theme={null}
photon profile show
```

Displays your account details and profile information.

### Create a profile

```sh theme={null}
photon profile init
```

Walks you through an interactive prompt to create a developer or organization profile. You can also pass flags directly for non-interactive use.

### Update your profile

```sh theme={null}
photon profile update --display-name "Jane Doe"
```

Updates specific fields on your existing profile. The available flags differ based on whether you have a developer or organization profile.

Aliases: `profile edit`.

## Utility commands

### ping

Test connectivity to the Photon API:

```sh theme={null}
photon ping
```

Hits the `/api/health` endpoint and prints the response. Useful for verifying that the backend is reachable and your network configuration is correct.

You can also ping an arbitrary URL directly (bypasses credential resolution):

```sh theme={null}
photon ping -u https://your-custom-backend.example.com
```

### env

Print the currently resolved backend:

```sh theme={null}
photon env current
```

```text theme={null}
production (https://app.photon.codes)
```

Useful for confirming which backend your commands will target, especially when using `PHOTON_API_HOST`.

### whoami

Show the authenticated user for the current backend:

```sh theme={null}
photon whoami
```

Prints your user ID, email, and name. Returns an error with a login hint if your session has expired.

### auth status

Show login state across all backends you've authenticated against:

```sh theme={null}
photon auth status
photon auth status --json
```

Lists each backend with its credential status. Flags corrupt or invalid credential files.

### config show

Dump the active CLI configuration (no secrets):

```sh theme={null}
photon config show
photon config show --json
```

Displays the config directory path, current backend, active `PHOTON_PROJECT_ID`, and relevant environment variable values.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.