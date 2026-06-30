(()=>{
  const root=document.documentElement;
  const saved=localStorage.getItem('theme');
  if(saved) root.dataset.theme=saved;
  window.PixelForgeTheme={
    current:()=>root.dataset.theme || 'light',
    set(theme){ root.dataset.theme=theme; localStorage.setItem('theme',theme); },
    toggle(){ this.set(this.current()==='dark'?'light':'dark'); }
  };
  document.addEventListener('click',e=>{ if(e.target && e.target.id==='theme') window.PixelForgeTheme.toggle(); });
})();
