<<<<<<< HEAD
if(!self.define){let e,n={};const s=(s,a)=>(s=new URL(s+".js",a).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(n[c])return;let t={};const r=e=>s(e,c),o={module:{uri:c},exports:t,require:r};n[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Colorful-Natural-Tree.svg",revision:"69d0e4093fe7cd0a49d5e0f62db0cb1e"},{url:"/_next/app-build-manifest.json",revision:"a9df139338b919d4a727130ea4dc155a"},{url:"/_next/static/chunks/07079f02.aa75326474f854ca.js",revision:"aa75326474f854ca"},{url:"/_next/static/chunks/1088-207f6fc66c243c56.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/1396-c23e6bf8976a1f63.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/1865-4fc2d36d1be4e3ef.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/2957-43c7e7d22b0a21c6.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/3198-d9d3100bd05fc39d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/3232-c0ac28a17ded1928.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/3781-3fad47b21642c824.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/3788-27f96cdb6501fcde.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/3849-666198b0264bfb5d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/4010-9096f9bebb94d2cc.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/4024-d9677e703b8d4df4.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/4658-da27375e81ef3292.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/4683-f61b55e40fb32aff.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/4e6af11a-37ddcd552793fa2e.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/5171-a0458d9756398f53.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/5666-be5b6d87442d184d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/5691-0b9bdbbb3b842fad.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/596-d169832872abdc0e.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/6159-7c17d5a97fabcb22.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/6305-f96d6ee7bef4c380.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/6409-da1940790f1a294d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/6691-a3c091d684e9094f.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/7133-824da857ad27940d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/7525-9e881d55634a4c6a.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8056-eb33d8e42c7aca45.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8188-be2f96d8a967a718.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8262-4a87269d5a929bc0.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8340-f6e5d5976555b1a6.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8573.56baa4c847aad3db.js",revision:"56baa4c847aad3db"},{url:"/_next/static/chunks/870fdd6f-c5dd78d18fabafc7.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8756-8128ccb6c09e6241.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/8795-b750ecf907fb2f96.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/9081a741-8779410e2e263e80.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/9176.932308abc48e541d.js",revision:"932308abc48e541d"},{url:"/_next/static/chunks/9222-83c5c9a31bb0b1a0.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/9294-4951c88930203287.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/9476-a4d2480bedfc741b.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/9efdb34b.6c8aada54e2d48cf.js",revision:"6c8aada54e2d48cf"},{url:"/_next/static/chunks/af16092c.c9b13bf431078423.js",revision:"c9b13bf431078423"},{url:"/_next/static/chunks/app/arvore/add/page-aa37b789b96e2a09.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/arvore/page-0bae58800d2c2abd.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/arvore/update/%5Bid%5D/page-7ba104517888b3d0.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/categoria-especie/add/page-a5fab66c13acd7f4.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/categoria-especie/grupo/page-2642f095fb636148.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/categoria-especie/page-601bb20849ca7ebe.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/categoria-especie/update/%5Bid%5D/page-a58a923039340f5d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/equacao/page-6cec1c30e8ba9554.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/especie/add/page-c7f11444b68a52de.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/especie/page-1fad0daee0223d1a.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/especie/update/%5Bid%5D/page-beff39c808779de7.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/export-pdf/page-cfca76f0b067909d.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/export/page-e6ebfc75cdaacfe6.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/inventario/page-8b026a3801cb60f8.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/layout-268337db40993ff9.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/login/page-0bd4d6d91d0c49af.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/obs-arvore/page-afb3bc4cd4912690.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/page-81291517ff0a671b.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/poa/add/page-1153809d1265a8bc.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/poa/page-20a75ffb16e977ed.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/poa/update/%5Bid%5D/page-0c3dfd2bc83ac0e1.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/process/page-d91fc51642222954.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/projeto/detentor/page-ec315893705397ce.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/projeto/page-671354731b79f7d4.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/projeto/users/add/page-5893794dd67fb902.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/projeto/users/page-b06d63aff52ddb2c.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/signup/page-c52518f2a50f11cb.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/umf/add/page-482804f819b3052a.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/umf/page-cde779839962e101.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/umf/update/%5Bid%5D/page-75db4a66f412afb5.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/unauthorized/page-90bca56df1cf9a3f.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/upa/add/page-41591c55297e2cb2.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/upa/page-39bdc47906244947.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/upa/update/%5Bid%5D/page-f7bbfc9efa5c490f.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/user/add/page-55aba9690a1bd4bf.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/user/change-password/page-56eb159ea94a4665.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/user/page-33860759cd507bbe.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/user/update/%5Bid%5D/page-7668b21981cce15f.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/ut/add/page-7b021143983d4ee3.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/ut/page-634f368b30a7a788.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/app/ut/update/%5Bid%5D/page-64757c88a9ad38e3.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/e37a0b60-b436cec589ebdecd.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/fd9d1056-f18bede297cad554.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/ff804112.3f1beae41c1e92f4.js",revision:"3f1beae41c1e92f4"},{url:"/_next/static/chunks/fonts/Roboto-Bold-f80816a5455d171f948d98c32f20c46e.ttf",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/fonts/Roboto-Italic-87f3afe16a8c3c3706340b027aa43a2e.ttf",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/fonts/Roboto-Regular-fc2b5060f7accec5cf74437196c1b027.ttf",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/framework-87af13b944489a01.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/main-41c1af3ce9567bc9.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/main-app-f65184343fb91911.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/pages/_app-8af45f6c5c3cbc8e.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/pages/_error-6aec2ce618e2a362.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-6350a79795c64c42.js",revision:"oLnNwmBCIzwpwvKnxmA9S"},{url:"/_next/static/css/431944509084d071.css",revision:"431944509084d071"},{url:"/_next/static/css/93c769f5f3b98ebb.css",revision:"93c769f5f3b98ebb"},{url:"/_next/static/media/1c57ca6f5208a29b-s.woff2",revision:"491a7a9678c3cfd4f86c092c68480f23"},{url:"/_next/static/media/3dbd163d3bb09d47-s.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"/_next/static/media/5647e4c23315a2d2-s.woff2",revision:"e64969a373d0acf2586d1fd4224abb90"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7be645d133f3ee22-s.woff2",revision:"3ba6fb27a0ea92c2f1513add6dbddf37"},{url:"/_next/static/media/7c53f7419436e04b-s.woff2",revision:"fd4ff709e3581e3f62e40e90260a1ad7"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/934c4b7cb736f2a3-s.p.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"/_next/static/media/cff529cd86cc0276-s.woff2",revision:"c2b2c28b98016afb2cb7e029c23f1f9f"},{url:"/_next/static/oLnNwmBCIzwpwvKnxmA9S/_buildManifest.js",revision:"f73e8c19daa8474d229371b8da40f744"},{url:"/_next/static/oLnNwmBCIzwpwvKnxmA9S/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/images/icons/icon-128x128.png",revision:"0a658be2bfaaa029918669aa40f3d040"},{url:"/images/icons/icon-144x144.png",revision:"dc3a242f559d76ba8c718e8731375377"},{url:"/images/icons/icon-152x152.png",revision:"8c047f1397dd734c6b0f948e88e9327d"},{url:"/images/icons/icon-192x192.png",revision:"632497a6b3d8435cae09f888c878c14e"},{url:"/images/icons/icon-384x384.png",revision:"115b50b32a5c8f73fb9f82136cc91b3f"},{url:"/images/icons/icon-512x512.png",revision:"3017cc1270c987506da5d0cb5c8fd778"},{url:"/images/icons/icon-72x72.png",revision:"8f2aefd579bbc562c332f12d71ee30eb"},{url:"/images/icons/icon-96x96.png",revision:"a34183311ca347f8b24dfd62c6b5fd6e"},{url:"/imgs/Ajuda.png",revision:"65c4dd3a330233f45bf45ee5004b3f7f"},{url:"/imgs/Hero.png",revision:"c3a13634ec3a2f4da824bcec646ebb1e"},{url:"/imgs/Parceiros.png",revision:"8412018497d613109d8d8614c8c410df"},{url:"/imgs/analise_pred.png",revision:"6d01a2d9c6a3d9071002d59d34bdfad1"},{url:"/imgs/brasao.png",revision:"f405da9965c157989421b5f68997a105"},{url:"/imgs/img_1.jpg",revision:"2b35af3d2807c6de6494b98504ea0eb7"},{url:"/imgs/img_2.jpg",revision:"82119a6505b7add3133fe49a4cfc3133"},{url:"/imgs/img_3.jpg",revision:"c010988515cab3c058ef114d249763bf"},{url:"/imgs/logo_bomanejo.png",revision:"53a0c4a27ae8dca4d57d04cc80429069"},{url:"/imgs/manejo1.jpg",revision:"11d8802c7dc528f0840ec661b4ed15e9"},{url:"/imgs/manejo2.jpg",revision:"35d27ab9d60b4d42a5d95ef203269589"},{url:"/imgs/manejo3.webp",revision:"3422d922913dad51d0012f9dba0683d3"},{url:"/imgs/ml.png",revision:"09affc46360ab2ba7f787f19cd1341d7"},{url:"/imgs/team_1.jpeg",revision:"fd303e11e22fae4f877e3838091acf47"},{url:"/imgs/undraw_Augmented_reality_re_f0qd.png",revision:"b603d442cb8366a071e3cd3c6bf06881"},{url:"/imgs/undraw_Performance_overview_re_mqrq.png",revision:"735a2250d43938a847142d97a826e03d"},{url:"/imgs/undraw_Tutorial_video_re_wepc.png",revision:"8a8e1c2dbddc2991a80ed1b0ab79786b"},{url:"/imgs/undraw_Visualization_re_1kag.png",revision:"93eef51f9e05155203864c256873819f"},{url:"/imgs/undraw_real_time_analytics_re_yliv.png",revision:"f6620a627918097ac3258b5a98c170fc"},{url:"/logo.png",revision:"16bcbe8df3b9d5dbf556397864c80153"},{url:"/manifest.json",revision:"59a81d2e7fc7de6f9493030f23f2a2e1"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"/web_devices.svg",revision:"e83dff7c356fbb8b506e76a813331e3b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:n,event:s,state:a})=>n&&"opaqueredirect"===n.type?new Response(n.body,{status:200,statusText:"OK",headers:n.headers}):n}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const n=e.pathname;return!n.startsWith("/api/auth/")&&!!n.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-8f0e986c'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
>>>>>>> 43bbafe330dac6cb183bb61af19ae7e2f3c86f28
