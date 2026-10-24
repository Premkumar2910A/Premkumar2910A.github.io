const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
const out='P:/portfolio/.audit';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});const results=[];
try{for(const [name,url,width,height] of [['live','https://premkumar2910a.github.io/',1440,900],['desktop','http://127.0.0.1:4174/',1440,900],['mobile','http://127.0.0.1:4174/',390,844],['small','http://127.0.0.1:4174/',360,800],['wide','http://127.0.0.1:4174/',1920,1080]]){
const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(url,{waitUntil:'networkidle',timeout:45000});await page.locator('body').evaluate(()=>document.querySelectorAll('video').forEach(v=>v.pause()));
const sections=await page.locator('main section[id]').evaluateAll(es=>es.map(e=>e.id));
await page.screenshot({path:`${out}/${name}-hero.png`});
if(name==='live')fs.writeFileSync(`${out}/live-text.txt`,await page.locator('body').innerText());
for(const id of sections){await page.locator('#'+id).evaluate(e=>e.scrollIntoView({behavior:'instant'}));await page.waitForTimeout(100);if(name==='desktop'||name==='mobile')await page.screenshot({path:`${out}/${name}-${id}.png`});}
results.push({name,sections,errors,...await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,title:document.title,headings:[...document.querySelectorAll('h1,h2,h3')].map(h=>({level:h.tagName,text:h.textContent})),brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.getAttribute('src')),missingTargets:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(h=>h.length>1&&!document.getElementById(h.slice(1))),overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(e).position!=='absolute'}).slice(0,15).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,60)}))}))});await page.close();}
fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(({headings,...r})=>r),null,2));}
finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
