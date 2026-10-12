> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Projects

> Create, manage, and configure Photon projects from the CLI

Projects are the top-level container in Photon. Each project has its own Spectrum configuration, users, lines, and billing subscription.

## List projects

```sh theme={null}
photon projects ls
photon projects ls --json
```

Aliases: `project ls`, `projects list`.

## Show project details

```sh theme={null}
photon projects show
photon projects show <project-id>
```

Defaults to `$PHOTON_PROJECT_ID` if no ID is given. Aliases: `projects get`.

## Create a project

```sh theme={null}
photon projects create
```

Without flags, the CLI walks you through an interactive prompt. You can also pass flags directly:

```sh theme={null}
photon projects create --name "My Project" --location us-east --spectrum
```

[See the generated command and option reference](/docs/cli/reference/projects).

Aliases: `projects new`.

## Update a project

```sh theme={null}
photon projects update <project-id> --name "New Name"
```

Fetches the current project, overlays your changes, and patches. Defaults to `$PHOTON_PROJECT_ID` if no ID is given.

Aliases: `projects edit`, `projects set`.

## Delete a project

```sh theme={null}
photon projects delete <project-id>
photon projects delete <project-id> -y   # skip confirmation
```

<Warning>
  This is a permanent, irreversible operation. The CLI asks for confirmation unless you pass `-y`.
</Warning>

Aliases: `projects rm`, `projects remove`.

## Rotate the Spectrum API secret

```sh theme={null}
photon projects regenerate-secret <project-id>
photon projects regenerate-secret -y
```

Generates a new Spectrum API secret for the project. The old secret stops working immediately.

Aliases: `projects rotate-secret`.

## Open in the dashboard

```sh theme={null}
photon projects open
photon projects open <project-id>
photon projects open --no-browser   # prints the URL instead
```

Opens the project's Dashboard page in your default browser.

## Upgrade subscription

Use this command to subscribe a project or manage its existing subscription. The CLI routes you to the right Stripe surface based on the project's current state:

* **Free or unsubscribed projects** — opens Stripe Checkout
* **Active or past-due subscriptions** — opens the Stripe Customer Portal (change plan, payment method, cancel, etc.)

```sh theme={null}
# Interactive picker (recommended)
photon projects upgrade

# Skip the picker with a positional tier
photon projects upgrade pro
photon projects upgrade <project-id> business

# Force a specific flow
photon projects upgrade --checkout         # always Checkout, even if subscribed
photon projects upgrade --manage           # always Portal (downgrade / cancel / change card)

# Use a specific Stripe price (escape hatch)
photon projects upgrade --plan price_xxx
```

Available tiers: `pro`, `business`, `enterprise`.

[See the generated command and option reference](/docs/cli/reference/projects).

<Note>
  `--manage` wins over `[tier]` / `--plan` / `--checkout` when both are passed. Downgrades and cancellations live in the Stripe Portal — there's no dedicated `downgrade` command.
</Note>

## Check phone number availability

```sh theme={null}
photon projects check-phone +15551234567
```

Checks whether a phone number is available for Spectrum.

## Common flags

These flags are available on most project commands:

[See the generated command and option reference](/docs/cli/reference/projects).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.