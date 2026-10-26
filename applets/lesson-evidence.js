"use strict";
/* Original full-lesson evidence companion. The same numbers underlie the diagram,
   spoken description and displayed arithmetic. No user data is collected. */
function featuredEvidence(kind, v) {
 const number=n=>Number(n.toFixed(2)).toString();
 if(kind==="graph-slope-physics"){
  const a=Number(v.start),b=Number(v.end),x=t=>1+t*t;
  const rise=x(b)-x(a),run=b-a,slope=rise/run;
  return {
   values:{rise,run,slope},
   description:"Position against time for x(t) = 1 + t squared metres. The curve rises from "+number(x(a))+" metres at "+a+" seconds to "+number(x(b))+" metres at "+b+" seconds. The secant joins these points; its rise divided by its horizontal run is "+number(slope)+" metres per second.",
   calculation:"x("+a+") = "+number(x(a))+" m; x("+b+") = "+number(x(b))+" m. Change in position = "+number(x(b))+" − "+number(x(a))+" = "+number(rise)+" m. Change in time = "+b+" − "+a+" = "+number(run)+" s. Average velocity = "+number(rise)+" m ÷ "+number(run)+" s = "+number(slope)+" m/s.",
   interpretation:"The height of each point is a position in metres. The slope of their connecting secant is average velocity in metres per second. A higher graph point is not itself a faster speed."
  };
 }
 if(kind==="friction"){
  const pull=Number(v.pull),m=Number(v.mass),mus=Number(v.static),muk=Math.min(Number(v.kinetic),mus);
  const normal=9.8*m,limit=mus*normal,sliding=pull>limit+1e-9;
  const actual=sliding?muk*normal:pull,net=pull-actual,acceleration=sliding?net/m:0;
  return {
   values:{normal,limit,actual,net,acceleration,sliding},
   description:"A "+m+" kilogram crate starts at rest on a horizontal floor. The pull is "+number(pull)+" newtons to the right and friction is "+number(actual)+" newtons to the left. Normal force and weight are each "+number(normal)+" newtons in opposite vertical directions. The crate is "+(sliding?"beginning to slide":"remaining at rest")+". Force arrows identify direction, not magnitude.",
   calculation:"Normal force N = mg = "+m+" kg × 9.8 m/s² = "+number(normal)+" N. Maximum static friction = "+mus+" × "+number(normal)+" N = "+number(limit)+" N. Since the pull is "+(sliding?"greater than":"not greater than")+" this limit, actual "+(sliding?"kinetic friction = "+muk+" × "+number(normal)+" N = ":"static friction = ")+number(actual)+" N. Net horizontal force = "+number(pull)+" − "+number(actual)+" = "+number(net)+" N. Acceleration = "+number(acceleration)+" m/s².",
   interpretation:sliding?"Once motion starts, this ideal model uses kinetic friction, not maximum static friction. Net force is to the right.":"Static friction adjusts to match the applied pull, up to its limit. It does not automatically equal its maximum; the horizontal net force is zero."
  };
 }
 if(kind==="energy-conservation"){
  const m=Number(v.mass),H=Number(v.height),v0=Number(v.start),mu=Number(v.mu),p=Number(v.progress)/100;
  const q=energyRampState(m,H,v0,mu,p);
  const lossless=energyRampState(m,H,v0,0,p);
  return {
   values:{...q,losslessK:lossless.kinetic,balance:q.kinetic+q.potential+q.thermal},
   description:"A "+m+" kilogram block is "+number(q.distance)+" metres down a straight 35-degree incline, at height "+number(q.height)+" metres above the bottom. It has "+number(q.kinetic)+" joules of kinetic energy, "+number(q.potential)+" joules of gravitational potential energy, and "+number(q.thermal)+" joules transferred to thermal surroundings. Their sum is "+number(q.total)+" joules.",
   calculation:"Distance down ramp = "+number(q.distance)+" m; remaining height = "+number(q.height)+" m. K = "+number(q.kinetic)+" J; U = mg h = "+number(q.potential)+" J; thermal transfer = μₖ mg cos(35°) × distance = "+number(q.thermal)+" J. K + U + thermal = "+number(q.kinetic)+" + "+number(q.potential)+" + "+number(q.thermal)+" = "+number(q.total)+" J (unrounded). At this same location without friction, K would be "+number(lossless.kinetic)+" J; the difference is "+number(q.thermal)+" J.",
   interpretation:"Mechanical energy K + U can decrease as friction transfers energy to thermal surroundings. Total energy for the block–Earth–surroundings system stays constant. Potential energy uses the ramp bottom as zero; the drawing is schematic when height changes."
  };
 }
 return null;
}
function enhanceFeaturedLesson(el,kind){
 const settings={
  "graph-slope-physics":{
   question:"With the starting time held at 0 s, if the later time moves from 2 s toward 4 s, average velocity will…",
   options:["Increase","Decrease","Stay unchanged"],correct:0,
   reason:"For this upward-curving position function, later secants have a greater rise per second."},
  "friction":{
   question:"For the initial 5 kg crate with μₛ = 0.50, does increasing the pull from 20 N to 25 N cause the crate to start sliding?",
   options:["Yes, it crosses the static limit","No, static friction always equals 24.5 N","No, friction is fixed at 14.7 N"],correct:0,
   reason:"The threshold is 0.50 × (5 × 9.8) = 24.5 N. At 25 N the initial-rest model changes from static to kinetic friction."},
  "energy-conservation":{
   question:"At the same halfway position, removing kinetic friction makes the block's kinetic energy…",
   options:["Larger","Smaller","Unchanged"],correct:0,
   reason:"With the same initial energy and height, removing friction makes thermal transfer zero, so kinetic energy is greater."}
 };
 const choice=settings[kind];
 if(!choice)return;
 const panel=document.createElement("section");
 panel.className="evidence-workbench";
 panel.setAttribute("aria-labelledby","evidence-heading");
 const options=choice.options.map((label,i)=>'<label><input type="radio" name="evidence-prediction" value="'+i+'"><span>'+label+'</span></label>').join("");
 panel.innerHTML='<div class="evidence-eyebrow">READ THE EVIDENCE · FULL LESSON</div>'+
  '<h3 id="evidence-heading">From the diagram to the equation</h3>'+
  '<p class="evidence-lead">Read the quantities aloud, including units. The illustration is not a substitute for the calculations.</p>'+
  '<div class="evidence-numbers"><strong>Current diagram, described in words</strong><p id="evidence-description"></p>'+
  '<strong>Show the calculation</strong><p id="evidence-calculation"></p></div>'+
  '<fieldset class="evidence-predict"><legend>First predict: '+choice.question+'</legend>'+
   '<div class="evidence-choices">'+options+'</div>'+
   '<button type="button" id="evidence-record">Record my prediction</button>'+
   '<p id="evidence-prediction-status" role="status" aria-live="polite"></p></fieldset>'+
  '<div class="evidence-connect"><button type="button" class="primary" id="evidence-connect" disabled>Connect my prediction to the evidence</button>'+
   '<p id="evidence-conclusion" hidden></p></div>'+
  '<p class="evidence-help">Use Tab to focus each control; arrow keys adjust sliders. Values and spoken diagram descriptions update without a continuous live announcement. After changing a quantity, return here to inspect the equation.</p>';
 el.append(panel);
 const svg=el.querySelector('svg[role="img"]');
 if(svg)svg.setAttribute("aria-describedby","evidence-description");
 const controls={
  "graph-slope-physics":{start:"slope-t1",end:"slope-t2"},
  "friction":{pull:"fr-pull",mass:"fr-mass",static:"fr-static",kinetic:"fr-kinetic"},
  "energy-conservation":{mass:"en-mass",height:"en-height",start:"en-start",mu:"en-mu",progress:"en-progress"}
 }[kind];
 const element=id=>el.querySelector("#"+id);
 let selected=null,changed=false;
 function refresh(){
  const values={};
  for(const [key,id] of Object.entries(controls))values[key]=element(id).value;
  const q=featuredEvidence(kind,values);
  element("evidence-description").textContent=q.description;
  element("evidence-calculation").textContent=q.calculation;
  for(const [key,id] of Object.entries(controls)){
   const units=kind==="graph-slope-physics"?"seconds":kind==="friction"?(key==="pull"?"newtons":key==="mass"?"kilograms":"coefficient"):(key==="mass"?"kilograms":key==="height"?"metres":key==="start"?"metres per second":key==="progress"?"percent":"coefficient");
   element(id).setAttribute("aria-valuetext",values[key]+" "+units);
  }
  element("evidence-connect").disabled=selected===null||!changed;
 }
 element("evidence-record").onclick=()=>{
  const checked=panel.querySelector('input[name="evidence-prediction"]:checked');
  if(!checked){element("evidence-prediction-status").textContent="Select one prediction first.";return;}
  selected=Number(checked.value);
  panel.querySelector(".evidence-predict").disabled=true;
  element("evidence-record").textContent="Prediction recorded";
  element("evidence-prediction-status").textContent=changed?"Prediction recorded after exploration.":"Prediction recorded. Now manipulate the model, then connect your reasoning.";
  refresh();
 };
 element("evidence-connect").onclick=()=>{
  const verdict=selected===choice.correct?"Your prediction agrees with this model. ":"Compare your prediction with the model. ";
  element("evidence-conclusion").textContent=verdict+choice.reason+" "+featuredEvidence(kind,Object.fromEntries(Object.entries(controls).map(([key,id])=>[key,element(id).value]))).interpretation;
  element("evidence-conclusion").hidden=false;
 };
 el.addEventListener("input",e=>{if(e.target.matches('input[type="range"]')){changed=true;refresh();}});
 el.addEventListener("click",e=>{if(e.target.closest(".applet-actions button")){changed=true;refresh();}});
 refresh();
}
