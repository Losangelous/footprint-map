const V="footprint-5aeb0e789a";
const CORE=["./","index.html","d3.min.js","manifest.webmanifest","icon-192.png","icon-512.png","icon-maskable-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("footprint-")&&k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  const u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(x=>{const y=x.clone();caches.open(V).then(c=>c.put(r,y));return x;}).catch(()=>caches.match("index.html"))));
  } else if(u.hostname==="fonts.googleapis.com"||u.hostname==="fonts.gstatic.com"){
    e.respondWith(caches.open(V).then(c=>c.match(r).then(h=>{const n=fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x;}).catch(()=>h);return h||n;})));
  }
});
