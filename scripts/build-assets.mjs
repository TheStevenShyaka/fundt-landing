/**
 * Regenerates the marketing images from the live demo phone:
 *   assets/screens/fundt-{home,categories,history}.png  (also used in JSON-LD screenshots)
 *   assets/og-image.png                                  (1200x630 link preview)
 * Dev-only: needs Playwright (npm i -D playwright, or a global install). Not run by the site build.
 * Run: node scripts/build-assets.mjs
 */
import http from "node:http";
import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json" };

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  const f = join(root, p === "/" ? "index.html" : p.startsWith("/scripts/") || existsSync(join(root, p)) ? p : p + ".html");
  if (!existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
}).listen(0);
const base = `http://localhost:${server.address().port}`;

mkdirSync(join(root, "assets/screens"), { recursive: true });
const browser = await chromium.launch();

const shots = await browser.newPage({ viewport: { width: 1200, height: 1100 }, deviceScaleFactor: 1.5 });
await shots.goto(`${base}/index.html`, { waitUntil: "networkidle" });
await shots.waitForSelector(".fp-screen");
// Transparent page so the phone's rounded corners are not boxed in by the page background.
await shots.addStyleTag({ content: "html,body,.hero,.hero-visual{background:transparent!important}.hero-visual::before{display:none!important}.fp-nudge{display:none!important}" });
for (const tab of ["home", "categories", "history"]) {
  await shots.click(`.fp-tab[data-tab="${tab}"]`);
  await shots.waitForTimeout(2000);
  await (await shots.$(".fp-scale")).screenshot({ path: join(root, `assets/screens/fundt-${tab}.png`), omitBackground: true });
  console.log("wrote assets/screens/fundt-" + tab + ".png");
}

const og = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await og.goto(`${base}/scripts/og.html`, { waitUntil: "networkidle" });
await og.waitForTimeout(500);
await og.screenshot({ path: join(root, "assets/og-image.png") });
console.log("wrote assets/og-image.png");

await browser.close();
server.close();
