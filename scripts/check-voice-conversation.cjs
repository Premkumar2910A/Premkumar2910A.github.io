const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const live=process.argv.includes('--live');
const lipHost='https://henrybit-musetalk-1-5.hf.space';
const fixture='C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs/chatterbox-test/avatar-lip-test-result.mp4';
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 try{
  const page=await browser.newPage({viewport:{width:390,height:844}});const errors=[];const calls=[];
  page.on('pageerror',e=>errors.push(e.message));
  if(live)page.on('response',r=>{const u=new URL(r.url());if(u.hostname.endsWith('.hf.space'))console.log(JSON.stringify({provider:u.hostname,path:u.pathname.startsWith('/gradio_api/file')?'media':u.pathname,status:r.status()}));});
  page.on('request',r=>{if(r.url().includes('workers.dev/'))calls.push(new URL(r.url()).pathname);});
  await page.addInitScript(()=>{
   window.__browserSpeech=0;
   Object.defineProperty(window,'speechSynthesis',{value:{cancel(){},speak(){window.__browserSpeech++;}},configurable:true});
   window.SpeechRecognition=class{start(){setTimeout(()=>{this.onresult?.({results:[[{transcript:window.__question||'Hey Prem Kumar, can you explain about where you studied?'}]]});this.onend?.();},25);}abort(){}stop(){}};
  });
  if(!live){
   await page.route('**/workers.dev/answer',r=>r.continue());
   await page.route('https://premkumar-portfolio-assistant.premkumarox7.workers.dev/answer',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({text:r.request().postDataJSON().question==='skills'?'My stack includes Python, FastAPI, React, and LangGraph.':r.request().postDataJSON().question==='contribution'?'I worked on APIs and AI workflows with the AlphaTales team.':'I studied Computer Science Engineering at Hindusthan College in Coimbatore and graduated in 2024.',sources:['education']})}));
   await page.route('**/node_modules/.vite/deps/@gradio_client.js*',r=>r.fulfill({contentType:'text/javascript',body:`
    export const handle_file=value=>value;
    export const Client={async connect(host){return {close(){window.__closedClients=(window.__closedClients||0)+1;},submit(endpoint,payload){
     if(endpoint!=='/generate')throw Error('Wrong endpoint');
     if(host.includes('chatterbox') && !(payload.audio_prompt_path instanceof File))throw Error('Voice reference must be a named file');
     if(host.includes('musetalk') && payload.video_path.name!=='avatar-motion.mp4')throw Error('Current avatar reference missing');
     return {cancel(){},async *[Symbol.asyncIterator](){
      if(window.__quota)throw Error('GPU quota exceeded');
      await new Promise(resolve=>setTimeout(resolve,window.__slow?2000:20));
      yield {type:'data',data:host.includes('chatterbox')?[{url:host+'/voice.wav'}]:[{video:{url:host+'/test-result.mp4'}}]};
     }};
    }}}};` }));
   await page.route(lipHost+'/test-result.mp4',r=>r.fulfill({path:fixture,contentType:'video/mp4'}));
  }
  await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:'Ask by voice: ask a question using your microphone',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('.character-answer-video source')?.src.startsWith('https://henrybit-musetalk-1-5.hf.space/')||Boolean(document.querySelector('.character-status')?.textContent.trim()),null,{timeout:185000});
  const src=await page.locator('.character-answer-video source').getAttribute('src').catch(()=>null);
  console.log(JSON.stringify({live,answerRequests:calls,src,notice:await page.locator('.character-status').allTextContents()}));
  assert.ok(calls.includes('/answer'));assert.ok(!calls.includes('/chat'));
  assert.equal(await page.evaluate(()=>window.__browserSpeech),0);
  assert.equal(await page.getByText('This answer video is not ready yet.',{exact:false}).count(),0);
  if(src?.startsWith(lipHost)){
   await page.waitForFunction(()=>document.querySelector('.character-answer-video')?.currentTime>0,null,{timeout:10000});
   await page.waitForFunction(()=>document.querySelector('.character-answer-video')?.ended,null,{timeout:30000});
   assert.equal(await page.locator('.character-still').evaluate(e=>getComputedStyle(e).opacity),'0');
  }else throw Error(live ? 'Live avatar generation did not produce a playable answer; see the provider notice above.' : 'Generated answer did not play');
  if(!live){
   assert.equal(await page.evaluate(()=>window.__closedClients),2);
   await page.evaluate(()=>{window.__quota=true;window.__question="skills";});
   await page.getByRole('button',{name:'Ask by voice: ask a question using your microphone',exact:true}).click();
   await page.getByText('The free avatar voice allowance is used up',{exact:false}).waitFor();
   assert.equal(await page.evaluate(()=>window.__closedClients),3);
   await page.evaluate(()=>{window.__quota=false;window.__slow=true;window.__question="contribution";});
   await page.getByRole('button',{name:'Ask by voice: ask a question using your microphone',exact:true}).click();
   await page.getByRole('button',{name:'Cancel reply',exact:true}).waitFor();
   assert.equal(await page.getByRole('button',{name:'My work',exact:true}).isEnabled(),true);
   assert.equal(await page.getByText('Preparing the avatar’s voice…',{exact:true}).count(),0);
   await page.screenshot({path:'C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs/voice-wait-new.png'});
   await page.getByRole('button',{name:'Cancel reply',exact:true}).click();
   await page.waitForTimeout(2500);
   assert.equal(await page.getByRole('button',{name:'Cancel reply',exact:true}).count(),0);
   await page.getByRole('button',{name:'My work',exact:true}).click();
   await page.waitForFunction(()=>document.querySelector('.character-answer-video source')?.getAttribute('src')==='/hero/answers/work.mp4');
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  assert.deepEqual(errors,[]);
  await page.screenshot({path:'C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs/voice-conversation-'+(live?'live':'mock')+'.png'});
  console.log(live?'Passed: live LLM, voice generation, lip-sync and video playback.':'Passed: microphone uses LLM/voice/lips, current-avatar playback, stop, free quota notice, chips, no browser speech or mobile overflow (providers mocked).');
 }finally{await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
