import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
const src=fs.readFileSync(new URL("../applets/rotation.js",import.meta.url),"utf8");
const f=n=>String(Number(Number(n).toFixed(3)));
const {torqueState,spinState,torqueLever,rotationalSpin}=vm.runInNewContext(src+"\n({torqueState,spinState,torqueLever,rotationalSpin})",{f});
const close=(a,b,tol=1e-9)=>assert.ok(Math.abs(a-b)<tol,`Expected ${b}, received ${a}`);
function mock(defaults){
 const cache=new Map();
 const el={innerHTML:"",querySelector(selector){
  if(!cache.has(selector))cache.set(selector,{value:defaults[selector]??"",textContent:"",innerHTML:"",oninput:null,onclick:null,setAttribute(k,v){this[k]=v;},getAttribute(k){return this[k];}});
  return cache.get(selector);
 }};
 return {el,get:id=>el.querySelector("#"+id)};
}
{
 const x=torqueState(.6,20,90);close(x.signedTorque,12);close(x.forcePerpendicular,20);close(x.leverArm,.6);
 close(torqueState(.6,20,0).signedTorque,0);
 close(torqueState(.6,20,-90).signedTorque,-12);
 close(torqueState(1.2,15,-60).signedTorque,-15*Math.sqrt(3)*1.2/2);
 assert.equal(torqueState(1,20,-90).direction,"clockwise");
 for(const r of [.2,.5,1,2])for(const F of [0,5,20,60])for(const angle of [-90,-60,-15,0,30,90]){
   const v=torqueState(r,F,angle);
   close(v.signedTorque,r*F*Math.sin(angle*Math.PI/180));
   assert.ok(v.leverArm<=r+1e-9);
 }
}
{
 const d=spinState("disk",4,1,8,2),h=spinState("hoop",4,1,8,2);
 close(d.I,2);close(d.alpha,4);close(d.omega,8);close(d.theta,8);close(d.kinetic,64);close(d.work,64);
 close(h.I,4);close(h.alpha,2);close(h.omega,4);close(h.theta,4);
 close(d.alpha/h.alpha,2);close(d.kinetic/d.work,1);
 for(const shape of ["disk","hoop"])for(const m of [1,4,8])for(const R of [.5,1,2])
  for(const torque of [0,4,8,20])for(const t of [0,.5,2,5]){
   const q=spinState(shape,m,R,torque,t);
   const factor=shape==="disk"?.5:1;
   close(q.I,factor*m*R*R);
   close(q.alpha*q.I,torque);
   close(q.omega,q.alpha*t);
   close(q.theta,.5*q.alpha*t*t);
   close(q.kinetic,q.work,1e-7);
   assert.ok(Number.isFinite(q.turns));
  }
}
{
 const {el,get}=mock({"#tl-radius":"1","#tl-force":"20","#tl-angle":"90"});
 torqueLever(el);
 assert.equal(get("tl-torque").textContent,"+20 N·m");
 get("tl-angle").value="-90";get("tl-angle").oninput();
 assert.equal(get("tl-torque").textContent,"-20 N·m");
 assert.equal(get("tl-status").textContent,"Clockwise");
 get("tl-along").onclick();assert.equal(get("tl-torque").textContent,"0 N·m");
 get("tl-perpendicular").onclick();assert.equal(get("tl-torque").textContent,"+20 N·m");
 assert.ok(get("tl-vectors").innerHTML.includes("path"));
 get("tl-reset").onclick();assert.equal(get("tl-radius").value,"1");
}
{
 const {el,get}=mock({"#sp-shape":"disk","#sp-mass":"4","#sp-radius":"1","#sp-torque":"8","#sp-time":"2"});
 rotationalSpin(el);
 assert.equal(get("sp-inertia").textContent,"2 kg·m²");
 assert.equal(get("sp-alpha").textContent,"4 rad/s²");
 assert.equal(get("sp-omega").textContent,"8 rad/s");
 assert.equal(get("sp-energy").textContent,"64 J");
 get("sp-compare").onclick();
 assert.equal(get("sp-shape").value,"hoop");
 assert.equal(get("sp-alpha").textContent,"2 rad/s²");
 assert.equal(get("sp-energy").textContent,"32 J");
 get("sp-time").value="3";get("sp-time").oninput();
 assert.equal(get("sp-omega").textContent,"6 rad/s");
 get("sp-step").onclick();
 assert.equal(get("sp-time").value,"3.5");
 assert.ok(get("sp-wheel").innerHTML.includes("circle"));
 get("sp-reset").onclick();
 assert.equal(get("sp-shape").value,"disk");
 assert.equal(get("sp-energy").textContent,"64 J");
}
console.log("PASS rotation: signed torque, disk/hoop inertia, angular motion, torque-work energy, comparison and reset");
