import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8"};
const server=http.createServer((req,res)=>{
 const requested=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
 const location=path.resolve(root,"."+requested,(requested.endsWith("/")?"index.html":""));
 if(!location.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 fs.readFile(location,(err,bytes)=>{
  if(err){res.writeHead(404);res.end("Not found");return;}
  res.writeHead(200,{"Content-Type":mime[path.extname(location)]||"text/plain"});
  res.end(bytes);
 });
});
await new Promise(ok=>server.listen(0,"127.0.0.1",ok));
const url="http://127.0.0.1:"+server.address().port+"/";
const browser=await chromium.launch({headless:true});
const errors=[];
async function route(page,hash){
 await page.goto(url+hash);
 await page.locator("main h1").first().waitFor();
}
try{
 for(const width of [320,375,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});
  page.on("pageerror",err=>errors.push(width+": "+err.message));
  await route(page,"#applets");
  assert.equal(await page.locator(".applet-tile").count(),10);
  await page.locator('[data-applet-filter="calculus"]').click();
  assert.equal(await page.locator(".applet-tile:visible").count(),3);
  await page.locator('[data-applet-filter="physics"]').click();
  assert.equal(await page.locator(".applet-tile:visible").count(),7);
  await page.locator('[data-applet-filter="all"]').click();
  assert.equal(await page.locator(".applet-tile:visible").count(),10);
  assert.ok(!(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)),"Applet gallery overflow");
  await route(page,"#home");
  await page.locator(".atlas-hero-figure svg").waitFor();
  await page.locator(".method-grid .method-item").first().waitFor();
  assert.equal(await page.locator(".method-grid .method-item").count(),4);
  const homeOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  assert.ok(!homeOverflow,"Editorial homepage overflow at "+width+"px");
  await route(page,"#books");
  const hasOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  if(hasOverflow){
   const culprits=await page.evaluate(()=>[...document.querySelectorAll("body *")].filter(el=>{const r=el.getBoundingClientRect();return r.right>innerWidth+2&&r.width>0;}).slice(0,12).map(el=>el.tagName.toLowerCase()+"."+el.className+" right="+Math.round(el.getBoundingClientRect().right)));
   console.error("Overflow candidates at "+width+"px:",culprits);
  }
  assert.ok(!hasOverflow,"Book library has horizontal overflow at "+width+"px");
  await page.locator("#book-search").fill("physical science");
  assert.equal(await page.locator("#book-results .book-tile:visible").count(),1,"Catalog search filters cards");
  assert.match(await page.locator("#book-search-count").innerText(),/1 matching pathway/);
  await page.locator("#book-search").fill("no-such-text");
  assert.equal(await page.locator("#book-search-empty").isVisible(),true,"Search empty state visible");
  await page.locator("#book-search").fill("");
  await page.locator('.grade-choices a[href="#grade/8"]').click();
  await page.locator('main h1').filter({hasText:"Grade 8"}).waitFor();
  await page.locator('.book-grid a[href="#book/physical-science?grade=8"]').click();
  await page.locator(".book-detail-head h1").filter({hasText:"Novare Physical Science"}).waitFor();
  assert.match(await page.locator(".route-nav").innerText(),/Grade 8/);
  await page.locator('.book-match a[href="#lesson/si-units?book=physical-science&grade=8"]').click();
  await page.locator(".context-trail").getByText("Novare Physical Science").waitFor();
  assert.equal(await page.locator(".route-nav a").first().getAttribute("href"),"#book/physical-science?grade=8");
  assert.equal(await page.locator("main").evaluate(el=>document.activeElement===el),true,"Route focus should reach main");
  assert.equal(await page.locator(".companion-links a").count()>=2,true);
  assert.equal(await page.locator(".companion-links a").filter({hasText:/Chapter 1/}).count(),0,"Do not label Glencoe equations as Novare");
  const tabs=page.locator(".lesson-tabs [role=tab]");
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  assert.equal(await page.locator("#tab-example").getAttribute("aria-selected"),"true");
  assert.equal(await page.locator("#steptext li").count(),1);
  const initial=await page.locator("#steptext li").first().innerText();
  await page.locator("#next").click();
  assert.equal(await page.locator("#steptext li").count(),2,"Steps must accumulate");
  assert.equal(await page.locator("#steptext li").first().innerText(),initial,"Earlier steps remain visible");
  await page.locator("#present-toggle").click();
  assert.equal(await page.locator("body").evaluate(el=>el.classList.contains("presentation-mode")),true);
  assert.equal(await page.locator("#present-toggle").getAttribute("aria-pressed"),"true");
  assert.equal(await page.locator("#steptext li").count(),2,"Presentation keeps learning state");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("body").evaluate(el=>el.classList.contains("presentation-mode")),false);
  assert.equal(await page.locator("#present-toggle").getAttribute("aria-pressed"),"false");
  await page.locator('.companion-links a[href^="#study/"]').click();
  assert.ok(page.url().includes("#study/si-units?book=physical-science&grade=8"),"Study keeps book context");
  await page.locator('.route-nav a[href^="#guided/"]').click();
  assert.ok(page.url().includes("#guided/si-units?book=physical-science&grade=8"),"Practice keeps book context");
  await page.locator("#guided-reveal").click();
  await page.locator("#guided-reveal").click();
  assert.equal(await page.locator("#guided-steps li").count(),2,"Practice steps accumulate");
  if(width<=760){
   await page.locator("#menu-btn").click();
   assert.equal(await page.locator("#menu-btn").getAttribute("aria-expanded"),"true");
   await page.keyboard.press("Escape");
   assert.equal(await page.locator("#menu-btn").getAttribute("aria-expanded"),"false");
  }
  const overflowEnd=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
  assert.ok(!overflowEnd,"Guided practice has horizontal overflow at "+width+"px");
  await page.close();
  console.log("PASS browser journey, keyboard, progressive steps and projector mode at "+width+"px");
 }
 const page=await browser.newPage();
 page.on("pageerror",err=>errors.push("direct: "+err.message));
 await route(page,"#lesson/tangent-line?book=physical-science&grade=8");
 assert.equal(await page.locator(".context-trail").count(),0,"Reject fake textbook associations");
 await route(page,"#lesson/si-units");
 assert.ok(await page.locator(".companion-links").innerText().then(x=>x.includes("Chapter 1")),"Uncontextualized Glencoe reference survives");
 await route(page,"#lesson/two-dimensional-motion");
 assert.equal(await page.locator("#velocity-vectors path").count()>0,true);
 await page.locator("#velocity-angle").evaluate(el=>{el.value="90";el.dispatchEvent(new Event("input",{bubbles:true}));});
 assert.equal(await page.locator("#velocity-x").innerText(),"0 m/s");
 await page.locator('.route-nav a').last().click();
 await page.locator("#projectile-trace path").first().waitFor();
 assert.ok((await page.locator("#projectile-range").innerText()).endsWith(" m"));
 await route(page,"#lesson/circular-motion");
 assert.equal(await page.locator("#circle-acceleration").innerText(),"12 m/s²");
 await page.locator("#circle-speed").evaluate(el=>{el.value="12";el.dispatchEvent(new Event("input",{bubbles:true}));});
 assert.equal(await page.locator("#circle-acceleration").innerText(),"48 m/s²");
 await page.locator("#circle-step").click();
 await page.locator("#circle-play").click();
 assert.equal(await page.locator("#circle-play").getAttribute("aria-pressed"),"true");
 await page.locator("#circle-play").click();
 assert.equal(await page.locator("#circle-play").getAttribute("aria-pressed"),"false");
 assert.equal(await page.locator(".investigation-guide").count(),1);
 await route(page,"#lesson/relative-velocity");
 assert.equal(await page.locator("#river-time").innerText(),"15 s");
 assert.equal(await page.locator("#river-drift").innerText(),"30 m east");
 await page.locator("#river-aim").click();
 assert.ok(parseFloat(await page.locator("#river-drift").innerText())<2);
 await page.locator("#river-reset").click();
 assert.equal(await page.locator("#river-drift").innerText(),"30 m east");
 await route(page,"#book/pre-algebra");
 assert.match(await page.locator(".empty-state").innerText(),/not yet a published lesson connection/);
 await page.close();
 assert.deepEqual(errors,[],"No uncaught errors across browser journeys");
 console.log("PASS browser suite: contextual safeguards, original subject navigation, no dead-end prototype");
}finally{
 await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
