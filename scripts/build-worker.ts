import { mkdir } from "node:fs/promises";
await mkdir(".wrangler", { recursive: true });
const result = await Bun.build({ entrypoints: ["src/worker.ts"], outdir: ".wrangler", naming: "crm-worker.js", target: "node", minify: false });
if (!result.success) { console.error(result.logs); process.exit(1); }
