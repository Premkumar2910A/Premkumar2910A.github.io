const {chromium}=require('C:/Users/Premkumar A/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict');
const output='C:/Users/Premkumar A/Documents/Codex/2026-10-08/hey-can-you-please-figure-out/outputs';
const ids=['alphatales','agents','alphaoptimizer','refacta','infit'];
(async()=>{const browser=await chromium.launch({headless:true,channel:'chrome'});try{
  for(const width of [1440,390,360]){
    const page=await browser.newPage({viewport:{width,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:4174/',{waitUntil:'networkidle'});
    const panels=page.locator('.project-panel');assert.equal(await panels.count(),ids.length);
    assert.equal(await page.locator('.project-panel[open]').count(),0);
    if(width!==360)await page.locator('.project-panels').screenshot({path:output+'/project-cards-'+width+'.png',style:'.site-header, .skip-link, .reading-progress { visibility: hidden; }'});
    for(let i=0;i<ids.length;i++){
      const panel=panels.nth(i),summary=panel.locator(':scope > summary'),article=page.locator('#project-'+ids[i]);
      await summary.click();assert.equal(await panel.getAttribute('open'),'');
      if(ids[i]==='agents'){
        await article.locator('.agent-workflow').waitFor({state:'visible'});
        assert.equal(await article.locator('.agent-workflow li').count(),3);
        assert.equal(await article.locator('.agent-my-work').count(),3);
        assert.ok((await article.locator('.agent-runtime').innerText()).includes('VPS'));
        assert.equal(await article.locator('a[href*="alphatales-agent-os"]').count(),0);
      } else {
        await article.locator('.project-workflow').waitFor({state:'visible'});
        assert.equal(await article.locator('.project-workflow li').count(),4);
      }
      assert.ok((await article.locator('.project-contribution p').innerText()).length>90);
      const visual=article.locator('.project-visual img');
      if(ids[i]==='infit') {
        await visual.scrollIntoViewIfNeeded();await visual.evaluate(img=>img.decode());
        assert.ok(await visual.evaluate(img=>img.naturalWidth>1000));
        assert.ok((await article.locator('.project-visual figcaption').innerText()).includes('UX concept'));
        assert.equal(await article.locator('.case-overview .project-visual').count(),1);
        if(width!==360)await article.locator('.case-overview').screenshot({path:output+'/infit-color-layout-'+width+'.png',style:'.site-header, .skip-link, .reading-progress { visibility: hidden; }'});
      } else assert.equal(await visual.count(),0);
      if(ids[i]==='alphatales')assert.equal(await article.locator('.project-public-preview').count(),0);
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
      if(ids[i]==='alphaoptimizer'){
        assert.ok((await article.innerText()).includes('The idea was mine'));
        assert.ok((await article.innerText()).includes('passed 30 focused tests'));
        if(width!==360)await panel.screenshot({path:output+'/alphaoptimizer-card-'+width+'.png',style:'.site-header, .skip-link, .reading-progress { visibility: hidden; }'});
      }
      await summary.focus();await page.keyboard.press('Enter');assert.equal(await panel.getAttribute('open'),null);
    }
    await page.goto('http://127.0.0.1:4174/#project-refacta',{waitUntil:'networkidle'});
    assert.equal(await page.locator('.project-panel[open]').count(),1);
    await page.waitForFunction(()=>document.querySelector('#project-refacta')?.innerText.includes('I built Refacta'));
    assert.ok((await page.locator('#project-refacta').innerText()).includes('I built Refacta'));
    assert.equal(errors.length,0,errors.join('\n'));
    console.log(width+'px: compact cards, pointer/keyboard open and close, complete workflows, corrected roles, direct case link, no overflow or runtime errors');
    await page.close();
  }
}finally{await browser.close();}})().catch(e=>{console.error(e.message);process.exitCode=1;});
