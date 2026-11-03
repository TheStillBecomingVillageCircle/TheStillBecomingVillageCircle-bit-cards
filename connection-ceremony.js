(() => {
'use strict';
const storageKey = 'bit-connection-celebrated';
let currentId = null;
let known = new Set();
let ready = false;

function show(){
 if(document.querySelector('.bit-ceremony-overlay'))return;
 const overlay=document.createElement('div');overlay.className='bit-ceremony-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Connection celebration');
 overlay.innerHTML=`<div class="bit-ceremony-card"><svg class="bit-ceremony-art" viewBox="0 0 360 260" aria-hidden="true"><defs><linearGradient id="bitMetal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffdf4"/><stop offset=".25" stop-color="#d8ded8"/><stop offset=".54" stop-color="#fafbf4"/><stop offset="1" stop-color="#899d96"/></linearGradient><linearGradient id="bitAqua" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#a6f3dc"/><stop offset=".5" stop-color="#40b9a9"/><stop offset="1" stop-color="#116e6a"/></linearGradient><linearGradient id="bitCopper" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8dfbd"/><stop offset=".48" stop-color="#c89469"/><stop offset="1" stop-color="#785342"/></linearGradient><radialGradient id="bitFlash"><stop stop-color="#fff9d6" stop-opacity=".95"/><stop offset=".4" stop-color="#ffe2a0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe2a0" stop-opacity="0"/></radialGradient><filter id="bitShadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="7" stdDeviation="7" flood-color="#183b35" flood-opacity=".28"/></filter></defs><ellipse class="bit-ceremony-glow" cx="180" cy="145" rx="108" ry="92" fill="url(#bitFlash)"/><g class="bit-ceremony-left" filter="url(#bitShadow)"><path d="M91 77 62 30" fill="none" stroke="#6a5547" stroke-width="16" stroke-linecap="round"/><path d="M91 77 62 30" fill="none" stroke="#d5ac7c" stroke-width="9" stroke-linecap="round"/><path d="M173 99 C138 49 70 61 70 119 C70 167 122 198 173 232 Z" fill="url(#bitMetal)" stroke="#567d76" stroke-width="3"/><path d="M166 105 C133 67 82 73 82 121 C82 159 124 190 166 217 Z" fill="url(#bitAqua)" stroke="#e3fff2" stroke-opacity=".8" stroke-width="2"/><path d="M92 111 Q105 84 137 96" fill="none" stroke="#eafff6" stroke-opacity=".75" stroke-width="5" stroke-linecap="round"/></g><g class="bit-ceremony-right" filter="url(#bitShadow)"><path d="M269 77 298 30" fill="none" stroke="#6a5547" stroke-width="16" stroke-linecap="round"/><path d="M269 77 298 30" fill="none" stroke="#d5ac7c" stroke-width="9" stroke-linecap="round"/><path d="M187 99 C222 49 290 61 290 119 C290 167 238 198 187 232 Z" fill="url(#bitMetal)" stroke="#796656" stroke-width="3"/><path d="M194 105 C227 67 278 73 278 121 C278 159 236 190 194 217 Z" fill="url(#bitCopper)" stroke="#fff2de" stroke-opacity=".8" stroke-width="2"/><path d="M268 111 Q255 84 223 96" fill="none" stroke="#fff4dd" stroke-opacity=".8" stroke-width="5" stroke-linecap="round"/></g><g class="bit-ceremony-spark"><circle cx="180" cy="147" r="34" fill="url(#bitFlash)"/><path d="m189 101-31 49h22l-12 43 38-57h-23z" fill="#fff9d8" stroke="#a87943" stroke-width="2.5" stroke-linejoin="round"/><path d="m145 119-12-11m80 11 12-11m-45-20V72m-45 88-15 8m105-8 15 8" fill="none" stroke="#f6d59a" stroke-width="3" stroke-linecap="round"/></g></svg><h2>Connection Creates the Spark</h2><p>Two hearts. One electric connection.</p><p>A Little B.I.T. of Connection Goes a Long Way.</p><button type="button" class="bit-ceremony-close">Continue Together</button></div>`;
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