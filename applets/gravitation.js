"use strict";
/* Original Newtonian two-body teaching model; spherical primary, negligible
   satellite mass, center-to-center distance measured in Earth radii. */
const GRAVITY_G=6.67430e-11;
const GRAVITY_M_EARTH=5.9722e24;
const GRAVITY_R_EARTH=6.371e6;
function gravityState(primaryEarthMass, testMass, radii){
 const centralMass=Number(primaryEarthMass)*GRAVITY_M_EARTH;
 const test=Number(testMass),r=Number(radii)*GRAVITY_R_EARTH;
 const g=GRAVITY_G*centralMass/(r*r);
 const force=g*test;
 const surfaceG=GRAVITY_G*centralMass/(GRAVITY_R_EARTH**2);
 return {g,force,surfaceG,ratio:g/surfaceG,radiusKm:r/1000,heightKm:(r-GRAVITY_R_EARTH)/1000};
}
function orbitState(primaryEarthMass,testMass,radii){
 const q=gravityState(primaryEarthMass,testMass,radii);
 const gm=GRAVITY_G*Number(primaryEarthMass)*GRAVITY_M_EARTH;
 const r=Number(radii)*GRAVITY_R_EARTH;
 const speed=Math.sqrt(gm/r);
 const period=2*Math.PI*r/speed;
 return {...q,velocityKmS:speed/1000,periodHours:period/3600,acceleration:q.g,normalForce:0};
}
function gravityField(el){
 el.innerHTML=`<div class="diagram-head"><strong>Distance and inverse-square attraction</strong><span class="pill">Chapter 7 · gravity</span></div>
 <svg viewBox="0 0 570 284" role="img" aria-label="Planet, test object and inward gravitational-force arrow separated by a variable center-to-center distance.">
  <circle cx="95" cy="137" r="50" fill="#446985" stroke="#c9b9a1" stroke-width="3"/>
  <path d="M64 103Q108 87 126 133Q117 148 91 160L65 143Z" fill="#83ab92" opacity=".9"/>
  <path d="M95 137H522" stroke="#a7b3b7" stroke-dasharray="6 7" stroke-width="1.7"/>
  <g id="gr-field-plot"></g>
  <text x="21" y="27" fill="#6c6c63" font-size="14">Distance r is measured from the planet's center.</text>
  <text x="21" y="268" fill="#657275" font-size="13">Illustrative geometry: distances use numerical values, not the drawing scale.</text>
 </svg>
 <div class="controls">
  <label>Central mass <output id="gr-mass-value"></output><input id="gr-mass" type="range" min="1" max="10" step="1" value="1"></label>
  <label>Test mass <output id="gr-test-value"></output><input id="gr-test" type="range" min="1" max="10" step="1" value="2"></label>
  <label>Distance from center <output id="gr-radius-value"></output><input id="gr-radius" type="range" min="1" max="8" step=".5" value="2"></label>
 </div>
 <div class="applet-actions"><button type="button" id="gr-double">Double center distance</button><button type="button" id="gr-reset">Reset</button></div>
 <div class="readout">
  <div class="metric"><small>Gravitational force · GMm/r²</small><strong id="gr-force"></strong></div>
  <div class="metric"><small>Free-fall acceleration · GM/r²</small><strong id="gr-g"></strong></div>
  <div class="metric"><small>Fraction of surface gravity</small><strong id="gr-ratio"></strong></div>
  <div class="metric"><small>Distance from center</small><strong id="gr-distance"></strong></div>
 </div>
 <p class="note">Ideal Newtonian gravity outside a spherical planet. Central mass is 1–10 times Earth's mass, but the model deliberately holds its radius fixed at Earth's radius for comparison. The small test body does not significantly change the planet's motion. Distance means center-to-center separation; forces point toward the attracting mass. Earth reference values are approximate.</p>`;
 const get=id=>el.querySelector("#"+id);
 const m=get("gr-mass"),t=get("gr-test"),rad=get("gr-radius");
 function paint(){
  const q=gravityState(Number(m.value),Number(t.value),Number(rad.value));
  const x=151+Number(rad.value)*41,arrow=Math.min(72,22+q.ratio*105);
  get("gr-field-plot").innerHTML=`<circle cx="${x}" cy="137" r="10" fill="#bc8340" stroke="#fffdf7" stroke-width="3"/>
  <path d="M${x-13} 137H${x-13-arrow}" stroke="#14727a" stroke-width="3.7" stroke-linecap="round"/>
  <path d="M${x-13-arrow+10} 131L${x-13-arrow} 137L${x-13-arrow+10} 143" fill="none" stroke="#14727a" stroke-width="3"/>
  <text x="${Math.min(525,x+17)}" y="124" fill="#83603b" font-size="15" text-anchor="middle">test</text>`;
  get("gr-mass-value").textContent=m.value+" Earth masses";
  get("gr-test-value").textContent=t.value+" kg";
  get("gr-radius-value").textContent=rad.value+" Earth radii";
  get("gr-force").textContent=f(q.force)+" N inward";
  get("gr-g").textContent=f(q.g)+" m/s²";
  get("gr-ratio").textContent=f(q.ratio*100)+"%";
  get("gr-distance").textContent=Math.round(q.radiusKm).toLocaleString("en-US")+" km";
 }
 for(const control of [m,t,rad])control.oninput=paint;
 get("gr-double").onclick=()=>{rad.value=String(Math.min(8,2*Number(rad.value)));paint();};
 get("gr-reset").onclick=()=>{m.value="1";t.value="2";rad.value="2";paint();};paint();
}
function orbitGravity(el){
 el.innerHTML=`<div class="diagram-head"><strong>Steady circular orbit · always falling inward</strong><span class="pill">Chapter 7 · orbit</span></div>
 <svg viewBox="0 0 600 396" role="img" aria-label="Spherical planet and circular satellite path. A tangent velocity arrow and an inward gravity arrow follow the satellite around the orbit.">
  <defs><marker id="orbit-vel-tip" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#14727a"/></marker>
   <marker id="orbit-grav-tip" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#b9823c"/></marker></defs>
  <path d="M42 198H554M300 18V376" stroke="#d9e4de" stroke-dasharray="4 9" stroke-width="1"/>
  <circle cx="300" cy="198" r="42" fill="#466e87" stroke="#b6c0c2" stroke-width="2"/>
  <path d="M275 173Q318 163 327 202Q305 215 274 219L261 197Z" fill="#7cb198"/>
  <g id="or-plot"></g>
  <text x="23" y="27" fill="#677071" font-size="14">Top view · ideal circular free fall</text>
  <text x="23" y="373" fill="#677071" font-size="14">Teal: tangent velocity · Gold: inward gravity</text>
 </svg>
 <div class="controls">
  <label>Planet mass <output id="or-mass-value"></output><input id="or-mass" type="range" min="1" max="10" step="1" value="1"></label>
  <label>Orbital center radius <output id="or-radius-value"></output><input id="or-radius" type="range" min="1.5" max="8" step=".5" value="2"></label>
  <label>Satellite/test mass <output id="or-test-value"></output><input id="or-test" type="range" min="1" max="10" step="1" value="5"></label>
  <label>Position around orbit <output id="or-phase-value"></output><input id="or-phase" type="range" min="0" max="360" step="1" value="0"></label>
 </div>
 <div class="applet-actions"><button type="button" id="or-play" aria-pressed="false">Play orbit</button><button type="button" id="or-step">Step 30°</button><button type="button" id="or-reset">Reset orbit</button></div>
 <div class="readout">
  <div class="metric"><small>Circular orbital speed</small><strong id="or-speed"></strong></div>
  <div class="metric"><small>Orbital period</small><strong id="or-period"></strong></div>
  <div class="metric"><small>Inward gravitational acceleration</small><strong id="or-accel"></strong></div>
  <div class="metric"><small>Gravitational force on test mass</small><strong id="or-force"></strong></div>
  <div class="metric"><small>Ideal onboard scale/support force</small><strong id="or-normal"></strong></div>
 </div>
 <p class="note">Ideal circular orbit around a spherical, nonrotating source. Planet radius is held to Earth's size even as mass varies; center-to-center orbital radius is measured in Earth radii. No air drag, thrust, third-body forces, or eccentric orbits. The satellite's own mass is negligible compared with the planet. Play is deliberately sped up for visibility; the displayed orbital period is calculated physically. Apparent weight (the normal support force) is zero in ideal shared free fall, not because gravity disappears.</p>`;
 const get=id=>el.querySelector("#"+id);
 const m=get("or-mass"),r=get("or-radius"),test=get("or-test"),phase=get("or-phase"),play=get("or-play");
 let running=false,request=null,last=null;
 function stop(){running=false;last=null;if(request!==null&&typeof cancelAnimationFrame==="function")cancelAnimationFrame(request);request=null;play.setAttribute("aria-pressed","false");play.textContent="Play orbit";}
 function paint(){
  const q=orbitState(Number(m.value),Number(test.value),Number(r.value));
  const angle=Number(phase.value)*Math.PI/180,R=49+Number(r.value)*17;
  const x=300+R*Math.cos(angle),y=198-R*Math.sin(angle);
  const vx=x-48*Math.sin(angle),vy=y-48*Math.cos(angle);
  const gx=x-55*Math.cos(angle),gy=y+55*Math.sin(angle);
  get("or-plot").innerHTML=`<circle cx="300" cy="198" r="${f(R)}" fill="none" stroke="#93b2b0" stroke-dasharray="6 6" stroke-width="2.4"/>
   <path d="M300 198L${f(x)} ${f(y)}" stroke="#bccaca" stroke-dasharray="4 5"/>
   <circle cx="${f(x)}" cy="${f(y)}" r="9" fill="#2b4565" stroke="#fffefa" stroke-width="3"/>
   <path d="M${f(x)} ${f(y)}L${f(vx)} ${f(vy)}" stroke="#14727a" stroke-width="3.8" stroke-linecap="round" marker-end="url(#orbit-vel-tip)"/>
   <path d="M${f(x)} ${f(y)}L${f(gx)} ${f(gy)}" stroke="#b9823c" stroke-width="3.8" stroke-linecap="round" marker-end="url(#orbit-grav-tip)"/>`;
  get("or-mass-value").textContent=m.value+" Earth masses";
  get("or-radius-value").textContent=r.value+" Earth radii";
  get("or-test-value").textContent=test.value+" kg";
  get("or-phase-value").textContent=phase.value+"°";
  get("or-speed").textContent=f(q.velocityKmS)+" km/s";
  get("or-period").textContent=f(q.periodHours)+" hours";
  get("or-accel").textContent=f(q.acceleration)+" m/s² inward";
  get("or-force").textContent=f(q.force)+" N inward";
  get("or-normal").textContent="0 N";
 }
 function animate(t){
  if(!running)return;
  if(!el.isConnected){stop();return;}
  const dt=last===null?0:Math.min(.065,(t-last)/1000);last=t;
  phase.value=String((Number(phase.value)+dt*50)%360);
  paint();request=requestAnimationFrame(animate);
 }
 for(const x of [m,r,test,phase])x.oninput=()=>{stop();paint();};
 get("or-step").onclick=()=>{stop();phase.value=String((Number(phase.value)+30)%360);paint();};
 get("or-reset").onclick=()=>{stop();m.value="1";r.value="2";test.value="5";phase.value="0";paint();};
 play.onclick=()=>{if(running){stop();return;}running=true;last=null;play.setAttribute("aria-pressed","true");play.textContent="Pause orbit";request=requestAnimationFrame(animate);};
 paint();
}
