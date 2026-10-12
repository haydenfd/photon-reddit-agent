> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Contacts

> Share contact cards from structured data, users, or vCards.

Use `contact()` to share contact cards. The builder takes either a structured [ContactInput](/docs/reference/stable/spectrum-ts/symbols/contactinput), a vCard string, a `vcf` instance, or a known [User](/docs/reference/stable/spectrum-ts/symbols/user) paired with optional [ContactDetails](/docs/reference/stable/spectrum-ts/symbols/contactdetails).

<Tabs>
  <Tab title="Structured">
    ```ts theme={null}
    import { contact } from "spectrum-ts";

    await space.send(contact({
      name: { first: "Ada", last: "Lovelace" },
      phones: [{ value: "+15551234567", type: "mobile" }],
      emails: [{ value: "ada@example.com", type: "work" }],
    }));
    ```
  </Tab>

  <Tab title="From a User">
    ```ts theme={null}
    import { contact } from "spectrum-ts";

    // Attach extra details on top of an existing platform user
    await space.send(contact(alice, {
      name: { first: "Alice", last: "Anderson" },
      org: { name: "Acme", title: "Engineer" },
    }));
    ```
  </Tab>

  <Tab title="From vCard">
    ```ts theme={null}
    import { contact, fromVCard } from "spectrum-ts";

    const vcf = await readFile("/path/to/ada.vcf", "utf8");
    await space.send(contact(vcf));

    // Or parse first if you want to inspect/edit the fields
    const parsed = fromVCard(vcf);
    await space.send(contact({ ...parsed, note: "Met at conference" }));
    ```
  </Tab>
</Tabs>

`fromVCard(vcf)` parses a vCard string into a [ContactInput](/docs/reference/stable/spectrum-ts/symbols/contactinput). `toVCard(contact)` serializes a resolved [Contact](/docs/reference/stable/spectrum-ts/symbols/contact) back to vCard.

<Accordion title="ContactInput">
  [User reference](/docs/reference/stable/spectrum-ts/symbols/user)
</Accordion>


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.