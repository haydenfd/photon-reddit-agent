#!/usr/bin/env bash
# Mirror Maritime and Photon (Stable) docs as Markdown into docs/vendor/. Re-run to refresh.
set -euo pipefail
out="$(cd "$(dirname "$0")/.." && pwd)/docs/vendor"
rm -rf "$out" && mkdir -p "$out/maritime" "$out/photon"

fetch() { # url dest
  mkdir -p "$(dirname "$2")"
  curl -sfL --retry 2 "$1" -o "$2" || echo "failed: $1" >&2
}
export -f fetch

# Maritime: every page listed in llms.txt, as .md, plus the full dump and OpenAPI spec.
fetch https://maritime.sh/llms.txt "$out/maritime/llms.txt"
fetch https://maritime.sh/llms-full.txt "$out/maritime/llms-full.txt"
fetch https://api.maritime.sh/openapi.json "$out/maritime/openapi.json"
grep -oE 'https://maritime\.sh/[^) ]+' "$out/maritime/llms.txt" | sort -u | while read -r url; do
  path="${url#https://maritime.sh/}"; path="${path%.md}"; path="${path%.txt}"
  case "$url" in *.md|*.txt) src="$url" ;; *) src="$url.md" ;; esac
  echo "$src $out/maritime/${path:-index}.md"
done | xargs -P 8 -n 2 bash -c 'fetch "$0" "$1"'

# Photon: every Stable page in the sitemap (Beta skipped), as .md, plus the full dump.
fetch https://photon.codes/docs/llms.txt "$out/photon/llms.txt"
fetch https://photon.codes/docs/llms-full.txt "$out/photon/llms-full.txt"
curl -sfL https://photon.codes/docs/sitemap.xml | grep -oE '<loc>[^<]+' | sed 's/<loc>//' | grep -v '/beta' |
  while read -r url; do
    path="${url#*://*/docs/}"
    echo "https://photon.codes/docs/$path.md $out/photon/${path:-index}.md"
  done | xargs -P 8 -n 2 bash -c 'fetch "$0" "$1"'

echo "maritime: $(find "$out/maritime" -type f | wc -l) files, photon: $(find "$out/photon" -type f | wc -l) files"
