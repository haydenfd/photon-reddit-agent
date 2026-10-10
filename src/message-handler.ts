import type { Message } from "spectrum-ts";
import type { CrmClient } from "./crm-client.ts";
import { feedbackEvent } from "./feedback.ts";

export async function handleMessage(space: { send(text: string): Promise<unknown> }, message: Message, crm: Pick<CrmClient, "processFeedback">, owner: string) {
  if (message.sender?.id !== owner) return;
  const event = feedbackEvent(message);
  if (!event) return;
  const result = await crm.processFeedback(event);
  if (result.duplicate) return;
  await space.send(result.action === "ignore" ? `echo: ${event.text}` : result.text!);
}
