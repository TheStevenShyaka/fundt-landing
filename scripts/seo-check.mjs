/**
 * SEO lint for the built site. Exit code 1 on any failure.
 * Run: node scripts/build-variants.mjs && node scripts/seo-check.mjs
 */
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./site.config.mjs";
import { extractFaq } from "./seo.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(root, f), "utf8");
let fails = 0;
const ok = (c, msg) => { console.log(`${c ? "  ok  " : " FAIL "} ${msg}`); if (!c) fails++; };
const attr = (html, re) => (html.match(re) || [])[1];

for (const [file, url] of [["index.html", `${SITE.url}/`], ["privacy.html", `${SITE.url}/privacy`]]) {
  console.log(`\n${file}`);
  const h = read(file);
  const title = attr(h, /<title>([\s\S]*?)<\/title>/).replace(/&amp;/g, "&");
  const desc = attr(h, /<meta name="description" content="([^"]*)"/);
  ok(title.length >= 20 && title.length <= 65, `title ${title.length} chars: ${title}`);
  ok(desc && desc.length >= 70 && desc.length <= 160, `description ${desc && desc.length} chars`);
  ok(attr(h, /<link rel="canonical" href="([^"]*)"/) === url, "canonical = " + url);
  ok((h.match(/<h1[ >]/g) || []).length === 1, "exactly one <h1>");
  ok(/<meta name="robots" content="index,follow/.test(h), "robots index,follow");
  ok(attr(h, /<meta property="og:image" content="([^"]*)"/) === `${SITE.url}/${SITE.ogImage.path}`, "og:image set");
  ok(/<html lang="en">/.test(h), "html lang");
  // Every local href/src in the page resolves to a file.
  const local = [...h.matchAll(/(?:href|src)="(?!https?:|#|mailto:|\/privacy|\/")([^"]+)"/g)].map((m) => m[1]).filter((p) => !p.startsWith("data:"));
  const missing = [...new Set(local)].filter((p) => !existsSync(join(root, p.replace(/^\//, ""))));
  ok(missing.length === 0, `all local assets exist${missing.length ? ": " + missing.join(", ") : ""}`);
  // JSON-LD parses.
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  let parsed = [];
  try { parsed = blocks.map((b) => JSON.parse(b[1])); } catch (e) { ok(false, "JSON-LD parses: " + e.message); }
  ok(parsed.length === 1, "JSON-LD present and valid");
  if (file === "index.html") {
    const types = parsed[0]["@graph"].map((n) => n["@type"]);
    ok(["Organization", "WebSite", "WebPage", "MobileApplication", "FAQPage"].every((t) => types.includes(t)), "graph has " + types.join(", "));
    const faqLd = parsed[0]["@graph"].find((n) => n["@type"] === "FAQPage").mainEntity.map((q) => q.name);
    const faqHtml = extractFaq(h).map((q) => q.q);
    ok(JSON.stringify(faqLd) === JSON.stringify(faqHtml) && faqHtml.length > 0, `FAQ JSON-LD mirrors the ${faqHtml.length} visible questions`);
    ok(!/aggregateRating|"review"/.test(h), "no invented ratings or reviews");
  }
}

console.log("\nassets");
const og = join(root, SITE.ogImage.path);
ok(existsSync(og) && statSync(og).size < 600 * 1024, `og-image exists and is < 600 KB`);
for (const f of ["favicon.ico", "site.webmanifest", "robots.txt", "sitemap.xml", "llms.txt", "404.html", "assets/apple-touch-icon.png", "assets/icon-192.png", "assets/icon-512.png", ...SITE.screenshots])
  ok(existsSync(join(root, f)), f);
const sm = read("sitemap.xml");
ok(sm.includes(`<loc>${SITE.url}/</loc>`) && sm.includes(`<loc>${SITE.url}/privacy</loc>`), "sitemap lists both canonical URLs");
ok(read("robots.txt").includes(`Sitemap: ${SITE.url}/sitemap.xml`), "robots.txt points at the sitemap");
ok(read("CNAME").trim() === new URL(SITE.url).host, "CNAME matches SITE.url host");

console.log(fails ? `\n${fails} check(s) failed` : "\nAll SEO checks passed");
process.exit(fails ? 1 : 0);
