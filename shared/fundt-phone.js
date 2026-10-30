/*
 * Fundt phone: a working, demo-data replica of the Fundt iOS app for the landing hero.
 *
 * Vanilla JS, no dependencies. Mount point: <div data-fundt-phone>.
 * Screens mirror the real app (fundt repo): Home, Categories, History, category detail,
 * Review (untracked), Profile, and the Send flow (Spending -> Recipient -> USSD -> SMS confirm).
 * Layout values are in points lifted from the app's components and tokens
 * (theme/tokens.ts, TabScreenLayout, HistoryRevampRow, CategoryCardFace, GlassTabBar, ...).
 * The whole device is authored at 393x852pt and scaled to fit its container.
 *
 * All data is fake and lives in memory. Nothing is sent anywhere. Reload to reset.
 */
(() => {
  "use strict";

  const mount = document.querySelector("[data-fundt-phone]");
  if (!mount) return;

  const ASSETS = mount.dataset.assets || "assets/";
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RWF = "R₣";

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                       */
  /* ------------------------------------------------------------------ */

  const $ = (sel, root = mount) => root.querySelector(sel);
  const $$ = (sel, root = mount) => Array.from(root.querySelectorAll(sel));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const fmt = (n) => Math.round(n).toLocaleString("en-US");
  const fmtCur = (n) => `${fmt(n)} ${RWF}`;
  const fmtShortK = (n) => (n < 1000 ? String(Math.round(n)) : (n / 1000).toFixed(1).replace(/\.0$/, "") + "k");
  const fmtCurShortK = (n) => (n < 1000 ? fmtCur(n) : `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k ${RWF}`);
  const fmtWholeK = (n) => (n < 1000 ? fmtCur(n) : `${Math.round(n / 1000)}k ${RWF}`);
  /** CategoryCardFace.formatCategoryBudget */
  const fmtCardBudget = (n) => {
    if (n <= 0) return "0";
    if (n >= 1e6) return `${Number.isInteger(n / 1e6) ? n / 1e6 : (n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${Number.isInteger(n / 1e3) ? n / 1e3 : (n / 1e3).toFixed(1)}k`;
    return String(n);
  };
  const raf = (fn) => requestAnimationFrame(fn);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ------------------------------------------------------------------ */
  /* Icons (paths from components/icons/TabIcons.tsx and Ionicons-style)  */
  /* ------------------------------------------------------------------ */

  const svg = (vb, inner, cls = "") =>
    `<svg class="fp-i ${cls}" viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;
  const f = (d, extra = "") => `<path ${extra} d="${d}"/>`;

  const I = {
    homeFill: svg("0 0 24 24", f("M2.33537 7.87495C1.79491 9.00229 1.98463 10.3208 2.36407 12.9579L2.64284 14.8952C3.13025 18.2827 3.37396 19.9764 4.54903 20.9882C5.72409 22 7.44737 22 10.8939 22H13.1061C16.5526 22 18.2759 22 19.451 20.9882C20.626 19.9764 20.8697 18.2827 21.3572 14.8952L21.6359 12.9579C22.0154 10.3208 22.2051 9.00229 21.6646 7.87495C21.1242 6.7476 19.9738 6.06234 17.6731 4.69181L16.2882 3.86687C14.199 2.62229 13.1543 2 12 2C10.8457 2 9.80104 2.62229 7.71175 3.86687L6.32691 4.69181C4.02619 6.06234 2.87583 6.7476 2.33537 7.87495ZM8.2501 17.9998C8.2501 17.5856 8.58589 17.2498 9.0001 17.2498H15.0001C15.4143 17.2498 15.7501 17.5856 15.7501 17.9998C15.7501 18.414 15.4143 18.7498 15.0001 18.7498H9.0001C8.58589 18.7498 8.2501 18.414 8.2501 17.9998Z", 'fill-rule="evenodd" clip-rule="evenodd"')),
    homeOutline: svg("0 0 24 24", f("M9.00009 17.25C8.58588 17.25 8.25009 17.5858 8.25009 18C8.25009 18.4142 8.58588 18.75 9.00009 18.75H15.0001C15.4143 18.75 15.7501 18.4142 15.7501 18C15.7501 17.5858 15.4143 17.25 15.0001 17.25H9.00009Z") + f("M12 1.25024C11.2749 1.25024 10.6134 1.44936 9.88928 1.78735C9.18832 2.11453 8.37772 2.5974 7.36183 3.20257L5.90622 4.06967C4.78711 4.73631 3.89535 5.26751 3.22015 5.77549C2.52314 6.29987 1.99999 6.83985 1.65907 7.55096C1.31799 8.26243 1.22554 9.00704 1.25519 9.87609C1.2839 10.7173 1.43105 11.7399 1.61556 13.0221L1.90792 15.0539C2.14531 16.7038 2.33368 18.0131 2.61512 19.0324C2.90523 20.0832 3.31686 20.9172 4.05965 21.5568C4.80184 22.1958 5.68984 22.4817 6.77634 22.6179C7.83154 22.7503 9.16281 22.7503 10.8423 22.7502H13.1577C14.8372 22.7503 16.1685 22.7503 17.2237 22.6179C18.3102 22.4817 19.1982 22.1958 19.9404 21.5568C20.6831 20.9172 21.0948 20.0832 21.3849 19.0324C21.6663 18.0131 21.8547 16.7038 22.0921 15.054L22.3844 13.0221C22.569 11.7399 22.7161 10.7173 22.7448 9.87609C22.7745 9.00704 22.682 8.26243 22.3409 7.55096C22 6.83985 21.4769 6.29987 20.7799 5.77549C20.1047 5.26751 19.2129 4.73631 18.0938 4.06967L16.6382 3.20257C15.6223 2.5974 14.8117 2.11453 14.1107 1.78735C13.3866 1.44936 12.7251 1.25024 12 1.25024ZM8.09558 4.51146C9.15309 3.88151 9.89923 3.43805 10.5237 3.14658C11.1328 2.86228 11.5708 2.75024 12 2.75024C12.4293 2.75024 12.8672 2.86228 13.4763 3.14658C14.1008 3.43805 14.8469 3.8815 15.9044 4.51145L17.2893 5.33639C18.4536 6.02997 19.2752 6.52058 19.8781 6.97415C20.4665 7.41686 20.7888 7.78319 20.9883 8.19941C21.1877 8.61529 21.2706 9.09361 21.2457 9.82493C21.2201 10.5748 21.0856 11.5166 20.8936 12.8513L20.6148 14.7887C20.3683 16.5018 20.1921 17.7165 19.939 18.6332C19.6916 19.5291 19.3939 20.0479 18.9616 20.4201C18.5287 20.7928 17.9676 21.0129 17.037 21.1296C16.086 21.2489 14.8488 21.2502 13.1061 21.2502H10.8939C9.15124 21.2502 7.91405 21.2489 6.963 21.1296C6.03246 21.0129 5.47129 20.7928 5.03841 20.4201C4.60614 20.0479 4.30838 19.5291 4.06102 18.6332C3.80791 17.7165 3.6317 16.5018 3.3852 14.7886L3.10643 12.8513C2.91437 11.5165 2.77991 10.5748 2.75432 9.82493C2.72937 9.09361 2.81229 8.61529 3.01167 8.19941C3.21121 7.78319 3.53347 7.41686 4.12194 6.97415C4.72482 6.52058 5.54643 6.02997 6.71074 5.33639L8.09558 4.51146Z", 'fill-rule="evenodd" clip-rule="evenodd"')),
    catsFill: svg("0 0 24 24", f("M20.8021 15.8525L20.7242 16.068L20.705 16.1211L19.621 19.1211L19.6138 19.1412C19.3927 19.7531 19.2057 20.2705 19.0058 20.6758C18.7954 21.1023 18.5391 21.4726 18.1425 21.752C17.7462 22.0312 17.3127 22.146 16.8417 22.1992C16.3921 22.25 15.8418 22.25 15.1911 22.25H8.82025C8.16952 22.25 7.60777 22.25 7.15814 22.1992C6.68688 22.1459 6.25387 22.0298 5.85736 21.75C5.46073 21.471 5.20419 21.1019 4.99408 20.6758C4.79392 20.2698 4.60648 19.7511 4.38499 19.1381L3.29486 16.1211L3.27568 16.068C2.85179 14.8949 2.50514 13.9356 2.3476 13.1641C2.18446 12.365 2.18776 11.5969 2.65619 10.9238C3.12583 10.2499 3.84396 9.98451 4.64838 9.86523C5.42633 9.74997 6.44587 9.74998 7.69072 9.75H7.73627H16.2636H16.3094C17.5543 9.74998 18.5736 9.74997 19.3515 9.86523C20.156 9.98449 20.874 10.2499 21.3437 10.9238C21.8121 11.5969 21.8154 12.365 21.6523 13.1641C21.5045 13.8878 21.1903 14.7768 20.8021 15.8525Z") + f("M18.2501 8C18.2501 7.75691 18.2496 7.612 18.2423 7.50391C18.2382 7.44496 18.233 7.41558 18.2305 7.4043C18.2048 7.34441 18.1561 7.29448 18.0958 7.26953C18.0851 7.26713 18.0546 7.26186 17.9962 7.25781C17.8885 7.25038 17.7434 7.25 17.5001 7.25H6.50006C6.25697 7.25 6.11206 7.25046 6.00397 7.25781C5.93589 7.26245 5.90741 7.26864 5.90039 7.27041C5.84144 7.29635 5.79426 7.34468 5.7696 7.4043C5.7672 7.41497 5.76192 7.4455 5.75788 7.50391C5.75045 7.61161 5.75007 7.75663 5.75007 8C5.75007 8.41421 5.41428 8.75 5.00007 8.75C4.58585 8.75 4.25007 8.41421 4.25007 8C4.25006 7.77952 4.25006 7.57026 4.26178 7.40039C4.27409 7.22255 4.30178 7.02689 4.38483 6.82812C4.5622 6.401 4.90117 6.06057 5.32819 5.88281C5.52653 5.80089 5.72477 5.77382 5.90241 5.76172C6.07319 5.75012 6.27753 5.75 6.50006 5.75H17.5001C17.7205 5.75 17.9298 5.75 18.0997 5.76172C18.2775 5.77403 18.4732 5.80171 18.6719 5.88477C19.0463 6.03979 19.3528 6.31804 19.543 6.67188L19.6173 6.82812C19.6992 7.02647 19.7262 7.2247 19.7383 7.40234C19.7499 7.57313 19.7501 7.77746 19.7501 8C19.7501 8.41421 19.4143 8.75 19.0001 8.75C18.5859 8.75 18.2501 8.41421 18.2501 8Z") + f("M15.7501 4C15.7501 3.75691 15.7496 3.612 15.7423 3.50391C15.7376 3.43611 15.7315 3.40758 15.7297 3.40041C15.7036 3.34216 15.6549 3.29398 15.5958 3.26953C15.5851 3.26713 15.5546 3.26186 15.4962 3.25781C15.3885 3.25038 15.2434 3.25 15.0001 3.25H9.00006C8.75697 3.25 8.61206 3.25046 8.50397 3.25781C8.4359 3.26245 8.40741 3.26864 8.40039 3.27041C8.34144 3.29635 8.29426 3.34468 8.2696 3.4043C8.2672 3.41497 8.26192 3.4455 8.25788 3.50391C8.25045 3.61161 8.25006 3.75663 8.25006 4C8.25006 4.41421 7.91428 4.75 7.50006 4.75C7.08585 4.75 6.75006 4.40865 6.75006 3.99444C6.75006 3.77395 6.75006 3.57026 6.76178 3.40039C6.77409 3.22255 6.80178 3.02689 6.88483 2.82812C7.0622 2.401 7.40117 2.06057 7.82819 1.88281C8.02653 1.80089 8.22477 1.77382 8.40241 1.76172C8.57319 1.75012 8.77753 1.75 9.00006 1.75H15.0056C15.2261 1.75 15.4298 1.75 15.5997 1.76172C15.7775 1.77403 15.9732 1.80171 16.1719 1.88477C16.546 2.03985 16.8529 2.31826 17.043 2.67188L17.1173 2.82812C17.1992 3.02647 17.2262 3.2247 17.2383 3.40234C17.2499 3.57313 17.2501 3.77746 17.2501 4C17.2501 4.41421 16.9143 4.75 16.5001 4.75C16.0859 4.75 15.7501 4.41421 15.7501 4Z", 'fill-rule="evenodd" clip-rule="evenodd"')),
    catsOutline: svg("0 0 24 24", f("M16.2636 9.75C17.5293 9.75 18.564 9.74856 19.3515 9.86523C20.156 9.98449 20.874 10.2499 21.3437 10.9238C21.8121 11.5969 21.8154 12.365 21.6523 13.1641C21.4924 13.9472 21.1376 14.9238 20.705 16.1211L19.621 19.1211C19.3968 19.7417 19.2079 20.2661 19.0058 20.6758C18.7954 21.1023 18.5391 21.4726 18.1425 21.752C17.7462 22.0312 17.3127 22.146 16.8417 22.1992C16.3895 22.2503 15.8353 22.25 15.1796 22.25H8.82025C8.16465 22.25 7.61035 22.2503 7.15814 22.1992C6.68688 22.1459 6.25387 22.0298 5.85736 21.75C5.46073 21.471 5.20419 21.1019 4.99408 20.6758C4.79208 20.2661 4.60302 19.7415 4.37885 19.1211L3.29486 16.1211C2.86226 14.9238 2.50751 13.9472 2.3476 13.1641C2.18446 12.365 2.18776 11.5969 2.65619 10.9238C3.12583 10.2499 3.84396 9.98451 4.64838 9.86523C5.4358 9.74856 6.47072 9.75 7.73627 9.75H16.2636ZM7.73627 11.25C6.42184 11.25 5.52059 11.2512 4.86908 11.3477C4.23514 11.4416 4.01094 11.603 3.88666 11.7812C3.76217 11.9601 3.68891 12.2292 3.8183 12.8633C3.95108 13.5136 4.25784 14.3683 4.70697 15.6113L5.79096 18.6113C6.02672 19.2638 6.18336 19.6965 6.33978 20.0137C6.45066 20.2384 6.54418 20.3663 6.63275 20.4512L6.72064 20.5234C6.83689 20.6055 6.99689 20.6717 7.32611 20.709C7.67484 20.7484 8.13067 20.75 8.82025 20.75H15.1796C15.8694 20.75 16.325 20.7484 16.6738 20.709C17.0032 20.6717 17.163 20.6074 17.2792 20.5254L17.3671 20.4512C17.4561 20.3658 17.5491 20.2367 17.6601 20.0117C17.8165 19.6947 17.9733 19.2635 18.2089 18.6113L19.2929 15.6113C19.7421 14.3683 20.0488 13.5136 20.1816 12.8633C20.311 12.2291 20.2377 11.9601 20.1132 11.7812C19.9889 11.603 19.7646 11.4416 19.1308 11.3477C18.4793 11.2512 17.578 11.25 16.2636 11.25H7.73627Z") + f("M18.2501 8C18.2501 7.75691 18.2496 7.612 18.2423 7.50391C18.2382 7.44496 18.233 7.41558 18.2305 7.4043C18.2048 7.34441 18.1561 7.29448 18.0958 7.26953C18.0851 7.26713 18.0546 7.26186 17.9962 7.25781C17.8885 7.25038 17.7434 7.25 17.5001 7.25H6.50006C6.25697 7.25 6.11206 7.25046 6.00397 7.25781C5.90497 7.26455 5.88969 7.27458 5.90241 7.26953C5.84252 7.29525 5.79454 7.344 5.7696 7.4043C5.7672 7.41497 5.76192 7.4455 5.75788 7.50391C5.75045 7.61161 5.75007 7.75663 5.75007 8C5.75007 8.41421 5.41428 8.75 5.00007 8.75C4.58585 8.75 4.25007 8.41421 4.25007 8C4.25006 7.77737 4.24996 7.57169 4.26178 7.40039C4.27409 7.22255 4.30178 7.02689 4.38483 6.82812C4.5622 6.401 4.90117 6.06057 5.32819 5.88281C5.52653 5.80089 5.72477 5.77382 5.90241 5.76172C6.07319 5.75012 6.27753 5.75 6.50006 5.75H17.5001C17.7227 5.75 17.9284 5.7499 18.0997 5.76172C18.2775 5.77403 18.4732 5.80171 18.6719 5.88477C19.0463 6.03979 19.3528 6.31804 19.543 6.67188L19.6173 6.82812C19.6992 7.02647 19.7262 7.2247 19.7383 7.40234C19.7499 7.57313 19.7501 7.77746 19.7501 8C19.7501 8.41421 19.4143 8.75 19.0001 8.75C18.5859 8.75 18.2501 8.41421 18.2501 8ZM15.7501 4C15.7501 3.75691 15.7496 3.612 15.7423 3.50391C15.7355 3.4049 15.7255 3.38963 15.7305 3.40234C15.7046 3.34323 15.6555 3.29425 15.5958 3.26953C15.5851 3.26713 15.5546 3.26186 15.4962 3.25781C15.3885 3.25038 15.2434 3.25 15.0001 3.25H9.00006C8.75697 3.25 8.61206 3.25046 8.50397 3.25781C8.40497 3.26455 8.38969 3.27458 8.40241 3.26953C8.34252 3.29525 8.29454 3.344 8.2696 3.4043C8.2672 3.41497 8.26192 3.4455 8.25788 3.50391C8.25045 3.61161 8.25006 3.75663 8.25006 4C8.25006 4.41421 7.91428 4.75 7.50006 4.75C7.08585 4.75 6.75006 4.41421 6.75006 4C6.75006 3.77737 6.74996 3.57169 6.76178 3.40039C6.77409 3.22255 6.80178 3.02689 6.88483 2.82812C7.0622 2.401 7.40117 2.06057 7.82819 1.88281C8.02653 1.80089 8.22477 1.77382 8.40241 1.76172C8.57319 1.75012 8.77753 1.75 9.00006 1.75H15.0001C15.2227 1.75 15.4284 1.7499 15.5997 1.76172C15.7775 1.77403 15.9732 1.80171 16.1719 1.88477L16.17 1.88672C16.5441 2.0418 16.8529 2.31826 17.043 2.67188L17.1173 2.82812C17.1992 3.02647 17.2262 3.2247 17.2383 3.40234C17.2499 3.57313 17.2501 3.77746 17.2501 4C17.2501 4.41421 16.9143 4.75 16.5001 4.75C16.0859 4.75 15.7501 4.41421 15.7501 4Z")),
    histFill: svg("0 0 24 24", f("M12 7.5C11.4033 7.5 10.831 7.73705 10.409 8.15901C9.98705 8.58097 9.75 9.15326 9.75 9.75C9.75 10.3467 9.98705 10.919 10.409 11.341C10.831 11.7629 11.4033 12 12 12C12.5967 12 13.169 11.7629 13.591 11.341C14.0129 10.919 14.25 10.3467 14.25 9.75C14.25 9.15326 14.0129 8.58097 13.591 8.15901C13.169 7.73705 12.5967 7.5 12 7.5Z") + f("M1.5 4.875C1.5 3.839 2.34 3 3.375 3H20.625C21.66 3 22.5 3.84 22.5 4.875V14.625C22.5 15.661 21.66 16.5 20.625 16.5H3.375C3.12877 16.5 2.88495 16.4515 2.65747 16.3573C2.42998 16.263 2.22328 16.1249 2.04917 15.9508C1.87506 15.7767 1.73695 15.57 1.64273 15.3425C1.5485 15.115 1.5 14.8712 1.5 14.625V4.875ZM8.25 9.75C8.25 8.75544 8.64509 7.80161 9.34835 7.09835C10.0516 6.39509 11.0054 6 12 6C12.9946 6 13.9484 6.39509 14.6517 7.09835C15.3549 7.80161 15.75 8.75544 15.75 9.75C15.75 10.7446 15.3549 11.6984 14.6517 12.4017C13.9484 13.1049 12.9946 13.5 12 13.5C11.0054 13.5 10.0516 13.1049 9.34835 12.4017C8.64509 11.6984 8.25 10.7446 8.25 9.75ZM18.75 9C18.5511 9 18.3603 9.07902 18.2197 9.21967C18.079 9.36032 18 9.55109 18 9.75V9.758C18 10.172 18.336 10.508 18.75 10.508H18.758C18.9569 10.508 19.1477 10.429 19.2883 10.2883C19.429 10.1477 19.508 9.95691 19.508 9.758V9.75C19.508 9.55109 19.429 9.36032 19.2883 9.21967C19.1477 9.07902 18.9569 9 18.758 9H18.75ZM4.5 9.75C4.5 9.55109 4.57902 9.36032 4.71967 9.21967C4.86032 9.07902 5.05109 9 5.25 9H5.258C5.45691 9 5.64768 9.07902 5.78833 9.21967C5.92898 9.36032 6.008 9.55109 6.008 9.75V9.758C6.008 9.95691 5.92898 10.1477 5.78833 10.2883C5.64768 10.429 5.45691 10.508 5.258 10.508H5.25C5.05109 10.508 4.86032 10.429 4.71967 10.2883C4.57902 10.1477 4.5 9.95691 4.5 9.758V9.75Z", 'fill-rule="evenodd" clip-rule="evenodd"') + f("M2.25 18C2.05109 18 1.86032 18.079 1.71967 18.2197C1.57902 18.3603 1.5 18.5511 1.5 18.75C1.5 18.9489 1.57902 19.1397 1.71967 19.2803C1.86032 19.421 2.05109 19.5 2.25 19.5C7.65 19.5 12.88 20.222 17.85 21.575C19.04 21.899 20.25 21.017 20.25 19.755V18.75C20.25 18.5511 20.171 18.3603 20.0303 18.2197C19.8897 18.079 19.6989 18 19.5 18H2.25Z")),
    histOutline: svg("0 0 24 24", f("M2.25 18C7.65211 17.9948 13.0312 18.7099 18.2441 20.127C18.5072 20.1986 18.7494 20.0012 18.75 19.7559V18.75C18.75 18.3358 19.0858 18 19.5 18C19.9142 18 20.25 18.3358 20.25 18.75V19.7559C20.2495 21.0177 19.0399 21.8984 17.8496 21.5742C12.7654 20.1922 7.51871 19.4949 2.25 19.5C1.83612 19.5 1.5004 19.164 1.5 18.75C1.49999 18.3361 1.83603 18.0004 2.25 18Z") + f("M20.625 3.75C21.6602 3.75 22.5 4.58979 22.5 5.625V15.375C22.5 16.4102 21.6602 17.25 20.625 17.25H3.375C2.87772 17.25 2.40046 17.0528 2.04883 16.7012C1.6972 16.3495 1.5 15.8723 1.5 15.375V5.625C1.5 4.58979 2.33979 3.75 3.375 3.75H20.625ZM4.5 5.25C4.5 5.64782 4.34185 6.02924 4.06055 6.31055C3.77924 6.59185 3.39782 6.75 3 6.75V14.25C3.39783 14.25 3.77924 14.4081 4.06055 14.6895C4.34185 14.9708 4.5 15.3522 4.5 15.75H19.5C19.5 15.3522 19.6581 14.9708 19.9395 14.6895C20.2208 14.4081 20.6022 14.25 21 14.25V6.75C20.1718 6.75 19.5 6.07821 19.5 5.25H4.5ZM14.25 10.5C14.25 9.90326 14.0138 9.33016 13.5918 8.9082C13.1698 8.48625 12.5967 8.25 12 8.25C11.4033 8.25 10.8302 8.48625 10.4082 8.9082C9.98625 9.33016 9.75 9.90326 9.75 10.5C9.75 11.0967 9.98625 11.6698 10.4082 12.0918C10.8302 12.5138 11.4033 12.75 12 12.75C12.5967 12.75 13.1698 12.5138 13.5918 12.0918C14.0138 11.6698 14.25 11.0967 14.25 10.5ZM6.00781 9.75C6.42203 9.75 6.75781 10.0858 6.75781 10.5V10.5078C6.75781 10.922 6.42203 11.2578 6.00781 11.2578H6C5.58579 11.2578 5.25 10.922 5.25 10.5078V10.5C5.25 10.0858 5.58579 9.75 6 9.75H6.00781ZM18.0078 9.75C18.422 9.75 18.7578 10.0858 18.7578 10.5V10.5078C18.7578 10.922 18.422 11.2578 18.0078 11.2578H18C17.5858 11.2578 17.25 10.922 17.25 10.5078V10.5C17.25 10.0858 17.5858 9.75 18 9.75H18.0078ZM15.75 10.5C15.75 11.4946 15.3556 12.4491 14.6523 13.1523C13.9491 13.8556 12.9946 14.25 12 14.25C11.0054 14.25 10.0509 13.8556 9.34766 13.1523C8.64439 12.4491 8.25 11.4946 8.25 10.5C8.25 9.50544 8.64439 8.55092 9.34766 7.84766C10.0509 7.14439 11.0054 6.75 12 6.75C12.9946 6.75 13.9491 7.14439 14.6523 7.84766C15.3556 8.55092 15.75 9.50544 15.75 10.5Z")),
    sendCash: svg("0 0 24 24", f("M11.922 4.79004C16.6963 3.16245 19.0834 2.34866 20.3674 3.63261C21.6513 4.91656 20.8375 7.30371 19.21 12.078L18.1016 15.3292C16.8517 18.9958 16.2267 20.8291 15.1964 20.9808C14.9195 21.0216 14.6328 20.9971 14.3587 20.9091C13.3395 20.5819 12.8007 18.6489 11.7231 14.783C11.4841 13.9255 11.3646 13.4967 11.0924 13.1692C11.0134 13.0742 10.9258 12.9866 10.8308 12.9076C10.5033 12.6354 10.0745 12.5159 9.21705 12.2769C5.35111 11.1993 3.41814 10.6605 3.0909 9.64127C3.00292 9.36724 2.97837 9.08053 3.01916 8.80355C3.17088 7.77332 5.00419 7.14834 8.6708 5.89838L11.922 4.79004Z")),
    bell: svg("0 0 24 24", f("M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z") + f("M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z")),
    updown: svg("0 0 12 12", `<path d="M2.99658 3.99887L5.96496 1.03804C5.98449 1.01856 6.0161 1.01857 6.03561 1.03807L9.00227 4.00254M2.99658 8.00376L5.96496 10.9646C5.98449 10.9841 6.0161 10.9841 6.03561 10.9646L9.00227 8.0001" fill="none" stroke="currentColor" stroke-linecap="round"/>`, "fp-nofill"),
    budget: svg("0 0 24 24", `<path d="M19.8023 3.17032C19.8397 2.98765 19.697 2.81966 19.5105 2.82096L16.9704 2.83877L16.9873 0.298053C16.9885 0.111458 16.82 -0.0312022 16.6371 0.0059029C13.8319 0.575089 12.5423 2.02246 12.3987 5.12316C11.1366 4.29083 9.62489 3.8064 8 3.8064C3.58172 3.8064 0 7.38812 0 11.8064C0 16.2247 3.58172 19.8064 8 19.8064C12.4183 19.8064 16 16.2247 16 11.8064C16 11.2878 15.9618 10.8593 15.896 10.5133C15.8159 10.0202 15.6907 9.54231 15.5248 9.08388C15.4761 8.94924 15.3046 8.91428 15.2034 9.01553L13.0713 11.1477C13.0068 11.2121 12.9757 11.3022 12.9832 11.393C12.9943 11.5293 13 11.6672 13 11.8064C13 14.5678 10.7614 16.8064 8 16.8064C5.23858 16.8064 3 14.5678 3 11.8064C3 9.04497 5.23858 6.8064 8 6.8064C9.08198 6.8064 9.82036 7.06607 10.5718 7.51763L9.08198 9.00744C8.74632 8.8776 8.38148 8.8064 8 8.8064C6.34315 8.8064 5 10.1495 5 11.8064C5 13.4633 6.34315 14.8064 8 14.8064C9.65685 14.8064 11 13.4633 11 11.8064C11 11.4164 10.9256 11.0438 10.7902 10.7021L14.0672 7.42502C17.3295 7.42075 19.1666 6.26799 19.8023 3.17032Z" transform="translate(2.5008 1.1928)"/>`),
    arrowUR: svg("0 0 20 20", `<path d="M0.8 7.46667L7.46667 0.8M7.46667 7.46667V0.8H0.8" transform="translate(5.8667 5.8667)" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    arrowCard: svg("139.5 22 16 16", f("M143.39 34.1105C143.181 33.9021 143.181 33.5644 143.39 33.3562L150.479 26.2666H145.9C145.606 26.2666 145.367 26.0278 145.367 25.7333C145.367 25.4387 145.606 25.2 145.9 25.2H151.767C151.908 25.2 152.044 25.2561 152.144 25.3562C152.244 25.4562 152.3 25.5918 152.3 25.7333V31.6C152.3 31.8945 152.061 32.1333 151.767 32.1333C151.472 32.1333 151.233 31.8945 151.233 31.6V27.0209L144.144 34.1105C143.936 34.3187 143.598 34.3187 143.39 34.1105Z", 'fill-rule="evenodd" clip-rule="evenodd"')),
    chevR: svg("0 0 512 512", `<path d="M184 112l144 144-144 144" fill="none" stroke="currentColor" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    chevL: svg("0 0 512 512", `<path d="M328 112L184 256l144 144" fill="none" stroke="currentColor" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    chevD: svg("0 0 512 512", `<path d="M112 184l144 144 144-144" fill="none" stroke="currentColor" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    close: svg("0 0 24 24", `<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`, "fp-nofill"),
    plus: svg("0 0 24 24", `<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`, "fp-nofill"),
    check: svg("0 0 24 24", `<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    ellipsis: svg("0 0 24 24", `<circle cx="5.5" cy="12" r="1.9"/><circle cx="12" cy="12" r="1.9"/><circle cx="18.5" cy="12" r="1.9"/>`),
    download: svg("0 0 24 24", `<path d="M12 4v11m0 0l-4.2-4.2M12 15l4.2-4.2M5 19.5h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    backspace: svg("0 0 24 24", `<path d="M9 5h11a2 2 0 012 2v10a2 2 0 01-2 2H9l-6.5-7z M12.7 9.7l5 4.6M17.7 9.7l-5 4.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    trash: svg("0 0 24 24", `<path d="M4.5 7h15M9.5 7V4.8h5V7M6.5 7l.8 12.2h9.4L17.5 7M10 10.5v5.5M14 10.5v5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    pencil: svg("0 0 24 24", `<path d="M4.5 19.5l1-4.2L16.6 4.2a1.8 1.8 0 012.6 0l.6.6a1.8 1.8 0 010 2.6L8.7 18.5z M14.8 6l3.2 3.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    bookmark: svg("0 0 24 24", `<path d="M7 4.5h10a1 1 0 011 1V20l-6-4.2L6 20V5.5a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`, "fp-nofill"),
    bookmarkOff: svg("0 0 24 24", `<path d="M7 4.5h10a1 1 0 011 1V20l-6-4.2L6 20V5.5a1 1 0 011-1zM4 4l16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    person: svg("0 0 24 24", `<circle cx="12" cy="8.5" r="4"/><path d="M4 20.2c.6-3.6 3.8-5.7 8-5.7s7.4 2.1 8 5.7z"/>`),
    msg: svg("0 0 16 16", `<path d="M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 12 11H8.2L5.1 13.4a.5.5 0 0 1-.8-.4V11H4A1.5 1.5 0 0 1 2.5 9.5v-6z"/>`),
    bolt: svg("0 0 24 24", `<path d="M13 2L5 13.5h6L10 22l8-11.5h-6z"/>`),
    lock: svg("0 0 24 24", `<path d="M7 10V7.5a5 5 0 0110 0V10M6 10h12a1 1 0 011 1v8a1 1 0 01-1 1H6a1 1 0 01-1-1v-8a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    refresh: svg("0 0 24 24", `<path d="M19.5 12a7.5 7.5 0 11-2.4-5.5M19.5 4.5v4.2h-4.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>`, "fp-nofill"),
    phone: svg("0 0 24 24", `<path d="M7.2 3.5h3l1.2 4-2 1.3a11 11 0 005.8 5.8l1.3-2 4 1.2v3a2 2 0 01-2.2 2A16.5 16.5 0 015.2 5.7 2 2 0 017.2 3.5z"/>`),
  };

  // Folder silhouette from components/categories/CategoryCardArt.tsx
  const FOLDER = `<svg class="fp-folder" viewBox="0 0 168 130" preserveAspectRatio="none" aria-hidden="true"><path d="M42 0C57 0 59.4 12.9 69.6 12.9H148.8C159.404 12.9 168 19.5006 168 27.6429V114.257C168 122.399 159.404 129 148.8 129H19.2C8.59613 129 0 122.399 0 114.257V14.7429C0 6.6006 8.59613 0 19.2 0H42Z"/></svg>`;

  /* ------------------------------------------------------------------ */
  /* Budget status (lib/budgetStatus.ts)                                  */
  /* ------------------------------------------------------------------ */

  const STATE_COLOR = {
    safe: "#22c55e",
    warning: "#fbbf24",
    critical: "#f97316",
    over: "#ef4444",
    none: "rgba(255,255,255,.16)",
  };
  const TRACK = "rgba(255,255,255,.12)";
  const stateOf = (spent, budget) => {
    if (!budget || budget <= 0) return "none";
    const pct = (spent / budget) * 100;
    return pct >= 100 ? "over" : pct >= 90 ? "critical" : pct >= 70 ? "warning" : "safe";
  };
  const LEGEND = [
    ["safe", "safe"],
    ["warning", "warning"],
    ["critical", "critical"],
    ["over", "over"],
  ];

  /** allocateSpentBudgetBarSegments: filled width = spent/budget, coloured by state weight. */
  function allocateSegments(spentByState, totalSpent, totalBudget, count) {
    if (totalBudget <= 0 || totalSpent <= 0) return Array(count).fill("none");
    const filled = clamp(Math.round((totalSpent / totalBudget) * count), 0, count);
    const keys = LEGEND.map((l) => l[0]);
    const sum = keys.reduce((a, k) => a + spentByState[k], 0);
    const quotas = keys.map((k) => {
      const exact = sum > 0 ? (spentByState[k] / sum) * filled : 0;
      return { k, n: Math.floor(exact), r: exact - Math.floor(exact) };
    });
    let assigned = quotas.reduce((a, q) => a + q.n, 0);
    const byRem = [...quotas].sort((a, b) => b.r - a.r);
    for (let i = 0; assigned < filled && byRem.length; i++, assigned++) byRem[i % byRem.length].n++;
    const out = [];
    quotas.forEach((q) => { for (let i = 0; i < q.n; i++) out.push(q.k); });
    while (out.length < count) out.push("none");
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Demo clock and seed data                                            */
  /* ------------------------------------------------------------------ */

  // "Today" in the demo is the 24th of the visitor's current month, 14:32, then it ticks.
  // That keeps Today/Yesterday and "this month" fully populated whatever day the page is opened.
  const REAL = new Date();
  const Y = REAL.getFullYear();
  const M = REAL.getMonth();
  const ANCHOR = new Date(Y, M, 24, 14, 32).getTime();
  const T_LOAD = Date.now();
  const demoNow = () => Math.min(ANCHOR + (Date.now() - T_LOAD), new Date(Y, M, 24, 23, 58).getTime());
  const stamp = (daysAgo, hm) => {
    const [h, m] = hm.split(":").map(Number);
    return new Date(Y, M, 24 - daysAgo, h, m).getTime();
  };
  const monthKey = (t) => { const d = new Date(t); return d.getFullYear() * 100 + d.getMonth(); };
  const CUR_MK = monthKey(ANCHOR);
  const PREV_MK = monthKey(new Date(Y, M - 1, 1).getTime());
  const monthName = (mkNum, style = "long") =>
    new Date(Math.floor(mkNum / 100), mkNum % 100, 1).toLocaleString("en-US", { month: style });
  const dayKey = (t) => { const d = new Date(t); return d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate(); };
  const TODAY_KEY = dayKey(ANCHOR);
  const YESTERDAY_KEY = dayKey(ANCHOR - 864e5);

  const fmtTime = (t) => {
    const d = new Date(t);
    const h = d.getHours();
    return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
  };
  const fmtClock = (t) => {
    const d = new Date(t);
    return `${d.getHours() % 12 || 12}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  const fmt24 = (t) => {
    const d = new Date(t);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  const sectionTitle = (key, t) => {
    if (key === TODAY_KEY) return "Today";
    if (key === YESTERDAY_KEY) return "Yesterday";
    return new Date(t).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
  };
  const timeAgo = (t) => {
    const m = Math.floor((demoNow() - t) / 60000);
    if (m < 60) return m <= 1 ? "Just now" : `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };
  const fmtRecipient = (r) => {
    const d = String(r).replace(/\s/g, "");
    return /^07\d{8}$/.test(d) ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : r;
  };

  const CATS_SEED = [
    { id: "rent", name: "Rent", icon: "\u{1F3E0}" },
    { id: "groceries", name: "Groceries", icon: "\u{1F6D2}" },
    { id: "restaurants", name: "Restaurants", icon: "\u{1F37D}️" },
    { id: "transport", name: "Transport", icon: "\u{1F68C}" },
    { id: "electricity", name: "Electricity", icon: "⚡" },
    { id: "phone", name: "Phone Bill", icon: "\u{1F4F1}" },
    { id: "health", name: "Health & Wellness", icon: "\u{1F48A}" },
    { id: "family", name: "Friends & Family", icon: "\u{1F468}‍\u{1F469}‍\u{1F467}" },
  ];
  const BUDGETS_SEED = { rent: 160000, groceries: 120000, restaurants: 50000, transport: 60000, electricity: 30000, health: 30000 };
  const EMOJIS = ["\u{1F68C}", "\u{1F6D2}", "⚡", "\u{1F4F1}", "\u{1F37D}️", "\u{1F48A}", "\u{1F3AC}", "\u{1F3E0}", "\u{1F4DA}", "✈️", "\u{1F4B0}", "\u{1F3CB}️", "\u{1F3AE}", "\u{1F43E}", "\u{1F457}", "☕", "\u{1F354}", "\u{1F697}", "\u{1F951}", "\u{1F9FA}", "\u{1F381}"];

  const NO_FEE = new Set(["MTN Airtime", "Cash Power"]);
  const feeFor = (amount, who) => (NO_FEE.has(who) ? 0 : amount <= 1000 ? 20 : amount <= 10000 ? 100 : amount <= 150000 ? 250 : 1500);

  const CONTACTS = [
    { name: "Aline UWASE", num: "0788123456" },
    { name: "Eric NSHIMIYIMANA", num: "0782345678" },
    { name: "Divine UWASE", num: "0791234567" },
    { name: "Josiane UWIMANA", num: "0788765432" },
  ];
  const SMS_NAMES = ["Claude MUGISHA", "Sandrine UMUTONI", "Olivier NIYITEGEKA", "Bernadette MUKAMANA"];

  // [daysAgo, "HH:MM", amount, categoryId|null, recipient, {pending}]
  const SEED = [
    [0, "07:45", 1200, "transport", "Eric NSHIMIYIMANA"],
    [0, "09:10", 6500, "restaurants", "Divine UWASE"],
    [0, "12:40", 3000, null, "Patrick HABIMANA"],
    [0, "14:20", 12000, "restaurants", "0788123456", { pending: true }],
    [1, "19:21", 5000, null, "Aline UWASE"],
    [1, "18:05", 800, "transport", "Eric NSHIMIYIMANA"],
    [1, "13:15", 18400, "groceries", "Solange MUKAMANA"],
    [1, "08:30", 2000, "phone", "MTN Airtime"],
    [2, "20:10", 8000, "electricity", "Cash Power"],
    [2, "13:30", 9500, "restaurants", "Divine UWASE"],
    [2, "08:00", 1500, "transport", "Eric NSHIMIYIMANA"],
    [3, "17:45", 22000, "groceries", "Solange MUKAMANA"],
    [3, "11:00", 12000, "health", "Kimironko Pharmacy"],
    [4, "19:00", 15000, "family", "Josiane UWIMANA"],
    [5, "10:20", 2500, null, "Joël NIYONSENGA"],
    [6, "08:10", 2400, "transport", "Eric NSHIMIYIMANA"],
    [8, "16:30", 7500, "restaurants", "Divine UWASE"],
    [8, "11:15", 5500, "transport", "Eric NSHIMIYIMANA"],
    [9, "12:00", 31000, "groceries", "Solange MUKAMANA"],
    [10, "15:40", 4000, null, "Patrick HABIMANA"],
    [11, "07:50", 6000, "transport", "Eric NSHIMIYIMANA"],
    [12, "10:05", 24000, "health", "Kimironko Pharmacy"],
    [13, "08:20", 4500, "transport", "Eric NSHIMIYIMANA"],
    [14, "18:30", 4000, "phone", "MTN Airtime"],
    [15, "09:00", 150000, "rent", "Jean Pierre NDAYISABA"],
    [17, "19:45", 20000, "family", "Josiane UWIMANA"],
    [18, "13:10", 11000, "restaurants", "Divine UWASE"],
    [19, "08:00", 7500, "transport", "Eric NSHIMIYIMANA"],
    [20, "17:20", 15000, "groceries", "Solange MUKAMANA"],
    [20, "12:00", 8500, "restaurants", "Divine UWASE"],
    [21, "07:55", 6000, "transport", "Eric NSHIMIYIMANA"],
    [21, "18:05", 17000, "electricity", "Cash Power"],
    [22, "14:00", 30000, "family", "Josiane UWIMANA"],
    [23, "10:00", 3000, "phone", "MTN Airtime"],
    // last month
    [26, "18:00", 19000, "groceries", "Solange MUKAMANA"],
    [33, "12:30", 24000, "groceries", "Solange MUKAMANA"],
    [45, "16:00", 21500, "groceries", "Solange MUKAMANA"],
    [28, "13:00", 8000, "restaurants", "Divine UWASE"],
    [38, "19:30", 12500, "restaurants", "Divine UWASE"],
    [27, "08:00", 4000, "transport", "Eric NSHIMIYIMANA"],
    [35, "09:30", 6500, "transport", "Eric NSHIMIYIMANA"],
    [42, "07:40", 3500, "transport", "Eric NSHIMIYIMANA"],
    [48, "08:15", 5000, "transport", "Eric NSHIMIYIMANA"],
    [36, "20:00", 20000, "electricity", "Cash Power"],
    [30, "10:00", 3000, "phone", "MTN Airtime"],
    [44, "11:20", 9500, "health", "Kimironko Pharmacy"],
    [31, "17:00", 25000, "family", "Josiane UWIMANA"],
    [40, "09:00", 150000, "rent", "Jean Pierre NDAYISABA"],
    [50, "14:00", 6000, null, "Patrick HABIMANA"],
  ];

  let uid = 0;
  const nextId = () => `t${++uid}`;

  /* ------------------------------------------------------------------ */
  /* State                                                               */
  /* ------------------------------------------------------------------ */

  let S;
  function freshState() {
    return {
      tab: "home",
      stack: [],          // pushed screens: {type, id?, mode?, period?}
      sheet: null,
      workspace: "personal",
      period: "month",    // History period: month | last | all
      catFilter: "all",
      pinned: [],
      cats: CATS_SEED.map((c) => ({ ...c })),
      budgets: { ...BUDGETS_SEED },
      txs: SEED.map(([d, hm, amount, cat, who, o = {}]) => ({
        id: nextId(),
        t: stamp(d, hm),
        amount,
        cat,
        who,
        fee: o.pending ? 0 : feeFor(amount, who),
        pending: !!o.pending,
        manual: false,
      })),
    };
  }

  /* ---------- derived data ---------- */

  const catById = (id) => S.cats.find((c) => c.id === id);
  const inPeriod = (t, p) => p === "all" || monthKey(t.t) === (p === "last" ? PREV_MK : CUR_MK);
  const settled = (txs) => txs.filter((t) => !t.pending);
  const sum = (txs) => txs.reduce((a, t) => a + t.amount, 0);
  const spentIn = (catId, p = "month") => sum(settled(S.txs).filter((t) => t.cat === catId && inPeriod(t, p)));
  const untracked = (p = "month") => S.txs.filter((t) => t.cat == null && inPeriod(t, p));
  const periodLabel = (p) => (p === "month" ? "This month" : p === "last" ? monthName(PREV_MK) : "All time");

  function budgetSummary() {
    const budgeted = S.cats.filter((c) => (S.budgets[c.id] || 0) > 0);
    const totalBudget = budgeted.reduce((a, c) => a + S.budgets[c.id], 0);
    const spentByState = { safe: 0, warning: 0, critical: 0, over: 0 };
    const counts = { safe: 0, warning: 0, critical: 0, over: 0 };
    let spentBudgeted = 0;
    budgeted.forEach((c) => {
      const s = spentIn(c.id);
      spentBudgeted += s;
      const st = stateOf(s, S.budgets[c.id]);
      counts[st]++;
      if (s > 0) spentByState[st] += s;
    });
    return { budgeted, totalBudget, spentBudgeted, spentByState, counts };
  }

  /* ------------------------------------------------------------------ */
  /* Markup: device shell                                                */
  /* ------------------------------------------------------------------ */

  function shell() {
    return `
<div class="fp-scale">
  <div class="fp-device">
    <i class="fp-btn fp-btn-l1"></i><i class="fp-btn fp-btn-l2"></i><i class="fp-btn fp-btn-l3"></i><i class="fp-btn fp-btn-r"></i>
    <div class="fp-screen" role="group" aria-label="Interactive demo of the Fundt app. All data is fake.">
      <div class="fp-views">
        <section class="fp-view" data-view="home" aria-label="Home"></section>
        <section class="fp-view" data-view="categories" aria-label="Categories"></section>
        <section class="fp-view" data-view="history" aria-label="History"></section>
      </div>
      <nav class="fp-tabbar" aria-label="Fundt">
        <div class="fp-pill" role="tablist" style="--i:0">
          <span class="fp-cap" aria-hidden="true"></span>
          <button class="fp-tab" role="tab" data-act="tab" data-tab="home" aria-selected="true"><span class="fp-tab-i"><span class="on">${I.homeFill}</span><span class="off">${I.homeOutline}</span></span><span class="fp-tab-l">Home</span></button>
          <button class="fp-tab" role="tab" data-act="tab" data-tab="categories" aria-selected="false"><span class="fp-tab-i"><span class="on">${I.catsFill}</span><span class="off">${I.catsOutline}</span></span><span class="fp-tab-l">Categories</span></button>
          <button class="fp-tab" role="tab" data-act="tab" data-tab="history" aria-selected="false"><span class="fp-tab-i"><span class="on">${I.histFill}</span><span class="off">${I.histOutline}</span></span><span class="fp-tab-l">History</span></button>
        </div>
        <button class="fp-fab" data-act="fab" aria-label="Send money">${I.sendCash}</button>
      </nav>
      <div class="fp-stack"></div>
      <div class="fp-sheets"></div>
      <div class="fp-over"></div>
      <div class="fp-banner" aria-live="polite"></div>
      <div class="fp-toasts" aria-live="polite"></div>
      <div class="fp-status" aria-hidden="true">
        <span class="fp-clock"></span>
        <span class="fp-sys">
          <svg viewBox="0 0 18 12" class="fp-sig"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
          <svg viewBox="0 0 17 12" class="fp-wifi"><path d="M8.5 2.3c2.3 0 4.4.9 6 2.4.2.2.5.2.7 0l.9-.9a.5.5 0 000-.7A11.3 11.3 0 008.5 0C5.5 0 2.7 1.1.5 3.1a.5.5 0 000 .7l.9.9c.2.2.5.2.7 0a8.6 8.6 0 016.4-2.4zm0 3.7c1.3 0 2.5.5 3.5 1.3.2.2.5.2.6 0l.9-.9a.5.5 0 000-.7 7.4 7.4 0 00-10 0 .5.5 0 000 .7l.9.9c.2.2.5.2.6 0 1-.8 2.2-1.3 3.5-1.3zm2.1 3.1a.5.5 0 000-.7 3.6 3.6 0 00-4.2 0 .5.5 0 000 .7l1.8 1.8c.3.3.7.3 1 0z"/></svg>
          <svg viewBox="0 0 27 13" class="fp-bat"><rect x=".5" y=".5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="20" height="9" rx="2.6"/><path d="M25 4.5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2z" opacity=".45"/></svg>
        </span>
      </div>
      <div class="fp-island" aria-hidden="true"></div>
      <div class="fp-homebar" aria-hidden="true"></div>
    </div>
  </div>
</div>
<p class="fp-caption" data-fp-caption>Demo data. Tap around, then hit Send.</p>`;
  }

  /* ------------------------------------------------------------------ */
  /* Markup: shared pieces                                               */
  /* ------------------------------------------------------------------ */

  const catIconAttr = (n) => esc(n);

  function ring(spent, budget, size = 16) {
    const sw = Math.max(2, size * (2 / 14));
    const r = (size - sw) / 2;
    const c = 2 * Math.PI * r;
    const pct = budget > 0 ? (spent / budget) * 100 : 0;
    const dash = c - (Math.min(pct, 100) / 100) * c;
    const color = STATE_COLOR[stateOf(spent, budget)];
    return `<svg class="fp-ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${TRACK}" stroke-width="${sw}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-dasharray="${c} ${c}" stroke-dashoffset="${dash}" transform="rotate(-90 ${size / 2} ${size / 2})"/></svg>`;
  }

  const count = (target, key, fmtName = "plain") =>
    `<span data-count="${Math.round(target)}" data-key="${key}" data-fmt="${fmtName}">${fmtFor(fmtName, target)}</span>`;
  function fmtFor(name, n) {
    return name === "wholek" ? fmtWholeK(n) : name === "k" ? fmtShortK(n) : fmt(n);
  }

  function header(kind, o = {}) {
    if (kind === "home") {
      const n = untracked().length;
      const wsLabel = S.workspace === "personal" ? "Personal funds" : "Shared funds";
      return `<header class="fp-hdr fp-hdr-home">
        <button class="fp-ws" data-act="workspace" aria-label="Select workspace, ${wsLabel}">
          <span class="fp-logo"><img src="${ASSETS}icon-96.png" alt="" width="36" height="36" draggable="false"></span>
          <span class="fp-ws-t"><b>Fundt</b><span class="fp-ws-s">${wsLabel}${I.updown}</span></span>
        </button>
        <div class="fp-hdr-r">
          <button class="fp-glass fp-bell" data-act="bell" aria-label="Notifications${n ? `, ${n} uncategorized` : ""}">${I.bell}${n ? `<i class="fp-badge">${n > 99 ? "99+" : n}</i>` : ""}</button>
          <button class="fp-avatar" data-act="avatar" aria-label="Open profile"><img src="${ASSETS}default-avatar.png" alt="" width="44" height="44" draggable="false"></button>
        </div>
      </header>`;
    }
    return `<header class="fp-hdr fp-hdr-title"><h1>${o.title}</h1>${o.trailing || '<span class="fp-hdr-sp"></span>'}</header>`;
  }

  /** History / detail row (HistoryRevampRow + UntrackedExpenseRow). */
  function txRow(tx, { last = false, badge = true } = {}) {
    const cat = tx.cat ? catById(tx.cat) : null;
    const isUn = !cat;
    const title = tx.pending
      ? cat
        ? esc(cat.name)
        : esc(fmt(tx.amount))
      : isUn
        ? esc(fmt(tx.amount))
        : esc(cat.name);
    const sub = tx.pending ? "Waiting for SMS Confirmation" : tx.manual ? "Manual entry" : esc(fmtRecipient(tx.who));
    const fee = !tx.pending && tx.fee > 0 ? `<b class="fp-fee">+${fmt(tx.fee)} ${RWF}</b><i class="fp-d"></i>` : "";
    const dot = tx.pending ? `<i class="fp-pend" aria-hidden="true"></i>` : "";
    const bdg = badge ? `<span class="fp-lead-b">${isUn ? I.ellipsis : cat.icon}</span>` : "";
    let trail;
    if (tx.pending) trail = `<span class="fp-trail fp-tcta">Confirm ${I.check}</span>`;
    else if (isUn) trail = `<span class="fp-trail fp-tcta">${I.plus} Categorize</span>`;
    else trail = `<span class="fp-trail"><b>${fmt(tx.amount)}</b>${I.chevR}</span>`;
    const label = tx.pending
      ? `Pending transaction, ${fmtCur(tx.amount)}. Confirm.`
      : isUn
        ? `Categorize ${fmtCur(tx.amount)} to ${tx.who}`
        : `${cat.name}, ${fmtCur(tx.amount)}, ${tx.who}`;
    return `<div class="fp-inset"><button class="fp-trow${last ? "" : " bd"}" data-act="tx" data-id="${tx.id}" aria-label="${esc(label)}">
      <span class="fp-lead">${dot}<span class="fp-lead-c">${I.histOutline}</span>${bdg}</span>
      <span class="fp-mid">
        <span class="fp-tt"><b>${title}</b><i class="fp-d"></i><span class="fp-time">${fmtTime(tx.t)}</span></span>
        <span class="fp-ts">${fee}<span>${sub}</span></span>
      </span>${trail}</button></div>`;
  }

  /** Day-grouped sections, pending pinned on top (lib/historyGroup.ts). */
  function sectionsHtml(txs, o = {}) {
    const pending = txs.filter((t) => t.pending).sort((a, b) => b.t - a.t);
    const rest = txs.filter((t) => !t.pending);
    const map = new Map();
    rest.forEach((t) => {
      const k = dayKey(t.t);
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(t);
    });
    const days = [...map.keys()].sort((a, b) => b - a);
    let out = "";
    if (pending.length) {
      out += `<div class="fp-sec"><div class="fp-sec-h"><h3 class="fp-sec-pend">${pending.length === 1 ? "Pending Transaction" : "Pending Transactions"}</h3></div>${pending
        .map((t, i) => txRow(t, { last: i === pending.length - 1, badge: o.badge !== false }))
        .join("")}</div>`;
    }
    days.forEach((k) => {
      const list = map.get(k).sort((a, b) => b.t - a.t);
      out += `<div class="fp-sec"><div class="fp-sec-h"><h3>${sectionTitle(k, list[0].t)}</h3><span class="fp-sec-t">${fmtCur(sum(list))}</span></div>${list
        .map((t, i) => txRow(t, { last: i === list.length - 1, badge: o.badge !== false }))
        .join("")}</div>`;
    });
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Home                                                                */
  /* ------------------------------------------------------------------ */

  function homeRow(c) {
    const spent = spentIn(c.id);
    const budget = S.budgets[c.id] || 0;
    const has = budget > 0;
    const last = settled(S.txs).filter((t) => t.cat === c.id).sort((a, b) => b.t - a.t)[0];
    const pinned = S.pinned.includes(c.id);
    const right = has
      ? `<span class="fp-cat-tr fp-cat-tr-b">${ring(spent, budget, 16)}<b>${Math.round((spent / budget) * 100)}%</b></span>`
      : `<span class="fp-cat-tr"><b>${fmt(spent)}</b></span>`;
    return `<div class="fp-sw" data-id="${c.id}">
      <span class="fp-sw-a fp-sw-pin">${pinned ? I.bookmarkOff : I.bookmark}<em>${pinned ? "Unpin" : "Pin"}</em></span>
      <span class="fp-sw-a fp-sw-add">${I.plus}<em>Add</em></span>
      <button class="fp-row" data-act="cat-open" data-id="${c.id}" aria-label="View ${esc(c.name)} spending">
        <span class="fp-cat-i">${c.icon}</span>
        <span class="fp-cat-b"><b>${esc(c.name)}</b><span class="fp-cat-s">${
          last ? `<span>${timeAgo(last.t)}</span><i>•</i><span class="fp-cat-m">${fmtCur(last.amount)}</span>` : "<span>No transactions yet</span>"
        }</span></span>${right}<span class="fp-cat-c">${I.chevR}</span>
      </button></div>`;
  }

  function renderHome() {
    const total = sum(settled(S.txs).filter((t) => inPeriod(t, "month")));
    const bs = budgetSummary();
    const pct = bs.totalBudget > 0 ? Math.round((bs.spentBudgeted / bs.totalBudget) * 100) : null;
    const pillColor = bs.totalBudget > 0 ? STATE_COLOR[stateOf(bs.spentBudgeted, bs.totalBudget)] : "#8b8d98";
    const nUn = untracked().length;
    const sorted = [...S.pinned.map(catById).filter(Boolean), ...S.cats.filter((c) => !S.pinned.includes(c.id))];
    return `${header("home")}
    <div class="fp-scroll"><div class="fp-pad-b">
      <div class="fp-dash-outer"><div class="fp-card fp-dash">
        <div class="fp-dash-info">
          <div class="fp-dash-label">${monthName(CUR_MK, "short").toUpperCase()}. SPENDING</div>
          <div class="fp-dash-amt-row"><span class="fp-dash-amt">${count(total, "home-total")}</span><span class="fp-dash-cur">${RWF}</span></div>
          <div class="fp-bud-row">
            <span class="fp-bud-ico">${I.budget}</span>
            ${bs.totalBudget > 0 ? `<span class="fp-bud-amt">${fmt(bs.totalBudget)}</span><span class="fp-bud-pill" style="--c:${pillColor}">-${pct}%</span>` : `<span class="fp-bud-none">No budget set</span>`}
          </div>
        </div>
        <button class="fp-vpill" data-act="view-all" aria-label="View all transactions"><span>View</span>${I.arrowUR}</button>
      </div></div>
      ${nUn > 0 ? `<div class="fp-inset fp-mb8"><button class="fp-banner-card" data-act="bell"><span class="fp-bn-i">${I.histFill}</span><span class="fp-bn-t">${nUn === 1 ? "1 Transaction needs review" : `${nUn} Transactions need review`}</span>${I.chevR}</button></div>` : ""}
      <div class="fp-secbar"><h2>Expense categories</h2><button class="fp-new" data-act="new-cat" aria-label="New category">${I.plus}<span>New</span></button></div>
      <div class="fp-list">${sorted.map(homeRow).join("")}</div>
    </div></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Categories                                                          */
  /* ------------------------------------------------------------------ */

  function catCard(c) {
    const budget = S.budgets[c.id] || 0;
    const spent = spentIn(c.id);
    const has = budget > 0;
    const pct = has ? `${Math.min(999, Math.round((spent / budget) * 100))}%` : null;
    return `<button class="fp-card-cat" data-act="cat-open" data-id="${c.id}" aria-label="${esc(c.name)}, budget ${fmtCardBudget(budget)}${pct ? `, ${pct} spent` : ""}">
      ${FOLDER}
      <span class="fp-cc-in">
        <span class="fp-cc-top"><span class="fp-cc-e">${c.icon}</span>${I.arrowCard}</span>
        <span class="fp-cc-bot"><b class="fp-cc-n">${esc(c.name)}</b><i class="fp-groove"></i>
          <span class="fp-cc-b"><span class="fp-cc-bl${has ? "" : " off"}">${I.budget}<b>${fmtCardBudget(budget)}</b></span>${pct ? `<span class="fp-cc-br">${ring(spent, budget, 14)}<span>${pct}</span></span>` : ""}</span>
        </span>
      </span></button>`;
  }

  function renderCategories() {
    const bs = budgetSummary();
    const overallPct = bs.totalBudget > 0 ? Math.round((bs.spentBudgeted / bs.totalBudget) * 100) : 0;
    const segs = allocateSegments(bs.spentByState, bs.spentBudgeted, bs.totalBudget, 50);
    const unb = S.cats.filter((c) => !(S.budgets[c.id] > 0));
    const list = S.catFilter === "unbudgeted" ? unb : S.cats;
    const needs = bs.counts.warning + bs.counts.critical + bs.counts.over > 0;
    const legend = LEGEND.filter(([s]) => bs.counts[s] > 0);
    const emptyDash = bs.totalBudget <= 0;
    const addCard = `<button class="fp-card-add" data-act="new-cat" aria-label="Add new category"><span class="fp-ca-t"><b>Add new</b><span>Tap to add a category.</span></span><span class="fp-ca-p">${I.plus}</span></button>`;
    return `${header("title", { title: "Categories", trailing: `<button class="fp-glass fp-hbtn" data-act="new-cat" aria-label="New category">${I.plus}</button>` })}
    <div class="fp-scroll"><div class="fp-pad-b">
      <div class="fp-dash-outer fp-dash-outer-lt"><div class="fp-card fp-cdash${needs ? " needs" : ""}">
        <div class="fp-cd-top"><span class="fp-cd-l"><span class="fp-cd-lab">SPENT</span>${emptyDash ? "" : `<span class="fp-cd-badge">${overallPct}%</span>`}</span><span class="fp-cd-lab">TOTAL BUDGET</span></div>
        <div class="fp-segs" style="--n:${segs.length}">${segs.map((s, i) => `<i style="--i:${i};--c:${STATE_COLOR[s] && s !== "none" ? STATE_COLOR[s] : TRACK}"></i>`).join("")}</div>
        <div class="fp-cd-amts">
          <span class="fp-cd-spent${emptyDash ? " empty" : ""}">${count(bs.spentBudgeted, "cat-spent")}${emptyDash ? "" : `<em>${RWF}</em>`}</span>
          <span class="fp-cd-total${emptyDash ? " empty" : ""}">${count(bs.totalBudget, "cat-total")}${emptyDash ? "" : `<em>${RWF}</em>`}</span>
        </div>
        ${legend.length ? `<div class="fp-leg"><i class="fp-groove"></i><div class="fp-leg-r">${legend.map(([s, l], i) => `<span class="fp-leg-i">${i ? "<u>·</u>" : ""}<i style="background:${STATE_COLOR[s]}"></i>${bs.counts[s]} ${l}</span>`).join("")}</div></div>` : ""}
      </div></div>
      <div class="fp-chips" role="group" aria-label="Filter">
        <button class="fp-chipf${S.catFilter === "all" ? " on" : ""}" data-act="filter" data-f="all">All&nbsp;&nbsp;${S.cats.length}</button>
        <button class="fp-chipf${S.catFilter === "unbudgeted" ? " on" : ""}" data-act="filter" data-f="unbudgeted">Unbudgeted Only&nbsp;&nbsp;${unb.length}</button>
      </div>
      <div class="fp-grid">${addCard}${list.map(catCard).join("")}</div>
    </div></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* History                                                             */
  /* ------------------------------------------------------------------ */

  function trendSlices(txs) {
    const totals = new Map();
    let un = 0;
    settled(txs).forEach((t) => {
      if (t.cat == null) un += t.amount;
      else totals.set(t.cat, (totals.get(t.cat) || 0) + t.amount);
    });
    const cand = [...totals.entries()].map(([id, v]) => ({ id, v, kind: "cat" }));
    if (un > 0) cand.push({ id: null, v: un, kind: "un" });
    cand.sort((a, b) => b.v - a.v);
    return cand.slice(0, 5);
  }

  function chartHtml(slices) {
    if (!slices.length) return `<p class="fp-empty">No categorized spending in this period yet.</p>`;
    const max = Math.max(...slices.map((s) => s.v), 1);
    return `<div class="fp-chart">${slices
      .map((s, i) => {
        const h = i === 0 ? 168 : Math.max(44, Math.round((s.v / max) * 168));
        const c = s.kind === "cat" ? catById(s.id) : null;
        const label = c ? c.name : "Uncategorized";
        return `<button class="fp-col" data-act="bar" data-id="${s.id || ""}" style="--i:${i}" aria-label="View ${esc(label)} spending, ${fmtShortK(s.v)}">
          <span class="fp-amtb">${fmtShortK(s.v)}</span>
          <span class="fp-bar" style="height:${h}px"><span class="fp-bar-pill${i === 0 ? " lead" : ""}">${c ? c.icon : '<i class="fp-dots">●●●</i>'}</span></span>
        </button>`;
      })
      .join("")}</div>`;
  }

  function renderHistory() {
    const txs = S.txs.filter((t) => inPeriod(t, S.period));
    const total = sum(settled(txs));
    const fees = settled(txs).reduce((a, t) => a + (t.fee || 0), 0);
    return `${header("title", { title: "History", trailing: `<button class="fp-glass fp-hbtn" data-act="export" aria-label="Export history as CSV">${I.download}</button>` })}
    <div class="fp-scroll"><div class="fp-pad-b fp-hist">
      <div class="fp-hero">
        <button class="fp-period fp-glass" data-act="period" aria-label="Select period, ${periodLabel(S.period)}"><span>${periodLabel(S.period)}</span>${I.chevD}</button>
        <div class="fp-hero-amt"><span class="fp-h-amt">${count(total, "hist-total-" + S.period)}<em>${RWF}</em></span>${fees > 0 ? `<span class="fp-fees">+ Fees <b>${fmt(fees)}</b></span>` : ""}</div>
        ${chartHtml(trendSlices(txs))}
      </div>
      ${txs.length ? sectionsHtml(txs) : `<p class="fp-empty fp-inset">No transactions in this period yet. Use Send to add one.</p>`}
    </div></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Stack screens: category detail, review, profile                     */
  /* ------------------------------------------------------------------ */

  function stackHeader(title, right = "") {
    return `<header class="fp-nav"><button class="fp-glass fp-nbtn" data-act="back" aria-label="Back">${I.chevL}</button><h2>${esc(title)}</h2>${right || '<span class="fp-nbtn-sp"></span>'}</header>`;
  }

  function gaugeData(c, period, mode) {
    const budget = S.budgets[c.id] || 0;
    const spent = spentIn(c.id, period);
    let comparison = null;
    if (period === "month" || period === "last") {
      const cur = period === "month" ? CUR_MK : PREV_MK;
      const prevMk = period === "month" ? PREV_MK : monthKey(new Date(Y, M - 2, 1).getTime());
      const prev = sum(settled(S.txs).filter((t) => t.cat === c.id && monthKey(t.t) === prevMk));
      void cur;
      if (prev > 0) comparison = { cur: spent, prev, label: monthName(prevMk) };
    }
    const remaining = budget - spent;
    const ratio = budget > 0 ? clamp(remaining / budget, 0, 1) : 0;
    const cmpMax = comparison ? Math.max(comparison.cur, comparison.prev, 1) : 1;
    const cmpRatio = comparison ? comparison.cur / cmpMax : spent > 0 ? 1 : 0;
    const filled = Math.round(clamp(mode === "budget" ? ratio : cmpRatio, 0, 1) * 36);
    const state = stateOf(spent, budget);
    const color = mode === "budget" ? (budget > 0 ? STATE_COLOR[state] : TRACK) : "#0090ff";
    return { budget, spent, comparison, remaining, filled, state, color };
  }

  function renderDetail(sc) {
    const c = catById(sc.id);
    if (!c) return stackHeader("Category");
    const g = gaugeData(c, sc.period, sc.mode);
    const txs = S.txs.filter((t) => t.cat === c.id && inPeriod(t, sc.period));
    let center, sub, metrics;
    if (sc.mode === "expense") {
      center = g.comparison ? g.comparison.cur : g.spent;
      if (g.comparison) {
        const diff = g.comparison.cur - g.comparison.prev;
        const p = Math.round((diff / g.comparison.prev) * 100);
        const col = p === 0 ? "var(--muted)" : p > 0 ? "#FF453A" : "#30D158";
        sub = `<span class="fp-trend" style="color:${col}">${p === 0 ? "" : p > 0 ? "+" : "-"}${Math.abs(p)}%<em> vs ${g.comparison.label}</em></span>`;
        metrics = `<div class="fp-metric"><span>${g.comparison.label} spending</span><b>${fmtCurShortK(g.comparison.prev)}</b></div><div class="fp-metric"><span>Difference</span><b>${fmtCurShortK(Math.abs(diff))}</b></div>`;
      } else {
        sub = `<span class="fp-gsub">No prior period</span>`;
        metrics = `<div class="fp-metric-empty">Pick a month to compare spending.</div>`;
      }
    } else {
      center = g.budget > 0 ? Math.abs(g.remaining) : 0;
      if (g.budget > 0) {
        const left = Math.round((g.remaining / g.budget) * 100);
        sub = g.remaining >= 0 ? `<span class="fp-gsub b"><span style="color:${STATE_COLOR[g.state]}">${left}%</span> left to spend</span>` : `<span class="fp-gsub b">Over budget</span>`;
        metrics = `<div class="fp-metric"><span>Spent</span><b class="${g.remaining < 0 ? "danger" : ""}">${fmtCurShortK(g.spent)}</b></div>
          <button class="fp-metric fp-metric-b" data-act="edit-budget" data-id="${c.id}"><span>Monthly Budget${I.chevR}</span><b>${fmtCurShortK(g.budget)}</b></button>`;
      } else {
        sub = `<span class="fp-gsub">No budget set</span>`;
        metrics = `<button class="fp-empty-budget" data-act="edit-budget" data-id="${c.id}"><span>${I.budget}</span><b>Set budget for ${esc(c.name)}</b>${I.chevR}</button>`;
      }
    }
    const gauge = `<svg class="fp-gauge" viewBox="0 0 280 146" width="280" height="146" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => {
      const a = Math.PI + (Math.PI * i) / 35;
      const x1 = 140 + Math.cos(a) * 96, y1 = 132 + Math.sin(a) * 96;
      const x2 = 140 + Math.cos(a) * 112, y2 = 132 + Math.sin(a) * 112;
      return `<line data-i="${i}" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${TRACK}" stroke-width="5" stroke-linecap="round"/>`;
    }).join("")}</svg>`;
    return `${stackHeader(c.name, `<button class="fp-glass fp-nbtn" data-act="edit-cat" data-id="${c.id}" aria-label="Edit ${esc(c.name)}">${I.pencil}</button>`)}
    <div class="fp-scroll"><div class="fp-pad-b fp-detail">
      <div class="fp-d-hero"><span class="fp-d-emoji" aria-label="${esc(c.name)} category">${c.icon}</span>
        <button class="fp-period fp-glass" data-act="period-detail" aria-label="Select period for ${esc(c.name)}"><span>${periodLabel(sc.period)}</span>${I.chevD}</button></div>
      <div class="fp-gwrap">
        <div class="fp-mode" role="tablist"><button role="tab" class="${sc.mode === "expense" ? "on" : ""}" data-act="gauge-mode" data-m="expense" aria-selected="${sc.mode === "expense"}">Expense</button><button role="tab" class="${sc.mode === "budget" ? "on" : ""}" data-act="gauge-mode" data-m="budget" aria-selected="${sc.mode === "budget"}">Budget</button></div>
        <div class="fp-gauge-box" data-filled="${g.filled}" data-color="${g.color}" data-mode="${sc.mode}">${gauge}
          <div class="fp-gc"><span class="fp-gc-amt">${count(center, "gauge-" + c.id + sc.mode + sc.period, sc.mode === "expense" ? "wholek" : "wholek")}</span>${sub}</div></div>
        <div class="fp-metrics">${metrics}</div>
      </div>
      ${txs.length ? sectionsHtml(txs, { badge: false }) : `<p class="fp-empty fp-inset">No spending in ${periodLabel(sc.period).toLowerCase()}.</p>`}
    </div></div>`;
  }

  function renderReview() {
    const txs = untracked("month").sort((a, b) => b.t - a.t);
    return `${stackHeader("Needs review")}
    <div class="fp-scroll"><div class="fp-pad-b">
      <p class="fp-lead-p fp-inset">MoMo SMS logs the payment. It does not pick a category for you. Tap one to categorize it.</p>
      ${txs.length ? sectionsHtml(txs) : `<div class="fp-allset"><span>✨</span><b>All caught up</b><p>Every transaction has a category.</p></div>`}
    </div></div>`;
  }

  function renderProfile() {
    return `${stackHeader("Profile")}
    <div class="fp-scroll"><div class="fp-pad-b fp-profile">
      <div class="fp-prof-hero"><span class="fp-avatar fp-avatar-l"><img src="${ASSETS}default-avatar.png" alt="" width="72" height="72" draggable="false"></span><b>Guest</b><span>Local Mode</span></div>
      <div class="fp-inset"><div class="fp-info"><span class="fp-info-i">${I.lock}</span><p><b>Your data stays on this phone.</b> Categories, budgets and transactions are processed on-device. Cloud Sync is optional and off.</p></div></div>
      <h3 class="fp-grp">Privacy &amp; data</h3>
      <div class="fp-inset"><div class="fp-group">
        <button class="fp-prow" data-act="export"><span class="fp-pi">${I.download}</span><span class="fp-pt"><b>Download my data</b><span>A CSV of everything in this demo</span></span>${I.chevR}</button>
        <button class="fp-prow" data-act="reset"><span class="fp-pi">${I.refresh}</span><span class="fp-pt"><b>Reset demo</b><span>Put the fake data back how it started</span></span>${I.chevR}</button>
      </div></div>
      <p class="fp-fine fp-inset">This is a demo with fake data. Nothing leaves your browser.</p>
    </div></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Sheets                                                              */
  /* ------------------------------------------------------------------ */

  const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  function keypad(clearOn) {
    return `<div class="fp-keys">
      ${KEYS.map((k) => `<button class="fp-key" data-act="key" data-k="${k}" aria-label="${k}">${k}</button>`).join("")}
      <button class="fp-key fp-key-clear${clearOn ? " on" : ""}" data-act="clear" ${clearOn ? "" : "disabled"} aria-label="Clear">Clear</button>
      <button class="fp-key" data-act="key" data-k="0" aria-label="0">0</button>
      <button class="fp-key" data-act="backspace" aria-label="Delete digit">${I.backspace}</button>
    </div>`;
  }

  const toolbar = (leftAct, leftIcon, title, right = "") =>
    `<div class="fp-tb"><i class="fp-grab"></i><div class="fp-tb-r"><button class="fp-glass fp-tbtn" data-act="${leftAct}" aria-label="${leftAct === "sheet-back" ? "Back" : "Close"}">${leftIcon}</button><h2>${esc(title)}</h2>${right || '<span class="fp-tbtn-sp"></span>'}</div></div>`;

  const chipHtml = (c, selected) =>
    `<button class="fp-lchip${selected ? " sel" : ""}" data-act="chip" data-id="${c.id}"><span>${c.icon}</span><b>${esc(c.name)}</b>${selected ? I.chevR : ""}</button>`;

  function topCats() {
    const n = new Map();
    S.txs.forEach((t) => t.cat && n.set(t.cat, (n.get(t.cat) || 0) + 1));
    return [...S.cats].sort((a, b) => (n.get(b.id) || 0) - (n.get(a.id) || 0)).slice(0, 5);
  }

  const isReady = (digits) => /^07[2389]\d{7}$/.test(digits) || /^\d{4,9}$/.test(digits);

  function figure(prefix, text, placeholder, helper) {
    const has = text.length > 0;
    const t = `<span class="fp-fig-t${has ? "" : " ph"}">${has ? esc(text) : placeholder}</span>`;
    const caret = `<i class="fp-caret"></i>`;
    return `<div class="fp-fig"><div class="fp-fig-r">${prefix ? `<span class="fp-fig-p">${prefix}</span>` : ""}${has ? t + caret : caret + t}</div>${helper ? `<span class="fp-fig-h">${helper}</span>` : ""}</div>`;
  }

  function paintSpend(sh) {
    const budgetKind = sh.kind === "budget";
    const rec = sh.step === "recipient";
    const digits = rec ? sh.recipient : sh.amount;
    const amt = +sh.amount || 0;
    const sel = sh.cat ? catById(sh.cat) : null;
    let title, body, cta, ctaOn;
    if (budgetKind) {
      const c = catById(sh.catId);
      title = "Monthly budget";
      ctaOn = amt > 0;
      cta = "Save budget";
      body = `${figure(RWF, sh.amount ? fmt(amt) : "", "Budget", `${c.icon} ${esc(c.name)}`)}`;
    } else if (rec) {
      title = "Recipient ID";
      ctaOn = isReady(sh.recipient);
      cta = "Send";
      const shown = sh.recipient.replace(/^(\d{4})(\d{0,3})(\d{0,3})$/, (m, a, b, c2) => [a, b, c2].filter(Boolean).join(" "));
      body = `${figure("", shown, "MoMo", "Use code/number")}
        <div class="fp-prev"><em>${RWF}</em><b>${fmt(amt)}</b></div>
        <div class="fp-contacts"><span class="fp-clab">Recent</span><div class="fp-crow">${CONTACTS.map((c) => `<button class="fp-contact${sh.recipient === c.num ? " sel" : ""}" data-act="contact" data-num="${c.num}"><i>${c.name[0]}</i>${esc(c.name.split(" ")[0])}</button>`).join("")}</div></div>`;
    } else {
      const spending = sh.intent === "spending";
      title = spending ? "Spending" : "Spent";
      ctaOn = amt > 0;
      cta = spending ? "Continue" : "Save Transaction";
      body = `${figure(RWF, sh.amount ? fmt(amt) : "", "Amount")}
        <div class="fp-catblock"><span class="fp-clab">Categorize as:</span>${
          sel ? chipHtml(sel, true) : `<div class="fp-crow">${topCats().map((c) => chipHtml(c, false)).join("")}</div>`
        }</div>
        <div class="fp-helper"><p>${
          spending
            ? `You'll send money through <b>*182*</b> next.<br>Turn off if you already paid.`
            : `This only saves what you already paid.<br>Turn on if you still need <b>to send MoMo</b>.`
        }</p><button class="fp-switch${spending ? " on" : ""}" role="switch" aria-checked="${spending}" data-act="toggle-intent" aria-label="${spending ? "Sending mode, turn off to record" : "Recording mode, turn on to send"}"><i></i></button></div>`;
    }
    const left = rec ? ["sheet-back", I.chevL] : ["sheet-close", I.close];
    return `${toolbar(left[0], left[1], title)}
      <div class="fp-sp">${body}</div>
      <div class="fp-cta-w"><button class="fp-cta${ctaOn ? " on" : ""}" data-act="${rec ? "send" : budgetKind ? "save-budget" : "continue"}" ${ctaOn ? "" : "disabled"}>${cta}</button></div>
      ${keypad(digits.length > 0)}`;
  }

  function pickRow(c, st) {
    const n = S.txs.filter((t) => t.cat === c.id).length;
    const trail =
      st === "load" ? `<i class="fp-spin"></i>` : st === "done" ? `<span class="fp-done">${I.check}</span>` : `<span class="fp-pplus">${I.plus}</span>`;
    return `<button class="fp-prow2" data-act="pick" data-id="${c.id}"><span class="fp-pe">${c.icon}</span><span class="fp-pn"><b>${esc(c.name)}</b><span>${n} ${n === 1 ? "Transaction" : "Transactions"}</span></span>${trail}</button>`;
  }

  function paintPick(sh) {
    const isLog = sh.type === "log";
    const tx = sh.txId ? S.txs.find((t) => t.id === sh.txId) : null;
    const amount = isLog ? sh.amount : tx ? tx.amount : 0;
    const who = isLog ? sh.recipient : tx ? tx.who : "";
    const title = sh.change ? "Change category" : "Categorize";
    return `${toolbar("sheet-close", I.close, title, isLog ? `<button class="fp-glass fp-tbtn" data-act="log-discard" aria-label="Delete transaction">${I.trash}</button>` : "")}
      <div class="fp-hint"><b>${fmtCur(amount)}</b><span>${esc(fmtRecipient(who))}</span></div>
      <div class="fp-picker">
        <div class="fp-ph"><h3>Categories</h3><button data-act="new-cat-from-sheet">${I.plus}<span>Create category</span></button></div>
        <div class="fp-plist">${S.cats.map((c) => pickRow(c, sh.busy === c.id ? (sh.done ? "done" : "load") : "idle")).join("")}</div>
      </div>`;
  }

  function paintMini(sh) {
    if (sh.type === "period") {
      const opts = [["month", "This month"], ["last", monthName(PREV_MK)], ["all", "All time"]];
      return `<i class="fp-grab fp-grab-a"></i><h3 class="fp-st">Period</h3><div class="fp-opts">${opts
        .map(([k, l]) => `<button class="fp-opt${sh.value === k ? " on" : ""}" data-act="period-set" data-p="${k}"><span>${l}</span>${sh.value === k ? I.check : ""}</button>`)
        .join("")}</div>`;
    }
    if (sh.type === "workspace") {
      const opts = [["personal", "Personal funds", "Just you"], ["shared", "Shared funds", "With family or a partner"]];
      return `<i class="fp-grab fp-grab-a"></i><h3 class="fp-st">Workspace</h3><div class="fp-opts">${opts
        .map(([k, l, s]) => `<button class="fp-opt${S.workspace === k ? " on" : ""}" data-act="ws-set" data-w="${k}"><span class="fp-opt-t"><b>${l}</b><em>${s}</em></span>${S.workspace === k ? I.check : ""}</button>`)
        .join("")}</div>`;
    }
    if (sh.type === "tx") {
      const t = S.txs.find((x) => x.id === sh.txId);
      if (!t) return "";
      const c = catById(t.cat);
      return `<i class="fp-grab fp-grab-a"></i>
        <div class="fp-tx-h"><span class="fp-tx-e">${c ? c.icon : "\u{1F4B8}"}</span><span><b>${fmtCur(t.amount)}</b><em>${esc(c ? c.name : "Uncategorized")} · ${esc(fmtRecipient(t.who))}</em></span></div>
        <div class="fp-opts"><button class="fp-opt" data-act="tx-recat" data-id="${t.id}"><span>Change category</span>${I.chevR}</button>
        <button class="fp-opt danger" data-act="tx-delete" data-id="${t.id}"><span>Delete transaction</span></button></div>`;
    }
    return "";
  }

  function paintCatForm(sh) {
    const preview = {
      icon: sh.icon,
      name: sh.name || "Category name",
      budget: +sh.budget || 0,
      spent: sh.id ? spentIn(sh.id) : 0,
    };
    const has = preview.budget > 0;
    const canSave = sh.name.trim().length > 0;
    return `${toolbar("sheet-close", I.close, sh.id ? "Edit category" : "New category")}
      <div class="fp-cf">
        <div class="fp-cf-prev"><div class="fp-card-cat fp-card-prev" data-prev>${FOLDER}<span class="fp-cc-in">
          <span class="fp-cc-top"><span class="fp-cc-e" data-p-icon>${preview.icon}</span>${I.arrowCard}</span>
          <span class="fp-cc-bot"><b class="fp-cc-n" data-p-name>${esc(preview.name)}</b><i class="fp-groove"></i>
          <span class="fp-cc-b"><span class="fp-cc-bl${has ? "" : " off"}" data-p-bl>${I.budget}<b data-p-budget>${fmtCardBudget(preview.budget)}</b></span><span class="fp-cc-br" data-p-br ${has && preview.spent > 0 ? "" : "hidden"}>${has ? ring(preview.spent, preview.budget, 14) : ""}<span>${has ? Math.round((preview.spent / preview.budget) * 100) + "%" : ""}</span></span></span></span></span></div></div>
        <label class="fp-lab" for="fp-name">Name</label>
        <input id="fp-name" class="fp-input" data-field="name" maxlength="24" autocomplete="off" placeholder="e.g. Coffee" value="${esc(sh.name)}">
        <label class="fp-lab">Emoji</label>
        <div class="fp-emojis">${EMOJIS.map((e) => `<button class="fp-emo${e === sh.icon ? " on" : ""}" data-act="emoji" data-e="${e}" aria-label="Use ${e}">${e}</button>`).join("")}</div>
        <label class="fp-lab" for="fp-budget">Monthly budget <em>(optional)</em></label>
        <input id="fp-budget" class="fp-input" data-field="budget" inputmode="numeric" autocomplete="off" placeholder="0" value="${sh.budget ? esc(sh.budget) : ""}">
      </div>
      <div class="fp-cta-w"><button class="fp-cta${canSave ? " on" : ""}" data-act="save-cat" ${canSave ? "" : "disabled"}>${sh.id ? "Save changes" : "Add category"}</button></div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Rendering + hydration                                               */
  /* ------------------------------------------------------------------ */

  const lastCounts = new Map();

  function paint(el, html, { replay = false } = {}) {
    const sc = el.querySelector(".fp-scroll");
    const top = sc ? sc.scrollTop : 0;
    el.innerHTML = html;
    const sc2 = el.querySelector(".fp-scroll");
    if (sc2 && top) sc2.scrollTop = top;
    el.classList.toggle("fp-play", replay && !REDUCED);
    hydrate(el, replay);
  }

  function hydrate(el, replay) {
    $$("[data-count]", el).forEach((n) => {
      const to = +n.dataset.count;
      const key = n.dataset.key;
      const name = n.dataset.fmt || "plain";
      const from = replay ? 0 : lastCounts.has(key) ? lastCounts.get(key) : to;
      lastCounts.set(key, to);
      countTo(n, from, to, name);
    });
    $$(".fp-gauge-box", el).forEach((box) => revealGauge(box, replay));
  }

  const ease = (p) => 1 - Math.pow(1 - p, 3);
  function countTo(node, from, to, name) {
    if (REDUCED || from === to) { node.textContent = fmtFor(name, to); return; }
    const t0 = performance.now();
    const dur = clamp(Math.abs(to - from) / 4, 450, 900);
    const tick = (now) => {
      if (!node.isConnected) return;
      const p = clamp((now - t0) / dur, 0, 1);
      node.textContent = fmtFor(name, from + (to - from) * ease(p));
      if (p < 1) raf(tick);
    };
    raf(tick);
  }

  function revealGauge(box, replay) {
    const lines = $$("line", box);
    const filled = +box.dataset.filled;
    const color = box.dataset.color;
    const drain = box.dataset.mode === "budget";
    const paintAt = (p) => {
      lines.forEach((ln, i) => {
        const on = drain ? i >= Math.round(p * (36 - filled)) : i < Math.round(p * filled);
        ln.setAttribute("stroke", on ? color : TRACK);
      });
    };
    if (REDUCED || !replay) { paintAt(1); return; }
    paintAt(0);
    const t0 = performance.now() + 220;
    const tick = (now) => {
      if (!box.isConnected) return;
      const p = clamp((now - t0) / 800, 0, 1);
      paintAt(ease(p));
      if (p < 1) raf(tick);
    };
    raf(tick);
  }

  const viewEl = (name) => $(`.fp-view[data-view="${name}"]`);

  function renderView(name, replay = false) {
    const fn = { home: renderHome, categories: renderCategories, history: renderHistory }[name];
    paint(viewEl(name), fn(), { replay });
  }
  function renderAll() {
    ["home", "categories", "history"].forEach((n) => renderView(n, false));
    refreshStack();
    refreshSheet();
  }

  /* ---------- stack ---------- */

  const stackRoot = () => $(".fp-stack");
  const stackHtml = (sc) => (sc.type === "category" ? renderDetail(sc) : sc.type === "review" ? renderReview() : renderProfile());

  function push(sc) {
    S.stack.push(sc);
    const el = document.createElement("div");
    el.className = "fp-screen2";
    el.dataset.type = sc.type;
    sc.el = el;
    stackRoot().appendChild(el);
    paint(el, stackHtml(sc), { replay: true });
    mount.classList.add("fp-pushed");
    raf(() => raf(() => el.classList.add("in")));
  }
  function pop() {
    const sc = S.stack.pop();
    if (!sc) return;
    sc.el.classList.remove("in");
    sc.el.classList.add("out");
    if (!S.stack.length) mount.classList.remove("fp-pushed");
    setTimeout(() => sc.el.remove(), REDUCED ? 0 : 380);
  }
  function refreshStack() {
    S.stack.forEach((sc) => {
      if (sc.type === "category" && !catById(sc.id)) return;
      paint(sc.el, stackHtml(sc), { replay: false });
    });
  }

  /* ---------- sheets ---------- */

  const sheetRoot = () => $(".fp-sheets");
  function openSheet(sh) {
    if (S.sheet) closeSheet(true);
    S.sheet = sh;
    const root = sheetRoot();
    const full = ["spend", "log", "pick", "catform"].includes(sh.type);
    root.innerHTML = `<div class="fp-dim" data-act="sheet-close"></div><div class="fp-sheet ${full ? "fp-sheet-full" : "fp-sheet-mini"}" role="dialog" aria-modal="true" aria-label="${esc(sh.type)}"></div>`;
    root.classList.add("on");
    mount.classList.add("fp-sheeted");
    refreshSheet();
    const el = $(".fp-sheet", root);
    raf(() => raf(() => { root.classList.add("in"); el.classList.add("in"); }));
  }
  function refreshSheet() {
    const sh = S.sheet;
    if (!sh) return;
    const el = $(".fp-sheet", sheetRoot());
    if (!el) return;
    const sc = el.querySelector(".fp-plist, .fp-cf");
    const top = sc ? sc.scrollTop : 0;
    const html = sh.type === "spend" ? paintSpend(sh) : sh.type === "log" || sh.type === "pick" ? paintPick(sh) : sh.type === "catform" ? paintCatForm(sh) : paintMini(sh);
    el.innerHTML = html;
    const sc2 = el.querySelector(".fp-plist, .fp-cf");
    if (sc2 && top) sc2.scrollTop = top;
  }
  function closeSheet(immediate = false) {
    const root = sheetRoot();
    S.sheet = null;
    root.classList.remove("in");
    const el = $(".fp-sheet", root);
    if (el) el.classList.remove("in");
    mount.classList.remove("fp-sheeted");
    const done = () => { if (!S.sheet) { root.classList.remove("on"); root.innerHTML = ""; } };
    if (immediate || REDUCED) done(); else setTimeout(done, 380);
  }

  /* ---------- alert, toast, banner, overlay ---------- */

  function showAlert({ title, message, buttons }) {
    const root = $(".fp-over");
    root.innerHTML = `<div class="fp-alert-dim"></div><div class="fp-alert" role="alertdialog" aria-modal="true" aria-label="${esc(title)}"><div class="fp-al-b"><b>${esc(title)}</b><p>${esc(message)}</p></div><div class="fp-al-btns">${buttons
      .map((b, i) => `<button class="${b.style || ""}" data-act="alert" data-i="${i}">${esc(b.text)}</button>`)
      .join("")}</div></div>`;
    root.classList.add("on");
    root._buttons = buttons;
    raf(() => raf(() => root.classList.add("in")));
  }
  function closeAlert() {
    const root = $(".fp-over");
    root.classList.remove("in");
    setTimeout(() => { if (!root.classList.contains("in")) { root.classList.remove("on"); root.innerHTML = ""; } }, 220);
  }

  const hi = (s) => `<b>${esc(s)}</b>`;
  function toast(labelHtml, undo, tone) {
    const root = $(".fp-toasts");
    const el = document.createElement("div");
    el.className = "fp-toast";
    const icon = tone ? `<span class="fp-toast-i" style="color:${STATE_COLOR[tone]}">${I.budget}</span>` : "";
    el.innerHTML = `${icon}<span class="fp-toast-t">${labelHtml}</span>${undo ? `<button data-act="toast-undo">Undo</button>` : ""}`;
    root.innerHTML = "";
    root.appendChild(el);
    let gone = false;
    const kill = () => { if (gone) return; gone = true; el.classList.remove("in"); setTimeout(() => el.remove(), 300); };
    el._undo = () => { kill(); undo && undo(); };
    raf(() => raf(() => el.classList.add("in")));
    setTimeout(kill, 4200);
  }

  function showBanner({ title, body }) {
    const el = $(".fp-banner");
    el.innerHTML = `<span class="fp-bn-ic">${I.msg}</span><span class="fp-bn-tx"><span class="fp-bn-h"><b>${esc(title)}</b><em>now</em></span><span class="fp-bn-b">${esc(body)}</span></span>`;
    el.classList.add("on");
    raf(() => raf(() => el.classList.add("in")));
    clearTimeout(el._t);
    el._t = setTimeout(() => { el.classList.remove("in"); setTimeout(() => el.classList.remove("on"), 450); }, 5200);
  }

  function showSettle(text) {
    const root = $(".fp-over");
    root.innerHTML = `<div class="fp-settle"><i class="fp-spin"></i><span>${esc(text)}</span></div>`;
    root.classList.add("on", "in", "fp-over-pass");
  }
  function hideSettle() {
    const root = $(".fp-over");
    root.classList.remove("on", "in", "fp-over-pass");
    root.innerHTML = "";
  }

  /* ------------------------------------------------------------------ */
  /* Actions                                                             */
  /* ------------------------------------------------------------------ */

  const TAB_ORDER = ["home", "categories", "history"];

  function setTab(tab, { replay = true } = {}) {
    if (S.stack.length) { while (S.stack.length) pop(); }
    const prev = S.tab;
    if (tab !== prev) {
      const pill = $(".fp-pill");
      pill.classList.remove("to-right", "to-left", "plop");
      void pill.offsetWidth;
      pill.classList.add(TAB_ORDER.indexOf(tab) > TAB_ORDER.indexOf(prev) ? "to-right" : "to-left");
      S.tab = tab;
    }
    const pill = $(".fp-pill");
    pill.style.setProperty("--i", TAB_ORDER.indexOf(tab));
    clearTimeout(pill._p);
    pill._p = setTimeout(() => { pill.classList.add("plop"); }, 280);
    $$(".fp-tab").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === tab)));
    $$(".fp-view").forEach((v) => {
      const on = v.dataset.view === tab;
      v.classList.toggle("on", on);
      v.toggleAttribute("inert", !on);
    });
    if (replay) renderView(tab, true);
  }

  function logTx({ amount, who, cat, pending = false, manual = false }) {
    const tx = { id: nextId(), t: demoNow(), amount, who, cat, fee: pending || manual ? 0 : feeFor(amount, who), pending, manual };
    S.txs.push(tx);
    return tx;
  }

  /** Budget threshold nudges, same copy as the app's lib/toastLabel.budgetAlertLabel. */
  const RANK = { none: 0, safe: 0, warning: 1, critical: 2, over: 3 };
  const catRank = (id) => (id ? RANK[stateOf(spentIn(id), S.budgets[id])] : 0);
  function budgetAlert(catId, rankBefore, delay = 0) {
    if (!catId || catRank(catId) <= rankBefore) return;
    const c = catById(catId);
    const spent = spentIn(catId);
    const st = stateOf(spent, S.budgets[catId]);
    const label =
      st === "over"
        ? `${hi(c.name)} budget exceeded`
        : st === "critical"
          ? `${hi(c.name)} budget almost full`
          : `${hi(c.name)}: ${hi(Math.round((spent / S.budgets[catId]) * 100) + "%")} of budget used`;
    setTimeout(() => toast(label, null, st), delay);
  }

  function smsConfirm(txId) {
    const tx = S.txs.find((t) => t.id === txId);
    if (!tx || !tx.pending) return;
    const rank0 = catRank(tx.cat);
    const known = CONTACTS.find((c) => c.num === tx.who);
    const name = known ? known.name : /^\d+$/.test(tx.who) ? SMS_NAMES[Math.floor(Math.random() * SMS_NAMES.length)] : tx.who;
    const fee = feeFor(tx.amount, name);
    tx.pending = false;
    tx.fee = fee;
    tx.who = name;
    const masked = /^07\d{8}$/.test(String(known ? known.num : "")) ? `(${known.num.slice(0, 4)}…)` : "(0788…)";
    showBanner({
      title: "M-Money",
      body: `*165*S*${fmt(tx.amount)} ${RWF} transferred to ${name} ${masked} at ${fmt24(demoNow())}. Fee was ${fee} ${RWF}.`,
    });
    setTimeout(() => {
      renderAll();
      toast(`<b>Payment confirmed</b>`);
      budgetAlert(tx.cat, rank0, REDUCED ? 600 : 2800);
    }, 900);
  }

  function finishSend(sh) {
    const amount = +sh.amount;
    const who = sh.recipient;
    const cat = sh.cat;
    closeSheet();
    (async () => {
      showSettle(`Dialling *182*1*1*${who}*${amount}#…`);
      await wait(REDUCED ? 200 : 1100);
      showSettle("Saving transaction…");
      await wait(REDUCED ? 200 : 800);
      hideSettle();
      if (cat) {
        const tx = logTx({ amount, who, cat, pending: true });
        renderAll();
        const c = catById(cat);
        toast(`${hi(fmtCur(amount))} logged as ${hi(c.name)}`, () => { S.txs = S.txs.filter((t) => t.id !== tx.id); renderAll(); });
        setTimeout(() => smsConfirm(tx.id), REDUCED ? 600 : 3000);
      } else {
        const tx = logTx({ amount, who, cat: null, pending: true });
        renderAll();
        openSheet({ type: "log", txId: tx.id, amount, recipient: who });
        setTimeout(() => smsConfirm(tx.id), REDUCED ? 600 : 6500);
      }
    })();
  }

  function categorize(txId, catId) {
    const tx = S.txs.find((t) => t.id === txId);
    if (!tx) return;
    tx.cat = catId;
    const c = catById(catId);
    renderAll();
    toast(`${hi(fmtCur(tx.amount))} logged as ${hi(c.name)}`);
  }

  function csv() {
    const rows = [["Date", "Time", "Category", "Amount (RWF)", "Fee (RWF)", "Recipient", "Status"]];
    [...S.txs].sort((a, b) => b.t - a.t).forEach((t) => {
      const d = new Date(t.t);
      const c = t.cat ? catById(t.cat).name : "Uncategorized";
      rows.push([`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`, fmt24(t.t), c, t.amount, t.fee || 0, t.who, t.pending ? "Pending" : "Confirmed"]);
    });
    return rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
  }
  function download() {
    const blob = new Blob(["﻿" + csv()], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "fundt-demo-history.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast(`<b>Downloaded</b> fundt-demo-history.csv`);
  }

  function openSpend(o = {}) {
    openSheet({ type: "spend", step: "amount", intent: o.intent || "spending", amount: "", recipient: "", cat: o.cat || null });
  }

  const ACTIONS = {
    tab: (el) => setTab(el.dataset.tab),
    fab: () => openSpend(),
    workspace: () => openSheet({ type: "workspace" }),
    "ws-set": (el) => { S.workspace = el.dataset.w; closeSheet(); renderView("home"); },
    bell: () => push({ type: "review" }),
    avatar: () => push({ type: "profile" }),
    "view-all": () => setTab("history"),
    "cat-open": (el) => push({ type: "category", id: el.dataset.id, mode: "expense", period: "month" }),
    bar: (el) => (el.dataset.id ? push({ type: "category", id: el.dataset.id, mode: "expense", period: S.period === "all" ? "month" : S.period }) : push({ type: "review" })),
    filter: (el) => { S.catFilter = el.dataset.f; renderView("categories"); },
    period: () => openSheet({ type: "period", value: S.period, scope: "history" }),
    "period-detail": () => { const sc = S.stack[S.stack.length - 1]; openSheet({ type: "period", value: sc.period, scope: "detail" }); },
    "period-set": (el) => {
      const p = el.dataset.p;
      const sh = S.sheet;
      closeSheet();
      if (sh && sh.scope === "detail") { const sc = S.stack[S.stack.length - 1]; sc.period = p === "all" ? "all" : p; refreshStack(); }
      else { S.period = p; renderView("history", true); }
    },
    export: () => download(),
    reset: () => { reset(); },
    back: () => pop(),
    "gauge-mode": (el) => { const sc = S.stack[S.stack.length - 1]; sc.mode = el.dataset.m; paint(sc.el, stackHtml(sc), { replay: true }); },
    "edit-budget": (el) => openSheet({ type: "spend", kind: "budget", catId: el.dataset.id, step: "amount", amount: String(S.budgets[el.dataset.id] || ""), recipient: "", cat: null, intent: "spending" }),
    "edit-cat": (el) => { const c = catById(el.dataset.id); openSheet({ type: "catform", id: c.id, name: c.name, icon: c.icon, budget: String(S.budgets[c.id] || "") }); },
    "new-cat": () => openSheet({ type: "catform", id: null, name: "", icon: EMOJIS[0], budget: "" }),
    "new-cat-from-sheet": () => { openSheet({ type: "catform", id: null, name: "", icon: EMOJIS[0], budget: "" }); },
    emoji: (el) => { S.sheet.icon = el.dataset.e; $$(".fp-emo").forEach((b) => b.classList.toggle("on", b === el)); const p = $("[data-p-icon]"); if (p) p.textContent = el.dataset.e; },
    "save-cat": () => {
      const sh = S.sheet;
      const name = sh.name.trim();
      if (!name) return;
      const b = +String(sh.budget).replace(/\D/g, "") || 0;
      if (sh.id) {
        const c = catById(sh.id);
        c.name = name; c.icon = sh.icon;
        if (b > 0) S.budgets[c.id] = b; else delete S.budgets[c.id];
        toast(`${hi(name)} updated`);
      } else {
        const id = "c" + Date.now().toString(36);
        S.cats.push({ id, name, icon: sh.icon });
        if (b > 0) S.budgets[id] = b;
        toast(`${hi(name)} added`);
      }
      closeSheet();
      renderAll();
    },
    tx: (el) => {
      const tx = S.txs.find((t) => t.id === el.dataset.id);
      if (!tx) return;
      if (tx.pending) {
        showAlert({
          title: "Did this go through?",
          message: "MoMo sometimes fails after Fundt logs the send. Confirm only if the money left your wallet.",
          buttons: [
            { text: "Yes, it went through", style: "pri", run: () => { smsConfirm(tx.id); } },
            { text: "No, it failed", style: "dng", run: () => { S.txs = S.txs.filter((t) => t.id !== tx.id); renderAll(); } },
            { text: "Cancel", style: "", run: () => {} },
          ],
        });
      } else if (tx.cat == null) openSheet({ type: "pick", txId: tx.id });
      else openSheet({ type: "tx", txId: tx.id });
    },
    "tx-recat": (el) => openSheet({ type: "pick", txId: el.dataset.id, change: true }),
    "tx-delete": (el) => {
      const id = el.dataset.id;
      const t = S.txs.find((x) => x.id === id);
      closeSheet();
      S.txs = S.txs.filter((x) => x.id !== id);
      renderAll();
      toast(`${hi(fmtCur(t.amount))} deleted`, () => { S.txs.push(t); renderAll(); });
    },
    alert: (el) => {
      const root = $(".fp-over");
      const b = root._buttons[+el.dataset.i];
      closeAlert();
      b && b.run && b.run();
    },
    "toast-undo": (el) => { const t = el.closest(".fp-toast"); t && t._undo && t._undo(); },
    "sheet-close": () => {
      const sh = S.sheet;
      if (sh && sh.type === "log" && !sh.busy) { logPick(sh, null); return; }
      closeSheet();
    },
    "sheet-back": () => { const sh = S.sheet; sh.step = "amount"; refreshSheet(); },
    key: (el) => keyIn(el.dataset.k),
    backspace: () => keyBack(),
    clear: () => { const sh = S.sheet; if (sh.step === "recipient") sh.recipient = ""; else sh.amount = ""; refreshSheet(); },
    "toggle-intent": () => { const sh = S.sheet; sh.intent = sh.intent === "spending" ? "spent" : "spending"; refreshSheet(); },
    chip: (el) => { const sh = S.sheet; sh.cat = sh.cat === el.dataset.id ? null : el.dataset.id; refreshSheet(); },
    contact: (el) => { S.sheet.recipient = el.dataset.num; refreshSheet(); },
    continue: () => {
      const sh = S.sheet;
      if (!(+sh.amount > 0)) return;
      if (sh.intent === "spending") { sh.step = "recipient"; refreshSheet(); return; }
      const amount = +sh.amount;
      const cat = sh.cat;
      closeSheet();
      if (cat) {
        const rank0 = catRank(cat);
        const tx = logTx({ amount, who: "", cat, manual: true });
        renderAll();
        toast(`${hi(fmtCur(amount))} logged as ${hi(catById(cat).name)}`, () => { S.txs = S.txs.filter((t) => t.id !== tx.id); renderAll(); });
        budgetAlert(cat, rank0, REDUCED ? 600 : 2800);
      } else {
        const tx = logTx({ amount, who: "", cat: null, manual: true });
        renderAll();
        openSheet({ type: "log", txId: tx.id, amount, recipient: "Manual entry", manual: true });
      }
    },
    send: () => { const sh = S.sheet; if (isReady(sh.recipient)) finishSend(sh); },
    "save-budget": () => {
      const sh = S.sheet;
      const c = catById(sh.catId);
      S.budgets[c.id] = +sh.amount;
      closeSheet();
      renderAll();
      toast(`${hi(c.name)} budget saved`);
    },
    pick: (el) => {
      const sh = S.sheet;
      if (sh.busy) return;
      if (sh.type === "log") logPick(sh, el.dataset.id);
      else logPick(sh, el.dataset.id, true);
    },
    "log-discard": () => {
      const sh = S.sheet;
      showAlert({
        title: "Don't record this?",
        message: "This won't be saved in Fundt. Your MoMo send (if any) is unchanged.",
        buttons: [
          { text: "Don't record", style: "dng", run: () => { S.txs = S.txs.filter((t) => t.id !== sh.txId); closeSheet(); renderAll(); } },
          { text: "Cancel", style: "", run: () => {} },
        ],
      });
    },
  };

  async function logPick(sh, catId, recat = false) {
    if (catId == null) {
      closeSheet();
      return;
    }
    sh.busy = catId;
    refreshSheet();
    await wait(REDUCED ? 0 : 520);
    sh.done = true;
    refreshSheet();
    await wait(REDUCED ? 0 : 420);
    const tx = S.txs.find((t) => t.id === sh.txId);
    closeSheet();
    if (!tx) return;
    const rank0 = tx.pending ? 99 : catRank(catId);
    tx.cat = catId;
    renderAll();
    toast(`${hi(fmtCur(tx.amount))} logged as ${hi(catById(catId).name)}`);
    budgetAlert(catId, rank0, REDUCED ? 600 : 2800);
    void recat;
  }

  function keyIn(k) {
    const sh = S.sheet;
    if (!sh || sh.type !== "spend") return;
    if (sh.step === "recipient") { if (sh.recipient.length < 10) sh.recipient += k; }
    else if (sh.amount.length < 7 && !(sh.amount === "" && k === "0")) sh.amount += k;
    refreshSheet();
  }
  function keyBack() {
    const sh = S.sheet;
    if (!sh || sh.type !== "spend") return;
    if (sh.step === "recipient") sh.recipient = sh.recipient.slice(0, -1);
    else sh.amount = sh.amount.slice(0, -1);
    refreshSheet();
  }

  /* ---------- events ---------- */

  let lastDragEnd = 0;
  mount.addEventListener("click", (e) => {
    if (Date.now() - lastDragEnd < 300) return;
    const el = e.target.closest("[data-act]");
    if (!el || !mount.contains(el)) return;
    const fn = ACTIONS[el.dataset.act];
    if (fn) { dismissHint(); fn(el, e); }
  });

  // Text fields in the category form must not re-render the sheet (keeps focus).
  mount.addEventListener("input", (e) => {
    const inp = e.target.closest("[data-field]");
    if (!inp || !S.sheet || S.sheet.type !== "catform") return;
    const sh = S.sheet;
    if (inp.dataset.field === "budget") {
      inp.value = inp.value.replace(/\D/g, "").slice(0, 9);
      sh.budget = inp.value;
    } else sh.name = inp.value;
    const nameEl = $("[data-p-name]");
    if (nameEl) nameEl.textContent = sh.name || "Category name";
    const b = +sh.budget || 0;
    const bl = $("[data-p-bl]");
    if (bl) { bl.classList.toggle("off", !(b > 0)); $("[data-p-budget]").textContent = fmtCardBudget(b); }
    const br = $("[data-p-br]");
    if (br) {
      const spent = sh.id ? spentIn(sh.id) : 0;
      br.hidden = !(b > 0 && spent > 0);
      if (!br.hidden) br.innerHTML = `${ring(spent, b, 14)}<span>${Math.round((spent / b) * 100)}%</span>`;
    }
    const cta = $(".fp-cta[data-act='save-cat']");
    if (cta) { const ok = sh.name.trim().length > 0; cta.disabled = !ok; cta.classList.toggle("on", ok); }
  });

  // Physical keyboard for the keypad, once the visitor has touched the phone.
  let engaged = false;
  mount.addEventListener("pointerdown", () => { engaged = true; }, { capture: true });
  document.addEventListener("keydown", (e) => {
    if (!engaged) return;
    const sh = S.sheet;
    if (e.key === "Escape") {
      if ($(".fp-over.on")) { const r = $(".fp-over"); if (r._buttons) { closeAlert(); } return; }
      if (sh) { ACTIONS["sheet-close"](); e.preventDefault(); } else if (S.stack.length) { pop(); e.preventDefault(); }
      return;
    }
    if (!sh || sh.type !== "spend" || e.target.closest("input")) return;
    if (/^\d$/.test(e.key)) { keyIn(e.key); e.preventDefault(); }
    else if (e.key === "Backspace") { keyBack(); e.preventDefault(); }
    else if (e.key === "Enter") { const cta = $(".fp-cta.on"); if (cta) cta.click(); }
  });
  // Arrow keys between tabs
  mount.addEventListener("keydown", (e) => {
    const t = e.target.closest(".fp-tab");
    if (!t || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    const i = TAB_ORDER.indexOf(t.dataset.tab) + (e.key === "ArrowRight" ? 1 : -1);
    const next = TAB_ORDER[clamp(i, 0, 2)];
    setTab(next);
    $(`.fp-tab[data-tab="${next}"]`).focus();
    e.preventDefault();
  });

  /* ---------- swipe rows on Home (Pin / Add) ---------- */

  let scaleNow = 0.75;
  let drag = null;
  const SWIPE = { commit: 84, max: 116 };
  mount.addEventListener("pointerdown", (e) => {
    const sw = e.target.closest(".fp-sw");
    if (!sw || (e.pointerType === "mouse" && e.button !== 0)) return;
    drag = { sw, row: sw.querySelector(".fp-row"), x: e.clientX, y: e.clientY, dx: 0, on: false, id: e.pointerId };
  });
  window.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = (e.clientX - drag.x) / scaleNow;
    const dy = (e.clientY - drag.y) / scaleNow;
    if (!drag.on) {
      if (Math.abs(dx) > 9 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        drag.on = true;
        drag.sw.classList.add("drag");
        try { drag.sw.setPointerCapture(e.pointerId); } catch (_) {}
      } else if (Math.abs(dy) > 9) { drag = null; return; }
    }
    if (!drag.on) return;
    const a = Math.abs(dx);
    const x = Math.sign(dx) * (Math.min(a, SWIPE.max) + Math.max(0, a - SWIPE.max) * 0.25);
    drag.dx = x;
    drag.sw.style.setProperty("--dx", `${x}px`);
    drag.sw.dataset.side = x > 0 ? "pin" : "add";
    drag.sw.classList.toggle("armed", Math.abs(x) >= SWIPE.commit);
  });
  const endDrag = (cancel) => {
    if (!drag) return;
    const { sw, dx, on } = drag;
    drag = null;
    if (!on) return;
    lastDragEnd = Date.now();
    sw.classList.remove("drag", "armed");
    sw.style.setProperty("--dx", "0px");
    if (cancel || Math.abs(dx) < SWIPE.commit) return;
    const id = sw.dataset.id;
    if (dx > 0) {
      const was = S.pinned.includes(id);
      S.pinned = was ? S.pinned.filter((p) => p !== id) : [id, ...S.pinned];
      renderView("home");
      toast(`${hi(catById(id).name)} ${was ? "unpinned" : "pinned"}`);
    } else {
      openSpend({ intent: "spent", cat: id });
    }
  };
  window.addEventListener("pointerup", () => endDrag(false));
  window.addEventListener("pointercancel", () => endDrag(true));

  /* ---------- first-touch hint, clock, scaling ---------- */

  function dismissHint() {
    const cap = $("[data-fp-caption]");
    if (cap && !cap.classList.contains("done")) {
      cap.classList.add("done");
      cap.textContent = "Demo data. Nothing leaves your browser.";
    }
  }

  function tickClock() {
    const c = $(".fp-clock");
    if (c) c.textContent = fmtClock(demoNow());
  }

  function fit() {
    const host = mount.parentElement;
    const w = host.clientWidth || mount.clientWidth || 417;
    const wide = window.matchMedia("(min-width: 901px)").matches;
    const vh = window.innerHeight;
    const availH = wide ? clamp(vh - 76 - 48 - 64 - 28, 640, 876) : 876;
    const s = clamp(Math.min(w / 417, availH / 876), 0.5, 1);
    scaleNow = s;
    mount.style.setProperty("--fp-s", s.toFixed(4));
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                */
  /* ------------------------------------------------------------------ */

  function reset() {
    uid = 0;
    S = freshState();
    while (stackRoot().firstChild) stackRoot().firstChild.remove();
    mount.classList.remove("fp-pushed", "fp-sheeted");
    closeSheet(true);
    hideSettle();
    lastCounts.clear();
    S.tab = "home";
    $$(".fp-pill").forEach((p) => p.style.setProperty("--i", 0));
    setTab("home");
    ["categories", "history"].forEach((n) => renderView(n, false));
    toast("<b>Demo reset</b>");
  }

  function boot() {
    S = freshState();
    mount.classList.add("fp");
    mount.innerHTML = shell();
    fit();
    tickClock();
    setInterval(tickClock, 15000);
    ["categories", "history"].forEach((n) => renderView(n, false));
    S.tab = "home";
    setTab("home");
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(mount.parentElement);
    window.addEventListener("resize", fit);
    mount.dispatchEvent(new CustomEvent("fundt-phone:ready", { bubbles: true }));
  }

  boot();
})();
