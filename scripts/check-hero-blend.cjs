const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const output='C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs';
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
  for(const width of [1440,390]){
    const page=await browser.newPage({viewport:{width,height:1000}});
    await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
    if(width===1440){const hello=await page.locator('.hero-hello').boundingBox();assert.ok(hello.y<260,'Introduction should start close to the top');}
    await page.getByRole('button',{name:'My work',exact:true}).click();
    await page.waitForFunction(()=>document.querySelector('.character-answer-video')?.currentTime>1);
    assert.equal(await page.getByText('Read the reply',{exact:true}).count(),0);
    assert.equal(await page.locator('.character-answer-actions').count(),0);
    if(width===1440)await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    else await page.locator('.character-stage').scrollIntoViewIfNeeded();
    await page.screenshot({path:`${output}/hero-answer-blend-${width}.png`});
    console.log(`${width}px: higher introduction, clean answer controls, video screenshot saved`);
    await page.close();
  }
}finally{await browser.close();}})().catch(e=>{console.error(e.message);process.exitCode=1;});
