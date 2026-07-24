/**
 * Taste set — five structurally different Fundt landings.
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

export const defs = [

  // ============================================================
  // 1. SORT — your SMS already knows. Raw messages become chips.
  // ============================================================
  {
    skill: "taste",
    id: "taste-sort",
    tab: "Sort",
    title: "Fundt — Sort",
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
  <a class="link" href="../privacy.html">Privacy</a>
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
<footer class="foot"><span>Fundt</span><span><a href="../privacy.html">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 2. POSTER — scroll-snap typographic film. WHERE DID IT ALL GO?
  // ============================================================
  {
    skill: "taste",
    id: "taste-poster",
    tab: "Poster",
    title: "Fundt — Poster",
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
    <p class="mini-foot">© <span data-year></span> Fundt · <a href="../privacy.html">Privacy</a></p>
  </section>
</main>`,
  },

  // ============================================================
  // 3. FLOW — one stream in, five buckets out. Light, airy, drawn.
  // ============================================================
  {
    skill: "taste",
    id: "taste-flow",
    tab: "Flow",
    title: "Fundt — Flow",
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
  <a class="link" href="../privacy.html">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <h1>One stream in.<br /><em>Every franc</em> accounted for.</h1>
    <p>Fundt turns your MoMo messages into a living map of the month. You do nothing. It sorts itself.</p>
  </section>
  <div class="flow" aria-label="Money flow diagram with sample amounts">
    <div class="source"><span class="coin"><i></i>MoMo · your month</span></div>
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
    <p class="sample">Sample month, for illustration.</p>
  </div>
  <div class="center" id="waitlist">${waitlist()}</div>
  <section class="threes">
    <div class="three"><h3>On your phone</h3><p>Messages are read and sorted on device. Nothing leaves without your say-so.</p></div>
    <div class="three"><h3>Made for waves</h3><p>Steady salary or gig money in bursts — Fundt tracks the month you actually had.</p></div>
    <div class="three"><h3>Zero homework</h3><p>No manual entry marathons. Open the app, see the picture, get on with your day.</p></div>
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
<footer class="foot"><span>Fundt</span><span><a href="../privacy.html">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 4. BUCKETS — the month as a stack of fat colored pills.
  // ============================================================
  {
    skill: "taste",
    id: "taste-buckets",
    tab: "Buckets",
    title: "Fundt — Buckets",
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
  <a class="link" href="../privacy.html">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <h1>Your money,<br />in buckets.</h1>
    <p>Fundt sorts every MoMo spend into fat, obvious buckets. One glance and you know the month.</p>
  </section>
  <div class="stack" aria-label="Sample month by category">
    <div class="pill p1"><span>⚡ Electricity</span><small>R₣ 12,500</small></div>
    <div class="pill p2"><span>🚌 Transport</span><small>R₣ 6,300</small></div>
    <div class="pill p3"><span>👨‍👩‍👧 Friends & Family</span><small>R₣ 21,000</small></div>
    <div class="pill p4"><span>🛒 Groceries</span><small>R₣ 9,800</small></div>
    <div class="pill p5"><span>📱 Phone Bill</span><small>R₣ 6,500</small></div>
    <div class="pill p6"><span>Total · June</span><small>R₣ 56,100</small></div>
  </div>
  <p class="stack-note">Sample month, for illustration.</p>
  <section class="mid" id="waitlist">
    <h2>You didn't type any of that.</h2>
    <p>It came from the MoMo messages already on your phone - parsed on device, never sold, deleted for good when you say so.</p>
    ${waitlist()}
  </section>
  <section class="strip">
    <div class="strip-in">
      <div><h3>Made for waves</h3><p>Income in bursts? The picture still holds. Fundt tracks your real month.</p></div>
      <div><h3>Zero homework</h3><p>No entry marathons. Open, glance, done.</p></div>
      <div><h3>Yours alone</h3><p>Processed on your phone. No fine print selling you out.</p></div>
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
<footer class="foot"><span>Fundt</span><span><a href="../privacy.html">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 5. MONTH — the calendar lights up, day by day.
  // ============================================================
  {
    skill: "taste",
    id: "taste-month",
    tab: "Month",
    title: "Fundt — Month",
    contract: `THESIS: A month is 30 small days of spending; watch them light up and make sense. Refuse abstract hero art.
OWN-WORLD: Deep night #101318 with glowing day-cells in category colors, Nunito 500/700.
STORY: The calendar fills → "month-end, no mystery" → waitlist.
FIRST VIEWPORT: Copy left, living calendar right.
FORM: Taste / Month. V7 M7 D3.`,
    css: RESET + `
:root{${CATS}--bg:#101318;--card:#191D24;--ink:#F2F4F7;--muted:rgba(242,244,247,.55);--line:rgba(242,244,247,.08);--accent:#0090ff}
body{background:var(--bg);color:var(--ink);line-height:1.55}
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;max-width:1140px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a.link{color:var(--muted);font-size:14px}
.hero{max-width:1140px;margin:0 auto;padding:48px 28px 0;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;min-height:calc(100dvh - 76px)}
.hero h1{font-size:clamp(2.5rem,5.2vw,4.1rem);line-height:1.04;letter-spacing:-.02em}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero-sub{margin-top:18px;color:var(--muted);font-size:1.08rem;max-width:38ch}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}
.waitlist-input{flex:1;min-width:200px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px 16px}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.45)}
.btn{border:0;border-radius:14px;padding:14px 24px;font-weight:700;background:var(--accent);color:#fff;cursor:pointer}
.btn:hover{filter:brightness(1.1)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#4ade80}.waitlist-note.error{color:#fb7185}
.cal{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:24px}
.cal-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:16px}
.cal-head .m{font-weight:700;font-size:1.1rem}
.cal-head .t{font-size:13px;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
.day{aspect-ratio:1;border-radius:10px;background:rgba(242,244,247,.05);position:relative;animation:pop .5s cubic-bezier(.2,1.4,.4,1) both}
.day.f{--c:var(--cat-bills)}
.day.f::after{content:"";position:absolute;inset:0;border-radius:10px;background:var(--c);opacity:.92}
.day.f2{--c:var(--cat-transport)}.day.f3{--c:var(--cat-airtime)}.day.f4{--c:var(--cat-people)}.day.f5{--c:var(--cat-food)}.day.f6{--c:var(--cat-data)}
${Array.from({ length: 35 }, (_, i) => `.day:nth-child(${i + 1}){animation-delay:${(i * 0.045).toFixed(2)}s}`).join("")}
@keyframes pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
.legend{display:flex;flex-wrap:wrap;gap:10px 16px;margin-top:16px;font-size:12.5px;color:var(--muted)}
.legend .e{margin-right:4px}
.cal-note{margin-top:10px;font-size:11.5px;color:var(--muted)}
.claims{max-width:1140px;margin:80px auto 0;padding:0 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border-block:1px solid var(--line)}
.claim{background:var(--bg);padding:40px 28px}
.claim h3{font-size:1.15rem}
.claim p{margin-top:8px;color:var(--muted);font-size:.95rem}
.cta{max-width:1140px;margin:64px auto 0;padding:0 28px 72px;text-align:center}
.cta h2{font-size:clamp(1.8rem,3.6vw,2.6rem)}
.cta .waitlist-form{justify-content:center}
.foot{max-width:1140px;margin:0 auto;padding:22px 28px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px;border-top:1px solid var(--line)}
@media(max-width:900px){.hero{grid-template-columns:1fr;min-height:auto}.claims{grid-template-columns:1fr}}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <a class="link" href="../privacy.html">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <div>
      <h1>Thirty days.<br />Zero <em>mysteries</em>.</h1>
      <p class="hero-sub">Every day your MoMo moves, Fundt fills in the picture. By month-end you already know the answer.</p>
      <div id="waitlist">${waitlist()}</div>
    </div>
    <div class="cal" aria-label="A sample month filling with categorized spending">
      <div class="cal-head"><span class="m">June</span><span class="t">56,100 RWF so far</span></div>
      <div class="grid">
        <div class="day f"></div><div class="day"></div><div class="day f f2"></div><div class="day f f3"></div><div class="day"></div><div class="day f f4"></div><div class="day f f5"></div>
        <div class="day"></div><div class="day f f2"></div><div class="day f"></div><div class="day"></div><div class="day f f6"></div><div class="day f f5"></div><div class="day"></div>
        <div class="day f f4"></div><div class="day"></div><div class="day f f2"></div><div class="day f f3"></div><div class="day f"></div><div class="day"></div><div class="day f f5"></div>
        <div class="day"></div><div class="day f f6"></div><div class="day f f2"></div><div class="day"></div><div class="day f f4"></div><div class="day f"></div><div class="day"></div>
        <div class="day f f5"></div><div class="day f f2"></div><div class="day"></div><div class="day f f3"></div><div class="day"></div><div class="day f"></div><div class="day f f4"></div>
      </div>
      <div class="legend">
        <span><span class="e">⚡</span>Electricity</span>
        <span><span class="e">🚌</span>Transport</span>
        <span><span class="e">📱</span>Phone Bill</span>
        <span><span class="e">👨‍👩‍👧</span>Friends & Family</span>
        <span><span class="e">🛒</span>Groceries</span>
        <span><span class="e">🍽️</span>Restaurants</span>
      </div>
      <p class="cal-note">Sample month, for illustration.</p>
    </div>
  </section>
  <section class="claims">
    <div class="claim"><h3>It sorts itself</h3><p>Airtime, bills, transfers, the midnight buy - each lands in its bucket, automatically.</p></div>
    <div class="claim"><h3>On your phone</h3><p>Messages are parsed on device. Nothing leaves without your say-so. Nothing is sold.</p></div>
    <div class="claim"><h3>Waves welcome</h3><p>Steady salary or gig bursts - Fundt tracks the month you actually had.</p></div>
  </section>
  <section class="cta">
    <h2>Be first when it ships.</h2>
    ${waitlist()}
  </section>
</main>
<footer class="foot"><span>Fundt</span><span><a href="../privacy.html">Privacy</a> · © <span data-year></span></span></footer>`,
  },
];
