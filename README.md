# Fundt Landing Page

Waitlist landing concepts for Fundt, with a studio chrome to compare design directions.

## Run it locally

```bash
npx serve .
```

Open the root URL. Use:

1. **Skill output** dropdown - switch between `design-taste-frontend` and `impeccable`
2. **Style tabs** - the shortlisted concepts per skill

Deep links look like `#taste/taste-flow` or `#impeccable/imp-donut`.

All concepts use **Nunito 500/700** (the app's typeface) and share one category color palette (`--cat-*` vars at the top of each variant CSS).

## Concept map (shortlist)

| Skill | Tab | File | Idea |
| --- | --- | --- | --- |
| Taste | Flow | `variants/taste-flow.html` | One money stream forking into buckets (animated SVG) |
| Taste | Buckets | `variants/taste-buckets.html` | The month as fat, rotated, colored pills |
| Taste | Month | `variants/taste-month.html` | Calendar cells light up day by day |
| Impeccable | Donut | `variants/imp-donut.html` | Half-phone History chart + category emoji legend |
| Impeccable | Market | `variants/imp-market.html` | Full-bleed cobalt/mango/leaf color blocks, price-tag stickers |

Rebuild variants after editing defs:

```bash
node scripts/build-variants.mjs
```

Definitions live in `scripts/variant-defs.mjs` (taste) and `scripts/variant-defs-imp.mjs` (impeccable). Dropped concepts stay in those files but are filtered out by `KEEP` in `scripts/build-variants.mjs`.

## Collecting emails

Shared handler: `shared/waitlist.js`. Set:

```js
const WAITLIST_ENDPOINT = "https://formspree.io/f/your-form-id";
```

Until then, emails store in `localStorage` under `fundt-waitlist`.

## Privacy Policy

`privacy.html` is unchanged and still the app's policy URL target.

## Product context

- `PRODUCT.md` - durable product truth (Impeccable init)
- `DESIGN.md` - notes that this folder is an exploration set
- Original landing archived at `variants/_legacy-current.html`
