import { fitMotion, toCsv } from "./regression.mjs";

const tableBody = document.querySelector("#data-rows");
const dataSelect = document.querySelector("#dataset");
const modelSelect = document.querySelector("#model");
const status = document.querySelector("#fit-status");
const positionChart = document.querySelector("#position-chart");
const residualChart = document.querySelector("#residual-chart");
const equation = document.querySelector("#equation");
const metrics = document.querySelector("#metrics");
const moreMetrics = document.querySelector("#more-metrics");
const interpretation = document.querySelector("#interpretation");
const csvButton = document.querySelector("#download-csv");
const printButton = document.querySelector("#print-report");
let result = null;

const samples = {
  constant: Array.from({ length: 6 }, (_, i) => ({ t: i, x: 2 + 1.5 * i })),
  accelerated: Array.from({ length: 6 }, (_, i) => ({ t: i, x: 1 + 1.5 * i + 0.4 * i * i })),
  noisy: [1, 2.4, 4.7, 7.3, 10.9, 14.8].map((x, t) => ({ t, x }))
};

function format(value, digits = 4) {
  if (!Number.isFinite(value)) return "—";
  if (Math.abs(value) < 1e-10) return "0";
  return Number(value.toPrecision(digits)).toString();
}
const svgNumber = value => Number(value.toFixed(3));

function makeRow(row, number) {
  const tr = document.createElement("tr");
  const index = document.createElement("th");
  index.scope = "row";
  index.textContent = String(number);
  tr.append(index);
  for (const [kind, val] of [["time", row.t], ["position", row.x]]) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.step = "any";
    input.inputMode = "decimal";
    input.setAttribute("aria-label", kind + " for observation " + number);
    input.dataset.kind = kind;
    input.value = String(val);
    input.addEventListener("input", () => { dataSelect.value = "custom"; recalculate(); });
    td.append(input);
    tr.append(td);
  }
  const removeCell = document.createElement("td");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "row-delete";
  button.setAttribute("aria-label", "Remove observation " + number);
  button.textContent = "×";
  button.addEventListener("click", () => {
    tr.remove();
    numberRows();
    dataSelect.value = "custom";
    recalculate();
  });
  removeCell.append(button);
  tr.append(removeCell);
  return tr;
}
function numberRows() {
  for (const [i, tr] of [...tableBody.children].entries()) {
    tr.querySelector("th").textContent = String(i + 1);
    tr.querySelector('[data-kind="time"]').setAttribute("aria-label", "time for observation " + (i + 1));
    tr.querySelector('[data-kind="position"]').setAttribute("aria-label", "position for observation " + (i + 1));
    tr.querySelector("button").setAttribute("aria-label", "Remove observation " + (i + 1));
  }
}
function setRows(rows) {
  tableBody.replaceChildren();
  rows.forEach((row, i) => tableBody.append(makeRow(row, i + 1)));
  recalculate();
}
function getRows() {
  return [...tableBody.children].map((tr, i) => {
    const t = tr.querySelector('[data-kind="time"]').value.trim();
    const x = tr.querySelector('[data-kind="position"]').value.trim();
    if (t === "" || x === "") throw new Error("Please complete time and position in row " + (i + 1) + ".");
    return { t: Number(t), x: Number(x) };
  });
}

function svgGrid(width, height, bounds, residual = false) {
  const { xmin, xmax, ymin, ymax } = bounds;
  const left = 72, right = width - 24, top = residual ? 18 : 25, bottom = height - 45;
  const mapX = t => left + (t - xmin) / (xmax - xmin) * (right - left);
  const mapY = x => bottom - (x - ymin) / (ymax - ymin) * (bottom - top);
  let svg = "";
  for (let i = 0; i <= 5; i++) {
    const xv = xmin + i * (xmax - xmin) / 5;
    const x = svgNumber(mapX(xv));
    svg += '<line x1="' + x + '" y1="' + top + '" x2="' + x + '" y2="' + bottom +
      '" stroke="#dce8df" stroke-width="1"/>';
    svg += '<text x="' + x + '" y="' + (bottom + 20) +
      '" text-anchor="middle" font-size="12" fill="#5b706b">' + format(xv, 3) + "</text>";
  }
  for (let i = 0; i <= 4; i++) {
    const yv = ymin + i * (ymax - ymin) / 4;
    const y = svgNumber(mapY(yv));
    svg += '<line x1="' + left + '" y1="' + y + '" x2="' + right + '" y2="' + y +
      '" stroke="#dce8df" stroke-width="1"/>';
    svg += '<text x="' + (left - 10) + '" y="' + (y + 4) +
      '" text-anchor="end" font-size="12" fill="#5b706b">' + format(yv, 3) + "</text>";
  }
  const name = residual ? "residual (m)" : "position (m)";
  svg += '<text x="12" y="14" font-size="13" fill="#365c54">' + name + "</text>";
  svg += '<text x="' + (right - 6) + '" y="' + (height - 6) +
    '" text-anchor="end" font-size="13" fill="#365c54">time (s)</text>';
  return { svg, mapX, mapY, left, right, top, bottom };
}

function drawGraphs(fit) {
  const width = 660, height = 355;
  const data = fit.rows, xmin = data[0].t, xmax = data[data.length - 1].t;
  const predict = t => fit.coefficients.A + fit.coefficients.B * t + fit.coefficients.C * t * t;
  const sampled = Array.from({ length: 121 }, (_, i) => predict(xmin + (xmax - xmin) * i / 120));
  const allY = [...data.map(p => p.x), ...sampled];
  let ymin = Math.min(...allY), ymax = Math.max(...allY);
  const margin = Math.max((ymax - ymin) * 0.10, 0.5);
  ymin -= margin;
  ymax += margin;
  const g = svgGrid(width, height, { xmin, xmax, ymin, ymax });
  let path = sampled.map((v, i) => {
    const t = xmin + (xmax - xmin) * i / 120;
    return (i === 0 ? "M" : "L") + svgNumber(g.mapX(t)) + " " + svgNumber(g.mapY(v));
  }).join(" ");
  let chart = g.svg + '<path d="' + path +
    '" fill="none" stroke="#14727a" stroke-width="3" stroke-linejoin="round"/>';
  for (const p of data) {
    chart += '<circle cx="' + svgNumber(g.mapX(p.t)) + '" cy="' + svgNumber(g.mapY(p.x)) +
      '" r="5.6" fill="#b77739" stroke="white" stroke-width="1.8"/>';
  }
  positionChart.innerHTML = chart;

  const maxError = Math.max(...data.map(p => Math.abs(p.residual)), 0.05);
  const rg = svgGrid(width, 195, { xmin, xmax, ymin: -maxError * 1.2, ymax: maxError * 1.2 }, true);
  let residuals = rg.svg + '<line x1="' + rg.left + '" y1="' + svgNumber(rg.mapY(0)) +
    '" x2="' + rg.right + '" y2="' + svgNumber(rg.mapY(0)) +
    '" stroke="#647e75" stroke-width="1.5"/>';
  for (const p of data) {
    const x = svgNumber(rg.mapX(p.t)), y = svgNumber(rg.mapY(p.residual));
    residuals += '<line x1="' + x + '" y1="' + svgNumber(rg.mapY(0)) +
      '" x2="' + x + '" y2="' + y + '" stroke="#b77739" stroke-width="2"/>' +
      '<circle cx="' + x + '" cy="' + y + '" r="4.6" fill="#b77739"/>';
  }
  residualChart.innerHTML = residuals;
}

function metric(label, value) {
  const el = document.createElement("div");
  el.className = "metric-box";
  const small = document.createElement("small");
  small.textContent = label;
  const strong = document.createElement("strong");
  strong.textContent = value;
  el.append(small, strong);
  return el;
}

function showFit(fit) {
  const { A, B, C } = fit.coefficients;
  equation.textContent = fit.degree === 1
    ? "x(t) = " + format(A, 5) + " + (" + format(B, 5) + ")t"
    : "x(t) = " + format(A, 5) + " + (" + format(B, 5) + ")t + (" + format(C, 5) + ")t²";
  metrics.replaceChildren();
  metrics.append(
    metric("Initial position, A", format(A) + " m"),
    metric("Velocity coefficient, B", format(B) + " m/s"),
    metric(fit.degree === 2 ? "Acceleration, 2C" : "Acceleration in model", fit.degree === 2
      ? format(fit.acceleration) + " m/s²" : "0 m/s² (assumed)")
  );
  moreMetrics.replaceChildren(metric("R² (model fit)", fit.r2 === null ? "not defined" : format(fit.r2, 5)), metric("RMS residual", format(fit.rmsResidual, 4) + " m"), metric("Observations", String(fit.sampleSize)));
  interpretation.replaceChildren();
  const p1 = document.createElement("p");
  p1.textContent = fit.degree === 1
    ? "This model assumes constant velocity. B estimates the change in position per second. Its acceleration is assumed to be zero; the data may or may not justify that assumption."
    : "For a constant-acceleration model, A estimates position at t = 0, B estimates velocity at t = 0, and 2C estimates acceleration. These conclusions depend on the motion reasonably matching the model.";
  const p2 = document.createElement("p");
  p2.textContent = fit.sampleSize <= fit.degree + 1
    ? "Caution: There are no extra observations beyond the number of model coefficients. A perfect fit here is not convincing evidence that the physical model is correct."
    : fit.timeRange[0] > 0
      ? "Caution: Your first measured time is after zero, so A and B describe extrapolated initial conditions, not directly observed values."
      : "Look for a pattern in the residuals. A poor fit may reflect an inappropriate model, measurement error, or a changing physical condition.";
  interpretation.append(p1, p2);
  drawGraphs(fit);
}

function error(message) {
  status.className = "feedback try";
  status.textContent = message;
  positionChart.replaceChildren();
  residualChart.replaceChildren();
  equation.textContent = "Complete valid observations to calculate a model.";
  metrics.replaceChildren();
  moreMetrics.replaceChildren();
  interpretation.replaceChildren();
  csvButton.disabled = true;
  printButton.disabled = true;
  result = null;
}

function recalculate() {
  try {
    const rows = getRows();
    result = fitMotion(rows, Number(modelSelect.value));
    showFit(result);
    status.className = "feedback good";
    status.textContent = "Model calculated from " + result.sampleSize + " observations. " +
      "Compare the fitted curve with the data points.";
    csvButton.disabled = false;
    printButton.disabled = false;
  } catch (e) {
    error(e.message || "Unable to fit these measurements.");
  }
}

function loadSample(which) {
  if (which === "custom") return;
  modelSelect.value = which === "constant" ? "1" : "2";
  setRows(samples[which]);
}
dataSelect.addEventListener("change", () => { if(dataSelect.value === "custom") document.querySelector("#measurements-panel").open = true; else loadSample(dataSelect.value); });
modelSelect.addEventListener("change", recalculate);
document.querySelector("#reset").addEventListener("click", () => {
  const selected = dataSelect.value === "custom" ? "accelerated" : dataSelect.value;
  dataSelect.value = selected;
  loadSample(selected);
});
document.querySelector("#add-row").addEventListener("click", () => {
  if (tableBody.children.length >= 100) return error("The browser demonstration supports at most 100 observations.");
  const rows = [...tableBody.children];
  const last = rows.at(-1);
  const time = last ? Number(last.querySelector('[data-kind="time"]').value) + 1 : 0;
  tableBody.append(makeRow({ t: time, x: 0 }, rows.length + 1));
  dataSelect.value = "custom";
  recalculate();
});
document.querySelector("#use-paste").addEventListener("click", () => {
  const text = document.querySelector("#paste").value.trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length || lines.length > 101) return error("Paste between 2 and 100 observations.");
  const parsed = [];
  for (let i = 0; i < lines.length; i++) {
    const cells = lines[i].trim().split(/[,\t; ]+/);
    if (cells.length !== 2 || cells.some(c => c.trim() === "" || !Number.isFinite(Number(c)))) {
      if (i === 0 && /[a-z]/i.test(lines[i])) continue;
      return error("Line " + (i + 1) + " needs exactly two numerical values: time and position.");
    }
    parsed.push({ t: Number(cells[0]), x: Number(cells[1]) });
  }
  if (parsed.length < 2 || parsed.length > 100) return error("Please provide 2–100 numerical observations.");
  dataSelect.value = "custom";
  setRows(parsed);
  document.querySelector(".paste-data details").open = false;
});
csvButton.addEventListener("click", () => {
  if (!result) return;
  const blob = new Blob([toCsv(result)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "motion-regression-results.csv";
  link.click();
  URL.revokeObjectURL(url);
});
printButton.addEventListener("click", () => { if (result) window.print(); });
setRows(samples.accelerated);
