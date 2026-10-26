"use strict";
/* Original compact publisher-tour models. Full lessons remain the instructional source;
   energy uses the exact shared energyRampState engine. */
function tourMiniLab(el,kind){
 const fmt=n=>Number(n).toFixed(1),set=(id,value)=>{const node=el.querySelector("#"+id);if(node)node.textContent=value;};
 const touch=()=>{const c=el.closest(".demo-feature").querySelector("#demo-connection");if(c)c.hidden=false;const hold=el.closest(".demo-feature").querySelector("#demo-hold");if(hold)hold.hidden=true;};
 if(kind==="graph"){
  el.innerHTML=`<svg viewBox="0 0 440 258" role="img" aria-label="Position against time, showing a curved graph and the secant between zero seconds and an adjustable later time.">
   <rect x="0" y="0" width="440" height="258" rx="8" fill="#f8fbfa"/>
   <path d="M56 25V208H404" stroke="#5b6d78" stroke-width="2" fill="none"/>
   <g stroke="#dce6e3" stroke-width="1"><path d="M56 168H394M56 128H394M56 88H394M56 48H394M136 30V208M216 30V208M296 30V208M376 30V208"/></g>
   <g fill="#435967" font-size="12"><text x="9" y="24">x (m)</text><text x="374" y="240">t (s)</text><text x="53" y="226">0</text><text x="133" y="226">1</text><text x="213" y="226">2</text><text x="293" y="226">3</text><text x="373" y="226">4</text></g>
   <path id="demo-graph-curve" fill="none" stroke="#167680" stroke-width="3.5"/>
   <path id="demo-graph-rise" stroke="#a57a45" stroke-dasharray="5 4" stroke-width="2" fill="none"/>
   <path id="demo-graph-secant" stroke="#813e55" stroke-width="3" fill="none"/>
   <g id="demo-graph-points"></g></svg>
   <div class="demo-mini-controls"><label for="demo-graph-t">Second time <output id="demo-graph-t-value">2.0 s</output></label><input type="range" id="demo-graph-t" min="1" max="4" step=".5" value="2"></div>
   <div class="demo-mini-readouts"><div><span>Change in position</span><strong id="demo-graph-rise-value"></strong></div><div><span>Elapsed time</span><strong id="demo-graph-run-value"></strong></div><div><span>Average velocity</span><strong id="demo-graph-slope"></strong></div></div>
   <p class="demo-model-note">Model: x(t) = 1 + t² meters, t in seconds. The slope is Δx/Δt, not the graph's height.</p>`;
  const control=el.querySelector("#demo-graph-t"),X=t=>56+80*t,Y=x=>208-10*x;
  const curve=Array.from({length:81},(_,i)=>{const t=i/20;return `${i?"L":"M"} ${X(t)} ${Y(1+t*t)}`}).join(" ");
  el.querySelector("#demo-graph-curve").setAttribute("d",curve);
  function draw(){const t=Number(control.value),x1=1,x2=1+t*t;
   el.querySelector("#demo-graph-secant").setAttribute("d",`M ${X(0)} ${Y(x1)} L ${X(t)} ${Y(x2)}`);
   el.querySelector("#demo-graph-rise").setAttribute("d",`M ${X(t)} ${Y(x1)} V ${Y(x2)} M ${X(0)} ${Y(x1)} H ${X(t)}`);
   el.querySelector("#demo-graph-points").innerHTML=`<circle cx="${X(0)}" cy="${Y(x1)}" r="6" fill="#813e55" stroke="white" stroke-width="2"/><circle cx="${X(t)}" cy="${Y(x2)}" r="6" fill="#813e55" stroke="white" stroke-width="2"/>`;
   set("demo-graph-t-value",fmt(t)+" s");set("demo-graph-rise-value",fmt(x2-x1)+" m");set("demo-graph-run-value",fmt(t)+" s");set("demo-graph-slope",fmt((x2-x1)/t)+" m/s");
  }
  control.addEventListener("input",()=>{draw();touch();});draw();return;
 }
 if(kind==="force"){
  el.innerHTML=`<svg viewBox="0 0 440 232" role="img" aria-label="Crate on a level floor with opposing schematic applied and friction forces. The numerical readouts below describe the force balance.">
   <rect width="440" height="232" rx="8" fill="#f8fbfa"/>
   <path d="M24 186H416" stroke="#a18f77" stroke-width="4"/>
   <rect x="173" y="120" width="94" height="64" rx="6" fill="#d4b18e" stroke="#8d674e" stroke-width="2"/>
   <text x="220" y="155" font-size="16" fill="#533d31" text-anchor="middle">crate</text>
   <g id="demo-force-arrows"></g>
   <text x="15" y="220" font-size="12" fill="#596b72">Arrows show directions, not scale.</text></svg>
   <div class="demo-mini-controls"><label for="demo-force-pull">Horizontal pull <output id="demo-force-pull-value">15 N</output></label><input id="demo-force-pull" type="range" min="0" max="60" step="1" value="15"></div>
   <div class="demo-mini-readouts"><div><span>Force regime</span><strong id="demo-force-state"></strong></div><div><span>Actual friction</span><strong id="demo-force-friction"></strong></div><div><span>Acceleration</span><strong id="demo-force-accel"></strong></div></div>
   <p class="demo-model-note">From rest: m = 5 kg, μₛ = 0.50, μₖ = 0.30, N = 49 N. Threshold: μₛN = 24.5 N. After slipping begins, kinetic friction is 14.7 N.</p>`;
  const control=el.querySelector("#demo-force-pull");
  function draw(){const pull=Number(control.value),max=24.5,sliding=pull>max,friction=sliding?14.7:pull,a=sliding?(pull-friction)/5:0;
   const right=pull?`<path d="M267 150H${267+Math.min(110,pull*2)}" stroke="#9b6833" stroke-width="4"/><path d="M${259+Math.min(110,pull*2)} 143l8 7-8 7" fill="none" stroke="#9b6833" stroke-width="3"/>`:"";
   const left=friction?`<path d="M173 150H${173-Math.min(105,friction*2)}" stroke="#14727a" stroke-width="4"/><path d="M${181-Math.min(105,friction*2)} 143l-8 7 8 7" fill="none" stroke="#14727a" stroke-width="3"/>`:"";
   el.querySelector("#demo-force-arrows").innerHTML=right+left+`<text x="311" y="120" font-size="15" fill="#865c32">pull →</text><text x="24" y="120" font-size="15" fill="#176c74">← friction</text>`;
   set("demo-force-pull-value",pull+" N");set("demo-force-state",sliding?"Sliding":"At rest");set("demo-force-friction",fmt(friction)+" N");set("demo-force-accel",fmt(a)+" m/s²");
  }
  control.addEventListener("input",()=>{draw();touch();});draw();return;
 }
 if(kind==="energy"){
  el.innerHTML=`<svg viewBox="0 0 440 270" role="img" aria-label="A block progresses down an ideal thirty-five-degree ramp. Kinetic, gravitational, and thermal energy are quantified underneath.">
   <rect width="440" height="236" rx="8" fill="#f8fbfa"/>
   <path d="M53 231H408" stroke="#a18f77" stroke-width="3"/>
   <path d="M58 30L345 231H58Z" fill="#eadcc6" stroke="#b39b7a" stroke-width="2"/>
   <path d="M58 30L345 231" stroke="#8e7556" stroke-width="4"/>
   <g id="demo-energy-block"></g>
   <g fill="#596b72" font-size="13"><text x="55" y="21">H = 5 m</text><text x="350" y="254">bottom</text></g></svg>
   <div class="demo-mini-controls"><label for="demo-energy-progress">Distance down ramp <output id="demo-energy-progress-value">0%</output></label><input id="demo-energy-progress" type="range" min="0" max="100" step="10" value="0"></div>
   <button class="demo-toggle" type="button" id="demo-energy-friction" aria-pressed="true">Friction on · compare without</button>
   <div class="demo-energy-bars" aria-hidden="true"><div><span>Motion</span><i class="demo-bar-track"><b id="demo-energy-bar-k"></b></i></div><div><span>Height</span><i class="demo-bar-track"><b id="demo-energy-bar-u"></b></i></div><div><span>Thermal</span><i class="demo-bar-track"><b id="demo-energy-bar-q"></b></i></div></div>
   <div class="demo-mini-readouts"><div><span>Kinetic K</span><strong id="demo-energy-k"></strong></div><div><span>Potential U</span><strong id="demo-energy-u"></strong></div><div><span>Thermal transfer</span><strong id="demo-energy-q"></strong></div><div><span>Whole account</span><strong id="demo-energy-total"></strong></div></div>
   <p class="demo-model-note">Model: 2 kg, 5 m vertical drop, starting from rest, 35° ramp, μₖ = 0.20 when friction is on. Energy transferred to thermal surroundings is included in the total.</p>`;
  const slider=el.querySelector("#demo-energy-progress"),button=el.querySelector("#demo-energy-friction");
  let friction=true;
  function draw(){const p=Number(slider.value)/100,q=energyRampState(2,5,0,friction?.2:0,p),x=58+287*p,y=30+201*p;
   el.querySelector("#demo-energy-block").innerHTML=`<rect x="${x-13}" y="${y-25}" width="27" height="24" rx="3" transform="rotate(35 ${x} ${y-13})" fill="#345c78" stroke="#fff" stroke-width="2"/>`;
   set("demo-energy-progress-value",slider.value+"%");
   for(const [k,v] of [["k",q.kinetic],["u",q.potential],["q",q.thermal]]){
    set("demo-energy-"+k,fmt(v)+" J");
    el.querySelector("#demo-energy-bar-"+k).style.width=(100*v/q.total).toFixed(2)+"%";
   }
   set("demo-energy-total",fmt(q.kinetic+q.potential+q.thermal)+" J");
   button.setAttribute("aria-pressed",String(friction));button.textContent=friction?"Friction on · compare without":"Friction off · restore friction";
  }
  slider.addEventListener("input",()=>{draw();touch();});
  button.addEventListener("click",()=>{friction=!friction;draw();touch();});draw();
 }
}
