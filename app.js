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
 const physics=lessons.filter(l=>l.subject==="physics"),calculus=lessons.filter(l=>l.subject==="calculus");
 main.innerHTML=`
 <div class="route-nav"><span class="route-current">The Learning Atlas</span><a href="#physics">Physics</a><a href="#calculus">Calculus</a></div>
 <section class="home-hero">
   <div class="eyebrow">Physics &amp; Calculus, made visible</div>
   <h1>See it. Understand it.</h1>
   <p>One clear idea at a time. Explore a diagram, follow an example, then try it yourself.</p>
   <div class="home-choices">
     <a class="subject-tile" href="#physics"><span class="subject-glyph">↗</span><span><strong>Physics</strong><small>${physics.length} interactive topics</small></span><span aria-hidden="true">→</span></a>
     <a class="subject-tile calculus" href="#calculus"><span class="subject-glyph">∫</span><span><strong>Calculus</strong><small>${calculus.length} interactive topics</small></span><span aria-hidden="true">→</span></a>
   </div>
 </section>
 <section class="home-feature"><div class="home-feature-art">${heroArt()}</div><div class="home-feature-copy"><div class="eyebrow">Start with a picture</div><h2>What does motion look like?</h2><p>Move the dots. See how speed changes.</p><a class="btn primary" href="#lesson/motion-diagrams">Explore motion →</a></div></section>
 <div class="lab-strip"><div><strong>Have experimental data?</strong><span>Graph motion and find a mathematical model.</span></div><a href="lab/motion.html">Open Motion Lab →</a></div>`;
}
function catalog(s){
 const items=courseList(s),completedTotal=completedCount(s);
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
 <section class="resources"><details><summary>Printables &amp; experiments</summary>${s==="physics"?`<div class="resource-links"><a href="lab/motion.html">Interactive motion data lab ↗</a><a href="materials/motion-guided-notes.html">Motion diagram notes ↗</a><a href="materials/motion-graphs-guided-notes.html">Position &amp; velocity guided notes ↗</a><a href="materials/motion-observation-lab.html">Motion observation lab ↗</a><a href="materials/motion-data-lab.html">Motion data lab worksheet ↗</a><a href="materials/motion-model-investigation.html">Regression investigation ↗</a></div>`:`<div class="resource-links"><a href="materials/calculus-graphical-meaning-guided-notes.html">Graphical derivative &amp; integral notes ↗</a></div>`}</details></section>`;
 document.querySelector("#search").addEventListener("input",e=>{
  const q=e.target.value.trim().toLowerCase();
  const filtered=items.filter(l=>[l.title,l.subtitle,l.unit,l.idea].join(" ").toLowerCase().includes(q));
  document.querySelector("#topic-groups").innerHTML=filtered.length?render(filtered):'<p class="empty-state">No lesson found. Try another term.</p>';
 });
}
function about(){
 main.innerHTML=`<nav class="route-nav" aria-label="Page navigation"><a href="#home">← Back</a><a href="#home">⌂ Home</a><a href="#physics">Explore Physics →</a></nav><section class="plain-page"><div class="eyebrow">About</div><h1>See the mathematics.</h1><p>Interactive Academy is a developing collection of original Physics and Calculus lessons. Each begins with a diagram or experiment, followed by a concise explanation and a chance to try the idea.</p><p>No accounts or AI calls are required. Completed-lesson marks stay in your browser. This preview is independent of HLS, Memoria Press, Novare, College Board and Texas Instruments.</p></section>`;
}
function lesson(l){
 const group=courseList(l.subject),idx=courseOrder(l),previous=group[idx-2],next=get(l.next),end=next?`#lesson/${next.id}`:`#${l.subject}`,start=previous?`#lesson/${previous.id}`:`#${l.subject}`;
 main.innerHTML=`
 <nav class="route-nav" aria-label="Lesson navigation"><a href="${start}">← Back</a><a href="#home">⌂ Home</a><a href="${end}">Next →</a></nav>
 <header class="focus-head"><div class="eyebrow">${subject(l.subject)} <span aria-hidden="true">·</span> ${escapeHtml(l.unit)} <span aria-hidden="true">·</span> ${String(idx).padStart(2,"0")} / ${String(group.length).padStart(2,"0")}</div><h1>${escapeHtml(l.title)}</h1><p>${escapeHtml(l.subtitle)}</p></header>
 <article class="focus-lesson">
 <section class="visual-stage" aria-label="Interactive demonstration">
 <div class="visual-intro"><span class="visual-label">EXPLORE</span><p>${escapeHtml(l.visualLead)}</p></div>
 <div class="interactive" id="visual"></div>
 <div class="notice-line"><span>Notice</span><p>${escapeHtml(l.focus||l.idea)}</p></div>
 </section>
 <section class="learn-area" aria-label="Learn and practice">
 <div class="lesson-tabs" role="tablist" aria-label="Learning activities">
 <button id="tab-understand" role="tab" type="button" data-view="understand" aria-controls="understand">The idea</button>
 <button id="tab-example" role="tab" type="button" data-view="example" aria-controls="example">Example</button>
 <button id="tab-concept-check" role="tab" type="button" data-view="concept-check" aria-controls="concept-check">Think</button>
 <button id="tab-practice" role="tab" type="button" data-view="practice" aria-controls="practice">Try it</button>
 </div>
 <section class="lesson-panel" role="tabpanel" id="understand" aria-labelledby="tab-understand"><h2>The idea</h2><p class="idea-text">${escapeHtml(l.idea)}</p></section>
 <section class="lesson-panel" role="tabpanel" id="example" aria-labelledby="tab-example">
 <div class="eyebrow">Worked example</div><h2>Follow the steps</h2><p>${escapeHtml(l.example.question)}</p>
 <div class="example"><div class="step-counter" id="stepcount"></div><div class="step" id="steptext"></div><div class="step-nav"><button id="prev" type="button">← Previous</button><button class="primary" id="next" type="button">Next step →</button><button id="restart" type="button">Start over</button></div></div></section>
 <section class="lesson-panel" role="tabpanel" id="practice" aria-labelledby="tab-practice">
 <div class="eyebrow">Independent practice</div><h2>Your turn</h2><p>${escapeHtml(l.practice.prompt)}</p>
 <form id="answerform"><label for="answer">Answer${l.practice.unit?" ("+escapeHtml(l.practice.unit)+")":""}</label><div class="answer-row"><input id="answer" type="number" step="any" required inputmode="decimal" placeholder="Enter your answer"><button class="primary" type="submit">Check</button></div></form><p id="feedback" class="feedback" role="status" aria-live="polite"></p>
 <button class="hint-button" id="hintbtn" type="button">Need a hint?</button><p id="hinttext" class="hint" hidden></p></section>
 </section>
 <div class="lesson-end"><button type="button" id="markdone" aria-pressed="${completed.has(l.id)?"true":"false"}">${completed.has(l.id)?"✓ Marked complete":"○ Mark complete"}</button>${l.subject==="physics"?'<a href="lab/motion.html">Motion Lab ↗</a>':""}<a class="next-link" href="${end}">${next?"Next concept →":"All "+subject(l.subject)+" lessons →"}</a></div>
 </article>`;
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
 function paintStep(){document.querySelector("#stepcount").textContent=`Step ${step+1} of ${st.length}`;document.querySelector("#steptext").textContent=st[step];document.querySelector("#prev").disabled=step===0;document.querySelector("#next").disabled=step===st.length-1;}
 document.querySelector("#prev").onclick=()=>{step=Math.max(0,step-1);paintStep();};
 document.querySelector("#next").onclick=()=>{step=Math.min(st.length-1,step+1);paintStep();};
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