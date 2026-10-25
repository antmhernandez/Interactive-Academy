import fs from "node:fs";
import assert from "node:assert/strict";

const root = new URL("../", import.meta.url);
const read = path => fs.readFileSync(new URL(path, root), "utf8");
const site = read("index.html"), js = read("app.js"), css = read("styles.css");
const lessons = JSON.parse(read("content/lessons.json"));
assert.match(site, /id="main"/);
for (const file of ["styles.css","app.js"]) assert.ok(site.includes(file), "Page missing dependency "+file);
assert.ok(css.includes("@media(max-width:760px)"), "Mobile layout missing");
assert.ok(Array.isArray(lessons) && lessons.length >= 30);
const ids = new Set(lessons.map(x => x.id));
assert.equal(ids.size, lessons.length, "Duplicate lesson IDs");
const visuals = new Set(["motion","acceleration","motion-graphs","tangent","riemann","displacement","average-velocity","free-fall","velocity-area","force-components","free-body","newton-two","limit-hole","hydrogen-spectrum","one-sided-limit","unit-conversion","measurement-ruler","significant-digits","units-cancel","slope-graph","velocity-components","projectile-motion","circular-motion","river-crossing","friction-threshold","incline-friction","energy-ramp"]);
for (const lesson of lessons) {
 assert.ok(/^[a-z0-9-]+$/.test(lesson.id), "Invalid ID");
 assert.ok(["physics","calculus"].includes(lesson.subject), "Invalid subject");
 assert.ok(lesson.title.length >= 6 && lesson.title.length <= 72, "Lesson title must be concise and meaningful: "+lesson.id);
 for (const field of ["subtitle","observe","idea","visualLead"]) assert.ok(lesson[field].length >= 15, "Too little text: "+field+" in "+lesson.id);
 assert.ok(visuals.has(lesson.visual), "Missing visual: "+lesson.id);
 assert.ok(lesson.next === null || ids.has(lesson.next), "Broken next lesson link: "+lesson.id);
 if (lesson.next !== null) assert.equal(lessons.find(x=>x.id===lesson.next).subject,lesson.subject,"Lesson chain crosses subjects");
 assert.ok(lesson.example.steps.length >= 2, "Example missing steps: "+lesson.id);
 assert.ok(Number.isFinite(lesson.practice.answer) && lesson.practice.tolerance >= 0, "Invalid numerical answer: "+lesson.id);
 assert.ok(lesson.practice.hints.length >= 2, "Insufficient graduated hints: "+lesson.id);
 assert.ok(typeof lesson.focus === "string" && lesson.focus.length >= 30 && lesson.focus.length <= 160, "Missing/overlong visual focus cue: "+lesson.id);
 assert.ok(lesson.visualLead.length <= 110 && lesson.subtitle.length <= 120, "Visual direction or subtitle too long: "+lesson.id);
 const c = lesson.checkpoint;
 assert.ok(c && typeof c.prompt === "string" && c.prompt.length >= 30, "Concept check required: "+lesson.id);
 assert.ok(Array.isArray(c.choices) && c.choices.length >= 3 && c.choices.every(x=>x.length > 12), "Incomplete choices: "+lesson.id);
 assert.ok(Number.isInteger(c.correct) && c.correct >= 0 && c.correct < c.choices.length, "Bad concept check answer: "+lesson.id);
 assert.ok(Array.isArray(c.feedback) && c.feedback.length === c.choices.length && c.feedback.every(x=>x.length >= 20), "Incomplete misconception feedback: "+lesson.id);
 assert.ok(c.explanation.length > 30, "Concept explanation missing: "+lesson.id);
}

// Courses are finite, ordered learning paths, not loops.
for (const [course, expected] of [["physics",25],["calculus",5]]) {
 const group=lessons.filter(l=>l.subject===course);
 assert.equal(group.length,expected,"Unexpected number of "+course+" lessons");
 const learningPath=group.filter(l=>!l.optionalPreview);
 for(let i=0;i<learningPath.length;i++){
  assert.equal(learningPath[i].next,learningPath[i+1]?.id ?? null,"Incorrect next step in "+course+" path");
 }
 for(const preview of group.filter(l=>l.optionalPreview)){
  assert.equal(preview.next,null,"Optional preview must not advance into another chapter");
  assert.equal(preview.subject,"physics","Only Physics has a late chapter curiosity preview");
 }
}
// A simulator must exist for each named diagram.
for (const fn of ["displacement","averageVelocity","freeFall","velocityArea","motion","acceleration","linkedGraphs","tangent","riemann","forceComponents","freeBody","newtonTwo","limitHole","hydrogenSpectrum","oneSidedLimit","unitConversion","measurementRuler","significantDigits","unitCancellation","slopeToolkit","velocityComponents","projectileMotion","circularMotion","riverCrossing","slopeHeight","signSpeed","limitValue"]) {
 assert.ok(js.includes("function "+fn+"("),"Missing simulator "+fn);
}
assert.ok(js.includes("learning-atlas-completed-v1"),"Local-only progress store missing");
assert.ok(js.includes("function renderConceptCheck("),"Concept check rendering missing");
assert.ok(js.includes('role="tablist"') && js.includes("data-view="),"Single-activity learning tabs missing");
assert.ok(js.includes('class="route-nav"'),"Consistent Back/Home/Next navigation missing");
assert.ok(js.includes("visualLegend("),"Diagram color keys missing");
assert.ok(js.includes("function roadmap(") && js.includes("curriculum/catalog.json"),"Course roadmap view missing");
assert.ok(js.includes("function microLesson(") && js.includes("content/submodules.json"),"Focused short challenge renderer/source missing");
assert.ok(js.includes("function studySheet(") && js.includes("function guidedPage("),"Study and guided practice routes missing");
assert.ok(js.includes("function equationIndex(") && js.includes("function equationChapter("),"Chapter equation reference routes missing");
assert.ok(js.includes("renderAccumulativeStep(stepList") && js.includes("worked-steps"),"Cumulative worked solutions missing");
assert.ok(css.includes(".visual-stage") && css.includes(".focus-head"),"Focused visual layout missing");
assert.ok(site.includes("lab/motion.html") && js.includes("lab/motion.html"),"Motion lab navigation missing");
assert.ok(site.includes('src="applets/contact-forces.js"'),"Force applet engine not loaded");
assert.ok(site.includes('src="applets/energy-ramp.js"'),"Energy applet engine not loaded");
assert.ok(js.includes("energyRamp(el)"),"Energy applet must be wired");
assert.ok(js.includes("frictionThreshold(el)")&&js.includes("inclineFriction(el)"),"Force applets not wired into lessons");
for(const path of ["lab/motion.html","lab/motion.css","lab/motion.js","lab/regression.mjs","docs/09_FOCUSED_LESSON_AND_VISUAL_DESIGN_STANDARD.md"]) assert.ok(fs.existsSync(new URL(path,root)),"Lab file missing: "+path);
// Sanity checks for the numerical practice keys in newly added topics.
for (const [id,expected] of [["position-displacement",11],["average-velocity",3],["free-fall",3],["velocity-accumulation",16],["force-components",10],["free-body-diagram",29.4],["newtons-second-law",5],["limits-near-a-point",6],["atom-spectra",486.27451],["si-units",2500],["scientific-measurement",42.5],["significant-figures",8.4],["dimensional-analysis",30],["graph-slope-physics",3],["one-sided-limits",3],["two-dimensional-motion",10],["projectile-motion",1.42857142857],["circular-motion",16],["relative-velocity",60],["friction",4.56],["inclined-planes",9.8*(0.5-.2*Math.sqrt(3)/2)],["work-energy",120],["kinetic-energy",50],["potential-energy",98],["energy-conservation",Math.sqrt(78.4)]]) {
 assert.equal(lessons.find(l=>l.id===id).practice.answer,expected,"Incorrect practice key for "+id);
}
for (const token of ["#home","#physics","#calculus","#about"]) assert.ok(site.includes(token));
for (const path of ["materials/motion-guided-notes.html","materials/motion-observation-lab.html","materials/motion-graphs-guided-notes.html","materials/motion-data-lab.html","materials/calculus-graphical-meaning-guided-notes.html","materials/motion-model-investigation.html","materials/forces-guided-notes.html","materials/limits-guided-notes.html"]) assert.ok(fs.existsSync(new URL(path,root)));
for (const suspect of ["sk-","ghp_","-----BEGIN PRIVATE KEY-----"]) {
 assert.ok(!site.includes(suspect) && !js.includes(suspect) && !css.includes(suspect), "Potential secret marker");
}
console.log("PASS: site structure, "+lessons.length+" original lessons, practice and navigation metadata");
