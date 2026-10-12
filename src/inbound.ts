import { feedbackEvent } from "./feedback.ts";

// Usage: bun src/inbound.ts < webhook.json — resolves one Photon webhook delivery for the owner and prints JSON.
// Webhooks drop the swipe-reply link, so the message is re-fetched through the SDK, which keeps it.
type Payload = { event?: string; space?: { id?: string; phone?: string }; message?: { id?: string; direction?: string; sender?: { id?: string } } };
type Fetched = { id: string; platform: string; direction: string; space: { id: string }; content: { type: string; emoji?: string; target?: { id: string } } & Record<string, unknown> };
type LastList = { leads?: { id: string; messageId?: string }[] };

export function resolveInbound(fetched: Fetched, list: LastList | null) {
  const leads = list?.leads ?? [];
  const lookup = (messageId: string) => {
    const index = leads.findIndex(lead => lead.messageId === messageId);
    return { messageId, ...(index >= 0 ? { lead: leads[index]!.id, number: index + 1 } : {}) };
  };
  const { content } = fetched;
  if (content.type === "reaction") return { messageId: fetched.id, kind: "reaction", emoji: content.emoji, replyTo: content.target ? lookup(content.target.id) : null };
  const event = feedbackEvent(fetched as Parameters<typeof feedbackEvent>[0]);
  if (!event) return { messageId: fetched.id, kind: content.type };
  return { messageId: fetched.id, kind: event.targetMessageId ? "reply" : "text", text: event.text, replyTo: event.targetMessageId ? lookup(event.targetMessageId) : null };
}

async function readJson<T>(path: string): Promise<T | null> {
  const file = Bun.file(path);
  return (await file.exists()) ? await file.json() : null;
}

if (import.meta.main) {
  const dir = process.env.AGENT_STATE_DIR ?? "/data/workspace", seenPath = `${dir}/seen-messages.json`;
  const payload = JSON.parse(await Bun.stdin.text()) as Payload;
  const { space, message } = payload;
  if (payload.event !== "messages" || message?.direction !== "inbound" || !message.id || !space?.id) {
    console.log(JSON.stringify({ ignored: "not an inbound message" }));
    process.exit(0);
  }
  if (message.sender?.id !== process.env.OWNER_PHONE) {
    console.log(JSON.stringify({ ignored: "not from the owner" }));
    process.exit(0);
  }
  // Photon retries deliveries up to 6 times.
  const seen = (await readJson<string[]>(seenPath)) ?? [];
  if (seen.includes(message.id)) {
    console.log(JSON.stringify({ duplicate: true, messageId: message.id }));
    process.exit(0);
  }
  const { Spectrum } = await import("spectrum-ts");
  const { imessage } = await import("@spectrum-ts/imessage");
  const app = await Spectrum({ projectId: process.env.SPECTRUM_PROJECT_ID!, projectSecret: process.env.SPECTRUM_PROJECT_SECRET!, providers: [imessage.config()] });
  try {
    // The fetch also proves the delivery is real: anyone holding the wake URL can POST, but only Photon knows the message.
    const dm = await imessage(app).space.get(space.id, { phone: space.phone });
    const fetched = await dm.getMessage(message.id);
    if (!fetched) throw new Error(`Photon has no message ${message.id}; ignoring this delivery.`);
    console.log(JSON.stringify(resolveInbound(fetched as unknown as Fetched, await readJson<LastList>(`${dir}/last-list.json`))));
    await Bun.write(seenPath, JSON.stringify([...seen, message.id].slice(-200)));
  } finally { await app.stop(); }
}
