# Fundt Landing Page

Single Month landing concept for Fundt. Hero copy is locked (refine later).

## Run it locally

```bash
npx serve .
```

Open the root URL — it serves the Month landing directly (`index.html`, generated from the same defs as `variants/taste-month.html`). One nav: Fundt + Privacy.

**Hero (locked):** Know where your MoMo went.  
**Sub:** Capture every transfer. Organize by category. Stay on budget without the homework.

The Month page uses **Nunito 500/700** (the app's typeface) and the shared category color palette (`--cat-*` vars).

## Files

| Concept | File |
| --- | --- |
| Month (root) | `index.html` |
| Month (variant copy) | `variants/taste-month.html` |

Rebuild after editing defs (also regenerates the SEO head and crawl files, see SEO below):

```bash
node scripts/build-variants.mjs
```

Definitions live in `scripts/variant-defs.mjs`. Older concept defs may remain in that file (and `scripts/variant-defs-imp.mjs`) but `KEEP` in `scripts/build-variants.mjs` only emits **taste-month** (plus root `index.html`).

## Interactive phone

The hero phone is a working replica of the app, in `shared/fundt-phone.js` + `shared/fundt-phone.css` (vanilla, no build step). Mount point: `<div data-fundt-phone data-assets="assets/">`; the static `hero-iphone.png` inside it is the no-JS fallback and the og:image.

It runs entirely on fake in-memory data (reload resets). "Today" is pinned to the 24th of the visitor's month so the month is always populated. Layout values are in app points (393x852) lifted from the `fundt` repo (`theme/tokens.ts`, `HistoryRevampRow`, `CategoryCardFace`, `GlassTabBar`, ...) and scaled to fit. When the app UI changes, update the matching section in those two files.

The hand-drawn note beside the phone reads its copy from `data-hint` (first message) and `data-hint-next` (shown after the first tap, until Send is opened) on the mount in `scripts/variant-defs.mjs`. Change the words there and rebuild.

## SEO

Everything search engines and link previews read is generated, so it cannot drift:

| Source | Produces |
| --- | --- |
| `scripts/site.config.mjs` | titles, descriptions, OG image, app and social facts, verification tokens |
| `scripts/seo.mjs` | the full `<head>` (canonical, robots, Open Graph, Twitter, icons, manifest, Apple smart banner), JSON-LD (Organization, WebSite, WebPage, MobileApplication, FAQPage built from the visible FAQ), `sitemap.xml`, `robots.txt`, `llms.txt`, `site.webmanifest` |

```bash
node scripts/build-variants.mjs   # regenerates index.html, privacy.html head and all crawl files
node scripts/seo-check.mjs        # lint: lengths, canonicals, JSON-LD parity, assets exist
node scripts/build-assets.mjs     # (needs Playwright) re-shoot assets/screens/* and assets/og-image.png
```

`index.html` is fully generated: edit `scripts/variant-defs.mjs` (body) or `site.config.mjs` (SEO), never the output. `privacy.html` keeps its hand-written body; only its head is regenerated.

After deploy, once: add `https://fundt.app` in Google Search Console and Bing Webmaster Tools, paste the verification tokens into `site.config.mjs` (`googleVerification`, `bingVerification`), rebuild, submit `https://fundt.app/sitemap.xml`, then use URL Inspection to request indexing of `/` and `/privacy`.

## Collecting emails

The live form posts to the Loops form endpoint in `shared/waitlist.js` (urlencoded `email`, plus `source` and `userGroup`). That URL is public on purpose. Do not put a Loops API key in this repo.

Waitlist contacts show up in the Loops Audience. Welcome mail is a **Workflow** on contact added, not a Campaign.

## Privacy Policy

Canonical URL: [https://fundt.app/privacy](https://fundt.app/privacy).

GitHub Pages serves `privacy.html` at both `/privacy` and `/privacy.html`, so the policy lives in that root file. Do not also add a `privacy/` folder: Pages will then send `/privacy` to a stub and the page will loop.

## Product context

- `PRODUCT.md` - durable product truth
- `DESIGN.md` - Month landing, locked hero copy
- Original landing archived at `variants/_legacy-current.html`
