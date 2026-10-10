import { createHash } from "node:crypto";
import type { Classification, LeadPost } from "./jev.ts";

export type SavedLead = { id: string; post: LeadPost; result: Classification };

export function leadId(post: LeadPost): string {
  return post.url ? new URL(post.url).pathname.replace(/\/$/, "") : createHash("sha256").update(JSON.stringify(post)).digest("hex");
}

export function formatReport(leads: SavedLead[], demo = false): string {
  return [`${demo ? "DEMO — synthetic posts\n" : ""}AlgoVox candidates (${Math.min(leads.length, 5)}${leads.length > 5 ? ` of ${leads.length}` : ""})`, ...leads.slice(0, 5).map((lead, index) =>
    `${index + 1}. ${lead.result.priority.toUpperCase()} · ${lead.result.score.toFixed(1)}/4\n${lead.post.title.replaceAll(/\s+/g, " ")}\n${lead.result.reason}\n${lead.post.url || "Pasted text; no source link supplied."}`),
    ...(leads.length > 5 ? ["Remaining candidates are saved for the next report."] : [])].join("\n\n");
}
