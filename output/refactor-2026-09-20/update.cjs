const fs=require('fs');
const path='src/components/Splash/Splash.module.scss';
let css=fs.readFileSync(path,'utf8');
css=css.replace(".splash { position: relative; background: #000; }",`.splash {
  position: relative; isolation: isolate; background: #020b16;
  &::before {
    content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
    background: linear-gradient(180deg, #020b1620, #020b1630 60%, #020b16c9),
      url('../../assets/HomePhotos/galaxy.webp') center top / cover no-repeat;
    mask-image: linear-gradient(#000 0 calc(100% - 8rem), transparent);
  }
}`);
css=css.replace('min-height: 100vh;\n  min-height: 100svh;','min-height: min(100svh, 64rem);');
css=css.replace("background: #020913 url('../../assets/HomePhotos/galaxy.webp') center bottom / cover no-repeat;",'background: transparent;');
css=css.replace('linear-gradient(to top, #000, transparent 11%);','linear-gradient(to top, transparent, transparent);');
css=css.replace('width: 100%;\n  min-height: calc(100svh - 88px);','width: min(100%, 118rem);\n  min-height: min(calc(100svh - 88px), 58rem);');
css=css.replace('height: min(calc(100svh - 115px), 54vw);','height: min(calc(100svh - 115px), 54vw, 55rem);');
css=css.replace('font-size: clamp(42px, 4.05vw, 100px);','font-size: clamp(2.25rem, 1.1rem + 2.7vw, 5rem);');
css=css.replace('white-space: nowrap;','white-space: normal;\n  max-width: 100%;');
css=css.replace('font-size: clamp(26px, 2.6vw, 64px);','font-size: clamp(1.5rem, 1rem + 1.4vw, 2.75rem);');
css=css.replace('max-width: 720px;','max-width: 58ch;');
css=css.replace('font-size: clamp(16px, 1.18vw, 28px);','font-size: var(--lead-size, 1.125rem);');
css=css.replace('font-size: clamp(18px, 1.45vw, 25px);','font-size: 1rem;');
css=css.replace('background: linear-gradient(115deg, #0075db, #034bb8 65%, #052f85);','background: linear-gradient(115deg, #154c79, #12365e 65%, #102c4e);');
css=css.replace('border: 1px solid #148fe2;','border: 1px solid #3a80ab;');
css=css.replace('background: linear-gradient(115deg, #087ddd, #0653be 65%, #073b96);','background: linear-gradient(115deg, #1c5d8b, #194975 65%, #13355b);');
css=css.replace('font-size: clamp(36px, 4.4vw, 53px);','font-size: clamp(2.25rem, 1rem + 3vw, 3.3rem);');
css=css.replace("background-image: url('../../assets/HomePhotos/galaxy-mobile.webp');\n    background-position: 35% bottom;",'background: transparent;');
css=css.replace('font-size: clamp(36px, 6.3vw, 66px);','font-size: clamp(2.125rem, 1.25rem + 3vw, 3.75rem);');
css=css.replace('font-size: clamp(25px, 4.5vw, 37px);','font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem);');
css=css.replace('.summary { font-size: 16px;', '.summary { font-size: var(--body-size, 1rem);');
css+='\n@media (min-width: 1201px) { .hero > nav { max-width: 112rem; margin-inline: auto; padding-inline: 1.5rem; } }\n';
fs.writeFileSync(path,css);
for(const lang of ['pl','en']){
 const p='src/assets/i18n/'+lang+'.json';
 const d=JSON.parse(fs.readFileSync(p,'utf8'));
 d['about.angular']=lang==='pl'?'Angularem':'Angular';
 d['about.spring']=lang==='pl'?'Springiem':'Spring';
 d['about.and']=lang==='pl'?'i':'and';
 d['about.stats.backend.detail']=lang==='pl'?'komercyjnie od 2028':'professionally since 2028';
 d['footer.rights']=lang==='pl'?'Wszystkie prawa zastrzeżone.':'All rights reserved.';
 fs.writeFileSync(p,JSON.stringify(d,null,2)+'\n');
}
const shimmer='src/components/ShimmerText/ShimmerText.module.scss';
let sh=fs.readFileSync(shimmer,'utf8');
sh=sh.replace('0 0 6px #a6f1ff, 0 0 18px #008cff','0 0 3px #a6f1ff70, 0 0 10px #008cff60');
sh=sh.replace('0 0 12px #16adff, 0 0 28px #087bff','0 0 8px #16adff90, 0 0 16px #087bff60');
fs.writeFileSync(shimmer,sh);

