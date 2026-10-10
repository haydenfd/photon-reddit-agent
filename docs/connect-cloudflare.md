# Connect Cloudflare later

**Pending: every remote step below.** Local D1 works without a Cloudflare account.
Do not run this checklist as part of local development. No signup, CLI login,
remote database, secret, migration, deployment, or remote read/write has been tested.

1. **Owner account and verification.** The owner creates the Cloudflare account
   and completes email verification. Choose the intended account and review its
   D1/Workers limits before creating resources; this slice provisions nothing.
2. **CLI authorization.** From this repository, run
   `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false node node_modules/wrangler/bin/wrangler.js login`,
   finish the owner's browser authorization, and verify the account with the
   same prefix followed by `whoami`. Keep CLI/account credentials outside agent
   tool arguments and outside Git. Application tools use only `CRM_API_TOKEN`.
3. **Database and configuration.** With that authorization, run
   `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false node node_modules/wrangler/bin/wrangler.js d1 create reddit-tracker`.
   Replace the placeholder `database_id` in `wrangler.jsonc` with the returned
   ID, verify account/name/binding `DB`, and keep notifications disabled.
   The local runner uses `data/d1`; creating remote D1 does not copy its records.
4. **Remote schema and secrets.** Review/back up any existing remote data, then run
   `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV=false node node_modules/wrangler/bin/wrangler.js d1 migrations apply reddit-tracker --remote`.
   Store a new, unique application token through Wrangler's interactive
   `secret put CRM_API_TOKEN` command using that same prefix; do not pass its
   value as a command argument. Export `CRM_URL`/`CRM_API_TOKEN` in the client
   runtime later. Photon/Jev secrets belong only to the separately configured
   sender/grader; the CRM Worker needs neither. Decide and verify a full local
   D1 data transfer before changing database ownership. Export/import of all
   local CRM history/report tables is subsequent work; the legacy SQLite importer
   is not a complete D1-to-D1 migration. Publishing/routing the Worker endpoint
   is also a later, explicitly authorized hosting step, not part of this slice.
5. **One verified remote write/read.** After an authenticated remote Worker
   endpoint exists, use the CRM CLI to insert a clearly synthetic graded fixture
   and fetch its exact lead ID. Record the returned source/grade/status; record
   feedback and fetch its history. Repeat the fetch from a fresh process.
   Verify a wrong token returns 401 and confirm no notification was sent.
   Only then mark remote CRM access verified. Remote D1 schema creation alone
   does not establish that the application endpoint works.

For today, the remaining action is local: follow the [README smoke test](../README.md#two-minute-smoke-test).
