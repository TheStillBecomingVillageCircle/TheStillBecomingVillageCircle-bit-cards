(() => {
  'use strict';
  const storageKey = 'bit-connection-celebrated';
  const artwork = new URL('./assets/connection-spark.jpeg', document.currentScript.src).href;
  const motionMarkup = `<svg class="bit-ceremony-motion" viewBox="0 0 1199 1312" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="bit-stage-surface" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#82938b"/><stop offset=".55" stop-color="#bbc3b4"/><stop offset="1" stop-color="#e9e5d7"/></linearGradient>
    <radialGradient id="bit-impact-light"><stop stop-color="#fff" stop-opacity=".95"/><stop offset=".2" stop-color="#eaffec" stop-opacity=".6"/><stop offset="1" stop-color="#9cffe9" stop-opacity="0"/></radialGradient>
    <linearGradient id="bit-lightning-colors"><stop stop-color="#81fff0"/><stop offset=".45" stop-color="#effff8"/><stop offset=".55" stop-color="#fffbdc"/><stop offset="1" stop-color="#ffc16c"/></linearGradient>
    <clipPath id="bit-motion-interior"><path d="M137 34H1061Q1154 34 1154 128V576H1040V558H160V605H44V128Q44 34 137 34Z"/></clipPath>
    <clipPath id="bit-photo-left"><path d="M39 605V526L82 490L97 445L116 411L104 403Q66 394 76 354L157 171Q191 102 230 116Q281 124 349 175Q397 165 433 194Q474 160 515 181Q568 198 570 247Q573 312 541 365L459 482Q431 526 391 502L297 414L214 417L158 413L143 458L121 490L100 532L66 571L61 605Z"/></clipPath>
    <clipPath id="bit-photo-right"><path d="M1164 605V527L1119 490L1101 445L1083 411L1097 403Q1136 394 1123 354L1042 171Q1007 103 968 116Q915 124 848 175Q795 166 764 194Q723 160 682 181Q628 198 628 247Q625 312 657 365L739 482Q768 526 807 502L900 414L984 417L1040 413L1055 458L1079 490L1100 532L1134 571L1142 605Z"/></clipPath>
    <filter id="bit-lightning-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <path id="bit-heart-bolt-path" pathLength="1000" d="M600 454 582 435 568 427 556 409 538 399 526 381 506 369 496 352 476 339 466 323 446 307 440 292 424 279 418 259 407 245 408 225 401 208 405 189 403 174 415 158 419 143 436 132 446 119 466 115 482 107 500 112 519 111 535 123 551 128 563 144 578 155 586 172 600 187 614 171 623 154 639 144 649 128 668 122 683 111 703 113 720 107 738 116 757 119 769 134 784 144 788 160 800 175 796 194 801 210 793 230 793 246 780 260 775 280 759 293 753 309 733 323 722 341 704 352 692 370 674 381 660 399 644 410 631 428 614 436Z"/>
  </defs>
  <g clip-path="url(#bit-motion-interior)">
    <path fill="url(#bit-stage-surface)" d="M40 30H1160V612H1040V558H160V612H40Z"/>
    <ellipse class="bit-ceremony-impact" cx="600" cy="315" rx="195" ry="195" fill="url(#bit-impact-light)"/>
    <g class="bit-photo-paddle bit-photo-paddle-left"><image class="bit-paddle-texture" width="1199" height="1312" clip-path="url(#bit-photo-left)"/></g>
    <g class="bit-photo-paddle bit-photo-paddle-right"><image class="bit-paddle-texture" width="1199" height="1312" clip-path="url(#bit-photo-right)"/></g>
    <g class="bit-heart-lightning" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <use href="#bit-heart-bolt-path" class="bit-heart-bolt-glow" stroke="url(#bit-lightning-colors)" stroke-width="12" filter="url(#bit-lightning-glow)"/>
      <use href="#bit-heart-bolt-path" class="bit-heart-bolt-core" stroke="url(#bit-lightning-colors)" stroke-width="3"/>
      <path class="bit-heart-bolt-branches" stroke="#ecfff7" stroke-width="2" d="M600 315 578 301 587 283 564 269 572 248M600 315 622 299 612 280 638 264 630 246M600 315 582 337 595 350 575 375M600 315 624 336 613 355 635 377"/>
    </g>
  </g>
</svg>
`;
  let currentId = null;
  let known = new Set();
  let ready = false;
  let checking = false;

  function show() {
    if (document.querySelector('.bit-ceremony-overlay')) return;
    const previousFocus = document.activeElement;
    const overlay = document.createElement('div');
    overlay.className = 'bit-ceremony-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'bit-ceremony-heading');
    overlay.setAttribute('aria-describedby', 'bit-ceremony-description');
    overlay.innerHTML = '<div class="bit-ceremony-card"><img class="bit-ceremony-artwork" width="1199" height="1312" alt="" fetchpriority="high" decoding="async"><div class="bit-ceremony-copy"><h2 id="bit-ceremony-heading">Connection Creates the Spark</h2><p id="bit-ceremony-description">Two hearts. One electric connection. A Little B.I.T. of Connection Goes a Long Way.</p></div>' + motionMarkup + '<button type="button" class="bit-ceremony-continue" aria-label="Continue Together"><span>Continue Together →</span></button></div>';
    const image = overlay.querySelector('img');
    const button = overlay.querySelector('button');
    image.src = artwork;
    overlay.querySelectorAll('.bit-paddle-texture').forEach(texture => texture.setAttribute('href', artwork));
    image.addEventListener('load', () => overlay.classList.add('bit-ceremony-art-ready'), { once: true });
    if (image.complete && image.naturalWidth) overlay.classList.add('bit-ceremony-art-ready');
    image.addEventListener('error', () => overlay.classList.add('bit-ceremony-image-error'), { once: true });
    const background = [...document.body.children];
    const inertBefore = background.map(node => node.inert);
    const overflowBefore = document.body.style.overflow;
    const close = () => {
      overlay.remove();
      document.removeEventListener('keydown', keydown);
      background.forEach((node, index) => { node.inert = inertBefore[index]; });
      document.body.style.overflow = overflowBefore;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
      window.dispatchEvent(new CustomEvent('bit-ceremony-completed'));
    };
    const keydown = event => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') { event.preventDefault(); button.focus(); }
    };
    button.addEventListener('click', close);
    document.addEventListener('keydown', keydown);
    document.body.append(overlay);
    background.forEach(node => { node.inert = true; });
    document.body.style.overflow = 'hidden';
    button.focus({ preventScroll: true });
  }

  function ids() {
    try { return new Set(JSON.parse(localStorage.getItem(storageKey + ':' + currentId) || '[]')); }
    catch { return new Set(); }
  }
  function save(set) {
    try { localStorage.setItem(storageKey + ':' + currentId, JSON.stringify([...set].slice(-100))); }
    catch { /* A storage restriction must not prevent the ceremony. */ }
  }
  function replayControl(visible) {
    const host = document.getElementById('bit-connections');
    if (!host) return;
    let button = document.getElementById('bit-replay-ceremony');
    if (!button && visible) {
      button = document.createElement('button');
      button.type = 'button';
      button.id = 'bit-replay-ceremony';
      button.className = 'bit-replay-ceremony';
      button.textContent = 'Replay Our Connection Spark';
      button.addEventListener('click', show);
      host.append(button);
    }
    if (button) button.hidden = !visible;
  }
  async function check() {
    const db = window.bitCardsDb;
    if (!db || checking) return;
    checking = true;
    try {
      const { data: auth } = await db.auth.getUser();
      const user = auth?.user;
      if (!user) { currentId = null; known = new Set(); ready = false; replayControl(false); return; }
      if (currentId !== user.id) { currentId = user.id; ready = false; known = ids(); }
      const { data, error } = await db.from('connection_requests').select('id,status').eq('status', 'accepted');
      if (error || !data || currentId !== user.id) return;
      const accepted = new Set(data.map(row => String(row.id)));
      replayControl(accepted.size > 0);
      if (!ready) { for (const id of accepted) known.add(id); save(known); ready = true; return; }
      const fresh = [...accepted].filter(id => !known.has(id));
      if (fresh.length) { for (const id of fresh) known.add(id); save(known); show(); }
    } finally { checking = false; }
  }
  window.bitReplayConnectionCeremony = show;
  window.addEventListener('bit-connection-accepted', async event => {
    const id = String(event.detail?.connectionId || '');
    if (!id) return;
    const user = (await window.bitCardsDb?.auth.getUser())?.data?.user;
    if (!user) return;
    if (currentId !== user.id) { currentId = user.id; known = ids(); ready = false; }
    const celebrated = ids();
    if (celebrated.has(id)) return;
    celebrated.add(id); known.add(id); save(celebrated);
    replayControl(true);
    show();
  });
  const refresh = () => { check().catch(() => {}); };
  window.addEventListener('bit-account-changed', refresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  setInterval(() => { if (!document.hidden) refresh(); }, 20000);
  setTimeout(refresh, 1500);
  // Presentation only: no request acceptance or account changes.
  if (new URLSearchParams(location.search).get('ceremony') === 'preview') show();
})();
