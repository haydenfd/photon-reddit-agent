> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/migrations

# Migrate to Maritime

Move the automation layer of your cloud onto Maritime agents: cron jobs, scheduled functions, background workers, and
bots. Each guide below inventories a provider with read-only credentials, recreates every workload as a Maritime
agent with a schedule and encrypted env vars, verifies it end to end, and only then hands you a reversible cutover
checklist. Hosting is a flat price per agent per month (see
[Billing & plans](https://maritime.sh/docs/billing)), and auto-sleep means a cron agent costs the same whether it
runs for one second or one hour.

> **Note:** **The safety model, in one box.** Inventory runs on read-only credentials you mint for the occasion.
> Credentials travel through env vars, never chat. Nothing on the source provider is modified or deleted by an agent,
> ever: cutover is a checklist you run yourself, and every checklist starts with a reversible step (disable, pause,
> scale to zero) before any delete. Both sides run in parallel until you are satisfied.

Provider guides:

- [AWS](https://maritime.sh/docs/migrations/aws)
- [Google Cloud](https://maritime.sh/docs/migrations/gcp)
- [Azure](https://maritime.sh/docs/migrations/azure)
- [Cloudflare](https://maritime.sh/docs/migrations/cloudflare)
- [Vercel](https://maritime.sh/docs/migrations/vercel)
- [Heroku](https://maritime.sh/docs/migrations/heroku)
- [Fly.io](https://maritime.sh/docs/migrations/fly)
- [Render](https://maritime.sh/docs/migrations/render)
- [DigitalOcean](https://maritime.sh/docs/migrations/digitalocean)
- [VPS / SSH](https://maritime.sh/docs/migrations/vps)

## How every migration works

All ten guides follow the same five steps. They are written to be followed by a coding agent (point Claude Code or
your Maritime agent at one) or by a human in a terminal. Each summary below links to the complete step-by-step
runbook for that provider.

1. **Inventory**: sweep the provider with its own CLI and read-only credentials, and list everything agent-shaped:
   things that wake up, do a job, and go quiet.
2. **Map**: schedule expressions become cron triggers, env vars and secrets become encrypted agent env vars, logs
   become `maritime logs`.
3. **Recreate**: an LLM-driven bot lands on a [framework template](https://maritime.sh/docs/templates); arbitrary
   code lands as a [bring-your-own container](https://maritime.sh/docs/frameworks/custom) from your repo. Porting a
   serverless function into a container is real work, and the guides say so instead of pretending.
4. **Verify**: the new agent must do the job at least once, checked against a known-good run, while the old side is
   still untouched.
5. **Cut over**: disable the old schedule (reversible), watch for a few days, then delete, in that order, with your
   own credentials.

```
npm i -g maritime-cli && maritime login
maritime keys create --name migration --json   # mk_... shown once
export MARITIME_TOKEN=mk_...

maritime templates --json                      # pick a template id from the live list
maritime create nightly-report --template <id> --json
maritime env import nightly-report ./old-provider.env --reload --json
maritime chat nightly-report "run your task once now and report" --json
```

Schedules are recreated as cron triggers on the agent page (see
[Triggers & schedules](https://maritime.sh/docs/triggers)). One gotcha worth knowing up front: timers inside a
sleeping VM do not fire, so scheduled work belongs in a trigger, not in an in-process scheduler, unless the agent is
always-on.

## Migrate from AWS

**What moves:** Scheduled Lambda functions, EventBridge cron rules, ECS scheduled tasks, and bots or workers running
on EC2 instances. Lambda env vars, Secrets Manager entries, and SSM parameters become encrypted agent env vars.

```
# Inventory with a read-only IAM user (ReadOnlyAccess policy)
aws events list-rules --query 'Rules[?ScheduleExpression!=null].[Name,ScheduleExpression,State]' --output table
aws lambda list-functions --query 'Functions[].[FunctionName,Runtime]' --output table
```

EventBridge cron has six fields with ? placeholders; Maritime triggers use standard five-field cron.
cron(0 12 * * ? *) becomes 0 12 * * *, and rate(5 minutes) becomes */5 * * * *.

**What stays:** S3, DynamoDB, RDS, and Route 53 stay on AWS. Your agent keeps calling them with scoped credentials.
VPC-only resources (a private RDS, anything without a public endpoint) are unreachable from Maritime, so flag those
before deciding.

[Read the full AWS runbook →](https://maritime.sh/docs/migrations/aws)

Official docs:
[events list-rules reference](https://docs.aws.amazon.com/cli/latest/reference/events/list-rules.html),
[events delete-rule reference](https://docs.aws.amazon.com/cli/latest/reference/events/delete-rule.html),
[lambda get-function reference](https://docs.aws.amazon.com/cli/latest/reference/lambda/get-function.html),
[Lambda GetFunction API](https://docs.aws.amazon.com/lambda/latest/api/API_GetFunction.html),
[secretsmanager get-secret-value](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/get-secret-value.html),
[EventBridge schedule expressions](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html),
[Scheduler schedule types and timezones](https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html),
[ReadOnlyAccess policy reference](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ReadOnlyAccess.html)

## Migrate from Google Cloud

**What moves:** Cloud Scheduler jobs, scheduled Cloud Functions, Cloud Run jobs, and bots on Compute Engine. Secret
Manager values move into encrypted agent env vars. Cloud Scheduler already uses five-field cron plus a timezone, so
schedules map nearly 1:1.

```
# Inventory with a service account holding roles/viewer
gcloud scheduler jobs list --location=us-central1
gcloud functions list && gcloud run jobs list
```

**What stays:** Cloud Storage, Cloud SQL, BigQuery, Firestore, and Cloud DNS stay. Keep using them from the agent
over public endpoints. A Cloud SQL instance with only a private IP is unreachable from Maritime.

[Read the full Google Cloud runbook →](https://maritime.sh/docs/migrations/gcp)

Official docs:
[gcloud scheduler jobs reference](https://docs.cloud.google.com/sdk/gcloud/reference/scheduler/jobs),
[Cron schedule format](https://docs.cloud.google.com/scheduler/docs/configuring/cron-job-schedules),
[gcloud functions list](https://docs.cloud.google.com/sdk/gcloud/reference/functions/list),
[gcloud run jobs reference](https://docs.cloud.google.com/sdk/gcloud/reference/run/jobs),
[Run jobs on a schedule](https://docs.cloud.google.com/run/docs/execute/jobs-on-schedule),
[Secret Manager access control](https://docs.cloud.google.com/secret-manager/docs/access-control),
[Secrets versions access](https://docs.cloud.google.com/sdk/gcloud/reference/secrets/versions/access),
[Service account keys create](https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/create)

## Migrate from Azure

**What moves:** Azure Functions with timer triggers, Container Apps jobs, Logic Apps automations, and bots on Azure
VMs. Key Vault secrets move into encrypted agent env vars.

```
# Inventory with a service principal holding the Reader role
az functionapp list --output table
az containerapp job list --output table
```

Azure NCRONTAB has six fields including seconds. 0 0 12 * * * becomes 0 12 * * * on a Maritime trigger.

**What stays:** Blob Storage, Azure SQL, Cosmos DB, and Azure DNS stay. Service Bus consumers only move if the
producer can hit a webhook instead, or the agent polls on a schedule. Private endpoints inside a VNet are
unreachable from Maritime.

[Read the full Azure runbook →](https://maritime.sh/docs/migrations/azure)

Official docs:
[az functionapp reference](https://learn.microsoft.com/en-us/cli/azure/functionapp),
[Timer trigger (NCRONTAB)](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-timer),
[Container Apps jobs](https://learn.microsoft.com/en-us/azure/container-apps/jobs),
[az containerapp job reference](https://learn.microsoft.com/en-us/cli/azure/containerapp/job),
[az logic workflow reference](https://learn.microsoft.com/en-us/cli/azure/logic/workflow),
[Key Vault RBAC guide](https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide),
[az ad sp reference](https://learn.microsoft.com/en-us/cli/azure/ad/sp),
[Built-in roles: Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general)

## Migrate from Cloudflare

**What moves:** Workers on cron triggers, plus their KV and D1 data via export. A Worker that serves HTTP maps to a
public web agent, but Workers runtime bindings (env.KV and friends) must become plain API calls, which is porting
work.

```
# Inventory with a custom read-only API token (never the Global API Key)
npx wrangler deployments list
npx wrangler d1 export my-db --output dump.sql
```

**What stays:** Keep your DNS zones on Cloudflare, along with Pages sites and R2 buckets. R2 is S3-compatible, so the
agent keeps using it directly. Durable Object alarms and Queues are Cloudflare-runtime constructs; moving those is a
rewrite of the trigger model.

[Read the full Cloudflare runbook →](https://maritime.sh/docs/migrations/cloudflare)

Official docs:
[Wrangler Workers commands](https://developers.cloudflare.com/workers/wrangler/commands/workers/),
[Wrangler KV commands](https://developers.cloudflare.com/workers/wrangler/commands/kv/),
[Wrangler v3 to v4 migration](https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/),
[Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/),
[Create a scoped API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/),
[API token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/),
[D1 import and export](https://developers.cloudflare.com/d1/best-practices/import-export-data/),
[R2 S3 API compatibility](https://developers.cloudflare.com/r2/api/s3/api/)

## Migrate from Vercel

**What moves:** Cron jobs from vercel.json and the API routes they hit. The common case is moving only the crons and
background work while the site stays on Vercel. Often the fastest path is recreating the cron logic as instructions
to a framework agent rather than porting the route.

```
# Source of truth is your git repo: read the crons block in vercel.json
vercel project ls
vercel env pull .env.production --environment=production
```

Vercel tokens have no read-only scope, so run the migration locally where you are already logged in, and delete any
token you mint for it afterward.

**What stays:** The Next.js site itself, plus Vercel Postgres, KV, and Blob. Copy connection strings into the agent
env and keep using them. Domains and DNS stay.

[Read the full Vercel runbook →](https://maritime.sh/docs/migrations/vercel)

Official docs:
[Cron Jobs overview](https://vercel.com/docs/cron-jobs),
[Cron usage and pricing](https://vercel.com/docs/cron-jobs/usage-and-pricing),
[vercel.json reference](https://vercel.com/docs/project-configuration/vercel-json),
[vercel env CLI reference](https://vercel.com/docs/cli/env),
[Access tokens](https://vercel.com/docs/accounts/access-tokens),
[vercel project CLI reference](https://vercel.com/docs/cli/project),
[Sensitive environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables),
[vercel remove CLI reference](https://vercel.com/docs/cli/remove)

## Migrate from Heroku

**What moves:** Heroku Scheduler jobs, worker and clock dynos, and config vars. Scheduler only offers three
frequencies, so real cron on a Maritime trigger is an upgrade. A worker that only reacts to events can auto-sleep,
which usually costs less than an always-running dyno.

```
heroku apps --json
heroku ps -a my-app
heroku config -a my-app --shell   # write to a local .env, import, delete the file
```

Heroku Scheduler jobs are not listable from the CLI. Open the Scheduler add-on page in the dashboard and copy the
jobs out. Heroku API keys are full-access, so mint a dedicated authorization and revoke it after.

**What stays:** Heroku Postgres and Redis add-ons stay: pull DATABASE_URL and REDIS_URL into the agent env and keep
using them. The web dyno stays if it serves your site.

[Read the full Heroku runbook →](https://maritime.sh/docs/migrations/heroku)

Official docs:
[Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler),
[Procfile](https://devcenter.heroku.com/articles/procfile),
[Config vars](https://devcenter.heroku.com/articles/config-vars),
[OAuth authorizations and scopes](https://devcenter.heroku.com/articles/oauth),
[Dyno types](https://devcenter.heroku.com/articles/dyno-types),
[CLI commands reference](https://devcenter.heroku.com/articles/heroku-cli-commands),
[Postgres credentials and rotation](https://devcenter.heroku.com/articles/heroku-postgresql-credentials),
[Cloning an app with git:clone](https://devcenter.heroku.com/articles/git-clone-heroku-app)

## Migrate from Fly.io

**What moves:** Machines, including scheduled ones, and fly.toml worker processes. Fly apps are already containers
with a Dockerfile, so pointing maritime create at the same repo is nearly direct. Fly schedule granularity (hourly,
daily) upgrades to full cron on Maritime.

```
# Inventory with a read-only org token: fly tokens create readonly
fly apps list
fly machine list -a my-app && fly config show -a my-app
```

fly secrets list shows names and digests only. Secret values are not retrievable by design and must come from your
own records.

**What stays:** Fly Postgres and volumes stay. A database that only listens on the private 6PN network is
unreachable from Maritime, so it needs a public connection option or the workload stays put.

[Read the full Fly.io runbook →](https://maritime.sh/docs/migrations/fly)

Official docs:
[flyctl command reference](https://fly.io/docs/flyctl/),
[Access tokens](https://fly.io/docs/security/tokens/),
[fly machine run and --schedule](https://fly.io/docs/machines/flyctl/fly-machine-run/),
[Task scheduling on Fly](https://fly.io/docs/blueprints/task-scheduling/),
[fly.toml reference](https://fly.io/docs/reference/configuration/),
[Secrets](https://fly.io/docs/apps/secrets/),
[Private networking (6PN)](https://fly.io/docs/networking/private-networking/),
[External Postgres connections](https://fly.io/docs/postgres/connecting/connecting-external/)

## Migrate from Render

**What moves:** Cron job services (a cron expression plus a command, which maps 1:1 to an agent trigger) and
background workers. Env groups and per-service env vars move into encrypted agent env vars.

```
# Source of truth: render.yaml in your repo, or the REST API
curl -s https://api.render.com/v1/services -H "Authorization: Bearer $RENDER_API_KEY"
```

Render API keys are full-account with no read-only scope, so run the migration locally and delete the key from your
Render settings afterward.

**What stays:** Web services and static sites stay if they serve your site. Render Postgres and Key Value stay: use
the external connection string from the agent, since internal-only URLs will not resolve from Maritime.

[Read the full Render runbook →](https://maritime.sh/docs/migrations/render)

Official docs:
[Render cron jobs](https://render.com/docs/cronjobs),
[Background workers](https://render.com/docs/background-workers),
[Blueprint YAML reference](https://render.com/docs/blueprint-spec),
[The Render API](https://render.com/docs/api),
[API: list services](https://api-docs.render.com/reference/list-services),
[API: suspend service](https://api-docs.render.com/reference/suspend-service-1),
[Environment variables and env groups](https://render.com/docs/configure-environment-variables),
[Render Key Value](https://render.com/docs/key-value)

## Migrate from DigitalOcean

**What moves:** App Platform workers and jobs, DO Functions with cron triggers, and bots on droplets (the droplet
interior is the VPS guide below). App spec env values move into encrypted agent env vars.

```
# Inventory with a custom scoped token (read scopes only)
doctl apps list && doctl apps spec get <app-id>
doctl serverless triggers list
```

**What stays:** Spaces buckets are S3-compatible, so keep using them from the agent. Managed databases stay: use the
public connection string and update trusted sources. VPC-only databases are unreachable from Maritime.

[Read the full DigitalOcean runbook →](https://maritime.sh/docs/migrations/digitalocean)

Official docs:
[doctl apps reference](https://docs.digitalocean.com/reference/doctl/reference/apps/),
[App Platform app spec](https://docs.digitalocean.com/products/app-platform/reference/app-spec/),
[Cron and deployment jobs](https://docs.digitalocean.com/products/app-platform/how-to/manage-jobs/),
[Scheduled Functions](https://docs.digitalocean.com/products/functions/how-to/schedule-functions/),
[API token scopes](https://docs.digitalocean.com/reference/api/scopes/),
[doctl droplet-action reference](https://docs.digitalocean.com/reference/doctl/reference/compute/droplet-action/),
[Spaces S3 compatibility](https://docs.digitalocean.com/products/spaces/reference/s3-compatibility/),
[Managed database trusted sources](https://docs.digitalocean.com/products/databases/postgresql/how-to/secure/)

## Migrate from a VPS

**What moves:** The classic case: a $5 box running your bot under tmux. Crontab lines, systemd services and timers,
pm2 and supervisor processes, tmux and screen sessions, and Docker containers all inventory over SSH and land as
agents with triggers.

```
ssh me@box 'crontab -l; systemctl list-timers; pm2 ls; tmux ls; docker ps'
```

There is no enforced read-only SSH, so the guide constrains the agent to an explicit list of read commands and leaves
anything needing sudo to you.

**What stays:** Anything else on the box: a localhost Postgres or Redis, nginx sites, backups. Every localhost
connection string in the env is a decision point, because localhost breaks when the worker moves. Check for other
tenants before canceling the server.

[Read the full a VPS runbook →](https://maritime.sh/docs/migrations/vps)

Official docs:
[crontab(5) reference](https://man7.org/linux/man-pages/man5/crontab.5.html),
[systemd.time calendar syntax](https://man7.org/linux/man-pages/man7/systemd.time.7.html),
[systemd.timer units](https://man7.org/linux/man-pages/man5/systemd.timer.5.html),
[systemctl(1)](https://man7.org/linux/man-pages/man1/systemctl.1.html),
[pm2 process management](https://pm2.keymetrics.io/docs/usage/process-management/),
[supervisorctl](https://supervisord.org/running.html),
[docker inspect reference](https://docs.docker.com/reference/cli/docker/inspect/),
[tmux(1)](https://man7.org/linux/man-pages/man1/tmux.1.html)

### See also

The full flag reference for `maritime create` lives in the
[CLI Reference](https://maritime.sh/docs/cli#maritime-create). Schedules are covered in
[Triggers & schedules](https://maritime.sh/docs/triggers), env vars and sizing in
[Env vars & sizing](https://maritime.sh/docs/configuration). Bringing your own container? Read the
[Deploy any container contract](https://maritime.sh/docs/frameworks/custom) first, especially the CMD rule.
