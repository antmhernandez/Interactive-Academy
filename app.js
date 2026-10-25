"use strict";
const main=document.querySelector("#main");
const nav=document.querySelector("#nav");
let lessons=[];
let curriculum=null;
let submodules=[];
let guidedSets=[];
let physicsEquations=null;
let bookPathways=null;
const escapeHtml=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const f=n=>String(Number(Number(n).toFixed(3)));
const get=id=>lessons.find(l=>l.id===id);
const subject=s=>s==="physics"?"Physics":"Calculus";
const completed = new Set((()=>{
 try { const raw=JSON.parse(localStorage.getItem("learning-atlas-completed-v1")||"[]");return Array.isArray(raw)?raw.filter(x=>typeof x==="string") : []; }
 catch { return []; }
})());
function saveCompleted(){try{localStorage.setItem("learning-atlas-completed-v1",JSON.stringify([...completed]));}catch{/* local progress unavailable */}}
const completedCount=s=>lessons.filter(l=>l.subject===s&&completed.has(l.id)).length;
const courseList=s=>lessons.filter(l=>l.subject===s);
const courseOrder=l=>courseList(l.subject).findIndex(item=>item.id===l.id)+1;

const card=l=>`<a class="card" href="#lesson/${encodeURIComponent(l.id)}"><div class="meta"><span class="pill ${l.subject==='calculus'?'calculus':''}">${subject(l.subject)}</span><span>${escapeHtml(l.duration)}</span></div><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.subtitle)}</p><div class="meta"><span>Lesson ${courseOrder(l)} of ${courseList(l.subject).length}</span><span class="open">${completed.has(l.id)?"✓ Completed":"Explore lesson →"}</span></div></a>`;

const visualKeys={
 "displacement":[["teal","Start"],["amber","Turn"],["navy","Finish"]],
 "motion":[["teal","Earlier positions"],["amber","Final position"]],
 "average-velocity":[["teal","Position"],["amber","Average slope"]],
 "acceleration":[["teal","Velocity"],["amber","Selected time"]],
 "free-fall":[["amber","Falling object"],["teal","Height over time"]],
 "motion-graphs":[["teal","Position"],["amber","Velocity"],["violet","Acceleration"]],
 "tangent":[["teal","Curve"],["amber","Secant"],["green","Tangent"]],
 "velocity-area":[["teal","Displacement area"],["amber","Current time"]],
 "riemann":[["teal","Rectangles"],["amber","Original function"]],
 "force-components":[["amber","Applied force"],["teal","Horizontal"],["green","Vertical"]],
 "free-body":[["amber","Push"],["teal","Normal"],["violet","Weight"]],
 "newton-two":[["teal","Cart"],["amber","Net force"]],
 "limit-hole":[["teal","Curve / hole"],["amber","Nearby value"]],
 "hydrogen-spectrum":[["teal","Allowed states"],["amber","Photon"]],
 "one-sided-limit":[["teal","Left approach"],["amber","Right approach"]],
 "slope-height":[["teal","Position line"],["amber","Current point"]],
 "sign-speed":[["teal","Velocity"],["amber","Acceleration"]],
 "limit-value":[["teal","Nearby graph"],["amber","Defined point"]],
 "unit-conversion":[["teal","Meters"],["amber","Centimeters"]],
 "measurement-ruler":[["teal","Estimated interval"],["amber","Object edge"]],
 "significant-digits":[["teal","First factor"],["amber","Second factor"],["navy","Rounded result"]],
 "units-cancel":[["teal","Unit relationship"],["amber","Calculated result"]],
 "slope-graph":[["teal","Position curve"],["amber","Secant slope"]],
 "velocity-components":[["amber","Velocity vector"],["teal","Horizontal"],["green","Vertical"]],
 "projectile-motion":[["teal","Flight path"],["amber","Highest point"]]
};
function visualLegend(name){
 const keys=visualKeys[name]||[];
 return '<div class="visual-key" aria-label="Diagram color key">'+keys.map(([color,label])=>
 '<span><i class="key-dot '+color+'" aria-hidden="true"></i>'+escapeHtml(label)+'</span>').join('')+'</div>';
}
function heroArt(){return `<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 500 320"><defs><pattern id="hero-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" stroke="#b5c8bd" stroke-width=".8" opacity=".5" fill="none"/></pattern></defs><rect width="500" height="320" fill="#edf3ee"/><rect width="500" height="320" fill="url(#hero-grid)"/><path d="M52 262H466M78 290V30" stroke="#97b6af" stroke-width="1.5"/><path d="M77 244 Q170 282 265 134 T443 45" stroke="#14727a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M130 239L367 78" stroke="#ca8a46" stroke-width="3.4"/><circle cx="258" cy="145" r="8" fill="#d89e53" stroke="white" stroke-width="4"/><path d="M258 145V262" stroke="#a2b9b2" stroke-width="1.5" stroke-dasharray="5 5"/><text x="349" y="117" fill="#16666d" font-size="22" font-family="Georgia" font-style="italic">f(x)</text><text x="294" y="202" fill="#ad733b" font-size="17" font-family="Georgia">tangent</text></svg></div>`;}
function home(){
 const physics=courseList("physics"),calculus=courseList("calculus");
 const nextPhysics=physics.find(l=>!completed.has(l.id)&&!l.optionalPreview)||physics[0];
 const nextCalculus=calculus.find(l=>!completed.has(l.id))||calculus[0];
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><span class="route-current">Welcome to The Learning Atlas</span><a href="#books">Books &amp; grades</a><a href="#showcase">Publisher overview</a></nav>
 <section class="home-hero publisher-hero atlas-hero">
  <div class="atlas-hero-copy"><div class="eyebrow">The Learning Atlas · Independent study companion</div>
   <h1>See clearly.<br><em>Reason deeply.</em></h1>
   <p>A well-chosen illustration can open the door to understanding. Explore the idea, watch the mathematics unfold, then try it yourself.</p>
   <div class="showcase-actions"><a class="btn primary" href="#books">Explore books &amp; grades →</a><a class="btn" href="#physics">Begin Physics</a></div>
   <div class="atlas-proof"><span>ORIGINAL DIAGRAMS</span><span>REASONING IN STEPS</span><span>DELIBERATE PRACTICE</span></div></div>
  <div class="atlas-hero-figure"><div class="atlas-figure-top"><span>FIG. 01 · MOTION AND CHANGE</span><span class="atlas-figure-symbol" aria-hidden="true">∴</span></div>
   ${heroArt()}<div class="atlas-figure-caption"><strong>From a curve to a conclusion.</strong><span>Explore how changing slope tells a physical story.</span><a href="#lesson/graph-slope-physics">Open the illustration →</a></div></div>
 </section>
 <section class="atlas-method" aria-label="The learning method">
  <div class="method-heading"><div class="eyebrow">A thoughtful sequence</div><h2>One idea. Four ways to understand it.</h2></div>
  <div class="method-grid">
   <div class="method-item"><span class="method-number">I</span><h3>The Idea</h3><p>A clear definition and a question worth asking.</p></div>
   <div class="method-item"><span class="method-number">II</span><h3>Example</h3><p>Worked reasoning revealed one step at a time.</p></div>
   <div class="method-item"><span class="method-number">III</span><h3>Think</h3><p>A brief check that uncovers misconceptions.</p></div>
   <div class="method-item"><span class="method-number">IV</span><h3>Try it</h3><p>Make the mathematics your own with practice.</p></div>
  </div>
 </section>
 <div class="section-heading home-section-heading"><div><div class="eyebrow">The original study collection</div><h2>Choose a course to begin.</h2></div><a class="section-link" href="#books">Or explore by textbook →</a></div>
 <div class="home-choices subject-choices">
  <a class="subject-tile" href="#physics"><span class="subject-glyph">Φ</span><span><strong>Physics</strong><small>${physics.length} lessons · from measurement through projectile motion</small></span><span aria-hidden="true">→</span></a>
  <a class="subject-tile calculus" href="#calculus"><span class="subject-glyph">∫</span><span><strong>Calculus</strong><small>${calculus.length} lessons · limits, derivatives, and accumulation</small></span><span aria-hidden="true">→</span></a>
 </div>
 <section class="atlas-continue" aria-label="Continue a course on this device">
  <div><div class="eyebrow">Your private learning desk</div><h2>Pick up with your next idea.</h2><p>Progress is saved only in this browser. No account or student tracking is needed.</p></div>
  <div class="continue-options">
   <a href="#lesson/${nextPhysics.id}"><span>Physics · ${completedCount("physics")} / ${physics.length} complete</span><strong>${escapeHtml(nextPhysics.title)} →</strong></a>
   <a href="#lesson/${nextCalculus.id}"><span>Calculus · ${completedCount("calculus")} / ${calculus.length} complete</span><strong>${escapeHtml(nextCalculus.title)} →</strong></a>
  </div>
 </section>
 <div class="lab-strip"><div><strong>From observation to evidence.</strong><span>Enter measured data, graph it, and fit a physical model.</span></div><a href="lab/motion.html">Explore the Motion Data Lab →</a></div>
 <p class="independence-note">Independent concept prototype for discussion. Published textbook references are illustrative only; they are not official Memoria Press integrations or approved chapter mappings.</p>`;
}
function catalog(s){
 const items=courseList(s),completedTotal=completedCount(s);
 const topicOwners=new Map(curriculum.subjects.flatMap(q=>q.units.flatMap(u=>u.topics.map(t=>[t.id,q.id]))));
 const downloads=curriculum.assets.filter(a=>topicOwners.get(a.owner)===s);
 const printableLinks=downloads.map(a=>'<a href="'+encodeURI(a.path)+'"'+(a.path.startsWith("lab/")?'':' target="_blank" rel="noopener"')+'>'+escapeHtml(a.label)+' ↗</a>').join("");
 const futureCount=curriculum.subjects.find(x=>x.id===s).units.flatMap(u=>u.topics).filter(t=>t.status==="planned").length;
 const byUnit=[...new Set(items.map(x=>x.unit))];
 const render=arr=>byUnit.map(unit=>{
   const selected=arr.filter(l=>l.unit===unit);
   if(!selected.length)return "";
   return `<section class="topic-group"><h2>${escapeHtml(unit)}</h2><div class="topic-list">${selected.map(l=>`<a class="topic-row" href="#lesson/${encodeURIComponent(l.id)}"><span class="topic-num">${String(courseOrder(l)).padStart(2,"0")}</span><span class="topic-body"><strong>${escapeHtml(l.title)}</strong><small>${escapeHtml(l.subtitle)}</small></span><span class="topic-state">${completed.has(l.id)?"✓ Done":"Explore →"}</span></a>`).join("")}</div></section>`;
 }).join("");
 main.innerHTML=`
 <nav class="route-nav" aria-label="Page navigation"><a href="#home">← Back</a><a href="#home">⌂ Home</a><a href="#lesson/${items[0].id}">First lesson →</a></nav>
 <header class="catalog-head"><div class="eyebrow">Explore a subject</div><h1>${subject(s)}</h1><p>${s==="physics"?"See the phenomena. Discover what the mathematics means.":"Understand change, slope, and accumulation—visually."}</p><div class="mini-progress">${completedTotal} of ${items.length} lessons completed on this device</div></header>
 <div class="catalog-tools"><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" autocomplete="off" placeholder="Find a concept…" aria-label="Search ${subject(s)} lessons"></label><a class="btn primary" href="#lesson/${items[0].id}">Start learning →</a></div>
 <div id="topic-groups">${render(items)}</div>
 <div class="outline-link"><a href="#books">Browse grade-level books and related concepts →</a></div>
 <div class="outline-link"><a href="#roadmap/${s}">View full course map <span>(${futureCount} planned topics)</span> →</a></div>
 ${s==="physics"?'<div class="outline-link"><a href="#equations">Chapter Equation Reference →</a></div><div class="optional-preview">Curious about atoms? <a href="#lesson/atom-spectra">Preview the colors of hydrogen</a>. Its quantitative model belongs in Chapter 28.</div>':""}
 <section class="resources"><details><summary>Guided notes &amp; experiments</summary><div class="resource-links">${printableLinks}</div></details></section>`;
 document.querySelector("#search").addEventListener("input",e=>{
  const q=e.target.value.trim().toLowerCase();
  const filtered=items.filter(l=>[l.title,l.subtitle,l.unit,l.idea].join(" ").toLowerCase().includes(q));
  document.querySelector("#topic-groups").innerHTML=filtered.length?render(filtered):'<p class="empty-state">No lesson found. Try another term.</p>';
 });
}
function roadmap(subjectId){
 const info=curriculum.subjects.find(q=>q.id===subjectId);
 const topics=info.units.flatMap(u=>u.topics),available=topics.filter(t=>t.status==="available").length;
 const sections=info.units.map(u=>{
  const ready=u.topics.filter(t=>t.status==="available").length;
  const rows=u.topics.map(t=>`<div class="roadmap-topic ${t.status==="planned"?"planned":""}">
    <span>${t.status==="available"?"✓":"○"}</span>
    <span class="roadmap-topic-name">${t.status==="available"?`<a href="#lesson/${t.id}">${escapeHtml(t.title)}</a>`:escapeHtml(t.title)}<small>${escapeHtml(t.goal)}</small></span>
    <span class="roadmap-status">${t.status==="available"?"Explore":"Planned"}</span></div>`).join("");
  return `<details class="roadmap-unit" ${ready?"open":""}><summary><span>${escapeHtml(u.title)}</span><small>${ready} / ${u.topics.length} ready</small></summary><div>${rows}</div></details>`;
 }).join("");
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#${subjectId}">← Back</a><a href="#home">⌂ Home</a><a href="#lesson/${courseList(subjectId)[0].id}">First lesson →</a></nav>
 <header class="catalog-head"><div class="eyebrow">Curriculum roadmap · ${escapeHtml(info.title)}</div><h1>Course Map</h1><p>Explore the lessons available now. Future topics are organized here but cannot yet be opened.</p><div class="mini-progress">${available} available · ${topics.length-available} planned</div></header>
 ${subjectId==="physics"?'<p><a href="#equations" class="btn">Physics equation reference →</a></p>':""}
 <div class="roadmap-units">${sections}</div>
 <p class="map-footnote">This outline is a development plan, not a promise of course completion or a textbook reproduction. Some topics may be revised as we test the teaching sequence.</p>`;
}
function about(){
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#home">← Back</a><a href="#home">⌂ Home</a><a href="#physics">Explore Physics →</a></nav><section class="plain-page"><div class="eyebrow">About</div><h1>See the mathematics.</h1><p>Interactive Academy is a developing collection of original Physics and Calculus lessons. Each begins with a diagram or experiment, followed by a concise explanation and a chance to try the idea.</p><p>No accounts or AI calls are required. Completed-lesson marks stay in your browser. This preview is independent of HLS, Memoria Press, Novare, College Board and Texas Instruments.</p></section>`;
}
function lesson(l){
 const group=courseList(l.subject),idx=courseOrder(l),ctx=lessonContext(l);
 const related=ctx.book?ctx.book.topicIds.map(get).filter(Boolean):group;
 const position=related.findIndex(item=>item.id===l.id);
 const previous=ctx.book?related[position-1]:lessons.find(x=>x.subject===l.subject&&x.next===l.id);
 const next=ctx.book?related[position+1]:get(l.next);
 const start=ctx.book?bookLink(ctx.book,ctx.grade):(previous?"#lesson/"+previous.id:"#"+l.subject);
 const end=ctx.book?(next?lessonLink("lesson",next,ctx):bookLink(ctx.book,ctx.grade)):(next?"#lesson/"+next.id:"#"+l.subject);
 main.innerHTML=`
 <nav class="route-nav" aria-label="Lesson navigation"><a href="${start}">${ctx.book?"← Back to book":"← Back"}</a><a href="#home">⌂ Home</a><a href="${end}">${ctx.book?(next?"Next example →":"Book overview →"):"Next →"}</a></nav>
 ${contextTrail(ctx)}
 <header class="focus-head"><div class="eyebrow">${subject(l.subject)} <span aria-hidden="true">·</span> ${escapeHtml(l.unit)} <span aria-hidden="true">·</span> ${String(idx).padStart(2,"0")} / ${String(group.length).padStart(2,"0")}</div><h1>${escapeHtml(l.title)}</h1><p>${escapeHtml(l.subtitle)}</p></header>
 <article class="focus-lesson">
 <div class="lesson-tools" aria-label="Lesson tools"><button type="button" id="copy-lesson-link">Copy lesson link</button><span id="copy-lesson-status" role="status" aria-live="polite"></span><button type="button" id="present-toggle" aria-pressed="false">Present lesson</button></div>
 <section class="visual-stage" aria-label="Interactive demonstration">
 <div class="visual-intro"><span class="visual-label">EXPLORE</span><p>${escapeHtml(l.visualLead)}</p></div>
 <div class="interactive" id="visual"></div>
 ${visualLegend(l.visual)}
 <div class="notice-line"><span>Notice</span><p>${escapeHtml(l.focus||l.idea)}</p></div>
 </section>
 <section class="learn-area" aria-label="Learn and practice">
 <div class="lesson-tabs" role="tablist" aria-label="Learning activities">
 <button id="tab-understand" role="tab" type="button" data-view="understand" aria-controls="understand">The idea</button>
 <button id="tab-example" role="tab" type="button" data-view="example" aria-controls="example">Example</button>
 <button id="tab-concept-check" role="tab" type="button" data-view="concept-check" aria-controls="concept-check">Think</button>
 <button id="tab-practice" role="tab" type="button" data-view="practice" aria-controls="practice">Try it</button>
 </div>
 <section class="lesson-panel" role="tabpanel" id="understand" aria-labelledby="tab-understand"><h2>The idea</h2><p class="idea-text definition-first">${escapeHtml(l.definition)}</p><p class="concept-context">${escapeHtml(l.idea)}</p><p class="topic-readmore"><a href="${lessonLink("study",l,ctx)}">Read definition &amp; try an example →</a></p></section>
 <section class="lesson-panel" role="tabpanel" id="example" aria-labelledby="tab-example">
 <div class="eyebrow">Worked example</div><h2>Follow the steps</h2><p>${escapeHtml(l.example.question)}</p>
 <div class="example"><div class="step-counter" id="stepcount"></div><ol class="worked-steps" id="steptext" aria-label="Cumulative worked solution" aria-live="polite" aria-relevant="additions"></ol><div class="step-nav"><button id="prev" type="button">← Previous</button><button class="primary" id="next" type="button">Reveal next step ↓</button><button id="restart" type="button">Start over</button></div></div></section>
 <section class="lesson-panel" role="tabpanel" id="practice" aria-labelledby="tab-practice">
 <div class="eyebrow">Independent practice</div><h2>Your turn</h2><p>${escapeHtml(l.practice.prompt)}</p>
 <form id="answerform"><label for="answer">Answer${l.practice.unit?" ("+escapeHtml(l.practice.unit)+")":""}</label><div class="answer-row"><input id="answer" type="number" step="any" required inputmode="decimal" placeholder="Enter your answer"><button class="primary" type="submit">Check</button></div></form><p id="feedback" class="feedback" role="status" aria-live="polite"></p>
 <button class="hint-button" id="hintbtn" type="button">Need a hint?</button><p id="hinttext" class="hint" hidden></p></section>
 </section>
 ${submodulesFor(l.id,ctx)}
 <nav class="companion-links" aria-label="More ways to learn this concept"><a href="${lessonLink("study",l,ctx)}"><strong>Definition &amp; Example</strong><small>One solved problem, then your turn</small></a><a href="${lessonLink("guided",l,ctx)}"><strong>Guided Practice</strong><small>Three increasing levels with optional steps</small></a>${l.subject==="physics"&&allowChapterLink(ctx)?`<a href="#equations/${lessonChapter(l)}"><strong>Chapter ${lessonChapter(l)} Equations</strong><small>Formulas, meaning, and assumptions</small></a>`:""}</nav>
 <div class="lesson-end"><button type="button" id="markdone" aria-pressed="${completed.has(l.id)?"true":"false"}">${completed.has(l.id)?"✓ Marked complete":"○ Mark complete"}</button>${l.subject==="physics"?'<a href="lab/motion.html">Motion Lab ↗</a>':""}<a class="next-link" href="${end}">${ctx.book?(next?"Next illustrative example →":"Back to book →"):(next?"Next concept →":"All "+subject(l.subject)+" lessons →")}</a></div>
 </article>`;
 const presentButton=document.querySelector("#present-toggle");
 presentButton.onclick=()=>{
  const enabled=!document.body.classList.contains("presentation-mode");
  closePresentation();
  if(enabled){
   document.body.classList.add("presentation-mode");
   for(const element of document.querySelectorAll(".edition-strip,.topbar,.footer,.route-nav,.focus-head,.context-trail"))element.inert=true;
  }
  presentButton.setAttribute("aria-pressed",String(enabled));
  presentButton.textContent=enabled?"Exit presentation (Esc)":"Present lesson";
  presentButton.focus();
 };
 document.querySelector("#copy-lesson-link").onclick=async()=>{
  const result=document.querySelector("#copy-lesson-status");
  try{await navigator.clipboard.writeText(location.href);result.textContent="Lesson link copied.";}
  catch{result.textContent="Copy the shareable URL from the browser address bar.";}
 };
 // Add the check panel before tab handling. The visual remains visible throughout.
 renderConceptCheck(l);
 const tabs=[...document.querySelectorAll(".lesson-tabs [role=tab]")];
 function showTab(id,focus=false){
  tabs.forEach(t=>{const selected=t.dataset.view===id;t.setAttribute("aria-selected",String(selected));t.tabIndex=selected?0:-1;if(selected&&focus)t.focus();});
  document.querySelectorAll(".learn-area .lesson-panel").forEach(p=>{p.hidden=p.id!==id;});
 }
 for(let i=0;i<tabs.length;i++){
  const tab=tabs[i];
  tab.addEventListener("click",()=>showTab(tab.dataset.view));
  tab.addEventListener("keydown",e=>{
   if(!["ArrowRight","ArrowLeft","Home","End"].includes(e.key))return;
   e.preventDefault();
   const j=e.key==="Home"?0:e.key==="End"?tabs.length-1:(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
   showTab(tabs[j].dataset.view,true);
  });
 }
 showTab("understand");
 const st=l.example.steps;let step=0;
 const stepList=document.querySelector("#steptext");
 function paintStep(){stepList.replaceChildren();for(const sentence of st.slice(0,step+1)){const li=document.createElement("li");li.className="worked-step";li.textContent=sentence;stepList.append(li);}document.querySelector("#stepcount").textContent=`Showing ${step+1} of ${st.length} steps`;document.querySelector("#prev").disabled=step===0;document.querySelector("#next").disabled=step===st.length-1;}
 document.querySelector("#prev").onclick=()=>{step=Math.max(0,step-1);paintStep();};
 document.querySelector("#next").onclick=()=>{if(step>=st.length-1)return;step++;renderAccumulativeStep(stepList,st[step]);document.querySelector("#stepcount").textContent=`Showing ${step+1} of ${st.length} steps`;document.querySelector("#prev").disabled=false;document.querySelector("#next").disabled=step===st.length-1;};
 document.querySelector("#restart").onclick=()=>{step=0;paintStep();};paintStep();
 document.querySelector("#answerform").onsubmit=e=>{
  e.preventDefault();const input=document.querySelector("#answer").value, value=Number(input);
  const good=input.trim()!==""&&Number.isFinite(value)&&Math.abs(value-l.practice.answer)<=l.practice.tolerance;
  const out=document.querySelector("#feedback");out.className="feedback "+(good?"good":"try");
  out.textContent=good?"Correct. Explain what the result means.":"Check the idea, the sign, and the units. Try a hint.";
 };
 let hint=0;document.querySelector("#hintbtn").onclick=()=>{
   const h=l.practice.hints;const out=document.querySelector("#hinttext");out.hidden=false;out.textContent=h[Math.min(hint,h.length-1)];hint++;document.querySelector("#hintbtn").textContent=hint<h.length?"Another hint":"Review hint";
 };
 const mark=document.querySelector("#markdone");
 mark.onclick=()=>{if(completed.has(l.id))completed.delete(l.id);else completed.add(l.id);saveCompleted();mark.textContent=completed.has(l.id)?"✓ Marked complete":"○ Mark complete";mark.setAttribute("aria-pressed",String(completed.has(l.id)));};
 const el=document.querySelector("#visual");
 if(l.visual==="displacement")displacement(el);
 if(l.visual==="average-velocity")averageVelocity(el);
 if(l.visual==="free-fall")freeFall(el);
 if(l.visual==="velocity-area")velocityArea(el);
 if(l.visual==="motion")motion(el);
 if(l.visual==="acceleration")acceleration(el);
 if(l.visual==="motion-graphs")linkedGraphs(el);
 if(l.visual==="tangent")tangent(el);
 if(l.visual==="riemann")riemann(el);
 if(l.visual==="force-components")forceComponents(el);
 if(l.visual==="free-body")freeBody(el);
 if(l.visual==="newton-two")newtonTwo(el);
 if(l.visual==="limit-hole")limitHole(el);
 if(l.visual==="hydrogen-spectrum")hydrogenSpectrum(el);
 if(l.visual==="one-sided-limit")oneSidedLimit(el);
 if(l.visual==="unit-conversion")unitConversion(el);
 if(l.visual==="measurement-ruler")measurementRuler(el);
 if(l.visual==="significant-digits")significantDigits(el);
 if(l.visual==="units-cancel")unitCancellation(el);
 if(l.visual==="slope-graph")slopeToolkit(el);
 if(l.visual==="velocity-components")velocityComponents(el);
 if(l.visual==="projectile-motion")projectileMotion(el);
}
function renderConceptCheck(lesson) {
 const c=lesson.checkpoint;
 if(!c) return;
 const section=document.createElement("section");
 section.className="lesson-panel conceptual-check";
 section.setAttribute("role","tabpanel");
 section.setAttribute("aria-labelledby","tab-concept-check");;
 section.id="concept-check";
 const eyebrow=document.createElement("div");
 eyebrow.className="eyebrow";
 eyebrow.textContent="Check your understanding";
 const heading=document.createElement("h2");
 heading.textContent="Think before answering";
 const prompt=document.createElement("p");
 prompt.textContent=c.prompt;
 const fieldset=document.createElement("fieldset");
 fieldset.className="choice-group";
 const legend=document.createElement("legend");
 legend.textContent="Choose the best explanation:";
 fieldset.append(legend);
 c.choices.forEach((choice,i)=>{
  const label=document.createElement("label");
  label.className="concept-choice";
  const input=document.createElement("input");
  input.type="radio";
  input.name="concept-"+lesson.id;
  input.value=String(i);
  const span=document.createElement("span");
  span.textContent=choice;
  label.append(input,span);
  fieldset.append(label);
 });
 const check=document.createElement("button");
 check.type="button";
 check.className="primary";
 check.textContent="Check my reasoning";
 const feedback=document.createElement("div");
 feedback.className="concept-feedback";
 feedback.setAttribute("role","status");
 feedback.setAttribute("aria-live","polite");
 check.addEventListener("click",()=>{
  const selected=fieldset.querySelector("input:checked");
  if(!selected){
    feedback.textContent="Choose an answer before checking.";
    feedback.className="concept-feedback try";
    return;
  }
  const index=Number(selected.value);
  const correct=index===c.correct;
  feedback.className="concept-feedback "+(correct?"good":"try");
  feedback.textContent=c.feedback[index]+(correct?" "+c.explanation:"");
  if(correct){
    check.textContent="Understood ✓";
    check.disabled=true;
    fieldset.disabled=true;
  }
 });
 section.append(eyebrow,heading,prompt,fieldset,check,feedback);
 document.querySelector("#practice").before(section);
}

function forceComponents(el){
 el.innerHTML=`<div class="diagram-head"><strong>Resolve one force</strong><span class="pill">Vectors</span></div>
 <svg viewBox="0 0 540 315" role="img" aria-label="An angled applied force and its horizontal and vertical vector components">
 <defs><marker id="fc-a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#c08039"/></marker><marker id="fc-x" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#14727a"/></marker><marker id="fc-y" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#32986f"/></marker></defs>
 <rect width="540" height="315" fill="#f8fbf9" rx="12"/><g id="components-plot"></g></svg>
 <div class="controls"><label>Force <strong id="f-read"></strong><input id="f-strength" type="range" min="5" max="28" step="1" value="20"></label><label>Angle above horizontal <strong id="angle-read"></strong><input id="f-angle" type="range" min="0" max="90" step="5" value="35"></label></div>
 <div class="readout"><div class="metric"><small>Horizontal Fₓ</small><strong id="fx-read"></strong></div><div class="metric"><small>Vertical Fᵧ</small><strong id="fy-read"></strong></div></div>`;
 const strength=el.querySelector("#f-strength"),angle=el.querySelector("#f-angle"),g=el.querySelector("#components-plot");
 function draw(){
  const F=+strength.value,theta=+angle.value,radians=theta*Math.PI/180,fx=F*Math.cos(radians),fy=F*Math.sin(radians);
  const ox=112,oy=258,scale=6.9,X=ox+scale*fx,Y=oy-scale*fy;
  const arc=theta?`<path d="M ${ox+43} ${oy} A 43 43 0 0 0 ${ox+43*Math.cos(radians)} ${oy-43*Math.sin(radians)}" stroke="#9cbdb1" fill="none" stroke-width="2"/>`:"";
  g.innerHTML=`<path d="M65 ${oy}H515M${ox} 25V284" stroke="#b3c7bf" stroke-width="1.5"/><text x="499" y="${oy+20}" font-size="13" fill="#60736c">x</text><text x="${ox-19}" y="31" font-size="13" fill="#60736c">y</text>
  <path d="M${ox} ${oy}H${X}" stroke="#14727a" stroke-width="4" marker-end="url(#fc-x)"/>
  <path d="M${X} ${oy}V${Y}" stroke="#32986f" stroke-width="4" marker-end="url(#fc-y)"/>
  <path d="M${ox} ${oy}L${X} ${Y}" stroke="#c08039" stroke-width="5" marker-end="url(#fc-a)"/>
  <path d="M${X-12} ${oy}V${oy-12}H${X}" stroke="#779991" fill="none" stroke-width="1.4"/>
  ${arc}<text x="${ox+49}" y="${oy-12}" fill="#446b64" font-size="13">θ = ${theta}°</text>
  <text x="${(ox+X)/2}" y="${oy+22}" text-anchor="middle" font-size="14" fill="#14727a">Fₓ</text>
  <text x="${X+14}" y="${(oy+Y)/2}" font-size="14" fill="#25835e">Fᵧ</text>
  <text x="${(ox+X)/2-8}" y="${(oy+Y)/2-13}" font-size="14" fill="#a5672e">F</text>`;
  el.querySelector("#f-read").textContent=f(F)+" N";el.querySelector("#angle-read").textContent=theta+"°";
  el.querySelector("#fx-read").textContent=f(fx)+" N";el.querySelector("#fy-read").textContent=f(fy)+" N";
 }
 strength.oninput=angle.oninput=draw;draw();
}
function freeBody(el){
 el.innerHTML=`<div class="diagram-head"><strong>Isolate the box</strong><span class="pill">Free-body diagram</span></div>
 <svg viewBox="0 0 540 315" role="img" aria-label="Box on a smooth horizontal floor and a free-body diagram showing applied push, normal force and weight">
 <defs><marker id="fb-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#c08039"/></marker><marker id="fb-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#14727a"/></marker><marker id="fb-violet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#6578a5"/></marker></defs>
 <rect width="540" height="315" rx="12" fill="#f8fbf9"/><g id="fb-plot"></g></svg>
 <div class="controls"><label>Mass <strong id="fb-mass-label"></strong><input id="fb-mass" type="range" min="1" max="6" step=".5" value="2"></label><label>Horizontal push <strong id="fb-push-label"></strong><input id="fb-push" type="range" min="0" max="20" step="1" value="8"></label></div>
 <div class="readout"><div class="metric"><small>Normal force</small><strong id="fb-normal"></strong></div><div class="metric"><small>Weight</small><strong id="fb-weight"></strong></div><div class="metric"><small>Net horizontal</small><strong id="fb-net"></strong></div></div>
 <p class="note">Level, frictionless floor. The push is horizontal; vertical acceleration is zero.</p>`;
 const mass=el.querySelector("#fb-mass"),push=el.querySelector("#fb-push");
 function draw(){
  const m=+mass.value,p=+push.value,w=9.8*m,vert=24+w*1.25,horiz=20+p*3.1;
  el.querySelector("#fb-plot").innerHTML=`<path d="M35 240H232" stroke="#8eaca3" stroke-width="3"/><rect x="88" y="185" width="70" height="55" rx="6" fill="#d9e9e2" stroke="#3b7772" stroke-width="2"/>
  <path d="M159 212h47" stroke="#c08039" stroke-width="4" marker-end="url(#fb-amber)"/><text x="89" y="272" font-size="13" fill="#60736c">Physical box</text>
  <path d="M265 40V281" stroke="#d3e2d9" stroke-dasharray="4 4"/><text x="335" y="40" font-size="15" fill="#315b57">Isolated object</text>
  <circle cx="362" cy="166" r="8" fill="#304c48"/>
  <path d="M362 166V${166-vert}" stroke="#14727a" stroke-width="4.5" marker-end="url(#fb-teal)"/>
  <path d="M362 166V${166+vert}" stroke="#6578a5" stroke-width="4.5" marker-end="url(#fb-violet)"/>
  ${p>0?`<path d="M362 166H${362+horiz}" stroke="#c08039" stroke-width="4.5" marker-end="url(#fb-amber)"/>`:""}
  <text x="376" y="${Math.max(30,166-vert-8)}" font-size="14" fill="#14727a">N</text>
  <text x="376" y="${Math.min(302,166+vert+16)}" font-size="14" fill="#6578a5">mg</text>
  ${p>0?`<text x="${Math.min(494,362+horiz)}" y="145" text-anchor="end" font-size="13" fill="#a26b2c">Push</text>`:""}`;
  el.querySelector("#fb-mass-label").textContent=f(m)+" kg";el.querySelector("#fb-push-label").textContent=f(p)+" N";el.querySelector("#fb-normal").textContent=f(w)+" N up";el.querySelector("#fb-weight").textContent=f(w)+" N down";el.querySelector("#fb-net").textContent=f(p)+" N right";
 }
 mass.oninput=push.oninput=draw;draw();
}
function newtonTwo(el){
 el.innerHTML=`<div class="diagram-head"><strong>Same net force. Different motion.</strong><span class="pill">F = ma</span></div>
 <svg viewBox="0 0 540 288" role="img" aria-label="Cart position after two seconds from rest changes with net force and cart mass">
 <defs><marker id="nt-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#c08039"/></marker></defs>
 <rect width="540" height="288" rx="12" fill="#f8fbf9"/><g id="newton-plot"></g></svg>
 <div class="controls"><label>Net force <strong id="nt-f-label"></strong><input type="range" id="nt-f" min="-16" max="16" value="8" step="1"></label><label>Mass <strong id="nt-m-label"></strong><input type="range" id="nt-m" min="1" max="8" value="4" step=".5"></label></div>
 <div class="readout"><div class="metric"><small>Acceleration</small><strong id="nt-a"></strong></div><div class="metric"><small>Displacement after 2 s</small><strong id="nt-x"></strong></div></div>
 <p class="note">Idealized horizontal motion from rest. The selected force is the net external force.</p>`;
 const force=el.querySelector("#nt-f"),mass=el.querySelector("#nt-m");
 function draw(){
  const net=+force.value,m=+mass.value,a=net/m,dx=.5*a*4,center=270+dx*4.5;
  const arrow=net===0?"":`<path d="M${center} 153H${center+Math.sign(net)*(28+Math.abs(net)*2)}" stroke="#c08039" stroke-width="4.5" marker-end="url(#nt-arrow)"/>`;
  el.querySelector("#newton-plot").innerHTML=`<path d="M35 215H505" stroke="#94b5a9" stroke-width="3"/><path d="M270 67V233" stroke="#b8cfc6" stroke-dasharray="5 6" stroke-width="2"/>
  <text x="270" y="255" text-anchor="middle" font-size="13" fill="#67827a">start</text>
  <rect x="${center-35}" y="180" width="70" height="31" rx="5" fill="#d4e9e4" stroke="#14727a" stroke-width="2"/>
  <circle cx="${center-20}" cy="217" r="7" fill="#315960"/><circle cx="${center+20}" cy="217" r="7" fill="#315960"/>
  ${arrow}<text x="${center}" y="120" text-anchor="middle" font-size="13" fill="#a56e2b">${net>0?"Net right":net<0?"Net left":"Balanced"}</text>`;
  el.querySelector("#nt-f-label").textContent=(net>0?"+":"")+f(net)+" N";
  el.querySelector("#nt-m-label").textContent=f(m)+" kg";
  el.querySelector("#nt-a").textContent=(a>0?"+":"")+f(a)+" m/s²";
  el.querySelector("#nt-x").textContent=(dx>0?"+":"")+f(dx)+" m";
 }
 force.oninput=mass.oninput=draw;draw();
}
function limitHole(el){
 el.innerHTML=`<div class="diagram-head"><strong>Approach x = 1</strong><span class="pill calculus">Removable discontinuity</span></div>
 <svg viewBox="0 0 540 307" role="img" aria-label="Graph of y equals x plus one with a missing point at x equals one, y equals two">
 <rect width="540" height="307" fill="#f8fbf9" rx="12"/><g id="limit-plot"></g></svg>
 <div class="controls"><label>Approach from either side: <strong id="lh-x-label"></strong><input type="range" id="lh-x" min="0" max="2" step=".05" value=".55"></label></div>
 <div class="readout"><div class="metric"><small>Function output f(x)</small><strong id="lh-y"></strong></div><div class="metric"><small>Limit as x → 1</small><strong>2</strong></div></div>
 <p class="note">The quotient (x² − 1)/(x − 1) is undefined at x = 1, even though its limit is 2.</p>`;
 const input=el.querySelector("#lh-x");const graph=el.querySelector("#limit-plot");
 const xp=x=>86+176*x,yp=y=>261-84*(y-.5);
 function draw(){
  const x=+input.value,undef=Math.abs(x-1)<1e-9,y=x+1;
  graph.innerHTML=`<path d="M65 261H500M86 284V24" stroke="#98b5ad" stroke-width="1.5" fill="none"/>
  <path d="M${xp(0)} ${yp(1)}L${xp(2)} ${yp(3)}" stroke="#14727a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M${xp(1)} 30V261" stroke="#c1d3c8" stroke-dasharray="5 5"/><path d="M86 ${yp(2)}H480" stroke="#d2e0d8" stroke-dasharray="5 6"/>
  <circle cx="${xp(1)}" cy="${yp(2)}" r="8.4" fill="#f8fbf9" stroke="#14727a" stroke-width="4"/>
  ${undef?"":`<circle cx="${xp(x)}" cy="${yp(y)}" r="7" fill="#c08039" stroke="white" stroke-width="2"/>`}
  <text x="${xp(1)}" y="283" font-size="14" fill="#536e66" text-anchor="middle">1</text>
  <text x="70" y="${yp(2)+5}" font-size="14" fill="#536e66" text-anchor="end">2</text>
  <text x="472" y="284" font-size="14" fill="#536e66">x</text><text x="70" y="31" font-size="14" fill="#536e66">f(x)</text>`;
  el.querySelector("#lh-x-label").textContent=f(x);
  el.querySelector("#lh-y").textContent=undef?"undefined":f(y);
 }
 input.oninput=draw;draw();
}
function hydrogenSpectrum(el){
 el.innerHTML=`<div class="diagram-head"><strong>Hydrogen emission</strong><span class="pill">Energy levels</span></div>
 <svg viewBox="0 0 540 320" role="img" aria-label="Hydrogen energy levels and an emitted photon"><defs><marker id="hyd-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#c08039"/></marker><linearGradient id="vis-spectrum"><stop offset="0" stop-color="#7539c4"/><stop offset=".2" stop-color="#275cd0"/><stop offset=".39" stop-color="#2dbea9"/><stop offset=".55" stop-color="#4aba56"/><stop offset=".72" stop-color="#ebd442"/><stop offset=".87" stop-color="#ea8529"/><stop offset="1" stop-color="#d83d47"/></linearGradient></defs><rect width="540" height="320" rx="12" fill="#f8fbf9"/><g id="atom-plot"></g></svg>
 <div class="controls"><label>Start level <select id="n-high"><option value="2">n = 2</option><option value="3" selected>n = 3</option><option value="4">n = 4</option><option value="5">n = 5</option><option value="6">n = 6</option></select></label>
 <label>End level <select id="n-low"><option value="1">n = 1</option><option value="2" selected>n = 2</option><option value="3">n = 3</option><option value="4">n = 4</option><option value="5">n = 5</option></select></label></div>
 <div class="readout"><div class="metric"><small>Photon energy</small><strong id="atom-energy"></strong></div><div class="metric"><small>Wavelength</small><strong id="atom-wavelength"></strong></div><div class="metric"><small>Region</small><strong id="atom-band"></strong></div></div>
 <p class="note">Simplified hydrogen energy levels; no fine structure. Diagram not to scale.</p>`;
 const high=el.querySelector("#n-high"),low=el.querySelector("#n-low"),plot=el.querySelector("#atom-plot");
 function paint(){const hi=+high.value;
  if(+low.value>=hi)low.value=String(hi-1);
  const lo=+low.value,energy=13.6*(1/(lo*lo)-1/(hi*hi)),wave=1240/energy;
  const region=wave<380?"Ultraviolet":wave>750?"Infrared":"Visible";
  const y=n=>248-29*n,upper=y(hi),lower=y(lo);
  const marker=wave>=380&&wave<=750?`<path d="M${98+(wave-380)/370*340} 287V312" stroke="#213a39" stroke-width="3"/>`:"";
  plot.innerHTML=`<text x="25" y="28" font-size="14" fill="#456d64">Allowed hydrogen states</text>
  <path d="M80 ${upper}H320M80 ${lower}H320" stroke="#14727a" stroke-width="4"/>
  <text x="29" y="${upper+5}" font-size="15" fill="#14727a">n = ${hi}</text>
  <text x="29" y="${lower+5}" font-size="15" fill="#14727a">n = ${lo}</text>
  <path d="M228 ${upper+8}V${lower-8}" stroke="#c08039" stroke-width="4.5" marker-end="url(#hyd-arrow)"/>
  <text x="252" y="${(upper+lower)/2}" font-size="14" fill="#a5682e">Photon</text>
  <text x="26" y="283" font-size="12" fill="#56746b">Visible spectrum</text>
  <rect x="98" y="294" width="340" height="12" fill="url(#vis-spectrum)" rx="5"/>${marker}
  <text x="98" y="289" font-size="10" fill="#56746b">380 nm</text>
  <text x="399" y="289" font-size="10" fill="#56746b">750 nm</text>`;
  el.querySelector("#atom-energy").textContent=f(energy)+" eV";
  el.querySelector("#atom-wavelength").textContent=f(wave)+" nm";
  el.querySelector("#atom-band").textContent=region;
 }high.onchange=low.onchange=paint;paint();
}
function oneSidedLimit(el){
 el.innerHTML=`<div class="diagram-head"><strong>Two approaches to x = 1</strong><span class="pill calculus">One-sided limits</span></div>
 <svg viewBox="0 0 540 290" role="img" aria-label="Piecewise function approaching 3 from left and 5 from right"><rect width="540" height="290" rx="12" fill="#f8fbf9"/><g id="side-plot"></g></svg>
 <div class="controls"><label>Approach from <select id="side-direction"><option value="left">the left</option><option value="right">the right</option></select></label>
 <label>Distance from x = 1 <strong id="side-distance"></strong><input type="range" id="side-delta" min=".05" max=".95" step=".05" value=".6"/></label></div>
 <div class="readout"><div class="metric"><small>Nearby value</small><strong id="side-output"></strong></div><div class="metric"><small>Left-hand limit</small><strong>3</strong></div><div class="metric"><small>Right-hand limit</small><strong>5</strong></div></div>
 <p class="note">f(x) = x + 2 for x &lt; 1, and x + 4 for x ≥ 1.</p>`;
 const D=el.querySelector("#side-direction"),H=el.querySelector("#side-delta"),G=el.querySelector("#side-plot");
 const xp=x=>82+x*190,yp=y=>252-(y-1.5)*42;
 function paint(){const h=+H.value,left=D.value==="left",x=left?1-h:1+h,y=left?x+2:x+4;
 G.innerHTML=`<path d="M73 252H508M82 25V265" stroke="#a9c4b8" stroke-width="1.5" fill="none"/>
 <path d="M${xp(0)} ${yp(2)}L${xp(1)} ${yp(3)}" stroke="#14727a" stroke-width="4"/>
 <path d="M${xp(1)} ${yp(5)}L${xp(2)} ${yp(6)}" stroke="#c08039" stroke-width="4"/>
 <path d="M${xp(1)} 24V252" stroke="#bad1c7" stroke-dasharray="5 5"/>
 <circle cx="${xp(1)}" cy="${yp(3)}" r="8" stroke="#14727a" fill="#f8fbf9" stroke-width="3"/>
 <circle cx="${xp(1)}" cy="${yp(5)}" r="7" fill="#c08039" stroke="#f8fbf9" stroke-width="2"/>
 <circle cx="${xp(x)}" cy="${yp(y)}" r="8" fill="${left?"#14727a":"#c08039"}" stroke="#fff" stroke-width="2"/>
 <text x="${xp(1)}" y="274" text-anchor="middle" fill="#56746b" font-size="13">1</text>
 <text x="63" y="${yp(3)+5}" text-anchor="end" fill="#14727a" font-size="13">3</text>
 <text x="63" y="${yp(5)+5}" text-anchor="end" fill="#aa6d2f" font-size="13">5</text>`;
 el.querySelector("#side-distance").textContent=f(h);
 el.querySelector("#side-output").textContent="f("+f(x)+") = "+f(y);
 }D.onchange=H.oninput=paint;paint();
}
function slopeHeight(el){
 el.innerHTML=`<div class="diagram-head"><strong>Position versus time</strong><span class="pill">x(t) = 2 + 3t</span></div>
 <svg viewBox="0 0 540 280" role="img" aria-label="Line with selected point: its height changes while slope stays fixed"><rect width="540" height="280" rx="12" fill="#f8fbf9"/><g id="sh-plot"></g></svg>
 <div class="controls"><label>Time <strong id="sh-time"></strong><input id="sh-slider" type="range" min="0" max="4" step=".25" value="2"/></label></div>
 <div class="readout"><div class="metric"><small>Position (height)</small><strong id="sh-position"></strong></div><div class="metric"><small>Velocity (slope)</small><strong>3 m/s</strong></div></div>`;
 const inp=el.querySelector("#sh-slider"),G=el.querySelector("#sh-plot"),xp=t=>75+102*t,yp=x=>255-13*x;
 function paint(){const t=+inp.value,x=2+3*t;
 G.innerHTML=`<path d="M75 40V255H510" stroke="#aecac0" stroke-width="1.5" fill="none"/><path d="M${xp(0)} ${yp(2)}L${xp(4)} ${yp(14)}" stroke="#14727a" stroke-width="4"/>
 <path d="M${xp(t)} ${yp(x)}V255M75 ${yp(x)}H${xp(t)}" stroke="#cbd9d1" stroke-width="1.4" stroke-dasharray="5 5"/>
 <circle cx="${xp(t)}" cy="${yp(x)}" r="8" fill="#c08039" stroke="#fff" stroke-width="2"/>
 <text x="18" y="24" font-size="13" fill="#4d716b">position (m)</text><text x="448" y="275" font-size="13" fill="#4d716b">time (s)</text>`;
 el.querySelector("#sh-time").textContent=f(t)+" s";el.querySelector("#sh-position").textContent=f(x)+" m";
 }inp.oninput=paint;paint();
}
function signSpeed(el){
 el.innerHTML=`<div class="diagram-head"><strong>Which way does acceleration point?</strong><span class="pill">Signed motion</span></div>
 <svg viewBox="0 0 540 230" role="img" aria-label="Cart with velocity and acceleration arrows, positive or negative"><defs><marker id="sign-v" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#14727a"/></marker><marker id="sign-a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#c08039"/></marker></defs><rect width="540" height="230" rx="12" fill="#f8fbf9"/><g id="sign-plot"></g></svg>
 <div class="controls"><label>Velocity direction <select id="sign-v-dir"><option value="1">Right (+)</option><option value="-1">Left (−)</option></select></label><label>Acceleration direction <select id="sign-a-dir"><option value="1">Right (+)</option><option value="-1">Left (−)</option></select></label></div>
 <div class="readout"><div class="metric"><small>Initial velocity</small><strong id="sign-velocity"></strong></div><div class="metric"><small>Speed after 1 s</small><strong id="sign-after"></strong></div><div class="metric"><small>Speed is</small><strong id="sign-result"></strong></div></div><p class="note">Initial speed 4 m/s; acceleration magnitude 1 m/s².</p>`;
 const V=el.querySelector("#sign-v-dir"),A=el.querySelector("#sign-a-dir"),G=el.querySelector("#sign-plot");
 function paint(){const v=4*(+V.value),a=+A.value,speed=Math.abs(v+a);
 G.innerHTML=`<path d="M35 190H507" stroke="#a1c6b6" stroke-width="3"/><rect x="238" y="147" width="64" height="40" rx="7" fill="#d6eae4" stroke="#14727a" stroke-width="2"/><circle cx="251" cy="190" r="7" fill="#385a62"/><circle cx="289" cy="190" r="7" fill="#385a62"/>
 <path d="M270 90H${270+Math.sign(v)*100}" stroke="#14727a" stroke-width="4" marker-end="url(#sign-v)"/>
 <path d="M270 127H${270+Math.sign(a)*75}" stroke="#c08039" stroke-width="4" marker-end="url(#sign-a)"/>
 <text x="25" y="89" font-size="14" fill="#14727a">Velocity</text><text x="25" y="126" font-size="14" fill="#a36b31">Acceleration</text>`;
 el.querySelector("#sign-velocity").textContent=(v>0?"+":"")+f(v)+" m/s";
 el.querySelector("#sign-after").textContent=f(speed)+" m/s";
 el.querySelector("#sign-result").textContent=v*a>0?"Increasing":"Decreasing";
 }V.onchange=A.onchange=paint;paint();
}
function limitValue(el){
 el.innerHTML=`<div class="diagram-head"><strong>Approach 2, but choose f(1)</strong><span class="pill calculus">Limit ≠ value</span></div>
 <svg viewBox="0 0 540 280" role="img" aria-label="Line with a missing point at x=1,y=2 and an independently adjustable defined point"><rect width="540" height="280" rx="12" fill="#f8fbf9"/><g id="lv-plot"></g></svg>
 <div class="controls"><label>Set f(1) <strong id="lv-setting"></strong><input id="lv-slider" type="range" min="-1" max="5" step=".5" value="5"/></label></div>
 <div class="readout"><div class="metric"><small>Limit as x → 1</small><strong>2</strong></div><div class="metric"><small>Actual value f(1)</small><strong id="lv-current"></strong></div></div>`;
 const I=el.querySelector("#lv-slider"),G=el.querySelector("#lv-plot"),xp=x=>90+185*x,yp=y=>230-(y+1)*33;
 function paint(){const v=+I.value;
 G.innerHTML=`<path d="M76 20V245H493" stroke="#aac3b7" fill="none" stroke-width="1.5"/>
 <path d="M${xp(0)} ${yp(1)}L${xp(2)} ${yp(3)}" stroke="#14727a" stroke-width="4"/>
 <circle cx="${xp(1)}" cy="${yp(2)}" r="9" stroke="#14727a" stroke-width="3.7" fill="#f8fbf9"/>
 <circle cx="${xp(1)}" cy="${yp(v)}" r="7" fill="#c08039" stroke="white" stroke-width="2"/>
 <text x="${xp(1)}" y="257" font-size="13" fill="#537369" text-anchor="middle">1</text>
 <text x="70" y="${yp(2)+5}" font-size="13" fill="#537369" text-anchor="end">2</text>`;
 el.querySelector("#lv-setting").textContent=f(v);el.querySelector("#lv-current").textContent=f(v);
 }I.oninput=paint;paint();
}
function unitConversion(el){
 el.innerHTML=`<div class="diagram-head"><strong>The length stays the same</strong><span class="pill">SI measurement</span></div>
 <svg viewBox="0 0 540 225" role="img" aria-label="Two equal-length bars, one labeled in meters and the other in centimeters"><rect width="540" height="225" rx="12" fill="#f8fbf9"/><g id="unit-plot"></g></svg>
 <div class="controls"><label>Length <strong id="unit-input-value"></strong><input id="unit-slider" type="range" min=".5" max="5" value="2.5" step=".1" aria-label="Length in meters"/></label></div>
 <div class="readout"><div class="metric"><small>Measured in meters</small><strong id="unit-meters"></strong></div><div class="metric"><small>Same length in centimeters</small><strong id="unit-centimeters"></strong></div></div>
 <p class="note">The displayed ruler length changes as you move the slider. For any given slider position, both colored bars depict the same distance.</p>`;
 const slider=el.querySelector("#unit-slider"),plot=el.querySelector("#unit-plot");
 function draw(){const meters=+slider.value,width=meters*77;
 plot.innerHTML=`<path d="M55 183H480" stroke="#97b9aa" stroke-width="2"/><rect x="55" y="57" width="${width}" height="33" rx="5" fill="#14727a"/><rect x="55" y="129" width="${width}" height="33" rx="5" fill="#c08039"/>
 <text x="55" y="44" font-size="14" fill="#14727a">meters</text><text x="55" y="116" font-size="14" fill="#a4662e">centimeters</text>
 <text x="${Math.min(480,65+width)}" y="78" font-size="14" fill="#2b5c5f">${f(meters)} m</text>
 <text x="${Math.min(480,65+width)}" y="151" font-size="14" fill="#8f5523">${f(meters*100)} cm</text>`;
 el.querySelector("#unit-input-value").textContent=f(meters)+" m";el.querySelector("#unit-meters").textContent=f(meters)+" m";el.querySelector("#unit-centimeters").textContent=f(meters*100)+" cm";
 }
 slider.oninput=draw;draw();
}
function measurementRuler(el){
 el.innerHTML=`<div class="diagram-head"><strong>Read an analog ruler</strong><span class="pill">Measurement resolution</span></div><svg viewBox="0 0 540 260" role="img" aria-label="Millimeter ruler and movable object edge with measurement uncertainty"><rect width="540" height="260" rx="12" fill="#f8fbf9"/><g id="ruler-plot"></g></svg><div class="controls"><label>Object edge <strong id="measure-pos"></strong><input id="ruler-pos" type="range" min="2" max="78" step=".1" value="26.4"/></label><label>Smallest division <select id="ruler-resolution"><option value="1">1 mm</option><option value=".5">0.5 mm</option></select></label></div><div class="readout"><div class="metric"><small>Ruler reading</small><strong id="measure-reading"></strong></div><div class="metric"><small>Reading uncertainty</small><strong id="measure-uncertainty"></strong></div></div><p class="note">Illustrative ±half-division uncertainty. Calibration, alignment and reading method also matter.</p>`;
 const value=el.querySelector("#ruler-pos"),res=el.querySelector("#ruler-resolution"),graph=el.querySelector("#ruler-plot"),px=n=>68+5*n;
 function draw(){
  const pos=+value.value,r=+res.value,reading=Math.round(pos/r)*r,uncertainty=r/2,decimals=r===1?1:2;
  const ticks=Array.from({length:Math.round(80/r)+1},(_,i)=>{const m=i*r,x=px(m),major=m%10===0,mid=m%5===0;return `<path d="M${x} 114V${major?151:mid?137:122}" stroke="#7a9c91" stroke-width="${major?1.8:.7}"/>${major?`<text x="${x}" y="169" font-size="11" text-anchor="middle" fill="#526b64">${m}</text>`:""}`}).join("");
  graph.innerHTML=`<rect x="52" y="110" width="430" height="65" rx="7" fill="#e5f0eb" stroke="#8aaea0"/>${ticks}<path d="M${px(pos)} 54V195" stroke="#c08039" stroke-width="3.5"/><path d="M${px(reading-uncertainty)} 203H${px(reading+uncertainty)}" stroke="#14727a" stroke-width="6" stroke-linecap="round"/><text x="68" y="31" font-size="14" fill="#45645e">Length on ruler (mm)</text><text x="68" y="244" font-size="12" fill="#496c65">Teal segment: reading ± uncertainty</text>`;
  el.querySelector("#measure-pos").textContent=f(pos)+" mm";
  el.querySelector("#measure-reading").textContent=reading.toFixed(decimals)+" mm";
  el.querySelector("#measure-uncertainty").textContent="±"+uncertainty.toFixed(decimals)+" mm";
 }value.oninput=res.onchange=draw;draw();
}
function significantDigits(el){
 el.innerHTML=`<div class="diagram-head"><strong>Keep only justified digits</strong><span class="pill">Multiplication rule</span></div><svg viewBox="0 0 540 226" role="img" aria-label="Measured factors and correctly rounded numerical product"><rect width="540" height="226" rx="12" fill="#f8fbf9"/><g id="sig-plot"></g></svg><div class="controls"><label>First measured factor <select id="sig-a"><option value="2.40">2.40 (3 digits)</option><option value="4.20">4.20 (3 digits)</option><option value="12.36">12.36 (4 digits)</option></select></label><label>Second measured factor <select id="sig-b"><option value="3.1">3.1 (2 digits)</option><option value="2.0">2.0 (2 digits)</option><option value="4.25">4.25 (3 digits)</option></select></label></div><div class="readout"><div class="metric"><small>Unrounded product</small><strong id="sig-raw"></strong></div><div class="metric"><small>Reported product</small><strong id="sig-rounded"></strong></div><div class="metric"><small>Significant digits</small><strong id="sig-count"></strong></div></div><p class="note">Multiplication/division: use the fewest significant digits. Addition/subtraction: round to the least precise decimal place.</p>`;
 const A=el.querySelector("#sig-a"),B=el.querySelector("#sig-b"),G=el.querySelector("#sig-plot");
 const digits=v=>v.replace(".","").replace(/^0+/,"").length;
 function draw(){
  const a=A.value,b=B.value,p=Number(a)*Number(b),n=Math.min(digits(a),digits(b));
  G.innerHTML=`<rect x="27" y="44" width="145" height="88" rx="11" fill="#e0f1ed" stroke="#93c9bb"/><rect x="194" y="44" width="145" height="88" rx="11" fill="#fff0dc" stroke="#e1ba85"/><rect x="362" y="44" width="149" height="88" rx="11" fill="#e6eff9" stroke="#b7cbdc"/><text x="100" y="71" text-anchor="middle" font-size="12" fill="#4e7168">Factor A</text><text x="100" y="105" text-anchor="middle" font-size="25" fill="#14727a">${a}</text><text x="267" y="71" text-anchor="middle" font-size="12" fill="#a17035">Factor B</text><text x="267" y="105" text-anchor="middle" font-size="25" fill="#b87831">${b}</text><text x="436" y="71" text-anchor="middle" font-size="12" fill="#506f8c">Report</text><text x="436" y="105" text-anchor="middle" font-size="25" fill="#315c82">${p.toPrecision(n)}</text><text x="182" y="94" font-size="20" fill="#647e74">×</text><text x="346" y="94" font-size="20" fill="#647e74">→</text><text x="270" y="167" text-anchor="middle" font-size="15" fill="#3d6d65">The less precise factor limits the product.</text><text x="270" y="193" text-anchor="middle" font-size="13" fill="#66817a">Calculate first, then round once.</text>`;
  el.querySelector("#sig-raw").textContent=String(Number(p.toFixed(8)));
  el.querySelector("#sig-rounded").textContent=p.toPrecision(n);
  el.querySelector("#sig-count").textContent=String(n);
 }A.onchange=B.onchange=draw;draw();
}
function unitCancellation(el){
 el.innerHTML=`<div class="diagram-head"><strong>Let the units cancel</strong><span class="pill">Dimensional analysis</span></div><svg viewBox="0 0 540 224" role="img" aria-label="A calculation with units and its resulting physical unit"><rect width="540" height="224" rx="12" fill="#f8fbf9"/><g id="cancel-plot"></g></svg><div class="controls"><label>Choose a relationship <select id="unit-scenario"><option value="distance">Distance = speed × time</option><option value="speed">Speed = distance ÷ time</option><option value="convert">Convert kilometers per hour</option></select></label></div><div class="readout"><div class="metric"><small>Numerical result</small><strong id="unit-cancel-answer"></strong></div><div class="metric"><small>Remaining units</small><strong id="unit-cancel-units"></strong></div></div><p class="note">Consistent units are necessary for an equation, but do not alone prove a physical model correct.</p>`;
 const D=el.querySelector("#unit-scenario"),G=el.querySelector("#cancel-plot");
 const models={distance:["3 m/s × 4 s","(m/s) × s","12 m","m","Seconds cancel"],speed:["18 m ÷ 3 s","m ÷ s","6 m/s","m/s","Time remains below"],convert:["36 km/h → m/s","36 × 1000 / 3600","10 m/s","m/s","Convert kilometers and hours"]};
 function draw(){const [a,b,ans,units,note]=models[D.value];G.innerHTML=`<rect x="30" y="37" width="480" height="139" rx="13" fill="#fff" stroke="#d3e6df"/><text x="270" y="78" font-size="22" fill="#385f5b" text-anchor="middle">${a}</text><text x="270" y="116" font-size="18" fill="#14727a" text-anchor="middle">${b}</text><text x="270" y="151" font-size="22" font-weight="bold" fill="#b27630" text-anchor="middle">= ${ans}</text><text x="270" y="204" font-size="13" fill="#61746f" text-anchor="middle">${note}</text>`;el.querySelector("#unit-cancel-answer").textContent=ans;el.querySelector("#unit-cancel-units").textContent=units;}D.onchange=draw;draw();
}
function slopeToolkit(el){
 el.innerHTML=`<div class="diagram-head"><strong>Position vs. time</strong><span class="pill">Secant slope</span></div><svg viewBox="0 0 540 324" role="img" aria-label="Curved position-time graph with adjustable secant endpoints"><rect width="540" height="324" rx="12" fill="#f8fbf9"/><g id="slope-plot"></g></svg><div class="controls"><label>First time <strong id="slope-t1-label"></strong><input id="slope-t1" type="range" min="0" max="1.5" step=".5" value="0"/></label><label>Second time <strong id="slope-t2-label"></strong><input id="slope-t2" type="range" min="2" max="4" step=".5" value="2"/></label></div><div class="readout"><div class="metric"><small>Change in position</small><strong id="slope-rise"></strong></div><div class="metric"><small>Elapsed time</small><strong id="slope-run"></strong></div><div class="metric"><small>Secant slope</small><strong id="slope-value"></strong></div></div><p class="note">The example model is x(t) = 1 + t² meters, time in seconds. Secant slope is average velocity.</p>`;
 const A=el.querySelector("#slope-t1"),B=el.querySelector("#slope-t2"),G=el.querySelector("#slope-plot"),X=t=>78+t*105,Y=x=>280-13*x;
 function draw(){const t1=+A.value,t2=+B.value,x1=1+t1*t1,x2=1+t2*t2;
  const curve=Array.from({length:41},(_,i)=>{const t=i/10;return `${i?"L":"M"}${X(t)} ${Y(1+t*t)}`}).join(" ");
  G.innerHTML=`<path d="M77 30V280H510" stroke="#93b5a8" stroke-width="1.5" fill="none"/><path d="${curve}" fill="none" stroke="#14727a" stroke-width="4"/><path d="M${X(t1)} ${Y(x1)}L${X(t2)} ${Y(x2)}" stroke="#c08039" stroke-width="4"/><circle cx="${X(t1)}" cy="${Y(x1)}" r="7" fill="#c08039" stroke="#fff" stroke-width="2"/><circle cx="${X(t2)}" cy="${Y(x2)}" r="7" fill="#c08039" stroke="#fff" stroke-width="2"/><path d="M${X(t1)} ${Y(x1)}V280M${X(t2)} ${Y(x2)}V280" stroke="#b7d3c7" stroke-dasharray="4 4"/><text x="25" y="29" font-size="13" fill="#4c7368">x (m)</text><text x="465" y="307" font-size="13" fill="#4c7368">t (s)</text><text x="${X(t1)}" y="298" font-size="12" text-anchor="middle" fill="#76664f">${f(t1)}</text><text x="${X(t2)}" y="298" font-size="12" text-anchor="middle" fill="#76664f">${f(t2)}</text>`;
  el.querySelector("#slope-t1-label").textContent=f(t1)+" s";el.querySelector("#slope-t2-label").textContent=f(t2)+" s";
  el.querySelector("#slope-rise").textContent=f(x2-x1)+" m";el.querySelector("#slope-run").textContent=f(t2-t1)+" s";el.querySelector("#slope-value").textContent=f((x2-x1)/(t2-t1))+" m/s";
 }A.oninput=B.oninput=draw;draw();
}
function motion(el){
 el.innerHTML=`<div class="diagram-head"><strong>Equal time intervals</strong><span class="pill">Motion diagram</span></div><svg viewBox="0 0 520 260" role="img" aria-label="Seven dots indicating a cart's positions at equally spaced times"><rect width="520" height="260" rx="12" fill="#f8fbf9"/><path d="M26 194H492" stroke="#a7bdb6" stroke-width="2"/><g id="dots"></g><g id="cart"><rect x="-16" y="-12" width="32" height="20" rx="4" fill="#b6773e"/><circle cx="-9" cy="10" r="4" fill="#264e5a"/><circle cx="9" cy="10" r="4" fill="#264e5a"/></g><text x="25" y="230" fill="#56756f" font-size="13">Earlier</text><text x="429" y="230" fill="#56756f" font-size="13">Later →</text></svg><div class="controls"><label>How does the cart move?<select id="pattern"><option value="constant">Constant speed</option><option value="up">Speeding up</option><option value="down">Slowing down</option></select></label><button id="replay">Replay motion ↻</button></div><p class="note" id="motiondesc"></p>`;
 const select=el.querySelector("#pattern"),dots=el.querySelector("#dots"),cart=el.querySelector("#cart");let frameId;
 const positions=()=>Array.from({length:7},(_,i)=>{let t=i/6,s=select.value==="constant"?t:select.value==="up"?t*t:1-(1-t)*(1-t);return 50+420*s;});
 function paint(){cancelAnimationFrame(frameId);const xs=positions();dots.innerHTML=xs.map((x,i)=>`<circle cx="${x}" cy="194" r="5.5" fill="${i===6?'#c08039':'#14727a'}" opacity="${.52+.075*i}"/>`).join("");cart.setAttribute("transform",`translate(${xs[0]} 178)`);el.querySelector("#motiondesc").textContent=select.value==="constant"?"The dots are equally spaced: equal distances in equal times.":select.value==="up"?"The distance between successive dots grows: the cart is speeding up.":"The distance between successive dots shrinks: the cart is slowing down.";}
 select.onchange=paint;el.querySelector("#replay").onclick=()=>{cancelAnimationFrame(frameId);const xs=positions();let start;function animate(t){if(start===undefined)start=t;const u=Math.min((t-start)/1800,1)*6,i=Math.min(5,Math.floor(u)),q=u-i;cart.setAttribute("transform",`translate(${xs[i]*(1-q)+xs[i+1]*q} 178)`);if(u<6)frameId=requestAnimationFrame(animate);}frameId=requestAnimationFrame(animate);};paint();
}
function acceleration(el){
 el.innerHTML=`<div class="diagram-head"><strong>Velocity versus time</strong><span class="pill">Graph</span></div><svg viewBox="0 0 520 286" role="img" aria-label="Adjustable linear velocity-time graph"><rect width="520" height="286" rx="12" fill="#f8fbf9"/><path d="M55 22V253H492" stroke="#8baaa0" stroke-width="1.5" fill="none"/><path d="M55 145H492" stroke="#bdd0c5" stroke-dasharray="4 6"/><g id="accgraph"></g><text x="8" y="23" font-size="14" fill="#50756e">v (m/s)</text><text x="444" y="276" font-size="14" fill="#50756e">time (s)</text></svg><div class="controls"><label>Acceleration: <strong id="aval"></strong><input type="range" id="aslider" min="-2" max="2" step=".25" value="1"></label></div><div class="readout"><div class="metric"><small>Initial velocity</small><strong>2 m/s</strong></div><div class="metric"><small>Velocity at 4 s</small><strong id="vresult"></strong></div></div><p class="note">The slope of the graph is acceleration. Negative acceleration can occur while velocity remains positive.</p>`;
 const s=el.querySelector("#aslider");function paint(){let a=+s.value;const x=t=>55+105*t,y=v=>145-12*v;el.querySelector("#accgraph").innerHTML=`<path d="M${x(0)} ${y(2)}L${x(4)} ${y(2+4*a)}" stroke="#14727a" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="${x(4)}" cy="${y(2+4*a)}" r="6" fill="#c08039"/>`;el.querySelector("#aval").textContent=(a>0?"+":"")+f(a)+" m/s²";el.querySelector("#vresult").textContent=f(2+4*a)+" m/s";}s.oninput=paint;paint();
}
function linkedGraphs(el){
 el.innerHTML=`<div class="diagram-head"><strong>One motion, three graphs</strong><span class="pill">Linked diagrams</span></div><svg viewBox="0 0 520 500" role="img" aria-label="Linked position, velocity and acceleration graphs. Time and acceleration are adjustable."><rect width="520" height="500" rx="12" fill="#f8fbf9"/><g id="linked-graphs"></g></svg><div class="controls"><label>Acceleration <strong id="linked-a"></strong><input type="range" id="linked-aslider" min="-1" max="1" step=".25" value=".5"></label><label>Time <strong id="linked-t"></strong><input type="range" id="linked-time" min="0" max="4" step=".1" value="2"></label></div><div class="readout"><div class="metric"><small>Position</small><strong id="linked-x"></strong></div><div class="metric"><small>Velocity</small><strong id="linked-v"></strong></div><div class="metric"><small>Acceleration</small><strong id="linked-acc"></strong></div></div><p class="note">All graphs describe the same object with initial position 0 m and initial velocity 2 m/s. The slope of position is velocity; the slope of velocity is acceleration.</p>`;
 const A=el.querySelector("#linked-aslider"),T=el.querySelector("#linked-time");const X=t=>86+96*t;
 function paint(){
   const a=+A.value,t=+T.value,x=q=>2*q+.5*a*q*q,v=q=>2+a*q;
   const graphs=[{name:"position x (m)",fn:x,y:y=>149-5.8*y,top:27,bottom:158,color:"#14727a"},{name:"velocity v (m/s)",fn:v,y:y=>298-10*y,top:183,bottom:320,color:"#ad753e"},{name:"acceleration a (m/s²)",fn:q=>a,y:y=>429-28*y,top:352,bottom:473,color:"#6578a5"}];
   const layers=graphs.map((g,i)=>{
     const coords=Array.from({length:81},(_,j)=>{let q=j/20;return (j?"L":"M")+X(q).toFixed(2)+","+g.y(g.fn(q)).toFixed(2)}).join(" ");
     return `<text x="17" y="${g.top+8}" fill="#3b5b55" font-size="14" font-weight="600">${g.name}</text><path d="M86 ${g.top+17}V${g.bottom}H480" stroke="#b4c9be" fill="none" stroke-width="1.2"/><path d="${coords}" stroke="${g.color}" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M${X(t)} ${g.top+17}V${g.bottom}" stroke="#738b83" stroke-dasharray="4 4"/><circle cx="${X(t)}" cy="${g.y(g.fn(t))}" r="5.5" fill="${g.color}" stroke="white" stroke-width="2"/>`}).join("");
   el.querySelector("#linked-graphs").innerHTML=layers+`<text x="455" y="493" fill="#4b6860" font-size="13">t (s)</text>`;
   el.querySelector("#linked-a").textContent=f(a)+" m/s²";el.querySelector("#linked-t").textContent=f(t)+" s";
   el.querySelector("#linked-x").textContent=f(x(t))+" m";el.querySelector("#linked-v").textContent=f(v(t))+" m/s";el.querySelector("#linked-acc").textContent=f(a)+" m/s²";
 }
 A.oninput=T.oninput=paint;paint();
}

function displacement(el){
 el.innerHTML=`<div class="diagram-head"><strong>One journey, two measurements</strong><span class="pill">Position &amp; displacement</span></div><svg viewBox="0 0 520 270" role="img" aria-label="A cart moves from one meter to a turning point and then a final position on a number line"><rect width="520" height="270" rx="12" fill="#f8fbf9"/><defs><marker id="arrow-dis" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#b77739"/></marker></defs><g id="dis-plot"></g></svg><div class="controls"><label>Turn at <strong id="turn-read"></strong><input id="turn" type="range" min="1" max="8" step=".5" value="7"></label><label>Finish at <strong id="finish-read"></strong><input id="finish" type="range" min="-2" max="8" step=".5" value="3"></label></div><div class="readout"><div class="metric"><small>Displacement</small><strong id="displacement"></strong></div><div class="metric"><small>Distance traveled</small><strong id="distance"></strong></div></div><p class="note">The initial position stays at 1 m. A round trip may have zero displacement but a positive distance traveled.</p>`;
 const t=el.querySelector("#turn"),e=el.querySelector("#finish"),xp=n=>80+(n+2)*36;
 function draw(){const turn=+t.value,end=+e.value,start=1,labels=Array.from({length:11},(_,i)=>{let z=i-2;return `<g><path d="M${xp(z)} 173v9" stroke="#90ada3"/><text x="${xp(z)}" y="201" font-size="12" fill="#53746a" text-anchor="middle">${z}</text></g>`}).join("");
 el.querySelector("#dis-plot").innerHTML=`<path d="M55 173H480" stroke="#87aaa0" stroke-width="2"/>${labels}<path d="M${xp(start)} 143V95H${xp(turn)}" stroke="#b77739" fill="none" stroke-width="3" marker-end="url(#arrow-dis)"/><path d="M${xp(turn)} 158V234H${xp(end)}" stroke="#14727a" fill="none" stroke-width="3"/><circle cx="${xp(start)}" cy="173" r="6" fill="#14727a"/><circle cx="${xp(turn)}" cy="173" r="6" fill="#b77739"/><circle cx="${xp(end)}" cy="173" r="6" fill="#324a6c"/><text x="${xp(start)}" y="126" text-anchor="middle" font-size="12" fill="#28635f">start</text><text x="${xp(turn)}" y="78" text-anchor="middle" font-size="12" fill="#a3672c">turn</text><text x="${xp(end)}" y="252" text-anchor="middle" font-size="12" fill="#324a6c">finish</text>`;
 el.querySelector("#turn-read").textContent=f(turn)+" m";el.querySelector("#finish-read").textContent=f(end)+" m";el.querySelector("#displacement").textContent=(end-start>0?"+":"")+f(end-start)+" m";el.querySelector("#distance").textContent=f(Math.abs(turn-start)+Math.abs(end-turn))+" m";}
 t.oninput=e.oninput=draw;draw();
}
function averageVelocity(el){
 el.innerHTML=`<div class="diagram-head"><strong>Secant slope = average velocity</strong><span class="pill">Position–time graph</span></div><svg viewBox="0 0 520 310" role="img" aria-label="A curved position graph with two selected times and a secant line"><rect width="520" height="310" rx="12" fill="#f8fbf9"/><g id="v-graph"></g></svg><div class="controls"><label>Start time <strong id="tstart-read"></strong><input type="range" id="tstart" min="0" max="2" step=".25" value=".5"></label><label>End time <strong id="tend-read"></strong><input type="range" id="tend" min="2.5" max="4" step=".25" value="3.5"></label></div><div class="readout"><div class="metric"><small>Change in position</small><strong id="deltax"></strong></div><div class="metric"><small>Average velocity</small><strong id="vavg"></strong></div></div><p class="note">The position function is x(t) = 1 + 2t + 0.25t² meters. A secant slope measures the average velocity between the selected times.</p>`;
 const A=el.querySelector("#tstart"),B=el.querySelector("#tend"),x=t=>1+2*t+.25*t*t,xp=t=>70+98*t,yp=val=>276-16*val;
 function draw(){const a=+A.value,b=+B.value;let curve=Array.from({length:81},(_,i)=>{let t=i/20;return (i?"L":"M")+xp(t).toFixed(2)+" "+yp(x(t)).toFixed(2)}).join(" ");
 el.querySelector("#v-graph").innerHTML=`<path d="M70 27V276H480" stroke="#89a79d" stroke-width="1.5" fill="none"/><path d="${curve}" stroke="#14727a" stroke-width="3.4" fill="none"/><path d="M${xp(a)} ${yp(x(a))}L${xp(b)} ${yp(x(b))}" stroke="#b77739" stroke-width="3"/><circle cx="${xp(a)}" cy="${yp(x(a))}" r="6" fill="#b77739"/><circle cx="${xp(b)}" cy="${yp(x(b))}" r="6" fill="#b77739"/><text x="15" y="23" font-size="13" fill="#50756e">x (m)</text><text x="430" y="296" font-size="13" fill="#50756e">t (s)</text>`;
 el.querySelector("#tstart-read").textContent=f(a)+" s";el.querySelector("#tend-read").textContent=f(b)+" s";el.querySelector("#deltax").textContent=f(x(b)-x(a))+" m";el.querySelector("#vavg").textContent=f((x(b)-x(a))/(b-a))+" m/s";}A.oninput=B.oninput=draw;draw();
}
function freeFall(el){
 el.innerHTML=`<div class="diagram-head"><strong>Drop an object from rest</strong><span class="pill">Ideal free fall</span></div><svg viewBox="0 0 520 295" role="img" aria-label="Ball height and height versus time for gravity on Earth or the Moon"><rect width="520" height="295" rx="12" fill="#f8fbf9"/><g id="fall-plot"></g></svg><div class="controls"><label>Gravitational acceleration<select id="gravity"><option value="9.8">Earth (9.8 m/s²)</option><option value="1.62">Moon (1.62 m/s²)</option></select></label><label>Time <strong id="fall-time"></strong><input type="range" id="fall-slider" min="0" max="5" step=".1" value="1"></label></div><div class="readout"><div class="metric"><small>Height above ground</small><strong id="fall-height"></strong></div><div class="metric"><small>Velocity (up positive)</small><strong id="fall-v"></strong></div><div class="metric"><small>Time to ground</small><strong id="fall-impact"></strong></div></div><p class="note" id="fall-note">Model assumptions: dropped from 20 m, no air resistance, constant gravity. Graphs show motion only until impact.</p>`;
 const G=el.querySelector("#gravity"),T=el.querySelector("#fall-slider");
 function draw(){const g=+G.value,impact=Math.sqrt(40/g),selected=+T.value,t=Math.min(impact,selected),h=q=>Math.max(0,20-.5*g*q*q),xp=q=>235+50*q,yp=y=>245-9.5*y;
 const maxT=Math.min(5,impact),curve=Array.from({length:101},(_,i)=>{let q=i/100*maxT;return(i?"L":"M")+xp(q).toFixed(2)+" "+yp(h(q)).toFixed(2)}).join(" ");
 const ballY=45+180*(1-h(t)/20);
 el.querySelector("#fall-plot").innerHTML=`<path d="M40 245H175M93 35V245" stroke="#94afa6" stroke-width="1.4" fill="none"/><path d="M93 38V245" stroke="#b7cbc0" stroke-dasharray="3 5"/><circle cx="93" cy="${ballY}" r="12" fill="#b77739" stroke="#fff" stroke-width="2"/><text x="40" y="23" fill="#50756e" font-size="12">20 m</text><text x="49" y="264" fill="#50756e" font-size="12">ground</text><path d="M235 35V245H503" stroke="#94afa6" stroke-width="1.4" fill="none"/><path d="${curve}" stroke="#14727a" stroke-width="3" fill="none"/><circle cx="${xp(t)}" cy="${yp(h(t))}" r="6" fill="#b77739"/><text x="238" y="25" fill="#50756e" font-size="12">height (m)</text><text x="450" y="267" fill="#50756e" font-size="12">time (s)</text>`;
 el.querySelector("#fall-time").textContent=f(selected)+" s";el.querySelector("#fall-height").textContent=f(h(t))+" m";el.querySelector("#fall-v").textContent=f(-g*t)+" m/s";el.querySelector("#fall-impact").textContent=f(impact)+" s";el.querySelector("#fall-note").textContent=selected>impact?"Impact has occurred. The model is frozen at the instant before impact; it does not model the bounce or motion afterward.":"Released from 20 m, initially at rest, ignoring air resistance. Up is the positive direction.";}G.onchange=T.oninput=draw;draw();
}
function velocityArea(el){
 el.innerHTML=`<div class="diagram-head"><strong>Displacement from velocity</strong><span class="pill calculus">Accumulated change</span></div><svg viewBox="0 0 520 305" role="img" aria-label="Shaded area under a positive velocity-time graph with adjustable time"><rect width="520" height="305" rx="12" fill="#f8fbf9"/><g id="area-plot"></g></svg><div class="controls"><label>End time <strong id="area-time"></strong><input type="range" id="area-slider" min="0" max="4" step=".1" value="2"></label></div><div class="readout"><div class="metric"><small>Final velocity</small><strong id="area-vel"></strong></div><div class="metric"><small>Displacement</small><strong id="area-dis"></strong></div></div><p class="note">Because velocity is positive throughout this example, accumulated displacement also equals distance traveled. For negative velocity, signed area matters.</p>`;
 const T=el.querySelector("#area-slider"),xp=t=>80+95*t,yp=v=>262-31*v;function draw(){const t=+T.value,v=x=>2+x;
 el.querySelector("#area-plot").innerHTML=`<path d="M80 25V262H480" fill="none" stroke="#8ea9a0" stroke-width="1.5"/><path d="M${xp(0)} 262L${xp(0)} ${yp(2)}L${xp(t)} ${yp(v(t))}L${xp(t)} 262Z" fill="#a8d4c9" opacity=".75"/><path d="M${xp(0)} ${yp(2)}L${xp(4)} ${yp(6)}" stroke="#14727a" stroke-width="3.2"/><path d="M${xp(t)} 262V${yp(v(t))}" stroke="#b77739" stroke-width="2" stroke-dasharray="5 4"/><circle cx="${xp(t)}" cy="${yp(v(t))}" r="6" fill="#b77739"/><text x="18" y="22" font-size="13" fill="#50756e">v (m/s)</text><text x="436" y="286" font-size="13" fill="#50756e">t (s)</text>`;
 el.querySelector("#area-time").textContent=f(t)+" s";el.querySelector("#area-vel").textContent=f(v(t))+" m/s";el.querySelector("#area-dis").textContent=f(2*t+t*t/2)+" m";}
 T.oninput=draw;draw();
}
function tangent(el){
 el.innerHTML=`<div class="diagram-head"><strong>Secant approaching tangent</strong><span class="pill calculus">Derivative</span></div><svg viewBox="0 0 520 330" role="img" aria-label="Interactive secant and tangent lines on a parabola"><rect width="520" height="330" rx="12" fill="#f8fbf9"/><g id="tgraph"></g></svg><div class="controls"><label>Point a = <strong id="av"></strong><input id="point" type="range" min="-1.4" max="1.4" step=".1" value=".7"></label><label>Distance h = <strong id="hv"></strong><input id="gap" type="range" min=".05" max="1" step=".05" value=".7"></label></div><div class="readout"><div class="metric"><small>Secant slope</small><strong id="sec"></strong></div><div class="metric"><small>Tangent slope</small><strong id="tan"></strong></div></div><p class="note">For f(x) = x² the secant slope is 2a + h. As h approaches zero, the slope approaches 2a.</p>`;
 const A=el.querySelector("#point"),H=el.querySelector("#gap"),xp=x=>260+88*x,yp=y=>265-37*y;function paint(){let a=+A.value,h=+H.value;const curve=Array.from({length:101},(_,i)=>{let x=-2.4+i*.048;return (i?"L":"M")+xp(x).toFixed(1)+","+yp(x*x).toFixed(1)}).join(" ");const line=(m,b,color,dash)=>`<line x1="${xp(-2.5)}" y1="${yp(m*-2.5+b)}" x2="${xp(2.5)}" y2="${yp(m*2.5+b)}" stroke="${color}" stroke-width="2.4" ${dash?'stroke-dasharray="6 5"':""}/>`;el.querySelector("#tgraph").innerHTML=`<path d="M22 265H499M260 17V301" stroke="#a8bdb6" stroke-width="1.3"/><path d="${curve}" fill="none" stroke="#14727a" stroke-width="3.2"/>${line(2*a+h,-a*a-a*h,"#c08039",false)}${line(2*a,-a*a,"#56a68d",true)}<circle cx="${xp(a)}" cy="${yp(a*a)}" r="6" fill="#14727a" stroke="white" stroke-width="2"/><circle cx="${xp(a+h)}" cy="${yp((a+h)*(a+h))}" r="6" fill="#c08039" stroke="white" stroke-width="2"/>`;el.querySelector("#av").textContent=f(a);el.querySelector("#hv").textContent=f(h);el.querySelector("#sec").textContent=f(2*a+h);el.querySelector("#tan").textContent=f(2*a);}A.oninput=H.oninput=paint;paint();
}
function riemann(el){
 el.innerHTML=`<div class="diagram-head"><strong>Right-endpoint rectangles</strong><span class="pill calculus">Integral</span></div><svg viewBox="0 0 520 309" role="img" aria-label="Rectangles approximating the area under y equals x"><rect width="520" height="309" rx="12" fill="#f8fbf9"/><g id="rgraph"></g></svg><div class="controls"><label>Number of rectangles: <strong id="nv"></strong><input id="nslider" type="range" min="2" max="30" step="1" value="4"></label></div><div class="readout"><div class="metric"><small>Right sum</small><strong id="sum"></strong></div><div class="metric"><small>Exact area</small><strong>8</strong></div></div><p class="note">For an increasing function, these right-endpoint rectangles overestimate the area. More, thinner rectangles reduce the error.</p>`;
 const slider=el.querySelector("#nslider");function paint(){let n=+slider.value,dx=4/n,xp=x=>55+102*x,yp=y=>262-51*y;const rectangles=Array.from({length:n},(_,i)=>{let right=(i+1)*dx;return `<rect x="${xp(i*dx)}" y="${yp(right)}" width="${102*dx}" height="${51*right}" fill="#a8d4c9" fill-opacity=".53" stroke="#14727a" stroke-width=".8"/>`}).join("");el.querySelector("#rgraph").innerHTML=`<path d="M55 15V262H490" fill="none" stroke="#93b2a8" stroke-width="1.6"/>${rectangles}<path d="M55 262L463 58" stroke="#c08039" stroke-width="3" fill="none"/><text x="455" y="282" font-size="14" fill="#50756e">4</text>`;el.querySelector("#nv").textContent=n;el.querySelector("#sum").textContent=f(8+8/n);}slider.oninput=paint;paint();
}

function velocityComponents(el){
 el.innerHTML=`<div class="diagram-head"><strong>Velocity as a vector</strong><span class="pill">Two components</span></div>
 <svg viewBox="0 0 560 330" role="img" aria-label="Angled velocity, horizontal and vertical arrows; exact values shown below">
 <defs><marker id="velocity-tip" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#ba8240"/></marker></defs>
 <path d="M55 271H526M81 301V25" fill="none" stroke="#8fa69d" stroke-width="1.7"/>
 <path d="M81 241H525M81 211H525M81 181H525M81 151H525M81 121H525M81 91H525" stroke="#dfe9e1" stroke-width="1" stroke-dasharray="3 7"/>
 <text x="510" y="295" fill="#455d63" font-size="15">+x</text><text x="48" y="25" fill="#455d63" font-size="15">+y</text>
 <g id="velocity-vectors"></g><circle cx="81" cy="271" r="5" fill="#253c56"/></svg>
 <div class="controls">
 <label>Speed <output id="velocity-speed-value">20 m/s</output><input id="velocity-speed" type="range" min="4" max="30" step="1" value="20"></label>
 <label>Angle above +x <output id="velocity-angle-value">30°</output><input id="velocity-angle" type="range" min="0" max="90" step="5" value="30"></label></div>
 <div class="readout"><div class="metric"><small>Horizontal vₓ</small><strong id="velocity-x"></strong></div><div class="metric"><small>Vertical vᵧ</small><strong id="velocity-y"></strong></div></div>
 <p class="note">Components describe one velocity, not two separate motions. Angles are measured from +x.</p>`;
 const speed=el.querySelector("#velocity-speed"),angle=el.querySelector("#velocity-angle");
 function paint(){
  const v=Number(speed.value),theta=Number(angle.value)*Math.PI/180;
  const vx=v*Math.cos(theta),vy=v*Math.sin(theta),x=81+vx*8,y=271-vy*8;
  el.querySelector("#velocity-vectors").innerHTML=`
   <path d="M81 271H${x}V${y}" fill="none" stroke="#9aafa6" stroke-width="1.3" stroke-dasharray="5 5"/>
   <path d="M81 271L${x} 271" stroke="#14727a" stroke-width="5" stroke-linecap="round"/>
   <path d="M${x} 271V${y}" stroke="#32986f" stroke-width="5" stroke-linecap="round"/>
   <path d="M81 271L${x} ${y}" stroke="#ba8240" stroke-width="5" stroke-linecap="round" marker-end="url(#velocity-tip)"/>
   <circle cx="${x}" cy="${y}" r="5" fill="#ba8240" stroke="#fff" stroke-width="2"/>
   <text x="${(81+x)/2}" y="291" fill="#136670" font-size="17" text-anchor="middle">vₓ</text>
   <text x="${x+10}" y="${(y+271)/2}" fill="#237650" font-size="17">vᵧ</text>`;
  el.querySelector("#velocity-speed-value").textContent=v+" m/s";
  el.querySelector("#velocity-angle-value").textContent=angle.value+"°";
  el.querySelector("#velocity-x").textContent=f(vx)+" m/s";
  el.querySelector("#velocity-y").textContent=f(vy)+" m/s";
 }
 speed.oninput=paint;angle.oninput=paint;paint();
}
function projectileMotion(el){
 el.innerHTML=`<div class="diagram-head"><strong>An ideal projectile</strong><span class="pill">g = 9.8 m/s²</span></div>
 <svg viewBox="0 0 560 335" role="img" aria-label="Flight trajectory from launch to equal-height landing; numerical values shown below">
 <path d="M53 268H524M74 294V24" fill="none" stroke="#8fa69d" stroke-width="1.7"/>
 <path d="M74 215H524M74 162H524M74 109H524M74 56H524" fill="none" stroke="#e1e9e2" stroke-width="1" stroke-dasharray="4 6"/>
 <text x="506" y="294" fill="#435d63" font-size="15">x (m)</text><text x="35" y="26" fill="#435d63" font-size="15">y</text>
 <g id="projectile-trace"></g><circle cx="74" cy="268" r="5" fill="#263c56"/></svg>
 <div class="controls"><label>Launch speed <output id="projectile-speed-value">20 m/s</output><input id="projectile-speed" type="range" min="12" max="30" step="1" value="20"></label>
 <label>Angle above ground <output id="projectile-angle-value">40°</output><input id="projectile-angle" type="range" min="20" max="70" step="5" value="40"></label></div>
 <div class="readout"><div class="metric"><small>Flight time</small><strong id="projectile-flight"></strong></div><div class="metric"><small>Horizontal range</small><strong id="projectile-range"></strong></div><div class="metric"><small>Peak height</small><strong id="projectile-height"></strong></div></div>
 <p class="note">Ideal model: no air resistance; launch and landing at the same height. A fixed scale makes changing range and height visible.</p>`;
 const speed=el.querySelector("#projectile-speed"),angle=el.querySelector("#projectile-angle"),g=9.8;
 function paint(){
  const v=Number(speed.value),theta=Number(angle.value)*Math.PI/180,vx=v*Math.cos(theta),vy=v*Math.sin(theta);
  const T=2*vy/g,R=vx*T,H=vy*vy/(2*g),sx=t=>74+4*vx*t,sy=t=>268-4*(vy*t-.5*g*t*t);
  const path=Array.from({length:49},(_,i)=>{const t=T*i/48;return (i?"L":"M")+f(sx(t))+" "+f(sy(t));}).join(" ");
  const peakX=sx(T/2),peakY=sy(T/2);
  el.querySelector("#projectile-trace").innerHTML=`
  <path d="${path}" stroke="#14727a" fill="none" stroke-width="4" stroke-linecap="round"/>
  <path d="M${f(peakX)} ${f(peakY)}V268" stroke="#be9257" stroke-width="1.6" stroke-dasharray="5 5"/>
  <circle cx="${f(peakX)}" cy="${f(peakY)}" r="7" fill="#ba8240" stroke="white" stroke-width="2"/>
  <circle cx="${f(sx(T))}" cy="268" r="5" fill="#14727a"/>
  <text x="${f(Math.max(110,Math.min(peakX,450)))}" y="${f(Math.max(22,peakY-13))}" text-anchor="middle" fill="#946736" font-size="15">peak</text>`;
  el.querySelector("#projectile-speed-value").textContent=v+" m/s";
  el.querySelector("#projectile-angle-value").textContent=angle.value+"°";
  el.querySelector("#projectile-flight").textContent=f(T)+" s";
  el.querySelector("#projectile-range").textContent=f(R)+" m";
  el.querySelector("#projectile-height").textContent=f(H)+" m";
 }
 speed.oninput=paint;angle.oninput=paint;paint();
}

function submodulesFor(parentId,ctx={book:null,grade:null}){
 const related=submodules.filter(m=>m.parent===parentId);
 if(!related.length)return "";
 return '<aside class="mini-links"><span>Explore deeper</span>'+related.map(m=>'<a href="#submodule/'+encodeURIComponent(m.id)+(ctx.book?'?book='+encodeURIComponent(ctx.book.id)+(ctx.grade?'&grade='+ctx.grade:''):'')+'">'+escapeHtml(m.title)+' →</a>').join("")+'</aside>';
}
function microLesson(m){
 const parent=get(m.parent),ctx=lessonContext(parent),link=parent.next||parent.id;
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="${lessonLink("lesson",parent,ctx)}">← Back</a><a href="#home">⌂ Home</a><a href="#lesson/${link}">Next →</a></nav>
 <header class="focus-head"><div class="eyebrow">${subject(parent.subject)} · ${escapeHtml(parent.unit)} · Short challenge</div><h1>${escapeHtml(m.title)}</h1><p>${escapeHtml(m.subtitle)}</p></header>
 <article class="focus-lesson">
 <section class="visual-stage"><div class="visual-intro"><span class="visual-label">TRY IT</span><p>${escapeHtml(m.visualLead)}</p></div>
 <div class="interactive" id="visual"></div>${visualLegend(m.visual)}<div class="notice-line"><span>Notice</span><p>${escapeHtml(m.focus)}</p></div></section>
 <section class="learn-area micro-explain"><details><summary>The idea</summary><p>${escapeHtml(m.idea)}</p></details></section>
 <section class="lesson-panel mini-question"><h2>Check your reasoning</h2><p>${escapeHtml(m.challenge.prompt)}</p><fieldset class="choice-group" id="micro-choices"><legend>Choose an answer</legend>
 ${m.challenge.choices.map((v,i)=>`<label class="concept-choice"><input type="radio" name="mini-challenge" value="${i}"><span>${escapeHtml(v)}</span></label>`).join("")}</fieldset>
 <button type="button" class="primary" id="micro-check">Check</button><p id="micro-feedback" role="status" aria-live="polite"></p></section>
 <div class="lesson-end"><a href="${lessonLink("lesson",parent,ctx)}">← Return to ${escapeHtml(parent.title)}</a></div></article>`;
 const fieldset=document.querySelector("#micro-choices"),button=document.querySelector("#micro-check"),output=document.querySelector("#micro-feedback");
 button.onclick=()=>{
  const checked=fieldset.querySelector("input:checked");
  if(!checked){output.textContent="Select an answer first.";return;}
  const index=+checked.value,good=index===m.challenge.correct;
  output.textContent=m.challenge.feedback[index]+(good?" "+m.idea:"");
  output.className=good?"feedback good":"feedback try";
  if(good){fieldset.disabled=true;button.disabled=true;button.textContent="Understood ✓";}
 };
 const el=document.querySelector("#visual");
 if(m.visual==="slope-height")slopeHeight(el);
 if(m.visual==="sign-speed")signSpeed(el);
 if(m.visual==="limit-value")limitValue(el);
}
function lessonChapter(l){return l.subject==="physics"?({
"si-units":1,"position-displacement":2,"motion-diagrams":2,"average-velocity":2,
"acceleration":3,"free-fall":3,"motion-graphs":3,"free-body-diagram":4,
"newtons-second-law":4,"force-components":5,"two-dimensional-motion":6,"projectile-motion":6,"atom-spectra":28
})[l.id]??null:null;}
function renderAccumulativeStep(container,step){
 const li=document.createElement("li");li.className="worked-step";li.tabIndex=-1;li.textContent=step;
 container.append(li);
 li.focus({preventScroll:true});
 if(typeof li.scrollIntoView==="function")li.scrollIntoView({block:"nearest"});
}
function studySheet(l){
 const ctx=lessonContext(l),ch=lessonChapter(l),ref=ch&&allowChapterLink(ctx)?`<a href="#equations/${ch}">Chapter ${ch} equations →</a>`:"";
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="${lessonLink("lesson",l,ctx)}">← Back</a><a href="#home">⌂ Home</a><a href="${lessonLink("guided",l,ctx)}">Guided practice →</a></nav>
 ${contextTrail(ctx)}
 <header class="focus-head"><div class="eyebrow">${subject(l.subject)} · Study this concept</div><h1>${escapeHtml(l.title)}</h1><p>A definition, a solved example, and one problem for you.</p></header>
 <article class="study-sheet">
 <section class="study-section"><div class="eyebrow">01 · Define</div><h2>Know the idea</h2><p class="study-definition">${escapeHtml(l.definition)}</p></section>
 <section class="study-section"><div class="eyebrow">02 · Example</div><h2>Watch the reasoning</h2><p>${escapeHtml(l.example.question)}</p><ol class="worked-steps study-steps">${l.example.steps.map(s=>`<li class="worked-step">${escapeHtml(s)}</li>`).join("")}</ol></section>
 <section class="study-section"><div class="eyebrow">03 · Your turn</div><h2>Use the same method</h2><p>${escapeHtml(l.practice.prompt)}</p>
 <form id="study-form"><label for="study-answer">Your answer ${l.practice.unit?`(${escapeHtml(l.practice.unit)})`:""}</label>
 <div class="answer-row"><input type="number" step="any" inputmode="decimal" id="study-answer" required><button type="submit" class="primary">Check answer</button></div></form>
 <p class="feedback" id="study-feedback" role="status" aria-live="polite"></p><button type="button" class="hint-button" id="study-hint">Show a hint</button>
 <ol id="study-hints" class="study-hints" aria-live="polite"></ol></section>
 <div class="lesson-end"><a class="btn primary" href="${lessonLink("guided",l,ctx)}">Practice three levels →</a><a href="${lessonLink("lesson",l,ctx)}">Explore the applet</a>${ref}</div></article>`;
 let hinted=0;const hints=document.querySelector("#study-hints");
 document.querySelector("#study-hint").onclick=()=>{
   if(hinted>=l.practice.hints.length)return;
   const item=document.createElement("li");item.textContent=l.practice.hints[hinted++];hints.append(item);
   const button=document.querySelector("#study-hint");
   button.textContent=hinted===l.practice.hints.length?"All hints shown":"Show another hint";
   if(hinted===l.practice.hints.length)button.disabled=true;
 };
 document.querySelector("#study-form").onsubmit=e=>{
  e.preventDefault();const input=document.querySelector("#study-answer").value.trim(),val=Number(input);
  const good=input!==""&&Number.isFinite(val)&&Math.abs(val-l.practice.answer)<=l.practice.tolerance;
  const target=document.querySelector("#study-feedback");target.className="feedback "+(good?"good":"try");
  target.textContent=good?"Correct. Now try the progressive practice page.":"Not quite. Review the known values, the conversion, or the signs; use a hint if needed.";
 };
}
function guidedPage(l){
 const pack=guidedSets.find(p=>p.owner===l.id);
 if(!pack||pack.levels.length!==3){main.textContent="Guided practice is unavailable for this lesson.";return;}
 const ctx=lessonContext(l),ch=allowChapterLink(ctx)?lessonChapter(l):null;
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="${lessonLink("study",l,ctx)}">← Back</a><a href="#home">⌂ Home</a><a href="${lessonLink("lesson",l,ctx)}">Concept →</a></nav>
 ${contextTrail(ctx)}
 <header class="focus-head"><div class="eyebrow">${subject(l.subject)} · Guided problems</div><h1>${escapeHtml(l.title)}</h1>
 <p>Three similar problems. Each adds one challenge. Ask for the next reasoning step whenever you need it.</p></header>
 <article class="guided-work">
 <nav class="level-navigation" aria-label="Practice difficulty">
 ${pack.levels.map((p,i)=>`<button type="button" data-problem="${i}" class="level-button">${i+1}. ${escapeHtml(p.level)}</button>`).join("")}</nav>
 <section class="guided-card" id="guided-card" aria-live="off"></section>
 <div class="lesson-end"><a href="${lessonLink("study",l,ctx)}">← Definition and example</a><a href="${lessonLink("lesson",l,ctx)}">Return to interactive lesson</a>${ch?`<a href="#equations/${ch}">Chapter equations →</a>`:""}</div></article>`;
 const buttons=[...main.querySelectorAll("[data-problem]")],stage=main.querySelector("#guided-card");
 let index=0;
 function show(i){
  index=i;buttons.forEach((b,j)=>{b.setAttribute("aria-current",j===i?"step":"false");b.classList.toggle("selected",j===i)});
  const p=pack.levels[index];stage.innerHTML=`<div class="eyebrow">Problem ${index+1} of 3 · ${escapeHtml(p.level)}</div>
   <h2>Consider the situation</h2><p class="guided-prompt">${escapeHtml(p.prompt)}</p>
   <form id="guided-answerform"><label for="guided-answer">Answer ${p.unit?"("+escapeHtml(p.unit)+")":""}</label>
   <div class="answer-row"><input type="number" step="any" required inputmode="decimal" id="guided-answer"><button type="submit" class="primary">Check</button></div></form>
   <p id="guided-feedback" class="feedback" role="status" aria-live="polite"></p>
   <div class="guided-thinking"><div class="eyebrow">Reason through it</div>
   <ol id="guided-steps" class="worked-steps" aria-label="Revealed solution steps" aria-live="polite" aria-relevant="additions"></ol>
   <div class="step-nav"><button type="button" id="guided-reveal" class="primary">Show first thinking step →</button><button type="button" id="guided-reset">Hide steps</button></div></div>
   <div class="step-nav problem-switch"><button type="button" id="guided-prev" ${index===0?"disabled":""}>← Easier problem</button>
   <button type="button" id="guided-next" ${index===pack.levels.length-1?"disabled":""}>Harder problem →</button></div>`;
  const solution=stage.querySelector("#guided-steps"),reveal=stage.querySelector("#guided-reveal");let seen=0;
  reveal.onclick=()=>{
    if(seen>=p.steps.length)return;
    renderAccumulativeStep(solution,p.steps[seen++]);
    reveal.textContent=seen<p.steps.length?"Show next thinking step →":"All steps shown";
    reveal.disabled=seen===p.steps.length;
  };
  stage.querySelector("#guided-reset").onclick=()=>{solution.replaceChildren();seen=0;reveal.disabled=false;reveal.textContent="Show first thinking step →";};
  stage.querySelector("#guided-answerform").onsubmit=e=>{
    e.preventDefault();const raw=stage.querySelector("#guided-answer").value.trim(),val=Number(raw);
    const good=raw!==""&&Number.isFinite(val)&&Math.abs(val-p.answer)<=p.tolerance;
    const out=stage.querySelector("#guided-feedback");out.className="feedback "+(good?"good":"try");
    out.textContent=good?"Correct. Can you explain the key reasoning step?":"Check your signs, the relevant relation, and its units. Reveal one thinking step if needed.";
  };
  stage.querySelector("#guided-prev").onclick=()=>show(index-1);
  stage.querySelector("#guided-next").onclick=()=>show(index+1);
 }
 buttons.forEach((button,i)=>button.onclick=()=>show(i));show(0);
}
function equationIndex(){
 const chapters=physicsEquations.chapters;
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#physics">← Back</a><a href="#home">⌂ Home</a><a href="#equations/1">Chapter 1 →</a></nav>
 <header class="catalog-head"><div class="eyebrow">Physics · Reference library</div><h1>Equation Reference</h1>
 <p>Find a chapter, see its equations, and check when the model applies. This is a developing original summary, not a complete substitute for your textbook.</p></header>
 <div class="equation-book">
 ${chapters.map(c=>`<a class="equation-index-link" href="#equations/${c.number}"><span class="chapter-index">${String(c.number).padStart(2,"0")}</span>
 <span><strong>${escapeHtml(c.title)}</strong><small>${c.equations.length} reference ${c.equations.length===1?"relationship":"relationships"}${c.scope==="classroom-core"?"":" · additional chapter"}</small></span><span aria-hidden="true">→</span></a>`).join("")}</div>`;
}
function equationChapter(ch){
 const chapters=physicsEquations.chapters,idx=chapters.findIndex(c=>c.number===ch);
 if(idx<0){equationIndex();return;}
 const data=chapters[idx],prev=chapters[idx-1],next=chapters[idx+1];
 const items=data.equations.map((e,i)=>`<section class="formula-entry"><div class="formula-label">${i+1}. ${escapeHtml(e.name)}</div>
  <div class="formula-expression">${escapeHtml(e.formula)}</div><p>${escapeHtml(e.conditions)}</p></section>`).join("");
 const supporting=lessons.filter(x=>x.subject==="physics"&&lessonChapter(x)===ch);
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#equations">← All chapters</a><a href="#home">⌂ Home</a>${next?`<a href="#equations/${next.number}">Chapter ${next.number} →</a>`:'<a href="#equations">All equations →</a>'}</nav>
 <header class="focus-head"><div class="eyebrow">Physics · Chapter ${ch}</div><h1>${escapeHtml(data.title)}</h1>
 <p>Selected governing equations and their conditions.</p></header>
 <article class="equation-chapter"><p class="equation-caution">${escapeHtml(data.note)}</p>
 ${items||'<div class="empty-state">The detailed reference for this chapter is not yet written. Check your textbook and instructor notes.</div>'}
 ${supporting.length?`<section class="chapter-topic-links"><h2>Study these concepts</h2>${supporting.map(l=>`<a href="#study/${l.id}">${escapeHtml(l.title)} →</a>`).join("")}</section>`:""}
 <div class="lesson-end">${prev?`<a href="#equations/${prev.number}">← Chapter ${prev.number}</a>`:""}<a href="#equations">Full equation index</a>${next?`<a class="next-link" href="#equations/${next.number}">Chapter ${next.number} →</a>`:""}</div></article>`;
}

/* Shareable publisher-discussion context. A book association is always an
   illustrative relationship, never an edition-specific chapter alignment. */
function hashParams(){return new URLSearchParams(location.hash.split("?")[1]||"");}
function bookLink(book,grade=null){
 return "#book/"+encodeURIComponent(book.id)+(book.gradeIds.includes(grade)?"?grade="+encodeURIComponent(grade):"");
}
function lessonContext(l){
 const params=hashParams(),id=params.get("book");
 const book=bookPathways?.references.find(b=>b.id===id&&b.topicIds.includes(l.id))||null;
 const grade=book&&book.gradeIds.includes(params.get("grade"))?params.get("grade"):null;
 return {book,grade};
}
function lessonLink(view,l,ctx){
 return "#"+view+"/"+encodeURIComponent(l.id)+(ctx.book?"?book="+encodeURIComponent(ctx.book.id)+(ctx.grade?"&grade="+encodeURIComponent(ctx.grade):""):"");
}
function contextTrail(ctx){
 if(!ctx.book)return "";
 return '<nav class="context-trail" aria-label="Breadcrumb"><a href="#books">Books</a>'+
 (ctx.grade?'<span aria-hidden="true">›</span><a href="#grade/'+ctx.grade+'">Grade '+ctx.grade+'</a>':"")+
 '<span aria-hidden="true">›</span><a href="'+bookLink(ctx.book,ctx.grade)+'">'+escapeHtml(ctx.book.title)+'</a>'+
 '<span aria-hidden="true">›</span><span>Illustrative concept</span></nav>';
}
function allowChapterLink(ctx){return !ctx.book||ctx.book.id==="existing-glencoe";}
function closePresentation(){
 document.body.classList.remove("presentation-mode");
 for(const element of document.querySelectorAll(".edition-strip,.topbar,.footer,.route-nav,.focus-head,.context-trail"))element.inert=false;
}

function bookTile(book,grade=null){
 const gradeText=book.gradeIds.map(n=>"Grade "+n).join(" · ");
 const count=book.topicIds.length;
 return `<a class="book-tile" href="${bookLink(book,grade)}">
 <span class="book-spine" aria-hidden="true"><span>${book.subject==="calculus"?"∫":book.subject==="mathematics"?"x²":"Φ"}</span></span>
 <span class="book-tile-body"><span class="eyebrow">${escapeHtml(gradeText)}</span><strong>${escapeHtml(book.title)}</strong>
 <small>${escapeHtml(book.imprint)}</small><em>${count?count+" example concept "+(count===1?"link":"links"):"Navigation example · content pending"}</em></span><span aria-hidden="true" class="book-tile-arrow">→</span></a>`;
}
function booksHome(){
 const catalog=bookPathways;
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#home">← Back</a><a href="#home">⌂ Home</a><a href="#showcase">Demo overview →</a></nav>
 <section class="books-intro"><div class="eyebrow">Curriculum Library · Prototype</div><h1>Begin with a book.</h1>
 <p>Choose a grade or text, then explore original demonstrations that illuminate related ideas.</p>
 <div class="books-note" role="note">${escapeHtml(catalog.notices.mappings)}</div></section>
 <section class="grade-choices" aria-label="Choose a grade">${catalog.grades.map(g=>`<a href="#grade/${g.id}"><span>Grade</span><strong>${g.id}</strong></a>`).join("")}</section>
 <div class="section-heading"><div><div class="eyebrow">Browse by text</div><h2>Curriculum pathways</h2></div><span class="section-support">Official catalog links are provided on each book page</span></div>
 <div class="book-grid">${catalog.references.map(bookTile).join("")}</div>
 <section class="publisher-note"><h2>About these connections</h2><p>${escapeHtml(catalog.notices.relationship)} ${escapeHtml(catalog.notices.sources)}</p>
 <a href="#showcase">See the publisher demonstration overview →</a></section>`;
}
function gradeBooks(gradeId){
 const grade=bookPathways.grades.find(g=>g.id===gradeId);if(!grade){booksHome();return;}
 const selected=bookPathways.references.filter(b=>b.gradeIds.includes(gradeId));
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#books">← All books</a><a href="#home">⌂ Home</a><a href="#showcase">Demo overview →</a></nav>
 <header class="books-intro"><div class="eyebrow">Curriculum Library · Grade pathway</div><h1>${escapeHtml(grade.label)}</h1><p>${escapeHtml(grade.description)}</p>
 <div class="books-note">${escapeHtml(bookPathways.notices.mappings)}</div></header>
 <nav class="grade-choices" aria-label="Switch grade">${bookPathways.grades.map(g=>`<a href="#grade/${g.id}" ${g.id===gradeId?'aria-current="page"':""}><span>Grade</span><strong>${g.id}</strong></a>`).join("")}</nav>
 <div class="book-grid">${selected.map(b=>bookTile(b,gradeId)).join("")}</div><div class="backline"><a href="#books">View every book pathway →</a></div>`;
}
function bookDetail(bookId){
 const book=bookPathways.references.find(b=>b.id===bookId);if(!book){booksHome();return;}
 const grade=book.gradeIds.includes(hashParams().get("grade"))?hashParams().get("grade"):null;
 const ctx={book,grade};
 const matched=book.topicIds.map(id=>lessons.find(l=>l.id===id)).filter(Boolean);
 const official=book.publishedUrl?`<a class="btn external-catalog" href="${escapeHtml(book.publishedUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(book.publishedLinkLabel)} ↗</a>`:"";
 const links=matched.length?matched.map(l=>`<article class="book-match"><span class="lesson-ordinal">Concept</span><div><h3>${escapeHtml(l.title)}</h3><p>${escapeHtml(l.subtitle)}</p><div class="inline-learning-links"><a href="${lessonLink("lesson",l,ctx)}">Interactive idea →</a><a href="${lessonLink("study",l,ctx)}">Definition &amp; example →</a><a href="${lessonLink("guided",l,ctx)}">Guided practice →</a></div></div></article>`).join("")
 :`<div class="empty-state"><strong>Example pathway only.</strong><p>There is not yet a published lesson connection for this book. A publisher-approved chapter crosswalk and new original lessons would come later.</p></div>`;
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="${grade?"#grade/"+grade:"#books"}">${grade?"← Grade "+grade:"← All books"}</a><a href="#home">⌂ Home</a><a href="#showcase">Demo overview →</a></nav>
 <section class="book-detail-head"><div class="eyebrow">Publisher discussion · Textbook pathway</div><h1>${escapeHtml(book.title)}</h1>
 <p class="book-imprint">${escapeHtml(book.imprint)}</p><p>${escapeHtml(book.description)}</p>
 <div class="book-cta">${book.gradeIds.map(g=>`<a href="#grade/${g}" class="grade-link">Grade ${g}</a>`).join("")}${official}</div></section>
 <section class="mapping-explainer" role="note"><strong>Illustrative relationship, not a chapter match</strong>
 <p>${escapeHtml(bookPathways.notices.mappings)} No protected text, book illustrations, exercise numbers or answer keys have been imported.</p></section>
 <div class="section-heading"><div><div class="eyebrow">Explore original teaching examples</div><h2>Related interactive concepts</h2></div><span class="section-support">${matched.length} published examples</span></div>
 <div class="book-match-list">${links}</div>
 <div class="backline"><a href="#books">← All textbooks</a> <a href="#physics">View Physics lessons</a> <a href="#calculus">View Calculus lessons</a></div>`;
}
function showcase(){
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#home">← Back</a><a href="#home">⌂ Home</a><a href="#books">Book library →</a></nav>
 <header class="books-intro"><div class="eyebrow">For curriculum and publishing teams · Concept prototype</div>
 <h1>From the printed page to understanding.</h1>
 <p>An independent demonstration of how concise visual explanations, guided reasoning, and book-aware navigation could complement a carefully sequenced traditional curriculum.</p>
 <div class="showcase-actions"><a class="btn primary" href="#books">Browse grade and book pathways →</a><a class="btn" href="#lesson/graph-slope-physics">See an interactive lesson →</a></div></header>
 <div class="showcase-columns">
 <section class="showcase-step"><span class="step-no">01</span><h2>Choose a text</h2><p>Browse by grade and a curated catalog reference. Concept links are intentionally marked illustrative until a publisher-approved crosswalk exists.</p><a href="#book/physical-science">Explore a science book pathway →</a></section>
 <section class="showcase-step"><span class="step-no">02</span><h2>See the idea</h2><p>One striking visual and an intentionally brief explanation, with The Idea, Example, Think and Try it available underneath.</p><a href="#lesson/motion-graphs">See a Physics demonstration →</a></section>
 <section class="showcase-step"><span class="step-no">03</span><h2>Reason through it</h2><p>New worked-solution steps remain visible as a student advances. A separate page offers three levels of independent guided practice.</p><a href="#guided/graph-slope-physics">Explore graduated problems →</a></section>
 <section class="showcase-step"><span class="step-no">04</span><h2>Apply and review</h2><p>Reference equations, original printables and the browser-based Motion Data Lab support practice without an account or paid AI processing.</p><a href="#equations">Open the equation reference →</a></section></div>
 <section class="publisher-note"><div class="eyebrow">Discussion points</div><h2>What would need publisher approval?</h2>
 <p>Textbook editions and page-by-page mapping, protected diagrams or passages, brand and logo permissions, teacher-only materials, editorial review, commercial hosting, accessibility requirements, support ownership and educational claims.</p>
 <p><strong>Current boundary:</strong> independently written original lessons and illustrations; no copied textbook content, no student accounts, no student-data collection, and no claim of official Memoria Press sponsorship.</p>
 <a href="#about">Read about the independent prototype →</a></section>`;
}
function route(){
 closePresentation();
 const hash=location.hash.slice(1).split("?")[0]||"home";let decoded="home";try{decoded=decodeURIComponent(hash);}catch{/* malformed hash goes home */}const parts=decoded.split("/");const current=parts[0]==="lesson"?get(parts[1])?.subject:parts[0];
 document.querySelectorAll(".nav a").forEach(a=>a.setAttribute("aria-current",a.hash==="#"+current?"page":"false"));
 if(parts[0]==="books")booksHome();else if(parts[0]==="grade")gradeBooks(parts[1]);else if(parts[0]==="book")bookDetail(parts[1]);else if(parts[0]==="showcase")showcase();else if(parts[0]==="study"&&get(parts[1]))studySheet(get(parts[1]));else if(parts[0]==="guided"&&get(parts[1]))guidedPage(get(parts[1]));else if(parts[0]==="equations"&&parts[1]&&/^\d+$/.test(parts[1]))equationChapter(Number(parts[1]));else if(parts[0]==="equations")equationIndex();else if(parts[0]==="submodule"&&submodules.some(m=>m.id===parts[1]))microLesson(submodules.find(m=>m.id===parts[1]));else if(parts[0]==="lesson"&&get(parts[1]))lesson(get(parts[1]));else if(parts[0]==="roadmap"&&["physics","calculus"].includes(parts[1]))roadmap(parts[1]);else if(["physics","calculus"].includes(parts[0]))catalog(parts[0]);else if(parts[0]==="about")about();else home();
 nav.classList.remove("open");document.querySelector("#menu-btn").setAttribute("aria-expanded","false");window.scrollTo(0,0);main.focus({preventScroll:true});
}
document.querySelector("#menu-btn").addEventListener("click",()=>{let open=nav.classList.toggle("open");document.querySelector("#menu-btn").setAttribute("aria-expanded",String(open));});
document.addEventListener("keydown",event=>{
 if(event.key!=="Escape")return;
 if(document.body.classList.contains("presentation-mode")){
  closePresentation();const button=document.querySelector("#present-toggle");
  if(button){button.setAttribute("aria-pressed","false");button.textContent="Present lesson";button.focus();}
 }else if(nav.classList.contains("open")){
  nav.classList.remove("open");const button=document.querySelector("#menu-btn");
  button.setAttribute("aria-expanded","false");button.focus();
 }
});
window.addEventListener("hashchange",route);
Promise.all(["content/lessons.json","curriculum/catalog.json","content/submodules.json","content/guided-practice.json","content/equations-physics.json","content/book-pathways.json"].map(path=>fetch(path).then(r=>{if(!r.ok)throw Error("Could not load "+path);return r.json();})))
 .then(([data,map,micro,practice,equations,books])=>{lessons=data;curriculum=map;submodules=micro;guidedSets=practice;physicsEquations=equations;bookPathways=books;route();})
 .catch(e=>{main.innerHTML='<article class="plain-page"><h1>Unable to open lessons</h1><p>Use a local web server (for example, <code>python -m http.server 8000</code>) or GitHub Pages.</p></article>';console.error(e);});