"use strict";
/* Independent original idealized models. Dynamic values are arithmetic
   consequences of Newton's laws, not preselected drawings. No external assets. */
function frictionThreshold(el){
 el.innerHTML=`<div class="diagram-head"><strong>Pull a crate across a level floor</strong><span class="pill" id="fr-state"></span></div>
 <svg viewBox="0 0 560 310" role="img" aria-label="Crate on level ground. Applied pull, static or kinetic friction, normal force and weight are drawn schematically. Numerical values are below.">
  <defs><marker id="fr-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7" fill="none" stroke="context-stroke" stroke-width="1.5"/></marker></defs>
  <path d="M32 219H525" stroke="#aa9778" stroke-width="4"/>
  <path d="M32 232H525" stroke="#e9dfcc" stroke-width="22" stroke-dasharray="5 5"/>
  <rect x="230" y="145" width="96" height="72" rx="6" fill="#d9b58c" stroke="#8c644a" stroke-width="2"/>
  <text x="278" y="185" text-anchor="middle" font-size="17" fill="#654832">crate</text>
  <g id="fr-arrows"></g><text x="31" y="288" font-size="14" fill="#716a62">Force arrows are schematic, not to scale.</text>
 </svg>
 <div class="controls">
  <label>Horizontal pull <output id="fr-pull-value"></output><input id="fr-pull" type="range" min="0" max="80" step="1" value="20"></label>
  <label>Crate mass <output id="fr-mass-value"></output><input id="fr-mass" type="range" min="1" max="10" step="1" value="5"></label>
  <label>Static coefficient μₛ <output id="fr-static-value"></output><input id="fr-static" type="range" min="0" max="0.9" step=".05" value=".5"></label>
  <label>Kinetic coefficient μₖ <output id="fr-kinetic-value"></output><input id="fr-kinetic" type="range" min="0" max=".7" step=".05" value=".3"></label>
 </div>
 <div class="applet-actions"><button type="button" id="fr-reset">Reset</button><button type="button" id="fr-threshold">Find slip threshold</button></div>
 <div class="readout">
  <div class="metric"><small>Actual friction</small><strong id="fr-friction"></strong></div>
  <div class="metric"><small>Maximum static friction</small><strong id="fr-max"></strong></div>
  <div class="metric"><small>Acceleration</small><strong id="fr-accel"></strong></div>
 </div>
 <p class="note">Instantaneous model for a crate <em>initially at rest</em> under a steady rightward pull. Static friction matches the pull only up to μₛN; after slipping begins, rightward motion experiences kinetic friction μₖN. This does not simulate coasting or a subsequent change in pull. Coefficients satisfy μₖ ≤ μₛ.</p>`;
 const input=id=>el.querySelector("#"+id);
 const pull=input("fr-pull"),mass=input("fr-mass"),s=input("fr-static"),k=input("fr-kinetic");
 const out=(id,text)=>{input(id).textContent=text;};
 function paint(){
  const applied=Number(pull.value),m=Number(mass.value),muS=Number(s.value);
  if(Number(k.value)>muS)k.value=s.value;
  const muK=Number(k.value),N=9.8*m,max=muS*N,slips=applied>max+1e-9;
  const actual=slips?muK*N:applied,accel=slips?(applied-actual)/m:0;
  const right=applied?`<path d="M326 177H${(326+Math.min(116,applied*2)).toFixed(2)}" stroke="#b6813b" stroke-width="4" marker-end="url(#fr-arrow)"/>`:"";
  const left=actual?`<path d="M230 177H${(230-Math.min(116,actual*2)).toFixed(2)}" stroke="#14727a" stroke-width="4" marker-end="url(#fr-arrow)"/>`:"";
  input("fr-arrows").innerHTML=`${right}${left}
   <path d="M278 145V82" stroke="#348b69" stroke-width="4" marker-end="url(#fr-arrow)"/>
   <path d="M278 217V267" stroke="#384e72" stroke-width="4" marker-end="url(#fr-arrow)"/>
   <text x="400" y="156" font-size="16" fill="#9a6a31">applied</text>
   <text x="90" y="156" font-size="16" fill="#146775">friction</text>
   <text x="295" y="85" font-size="15" fill="#277751">N</text><text x="298" y="270" font-size="15" fill="#384e72">mg</text>`;
  out("fr-state",slips?"Sliding · kinetic":"At rest · static");
  out("fr-pull-value",applied+" N");out("fr-mass-value",m+" kg");
  out("fr-static-value",muS.toFixed(2));out("fr-kinetic-value",muK.toFixed(2));
  out("fr-friction",f(actual)+" N "+(slips?"kinetic":"static"));
  out("fr-max",f(max)+" N");out("fr-accel",f(accel)+" m/s²");
 }
 for(const x of [pull,mass,s,k])x.oninput=paint;
 input("fr-reset").onclick=()=>{pull.value="20";mass.value="5";s.value=".5";k.value=".3";paint();};
 input("fr-threshold").onclick=()=>{pull.value=String(Math.min(80,Math.floor(Number(s.value)*Number(mass.value)*9.8)+1));paint();};
 paint();
}
function inclineFriction(el){
 el.innerHTML=`<div class="diagram-head"><strong>Gravity acting on an adjustable incline</strong><span class="pill" id="inc-state"></span></div>
 <svg viewBox="0 0 560 380" role="img" aria-label="Schematic tilted ramp and block with weight, normal, downslope component, and friction directions. Exact forces and acceleration below.">
  <path d="M40 324H524" stroke="#b8a68c" stroke-width="2"/><g id="inc-plot"></g>
  <text x="25" y="359" fill="#73695e" font-size="13">Arrows show direction, not a shared magnitude scale.</text>
 </svg>
 <div class="controls">
  <label>Ramp angle <output id="inc-angle-value"></output><input id="inc-angle" type="range" min="0" max="50" step="1" value="20"></label>
  <label>Mass <output id="inc-mass-value"></output><input id="inc-mass" type="range" min="1" max="10" step="1" value="4"></label>
  <label>Static coefficient μₛ <output id="inc-static-value"></output><input id="inc-static" type="range" min="0" max=".9" step=".05" value=".5"></label>
  <label>Kinetic coefficient μₖ <output id="inc-kinetic-value"></output><input id="inc-kinetic" type="range" min="0" max=".7" step=".05" value=".3"></label>
 </div>
 <div class="applet-actions"><button type="button" id="inc-reset">Reset ramp</button><button type="button" id="inc-critical">Find first sliding angle</button></div>
 <div class="readout">
  <div class="metric"><small>Gravity downhill · mg sinθ</small><strong id="inc-down"></strong></div>
  <div class="metric"><small>Normal force · mg cosθ</small><strong id="inc-normal"></strong></div>
  <div class="metric"><small>Actual friction uphill</small><strong id="inc-friction"></strong></div>
  <div class="metric"><small>Maximum static friction</small><strong id="inc-max"></strong></div>
  <div class="metric"><small>Downslope acceleration</small><strong id="inc-accel"></strong></div>
  <div class="metric"><small>Critical angle · arctanμₛ</small><strong id="inc-critical-read"></strong></div>
 </div>
 <p class="note">Ideal release <em>from rest</em>, with no extra forces, uniform gravity and a straight incline. At rest, static friction balances the component of gravity downhill, only up to μₛN. Once sliding begins, kinetic friction opposes downslope motion. Mass cancels from the critical-angle condition. The diagram is schematic and μₖ ≤ μₛ.</p>`;
 const input=id=>el.querySelector("#"+id),out=(id,value)=>{input(id).textContent=value;};
 const angle=input("inc-angle"),mass=input("inc-mass"),s=input("inc-static"),k=input("inc-kinetic");
 function paint(){
  const degrees=Number(angle.value),rad=degrees*Math.PI/180,c=Math.cos(rad),sn=Math.sin(rad);
  const m=Number(mass.value),muS=Number(s.value);
  if(Number(k.value)>muS)k.value=s.value;
  const muK=Number(k.value),N=m*9.8*c,down=m*9.8*sn,max=muS*N;
  const slips=down>max+1e-9,fr=slips?muK*N:down,a=slips?(down-fr)/m:0;
  const x0=110,y0=322,x1=x0+270*c,y1=y0-270*sn;
  const bx=x0+145*c-17*sn,by=y0-145*sn-17*c;
  const arrow=(dx,dy,len,color,name)=>{
   const x=bx+dx*len,y=by+dy*len;
   return `<path d="M${f(bx)} ${f(by)}L${f(x)} ${f(y)}" stroke="${color}" stroke-width="3.7" stroke-linecap="round"/><circle cx="${f(x)}" cy="${f(y)}" r="3" fill="${color}"/><text x="${f(x+9)}" y="${f(y-6)}" font-size="13" fill="${color}">${name}</text>`;
  };
  input("inc-plot").innerHTML=`<path d="M${x0} ${y0}L${f(x1)} ${f(y1)}L${f(x1)} ${y0}Z" stroke="#a48b63" stroke-width="2" fill="#eee0c9"/>
   <text x="${x0+29}" y="${y0-12}" fill="#896b43" font-size="16">${degrees}°</text>
   <rect x="${f(bx-22)}" y="${f(by-16)}" width="44" height="32" rx="4" transform="rotate(${-degrees} ${f(bx)} ${f(by)})" fill="#a9c4d3" stroke="#365272" stroke-width="2"/>
   ${down>.01?arrow(-c,sn,Math.min(69,24+down),"#b98441","down"):""}
   ${fr>.01?arrow(c,-sn,Math.min(69,24+fr),"#14727a","friction"):""}
   ${arrow(-sn,-c,72,"#30866a","N")}
   ${arrow(0,1,75,"#344a6b","mg")}`;
  out("inc-state",slips?"Sliding down · kinetic":"At rest · static");
  out("inc-angle-value",degrees+"°");out("inc-mass-value",m+" kg");
  out("inc-static-value",muS.toFixed(2));out("inc-kinetic-value",muK.toFixed(2));
  out("inc-down",f(down)+" N");out("inc-normal",f(N)+" N");
  out("inc-friction",f(fr)+" N "+(slips?"kinetic":"static"));
  out("inc-max",f(max)+" N");out("inc-accel",f(a)+" m/s²");
  out("inc-critical-read",f(Math.atan(muS)*180/Math.PI)+"°");
 }
 for(const x of [angle,mass,s,k])x.oninput=paint;
 input("inc-reset").onclick=()=>{angle.value="20";mass.value="4";s.value=".5";k.value=".3";paint();};
 input("inc-critical").onclick=()=>{angle.value=String(Math.min(50,Math.floor(Math.atan(Number(s.value))*180/Math.PI)+1));paint();};
 paint();
}
