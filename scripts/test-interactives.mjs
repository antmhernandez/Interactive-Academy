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

{
 const {el,get}=createElement({"#n-high":"3","#n-low":"2"});
 renderer("hydrogenSpectrum")(el);
 assert.ok(Math.abs(parseFloat(get("#atom-wavelength").textContent)-656.471)<1,"Hydrogen Balmer alpha line");
 assert.equal(get("#atom-band").textContent,"Visible");
 get("#n-low").value="1";get("#n-low").onchange();
 assert.equal(get("#atom-band").textContent,"Ultraviolet");
}
{
 const {el,get}=createElement({"#side-direction":"left","#side-delta":".6"});
 renderer("oneSidedLimit")(el);
 assert.equal(get("#side-output").textContent,"f(0.4) = 2.4");
 get("#side-direction").value="right";get("#side-direction").onchange();
 assert.equal(get("#side-output").textContent,"f(1.6) = 5.6");
}
{
 const {el,get}=createElement({"#sh-slider":"2"});
 renderer("slopeHeight")(el);
 assert.equal(get("#sh-position").textContent,"8 m");
 get("#sh-slider").value="4";get("#sh-slider").oninput();
 assert.equal(get("#sh-position").textContent,"14 m");
}
{
 const {el,get}=createElement({"#sign-v-dir":"1","#sign-a-dir":"1"});
 renderer("signSpeed")(el);
 assert.equal(get("#sign-after").textContent,"5 m/s");
 assert.equal(get("#sign-result").textContent,"Increasing");
 get("#sign-v-dir").value="-1";get("#sign-v-dir").onchange();
 assert.equal(get("#sign-after").textContent,"3 m/s");
 assert.equal(get("#sign-result").textContent,"Decreasing");
}
{
 const {el,get}=createElement({"#lv-slider":"5"});
 renderer("limitValue")(el);
 assert.equal(get("#lv-current").textContent,"5");
 get("#lv-slider").value="-1";get("#lv-slider").oninput();
 assert.equal(get("#lv-current").textContent,"-1");
}
{
 const {el,get}=createElement({"#unit-slider":"2.5"});
 renderer("unitConversion")(el);
 assert.equal(get("#unit-meters").textContent,"2.5 m");
 assert.equal(get("#unit-centimeters").textContent,"250 cm");
 get("#unit-slider").value="4.2";get("#unit-slider").oninput();
 assert.equal(get("#unit-centimeters").textContent,"420 cm");
}

{
 const {el,get}=createElement({"#ruler-pos":"26.4","#ruler-resolution":"1"});
 renderer("measurementRuler")(el);
 assert.equal(get("#measure-reading").textContent,"26.0 mm");
 assert.equal(get("#measure-uncertainty").textContent,"±0.5 mm");
 get("#ruler-resolution").value=".5";get("#ruler-resolution").onchange();
 assert.equal(get("#measure-reading").textContent,"26.50 mm");
 assert.equal(get("#measure-uncertainty").textContent,"±0.25 mm");
 assert.ok(get("#ruler-plot").innerHTML.includes("object")===false||get("#ruler-plot").innerHTML.length>500);
}
{
 const {el,get}=createElement({"#sig-a":"2.40","#sig-b":"3.1"});
 renderer("significantDigits")(el);
 assert.equal(get("#sig-raw").textContent,"7.44");
 assert.equal(get("#sig-rounded").textContent,"7.4");
 assert.equal(get("#sig-count").textContent,"2");
 get("#sig-a").value="12.36";get("#sig-b").value="4.25";get("#sig-b").onchange();
 assert.equal(get("#sig-count").textContent,"3");
}
{
 const {el,get}=createElement({"#unit-scenario":"distance"});
 renderer("unitCancellation")(el);
 assert.equal(get("#unit-cancel-answer").textContent,"12 m");
 get("#unit-scenario").value="convert";get("#unit-scenario").onchange();
 assert.equal(get("#unit-cancel-answer").textContent,"10 m/s");
}
{
 const {el,get}=createElement({"#slope-t1":"0","#slope-t2":"2"});
 renderer("slopeToolkit")(el);
 assert.equal(get("#slope-value").textContent,"2 m/s");
 get("#slope-t2").value="4";get("#slope-t2").oninput();
 assert.equal(get("#slope-rise").textContent,"16 m");
 assert.equal(get("#slope-value").textContent,"4 m/s");
}

{
 const {el,get}=createElement({"#velocity-speed":"20","#velocity-angle":"30"});
 renderer("velocityComponents")(el);
 assert.equal(get("#velocity-x").textContent,"17.321 m/s");
 assert.equal(get("#velocity-y").textContent,"10 m/s");
 get("#velocity-angle").value="90";get("#velocity-angle").oninput();
 assert.equal(get("#velocity-x").textContent,"0 m/s");
 assert.equal(get("#velocity-y").textContent,"20 m/s");
 assert.ok(get("#velocity-vectors").innerHTML.includes("path"));
}
{
 const {el,get}=createElement({"#projectile-speed":"20","#projectile-angle":"45"});
 renderer("projectileMotion")(el);
 assert.ok(Math.abs(Number.parseFloat(get("#projectile-range").textContent)-400/9.8)<.002);
 assert.ok(Math.abs(Number.parseFloat(get("#projectile-flight").textContent)-2*20*Math.sin(Math.PI/4)/9.8)<.002);
 get("#projectile-angle").value="30";get("#projectile-angle").oninput();
 assert.ok(Math.abs(Number.parseFloat(get("#projectile-range").textContent)-400*Math.sin(Math.PI/3)/9.8)<.002);
 assert.ok(get("#projectile-trace").innerHTML.includes("path"));
}

{
 const {el,get}=createElement({"#circle-speed":"6","#circle-radius":"3"});
 renderer("circularMotion")(el);
 assert.equal(get("#circle-acceleration").textContent,"12 m/s²");
 assert.ok(Math.abs(parseFloat(get("#circle-period").textContent)-Math.PI)<.002);
 get("#circle-radius").value="6";get("#circle-radius").oninput();
 assert.equal(get("#circle-acceleration").textContent,"6 m/s²");
 get("#circle-speed").value="12";get("#circle-speed").oninput();
 assert.equal(get("#circle-acceleration").textContent,"24 m/s²");
 assert.ok(get("#circle-picture").innerHTML.includes("circle"));
 get("#circle-step").onclick();
 assert.ok(get("#circle-picture").innerHTML.includes("path"));
}
{
 const {el,get}=createElement({"#river-speed":"6","#river-current":"2","#river-heading":"0","#river-width":"90"});
 renderer("riverCrossing")(el);
 assert.equal(get("#river-time").textContent,"15 s");
 assert.equal(get("#river-drift").textContent,"30 m east");
 assert.ok(Math.abs(parseFloat(get("#river-ground-speed").textContent)-Math.sqrt(40))<.002);
 get("#river-aim").onclick();
 assert.ok(parseFloat(get("#river-drift").textContent)<2,"Upstream heading should nearly cancel drift");
 get("#river-reset").onclick();
 assert.equal(get("#river-drift").textContent,"30 m east");
 get("#river-current").value="0";get("#river-current").oninput();
 assert.ok(get("#river-drift").textContent.includes("opposite"));
}
console.log("PASS: original physics, calculus, circular motion and river-frame visual readouts");
