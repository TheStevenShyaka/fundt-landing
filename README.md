# Fundt Landing Page

A static, zero-dependency landing page for collecting waitlist emails before the app ships.

## Run it locally

Any static server works. From this folder:

```bash
npx serve .
```

Or just open `index.html` directly in a browser.

## Collecting emails

Right now signups are saved to the browser's `localStorage` (key: `fundt-waitlist`) so the form flow is testable. To collect them for real, open `script.js` and set:

```js
const WAITLIST_ENDPOINT = "https://formspree.io/f/your-form-id";
```

Any endpoint that accepts `POST { "email": "..." }` as JSON works (Formspree, Google Apps Script, your own backend).

## Adding the product teaser video

The phone mockup in the hero is wired for a demo video:

1. Drop your screen recording at `assets/demo.mp4` (portrait, roughly 9:19.5 aspect).
2. That's it — the page auto-detects the file, hides the placeholder, and loops the video muted.

To use a GIF instead, replace the `<video>` tag in `index.html` with
`<img class="screen-video" src="assets/demo.gif" alt="Fundt demo" />` and delete the placeholder `div`.

## Structure

- `index.html` — the whole page (hero, features, how it works, privacy, audience, CTA)
- `styles.css` — light theme built on the app's brand accent `#0090ff` (from `fundt-frontend/theme/tokens.ts`), DM Sans throughout
- `script.js` — waitlist form handling + demo video detection
- `assets/` — logo mark, favicon, and bill provider icons copied from the app
