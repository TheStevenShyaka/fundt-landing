/**
 * Single source of truth for everything search engines and link previews read.
 * Edit here, then run: node scripts/build-variants.mjs
 * That regenerates index.html, the head of privacy.html, sitemap.xml, robots.txt,
 * llms.txt and site.webmanifest, so the SEO head can never drift from the page again.
 */
export const SITE = {
  url: "https://fundt.app",
  name: "Fundt",
  appName: "Fundt: Expense Tracker",
  locale: "en_GB",
  lang: "en",
  email: "support@fundt.app",
  themeColor: "#101318",

  appStoreUrl: "https://apps.apple.com/rw/app/fundt-expense-tracker/id6785270946",
  appStoreId: "6785270946",
  instagram: "https://www.instagram.com/buildingfundt.app",

  /** Paste the token Google Search Console / Bing Webmaster gives you. Empty = no tag emitted. */
  googleVerification: "",
  bingVerification: "",

  ogImage: {
    path: "assets/og-image.png",
    width: 1200,
    height: 630,
    alt: "Fundt expense tracker on an iPhone showing a month of spending sorted by category",
  },
  screenshots: ["assets/screens/fundt-home.png", "assets/screens/fundt-categories.png", "assets/screens/fundt-history.png"],

  home: {
    // ~50-60 chars: brand first, then the searches we want to win.
    title: "Fundt: Expense Tracker & Budget App",
    // ~150-160 chars: what it is, who it is for, the action.
    description:
      "Fundt is a free expense tracker and budget app. Log a spend, pick a category and stay on your monthly budget. Works with MTN MoMo in Rwanda today.",
    ogTitle: "Fundt: Expense Tracker",
    ogDescription: "Know where your money went. Log a spend, pick a category, stay on budget. MTN MoMo supported today.",
  },

  privacy: {
    title: "Privacy Policy · Fundt",
    description: "How Fundt collects, stores and protects your data. On-device by default, no sale of data, real deletion.",
  },

  features: [
    "Log spending and MTN MoMo transfers",
    "Organize spending into categories you choose",
    "Monthly budgets per category with alerts at 70%, almost full and over",
    "MoMo SMS capture and confirmation of payments started in the app",
    "Local Mode keeps data on your phone; optional Cloud Sync backup",
    "CSV export of your history",
  ],
};
