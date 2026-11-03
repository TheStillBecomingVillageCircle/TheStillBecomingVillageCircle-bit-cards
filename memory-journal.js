/* B.I.T. Cards — memory journal pagination. No memory data is modified. */
(() => {
  'use strict';
  const book = document.getElementById('bit-journal-book');
  const pages = document.getElementById('bit-journal-pages');
  const personal = document.getElementById('bit-memory-list');
  const prev = document.getElementById('bit-journal-prev');
  const next = document.getElementById('bit-journal-next');
  const count = document.getElementById('bit-journal-count');
  if (!book || !pages || !personal || !prev || !next || !count) return;
  let index = 0;
  let entries = [];
  let scheduled = false;
  const sharedSections = Array.from(pages.children).filter(el => el !== personal && el.tagName === 'SECTION');
  sharedSections.forEach(section => {
    section.classList.add('bit-journal-shared-section');
    pages.append(section);
  });
  function refresh() {
    scheduled = false;
    const own = Array.from(personal.children).filter(el => el.matches('article'));
    const others = sharedSections.flatMap(section => Array.from(section.querySelectorAll('article.bit-journal-entry')));
    entries = [...own, ...others];
    const live = pages.querySelector('.bit-journal-live');
    if (live && !live.hidden) {
      own.forEach(entry => { entry.hidden = true; });
      sharedSections.forEach(section => { section.hidden = true; });
      personal.hidden = true;
      count.textContent = 'Writing a new memory';
      prev.disabled = next.disabled = true;
      return;
    }
    if (!entries.length) {
      index = 0;
      count.textContent = 'No journal entries yet';
      prev.disabled = next.disabled = true;
      personal.hidden = false;
      sharedSections.forEach(section => { section.hidden = false; });
      return;
    }
    index = Math.min(index, entries.length - 1);
    personal.hidden = false;
    own.forEach(entry => { entry.hidden = true; });
    sharedSections.forEach(section => {
      section.hidden = true;
      section.querySelectorAll('article.bit-journal-entry').forEach(entry => { entry.hidden = true; });
    });
    const active = entries[index];
    active.hidden = false;
    if (personal.contains(active)) {
      personal.hidden = false;
    } else {
      personal.hidden = true;
      const section = sharedSections.find(item => item.contains(active));
      if (section) section.hidden = false;
    }
    count.textContent = 'Page ' + (index + 1) + ' of ' + entries.length;
    prev.disabled = index === 0;
    next.disabled = index === entries.length - 1;
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(refresh);
  }
  prev.addEventListener('click', () => { if (index > 0) { index--; refresh(); book.scrollIntoView({behavior:'smooth',block:'start'}); } });
  next.addEventListener('click', () => { if (index < entries.length - 1) { index++; refresh(); book.scrollIntoView({behavior:'smooth',block:'start'}); } });
  const observer = new MutationObserver(schedule);
  observer.observe(personal, {childList:true});
  const storyInput=document.getElementById('bit-memory-story');
  const titleInput=document.getElementById('bit-memory-title');
  storyInput?.addEventListener('input',schedule);
  titleInput?.addEventListener('input',schedule);
  document.getElementById('bit-memory-form')?.addEventListener('reset',()=>setTimeout(schedule,0));
  sharedSections.forEach(section => observer.observe(section, {childList:true}));
  refresh();
})();
