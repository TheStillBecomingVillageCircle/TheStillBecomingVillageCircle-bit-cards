(() => {
'use strict';
const storageKey = 'bit-connection-celebrated';
let currentId = null;
let known = new Set();
let ready = false;

function show(){
 if(document.querySelector('.bit-ceremony-overlay'))return;
 const overlay=document.createElement('div');overlay.className='bit-ceremony-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Connection celebration');
 overlay.innerHTML=`<div class="bit-ceremony-card"><svg class="bit-ceremony-art" viewBox="0 0 460 300" aria-hidden="true"><defs><linearGradient id="platinum" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".22" stop-color="#b6cbd0"/><stop offset=".46" stop-color="#fff"/><stop offset=".7" stop-color="#859fa7"/><stop offset="1" stop-color="#edfaff"/></linearGradient><radialGradient id="mintMetal"><stop stop-color="#c8fff0"/><stop offset=".62" stop-color="#72dcca"/><stop offset="1" stop-color="#218e83"/></radialGradient><radialGradient id="aquaMetal"><stop stop-color="#d6fff9"/><stop offset=".6" stop-color="#3ec7bb"/><stop offset="1" stop-color="#086e71"/></radialGradient><radialGradient id="electric"><stop stop-color="#fff" stop-opacity="1"/><stop offset=".35" stop-color="#9bfff4" stop-opacity=".82"/><stop offset="1" stop-color="#65ffe5" stop-opacity="0"/></radialGradient><filter id="softDepth" x="-45%" y="-45%" width="190%" height="190%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#07544e" flood-opacity=".3"/></filter><filter id="sparkGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><ellipse class="bit-ceremony-glow" cx="230" cy="155" rx="130" ry="110" fill="url(#electric)"/><g class="bit-ceremony-left" filter="url(#softDepth)"><path d="M157 107 108 41 Q96 25 79 39 L45 71 Q32 86 47 100 L109 148" fill="none" stroke="#587b7f" stroke-width="30" stroke-linejoin="round"/><path d="M157 107 108 41 Q96 25 79 39 L45 71 Q32 86 47 100 L109 148" fill="none" stroke="url(#platinum)" stroke-width="22" stroke-linejoin="round"/><path d="M209 105 C173 52 101 67 101 134 C101 193 157 232 221 272 L221 128 Z" fill="url(#platinum)" stroke="#688f92" stroke-width="4"/><path d="M207 112 C175 67 112 82 112 135 C112 185 158 221 209 254 Z" fill="url(#mintMetal)" stroke="#eafff7" stroke-width="3"/><path d="M127 128 Q136 100 168 104" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/></g><g class="bit-ceremony-right" filter="url(#softDepth)"><path d="M303 107 352 41 Q364 25 381 39 L415 71 Q428 86 413 100 L351 148" fill="none" stroke="#587b7f" stroke-width="30" stroke-linejoin="round"/><path d="M303 107 352 41 Q364 25 381 39 L415 71 Q428 86 413 100 L351 148" fill="none" stroke="url(#platinum)" stroke-width="22" stroke-linejoin="round"/><path d="M251 105 C287 52 359 67 359 134 C359 193 303 232 239 272 L239 128 Z" fill="url(#platinum)" stroke="#688f92" stroke-width="4"/><path d="M253 112 C285 67 348 82 348 135 C348 185 302 221 251 254 Z" fill="url(#aquaMetal)" stroke="#eaffff" stroke-width="3"/><path d="M333 128 Q324 100 292 104" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".7"/></g><g class="bit-ceremony-spark" filter="url(#sparkGlow)"><path d="M230 110 C205 76 166 94 166 127 C166 163 202 185 230 208 C258 185 294 163 294 127 C294 94 255 76 230 110 Z" fill="none" stroke="#b6fff4" stroke-width="5"/><path d="m240 107-36 55h24l-13 42 44-62h-27z" fill="#faffff" stroke="#53ead9" stroke-width="3" stroke-linejoin="round"/><path d="m178 116-22-12m126 12 22-12m-74-33V49m-64 120-25 17m153-17 25 17" fill="none" stroke="#d5fff9" stroke-width="4" stroke-linecap="round"/></g></svg><h2>Connection Creates the Spark</h2><p>Two hearts. One electric connection.</p><p>A Little B.I.T. of Connection Goes a Long Way.</p><button type="button" class="bit-ceremony-close">Continue Together</button></div>`;
 const close=()=>{overlay.remove();document.removeEventListener('keydown',esc)};
 const esc=e=>{if(e.key==='Escape')close()};
 overlay.querySelector('button').addEventListener('click',close);
 document.addEventListener('keydown',esc);
 document.body.append(overlay);overlay.querySelector('button').focus();
}
function ids(){try{return new Set(JSON.parse(localStorage.getItem(storageKey+':'+currentId)||'[]'))}catch{return new Set()}}
function save(set){try{localStorage.setItem(storageKey+':'+currentId,JSON.stringify([...set].slice(-100)))}catch{}}
async function check(){
 const db=window.bitCardsDb;if(!db)return;
 const result=await db.auth.getUser();const user=result?.data?.user;
 if(!user){currentId=null;known=new Set();ready=false;return}
 if(currentId!==user.id){currentId=user.id;ready=false;known=ids()}
 const {data,error}=await db.from('connection_requests').select('id,status').eq('status','accepted');
 if(error||!data)return;
 const accepted=new Set(data.map(r=>String(r.id)));
 if(!ready){for(const id of accepted)known.add(id);save(known);ready=true;return}
 const fresh=[...accepted].filter(id=>!known.has(id));
 if(fresh.length){for(const id of fresh)known.add(id);save(known);show()}
}
window.bitReplayConnectionCeremony=show;
window.addEventListener('bit-connection-accepted',async event=>{
 const id=String(event.detail?.connectionId||'');
 if(!id)return;
 const user=(await window.bitCardsDb?.auth.getUser())?.data?.user;
 if(!user)return;
 if(currentId!==user.id){currentId=user.id;known=ids();ready=false;}
 const celebrated=ids();
 if(celebrated.has(id))return;
 celebrated.add(id);known.add(id);save(celebrated);
 show();
});
window.addEventListener('bit-account-changed',()=>{check().catch(()=>{})});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check().catch(()=>{})});
setInterval(()=>{if(!document.hidden)check().catch(()=>{})},20000);
setTimeout(()=>check().catch(()=>{}),1500);
})();