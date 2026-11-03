(() => {
'use strict';
/* Load the connection ceremony from the existing deferred notification entrypoint. */
const elegantScript=document.createElement('script');elegantScript.src='./elegant-experience.js';document.head.append(elegantScript);
const ceremonyScript=document.createElement('script');
ceremonyScript.src='./connection-ceremony.js';
ceremonyScript.defer=true;
document.head.append(ceremonyScript);
const connectionHeading=document.querySelector('#bit-connections h3');
if(connectionHeading)connectionHeading.textContent='Connection Creates the Spark';
const connectionSubtitle=document.createElement('p');
connectionSubtitle.className='bit-connection-subtitle';
connectionSubtitle.textContent='Two hearts. One electric connection.';
connectionHeading?.after(connectionSubtitle);
/* Complete heart-shaped electrical flash between the two paddle halves. */
const spark=document.querySelector('#bit-notification-toggle .bit-electric-spark');
if(spark){spark.setAttribute('d','M24 16c-4-7-14-4-14 3 0 6 7 11 14 17 7-6 14-11 14-17 0-7-10-10-14-3Z');}


/* Keep connected people above the add button even if older markup is cached. */
const connectionsList=document.getElementById('bit-connection-requests');
const addConnectionButton=document.getElementById('bit-add-connection');
if(connectionsList&&addConnectionButton)connectionsList.after(addConnectionButton);
const requestHeading=connectionsList?.previousElementSibling;
if(requestHeading?.textContent?.trim()==='Connection Requests')requestHeading.textContent='Your Connections & Requests';
const proposals=document.getElementById('bit-shared-name-requests');
if(proposals){proposals.setAttribute('aria-live','polite');}
document.querySelector('#bit-notification-toggle')?.removeAttribute('hidden');
const $=id=>document.getElementById(id),toggle=$('bit-notification-toggle'),panel=$('bit-notification-panel'),host=$('bit-notification-items'),badge=$('bit-notification-count');
if(!toggle||!panel||!host)return;
let userId=null,items=[],busy=false,initializedFor=null,previousUnread=new Set();
const seenKey=()=> 'bit-notifications-read:'+userId;
const read=()=>{try{return new Set(JSON.parse(localStorage.getItem(seenKey())||'[]'))}catch{return new Set()}};
function mark(key){const s=read();s.add(key);try{localStorage.setItem(seenKey(),JSON.stringify([...s].slice(-500)))}catch{}render()}
function openPage(page){const tab=document.querySelector('[data-bit-tab="'+page+'"]');tab?.click();panel.hidden=true;toggle.setAttribute('aria-expanded','false')}
function render(){
const seen=read(),unread=items.filter(i=>!seen.has(i.key)).length;
if(initializedFor!==userId){initializedFor=userId;previousUnread=new Set(items.filter(i=>!seen.has(i.key)).map(i=>i.key));}else{const current=new Set(items.filter(i=>!seen.has(i.key)).map(i=>i.key));if([...current].some(key=>!previousUnread.has(key))){toggle.classList.remove('bit-spark-arrival');void toggle.offsetWidth;toggle.classList.add('bit-spark-arrival');}previousUnread=current;}
badge.textContent=String(unread);badge.hidden=!unread;toggle.setAttribute('aria-label',unread?unread+' unread notifications':'Notifications');
host.replaceChildren();
if(!items.length){host.textContent='No new activity yet.';return}
for(const item of items){const row=document.createElement('div');row.className='bit-notification-item';if(!seen.has(item.key))row.classList.add('unread');const title=document.createElement('p');title.textContent=item.message;row.append(title);
if(item.type==='proposal'||item.type==='connection'){
for(const action of ['approved','declined']){const b=document.createElement('button');b.type='button';b.textContent=action==='approved'?'Accept':'Decline';b.addEventListener('click',async()=>{b.disabled=true;const db=window.bitCardsDb;const table=item.type==='proposal'?'connection_name_proposals':'connection_requests';const status=item.type==='connection'&&action==='approved'?'accepted':action;const update={status};if(item.type==='proposal')update.decided_at=new Date().toISOString();const {error}=await db.from(table).update(update).eq('id',item.id).eq('status','pending');if(error){title.textContent='Could not update: '+error.message;b.disabled=false;return}mark(item.key);await window.bitRefreshConnections?.();await refresh()});row.append(b)}
}else{const b=document.createElement('button');b.type='button';b.textContent=item.type==='card'?'Open Cards':'View Memories';b.addEventListener('click',()=>{mark(item.key);openPage(item.type==='card'?'cards':'memories')});row.append(b)}
const dismiss=document.createElement('button');dismiss.type='button';dismiss.textContent='Mark read';dismiss.addEventListener('click',()=>mark(item.key));row.append(dismiss);host.append(row)}
}
async function refresh(){
const db=window.bitCardsDb;if(!db||busy)return;busy=true;
try{const {data:{user}}=await db.auth.getUser();if(!user){userId=null;initializedFor=null;previousUnread.clear();toggle.hidden=true;panel.hidden=true;return}
userId=user.id;toggle.hidden=false;
const queries=[
db.from('connection_requests').select('id,requester_id,created_at').eq('owner_id',userId).eq('status','pending').limit(50),
db.from('connection_name_proposals').select('id,proposer_id,proposed_name,created_at').eq('recipient_id',userId).eq('status','pending').limit(50),
db.from('shared_memories').select('id,title,created_at').eq('recipient_id',userId).order('created_at',{ascending:false}).limit(30),
db.from('shared_card_events').select('id,occasion,created_at').eq('recipient_id',userId).order('created_at',{ascending:false}).limit(30)
];const results=await Promise.all(queries);const out=[];
for(const x of results[0].data||[])out.push({key:'connection:'+x.id,id:x.id,type:'connection',time:x.created_at,message:'New connection request'});
for(const x of results[1].data||[])out.push({key:'proposal:'+x.id,id:x.id,type:'proposal',time:x.created_at,message:'Shared name proposed: '+x.proposed_name});
for(const x of results[2].data||[])out.push({key:'memory:'+x.id,id:x.id,type:'memory',time:x.created_at,message:'A memory was shared with you: '+x.title});
for(const x of results[3].data||[])out.push({key:'card:'+x.id,id:x.id,type:'card',time:x.created_at,message:'You received a '+(x.occasion||'new')+' card'});
items=out.sort((a,b)=>String(b.time).localeCompare(String(a.time)));render();
if(results.some(x=>x.error))console.warn('Some notification sources are unavailable');
}catch(error){console.warn('Notifications could not refresh',error)}finally{busy=false}
}
toggle.addEventListener('click',()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)refresh()});
window.addEventListener('bit-account-changed',refresh);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
window.setInterval(()=>{if(!document.hidden)refresh()},45000);
window.bitRefreshNotifications=refresh;refresh();
})();