import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";
import { createLocalCrm, applyMigrations } from "./local-crm.mjs";

const token = "isolated-crm-integration-token";
const directory = await mkdtemp(join(tmpdir(), "photon-crm-test-"));
let mf, legacy;
const request = (runtime, op, args = {}) => runtime.dispatchFetch(`http://localhost/api/${op}`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(args) });
try {
  // Fake submissions are database fixtures only; no Spectrum or model transport is opened.
  mf = await createLocalCrm({ persist: join(directory, "d1"), token, port: 0, notifications: true });
  assert.equal((await request(mf, "run_scan")).status, 503, "scans default off");
  const disabledSchedule = await mf.dispatchFetch("http://localhost/cdn-cgi/local/scheduled");
  assert.equal(disabledSchedule.status, 200, "disabled scheduled handler is a no-op");
  assert.equal((await (await mf.getD1Database("DB")).prepare("SELECT count(*) AS n FROM runs").first()).n, 0);
  const url = String(await mf.ready);
  const exitCode = await new Promise((resolve, reject) => {
    const child = spawn("bun", ["--no-env-file", "test", "src/index.test.ts", "src/leads.test.ts", "src/crm.integration.test.ts", "src/scan.test.ts"], {
      stdio: "inherit", env: { ...process.env, CRM_URL: url, TEST_CRM_URL: url, CRM_API_TOKEN: token,
        JEV_API_KEY: "isolated-test-no-live-calls", SPECTRUM_PROJECT_ID: "test-only", SPECTRUM_PROJECT_SECRET: "test-only",
        OWNER_PHONE: "+15550000001", NOTIFY_ENABLED: "false" },
    });
    child.once("error", reject); child.once("exit", resolve);
  });
  assert.equal(exitCode, 0, "Bun integration tests must pass");
  const before = await (await request(mf, "get_lead", { id: "/r/test/comments/restart/title" })).json();
  assert.equal(before.lead.status, "useful");
  await mf.dispose();
  mf = await createLocalCrm({ persist: join(directory, "d1"), token, port: 0 });
  const after = await (await request(mf, "get_lead", { id: "/r/test/comments/restart/title" })).json();
  assert.deepEqual(after, before, "grades, feedback, report references persist across runtime restart");
  const replay = await (await request(mf, "process_feedback", { platform: "imessage", spaceId: "restart-chat", messageId: "restart-event", text: "Dismiss /r/test/comments/restart/title: replay must not alter the original verdict" })).json();
  assert.equal(replay.duplicate, true);
  assert.equal(replay.leadId, before.lead.id);
  assert.equal((await request(mf, "record_submission", { reportId: "fake", platform: "imessage", spaceId: "fake", messageId: "fake" })).status, 403);
  console.log("PASS: persistence and inbox deduplication across D1 restart; local notifications disabled.");

  await mf.dispose();
  mf = await createLocalCrm({ persist: join(directory, "scans"), token, port: 0, scanDemo: true });
  const scanDb = await mf.getD1Database("DB");
  const config = await (await request(mf, "get_config")).json();
  assert.equal(config.scansEnabled, true); assert.equal(config.notificationsEnabled, false);
  const wrongAuth = await mf.dispatchFetch("http://localhost/api/run_scan", { method: "POST", headers: { Authorization: "Bearer wrong", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(wrongAuth.status, 401);
  assert.equal((await request(mf, "run_scan", { url: "https://evil.example" })).status, 400);
  const firstScanResponse = await request(mf, "run_scan");
  assert.equal(firstScanResponse.status, 200);
  const firstScan = await firstScanResponse.json();
  assert.equal(firstScan.trigger, "manual"); assert.equal(firstScan.source, "fixture");
  assert.equal(firstScan.fetched, 1); assert.equal(firstScan.classified, 1);
  assert.match(firstScan.report.body, /DEMO/);
  const scanId = "/r/demo/comments/crm_demo/practice";
  const initialLead = await (await request(mf, "get_lead", { id: scanId })).json();
  const repeatScan = await (await request(mf, "run_scan")).json();
  assert.equal(repeatScan.classified, 0); assert.equal(repeatScan.reused, 1);
  assert.equal(repeatScan.report.id, firstScan.report.id, "identical pending reports are reused");
  assert.match((await (await request(mf, "get_rules", { name: "grading" })).json()).body, /Interns, new grads/, "migration seeds the owner's rules");
  await request(mf, "set_rules", { name: "style", body: "- Keep drafts short." });
  assert.equal((await (await request(mf, "get_rules", { name: "style" })).json()).body, "- Keep drafts short.");
  assert.match((await (await request(mf, "get_rules", { name: "grading" })).json()).body, /Interns/, "style rules don't touch grading");
  const scheduled = await mf.dispatchFetch("http://localhost/cdn-cgi/local/scheduled?cron=*/30%20*%20*%20*%20*");
  assert.equal(scheduled.status, 200);
  const scheduledRuns = await (await request(mf, "list_scan_runs")).json();
  assert(scheduledRuns.runs.some(run => run.summary.trigger === "scheduled" && run.status === "succeeded"));
  assert.equal((await scanDb.prepare("SELECT count(*) AS n FROM reports").first()).n, 1);
  assert.equal((await scanDb.prepare("SELECT count(*) AS n FROM notification_submissions").first()).n, 0);
  assert.deepEqual((await (await request(mf, "get_lead", { id: scanId })).json()).lead.result, initialLead.lead.result);
  await scanDb.prepare("INSERT INTO run_lock (id, token, expires_at) VALUES (1, 'another-run', ?)").bind(Date.now() + 60_000).run();
  assert.equal((await request(mf, "run_scan")).status, 409, "overlapping manual scan is blocked");
  assert.equal((await mf.dispatchFetch("http://localhost/cdn-cgi/local/scheduled")).status, 200);
  assert.equal((await scanDb.prepare("SELECT token FROM run_lock WHERE id = 1").first()).token, "another-run");
  await scanDb.prepare("UPDATE run_lock SET expires_at = 0 WHERE id = 1").run();
  assert.equal((await request(mf, "run_scan")).status, 200, "expired scan lease is recoverable");
  assert.equal((await scanDb.prepare("SELECT count(*) AS n FROM run_lock").first()).n, 0);
  await scanDb.prepare("UPDATE scan_state SET not_before = ? WHERE id = 1").bind(Date.now() + 60_000).run();
  assert.equal((await request(mf, "run_scan")).status, 429, "persisted cooldown blocks the next run");
  await scanDb.prepare("UPDATE scan_state SET not_before = 0 WHERE id = 1").run();
  await request(mf, "record_feedback", { id: scanId, verdict: "dismissed", reason: "Test suppression" });
  const suppressed = await (await request(mf, "run_scan")).json();
  assert.equal(suppressed.report, null); assert.equal(suppressed.reused, 1);
  assert.equal((await (await request(mf, "get_lead", { id: scanId })).json()).lead.status, "dismissed");
  await request(mf, "set_lead_status", { id: scanId, status: "new" });
  const fixture = JSON.parse(await readFile(new URL("../examples/graded-leads.json", import.meta.url), "utf8"));
  fixture[0].result.model = "failure-resume-fixture";
  await request(mf, "upsert_leads", { leads: fixture });
  await scanDb.prepare("CREATE TRIGGER test_report_failure BEFORE INSERT ON reports BEGIN SELECT RAISE(ABORT, 'isolated test failure'); END").run();
  assert.equal((await request(mf, "run_scan")).status, 502);
  const failures = await (await request(mf, "list_scan_runs")).json();
  assert(failures.runs.some(run => run.status === "failed" && run.summary.error));
  assert.equal((await scanDb.prepare("SELECT count(*) AS n FROM run_lock").first()).n, 0);
  assert.equal((await (await request(mf, "get_lead", { id: scanId })).json()).lead.result.model, "failure-resume-fixture");
  await scanDb.prepare("DROP TRIGGER test_report_failure").run();
  assert.equal((await request(mf, "run_scan")).status, 200, "retry preserves grades and completes the report");
  const historyBeforeRestart = await (await request(mf, "list_scan_runs")).json();
  await mf.dispose();
  mf = await createLocalCrm({ persist: join(directory, "scans"), token, port: 0, scanDemo: true });
  assert.deepEqual(await (await request(mf, "list_scan_runs")).json(), historyBeforeRestart);
  const resumed = await (await request(mf, "run_scan")).json();
  assert.equal(resumed.reused, 1); assert.equal(resumed.classified, 0);
  console.log("PASS: manual and scheduled fixture scans share local D1; report/grade reuse, auth, overlap protection, cooldown, suppression, failure recovery, and restart persistence.");


  legacy = new Miniflare(convertV4MiniflareOptions({ modules: true, script: "export default {fetch(){return new Response('migration fixture')}}", port: 0, host: "127.0.0.1", d1Databases: { DB: "legacy" }, resourcePersistencePath: join(directory, "legacy") }));
  const db = await legacy.getD1Database("DB");
  const original = await readFile(new URL("../migrations/0001_cloud.sql", import.meta.url), "utf8");
  await db.batch(original.split(";").map(s => s.trim()).filter(Boolean).map(s => db.prepare(s)));
  await db.prepare("CREATE TABLE d1_migrations (id INTEGER PRIMARY KEY, name TEXT UNIQUE, applied_at TEXT DEFAULT CURRENT_TIMESTAMP)").run();
  await db.prepare("INSERT INTO d1_migrations (name) VALUES ('0001_cloud.sql')").run();
  const post = JSON.stringify({ title: "Legacy post", body: "preserve me" });
  const grade = JSON.stringify({ model: "old-model", rubricVersion: "old-rubric", score: 3 });
  await db.prepare("INSERT INTO reports (id, body, submitted_at, message_id) VALUES ('old-report', 'original body', '2026-10-01T00:00:00Z', 'old-message')").run();
  await db.prepare("INSERT INTO leads (id, post, result, feedback, report_id, submitted_at, message_id) VALUES ('old-lead', ?, ?, 'original note', 'old-report', '2026-10-01T00:00:00Z', 'old-message')").bind(post, grade).run();
  await db.prepare("INSERT INTO inbox (id, payload) VALUES ('old-inbound', '{}')").run();
  await applyMigrations(db);
  await applyMigrations(db);
  const migrated = await db.prepare("SELECT * FROM leads WHERE id = 'old-lead'").first();
  assert.equal(migrated.post, post); assert.equal(migrated.result, grade); assert.equal(migrated.feedback, "original note");
  assert.equal((await db.prepare("SELECT body FROM reports WHERE id = 'old-report'").first()).body, "original body");
  assert.equal((await db.prepare("SELECT reason FROM feedback_history WHERE lead_id = 'old-lead'").first()).reason, "original note");
  assert.equal((await db.prepare("SELECT verdict FROM feedback_history WHERE lead_id = 'old-lead'").first()).verdict, "legacy");
  assert.equal((await db.prepare("SELECT item_index FROM report_items WHERE lead_id = 'old-lead'").first()).item_index, null);
  assert.equal((await db.prepare("SELECT message_id FROM notification_submissions WHERE report_id = 'old-report'").first()).message_id, "old-message");
  assert.equal((await db.prepare("SELECT count(*) AS n FROM inbox").first()).n, 1);
  assert.equal((await db.prepare("SELECT count(*) AS n FROM lead_revisions").first()).n, 1);
  console.log("PASS: additive migrations preserve existing grades, reports, feedback, inbox, and message links.");
} finally {
  await mf?.dispose(); await legacy?.dispose(); await rm(directory, { recursive: true, force: true });
}
