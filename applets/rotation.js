"use strict";
/* Independent ideal fixed-axis rotational mechanics models, not time-domain
   rigid-body simulation with bearings, structural loads or friction. */
function torqueState(radius,force,degrees){
 const radians=Number(degrees)*Math.PI/180;
 const signedTorque=Number(radius)*Number(force)*Math.sin(radians);
 return {signedTorque,forcePerpendicular:Number(force)*Math.sin(radians),
  leverArm:Number(radius)*Math.abs(Math.sin(radians)),direction:Math.abs(signedTorque)<1e-9?"balanced":signedTorque>0?"counterclockwise":"clockwise"};
}
function spinState(shape,mass,radius,torque,seconds){
 const I=(shape==="hoop"?1:.5)*Number(mass)*Number(radius)**2;
 const alpha=Number(torque)/I;
 const t=Number(seconds),omega=alpha*t,theta=.5*alpha*t*t;
 return {I,alpha,omega,theta,turns:theta/(2*Math.PI),kinetic:.5*I*omega*omega,work:Number(torque)*theta};
}
function torqueLever(el){
 el.innerHTML=`<div class="diagram-head"><strong>Turn a lever about a fixed pivot</strong><span class="pill" id="tl-status">Counterclockwise</span></div>
 <svg viewBox="0 0 570 286" role="img" aria-label="Rightward horizontal lever with a pivot, an adjustable applied force and its perpendicular component. Values and direction below.">
 <defs><marker id="tl-tip" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#b77a3a"/></marker></defs>
 <path d="M44 218H540" stroke="#ddd2bf" stroke-width="2"/>
 <path d="M80 136H522" stroke="#7f6b55" stroke-width="12" stroke-linecap="round"/>
 <path d="M80 140L62 178H98Z" fill="#c4b59c" stroke="#786650" stroke-width="2"/>
 <circle cx="80" cy="136" r="8" fill="#ede2ca" stroke="#6b5b45" stroke-width="3"/>
 <g id="tl-vectors"></g>
 <text x="20" y="29" font-size="14" fill="#6d655c">The pivot is left; position and angle determine turning effect.</text>
 <text x="20" y="261" font-size="13" fill="#777067">Force vectors and lever geometry are drawn schematically.</text></svg>
 <div class="controls">
 <label>Distance from pivot <output id="tl-radius-value"></output><input id="tl-radius" type="range" min=".2" max="2" step=".1" value="1"></label>
 <label>Applied force <output id="tl-force-value"></output><input id="tl-force" type="range" min="0" max="60" step="5" value="20"></label>
 <label>Force angle from rightward arm <output id="tl-angle-value"></output><input id="tl-angle" type="range" min="-90" max="90" step="15" value="90"></label>
 </div>
 <div class="applet-actions"><button type="button" id="tl-perpendicular">Set perpendicular</button><button type="button" id="tl-along">Aim along the arm</button><button type="button" id="tl-reset">Reset lever</button></div>
 <div class="readout">
 <div class="metric"><small>Signed torque · rFsinφ</small><strong id="tl-torque"></strong></div>
 <div class="metric"><small>Signed perpendicular force</small><strong id="tl-f-perp"></strong></div>
 <div class="metric"><small>Perpendicular lever arm</small><strong id="tl-arm"></strong></div>
 </div>
 <p class="note">Ideal rigid horizontal lever, a fixed frictionless pivot, a single force applied at the chosen rightward distance and no other forces included in the torque sum. Positive torque is counterclockwise; negative is clockwise. The arrow lengths are illustrative, not a physical force scale. A pivot reaction may exist but creates zero torque about the pivot.</p>`;
 const get=id=>el.querySelector("#"+id),r=get("tl-radius"),F=get("tl-force"),a=get("tl-angle");
 function paint(){
  const q=torqueState(r.value,F.value,a.value);
  const x=80+Number(r.value)*200,theta=Number(a.value)*Math.PI/180;
  const len=Number(F.value)===0?0:68;
  const fx=x+len*Math.cos(theta),fy=136-len*Math.sin(theta);
  get("tl-vectors").innerHTML=`<path d="M80 136H${f(x)}" stroke="#4c617a" stroke-width="4" stroke-linecap="round"/>
   <circle cx="${f(x)}" cy="136" r="7" fill="#2c7380" stroke="#faf3e7" stroke-width="2"/>
   ${len?`<path d="M${f(x)} 136L${f(fx)} ${f(fy)}" stroke="#b77a3a" stroke-width="4" marker-end="url(#tl-tip)" stroke-linecap="round"/>
   <path d="M${f(fx)} ${f(fy)}V136" stroke="#14727a" stroke-width="2" stroke-dasharray="5 4"/>`:""}
   <text x="87" y="116" font-size="14" fill="#536475">pivot</text>
   <text x="${f(x)}" y="169" text-anchor="middle" font-size="14" fill="#775c40">r</text>`;
  get("tl-status").textContent=q.direction==="balanced"?"No turning torque":q.direction==="clockwise"?"Clockwise":"Counterclockwise";
  get("tl-radius-value").textContent=Number(r.value).toFixed(1)+" m";
  get("tl-force-value").textContent=F.value+" N";
  get("tl-angle-value").textContent=a.value+"°";
  get("tl-torque").textContent=(q.signedTorque>1e-9?"+":"")+f(q.signedTorque)+" N·m";
  get("tl-f-perp").textContent=f(q.forcePerpendicular)+" N";
  get("tl-arm").textContent=f(q.leverArm)+" m";
 }
 for(const x of [r,F,a])x.oninput=paint;
 get("tl-perpendicular").onclick=()=>{a.value="90";paint();};
 get("tl-along").onclick=()=>{a.value="0";paint();};
 get("tl-reset").onclick=()=>{r.value="1";F.value="20";a.value="90";paint();};
 paint();
}
function rotationalSpin(el){
 el.innerHTML=`<div class="diagram-head"><strong>Apply torque to a disk or hoop</strong><span class="pill">Ideal fixed-axis dynamics</span></div>
 <svg viewBox="0 0 570 298" role="img" aria-label="Disk or hoop spinning about a central axle. Orientation, moment of inertia and angular speed are shown by a marked radius and numerical values.">
 <path d="M282 10V264M130 146H435" stroke="#d9e1d9" stroke-dasharray="4 7"/>
 <g id="sp-wheel"></g><text x="17" y="26" fill="#777066" font-size="15">Axle points out of the page.</text>
 <text x="18" y="281" fill="#777066" font-size="13">The spin angle is visualized; wheel dimensions are schematic.</text></svg>
 <div class="controls">
 <label>Rotating body <select id="sp-shape"><option value="disk">Uniform solid disk</option><option value="hoop">Thin hoop</option></select></label>
 <label>Mass <output id="sp-mass-value"></output><input id="sp-mass" type="range" min="1" max="8" step="1" value="4"></label>
 <label>Outer radius <output id="sp-radius-value"></output><input id="sp-radius" type="range" min=".5" max="2" step=".25" value="1"></label>
 <label>Constant net torque <output id="sp-torque-value"></output><input id="sp-torque" type="range" min="0" max="20" step="1" value="8"></label>
 <label>Elapsed time from rest <output id="sp-time-value"></output><input id="sp-time" type="range" min="0" max="5" step=".01" value="2"></label>
 </div>
 <div class="applet-actions"><button type="button" id="sp-play" aria-pressed="false">Play spin</button><button type="button" id="sp-step">Advance 0.5 s</button><button type="button" id="sp-compare">Switch body</button><button type="button" id="sp-reset">Reset wheel</button></div>
 <div class="readout">
 <div class="metric"><small>Moment of inertia · I</small><strong id="sp-inertia"></strong></div>
 <div class="metric"><small>Angular acceleration · α=τ/I</small><strong id="sp-alpha"></strong></div>
 <div class="metric"><small>Angular speed · ω=αt</small><strong id="sp-omega"></strong></div>
 <div class="metric"><small>Angular displacement · θ=½αt²</small><strong id="sp-angle"></strong></div>
 <div class="metric"><small>Revolutions since rest</small><strong id="sp-turns"></strong></div>
 <div class="metric"><small>Rotational energy · ½Iω²</small><strong id="sp-energy"></strong></div>
 </div>
 <p class="note">Ideal uniform solid disk (I=½mR²) or thin hoop (I=mR²) about its fixed central axle. One constant positive net torque acts from rest; no friction, gravity-driven torque, rolling, air drag, bearings, or motor limits. Angle is measured in radians and animated at slowed illustrative time. Work done by torque equals the increase in rotational kinetic energy: τθ=½Iω².</p>`;
 const get=id=>el.querySelector("#"+id);
 const shape=get("sp-shape"),mass=get("sp-mass"),radius=get("sp-radius"),torque=get("sp-torque"),time=get("sp-time"),play=get("sp-play");
 let playing=false,req=null,last=null,clock=2;
 function stop(){playing=false;last=null;if(req!==null&&typeof cancelAnimationFrame==="function")cancelAnimationFrame(req);req=null;play.setAttribute("aria-pressed","false");play.textContent="Play spin";}
 function paint(t=Number(time.value)){
  const q=spinState(shape.value,mass.value,radius.value,torque.value,t);
  const R=52+Number(radius.value)*30,rotation=q.theta*180/Math.PI%360;
  const wheel=shape.value==="hoop"
    ?`<circle cx="285" cy="143" r="${f(R)}" fill="#f5f0e6" stroke="#365b7a" stroke-width="15"/>`
    :`<circle cx="285" cy="143" r="${f(R)}" fill="#a1bccb" stroke="#365b7a" stroke-width="4"/>`;
  get("sp-wheel").innerHTML=wheel+`<g transform="rotate(${f(rotation)} 285 143)">
    <path d="M285 143L${f(285+R*.82)} 143" stroke="#b77a3a" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${f(285+R*.82)}" cy="143" r="6" fill="#a76f35"/>
   </g><circle cx="285" cy="143" r="9" fill="#f5f0e6" stroke="#365b7a" stroke-width="3"/>`;
  get("sp-mass-value").textContent=mass.value+" kg";
  get("sp-radius-value").textContent=Number(radius.value).toFixed(2)+" m";
  get("sp-torque-value").textContent=torque.value+" N·m";
  get("sp-time-value").textContent=Number(t).toFixed(2)+" s";
  get("sp-inertia").textContent=f(q.I)+" kg·m²";
  get("sp-alpha").textContent=f(q.alpha)+" rad/s²";
  get("sp-omega").textContent=f(q.omega)+" rad/s";
  get("sp-angle").textContent=f(q.theta)+" rad";
  get("sp-turns").textContent=f(q.turns)+" rev";
  get("sp-energy").textContent=f(q.kinetic)+" J";
 }
 function animate(timestamp){
  if(!playing)return;
  if(!el.isConnected){stop();return;}
  const dt=last===null?0:Math.min(.06,(timestamp-last)/1000);last=timestamp;
  clock=Math.min(5,clock+dt*.7);time.value=clock.toFixed(2);paint(clock);
  if(clock>=5)stop();else req=requestAnimationFrame(animate);
 }
 for(const control of [shape,mass,radius,torque])control.oninput=()=>{stop();paint();};
 time.oninput=()=>{stop();clock=Number(time.value);paint();};
 get("sp-step").onclick=()=>{stop();clock=Math.min(5,Number(time.value)+.5);time.value=String(clock);paint();};
 get("sp-compare").onclick=()=>{stop();shape.value=shape.value==="disk"?"hoop":"disk";paint();};
 get("sp-reset").onclick=()=>{stop();shape.value="disk";mass.value="4";radius.value="1";torque.value="8";time.value="2";clock=2;paint();};
 play.onclick=()=>{if(playing){stop();return;}clock=Number(time.value);if(clock>=5){clock=0;time.value="0";}playing=true;last=null;play.setAttribute("aria-pressed","true");play.textContent="Pause spin";req=requestAnimationFrame(animate);};
 paint();
}
