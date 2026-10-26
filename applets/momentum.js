"use strict";
/* Original 1D impulse and isolated-collision instructional models.
   No force waveform integration, contact deformation or continuous solver. */
function impulsePulseState(mass,force,duration,initialVelocity){
 const m=Number(mass),F=Number(force),dt=Number(duration),u=Number(initialVelocity);
 const initialMomentum=m*u,impulse=F*dt,finalMomentum=initialMomentum+impulse;
 return {initialMomentum,impulse,finalMomentum,initialVelocity:u,finalVelocity:finalMomentum/m,
  velocityChange:impulse/m,force:F,duration:dt,mass:m};
}
function momentumCollisionState(massA,massB,velocityA,velocityB,kind){
 const a=Number(massA),b=Number(massB),u=Number(velocityA),v=Number(velocityB);
 if(!(a>0&&b>0&&u>v))throw new Error("Two positive masses must approach with A faster than B.");
 if(!["stick","elastic"].includes(kind))throw new Error("Unsupported ideal collision mode");
 const beforeA=a*u,beforeB=b*v,p0=beforeA+beforeB;
 const k0=.5*a*u*u+.5*b*v*v;
 let afterU,afterV;
 if(kind==="stick"){afterU=p0/(a+b);afterV=afterU;}
 else{
  afterU=((a-b)*u+2*b*v)/(a+b);
  afterV=(2*a*u+(b-a)*v)/(a+b);
 }
 const afterA=a*afterU,afterB=b*afterV,p1=afterA+afterB;
 const k1=.5*a*afterU*afterU+.5*b*afterV*afterV;
 const transferred=Math.max(0,k0-k1);
 return {beforeA,beforeB,totalBefore:p0,afterA,afterB,totalAfter:p1,
  velocityAfterA:afterU,velocityAfterB:afterV,kineticBefore:k0,kineticAfter:k1,
  nonmechanicalTransfer:transferred,momentumResidual:p1-p0,kind};
}
function impulsePulse(el){
 el.innerHTML=`<div class="diagram-head"><strong>Impulse as signed area under a force pulse</strong><span class="pill">Chapter 9 · Newton's second law over time</span></div>
 <svg viewBox="0 0 600 280" role="img" aria-label="A force versus time graph showing a constant signed force pulse, with area representing change in momentum.">
  <path d="M48 145H570M75 22V253" fill="none" stroke="#87979e" stroke-width="2"/>
  <text x="10" y="26" font-size="15" fill="currentColor">F (N)</text>
  <text x="530" y="270" font-size="15" fill="currentColor">t (s)</text>
  <text x="53" y="138" font-size="13" fill="currentColor">0</text>
  <path d="M75 70H565M75 220H565" stroke="#d8ded9" stroke-dasharray="4 6"/>
  <g id="ip-plot"></g>
  <text x="410" y="32" font-size="14" fill="#756b5e">Signed area = Δp</text>
 </svg>
 <div class="controls">
  <label>Cart mass <output id="ip-mass-value"></output><input id="ip-mass" type="range" min="1" max="8" step="1" value="3"></label>
  <label>Constant net force <output id="ip-force-value"></output><input id="ip-force" type="range" min="-24" max="24" step=".25" value="12"></label>
  <label>Force duration <output id="ip-duration-value"></output><input id="ip-duration" type="range" min=".5" max="6" step=".5" value="2"></label>
  <label>Initial velocity <output id="ip-velocity-value"></output><input id="ip-velocity" type="range" min="-8" max="8" step="1" value="1"></label>
 </div>
 <div class="applet-actions"><button type="button" id="ip-same">Same impulse · half force</button><button type="button" id="ip-reset">Reset force pulse</button></div>
 <div class="readout">
  <div class="metric"><small>Initial momentum · mu</small><strong id="ip-initial"></strong></div>
  <div class="metric"><small>Signed impulse · FΔt</small><strong id="ip-impulse"></strong></div>
  <div class="metric"><small>Final momentum · pi + J</small><strong id="ip-final"></strong></div>
  <div class="metric"><small>Velocity change · J/m</small><strong id="ip-change"></strong></div>
  <div class="metric"><small>Final signed velocity</small><strong id="ip-vfinal"></strong></div>
 </div>
 <p class="note">One-dimensional cart, right positive, under one constant NET force during the selected interval; no other external forces or drag. Momentum and impulse are signed. The shaded rectangle's area represents FΔt, including negative area below the axis. A force of zero gives zero impulse. This predicts the velocity change, not a collision's detailed contact-force history.</p>`;
 const get=id=>el.querySelector("#"+id),mass=get("ip-mass"),force=get("ip-force"),duration=get("ip-duration"),velocity=get("ip-velocity");
 function paint(){
  const q=impulsePulseState(mass.value,force.value,duration.value,velocity.value);
  const end=75+Number(duration.value)/6*475,y=145-Number(force.value)/24*85,yy=Math.min(145,y),height=Math.abs(y-145);
  const positive=q.impulse>=0,fill=positive?"#14727a":"#b77a3a";
  get("ip-plot").innerHTML=`<rect x="75" y="${f(yy)}" width="${f(end-75)}" height="${f(height)}" fill="${fill}" opacity=".28"/>
  <path d="M75 145V${f(y)}H${f(end)}V145" fill="none" stroke="${fill}" stroke-width="3"/>
  <text x="${f(75+(end-75)/2)}" y="${f(positive?Math.max(92,y-13):Math.min(239,y+21))}" text-anchor="middle" font-size="15" fill="${fill}">${q.impulse>0?"+":""}${f(q.impulse)} N·s</text>
  <text x="${f(end)}" y="163" text-anchor="middle" font-size="13" fill="currentColor">${duration.value} s</text>`;
  get("ip-mass-value").textContent=mass.value+" kg";
  get("ip-force-value").textContent=(q.force>0?"+":"")+f(q.force)+" N";
  get("ip-duration-value").textContent=duration.value+" s";
  get("ip-velocity-value").textContent=(q.initialVelocity>0?"+":"")+f(q.initialVelocity)+" m/s";
  get("ip-initial").textContent=f(q.initialMomentum)+" kg·m/s";
  get("ip-impulse").textContent=(q.impulse>0?"+":"")+f(q.impulse)+" N·s";
  get("ip-final").textContent=f(q.finalMomentum)+" kg·m/s";
  get("ip-change").textContent=f(q.velocityChange)+" m/s";
  get("ip-vfinal").textContent=f(q.finalVelocity)+" m/s";
  const valid=Number(duration.value)*2<=6&&Number(force.value)/2>=-24;
  get("ip-same").disabled=!valid;
 }
 for(const x of [mass,force,duration,velocity])x.oninput=paint;
 get("ip-same").onclick=()=>{if(Number(duration.value)*2>6)return;force.value=String(Number(force.value)/2);duration.value=String(Number(duration.value)*2);paint();};
 get("ip-reset").onclick=()=>{mass.value="3";force.value="12";duration.value="2";velocity.value="1";paint();};
 paint();
}
function momentumCollision(el){
 el.innerHTML=`<div class="diagram-head"><strong>Two carts, one isolated system</strong><span class="pill" id="co-stage-label">Before collision</span></div>
 <svg viewBox="0 0 620 298" role="img" aria-label="Two carts on a horizontal track. Signed arrow directions and the outcome change when students reveal the ideal collision.">
  <path d="M32 207H587" stroke="#a5a098" stroke-width="3"/><path d="M32 228H587" stroke="#d4cbbd" stroke-width="2"/>
  <path d="M32 207V232M587 207V232" stroke="#a5a098" stroke-width="2"/>
  <g id="co-carts"></g>
  <text x="35" y="24" font-size="14" fill="currentColor">Right is positive (+); left is negative (−).</text>
  <text x="35" y="278" font-size="13" fill="currentColor">The position drawing is schematic; arrow signs and numbers control interpretation.</text>
 </svg>
 <div class="controls">
 <label>Cart A mass <output id="co-mass-a-value"></output><input id="co-mass-a" type="range" min="1" max="8" step="1" value="2"></label>
 <label>Cart A incoming velocity <output id="co-vel-a-value"></output><input id="co-vel-a" type="range" min="2" max="8" step="1" value="4"></label>
 <label>Cart B mass <output id="co-mass-b-value"></output><input id="co-mass-b" type="range" min="1" max="8" step="1" value="3"></label>
 <label>Cart B incoming velocity <output id="co-vel-b-value"></output><input id="co-vel-b" type="range" min="-5" max="1" step="1" value="-2"></label>
 <label>Ideal interaction <select id="co-mode"><option value="stick">Stick together</option><option value="elastic">Perfectly elastic bounce</option></select></label>
 </div>
 <div class="applet-actions"><button type="button" id="co-reveal" aria-pressed="false">Reveal collision outcome</button><button type="button" id="co-compare">Switch collision type</button><button type="button" id="co-reset">Reset carts</button></div>
 <div class="readout">
 <div class="metric"><small>Cart A momentum before</small><strong id="co-pa-before"></strong></div>
 <div class="metric"><small>Cart B momentum before</small><strong id="co-pb-before"></strong></div>
 <div class="metric"><small>Total momentum before</small><strong id="co-p-before"></strong></div>
 <div class="metric"><small>Total momentum after</small><strong id="co-p-after"></strong></div>
 <div class="metric"><small>Final signed velocity, A</small><strong id="co-va-after"></strong></div>
 <div class="metric"><small>Final signed velocity, B</small><strong id="co-vb-after"></strong></div>
 <div class="metric"><small>Kinetic energy before</small><strong id="co-k-before"></strong></div>
 <div class="metric"><small>Kinetic energy after</small><strong id="co-k-after"></strong></div>
 <div class="metric"><small>Mechanical energy transferred in collision</small><strong id="co-k-change"></strong></div>
 </div>
 <p class="note">Idealized instantaneous 1D collision of two carts in an isolated horizontal system, with negligible external impulse and positive masses. Cart A is to the left and always approaches cart B: initial vA 2–8 m/s, initial vB −5 to +1 m/s. 'Stick' means perfectly inelastic common final velocity; 'elastic' means momentum AND translational kinetic energy are conserved. In sticking events the kinetic-energy reduction is transferred to deformation, sound, thermal and other forms, not destroyed. No collision duration, contact-force shape, air drag, cart rotation or track friction is modeled. The drawn arrows are schematic. Energy detail previews Chapters 10–11 and is not required for the core momentum problems.</p>`;
 const get=id=>el.querySelector("#"+id);
 const ma=get("co-mass-a"),mb=get("co-mass-b"),va=get("co-vel-a"),vb=get("co-vel-b"),mode=get("co-mode"),reveal=get("co-reveal");
 let shown=false;
 const signed=(n,unit)=>(n>1e-9?"+":"")+f(n)+" "+unit;
 function cart(cx,label,color,speed,weight){
  const length=Math.min(70,Math.abs(speed)*8),x2=cx+(speed>=0?length:-length);
  return `<g><rect x="${cx-36}" y="147" width="72" height="42" rx="5" fill="${color}" stroke="#eee9dd" stroke-width="2"/>
   <circle cx="${cx-23}" cy="197" r="8" fill="#47535d"/><circle cx="${cx+23}" cy="197" r="8" fill="#47535d"/>
   <text x="${cx}" y="175" text-anchor="middle" font-size="18" fill="#fff">${label}</text>
   <text x="${cx}" y="127" text-anchor="middle" font-size="15" fill="currentColor">${weight} kg</text>
   ${length>0?`<path d="M${cx} 104H${f(x2)}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
   <path d="M${f(x2-(speed>=0?8:-8))} 98L${f(x2)} 104L${f(x2-(speed>=0?8:-8))} 110" stroke="${color}" stroke-width="2.5" fill="none"/>`:""}
   <text x="${cx}" y="81" text-anchor="middle" font-size="15" fill="currentColor">${signed(speed,"m/s")}</text></g>`;
 }
 function paint(){
  const q=momentumCollisionState(ma.value,mb.value,va.value,vb.value,mode.value);
  get("co-mass-a-value").textContent=ma.value+" kg";
  get("co-mass-b-value").textContent=mb.value+" kg";
  get("co-vel-a-value").textContent=signed(Number(va.value),"m/s");
  get("co-vel-b-value").textContent=signed(Number(vb.value),"m/s");
  get("co-pa-before").textContent=signed(q.beforeA,"kg·m/s");
  get("co-pb-before").textContent=signed(q.beforeB,"kg·m/s");
  get("co-p-before").textContent=signed(q.totalBefore,"kg·m/s");
  const placeholder="Predict, then reveal";
  get("co-p-after").textContent=shown?signed(q.totalAfter,"kg·m/s"):placeholder;
  get("co-va-after").textContent=shown?signed(q.velocityAfterA,"m/s"):placeholder;
  get("co-vb-after").textContent=shown?signed(q.velocityAfterB,"m/s"):placeholder;
  get("co-k-before").textContent=f(q.kineticBefore)+" J";
  get("co-k-after").textContent=shown?f(q.kineticAfter)+" J":placeholder;
  get("co-k-change").textContent=shown?f(q.nonmechanicalTransfer)+" J":placeholder;
  get("co-stage-label").textContent=shown?"After collision":"Before collision";
  reveal.textContent=shown?"Show incoming carts":"Reveal collision outcome";
  reveal.setAttribute("aria-pressed",String(shown));
  if(!shown)get("co-carts").innerHTML=cart(170,"A","#365b7a",Number(va.value),ma.value)+cart(450,"B","#b67a3f",Number(vb.value),mb.value);
  else if(mode.value==="stick"){
    const middle=(Number(ma.value)+Number(mb.value));
    const common=q.velocityAfterA;
    get("co-carts").innerHTML=`<g><rect x="219" y="147" width="180" height="42" rx="5" fill="#54787e" stroke="#fff3e1" stroke-width="2"/>
    <circle cx="246" cy="197" r="8" fill="#47535d"/><circle cx="372" cy="197" r="8" fill="#47535d"/>
    <text x="309" y="174" text-anchor="middle" font-size="17" fill="#fff">A + B</text>
    <text x="309" y="127" text-anchor="middle" font-size="15" fill="currentColor">${middle} kg together</text>
    <text x="309" y="84" text-anchor="middle" font-size="17" fill="currentColor">${signed(common,"m/s")}</text></g>`;
  } else get("co-carts").innerHTML=cart(170,"A","#365b7a",q.velocityAfterA,ma.value)+cart(450,"B","#b67a3f",q.velocityAfterB,mb.value);
 }
 for(const x of [ma,mb,va,vb])x.oninput=()=>{shown=false;paint();};
 mode.onchange=()=>{shown=false;paint();};
 reveal.onclick=()=>{shown=!shown;paint();};
 get("co-compare").onclick=()=>{mode.value=mode.value==="stick"?"elastic":"stick";shown=false;paint();};
 get("co-reset").onclick=()=>{ma.value="2";mb.value="3";va.value="4";vb.value="-2";mode.value="stick";shown=false;paint();};
 paint();
}
