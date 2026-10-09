import { expect, mock, test } from "bun:test";

test("echoes inbound text once and ignores outgoing messages and attachments", async () => {
  const send = mock(async (_text: string) => {});
  mock.module("spectrum-ts", () => ({
    Spectrum: async () => ({
      messages: (async function* () {
        for (const message of [
          { direction: "inbound", content: { type: "text", text: "hello" } },
          { direction: "outbound", content: { type: "text", text: "echo: hello" } },
          { direction: "inbound", content: { type: "attachment" } },
        ]) {
          yield [{ send }, message];
        }
      })(),
    }),
  }));
  mock.module("@spectrum-ts/imessage", () => ({
    imessage: { config: () => ({}) },
  }));

  await import("./index.ts");

  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith("echo: hello");
});
