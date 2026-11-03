(() => {
  'use strict';
  const storageKey = 'bit-connection-celebrated';
  const artwork = new URL('./assets/connection-spark.jpeg', document.currentScript.src).href;
  const motionMarkup = `<svg class="bit-ceremony-motion" viewBox="0 0 1199 1312" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="bit-stage-surface" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#82938b"/><stop offset=".55" stop-color="#bbc3b4"/><stop offset="1" stop-color="#e9e5d7"/></linearGradient>
    <radialGradient id="bit-impact-light"><stop stop-color="#fff" stop-opacity=".95"/><stop offset=".2" stop-color="#eaffec" stop-opacity=".6"/><stop offset="1" stop-color="#9cffe9" stop-opacity="0"/></radialGradient>
    <linearGradient id="bit-lightning-colors"><stop stop-color="#81fff0"/><stop offset=".45" stop-color="#effff8"/><stop offset=".55" stop-color="#fffbdc"/><stop offset="1" stop-color="#ffc16c"/></linearGradient>
    <linearGradient id="bit-scene-feather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="white"/><stop offset=".87" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient>
    <mask id="bit-scene-blend" maskUnits="userSpaceOnUse" x="0" y="0" width="1199" height="600"><rect width="1199" height="600" fill="url(#bit-scene-feather)"/></mask>
    <clipPath id="bit-motion-interior"><path d="M137 34H1061Q1154 34 1154 128V605H44V128Q44 34 137 34Z"/></clipPath>
    <clipPath id="bit-photo-left"><path d="M39 605V526L82 490L97 445L116 411L104 403Q66 394 76 354L157 171Q191 102 230 116Q281 124 349 175Q397 165 433 194Q474 160 515 181Q568 198 570 247Q573 312 541 365L459 482Q431 526 391 502L297 414L214 417L158 413L143 458L121 490L100 532L66 571L61 605Z"/></clipPath>
    <clipPath id="bit-photo-right"><path d="M1164 605V527L1119 490L1101 445L1083 411L1097 403Q1136 394 1123 354L1042 171Q1007 103 968 116Q915 124 848 175Q795 166 764 194Q723 160 682 181Q628 198 628 247Q625 312 657 365L739 482Q768 526 807 502L900 414L984 417L1040 413L1055 458L1079 490L1100 532L1134 571L1142 605Z"/></clipPath>
    <filter id="bit-lightning-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <path id="bit-heart-bolt-path" d="M600.0 454.0 L594.9 446.2 L588.8 439.3 L581.1 433.9 L572.0 431.6 L565.5 424.5 L563.7 415.0 L557.3 407.7 L548.0 405.0 L545.9 395.0 L539.6 386.9 L534.6 377.9 L525.8 372.4 L515.4 372.3 L506.9 366.0 L498.3 360.9 L491.0 354.0 L485.5 346.4 L479.2 339.4 L472.8 332.3 L469.1 323.6 L459.4 321.5 L450.8 316.4 L444.0 309.1 L440.0 300.0 L435.4 293.0 L436.5 284.7 L433.0 277.1 L435.2 269.0 L431.6 261.7 L424.7 257.4 L420.1 250.2 L412.0 248.0 L408.4 242.5 L406.6 236.1 L406.7 229.5 L409.2 223.3 L403.0 219.4 L401.2 212.3 L403.8 205.9 L404.0 199.0 L407.4 192.7 L404.6 186.1 L406.0 179.6 L409.9 174.3 L411.8 168.2 L413.1 161.8 L415.7 155.9 L420.0 151.0 L424.0 145.8 L429.8 142.6 L436.3 144.0 L442.8 142.8 L446.5 137.8 L451.5 134.0 L454.9 128.5 L455.0 122.0 L461.3 121.7 L464.0 116.0 L470.0 114.0 L474.6 118.5 L479.0 116.0 L484.1 115.5 L487.1 110.5 L493.0 111.0 L496.1 116.5 L502.2 118.4 L507.5 122.0 L513.8 120.5 L520.2 119.3 L524.7 124.1 L529.8 128.2 L536.0 126.0 L540.4 130.0 L543.8 134.8 L548.6 138.8 L550.0 144.8 L551.9 151.4 L556.9 156.0 L563.4 157.7 L570.0 157.0 L569.1 163.2 L570.1 169.4 L576.6 171.6 L579.0 178.0 L584.4 179.9 L589.4 182.6 L595.6 182.7 L600.0 187.0 L602.1 181.0 L600.9 174.8 L603.5 168.4 L610.3 166.9 L615.8 165.3 L621.0 163.1 L626.4 160.6 L630.0 156.0 L635.6 153.3 L638.5 147.9 L644.4 144.8 L645.0 138.1 L650.7 135.8 L656.8 135.0 L662.8 132.2 L665.0 126.0 L670.6 124.7 L675.4 121.6 L680.7 119.3 L686.5 119.8 L692.2 119.5 L697.6 117.4 L703.4 115.8 L707.0 111.0 L711.8 113.6 L717.0 115.1 L722.4 114.1 L727.8 114.1 L733.2 117.2 L738.7 114.3 L744.4 115.5 L748.0 120.0 L753.9 121.5 L759.9 121.2 L762.5 127.1 L768.4 129.6 L769.8 135.3 L771.9 140.7 L773.7 147.0 L780.0 149.0 L784.4 154.9 L791.4 156.8 L796.9 161.8 L797.5 169.3 L801.5 175.4 L799.9 182.6 L797.1 189.0 L798.0 196.0 L796.1 202.8 L799.5 209.0 L799.8 215.5 L801.9 221.8 L798.1 227.6 L792.5 231.6 L791.5 238.4 L790.0 245.0 L784.0 251.0 L776.4 254.8 L775.3 263.2 L772.3 271.0 L770.9 278.9 L767.9 286.3 L764.4 293.4 L760.0 300.0 L751.0 304.7 L746.3 313.7 L740.7 321.8 L738.6 331.4 L732.9 339.5 L723.7 343.2 L717.0 350.3 L708.0 354.0 L701.3 360.9 L695.4 368.4 L688.6 375.3 L684.1 383.8 L677.4 390.8 L670.8 398.0 L662.3 402.9 L653.0 406.0 L643.6 407.9 L636.4 414.2 L629.4 420.9 L619.9 422.8 L617.0 432.0 L614.6 441.4 L608.3 448.9 L600.0 454.0"/>
  </defs>
  <g clip-path="url(#bit-motion-interior)" mask="url(#bit-scene-blend)">
    <path fill="url(#bit-stage-surface)" d="M40 30H1160V605H40Z"/>
    <ellipse class="bit-ceremony-impact" cx="600" cy="315" rx="195" ry="195" fill="url(#bit-impact-light)"/>
    <g class="bit-photo-paddle bit-photo-paddle-left"><image class="bit-paddle-texture" width="1199" height="1312" clip-path="url(#bit-photo-left)"/></g>
    <g class="bit-photo-paddle bit-photo-paddle-right"><image class="bit-paddle-texture" width="1199" height="1312" clip-path="url(#bit-photo-right)"/></g>
    <path class="bit-contact-bolt" d="M627 227 569 315 597 310 573 400 638 295 610 302Z" fill="url(#bit-lightning-colors)" stroke="#fffef5" stroke-width="2" filter="url(#bit-lightning-glow)"/>
    <g class="bit-heart-lightning" fill="none" stroke-linecap="butt" stroke-linejoin="miter">
      <use href="#bit-heart-bolt-path" class="bit-heart-bolt-glow" stroke="url(#bit-lightning-colors)" stroke-width="5.5" filter="url(#bit-lightning-glow)"/>
      <use href="#bit-heart-bolt-path" class="bit-heart-bolt-core" stroke="#fffef6" stroke-width="1.6"/>
      <path class="bit-heart-bolt-branches" stroke="url(#bit-lightning-colors)" stroke-width="1.15" d="M563.7 415.0 L562.1 422.4 L564.6 429.5 L559.5 434.6 L555.2 440.5 L555.1 447.3 L554.1 454.0 L552.4 460.6 L550.2 467.0M555.2 440.5 L549.8 436.5 L547.6 430.1 L547.6 423.6 L545.8 417.3M515.4 372.3 L509.4 372.3 L506.4 377.5 L503.4 381.8 L501.4 386.6 L498.8 390.9 L496.2 395.2 L493.4 399.6 L489.1 402.4M469.1 323.6 L462.0 325.3 L457.0 330.7 L449.9 330.4 L443.0 328.7 L438.6 334.1 L431.9 336.0 L426.6 340.4 L419.9 341.9M433.0 277.1 L423.6 275.9 L415.1 271.6 L405.8 270.4 L396.5 272.2 L387.3 273.8 L378.7 277.6 L369.5 278.8 L360.2 278.0M396.5 272.2 L392.7 266.9 L387.5 262.8 L385.8 256.4 L383.1 250.5M406.6 236.1 L402.1 230.0 L395.0 227.0 L387.4 226.4 L381.2 221.9 L373.9 224.6 L366.5 222.2 L359.2 222.7 L352.2 225.2M407.4 192.7 L401.9 188.4 L395.0 187.3 L388.1 187.6 L381.6 185.0 L374.9 181.0 L367.4 182.8 L361.6 178.2 L358.2 171.7M420.0 151.0 L410.2 151.2 L401.7 146.3 L395.1 139.5 L388.9 132.3 L379.3 131.0 L372.2 124.3 L368.0 115.7 L360.4 109.9M388.9 132.3 L390.5 134.8 L387.6 135.1 L386.9 138.1 L389.8 137.1M454.9 128.5 L448.1 127.6 L441.3 126.2 L435.0 123.0 L430.6 117.4 L428.2 111.2 L425.6 105.0 L421.0 99.8 L419.8 93.0M484.1 115.5 L479.4 107.6 L478.0 98.5 L473.7 90.1 L465.4 85.6 L456.9 81.7 L450.6 74.9 L444.8 67.6 L442.7 58.5M520.2 119.3 L514.0 113.9 L512.2 105.9 L506.0 101.1 L500.4 95.6 L498.0 88.1 L493.9 81.3 L495.6 73.3 L492.7 65.6M500.4 95.6 L504.7 94.7 L506.3 90.6 L510.5 90.4 L513.4 93.5M550.0 144.8 L545.4 137.1 L539.0 130.7 L535.7 122.4 L533.4 113.7 L530.5 105.2 L526.2 97.4 L528.3 88.3 L524.9 79.6M576.6 171.6 L575.6 162.5 L571.1 154.5 L568.1 146.0 L564.5 137.8 L562.1 128.8 L564.5 119.8 L563.2 110.8 L560.9 102.1M600.9 174.8 L597.0 169.7 L598.9 163.5 L599.3 157.6 L597.0 152.1 L602.5 148.3 L604.6 141.9 L600.3 136.4 L601.4 129.5M597.0 152.1 L593.9 147.2 L591.1 142.2 L586.1 139.0 L582.3 134.5M635.6 153.3 L636.4 145.0 L640.9 137.8 L637.3 130.4 L635.4 122.4 L635.0 113.8 L639.2 106.4 L646.9 103.0 L652.3 96.4M665.0 126.0 L666.6 119.0 L668.0 111.9 L673.8 107.7 L679.0 102.7 L677.5 95.6 L678.4 88.4 L683.1 83.0 L686.5 76.6M703.4 115.8 L703.9 106.9 L705.9 98.3 L713.4 93.2 L717.8 85.3 L723.5 78.1 L732.4 75.7 L733.9 66.7 L739.7 59.7M717.8 85.3 L713.6 80.6 L712.7 74.3 L710.1 68.6 L705.3 64.7M738.7 114.3 L745.4 108.6 L750.1 101.2 L758.7 98.2 L764.2 90.8 L770.5 84.7 L776.6 78.4 L779.1 69.8 L783.7 62.2M769.8 135.3 L775.0 128.5 L782.3 123.9 L790.5 121.0 L796.7 114.9 L802.1 108.2 L809.9 104.3 L814.9 97.4 L821.8 92.4M797.5 169.3 L803.1 164.8 L806.2 158.3 L813.2 157.0 L818.9 152.5 L824.0 147.4 L830.9 145.6 L837.6 142.7 L844.7 144.0M818.9 152.5 L821.8 157.2 L823.7 162.3 L826.8 166.9 L831.6 169.8M799.8 215.5 L805.8 213.5 L811.7 211.4 L817.5 208.0 L819.9 201.7 L825.5 205.1 L831.9 206.1 L838.3 205.2 L844.2 202.3M776.4 254.8 L782.5 252.4 L788.4 249.4 L793.7 253.4 L800.2 255.0 L806.3 257.3 L812.7 256.0 L817.5 251.9 L823.3 249.4M751.0 304.7 L755.0 306.5 L757.4 310.2 L761.7 311.5 L765.7 309.4 L768.2 313.7 L773.0 315.0 L776.0 310.9 L781.1 310.6M765.7 309.4 L765.1 314.4 L764.3 319.3 L759.5 321.2 L756.0 324.9M708.0 354.0 L717.1 356.4 L724.3 362.4 L732.0 367.5 L741.0 369.9 L746.6 377.5 L750.6 386.0 L757.6 392.4 L766.1 396.5M662.3 402.9 L664.8 412.3 L664.8 422.0 L668.1 431.2 L674.4 438.7 L678.8 447.5 L687.1 452.9 L690.0 462.1 L695.1 470.3"/><path class="bit-contact-bolt" stroke="#fffef0" stroke-width="2" d="M568 302 585 314 577 325 600 315 612 326 623 308 639 314M600 315 590 287 602 294 590 270 602 253M600 315 611 343 598 335 608 365 595 388"/>
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
