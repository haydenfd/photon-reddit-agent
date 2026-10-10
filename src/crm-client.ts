import type { CrmLead, Feedback, FeedbackEvent, FeedbackResponse, LeadStatus, Submission } from "./crm-types.ts";
import type { SavedLead } from "./lead-utils.ts";

export class CrmError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export class CrmClient {
  constructor(private url = process.env.CRM_URL || "http://127.0.0.1:8787", private token = process.env.CRM_API_TOKEN) {
    const parsed = new URL(url);
    if (parsed.username || parsed.password || !["http:", "https:"].includes(parsed.protocol) ||
      (parsed.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname))) throw new Error("CRM_URL must use HTTPS or loopback HTTP.");
    if (!token || token.length < 16) throw new Error("Set CRM_API_TOKEN to at least 16 characters; use an isolated token locally.");
  }
  async call<T>(operation: string, args: object = {}): Promise<T> {
    const response = await fetch(new URL(`/api/${operation}`, this.url), {
      method: "POST", headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args), signal: AbortSignal.timeout(30_000), redirect: "error",
    });
    const body = await response.json() as { error?: string } & T;
    if (!response.ok) throw new CrmError(response.status, body.error || `CRM HTTP ${response.status}`);
    return body;
  }
  upsertLeads(leads: SavedLead[]) { return this.call<{ ids: string[] }>("upsert_leads", { leads }); }
  listLeads(args: { status?: LeadStatus; alertsOnly?: boolean; limit?: number; offset?: number } = {}) {
    return this.call<{ leads: CrmLead[]; nextOffset: number | null }>("list_leads", args);
  }
  getLead(id: string) { return this.call<{ lead: CrmLead; feedback: Feedback[]; revisions: unknown[]; reports: unknown[] }>("get_lead", { id }); }
  setLeadStatus(id: string, status: LeadStatus) { return this.call("set_lead_status", { id, status }); }
  recordFeedback(id: string, verdict: Exclude<LeadStatus, "new">, reason: string) { return this.call("record_feedback", { id, verdict, reason }); }
  processFeedback(event: FeedbackEvent) { return this.call<FeedbackResponse>("process_feedback", event); }
  createReport(ids: string[], demo = false) { return this.call<{ id: string; body: string }>("create_report", { ids, demo }); }
  recordSubmission(reportId: string, submission: Submission) { return this.call("record_submission", { reportId, ...submission }); }
  getConfig() { return this.call<{ notificationsEnabled: boolean }>("get_config"); }
}
