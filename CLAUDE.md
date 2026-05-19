# Ankit Bhagat — Portfolio

Personal portfolio for an Engineering Manager at Splunk (~7 years, IC → EM,
identity platform). Targeting EM / PM / Staff Eng roles at AI labs and
product companies. Engineer audience, designer-grade execution.

The vibe: **editorial, warm, technical.** Designer-made site for an engineer
who cares.

## Stack

- **Astro** (latest), TypeScript strict mode
- **Tailwind CSS v4** with `@theme` directive for design tokens
- **View Transitions API** for navigation
- **Self-hosted fonts** (Geist Variable, Source Serif 4 Variable, Geist Mono Variable) — woff2, subset, preloaded
- **No client framework.** Islands = vanilla TS. Justify any client-side framework before adding it.
- **Markdown content** in `content/` via Astro Content Collections
- **Cloudflare Pages** deploy target — chosen for: zero-config Astro adapter, edge-cached static + functions in the same project (useful for `/.well-known/contact.json`), 100% free tier covers a personal site

## Design tokens

Defined in `src/styles/global.css` under `@theme`. These are the source of
truth. Don't introduce ad-hoc colors or sizes in components.

### Color (dark mode default)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#15120E` | Page background — warm charcoal, not pure black |
| `--color-bg-elev` | `#1C1814` | Card / elevated panel |
| `--color-fg` | `#ECE3D2` | Body text — warm cream, not pure white |
| `--color-fg-hi` | `#F7F0E1` | Headlines, emphasized |
| `--color-muted` | `#998E78` | Metadata, captions, mono labels |
| `--color-subtle` | `#5C5547` | Disabled, very low priority |
| `--color-border` | `#2A241D` | Hairline borders |
| `--color-accent` | `#B5651D` | Burnt amber — the one accent |
| `--color-accent-hi` | `#D38A3E` | Hover/active accent |
| `--color-grain` | `rgba(236,227,210,0.018)` | SVG grain overlay opacity |

Rules:

- Accent gets used on links, focus rings, the single meaningful underline. Not as a button background. Not on more than ~3% of any viewport.
- Never use pure `#000` or `#FFF`. The warmth of the neutrals is what separates this from generic dark mode.
- No gradients between two accent tones. No translucent panels with `backdrop-blur`.

### Typography

- **Display:** Geist Variable (`font-display`)
- **Body:** Source Serif 4 Variable (`font-serif`)
- **Mono:** Geist Mono Variable (`font-mono`) — metadata, dates, code, terminal
- `font-display: swap` on every face. Size-adjust descriptors set to minimize CLS.
- Subset to Latin + Latin-Ext + the punctuation set actually used (en-dash, em-dash, curly quotes, ellipsis).

**Type scale** (rem; root is 16px):

| Token | Size | Line-height | Tracking | Use |
|---|---|---|---|---|
| `--text-display-xl` | `6rem` | `0.95` | `-0.035em` | Hero, the loudest line |
| `--text-display-lg` | `4.5rem` | `0.98` | `-0.03em` | Hero echo, page titles |
| `--text-display-md` | `3rem` | `1.02` | `-0.025em` | Hero quiet line, section openers |
| `--text-h1` | `2.5rem` | `1.1` | `-0.02em` | Case study titles |
| `--text-h2` | `1.875rem` | `1.15` | `-0.015em` | Section headers |
| `--text-h3` | `1.375rem` | `1.25` | `-0.01em` | Sub-sections |
| `--text-body` | `1.0625rem` | `1.6` | `0` | Body prose (17px — editorial weight) |
| `--text-small` | `0.875rem` | `1.5` | `0.005em` | Captions, footnotes |
| `--text-mono` | `0.8125rem` | `1.55` | `0` | Metadata labels, code |
| `--text-mono-sm` | `0.75rem` | `1.5` | `0.02em` | Tag labels, eyebrows (uppercase) |

Hero stacked-headline pattern uses three of the display sizes (`xl` → `lg` → `md`) at decreasing weights to create the descending echo.

### Spacing

Use Tailwind defaults (`0.25rem` step). One additional token for editorial section rhythm:

- `--space-section-y`: `clamp(5rem, 10vw, 9rem)` — vertical breathing between major sections
- `--space-prose-y`: `1.4em` — paragraph rhythm inside long-form content

### Layout

- `--width-page`: `1240px` — outer page max
- `--width-content`: `880px` — default content column
- `--width-prose`: `65ch` — long-form reading column
- Gutters: `clamp(1.25rem, 4vw, 2.5rem)`

### Motion

- Scroll-driven reveals use IntersectionObserver. No libraries.
- View Transitions API for inter-page nav.
- `--duration-fast`: `120ms`, `--duration-base`: `220ms`, `--duration-slow`: `480ms`
- Easing: `--ease-out`: `cubic-bezier(0.2, 0.6, 0.2, 1)` (standard) — that's it. No bounce, no overshoot.
- **`prefers-reduced-motion: reduce` disables ALL reveals and transitions.** No exceptions.

### Texture

- A single SVG noise overlay fixed to viewport, opacity `0.018`, `mix-blend-mode: overlay`. Tiny. Almost imperceptible. This is the only background texture.

## Voice register

Warm but not chummy. Confident but not boastful. Technical when accuracy
matters. Plain when it doesn't. A little dry. Slightly self-aware.

**Never:**

- "Let's build something amazing together!" / "Hi! 👋"
- Emojis in headers, hover states, or CTAs
- Exclamation points outside legitimate excitement
- "Available for hire" pulsing dot
- Founder-bro register ("crushing it," "1000%," "let's go")
- Designer-warmth register ("I've got your back," "your friendly neighborhood…")

**Always:**

- Real words, specific over abstract, fewer rather than more
- Section headers as short, lowercase, conversational fragments
- CTAs as invitations ("say hi") not commands ("Contact me")
- Mono for technical metadata only — dates, tags, code, terminal

### Section header bank (locked)

| Section | Header |
|---|---|
| Hero | (no header — display type is the header) |
| About | `brief background` |
| Selected work | `a few things worth talking about` |
| Experience | `where I've been` |
| Now | `currently` |
| Contact | `say hi` |
| Lab page | `lab — half-formed things` |

Section IDs match these (kebab-cased) for anchor links.

## Content sources

- `content/portfolio.md` — top-level copy (hero, about, now, contact intro). Fixed prose. Parse, don't rewrite.
- `content/work/*.md` — one case study per file. Frontmatter: `title`, `context`, `dateRange`, `summary`, `cover`. Body uses the arc: problem → led → shipped → learned.
- `content/lab/*.md` — ephemera entries.

## Anti-patterns

Hard NO list — flag and refuse if asked:

- Purple-to-pink or indigo-to-cyan gradients anywhere
- Glassmorphism (`backdrop-blur` on translucent cards)
- Floating particles, animated blobs, generative 3D shapes
- Centered hero with "Hi, I'm Ankit" + wave emoji
- Skill bars with percentages, badge soup, year-by-year vertical timelines
- Tailwind-default look (slate-900 + slate-50 + blue-500)
- Dashboard-style card grids
- Marquee logo strips of "companies I've worked with"
- Stock illustrations
- "Available for hire" pulsing dot
- Magnetic buttons, cursor-following blobs, mouse-trail effects
- Parallax on anything
- More than one accent color

## Quality bar

- Lighthouse 100/100/100/100 on production build
- Fully keyboard navigable, visible focus states (accent-colored ring), semantic HTML
- `prefers-reduced-motion` respected everywhere — no exceptions
- No CLS. Explicit `width`/`height` on every `img`. `font-display: swap` with size-adjust.
- Homepage JS budget: **< 30 KB gzipped**
- View source should look hand-written

## Signature handcrafted moment

`.well-known/contact` as the Contact section. See `PLAN.md` for the design.
Built once, built well, not sprinkled. The flourish lives in the closing
space of the page.
