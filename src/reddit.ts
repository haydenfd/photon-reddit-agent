import { parsePosts, type LeadPost } from "./jev.ts";

export class ScanError extends Error {
  constructor(message: string, public status = 502, public retryAt?: number) { super(message); }
}
export type RedditConfig = { REDDIT_CLIENT_ID?: string; REDDIT_CLIENT_SECRET?: string; REDDIT_USER_AGENT?: string };
export type RedditPage = { posts: LeadPost[]; moreAvailable: boolean; notBefore: number };
export const SCAN_LIMIT = 5;

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new ScanError("Reddit returned malformed data.");
  return value as Record<string, unknown>;
}

export function parseRedditListing(raw: unknown, subreddit: string): Omit<RedditPage, "notBefore"> {
  const data = record(record(raw).data);
  if (!Array.isArray(data.children) || data.children.length > SCAN_LIMIT) throw new ScanError("Reddit returned an invalid listing size.");
  const posts = data.children.map(child => {
    const item = record(child), post = record(item.data);
    if (item.kind !== "t3" || typeof post.permalink !== "string" ||
      !new RegExp(`^/r/${subreddit}/comments/[a-z0-9]+/[^/?#]+/?$`, "i").test(post.permalink) ||
      typeof post.subreddit !== "string" || post.subreddit.toLowerCase() !== subreddit.toLowerCase()) throw new ScanError("Reddit returned an invalid post reference.");
    try {
      return parsePosts([{ title: post.title, body: post.selftext, url: `https://www.reddit.com${post.permalink}`, subreddit: post.subreddit }])[0]!;
    } catch { throw new ScanError("Reddit returned an invalid post."); }
  });
  return { posts, moreAvailable: data.after != null };
}

function retryAt(response: Response) {
  const value = response.headers.get("Retry-After");
  const seconds = value && /^\d+(?:\.\d+)?$/.test(value) ? Number(value) : value ? (Date.parse(value) - Date.now()) / 1000 : 60;
  return Date.now() + Math.min(86_400, Math.max(1, Number.isFinite(seconds) ? seconds : 60)) * 1000;
}

async function jsonResponse(response: Response, label: string): Promise<unknown> {
  if (response.status === 429) throw new ScanError(`${label} rate limited; retry after the saved cooldown.`, 429, retryAt(response));
  if (!response.ok) throw new ScanError(`${label} failed: HTTP ${response.status}.`);
  // Bound upstream data as well as caller requests; never follow URLs supplied by posts.
  const reader = response.body?.getReader();
  if (!reader) throw new ScanError(`${label} returned an empty response.`);
  let size = 0; const chunks: Uint8Array[] = [];
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 500_000) { await reader.cancel(); throw new ScanError(`${label} response exceeded 500 KB.`); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new ScanError(`${label} returned invalid JSON.`); }
}

export async function fetchRedditPosts(subreddit: string, config: RedditConfig, transport: (url: string, init: RequestInit) => Promise<Response> = fetch): Promise<RedditPage> {
  if (!/^[A-Za-z0-9_]{2,21}$/.test(subreddit)) throw new ScanError("Invalid subreddit configuration.", 503);
  const { REDDIT_CLIENT_ID: id, REDDIT_CLIENT_SECRET: secret, REDDIT_USER_AGENT: agent } = config;
  if (!id || !secret || !agent) throw new ScanError("Configure REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, and REDDIT_USER_AGENT before live scans.", 503);
  if (!/^[\x21-\x7e]+$/.test(id) || id.includes(":") || !/^[\x21-\x7e]+$/.test(secret) || agent.length > 200 || /[\r\n]/.test(agent)) throw new ScanError("Invalid Reddit credential/user-agent configuration.", 503);
  const tokenResponse = await transport("https://www.reddit.com/api/v1/access_token", {
    method: "POST", redirect: "error", signal: AbortSignal.timeout(20_000),
    headers: { Authorization: `Basic ${btoa(`${id}:${secret}`)}`, "User-Agent": agent, "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=client_credentials",
  });
  const token = record(await jsonResponse(tokenResponse, "Reddit OAuth"));
  if (typeof token.access_token !== "string" || !token.access_token || token.access_token.length > 2000 ||
    typeof token.token_type !== "string" || token.token_type.toLowerCase() !== "bearer") throw new ScanError("Reddit OAuth returned an invalid access token.");
  const response = await transport(`https://oauth.reddit.com/r/${subreddit}/new?limit=${SCAN_LIMIT}&raw_json=1`, {
    redirect: "error", signal: AbortSignal.timeout(20_000), headers: { Authorization: `Bearer ${token.access_token}`, "User-Agent": agent },
  });
  // shortcut: read only the latest five posts per poll; add pagination before monitoring busy communities.
  const listing = parseRedditListing(await jsonResponse(response, "Reddit listing"), subreddit);
  const remaining = response.headers.get("x-ratelimit-remaining"), reset = Number(response.headers.get("x-ratelimit-reset"));
  const notBefore = remaining !== null && Number(remaining) <= 0 ? Date.now() + Math.min(86_400, Math.max(1, reset || 60)) * 1000 : 0;
  return { ...listing, notBefore };
}
