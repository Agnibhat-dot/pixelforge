(()=>{
  function card(item){ return `<a class="tool-card" href="${item.url}"><span class="badge">${item.category || item.type}</span><strong>${item.title}</strong><span class="muted">${item.description || ''}</span></a>`; }
  function mount(){
    const input=document.getElementById('search') || document.getElementById('blogSearch');
    const grid=document.getElementById('toolGrid') || document.querySelector('main .grid');
    if(!input || !grid || !window.SEARCH_INDEX) return;
    const original=grid.innerHTML;
    input.addEventListener('input',()=>{
      const q=input.value.trim().toLowerCase();
      if(!q){ grid.innerHTML=original; return; }
      const matches=window.SEARCH_INDEX.filter(i=>(`${i.title} ${i.description} ${i.category} ${i.type}`).toLowerCase().includes(q)).slice(0,120);
      grid.innerHTML=matches.length ? matches.map(card).join('') : '<p class="muted">No matching pages found.</p>';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
