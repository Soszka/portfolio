const { chromium } = require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('fs');
const out = __dirname;
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1920,height:1080},deviceScaleFactor:1});
 await page.addInitScript(()=>localStorage.setItem('language','pl'));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 for(const width of [1920,390]){
  await page.setViewportSize({width,height:width===390?844:1080});
  for(const [name,sel] of [['hero','[class*="Splash_hero__"]'],['achievements','section[class*="Achivments_"]'],['about','section[class*="About_"]'],['journey','section[class*="Journey_"]'],['expertise','section[class*="Adventages_"]'],['contact','#contact']]){
   const section=page.locator(sel); await section.scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
   await section.screenshot({path:`${out}/${name}-${width}.png`});
  }
  if(width===1920){
   for(const [name,sel] of [['hero-achievements','section[class*="Achivments_"]'],['about-journey','section[class*="Journey_"]'],['journey-expertise','section[class*="Adventages_"]'],['expertise-contact','#contact'],['contact-footer','footer']]){
    await page.locator(sel).evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY-innerHeight/2));
    await page.waitForTimeout(100); await page.screenshot({path:`${out}/seam-${name}.png`});
   }
  }
 }
 await browser.close(); console.log('Screenshots saved');
})().catch(e=>{console.error(e);process.exit(1)});
