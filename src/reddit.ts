import { retrying } from "./retry.ts";
import { parsePosts, type LeadPost } from "./jev.ts";

export class ScanError extends Error {
  constructor(message: string, public status = 502, public retryAt?: number) { super(message); }
}
export type RedditConfig = { REDDIT_USER_AGENT?: string };
export type RedditPage = { posts: LeadPost[]; notBefore: number };
export const FEED_LIMIT = 100;

function decode(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|#39);/gi, (_, code: string) =>
    code[0] === "#" ? String.fromCodePoint(Number(code[1]!.toLowerCase() === "x" ? `0${code.slice(1)}` : code.slice(1)))
      : ({ amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'" } as Record<string, string>)[code.toLowerCase()]!);
}

// Reddit's public Atom feed: no API key. Content is escaped HTML ending in a "submitted by … [link] [comments]" footer.
export function parseRedditFeed(xml: string, subreddits: string[]): LeadPost[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  if (entries.length > FEED_LIMIT) throw new ScanError("Reddit returned an invalid feed size.");
  return entries.flatMap(entry => {
    const title = decode(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
    const url = decode(entry.match(/<link href="([^"]+)"/)?.[1] ?? "");
    const subreddit = entry.match(/<category term="([^"]+)"/)?.[1] ?? "";
    const html = decode(entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1] ?? "");
    const body = decode(html.replace(/<!-- SC_OFF -->|<!-- SC_ON -->/g, "").replace(/submitted by[\s\S]*$/, "").replace(/<[^>]+>/g, " "))
      .replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
    if (!subreddits.includes(subreddit.toLowerCase())) return []; // skip anything outside the watchlist
    try { return parsePosts([{ title, body, url, subreddit }]); } catch { return []; }
  });
}

function retryAt(response: Response) {
  const value = response.headers.get("Retry-After") ?? response.headers.get("x-ratelimit-reset");
  const seconds = value && /^\d+(?:\.\d+)?$/.test(value) ? Number(value) : 60;
  return Date.now() + Math.min(86_400, Math.max(1, seconds)) * 1000;
}

// A 403 is Reddit blocking one Cloudflare egress IP, so it is retried like a 5xx; a 429 is not (the saved cooldown handles it).
export async function fetchRedditPosts(subreddits: string[], config: RedditConfig, transport: (url: string, init: RequestInit) => Promise<Response> = fetch, delays = [1_000, 4_000]): Promise<RedditPage> {
  if (!subreddits.length || subreddits.some(s => !/^[A-Za-z0-9_]{2,21}$/.test(s))) throw new ScanError("Invalid subreddit configuration.", 503);
  const agent = config.REDDIT_USER_AGENT || "web:photon-reddit-agent:0.1";
  const response = await retrying(transport, { statuses: [403, 500, 502, 503, 504], delays })(`https://www.reddit.com/r/${subreddits.join("+")}/new/.rss?limit=${FEED_LIMIT}`, {
    redirect: "manual", headers: { "User-Agent": agent },
  });
  if (response.status === 429) throw new ScanError("Reddit rate limited; retry after the saved cooldown.", 429, retryAt(response));
  if (!response.ok) throw new ScanError(`Reddit feed failed: HTTP ${response.status}.`);
  const reader = response.body?.getReader();
  if (!reader) throw new ScanError("Reddit feed returned an empty response.");
  let size = 0, xml = ""; const text = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 2_000_000) { await reader.cancel(); throw new ScanError("Reddit feed exceeded 2 MB."); }
    xml += text.decode(value, { stream: true });
  }
  const remaining = response.headers.get("x-ratelimit-remaining");
  return { posts: parseRedditFeed(xml, subreddits), notBefore: remaining !== null && Number(remaining) <= 0 ? retryAt(response) : 0 };
}
