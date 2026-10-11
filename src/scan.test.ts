import { expect, test } from "bun:test";
import { fetchRedditPosts, parseRedditListing, ScanError } from "./reddit.ts";
import { scanConfig, type ScanEnv } from "./scan.ts";

const config = { REDDIT_CLIENT_ID: "isolated-client", REDDIT_CLIENT_SECRET: "isolated-secret", REDDIT_USER_AGENT: "photon-test/1.0" };
const listing = { data: { after: "t3_older", children: [{ kind: "t3", data: { title: "Mock practice?", selftext: "Interview soon", subreddit: "demo", permalink: "/r/demo/comments/abc/practice/" } }] } };

test("Reddit listing validation preserves source text and rejects malformed/cross-community references", () => {
  expect(parseRedditListing(listing, "demo")).toEqual({ moreAvailable: true, posts: [{ title: "Mock practice?", body: "Interview soon", subreddit: "demo", url: "https://www.reddit.com/r/demo/comments/abc/practice/" }] });
  expect(parseRedditListing({ data: { children: [], after: null } }, "demo").posts).toHaveLength(0);
  for (const change of [{ permalink: "https://evil.example/" }, { permalink: "/r/other/comments/abc/title/" }, { subreddit: "other" }, { selftext: null }, { title: "" }]) {
    expect(() => parseRedditListing({ data: { children: [{ kind: "t3", data: { ...listing.data.children[0]!.data, ...change } }] } }, "demo")).toThrow();
  }
  expect(() => parseRedditListing({ data: { children: Array(6).fill(listing.data.children[0]) } }, "demo")).toThrow("listing size");
});

test("app-only OAuth sends credentials only to Reddit and requests a bounded read-only listing", async () => {
  let calls = 0;
  const page = await fetchRedditPosts("demo", config, async (input, init) => {
    calls++;
    expect(init!.redirect).toBe("error"); expect(init!.signal).toBeDefined();
    const headers = new Headers(init!.headers);
    expect(headers.get("User-Agent")).toBe(config.REDDIT_USER_AGENT);
    if (calls === 1) {
      expect(input).toBe("https://www.reddit.com/api/v1/access_token");
      expect(init!.method).toBe("POST"); expect(init!.body).toBe("grant_type=client_credentials");
      expect(headers.get("Authorization")).toBe(`Basic ${btoa("isolated-client:isolated-secret")}`);
      return Response.json({ access_token: "isolated-access-token", token_type: "bearer" });
    }
    expect(input).toBe("https://oauth.reddit.com/r/demo/new?limit=5&raw_json=1");
    expect(headers.get("Authorization")).toBe("Bearer isolated-access-token");
    return Response.json(listing, { headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "120" } });
  });
  expect(calls).toBe(2); expect(page.posts).toHaveLength(1);
  expect(page.notBefore).toBeGreaterThan(Date.now() + 119_000);
});

test("OAuth failures and rate limits stop requests without echoing provider response bodies", async () => {
  let calls = 0;
  try {
    await fetchRedditPosts("demo", config, async () => { calls++; return new Response("provider-secret", { status: 429, headers: { "Retry-After": "120" } }); });
    throw new Error("Expected rate limit");
  } catch (error) {
    expect(error).toBeInstanceOf(ScanError);
    expect((error as ScanError).retryAt).toBeGreaterThan(Date.now() + 119_000);
    expect((error as Error).message).not.toContain("provider-secret");
  }
  expect(calls).toBe(1);
  await expect(fetchRedditPosts("demo", config, async () => new Response("provider-secret", { status: 401 }))).rejects.toThrow("HTTP 401");
  await expect(fetchRedditPosts("demo", config, async () => Response.json({ access_token: "x" }))).rejects.toThrow("invalid access token");
  await expect(fetchRedditPosts("demo", config, async () => new Response("x".repeat(500_001)))).rejects.toThrow("500 KB");
  await expect(fetchRedditPosts("../secret", config, async () => { throw new Error("must not call"); })).rejects.toThrow("Invalid subreddit");
});

test("scans default off; configuration requires a bounded watchlist and explicit source credentials", () => {
  const env = { SCAN_ENABLED: "true", SCAN_SOURCE: "fixture", SCAN_SUBREDDITS: "demo", SCAN_FIXTURE_JSON: "[]" } as ScanEnv;
  expect(() => scanConfig({} as ScanEnv)).toThrow("disabled");
  expect(scanConfig(env)).toEqual({ source: "fixture", subreddits: ["demo"] });
  for (const subreddits of ["", "../demo", "demo,DEMO", "aa,bb,cc,dd,ee,ff"]) expect(() => scanConfig({ ...env, SCAN_SUBREDDITS: subreddits })).toThrow();
  expect(() => scanConfig({ ...env, SCAN_SOURCE: "reddit" })).toThrow("OAuth");
  expect(() => scanConfig({ ...env, SCAN_SOURCE: "scrape" })).toThrow("SCAN_SOURCE");
});
