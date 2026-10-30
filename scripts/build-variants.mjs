/**
 * Builds the Fundt landing (taste-month concept) and every SEO artefact.
 *
 * Emits:
 *   index.html                     full page incl. the complete SEO head + JSON-LD
 *   variants/taste-month.{html,css} unpublished working copy (noindex)
 *   privacy.html                   head regenerated, body left untouched
 *   sitemap.xml, robots.txt, llms.txt, site.webmanifest
 *
 * Run: node scripts/build-variants.mjs
 * SEO facts live in scripts/site.config.mjs. Do not hand-edit generated heads.
 * All variants use Nunito 500 (medium) + 700 (bold), the app's typeface.
 */
import { mkdirSync, writeFileSync, readFileSync, readdirSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "./site.config.mjs";
import { buildHead, extractFaq, sitemapXml, robotsTxt, manifestJson, llmsTxt } from "./seo.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "variants");
mkdirSync(outDir, { recursive: true });

const write = (rel, text) => writeFileSync(join(root, rel), text);

/** Body shell shared by the root page and the variant copy. */
function page({ id, contract, body, head, scriptSrc, phoneBase }) {
  return `<!DOCTYPE html>
<html lang="${SITE.lang}">
<head>
${head}
</head>
<body class="variant-${id}">
<!--
${contract}
-->
${body}
<script src="${scriptSrc}"></script>
<script src="${phoneBase}fundt-phone.js"></script>
</body>
</html>
`;
}

/** Rewrite variant-relative asset paths for the site root. */
function toRootBody(body) {
  return body.replaceAll("../assets/", "assets/").replaceAll("../privacy.html", "/privacy");
}

/** Last-modified date for sitemap: today if the files have uncommitted changes, else last commit date. */
function lastmod(files) {
  const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  try {
    if (git(["status", "--porcelain", "--", ...files])) return new Date().toISOString().slice(0, 10);
    return git(["log", "-1", "--format=%cs", "--", ...files]) || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const KEEP = new Set(["taste-month"]);
const taste = await import("./variant-defs.mjs");
const all = taste.defs.filter((v) => KEEP.has(v.id));
let faq = [];

for (const v of all) {
  faq = extractFaq(v.body);
  write(`variants/${v.id}.css`, v.css.trim() + "\n");

  write(
    `variants/${v.id}.html`,
    page({
      id: v.id,
      contract: v.contract,
      body: v.body,
      head: buildHead({
        page: "variant",
        assetPrefix: "../assets/",
        styles: [`${v.id}.css`, "../shared/fundt-phone.css"],
      }),
      scriptSrc: "../shared/waitlist.js",
      phoneBase: "../shared/",
    })
  );
  console.log("wrote", `variants/${v.id}.html`);

  if (v.id === "taste-month") {
    write(
      "index.html",
      page({
        id: v.id,
        contract: v.contract,
        body: toRootBody(v.body),
        head: buildHead({
          page: "home",
          assetPrefix: "assets/",
          styles: [`variants/${v.id}.css`, "shared/fundt-phone.css"],
          faq,
        }),
        scriptSrc: "shared/waitlist.js",
        phoneBase: "shared/",
      })
    );
    console.log("wrote index.html");
  }
}

// privacy.html: regenerate only <head>, keep the hand-written policy body.
const privacyPath = join(root, "privacy.html");
const privacy = readFileSync(privacyPath, "utf8");
const privacyHead = buildHead({ page: "privacy", assetPrefix: "assets/", styles: ["variants/taste-month.css", "policy.css"] });
if (!/<head>[\s\S]*<\/head>/.test(privacy)) throw new Error("privacy.html has no <head>");
writeFileSync(privacyPath, privacy.replace(/<head>[\s\S]*<\/head>/, `<head>\n${privacyHead}\n</head>`));
console.log("wrote privacy.html head");

// Crawl files.
write(
  "sitemap.xml",
  sitemapXml([
    { loc: `${SITE.url}/`, lastmod: lastmod(["index.html", "shared", "variants/taste-month.css"]) },
    { loc: `${SITE.url}/privacy`, lastmod: lastmod(["privacy.html", "policy.css"]) },
  ])
);
write("robots.txt", robotsTxt());
write("llms.txt", llmsTxt(faq));
write("site.webmanifest", manifestJson() + "\n");
console.log("wrote sitemap.xml robots.txt llms.txt site.webmanifest");

const keepFiles = new Set(all.flatMap((v) => [`${v.id}.html`, `${v.id}.css`]));
keepFiles.add("manifest.json");
keepFiles.add("_legacy-current.html");
keepFiles.add("_legacy-current.css");

for (const name of readdirSync(outDir)) {
  if (!keepFiles.has(name) && /\.(html|css)$/.test(name) && !name.startsWith("_legacy")) {
    unlinkSync(join(outDir, name));
    console.log("removed", name);
  }
}

writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify({ concept: { id: "taste-month", label: "Month", file: "taste-month.html" } }, null, 2)
);
console.log("manifest.json ready");
