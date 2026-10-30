/**
 * SEO builders: head tags, JSON-LD, sitemap, robots, llms.txt, web manifest.
 * Pure functions over SITE (scripts/site.config.mjs); build-variants.mjs does the writing.
 */
import { SITE } from "./site.config.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const abs = (p) => (p.startsWith("http") ? p : `${SITE.url}/${p.replace(/^\//, "")}`);
const meta = (attr, key, value) => `  <meta ${attr}="${key}" content="${esc(value)}" />`;

export const FONT_LINKS = `  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700&display=swap" rel="stylesheet" />`;

/** Pull Q&A pairs out of the page's own FAQ markup so FAQPage JSON-LD always mirrors visible text. */
export function extractFaq(bodyHtml) {
  const items = [];
  const re = /<details[^>]*>\s*<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>\s*<\/details>/g;
  let m;
  const clean = (h) =>
    h.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
  while ((m = re.exec(bodyHtml))) items.push({ q: clean(m[1]), a: clean(m[2]) });
  return items;
}

function jsonLdHome(faq) {
  const orgId = `${SITE.url}/#org`;
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: SITE.name,
      url: `${SITE.url}/`,
      logo: { "@type": "ImageObject", url: abs("assets/icon-512.png"), width: 512, height: 512 },
      email: SITE.email,
      areaServed: { "@type": "Country", name: "Rwanda" },
      sameAs: [SITE.instagram, SITE.appStoreUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      alternateName: ["Fundt app", "fundt.app"],
      url: `${SITE.url}/`,
      inLanguage: SITE.lang,
      publisher: { "@id": orgId },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE.url}/#webpage`,
      url: `${SITE.url}/`,
      name: SITE.home.title,
      description: SITE.home.description,
      inLanguage: SITE.lang,
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": `${SITE.url}/#app` },
      primaryImageOfPage: { "@type": "ImageObject", url: abs(SITE.ogImage.path), width: SITE.ogImage.width, height: SITE.ogImage.height },
    },
    {
      "@type": "MobileApplication",
      "@id": `${SITE.url}/#app`,
      name: SITE.appName,
      alternateName: "Fundt",
      description: SITE.home.description,
      operatingSystem: "iOS",
      applicationCategory: "FinanceApplication",
      inLanguage: SITE.lang,
      countriesSupported: "RW",
      featureList: SITE.features,
      image: abs("assets/icon-512.png"),
      screenshot: SITE.screenshots.map(abs),
      offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
      installUrl: SITE.appStoreUrl,
      downloadUrl: SITE.appStoreUrl,
      url: `${SITE.url}/`,
      publisher: { "@id": orgId },
    },
  ];
  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE.url}/#faq`,
      mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function jsonLdPrivacy() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE.url}/privacy#webpage`,
        url: `${SITE.url}/privacy`,
        name: SITE.privacy.title,
        description: SITE.privacy.description,
        inLanguage: SITE.lang,
        isPartOf: { "@id": `${SITE.url}/#website` },
        breadcrumb: { "@id": `${SITE.url}/privacy#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE.url}/privacy#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Fundt", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE.url}/privacy` },
        ],
      },
    ],
  };
}

/**
 * Everything that goes inside <head>, in a sensible order.
 * @param {{ page: "home"|"privacy"|"variant", assetPrefix?: string, styles: string[], faq?: any[], extra?: string }} o
 */
export function buildHead({ page, assetPrefix = "assets/", styles, faq = [], extra = "" }) {
  const isHome = page === "home";
  const isVariant = page === "variant";
  const conf = page === "privacy" ? SITE.privacy : SITE.home;
  const canonical = page === "privacy" ? `${SITE.url}/privacy` : `${SITE.url}/`;
  const ogTitle = isHome || isVariant ? SITE.home.ogTitle : SITE.privacy.title;
  const ogDesc = isHome || isVariant ? SITE.home.ogDescription : SITE.privacy.description;
  const img = abs(SITE.ogImage.path);
  const lines = [
    `  <meta charset="UTF-8" />`,
    `  <meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
    `  <title>${esc(conf.title)}</title>`,
    meta("name", "description", conf.description),
    meta("name", "robots", isVariant ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"),
    `  <link rel="canonical" href="${canonical}" />`,
    `  <link rel="alternate" hreflang="${SITE.lang}" href="${canonical}" />`,
    `  <link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    meta("name", "application-name", SITE.name),
    meta("name", "apple-mobile-web-app-title", SITE.name),
    meta("name", "theme-color", SITE.themeColor),
    meta("name", "color-scheme", "dark"),
    meta("name", "format-detection", "telephone=no"),
    ...(isHome ? [meta("name", "apple-itunes-app", `app-id=${SITE.appStoreId}`)] : []),
    ...(SITE.googleVerification ? [meta("name", "google-site-verification", SITE.googleVerification)] : []),
    ...(SITE.bingVerification ? [meta("name", "msvalidate.01", SITE.bingVerification)] : []),
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", SITE.name),
    meta("property", "og:locale", SITE.locale),
    meta("property", "og:title", ogTitle),
    meta("property", "og:description", ogDesc),
    meta("property", "og:url", canonical),
    meta("property", "og:image", img),
    meta("property", "og:image:width", String(SITE.ogImage.width)),
    meta("property", "og:image:height", String(SITE.ogImage.height)),
    meta("property", "og:image:alt", SITE.ogImage.alt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", ogTitle),
    meta("name", "twitter:description", ogDesc),
    meta("name", "twitter:image", img),
    meta("name", "twitter:image:alt", SITE.ogImage.alt),
    `  <link rel="icon" href="${assetPrefix}favicon.png" type="image/png" sizes="48x48" />`,
    `  <link rel="icon" href="${assetPrefix}icon-192.png" type="image/png" sizes="192x192" />`,
    `  <link rel="shortcut icon" href="/favicon.ico" />`,
    `  <link rel="apple-touch-icon" href="${assetPrefix}apple-touch-icon.png" sizes="180x180" />`,
    `  <link rel="manifest" href="/site.webmanifest" />`,
    ...(isHome || isVariant ? [`  <link rel="preload" as="image" href="${assetPrefix}app-store-badge.svg" type="image/svg+xml" />`] : []),
    FONT_LINKS,
    ...styles.map((href) => `  <link rel="stylesheet" href="${href}" />`),
    ...(extra ? [extra] : []),
  ];
  if (!isVariant) {
    const data = isHome ? jsonLdHome(faq) : jsonLdPrivacy();
    lines.push(`  <script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n  </script>`);
  }
  return lines.join("\n");
}

/* ---------------- crawl files ---------------- */

export function sitemapXml(pages) {
  const urls = pages
    .map((p) => `  <url>\n    <loc>${p.loc}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`;

export function manifestJson() {
  return JSON.stringify(
    {
      name: SITE.appName,
      short_name: SITE.name,
      description: SITE.home.description,
      start_url: "/",
      scope: "/",
      display: "browser",
      background_color: SITE.themeColor,
      theme_color: SITE.themeColor,
      lang: SITE.lang,
      icons: [
        { src: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2
  );
}

/** llms.txt: a plain-language summary for AI search and answer engines. Public facts only. */
export function llmsTxt(faq) {
  return `# ${SITE.name}

> ${SITE.home.description}

Fundt is a personal budgeting app for people in Rwanda whose money moves on MTN MoMo. It is free on the App Store for iOS. Android is coming soon. Fundt never processes payments and never sees your MoMo PIN or balance.

## What it does
${SITE.features.map((f) => `- ${f}`).join("\n")}

## Links
- [Home](${SITE.url}/): overview and live demo
- [Download on the App Store](${SITE.appStoreUrl})
- [Privacy Policy](${SITE.url}/privacy)
- Support: ${SITE.email}

## FAQ
${faq.map(({ q, a }) => `### ${q}\n${a}`).join("\n\n")}
`;
}
