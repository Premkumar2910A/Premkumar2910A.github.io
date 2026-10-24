const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const output='C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs';
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
  for(const width of [1440,390,360]){
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
    const role=await page.locator('#experience').innerText();
    for(const text of ['PostgreSQL','SQLAlchemy','gaining experience'])assert.ok(role.includes(text),text);
    const highlights=await page.locator('.hero-proof').innerText();
    for(const text of ['2+ years','50+','4+','Production AI workflows'])assert.ok(highlights.includes(text),text);
    assert.equal(await page.locator('.recent-work').count(),0);
    const certs=await page.locator('#certifications').innerText();
    assert.ok(certs.includes('ICT Academy'));assert.ok(certs.includes('IIT Kharagpur'));
    assert.equal(await page.locator('.cert-row').count(),5);
    assert.equal(await page.locator('.hello-badge').count(),0);
    assert.equal(await page.locator('.journey-card').count(),3);
    for(const id of ['experience','journey','contact']){
      const section=page.locator('#'+id);await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      if(width!==360)await section.screenshot({path:output+'/review-'+id+'-'+width+'.png',style:'.site-header, .skip-link, .reading-progress { visibility: hidden; }'});
    }
    assert.equal(errors.length,0,errors.join('\n'));
    console.log(width+'px: verified role content, no maintenance showcase, open timeline, no badge, no overflow or runtime errors');
    await page.close();
  }
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
