/**
 * Builds the Fundt landing concept variants still in exploration.
 * Kept: taste Flow/Buckets/Month · impeccable Donut/Market
 * Run: node scripts/build-variants.mjs
 * All variants use Nunito 500 (medium) + 700 (bold) — the app's typeface.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "variants");
mkdirSync(outDir, { recursive: true });

const FONT = `<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700&display=swap" rel="stylesheet" />`;

function shell({ id, title, contract, css, body }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="Fundt shows you where your MoMo spending went, without turning budgeting into homework." />
  <link rel="icon" type="image/png" href="../assets/favicon.png" />
  ${FONT}
  <link rel="stylesheet" href="${id}.css" />
</head>
<body class="variant-${id}">
<!--
${contract}
-->
${body}
<script src="../shared/waitlist.js"></script>
</body>
</html>
`;
}

const KEEP = new Set(["taste-flow", "taste-buckets", "taste-month", "imp-donut", "imp-market"]);
const taste = await import("./variant-defs.mjs");
const imp = await import("./variant-defs-imp.mjs");
const all = [...taste.defs, ...imp.defs].filter((v) => KEEP.has(v.id));

for (const v of all) {
  writeFileSync(join(outDir, `${v.id}.css`), v.css.trim() + "\n");
  writeFileSync(
    join(outDir, `${v.id}.html`),
    shell({ id: v.id, title: v.title, contract: v.contract, css: `${v.id}.css`, body: v.body })
  );
  console.log("wrote", `${v.id}.html`);
}

writeFileSync(
  join(outDir, "manifest.json"),
  JSON.stringify(
    {
      skills: [
        {
          id: "taste",
          label: "design-taste-frontend",
          styles: all.filter((v) => v.skill === "taste").map((v) => ({ id: v.id, tab: v.tab, file: `${v.id}.html` })),
        },
        {
          id: "impeccable",
          label: "impeccable",
          styles: all
            .filter((v) => v.skill === "impeccable")
            .map((v) => ({ id: v.id, tab: v.tab, file: `${v.id}.html` })),
        },
      ],
    },
    null,
    2
  )
);
console.log("manifest.json ready");
