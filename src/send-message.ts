import { sendReport } from "./leads.ts";

// Usage: echo "text" | bun run send — texts the owner (OWNER_PHONE) through Photon and prints the message IDs.
const text = (await Bun.stdin.text()).trim();
if (!text || text.length > 4000) throw new Error("Pipe 1–4000 characters of message text on stdin.");
console.log(JSON.stringify(await sendReport(text)));
