> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# Interactive Messages

> Buttons, lists, product messages, and flows

Interactive messages let the recipient tap a button, pick from a list, or launch a WhatsApp Flow instead of typing a reply. Pass the result to `send` under the `interactive` key — the SDK ships with builders so you rarely construct the raw [InteractiveInput](/docs/reference/stable/whatsapp-business/symbols/interactiveinput) by hand.

```ts theme={null}
import { buttons, button } from "@photon-ai/whatsapp-business";

await client.messages.send({
  to: "+15551234567",
  interactive: buttons(
    "How would you like to continue?",
    button("confirm", "Confirm order"),
    button("cancel", "Cancel"),
  ),
});
```

## Reply buttons

Up to three buttons, each with an ID you'll receive back on tap:

```ts theme={null}
import { buttons, button } from "@photon-ai/whatsapp-business";

const msg = buttons(
  "Your package is ready for pickup. What now?",
  button("pickup_now", "Pick up now"),
  button("reschedule", "Reschedule"),
  button("hold", "Hold 3 days"),
);

await client.messages.send({ to, interactive: msg });
```

When the user taps, you'll receive an `interactive` event:

```ts theme={null}
for await (const event of client.events.subscribe()) {
  if (event.type !== "message") continue;
  if (event.message.content.type !== "interactive") continue;

  const { interactive } = event.message.content;
  if (interactive.type === "button_reply") {
    console.log(interactive.reply.id);    // "pickup_now"
    console.log(interactive.reply.title); // "Pick up now"
  }
}
```

## Lists

Lists support up to ten rows grouped into sections. The builder is immutable — chain `.section()` to add content:

```ts theme={null}
import { list } from "@photon-ai/whatsapp-business";

const menu = list("Pick a drink", "Open menu")
  .section("Hot", [
    { id: "coffee", title: "Coffee", description: "House blend" },
    { id: "tea", title: "Tea" },
  ])
  .section("Cold", [
    { id: "iced", title: "Iced coffee" },
    { id: "smoothie", title: "Smoothie" },
  ])
  .withHeader({ type: "text", text: "Menu" })
  .withFooter("Ships in 5 minutes");

await client.messages.send({ to, interactive: menu });
```

List taps arrive as `list_reply`:

```ts theme={null}
if (interactive.type === "list_reply") {
  console.log(interactive.reply.id);          // "coffee"
  console.log(interactive.reply.description); // "House blend"
}
```

## Product and product list

Single product — opens the catalog page:

```ts theme={null}
import { product } from "@photon-ai/whatsapp-business";

await client.messages.send({
  to,
  interactive: product("catalog-123", "SKU-456"),
});
```

Multi-product, grouped by category:

```ts theme={null}
import { productList } from "@photon-ai/whatsapp-business";

const catalog = productList("catalog-123", "Spring collection")
  .section("New arrivals", ["SKU-100", "SKU-101", "SKU-102"])
  .section("Back in stock", ["SKU-050", "SKU-051"])
  .withFooter("Free shipping on orders over $50");

await client.messages.send({ to, interactive: catalog });
```

Orders placed through a product message arrive as an `order` inbound content type — see [Events](/docs/advanced-kits/whatsapp/events).

## Flows

Launch a WhatsApp Flow (a structured form experience) with the `flow` helper:

```ts theme={null}
import { flow } from "@photon-ai/whatsapp-business";

await client.messages.send({
  to,
  interactive: flow({
    body: "Book an appointment",
    parameters: {
      flowId: "1234567890",
      flowToken: "your-flow-token",
      flowCta: "Book now",
      flowMessageVersion: "3",
      flowAction: "navigate",
      flowActionPayloadJson: JSON.stringify({ screen: "START" }),
    },
  }),
});
```

Flow submissions arrive as `nfm_reply`:

```ts theme={null}
if (interactive.type === "nfm_reply") {
  const data = JSON.parse(interactive.reply.responseJson);
  // handle the structured form response
}
```

## Building raw interactive messages

If you need a shape the builders don't cover, pass a plain [InteractiveInput](/docs/reference/stable/whatsapp-business/symbols/interactiveinput):

```ts theme={null}
await client.messages.send({
  to,
  interactive: {
    type: "button",
    body: "...",
    action: {
      buttons: [{ type: "reply", reply: { id: "a", title: "A" } }],
    },
  },
});
```

The builders are thin wrappers — they exist to catch typos and make common shapes ergonomic, not to restrict what you can send.


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.