import { Spectrum } from "spectrum-ts";
import { imessage } from "@spectrum-ts/imessage";
// Spectrum bridges a single agent loop to many messaging interfaces.
// Each provider in `providers` adds an interface (terminal TUI, iMessage, …).
// Docs: https://photon.codes/docs/spectrum-ts
const app = await Spectrum({
  projectId: process.env.SPECTRUM_PROJECT_ID!,
  projectSecret: process.env.SPECTRUM_PROJECT_SECRET!,
  providers: [
    // imessage
    imessage.config(),
  ],
});

console.log("Photon connected. Text your assigned line to receive an echo reply.");

// `app.messages` is an async iterable. Each tick yields a `space` (the
// conversation) and an inbound `message`. Reply by awaiting `space.send(...)`.
for await (const [space, message] of app.messages) {
  if (message.direction === "outbound") continue;
  if (message.content.type === "text") {
    await space.send(`echo: ${message.content.text}`);
    console.log("Received a text and sent an echo reply.");
  }
}
