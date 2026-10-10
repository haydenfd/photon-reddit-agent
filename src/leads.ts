import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { classifyLead, parsePosts, RUBRIC_VERSION, type Classification, type LeadPost } from "./jev.ts";
import { formatReport, leadId, type SavedLead } from "./lead-utils.ts";
export { formatReport, type SavedLead } from "./lead-utils.ts";

type Row = { id: string; post: string; result: string; submitted_at: string | null };

export function initStore(db: Database) {
  db.run("CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, post TEXT NOT NULL, result TEXT NOT NULL, submitted_at TEXT, message_id TEXT)");
}

export async function prepareBatch(posts: LeadPost[], db: Database, classify = classifyLead): Promise<SavedLead[]> {
  initStore(db);
  for (const post of posts) {
    const serialized = JSON.stringify(post);
    const id = leadId(post);
    const existing = db.query<Row, [string]>("SELECT * FROM leads WHERE id = ?").get(id);
    if (existing && existing.post === serialized && JSON.parse(existing.result).rubricVersion === RUBRIC_VERSION) continue;
    const result = await classify(post);
    db.query("INSERT INTO leads (id, post, result) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET post=excluded.post, result=excluded.result").run(id, serialized, JSON.stringify(result));
  }
  return db.query<Row, []>("SELECT * FROM leads WHERE submitted_at IS NULL").all()
    .map(row => ({ id: row.id, post: JSON.parse(row.post) as LeadPost, result: JSON.parse(row.result) as Classification }))
    .filter(lead => ["urgent", "high"].includes(lead.result.priority))
    .sort((a, b) => b.result.score - a.result.score);
}

async function sendReport(text: string): Promise<string> {
  const owner = process.env.OWNER_PHONE;
  if (!owner || !/^\+[1-9]\d{7,14}$/.test(owner)) throw new Error("Set OWNER_PHONE to your personal iMessage number in E.164 format.");
  const { Spectrum } = await import("spectrum-ts");
  const { imessage } = await import("@spectrum-ts/imessage");
  const app = await Spectrum({ projectId: process.env.SPECTRUM_PROJECT_ID!, projectSecret: process.env.SPECTRUM_PROJECT_SECRET!, providers: [imessage.config()] });
  try {
    const im = imessage(app);
    const dm = await im.space.create(await im.user(owner));
    const message = await dm.send(text);
    if (!message) throw new Error("Photon returned no message; candidates remain pending.");
    if (imessage(message).sendErrorCode) throw new Error("Photon reported a send failure; candidates remain pending.");
    return message.id;
  } finally {
    await app.stop();
  }
}

export async function notifyBatch(leads: SavedLead[], db: Database, send = sendReport, demo = false) {
  if (!leads.length) return;
  const selected = leads.slice(0, 5);
  const messageId = await send(formatReport(leads, demo));
  // ponytail: send and SQLite aren't atomic; use a durable outbox if crash replay matters.
  db.transaction(() => {
    for (const lead of selected) db.query("UPDATE leads SET submitted_at = ?, message_id = ? WHERE id = ?").run(new Date().toISOString(), messageId, lead.id);
  })();
  return messageId;
}

if (import.meta.main) {
  const [filename, ...flags] = process.argv.slice(2);
  let db: Database | undefined;
  try {
    if (!filename || flags.some(flag => !["--notify", "--demo"].includes(flag))) throw new Error("Usage: bun run leads -- posts.json [--notify] [--demo]");
    const posts = parsePosts(await Bun.file(filename).json());
    if (!flags.includes("--demo")) mkdirSync("data", { recursive: true });
    db = new Database(flags.includes("--demo") ? ":memory:" : "data/leads.sqlite");
    const pending = await prepareBatch(posts, db);
    const results = db.query<{ post: string; result: string }, []>("SELECT post, result FROM leads").all();
    for (const row of results) console.log(JSON.stringify({ title: (JSON.parse(row.post) as LeadPost).title, ...JSON.parse(row.result) }));
    if (pending.length) {
      console.log(formatReport(pending, flags.includes("--demo")));
      if (flags.includes("--notify")) {
        const messageId = await notifyBatch(pending, db, sendReport, flags.includes("--demo"));
        console.log(`Report submitted to Photon: ${messageId}. Delivery is not yet confirmed.`);
      } else console.log("Add --notify to send this report to OWNER_PHONE.");
    } else console.log("No new high-priority candidates to report.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Lead batch failed.");
    process.exitCode = 1;
  } finally {
    db?.close();
  }
}
