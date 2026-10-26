"use strict";
/* Original constant-force and idealized passive-machine numerical models. */
function workAngleState(force,distance,angleDegrees){
 const rad=Number(angleDegrees)*Math.PI/180;
 const parallel=Number(force)*Math.cos(rad);
 const perpendicular=Number(force)*Math.sin(rad);
 const work=parallel*Number(distance);
 return {work,parallel,perpendicular,force:Number(force),distance:Number(distance),angle:Number(angleDegrees)};
}
function simpleMachineState(inputForce,inputDistance,outputDistance,efficiencyPercent,seconds){
 const wInput=Number(inputForce)*Number(inputDistance);
 const eta=Number(efficiencyPercent)/100;
 const wUseful=wInput*eta;
 const powerIn=wInput/Number(seconds),powerUseful=wUseful/Number(seconds);
 return {inputWork:wInput,outputWork:wUseful,outputForce:wUseful/Number(outputDistance),
  actualAdvantage:wUseful/Number(outputDistance)/Number(inputForce),
  idealAdvantage:Number(inputDistance)/Number(outputDistance),lostToOtherStores:wInput-wUseful,
  inputPower:powerIn,usefulPower:powerUseful,efficiency:eta};
}
function workAngleLab(el){
 el.innerHTML=`<div class="diagram-head"><strong>One force, one displacement</strong><span class="pill" id="wa-status">Positive work</span></div>
 <svg viewBox="0 0 600 275" role="img" aria-label="Crate moving rightward under an angled force and its horizontal component. Numerical work depends on the force projected along displacement.">
  <defs><marker id="wa-force-tip" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#b77a3a"/></marker>
   <marker id="wa-work-tip" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill="#14727a"/></marker></defs>
  <path d="M28 213H565" stroke="#b4ae9e" stroke-width="3"/>
  <rect x="224" y="152" width="116" height="59" rx="5" fill="#446985" stroke="#f6f1e7" stroke-width="2"/>
  <text x="282" y="186" text-anchor="middle" font-size="19" fill="#fff">Crate</text>
  <g id="wa-arrows"></g>
  <text x="20" y="26" font-size="14" fill="currentColor">Displacement is rightward along the floor.</text>
  <text x="20" y="258" font-size="13" fill="currentColor">Force arrow shows direction; its length is schematic.</text>
 </svg>
 <div class="controls">
  <label>Force magnitude <output id="wa-force-value"></output><input id="wa-force" type="range" min="0" max="60" step="5" value="20"></label>
  <label>Horizontal displacement <output id="wa-distance-value"></output><input id="wa-distance" type="range" min="1" max="8" step="1" value="4"></label>
  <label>Force angle to displacement <output id="wa-angle-value"></output><input id="wa-angle" type="range" min="0" max="180" step="15" value="60"></label>
 </div>
 <div class="applet-actions"><button type="button" id="wa-forward">Along motion · 0°</button><button type="button" id="wa-perpendicular">Perpendicular · 90°</button><button type="button" id="wa-back">Against motion · 180°</button><button type="button" id="wa-reset">Reset work model</button></div>
 <div class="readout">
  <div class="metric"><small>Component parallel to displacement</small><strong id="wa-parallel"></strong></div>
  <div class="metric"><small>Component perpendicular</small><strong id="wa-perpendicular-force"></strong></div>
  <div class="metric"><small>Signed work of this force</small><strong id="wa-work"></strong></div>
 </div>
 <p class="note">A constant force acts at a specified angle to a constant horizontal displacement, and the work reported is for this ONE applied force—not the net work of all forces on the crate. The force can oppose motion (negative work) or be perpendicular (zero work); the crate's actual acceleration, friction, supports and speed are not modeled. One joule equals one N·m.</p>`;
 const get=id=>el.querySelector("#"+id),F=get("wa-force"),d=get("wa-distance"),a=get("wa-angle");
 function paint(){
  const q=workAngleState(F.value,d.value,a.value),rad=q.angle*Math.PI/180,xx=284+81*Math.cos(rad),yy=149-81*Math.sin(rad);
  const forceArrow=q.force===0?"":`<path d="M284 149L${f(xx)} ${f(yy)}" stroke="#b77a3a" stroke-width="4" marker-end="url(#wa-force-tip)"/>
  <path d="M${f(xx)} ${f(yy)}V149" stroke="#14727a" stroke-dasharray="5 5" stroke-width="2"/>`;
  get("wa-arrows").innerHTML=`<path d="M282 235H432" stroke="#14727a" stroke-width="3" marker-end="url(#wa-work-tip)"/>
  <text x="362" y="250" text-anchor="middle" font-size="14" fill="currentColor">displacement</text>${forceArrow}`;
  get("wa-status").textContent=Math.abs(q.work)<1e-8?"No work by this force":q.work>0?"Positive work":"Negative work";
  get("wa-force-value").textContent=F.value+" N";
  get("wa-distance-value").textContent=d.value+" m";
  get("wa-angle-value").textContent=a.value+"°";
  get("wa-parallel").textContent=f(q.parallel)+" N";
  get("wa-perpendicular-force").textContent=f(q.perpendicular)+" N";
  get("wa-work").textContent=f(q.work)+" J";
 }
 for(const x of [F,d,a])x.oninput=paint;
 for(const [id,degree] of [["wa-forward",0],["wa-perpendicular",90],["wa-back",180]])get(id).onclick=()=>{a.value=String(degree);paint();};
 get("wa-reset").onclick=()=>{F.value="20";d.value="4";a.value="60";paint();};
 paint();
}
function simpleMachineLab(el){
 el.innerHTML=`<div class="diagram-head"><strong>Input work → useful work</strong><span class="pill">Chapters 10–11 · force–distance trade-off</span></div>
 <svg viewBox="0 0 620 230" role="img" aria-label="Two energy bars compare total input work and useful output work, with difference transferred into non-useful stores.">
  <g id="ma-graph"></g>
 </svg>
 <div class="controls">
 <label>Input force <output id="ma-force-value"></output><input id="ma-force" type="range" min="10" max="100" step="10" value="50"></label>
 <label>Input travel <output id="ma-distance-value"></output><input id="ma-distance" type="range" min=".5" max="5" step=".5" value="2"></label>
 <label>Output travel <output id="ma-output-value"></output><input id="ma-output" type="range" min=".25" max="5" step=".25" value=".5"></label>
 <label>Useful-work efficiency <output id="ma-efficiency-value"></output><input id="ma-efficiency" type="range" min="40" max="100" step="5" value="80"></label>
 <label>Elapsed operating time <output id="ma-time-value"></output><input id="ma-time" type="range" min="1" max="10" step="1" value="4"></label>
 </div>
 <div class="applet-actions"><button type="button" id="ma-ideal">Ideal · 100% efficient</button><button type="button" id="ma-shorter">Halve output travel</button><button type="button" id="ma-reset">Reset machine</button></div>
 <div class="readout">
  <div class="metric"><small>Input work · Fin × din</small><strong id="ma-work-in"></strong></div>
  <div class="metric"><small>Useful output work</small><strong id="ma-work-out"></strong></div>
  <div class="metric"><small>Output force</small><strong id="ma-output-force"></strong></div>
  <div class="metric"><small>Actual / ideal mechanical advantage</small><strong id="ma-advantage"></strong></div>
  <div class="metric"><small>Input / useful output power</small><strong id="ma-power"></strong></div>
  <div class="metric"><small>Transferred to other stores</small><strong id="ma-loss"></strong></div>
 </div>
 <p class="note">An abstract passive constant-force machine: input work Fin·din and useful output work Fout·dout. Efficiency is selected directly, and unused input energy enters other stores. The model does not assert a specific machine geometry, real load dynamics, friction coefficient, mechanical speed profile or motor behavior. It assumes that the chosen forces act along their respective travel distances. Average power is work divided by the same operating time. At 100% efficiency input and output work are equal, but forces may differ because travel distances differ.</p>`;
 const get=id=>el.querySelector("#"+id),F=get("ma-force"),din=get("ma-distance"),dout=get("ma-output"),eff=get("ma-efficiency"),time=get("ma-time");
 function paint(){
  const q=simpleMachineState(F.value,din.value,dout.value,eff.value,time.value);
  get("ma-force-value").textContent=F.value+" N";
  get("ma-distance-value").textContent=Number(din.value).toFixed(2)+" m";
  get("ma-output-value").textContent=Number(dout.value).toFixed(2)+" m";
  get("ma-efficiency-value").textContent=eff.value+"%";
  get("ma-time-value").textContent=time.value+" s";
  get("ma-work-in").textContent=f(q.inputWork)+" J";
  get("ma-work-out").textContent=f(q.outputWork)+" J";
  get("ma-output-force").textContent=f(q.outputForce)+" N";
  get("ma-advantage").textContent=f(q.actualAdvantage)+"× / "+f(q.idealAdvantage)+"×";
  get("ma-power").textContent=f(q.inputPower)+" W / "+f(q.usefulPower)+" W";
  get("ma-loss").textContent=f(q.lostToOtherStores)+" J";
  const max=385,scaled=q.inputWork>0?max/q.inputWork:0;
  get("ma-graph").innerHTML=`<text x="20" y="32" fill="currentColor" font-size="16">Input work</text>
  <rect x="166" y="10" width="385" height="29" rx="4" fill="#dfe9e4"/>
  <rect x="166" y="10" width="385" height="29" rx="4" fill="#365b7a"/>
  <text x="559" y="31" fill="currentColor" font-size="14" text-anchor="end">${f(q.inputWork)} J</text>
  <text x="20" y="98" fill="currentColor" font-size="16">Useful work</text>
  <rect x="166" y="76" width="385" height="29" rx="4" fill="#dfe9e4"/>
  <rect x="166" y="76" width="${f(q.outputWork*scaled)}" height="29" rx="4" fill="#14727a"/>
  <text x="559" y="98" fill="currentColor" font-size="14" text-anchor="end">${f(q.outputWork)} J</text>
  <text x="20" y="166" fill="currentColor" font-size="16">Other stores</text>
  <rect x="166" y="143" width="385" height="29" rx="4" fill="#dfe9e4"/>
  <rect x="166" y="143" width="${f(q.lostToOtherStores*scaled)}" height="29" rx="4" fill="#b77a3a"/>
  <text x="559" y="165" fill="currentColor" font-size="14" text-anchor="end">${f(q.lostToOtherStores)} J</text>
  <text x="20" y="215" fill="currentColor" font-size="14">Useful + other stores = input: ${f(q.inputWork)} J</text>`;
 }
 for(const x of [F,din,dout,eff,time])x.oninput=paint;
 get("ma-ideal").onclick=()=>{eff.value="100";paint();};
 get("ma-shorter").onclick=()=>{dout.value=String(Math.max(.25,Number(dout.value)/2));paint();};
 get("ma-reset").onclick=()=>{F.value="50";din.value="2";dout.value=".5";eff.value="80";time.value="4";paint();};
 paint();
}
