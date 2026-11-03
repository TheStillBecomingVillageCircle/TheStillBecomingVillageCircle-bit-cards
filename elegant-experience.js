(() => {
'use strict';
const $=id=>document.getElementById(id);
const style=document.createElement('style');
style.textContent=`
/* Elegant shared typography and compact live journal. */
#bit-notification-toggle{background:#fffaf2;border:1px solid #d2b89a;box-shadow:0 3px 12px #145b5130}
#bit-notification-toggle .bit-paddles{width:34px;height:34px}
.bit-connection-subtitle,.bit-journal-top h3,#bit-memories>h2,#bit-memories .bit-journal-entry h4{font-family:'Euphoria Script','Caveat',cursive!important;font-weight:400!important}
#bit-memories>h2{font-size:clamp(36px,8vw,54px)}
#bit-memories #bit-memory-form{background:#fff9ed;border:1px solid #dfcfb1;border-radius:22px;padding:14px 18px;margin:14px 0}
#bit-memories #bit-memory-form label{margin:7px 0 3px;font-size:.9rem}
#bit-memories #bit-memory-title,#bit-memories #bit-memory-date{padding:9px 12px;min-height:40px}
#bit-memories #bit-memory-story{min-height:0;height:120px;line-height:34px;padding:0 12px 0;font-family:'Euphoria Script','Caveat',cursive;font-size:clamp(27px,5.5vw,36px);color:#1d655c;background:repeating-linear-gradient(to bottom,transparent 0,transparent 32px,#b4d8ce 33px,#b4d8ce 34px);background-color:#fffdf7;border:0;border-radius:0;resize:vertical;letter-spacing:.2px}
#bit-memories #bit-memory-story::placeholder{font-family:'Euphoria Script','Caveat',cursive;font-size:28px}
#bit-memories .bit-journal-pages{background-size:auto,auto;background-position:0 0}
#bit-memories .bit-journal-entry{min-height:190px!important;padding:10px 12px!important}
#bit-memories .bit-journal-entry h4{font-size:clamp(30px,6vw,43px)!important;line-height:34px;margin:0!important}
#bit-memories .bit-journal-entry p:nth-of-type(2){font-family:'Euphoria Script','Caveat',cursive!important;font-size:clamp(27px,5vw,34px)!important;line-height:32px!important;white-space:pre-wrap;overflow-wrap:anywhere}
#bit-memories .bit-journal-book{margin-top:14px}
#bit-memories .bit-journal-pages{min-height:260px!important}
#bit-memories .bit-journal-top{padding-bottom:8px}
.bit-card-deck{touch-action:pan-y;cursor:grab}
.bit-card-deck:active{cursor:grabbing}
.bit-card-deck .bit-deck-card{transition:transform .22s ease,opacity .22s ease}
.bit-card-deck.bit-swipe-next .bit-deck-card:not([hidden]){transform:translateX(-18px)}
.bit-card-deck.bit-swipe-prev .bit-deck-card:not([hidden]){transform:translateX(18px)}
@media(prefers-reduced-motion:reduce){.bit-deck-card{transition:none!important}}
`;
document.head.append(style);
const toggle=$('bit-notification-toggle');
if(toggle){
 const svg=toggle.querySelector('svg');
 if(svg){
 svg.innerHTML='<defs><linearGradient id="bitFineLeft" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#b9eee0"/><stop offset="1" stop-color="#48b6a8"/></linearGradient><linearGradient id="bitFineRight" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#f8e9d2"/><stop offset="1" stop-color="#c99f75"/></linearGradient></defs><g class="bit-paddle bit-paddle-left"><path d="M24 17C17 5 5 11 5 23c0 9 11 16 19 21Z" fill="url(#bitFineLeft)" stroke="#32796f" stroke-width="1.3"/><path d="M12 13 9 7" fill="none" stroke="#ad845d" stroke-width="2" stroke-linecap="round"/></g><g class="bit-paddle bit-paddle-right"><path d="M24 17C31 5 43 11 43 23c0 9-11 16-19 21Z" fill="url(#bitFineRight)" stroke="#32796f" stroke-width="1.3"/><path d="m36 13 3-6" fill="none" stroke="#ad845d" stroke-width="2" stroke-linecap="round"/></g><path class="bit-electric-spark" d="M24 19c-5-8-15-3-15 5 0 7 8 13 15 18 7-5 15-11 15-18 0-8-10-13-15-5Z" fill="#e8c36e" stroke="#fff9d7" stroke-width="1.5"/>';
 }
}
/* Mirror the white text box into the lined journal, without changing saved entries. */
const story=$('bit-memory-story'),title=$('bit-memory-title'),pages=$('bit-journal-pages');
if(story&&title&&pages){
 const preview=document.createElement('article');
 preview.className='bit-journal-live';
 preview.hidden=true;
 preview.setAttribute('aria-label','Live memory writing preview');
 const heading=document.createElement('h4');
 const ink=document.createElement('p');
 preview.append(heading,ink);
 pages.prepend(preview);
 const css=document.createElement('style');
 css.textContent=`
 #bit-memories .bit-journal-live{display:block;padding:0 14px 12px;min-height:180px;background:transparent}
 #bit-memories .bit-journal-live[hidden]{display:none!important}
 #bit-memories .bit-journal-live h4,#bit-memories .bit-journal-live p{font-family:'Euphoria Script','Caveat',cursive!important;color:#175d55;font-weight:400;margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
 #bit-memories .bit-journal-live h4{font-size:clamp(32px,7vw,42px);line-height:32px}
 #bit-memories .bit-journal-live p{font-size:clamp(27px,5.7vw,35px);line-height:32px}
 #bit-memories .bit-journal-pages:has(.bit-journal-live:not([hidden])) #bit-memory-list,
 #bit-memories .bit-journal-pages:has(.bit-journal-live:not([hidden])) .bit-journal-shared-section{display:none!important}
 `;
 document.head.append(css);
 function sync(){const active=Boolean(title.value||story.value);preview.hidden=!active;heading.textContent=title.value;ink.textContent=story.value;}
 story.addEventListener('input',sync);
 title.addEventListener('input',sync);
 $('bit-memory-form')?.addEventListener('reset',()=>requestAnimationFrame(sync));
 $('bit-memory-form')?.addEventListener('submit',()=>setTimeout(sync,100));
 sync();
}
function wireDeck(deck){
 if(deck.dataset.bitSwipeReady)return;deck.dataset.bitSwipeReady='true';
 let startX=0,startY=0,down=false;
 deck.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;startX=e.touches[0].clientX;startY=e.touches[0].clientY;down=true},{passive:true});
 deck.addEventListener('touchend',e=>{if(!down)return;down=false;const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)<45||Math.abs(dx)<Math.abs(dy)*1.25)return;const section=deck.parentElement;const controls=section?.querySelector('.bit-stack-controls');const buttons=controls?.querySelectorAll('button');const button=dx<0?buttons?.[1]:buttons?.[0];if(button&&!button.disabled){deck.classList.add(dx<0?'bit-swipe-next':'bit-swipe-prev');button.click();setTimeout(()=>deck.classList.remove('bit-swipe-next','bit-swipe-prev'),240)}},{passive:true});
 deck.addEventListener('click',e=>{if(e.target.closest('button,a,input,textarea,select'))return;const controls=deck.parentElement?.querySelector('.bit-stack-controls');const next=controls?.querySelectorAll('button')?.[1];if(next&&!next.disabled)next.click()});
}
function wire(){document.querySelectorAll('.bit-card-deck').forEach(wireDeck)}
const observer=new MutationObserver(()=>{if(!document.hidden)wire()});
observer.observe(document.body,{childList:true,subtree:true});
wire();
})();