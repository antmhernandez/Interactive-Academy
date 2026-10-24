import fs from "node:fs";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), "utf8");
const site = read("index.html"), js = read("app.js"), css = read("styles.css");
const lessons = JSON.parse(read("content/lessons.json"));
assert.match(site, /id="main"/);
for (const file of ["styles.css","app.js"]) assert.ok(site.includes(file), "Page missing dependency "+file);
assert.ok(css.includes("@media(max-width:760px)"), "Mobile layout missing");
assert.ok(Array.isArray(lessons) && lessons.length >= 5);
const ids = new Set(lessons.map(x => x.id));
assert.equal(ids.size, lessons.length, "Duplicate lesson IDs");
const visuals = new Set(["motion","acceleration","motion-graphs","tangent","riemann"]);
for (const lesson of lessons) {
 assert.ok(/^[a-z0-9-]+$/.test(lesson.id), "Invalid ID");
 assert.ok(["physics","calculus"].includes(lesson.subject), "Invalid subject");
 for (const field of ["title","subtitle","observe","idea","visualLead"]) assert.ok(lesson[field].length >= 15, "Too little text: "+field+" in "+lesson.id);
 assert.ok(visuals.has(lesson.visual), "Missing visual: "+lesson.id);
 assert.ok(ids.has(lesson.next), "Broken next lesson link: "+lesson.id);
 assert.ok(lesson.example.steps.length >= 2, "Example missing steps: "+lesson.id);
 assert.ok(Number.isFinite(lesson.practice.answer) && lesson.practice.tolerance >= 0, "Invalid numerical answer: "+lesson.id);
 assert.ok(lesson.practice.hints.length >= 2, "Insufficient graduated hints: "+lesson.id);
}
for (const token of ["#home","#physics","#calculus","#about"]) assert.ok(site.includes(token));
for (const path of ["materials/motion-guided-notes.html","materials/motion-observation-lab.html"]) assert.ok(fs.existsSync(new URL(path,root)));
for (const suspect of ["sk-","ghp_","-----BEGIN PRIVATE KEY-----"]) {
 assert.ok(!site.includes(suspect) && !js.includes(suspect) && !css.includes(suspect), "Potential secret marker");
}
console.log("PASS: site structure, "+lessons.length+" original lessons, practice and navigation metadata");
