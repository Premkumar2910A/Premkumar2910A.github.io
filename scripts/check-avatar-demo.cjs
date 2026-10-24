const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
  const page=await browser.newPage({viewport});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{window.__spoken='';Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{cancel(){},speak(u){window.__spoken=u.text;setTimeout(()=>u.onstart?.(),0);}}});});
  await page.goto('http://127.0.0.1:4174/experiments/avatar.html',{waitUntil:'networkidle'});
  await page.getByText('Choose a question to test the voice and mouth motion.',{exact:true}).waitFor();
  const resting=await page.locator('#avatar').evaluate(c=>c.toDataURL());
  await page.getByRole('button',{name:'His work',exact:true}).click();
  await page.getByText('Browser voice has been removed. A matching recorded answer is not available yet.',{exact:true}).waitFor();
  assert.equal(await page.evaluate(()=>window.__spoken),'');
  await page.waitForTimeout(120);
  assert.equal(await page.locator('#avatar').evaluate(c=>c.toDataURL()),resting);
  await page.getByRole('button',{name:'Stop',exact:true}).click();
  assert.equal(await page.locator('#avatar').evaluate(c=>c.toDataURL()),resting);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
  if(viewport.width===1440){await page.getByRole('button',{name:'His work',exact:true}).click();await page.getByText('Inspect the mouth closely',{exact:true}).click();await page.waitForTimeout(160);await page.locator('#closeup').screenshot({path:'C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs/avatar-motion-closeup.png'});}
  assert.deepEqual(errors,[]);console.log(`${viewport.width}px: prototype loads, no generated voice or fake speaking, Stop restores original, no overflow/runtime errors`);await page.close();
 }
}finally{await browser.close();}})().catch(e=>{console.error(e.message);process.exitCode=1;});
