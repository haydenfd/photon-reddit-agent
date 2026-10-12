import type { D1Database } from "@cloudflare/workers-types";
import { classifyLead, parsePosts, RUBRIC_VERSION, type Classification, type LeadPost } from "./jev.ts";
import { leadId, type SavedLead } from "./lead-utils.ts";
import { fetchRedditPosts, ScanError, type RedditConfig } from "./reddit.ts";

const FIXTURE_LIMIT = 5;
// Jev calls are subrequests; Workers Free allows 50 per invocation. Ungraded posts are picked up next run.
export const GRADE_LIMIT = 20;

export type ScanEnv = RedditConfig & {
  DB: D1Database;
  SCAN_ENABLED?: string;
  SCAN_SOURCE?: string;
  SCAN_SUBREDDITS?: string;
  SCAN_FIXTURE_JSON?: string;
  JEV_API_KEY?: string;
  JEV_MODEL?: string;
};
export type ScanSummary = {
  id: string; trigger: "manual" | "scheduled"; source: string; subreddit: string;
  fetched: number; classified: number; reused: number; moreAvailable: boolean;
  report: { id: string; body: string } | null;
};
type Operate = (name: string, args: Record<string, unknown>) => Promise<unknown>;

export function scanConfig(env: ScanEnv) {
  if (env.SCAN_ENABLED !== "true") throw new ScanError("Scans are disabled. Use crm:dev --scan-demo for offline testing.", 503);
  const source = env.SCAN_SOURCE || "reddit";
  if (!["fixture", "reddit"].includes(source)) throw new ScanError("SCAN_SOURCE must be fixture or reddit.", 503);
  const subreddits = (env.SCAN_SUBREDDITS || "").split(",").map(s => s.trim().toLowerCase());
  if (!subreddits.length || subreddits.length > 5 || subreddits.some(s => !/^[a-z0-9_]{2,21}$/.test(s)) || new Set(subreddits).size !== subreddits.length) throw new ScanError("Configure SCAN_SUBREDDITS as 1–5 distinct subreddit names.", 503);
  if (source === "reddit" && !env.JEV_API_KEY) throw new ScanError("Live scans need JEV_API_KEY.", 503);
  if (source === "fixture" && (!env.SCAN_FIXTURE_JSON || env.SCAN_FIXTURE_JSON.length > 100_000)) throw new ScanError("Configure a bounded offline scan fixture.", 503);
  return { source, subreddits };
}

export async function runScan(env: ScanEnv, trigger: "manual" | "scheduled", operate: Operate): Promise<ScanSummary> {
  const config = scanConfig(env), db = env.DB, now = Date.now(), id = crypto.randomUUID();
  const lock = await db.prepare("INSERT INTO run_lock (id, token, expires_at) VALUES (1, ?, ?) ON CONFLICT(id) DO UPDATE SET token=excluded.token, expires_at=excluded.expires_at WHERE run_lock.expires_at <= ?")
    .bind(id, now + 180_000, now).run();
  if (!lock.meta.changes) throw new ScanError("A scan is already running; try again after it finishes.", 409);
  let started = false;
  try {
    const state = await db.prepare("SELECT next_index, not_before FROM scan_state WHERE id = 1").first<{ next_index: number; not_before: number }>();
    if (state!.not_before > now) throw new ScanError("Reddit cooldown is active; no external request made.", 429, state!.not_before);
    // Fixtures rotate one subreddit per run; the live feed reads the whole watchlist in one request.
    const index = state!.next_index % config.subreddits.length;
    const subreddit = config.source === "fixture" ? config.subreddits[index]! : config.subreddits.join("+");
    const summary: ScanSummary = { id, trigger, source: config.source, subreddit, fetched: 0, classified: 0, reused: 0, moreAvailable: false, report: null };
    await db.prepare("INSERT INTO runs (id, started_at, status, summary) VALUES (?, ?, 'running', ?)").bind(id, new Date(now).toISOString(), JSON.stringify(summary)).run();
    started = true;
    let posts: LeadPost[], fixtures: SavedLead[] = [];
    if (config.source === "fixture") {
      let raw: unknown;
      try { raw = JSON.parse(env.SCAN_FIXTURE_JSON!); } catch { throw new ScanError("Offline fixture is invalid JSON.", 503); }
      if (!Array.isArray(raw) || raw.length < 1 || raw.length > FIXTURE_LIMIT) throw new ScanError(`Offline fixture needs 1–${FIXTURE_LIMIT} graded posts.`, 503);
      try {
        posts = parsePosts(raw.map(row => row.post));
        fixtures = raw.map((row, i) => ({ id: leadId(posts[i]!), post: posts[i]!, result: row.result }));
      } catch { throw new ScanError("Offline fixture contains invalid posts.", 503); }
      if (posts.some(post => post.subreddit?.toLowerCase() !== subreddit)) throw new ScanError("Offline fixture must match the selected demo subreddit.", 503);
    } else {
      const page = await fetchRedditPosts(config.subreddits, env);
      posts = page.posts;
      if (page.notBefore) await db.prepare("UPDATE scan_state SET not_before = ? WHERE id = 1").bind(page.notBefore).run();
    }
    summary.fetched = posts.length;
    if (posts.length) {
      const ids = posts.map(leadId);
      const rows = await db.prepare(`SELECT id, post, result FROM leads WHERE id IN (${ids.map(() => "?").join(",")})`).bind(...ids)
        .all<{ id: string; post: string; result: string | null }>();
      const existing = new Map(rows.results.map(row => [row.id, row]));
      const fresh: string[] = [], reused: string[] = [];
      for (const post of posts) {
        const key = leadId(post), cached = existing.get(key);
        if (cached?.result && cached.post === JSON.stringify(post) && (JSON.parse(cached.result) as Classification).rubricVersion === RUBRIC_VERSION) { summary.reused++; reused.push(key); continue; }
        if (summary.classified >= GRADE_LIMIT) { summary.moreAvailable = true; continue; }
        const result = config.source === "fixture" ? fixtures.find(row => row.id === key)!.result
          : await classifyLead(post, fetch, { apiKey: env.JEV_API_KEY, model: env.JEV_MODEL });
        await operate("upsert_leads", { leads: [{ id: key, post, result }] });
        summary.classified++; fresh.push(key);
      }
      // list_leads accepts at most 20 IDs; prefer posts graded in this run.
      const candidates = [...fresh, ...reused].slice(0, 20);
      const { leads } = candidates.length ? await operate("list_leads", { alertsOnly: true, limit: 5, ids: candidates }) as { leads: SavedLead[] } : { leads: [] };
      if (leads.length) {
        summary.report = await operate("create_scan_report", { ids: leads.map(lead => lead.id), demo: config.source === "fixture" }) as ScanSummary["report"];
      }
    }
    await db.batch([
      db.prepare("UPDATE runs SET status = 'succeeded', finished_at = ?, summary = ? WHERE id = ?").bind(new Date().toISOString(), JSON.stringify(summary), id),
      db.prepare("UPDATE scan_state SET next_index = ? WHERE id = 1").bind((index + 1) % config.subreddits.length),
    ]);
    return summary;
  } catch (error) {
    if (!(error instanceof ScanError)) console.error("scan failed:", error);
    const safe = error instanceof ScanError ? error : new ScanError("Scan failed; saved grades remain available and no notification was sent.");
    if (safe.retryAt) await db.prepare("UPDATE scan_state SET not_before = ? WHERE id = 1").bind(safe.retryAt).run();
    if (started) await db.prepare("UPDATE runs SET status = 'failed', finished_at = ?, summary = ? WHERE id = ?")
      .bind(new Date().toISOString(), JSON.stringify({ trigger, source: config.source, error: safe.message, detail: error === safe ? undefined : String(error).slice(0, 300), retryAt: safe.retryAt }), id).run();
    throw safe;
  } finally {
    await db.prepare("DELETE FROM run_lock WHERE id = 1 AND token = ?").bind(id).run();
  }
}
