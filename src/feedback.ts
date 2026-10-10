import type { Message } from "spectrum-ts";
import type { FeedbackEvent, FeedbackVerdict } from "./crm-types.ts";

export function parseFeedback(text: string): { verdict: FeedbackVerdict; target?: string; reason: string } | null {
  const match = /^(useful|dismiss(?:ed)?|contacted)\b(?:\s+([^:]+))?(?:\s*:\s*(.*))?$/is.exec(text.trim());
  if (!match) return null;
  const verdict = match[1]!.toLowerCase().startsWith("dismiss") ? "dismissed" : match[1]!.toLowerCase() as FeedbackVerdict;
  return { verdict, target: match[2]?.trim(), reason: match[3]?.trim() ?? "" };
}

// The installed cloud iMessage SDK wraps threaded content in reply.content and supplies target.id, even for stub targets.
export function feedbackEvent(message: Pick<Message, "id" | "platform" | "direction" | "space" | "content">): FeedbackEvent | null {
  if (message.direction !== "inbound") return null;
  const content = message.content.type === "reply" ? message.content.content : message.content;
  if (content.type !== "text") return null;
  return { platform: message.platform, spaceId: message.space.id, messageId: message.id, text: content.text,
    ...(message.content.type === "reply" ? { targetMessageId: message.content.target.id } : {}) };
}
