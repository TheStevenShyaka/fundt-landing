/**
 * Impeccable set: five committed worlds for the Fundt landing.
 * Nunito 500/700 throughout. Category palette in --cat-* vars.
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
  // 1. APPLINE: the landing IS the app, in app tokens.
  // ============================================================
  {
    skill: "impeccable",
    id: "imp-appline",
    tab: "Appline",
    title: "Fundt · Appline",
    contract: `THESIS: Don't describe the app - hand it over. The landing is the home screen, in real app tokens. Refuse marketing chrome.
OWN-WORLD: FundtTokens exactly: #111116 page, #212225 surface, #0090ff accent, Nunito.
STORY: You are already inside the app; the copy floats at the edges; join to keep it.
FIRST VIEWPORT: Working home-screen mock center, sell copy left, waitlist under.
FORM: Impeccable / Appline. Persuade.`,
    css: RESET + `
:root{${CATS}--page:#111116;--surface:#212225;--elevated:#2c2c2e;--title:#edeef0;--muted:rgba(240,240,245,.45);--body:rgba(240,240,245,.72);--line:rgba(255,255,255,.09);--accent:#0090ff;--link:#4da6ff}
body{background:var(--page);color:var(--title);line-height:1.5}
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;max-width:1200px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a.link{color:var(--muted);font-size:14px}
.hero{max-width:1200px;margin:0 auto;padding:40px 28px 72px;display:grid;grid-template-columns:1fr 400px;gap:64px;align-items:center}
.hero h1{font-size:clamp(2.5rem,5vw,4rem);line-height:1.04;letter-spacing:-.02em}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero-sub{margin-top:18px;color:var(--body);font-size:1.08rem;max-width:40ch}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}
.waitlist-input{flex:1;min-width:200px;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:14px 16px}
.waitlist-input::placeholder{color:var(--muted)}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.45)}
.btn{border:0;border-radius:14px;padding:14px 24px;font-weight:700;background:var(--accent);color:#fff;cursor:pointer}
.btn:hover{filter:brightness(1.1)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#4ade80}.waitlist-note.error{color:#fb7185}
/* ----- the app itself (mirrors HomeScreenFigmaDark) ----- */
.app{background:#000;border-radius:48px;padding:12px;border:1px solid var(--line);box-shadow:0 40px 100px rgba(0,0,0,.6)}
.screen{background:var(--page);border-radius:38px;overflow:hidden;padding:22px 18px 18px}
.status{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);padding:0 6px 14px}
.toolbar{display:flex;gap:10px;align-items:center}
.toolbar .tile{width:32px;height:32px;border-radius:9px;background:#4a5df9;display:grid;place-items:center}
.toolbar .tile img{width:20px;height:20px}
.toolbar .wm{font-weight:700;font-size:15px}
.toolbar .ws{font-size:11px;color:var(--muted)}
.hero-card{background:var(--surface);border-radius:18px;padding:18px 16px;margin-top:16px}
.hero-card .cap{font-size:10.5px;font-weight:700;letter-spacing:.12em;color:var(--muted)}
.hero-card .amt{font-size:2.1rem;font-weight:700;color:#fff;letter-spacing:-.03em;margin-top:6px}
.hero-card .brow{display:flex;justify-content:space-between;align-items:center;margin-top:8px}
.hero-card .of{font-size:12px;color:var(--muted)}
.hero-card .pct{font-size:11.5px;font-weight:700;color:#0f1512;background:#22c55e;border-radius:999px;padding:4px 10px}
.cats-h{font-size:12px;font-weight:700;color:var(--muted);margin:18px 4px 8px}
.cats{display:grid;gap:8px}
.cat{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border-radius:14px;padding:11px 13px}
.cat .l{display:flex;gap:10px;align-items:center}
.cat .e{width:32px;height:32px;border-radius:10px;background:var(--elevated);display:grid;place-items:center;font-size:15px}
.cat .n{font-size:13px;font-weight:700}
.cat .r{display:flex;gap:10px;align-items:center}
.cat .a{font-size:12.5px;font-weight:700}
.cat .ring{width:22px;height:22px;border-radius:50%;background:conic-gradient(var(--rc,#22c55e) calc(var(--p)*1%),rgba(255,255,255,.12) 0);-webkit-mask:radial-gradient(circle,transparent 6.5px,#000 7px);mask:radial-gradient(circle,transparent 6.5px,#000 7px)}
.tabbar{display:flex;justify-content:space-around;margin-top:16px;padding-top:12px;border-top:1px solid var(--line);font-size:10.5px;color:var(--muted)}
.tabbar .on{color:var(--accent);font-weight:700}
.mock-note{text-align:center;font-size:11px;color:var(--muted);margin-top:10px}
/* ----- proof row ----- */
.proof{max-width:1200px;margin:0 auto;padding:0 28px 72px;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.proof article{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:24px}
.proof h3{font-size:1.05rem}
.proof p{margin-top:8px;color:var(--body);font-size:.94rem}
.prov{max-width:1200px;margin:0 auto;padding:0 28px 56px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.prov span{font-size:13px;color:var(--muted);font-weight:700;margin-right:6px}
.prov img{width:42px;height:42px;border-radius:10px;object-fit:cover;border:1px solid var(--line)}
.foot{max-width:1200px;margin:0 auto;padding:22px 28px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px;border-top:1px solid var(--line)}
@media(max-width:960px){.hero{grid-template-columns:1fr;gap:40px}.app{max-width:380px;margin:0 auto}.proof{grid-template-columns:1fr}}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <a class="link" href="../privacy.html">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <div>
      <h1>This is Fundt.<br />It already <em>did the work</em>.</h1>
      <p class="hero-sub">The home screen you're looking at built itself from MoMo activity. Every franc in one place - without a notebook, without spreadsheet energy.</p>
      <div id="waitlist">${waitlist()}</div>
    </div>
    <div>
      <div class="app" aria-label="Fundt home screen preview with sample data">
        <div class="screen">
          <div class="status"><span>9:41</span><span>●●●</span></div>
          <div class="toolbar">
            <span class="tile"><img src="../assets/icon.png" alt="" /></span>
            <div><div class="wm">Fundt</div><div class="ws">Personal funds</div></div>
          </div>
          <div class="hero-card">
            <div class="cap">JUL SPENDING</div>
            <div class="amt">R₣ 56,100</div>
            <div class="brow"><span class="of">of R₣ 80,000 budget</span><span class="pct">↗ 70%</span></div>
          </div>
          <p class="cats-h">Expense categories</p>
          <div class="cats">
            <div class="cat"><div class="l"><span class="e">👨‍👩‍👧</span><span class="n">Friends & Family</span></div><div class="r"><span class="a">R₣ 21,000</span><span class="ring" style="--p:84;--rc:#f97316"></span></div></div>
            <div class="cat"><div class="l"><span class="e">🛒</span><span class="n">Groceries</span></div><div class="r"><span class="a">R₣ 9,800</span><span class="ring" style="--p:49"></span></div></div>
            <div class="cat"><div class="l"><span class="e">📱</span><span class="n">Phone Bill</span></div><div class="r"><span class="a">R₣ 6,500</span><span class="ring" style="--p:65;--rc:#fbbf24"></span></div></div>
            <div class="cat"><div class="l"><span class="e">🚌</span><span class="n">Transport</span></div><div class="r"><span class="a">R₣ 6,300</span><span class="ring" style="--p:42"></span></div></div>
            <div class="cat"><div class="l"><span class="e">⚡</span><span class="n">Electricity</span></div><div class="r"><span class="a">R₣ 4,500</span><span class="ring" style="--p:30"></span></div></div>
          </div>
          <div class="tabbar"><span class="on">Home</span><span>History</span><span>Budget</span><span>Settings</span></div>
        </div>
      </div>
      <p class="mock-note">Sample data, real interface.</p>
    </div>
  </section>
  <section class="proof">
    <article><h3>On device</h3><p>Messages are parsed on your phone. Nothing leaves without your say-so, nothing is sold, deletion is real.</p></article>
    <article><h3>Made for waves</h3><p>Salary or gig bursts, the month still adds up. Fundt tracks how you actually earn.</p></article>
    <article><h3>Zero homework</h3><p>No manual entry. Open the app, see the picture, get on with your day.</p></article>
  </section>
  <div class="prov">
    <span>Understands</span>
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
  // 2. CHAT: the whole page is an SMS thread Fundt tidies up.
  // ============================================================
  {
    skill: "impeccable",
    id: "imp-chat",
    tab: "Chat",
    title: "Fundt · Chat",
    contract: `THESIS: The sell happens where the money already talks: the SMS thread. Refuse sections entirely.
OWN-WORLD: Messaging UI - incoming gray MoMo bubbles, Fundt's blue sorted replies, composer = waitlist.
STORY: Scroll a conversation; Fundt answers every noisy SMS with clarity; the composer asks for your email.
FIRST VIEWPORT: Thread header + first exchange.
FORM: Impeccable / Chat. Persuade.`,
    css: RESET + `
:root{${CATS}--bg:#0E1014;--bubble:#1F232B;--ink:#F2F4F7;--muted:rgba(242,244,247,.5);--accent:#0090ff;--line:rgba(242,244,247,.08)}
body{background:var(--bg);color:var(--ink);line-height:1.45}
.thread{max-width:640px;margin:0 auto;min-height:100dvh;display:flex;flex-direction:column}
.t-head{position:sticky;top:0;z-index:10;background:rgba(14,16,20,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line);padding:14px 20px;display:flex;gap:12px;align-items:center}
.t-head img{width:38px;height:38px;border-radius:12px}
.t-head .n{font-weight:700}
.t-head .s{font-size:12px;color:var(--muted)}
.t-head a{margin-left:auto;font-size:13px;color:var(--muted)}
.msgs{flex:1;padding:28px 20px 20px;display:grid;gap:14px;align-content:start}
.daystamp{text-align:center;font-size:11.5px;color:var(--muted);margin:10px 0 2px}
.in,.out{max-width:82%;border-radius:18px;padding:12px 15px;font-size:14px}
.in{background:var(--bubble);color:var(--muted);justify-self:start;border-bottom-left-radius:6px}
.out{background:var(--accent);color:#fff;justify-self:end;border-bottom-right-radius:6px}
.out .card{background:rgba(0,0,0,.22);border-radius:12px;padding:10px 12px;margin-top:8px;display:flex;justify-content:space-between;align-items:center;gap:14px}
.out .card .cat{font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:#fff;color:#0E1014}
.out .card .amt{font-weight:700}
.big{justify-self:center;text-align:center;margin:26px 0 6px}
.big h1{font-size:clamp(1.7rem,5.5vw,2.4rem);letter-spacing:-.02em}
.big p{margin-top:8px;color:var(--muted);font-size:.98rem;max-width:38ch}
.sum{justify-self:end;max-width:86%;background:var(--accent);color:#fff;border-radius:18px;border-bottom-right-radius:6px;padding:14px 16px;font-size:14px}
.sum .rows{margin-top:10px;display:grid;gap:6px;font-size:13px}
.sum .rows div{display:flex;justify-content:space-between;gap:20px}
.sum .rows i{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:7px}
.sum .tot{border-top:1px solid rgba(255,255,255,.3);margin-top:8px;padding-top:8px;font-weight:700;display:flex;justify-content:space-between}
.note-line{justify-self:center;font-size:11.5px;color:var(--muted)}
.composer{position:sticky;bottom:0;background:rgba(14,16,20,.94);backdrop-filter:blur(10px);border-top:1px solid var(--line);padding:14px 20px 18px}
.composer .hint{font-size:12px;color:var(--muted);margin-bottom:8px;text-align:center}
.waitlist-form{display:flex;gap:8px}
.waitlist-input{flex:1;background:var(--bubble);border:1px solid var(--line);border-radius:999px;padding:13px 18px;font-size:14px}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.45)}
.btn{border:0;border-radius:999px;padding:13px 20px;font-weight:700;background:var(--accent);color:#fff;cursor:pointer;white-space:nowrap}
.waitlist-note{margin-top:8px;font-size:12px;color:var(--muted);text-align:center}
.waitlist-note.success{color:#4ade80}.waitlist-note.error{color:#fb7185}
.msg-anim{animation:up .5s ease both}
@keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
`,
    body: `
<div class="thread">
  <header class="t-head">
    <img src="../assets/icon.png" alt="" />
    <div><div class="n">Fundt</div><div class="s">reads your MoMo messages · on device</div></div>
    <a href="../privacy.html">Privacy</a>
  </header>
  <main class="msgs" id="top">
    <div class="big">
      <h1>Your money already texts you.<br />Fundt texts back.</h1>
      <p>A sample conversation between your MoMo inbox and Fundt. All data below is illustrative.</p>
    </div>
    <p class="daystamp">Tuesday</p>
    <div class="in msg-anim">*S* You have paid 4,500 RWF to WASAC LTD. Fee 0 RWF. New balance…</div>
    <div class="out msg-anim">Logged.<div class="card"><span class="cat">⚡ Electricity</span><span class="amt">R₣ 4,500</span></div></div>
    <div class="in msg-anim">*S* 300 RWF paid to Tap&Go…</div>
    <div class="out msg-anim">Logged.<div class="card"><span class="cat">🚌 Transport</span><span class="amt">R₣ 300</span></div></div>
    <div class="in msg-anim">*S* You sent 15,000 RWF to Aline U. Fee 100 RWF…</div>
    <div class="out msg-anim">Logged - fee kept out of your budget.<div class="card"><span class="cat">👨‍👩‍👧 Friends & Family</span><span class="amt">R₣ 15,000</span></div></div>
    <p class="daystamp">Month-end</p>
    <div class="sum msg-anim">
      Here's your month. No typing happened.
      <div class="rows">
        <div><span>👨‍👩‍👧 Friends & Family</span><span>21,000</span></div>
        <div><span>⚡ Electricity</span><span>12,500</span></div>
        <div><span>🛒 Groceries</span><span>9,800</span></div>
        <div><span>🚌 Transport</span><span>6,300</span></div>
      </div>
      <div class="tot"><span>Total</span><span>R₣ 56,100</span></div>
    </div>
    <p class="note-line">Everything stays on your phone. Never sold. Deleted means deleted.</p>
  </main>
  <div class="composer" id="waitlist">
    <p class="hint">Want this conversation for real? Leave your email.</p>
    <form class="waitlist-form" novalidate>
      <input type="email" name="email" class="waitlist-input" placeholder="you@example.com" autocomplete="email" required aria-label="Email address" />
      <button type="submit" class="btn">Join</button>
    </form>
    <p class="waitlist-note" data-default="One email when Fundt ships. Maybe two.">One email when Fundt ships. Maybe two.</p>
  </div>
</div>`,
  },

  // ============================================================
  // 3. AVERAGE: six-month average chart locked in a half-phone.
  // ============================================================
  {
    skill: "impeccable",
    id: "imp-donut",
    tab: "Average",
    title: "Fundt · Average",
    contract: `THESIS: One chart answers the month's question - lead with the real six-month average spend from category detail. Refuse decorative heroes.
OWN-WORLD: Paper white page; Fundt half-phone (#111116) with CategorySixMonthChart; category legend as typographic list with app emojis. Nunito.
STORY: See the answer first, learn the mechanism second, join third.
FIRST VIEWPORT: Half-phone six-month chart + category legend + waitlist.
FORM: Impeccable / Average. Persuade.`,
    css: RESET + `
:root{${CATS}--bg:#FDFDFE;--ink:#12161C;--muted:#68727F;--line:rgba(18,22,28,.09);--accent:#0090ff;--page:#111116;--surface:#212225;--title:#edeef0;--soft:rgba(240,240,245,.45);--body:rgba(240,240,245,.72);--below:#3D9B6A;--above:#8b8d98;--link:#70b8ff}
body{background:var(--bg);color:var(--ink);line-height:1.5}
.nav{display:flex;justify-content:space-between;align-items:center;padding:20px 28px;max-width:1160px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a.link{color:var(--muted);font-size:14px}
.hero{max-width:1160px;margin:0 auto;padding:28px 28px 0;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end}
.phone-stage{position:relative;max-width:360px;width:100%;margin:0 auto;height:min(420px,58vw);overflow:hidden;isolation:isolate}
.phone-stage::after{content:"";position:absolute;left:8%;right:8%;bottom:0;height:72px;background:linear-gradient(to bottom,transparent,var(--bg));pointer-events:none;z-index:2}
.app{background:#000;border-radius:44px;padding:11px;border:1px solid rgba(18,22,28,.12);box-shadow:0 36px 80px rgba(18,22,28,.18);transform:translateY(8px);animation:rise .9s cubic-bezier(.2,.9,.3,1) both}
@keyframes rise{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(8px)}}
.screen{background:var(--page);border-radius:36px;overflow:hidden;padding:18px 16px 28px;color:var(--title);min-height:520px}
.status{display:flex;justify-content:space-between;font-size:11px;color:var(--soft);padding:0 4px 12px}
.hist-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
.hist-head .t{font-size:17px;font-weight:700;letter-spacing:-.02em}
.hist-head .pill{font-size:11px;font-weight:700;color:var(--soft);background:rgba(255,255,255,.1);border-radius:999px;padding:7px 10px}
.six{margin-top:2px}
.six .eyebrow{font-size:10px;font-weight:700;letter-spacing:.07em;color:var(--soft)}
.six .amt{display:flex;align-items:baseline;gap:3px;margin-top:4px}
.six .amt .n{font-size:30px;font-weight:700;letter-spacing:-.03em;color:#f0f0f5;line-height:1.15}
.six .amt .c{font-size:14px;font-weight:500;color:var(--soft)}
.six-leg{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;font-size:11px;color:var(--soft)}
.six-leg i{display:inline-block;width:8px;height:8px;margin-right:5px;vertical-align:middle;border-radius:1px}
.chart{position:relative;height:148px;margin-top:10px}
/* avg ≈ 57.85k / 71k max → ~81.5% of 130px plot + 18px month labels */
.avg-line{position:absolute;left:4px;right:4px;bottom:124px;border-top:1px dashed rgba(240,240,245,.28);z-index:1}
.bars{position:absolute;inset:0 0 18px;display:grid;grid-template-columns:repeat(6,1fr);gap:8px;align-items:end;padding:0 4px;z-index:2}
.bar-col{height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:4px;min-width:0}
.bar-col .val{font-size:10px;font-weight:700;color:#f0f0f5;opacity:0;transform:translateY(3px);transition:opacity .15s,transform .15s}
.bar-col.sel .val{opacity:1;transform:none}
.bar{width:100%;border-radius:0;box-shadow:inset 0 3px 0 rgba(255,255,255,.78)}
.bar.below{background:linear-gradient(to bottom,#3D9B6A 0%,rgba(61,155,106,.72) 12%,rgba(61,155,106,.22) 55%,transparent)}
.bar.above{background:repeating-linear-gradient(135deg,rgba(255,255,255,.08) 0 3px,transparent 3px 7px),linear-gradient(to bottom,#8b8d98 0%,rgba(139,141,152,.55) 12%,rgba(139,141,152,.18) 55%,transparent);box-shadow:inset 0 3px 0 #8b8d98}
.bar-col.sel .bar{background:linear-gradient(to bottom,#0090ff 0%,rgba(0,144,255,.78) 12%,rgba(0,144,255,.22) 55%,transparent);box-shadow:inset 0 3px 0 #64D2FF}
.months{position:absolute;left:4px;right:4px;bottom:0;display:grid;grid-template-columns:repeat(6,1fr);gap:8px;text-align:center;font-size:10px;font-weight:500;color:var(--soft)}
.months .on{font-weight:700;color:#fff}
.months .sel{color:var(--link);font-weight:700}
.mock-note{text-align:center;font-size:12px;color:var(--muted);margin-top:10px;position:relative;z-index:3}
.hero-copy{padding-bottom:28px}
.hero-copy h1{font-size:clamp(2.4rem,4.6vw,3.7rem);line-height:1.05;letter-spacing:-.02em}
.legend{margin-top:26px;display:grid;gap:0;border-top:1px solid var(--line)}
.legend div{display:flex;justify-content:space-between;align-items:center;padding:13px 2px;border-bottom:1px solid var(--line);font-size:15px}
.legend .l{display:flex;align-items:center;gap:10px;font-weight:700}
.legend .e{width:28px;height:28px;border-radius:8px;background:rgba(18,22,28,.06);display:grid;place-items:center;font-size:15px;flex:none}
.legend .v{color:var(--muted)}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;margin-top:26px}
.waitlist-input{flex:1;min-width:200px;border:1px solid var(--line);border-radius:14px;padding:14px 16px;background:#fff}
.waitlist-input:focus{outline:2px solid rgba(0,144,255,.35)}
.btn{border:0;border-radius:14px;padding:14px 24px;font-weight:700;background:var(--ink);color:#fff;cursor:pointer}
.btn:hover{background:var(--accent)}
.waitlist-note{margin-top:12px;font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#15803d}.waitlist-note.error{color:#b91c1c}
.how{max-width:1160px;margin:100px auto 0;padding:0 28px}
.how h2{font-size:clamp(1.7rem,3.2vw,2.4rem);letter-spacing:-.02em;max-width:20ch}
.how-rows{margin-top:32px;display:grid;gap:0;border-top:1px solid var(--line)}
.how-row{display:grid;grid-template-columns:56px 1fr 1.2fr;gap:20px;align-items:baseline;padding:26px 2px;border-bottom:1px solid var(--line)}
.how-row .n{font-weight:700;color:var(--accent);font-size:1.1rem}
.how-row h3{font-size:1.1rem}
.how-row p{color:var(--muted);font-size:.97rem}
.prov{max-width:1160px;margin:0 auto;padding:56px 28px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.prov span{font-size:13px;color:var(--muted);font-weight:700;margin-right:8px}
.prov img{width:42px;height:42px;border-radius:10px;object-fit:cover;border:1px solid var(--line)}
.cta{max-width:1160px;margin:0 auto;padding:0 28px 80px;text-align:center}
.cta .in{background:var(--ink);color:#fff;border-radius:28px;padding:56px 32px}
.cta h2{font-size:clamp(1.7rem,3.4vw,2.5rem)}
.cta p{margin-top:10px;color:rgba(255,255,255,.6)}
.cta .waitlist-form{justify-content:center}
.cta .waitlist-input{background:#22262d;border-color:rgba(255,255,255,.14);color:#fff}
.cta .btn{background:var(--accent)}
.cta .waitlist-note{color:rgba(255,255,255,.55)}
.foot{max-width:1160px;margin:0 auto;padding:22px 28px;display:flex;justify-content:space-between;color:var(--muted);font-size:13px;border-top:1px solid var(--line)}
@media(max-width:920px){.hero{grid-template-columns:1fr;align-items:stretch;gap:20px}.phone-stage{height:360px;max-width:320px}.hero-copy{padding-bottom:8px}.how-row{grid-template-columns:40px 1fr}.how-row p{grid-column:2}}
`,
    body: `
<header class="nav">
  <a class="brand" href="#top"><img src="../assets/icon.png" alt="" />Fundt</a>
  <a class="link" href="../privacy.html">Privacy</a>
</header>
<main id="top">
  <section class="hero">
    <div>
      <div class="phone-stage" aria-label="Sample Fundt six-month average spending chart for a category">
        <div class="app">
          <div class="screen">
            <div class="status"><span>9:41</span><span>●●●</span></div>
            <div class="hist-head">
              <div class="t">Groceries</div>
              <span class="pill">Feb to Jul</span>
            </div>
            <div class="six">
              <div class="eyebrow">AVERAGE SPENDING</div>
              <div class="amt"><span class="n">57,850</span><span class="c">R₣</span></div>
              <div class="six-leg">
                <span><i style="background:#0090ff"></i>Selected</span>
                <span><i style="background:#3D9B6A"></i>Below</span>
                <span><i style="background:#8b8d98"></i>Above</span>
              </div>
              <div class="chart">
                <div class="avg-line" aria-hidden="true"></div>
                <div class="bars">
                  <div class="bar-col"><span class="val">48k</span><div class="bar below" style="height:68%"></div></div>
                  <div class="bar-col"><span class="val">62k</span><div class="bar above" style="height:87%"></div></div>
                  <div class="bar-col"><span class="val">52k</span><div class="bar below" style="height:73%"></div></div>
                  <div class="bar-col"><span class="val">71k</span><div class="bar above" style="height:100%"></div></div>
                  <div class="bar-col"><span class="val">58k</span><div class="bar above" style="height:82%"></div></div>
                  <div class="bar-col sel"><span class="val">56k</span><div class="bar" style="height:79%"></div></div>
                </div>
                <div class="months"><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span class="sel on">JUL</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="mock-note">Sample · six-month average on a category · iOS auto-capture · Android coming</p>
    </div>
    <div class="hero-copy">
      <h1>Where did it go?<br />Answered.</h1>
      <div class="legend">
        <div><span class="l"><span class="e">👨‍👩‍👧</span>Friends & Family</span><span class="v">R₣ 21,000 · 37%</span></div>
        <div><span class="l"><span class="e">🛒</span>Groceries</span><span class="v">R₣ 12,500 · 22%</span></div>
        <div><span class="l"><span class="e">🍽️</span>Restaurants</span><span class="v">R₣ 9,800 · 18%</span></div>
        <div><span class="l"><span class="e">🚌</span>Transport</span><span class="v">R₣ 6,300 · 11%</span></div>
        <div><span class="l"><span class="e">📱</span>Phone Bill</span><span class="v">R₣ 6,500 · 12%</span></div>
      </div>
      <div id="waitlist">${waitlist()}</div>
    </div>
  </section>
  <section class="how">
    <h2>SMS captures. You categorize.</h2>
    <div class="how-rows">
      <div class="how-row"><span class="n">1</span><h3>From Fundt or outside</h3><p>Dial *182* from the app, or use MoMo as usual. The confirmation SMS is the receipt.</p></div>
      <div class="how-row"><span class="n">2</span><h3>Capture & confirm</h3><p>Optional iOS capture logs outside MoMo activity and confirms in-app payments. Nothing is auto-sorted into a category. Android capture is coming.</p></div>
      <div class="how-row"><span class="n">3</span><h3>You categorize later</h3><p>Untracked MoMo activity waits for you. Once you assign buckets, categories, budgets, and charts like average spending, the month becomes clear.</p></div>
    </div>
  </section>
  <div class="prov">
    <span>Bills you already pay on MoMo</span>
    <img src="../assets/electricity.png" alt="Electricity" />
    <img src="../assets/wasac.png" alt="WASAC" />
    <img src="../assets/canal-plus.png" alt="Canal+" />
    <img src="../assets/tap-and-go.png" alt="Tap and Go" />
    <img src="../assets/phone-bill.png" alt="Phone bill" />
    <img src="../assets/rra.png" alt="RRA" />
  </div>
  <section class="cta">
    <div class="in">
      <h2>Your month is waiting.</h2>
      <p>Join the waitlist and be first when Fundt ships.</p>
      ${waitlist()}
    </div>
  </section>
</main>
<footer class="foot"><span>Fundt</span><span><a href="../privacy.html">Privacy</a> · © <span data-year></span></span></footer>`,
  },

  // ============================================================
  // 4. ZERO: the entire pitch in one viewport. Nothing scrolls.
  // ============================================================
  {
    skill: "impeccable",
    id: "imp-zero",
    tab: "Zero",
    title: "Fundt · Zero",
    contract: `THESIS: If the offer is truly simple, one screen should sell it. Refuse the scroll.
OWN-WORLD: Single 100dvh composition, ink on white, one blue action. Nunito 700 display.
STORY: Read one sentence, believe three chips, act. Ten seconds total.
FIRST VIEWPORT: Everything. There is nothing else.
FORM: Impeccable / Zero. Persuade.`,
    css: RESET + `
:root{${CATS}--bg:#FFFFFF;--ink:#0F1319;--muted:#66707D;--line:rgba(15,19,25,.1);--accent:#0090ff}
html,body{height:100%}
body{background:var(--bg);color:var(--ink);overflow:hidden}
.one{height:100dvh;display:grid;grid-template-rows:auto 1fr auto;max-width:1100px;margin:0 auto;padding:0 28px}
.top{display:flex;justify-content:space-between;align-items:center;padding:22px 0}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.top a{color:var(--muted);font-size:14px}
.mid{display:grid;place-content:center;text-align:center;gap:26px;justify-items:center}
.mid img.mark{width:72px;height:72px;border-radius:18px;box-shadow:0 12px 32px rgba(0,144,255,.25)}
.mid h1{font-size:clamp(2.4rem,6vw,4.4rem);letter-spacing:-.03em;line-height:1.02;max-width:15ch}
.mid h1 em{font-style:normal;color:var(--accent)}
.mid .sub{color:var(--muted);font-size:clamp(1rem,2vw,1.2rem);max-width:44ch}
.chips{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.chips span{font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px;border:1.5px solid var(--line)}
.chips span b{color:var(--accent)}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;width:min(520px,100%)}
.waitlist-input{flex:1;min-width:220px;border:1.5px solid var(--line);border-radius:999px;padding:15px 20px;font-size:15px}
.waitlist-input:focus{outline:3px solid rgba(0,144,255,.3);border-color:var(--accent)}
.btn{border:0;border-radius:999px;padding:15px 28px;font-weight:700;font-size:15px;background:var(--accent);color:#fff;cursor:pointer;transition:transform .12s}
.btn:hover{transform:translateY(-2px)}
.waitlist-note{font-size:13px;color:var(--muted)}
.waitlist-note.success{color:#15803d}.waitlist-note.error{color:#b91c1c}
.bottom{display:flex;justify-content:space-between;align-items:center;padding:20px 0;gap:16px;flex-wrap:wrap}
.bottom .provs{display:flex;gap:8px;align-items:center}
.bottom .provs span{font-size:12px;color:var(--muted);margin-right:6px}
.bottom .provs img{width:30px;height:30px;border-radius:8px;object-fit:cover;border:1px solid var(--line)}
.bottom .legal{font-size:12.5px;color:var(--muted)}
@media(max-height:640px){.mid{gap:16px}.mid img.mark{width:52px;height:52px}}
`,
    body: `
<div class="one" id="top">
  <header class="top">
    <span class="brand"><img src="../assets/icon.png" alt="" />Fundt</span>
    <a href="../privacy.html">Privacy</a>
  </header>
  <main class="mid">
    <img class="mark" src="../assets/icon.png" alt="Fundt app icon" />
    <h1>Know where your <em>MoMo</em> goes.</h1>
    <p class="sub">Fundt reads the payment messages already on your phone and sorts your month for you. That's it. That's the app.</p>
    <div class="chips">
      <span><b>●</b> Stays on your phone</span>
      <span><b>●</b> Sorts itself</span>
      <span><b>●</b> Zero homework</span>
    </div>
    <div id="waitlist">
      <form class="waitlist-form" novalidate>
        <input type="email" name="email" class="waitlist-input" placeholder="you@example.com" autocomplete="email" required aria-label="Email address" />
        <button type="submit" class="btn">Join the Waitlist</button>
      </form>
    </div>
    <p class="waitlist-note" data-default="One email when Fundt ships. Maybe two.">One email when Fundt ships. Maybe two.</p>
  </main>
  <footer class="bottom">
    <div class="provs">
      <span>Understands</span>
      <img src="../assets/electricity.png" alt="Electricity" />
      <img src="../assets/wasac.png" alt="WASAC" />
      <img src="../assets/canal-plus.png" alt="Canal+" />
      <img src="../assets/tap-and-go.png" alt="Tap and Go" />
      <img src="../assets/phone-bill.png" alt="Phone bill" />
    </div>
    <span class="legal">© <span data-year></span> Fundt</span>
  </footer>
</div>`,
  },

  // ============================================================
  // 5. MARKET: full-bleed color blocks, Kigali-market energy.
  // ============================================================
  {
    skill: "impeccable",
    id: "imp-market",
    tab: "Market",
    title: "Fundt · Market",
    contract: `THESIS: Money in Rwanda is loud, colorful, alive - the landing should be too. Refuse fintech gray.
OWN-WORLD: Full-bleed saturated blocks (cobalt, mango, leaf, ink), marquee. Nunito 700 at poster scale.
STORY: Joy first, mechanism second, trust third, action last.
FIRST VIEWPORT: Cobalt block with giant claim + waitlist.
FORM: Impeccable / Market. Persuade.`,
    css: RESET + `
:root{${CATS}--cobalt:#0057D8;--mango:#FFB800;--leaf:#00A860;--ink:#12141A;--paper:#FFF9F0}
body{background:var(--ink);color:#fff;line-height:1.45}
.block{padding:88px 28px;position:relative;overflow:hidden}
.block-in{max-width:1060px;margin:0 auto}
.b-cobalt{background:var(--cobalt)}
.b-mango{background:var(--mango);color:var(--ink)}
.b-leaf{background:var(--leaf)}
.b-ink{background:var(--ink)}
.nav{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:20px 28px;max-width:1060px;margin:0 auto}
.brand{display:flex;gap:10px;align-items:center;font-weight:700;font-size:18px}
.brand img{width:32px;height:32px;border-radius:9px}
.nav a{font-size:14px;opacity:.8}
.hero-block{min-height:100dvh;display:grid;align-items:center;padding-top:110px}
.hero-block h1{font-size:clamp(3rem,9vw,7rem);line-height:.98;letter-spacing:-.03em;max-width:11ch}
.hero-block .sub{margin-top:22px;font-size:clamp(1.05rem,2vw,1.3rem);opacity:.85;max-width:38ch}
.waitlist-form{display:flex;gap:10px;flex-wrap:wrap;margin-top:32px}
.waitlist-input{flex:1;min-width:220px;border:0;border-radius:14px;padding:16px 18px;font-size:15px;background:rgba(255,255,255,.94);color:var(--ink)}
.waitlist-input:focus{outline:3px solid rgba(255,184,0,.7)}
.btn{border:0;border-radius:14px;padding:16px 26px;font-weight:700;font-size:15px;background:var(--ink);color:#fff;cursor:pointer;transition:transform .12s}
.btn:hover{transform:translateY(-2px)}
.waitlist-note{margin-top:12px;font-size:13px;opacity:.75}
.waitlist-note.success{color:#B7FFD2}.waitlist-note.error{color:#FFD2CC}
.marquee{background:var(--ink);border-block:3px solid #fff;padding:16px 0;overflow:hidden;white-space:nowrap}
.mq{display:inline-flex;gap:44px;font-weight:700;font-size:clamp(1rem,2.4vw,1.4rem);animation:mq 24s linear infinite;padding-right:44px}
@keyframes mq{to{transform:translateX(-50%)}}
.mq span:nth-child(6n+1){color:var(--mango)}.mq span:nth-child(6n+2){color:#fff}.mq span:nth-child(6n+3){color:#7CC4FF}.mq span:nth-child(6n+4){color:#B7FFD2}.mq span:nth-child(6n+5){color:#FFB4C8}.mq span:nth-child(6n){color:#fff}
.b-mango h2,.b-leaf h2,.b-ink h2{font-size:clamp(2rem,5vw,3.4rem);letter-spacing:-.02em;line-height:1.02;max-width:16ch}
.b-mango .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px}
.tagcard{background:#fff;border-radius:16px;padding:20px;color:var(--ink);transform:rotate(-1deg);box-shadow:0 12px 30px rgba(0,0,0,.14)}
.tagcard:nth-child(even){transform:rotate(1.2deg)}
.tagcard img{width:46px;height:46px;border-radius:10px;object-fit:cover;margin-bottom:12px}
.tagcard .t{font-weight:700}
.tagcard .d{font-size:13px;opacity:.65;margin-top:2px}
.b-leaf p.lead{margin-top:18px;font-size:1.1rem;opacity:.9;max-width:44ch}
.trust{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:36px}
.trust div{background:rgba(255,255,255,.14);border:1.5px solid rgba(255,255,255,.35);border-radius:16px;padding:20px;font-weight:700}
.trust small{display:block;font-weight:500;margin-top:6px;opacity:.85;font-size:13px}
.b-ink .center{text-align:center;display:grid;justify-items:center}
.b-ink img.mark{width:64px;height:64px;border-radius:16px;margin-bottom:18px}
.b-ink .waitlist-form{justify-content:center}
.foot{background:var(--ink);padding:20px 28px;display:flex;justify-content:space-between;max-width:1060px;margin:0 auto;font-size:13px;opacity:.6}
@media(max-width:820px){.b-mango .grid,.trust{grid-template-columns:1fr}}
`,
    body: `
<main id="top">
  <section class="block b-cobalt hero-block">
    <nav class="nav">
      <span class="brand"><img src="../assets/icon.png" alt="" />Fundt</span>
      <a href="../privacy.html">Privacy</a>
    </nav>
    <div class="block-in">
      <h1>Every franc, accounted for.</h1>
      <p class="sub">Fundt reads MoMo SMS to capture MoMo activity outside the app and confirm payments you start in Fundt. You categorize later: bills, rides, phone, people, while you live your life.</p>
      <div id="waitlist">
        <form class="waitlist-form" novalidate>
          <input type="email" name="email" class="waitlist-input" placeholder="you@example.com" autocomplete="email" required aria-label="Email address" />
          <button type="submit" class="btn">Join the Waitlist</button>
        </form>
        <p class="waitlist-note" data-default="One email when Fundt ships. Maybe two.">One email when Fundt ships. Maybe two.</p>
      </div>
    </div>
  </section>
  <div class="marquee" aria-hidden="true">
    <div class="mq">
      <span>AIRTIME</span><span>WASAC</span><span>TAP&GO</span><span>CANAL+</span><span>ELECTRICITY</span><span>TRANSFERS</span>
      <span>AIRTIME</span><span>WASAC</span><span>TAP&GO</span><span>CANAL+</span><span>ELECTRICITY</span><span>TRANSFERS</span>
    </div>
  </div>
  <section class="block b-mango">
    <div class="block-in">
      <h2>The bills you already pay on MoMo.</h2>
      <div class="grid">
        <div class="tagcard"><img src="../assets/electricity.png" alt="" /><div class="t">Electricity</div><div class="d">Cash power paid on MoMo can be captured. You put it in a category when you're ready.</div></div>
        <div class="tagcard"><img src="../assets/wasac.png" alt="" /><div class="t">WASAC</div><div class="d">Water bills you already pay with MoMo, ready to track in your month.</div></div>
        <div class="tagcard"><img src="../assets/tap-and-go.png" alt="" /><div class="t">Tap&Go</div><div class="d">Even the small fares, the 300 R₣ ones that hide.</div></div>
        <div class="tagcard"><img src="../assets/canal-plus.png" alt="" /><div class="t">Canal+</div><div class="d">Subscriptions stop hiding in the noise.</div></div>
        <div class="tagcard"><img src="../assets/phone-bill.png" alt="" /><div class="t">Phone Bill & airtime</div><div class="d">The small payments that eat the month. Capture first, categorize later.</div></div>
        <div class="tagcard"><img src="../assets/rra.png" alt="" /><div class="t">RRA & more</div><div class="d">If you paid it on MoMo, Fundt can capture it for you to categorize.</div></div>
      </div>
    </div>
  </section>
  <section class="block b-leaf">
    <div class="block-in">
      <h2>Loud page. Quiet app.</h2>
      <p class="lead">Your money data never joins a market. It stays on your phone by default, shown to you alone. Backup is optional. Delete anytime.</p>
      <div class="trust">
        <div>On device<small>SMS stays local unless you turn on backup.</small></div>
        <div>Never sold<small>No fine print that says otherwise.</small></div>
        <div>Actually deleted<small>Clear local data anytime. Signed-in accounts get a short grace period, then they're gone.</small></div>
      </div>
    </div>
  </section>
  <section class="block b-ink">
    <div class="block-in center">
      <img class="mark" src="../assets/icon.png" alt="Fundt" />
      <h2>Be first in line.</h2>
      <form class="waitlist-form" novalidate>
        <input type="email" name="email" class="waitlist-input" placeholder="you@example.com" autocomplete="email" required aria-label="Email address" />
        <button type="submit" class="btn" style="background:var(--cobalt)">Join the Waitlist</button>
      </form>
      <p class="waitlist-note" data-default="One email when Fundt ships. Maybe two.">One email when Fundt ships. Maybe two.</p>
    </div>
  </section>
</main>
<footer class="foot"><span>Fundt</span><span><a href="../privacy.html">Privacy</a> · © <span data-year></span></span></footer>`,
  },
];
