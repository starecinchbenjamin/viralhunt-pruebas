(()=>{const status=document.querySelector('#status'),enter=document.querySelector('#enter'),retry=document.querySelector('#retry');let attempts=0;
 async function connect(){attempts++;retry.hidden=true;enter.hidden=true;status.textContent='Comprobando el acceso a ViralHunt…';
  try{const response=await fetch('https://api.github.com/repos/starecinchbenjamin/viralhunt-pruebas/contents/current.json?t='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error();const file=await response.json(),state=JSON.parse(atob(file.content.replace(/\s/g,''))),url=new URL(state.origin);
   if(!state.active||url.protocol!=='https:'||url.port||url.username||url.password||!(/^[a-z0-9-]+\.(lhr\.life|localhost\.run)$/.test(url.hostname)))throw Error();
   const health=await fetch(url.origin+'/api/preview-health',{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!health.ok||!(await health.json()).ok)throw Error();
   enter.href=url.origin+'/login.html';enter.hidden=false;status.textContent='La app está disponible. Abriendo ViralHunt…';location.replace(enter.href);
  }catch{status.textContent='La app está reconectando o la computadora está apagada. Vuelve a intentar en unos momentos.';retry.hidden=false;if(attempts<4)setTimeout(connect,20000);}
 }retry.onclick=()=>{attempts=0;connect();};connect();})();
