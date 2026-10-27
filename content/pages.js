// Single source of truth: every page's real content lives here as Markdown.
// Both the human-facing HTML routes AND /ai.txt render from this exact same
// array — there is no separately hand-maintained "AI summary" that could
// drift out of sync with the actual site content.

export const site = {
  name: 'Forge Studio',
  baseUrl: 'https://puzzle-32-ai-txt-aeo.krikormher.workers.dev',
  tagline: 'Interface design and build studio',
}

export const pages = [
  {
    slug: '',
    title: 'Forge Studio — Interface design and build studio',
    description: 'We design and build product interfaces with motion that explains hierarchy instead of just showing off.',
    markdown: `# Forge Studio

We design and build product interfaces with motion that explains hierarchy
instead of just showing off.

Founded in 2024, Forge Studio works with early-stage product teams who need
a site or app that feels considered on day one, not patched together after
launch. We ship fast, but we don't ship sloppy.

## What we do

- Product landing pages with real performance budgets (sub-second TTI)
- Design systems built for a single codebase, not a Figma file nobody opens
- Motion and interaction design grounded in actual information hierarchy

See [Services](/services) for pricing and scope, or read [About](/about) for
how we work.`,
  },
  {
    slug: 'about',
    title: 'About — Forge Studio',
    description: 'How Forge Studio works: a two-person studio, fixed-scope engagements, no retainer traps.',
    markdown: `# About Forge Studio

Forge Studio is a two-person studio: one design lead, one engineering lead.
We work on 2-3 engagements at a time, never more — which means your project
gets both of us, not a junior assigned to "your account."

## How we work

Every engagement is fixed-scope and fixed-price, agreed before any work
starts. No open-ended retainers, no surprise hourly overages. If scope
changes mid-project, we re-quote the delta explicitly rather than quietly
padding the invoice.

## Who we work with

Early-stage product teams (pre-seed through Series A) who have outgrown a
template site but aren't ready for a 10-person agency engagement. If that's
not you, we'll say so on the first call instead of taking the project
anyway.

Back to [Home](/) · See [Services](/services)`,
  },
  {
    slug: 'services',
    title: 'Services — Forge Studio',
    description: 'Forge Studio engagement types: landing page sprint, design system build, motion audit.',
    markdown: `# Services

Three fixed-scope engagement types. Custom scopes are available but start
from one of these as a baseline.

## Landing page sprint — 2 weeks

One page, fully designed and built, deployed to your stack. Includes a real
Lighthouse performance pass (target: 95+ mobile) and one round of staged
load-sequence motion like the kind used on this site.

## Design system build — 4-6 weeks

Tokens, components, and a living style guide wired directly into your
codebase (not a static Figma export that goes stale in a month).

## Motion audit — 1 week

We review your existing product's animations and interactions, flag
anything that's decorative rather than functional, and hand back a
prioritized fix list with before/after prototypes for the top 3 issues.

Back to [Home](/) · Read [About](/about)`,
  },
]
