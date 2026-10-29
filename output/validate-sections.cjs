const { chromium } = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
(async () => {
 const browser = await chromium.launch({headless:true, channel:'msedge'});
 const page = await browser.newPage({viewport:{width:1920,height:1080}, deviceScaleFactor:1});
 const errors=[]; page.on('pageerror', e=>errors.push(e.message));
 await page.addInitScript(()=>localStorage.setItem('language','pl'));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const results=[];
 for(const width of [1920,2560,3840,1280,1024,768,390,320]){
  await page.setViewportSize({width,height:width<600?844:1080});
  for(const selector of ['section[class*="Achivments_"]','section[class*="About_"]','section[class*="Journey_"]','section[class*="Adventages_"]','#contact']){
    const section = page.locator(selector);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
  }
  const measurements = await page.evaluate(()=>({
   width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
   cards:[...document.querySelectorAll('section article')].map(e=>({width:Math.round(e.getBoundingClientRect().width),height:Math.round(e.getBoundingClientRect().height),overflow:e.scrollWidth>e.clientWidth+2})),
   missingImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src)
  }));
  results.push(measurements);
  if([1920,390].includes(width)){
   for(const [name,sel] of [['achievements','section[class*="Achivments_"]'],['about','section[class*="About_"]'],['journey','section[class*="Journey_"]'],['expertise','section[class*="Adventages_"]'],['contact','#contact']]){
    await page.locator(sel).scrollIntoViewIfNeeded(); await page.waitForTimeout(500);
    await page.locator(sel).screenshot({path:'output/'+name+'-'+width+'.png'});
   }
  }
 }
 await page.setViewportSize({width:1920,height:1080});
 const card = page.locator('section[class*="Journey_"] article').first();
 await card.scrollIntoViewIfNeeded();
 const box=await card.boundingBox();
 await page.mouse.move(box.x+box.width*.82,box.y+box.height*.25);
 await page.waitForTimeout(650);
 const tilted = await card.evaluate(el=>({rotation:getComputedStyle(el.firstElementChild.nextElementSibling).transform,rotateX:el.style.getPropertyValue('--rotate-x'),rotateY:el.style.getPropertyValue('--rotate-y'),descriptionOpacity:getComputedStyle(el.querySelector('p')).opacity}));
 await page.locator('section[class*="Journey_"]').screenshot({path:'output/journey-hover.png'});
 await page.mouse.move(5,5);
 await page.waitForTimeout(600);
 const reset = await card.evaluate(el=>el.style.getPropertyValue('--rotate-x'));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.mouse.move(box.x+box.width*.82,box.y+box.height*.25);
 const reduced = await card.evaluate(el=>({rotateX:el.style.getPropertyValue('--rotate-x'),descriptionOpacity:getComputedStyle(el.querySelector('p')).opacity}));
 await page.emulateMedia({reducedMotion:'no-preference'});
 const contacts=await page.locator('#contact a').evaluateAll(els=>els.map(e=>({href:e.href,text:e.innerText})));
 await page.evaluate(()=>localStorage.setItem('language','en'));
 // Init script uses PL on every navigation, switch through the actual language control in follow-up.
 fs.writeFileSync('output/sections-validation.json',JSON.stringify({errors,results,tilted,reset,reduced,contacts},null,2));
 console.log(JSON.stringify({errors,viewports:results.map(r=>({width:r.width,scrollWidth:r.scrollWidth,overflowCards:r.cards.filter(c=>c.overflow).length,missingImages:r.missingImages.length})),tilted,reset,reduced,contacts},null,2));
 await browser.close();
})();


