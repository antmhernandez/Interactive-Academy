"use strict";
const main=document.querySelector("#main");
const nav=document.querySelector("#nav");
let lessons=[];
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
function heroArt(){return `<div class="hero-art" aria-hidden="true"><svg viewBox="0 0 500 320"><defs><pattern id="hero-grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" stroke="#b5c8bd" stroke-width=".8" opacity=".5" fill="none"/></pattern></defs><rect width="500" height="320" fill="#edf3ee"/><rect width="500" height="320" fill="url(#hero-grid)"/><path d="M52 262H466M78 290V30" stroke="#97b6af" stroke-width="1.5"/><path d="M77 244 Q170 282 265 134 T443 45" stroke="#14727a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M130 239L367 78" stroke="#ca8a46" stroke-width="3.4"/><circle cx="258" cy="145" r="8" fill="#d89e53" stroke="white" stroke-width="4"/><path d="M258 145V262" stroke="#a2b9b2" stroke-width="1.5" stroke-dasharray="5 5"/><text x="349" y="117" fill="#16666d" font-size="22" font-family="Georgia" font-style="italic">f(x)</text><text x="294" y="202" fill="#ad733b" font-size="17" font-family="Georgia">tangent</text></svg></div>`;}
function home(){
 main.innerHTML=`<section class="hero"><div><div class="eyebrow">A clearer way to learn</div><h1>See the idea.<br><em>Understand the why.</em></h1><p>Short, clear explanations. Carefully constructed interactive diagrams. Worked examples that reveal the reasoning one step at a time.</p><div class="actions"><a class="btn primary" href="#physics">Explore Physics →</a><a class="btn" href="#calculus">Explore Calculus →</a></div><div class="note">Free educational preview · ${lessons.length} original lessons · No account needed</div></div>${heroArt()}</section><section class="section"><div class="eyebrow">Choose a subject</div><h2>One good explanation can change everything.</h2><div class="subjects"><a href="#physics" class="subject"><span class="symbol">⚙</span><span><h3>Physics</h3><p>See motion, measure change, explore forces and understand physical models.</p><span class="open">Browse physics →</span></span></a><a href="#calculus" class="subject"><span class="symbol">∫</span><span><h3>Calculus</h3><p>See how limits, derivatives and accumulated change connect.</p><span class="open">Browse calculus →</span></span></a></div></section><section class="section"><div class="eyebrow">Begin here</div><h2>Interactive sample lessons</h2><div class="cards">${lessons.map(card).join("")}</div><div class="lab-feature"><div><span class="eyebrow">Explore by measuring</span><h2>Motion Data Laboratory</h2><p>Turn observations into graphs, fit an equation, and discover what the coefficients mean.</p></div><a class="btn primary" href="lab/motion.html">Try the laboratory →</a></div></section>`;
}
function catalog(s){
 const items=lessons.filter(l=>l.subject===s);
 main.innerHTML=`<header class="catalog-hero"><div class="eyebrow">Explore by subject</div><h1>${subject(s)}</h1><p>${s==="physics"?"Begin with an observable phenomenon, then discover the mathematical model that explains it.":"Explore the graphs, see the significance of the symbols and follow the reasoning carefully."}</p></header><label class="search">⌕ <input id="search" type="search" aria-label="Search concepts" autocomplete="off" placeholder="Search topics, concepts and lessons…"></label><div class="path-banner"><div><strong>Follow the course in order</strong><span> Your progress stays on this device: ${completedCount(s)} of ${items.length} lessons marked complete.</span></div><a class="btn primary" href="#lesson/${items[0].id}">Begin with lesson 1 →</a></div><div class="section-heading"><h2>Lessons available now</h2><span id="count" class="note">${items.length} lessons</span></div><div id="cards" class="cards">${items.map(card).join("")}</div><p class="note">These are original demonstration lessons, not a completed Physics or Calculus course. Teacher-only assessments and solutions are not published.</p>${s==="physics"?`<div class="section"><div class="lab-feature"><div><span class="eyebrow">Interactive experiment</span><h2>Motion Data Laboratory</h2><p>Enter position measurements, compare fitted models, and discover how velocity and acceleration appear in real data.</p></div><a class="btn primary" href="lab/motion.html">Open the laboratory →</a></div></div><div class="section"><h2>Printable Physics resources</h2><p>Original student guided notes and observation activities, intended to accompany the interactive lessons.</p><div class="actions"><a href="materials/motion-guided-notes.html" target="_blank" rel="noopener" class="btn">Motion diagrams notes ↗</a><a href="materials/motion-graphs-guided-notes.html" target="_blank" rel="noopener" class="btn">Position, velocity &amp; acceleration notes ↗</a><a href="materials/motion-observation-lab.html" target="_blank" rel="noopener" class="btn">Motion observation lab ↗</a><a href="materials/motion-data-lab.html" target="_blank" rel="noopener" class="btn">Motion observation lab ↗</a><a href="materials/motion-model-investigation.html" target="_blank" rel="noopener" class="btn">Regression investigation report ↗</a></div></div>`:`<div class="section"><h2>Printable Calculus resources</h2><p>A short student guide linking graphical slope, instantaneous rate and accumulated change.</p><div class="actions"><a href="materials/calculus-graphical-meaning-guided-notes.html" target="_blank" rel="noopener" class="btn">Derivative &amp; integral guided notes ↗</a></div></div>`}`;
 document.querySelector("#search").addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase();const filtered=items.filter(l=>[l.title,l.subtitle,l.unit,l.idea].join(" ").toLowerCase().includes(q));document.querySelector("#cards").innerHTML=filtered.length?filtered.map(card).join(""):'<p>No matching lessons yet.</p>';document.querySelector("#count").textContent=filtered.length+" lessons";});
}
function about(){
 main.innerHTML=`<article class="about"><div class="eyebrow">About the project</div><h1>Understand the world. See the mathematics.</h1><p>The Learning Atlas is an independent educational demonstration. We are developing a mobile-friendly resource that connects careful observation, precise language, visual mathematical models and guided independent practice.</p><p>We believe students learn best when they understand <em>why</em> a relationship is true before memorizing how to apply it. New lessons are researched, mathematically checked and independently edited before release.</p><p>This pilot has no accounts, analytics, uploads, payments or AI calls. It is not an official Highlands Latin School, Memoria Press, Novare, College Board or Texas Instruments product.</p><div class="actions"><a href="#physics" class="btn primary">Explore Physics</a><a href="#calculus" class="btn">Explore Calculus</a></div></article>`;
}
function lesson(l){
 const next=get(l.next);const st=l.example.steps;const idx=courseOrder(l);const total=courseList(l.subject).length;const previous=courseList(l.subject)[idx-2];
 main.innerHTML=`<div class="breadcrumb"><a href="#home">Home</a> › <a href="#${l.subject}">${subject(l.subject)}</a> › ${escapeHtml(l.unit)}</div><header class="lesson-title"><div class="eyebrow">${subject(l.subject)} · ${escapeHtml(l.unit)} · Lesson ${idx} of ${total} · ${escapeHtml(l.duration)}</div><h1>${escapeHtml(l.title)}</h1><p>${escapeHtml(l.subtitle)}</p></header><div class="lesson-layout"><aside class="sidebar" aria-label="Lesson sections"><h3>In this lesson</h3><a href="#observe" data-section="observe">Observe</a><a href="#understand" data-section="understand">Understand</a><a href="#explore" data-section="explore">Explore</a><a href="#example" data-section="example">Follow an example</a><a href="#practice" data-section="practice">Try it yourself</a></aside><article class="lesson"><section class="lesson-block" id="observe"><div class="eyebrow">01 · Observe</div><h2>Begin with a question</h2><p>${escapeHtml(l.observe)}</p></section><section class="lesson-block" id="understand"><div class="eyebrow">02 · Understand</div><h2>The essential idea</h2><div class="essential">${escapeHtml(l.idea)}</div></section><section class="lesson-block" id="explore"><div class="eyebrow">03 · Explore</div><h2>See what changes</h2><p>${escapeHtml(l.visualLead)}</p><div class="interactive" id="visual"></div></section><section class="lesson-block" id="example"><div class="eyebrow">04 · Follow an example</div><h2>Watch the reasoning unfold</h2><p>${escapeHtml(l.example.question)}</p><div class="example"><div id="stepcount" class="step-counter"></div><div class="step" id="steptext"></div><div class="actions"><button id="prev" type="button">← Previous</button><button class="primary" id="next" type="button">Next step →</button><button id="restart" type="button">Start over</button></div></div></section><section class="lesson-block" id="practice"><div class="eyebrow">06 · Try it yourself</div><h2>Can you use the idea?</h2><div class="practice"><strong>${escapeHtml(l.practice.prompt)}</strong><form id="answerform"><label for="answer">Numerical answer${l.practice.unit?" ("+escapeHtml(l.practice.unit)+")":""}</label><div class="answer-row"><input id="answer" type="number" step="any" required placeholder="Enter a number"><button class="primary" type="submit">Check answer</button></div></form><div id="feedback" class="feedback" role="status" aria-live="polite"></div><button type="button" id="hintbtn">Show a hint</button><div id="hinttext" class="hint" hidden></div></div></section><div class="finish-lesson"><div><strong>Finished studying this lesson?</strong><p class="note">You can mark this lesson complete on this device. Try the question independently first.</p></div><button type="button" id="markdone" aria-pressed="${completed.has(l.id)?"true":"false"}" class="${completed.has(l.id)?"":"primary"}">${completed.has(l.id)?"✓ Completed — undo":"Mark lesson complete ✓"}</button></div><div class="actions"><a href="#${l.subject}" class="btn">All ${subject(l.subject)} lessons</a>${previous?`<a href="#lesson/${previous.id}" class="btn">← Previous lesson</a>`:""}${next?`<a href="#lesson/${next.id}" class="btn primary">Next: ${escapeHtml(next.title)} →</a>`:""}</div></article></div>`;
 renderConceptCheck(l);
 document.querySelectorAll("[data-section]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();document.getElementById(a.dataset.section).scrollIntoView({behavior:"smooth",block:"start"});}));
 if(l.subject==="physics"){
   const link=document.createElement("a");
   link.href="lab/motion.html";
   link.className="btn";
   link.textContent="Analyze motion measurements in the lab →";
   document.querySelector(".lesson .actions:last-child").append(link);
 }
 const mark=document.querySelector("#markdone");
 mark.onclick=()=>{if(completed.has(l.id))completed.delete(l.id);else completed.add(l.id);saveCompleted();mark.textContent=completed.has(l.id)?"✓ Completed — undo":"Mark lesson complete ✓";mark.setAttribute("aria-pressed",String(completed.has(l.id)));mark.classList.toggle("primary",!completed.has(l.id));};

 let step=0;function paintStep(){document.querySelector("#stepcount").textContent="Step "+(step+1)+" of "+st.length;document.querySelector("#steptext").textContent=st[step];document.querySelector("#prev").disabled=step===0;document.querySelector("#next").disabled=step===st.length-1;}
 document.querySelector("#prev").onclick=()=>{step=Math.max(0,step-1);paintStep();};document.querySelector("#next").onclick=()=>{step=Math.min(st.length-1,step+1);paintStep();};document.querySelector("#restart").onclick=()=>{step=0;paintStep();};paintStep();
 document.querySelector("#answerform").onsubmit=e=>{e.preventDefault();const value=Number(document.querySelector("#answer").value),good=Number.isFinite(value)&&Math.abs(value-l.practice.answer)<=l.practice.tolerance;const out=document.querySelector("#feedback");out.className="feedback "+(good?"good":"try");out.textContent=good?"Correct. Now see if you can explain why the result makes sense.":"Not quite. Check your formula, sign or units. Try a hint if you need one.";};
 let hint=0;document.querySelector("#hintbtn").onclick=()=>{const h=l.practice.hints;document.querySelector("#hinttext").hidden=false;document.querySelector("#hinttext").textContent=h[Math.min(hint,h.length-1)];hint++;document.querySelector("#hintbtn").textContent=hint<h.length?"Another hint":"Review hint";};
 const el=document.querySelector("#visual");if(l.visual==="displacement")displacement(el);if(l.visual==="average-velocity")averageVelocity(el);if(l.visual==="free-fall")freeFall(el);if(l.visual==="velocity-area")velocityArea(el);if(l.visual==="motion")motion(el);if(l.visual==="acceleration")acceleration(el);if(l.visual==="motion-graphs")linkedGraphs(el);if(l.visual==="tangent")tangent(el);if(l.visual==="riemann")riemann(el);
}
function renderConceptCheck(lesson) {
 const c=lesson.checkpoint;
 if(!c) return;
 const section=document.createElement("section");
 section.className="lesson-block conceptual-check";
 section.id="concept-check";
 const eyebrow=document.createElement("div");
 eyebrow.className="eyebrow";
 eyebrow.textContent="05 · Check your reasoning";
 const heading=document.createElement("h2");
 heading.textContent="Do you understand the idea?";
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
 const sidebar=document.querySelector(".sidebar");
 const link=document.createElement("a");
 link.href="#concept-check";
 link.dataset.section="concept-check";
 link.textContent="Check your reasoning";
 sidebar.querySelector('[data-section="practice"]').before(link);
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
function route(){
 const hash=decodeURIComponent(location.hash.slice(1))||"home",parts=hash.split("/");const current=parts[0]==="lesson"?get(parts[1])?.subject:parts[0];
 document.querySelectorAll(".nav a").forEach(a=>a.setAttribute("aria-current",a.hash==="#"+current?"page":"false"));
 if(parts[0]==="lesson"&&get(parts[1]))lesson(get(parts[1]));else if(["physics","calculus"].includes(parts[0]))catalog(parts[0]);else if(parts[0]==="about")about();else home();
 nav.classList.remove("open");document.querySelector("#menu-btn").setAttribute("aria-expanded","false");window.scrollTo(0,0);
}
document.querySelector("#menu-btn").addEventListener("click",()=>{let open=nav.classList.toggle("open");document.querySelector("#menu-btn").setAttribute("aria-expanded",String(open));});
window.addEventListener("hashchange",route);
fetch("content/lessons.json").then(r=>{if(!r.ok)throw Error("Lesson library unavailable");return r.json()}).then(data=>{lessons=data;route()}).catch(e=>{main.innerHTML='<article class="about"><h1>Unable to open lessons</h1><p>Please use a local web server (for example, <code>python -m http.server 8000</code>) or GitHub Pages.</p></article>';console.error(e);});