import { marked } from 'marked'
import { site, pages } from '../content/pages.js'

function shell(page) {
  const body = marked.parse(page.markdown)
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="google-site-verification" content="3WySbktGFDQqDuLxzos0wywIQHs_W40K1z6Vr1tILqI" />
  <link rel="alternate" type="text/markdown" href="/ai.txt" title="AI-readable site content">
  <style>
    body{font-family:system-ui,sans-serif;max-width:680px;margin:4rem auto;padding:0 1.5rem;line-height:1.6;color:#1a1a2e}
    h1{font-size:2.2rem} h2{font-size:1.4rem;margin-top:2rem}
    a{color:#6b4fd8} footer{margin-top:3rem;font-size:0.85rem;color:#888}
  </style>
</head>
<body>
  ${body}
  <footer>Machine-readable version of this entire site: <a href="/ai.txt">/ai.txt</a></footer>
</body>
</html>`
}

// The actual AEO endpoint: concatenates the SAME markdown strings used to
// render the HTML pages above, with a short header explaining the format
// (loosely following the emerging llms.txt convention: title, summary line,
// then full section content per page) -- not a hand-written separate
// summary that could drift from the real pages.
function renderAiTxt() {
  const header = `# ${site.name}

> ${site.tagline}. Machine-readable summary of this entire site for AI
> crawlers, answer engines, and LLM-based assistants. Every section below is
> the exact same source Markdown used to render the corresponding HTML page
> at the given path -- nothing here is a separate, hand-maintained summary.

`
  const sections = pages
    .map((p) => {
      const path = p.slug ? `/${p.slug}` : '/'
      return `---\n\n## Page: ${path}\n\n${p.markdown}\n`
    })
    .join('\n')
  return header + sections
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const path = url.pathname.replace(/\/$/, '')

    if (path === '/ai.txt') {
      return new Response(renderAiTxt(), {
        headers: { 'content-type': 'text/markdown; charset=utf-8' },
      })
    }

    if (path === '/sitemap.xml') {
      // Generated from the same `pages` source as everything else --
      // submitted to Google Search Console as part of this puzzle (#33 in
      // the tracker: "add website to Search Console").
      const urls = pages
        .map((p) => `  <url><loc>${site.baseUrl}/${p.slug}</loc></url>`)
        .join('\n')
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`
      return new Response(xml, { headers: { 'content-type': 'application/xml; charset=utf-8' } })
    }

    if (path === '/robots.txt') {
      return new Response(`User-agent: *\nAllow: /\nSitemap: ${site.baseUrl}/sitemap.xml\n`, {
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    }

    const slug = path.replace(/^\//, '')
    const page = pages.find((p) => p.slug === slug)
    if (!page) {
      return new Response('Not found', { status: 404 })
    }
    return new Response(shell(page), {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    })
  },
}
