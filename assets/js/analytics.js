(()=>{
  const cfg = window.SITE_CONFIG || {};
  const key = 'pf_analytics_consent';
  function inject(src, attrs={}){ const s=document.createElement('script'); s.async=true; s.src=src; Object.entries(attrs).forEach(([k,v])=>s.setAttribute(k,v)); document.head.appendChild(s); }
  function enable(){ const a=cfg.analytics||{}; if(a.ga4MeasurementId){ window.dataLayer=window.dataLayer||[]; window.gtag=function(){dataLayer.push(arguments)}; gtag('js',new Date()); gtag('config',a.ga4MeasurementId,{anonymize_ip:true}); inject('https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(a.ga4MeasurementId)); } if(a.microsoftClarityId){ window.clarity=window.clarity||function(){(clarity.q=clarity.q||[]).push(arguments)}; inject('https://www.clarity.ms/tag/'+encodeURIComponent(a.microsoftClarityId)); } if(a.cloudflareAnalyticsToken){ inject('https://static.cloudflareinsights.com/beacon.min.js', {'data-cf-beacon': JSON.stringify({token:a.cloudflareAnalyticsToken})}); } }
  window.PixelForgeAnalytics = { enable, hasConsent:()=>localStorage.getItem(key)==='accepted' };
  if(localStorage.getItem(key)==='accepted') enable();
})();
