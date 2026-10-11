import { CrmClient } from "./crm-client.ts";
import { STATUSES, type FeedbackEvent, type FeedbackVerdict, type LeadStatus } from "./crm-types.ts";

export async function runCrmCli(argv: string[], client = new CrmClient()): Promise<unknown> {
  const [command, ...args] = argv;
  const usage = "Usage: crm run_scan | list_scan_runs | list_leads [status|all|alerts] [offset] [limit] | get_lead <id> | set_lead_status <id> <new|useful|dismissed|contacted> | record_feedback <id> <useful|dismissed|contacted> <reason> | upsert_leads <graded.json> | process_feedback <event.json>";
  switch (command) {
    case "run_scan":
      if (args.length) throw new Error(usage);
      return client.runScan();
    case "list_scan_runs":
      if (args.length) throw new Error(usage);
      return client.listScanRuns();
    case "list_leads":
      if (args.length > 3 || (args[0] && ![...STATUSES, "all", "alerts"].includes(args[0]))) throw new Error(usage);
      if (args.slice(1).some(arg => !/^\d+$/.test(arg))) throw new Error(usage);
      return client.listLeads({ ...(args[0] && STATUSES.includes(args[0] as LeadStatus) ? { status: args[0] as LeadStatus } : {}),
        ...(args[0] === "alerts" ? { alertsOnly: true } : {}), ...(args[1] ? { offset: Number(args[1]) } : {}), ...(args[2] ? { limit: Number(args[2]) } : {}) });
    case "get_lead":
      if (args.length !== 1) throw new Error(usage);
      return client.getLead(args[0]!);
    case "set_lead_status":
      if (args.length !== 2) throw new Error(usage);
      return client.setLeadStatus(args[0]!, args[1] as LeadStatus);
    case "record_feedback":
      if (args.length !== 3) throw new Error(usage);
      return client.recordFeedback(args[0]!, args[1] as FeedbackVerdict, args[2]!);
    case "upsert_leads":
      if (args.length !== 1) throw new Error(usage);
      return client.call("upsert_leads", { leads: await Bun.file(args[0]!).json() });
    case "process_feedback":
      if (args.length !== 1) throw new Error(usage);
      return client.processFeedback(await Bun.file(args[0]!).json() as FeedbackEvent);
    default: throw new Error(usage);
  }
}

if (import.meta.main) {
  try { console.log(JSON.stringify(await runCrmCli(process.argv.slice(2)), null, 2)); }
  catch (error) { console.error(error instanceof Error ? error.message : "CRM command failed."); process.exitCode = 1; }
}
