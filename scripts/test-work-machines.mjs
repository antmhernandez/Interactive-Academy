import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const source=fs.readFileSync(new URL("../applets/work-machines.js",import.meta.url),"utf8");
const f=n=>String(Number(Number(n).toFixed(3)));
const {workAngleState,simpleMachineState,workAngleLab,simpleMachineLab}=vm.runInNewContext(source+"\n({workAngleState,simpleMachineState,workAngleLab,simpleMachineLab})",{f});
function close(actual,expected,tol=1e-8){assert.ok(Math.abs(actual-expected)<=tol,`Expected ${expected}, got ${actual}`);}
function harness(initial){
 const nodes=new Map(),el={innerHTML:"",querySelector(selector){
  if(!nodes.has(selector))nodes.set(selector,{value:initial[selector]??"",textContent:"",innerHTML:"",onclick:null,oninput:null,setAttribute(k,v){this[k]=v;},getAttribute(k){return this[k];}});
  return nodes.get(selector);
 }};
 return {el,get:id=>el.querySelector("#"+id)};
}
{
 const x=workAngleState(20,4,60);
 close(x.work,40);close(x.parallel,10);close(x.perpendicular,20*Math.sqrt(3)/2);
 close(workAngleState(40,3,60).work,60);
 close(workAngleState(20,4,90).work,0);
 close(workAngleState(20,4,180).work,-80);
 close(workAngleState(0,4,60).work,0);
 for(const F of [0,10,25,60])for(const d of [1,3,5,8])
  for(const angle of [0,15,45,60,90,120,150,180]){
   const q=workAngleState(F,d,angle);
   close(q.work,q.parallel*d);
   close(q.parallel**2+q.perpendicular**2,F**2,1e-7);
   close(q.work,F*d*Math.cos(angle*Math.PI/180));
  }
}
{
 const defaultQ=simpleMachineState(50,2,.5,80,4);
 close(defaultQ.inputWork,100);close(defaultQ.outputWork,80);close(defaultQ.outputForce,160);
 close(defaultQ.actualAdvantage,3.2);close(defaultQ.idealAdvantage,4);
 close(defaultQ.inputPower,25);close(defaultQ.usefulPower,20);close(defaultQ.lostToOtherStores,20);
 const ideal=simpleMachineState(50,2,.5,100,4);
 close(ideal.outputForce,200);close(ideal.lostToOtherStores,0);close(ideal.actualAdvantage,ideal.idealAdvantage);
 const shorter=simpleMachineState(50,2,.25,80,4);
 close(shorter.outputForce/defaultQ.outputForce,2);
 const halfTime=simpleMachineState(50,2,.5,80,2);
 close(halfTime.inputWork,defaultQ.inputWork);close(halfTime.inputPower/defaultQ.inputPower,2);
 for(const F of [10,30,60,100])for(const di of [.5,2,3,5])
  for(const dout of [.25,1,2,5])for(const eta of [40,60,80,100])for(const t of [1,4,10]){
   const q=simpleMachineState(F,di,dout,eta,t);
   close(q.outputWork+q.lostToOtherStores,q.inputWork);
   close(q.outputWork,q.outputForce*dout);
   close(q.outputWork/q.inputWork,eta/100);
   close(q.actualAdvantage,q.idealAdvantage*eta/100);
   close(q.inputPower*t,q.inputWork);
   close(q.usefulPower*t,q.outputWork);
   assert.ok(q.lostToOtherStores>=-1e-9&&q.outputForce>=0);
  }
}
{
 const {el,get}=harness({"#wa-force":"20","#wa-distance":"4","#wa-angle":"60"});
 workAngleLab(el);
 assert.equal(get("wa-work").textContent,"40 J");
 assert.equal(get("wa-parallel").textContent,"10 N");
 get("wa-perpendicular").onclick();assert.equal(get("wa-work").textContent,"0 J");
 get("wa-back").onclick();assert.equal(get("wa-work").textContent,"-80 J");
 get("wa-forward").onclick();assert.equal(get("wa-work").textContent,"80 J");
 get("wa-force").value="0";get("wa-force").oninput();assert.equal(get("wa-work").textContent,"0 J");
 assert.ok(get("wa-arrows").innerHTML.includes("path"));
 get("wa-reset").onclick();assert.equal(get("wa-work").textContent,"40 J");
}
{
 const {el,get}=harness({"#ma-force":"50","#ma-distance":"2","#ma-output":".5","#ma-efficiency":"80","#ma-time":"4"});
 simpleMachineLab(el);
 assert.equal(get("ma-work-in").textContent,"100 J");
 assert.equal(get("ma-work-out").textContent,"80 J");
 assert.equal(get("ma-output-force").textContent,"160 N");
 assert.equal(get("ma-power").textContent,"25 W / 20 W");
 assert.equal(get("ma-advantage").textContent,"3.2× / 4×");
 get("ma-ideal").onclick();
 assert.equal(get("ma-work-out").textContent,"100 J");
 assert.equal(get("ma-loss").textContent,"0 J");
 get("ma-shorter").onclick();assert.equal(get("ma-output-force").textContent,"400 N");
 get("ma-time").value="2";get("ma-time").oninput();assert.equal(get("ma-power").textContent,"50 W / 50 W");
 assert.ok(get("ma-graph").innerHTML.includes("rect"));
 get("ma-reset").onclick();assert.equal(get("ma-output-force").textContent,"160 N");
}
console.log("PASS work and simple machines: signed force angle, 0-work perpendicular, conservative machine energy flow, power/time, force-distance tradeoff, and all controls");
