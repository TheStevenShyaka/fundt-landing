/**
 * Builds the Fundt landing Month concept (taste-month).
 * Emits variants/taste-month.{html,css} and root index.html (same page, root-relative paths).
 * Run: node scripts/build-variants.mjs
 * All variants use Nunito 500 (medium) + 700 (bold), the app's typeface.
 */
import { mkdirSync, writeFileSync, readdirSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "variants");
mkdirSync(outDir, { recursive: true });

const FONT = `<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700&display=swap" rel="stylesheet" />`;

/** @param {{ id: string, title: string, contract: string, body: string, assetPrefix?: string, cssHref?: string, scriptSrc?: string }} opts */
function shell({
  id,
  title,
  contract,
  body,
  assetPrefix = "../assets/",
  cssHref,
  scriptSrc = "../shared/waitlist.js",
}) {
  const favicon = `${assetPrefix}favicon.png`;
  const css = cssHref ?? `${id}.css`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="Know where your MoMo went. Capture, organize, and budget with Fundt." />
  <link rel="icon" type="image/png" href="${favicon}" />
  ${FONT}
  <link rel="stylesheet" href="${css}" />
</head>
<body class="variant-${id}">
<!--
${contract}
-->
${body}
<script src="${scriptSrc}"></script>
</body>
</html>
`;
}

/** Rewrite variant-relative asset paths for the site root. */
function toRootBody(body) {
  return body
    .replaceAll("../assets/", "assets/")
    .replaceAll("../privacy.html", "privacy.html");
}

const KEEP = new Set(["taste-month"]);
const taste = await import("./variant-defs.mjs");
const all = taste.defs.filter((v) => KEEP.has(v.id));

for (const v of all) {
  writeFileSync(join(outDir, `${v.id}.css`), v.css.trim() + "\n");
  writeFileSync(
    join(outDir, `${v.id}.html`),
    shell({ id: v.id, title: v.title, contract: v.contract, body: v.body })
  );
  console.log("wrote", `variants/${v.id}.html`);

  if (v.id === "taste-month") {
    writeFileSync(
      join(root, "index.html"),
      shell({
        id: v.id,
        title: v.title,
        contract: v.contract,
        body: toRootBody(v.body),
        assetPrefix: "assets/",
        cssHref: `variants/${v.id}.css`,
        scriptSrc: "shared/waitlist.js",
      })
    );
    console.log("wrote", "index.html");
  }
}

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
  JSON.stringify(
    {
      concept: {
        id: "taste-month",
        label: "Month",
        file: "taste-month.html",
      },
    },
    null,
    2
  )
);
console.log("manifest.json ready");
