(() => {
  'use strict';
  const storageKey = 'bit-connection-celebrated';
  const artwork = new URL('./assets/connection-platinum.jpeg', document.currentScript.src).href;
  const motionMarkup = `<svg class="bit-ceremony-motion" viewBox="0 0 1199 1312" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="bit-stage-surface" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#a0c8be"/><stop offset=".55" stop-color="#c9e4dc"/><stop offset="1" stop-color="#e9f4f1"/></linearGradient>
    <linearGradient id="bit-scene-feather" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="white"/><stop offset=".87" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient>
    <mask id="bit-scene-blend" maskUnits="userSpaceOnUse" x="0" y="0" width="1199" height="600"><rect width="1199" height="600" fill="url(#bit-scene-feather)"/></mask>
    <clipPath id="bit-motion-interior"><path d="M137 34H1061Q1154 34 1154 128V605H44V128Q44 34 137 34Z"/></clipPath>
    <clipPath id="bit-photo-left"><path d="M39 605V526L82 490L97 445L116 411L104 403Q66 394 76 354L157 171Q191 102 230 116Q281 124 349 175Q397 165 433 194Q474 160 515 181Q568 198 570 247Q573 312 541 365L459 482Q431 526 391 502L297 414L214 417L158 413L143 458L121 490L100 532L66 571L61 605Z"/></clipPath>
    <clipPath id="bit-photo-right"><path d="M1164 605V527L1119 490L1101 445L1083 411L1097 403Q1136 394 1123 354L1042 171Q1007 103 968 116Q915 124 848 175Q795 166 764 194Q723 160 682 181Q628 198 628 247Q625 312 657 365L739 482Q768 526 807 502L900 414L984 417L1040 413L1055 458L1079 490L1100 532L1134 571L1142 605Z"/></clipPath>
  </defs>
  <g clip-path="url(#bit-motion-interior)" mask="url(#bit-scene-blend)">
    <path fill="url(#bit-stage-surface)" d="M40 30H1160V605H40Z"/>
    <g class="bit-photo-paddle bit-photo-paddle-left"><image class="bit-paddle-texture" width="1199" height="1312" clip-path="url(#bit-photo-left)"/></g>
    <g class="bit-photo-paddle bit-photo-paddle-right"><image class="bit-paddle-texture" width="1199" height="1312" clip-path="url(#bit-photo-right)"/></g>
  </g>
</svg><canvas class="bit-electric-charge" width="1199" height="620" aria-hidden="true"></canvas>
`;
  let currentId = null;
  let known = new Set();
  let ready = false;
  let checking = false;

  function startElectricCharge(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const left = [[600,450],[538,397],[473,338],[428,280],[401,217],[410,157],[448,116],[494,108],[547,133],[600,183]];
    const right = left.map(([x,y]) => [1200-x,y]);
    let frame = 0;
    let stopped = false;
    let last = -100;
    const started = performance.now();
    const jitter = (amount) => (Math.random()-.5)*amount*2;
    function fracture(a,b,depth,spread) {
      if (!depth) return [a,b];
      const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy)||1;
      const displacement=jitter(spread);
      const middle=[(a[0]+b[0])/2-dy/length*displacement,(a[1]+b[1])/2+dx/length*displacement];
      return fracture(a,middle,depth-1,spread*.5).slice(0,-1).concat(fracture(middle,b,depth-1,spread*.5));
    }
    function bolt(guide,spread=16) {
      const points=[];
      for(let i=1;i<guide.length;i++) points.push(...fracture(guide[i-1],guide[i],3,spread).slice(0,-1));
      points.push(guide[guide.length-1]);
      return points;
    }
    function stroke(points,color,width=2,strength=1) {
      if(points.length<2)return;
      ctx.beginPath();ctx.moveTo(...points[0]);
      for(const p of points.slice(1))ctx.lineTo(...p);
      ctx.lineJoin='miter';ctx.lineCap='butt';
      ctx.globalAlpha=strength*.4;ctx.strokeStyle=color;ctx.lineWidth=width*3.6;ctx.shadowColor=color;ctx.shadowBlur=19;ctx.stroke();
      ctx.globalAlpha=strength;ctx.strokeStyle='#fffef7';ctx.lineWidth=width;ctx.shadowBlur=5;ctx.stroke();
    }
    function heartSide(guide,color,strength) {
      const points=bolt(guide.map(([x,y],i)=>i===0||i===guide.length-1?[x,y]:[x+jitter(7),y+jitter(7)]),20);
      stroke(points,color,2.3,strength);
      for(let i=5;i<points.length-5;i+=9){
        const p=points[i],angle=Math.atan2(p[1]-265,p[0]-600)+jitter(.5),length=25+Math.random()*58;
        const tip=[p[0]+Math.cos(angle)*length,p[1]+Math.sin(angle)*length];
        const branch=bolt([p,tip],12);stroke(branch,color,.8,strength*.65);
        if(i%2){const q=branch[4];stroke(bolt([q,[q[0]+jitter(27),q[1]+jitter(27)]],7),color,.5,strength*.4);}
      }
    }
    function paint(now) {
      if(stopped)return;
      const elapsed=now-started;
      if(elapsed-last<85&&!reduced){frame=requestAnimationFrame(paint);return;}
      last=elapsed;
      ctx.clearRect(0,0,1199,620);
      if(elapsed<1900&&!reduced){frame=requestAnimationFrame(paint);return;}
      const chargeAge=reduced?1500:elapsed-1900;
      const strength=reduced?.85:Math.min(1,chargeAge/160)*(.83+Math.random()*.17);
      ctx.save();ctx.globalCompositeOperation='lighter';
      // Contact sends irregular forks outward, rather than tracing a decorative line.
      const burst=Math.exp(-chargeAge/700);
      const glow=ctx.createRadialGradient(600,315,1,600,315,125);
      glow.addColorStop(0,'rgba(255,255,245,'+(.5+burst*.4)+')');
      glow.addColorStop(.18,'rgba(230,255,234,'+(.2+burst*.25)+')');
      glow.addColorStop(1,'rgba(140,255,230,0)');
      ctx.fillStyle=glow;ctx.fillRect(470,185,260,260);
      stroke(bolt([[561,304],[600,315],[640,303]],13),'#e9fff0',3.7,strength);
      if(chargeAge>90||reduced){heartSide(left,'#4dffe1',strength);heartSide(right,'#e3eff2',strength);}
      for(let i=0;i<9;i++){
        const angle=i/9*Math.PI*2+jitter(.2),length=42+Math.random()*(55+burst*60);
        const tip=[600+Math.cos(angle)*length,315+Math.sin(angle)*length];
        stroke(bolt([[600,315],tip],12),tip[0]<600?'#55ffe0':'#f2f8fa',.9,strength*.7);
      }
      // Tiny moving embers make the contact feel active without full-screen flashes.
      for(let i=0;i<14;i++){
        const angle=Math.random()*Math.PI*2,radius=30+Math.random()*140;
        const x=600+Math.cos(angle)*radius,y=315+Math.sin(angle)*radius;
        ctx.globalAlpha=.25+Math.random()*.5;ctx.fillStyle=x<600?'#adfff0':'#f4fbff';
        ctx.shadowColor=ctx.fillStyle;ctx.shadowBlur=6;ctx.fillRect(x,y,1.2,1.2);
      }
      ctx.restore();
      if(!reduced)frame=requestAnimationFrame(paint);
    }
    frame=requestAnimationFrame(paint);
    return () => {stopped=true;cancelAnimationFrame(frame);};
  }

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
    let stopCharge = () => {};
    let chargeStarted = false;
    const begin = () => {
      if(chargeStarted || !overlay.isConnected) return;
      chargeStarted = true;
      overlay.classList.add('bit-ceremony-art-ready');
      stopCharge = startElectricCharge(overlay.querySelector('canvas'));
    };
    image.addEventListener('load', begin, { once: true });
    image.addEventListener('error', () => overlay.classList.add('bit-ceremony-image-error'), { once: true });
    const background = [...document.body.children];
    const inertBefore = background.map(node => node.inert);
    const overflowBefore = document.body.style.overflow;
    const close = () => {
      stopCharge();
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
    if(image.complete && image.naturalWidth) begin();
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
