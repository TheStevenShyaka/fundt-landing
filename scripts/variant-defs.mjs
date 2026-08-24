/**
 * Taste set: five structurally different Fundt landings.
 * All Nunito 500/700. Category palette lives in --cat-* vars for easy retuning.
 */

// Real app chart slice palette (fundt-frontend/lib/chartData.ts)
const CATS = `--cat-transport:#fbbf24;--cat-airtime:#a78bfa;--cat-bills:#0090ff;--cat-food:#22c55e;--cat-people:#ec4899;--cat-data:#06b6d4;`;

const RESET = `
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
button,input{font:inherit;color:inherit}
body{font-family:"Nunito",system-ui,sans-serif;font-weight:500;-webkit-font-smoothing:antialiased}
strong,b,h1,h2,h3,.bold{font-weight:700}
.waitlist-note.success{font-weight:700}.waitlist-note.error{font-weight:700}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition:none!important}}
`;

const waitlist = () => `
  <form class="waitlist-form" novalidate>
    <input type="email" name="email" class="waitlist-input" placeholder="you@example.com" autocomplete="email" required aria-label="Email address" />
    <button type="submit" class="btn btn-primary">Join the Waitlist</button>
  </form>
  <p class="waitlist-note" data-default="One email when Fundt ships. Maybe two.">One email when Fundt ships. Maybe two.</p>`;

const siteFooter = (assetPrefix = "../assets/") => `
<footer class="footer">
  <div class="footer-inner">
    <a class="brand" href="/"><img src="${assetPrefix}icon.png" alt="" />Fundt</a>
    <p class="footer-copy">&copy; <span data-year></span> Fundt. All rights reserved.</p>
    <div class="footer-socials">
      <a
        class="footer-social"
        href="https://www.instagram.com/buildingfundt.app"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fundt on Instagram"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="5.2" fill="none" stroke="currentColor" stroke-width="1.7" />
          <circle cx="12" cy="12" r="4.35" fill="none" stroke="currentColor" stroke-width="1.7" />
          <circle cx="17.35" cy="6.65" r="1.15" fill="currentColor" />
        </svg>
      </a>
    </div>
  </div>
</footer>`;

export const defs = [

  // ============================================================
  // 1. SORT: your SMS already knows. Raw messages become chips.
  // ============================================================
  {
    skill: "taste",
    id: "taste-sort",
    tab: "Sort",
    title: "Fundt · Sort",
    contract: `THESIS: The data already lives in your inbox; Fundt just sorts it. Refuse the generic phone-mockup hero.
OWN-WORLD: Ink #0D0E12, paper text, six category colors as the only decoration. Nunito 500/700.
STORY: Watch raw MoMo SMS get stamped into buckets; believe "zero homework"; join.
FIRST VIEWPORT: Copy left, live sorting rail right, waitlist in view.
FORM: Taste / Sort. V8 M7 D3.`,
    css: RESET + `
:root{${CATS}--bg:#0D0E12;--card:#16181E;--ink:#F5F6F8;--muted:rgba(245,246,248,.55);--line:rgba(245,246,248,.08);--accent:#0090ff}
body{background:var(--bg);color:var(--ink);line-height:1.5;overflow-x:hidden}
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;max-width:1200px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a.link{color:var(--muted);font-size:14px}
.btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:14px;padding:14px 24px;font-weight:700;font-size:15px;background:var(--accent);color:#fff;cursor:pointer;transition:transform .15s}
.btn:hover{transform:translateY(-2px)}.btn:active{transform:scale(.97)}
.hero{max-width:1200px;margin:0 auto;padding:48px 28px 0;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;min-height:calc(100dvh - 76px)}
.hero h1{font-size:clamp(2.6rem,5.4vw,4.3rem);line-height:1.03;letter-spacing:-.02em}
.hero h1 .hl{color:var(--accent)}
.hero-sub{margin-top:18px;color:var(--muted);font-size:1.1rem;max-width:38ch}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;margin-top:30px}
.waitlist-input{flex:1;min-width:200px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px;font-size:15px}
.waitlist-input::placeholder{color:var(--muted)}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.45);border-color:var(--accent)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#4ade80}.waitlist-note.error{color:#fb7185}
.rail{position:relative;height:min(76dvh,640px);overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(transparent,#000 12%,#000 88%,transparent)}
.rail-track{display:grid;gap:14px;animation:railUp 26s linear infinite}
@keyframes railUp{to{transform:translateY(-50%)}}
.sms{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:16px 18px}
.sms p{font-size:13px;color:var(--muted);line-height:1.45}
.sms .row{display:flex;justify-content:space-between;align-items:center;margin-top:12px}
.sms .amt{font-weight:700;font-size:15px}
.chip{font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;color:#0D0E12}
.c-transport{background:var(--cat-transport)}.c-airtime{background:var(--cat-airtime);color:#fff}.c-bills{background:var(--cat-bills);color:#fff}.c-food{background:var(--cat-food)}.c-people{background:var(--cat-people);color:#fff}.c-data{background:var(--cat-data)}
.band{border-block:1px solid var(--line);margin-top:64px}
.band-inner{max-width:1200px;margin:0 auto;padding:72px 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.band h2{font-size:clamp(1.6rem,3vw,2.2rem);line-height:1.1}
.band h2 span{display:block}
.band h2 .w1{color:var(--cat-bills)}.band h2 .w2{color:var(--cat-food)}.band h2 .w3{color:var(--ink)}
.band p{color:var(--muted);font-size:.98rem;align-self:end}
.providers{max-width:1200px;margin:0 auto;padding:56px 28px;display:flex;align-items:center;gap:20px;flex-wrap:wrap}
.providers span{font-size:13px;color:var(--muted);font-weight:700}
.providers img{width:44px;height:44px;border-radius:11px;object-fit:cover;border:1px solid var(--line)}
.cta{max-width:1200px;margin:24px auto 0;padding:0 28px 72px}
.cta-in{background:linear-gradient(140deg,#0090ff,#0056a8);border-radius:24px;padding:52px 40px}
.cta-in h2{font-size:clamp(1.7rem,3.4vw,2.5rem);max-width:16ch}
.cta-in .waitlist-input{background:rgba(0,0,0,.28);border-color:rgba(255,255,255,.25)}
.cta-in .btn{background:#fff;color:#0056a8}
.cta-in .waitlist-note{color:rgba(255,255,255,.75)}
.foot{max-width:1200px;margin:0 auto;padding:24px 28px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px}
@media(max-width:900px){.hero{grid-template-columns:1fr;min-height:auto;padding-top:24px}.rail{height:380px}.band-inner{grid-template-columns:1fr;padding:48px 28px}}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <a class="link" href="/privacy">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <div>
      <h1>Your SMS already knows <span class="hl">where it went</span>.</h1>
      <p class="hero-sub">Every MoMo message on your phone is a receipt. Fundt reads them and sorts your month for you. No typing. No spreadsheets.</p>
      <div id="waitlist">${waitlist()}</div>
    </div>
    <div class="rail" aria-label="Sample MoMo messages, automatically sorted (sample data)">
      <div class="rail-track">
        <article class="sms"><p>*S* You have paid 4,500 RWF to WASAC LTD…</p><div class="row"><span class="amt">R₣ 4,500</span><span class="chip c-bills">⚡ Electricity</span></div></article>
        <article class="sms"><p>*S* 300 RWF paid to Tap&Go. Fare complete…</p><div class="row"><span class="amt">R₣ 300</span><span class="chip c-transport">🚌 Transport</span></div></article>
        <article class="sms"><p>*S* Airtime purchase 1,000 RWF successful…</p><div class="row"><span class="amt">R₣ 1,000</span><span class="chip c-airtime">📱 Phone Bill</span></div></article>
        <article class="sms"><p>*S* You sent 15,000 RWF to Aline U.…</p><div class="row"><span class="amt">R₣ 15,000</span><span class="chip c-people">👨‍👩‍👧 Friends & Family</span></div></article>
        <article class="sms"><p>*S* Payment of 8,000 RWF to CANAL+ received…</p><div class="row"><span class="amt">R₣ 8,000</span><span class="chip c-bills">🎬 Entertainment</span></div></article>
        <article class="sms"><p>*S* Bundle purchase 2,500 RWF. Enjoy…</p><div class="row"><span class="amt">R₣ 2,500</span><span class="chip c-data">📱 Phone Bill</span></div></article>
        <article class="sms"><p>*S* You have paid 4,500 RWF to WASAC LTD…</p><div class="row"><span class="amt">R₣ 4,500</span><span class="chip c-bills">⚡ Electricity</span></div></article>
        <article class="sms"><p>*S* 300 RWF paid to Tap&Go. Fare complete…</p><div class="row"><span class="amt">R₣ 300</span><span class="chip c-transport">🚌 Transport</span></div></article>
        <article class="sms"><p>*S* Airtime purchase 1,000 RWF successful…</p><div class="row"><span class="amt">R₣ 1,000</span><span class="chip c-airtime">📱 Phone Bill</span></div></article>
        <article class="sms"><p>*S* You sent 15,000 RWF to Aline U.…</p><div class="row"><span class="amt">R₣ 15,000</span><span class="chip c-people">👨‍👩‍👧 Friends & Family</span></div></article>
        <article class="sms"><p>*S* Payment of 8,000 RWF to CANAL+ received…</p><div class="row"><span class="amt">R₣ 8,000</span><span class="chip c-bills">🎬 Entertainment</span></div></article>
        <article class="sms"><p>*S* Bundle purchase 2,500 RWF. Enjoy…</p><div class="row"><span class="amt">R₣ 2,500</span><span class="chip c-data">📱 Phone Bill</span></div></article>
      </div>
    </div>
  </section>
  <section class="band">
    <div class="band-inner">
      <h2><span class="w1">Fundt reads.</span><span class="w2">Fundt sorts.</span><span class="w3">You see.</span></h2>
      <p>Messages are parsed on your phone. Nothing leaves your device without your say-so, and nothing gets sold. Ever.</p>
      <p>Income in waves? Fine. Fundt tracks the month you actually had, not the one a textbook assumed.</p>
    </div>
  </section>
  <div class="providers">
    <span>Understands</span>
    <img src="../assets/electricity.png" alt="Electricity" />
    <img src="../assets/wasac.png" alt="WASAC" />
    <img src="../assets/canal-plus.png" alt="Canal+" />
    <img src="../assets/tap-and-go.png" alt="Tap and Go" />
    <img src="../assets/phone-bill.png" alt="Phone bill" />
    <img src="../assets/rra.png" alt="RRA" />
  </div>
  <section class="cta">
    <div class="cta-in">
      <h2>Month-end without the mystery.</h2>
      ${waitlist()}
    </div>
  </section>
</main>
<footer class="foot"><span>Fundt</span><span><a href="/privacy">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 2. POSTER: scroll-snap typographic film. WHERE DID IT ALL GO?
  // ============================================================
  {
    skill: "taste",
    id: "taste-poster",
    tab: "Poster",
    title: "Fundt · Poster",
    contract: `THESIS: The question everyone asks at month-end, staged as a five-frame poster film. Refuse the scrolling feature page entirely.
OWN-WORLD: Full-bleed color frames, one giant Nunito word each, tiny footnotes. Snap scroll.
STORY: WHERE / DID / IT / ALL / GO? → Fundt knows. → waitlist.
FIRST VIEWPORT: The word WHERE at 20vw on ink.
FORM: Taste / Poster. V10 M6 D1.`,
    css: RESET + `
:root{${CATS}--ink:#0D0E12;--paper:#F5F6F8;--accent:#0090ff}
html,body{height:100%}
body{overflow:hidden}
.film{height:100dvh;overflow-y:auto;scroll-snap-type:y mandatory}
.frame{height:100dvh;scroll-snap-align:start;display:grid;place-items:center;position:relative;padding:24px}
.frame .word{font-weight:700;font-size:clamp(4rem,19vw,15rem);letter-spacing:-.04em;line-height:.95;text-align:center}
.frame .foot-note{position:absolute;bottom:32px;left:0;right:0;text-align:center;font-size:15px;opacity:.7;padding:0 24px}
.f1{background:var(--ink);color:var(--paper)}
.f2{background:var(--cat-transport);color:var(--ink)}
.f3{background:var(--accent);color:#fff}
.f4{background:var(--paper);color:var(--ink)}
.f5{background:var(--cat-people);color:#fff}
.f6{background:var(--ink);color:var(--paper);place-items:center}
.brand-fixed{position:fixed;top:20px;left:24px;z-index:10;display:flex;gap:10px;align-items:center;font-weight:700;color:#fff;mix-blend-mode:difference}
.brand-fixed img{width:30px;height:30px;border-radius:8px}
.skip{position:fixed;top:20px;right:24px;z-index:10;font-weight:700;font-size:14px;color:#fff;mix-blend-mode:difference}
.final{display:grid;gap:22px;justify-items:center;text-align:center;max-width:640px}
.final img{width:64px;height:64px;border-radius:16px}
.final h1{font-size:clamp(2rem,5vw,3.2rem);letter-spacing:-.02em}
.final p{color:rgba(245,246,248,.6);font-size:1.05rem;max-width:40ch}
.btn{display:inline-flex;align-items:center;justify-content:center;border:0;border-radius:14px;padding:14px 26px;font-weight:700;background:var(--accent);color:#fff;cursor:pointer}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.waitlist-input{min-width:240px;background:#16181E;border:1px solid rgba(245,246,248,.14);border-radius:14px;padding:14px 16px;color:var(--paper)}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.5)}
.waitlist-note{font-size:13px;color:rgba(245,246,248,.5)}
.waitlist-note.success{color:#4ade80}.waitlist-note.error{color:#fb7185}
.mini-foot{position:absolute;bottom:20px;font-size:12px;color:rgba(245,246,248,.4)}
.mini-foot a{text-decoration:underline}
`,
    body: `
<a class="brand-fixed" href="#waitlist"><img src="../assets/icon.png" alt="" />Fundt</a>
<a class="skip" href="#waitlist">Join the waitlist ↓</a>
<main class="film" id="top">
  <section class="frame f1"><span class="word">WHERE</span><p class="foot-note">Rent went out. Airtime went out. Something at midnight went out.</p></section>
  <section class="frame f2"><span class="word">DID</span><p class="foot-note">The salary landed on the 3rd. Or was it a gig on the 9th?</p></section>
  <section class="frame f3"><span class="word">IT</span><p class="foot-note">Tap&Go. WASAC. Canal+. That transfer to your cousin.</p></section>
  <section class="frame f4"><span class="word">ALL</span><p class="foot-note">Every franc left a message on your phone.</p></section>
  <section class="frame f5"><span class="word">GO?</span><p class="foot-note">You ask this every month. The answer already exists.</p></section>
  <section class="frame f6" id="waitlist">
    <div class="final">
      <img src="../assets/icon.png" alt="Fundt" />
      <h1>Fundt knows.</h1>
      <p>It reads the MoMo messages already on your phone and sorts your month into a picture. On device. Never sold. Zero homework.</p>
      <form class="waitlist-form" novalidate>
        <input type="email" name="email" class="waitlist-input" placeholder="you@example.com" autocomplete="email" required aria-label="Email address" />
        <button type="submit" class="btn">Join the Waitlist</button>
      </form>
      <p class="waitlist-note" data-default="One email when Fundt ships. Maybe two.">One email when Fundt ships. Maybe two.</p>
    </div>
    <p class="mini-foot">© <span data-year></span> Fundt · <a href="/privacy">Privacy</a></p>
  </section>
</main>`,
  },

  // ============================================================
  // 3. FLOW: one stream in, five buckets out. Light, airy, drawn.
  // ============================================================
  {
    skill: "taste",
    id: "taste-flow",
    tab: "Flow",
    title: "Fundt · Flow",
    contract: `THESIS: Money is a stream; Fundt is the map of where it forks. Refuse card grids.
OWN-WORLD: Gallery-white, one blue stream, animated SVG forks into category buckets. Nunito 500/700.
STORY: See the fork diagram, understand instantly, join.
FIRST VIEWPORT: Headline, the flow drawing, waitlist under it.
FORM: Taste / Flow. V6 M5 D2.`,
    css: RESET + `
:root{${CATS}--bg:#FBFCFE;--ink:#10151C;--muted:#6B7686;--line:rgba(16,21,28,.09);--accent:#0090ff}
body{background:var(--bg);color:var(--ink);line-height:1.55}
.nav{display:flex;justify-content:space-between;align-items:center;padding:20px 28px;max-width:1080px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a.link{color:var(--muted);font-size:14px}
.hero{max-width:760px;margin:0 auto;text-align:center;padding:56px 24px 0}
.hero h1{font-size:clamp(2.4rem,5.5vw,3.9rem);letter-spacing:-.02em;line-height:1.05}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero p{margin:16px auto 0;color:var(--muted);font-size:1.08rem;max-width:44ch}
.flow{max-width:900px;margin:8px auto 0;padding:0 24px}
.source{display:flex;justify-content:center;margin-top:36px}
.coin{display:flex;gap:10px;align-items:center;background:var(--ink);color:#fff;font-weight:700;border-radius:999px;padding:12px 22px;font-size:15px}
.coin i{width:10px;height:10px;border-radius:50%;background:var(--accent);display:inline-block}
.forks{width:100%;height:auto;display:block;margin-top:-6px}
.forks path{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:6 8;animation:dash 1.6s linear infinite}
@keyframes dash{to{stroke-dashoffset:-28}}
.buckets{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:-4px}
.bucket{border:1px solid var(--line);border-radius:16px;padding:16px 12px;text-align:center;background:#fff}
.bucket .dot{width:28px;height:28px;border-radius:8px;margin:0 auto 10px;display:grid;place-items:center;font-size:15px;background:rgba(16,21,28,.06)}
.bucket .name{font-weight:700;font-size:14px}
.bucket .val{font-size:12.5px;color:var(--muted);margin-top:3px}
.sample{margin-top:14px;text-align:center;font-size:12px;color:var(--muted)}
.center{max-width:560px;margin:48px auto 0;text-align:center;padding:0 24px}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.waitlist-input{flex:1;min-width:220px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:#fff}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.35);border-color:var(--accent)}
.btn{border:0;border-radius:14px;padding:14px 24px;font-weight:700;background:var(--accent);color:#fff;cursor:pointer}
.btn:hover{filter:brightness(1.06)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#15803d}.waitlist-note.error{color:#b91c1c}
.threes{max-width:1080px;margin:88px auto 0;padding:0 24px;display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-block:1px solid var(--line)}
.three{padding:36px 28px;border-right:1px solid var(--line)}
.three:last-child{border-right:0}
.three h3{font-size:1.15rem}
.three p{margin-top:8px;color:var(--muted);font-size:.96rem}
.prov{max-width:1080px;margin:0 auto;padding:48px 24px;display:flex;justify-content:center;gap:14px;align-items:center;flex-wrap:wrap}
.prov img{width:42px;height:42px;border-radius:10px;object-fit:cover;border:1px solid var(--line);filter:grayscale(1);transition:filter .2s}
.prov img:hover{filter:none}
.foot{max-width:1080px;margin:0 auto;padding:22px 24px 40px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px;border-top:1px solid var(--line)}
@media(max-width:820px){.buckets{grid-template-columns:repeat(2,1fr)}.b5{grid-column:span 2}.forks{display:none}.buckets{margin-top:20px}.threes{grid-template-columns:1fr}.three{border-right:0;border-bottom:1px solid var(--line)}}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <a class="link" href="/privacy">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <h1>One stream in.<br /><em>Every franc</em> accounted for.</h1>
    <p>MoMo SMS captures MoMo activity outside Fundt, and confirms payments you started in the app. You categorize later. Then the month makes sense.</p>
  </section>
  <div class="flow" aria-label="Money flow diagram with sample amounts">
    <div class="source"><span class="coin"><i></i>MoMo · captured</span></div>
    <svg class="forks" viewBox="0 0 900 150" aria-hidden="true">
      <path d="M450 6 C450 70 90 60 90 142" stroke="#0090ff"/>
      <path d="M450 6 C450 76 270 66 270 142" stroke="#fbbf24"/>
      <path d="M450 6 C450 84 450 84 450 142" stroke="#a78bfa"/>
      <path d="M450 6 C450 76 630 66 630 142" stroke="#ec4899"/>
      <path d="M450 6 C450 70 810 60 810 142" stroke="#22c55e"/>
    </svg>
    <div class="buckets">
      <div class="bucket b1"><span class="dot">⚡</span><div class="name">Electricity</div><div class="val">R₣ 12,500</div></div>
      <div class="bucket b2"><span class="dot">🚌</span><div class="name">Transport</div><div class="val">R₣ 6,300</div></div>
      <div class="bucket b3"><span class="dot">📱</span><div class="name">Phone Bill</div><div class="val">R₣ 4,000</div></div>
      <div class="bucket b4"><span class="dot">👨‍👩‍👧</span><div class="name">Friends & Family</div><div class="val">R₣ 21,000</div></div>
      <div class="bucket b5"><span class="dot">🛒</span><div class="name">Groceries</div><div class="val">R₣ 9,800</div></div>
    </div>
    <p class="sample">Sample month, for illustration. · iOS auto-capture · Android coming</p>
  </div>
  <div class="center" id="waitlist">${waitlist()}</div>
  <section class="threes">
    <div class="three"><h3>Capture & confirm</h3><p>SMS logs MoMo activity outside Fundt and confirms what you initiated in the app. It does not auto-pick a category.</p></div>
    <div class="three"><h3>You categorize</h3><p>Captured MoMo activity lands as untracked until you put it in a bucket. Light lift, not a spreadsheet.</p></div>
    <div class="three"><h3>On your phone</h3><p>SMS stays on device by default. Nothing is sold. Backup is optional if you want it.</p></div>
  </section>
  <div class="prov">
    <img src="../assets/electricity.png" alt="Electricity" />
    <img src="../assets/wasac.png" alt="WASAC" />
    <img src="../assets/canal-plus.png" alt="Canal+" />
    <img src="../assets/tap-and-go.png" alt="Tap and Go" />
    <img src="../assets/phone-bill.png" alt="Phone bill" />
    <img src="../assets/rra.png" alt="RRA" />
  </div>
</main>
<footer class="foot"><span>Fundt</span><span><a href="/privacy">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 4. BUCKETS: the month as a stack of fat colored pills.
  // ============================================================
  {
    skill: "taste",
    id: "taste-buckets",
    tab: "Buckets",
    title: "Fundt · Buckets",
    contract: `THESIS: Budget categories as physical objects you can almost grab. Refuse thin fintech minimalism.
OWN-WORLD: Warm paper #F3F4F6 (cool, not cream), fat rotated category pills, chunky Nunito bold.
STORY: The pills ARE the product shot; grab one, want the app.
FIRST VIEWPORT: Short claim + the stack, waitlist right behind.
FORM: Taste / Buckets. V8 M4 D4.`,
    css: RESET + `
:root{${CATS}--bg:#F3F4F6;--ink:#101318;--muted:#5D6673;--accent:#0090ff}
body{background:var(--bg);color:var(--ink);line-height:1.5}
.nav{display:flex;justify-content:space-between;align-items:center;padding:20px 28px;max-width:1000px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a.link{color:var(--muted);font-size:14px}
.hero{max-width:1000px;margin:0 auto;padding:40px 24px 0;text-align:center}
.hero h1{font-size:clamp(2.6rem,6.5vw,4.6rem);letter-spacing:-.03em;line-height:1}
.hero p{margin:16px auto 0;color:var(--muted);font-size:1.1rem;max-width:42ch}
.stack{max-width:760px;margin:44px auto 0;padding:0 24px;display:grid;gap:14px}
.pill{display:flex;justify-content:space-between;align-items:center;border-radius:999px;padding:22px 30px;font-size:clamp(1.05rem,2.4vw,1.5rem);font-weight:700;box-shadow:0 10px 24px rgba(16,19,24,.12);transition:transform .18s ease}
.pill small{font-weight:500;font-size:.72em;opacity:.85}
.pill:nth-child(odd){transform:rotate(-1.4deg)}
.pill:nth-child(even){transform:rotate(1.1deg)}
.pill:hover{transform:rotate(0) scale(1.015)}
.p1{background:var(--cat-bills);color:#fff}
.p2{background:var(--cat-transport);color:#101318}
.p3{background:var(--cat-people);color:#fff}
.p4{background:var(--cat-food);color:#101318}
.p5{background:var(--cat-airtime);color:#fff}
.p6{background:#101318;color:#fff}
.stack-note{text-align:center;margin-top:14px;font-size:12.5px;color:var(--muted)}
.mid{max-width:720px;margin:88px auto 0;text-align:center;padding:0 24px}
.mid h2{font-size:clamp(1.7rem,4vw,2.6rem);letter-spacing:-.02em}
.mid p{margin:14px auto 0;color:var(--muted);max-width:46ch;font-size:1.05rem}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:28px}
.waitlist-input{flex:1;min-width:220px;border:2px solid #101318;border-radius:999px;padding:14px 18px;background:#fff}
.waitlist-input:focus{outline:3px solid rgba(0,144,255,.35)}
.btn{border:0;border-radius:999px;padding:14px 26px;font-weight:700;background:#101318;color:#fff;cursor:pointer}
.btn:hover{background:var(--accent)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#15803d}.waitlist-note.error{color:#b91c1c}
.strip{margin-top:88px;background:#101318;color:#F3F4F6;padding:56px 24px}
.strip-in{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:32px}
.strip h3{font-size:1.15rem}
.strip p{margin-top:8px;color:rgba(243,244,246,.6);font-size:.95rem}
.prov{max-width:1000px;margin:0 auto;padding:44px 24px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
.prov img{width:44px;height:44px;border-radius:12px;object-fit:cover}
.foot{max-width:1000px;margin:0 auto;padding:20px 24px 36px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px}
@media(max-width:720px){.strip-in{grid-template-columns:1fr}}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <a class="link" href="/privacy">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <h1>Your money,<br />in buckets.</h1>
    <p>Capture MoMo activity. You pick the bucket. One glance and you know the month.</p>
  </section>
  <div class="stack" aria-label="Sample month by category">
    <div class="pill p1"><span>⚡ Electricity</span><small>R₣ 12,500</small></div>
    <div class="pill p2"><span>🚌 Transport</span><small>R₣ 6,300</small></div>
    <div class="pill p3"><span>👨‍👩‍👧 Friends & Family</span><small>R₣ 21,000</small></div>
    <div class="pill p4"><span>🛒 Groceries</span><small>R₣ 9,800</small></div>
    <div class="pill p5"><span>📱 Phone Bill</span><small>R₣ 6,500</small></div>
    <div class="pill p6"><span>Total · June</span><small>R₣ 56,100</small></div>
  </div>
  <p class="stack-note">Sample after you categorize. · iOS auto-capture · Android coming</p>
  <section class="mid" id="waitlist">
    <h2>SMS captures. You categorize.</h2>
    <p>Outside MoMo activity gets logged as untracked. Payments you start in Fundt get confirmed from the SMS. Categories are always yours to assign, on your phone by default, never sold.</p>
    ${waitlist()}
  </section>
  <section class="strip">
    <div class="strip-in">
      <div><h3>Made for waves</h3><p>Income in bursts? The picture still holds. Fundt tracks your real month.</p></div>
      <div><h3>Capture & confirm</h3><p>SMS is for logging outside MoMo activity and confirming in-app payments, not for auto-sorting categories.</p></div>
      <div><h3>Yours alone</h3><p>Stays on your phone unless you turn on backup. No fine print selling you out.</p></div>
    </div>
  </section>
  <div class="prov">
    <img src="../assets/electricity.png" alt="Electricity" />
    <img src="../assets/wasac.png" alt="WASAC" />
    <img src="../assets/canal-plus.png" alt="Canal+" />
    <img src="../assets/tap-and-go.png" alt="Tap and Go" />
    <img src="../assets/phone-bill.png" alt="Phone bill" />
    <img src="../assets/rra.png" alt="RRA" />
  </div>
</main>
<footer class="foot"><span>Fundt</span><span><a href="/privacy">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 5. MONTH: History hero + top-5 category trend (app DNA).
  // ============================================================
  {
    skill: "taste",
    id: "taste-month",
    tab: "Month",
    title: "Fundt · App",
    contract: `THESIS: Month-end is clear when History shows the total and top category spend. Refuse abstract hero art.
OWN-WORLD: Deep night #101318; app History surface #111116 with hatched trend bars (FundtTokens), Nunito 500/700.
STORY: See History total + top 5 → clear month → waitlist.
FIRST VIEWPORT: Copy left, Figma iPhone History mockup right, waitlist in view.
HERO COPY: Know where your MoMo went. / Capture every transfer. Organize by category. Stay on budget without the homework.
FORM: Taste / Month. V7 M7 D3.`,
    css: RESET + `
:root{${CATS}--bg:#101318;--page:#111116;--surface:#212225;--ink:#F2F4F7;--bright:#f0f0f5;--muted:rgba(242,244,247,.55);--soft:rgba(240,240,245,.45);--line:rgba(242,244,247,.08);--accent:#0090ff;--hatch:rgba(116,116,128,.14)}
body{background:var(--bg);color:var(--ink);line-height:1.55}
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;max-width:1140px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav-links{display:flex;gap:20px;align-items:center}
.nav a.link{color:var(--muted);font-size:14px}
.nav a.link:hover{color:var(--ink)}
.hero{max-width:1140px;margin:0 auto;padding:48px 28px 0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center;min-height:calc(100dvh - 76px)}
.hero h1{font-size:clamp(2.5rem,5.2vw,4.1rem);line-height:1.04;letter-spacing:-.02em}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero-copy{min-width:0}
.hero-sub{margin-top:18px;color:var(--muted);font-size:1.08rem;max-width:38ch}
.hero-visual{position:relative;align-self:stretch;min-height:640px;overflow:hidden}
.hero-mock{position:absolute;left:50%;top:64px;width:312px;max-width:none;height:auto;transform:translateX(-50%);pointer-events:none;animation:heroFloat 5s ease-in-out infinite}
@keyframes heroFloat{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-10px)}}
.hero-visual::after{content:"";position:absolute;left:-16px;right:-16px;bottom:0;z-index:1;height:208px;pointer-events:none;background:linear-gradient(180deg,transparent 0%,var(--bg) 88%)}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}
.waitlist-input{flex:1;min-width:200px;background:#191D24;border:1px solid var(--line);border-radius:14px;padding:14px 16px}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.45)}
.btn{border:0;border-radius:14px;padding:14px 24px;font-weight:700;background:var(--accent);color:#fff;cursor:pointer}
.btn:hover{filter:brightness(1.1)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#4ade80}.waitlist-note.error{color:#fb7185}
/* Claim cards: copy above mini app UI */
.claims{max-width:1140px;margin:48px auto 0;padding:0 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border-block:1px solid var(--line)}
.claim{background:var(--bg);padding:22px 20px 24px;display:flex;flex-direction:column;gap:0;min-height:100%}
.claim-viz{background:var(--page);border:1px solid var(--line);border-radius:16px;padding:12px;margin-top:12px;min-height:104px;display:flex;flex-direction:column;justify-content:center;gap:8px;overflow:hidden}
.claim h3{font-size:1.1rem}
.claim p{margin-top:6px;color:var(--muted);font-size:.92rem;line-height:1.45}
/* Card 1: SMS → Untracked / Categorize (CapturePromiseVisual + UntrackedExpenseRow) */
.viz-sms{background:var(--surface);border-radius:14px;padding:10px 12px;opacity:.78;transform:rotate(-1.5deg);transform-origin:left center}
.viz-sms-hd{display:flex;align-items:center;gap:5px;font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);line-height:14px}
.viz-sms-hd svg{width:12px;height:12px;opacity:.8;flex:none}
.viz-sms-bd{margin-top:4px;font-size:11.5px;line-height:15px;color:rgba(242,244,247,.78);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.viz-urow{display:flex;align-items:center;gap:8px;padding:4px 2px 0}
.viz-uicon{width:28px;height:28px;border-radius:9px;background:rgba(255,255,255,.08);display:grid;place-items:center;flex:none}
.viz-uicon svg{width:14px;height:14px;color:var(--bright)}
.viz-umid{flex:1;min-width:0}
.viz-uamt{display:block;font-size:13px;font-weight:700;line-height:18px;color:var(--bright)}
.viz-uchip{display:inline-flex;align-items:center;margin-top:2px;font-size:10px;font-weight:700;line-height:14px;padding:2px 8px;border-radius:999px;background:rgba(255,159,10,.16);color:#FF9F0A;animation:chipPulse 2.4s ease-in-out infinite}
@keyframes chipPulse{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(255,159,10,0)}50%{opacity:.92;box-shadow:0 0 0 4px rgba(255,159,10,.12)}}
.viz-ucta{font-size:12px;font-weight:700;color:var(--accent);flex:none;white-space:nowrap}
/* Card 2: Unresolved pending → confirmed (HistoryRevampRow) */
.viz-pending,.viz-confirmed{display:flex;align-items:center;gap:8px;min-height:44px}
.viz-em{position:relative;width:32px;height:32px;display:grid;place-items:center;font-size:18px;line-height:1;flex:none}
.viz-dot{position:absolute;top:2px;right:2px;width:7px;height:7px;border-radius:50%;background:#FF9F0A;animation:dotPulse 1.8s ease-in-out infinite}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.75}}
.viz-check{position:absolute;top:-1px;right:-1px;width:14px;height:14px;border-radius:50%;background:var(--accent);display:grid;place-items:center;opacity:0;animation:checkIn .4s .9s cubic-bezier(.33,1,.68,1) both}
.viz-check svg{width:9px;height:9px;color:#fff}
@keyframes checkIn{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
.viz-rmid{flex:1;min-width:0}
.viz-rtitle{display:block;font-size:13px;font-weight:700;line-height:18px;color:var(--bright)}
.viz-rsub{display:block;margin-top:1px;font-size:11px;line-height:15px;color:var(--muted)}
.viz-rcta{font-size:11.5px;font-weight:500;color:var(--accent);flex:none;white-space:nowrap}
.viz-ramt{font-size:12px;font-weight:700;color:var(--bright);flex:none}
.viz-confirmed{opacity:0;animation:confirmRow .45s .75s cubic-bezier(.33,1,.68,1) both}
@keyframes confirmRow{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.viz-pending{opacity:.55}
.claim:nth-child(2) .claim-viz{gap:6px}
/* Card 3: Budget limit + reminder chip (BudgetPromiseVisual / budgetAlertLabel) */
.viz-bhd{display:flex;align-items:center;justify-content:space-between;gap:8px}
.viz-bpill{display:inline-flex;align-items:center;gap:5px;padding:3px 9px 3px 6px;border-radius:999px;background:rgba(255,255,255,.08)}
.viz-bpill .e{font-size:13px;line-height:16px}
.viz-bpill .n{font-size:11px;font-weight:700;line-height:15px;color:var(--bright)}
.viz-bpct{font-size:13px;font-weight:700;color:var(--bright);font-variant-numeric:tabular-nums}
.viz-btrack{height:8px;border-radius:999px;background:rgba(255,255,255,.12);overflow:hidden;margin-top:2px}
.viz-bfill{height:100%;width:0;border-radius:999px;background:#fbbf24;animation:barFill .9s .25s cubic-bezier(.33,1,.68,1) both}
@keyframes barFill{from{width:0}to{width:86%}}
.viz-bchip{align-self:flex-start;display:inline-flex;align-items:center;gap:6px;margin-top:2px;padding:6px 10px;border-radius:999px;background:rgba(251,191,36,.12);border:1px solid rgba(251,191,36,.28);font-size:11.5px;font-weight:700;line-height:14px;color:#fbbf24;opacity:0;animation:chipIn .4s .85s cubic-bezier(.33,1,.68,1) both}
.viz-bchip svg{width:13px;height:13px;flex:none}
@keyframes chipIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.faq{max-width:1140px;margin:56px auto 0;padding:0 28px;display:grid;grid-template-columns:1fr 1.4fr;gap:56px;align-items:start}
.faq h2{font-size:clamp(1.6rem,3vw,2.1rem);letter-spacing:-.02em;line-height:1.1}
.faq-list{border-top:1px solid var(--line)}
.faq-list details{border-bottom:1px solid var(--line)}
.faq-list summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 0;font-weight:700;font-size:15px;line-height:21px;color:var(--bright);cursor:pointer;list-style:none}
.faq-list summary::-webkit-details-marker,.faq-list summary::marker{display:none;content:""}
.faq-list summary::after{content:"";width:8px;height:8px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:rotate(45deg);transition:transform .2s;flex:none;margin-top:-4px}
.faq-list details[open] summary::after{transform:rotate(-135deg);margin-top:4px}
.faq-list details p{padding:0 30px 16px 0;color:var(--muted);font-size:14px;line-height:20px}
.cta{max-width:1140px;margin:48px auto 0;padding:0 28px 56px;text-align:center}
.cta h2{font-size:clamp(1.8rem,3.6vw,2.6rem)}
.cta .waitlist-form{justify-content:center}
.footer{border-top:1px solid var(--line)}
.footer-inner{max-width:1140px;margin:0 auto;padding:22px 28px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:16px}
.footer-inner>.brand{justify-self:start}
.footer-copy{justify-self:center;margin:0;text-align:center;font-size:13px;color:var(--muted)}
.footer-socials{justify-self:end;display:flex;align-items:center;justify-content:flex-end;gap:4px}
.footer-social{display:flex;align-items:center;justify-content:center;width:40px;height:40px;color:var(--muted)}
.footer-social svg{width:22px;height:22px}
.footer-social:hover{color:var(--ink)}
@media(max-width:900px){
.hero{grid-template-columns:minmax(0,1fr);min-height:auto;padding:48px 28px 0;gap:44px}
.hero h1{font-size:clamp(2.15rem,8vw,2.7rem)}
.hero-sub{margin-top:16px}
.hero .waitlist-form{flex-direction:column;align-items:stretch;gap:12px;margin-top:28px}
.hero .waitlist-input{min-width:0;width:100%}
.hero .btn{width:100%}
.hero-visual{min-height:0;height:min(58vh,500px);margin:0}
.hero-mock{top:28px;width:min(70%,268px)}
.hero-visual::after{height:160px}
.claims{grid-template-columns:1fr}
.faq{grid-template-columns:1fr;gap:18px}
.footer-inner{grid-template-columns:1fr;justify-items:center;gap:12px}
.footer-inner>.brand,.footer-copy,.footer-socials{justify-self:center}
}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <div class="nav-links">
    <a class="link" href="/privacy">Privacy</a>
  </div>
</header>
<main id="top">
  <section class="hero">
    <div class="hero-copy">
      <h1>Know where your MoMo <em>went</em>.</h1>
      <p class="hero-sub">Capture every transfer. Organize by category. Stay on budget without the homework.</p>
      <div id="waitlist">${waitlist()}</div>
    </div>
    <div class="hero-visual">
      <img
        class="hero-mock"
        src="../assets/hero-iphone.png"
        width="312"
        height="657"
        alt="Fundt History on iPhone"
      />
    </div>
  </section>
  <section class="claims">
    <div class="claim">
      <h3>Capture, don't auto-sort</h3>
      <p>MoMo SMS logs the payment. It does not pick Transport or Groceries for you. You categorize untracked items.</p>
      <div class="claim-viz" aria-hidden="true">
        <div class="viz-sms">
          <div class="viz-sms-hd"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M2.5 3.5A1.5 1.5 0 0 1 4 2h8a1.5 1.5 0 0 1 1.5 1.5v6A1.5 1.5 0 0 1 12 11H8.2L5.1 13.4a.5.5 0 0 1-.8-.4V11H4A1.5 1.5 0 0 1 2.5 9.5v-6z"/></svg>M-Money</div>
          <div class="viz-sms-bd">*165*S*5,000 R₣ transferred to Aline M (0788…) at 19:21. Fee was 100 R₣.</div>
        </div>
        <div class="viz-urow">
          <span class="viz-uicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/></svg></span>
          <div class="viz-umid"><span class="viz-uamt">5,000 R₣</span><span class="viz-uchip">Untracked</span></div>
          <span class="viz-ucta">Categorize</span>
        </div>
      </div>
    </div>
    <div class="claim">
      <h3>Confirm in-app payments</h3>
      <p>When you start a transfer in Fundt, the MoMo SMS confirms it completed. Outside MoMo activity gets captured the same way.</p>
      <div class="claim-viz" aria-hidden="true">
        <div class="viz-pending">
          <span class="viz-em">💸<span class="viz-dot"></span></span>
          <div class="viz-rmid"><span class="viz-rtitle">12,000 R₣</span><span class="viz-rsub">Waiting for MoMo SMS</span></div>
          <span class="viz-rcta">Resolve now</span>
        </div>
        <div class="viz-confirmed">
          <span class="viz-em">🍽️<span class="viz-check"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2.5 6.2 5 8.5 9.5 3.5"/></svg></span></span>
          <div class="viz-rmid"><span class="viz-rtitle">Restaurants</span><span class="viz-rsub">Confirmed from MoMo SMS</span></div>
          <span class="viz-ramt">12,000</span>
        </div>
      </div>
    </div>
    <div class="claim">
      <h3>Budgets that remind you</h3>
      <p>Set a monthly limit per category. Fundt nudges you at 70%, almost full, and over, so you catch it mid-month, not at month-end.</p>
      <div class="claim-viz" aria-hidden="true">
        <div class="viz-bhd">
          <span class="viz-bpill"><span class="e">🍽️</span><span class="n">Restaurants</span></span>
          <span class="viz-bpct">86%</span>
        </div>
        <div class="viz-btrack"><div class="viz-bfill"></div></div>
        <span class="viz-bchip"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1.5a4 4 0 0 0-4 4v2.2c0 .4-.16.78-.44 1.06L2.7 9.62A.75.75 0 0 0 3.25 11h9.5a.75.75 0 0 0 .55-1.38l-.86-.86A1.5 1.5 0 0 1 12 7.7V5.5a4 4 0 0 0-4-4zm0 13a1.75 1.75 0 0 0 1.62-1.1H6.38A1.75 1.75 0 0 0 8 14.5z"/></svg>Nearing your limit</span>
      </div>
    </div>
  </section>
  <section class="faq" id="faq">
    <h2>FAQ</h2>
    <div class="faq-list">
      <details open>
        <summary>Does Fundt see my MoMo PIN or balance?</summary>
        <p>No. Fundt never processes payments. You dial USSD yourself and we only save what you choose to record.</p>
      </details>
      <details>
        <summary>What happens in Local Mode?</summary>
        <p>Your categories, budgets, and transactions stay on this phone until you sign in and agree to Cloud Sync.</p>
      </details>
      <details>
        <summary>How do I back up my data?</summary>
        <p>Sign in with Google or Apple from Profile. After you agree to Cloud Sync, your data syncs to your account.</p>
      </details>
      <details>
        <summary>Can I export my history?</summary>
        <p>Yes. Open Privacy &amp; data from Profile and tap Download my data to share a CSV file.</p>
      </details>
      <details>
        <summary>Why does Fundt ask for contacts?</summary>
        <p>Only to help you pick a recipient faster. Contacts never leave your device.</p>
      </details>
    </div>
  </section>
  <section class="cta">
    <h2>Be first when it ships.</h2>
    ${waitlist()}
  </section>
</main>
${siteFooter()}`,
  },
];
