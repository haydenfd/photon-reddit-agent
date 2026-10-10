import type { D1Database, D1PreparedStatement } from "@cloudflare/workers-types";
import { parsePosts, TOPICS, TIMINGS, type Classification } from "./jev.ts";
import { formatReport, leadId, type SavedLead } from "./lead-utils.ts";
import { STATUSES, type CrmLead, type FeedbackResponse, type LeadStatus } from "./crm-types.ts";
import { parseFeedback } from "./feedback.ts";

type Env = { DB: D1Database; CRM_API_TOKEN: string; NOTIFY_ENABLED?: string };
type Row = { id: string; post: string; result: string | null; status: LeadStatus; created_at: string; updated_at: string | null; submitted_at: string | null; message_id: string | null };
class ApiError extends Error { constructor(message: string, public status = 400) { super(message); } }
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ApiError("Expected a JSON object.");
  return value as Record<string, unknown>;
}
function fields(args: Record<string, unknown>, allowed: string[]) {
  if (Object.keys(args).some(key => !allowed.includes(key))) throw new ApiError("Unknown input field.");
}
function string(value: unknown, name: string, max = 500, empty = false): string {
  if (typeof value !== "string" || (!empty && !value.trim()) || value.length > max) throw new ApiError(`${name} must be ${empty ? "0" : "1"}–${max} characters.`);
  return value;
}
function timestamp(value: unknown, name: string) {
  const text = string(value, name, 40);
  if (!/^\d{4}-\d\d-\d\dT/.test(text) || !Number.isFinite(Date.parse(text))) throw new ApiError(`${name} must be an ISO timestamp.`);
  return text;
}
function integer(value: unknown, name: string, min: number, max: number, fallback: number) {
  if (value === undefined) return fallback;
  if (typeof value !== "number" || !Number.isInteger(value) || value < min || value > max) throw new ApiError(`${name} must be an integer from ${min} to ${max}.`);
  return value;
}
function status(value: unknown, feedback = false): LeadStatus {
  if (!STATUSES.includes(value as LeadStatus) || (feedback && value === "new")) throw new ApiError("Invalid lead status/verdict.");
  return value as LeadStatus;
}
function classification(value: unknown): Classification | null {
  if (value === null) return null;
  const r = object(value);
  fields(r, ["topic", "timing", "score", "confidence", "priority", "reason", "model", "rubricVersion", "evaluatedAt"]);
  if (!TOPICS.includes(r.topic as never) || !TIMINGS.includes(r.timing as never)) throw new ApiError("Invalid classification topic/timing.");
  for (const [key, max] of [["score", 4], ["confidence", 1]] as const) {
    if (typeof r[key] !== "number" || !Number.isFinite(r[key]) || r[key] < 0 || r[key] > max) throw new ApiError(`Invalid classification ${key}.`);
  }
  const score = r.score as number, confidence = r.confidence as number;
  const priority = confidence < 0.5 ? "review" : score >= 3.5 ? "urgent" : score >= 2.5 ? "high" : score >= 1 ? "review" : "skip";
  if (r.priority !== priority) throw new ApiError("Classification priority must match the existing scoring thresholds.");
  string(r.reason, "reason", 2000, true); string(r.model, "model", 200); string(r.rubricVersion, "rubricVersion", 200);
  timestamp(r.evaluatedAt, "evaluatedAt");
  return r as Classification;
}
function decode(row: Row): CrmLead {
  return { id: row.id, post: JSON.parse(row.post), result: row.result ? JSON.parse(row.result) : null, status: row.status,
    createdAt: row.created_at, updatedAt: row.updated_at, submittedAt: row.submitted_at, messageId: row.message_id };
}
async function requireLead(db: D1Database, id: string): Promise<Row> {
  const row = await db.prepare("SELECT * FROM leads WHERE id = ?").bind(id).first<Row>();
  if (!row) throw new ApiError(`Unknown lead ID: ${id}`, 404);
  return row;
}
const NOW = "strftime('%Y-%m-%dT%H:%M:%fZ', 'now')";
const ALERTS = "status IN ('new', 'useful') AND submitted_at IS NULL AND json_extract(result, '$.priority') IN ('high', 'urgent')";

async function operation(name: string, args: Record<string, unknown>, env: Env): Promise<unknown> {
  const db = env.DB;
  if (name === "get_config") {
    fields(args, []);
    return { notificationsEnabled: env.NOTIFY_ENABLED === "true" };
  }
  if (name === "upsert_leads" || name === "import_legacy") {
    fields(args, ["leads"]);
    const max = name === "import_legacy" ? 10 : 20;
    if (!Array.isArray(args.leads) || args.leads.length < 1 || args.leads.length > max) throw new ApiError(`Provide 1–${max} leads.`);
    const rows = args.leads.map(raw => {
      const entry = object(raw);
      fields(entry, name === "import_legacy" ? ["id", "post", "result", "submittedAt", "messageId"] : ["id", "post", "result"]);
      let post;
      try { post = parsePosts([entry.post])[0]!; } catch (e) { throw new ApiError(e instanceof Error ? e.message : "Invalid post."); }
      const id = leadId(post);
      string(id, "lead ID");
      if (entry.id !== undefined && string(entry.id, "id") !== id) throw new ApiError("Lead ID must match its source post.");
      const result = classification(entry.result);
      let submittedAt: string | null = null, messageId: string | null = null;
      if (name === "import_legacy") {
        submittedAt = entry.submittedAt == null ? null : timestamp(entry.submittedAt, "submittedAt");
        messageId = entry.messageId == null ? null : string(entry.messageId, "messageId");
        if (Boolean(messageId) !== Boolean(submittedAt)) throw new ApiError("Legacy submission needs both messageId and submittedAt.");
      }
      return { id, post: JSON.stringify(post), result: result ? JSON.stringify(result) : null, submittedAt, messageId };
    });
    if (new Set(rows.map(row => row.id)).size !== rows.length) throw new ApiError("Duplicate lead IDs in one request.");
    const statements: D1PreparedStatement[] = [];
    for (const row of rows) {
      if (name === "import_legacy") {
        statements.push(db.prepare("INSERT OR IGNORE INTO leads (id, post, result, submitted_at, message_id) VALUES (?, ?, ?, ?, ?)")
          .bind(row.id, row.post, row.result, row.submittedAt, row.messageId));
      } else {
        statements.push(db.prepare(`INSERT INTO leads (id, post, result) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET post=excluded.post, result=excluded.result, updated_at=${NOW} WHERE leads.post != excluded.post OR leads.result IS NOT excluded.result`)
          .bind(row.id, row.post, row.result));
      }
      statements.push(db.prepare("INSERT OR IGNORE INTO lead_revisions (lead_id, post, result) VALUES (?, ?, ?)").bind(row.id, row.post, row.result));
      if (row.messageId) {
        const reportId = `legacy:${row.messageId}`;
        statements.push(db.prepare("INSERT OR IGNORE INTO reports (id, body, submitted_at, message_id) VALUES (?, ?, ?, ?)")
          .bind(reportId, "[Legacy report: item ordering unavailable]", row.submittedAt, row.messageId));
        statements.push(db.prepare("INSERT OR IGNORE INTO report_items (report_id, lead_id, item_index, snapshot) VALUES (?, ?, NULL, ?)")
          .bind(reportId, row.id, JSON.stringify({ post: JSON.parse(row.post), result: row.result ? JSON.parse(row.result) : null })));
        statements.push(db.prepare("INSERT OR IGNORE INTO notification_submissions (report_id, platform, space_id, message_id, submitted_at) VALUES (?, 'imessage', NULL, ?, ?)")
          .bind(reportId, row.messageId, row.submittedAt));
      }
    }
    await db.batch(statements);
    return { ids: rows.map(row => row.id) };
  }
  if (name === "list_leads") {
    fields(args, ["status", "alertsOnly", "limit", "offset"]);
    const limit = integer(args.limit, "limit", 1, 100, 25), offset = integer(args.offset, "offset", 0, 100_000, 0);
    if (args.alertsOnly !== undefined && typeof args.alertsOnly !== "boolean") throw new ApiError("alertsOnly must be boolean.");
    const filters: string[] = [], values: (string | number)[] = [];
    if (args.status !== undefined) { filters.push("status = ?"); values.push(status(args.status)); }
    if (args.alertsOnly) filters.push(ALERTS);
    const rows = await db.prepare(`SELECT * FROM leads ${filters.length ? `WHERE ${filters.join(" AND ")}` : ""} ORDER BY ${args.alertsOnly ? "json_extract(result, '$.score') DESC," : ""} id LIMIT ? OFFSET ?`)
      .bind(...values, limit + 1, offset).all<Row>();
    return { leads: rows.results.slice(0, limit).map(decode), nextOffset: rows.results.length > limit ? offset + limit : null };
  }
  if (name === "get_lead") {
    fields(args, ["id"]);
    const id = string(args.id, "id"), row = await requireLead(db, id);
    const [feedback, revisions, reports] = await db.batch<Record<string, unknown>>([
      db.prepare("SELECT id, verdict, reason, recorded_at FROM feedback_history WHERE lead_id = ? ORDER BY id DESC LIMIT 100").bind(id),
      db.prepare("SELECT post, result, recorded_at FROM lead_revisions WHERE lead_id = ? ORDER BY id DESC LIMIT 100").bind(id),
      db.prepare("SELECT i.report_id, i.item_index, s.platform, s.space_id, s.message_id, s.submitted_at FROM report_items i LEFT JOIN notification_submissions s ON s.report_id = i.report_id WHERE i.lead_id = ? ORDER BY i.report_id LIMIT 100").bind(id),
    ]);
    return { lead: decode(row), feedback: feedback!.results, revisions: revisions!.results.map(r => ({ ...r, post: JSON.parse(r.post as string), result: r.result ? JSON.parse(r.result as string) : null })), reports: reports!.results };
  }
  if (name === "set_lead_status" || name === "record_feedback") {
    fields(args, name === "set_lead_status" ? ["id", "status"] : ["id", "verdict", "reason"]);
    const id = string(args.id, "id"), verdict = status(name === "set_lead_status" ? args.status : args.verdict, name === "record_feedback");
    await requireLead(db, id);
    const statements = [db.prepare(`UPDATE leads SET status = ?, updated_at = ${NOW} WHERE id = ?`).bind(verdict, id)];
    if (name === "record_feedback") statements.push(db.prepare("INSERT INTO feedback_history (lead_id, verdict, reason) VALUES (?, ?, ?)")
      .bind(id, verdict, string(args.reason, "reason", 2000, true)));
    await db.batch(statements);
    return { id, status: verdict };
  }
  if (name === "create_report") {
    fields(args, ["ids", "demo"]);
    if (!Array.isArray(args.ids) || args.ids.length < 1 || args.ids.length > 5 || new Set(args.ids).size !== args.ids.length) throw new ApiError("Select 1–5 distinct lead IDs.");
    if (args.demo !== undefined && typeof args.demo !== "boolean") throw new ApiError("demo must be boolean.");
    const ids = args.ids.map(id => string(id, "id"));
    const leads: SavedLead[] = [];
    for (const id of ids) {
      const row = await requireLead(db, id), lead = decode(row);
      if (!lead.result || !["high", "urgent"].includes(lead.result.priority) || ["dismissed", "contacted"].includes(lead.status) || lead.submittedAt) throw new ApiError(`Lead is not alertable: ${id}`, 409);
      leads.push({ id, post: lead.post, result: lead.result });
    }
    const id = crypto.randomUUID(), body = formatReport(leads, args.demo === true);
    await db.batch([
      db.prepare("INSERT INTO reports (id, body) VALUES (?, ?)").bind(id, body),
      ...leads.map((lead, i) => db.prepare("INSERT INTO report_items (report_id, lead_id, item_index, snapshot) VALUES (?, ?, ?, ?)").bind(id, lead.id, i + 1, JSON.stringify(lead))),
    ]);
    return { id, body };
  }
  if (name === "record_submission") {
    fields(args, ["reportId", "platform", "spaceId", "messageId"]);
    if (env.NOTIFY_ENABLED !== "true") throw new ApiError("Notification submissions are disabled. Local development never sends notifications.", 403);
    const reportId = string(args.reportId, "reportId"), platform = string(args.platform, "platform", 50), spaceId = string(args.spaceId, "spaceId"), messageId = string(args.messageId, "messageId");
    if (!await db.prepare("SELECT id FROM reports WHERE id = ?").bind(reportId).first()) throw new ApiError("Unknown report ID.", 404);
    const existing = await db.prepare("SELECT * FROM notification_submissions WHERE platform = ? AND message_id = ?").bind(platform, messageId).first<{ report_id: string; space_id: string }>();
    if (existing) {
      if (existing.report_id !== reportId || existing.space_id !== spaceId) throw new ApiError("Message already belongs to another report/context.", 409);
      return { reportId, messageId };
    }
    await db.batch([
      db.prepare(`INSERT INTO notification_submissions (report_id, platform, space_id, message_id, submitted_at) VALUES (?, ?, ?, ?, ${NOW})`).bind(reportId, platform, spaceId, messageId),
      db.prepare(`UPDATE reports SET submitted_at = ${NOW}, message_id = ? WHERE id = ?`).bind(messageId, reportId),
      db.prepare(`UPDATE leads SET submitted_at = COALESCE(submitted_at, ${NOW}), message_id = COALESCE(message_id, ?) WHERE id IN (SELECT lead_id FROM report_items WHERE report_id = ?)`).bind(messageId, reportId),
    ]);
    return { reportId, messageId };
  }
  if (name === "process_feedback") {
    fields(args, ["platform", "spaceId", "messageId", "text", "targetMessageId"]);
    const platform = string(args.platform, "platform", 50), spaceId = string(args.spaceId, "spaceId"), messageId = string(args.messageId, "messageId");
    const text = string(args.text, "text", 4000, true);
    const targetMessageId = args.targetMessageId === undefined ? undefined : string(args.targetMessageId, "targetMessageId");
    const eventId = JSON.stringify([platform, spaceId, messageId]);
    const existing = await db.prepare("SELECT response FROM inbox WHERE id = ?").bind(eventId).first<{ response: string | null }>();
    if (existing?.response) return { ...JSON.parse(existing.response), duplicate: true };
    const parsed = parseFeedback(text);
    let response: FeedbackResponse = { action: "ignore" }, resolved: string | undefined;
    if (parsed) {
      if (parsed.reason.length > 2000) throw new ApiError("Feedback reason exceeds 2000 characters.");
      const target = parsed.target;
      if (target && !/^\d+$/.test(target)) {
        if (await db.prepare("SELECT id FROM leads WHERE id = ?").bind(target).first()) resolved = target;
      } else if (targetMessageId) {
        const rows = await db.prepare("SELECT i.lead_id, i.item_index FROM notification_submissions s JOIN report_items i ON i.report_id = s.report_id WHERE s.platform = ? AND s.space_id = ? AND s.message_id = ?")
          .bind(platform, spaceId, targetMessageId).all<{ lead_id: string; item_index: number | null }>();
        if (target) resolved = rows.results.find(row => row.item_index === Number(target))?.lead_id;
        else if (rows.results.length === 1) resolved = rows.results[0]!.lead_id;
      }
      response = resolved ? { action: "feedback", leadId: resolved, text: `Marked ${resolved} ${parsed.verdict}.${parsed.reason ? ` Reason: ${parsed.reason}` : ""}` }
        : { action: "clarify", text: "Which lead? Reply to the report with ‘Dismiss 2: reason’, or use ‘Useful <lead ID>: reason’ / ‘Contacted <lead ID>: reason’." };
    }
    const statements = [db.prepare("INSERT OR IGNORE INTO inbox (id, payload) VALUES (?, ?)").bind(eventId, JSON.stringify(args))];
    if (resolved && parsed) {
      statements.push(db.prepare("INSERT INTO feedback_history (lead_id, verdict, reason, inbound_event_id) SELECT ?, ?, ?, ? WHERE EXISTS (SELECT 1 FROM inbox WHERE id = ? AND response IS NULL)")
        .bind(resolved, parsed.verdict, parsed.reason, eventId, eventId));
      statements.push(db.prepare(`UPDATE leads SET status = ?, updated_at = ${NOW} WHERE id = ? AND EXISTS (SELECT 1 FROM inbox WHERE id = ? AND response IS NULL)`)
        .bind(parsed.verdict, resolved, eventId));
    }
    statements.push(db.prepare("UPDATE inbox SET response = ? WHERE id = ? AND response IS NULL").bind(JSON.stringify(response), eventId));
    const results = await db.batch(statements);
    const stored = await db.prepare("SELECT response FROM inbox WHERE id = ?").bind(eventId).first<{ response: string }>();
    return { ...JSON.parse(stored!.response), duplicate: results[0]!.meta.changes === 0 };
  }
  throw new ApiError("Unknown operation.", 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      if (!env.CRM_API_TOKEN || env.CRM_API_TOKEN.length < 16) throw new ApiError("CRM authentication is not configured.", 503);
      if (request.headers.get("Authorization") !== `Bearer ${env.CRM_API_TOKEN}`) throw new ApiError("Unauthorized.", 401);
      const path = new URL(request.url).pathname;
      if (request.method !== "POST") throw new ApiError("Use POST with a JSON object.", 405);
      if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get("Content-Type") || "")) throw new ApiError("Use application/json.", 415);
      const max = 1_000_000, reader = request.body?.getReader();
      if (!reader) throw new ApiError("Missing JSON body.");
      const chunks: Uint8Array[] = []; let size = 0;
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > max) { await reader.cancel(); throw new ApiError("Request exceeds 1 MB.", 413); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size); let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
      let args;
      try { args = object(JSON.parse(new TextDecoder().decode(bytes))); } catch (e) { throw new ApiError(e instanceof ApiError ? e.message : "Invalid JSON."); }
      if (!path.startsWith("/api/")) throw new ApiError("Unknown route.", 404);
      return Response.json(await operation(path.slice(5), args, env), { headers: { "Cache-Control": "no-store" } });
    } catch (e) {
      const known = e instanceof ApiError;
      if (!known) console.error("CRM database operation failed.", e instanceof Error ? e.message : "Unknown database error");
      return Response.json({ error: known ? e.message : "CRM database operation failed." }, { status: known ? e.status : 500, headers: { "Cache-Control": "no-store" } });
    }
  },
};
