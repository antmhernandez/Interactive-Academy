import fs from "node:fs";
import assert from "node:assert/strict";
const root=new URL("../",import.meta.url);
const read=p=>JSON.parse(fs.readFileSync(new URL(p,root),"utf8"));
const lessons=read("content/lessons.json");
const guided=read("content/guided-practice.json");
const eq=read("content/equations-physics.json");
const map=read("curriculum/catalog.json");
const book=map.textbook;
assert.equal(lessons.length,22);
assert.equal(guided.length,lessons.length,"Every complete lesson needs guided practice");
const defined=new Map(lessons.map(x=>[x.id,x])),guidedIds=new Set();
let problems=0;
for(const set of guided){
 assert.ok(defined.has(set.owner),"Unregistered guided-practice owner "+set.owner);
 assert.ok(!guidedIds.has(set.owner),"Duplicate guided-practice owner "+set.owner);
 guidedIds.add(set.owner);
 assert.equal(set.title,defined.get(set.owner).title,"Mismatched practice heading "+set.owner);
 assert.equal(set.levels.length,3,"Exactly three levels: Begin, Extend, Challenge "+set.owner);
 assert.deepEqual(set.levels.map(l=>l.level),["Begin","Extend","Challenge"],"Incorrect scaffold order "+set.owner);
 assert.equal(set.levels[0].answer,defined.get(set.owner).practice.answer,"Warm-up conflicts with main lesson "+set.owner);
 for(const p of set.levels){
  problems++;
  assert.ok(typeof p.prompt==="string"&&p.prompt.length>=35,"Incomplete guided problem "+set.owner);
  assert.ok(Number.isFinite(p.answer)&&Number.isFinite(p.tolerance)&&p.tolerance>=0,"Invalid numerical result "+set.owner);
  assert.ok(typeof p.unit==="string"&&Array.isArray(p.steps)&&p.steps.length>=3,"Missing solution reasoning "+set.owner);
  assert.ok(p.steps.every(s=>s.trim().length>=7),"Missing or empty reasoning step "+set.owner);
 }
}
assert.equal(problems,66,"Unexpected practice count");
for(const lesson of lessons){
 assert.ok(lesson.definition?.length>=70&&lesson.definition.length<=350,"Missing concise definition "+lesson.id);
 assert.ok(guidedIds.has(lesson.id),"No guided-practice set "+lesson.id);
}
assert.equal(book.chapters.length,30,"Must show all 30 printed textbook chapters");
assert.equal(eq.chapters.length,30,"Equation index must include 30 chapters");
assert.equal(eq.schemaVersion,1);
let equations=0;
for(let i=0;i<30;i++){
 const chapter=eq.chapters[i];
 assert.equal(chapter.number,i+1,"Formula chapters must be in printed order");
 assert.equal(book.chapters[i].number,i+1,"Curriculum textbook chapter index must be in printed order");
 assert.equal(chapter.title,book.chapters[i].title,"Reference chapter title disagrees with textbook map");
 assert.ok(chapter.equations.length>=1,"Empty chapter-equation summary "+chapter.number);
 for(const formula of chapter.equations){
  equations++;
  assert.ok(formula.name.length>=5&&formula.formula.length>=4&&formula.conditions.length>=22,
   "Incomplete equation/assumption "+chapter.number);
 }
}
assert.ok(equations>=84,"Too few current formula entries");
const physics=lessons.filter(l=>l.subject==="physics");
assert.equal(physics[0].id,"si-units","Learning path must begin with the mathematical toolkit");
assert.equal(physics.at(-1).id,"atom-spectra","Atomic formula lesson must be at late book chapter 28");
assert.equal(physics.at(-1).optionalPreview,true,"Chapter 28 preview must be optional");
assert.equal(physics.at(-2).next,null,"Main pathway must not skip directly from Chapter 5 to Chapter 28");
const main=physics.filter(l=>!l.optionalPreview);
for(let i=0;i<main.length;i++)assert.equal(main[i].next,main[i+1]?.id??null,"Broken main textbook learning path");
const javascript=fs.readFileSync(new URL("app.js",root),"utf8");
for(const token of ["function studySheet(","function guidedPage(","function equationIndex(","function equationChapter(",
 'href="#guided/',"renderAccumulativeStep(stepList","content/guided-practice.json","content/equations-physics.json"])
 assert.ok(javascript.includes(token),"Site missing teaching resource component: "+token);
console.log("PASS: "+problems+" progressive problems across "+lessons.length+" topics; "+equations+" equations across 30 chapters; textbook-first progression and standalone Chapter 28 preview");
