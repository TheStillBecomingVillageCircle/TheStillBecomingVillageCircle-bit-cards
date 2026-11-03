(() => {
  'use strict';
  const storageKey = 'bit-connection-celebrated';
  const artwork = new URL('./assets/connection-spark.jpeg', document.currentScript.src).href;
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
    overlay.innerHTML = '<div class="bit-ceremony-card"><img class="bit-ceremony-artwork" width="1199" height="1312" alt="" fetchpriority="high" decoding="async"><div class="bit-ceremony-copy"><h2 id="bit-ceremony-heading">Connection Creates the Spark</h2><p id="bit-ceremony-description">Two hearts. One electric connection. A Little B.I.T. of Connection Goes a Long Way.</p></div><span class="bit-ceremony-spark" aria-hidden="true"></span><button type="button" class="bit-ceremony-continue" aria-label="Continue Together"><span>Continue Together →</span></button></div>';
    const image = overlay.querySelector('img');
    const button = overlay.querySelector('button');
    image.src = artwork;
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
