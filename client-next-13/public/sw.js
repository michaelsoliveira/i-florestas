if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),d={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(i(...e),c)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Colorful-Natural-Tree.svg",revision:"69d0e4093fe7cd0a49d5e0f62db0cb1e"},{url:"/_next/app-build-manifest.json",revision:"0c0ebfe925b2d1795c067fd422466b57"},{url:"/_next/static/O_xM5tnSNqC0Qw4N9bg0e/_buildManifest.js",revision:"f73e8c19daa8474d229371b8da40f744"},{url:"/_next/static/O_xM5tnSNqC0Qw4N9bg0e/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/07079f02.aa75326474f854ca.js",revision:"aa75326474f854ca"},{url:"/_next/static/chunks/1085-82d9361a0f4202c9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/1088-207f6fc66c243c56.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/1396-c23e6bf8976a1f63.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/1864-bf4d5fe77240d15d.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/1865-4fc2d36d1be4e3ef.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/2957-43c7e7d22b0a21c6.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/3198-d9d3100bd05fc39d.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/3232-c0ac28a17ded1928.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/3781-616b39bae12eee8c.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/3788-0affe3be37b29656.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/4010-9096f9bebb94d2cc.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/4658-da27375e81ef3292.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/4683-f61b55e40fb32aff.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/4e6af11a-37ddcd552793fa2e.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/541-b1d285b059176339.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/5642-079f609b3f13f303.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/5691-0b9bdbbb3b842fad.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/5766-1a51e0135ee8008b.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/596-d169832872abdc0e.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/6409-da1940790f1a294d.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/6691-a3c091d684e9094f.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/6859-94275b35a4479f4c.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/7133-824da857ad27940d.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/7525-dbc12cd4cc70af07.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/7527-71209b69f4cc7ad7.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/760-712dce7063429953.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/8018-9a8f27e62ded48c9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/8179-196dfce8ef89b451.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/8340-f6e5d5976555b1a6.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/8573.56baa4c847aad3db.js",revision:"56baa4c847aad3db"},{url:"/_next/static/chunks/870fdd6f-c5dd78d18fabafc7.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/8795-b750ecf907fb2f96.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/8973-a1758e8e8be20e07.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/9081a741-8779410e2e263e80.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/9134-d5db473e8d1be32b.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/9176.932308abc48e541d.js",revision:"932308abc48e541d"},{url:"/_next/static/chunks/9222-83c5c9a31bb0b1a0.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/9476-a4d2480bedfc741b.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/9efdb34b.6c8aada54e2d48cf.js",revision:"6c8aada54e2d48cf"},{url:"/_next/static/chunks/af16092c.c9b13bf431078423.js",revision:"c9b13bf431078423"},{url:"/_next/static/chunks/app/arvore/add/page-e3d3eeed9b9286f9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/arvore/page-9f16976d5e435183.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/arvore/update/%5Bid%5D/page-af5ff8167fa570ed.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/categoria-especie/add/page-3a3ab8033704aa69.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/categoria-especie/grupo/page-9a13c5b6a19d888e.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/categoria-especie/page-ea0ddcbceb56f0de.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/categoria-especie/update/%5Bid%5D/page-c4f51d54511c04bb.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/equacao/page-90d479479326e389.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/especie/add/page-6b243ab7054b3393.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/especie/page-01b36c46ef0a19eb.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/especie/update/%5Bid%5D/page-faa30f320c34685e.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/export-pdf/page-9aef2fb16497e5a9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/export/page-7cf4a48b85ba1251.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/inventario/page-28445640de8653a9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/layout-10809e4c628c67e7.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/login/page-28d3c7f8d2ac1d8d.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/obs-arvore/page-0c427a07f2806a34.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/page-94d0c2142317dae1.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/poa/add/page-2138419cf0a79566.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/poa/page-153d10575885fdb9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/poa/update/%5Bid%5D/page-a5b7077ef41c97ad.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/process/page-fab5373b795404a0.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/projeto/detentor/page-b3945948ae407cff.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/projeto/page-f907764b989aaf51.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/projeto/users/add/page-06d022c0a8f1d7ae.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/projeto/users/page-2ecf4a7ca357b74a.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/signup/page-ff1c0b1acb3dcc44.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/umf/add/page-c2540222f8fdd1df.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/umf/page-15908a69676f7ced.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/umf/update/%5Bid%5D/page-511e97edd1e91318.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/unauthorized/page-96d95d3fe49f8b3b.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/upa/add/page-69da6e609f75e4b9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/upa/page-d239e6c5dd58bf49.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/upa/update/%5Bid%5D/page-e444b6157aa8ae61.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/user/add/page-e1d43f205db06dbe.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/user/change-password/page-a527fdc9ff595037.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/user/page-cb0e4c77046cbcdf.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/user/update/%5Bid%5D/page-89f2e03c1a78da44.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/ut/add/page-4a617ffc200203b9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/ut/page-aa08d6727ea43bed.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/app/ut/update/%5Bid%5D/page-4bdd6f2e1cb1f608.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/e37a0b60-b436cec589ebdecd.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/fd9d1056-f18bede297cad554.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/ff804112.3f1beae41c1e92f4.js",revision:"3f1beae41c1e92f4"},{url:"/_next/static/chunks/fonts/Roboto-Bold-f80816a5455d171f948d98c32f20c46e.ttf",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/fonts/Roboto-Italic-87f3afe16a8c3c3706340b027aa43a2e.ttf",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/fonts/Roboto-Regular-fc2b5060f7accec5cf74437196c1b027.ttf",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/framework-87af13b944489a01.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/main-41c1af3ce9567bc9.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/main-app-cd290fff09c6ce30.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/pages/_app-8af45f6c5c3cbc8e.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/pages/_error-6aec2ce618e2a362.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e7212d62158cbacf.js",revision:"O_xM5tnSNqC0Qw4N9bg0e"},{url:"/_next/static/css/431944509084d071.css",revision:"431944509084d071"},{url:"/_next/static/css/9f1fdec437e9e1cc.css",revision:"9f1fdec437e9e1cc"},{url:"/_next/static/media/1c57ca6f5208a29b-s.woff2",revision:"491a7a9678c3cfd4f86c092c68480f23"},{url:"/_next/static/media/3dbd163d3bb09d47-s.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"/_next/static/media/5647e4c23315a2d2-s.woff2",revision:"e64969a373d0acf2586d1fd4224abb90"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7be645d133f3ee22-s.woff2",revision:"3ba6fb27a0ea92c2f1513add6dbddf37"},{url:"/_next/static/media/7c53f7419436e04b-s.woff2",revision:"fd4ff709e3581e3f62e40e90260a1ad7"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/934c4b7cb736f2a3-s.p.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"/_next/static/media/cff529cd86cc0276-s.woff2",revision:"c2b2c28b98016afb2cb7e029c23f1f9f"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/icons/icon-128x128.png",revision:"0a658be2bfaaa029918669aa40f3d040"},{url:"/images/icons/icon-144x144.png",revision:"dc3a242f559d76ba8c718e8731375377"},{url:"/images/icons/icon-152x152.png",revision:"8c047f1397dd734c6b0f948e88e9327d"},{url:"/images/icons/icon-192x192.png",revision:"632497a6b3d8435cae09f888c878c14e"},{url:"/images/icons/icon-384x384.png",revision:"115b50b32a5c8f73fb9f82136cc91b3f"},{url:"/images/icons/icon-512x512.png",revision:"3017cc1270c987506da5d0cb5c8fd778"},{url:"/images/icons/icon-72x72.png",revision:"8f2aefd579bbc562c332f12d71ee30eb"},{url:"/images/icons/icon-96x96.png",revision:"a34183311ca347f8b24dfd62c6b5fd6e"},{url:"/imgs/Ajuda.png",revision:"65c4dd3a330233f45bf45ee5004b3f7f"},{url:"/imgs/Hero.png",revision:"c3a13634ec3a2f4da824bcec646ebb1e"},{url:"/imgs/Parceiros.png",revision:"8412018497d613109d8d8614c8c410df"},{url:"/imgs/analise_pred.png",revision:"6d01a2d9c6a3d9071002d59d34bdfad1"},{url:"/imgs/brasao.png",revision:"f405da9965c157989421b5f68997a105"},{url:"/imgs/img_1.jpg",revision:"2b35af3d2807c6de6494b98504ea0eb7"},{url:"/imgs/img_2.jpg",revision:"82119a6505b7add3133fe49a4cfc3133"},{url:"/imgs/img_3.jpg",revision:"c010988515cab3c058ef114d249763bf"},{url:"/imgs/logo_bomanejo.png",revision:"53a0c4a27ae8dca4d57d04cc80429069"},{url:"/imgs/manejo1.jpg",revision:"11d8802c7dc528f0840ec661b4ed15e9"},{url:"/imgs/manejo2.jpg",revision:"35d27ab9d60b4d42a5d95ef203269589"},{url:"/imgs/manejo3.webp",revision:"3422d922913dad51d0012f9dba0683d3"},{url:"/imgs/ml.png",revision:"09affc46360ab2ba7f787f19cd1341d7"},{url:"/imgs/team_1.jpeg",revision:"fd303e11e22fae4f877e3838091acf47"},{url:"/imgs/undraw_Augmented_reality_re_f0qd.png",revision:"b603d442cb8366a071e3cd3c6bf06881"},{url:"/imgs/undraw_Performance_overview_re_mqrq.png",revision:"735a2250d43938a847142d97a826e03d"},{url:"/imgs/undraw_Tutorial_video_re_wepc.png",revision:"8a8e1c2dbddc2991a80ed1b0ab79786b"},{url:"/imgs/undraw_Visualization_re_1kag.png",revision:"93eef51f9e05155203864c256873819f"},{url:"/imgs/undraw_real_time_analytics_re_yliv.png",revision:"f6620a627918097ac3258b5a98c170fc"},{url:"/logo.png",revision:"16bcbe8df3b9d5dbf556397864c80153"},{url:"/manifest.json",revision:"a38af67ba8be4c3bd8fc9fe6c30b037a"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"},{url:"/web_devices.svg",revision:"e83dff7c356fbb8b506e76a813331e3b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
