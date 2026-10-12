> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/triggers

# Triggers & schedules

Triggers are how an agent acts when nobody is messaging it: on a schedule, or when an external
system calls in. They fire from the platform, so they work even while the agent is asleep.

## Why triggers exist

Maritime agents [sleep when idle](https://maritime.sh/docs/how-it-works#sleep-and-wake), and
**timers inside a sleeping agent do not fire**. A cron library or `setInterval` running inside the
process dies with the process. Triggers move the alarm clock outside the agent: the platform holds
the schedule, wakes the agent (about a second), and delivers the event as a message. The schedule
keeps its promises even when the agent does not exist between ticks.

## Cron triggers

A cron trigger takes a standard five-field expression, wakes the agent on schedule, and delivers
its `prompt` as a chat message on every fire. Three ways to create one:

- **Ask the agent** (OpenClaw-family and Hermes templates): tell it "send me a digest every weekday
  at 9" and the platform syncs the schedule it sets for itself into real wake triggers. These
  templates have no trigger editor in the dashboard; the agent *is* the editor.
- **The dashboard editor** (Claude Code, DeepSeek Harness, and custom containers): the agent page's
  trigger panel takes the cron expression; set the message to deliver via the API's
  `config.prompt`.
- **The CLI**, for any framework:
  `maritime triggers create my-agent --type cron --cron "0 9 * * 1-5"`.

```
# five-field cron
0 9 * * 1-5     # weekdays at 09:00
*/15 * * * *    # every 15 minutes
0 0 1 * *       # first of the month, midnight
```

Coming from another provider? EventBridge's six-field `cron(...)`, Azure's NCRONTAB with seconds,
and `rate(...)` expressions all map onto five-field cron; the
[migration guides](https://maritime.sh/docs/migrations) show the conversions per provider.

## Webhook triggers

Every agent has a public invoke URL. A POST wakes the agent (if asleep) and delivers the payload as
a message. No auth header is needed; treat the URL itself as the secret.

```
POST https://api.maritime.sh/api/webhooks/{agent_id}
```

Point CI failures, form submissions, or any external system at it and the agent decides what the
event means. Channel messages (Telegram, Discord) wake agents the same way; see
[Channels & integrations](https://maritime.sh/docs/channels).

## Listing an agent's triggers

```
maritime triggers list my-agent   # cron / webhook / telegram / discord
```

## Publishing schedules from a custom agent

An agent you wrote yourself (a [custom container](https://maritime.sh/docs/frameworks/custom)) can
publish its own schedule instead of having you click triggers together in the dashboard. Either
serve `GET /schedules` (Maritime polls while the agent is awake and registers real wake triggers),
or push the list with one SDK line (`observeScheduler` / `observe_scheduler`). Maritime wakes the
VM about 10 seconds before each occurrence; an entry that carries a `prompt` instead fires at the
occurrence itself and has the prompt delivered to `POST /chat` with source `"scheduled"`, even
when the agent is already awake.

```
{"id": "morning", "cron": "35 9 * * *", "tz": "America/New_York",
 "prompt": "Send the morning summary", "enabled": true}
```

Details and the SDK helpers are in
[SDK: scheduled wakes](https://maritime.sh/docs/sdk/agents#scheduled-wakes).

> **Note: If you really need an in-process scheduler**
>
> An agent on the [always-on add-on](https://maritime.sh/docs/billing#add-ons) never sleeps, so
> its internal timers keep firing. That is the exception, not the default: for almost everything,
> a trigger is cheaper and survives restarts.
