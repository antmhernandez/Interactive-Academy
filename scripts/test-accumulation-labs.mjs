import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";

const source=fs.readFileSync(new URL("../applets/accumulation-labs.js",import.meta.url),"utf8");
const {velocityAccumulationState,riemannLinearState}=vm.runInNewContext(source+"\n({velocityAccumulationState,riemannLinearState})",{});
const equal=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,actual+" differs from "+expected);

let checks=0;
for(const scenario of ["forward","reverse"]){
 for(const T of [0,.25,.5,1,2,2.5,3,3.25,4,5]){
  for(const n of [2,4,8,16,24]){
   for(const endpoint of ["left","right"]){
    const q=velocityAccumulationState(scenario,T,n,endpoint);
    const F=scenario==="forward"?3*T+T*T/2:6*T-T*T;
    const slope=scenario==="forward"?1:-2;
    const signedError=slope*T*T/(2*n)*(endpoint==="right"?1:-1);
    equal(q.exact,F);equal(q.positive+q.negative,q.exact);
    equal(q.distance,q.positive-q.negative);
    equal(q.width,T/n);equal(q.estimate,q.exact+signedError);equal(q.error,signedError);
    equal(q.rectangles.reduce((a,r)=>a+r.signed,0),q.estimate);
    for(const item of q.rectangles){
     equal(item.sample,endpoint==="left"?item.a:item.b);
     equal(item.signed,q.width*item.height);
    }
    assert.equal(q.rectangles.length,n);
    if(scenario==="reverse"&&T>3){
     equal(q.positive,9);
     equal(q.negative,q.exact-9);
    }else equal(q.negative,0);
    checks++;
   }
  }
 }
}
const reversal=velocityAccumulationState("reverse",5,4,"left");
equal(reversal.exact,5);equal(reversal.positive,9);equal(reversal.negative,-4);equal(reversal.distance,13);
const forward=velocityAccumulationState("forward",2,4,"left");
equal(forward.exact,8);equal(forward.distance,8);

for(let n=2;n<=32;n++){
 for(const method of ["left","right","midpoint"]){
  const q=riemannLinearState(n,method);
  equal(q.width,4/n);equal(q.sum,q.rectangles.reduce((a,r)=>a+r.area,0));
  equal(q.sum,method==="left"?8-8/n:method==="right"?8+8/n:8);
  equal(q.error,q.sum-8);equal(q.left+q.right,16);equal(q.midpoint,8);
  for(const item of q.rectangles){
   const alpha=method==="left"?0:method==="right"?1:.5;
   equal(item.sample,item.a+alpha*q.width);
   equal(item.area,item.sample*q.width);
  }
  checks++;
 }
}
for(const args of [["forward",-1,4,"left"],["forward",6,4,"left"],["unknown",2,4,"left"],
 ["reverse",2,1,"left"],["reverse",2,25,"right"],["reverse",2,4,"middle"]]){
 assert.throws(()=>velocityAccumulationState(...args),/Invalid velocity/);
}
for(const args of [[0,"right"],[33,"right"],[5.5,"left"],[4,"other"]]){
 assert.throws(()=>riemannLinearState(...args),/Invalid Riemann/);
}
console.log("PASS signed accumulation and Riemann models: "+checks+" numerical scenarios; conservation, reversal, signed errors, sample locations and domain guards");
