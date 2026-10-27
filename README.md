# Puzzle #32 — AEO `/ai.txt` endpoint serving site content as Markdown

Brief (Task Forge puzzle tracker): AEO `/ai.txt` endpoint serving site content as Markdown — none/generic.

A small 3-page Cloudflare Worker site ("Forge Studio," continuing the brand
used in puzzle #30) where `/ai.txt` and the human-facing HTML pages render
from **one single source of truth** (`content/pages.js`) — there's no
separately hand-written "AI summary" that could silently drift out of sync
with the real page content, which is the actual point of an AEO/`llms.txt`
-style endpoint.

- `GET /`, `/about`, `/services` — real Markdown (headings, lists, links)
  rendered to HTML via `marked`.
- `GET /ai.txt` — the exact same markdown strings, concatenated with a short
  llms.txt-style header, served as `text/markdown`.
- `GET /sitemap.xml`, `GET /robots.txt` — generated from the same `pages`
  array, added so this site could genuinely be submitted to Google Search
  Console (see below — that's puzzle #33 in the same tracker).

## Verified, not assumed

1. Ran the Worker locally (`wrangler dev`) and curled all routes — correct
   200s, correct `Content-Type: text/markdown` on `/ai.txt`, correct 404 on
   an unknown path.
2. **Programmatic proof of the single-source-of-truth claim**: a short Node
   script imports `content/pages.js` directly, fetches the live `/ai.txt`
   response, and asserts `aitxt.includes(page.markdown)` for every page —
   confirms `/ai.txt` contains byte-exact copies of the same markdown used
   to render each HTML page, not just similar-looking duplicated text.
   ```
   PASS - /ai.txt contains exact markdown for page "/"
   PASS - /ai.txt contains exact markdown for page "about"
   PASS - /ai.txt contains exact markdown for page "services"
   ALL EXACT-MATCH
   ```
3. Repeated the content-type and route checks against the live production
   deploy (not just local dev), and visually confirmed the rendered
   homepage via claude-in-chrome.

## Added to Google Search Console (puzzle #33)

Using the existing `aiology7914@gmail.com` GSC account (already set up for a
different property per prior session memory), added this site as a real new
URL-prefix property:
1. **Ownership verified live** via the HTML-tag method — added the exact
   `<meta name="google-site-verification" ...>` tag GSC generated into the
   Worker's `<head>`, redeployed, confirmed the tag was actually live via
   `curl` before clicking Verify in the GSC UI. Result: "Ownership verified."
2. **Sitemap submitted**: `/sitemap.xml` (generated from the same `pages`
   source, so it can't drift from the real routes) submitted via the GSC
   Sitemaps page — "Sitemap submitted successfully." Status shows "Couldn't
   fetch" initially, which is expected until Google's next crawl pass (same
   behavior seen on a prior real GSC setup for a different site, not a bug).

Live: https://puzzle-32-ai-txt-aeo.krikormher.workers.dev
AI-readable version: https://puzzle-32-ai-txt-aeo.krikormher.workers.dev/ai.txt
Sitemap: https://puzzle-32-ai-txt-aeo.krikormher.workers.dev/sitemap.xml
