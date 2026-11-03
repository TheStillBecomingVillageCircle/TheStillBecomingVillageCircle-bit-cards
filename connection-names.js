(()=>{'use strict';
const db=()=>window.bitCardsDb;
const el=(tag,txt)=>{const x=document.createElement(tag);if(txt!==undefined)x.textContent=txt;return x};
async function current(){return db()?(await db().auth.getUser()).data.user:null}
async function records(other){const u=await current();if(!u)return null;
const [nick,proposals]=await Promise.all([
db().from('connection_nicknames').select('nickname').eq('owner_id',u.id).eq('other_id',other).maybeSingle(),
db().from('connection_name_proposals').select('id,proposer_id,recipient_id,proposed_name,status,created_at').or('and(proposer_id.eq.'+u.id+',recipient_id.eq.'+other+'),and(proposer_id.eq.'+other+',recipient_id.eq.'+u.id+')').order('created_at',{ascending:false}).limit(100)
]);if(nick.error||proposals.error)throw Error(nick.error?.message||proposals.error?.message);
return {u,nickname:nick.data?.nickname||'',proposals:proposals.data||[]}}
function approved(rows){return rows.find(r=>r.status==='approved')?.proposed_name||''}
window.bitConnectionNames=async(other,base)=>{try{const r=await records(other);if(!r)return {label:base,shared:''};const shared=approved(r.proposals);return {label:r.nickname||shared||base,shared}}catch{return {label:base,shared:''}}};
window.bitEditConnectionName=async(other,base)=>{const root=document.getElementById('bit-name-dialog');if(root)root.remove();
const wrap=el('section');wrap.id='bit-name-dialog';wrap.className='bit-name-dialog';wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Edit connection name');
const title=el('h3','Connection Names');const note=el('p','Your nickname stays yours. A shared name requires both people to agree.');
const close=el('button','Close');close.type='button';close.onclick=()=>wrap.remove();wrap.append(title,note,close);
const status=el('p');status.setAttribute('role','status');
const r=await records(other).catch(e=>{status.textContent=e.message;return null});if(!r){wrap.append(status);document.getElementById('bit-connections').append(wrap);return}
const nickLabel=el('label','My private nickname');const nick=el('input');nick.maxLength=40;nick.placeholder='Wife, Husband, Bestie…';nick.value=r.nickname;const save=el('button','Save My Nickname');save.type='button';
save.onclick=async()=>{save.disabled=true;const name=nick.value.trim();let result;if(name)result=await db().from('connection_nicknames').upsert({owner_id:r.u.id,other_id:other,nickname:name},{onConflict:'owner_id,other_id'});else result=await db().from('connection_nicknames').delete().eq('owner_id',r.u.id).eq('other_id',other);status.textContent=result.error?result.error.message:'Private nickname updated.';save.disabled=false;if(!result.error)window.bitRefreshConnections?.()};
wrap.append(nickLabel,nick,save);
const h=el('h4','Our Shared Connection Name');const currentName=el('p','Current shared name: '+(approved(r.proposals)||'Not chosen yet'));
const proposalLabel=el('label','Suggest a name together');const proposal=el('input');proposal.maxLength=40;proposal.placeholder='Our Little Universe';const send=el('button','Propose Shared Name');send.type='button';
send.onclick=async()=>{const name=proposal.value.trim();if(!name){status.textContent='Enter a name first.';return}send.disabled=true;const result=await db().from('connection_name_proposals').insert({proposer_id:r.u.id,recipient_id:other,proposed_name:name});status.textContent=result.error?result.error.message:'Name proposed. Your connection must approve it.';send.disabled=false;if(!result.error){proposal.value='';await window.bitEditConnectionName(other,base)}};
wrap.append(h,currentName,proposalLabel,proposal,send);
for(const p of r.proposals.filter(x=>x.status==='pending')){const line=el('div');line.className='bit-name-request';line.append(el('span',(p.proposer_id===r.u.id?'Awaiting approval: ':'Approval requested: ')+p.proposed_name));if(p.recipient_id===r.u.id){for(const action of ['approved','declined']){const b=el('button',action==='approved'?'Approve':'Decline');b.type='button';b.onclick=async()=>{b.disabled=true;const result=await db().from('connection_name_proposals').update({status:action,decided_at:new Date().toISOString()}).eq('id',p.id).eq('status','pending');status.textContent=result.error?result.error.message:action==='approved'?'Shared name approved.':'Name declined.';if(!result.error){window.bitRefreshConnections?.();await window.bitEditConnectionName(other,base)}};line.append(b)}}wrap.append(line)}
wrap.append(status);document.getElementById('bit-connections').append(wrap);wrap.scrollIntoView({block:'nearest',behavior:'smooth'})};

// Show incoming shared-name proposals directly on Account, without opening Edit Name.
window.bitRenderSharedNameRequests=async()=>{const host=document.getElementById('bit-shared-name-requests');if(!host)return;host.replaceChildren();const user=await current();if(!user)return;
const {data,error}=await db().from('connection_name_proposals').select('id,proposer_id,proposed_name,created_at').eq('recipient_id',user.id).eq('status','pending').order('created_at',{ascending:false});
if(error){host.textContent='Unable to check shared-name requests: '+error.message;return}
if(!data?.length)return;
const heading=el('h4','Shared Name Requests');host.append(heading);
for(const request of data){const item=el('div');item.className='bit-name-request';const message=el('p','Your connection suggested: '+request.proposed_name);item.append(message);
for(const action of ['approved','declined']){const button=el('button',action==='approved'?'Approve Name':'Decline');button.type='button';button.addEventListener('click',async()=>{button.disabled=true;const {error:saveError}=await db().from('connection_name_proposals').update({status:action,decided_at:new Date().toISOString()}).eq('id',request.id).eq('recipient_id',user.id).eq('status','pending');if(saveError){button.disabled=false;message.textContent='Unable to respond: '+saveError.message;return}await window.bitRefreshConnections?.()});item.append(button)}
host.append(item)}
};
})();