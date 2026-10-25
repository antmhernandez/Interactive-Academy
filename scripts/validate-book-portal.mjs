import fs from "node:fs";
import assert from "node:assert/strict";
import vm from "node:vm";

const root=new URL("../",import.meta.url);
const json=p=>JSON.parse(fs.readFileSync(new URL(p,root),"utf8"));
const books=json("content/book-pathways.json");
const lessons=json("content/lessons.json");
const lessonIds=new Set(lessons.map(l=>l.id));
assert.equal(books.schemaVersion,1);
assert.equal(books.status,"publisher-discussion-prototype");
assert.ok(books.notices.relationship.includes("not an official Memoria Press product"));
assert.ok(books.notices.mappings.includes("not approved chapter"));
assert.ok(books.notices.sources.includes("No book covers"));
const gradeIds=new Set(),bookIds=new Set();
for(const g of books.grades){assert.ok(/^(7|8|9|11|12)$/.test(g.id),"Invalid demonstration grade");assert.ok(!gradeIds.has(g.id));gradeIds.add(g.id);assert.ok(g.description.length>30)}
for(const b of books.references){
 assert.match(b.id,/^[a-z0-9-]+$/);
 assert.ok(!bookIds.has(b.id),"Duplicate textbook id "+b.id);bookIds.add(b.id);
 assert.ok(b.title.length>8&&b.imprint.length>16&&b.description.length>65);
 assert.ok(["publisher-catalog","course-pathway","independent-reference"].includes(b.kind));
 assert.ok(["conceptual-example","awaiting-content","independent-demonstration","independent-prototype"].includes(b.alignment));
 assert.ok(Array.isArray(b.gradeIds)&&b.gradeIds.length>0&&b.gradeIds.every(id=>gradeIds.has(id)));
 assert.ok(b.topicIds.length===new Set(b.topicIds).size);
 for(const id of b.topicIds)assert.ok(lessonIds.has(id),"Unknown topic link "+id+" from "+b.id);
 assert.equal(b.review==="not-authorized"||b.review==="prototype-only",true);
 if(b.kind==="publisher-catalog"||b.kind==="course-pathway"){
   assert.ok(/^https:\/\/www\.memoriapress\.com\//.test(b.publishedUrl),"Unverified external domain: "+b.id);
   assert.ok(b.publishedLinkLabel?.length>12);
 }
 if(b.kind==="publisher-catalog")assert.ok(b.alignment==="conceptual-example"||b.alignment==="awaiting-content",
  "Catalog book is falsely represented as verified chapter alignment: "+b.id);
}
assert.ok(books.references.some(b=>b.id==="existing-glencoe"&&b.kind==="independent-reference"),
  "Preserve separate Glencoe route and Novare distinction");
assert.ok(books.references.some(b=>b.id==="physical-science"&&b.gradeIds.includes("8")));
assert.ok(books.references.some(b=>b.id==="physics-modeling-nature"&&b.gradeIds.includes("11")));
assert.ok(books.references.some(b=>b.id==="calculus-pathway"&&b.kind==="course-pathway"));
const js=fs.readFileSync(new URL("app.js",root),"utf8"),html=fs.readFileSync(new URL("index.html",root),"utf8"),css=fs.readFileSync(new URL("styles.css",root),"utf8");
for(const fragment of ["content/book-pathways.json","bookPathways=books","function booksHome(","function gradeBooks(","function bookDetail(","function showcase(","#books","#book/","#grade/","#showcase"]){
 assert.ok(js.includes(fragment),"Missing pathway source or route "+fragment);
}
for(const fragment of ["PUBLISHER DISCUSSION EDITION","Not an official","Books &amp; Grades","Publisher Demo"]){
 assert.ok(html.includes(fragment),"No visible independent demo framing "+fragment);
}
for(const fragment of [".book-grid",".book-tile",".book-detail-head",".grade-choices",".publisher-note",".showcase-columns"]){
 assert.ok(css.includes(fragment),"Missing publisher demonstration styling "+fragment);
}
const start=js.indexOf("function bookTile("),end=js.indexOf("\nfunction route(){",start);
assert.ok(start>=0&&end>start);
const mockMain={innerHTML:""};
const safe=x=>String(x).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const context={bookPathways:books,lessons,main:mockMain,escapeHtml:safe};
const functions=vm.runInNewContext(js.slice(start,end)+"\n({bookTile,booksHome,gradeBooks,bookDetail,showcase})",context);
functions.booksHome();
assert.ok(mockMain.innerHTML.includes("Begin with a book."));
assert.ok(mockMain.innerHTML.includes("#grade/8"));
assert.ok(mockMain.innerHTML.includes("not approved chapter"));
functions.gradeBooks("8");
assert.ok(mockMain.innerHTML.includes("Novare Physical Science"));
assert.ok(mockMain.innerHTML.includes("Grade 8"));
functions.bookDetail("physical-science");
assert.ok(mockMain.innerHTML.includes("not a chapter match"));
assert.ok(mockMain.innerHTML.includes("#lesson/si-units"));
assert.ok(mockMain.innerHTML.includes("www.memoriapress.com/8th-grade/"));
functions.bookDetail("pre-algebra");
assert.ok(mockMain.innerHTML.includes("not yet a published lesson connection"));
functions.showcase();
assert.ok(mockMain.innerHTML.includes("publisher-approved crosswalk"));
assert.ok(mockMain.innerHTML.includes("no student-data collection"));
console.log("PASS publisher prototype: "+books.grades.length+" grade choices, "+books.references.length+" references, valid original lesson IDs, clear independent disclosure and rendered routes");
