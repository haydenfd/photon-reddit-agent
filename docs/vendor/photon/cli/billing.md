> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Billing

> View plans, manage subscriptions, and open Stripe portals from the CLI

The `photon billing` commands let you view available plans, check your current subscription, start a checkout, and manage billing through the Stripe Customer Portal.

All billing commands require an active project. Set `$PHOTON_PROJECT_ID` or pass `--project <id>`.

## List available plans

```sh theme={null}
photon billing plans
```

Shows all plans and their Stripe price IDs. Use the price ID with `checkout` to subscribe.

## View current subscription

```sh theme={null}
photon billing show
photon billing show --json
```

Displays the active subscription for the current project, including plan details and status.

## Start a checkout

```sh theme={null}
# Interactive picker — recommended for first-time use
photon billing checkout

# Skip the picker with a positional tier
photon billing checkout pro
photon billing checkout business --qty 5

# Use a specific Stripe price (escape hatch)
photon billing checkout --plan price_xxx
```

When you run this command, the CLI creates a Stripe Checkout session and opens it in your browser. If you don't pass any arguments, you get an interactive picker listing the available plans. Pass a `[tier]` positional or `--plan <price-id>` to skip the picker.

Available tiers: `pro`, `business`, `enterprise`.

[See the generated command and option reference](/docs/cli/reference/billing).

<Note>
  For project-scoped subscription management (which smart-routes between Checkout and the Stripe Portal), use [`photon projects upgrade`](/docs/cli/projects#upgrade-subscription) instead.
</Note>

## Manage subscription (Stripe Portal)

```sh theme={null}
photon billing manage
```

Opens the Stripe Customer Portal where you can update payment methods, change plans, view invoices, or cancel. Pass `--no-browser` to get the portal URL printed to the terminal.

Aliases: `billing portal`.

## Common flags

[See the generated command and option reference](/docs/cli/reference/billing).


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.