import { Database } from "bun:sqlite";
import { CrmClient } from "./crm-client.ts";
import { existsSync } from "node:fs";

export async function importSqlite(filename: string, client = new CrmClient()) {
  if (!existsSync(filename)) throw new Error(`SQLite source not found: ${filename}. Existing D1 records are unchanged.`);
  const db = new Database(filename, { readonly: true });
  try {
    const rows = db.query<{ id: string; post: string; result: string; submitted_at: string | null; message_id: string | null }, []>("SELECT id, post, result, submitted_at, message_id FROM leads ORDER BY id").all();
    for (let offset = 0; offset < rows.length; offset += 10) {
      await client.call("import_legacy", { leads: rows.slice(offset, offset + 10).map(row => ({ id: row.id, post: JSON.parse(row.post), result: JSON.parse(row.result), submittedAt: row.submitted_at, messageId: row.message_id })) });
    }
    return { imported: rows.length, source: filename, ownership: "D1 is authoritative. SQLite was opened read-only; repeat imports never overwrite CRM rows." };
  } finally { db.close(); }
}

if (import.meta.main) {
  try {
    if (process.argv.length !== 3) throw new Error("Usage: bun --no-env-file src/import-sqlite.ts data/leads.sqlite");
    console.log(JSON.stringify(await importSqlite(process.argv[2]!), null, 2));
  } catch (error) { console.error(error instanceof Error ? error.message : "Import failed."); process.exitCode = 1; }
}
