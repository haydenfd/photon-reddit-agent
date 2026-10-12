> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# MessageEffect

> Full-screen and bubble effects that can be applied when sending a message.

```ts
await im.messages.sendText(chat, "Happy birthday!", {
  effect: MessageEffect.confetti,
});
```

```typescript
const MessageEffect: { balloons: "com.apple.messages.effect.CKBalloonEffect"; celebration: "com.apple.messages.effect.CKHappyBirthdayEffect"; confetti: "com.apple.messages.effect.CKConfettiEffect"; echo: "com.apple.messages.effect.CKEchoEffect"; fireworks: "com.apple.messages.effect.CKFireworksEffect"; gentle: "com.apple.MobileSMS.expressivesend.gentle"; heart: "com.apple.messages.effect.CKHeartEffect"; invisible: "com.apple.MobileSMS.expressivesend.invisibleink"; lasers: "com.apple.messages.effect.CKLasersEffect"; loud: "com.apple.MobileSMS.expressivesend.loud"; slam: "com.apple.MobileSMS.expressivesend.impact"; sparkles: "com.apple.messages.effect.CKSparklesEffect"; spotlight: "com.apple.messages.effect.CKSpotlightEffect" }
```


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.