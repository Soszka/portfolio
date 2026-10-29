const { chromium }=require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/bsoch/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs=require('fs');
const luminance=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1920,height:1080},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 const samples=[];
 for(const selector of ['[class*="Splash_summary__"]','[class*="Achivments_achivment__"] p','[class*="About_paragraphs__"] p','[class*="About_stat__"] p','[class*="Journey_date__"]','[class*="Adventages_content__"] p','#contact p','[class*="Contact_action__"] > span','[class*="Footer_copyright__"]']){
  for(const element of await page.locator(selector).all()){
   await element.scrollIntoViewIfNeeded(); await page.mouse.move(0,0); await page.waitForTimeout(50);
   const box=await element.boundingBox();
   const {color,text}=await element.evaluate(e=>({color:getComputedStyle(e).color.match(/[\d.]+/g).slice(0,3).map(Number),text:e.textContent.slice(0,55)}));
   await element.evaluate(e=>e.style.visibility='hidden');
   const png=await page.screenshot({clip:{x:Math.max(0,box.x),y:Math.max(0,box.y),width:Math.ceil(box.width),height:Math.ceil(box.height)}});
   await element.evaluate(e=>e.style.visibility='');
   const {data,info}=await sharp(png).removeAlpha().raw().toBuffer({resolveWithObject:true});
   let worst=Infinity;
   const fg=luminance(color);
   for(let i=0;i<data.length;i+=info.channels){const bg=luminance([data[i],data[i+1],data[i+2]]);worst=Math.min(worst,(Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05));}
   samples.push({selector,text,minimumRatio:+worst.toFixed(2)});
  }
 }
 fs.writeFileSync(__dirname+'/contrast.json',JSON.stringify(samples,null,2));
 console.log(JSON.stringify({samples:samples.length,minimum:Math.min(...samples.map(s=>s.minimumRatio)),below4_5:samples.filter(s=>s.minimumRatio<4.5)}));
 for(const width of [1280,3840]){
  await page.setViewportSize({width,height:width===3840?2160:900});
  await page.evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(800);
  await page.screenshot({path:__dirname+`/overview-top-${width}.png`});
  await page.locator('section[class*="Journey_"]').evaluate(e=>scrollTo(0,e.getBoundingClientRect().top+scrollY)); await page.waitForTimeout(400);
  await page.screenshot({path:__dirname+`/overview-lower-${width}.png`});
 }
 await page.setViewportSize({width:390,height:844});
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 for(const [name,selector] of [['about','section[class*="About_"]'],['contact','#contact']]){
  await page.locator(selector).scrollIntoViewIfNeeded(); await page.locator(selector).screenshot({path:__dirname+`/${name}-390-text-200.png`});
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
