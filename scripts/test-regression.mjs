import assert from "node:assert/strict";
import { fitMotion, toCsv } from "../lab/regression.mjs";

const close = (actual, expected, message, tolerance = 1e-8) =>
  assert.ok(Math.abs(actual - expected) <= tolerance,
    message + ": expected " + expected + ", received " + actual);

const quadratic = Array.from({length:6}, (_, t) => ({t, x:1 + 1.5*t + 0.4*t*t}));
const quadFit = fitMotion(quadratic, 2);
close(quadFit.coefficients.A, 1, "quadratic position");
close(quadFit.coefficients.B, 1.5, "quadratic initial velocity");
close(quadFit.coefficients.C, 0.4, "quadratic t squared coefficient");
close(quadFit.acceleration, 0.8, "quadratic acceleration");
close(quadFit.r2, 1, "perfect-fit R squared");
close(quadFit.rmsResidual, 0, "perfect-fit residual");
assert.equal(quadFit.rows.length, 6);
assert.ok(toCsv(quadFit).startsWith("time_s,position_m,model_position_m,residual_m"));

const constant = Array.from({length:7}, (_, t) => ({t, x:2 + 1.5*t}));
const lineFit = fitMotion(constant, 1);
close(lineFit.coefficients.A, 2, "line intercept");
close(lineFit.coefficients.B, 1.5, "line slope");
close(lineFit.acceleration ?? 0, 0, "line acceleration convention");
close(lineFit.r2, 1, "line exact R squared");

// Quadratic fitting should also recover a straight line with C ≈ 0.
close(fitMotion(constant, 2).coefficients.C, 0, "linear data under quadratic model");

// Shuffled observations must still result in ordered rows.
assert.deepEqual(fitMotion([constant[3],constant[0],constant[2],constant[1]],1)
  .rows.map(p=>p.t),[0,1,2,3]);

const constantPosition=fitMotion(Array.from({length:4},(_,t)=>({t,x:4})),1);
assert.equal(constantPosition.r2,null,"R² is undefined if observed position has no variation");
close(constantPosition.coefficients.B,0,"stationary line");

const exactThree=fitMotion([{t:0,x:1},{t:1,x:2},{t:2,x:5}],2);
close(exactThree.coefficients.C,1,"three-point quadratic interpolation");

const unusualTimes=fitMotion([20,21,22,23,24].map(t=>({t,x:4+3*t+2*t*t})),2);
close(unusualTimes.coefficients.A,4,"nonzero time origin intercept",1e-7);
close(unusualTimes.coefficients.B,3,"nonzero time origin velocity",1e-7);
close(unusualTimes.coefficients.C,2,"nonzero time origin acceleration coefficient",1e-7);

assert.throws(()=>fitMotion([{t:0,x:1},{t:0,x:2},{t:1,x:3}],2),/different time/);
assert.throws(()=>fitMotion([{t:0,x:1},{t:1,x:2}],2),/at least 3/);
assert.throws(()=>fitMotion([{t:-1,x:1},{t:0,x:2}],1),/finite time/);
assert.throws(()=>fitMotion([{t:0,x:1},{t:1,x:Infinity}],1),/finite time/);
assert.throws(()=>fitMotion([{t:0,x:1},{t:1,x:2}],4),/Choose a linear or quadratic/);

console.log("PASS: regression fit, scientific coefficients, residuals, data validation and CSV output");
