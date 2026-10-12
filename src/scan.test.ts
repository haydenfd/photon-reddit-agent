import { expect, test } from "bun:test";
import { fetchRedditPosts, parseRedditFeed, ScanError } from "./reddit.ts";
import { scanConfig, type ScanEnv } from "./scan.ts";

const entry = (sub: string, id: string) => `<entry><category term="${sub}" label="r/${sub}"/><content type="html">&lt;!-- SC_OFF --&gt;&lt;div class=&quot;md&quot;&gt;&lt;p&gt;Interview &amp;amp; mock soon&lt;/p&gt;&lt;/div&gt;&lt;!-- SC_ON --&gt; submitted by &lt;a href=&quot;https://www.reddit.com/user/x&quot;&gt; /u/x &lt;/a&gt; [link] [comments]</content><link href="https://www.reddit.com/r/${sub}/comments/${id}/practice/" /><title>Mock practice &amp; tips?</title></entry>`;
const feed = `<feed>${entry("demo", "abc")}${entry("other", "def")}</feed>`;

test("RSS feed parsing keeps title/plain body/link and drops posts outside the watchlist", () => {
  expect(parseRedditFeed(feed, ["demo"])).toEqual([{ title: "Mock practice & tips?", body: "Interview & mock soon", subreddit: "demo", url: "https://www.reddit.com/r/demo/comments/abc/practice/" }]);
  expect(parseRedditFeed("<feed></feed>", ["demo"])).toHaveLength(0);
  expect(parseRedditFeed(feed.replace("https://www.reddit.com/r/demo", "https://evil.example/r/demo"), ["demo"])).toHaveLength(0);
});

test("one keyless request reads the whole watchlist", async () => {
  let calls = 0;
  const page = await fetchRedditPosts(["demo", "other"], {}, async (input, init) => {
    calls++;
    expect(input).toBe("https://www.reddit.com/r/demo+other/new/.rss?limit=100");
    expect(init!.redirect).toBe("manual"); expect(init!.signal).toBeDefined();
    expect(new Headers(init!.headers).has("Authorization")).toBe(false);
    return new Response(feed, { headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "120" } });
  });
  expect(calls).toBe(1); expect(page.posts).toHaveLength(2);
  expect(page.notBefore).toBeGreaterThan(Date.now() + 119_000);
});

test("rate limits and failures stop without echoing provider bodies", async () => {
  try {
    await fetchRedditPosts(["demo"], {}, async () => new Response("provider-secret", { status: 429, headers: { "x-ratelimit-reset": "34" } }));
    throw new Error("Expected rate limit");
  } catch (error) {
    expect(error).toBeInstanceOf(ScanError);
    expect((error as ScanError).retryAt).toBeGreaterThan(Date.now() + 33_000);
    expect((error as Error).message).not.toContain("provider-secret");
  }
  let calls = 0;
  await expect(fetchRedditPosts(["demo"], {}, async () => { calls++; return new Response("provider-secret", { status: 403 }); }, [0, 0])).rejects.toThrow("HTTP 403");
  expect(calls).toBe(3);
  calls = 0;
  await fetchRedditPosts(["demo"], {}, async () => { calls++; return new Response("", { status: 429 }); }, [0, 0]).catch(() => {});
  expect(calls).toBe(1);
});

test("transient Reddit failures are retried before the run fails", async () => {
  const replies = [() => { throw new TypeError("network"); }, () => new Response("", { status: 503 }), () => new Response("<feed></feed>")];
  let calls = 0;
  const page = await fetchRedditPosts(["demo"], {}, async () => replies[calls++]!(), [0, 0]);
  expect(calls).toBe(3);
  expect(page.posts).toEqual([]);
  await expect(fetchRedditPosts(["demo"], {}, async () => new Response("x".repeat(2_000_001)))).rejects.toThrow("2 MB");
  await expect(fetchRedditPosts(["../secret"], {}, async () => { throw new Error("must not call"); })).rejects.toThrow("Invalid subreddit");
});

test("scans default off; configuration requires a bounded watchlist and explicit source credentials", () => {
  const env = { SCAN_ENABLED: "true", SCAN_SOURCE: "fixture", SCAN_SUBREDDITS: "demo", SCAN_FIXTURE_JSON: "[]" } as ScanEnv;
  expect(() => scanConfig({} as ScanEnv)).toThrow("disabled");
  expect(scanConfig(env)).toEqual({ source: "fixture", subreddits: ["demo"] });
  for (const subreddits of ["", "../demo", "demo,DEMO", "aa,bb,cc,dd,ee,ff"]) expect(() => scanConfig({ ...env, SCAN_SUBREDDITS: subreddits })).toThrow();
  expect(() => scanConfig({ ...env, SCAN_SOURCE: "reddit" })).toThrow("JEV_API_KEY");
  expect(() => scanConfig({ ...env, SCAN_SOURCE: "scrape" })).toThrow("SCAN_SOURCE");
});
