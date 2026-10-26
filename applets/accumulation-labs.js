"use strict";
/* Two original Calculus investigations. Pure state functions own ALL visible
   numeric values; graphics, equations and accessible narration share them. */
function velocityAccumulationState(scenario,time,n,endpoint){
 const T=Number(time),count=Number(n);
 if(!["forward","reverse"].includes(scenario)||!Number.isFinite(T)||T<0||T>5||
  !Number.isInteger(count)||count<2||count>24||!["left","right"].includes(endpoint))
  throw new RangeError("Invalid velocity experiment control.");
 const v=t=>scenario==="forward"?3+t:6-2*t;
 const F=t=>scenario==="forward"?3*t+t*t/2:6*t-t*t;
 const width=T/count;
 const rectangles=Array.from({length:count},(_,i)=>{
  const a=i*width,b=(i+1)*width,sample=endpoint==="left"?a:b;
  const height=v(sample),signed=width*height;
  return {a,b,sample,height,signed};
 });
 const estimate=rectangles.reduce((acc,r)=>acc+r.signed,0);
 const exact=F(T);
 const positive=scenario==="reverse"&&T>3?9:exact;
 const negative=scenario==="reverse"&&T>3?exact-9:0;
 const distance=positive-negative;
 return {scenario,T,n:count,endpoint,v0:v(0),vEnd:v(T),width,rectangles,
  estimate,exact,error:estimate-exact,positive,negative,distance,turn:scenario==="reverse"?3:null};
}
function riemannLinearState(n,method){
 const count=Number(n);
 if(!Number.isInteger(count)||count<2||count>32||!["left","midpoint","right"].includes(method))
  throw new RangeError("Invalid Riemann experiment control.");
 const width=4/count,alpha=method==="left"?0:method==="right"?1:.5;
 const rectangles=Array.from({length:count},(_,i)=>{
  const a=i*width,b=(i+1)*width,sample=(i+alpha)*width;
  return {a,b,sample,height:sample,area:sample*width};
 });
 const sum=rectangles.reduce((acc,r)=>acc+r.area,0);
 return {n:count,method,width,rectangles,sum,exact:8,error:sum-8,
  left:8-8/count,right:8+8/count,midpoint:8};
}
const accumulateNumber=n=>String(Number(n.toFixed(4)));
function velocityAccumulationLab(el){
 const number=accumulateNumber;
 el.innerHTML=`<div class="accumulation-lab">
 <div class="diagram-head"><strong>Signed area is change in position</strong><span class="pill calculus">Motion · accumulation</span></div>
 <p class="accumulation-intro">Predict whether moving backward subtracts displacement. Compare the area above and below zero, then use rectangles to estimate the same signed result.</p>
 <div class="accumulation-modes" role="group" aria-label="Velocity model">
  <button type="button" id="area-forward" aria-pressed="true">Forward: v(t) = 3 + t</button>
  <button type="button" id="area-reverse" aria-pressed="false">Reversing: v(t) = 6 − 2t</button>
 </div>
 <div class="accumulation-plot" role="region" tabindex="0" aria-label="Scrollable velocity-time graph">
  <svg viewBox="0 0 560 360" role="img" aria-label="Velocity against time with shaded positive and negative signed regions, left or right endpoint rectangles and an end-time marker. Detailed text evidence follows.">
   <rect width="560" height="360" fill="#f8fbf9"/>
   <defs><clipPath id="area-clip"><rect x="74" y="32" width="432" height="288"/></clipPath></defs>
   <g id="area-grid"></g><g clip-path="url(#area-clip)" id="area-regions"></g><g clip-path="url(#area-clip)" id="area-rectangles"></g><g id="area-lines"></g>
  </svg>
 </div>
 <div class="accumulation-legend"><span><i class="accumulation-key positive"></i>Forward, positive signed area</span><span><i class="accumulation-key negative"></i>Backward, negative signed area</span><span><i class="accumulation-key rectangles"></i>Rectangle estimates</span></div>
 <div class="controls">
  <label>End time <output id="area-time"></output><input type="range" id="area-slider" min="0" max="5" step=".25" value="2"></label>
  <label>Equal-width rectangles <output id="area-count"></output><input type="range" id="area-n" min="2" max="24" step="1" value="4"></label>
 </div>
 <div class="accumulation-modes" role="group" aria-label="Sampling point for each rectangle">
  <button type="button" id="area-left" aria-pressed="true">Left endpoints</button>
  <button type="button" id="area-right" aria-pressed="false">Right endpoints</button>
 </div>
 <div class="readout accumulation-readouts">
  <div class="metric"><small>Velocity at end</small><strong id="area-vel"></strong></div>
  <div class="metric"><small>Positive area</small><strong id="area-positive"></strong></div>
  <div class="metric"><small>Negative signed area</small><strong id="area-negative"></strong></div>
  <div class="metric"><small>Exact displacement</small><strong id="area-dis"></strong></div>
  <div class="metric"><small>Total distance</small><strong id="area-distance"></strong></div>
  <div class="metric"><small>Rectangle displacement estimate</small><strong id="area-approx"></strong></div>
  <div class="metric"><small>Signed approximation error</small><strong id="area-error"></strong></div>
 </div>
 <p class="accumulation-callout" id="area-lesson-note"></p>
 <p class="note">A modeled straight-line velocity, measured in m/s, over seconds. The signed integral measures net displacement; distance counts both forward and backward motion positively. Each finite rectangle estimates a local velocity, not a guaranteed exact value. The graph uses labeled horizontal time and vertical velocity scales.</p></div>`;
 const get=id=>el.querySelector("#"+id),time=get("area-slider"),n=get("area-n");
 const X=t=>75+86*t,Y=v=>228-22*v;
 let scenario="forward",endpoint="left";
 const fmt=n=>number(n);
 const ticks=`<g stroke="#dce6e0" stroke-width="1">${[0,1,2,3,4,5].map(t=>`<path d="M${X(t)} 33V320"/>`).join("")}
  ${[-4,-2,0,2,4,6,8].map(v=>`<path d="M75 ${Y(v)}H507"/>`).join("")}</g>
  <path d="M75 32V324M75 228H510" stroke="#415e63" stroke-width="2"/>
  ${[0,1,2,3,4,5].map(t=>`<text x="${X(t)}" y="343" text-anchor="middle" font-size="15" fill="#34545d">${t}</text>`).join("")}
  ${[-4,-2,0,2,4,6,8].map(v=>`<text x="64" y="${Y(v)+5}" text-anchor="end" font-size="15" fill="#34545d">${v}</text>`).join("")}
  <text x="482" y="357" font-size="14" fill="#34545d">t (s)</text><text x="77" y="21" font-size="14" fill="#34545d">v (m/s)</text>`;
 get("area-grid").innerHTML=ticks;
 function paint(){
  const q=velocityAccumulationState(scenario,Number(time.value),Number(n.value),endpoint);
  const positiveEnd=q.scenario==="reverse"?Math.min(q.T,3):q.T;
  const area=(from,to,color)=>to<=from?"":`<path d="M${X(from)} ${Y(0)}L${X(from)} ${Y(q.scenario==="forward"?3+from:6-2*from)}L${X(to)} ${Y(q.scenario==="forward"?3+to:6-2*to)}L${X(to)} ${Y(0)}Z" fill="${color}" opacity=".48"/>`;
  get("area-regions").innerHTML=area(0,positiveEnd,"#71b8ac")+(q.T>3&&scenario==="reverse"?area(3,q.T,"#bf8e78"):"");
  get("area-rectangles").innerHTML=q.rectangles.map(r=>`<rect x="${X(r.a)}" y="${Math.min(Y(0),Y(r.height))}" width="${Math.max(0,X(r.b)-X(r.a))}" height="${Math.abs(Y(r.height)-Y(0))}" fill="${r.height<0?"#b9826e":"#177b80"}" fill-opacity=".17" stroke="${r.height<0?"#985a4a":"#167080"}" stroke-width=".8"/>`).join("");
  const vEnd=q.scenario==="forward"?8:-4;
  const curve=`M${X(0)} ${Y(q.v0)}L${X(5)} ${Y(vEnd)}`;
  get("area-lines").innerHTML=`<path d="${curve}" fill="none" stroke="#195b76" stroke-width="3.2"/>
   <path d="M${X(q.T)} 37V320" stroke="#9e6940" stroke-dasharray="6 5" stroke-width="2"/>
   <circle cx="${X(q.T)}" cy="${Y(q.vEnd)}" r="6" fill="#9e6940" stroke="white" stroke-width="2"/>
   ${scenario==="reverse"?`<circle cx="${X(3)}" cy="${Y(0)}" r="4.5" fill="#7f4852"/><text x="${X(3)+7}" y="${Y(0)+19}" fill="#74424d" font-size="14">v = 0</text>`:""}`;
  const write=(id,t)=>{get(id).textContent=t;};
  write("area-time",fmt(q.T)+" s");write("area-count",String(q.n));
  write("area-vel",fmt(q.vEnd)+" m/s");write("area-positive",fmt(q.positive)+" m");
  write("area-negative",fmt(q.negative)+" m");write("area-dis",fmt(q.exact)+" m");
  write("area-distance",fmt(q.distance)+" m");write("area-approx",fmt(q.estimate)+" m");
  write("area-error",fmt(q.error)+" m");
  write("area-lesson-note",scenario==="reverse"?"The cart reverses at t = 3 s. After this moment, new negative area subtracts from net displacement while adding to total distance.":"Velocity stays positive; displacement and distance are equal. Try the reversing model to distinguish them.");
  time.setAttribute("aria-valuetext",fmt(q.T)+" seconds");
  n.setAttribute("aria-valuetext",q.n+" equal rectangles");
  for(const [id,on] of [["area-forward",scenario==="forward"],["area-reverse",scenario==="reverse"],["area-left",endpoint==="left"],["area-right",endpoint==="right"]])get(id).setAttribute("aria-pressed",String(on));
 }
 function mode(id,fn){get(id).onclick=()=>{fn();paint();time.dispatchEvent(new Event("input",{bubbles:true}));};}
 mode("area-forward",()=>scenario="forward");mode("area-reverse",()=>scenario="reverse");
 mode("area-left",()=>endpoint="left");mode("area-right",()=>endpoint="right");
 time.oninput=n.oninput=paint;paint();
}
function riemannRectangleLab(el){
 const number=accumulateNumber;
 el.innerHTML=`<div class="accumulation-lab riemann-lab">
 <div class="diagram-head"><strong>Which rectangles get the area right?</strong><span class="pill calculus">Riemann sums</span></div>
 <p class="accumulation-intro">The line y = x increases from 0 to 4. Change where each rectangle samples its height; then halve its width. Does the error have a direction?</p>
 <div class="accumulation-modes" role="group" aria-label="Riemann sampling rule">
  <button type="button" id="rm-left" aria-pressed="false">Left endpoints</button>
  <button type="button" id="rm-midpoint" aria-pressed="false">Midpoints</button>
  <button type="button" id="rm-right" aria-pressed="true">Right endpoints</button>
 </div>
 <div class="accumulation-plot" role="region" tabindex="0" aria-label="Scrollable Riemann rectangle graph">
  <svg viewBox="0 0 560 350" role="img" aria-label="Straight-line graph of y equals x from zero to four and adjustable left, right or midpoint rectangles. Calculated values and a convergence table follow.">
   <rect width="560" height="350" fill="#f8fbf9"/>
   <g id="rm-grid"></g><g clip-path="url(#rm-clip)" id="rgraph"></g><g id="rm-outline"></g>
   <defs><clipPath id="rm-clip"><rect x="69" y="32" width="440" height="270"/></clipPath></defs>
  </svg>
 </div>
 <div class="accumulation-legend"><span><i class="accumulation-key positive"></i>True triangular region</span><span><i class="accumulation-key rectangles"></i>Sampled rectangles</span></div>
 <div class="controls">
  <label>Number of rectangles <output id="nv"></output><input id="nslider" type="range" min="2" max="32" step="1" value="4"></label>
 </div>
 <div class="applet-actions"><button type="button" id="rm-refine">Double rectangles</button><button type="button" id="rm-reset">Reset investigation</button></div>
 <div class="readout accumulation-readouts">
  <div class="metric"><small>Partition width Δx</small><strong id="rm-width"></strong></div>
  <div class="metric"><small>Current rectangle sum</small><strong id="sum"></strong></div>
  <div class="metric"><small>Exact integral</small><strong id="rm-exact">8 square units</strong></div>
  <div class="metric"><small>Signed error (sum − exact)</small><strong id="rm-error"></strong></div>
 </div>
 <div class="tan-convergence">
  <h3>Three estimates, one limiting area</h3>
  <p>Because y=x is increasing, left-endpoint sums lie below 8 and right-endpoint sums lie above 8. For a straight line, every midpoint rule already gives exactly 8.</p>
  <div class="tan-table-scroll"><table class="tan-table"><caption>Square-unit sums over [0,4] by equal-width partition</caption>
   <thead><tr><th scope="col">Rectangles n</th><th scope="col">Left</th><th scope="col">Midpoint</th><th scope="col">Right</th></tr></thead>
   <tbody id="rm-convergence"></tbody></table></div>
  <p class="tan-limit-note">Exact triangle: (1/2) × base 4 × height 4 = <strong>8 square units</strong>. For n equal rectangles: left sum = 8 − 8/n, right sum = 8 + 8/n, midpoint sum = 8. As n grows, both endpoint errors approach zero.</p>
 </div>
 <p class="note">This is unsigned geometric area for nonnegative y=x, unlike the preceding velocity lesson's signed displacement. All rectangles have mathematical width 4/n and height y at the selected sample. Do not generalize exact midpoint results for a straight line to arbitrary curved functions.</p>
 </div>`;
 const get=id=>el.querySelector("#"+id),N=get("nslider"),X=x=>70+107*x,Y=y=>302-51*y;
 let method="right";
 get("rm-grid").innerHTML=`<g stroke="#d9e5df" stroke-width="1">${[0,1,2,3,4].map(x=>`<path d="M${X(x)} 33V302"/>`).join("")}${[0,1,2,3,4].map(y=>`<path d="M70 ${Y(y)}H500"/>`).join("")}</g>
 <path d="M70 31V303H505" stroke="#426065" stroke-width="2" fill="none"/>
 ${[0,1,2,3,4].map(x=>`<text x="${X(x)}" y="324" text-anchor="middle" font-size="15" fill="#35545d">${x}</text>`).join("")}
 ${[0,1,2,3,4].map(y=>`<text x="59" y="${Y(y)+5}" text-anchor="end" font-size="15" fill="#35545d">${y}</text>`).join("")}
 <text x="502" y="343" font-size="15" fill="#35545d">x</text><text x="77" y="24" font-size="15" fill="#35545d">y</text>`;
 function paint(){
  const q=riemannLinearState(Number(N.value),method);
  get("rgraph").innerHTML=`<path d="M${X(0)} ${Y(0)}L${X(4)} ${Y(4)}L${X(4)} ${Y(0)}Z" fill="#a7d2c6" opacity=".45"/>
  ${q.rectangles.map(r=>`<rect x="${X(r.a)}" y="${Y(r.height)}" width="${X(r.b)-X(r.a)}" height="${Y(0)-Y(r.height)}" fill="#1b7980" fill-opacity=".13" stroke="#216e79" stroke-width=".9"/>`).join("")}`;
  get("rm-outline").innerHTML=`<path d="M${X(0)} ${Y(0)}L${X(4)} ${Y(4)}" stroke="#a96e35" stroke-width="3.2" fill="none"/>`;
  get("nv").textContent=String(q.n);
  get("rm-width").textContent=number(q.width)+" x-units";
  get("sum").textContent=number(q.sum)+" square units";
  get("rm-error").textContent=(q.error>0?"+":"")+number(q.error)+" square units";
  get("rm-convergence").innerHTML=[2,4,8,16,32].map(count=>{
   const row=riemannLinearState(count,method);
   return `<tr ${q.n===count?'class="tan-selected" aria-current="true"':""}><th scope="row">${count}</th><td>${number(row.left)}</td><td>${number(row.midpoint)}</td><td>${number(row.right)}</td></tr>`;
  }).join("");
  get("rm-refine").disabled=q.n===32;
  N.setAttribute("aria-valuetext",q.n+" rectangles using "+(method==="midpoint"?"midpoint":"the "+method+" endpoint")+" sampling");
  for(const item of ["left","midpoint","right"])get("rm-"+item).setAttribute("aria-pressed",String(method===item));
 }
 for(const item of ["left","midpoint","right"]){get("rm-"+item).onclick=()=>{method=item;paint();N.dispatchEvent(new Event("input",{bubbles:true}));};}
 get("rm-refine").onclick=()=>{N.value=String(Math.min(32,Number(N.value)*2));paint();N.dispatchEvent(new Event("input",{bubbles:true}));};
 get("rm-reset").onclick=()=>{N.value="4";method="right";paint();N.dispatchEvent(new Event("input",{bubbles:true}));};
 N.oninput=paint;paint();
}
