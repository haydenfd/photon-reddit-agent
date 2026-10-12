import { expect, test } from "bun:test";
import { resolveInbound } from "./inbound.ts";

const list = { leads: [{ id: "/r/a/comments/1/x/", messageId: "msg-1" }, { id: "/r/b/comments/2/y/", messageId: "msg-2" }] };
const fetched = (content: object) => ({ id: "in-1", platform: "imessage", direction: "inbound", space: { id: "chat" }, content }) as Parameters<typeof resolveInbound>[0];

test("swipe-replies and tapbacks resolve to the lead they target; plain text and unknown targets do not", () => {
  expect(resolveInbound(fetched({ type: "reply", content: { type: "text", text: "reached out" }, target: { id: "msg-2" } }), list))
    .toEqual({ messageId: "in-1", kind: "reply", text: "reached out", replyTo: { messageId: "msg-2", lead: "/r/b/comments/2/y/", number: 2 } });
  expect(resolveInbound(fetched({ type: "reaction", emoji: "👎", target: { id: "msg-1" } }), list))
    .toEqual({ messageId: "in-1", kind: "reaction", emoji: "👎", replyTo: { messageId: "msg-1", lead: "/r/a/comments/1/x/", number: 1 } });
  expect(resolveInbound(fetched({ type: "text", text: "1 useful" }), list)).toEqual({ messageId: "in-1", kind: "text", text: "1 useful", replyTo: null });
  expect(resolveInbound(fetched({ type: "reply", content: { type: "text", text: "?" }, target: { id: "header" } }), null)?.replyTo).toEqual({ messageId: "header" });
});
