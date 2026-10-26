"use strict";
/* Original two-sided derivative laboratory. Pure mathematics, no artificial units:
   f(x)=x², finite nonzero secants, and a separately defined limit. */
const tangentMagnitudes=Object.freeze([1,.5,.25,.125,.0625]);
function derivativeSecantState(a,magnitude,side){
 const x=Number(a),size=Number(magnitude);
 if(!Number.isFinite(x)||!Number.isFinite(size)||size<=0||!["left","right"].includes(side))
  throw new RangeError("The secant requires a finite point and positive nonzero spacing.");
 const h=side==="left"?-size:size;
 const y0=x*x,y1=(x+h)*(x+h),rise=y1-y0,run=h;
 const secant=rise/run,derivative=2*x,algebraic=2*x+h;
 return {a:x,h,magnitude:size,side,x1:x+h,y0,y1,rise,run,secant,derivative,algebraic,error:secant-derivative};
}
function tangentLab(el){
 const number=n=>Number(n.toFixed(5)).toString(),signed=n=>(n>0?"+":"")+number(n);
 el.innerHTML=`<div class="tangent-lab">
 <div class="diagram-head"><strong>Approach one point from both sides</strong><span class="pill calculus">A limit, not a zero-width secant</span></div>
 <p class="tan-intro">Choose the fixed point <strong>A</strong>. Move a second point <strong>B</strong> closer from the right or the left. Does the slope approach the same number?</p>
 <div class="tan-directions" role="group" aria-label="Choose the side from which the second point approaches">
  <button type="button" id="tan-right" aria-pressed="true">Approach from right (h &gt; 0)</button>
  <button type="button" id="tan-left" aria-pressed="false">Approach from left (h &lt; 0)</button>
 </div>
 <div class="tan-plot-scroll" role="region" aria-label="Scroll horizontally to inspect the coordinate graph" tabindex="0">
  <svg viewBox="0 0 560 350" role="img" aria-label="Parabola f of x equals x squared, a solid secant joining two distinct points, a dashed tangent and a rise-run triangle. Numerical and spoken evidence appears below.">
   <defs><clipPath id="tan-clip"><rect x="46" y="30" width="470" height="266"/></clipPath></defs>
   <rect x="0" y="0" width="560" height="350" fill="#f8faf9"/>
   <g id="tan-grid"></g><g clip-path="url(#tan-clip)" id="tan-lines"></g><g id="tan-points"></g>
  </svg>
 </div>
 <div class="tan-line-legend" aria-label="Line key"><span><i class="tan-key curve"></i> f(x) = x²</span><span><i class="tan-key secant"></i> Secant through A and B</span><span><i class="tan-key tangent"></i> Tangent at A</span></div>
 <div class="controls">
  <label>Fixed point a <output id="av"></output><input id="point" type="range" min="-1.4" max="1.4" step=".1" value="1"></label>
  <label>Separation magnitude |h| <output id="hv"></output><input id="gap" type="range" min="0" max="4" step="1" value="0"></label>
 </div>
 <div class="applet-actions"><button type="button" id="tan-step">Bring B closer</button><button type="button" id="tan-reset">Reset both approaches</button></div>
 <div class="readout tan-readouts">
  <div class="metric"><small>Signed horizontal change h</small><strong id="tan-run"></strong></div>
  <div class="metric"><small>Vertical change Δf</small><strong id="tan-rise"></strong></div>
  <div class="metric"><small>Secant slope Δf/h</small><strong id="sec"></strong></div>
  <div class="metric"><small>Limiting tangent slope 2a</small><strong id="tan"></strong></div>
  <div class="metric"><small>Signed slope difference</small><strong id="tan-error"></strong></div>
 </div>
 <div class="tan-convergence">
  <h3>Two paths toward the same slope</h3>
  <p>Keep a fixed. Compare secants from x=a−|h| and x=a+|h|. As |h| shrinks, both columns approach 2a.</p>
  <div class="tan-table-scroll"><table class="tan-table"><caption>Secant slopes approaching x = a from either side</caption>
  <thead><tr><th scope="col">Distance |h|</th><th scope="col">Left slope (h &lt; 0)</th><th scope="col">Right slope (h &gt; 0)</th></tr></thead>
  <tbody id="tan-table-body"></tbody></table></div>
  <p class="tan-limit-note">At <strong>h = 0</strong>, the difference quotient has denominator zero and is <strong>undefined</strong>. The derivative is the shared <em>limit</em> of these secant slopes, not the value of that quotient at h = 0.</p>
 </div>
 <p class="note">Exact quadratic model f(x) = x², with dimensionless x and f(x), so slopes have no physical units. The solid secant uses h ≠ 0. The dashed tangent shows the limiting slope at A. The graph is to scale in the plotted coordinate axes; zoomed or nearly coincident points can be read precisely from the numeric evidence. On narrow phones the graph scrolls within its own frame.</p>
 </div>`;
 const point=el.querySelector("#point"),gap=el.querySelector("#gap"),left=el.querySelector("#tan-left"),right=el.querySelector("#tan-right");
 let side="right";
 const X=x=>280+92*x,Y=y=>296-40*y;
 const grid=()=>`<g fill="none" stroke="#d9e5df" stroke-width="1">${[-2,-1,0,1,2].map(x=>`<path d="M${X(x)} 32V296"/>`).join("")}${[0,2,4,6].map(y=>`<path d="M47 ${Y(y)}H517"/>`).join("")}</g>
 <path d="M46 296H519M280 30V315" stroke="#506b68" stroke-width="2"/>
 ${[-2,-1,0,1,2].map(x=>`<text x="${X(x)}" y="318" fill="#34535b" font-size="15" text-anchor="middle">${x}</text>`).join("")}
 ${[0,2,4,6].map(y=>`<text x="35" y="${Y(y)+5}" fill="#34535b" font-size="15" text-anchor="end">${y}</text>`).join("")}
 <text x="511" y="334" fill="#34535b" font-size="16" font-weight="700">x</text><text x="289" y="22" fill="#34535b" font-size="16" font-weight="700">f(x)</text>`;
 el.querySelector("#tan-grid").innerHTML=grid();
 function paint(){
  const state=derivativeSecantState(Number(point.value),tangentMagnitudes[Number(gap.value)],side);
  const {a,h,x1,y0,y1,rise,secant,derivative,error}=state;
  const curve=Array.from({length:101},(_,i)=>{const x=-2.5+i*.05;return (i?"L":"M")+X(x).toFixed(2)+" "+Y(x*x).toFixed(2)}).join(" ");
  const path=(slope,intercept,color,dashed)=>`<path d="M${X(-2.6)} ${Y(slope*(-2.6)+intercept)}L${X(2.6)} ${Y(slope*2.6+intercept)}" fill="none" stroke="${color}" stroke-width="3.5" ${dashed?'stroke-dasharray="9 7"':""}/>`;
  el.querySelector("#tan-lines").innerHTML=`<path d="${curve}" fill="none" stroke="#14727a" stroke-width="3.5"/>
   ${path(secant,y0-secant*a,"#ae7434",false)}${path(derivative,y0-derivative*a,"#297458",true)}
   <path d="M${X(a)} ${Y(y0)}H${X(x1)}V${Y(y1)}" fill="none" stroke="#743b54" stroke-width="2.4" stroke-dasharray="5 5"/>`;
  el.querySelector("#tan-points").innerHTML=`<circle cx="${X(a)}" cy="${Y(y0)}" r="6.5" fill="#14727a" stroke="#fff" stroke-width="2"/>
   <circle cx="${X(x1)}" cy="${Y(y1)}" r="6.5" fill="#ae7434" stroke="#fff" stroke-width="2"/>
   <text x="${X(a)-12}" y="${Y(y0)-13}" font-size="16" fill="#14525c" text-anchor="end" font-weight="700">A</text>
   <text x="${X(x1)+12}" y="${Y(y1)+17}" font-size="16" fill="#81502d" font-weight="700">B</text>`;
  const write=(id,value)=>{el.querySelector("#"+id).textContent=value;};
  write("av",number(a));write("hv",number(state.magnitude));
  write("tan-run",signed(h));write("tan-rise",signed(rise));
  write("sec",signed(secant));write("tan",signed(derivative));write("tan-error",signed(error));
  point.setAttribute("aria-valuetext","a equals "+number(a));
  gap.setAttribute("aria-valuetext","absolute separation "+number(state.magnitude)+", signed h "+signed(h));
  left.setAttribute("aria-pressed",String(side==="left"));right.setAttribute("aria-pressed",String(side==="right"));
  el.querySelector("#tan-step").disabled=Number(gap.value)===tangentMagnitudes.length-1;
  el.querySelector("#tan-table-body").innerHTML=tangentMagnitudes.map(m=>`<tr ${state.magnitude===m?'class="tan-selected" aria-current="true"':""}><th scope="row">${number(m)}</th><td>${signed(derivative-m)}</td><td>${signed(derivative+m)}</td></tr>`).join("");
 }
 point.oninput=gap.oninput=paint;
 const switchSide=(value)=>{side=value;paint();el.dispatchEvent(new Event("input",{bubbles:true}));};
 left.onclick=()=>switchSide("left");right.onclick=()=>switchSide("right");
 el.querySelector("#tan-step").onclick=()=>{gap.value=String(Math.min(tangentMagnitudes.length-1,Number(gap.value)+1));paint();el.dispatchEvent(new Event("input",{bubbles:true}));};
 el.querySelector("#tan-reset").onclick=()=>{point.value="1";gap.value="0";side="right";paint();el.dispatchEvent(new Event("input",{bubbles:true}));};
 paint();
}
