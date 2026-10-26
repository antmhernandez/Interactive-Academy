import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source=fs.readFileSync(new URL("../applets/derivative-lab.js",import.meta.url),"utf8");
const {derivativeSecantState,tangentMagnitudes}=vm.runInNewContext(source+"\n({derivativeSecantState,tangentMagnitudes})",{});
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,a+" differs from "+b);

assert.equal(tangentMagnitudes.length,5);
near(tangentMagnitudes[0],1);
near(tangentMagnitudes[4],.0625);
for(const a of [-1.4,-1,-.3,0,.7,1,1.4]){
 for(const d of tangentMagnitudes){
  const L=derivativeSecantState(a,d,"left");
  const R=derivativeSecantState(a,d,"right");
  near(L.h,-d);near(R.h,d);
  near(L.x1,a-d);near(R.x1,a+d);
  near(L.rise/L.run,L.secant);near(R.rise/R.run,R.secant);
  near(L.secant,2*a-d);near(R.secant,2*a+d);
  near(L.algebraic,L.secant);near(R.algebraic,R.secant);
  near(L.derivative,2*a);near(R.derivative,2*a);
  near(L.error,-d);near(R.error,d);
  near((L.secant+R.secant)/2,2*a);
  assert.notEqual(L.run,0);assert.notEqual(R.run,0);
 }
}
near(derivativeSecantState(-1,.5,"right").secant,-1.5);
near(derivativeSecantState(-1,.5,"left").secant,-2.5);
near(derivativeSecantState(0,.5,"right").secant,.5);
near(derivativeSecantState(0,.5,"left").secant,-.5);
for(const spacing of [0,-.1,NaN,Infinity])assert.throws(()=>derivativeSecantState(1,spacing,"left"),/nonzero spacing/);
assert.throws(()=>derivativeSecantState(1,.2,"neither"),/nonzero spacing/);
assert.throws(()=>derivativeSecantState(Infinity,.2,"left"),/nonzero spacing/);
console.log("PASS Calculus derivative: signed secants, exact quotient, two-sided convergence, domain and zero-denominator guard");
