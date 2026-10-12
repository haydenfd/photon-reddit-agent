> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/builds

# How builds work

What happens between `maritime deploy` and a running agent. Applies to repo and ZIP deploys;
template agents skip the build entirely (they are one image pull from live).

## The pipeline

Repo and ZIP deploys build on a dedicated build machine, never on the host that runs your agent.
BuildKit clones the repo at your chosen branch, builds the `Dockerfile` at the repo root, and
ships the finished image to your agent's host through a private registry. A typical build plus
ship lands in 1 to 3 minutes; if the builder was idle it cold-starts first, which adds about a
minute.

- **The Dockerfile lives at the repo root**, named exactly `Dockerfile`. There are no custom build
  args or targets; anything configurable belongs in env vars.
- **Layer cache carries over.** Each build seeds from your agent's previous image, so rebuilds
  where dependencies did not change are fast. `.dockerignore` is honored for repo builds. ZIP
  uploads (500 MB compressed, 2 GB unpacked) skip it, so trim the archive yourself.
- **Private repos work.** Install the Maritime GitHub App (Settings → GitHub) or connect GitHub
  OAuth. Build tokens are minted per build, never stored, and scrubbed from logs. Framework
  auto-detection cannot see private repos, so pass `framework` explicitly.
- **Pre-built images pull from any public registry** (Docker Hub, GHCR, and friends). Private
  registries are not supported yet; build from a private repo instead.

## Watching a build

The agent page streams the build log live under **Overview → Builds**. From the CLI:

```
maritime deploy my-brain --source github --repo https://github.com/acme/my-brain --wait

maritime history my-brain                                      # every attempt with its outcome
maritime history my-brain --json | jq -r '.[0].buildLog'       # full build log of the latest attempt
```

## When builds fail

Builds fail loudly: the deployment is marked `failed` with the tail of the build output, and the
agent stays in `error` until the next successful deploy. A build that prints nothing for 5
minutes is killed. Failed builds are not retried automatically (transient infrastructure errors
are, up to three times); fix the Dockerfile and redeploy.

> **Note: See also**
>
> The runtime contract your image should speak is in
> [Deploy any container](https://maritime.sh/docs/frameworks/custom); serving a repo on a public
> URL is covered in [Public web agents](https://maritime.sh/docs/web-apps).
