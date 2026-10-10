import { classifyLead, parsePosts, RUBRIC_VERSION, type LeadPost } from "./jev.ts";
import { formatReport, leadId, type SavedLead } from "./lead-utils.ts";
import { CrmClient, CrmError } from "./crm-client.ts";
import type { Submission } from "./crm-types.ts";
export { formatReport, type SavedLead } from "./lead-utils.ts";

export async function prepareBatch(posts: LeadPost[], crm: CrmClient, classify = classifyLead): Promise<SavedLead[]> {
  for (const post of posts) {
    const id = leadId(post);
    let existing;
    try { existing = (await crm.getLead(id)).lead; }
    catch (error) { if (!(error instanceof CrmError) || error.status !== 404) throw error; }
    if (existing && JSON.stringify(existing.post) === JSON.stringify(post) && existing.result?.rubricVersion === RUBRIC_VERSION) continue;
    await crm.upsertLeads([{ id, post, result: await classify(post) }]);
  }
  const { leads } = await crm.listLeads({ alertsOnly: true, limit: 100 });
  return leads.map(lead => ({ id: lead.id, post: lead.post, result: lead.result! }));
}

export async function sendReport(text: string): Promise<Submission> {
  if (process.env.NOTIFY_ENABLED !== "true") throw new Error("Notifications disabled. Explicitly configure NOTIFY_ENABLED=true only for a live sender and CRM.");
  const owner = process.env.OWNER_PHONE;
  if (!owner || !/^\+[1-9]\d{7,14}$/.test(owner)) throw new Error("Set OWNER_PHONE to your personal iMessage number in E.164 format.");
  const { Spectrum } = await import("spectrum-ts");
  const { imessage } = await import("@spectrum-ts/imessage");
  const app = await Spectrum({ projectId: process.env.SPECTRUM_PROJECT_ID!, projectSecret: process.env.SPECTRUM_PROJECT_SECRET!, providers: [imessage.config()] });
  try {
    const im = imessage(app), dm = await im.space.create(await im.user(owner));
    const message = await dm.send(text);
    if (!message) throw new Error("Photon returned no message; candidates remain pending.");
    if (imessage(message).sendErrorCode) throw new Error("Photon reported a send failure; candidates remain pending.");
    return { messageId: message.id, platform: message.platform, spaceId: message.space.id };
  } finally { await app.stop(); }
}

export async function notifyBatch(leads: SavedLead[], crm: CrmClient, send = sendReport, demo = false) {
  if (!leads.length) return;
  if (!(await crm.getConfig()).notificationsEnabled) throw new Error("CRM notifications are disabled; no message sent.");
  const report = await crm.createReport(leads.slice(0, 5).map(lead => lead.id), demo);
  const submission = await send(report.body);
  // shortcut: Photon send and D1 commit are not atomic; add delivery reconciliation before automatic notifications.
  await crm.recordSubmission(report.id, submission);
  return submission.messageId;
}

if (import.meta.main) {
  try {
    const [filename, ...flags] = process.argv.slice(2);
    if (!filename || flags.some(flag => !["--notify", "--demo"].includes(flag))) throw new Error("Usage: bun run leads -- posts.json [--notify] [--demo]");
    if (flags.includes("--notify") && process.env.NOTIFY_ENABLED !== "true") throw new Error("Notifications disabled. Remove --notify for local development.");
    const posts = parsePosts(await Bun.file(filename).json()), crm = new CrmClient();
    const pending = await prepareBatch(posts, crm);
    for (const post of posts) console.log(JSON.stringify((await crm.getLead(leadId(post))).lead));
    if (pending.length) {
      if (flags.includes("--notify")) console.log(`Report submitted to Photon: ${await notifyBatch(pending, crm, sendReport, flags.includes("--demo"))}. Delivery is not yet confirmed.`);
      else {
        const report = await crm.createReport(pending.slice(0, 5).map(lead => lead.id), flags.includes("--demo"));
        console.log(`Report ${report.id}\n${report.body}`);
        console.log("Preview saved in D1; no notification sent. Item numbers resolve only against a linked report message.");
      }
    } else console.log("No new high-priority candidates to report.");
  } catch (error) { console.error(error instanceof Error ? error.message : "Lead batch failed."); process.exitCode = 1; }
}
