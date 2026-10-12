> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/frameworks/custom

# Deploy any container

CrewAI, LangGraph, AutoGen, your own Python script: any Docker image that speaks a three-endpoint contract gets the
whole platform. For a complete worked example of this contract, see
[Run Claude Code on Maritime](https://maritime.sh/docs/frameworks/claude-code); for a plain web app with a public URL
(no chat contract needed), see [Public web agents](https://maritime.sh/docs/web-apps).

## Overview

You do not have to use a Maritime template. Wrap your agent in a small HTTP server, and Maritime gives it everything
the built-in frameworks get: a micro-VM per agent (or per end-user of your product), sleep at ~zero cost with memory
intact, wake on the next message, channels, scheduled wakes, webhooks, and per-agent metering.

## The contract

Three endpoints. That is the whole integration.

```
1. Bind a long-lived server on 0.0.0.0:$PORT   (PORT is injected; never hardcode 8080)
2. GET  /health  ->  any 2xx, fast, no side effects
3. POST /chat    ->  {"message": "...", "source": "front_door" | "cli" | "telegram" | ...}
                 reply within 30s with plain text or {"response": "..."}
```

Accepted reply fields, in priority order: `response`, `reply`, `message`, `text`, `output`. Plain-text bodies
are used verbatim. Slow work should run asynchronously; reply within 30 seconds with what you have.

## CrewAI example

```
# main.py
import os
from fastapi import FastAPI
from crewai import Agent, Crew, Task

app = FastAPI()

researcher = Agent(role="researcher", goal="answer the user well", backstory="…")

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/chat")
async def chat(body: dict):
    task = Task(description=body["message"], expected_output="a helpful answer", agent=researcher)
    result = Crew(agents=[researcher], tasks=[task]).kickoff()
    return {"response": str(result)}
```

```
# Dockerfile
FROM python:3.12-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "start.py"]

# start.py
import os, uvicorn
uvicorn.run("main:app", host="0.0.0.0", port=int(os.getenv("PORT", "8080")))
```

LangGraph, AutoGen, and friends are the same shape: build your graph or group chat once at boot, invoke it inside
`/chat`, return a string.

## The five gotchas

Every one of these has silently broken a real deployment. Check them before anything else.

- **Bind $PORT.** Maritime injects it (currently 18789 inside micro-VMs). Hardcoding 8080 collides with the VM's port
  forwarder and crash-loops the boot.
- **Install ca-certificates.** Slim base images ship without it and every outbound HTTPS call fails with confusing
  TLS errors.
- **Ask for the LLM env vars if you want them.** A custom agent starts with no LLM key, because Maritime does not know
  how your application reads one. Press **Use Maritime LLM** on the agent's Env tab, or send `useMaritimeLlm: true`
  at create. Then `OPENAI_API_KEY` and `OPENAI_BASE_URL` point at Maritime's metered proxy (CrewAI and LangChain
  read both natively). If you bring your own key, set it as a secret env var and do not keep the proxy base URL.
- **Persist to /data only.** It survives restarts, redeploys, and sleep/wake; the rest of the filesystem can vanish on
  a recreate. Your process is snapshotted and resumed, not restarted, so do not trust cached wall-clock time and
  re-establish long-lived connections lazily.
- **No shell-string CMD.** Micro-VM init re-executes your image's CMD as one flattened string, so
  `CMD ["sh", "-c", "uvicorn ... $PORT"]` loses its quoting, the server starts with no arguments, and the VM
  kernel-panics on boot. Launch through a real program (a `start.py` that reads $PORT and calls your server
  directly).

## Deploying

```
# from a GitHub repo with a Dockerfile at the root
maritime create my-brain --repo https://github.com/acme/my-brain

# from a pre-built image on a public registry (framework: "custom", or "crewai"/"langgraph")
curl -X POST https://api.maritime.sh/api/agents \
  -H "Authorization: Bearer $MARITIME_API_KEY" -H "Content-Type: application/json" \
  -d '{"name": "my-brain", "framework": "crewai", "imageName": "ghcr.io/acme/support-brain:latest"}'

# swap an existing agent onto a new image or repo build
maritime deploy my-brain --source docker --image ghcr.io/acme/support-brain:v2 --wait
```

Repo and ZIP sources build on Maritime's build worker (see below), so iterate on prompts and configuration through
env vars or files under `/data`, and rebuild the image only when dependencies change. From here the front door
applies unchanged: set the project's `newChatPolicy: "spawn"` and every end-user of your product gets their own
micro-VM running your image.

## How builds work

Repo and ZIP deploys build on a dedicated build machine, never on the host that runs your agent: BuildKit, layer
cache seeded from your previous image, private repos via the Maritime GitHub App, live build logs, loud failures. The
full pipeline, caps, and failure semantics moved to their own page:
[How builds work](https://maritime.sh/docs/builds).

## Scheduled wakes

A sleeping VM's timers do not fire; let Maritime be the alarm clock. Either serve `GET /schedules` returning entries
like the one below (Maritime polls while you are awake and registers real wake triggers), or push the list with one
SDK line (`observeScheduler` / `observe_scheduler`). Maritime wakes the VM about 10 seconds before each occurrence
and delivers `prompt` to `POST /chat` with source `"scheduled"`.

```
{"id": "morning", "cron": "35 9 * * *", "tz": "America/New_York",
 "prompt": "Send the morning summary", "enabled": true}
```

## Checklist

```
[ ] Dockerfile at the repo root (repo/ZIP builds)
[ ] Binds 0.0.0.0:$PORT, not a hardcoded port
[ ] GET /health -> 2xx, fast
[ ] POST /chat -> reply within 30s, {"response": "..."} or plain text
[ ] ca-certificates installed (slim images)
[ ] State lives in /data; process tolerates snapshot/resume
[ ] Scheduled work goes through GET /schedules or the SDK push, never a sleeping-VM timer
```
