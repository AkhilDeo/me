# Akhil Deo Personal Website

Static HTML/CSS portfolio for [akhildeo.com](https://akhildeo.com). This repo intentionally preserves the visual appearance of the previous deployed site while removing the app framework. The only client-side JavaScript is a tiny inline theme toggle (light/dark mode); there is no build step or framework.

## Theme

A light/dark mode toggle sits in the top-right corner. Colors are driven by CSS custom properties in `styles.css` (`:root` for light, `:root[data-theme="dark"]` for dark). On first visit the theme follows the OS `prefers-color-scheme`; once the user clicks the toggle, their choice is saved to `localStorage` and takes precedence. An inline `<head>` script applies the theme before first paint to avoid a flash.

## Structure

- `index.html` contains the page content.
- `styles.css` contains all styling.
- `profile.png` and `favicon.svg` are the only assets.
- `vercel.json` keeps Vercel static hosting simple.
- `.vercel_static/` is a generated Vercel output folder containing only the four deployable static files.
- PR review evidence is stored in the private Cloudflare R2 bucket `shipyard-evidence-private` (requires Cloudflare account access):
  - [desktop-viewport-side-by-side.png](https://dash.cloudflare.com/521463c90a7b9440b87fcda5c18e4484/r2/default/buckets/shipyard-evidence-private/objects/me%2F52cf5ea%2F2026-07-03-style-preservation%2Fdesktop-viewport-side-by-side.png/details)
  - [mobile-viewport-side-by-side.png](https://dash.cloudflare.com/521463c90a7b9440b87fcda5c18e4484/r2/default/buckets/shipyard-evidence-private/objects/me%2F52cf5ea%2F2026-07-03-style-preservation%2Fmobile-viewport-side-by-side.png/details)
  - [pixelmatch-results.json](https://dash.cloudflare.com/521463c90a7b9440b87fcda5c18e4484/r2/default/buckets/shipyard-evidence-private/objects/me%2F52cf5ea%2F2026-07-03-style-preservation%2Fpixelmatch-results.json/details)
- `evidence/` is ignored local verification output for screenshots and browser checks.

## Local Preview

```bash
python3 -m http.server 3000
```

Open `http://localhost:3000`.

## Deployment

The Vercel project for `akhildeo.com` is `me` under the `akhildeos-projects` scope.

Do not deploy production from a local branch unless explicitly requested. Open a PR and verify screenshots first.

The Vercel build command only copies `index.html`, `styles.css`, `profile.png`, and `favicon.svg` into `.vercel_static/` so previews do not use the old Create React App project setting.
