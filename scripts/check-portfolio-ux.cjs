const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const out='P:/portfolio/.audit';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
for(const [width,height] of [[320,740],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]]){
const p=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
assert.ok((await p.locator('.hero-proof').innerText()).includes('2+ years'));
assert.equal(await p.locator('h1').count(),1);
if(width<761){
 const menu=p.getByRole('button',{name:'Menu',exact:true});await menu.click();await p.locator('#mobile-menu').waitFor();
 assert.equal(await p.locator('main').evaluate(e=>e.inert),true);
 await p.keyboard.press('Escape');await p.waitForFunction(()=>document.activeElement?.classList.contains('mobile-toggle'));
 assert.equal(await p.locator('main').evaluate(e=>e.inert),false);
 await menu.click();await p.locator('#mobile-menu a[href="#work"]').click();await p.waitForFunction(()=>location.hash==='#work'&&!document.querySelector('#mobile-menu'));
 assert.equal(await p.locator('main').evaluate(e=>e.inert),false);
}
for(const panel of await p.locator('.project-panel').all()){
 await panel.locator(':scope > summary').click();await p.waitForTimeout(80);
 assert.ok(await panel.evaluate(e=>e.open));assert.ok((await panel.locator('.project-contribution').innerText()).length>90);
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'open project overflow '+width);
 await panel.locator(':scope > summary').focus();await p.keyboard.press('Enter');assert.equal(await panel.evaluate(e=>e.open),false);
}
await p.goto('http://127.0.0.1:4174/#project-refacta',{waitUntil:'networkidle'});
await p.waitForFunction(()=>document.activeElement?.tagName==='SUMMARY');
const summary=p.locator('.project-panel:has(#project-refacta) > summary');
assert.ok((await summary.boundingBox()).y >= (width<761?76:98),'deep link heading under header');
const count=await p.locator('.element').count();
for(const i of [0,7,14,count-1]){const tile=p.locator('.element').nth(i);await tile.click();assert.equal(await p.locator('.element').count(),count);assert.equal(await tile.getAttribute('aria-pressed'),'true');if(width<761)assert.ok(await p.locator('.mobile-skill-detail').isVisible());}
for(const image of await p.locator('.element-logo img').all()){await image.evaluate(i=>{i.loading='eager';return i.decode()});assert.ok(await image.evaluate(i=>i.naturalWidth>0));}
await p.locator('.skill-filters button').filter({hasText:'Backend'}).click();assert.equal(await p.locator('.element').count(),count);
const card=p.locator('.id-card');await card.focus();await p.keyboard.press('Enter');assert.equal(await card.getAttribute('aria-pressed'),'true');await p.keyboard.press('Space');assert.equal(await card.getAttribute('aria-pressed'),'false');
await p.evaluate(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw Error('denied')}}})});await p.getByRole('button',{name:'Copy',exact:true}).click();assert.ok(await p.locator('.copy-error').isVisible());
for(const section of await p.locator('main section[id]').all()){await section.evaluate(e=>e.scrollIntoView({behavior:'instant'}));assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'section overflow '+width);}
const resources=await p.evaluate(()=>[...new Set([...document.querySelectorAll('img,source,link[rel="icon"],link[rel="apple-touch-icon"],a[download]')].flatMap(e=>[e.getAttribute('src')||e.getAttribute('href')]).filter(s=>s?.startsWith('/')))]);
for(const resource of resources){const response=await p.request.get('http://127.0.0.1:4174'+resource);assert.equal(response.status(),200,resource);assert.ok(!response.headers()['content-type']?.includes('text/html'),resource+' returned HTML');}
if(width===390||width===1440){for(const id of ['hero','work','experience','skills','about','journey','contact']){await p.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));await p.screenshot({path:`${out}/after-${width}-${id}.png`});}}
assert.deepEqual(errors,[]);console.log(`${width}×${height}: navigation, project links, cards, stack selection/icons, keyboard ID card, clipboard failure, local assets and overflow passed`);await p.close();
}
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
