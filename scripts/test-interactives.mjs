import fs from "node:fs";
import assert from "node:assert/strict";
import vm from "node:vm";

const source=fs.readFileSync(new URL("../app.js",import.meta.url),"utf8");
const format=n=>String(Number(Number(n).toFixed(3)));
function renderer(name){
 const start=source.indexOf("function "+name+"(");
 assert.ok(start>=0,"Missing simulator "+name);
 const next=source.indexOf("\nfunction ",start+9);
 const code=source.slice(start,next<0?undefined:next);
 return vm.runInNewContext("("+code+")",{f:format});
}
function createElement(initial){
 const objects=new Map();
 const el={
  innerHTML:"",
  querySelector(selector){
   if(!objects.has(selector))objects.set(selector,{value:initial[selector]??"",textContent:"",innerHTML:"",oninput:null});
   return objects.get(selector);
  }
 };
 return {el,get:key=>el.querySelector(key)};
}
{
 const {el,get}=createElement({"#f-strength":"20","#f-angle":"60"});
 renderer("forceComponents")(el);
 assert.equal(get("#fx-read").textContent,"10 N");
 assert.equal(get("#fy-read").textContent,"17.321 N");
 get("#f-angle").value="0";get("#f-angle").oninput();
 assert.equal(get("#fx-read").textContent,"20 N");
 assert.equal(get("#fy-read").textContent,"0 N");
 assert.ok(get("#components-plot").innerHTML.includes("Fₓ"));
}
{
 const {el,get}=createElement({"#fb-mass":"3","#fb-push":"10"});
 renderer("freeBody")(el);
 assert.equal(get("#fb-normal").textContent,"29.4 N up");
 assert.equal(get("#fb-weight").textContent,"29.4 N down");
 assert.equal(get("#fb-net").textContent,"10 N right");
 get("#fb-mass").value="4";get("#fb-mass").oninput();
 assert.equal(get("#fb-normal").textContent,"39.2 N up");
}
{
 const {el,get}=createElement({"#nt-f":"12","#nt-m":"3"});
 renderer("newtonTwo")(el);
 assert.equal(get("#nt-a").textContent,"+4 m/s²");
 assert.equal(get("#nt-x").textContent,"+8 m");
 get("#nt-f").value="-12";get("#nt-f").oninput();
 assert.equal(get("#nt-a").textContent,"-4 m/s²");
 assert.equal(get("#nt-x").textContent,"-8 m");
}
{
 const {el,get}=createElement({"#lh-x":"1"});
 renderer("limitHole")(el);
 assert.equal(get("#lh-y").textContent,"undefined");
 assert.ok(get("#limit-plot").innerHTML.includes('fill="#f8fbf9"'));
 get("#lh-x").value=".9";get("#lh-x").oninput();
 assert.equal(get("#lh-y").textContent,"1.9");
}
console.log("PASS: force projection, free-body balance, net-force acceleration and one-sided limit visual readouts");
