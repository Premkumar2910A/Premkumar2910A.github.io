const { chromium } = require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try {
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:360,height:640}]){
   const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.addInitScript(()=>{
    window.__spoken=[];window.__micDenied=true;
    Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},getVoices(){return [];},speak(u){window.__spoken.push(u.text);setTimeout(()=>u.onend?.(),20);}},configurable:true});
    window.SpeechRecognition=class {start(){setTimeout(()=>{if(window.__micDenied)this.onerror?.({error:'not-allowed'});else this.onresult?.({results:[[{transcript:'Tell me about his education'}]]});this.onend?.();},25);}stop(){this.onend?.();}abort(){this.onend?.();}};
   });
   await page.route('https://premkumar-portfolio-assistant.premkumarox7.workers.dev/answer',r=>r.fulfill({status:503,contentType:'application/json',body:'{}'}));
   await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
   assert.equal(await page.getByRole('button',{name:'Ask about my work',exact:true}).count(),0);
   await page.getByRole('button',{name:'My work',exact:true}).click();
   assert.equal(await page.getByText('Read the reply',{exact:true}).count(),0);
   assert.equal(await page.locator('.character-answer-actions').count(),0);
   assert.equal((await page.evaluate(()=>window.__spoken)).length,0,'No browser-generated voice should play');
   await page.locator('.character-answer-video').waitFor({state:'attached'}); await page.waitForFunction(()=>document.querySelector('.character-answer-video')?.currentTime>0); assert.ok(await page.locator('.character-answer-video source').getAttribute('src')==='/hero/answers/work.mp4'); await page.getByRole('button',{name:'Pause video',exact:true}).click();
   assert.equal(await page.getByRole('button',{name:'Hear again',exact:true}).count(),0);
   assert.equal(await page.evaluate(()=>document.querySelector('video').paused),true);
   await page.getByRole('button',{name:'Ask by voice: ask a question using your microphone',exact:true}).click();
   await page.getByText('Microphone access is blocked.',{exact:false}).waitFor({state:'attached'});
   await page.evaluate(()=>window.__micDenied=false);
   await page.getByRole('button',{name:'Ask by voice: ask a question using your microphone',exact:true}).click();
   // With the answer service down, verified scripts still answer and offer a destination.
   await page.locator('.guide-reply .guide-reply-text',{hasText:'Hindusthan'}).waitFor();
   assert.equal(await page.getByRole('button',{name:'Take me to Earlier experience',exact:true}).count(),1);
   assert.equal(await page.getByLabel('Your question about Premkumar',{exact:true}).count(),1);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   const bounds=await page.locator('.character-assistant').boundingBox();assert.ok(bounds.x>=0 && bounds.x+bounds.width<=viewport.width);
   if(viewport.width<761)assert.ok(bounds.width>viewport.width*.8,'Character controls should span the mobile content width');
   assert.equal(errors.length,0,errors.join('\n'));
   console.log(`${viewport.width}px: real video, microphone denial/input, offline guide answer, typed input, no overflow/runtime errors passed`);
   if(viewport.width===390){await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});await page.locator('.character-assistant').scrollIntoViewIfNeeded();await page.screenshot({path:'C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs/character-assistant-mobile.png'});}
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});



