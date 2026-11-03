(() => {
'use strict';
const storageKey = 'bit-connection-celebrated';
let currentId = null;
let known = new Set();
let ready = false;

function show(){
 if(document.querySelector('.bit-ceremony-overlay'))return;
 const overlay=document.createElement('div');overlay.className='bit-ceremony-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Connection celebration');
 overlay.innerHTML=`<div class="bit-ceremony-card"><div class="bit-ceremony-stage" aria-hidden="true"><div class="bit-ceremony-paddle bit-ceremony-left"><span class="bit-ceremony-handle"></span><span class="bit-ceremony-heart"></span></div><div class="bit-ceremony-paddle bit-ceremony-right"><span class="bit-ceremony-handle"></span><span class="bit-ceremony-heart"></span></div><div class="bit-ceremony-lightning">ϟ</div></div><h2>Connection Creates the Spark</h2><p>Two hearts. One electric connection.</p><p>A Little B.I.T. of Connection Goes a Long Way.</p><button type="button" class="bit-ceremony-close">Continue Together</button></div>`;
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