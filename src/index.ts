import { Spectrum } from "spectrum-ts";
import { imessage } from "@spectrum-ts/imessage";
import { CrmClient, CrmError } from "./crm-client.ts";
import { handleMessage } from "./message-handler.ts";

// Local CRM work never opens a Photon connection. Live messaging requires explicit opt-in.
if (process.env.NOTIFY_ENABLED !== "true") throw new Error("Messaging disabled. Use bun run crm:dev locally; configure NOTIFY_ENABLED=true only for live messaging.");
const owner = process.env.OWNER_PHONE;
if (!owner || !/^\+[1-9]\d{7,14}$/.test(owner)) throw new Error("Set OWNER_PHONE to authorize feedback from your personal number.");
const crm = new CrmClient();
if (!(await crm.getConfig()).notificationsEnabled) throw new Error("CRM notifications are disabled; no Photon connection opened.");
const app = await Spectrum({ projectId: process.env.SPECTRUM_PROJECT_ID!, projectSecret: process.env.SPECTRUM_PROJECT_SECRET!, providers: [imessage.config()] });
console.log("Photon connected. Owner feedback commands are enabled.");

try {
  for await (const [space, message] of app.messages) {
    try {
      await handleMessage(space, message, crm, owner);
    } catch (error) {
      console.error(error instanceof CrmError ? error.message : "Feedback processing failed; no acknowledgement sent.");
    }
  }
} finally { await app.stop(); }
