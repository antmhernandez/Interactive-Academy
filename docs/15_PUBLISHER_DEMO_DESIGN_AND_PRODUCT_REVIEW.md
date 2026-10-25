# Publisher Demonstration — Product and Design Review

**Date:** October 25, 2026  
**Project:** The Learning Atlas, independent and exploratory educational prototype  
**Website:** https://antmhernandez.github.io/Interactive-Academy/  
**Code:** https://github.com/antmhernandez/Interactive-Academy  
**Status:** Conversation starter. Not submitted to or approved by Memoria Press.

## What the demonstration is intended to communicate

A printed, carefully sequenced classical curriculum can remain the **primary teaching resource** while an optional digital companion helps students understand difficult physical and mathematical relationships. The student can start at a *grade*, choose a *text*, view related *conceptual demonstrations*, then proceed to *definition → worked example → reasoning check → guided independent practice*, returning to the printed material.

The proposed division of labor:
- **The publisher's book** supplies scope, sequencing, canonical content, reading, historical narrative and assignments.
- **The website** supplies interactive visualizations, incremental worked reasoning, deliberate practice, supplementary lab/experiment views and a common equation reference.
- **The teacher/parent** guides pacing and assesses mastery, using approved, private teacher-only tools only if the publisher authorizes them.

No website illustration, applet or quiz should purport to replace the existing book or a separately purchased answer key.

## Findings grounded in public Memoria Press material

Memoria Press emphasizes classical subjects and clear, sequence-based materials (https://www.memoriapress.com/curriculum/). In science, it describes narrative introductions prior to laboratory-style high-school sciences and lists Novare textbooks (https://www.memoriapress.com/science/).

Public grade and product references used in this proof of concept:
- Grade 7 / historical science: *Exploring the World of Physics*, listed for grades 7–9 on the science catalog.
- Grade 8: *Novare Physical Science*, on the 8th-grade listing (https://www.memoriapress.com/8th-grade/).
- Grade 9 or older: *Novare Introductory Physics*, listed for grades 9+ on the science catalog.
- Grade 11: *Physics: Modeling Nature*, on the 11th-grade listing (https://www.memoriapress.com/11th-grade/). Alternative course placements may exist.
- Pre-Algebra: https://www.memoriapress.com/curriculum/math/memoria-pre-algebra-set/.
- Calculus: an *independent demonstration pathway only*; **no Memoria Press textbook title is asserted**. Browse https://www.memoriapress.com/math/ for offerings.

**Crucial curricular distinction:** The present Physics lessons and 30-chapter equation navigation were developed around the author's **Glencoe, Physics: Principles and Problems** chapter progression. This is not the current Memoria Press/Novare textbook table of contents. We must not describe Glencoe Chapter 2 as Novare Chapter 2, or assume Novare editions share chapter pagination. The website's published book links are intentionally marked **conceptual/illustrative** until authorized chapter crosswalks can be built.

## Visual direction: classical publishing, but not trademark imitation

The source for visual inspiration is Memoria Press's publicly visible classical-program layout and publishing aesthetic: serif editorial titles, generous white/cream surfaces, dark navy, burgundy/red and understated gold. Our implementation uses an original monogram and its **own** HTML/CSS—no logo, cover image, trademark ornament, font file, web scrape, or copyrighted artwork was embedded. It keeps the diagram's bright semantic colors for physics/mathematics.

Suggested internal token palette for the prototype:
- ink navy `#192c43`; burgundy interaction `#742a3e`;
- paper `#fffdf8`; page `#f8f5ed`; antiqued gold accents `#b6843d`;
- diagrams preserve teal `#14727a`, amber `#c08039`, and green `#32986f`, with text labels/shape cues where practical.

**Permission gate:** A production Memoria Press version should use a publisher-supplied design system, sanctioned typography, logo assets, exact color specifications and approved trademarks. The current design is a concept for review, *not* a claim that these values constitute official branding.

## Existing working prototype features

- 20 independently authored Physics/Calculus lesson applets.
- Consistent Back/Home/Next control, focus-first interactive figure, brief statement, four tabs: **The Idea**, **Example**, **Think**, **Try It**.
- Cumulative worked solution steps—new reasoning added below prior reasoning.
- Definition & Example page `#study/{lesson-id}` and three-tier guided-practice page `#guided/{lesson-id}`, 60 question cases across topics.
- Physics 30-chapter equation index (`#equations`), currently 84 representative relationships, with applicability notes.
- Browser-based Motion Data Lab, numeric regression, local-only progress and printables.
- New pilot textbook portal routes: `#books`, `#grade/8`, `#book/physical-science`; independent publisher overview `#showcase`.
- Responsive layouts and accessible labels; **not** independently audited for WCAG compliance.

## Potential content types for publisher consideration (NOT implemented in this pass)

| Type | Intended purpose | Dependencies |
|---|---|---|
| Original animated concept figure | Make a difficult concept observable; one idea per applet | Physics/mathematical audit and consistent components |
| Small reasoning challenge | Isolate a common misconception without duplicating a chapter | Topic-owned microchallenge registry |
| Printable guided reading/problem sheet | Connect active digital practice to a physical notebook | Publisher's preferred stationery and page-layout review |
| Text-aligned chapter jump | Book > approved chapter > section > linked concept | Publisher-approved title, edition, table of contents, chapter/section crosswalk |
| Teacher demonstration/whiteboard mode | Full-screen focus, reset/advance, optional projection labels | Classroom use testing |
| Assignment launch codes | Share a precise lesson or exercise with no login | URL conventions, no student tracking without governance |
| Local-only progress checklist | Help student see where to resume privately | Accessibility and privacy review |
| Teacher key/lesson plan | Secure, permissioned teacher-only support | Publisher authorization and real access-control server, NOT GitHub Pages |
| Lab observations and reporting | Connect physical measurement to model building | Labs, safety guidance, data exports and review |
| Narrated teaching video/audio | Demonstrate examples and clarify textbook passages | Production budget, rights and caption/transcript standards |

## Highest-value feature work after feedback

1. **Review the student journey** on desktop, tablet and phone. The Book Library should make it easy to select grade, choose a text, then open a single visual demonstration. Check that the next/back behavior returns to the expected place and avoid trapping the learner in a lesson sequence.
2. **Get the publisher's editions and table-of-contents structure.** Add a *separate* source-of-truth `curriculum/book-alignments.json` only after permission; key it by stable book ID, ISBN/edition, chapter/section IDs, and lesson IDs. Keep confidence/approval status explicit. Do not blindly infer from concept matches.
3. **Student and teacher presentation modes.** For example, a full-screen projection of the applet with ability to reveal/hide labels, reset controls, reveal cumulative worked steps, and return to book chapter.
4. **More accessible and verifiable UI.** Keyboard focus order, touch sizes, mobile overflow, color-contrast tests, reduced motion, proper ARIA tab keyboard controls, MathML/KaTeX rendering for equations (with licensing review), text alternatives and real screen-reader checks.
5. **Trustworthy student exercise checking.** Current numeric checks do not reliably distinguish significant-figure notation such as `7` versus `7.0` or assess reasoning. An improved symbolic/unit system requires careful validity checks and no invented AI answer keys.
6. **Performance and maintainability.** Break large `app.js` into components/data-driven visual renderer modules after writing regression/smoke tests. Keep the site easy to publish as a static prototype until the publisher approves commercial requirements.
7. **Copyright and licensing.** Establish whether public educational use and any future commercial distribution may include direct citations, purchased text metadata, covers, publisher diagrams, audio or lesson excerpts. A linked official product page is not itself a license.

## Decisions to ask Memoria Press

- Would this best supplement **Novare**, Memoria Press math, or several grade bands?
- Is the intended buyer a homeschool family, a school/classroom teacher, or the publisher's own instructional-video division?
- Should content map to **book chapter/section and edition**, or to a common conceptual registry shared by many books?
- Would Memoria Press wish to supply a sanctioned brand kit, typography, book cover art, product URLs, and editorial review lead?
- What is the division of IP ownership, derivative-work permission, publisher testing, rights to existing independent code, and any remuneration or licensing agreement?
- How would this coexist with existing Memoria Press streaming instructional videos and student workbooks?
- What success metrics matter—student comprehension, adoption, teacher time, reduced tutoring burden, or sales of supporting texts?
- Is public access appropriate for the prototype, or should the evaluation take place on a private staging deployment?

## Do not overclaim

Neither the publisher nor the school has approved this prototype. The book matches are **illustrative**, not edition-specific. The prototype currently exposes original student exercises publicly and has no server-side roles; do not upload restricted HLS/Novare/Glencoe/MP source, keys, internal roadmap data or student records. Avoid using Memoria Press's marks in the site header without express permission.

## Review checklist

- [ ] Book/grade links verified against the current official publisher catalog.
- [ ] Every book detail page says **illustrative, not chapter-aligned**.
- [ ] Each lesson route, guided practice route, experiment and equation reference works.
- [ ] Responsive check: 320, 375, 768, 1024 and 1440 px.
- [ ] User experience: no dead ends, keyboard navigation clear, interactive labels visible.
- [ ] No unauthorized logos, book covers or imported teacher-only files.
- [ ] GitHub Actions and Pages deployment green.
- [ ] Reviewer feedback and permissions recorded before any formal publisher branding or exact crosswalk.

## Publisher-demo UX refinement: contextual navigation and classroom display (October 25 follow-up)

The prototype's new optional `?book=...&grade=...` hash context preserves the visitor's route from grade to text to a related *original* lesson, its definition/example and graduated practice. Its visible breadcrumb and Back-to-Book behavior avoid misleading jumps into the general Glencoe sequence. The order of the linked examples reflects an illustrative curated list **only**, not a claimed Novare chapter order.

The classroom presentation button opens a local visual-focused overlay with the same four learning tabs, working simulation controls and cumulative example steps, plus Escape to leave. A copy-link control offers a shareable direct lesson URL; no login, tracking, publisher content or student account is introduced. The mode is not an authorized teacher-only area and does not contain keys.

New CI Chromium smoke checks cover 320/375/768/1024/1440px, grade-to-book-to-lesson traversal, keyboard tabs and Escape, and cumulative steps. These are valuable automated safeguards, **not** a substitute for physical mobile device, projector, screen-reader or editorial acceptance testing. The publisher would still need to approve exact textbook editions, mapping, IP, commercial branding and learning claims.

