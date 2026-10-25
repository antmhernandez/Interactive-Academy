import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source=fs.readFileSync(new URL("../applets/energy-ramp.js",import.meta.url),"utf8");
const f=n=>String(Number(Number(n).toFixed(3)));
const {energyRampState,energyRamp}=vm.runInNewContext(source+"\n({energyRampState,energyRamp})",{f});
const close=(a,b,tol=1e-8)=>assert.ok(Math.abs(a-b)<tol,`Expected ${b} from ${a}`);
function harness(){
 const defaults={"#en-mass":"2","#en-height":"5","#en-start":"0","#en-mu":".2","#en-progress":"0"};
 const cache=new Map();
 const el={innerHTML:"",querySelector(selector){
  if(!cache.has(selector))cache.set(selector,{value:defaults[selector]??"",textContent:"",innerHTML:"",oninput:null,onclick:null,
    setAttribute(name,value){this[name]=value;},getAttribute(name){return this[name];}});
  return cache.get(selector);
 }};
 return {el,get:id=>el.querySelector("#"+id)};
}
{
 const q=energyRampState(2,5,0,.2,0);
 close(q.total,98);close(q.potential,98);close(q.kinetic,0);close(q.thermal,0);close(q.speed,0);
 const p=energyRampState(2,5,0,.2,.5),end=energyRampState(2,5,0,.2,1);
 for(const e of [p,end])close(e.kinetic+e.potential+e.thermal,e.total);
 close(p.potential,49);
 close(end.potential,0);
 close(end.thermal,.2*2*9.8*5/Math.tan(35*Math.PI/180));
 close(end.kinetic,98-end.thermal);
 close(end.speed,Math.sqrt(2*end.kinetic/2));
 assert.ok(end.time>0&&end.acceleration>0);
}
{
 const frictionless=energyRampState(2,5,0,0,1);
 close(frictionless.thermal,0);close(frictionless.kinetic,98);
 close(frictionless.speed,Math.sqrt(2*9.8*5));
 const initial=energyRampState(2,5,4,0,0);
 close(initial.kinetic,16);close(initial.potential,98);close(initial.total,114);
 const heavy=energyRampState(4,5,0,.2,1);
 const light=energyRampState(2,5,0,.2,1);
 close(heavy.speed,light.speed);
 for(const m of [1,2,5,8])for(const H of [2,5,12])
  for(const v of [0,4,8])for(const mu of [0,.15,.4])
   for(const progress of [0,.1,.37,.75,1]){
    const e=energyRampState(m,H,v,mu,progress);
    close(e.kinetic+e.potential+e.thermal,e.total,1e-6);
    assert.ok(e.kinetic>=-1e-7&&e.potential>=-1e-7&&e.thermal>=-1e-7);
    assert.ok(Number.isFinite(e.speed)&&Number.isFinite(e.time));
   }
}
{
 const {el,get}=harness();
 energyRamp(el);
 assert.equal(get("en-k").textContent,"0 J");
 assert.equal(get("en-u").textContent,"98 J");
 assert.equal(get("en-total").textContent,"98 J");
 get("en-step").onclick();
 assert.equal(get("en-progress").value,"10");
 assert.ok(Number.parseFloat(get("en-thermal").textContent)>0);
 get("en-progress").value="100";get("en-progress").oninput();
 close(Number.parseFloat(get("en-k").textContent)+Number.parseFloat(get("en-thermal").textContent),98,.006);
 get("en-lossless").onclick();
 assert.equal(get("en-k").textContent,"98 J");
 assert.equal(get("en-thermal").textContent,"0 J");
 get("en-start").value="4";get("en-start").oninput();
 assert.equal(get("en-total").textContent,"114 J");
 get("en-reset").onclick();
 assert.equal(get("en-progress").value,"0");
 assert.equal(get("en-total").textContent,"98 J");
 assert.ok(get("en-bars").innerHTML.includes("rect"));
}
console.log("PASS energy model: zero-friction limit, height and speed calculations, Joule conservation grid, scrub, compare, and reset");
