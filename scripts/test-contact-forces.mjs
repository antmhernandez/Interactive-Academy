import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source=fs.readFileSync(new URL("../applets/contact-forces.js",import.meta.url),"utf8");
const f=n=>String(Number(Number(n).toFixed(3)));
const models=vm.runInNewContext(source+"\n({frictionThreshold,inclineFriction})",{f});
function harness(){
 const elements=new Map();
 const el={
  innerHTML:"",
  querySelector(selector){
   if(!elements.has(selector))elements.set(selector,{value:"",textContent:"",innerHTML:"",oninput:null,onclick:null});
   return elements.get(selector);
  }
 };
 const get=id=>el.querySelector("#"+id);
 return {el,get};
}
function approx(output,number,eps=.002){
 assert.ok(Math.abs(Number.parseFloat(output)-number)<eps,"Expected "+number+", got "+output);
}
{
 const {el,get}=harness();
 models.frictionThreshold(el);
 assert.equal(get("fr-state").textContent,"At rest · static");
 assert.equal(get("fr-friction").textContent,"20 N static");
 assert.equal(get("fr-max").textContent,"24.5 N");
 assert.equal(get("fr-accel").textContent,"0 m/s²");
 assert.ok(get("fr-arrows").innerHTML.includes("path"));
 get("fr-threshold").onclick();
 assert.equal(get("fr-pull").value,"25");
 assert.equal(get("fr-state").textContent,"Sliding · kinetic");
 assert.equal(get("fr-friction").textContent,"14.7 N kinetic");
 assert.equal(get("fr-accel").textContent,"2.06 m/s²");
 get("fr-pull").value="40";get("fr-pull").oninput();
 assert.equal(get("fr-accel").textContent,"5.06 m/s²");
 get("fr-static").value=".1";get("fr-static").oninput();
 assert.equal(get("fr-kinetic").value,".1","μk clamped to ≤ μs");
 get("fr-reset").onclick();
 assert.equal(get("fr-state").textContent,"At rest · static");
 assert.equal(get("fr-friction").textContent,"20 N static");
}
{
 const {el,get}=harness();
 models.inclineFriction(el);
 assert.equal(get("inc-state").textContent,"At rest · static");
 assert.equal(get("inc-accel").textContent,"0 m/s²");
 const theta20=20*Math.PI/180;
 approx(get("inc-down").textContent,4*9.8*Math.sin(theta20));
 approx(get("inc-friction").textContent,4*9.8*Math.sin(theta20));
 approx(get("inc-normal").textContent,4*9.8*Math.cos(theta20));
 approx(get("inc-critical-read").textContent,Math.atan(.5)*180/Math.PI);
 get("inc-critical").onclick();
 assert.equal(get("inc-angle").value,"27");
 assert.equal(get("inc-state").textContent,"Sliding down · kinetic");
 get("inc-angle").value="30";get("inc-angle").oninput();
 approx(get("inc-accel").textContent,9.8*(Math.sin(Math.PI/6)-.3*Math.cos(Math.PI/6)));
 const a1=get("inc-accel").textContent;
 get("inc-mass").value="8";get("inc-mass").oninput();
 assert.equal(get("inc-accel").textContent,a1,"Downslope acceleration must not depend on mass");
 assert.ok(get("inc-plot").innerHTML.includes("rect"));
 get("inc-static").value=".1";get("inc-static").oninput();
 assert.equal(get("inc-kinetic").value,".1","Kinetic coefficient must not exceed static in this model");
 get("inc-reset").onclick();
 assert.equal(get("inc-state").textContent,"At rest · static");
}
console.log("PASS contact mechanics: static threshold, kinetic branch, ramp decomposition, critical angle, mass cancellation, coefficient clamp and reset");
