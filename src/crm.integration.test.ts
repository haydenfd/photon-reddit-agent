import { describe, expect, test, mock } from "bun:test";
import { Database } from "bun:sqlite";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { Message } from "spectrum-ts";
import { CrmClient } from "./crm-client.ts";
import { parseClassification, parsePosts } from "./jev.ts";
import { leadId } from "./lead-utils.ts";
import { importSqlite } from "./import-sqlite.ts";
import { handleMessage } from "./message-handler.ts";
import { runCrmCli } from "./crm-cli.ts";

const at = "2026-10-10T00:00:00Z";
const result = parseClassification({ model: "jev-latest", answers: {
  topic: { type: "choice", choice: "mock_platform", confidence: 0.95 },
  timing: { type: "choice", choice: "upcoming", confidence: 0.95 },
  priority: { type: "score", score: 3, confidence: 0.95 },
} }, at);
function lead(key: string) {
  const post = parsePosts([{ title: `Mock request ${key}`, body: "Practice with feedback", url: `https://www.reddit.com/r/test/comments/${key}/title/` }])[0]!;
  return { id: leadId(post), post, result };
}

(process.env.TEST_CRM_URL ? describe : describe.skip)("actual local D1 Worker API", () => {
  const client = () => new CrmClient(process.env.TEST_CRM_URL, process.env.CRM_API_TOKEN);
  async function raw(op: string, args: unknown, token = process.env.CRM_API_TOKEN, headers = {}, method = "POST") {
    return fetch(new URL(`/api/${op}`, process.env.TEST_CRM_URL), { method, headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...headers }, body: method === "POST" ? JSON.stringify(args) : undefined });
  }

  test("authenticated bounded API rejects malformed inputs and unknown IDs without partial writes", async () => {
    expect((await raw("list_leads", {}, "wrong-token")).status).toBe(401);
    expect((await raw("list_leads", {}, undefined, {}, "GET")).status).toBe(405);
    expect((await raw("list_leads", {}, undefined, { "Content-Type": "text/plain" })).status).toBe(415);
    for (const args of [{ limit: 0 }, { limit: 101 }, { offset: -1 }, { status: "deleted" }, { alertsOnly: "yes" }, { surprise: true }]) expect((await raw("list_leads", args)).status).toBe(400);
    const unknown = await raw("get_lead", { id: "unknown' OR 1=1 --" });
    expect(unknown.status).toBe(404); expect((await unknown.json() as { error: string }).error).toContain("Unknown lead ID");
    expect((await raw("set_lead_status", { id: "missing", status: "dismissed" })).status).toBe(404);
    expect((await raw("record_feedback", { id: "missing", verdict: "new", reason: "x" })).status).toBe(400);
    const valid = lead("atomicvalidation");
    expect((await raw("upsert_leads", { leads: [valid, { ...lead("badgrade"), result: { ...result, score: 99 } }] })).status).toBe(400);
    expect((await raw("get_lead", { id: valid.id })).status).toBe(404);
    expect((await raw("upsert_leads", { leads: [{ ...valid, result: { ...result, priority: "skip" } }] })).status).toBe(400);
    expect((await raw("upsert_leads", { leads: [{ ...valid, id: "different" }] })).status).toBe(400);
    expect((await raw("upsert_leads", { leads: Array.from({ length: 21 }, (_, i) => lead(`bound${i}`)) })).status).toBe(400);
    expect((await raw("upsert_leads", { huge: "x".repeat(1_000_001) })).status).toBe(413);
    const malformed = await fetch(new URL("/api/list_leads", process.env.TEST_CRM_URL), { method: "POST", headers: { Authorization: `Bearer ${process.env.CRM_API_TOKEN}`, "Content-Type": "application/json" }, body: "{" });
    expect(malformed.status).toBe(400);
    expect((await raw("not_an_operation", {})).status).toBe(404);
    expect(() => new CrmClient("http://example.com", "test-token-long-enough")).toThrow("HTTPS");
  });

  test("feedback is dated append-only history; grades and source content survive status changes", async () => {
    const crm = client(), saved = lead("history");
    await crm.upsertLeads([saved]);
    await crm.recordFeedback(saved.id, "useful", "Needs practice");
    await crm.recordFeedback(saved.id, "dismissed", "Interview already happened");
    let stored = await crm.getLead(saved.id);
    expect(stored.lead.result).toEqual(result); expect(stored.lead.post).toEqual(saved.post);
    expect(stored.feedback.map(f => f.verdict)).toEqual(["dismissed", "useful"]);
    expect(stored.feedback.every(f => Number.isFinite(Date.parse(f.recorded_at)))).toBe(true);
    expect((await crm.listLeads({ alertsOnly: true, limit: 100 })).leads.some(l => l.id === saved.id)).toBe(false);
    await crm.setLeadStatus(saved.id, "contacted");
    expect((await crm.listLeads({ alertsOnly: true, limit: 100 })).leads.some(l => l.id === saved.id)).toBe(false);
    await crm.upsertLeads([{ ...saved, post: { ...saved.post, body: "Updated source" }, result: { ...result, model: "new-model", rubricVersion: "algovox-v2" } }]);
    stored = await crm.getLead(saved.id);
    expect(stored.lead.status).toBe("contacted"); expect(stored.revisions).toHaveLength(2); expect(stored.feedback).toHaveLength(2);
    expect(await runCrmCli(["get_lead", saved.id], crm)).toEqual(stored);
    await expect(crm.createReport([saved.id])).rejects.toThrow("not alertable");
  });

  test("report item and space resolve before feedback; ambiguity asks for clarification", async () => {
    const crm = client(), first = lead("reportfirst"), second = lead("reportsecond");
    await crm.upsertLeads([first, second]);
    const report = await crm.createReport([first.id, second.id]);
    expect(report.body.indexOf(first.post.title)).toBeLessThan(report.body.indexOf(second.post.title));
    await crm.recordSubmission(report.id, { platform: "imessage", spaceId: "report-chat", messageId: "report-message" });
    const event = { platform: "imessage", spaceId: "report-chat", messageId: "ambiguous", text: "Dismiss: already finished", targetMessageId: "report-message" };
    expect((await crm.processFeedback(event)).action).toBe("clarify");
    expect((await crm.processFeedback({ ...event, messageId: "wrong-space", spaceId: "other-chat", text: "Dismiss 2: already finished" })).action).toBe("clarify");
    expect((await crm.processFeedback({ ...event, messageId: "missing-target", targetMessageId: "unknown", text: "Dismiss 2: already finished" })).action).toBe("clarify");
    expect((await crm.processFeedback({ ...event, messageId: "no-thread", targetMessageId: undefined, text: "Dismiss 2: already finished" })).action).toBe("clarify");
    expect((await crm.processFeedback({ ...event, messageId: "out-of-range", text: "Dismiss 3: reason" })).action).toBe("clarify");
    expect((await crm.getLead(first.id)).feedback).toHaveLength(0);
    const response = await crm.processFeedback({ ...event, messageId: "dismiss-second", text: "Dismiss 2: their interview already happened." });
    expect(response.leadId).toBe(second.id); expect(response.action).toBe("feedback");
    expect((await crm.getLead(second.id)).feedback[0]!.reason).toBe("their interview already happened.");
    expect((await crm.getLead(first.id)).lead.status).toBe("new");
    expect((await crm.getLead(second.id)).lead.result).toEqual(result);
    expect((await crm.getLead(second.id)).reports).toHaveLength(1);
    await expect(crm.recordSubmission(report.id, { platform: "imessage", spaceId: "wrong-chat", messageId: "report-message" })).rejects.toThrow("another report/context");
  });

  test("SDK handler writes through D1 once on concurrent/repeated inbound events; outgoing events do nothing", async () => {
    const crm = client(), saved = lead("restart");
    await crm.upsertLeads([saved]);
    const report = await crm.createReport([saved.id]);
    await crm.recordSubmission(report.id, { platform: "imessage", spaceId: "restart-chat", messageId: "restart-report" });
    const event = { platform: "imessage", spaceId: "restart-chat", messageId: "restart-event", text: "Useful: good practice fit", targetMessageId: "restart-report" };
    const send = mock(async () => undefined);
    const message = { id: event.messageId, platform: event.platform, direction: "inbound", sender: { id: "+15550000001" }, space: { id: event.spaceId }, content: { type: "reply", target: { id: event.targetMessageId }, content: { type: "text", text: event.text } } } as unknown as Message;
    await handleMessage({ send }, { ...message, direction: "outbound" }, crm, "+15550000001");
    expect((await crm.getLead(saved.id)).feedback).toHaveLength(0);
    await Promise.all([handleMessage({ send }, message, crm, "+15550000001"), handleMessage({ send }, message, crm, "+15550000001")]);
    await handleMessage({ send }, message, crm, "+15550000001");
    expect(send).toHaveBeenCalledTimes(1);
    expect((await crm.getLead(saved.id)).feedback).toHaveLength(1);
    expect((await crm.getLead(saved.id)).lead.status).toBe("useful");
    const repeated = await crm.processFeedback({ ...event, text: "Dismiss: changed replay payload" });
    expect(repeated.duplicate).toBe(true); expect((await crm.getLead(saved.id)).lead.status).toBe("useful");
    const explicit = lead("explicit"); await crm.upsertLeads([explicit]);
    expect((await crm.processFeedback({ ...event, messageId: "explicit-command", targetMessageId: undefined, text: `Contacted ${explicit.id}: contacted manually` })).leadId).toBe(explicit.id);
    expect((await crm.getLead(explicit.id)).lead.status).toBe("contacted");
  });

  test("read-only SQLite import preserves grades/submissions and never overwrites subsequent CRM feedback", async () => {
    const crm = client(), saved = lead("sqliteimport"), directory = mkdtempSync(join(tmpdir(), "crm-import-test-")), path = join(directory, "legacy.sqlite");
    const db = new Database(path);
    try {
      db.run("CREATE TABLE leads (id TEXT PRIMARY KEY, post TEXT NOT NULL, result TEXT NOT NULL, submitted_at TEXT, message_id TEXT)");
      db.query("INSERT INTO leads VALUES (?, ?, ?, ?, ?)").run(saved.id, JSON.stringify(saved.post), JSON.stringify(result), at, "legacy-message");
      db.close();
      const originalBytes = await Bun.file(path).arrayBuffer();
      expect((await importSqlite(path, crm)).imported).toBe(1);
      let stored = await crm.getLead(saved.id);
      expect(stored.lead.result).toEqual(result); expect(stored.lead.submittedAt).toBe(at); expect(stored.lead.messageId).toBe("legacy-message");
      expect(stored.reports).toHaveLength(1);
      await crm.recordFeedback(saved.id, "dismissed", "No longer relevant");
      await importSqlite(path, crm);
      stored = await crm.getLead(saved.id);
      expect(stored.lead.status).toBe("dismissed"); expect(stored.feedback).toHaveLength(1); expect(stored.revisions).toHaveLength(1);
      expect(await Bun.file(path).arrayBuffer()).toEqual(originalBytes);
      expect((await crm.processFeedback({ platform: "imessage", spaceId: "legacy-chat", messageId: "legacy-reply", targetMessageId: "legacy-message", text: "Dismiss 1: reason" })).action).toBe("clarify");
    } finally { db.close(); rmSync(directory, { recursive: true, force: true }); }
  });
});
