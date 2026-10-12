> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Architecture

> Patterns for building human-feeling agents on Spectrum

<Note>
  This is the architecture we use at Photon to ship agents that **live natively inside IM apps**.

  The patterns below are pulled directly from production, based on the problems we encountered and the solutions we built to solve them. They're not theoretical best practices - they're the ones that **worked in the real world, with real users, and real bugs**. If you're building a similar agent, these patterns will save you **months** of trial and error.
</Note>

A naive Spectrum agent - read incoming, call the LLM, send the reply - falls apart in ways you don't see until you ship it. The user types "hey" → "wait" → "actually nvm" inside three seconds and gets three independent responses. The agent replies in 200ms when a real person would take five minutes. A worker crashes mid-send and the user receives the same message twice on retry.

This section captures the patterns that solve those problems, drawn from production agents built on Spectrum.

## The pipeline

Every incoming message flows through five stages backed by a job queue. Each stage is a separately enqueued job, which is what makes any of them cancellable when a follow-up message lands.

```mermaid theme={null}
flowchart LR
  In([Incoming message]) --> BQ[(Batch queue)]
  BQ -->|debounce window| Flush[Batch flush]
  Flush --> Read[Mark as read]
  Read --> Gen[Generate reply]
  Gen --> Send[Send with pacing]
  Send --> Done([Done])

  Inflight[(In-flight table)] -.tracks.- Flush
  Inflight -.tracks.- Read
  Inflight -.tracks.- Gen
  Inflight -.tracks.- Send
```

The `In-flight` table is a per-chat record of whichever job ID currently owns each stage. When a new message arrives, the enqueuer reads it, cancels those jobs, and moves any messages that were already drained into a carry-forward table so the next batch sees them.

## Why split it up

If you do everything in one handler - read, generate, send - you lose the ability to react to a new message that arrives during generation. By the time you notice, you've already sent a reply that ignored what the user just said, or you've raced the LLM against itself.

Splitting into stages costs a few hundred ms of extra hop latency and buys you:

* **Cancellation points.** Each stage can check a flag and abort cleanly.
* **Resume points.** A worker crash mid-stage retries one stage, not the whole conversation turn.
* **Idempotency seams.** The send stage carries stable client GUIDs so retries don't double-send.
* **Distinct timing.** The read stage can sleep for an hour while the send stage runs in 500ms - they're independent jobs.

## What's in this section

* [Inbound pipeline](/docs/best-practices/inbound-pipeline) - debouncing message bursts, batching, surviving cancellation, and the carry-forward rule that keeps messages from getting lost.
* [Recovery and state](/docs/best-practices/recovery-and-state) - idempotent retries via client GUIDs, per-resource memory scope, and a durable failure audit log.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.