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

Rebuild after editing defs:

```bash
node scripts/build-variants.mjs
```

Definitions live in `scripts/variant-defs.mjs`. Older concept defs may remain in that file (and `scripts/variant-defs-imp.mjs`) but `KEEP` in `scripts/build-variants.mjs` only emits **taste-month** (plus root `index.html`).

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
