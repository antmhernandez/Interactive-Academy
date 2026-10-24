/**
 * Ordinary least-squares fitting for x(t) = A + Bt [+ Ct^2].
 * All operations are local to the browser; no data are uploaded.
 * Time is centered/scaled and a Householder QR decomposition is used
 * to avoid the worst numerical problems of normal equations.
 */
export function fitMotion(points, degree = 2) {
  if (degree !== 1 && degree !== 2) throw new Error("Choose a linear or quadratic model.");
  if (!Array.isArray(points) || points.length < degree + 1 || points.length > 100) {
    throw new Error("A " + (degree === 1 ? "linear" : "quadratic") +
      " model requires at least " + (degree + 1) + " observations (maximum 100).");
  }

  const data = points.map((p, i) => {
    const t = Number(p.t), x = Number(p.x);
    if (!Number.isFinite(t) || !Number.isFinite(x) || t < 0 || t > 10000 || Math.abs(x) > 1e9) {
      throw new Error("Row " + (i + 1) + " needs a finite time (0–10,000 s) and position.");
    }
    return { t, x };
  }).sort((a, b) => a.t - b.t);

  for (let i = 1; i < data.length; i++) {
    if (Math.abs(data[i].t - data[i - 1].t) <= 1e-10) {
      throw new Error("Each observation must have a different time; check time " + data[i].t + " s.");
    }
  }
  const n = data.length, m = degree + 1;
  const center = data.reduce((s, p) => s + p.t, 0) / n;
  const scale = Math.max(...data.map(p => Math.abs(p.t - center)));
  if (!(scale > 0)) throw new Error("Observation times must be different.");

  const a = data.map(p => {
    const z = (p.t - center) / scale;
    return degree === 1 ? [1, z] : [1, z, z * z];
  });
  const y = data.map(p => p.x);

  // Householder reflections turn the design matrix into an upper triangular R.
  for (let k = 0; k < m; k++) {
    let norm = 0;
    for (let i = k; i < n; i++) norm = Math.hypot(norm, a[i][k]);
    if (norm < 1e-12) throw new Error("The times do not support a stable model fit.");
    const alpha = -(a[k][k] >= 0 ? 1 : -1) * norm;
    const v = Array(n - k);
    for (let i = k; i < n; i++) v[i - k] = a[i][k];
    v[0] -= alpha;
    let normSq = v.reduce((sum, value) => sum + value * value, 0);
    if (!(normSq > 1e-24)) throw new Error("The observations cannot be fitted reliably.");

    for (let j = k; j < m; j++) {
      let dot = 0;
      for (let i = k; i < n; i++) dot += v[i - k] * a[i][j];
      const factor = 2 * dot / normSq;
      for (let i = k; i < n; i++) a[i][j] -= factor * v[i - k];
    }
    let dotY = 0;
    for (let i = k; i < n; i++) dotY += v[i - k] * y[i];
    const factorY = 2 * dotY / normSq;
    for (let i = k; i < n; i++) y[i] -= factorY * v[i - k];
  }

  const beta = Array(m).fill(0);
  for (let i = m - 1; i >= 0; i--) {
    let sum = y[i];
    for (let j = i + 1; j < m; j++) sum -= a[i][j] * beta[j];
    if (Math.abs(a[i][i]) < 1e-12) throw new Error("The model is poorly determined.");
    beta[i] = sum / a[i][i];
  }

  const C = degree === 2 ? beta[2] / (scale * scale) : 0;
  const B = beta[1] / scale - 2 * center * C;
  const A = beta[0] - beta[1] * center / scale + C * center * center;
  const coefficients = { A, B, C };
  const predict = t => A + B * t + C * t * t;
  const rows = data.map(p => {
    const fitted = predict(p.t);
    return { t: p.t, x: p.x, fitted, residual: p.x - fitted };
  });

  const meanX = data.reduce((sum, p) => sum + p.x, 0) / n;
  const sse = rows.reduce((sum, p) => sum + p.residual * p.residual, 0);
  const sst = data.reduce((sum, p) => sum + (p.x - meanX) ** 2, 0);
  const r2 = sst <= 1e-20 ? null : Math.max(0, Math.min(1, 1 - sse / sst));
  const rmsResidual = Math.sqrt(sse / n);

  return { degree, coefficients, rows, r2, rmsResidual,
    acceleration: degree === 2 ? 2 * C : null,
    initialVelocity: B,
    initialPosition: A,
    timeRange: [data[0].t, data[n - 1].t],
    sampleSize: n };
}

export function toCsv(result) {
  const header = "time_s,position_m,model_position_m,residual_m";
  const rows = result.rows.map(p =>
    [p.t, p.x, p.fitted, p.residual].map(v => Number(v).toPrecision(12)).join(","));
  return [header, ...rows].join("\n") + "\n";
}
