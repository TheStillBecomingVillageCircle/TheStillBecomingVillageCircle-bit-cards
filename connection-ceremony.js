(() => {
'use strict';
const storageKey = 'bit-connection-celebrated';
let currentId = null;
let known = new Set();
let ready = false;
const styles = `
.bit-ceremony-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;background:rgba(9,38,36,.82);padding:18px}
.bit-ceremony-overlay[hidden]{display:none!important}
.bit-ceremony-card{width:min(94vw,430px);border-radius:28px;padding:28px 20px;text-align:center;background:linear-gradient(145deg,#f9fff8,#d7f1e9);color:#195c54;box-shadow:0 20px 65px #061e1c88}
.bit-ceremony-card h2{font-size:1.65rem;margin:10px 0}
.bit-ceremony-card p{margin:8px 0 18px}
.bit-ceremony-art{width:min(75vw,290px);height:auto;overflow:visible}
.bit-ceremony-left{animation:bit-ceremony-left 2.4s ease-in-out both;transform-origin:50% 50%}
.bit-ceremony-right{animation:bit-ceremony-right 2.4s ease-in-out both;transform-origin:50% 50%}
.bit-ceremony-heart{animation:bit-ceremony-heart 2.4s ease-in-out both;transform-origin:50% 50%}
.bit-ceremony-card button{padding:12px 24px;border:0;border-radius:999px;background:#216f65;color:white;font-weight:700}
@keyframes bit-ceremony-left{0%,15%{transform:translateX(-22px)}45%,85%{transform:translateX(0)}100%{transform:translateX(-5px)}}
@keyframes bit-ceremony-right{0%,15%{transform:translateX(22px)}45%,85%{transform:translateX(0)}100%{transform:translateX(5px)}}
@keyframes bit-ceremony-heart{0%,35%{opacity:0;transform:scale(.4)}45%,75%{opacity:1;transform:scale(1.08)}100%{opacity:1;transform:scale(1)}}
@media(prefers-reduced-motion:reduce){.bit-ceremony-left,.bit-ceremony-right,.bit-ceremony-heart{animation:none!important}}
`;
const style=document.createElement('style');style.textContent=styles;document.head.append(style);
function show(){
 if(document.querySelector('.bit-ceremony-overlay'))return;
 const overlay=document.createElement('div');overlay.className='bit-ceremony-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Connection celebration');
 overlay.innerHTML=`<div class="bit-ceremony-card"><svg class="bit-ceremony-art" viewBox="0 0 300 220" aria-hidden="true"><defs><linearGradient id="bitCeremonyGlow"><stop stop-color="#49d7c0"/><stop offset="1" stop-color="#e5b977"/></linearGradient></defs><g class="bit-ceremony-left"><path d="M150 65C115 15 55 40 55 95c0 47 55 81 95 110Z" fill="#70cdbc" stroke="#277b72" stroke-width="3"/><path d="M92 46 72 19" stroke="#b98958" stroke-width="8" stroke-linecap="round"/></g><g class="bit-ceremony-right"><path d="M150 65c35-50 95-25 95 30 0 47-55 81-95 110Z" fill="#d8b58a" stroke="#277b72" stroke-width="3"/><path d="m208 46 20-27" stroke="#b98958" stroke-width="8" stroke-linecap="round"/></g><path class="bit-ceremony-heart" d="M150 103c-15-25-52-16-52 10 0 22 27 40 52 60 25-20 52-38 52-60 0-26-37-35-52-10Z" fill="url(#bitCeremonyGlow)" stroke="#fff6d4" stroke-width="5"/></svg><h2>Connection Creates the Spark</h2><p>Two hearts. One electric connection.</p><p>A Little B.I.T. of Connection Goes a Long Way.</p><button type="button" class="bit-ceremony-close">Continue Together</button></div>`;
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
window.addEventListener('bit-connection-accepted',()=>{show();setTimeout(check,500)});
window.addEventListener('bit-account-changed',()=>{check().catch(()=>{})});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)check().catch(()=>{})});
setInterval(()=>{if(!document.hidden)check().catch(()=>{})},20000);
setTimeout(()=>check().catch(()=>{}),1500);
})();