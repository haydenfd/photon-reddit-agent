import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));

export async function applyMigrations(db) {
  await db.prepare("CREATE TABLE IF NOT EXISTS d1_migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)").run();
  for (const name of (await readdir(resolve(root, "migrations"))).filter(name => name.endsWith(".sql")).sort()) {
    if (await db.prepare("SELECT name FROM d1_migrations WHERE name = ?").bind(name).first()) continue;
    const sql = await readFile(resolve(root, "migrations", name), "utf8");
    // These checked-in migrations have no semicolons inside strings or triggers.
    const statements = sql.split(";").map(s => s.trim()).filter(Boolean).map(s => db.prepare(s));
    await db.batch([...statements, db.prepare("INSERT INTO d1_migrations (name) VALUES (?)").bind(name)]);
  }
}

export async function createLocalCrm({ persist, token, port = 8787, notifications = false, scanDemo = false } = {}) {
  if (!token || token.length < 16) throw new Error("Set CRM_API_TOKEN to an isolated local token with at least 16 characters.");
  execFileSync("bun", ["--no-env-file", "scripts/build-worker.ts"], { cwd: root, stdio: "inherit" });
  const mf = new Miniflare(convertV4MiniflareOptions({
    name: "reddit-tracker", modules: true, scriptPath: resolve(root, ".wrangler/crm-worker.js"),
    compatibilityDate: "2025-04-01", compatibilityFlags: ["nodejs_compat"],
    unsafeTriggerHandlers: true,
    host: "127.0.0.1", port, d1Databases: { DB: "reddit-tracker" }, resourcePersistencePath: persist || resolve(root, scanDemo ? "data/scan-demo-d1" : "data/d1"),
    bindings: { CRM_API_TOKEN: token, NOTIFY_ENABLED: notifications ? "true" : "false", SCAN_ENABLED: scanDemo ? "true" : "false",
      ...(scanDemo ? { SCAN_SOURCE: "fixture", SCAN_SUBREDDITS: "demo", SCAN_FIXTURE_JSON: await readFile(resolve(root, "examples/graded-leads.json"), "utf8") } : {}) },
  }));
  try {
    const db = await mf.getD1Database("DB");
    await applyMigrations(db);
    await mf.ready;
    return mf;
  } catch (error) { await mf.dispose(); throw error; }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.slice(2).some(arg => arg !== "--scan-demo")) throw new Error("Usage: node scripts/local-crm.mjs [--scan-demo]");
    const scanDemo = process.argv.includes("--scan-demo");
    const mf = await createLocalCrm({ token: process.env.CRM_API_TOKEN, scanDemo });
    console.log(`Local CRM ready: ${await mf.ready}. D1: ${scanDemo ? "data/scan-demo-d1; offline scans enabled" : "data/d1; scans disabled"}. Notifications disabled.`);
    for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, async () => { await mf.dispose(); process.exit(0); });
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
