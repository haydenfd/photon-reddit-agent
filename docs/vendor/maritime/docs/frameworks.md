> ## Documentation index
> Fetch the complete index at: https://maritime.sh/llms.txt
> Setup procedure for AI agents (install, sign in, deploy, verify): https://maritime.sh/agents.md
> This page as HTML: https://maritime.sh/docs/frameworks

# Choose a framework

Every ready-made template is a real agent framework, pre-configured and one image pull from live. Pick one, name it,
deploy. Each guide covers the image, how it works, its environment variables, and how to talk to it.

| Framework | Template ID | Runtime | Best for | LLM key |
| --- | --- | --- | --- | --- |
| [Claude Code](https://maritime.sh/docs/frameworks/claude-code) | `claude_code` | Node.js (Claude Agent SDK) | A coding agent with real bash and file tools in a persistent workspace | Your ANTHROPIC_API_KEY (required) |
| [Codex](https://maritime.sh/docs/frameworks/codex) | `codex` | Node.js (Codex CLI) | OpenAI's coding agent with shell and file tools in a persistent workspace, plus the interactive TUI in the terminal | Optional (Maritime LLM by default; your OpenAI key or ChatGPT sign-in) |
| [OpenClaw](https://maritime.sh/docs/frameworks/openclaw) | `openclaw` | Node.js | A general autonomous assistant: 100+ skills, channels, web browsing | Optional (Maritime LLM by default) |
| [Hermes](https://maritime.sh/docs/frameworks/hermes) | `hermes` | Python | A self-improving agent with persistent memory and its own full dashboard | Optional (Maritime LLM by default) |
| [ZeroClaw](https://maritime.sh/docs/frameworks/zeroclaw) | `zeroclaw` | Rust (single binary) | Ultra-light agents: <5 MB RAM, sub-second start, good for running many | Optional (Maritime LLM by default) |
| [DeepSeek Harness](https://maritime.sh/docs/frameworks/deepseek-harness) | `dsh` | Node.js (plugin runtime) | DeepSeek's agent harness with a full web workbench and session replay | None needed (Maritime LLM by default) |

**Not sure?** Start with [OpenClaw](https://maritime.sh/docs/frameworks/openclaw) for a general assistant, or
[Claude Code](https://maritime.sh/docs/frameworks/claude-code) for a coding agent. You can always create another agent
from a different template; the free plan includes three.

## Deploying a template

In the dashboard: **New agent**, pick the template, name it. From the terminal:

```
maritime templates                       # list what's available
maritime create my-agent --template openclaw
```

## Worth knowing

- **Claude Code is chat-only**: it has no web UI of its own, so you talk to it from the dashboard chat, the CLI, the
  API, or a connected channel.
- **DeepSeek Harness is version-pinned**: upstream is a fast-moving developer preview, so Maritime upgrades the image
  deliberately after testing.
- **Templates are also how you share.** Package any working agent (image, config, memory) into a template others can
  clone: see [Templates](https://maritime.sh/docs/templates).

### None of these fit?

Any Docker image that speaks a three-endpoint contract becomes a full Maritime agent: CrewAI, LangGraph, AutoGen, or
your own code. See [Deploy any container](https://maritime.sh/docs/frameworks/custom).
