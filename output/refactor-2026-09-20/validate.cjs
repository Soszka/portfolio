const { chromium } = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const assert = require('assert/strict');
const selectors = ['[class*="Splash_hero__"]','section[class*="Achivments_"]','section[class*="About_"]','section[class*="Journey_"]','section[class*="Adventages_"]','#contact','footer'];
const sleep = ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>localStorage.setItem('language','pl'));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 const results=[];
 const measure = async (lang,width,mode='normal')=>{
  await page.setViewportSize({width,height:width<600?844:1080});
  await page.mouse.move(0,0);
  for(const sel of selectors) await page.locator(sel).scrollIntoViewIfNeeded();
  await sleep(100);
  const data=await page.evaluate(()=>{
   const visible=e=>{const s=getComputedStyle(e);return s.visibility!=='hidden'&&s.display!=='none'&&s.opacity!=='0'&&e.getClientRects().length;};
   const outer=[...document.querySelectorAll('section article,#contact a,[class*="About_stat__"],h1,h2,footer')].filter(visible);
   const text=[...document.querySelectorAll('h1,h2,h3,section p,[class*="Journey_date__"],[class*="Journey_label__"],[class*="Contact_action__"]')].filter(visible);
   const box=e=>{const r=e.getBoundingClientRect();return {text:e.textContent.slice(0,60),left:+r.left.toFixed(1),right:+r.right.toFixed(1),scroll:e.scrollWidth,client:e.clientWidth};};
   const outside=outer.map(box).filter(e=>e.left< -1||e.right>innerWidth+1||e.scroll>e.client+2);
   const textOverflow=text.map(box).filter(e=>e.left< -1||e.right>innerWidth+1||e.scroll>e.client+2);
   const expertiseOverlap=[...document.querySelectorAll('[class*="Adventages_card__"]')].filter(e=>{
    const content=e.querySelector('[class*="Adventages_content__"]').getBoundingClientRect();
    const media=e.querySelector('[class*="Adventages_media__"]').getBoundingClientRect();
    return content.right>media.left+1;
   }).length;
   const rawKeys=[...document.querySelectorAll('h2,h3,p')].map(e=>e.textContent).filter(s=>/^(about|expertise|journey|contact|achivements)\./.test(s));
   return {outside,textOverflow,expertiseOverlap,rawKeys,missingImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src),
    bodySize:getComputedStyle(document.querySelector('[class*="Achivments_achivment__"] p')).fontSize,
    titleSize:getComputedStyle(document.querySelector('h2')).fontSize,
    achievementWidth:Math.round(document.querySelector('[class*="Achivments_achivment__"]').getBoundingClientRect().width)};
  });
  results.push({lang,width,mode,...data});
  console.log(JSON.stringify(results.at(-1)));
 };
 for(const lang of ['pl','en']){
  if(lang==='en'){
   await page.setViewportSize({width:390,height:844});
   await page.getByRole('button',{name:'Switch to English',exact:true}).filter({visible:true}).click();
  }
  for(const width of [320,390,768,1024,1280,1440,1920,2560,3840]) await measure(lang,width);
  await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  for(const width of [320,390,1280]) await measure(lang,width,'root-text-200%');
  await page.evaluate(()=>document.documentElement.style.fontSize='');
 }
 // Increased text spacing must not clip content.
 const spacing=await page.addStyleTag({content:'h1,h2,h3,p,button,[class*="Contact_action__"] { line-height:1.5!important; letter-spacing:.12em!important; word-spacing:.16em!important; } p { margin-bottom:2em!important; }'});
 for(const width of [320,1280]) await measure('en',width,'text-spacing');
 await spacing.evaluate(e=>e.remove());
 await page.setViewportSize({width:1920,height:1080});
 const items=page.locator('[class*="Journey_journeyItem__"]');
 const card=items.first().locator('button');
 await card.scrollIntoViewIfNeeded(); await page.mouse.move(0,0); await sleep(500);
 assert.equal(await card.getAttribute('aria-expanded'),'false');
 assert.equal(await card.locator('[class*="Journey_description__"]').evaluate(e=>getComputedStyle(e).visibility),'hidden');
 const box=await items.first().boundingBox();
 await page.mouse.move(box.x+box.width*.8,box.y+box.height*.4); await sleep(600);
 assert.equal(await card.getAttribute('aria-expanded'),'true');
 const state=await items.first().evaluate(e=>({x:e.style.getPropertyValue('--rotate-x'),y:e.style.getPropertyValue('--rotate-y'),description:getComputedStyle(e.querySelector('[class*="Journey_description__"]')).opacity,label:getComputedStyle(e.querySelector('[class*="Journey_label__"]')).opacity,date:getComputedStyle(e.querySelector('[class*="Journey_date__"]')).textAlign,node:getComputedStyle(e.querySelector('[class*="Journey_journeyNode__"]')).backgroundColor}));
 assert.ok(state.x&&state.y); assert.equal(state.description,'1'); assert.equal(state.label,'0'); assert.equal(state.date,'center');
 assert.notEqual(state.node,await items.nth(1).locator('[class*="Journey_journeyNode__"]').evaluate(e=>getComputedStyle(e).backgroundColor));
 await page.locator('section[class*="Journey_"]').screenshot({path:__dirname+'/journey-hover-1920.png'});
 await page.keyboard.press('Escape'); assert.equal(await card.getAttribute('aria-expanded'),'false');
 await page.mouse.move(0,0); await sleep(500); assert.equal(await card.getAttribute('aria-expanded'),'false');
 assert.equal(await items.first().evaluate(e=>e.style.getPropertyValue('--rotate-x')),'');
 await page.keyboard.press('Tab'); await card.focus(); await sleep(400);
 assert.equal(await card.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Escape'); assert.equal(await card.getAttribute('aria-expanded'),'false');
 await page.keyboard.press('Enter'); assert.equal(await card.getAttribute('aria-expanded'),'true');
 await page.keyboard.press('Tab'); assert.equal(await card.getAttribute('aria-expanded'),'false');
 await page.mouse.move(0,0); await page.emulateMedia({reducedMotion:'reduce'});
 await page.mouse.move(box.x+box.width*.8,box.y+box.height*.4); await sleep(100);
 assert.equal(await items.first().evaluate(e=>e.style.getPropertyValue('--rotate-x')),'');
 assert.equal(await card.locator('[class*="Journey_description__"]').evaluate(e=>getComputedStyle(e).visibility),'visible');
 await page.mouse.move(0,0); await page.emulateMedia({reducedMotion:'no-preference'});
 const achievement=page.locator('[class*="Achivments_achivment__"]').first();
 await achievement.hover(); await sleep(400);
 const trace=achievement.locator('[class*="Achivments_borderOrbit__"]');
 assert.equal(await trace.evaluate(e=>getComputedStyle(e).opacity),'1');
 const angle1=await trace.evaluate(e=>getComputedStyle(e).getPropertyValue('--achievement-orbit')); await sleep(120);
 const angle2=await trace.evaluate(e=>getComputedStyle(e).getPropertyValue('--achievement-orbit')); assert.notEqual(angle1,angle2);
 await achievement.screenshot({path:__dirname+'/achievement-hover.png'});
 await page.emulateMedia({reducedMotion:'reduce'}); assert.equal(await trace.evaluate(e=>getComputedStyle(e).animationName),'none');
 const contact=page.locator('#contact a'); assert.equal(await contact.count(),2);
 assert.equal(await contact.nth(0).getAttribute('href'),'https://www.linkedin.com/in/bart%C5%82omiej-socha-95ba1b29a');
 assert.equal(await contact.nth(1).getAttribute('href'),'https://github.com/Soszka');
 await contact.first().focus(); assert.equal(await contact.first().evaluate(e=>getComputedStyle(e).outlineStyle),'solid');
 const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 const mobile=await touch.newPage(); await mobile.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 const mobileCard=mobile.locator('[class*="Journey_journeyItem__"] button').first(); await mobileCard.scrollIntoViewIfNeeded();
 assert.equal(await mobileCard.getAttribute('aria-expanded'),'false');
 await mobileCard.tap(); assert.equal(await mobileCard.getAttribute('aria-expanded'),'true');
 await mobileCard.tap(); assert.equal(await mobileCard.getAttribute('aria-expanded'),'false');
 await mobileCard.tap(); await mobile.waitForTimeout(450); await mobileCard.screenshot({path:__dirname+'/journey-touch-390.png'});
 await touch.close();
 const report={errors,results,interaction:{mouseTilt:state,keyboard:'passed',touch:'passed',reducedMotion:'passed',clockwiseBorder:{angle1,angle2},contact:'passed'}};
 fs.writeFileSync(__dirname+'/validation.json',JSON.stringify(report,null,2));
 const failures=results.filter(r=>r.outside.length||r.textOverflow.length||r.expertiseOverlap||r.rawKeys.length||r.missingImages.length);
 assert.deepEqual(errors,[]); assert.deepEqual(failures,[]);
 await browser.close(); console.log('All responsive and interaction checks passed.');
})().catch(e=>{console.error(e);process.exit(1)});
