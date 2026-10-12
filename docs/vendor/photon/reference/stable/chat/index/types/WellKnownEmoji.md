> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# WellKnownEmoji

> Well-known emoji that work across platforms (Slack and Google Chat).

Well-known emoji that work across platforms (Slack and Google Chat).
These are normalized to a common format regardless of platform.

```typescript
type WellKnownEmoji = "thumbs_up" | "thumbs_down" | "clap" | "wave" | "pray" | "muscle" | "ok_hand" | "point_up" | "point_down" | "point_left" | "point_right" | "raised_hands" | "shrug" | "facepalm" | "heart" | "smile" | "laugh" | "thinking" | "sad" | "cry" | "angry" | "love_eyes" | "cool" | "wink" | "surprised" | "worried" | "confused" | "neutral" | "sleeping" | "sick" | "mind_blown" | "relieved" | "grimace" | "rolling_eyes" | "hug" | "zany" | "check" | "x" | "question" | "exclamation" | "warning" | "stop" | "info" | "100" | "fire" | "star" | "sparkles" | "lightning" | "boom" | "eyes" | "green_circle" | "yellow_circle" | "red_circle" | "blue_circle" | "white_circle" | "black_circle" | "rocket" | "party" | "confetti" | "balloon" | "gift" | "trophy" | "medal" | "lightbulb" | "gear" | "wrench" | "hammer" | "bug" | "link" | "lock" | "unlock" | "key" | "pin" | "memo" | "clipboard" | "calendar" | "clock" | "hourglass" | "bell" | "megaphone" | "speech_bubble" | "email" | "inbox" | "outbox" | "package" | "folder" | "file" | "chart_up" | "chart_down" | "coffee" | "pizza" | "beer" | "arrow_up" | "arrow_down" | "arrow_left" | "arrow_right" | "refresh" | "sun" | "cloud" | "rain" | "snow" | "rainbow"
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.