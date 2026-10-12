> ## Documentation Index
> Fetch the complete documentation index at: https://docs.photon.codes/docs/llms.txt
> Use this file to discover all available pages before exploring further.

> ## Agent Instructions
> Use Stable documentation by default. Honor an explicit Beta request or a URL under /docs/beta/. If the requested version conflicts with the installed CLI package or API origin, clarify the target before writing integration code.
> Pages under /docs/beta/ document Beta; other product pages document Stable. Keep the CLI package, commands, API origin, and credentials within the selected version. State the documentation version in your answer.
> For MCP search, always pass version: Stable or version: Beta. Unfiltered search mixes both versions. For filesystem reads, keep Beta queries under /beta/ and exclude /beta/ from Stable queries; discover paths before reading them.
> The public docs base is https://photon.codes/docs. Convert MCP page paths to public URLs under that base, preserving /beta/ when present. Read https://photon.codes/docs/skill.md for version selection and https://photon.codes/docs/llms.txt for the version indexes.

# heif2jpeg

> Fast and simple HEIC/HEIF to JPEG converter for Node.js

Fast and simple HEIC/HEIF to JPEG converter for Node.js. Native performance, zero runtime dependencies.

Built with node-api.

## Install

<CodeGroup>
  ```bash npm theme={null}
  npm install heif2jpeg
  ```

  ```bash pnpm theme={null}
  pnpm add heif2jpeg
  ```

  ```bash yarn theme={null}
  yarn add heif2jpeg
  ```

  ```bash bun theme={null}
  bun add heif2jpeg
  ```
</CodeGroup>

Prebuilt binaries are provided for:

| Platform | Architecture |
| - | - |
| macOS | x64, arm64 |
| Linux (glibc) | x64, arm64 |
| Linux (musl) | x64, arm64 |
| Windows | x64, arm64 |

Works with Node.js, Bun, and Deno.

## Usage

```js theme={null}
const { heifToJpeg } = require("heif2jpeg");
const fs = require("fs");

const heic = fs.readFileSync("photo.heic");
const jpeg = await heifToJpeg(heic, { quality: 85 });
fs.writeFileSync("photo.jpg", jpeg);
```

## API

### `heifToJpeg(input, options?)`

Convert a HEIF/HEIC buffer to JPEG.

* **input** `Buffer`: HEIF/HEIC file contents
* **options.quality** `number`: JPEG quality, 1-100 (default: 85)
* Returns `Promise<Buffer>`: JPEG file contents

## How it works

All processing runs on the libuv thread pool - the main thread is never blocked.

1. [libheif](https://github.com/strukturag/libheif) parses the HEIF container
2. [libde265](https://github.com/strukturag/libde265) decodes the HEVC payload to raw RGB pixels
3. [jpeg-encoder](https://crates.io/crates/jpeg-encoder) (pure Rust) encodes to JPEG

## Building from source

Requires Rust, CMake, and a C/C++ compiler.

```bash theme={null}
git clone --recurse-submodules https://github.com/photon-hq/heif2jpeg.git
cd heif2jpeg
npm install
npx napi build --platform --release
npm test
```

## License

MIT


This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.