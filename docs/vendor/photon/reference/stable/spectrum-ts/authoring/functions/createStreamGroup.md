> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# createStreamGroup

```typescript
createStreamGroup(options?: StreamGroupOptions): StreamGroup<T>
```

A merged stream whose membership can change while it runs.

Sibling of `mergeStreams`, with a deliberately different lifetime contract —
pick by whether the source set is fixed:

* `mergeStreams` merges a *fixed* set. Its result represents all of them:
  it ends when they have all ended (immediately, for an empty set) and one
  member's error ends the whole merge.
* `createStreamGroup` owns a *mutable* set. It ends only via `close()` —
  zero members parks the consumer rather than ending it, so a set that is
  briefly empty mid-reconcile does not terminate the stream — and a member
  that fails is logged and dropped while its siblings keep running.

Dropping a faulted member (rather than restarting it here) keeps retry policy
with the caller that knows the real inventory: `keys()` stops reporting it, so
the caller's next reconcile re-adds it through `add`.

## Parameters

<ResponseField name={"options"} type={"StreamGroupOptions"} typeHref={"/reference/stable/spectrum-ts/authoring/interfaces/StreamGroupOptions"} />

## Returns

<code>[StreamGroup](/docs/reference/stable/spectrum-ts/authoring/interfaces/StreamGroup){"<T>"}</code>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.