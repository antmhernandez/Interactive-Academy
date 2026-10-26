import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const src=fs.readFileSync(new URL("../applets/momentum.js",import.meta.url),"utf8");
const f=n=>String(Number(Number(n).toFixed(3)));
const {impulsePulseState,momentumCollisionState,impulsePulse,momentumCollision}=vm.runInNewContext(src+"\n({impulsePulseState,momentumCollisionState,impulsePulse,momentumCollision})",{f});
function close(a,b,tol=1e-8){assert.ok(Math.abs(a-b)<tol,`Expected ${b}, got ${a}`);}
function harness(defaults){
 const store=new Map();
 const el={innerHTML:"",querySelector(selector){
  if(!store.has(selector))store.set(selector,{value:defaults[selector]??"",textContent:"",innerHTML:"",onclick:null,oninput:null,onchange:null,disabled:false,
   setAttribute(k,v){this[k]=v;},getAttribute(k){return this[k];}});
  return store.get(selector);
 }};
 return {el,get:id=>el.querySelector("#"+id)};
}
{
 const q=impulsePulseState(3,12,2,1);
 close(q.initialMomentum,3);close(q.impulse,24);close(q.finalMomentum,27);close(q.velocityChange,8);close(q.finalVelocity,9);
 const same=impulsePulseState(3,6,4,1);
 close(same.impulse,q.impulse);close(same.finalVelocity,q.finalVelocity);
 const reverse=impulsePulseState(2,-10,1,3);
 close(reverse.impulse,-10);close(reverse.finalVelocity,-2);
 for(const m of [1,2,3,8])for(const force of [-24,-12,0,8,24])
  for(const dt of [.5,1,2,6])for(const initial of [-8,-2,0,8]){
   const p=impulsePulseState(m,force,dt,initial);
   close(p.finalMomentum-p.initialMomentum,p.impulse);
   close(p.finalVelocity-initial,p.impulse/m);
  }
}
{
 const stick=momentumCollisionState(2,3,4,-2,"stick");
 close(stick.beforeA,8);close(stick.beforeB,-6);close(stick.totalBefore,2);
 close(stick.velocityAfterA,.4);close(stick.velocityAfterB,.4);
 close(stick.totalAfter,2);close(stick.kineticBefore,22);close(stick.kineticAfter,.4);
 close(stick.nonmechanicalTransfer,21.6);
 const bounce=momentumCollisionState(2,3,4,-2,"elastic");
 close(bounce.velocityAfterA,-3.2);close(bounce.velocityAfterB,2.8);
 close(bounce.totalAfter,2);close(bounce.kineticAfter,22);
 close(bounce.nonmechanicalTransfer,0);
 const zero=momentumCollisionState(2,3,3,-2,"stick");
 close(zero.totalBefore,0);close(zero.velocityAfterA,0);
 for(const m1 of [1,2,3,8])for(const m2 of [1,2,5,8])
  for(const v1 of [2,3,6,8])for(const v2 of [-5,-3,-1,0,1])
   for(const mode of ["stick","elastic"]){
    const x=momentumCollisionState(m1,m2,v1,v2,mode);
    close(x.momentumResidual,0,1e-8);
    close(x.totalAfter,x.totalBefore,1e-8);
    assert.ok(x.kineticAfter<=x.kineticBefore+1e-7);
    assert.ok(x.nonmechanicalTransfer>=-1e-9);
    if(mode==="elastic")close(x.kineticAfter,x.kineticBefore,1e-7);
    else close(x.velocityAfterA,x.velocityAfterB);
   }
 assert.throws(()=>momentumCollisionState(1,1,1,1,"stick"));
 assert.throws(()=>momentumCollisionState(1,1,3,-2,"teleport"));
}
{
 const {el,get}=harness({"#ip-mass":"3","#ip-force":"12","#ip-duration":"2","#ip-velocity":"1"});
 impulsePulse(el);
 assert.equal(get("ip-impulse").textContent,"+24 N·s");
 assert.equal(get("ip-final").textContent,"27 kg·m/s");
 assert.equal(get("ip-vfinal").textContent,"9 m/s");
 get("ip-same").onclick();
 assert.equal(get("ip-force").value,"6");
 assert.equal(get("ip-duration").value,"4");
 assert.equal(get("ip-vfinal").textContent,"9 m/s");
 get("ip-force").value="-10";get("ip-force").oninput();
 assert.equal(get("ip-impulse").textContent,"-40 N·s");
 assert.ok(get("ip-plot").innerHTML.includes("rect"));
 get("ip-reset").onclick();assert.equal(get("ip-impulse").textContent,"+24 N·s");
}
{
 const {el,get}=harness({"#co-mass-a":"2","#co-mass-b":"3","#co-vel-a":"4","#co-vel-b":"-2","#co-mode":"stick"});
 momentumCollision(el);
 assert.equal(get("co-p-before").textContent,"+2 kg·m/s");
 assert.equal(get("co-p-after").textContent,"Predict, then reveal");
 assert.equal(get("co-stage-label").textContent,"Before collision");
 get("co-reveal").onclick();
 assert.equal(get("co-p-after").textContent,"+2 kg·m/s");
 assert.equal(get("co-va-after").textContent,"+0.4 m/s");
 assert.equal(get("co-vb-after").textContent,"+0.4 m/s");
 assert.equal(get("co-k-change").textContent,"21.6 J");
 get("co-compare").onclick();
 assert.equal(get("co-p-after").textContent,"Predict, then reveal");
 get("co-reveal").onclick();
 assert.equal(get("co-va-after").textContent,"-3.2 m/s");
 assert.equal(get("co-vb-after").textContent,"+2.8 m/s");
 assert.equal(get("co-k-change").textContent,"0 J");
 get("co-mass-a").value="8";get("co-mass-a").oninput();
 assert.equal(get("co-p-after").textContent,"Predict, then reveal");
 get("co-reset").onclick();
 assert.equal(get("co-mode").value,"stick");
 assert.equal(get("co-mass-a").value,"2");
 assert.equal(get("co-stage-label").textContent,"Before collision");
}
console.log("PASS Chapter 9: signed force impulse, equal impulse, reversal, momentum grids, elastic/sticking energy boundaries, reveal/compare/reset");
