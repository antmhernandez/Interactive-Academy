import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const source=fs.readFileSync(new URL("../applets/gravitation.js",import.meta.url),"utf8");
const f=n=>String(Number(Number(n).toFixed(3)));
const {gravityState,orbitState,gravityField,orbitGravity}=vm.runInNewContext(source+"\n({gravityState,orbitState,gravityField,orbitGravity})",{f});
function near(actual,expected,tolerance=1e-7){
 assert.ok(Number.isFinite(actual)&&Math.abs(actual-expected)<=tolerance,
  `Expected ${expected} ± ${tolerance}, got ${actual}`);
}
function harness(kind){
 const initial=kind==="gravity"
 ?{"#gr-mass":"1","#gr-test":"2","#gr-radius":"2"}
 :{"#or-mass":"1","#or-radius":"2","#or-test":"5","#or-phase":"0"};
 const cache=new Map();
 const el={innerHTML:"",querySelector(selector){
  if(!cache.has(selector))cache.set(selector,{value:initial[selector]??"",textContent:"",innerHTML:"",
   oninput:null,onclick:null,setAttribute(name,v){this[name]=v;},getAttribute(name){return this[name];}});
  return cache.get(selector);
 }};
 return {el,get:id=>el.querySelector("#"+id)};
}
{
 const G=6.67430e-11,M=5.9722e24,R=6.371e6;
 const q=gravityState(1,2,2),doubled=gravityState(1,2,4);
 near(q.g,G*M/(4*R*R),1e-10);
 near(q.force,2*q.g);
 near(q.ratio,.25);
 near(doubled.force/q.force,.25);
 near(gravityState(1,8,2).g,q.g);
 near(gravityState(1,8,2).force/q.force,4);
 near(gravityState(3,2,2).g/q.g,3);
 near(gravityState(1,2,1).g,9.82,.03);
 const r=orbitState(1,5,2);
 near(r.velocityKmS*1000,Math.sqrt(G*M/(2*R)),1e-7);
 near(r.acceleration,(r.velocityKmS*1000)**2/(2*R),1e-10);
 near(r.force,r.g*5,1e-10);
 near(r.periodHours,2*Math.PI*Math.sqrt((2*R)**3/(G*M))/3600,1e-10);
 near(r.normalForce,0);
 near(orbitState(1,10,2).velocityKmS,r.velocityKmS,1e-12);
 near(orbitState(1,10,2).force/r.force,2);
 near(orbitState(1,5,4).velocityKmS/r.velocityKmS,Math.SQRT1_2,1e-12);
 near(orbitState(1,5,4).periodHours/r.periodHours,2**1.5,1e-10);
 for(const Mmultiple of [1,2,5,10])for(const radii of [1.5,2,4,7,8])
  for(const mass of [1,5,10]){
   const x=orbitState(Mmultiple,mass,radii);
   assert.ok(x.g>0&&x.force>0&&x.velocityKmS>0&&x.periodHours>0);
   near(x.force/mass,x.g,1e-9);
  }
}
{
 const {el,get}=harness("gravity");
 gravityField(el);
 near(parseFloat(get("gr-g").textContent),gravityState(1,2,2).g,.0006);
 assert.equal(get("gr-ratio").textContent,"25%");
 get("gr-double").onclick();
 assert.equal(get("gr-radius").value,"4");
 assert.equal(get("gr-ratio").textContent,"6.25%");
 get("gr-test").value="8";get("gr-test").oninput();
 near(parseFloat(get("gr-g").textContent),gravityState(1,8,4).g,.0006);
 assert.ok(get("gr-field-plot").innerHTML.includes("circle"));
 get("gr-reset").onclick();
 assert.equal(get("gr-radius").value,"2");
 assert.equal(get("gr-force").textContent,f(gravityState(1,2,2).force)+" N inward");
}
{
 const {el,get}=harness("orbit");
 orbitGravity(el);
 near(parseFloat(get("or-speed").textContent),orbitState(1,5,2).velocityKmS,.0006);
 assert.equal(get("or-normal").textContent,"0 N");
 assert.ok(parseFloat(get("or-force").textContent)>0);
 get("or-step").onclick();
 assert.equal(get("or-phase").value,"30");
 assert.ok(get("or-plot").innerHTML.includes("path"));
 get("or-mass").value="4";get("or-mass").oninput();
 near(parseFloat(get("or-speed").textContent),orbitState(4,5,2).velocityKmS,.0006);
 get("or-reset").onclick();
 assert.equal(get("or-phase").value,"0");
 assert.equal(get("or-mass").value,"1");
}
console.log("PASS Chapter 7: inverse-square tests, orbit force/acceleration balance, Kepler period scaling, weightlessness and reset controls");
