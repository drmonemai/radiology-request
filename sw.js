const C='rr-v24',A=['./','index.html','lists.js','manifest.webmanifest','fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-600-normal.woff2','fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2','fonts/ibm-plex-sans-arabic-latin-500-normal.woff2','fonts/ibm-plex-sans-arabic-latin-600-normal.woff2','fonts/ibm-plex-sans-arabic-latin-700-normal.woff2','icons/logo.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(u,{cache:'reload'}).then(r=>{if(r.ok)return c.put(u,r)})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}
    return res}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
