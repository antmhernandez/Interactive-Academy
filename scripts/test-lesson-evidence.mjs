import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const energySource=fs.readFileSync(new URL("../applets/energy-ramp.js",import.meta.url),"utf8");
const evidenceSource=fs.readFileSync(new URL("../applets/lesson-evidence.js",import.meta.url),"utf8");
const energyRampState=vm.runInNewContext(energySource+"\nenergyRampState;",{});
const featuredEvidence=vm.runInNewContext(evidenceSource+"\nfeaturedEvidence;",{energyRampState});
const near=(value,want)=>assert.ok(Math.abs(value-want)<1e-9,String(value)+" ≠ "+want);

const slope=featuredEvidence("graph-slope-physics",{start:0,end:2});
near(slope.values.run,2);
near(slope.values.rise,4);
near(slope.values.slope,2);
assert.match(slope.calculation,/m\/s/);
assert.match(slope.description,/secant/);
near(featuredEvidence("graph-slope-physics",{start:0,end:4}).values.slope,4);

const atRest=featuredEvidence("friction",{pull:20,mass:5,static:.5,kinetic:.3});
near(atRest.values.normal,49);
near(atRest.values.limit,24.5);
near(atRest.values.actual,20);
near(atRest.values.acceleration,0);
assert.equal(atRest.values.sliding,false);
assert.match(atRest.interpretation,/does not automatically equal/);
const atLimit=featuredEvidence("friction",{pull:24.5,mass:5,static:.5,kinetic:.3});
assert.equal(atLimit.values.sliding,false,"equality must remain static for release-from-rest model");
const sliding=featuredEvidence("friction",{pull:25,mass:5,static:.5,kinetic:.3});
assert.equal(sliding.values.sliding,true);
near(sliding.values.actual,14.7);
near(sliding.values.net,10.3);
near(sliding.values.acceleration,2.06);
near(featuredEvidence("friction",{pull:30,mass:5,static:.25,kinetic:.6}).values.actual,12.25);

for(const p of [0,.25,.5,.75,1]){
 for(const mu of [0,.2,.4]){
  const e=featuredEvidence("energy-conservation",{mass:2,height:5,start:0,mu,progress:p*100});
  near(e.values.total,98);
  near(e.values.balance,e.values.total);
  near(e.values.losslessK-e.values.kinetic,e.values.thermal);
  near(e.values.height,5*(1-p));
  assert.match(e.description,/35-degree/);
  assert.match(e.calculation,/thermal transfer/);
 }
}
const img=energySource.match(/M88 (\d+)L438 325H88Z/);
assert.ok(img,"Ramp visual triangle exists");
near((325-Number(img[1]))/(438-88),245/350);
assert.ok(Math.abs(Math.atan((325-Number(img[1]))/350)*180/Math.PI-35)<0.02,"Drawn slope agrees with 35-degree model");
console.log("PASS featured lesson evidence: secant, friction boundary, frictionless comparison, energy identity");
