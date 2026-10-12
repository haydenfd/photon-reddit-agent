> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/web-apps

# Public web agents

Any repo with a Dockerfile can be served on a public, no-login HTTPS URL. Maritime builds it, runs
it serverlessly, puts it to sleep when idle, and wakes it on the next visit.

## Deploy one

```
maritime create my-app --repo https://github.com/you/app --public --port 3000
```

| Flag | Description |
| --- | --- |
| `-r, --repo` | GitHub repo to build (Dockerfile at the root). Combine with `-b, --branch` |
| `--public` | Serve a public, no-login web URL for this agent |
| `--port` | Container port your app listens on (exposed publicly; default 8080) |

The dashboard's **New agent** flow takes the same sources: a GitHub repo, a Docker image, or a ZIP
upload. Repo and ZIP sources build on a dedicated build machine; see
[How builds work](https://maritime.sh/docs/builds).

## What your app must do

- **Ship a Dockerfile at the repo root.** Whatever it builds is what runs.
- **Listen on the port you pass as `--port`**, or read the injected `PORT` env var. Never hardcode
  a different port than the one you declared.
- **Persist to `/data` only.** It survives restarts, redeploys, and sleep/wake; the rest of the
  filesystem is disposable.

A web app does not need the chat contract; that is only for agents you want to talk to. If you
want both (a web UI *and* a chattable agent), implement the three-endpoint contract from
[Deploy any container](https://maritime.sh/docs/frameworks/custom).

## Sleep and wake

The app auto-sleeps when idle and any request to its public URL wakes it, in about a second, with
state intact. Sleeping is not downtime: visitors just wake it. Because of that, most public web
agents do not need the [always-on add-on](https://maritime.sh/docs/billing#add-ons); reserve it
for apps that must answer in milliseconds around the clock.

## Configure and observe

```
maritime env set my-app DATABASE_URL=postgres://... --reload   # encrypted secrets
maritime logs my-app -f                                        # stream logs
maritime history my-app                                        # every build/deploy attempt
```

Env vars, secrets, and sizing are covered in
[Env vars & sizing](https://maritime.sh/docs/configuration); the full flag set for `create` and
`deploy` is in the [CLI reference](https://maritime.sh/docs/cli#maritime-create).
