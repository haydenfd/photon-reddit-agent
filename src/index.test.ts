import { expect, mock, test } from "bun:test";
import type { Message } from "spectrum-ts";
import { feedbackEvent, parseFeedback } from "./feedback.ts";
import { handleMessage } from "./message-handler.ts";
import type { FeedbackResponse } from "./crm-types.ts";

const base = { id: "inbound-1", direction: "inbound", platform: "imessage", space: { id: "chat-1" }, sender: { id: "+15550000001" }, content: { type: "text", text: "hello" } };
const message = (extra = {}) => ({ ...base, ...extra }) as unknown as Message;

test("SDK replies use the nested text and target ID; outbound and attachments are ignored", () => {
  const event = feedbackEvent(message({ content: { type: "reply", content: { type: "text", text: "Dismiss 2: interview ended" }, target: { id: "report-message" } } }));
  expect(event).toEqual({ platform: "imessage", spaceId: "chat-1", messageId: "inbound-1", text: "Dismiss 2: interview ended", targetMessageId: "report-message" });
  expect(feedbackEvent(message({ direction: "outbound" }))).toBeNull();
  expect(feedbackEvent(message({ content: { type: "attachment" } }))).toBeNull();
  expect(parseFeedback(event!.text)).toEqual({ verdict: "dismissed", target: "2", reason: "interview ended" });
  expect(parseFeedback("Useful: good practice request")).toEqual({ verdict: "useful", target: undefined, reason: "good practice request" });
  expect(parseFeedback("Contacted /r/test/comments/abc/title: sent a message")?.verdict).toBe("contacted");
  expect(parseFeedback("hello")).toBeNull();
});

test("only the owner receives responses; duplicate events are not acknowledged again", async () => {
  const send = mock(async () => undefined);
  const processFeedback = mock(async (): Promise<FeedbackResponse> => ({ action: "ignore" }));
  const crm = { processFeedback };
  await handleMessage({ send }, message(), crm, base.sender.id);
  expect(send).toHaveBeenCalledWith("echo: hello");
  await handleMessage({ send }, message({ direction: "outbound" }), crm, base.sender.id);
  await handleMessage({ send }, message({ sender: { id: "+15550000002" } }), crm, base.sender.id);
  await handleMessage({ send }, message({ content: { type: "attachment" } }), crm, base.sender.id);
  expect(processFeedback).toHaveBeenCalledTimes(1);
  processFeedback.mockImplementation(async () => ({ action: "clarify", text: "Which lead?" }));
  await handleMessage({ send }, message(), crm, base.sender.id);
  expect(send).toHaveBeenLastCalledWith("Which lead?");
  processFeedback.mockImplementation(async () => ({ action: "feedback", text: "Saved", duplicate: true }));
  await handleMessage({ send }, message(), crm, base.sender.id);
  expect(send).toHaveBeenCalledTimes(2);
});
