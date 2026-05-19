# Plan — v0 scaffold

This is the structure I'll build before touching code. Approve or redirect.

## Build sequence

1. **Scaffold Astro + TS strict + Tailwind v4.** `npm create astro@latest`, minimal template, Cloudflare adapter. Verify dev server boots.
2. **Design system foundation.** `global.css` with `@theme` tokens (per `CLAUDE.md`). Self-host fonts in `public/fonts/`, subset + preload. Grain SVG overlay. Visible focus styles.
3. **Layout + Nav.** `Base.astro` layout, minimal top nav (left: name as link to home, right: 3–4 anchor links to sections), View Transitions enabled.
4. **Hero with stacked headline.** Three sizes/weights of the fixed hero copy, descending. Reveal-on-load animation. This is the page's first impression — gets the most polish in v0.
5. **About section.** Placeholder prose pulled from `content/portfolio.md`. No photo until decided.
6. **One case study tile + dynamic route.** Build the `WorkTile` component using Emmi's metadata grammar. Build `/work/[slug]` route with one populated case study to validate the structure. Other two case studies stub out.
7. **Contact section — the `.well-known/contact` moment.** Syntax-highlighted JSON block as the Contact section. Live endpoint at `/.well-known/contact.json`. (Detailed below.)
8. **Footer + colophon.** Set-in line, copyright, link to the live `.well-known/contact.json` endpoint.
9. **Show v0 to Ankit.** Screenshot or local URL. Iterate before continuing.
10. **Iterate.** Remaining two case studies, Experience, Now, optional `/lab`. Motion polish last (scroll-reveals).
11. **Polish.** Lighthouse pass, a11y audit (axe + manual keyboard pass), responsive checks at 320 / 768 / 1280 / 1920, View Transitions on inter-page nav.

Gate at step 9 — don't proceed to iterate until v0 is approved.

## File tree

```
ankit-website/
├── INSPIRATIONS.md
├── CLAUDE.md
├── PLAN.md
├── README.md
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .gitignore
├── public/
│   ├── fonts/
│   │   ├── Geist-Variable.woff2
│   │   ├── GeistMono-Variable.woff2
│   │   └── SourceSerif4-Variable.woff2
│   ├── grain.svg                       # noise overlay
│   ├── favicon.svg
│   └── og.png                          # social card
├── content/
│   ├── portfolio.md                    # hero, about, now, contact intro
│   ├── work/
│   │   ├── _example.md                 # template for case studies
│   │   ├── splunk-identity.md          # case study 1
│   │   ├── splunk-tbd.md               # case study 2
│   │   └── earlier-role.md             # case study 3
│   └── lab/
│       └── _example.md
└── src/
    ├── content.config.ts               # Astro Content Collections schemas
    ├── env.d.ts
    ├── styles/
    │   └── global.css                  # @theme tokens + reset + base
    ├── lib/
    │   ├── content.ts                  # collection helpers
    │   └── contact.ts                  # canonical contact JSON (used by both the section & the endpoint)
    ├── components/
    │   ├── layout/
    │   │   ├── Nav.astro
    │   │   ├── Footer.astro
    │   │   └── GrainOverlay.astro
    │   ├── hero/
    │   │   ├── Hero.astro
    │   │   └── StackedHeadline.astro
    │   ├── about/
    │   │   └── About.astro
    │   ├── work/
    │   │   ├── WorkList.astro
    │   │   ├── WorkTile.astro
    │   │   └── CaseStudy.astro         # /work/[slug] body
    │   ├── experience/
    │   │   └── Experience.astro
    │   ├── now/
    │   │   └── Now.astro
    │   ├── contact/
    │   │   ├── Contact.astro           # the section — wraps JsonDoc
    │   │   └── JsonDoc.astro           # Shiki-highlighted JSON with link affordances
    │   └── ui/
    │       ├── Reveal.astro            # IntersectionObserver wrapper
    │       └── SectionHeader.astro     # consistent eyebrow + title
    ├── layouts/
    │   └── Base.astro
    └── pages/
        ├── index.astro
        ├── work/
        │   └── [slug].astro
        ├── lab.astro
        ├── 404.astro
        └── .well-known/
            └── contact.json.ts         # live endpoint, returns the same data as Contact.astro
```

## Component breakdown (one-line each)

- **`Base.astro`** — `<html>` shell, `<head>` (preload fonts, OG tags, View Transitions enable), `<body>` with Nav + slot + Footer + GrainOverlay.
- **`Nav.astro`** — name on left, three anchors on right (`work`, `now`, `say hi`), uses font-display in `mono-sm` weight. Sticky with fade-on-scroll backdrop.
- **`Hero.astro`** — wraps `StackedHeadline`. No section header (display type is the header).
- **`StackedHeadline.astro`** — renders one phrase across three lines/sizes/weights. Props: `lines: [{ text, size, weight }]`. Sequenced reveal with stagger ~80ms.
- **`About.astro`** — section header `brief background`, two-column at desktop: prose left, future-photo slot right (currently empty / decorative).
- **`WorkList.astro`** — section header `a few things worth talking about`, stacks `WorkTile`s vertically with generous gaps. Not a card grid — single column for tactile reading.
- **`WorkTile.astro`** — Emmi's grammar: mono eyebrow `[Context] — [Year]`, h2 title, one-line description in Source Serif, full tile is the link target. Hover: accent underline on title, tile background lifts to `--color-bg-elev`.
- **`CaseStudy.astro`** — body layout for `/work/[slug]`. Two columns at desktop: left rail = metadata (role, dates, stack, scope) in mono; right = prose with Problem / What I led / What we shipped / What I'd do differently sections.
- **`Experience.astro`** — section header `where I've been`. Compact list. Each row: mono date range (left, fixed width), company + role (middle), one-line description (right or below at narrow widths). Dry, scannable.
- **`Now.astro`** — section header `currently`. Different texture: a single column with mono date stamp at top (`updated YYYY-MM-DD`), then 3–5 short bullets in body type. Reads like a dispatch.
- **`Contact.astro`** — section header `say hi`. Wraps `JsonDoc`. Below the JSON block: a small line `also available at /.well-known/contact.json` linking to the live endpoint.
- **`JsonDoc.astro`** — renders the contact JSON using Shiki at build time (Astro's built-in highlighter, zero runtime cost). Each value that's a URL is wrapped in `<a>`. Schema-coloured: keys in muted, strings in accent, structure in fg.
- **`Footer.astro`** — colophon line: `Set in Geist & Source Serif 4. Built with Astro. Hosted on Cloudflare.` Then copyright. Then a single mono line that doubles as nav to `/lab` and `/.well-known/contact.json`.
- **`Reveal.astro`** — IntersectionObserver wrapper. Children fade up 16px over 480ms. `prefers-reduced-motion` short-circuits to opacity 1 immediately.
- **`SectionHeader.astro`** — consistent rendering of section eyebrows: `<h2>` with `font-mono-sm uppercase tracking-wider text-muted`.
- **`GrainOverlay.astro`** — fixed pointer-events-none div with grain.svg background, opacity per token. Skipped under `prefers-reduced-motion` (some users find grain itself distracting).

## The signature moment — `.well-known/contact`

A single canonical contact identity, expressed two ways: rendered on the page as a syntax-highlighted JSON document; served at `/.well-known/contact.json` as a real endpoint that returns valid `application/json`.

### Source of truth

`src/lib/contact.ts` exports the object. Both `Contact.astro` and `pages/.well-known/contact.json.ts` import from it. Updating contact info is one file.

### Shape (proposal — needs your confirm)

```json
{
  "issuer": "https://ankitbhagat.com",
  "subject": {
    "name": "Ankit Bhagat",
    "role": "Engineering Manager",
    "location": "San Francisco Bay Area"
  },
  "endpoints": {
    "email":    "mailto:ankitcbhagat@gmail.com",
    "linkedin": "https://linkedin.com/in/xynazog",
    "github":   "https://github.com/xynazog"
  },
  "scopes_supported": ["EM", "PM", "Staff Eng"],
  "audience": ["AI labs", "product companies"],
  "response_time": "usually within a day"
}
```

Decisions you'll need to make later (not blocking v0):

- Which email — `ankitcbhagat@gmail.com` (old resumeData) vs `socialforankit@gmail.com` (CLAUDE.md). Default to `ankitcbhagat@gmail.com` unless you say otherwise.
- Whether to include `response_time`. It's a small signal of seriousness, but commits you. Easy to remove.
- Whether to add a Calendly-style `book` endpoint. Default no — adds maintenance burden.

### Rendering

- Mono font, generous line-height (1.7), `--text-mono` size.
- Container: `--color-bg-elev` background, hairline border, `8px` rounded corners, subtle inner shadow.
- Top bar of the container shows `~/.well-known/contact.json` in `--color-muted`, with three faux traffic-light dots OR an accent-coloured `200 OK` badge (preference: the badge — engineer-native, doesn't read as macOS-skeuomorphism).
- Each URL value is a real anchor — `target="_blank"`, `rel="noreferrer"`, hover state = accent underline (the one place the accent underline is used).
- Below the block: small mono line `GET /.well-known/contact.json →` linking to the real endpoint.

### The live endpoint

`pages/.well-known/contact.json.ts` exports a `GET` returning the JSON with `Content-Type: application/json; charset=utf-8` and `Cache-Control: public, max-age=3600`. CORS-open. No tracking on the request.

This is the bit that makes the joke real: an EM working on identity platforms has a `.well-known` document, because of course they do.

### Why this works

It signals taste (the form), domain awareness (the content), and self-awareness (the small joke). It costs ~80 lines of code and adds one route. It scales: future revisions can add fields (`open_to_remote`, `last_updated`) without redesigning anything.

## Open questions before I scaffold

1. **Confirm email.** `ankitcbhagat@gmail.com` or `socialforankit@gmail.com`?
2. **Confirm domain.** Is `ankitbhagat.com` still the target domain? It's referenced as `issuer` in the JSON and in the OG canonical.
3. **OK to leave case study slugs as placeholders** (`splunk-identity`, `splunk-tbd`, `earlier-role`) until you write the copy? I'll stub the frontmatter and one-line summaries so the work section renders.
4. **`/lab` page in v0 or later?** Default: stub the route now, populate later.

When you confirm those (or just say "go"), I scaffold.
