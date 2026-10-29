const { chromium } = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const assert = require('assert');
(async () => {
 const browser = await chromium.launch({headless:true,channel:'msedge'});
 const page = await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>localStorage.setItem('language','pl'));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 const results=[];
 for(const lang of ['pl','en']){
  if(lang==='en') await page.getByRole('button',{name:'Switch to English',exact:true}).click();
  for(const width of [320,390,768,1024,1280,1920,2560,3840]){
   await page.setViewportSize({width,height:width<600?844:1080});
   await page.mouse.move(0,0);
   for(const section of await page.locator('section[class*="Achivments_"], section[class*="About_"], section[class*="Journey_"], section[class*="Adventages_"], #contact').all()){
    await section.scrollIntoViewIfNeeded();
   }
   await page.waitForTimeout(150);
   const measurement = await page.evaluate(()=>{
    const cards=[...document.querySelectorAll('section article, #contact a, [class*="About_stat__"]')];
    return {
     width:innerWidth,
     outside:cards.map(e=>({name:e.textContent.slice(0,65),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,scroll:e.scrollWidth,client:e.clientWidth})).filter(e=>e.left< -1 || e.right>innerWidth+1 || e.scroll>e.client+2),
     rawKeys:[...document.querySelectorAll('h2,h3,p')].map(e=>e.textContent).filter(s=>/^(about|expertise|journey|contact|achivements)\./.test(s)),
     missingImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src),
     achievementWidth:Math.round(document.querySelector('section[class*="Achivments_"] article').getBoundingClientRect().width)
    };
   });
   results.push({lang,...measurement});
   assert.deepStrictEqual(measurement.outside,[],lang+' '+width+' cards fit within viewport');
   assert.deepStrictEqual(measurement.rawKeys,[]);
   assert.deepStrictEqual(measurement.missingImages,[]);
   if((lang==='pl'&&[390,1920,3840].includes(width)) || (lang==='en'&&width===390)){
    for(const [name,sel] of [['achievements','section[class*="Achivments_"]'],['about','section[class*="About_"]'],['journey','section[class*="Journey_"]'],['expertise','section[class*="Adventages_"]'],['contact','#contact']]){
     await page.locator(sel).scrollIntoViewIfNeeded(); await page.waitForTimeout(180);
     await page.locator(sel).screenshot({path:'output/'+name+'-'+width+(lang==='pl'?'':'-en')+'.png'});
    }
   }
  }
 }
 assert.equal(errors.length,0,errors.join('\n'));
 await page.setViewportSize({width:1920,height:1080});
 const card=page.locator('section[class*="Journey_"] article').first();
 await card.scrollIntoViewIfNeeded(); const box=await card.boundingBox();
 await page.mouse.move(box.x+box.width*.85,box.y+box.height*.2); await page.waitForTimeout(700);
 const tilt=await card.evaluate(el=>({x:el.style.getPropertyValue('--rotate-x'),y:el.style.getPropertyValue('--rotate-y'),opacity:getComputedStyle(el.querySelector('p')).opacity}));
 assert.notEqual(tilt.x,''); assert.equal(tilt.opacity,'0');
 await page.mouse.move(0,0); await page.waitForTimeout(300);
 assert.equal(await card.evaluate(el=>el.style.getPropertyValue('--rotate-x')),'');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.mouse.move(box.x+box.width*.85,box.y+box.height*.2);
 assert.equal(await card.evaluate(el=>el.style.getPropertyValue('--rotate-x')),'');
 assert.equal(await card.locator('p').evaluate(el=>getComputedStyle(el).opacity),'1');
 const contact=page.locator('#contact a');
 assert.equal(await contact.count(),2);
 assert.equal(await contact.nth(0).getAttribute('href'),'https://www.linkedin.com/in/bart%C5%82omiej-socha-95ba1b29a');
 assert.equal(await contact.nth(1).getAttribute('href'),'https://github.com/Soszka');
 await contact.first().focus();
 assert.equal(await contact.first().evaluate(el=>document.activeElement===el),true);
 const summary={errors,results,tilt,reducedMotion:'passed',contactLinks:'passed',keyboardContactFocus:'passed'};
 fs.writeFileSync('output/sections-final-validation.json',JSON.stringify(summary,null,2));
 console.log(JSON.stringify(summary,null,2));
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});

