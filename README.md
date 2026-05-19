# ankitbhagat.com

Personal portfolio for Ankit Bhagat. Astro + Tailwind v4, no client framework.

## run it locally

```sh
npm install
npm run dev
```

Build: `npm run build`. Preview: `npm run preview`.

## deploy

GitHub Actions builds on every push to `main` and publishes via Pages. Cloudflare handles DNS only.

One-time setup if cloning fresh:

1. **Repo → Settings → Pages → Source: GitHub Actions.**
2. After the first deploy succeeds, set **Custom domain: `ankitbhagat.com`** and tick **Enforce HTTPS**.
3. **DNS (Cloudflare):** `@` and `www` → CNAME → `xynazog.github.io`. DNS-only (gray cloud) during initial setup.

## layout

- `src/pages/` — routes
- `src/components/` — page parts
- `src/styles/global.css` — design tokens (`@theme`)
- `public/CNAME` — custom domain marker for GH Pages
