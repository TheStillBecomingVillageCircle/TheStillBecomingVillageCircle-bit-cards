(() => {
'use strict';
const storageKey = 'bit-connection-celebrated';
let currentId = null;
let known = new Set();
let ready = false;

function show(){
 if(document.querySelector('.bit-ceremony-overlay'))return;
 const overlay=document.createElement('div');overlay.className='bit-ceremony-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Connection celebration');
 overlay.innerHTML=`<div class="bit-ceremony-card"><svg class="bit-ceremony-art" viewBox="0 0 300 220" aria-hidden="true"><defs><linearGradient id="bitCeremonyGlow"><stop stop-color="#49d7c0"/><stop offset="1" stop-color="#e5b977"/></linearGradient></defs><g class="bit-ceremony-left"><path d="M150 65C115 15 55 40 55 95c0 47 55 81 95 110Z" fill="#70cdbc" stroke="#277b72" stroke-width="3"/><path d="M92 46 72 19" stroke="#b98958" stroke-width="8" stroke-linecap="round"/></g><g class="bit-ceremony-right"><path d="M150 65c35-50 95-25 95 30 0 47-55 81-95 110Z" fill="#d8b58a" stroke="#277b72" stroke-width="3"/><path d="m208 46 20-27" stroke="#b98958" stroke-width="8" stroke-linecap="round"/></g><path class="bit-ceremony-heart" d="M150 103c-15-25-52-16-52 10 0 22 27 40 52 60 25-20 52-38 52-60 0-26-37-35-52-10Z" fill="url(#bitCeremonyGlow)" stroke="#fff6d4" stroke-width="5"/><path class="bit-ceremony-heart" d="M155 107 134 142h17l-8 25 29-39h-18l8-21Z" fill="#fff3a8" stroke="#a87440" stroke-width="2.5" stroke-linejoin="round"/></svg><h2>Connection Creates the Spark</h2><p>Two hearts. One electric connection.</p><p>A Little B.I.T. of Connection Goes a Long Way.</p><button type="button" class="bit-ceremony-close">Continue Together</button></div>`;
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