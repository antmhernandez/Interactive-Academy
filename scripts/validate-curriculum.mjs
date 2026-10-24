import fs from "node:fs";
import assert from "node:assert/strict";

const root = new URL("../",import.meta.url);
const read = p => fs.readFileSync(new URL(p,root),"utf8");
const catalog=JSON.parse(read("curriculum/catalog.json"));
const published=JSON.parse(read("content/lessons.json"));

assert.equal(catalog.schemaVersion,1,"Unexpected curriculum schema");
assert.ok(catalog.subjects.length===2);
assert.ok(catalog.assets.length>=8);
const subjectIds=new Set(),unitIds=new Set(),topics=new Map(),conceptKeys=new Set();
const availableBySubject=new Map();
for(const subject of catalog.subjects){
 assert.ok(["physics","calculus"].includes(subject.id),"Unknown subject "+subject.id);
 assert.ok(!subjectIds.has(subject.id),"Duplicate subject "+subject.id);
 subjectIds.add(subject.id);
 const available=[];
 for(const unit of subject.units){
  assert.ok(/^[a-z0-9-]+$/.test(unit.id),"Unsafe unit id");
  assert.ok(!unitIds.has(unit.id),"Duplicate unit ID "+unit.id);
  unitIds.add(unit.id);
  assert.ok(unit.title.length>8);
  for(const topic of unit.topics){
    assert.ok(/^[a-z0-9-]+$/.test(topic.id),"Unsafe topic ID");
    assert.ok(!topics.has(topic.id),"Duplicate topic ID "+topic.id);
    assert.ok(["available","planned"].includes(topic.status),"Invalid topic status "+topic.id);
    assert.ok(topic.goal.length>=25&&topic.title.length>=5,"Missing teaching objective: "+topic.id);
    assert.ok(Array.isArray(topic.prerequisites),"Missing prerequisite list "+topic.id);
    assert.ok(/^[a-z.\-]+$/.test(topic.owns),"Invalid canonical concept name "+topic.id);
    assert.ok(!conceptKeys.has(topic.owns),"Concept claimed by multiple topics: "+topic.owns);
    conceptKeys.add(topic.owns);
    topics.set(topic.id,{...topic,unitId:unit.id,unitTitle:unit.title,subjectId:subject.id});
    if(topic.status==="available")available.push(topic.id);
  }
 }
 availableBySubject.set(subject.id,available);
}
assert.ok(topics.size>=70,"Curriculum map missing major topics");

const visit=new Map();
function dfs(id){
 const state=visit.get(id);
 if(state===1)throw new Error("Prerequisite cycle at "+id);
 if(state===2)return;
 const item=topics.get(id);assert.ok(item,"Unregistered prerequisite "+id);
 visit.set(id,1);
 for(const pre of item.prerequisites){
   assert.notEqual(pre,id,"Self prerequisite "+id);
   assert.ok(topics.has(pre),"Unknown prerequisite: "+pre+" for "+id);
   dfs(pre);
   if(item.status==="available"){
     assert.equal(topics.get(pre).status,"available","Live topic depends on unfinished topic: "+pre);
   }
 }
 visit.set(id,2);
}
for(const id of topics.keys())dfs(id);

assert.equal(published.length,[...topics.values()].filter(t=>t.status==="available").length,
 "Available topic and lesson counts disagree");
const lessonIds=new Set(published.map(l=>l.id));
for(const subjectId of subjectIds){
 const actual=published.filter(x=>x.subject===subjectId).map(x=>x.id);
 assert.deepEqual(actual,availableBySubject.get(subjectId),
   "Available lesson order must match registry unit order for "+subjectId);
}
for(const lesson of published){
 const topic=topics.get(lesson.id);
 assert.ok(topic,"Unregistered lesson "+lesson.id);
 assert.equal(topic.status,"available","Lesson not marked available "+lesson.id);
 assert.equal(lesson.subject,topic.subjectId,"Wrong subject "+lesson.id);
 assert.equal(lesson.unitId,topic.unitId,"Wrong unit id "+lesson.id);
 assert.equal(lesson.unit,topic.unitTitle,"Wrong unit title "+lesson.id);
 assert.equal(lesson.title,topic.title,"Out of sync topic title: "+lesson.id);
}
for(const topic of topics.values()){
 if(topic.status==="planned")assert.ok(!lessonIds.has(topic.id),"Planned topic is accidentally live");
}

const assetIds=new Set(),assetPaths=new Set();
for(const a of catalog.assets){
 assert.ok(/^[a-z0-9-]+$/.test(a.id),"Asset lacks unique slug");
 assert.ok(!assetIds.has(a.id),"Duplicate asset id "+a.id);
 assetIds.add(a.id);
 assert.ok(a.label?.length>8,"Asset lacks a readable label "+a.id);
 assert.ok(topics.has(a.owner),"Asset owner is not a registered topic "+a.id);
 assert.equal(topics.get(a.owner).status,"available","Public asset assigned to unbuilt lesson "+a.id);
 assert.equal(a.visibility,"public-student","Unsafe public asset visibility "+a.id);
 assert.ok(a.path.startsWith("materials/")||a.path.startsWith("lab/"),"Unsafe asset directory "+a.path);
 assert.ok(!a.path.includes("..")&&!a.path.startsWith("/"),"Path traversal in "+a.path);
 assert.ok(!assetPaths.has(a.path),"File listed under two asset owners "+a.path);
 assetPaths.add(a.path);
 assert.ok(fs.existsSync(new URL(a.path,root)),"Missing registered asset: "+a.path);
}

const relationships=new Set();
for(const c of catalog.connections){
 assert.ok(topics.has(c.from)&&topics.has(c.to),"Unregistered connection");
 assert.ok(c.from!==c.to,"Self-connection");
 const pair=c.from+"|"+c.to;assert.ok(!relationships.has(pair),"Duplicate crosslink "+pair);
 relationships.add(pair);
 assert.ok(c.reason.length>=30);
}
for(const next of catalog.nextBuild){
 assert.ok(topics.has(next),"Unknown next candidate "+next);
 assert.equal(topics.get(next).status,"planned","Next-build item is already available");
}
const summary=catalog.subjects.map(s=>{
 const arr=s.units.flatMap(u=>u.topics);
 return s.id+": "+arr.filter(t=>t.status==="available").length+" available / "+arr.length+" planned slots";
});
console.log("PASS curriculum registry: "+topics.size+" canonical concepts, "+unitIds.size+" units, "+
catalog.assets.length+" assigned assets, acyclic prerequisites; "+summary.join("; "));
