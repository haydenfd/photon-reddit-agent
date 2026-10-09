# Photon Reddit Agent

A TypeScript app using [Photon Spectrum](https://photon.codes/docs/spectrum-ts)
to receive iMessages and reply with `echo: <your text>`.

## Environment

The original local setup has credentials in the ignored `.env`.
For a fresh clone, copy `.env.example` to `.env` and set the two Spectrum
credentials from your Photon project settings.
Never commit or share that file. If authentication fails, verify `SPECTRUM_PROJECT_ID`
and `SPECTRUM_PROJECT_SECRET` in your project settings.

## Run

```sh
bun install --frozen-lockfile
bun start
```

1. Add your phone from the top-right avatar menu in the [Photon dashboard](https://app.photon.codes/dashboard/3693d23f-a283-4dcc-a8e9-3009bfa0bdeb/getting-started).
2. Refresh getting started to enroll your phone and show your assigned line.
3. Run `bun start` from this directory and leave it running.
4. Text `hello` to that line from your registered phone. Expect `echo: hello`.

Free/Pro uses Photon's shared number pool; recipients must be registered with
the project. No dedicated line is provisioned by this app.
The app runs on this Mac today: keep the process running and the Mac awake.
Deployment is only needed when you want it running independently of this Mac.

## Verify

```sh
bun run check
bun test
```

The automated test checks the echo loop without contacting Photon.
Actual iMessage delivery requires the phone test above.

## Checkpoint — 2026-10-09

- Live inbound iMessage and `echo:` replies verified on the owner's phone.
- Proactive SDK sending verified: the owner received a Reddit post link from
  the assigned Photon bot line. A reusable alert command is not implemented yet.
- Only the correct personal recipient remains enrolled in Photon; the mistaken
  extra recipient was removed. `.env` stays local and excluded from Git.
- `bun run check` and the echo regression test pass. The test covers incoming
  text, ignored outgoing messages, and ignored attachments without live calls.
- Codex with the existing ChatGPT login is the selected future brain; it is
  not connected yet. Reddit scanning, Jev, scheduling, and deployment are deferred.

## Later

Hourly Reddit fetch → deduplicate posts → Jev classifies AlgoVox fit → Photon
texts you the post link and reason to reach out. The scheduler and any later
Codex/Claude brain run in our app. Only the messaging echo is implemented today.
