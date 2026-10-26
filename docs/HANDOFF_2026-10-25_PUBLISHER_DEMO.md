# Handoff — Publisher Demonstration and Classical-Style Feature Pass

**Prepared:** October 25, 2026  
**Working project:** The Learning Atlas / Interactive Academy  
**GitHub repository:** https://github.com/antmhernandez/Interactive-Academy  
**Expected GitHub Pages site:** https://antmhernandez.github.io/Interactive-Academy/  
**This handoff file:** https://github.com/antmhernandez/Interactive-Academy/blob/main/docs/HANDOFF_2026-10-25_PUBLISHER_DEMO.md  
**Latest working branch of this pass:** `feature/publisher-demo-classical-design-book-portal-2026-10-25` (the merged `main` branch should be authoritative when this work is merged).

## Primary user intent

The author teaches Upper School Physics and AP Calculus and wishes to **demonstrate the concept to an employer at Memoria Press** to seek editorial/business feedback, not yet commercialize it. **Stop increasing the number of lessons temporarily.** Prioritize user experience, quality, credible grade/textbook navigation, classical-inspired visual polish, access and presentation features, and a clearly defensible copyright/branding boundary.

The user explicitly prefers:
- simple, uncluttered pages with title, small subtitle, one prominent colorful instructional visual, concise instruction;
- consistent Back / Home / Next navigation in the same relative place;
- four original tabs on a concept page: **The Idea / Example / Think / Try it**;
- a definition page with worked example and student problem;
- three progressive guided problems, with hints/reasoning steps **accumulating vertically** rather than replacing earlier steps;
- chapter equation summaries and printable notes;
- true publisher-specific text pathways only when grounded in real adopted editions and appropriately approved.

## What exists on main before this pass

Twenty original interactive Physics and Calculus lessons; 60 graduated problems; 84 selected Physics formula entries spanning thirty printed Glencoe chapters; three optional microchallenges; Motion Data Lab with actual client-side least-squares fitting, printable notes, local completion status; curriculum graph that separates `available` and `planned` concepts. The existing Physics course follows **Glencoe: Physics: Principles and Problems**, starting in Chapter 1. The Chapter 28 hydrogen emission example is optional, not the default next lesson.

## Changes in the October 25 publisher-demonstration pass

1. New source `content/book-pathways.json` with grade paths (7, 8, 9, 11, 12) and seven official publisher or separate prototype/course references, each with a **mapping status**, official URL when available, and curated existing topic links. Never silently claim a Novare chapter matches Glencoe.
2. New routes rendered in `app.js`:
   - `#books`: Browse by grade or title.
   - `#grade/8`: Filter books in a grade.
   - `#book/physical-science`, `#book/introductory-physics`, `#book/physics-modeling-nature`, and other `book/{id}` pages: display authentic publisher reference, **illustrative topic connections**, and direct links to original concept/study/guided-practice pages.
   - `#showcase`: Short publisher demonstration journey and editorial permission questions.
3. Classical-inspired independent design in `styles.css`: parchment, navy, burgundy and muted gold, larger editorial serif type, unified cards and navigation, original `LA` mark rather than Memoria Press logo. **This is not sanctioned Memoria Press branding.** Bright mathematical diagrams retain meaningful teal/amber/green line colors.
4. `index.html` and `lab/motion.html` explicitly disclose that this is an independent prototype; include Books & Grades and Publisher Demo navigation. `lab/motion.css` aligns lab chrome with design.
5. New static and generated-route checks in `scripts/validate-book-portal.mjs` and `.github/workflows/validate.yml`.
6. Product/design/approval review: `docs/15_PUBLISHER_DEMO_DESIGN_AND_PRODUCT_REVIEW.md`.
7. This handoff for continuity in a new conversation.

No new subject lessons, licensed diagrams, Memoria Press logos/book covers, copied textbook prose, school-owned assessments, teacher keys or personally identifiable student data were added in this pass.

## Canonical files to read FIRST

- `README.md` — public overview, source boundaries.
- `docs/15_PUBLISHER_DEMO_DESIGN_AND_PRODUCT_REVIEW.md` — current publisher pitch, style, feature ideas, approval gates.
- `content/book-pathways.json` — verified public catalog references and intentionally illustrative relationships.
- `index.html`, `styles.css`, `app.js` — current independent interface, routes and original applets.
- `curriculum/catalog.json` — canonical curriculum topics, status, prerequisites, source rights, 30-chapter Glencoe index.
- `content/lessons.json`, `content/guided-practice.json`, `content/equations-physics.json` — lesson and math sources.
- `docs/09_FOCUSED_LESSON_AND_VISUAL_DESIGN_STANDARD.md`, `docs/10_CURRICULUM_ARCHITECTURE_AND_OWNERSHIP.md`, `docs/13_TEXTBOOK_ORDER_STUDY_GUIDED_PRACTICE_AND_EQUATIONS.md`, `docs/14_CHAPTER_01_FOUNDATIONS_BUILD.md` — prior governing standards.
- `scripts/validate-book-portal.mjs`, `scripts/validate.mjs`, `scripts/validate-curriculum.mjs`, `scripts/validate-learning-resources.mjs`, `scripts/test-interactives.mjs` — validation.
- `.github/workflows/validate.yml` — CI, plus `lab/` and `materials/`.

## Product truth and rights boundaries

- Memoria Press's catalog publicly lists **Novare Physical Science** in Grade 8, **Novare Introductory Physics** for Grade 9+, **Physics: Modeling Nature** on its Grade 11 page, and historical/narrative science for younger grades. Publisher sources:
  - https://www.memoriapress.com/science/
  - https://www.memoriapress.com/8th-grade/
  - https://www.memoriapress.com/11th-grade/
  - https://www.memoriapress.com/math/
  - https://www.memoriapress.com/curriculum/math/memoria-pre-algebra-set/
- **Never rebrand Glencoe chapter numbers as Novare chapter numbers.** Current mapping is conceptual/illustrative only, not official.
- Grade 12 Calculus on the demo is an **independent course pathway**, not a claimed published Memoria Press calculus textbook.
- Publisher-branded product use requires permission, versioned adopted textbooks, edited crosswalks, and a supplied design/brand kit. No access control exists on a public static GitHub Pages site: never put teacher-only keys or copyrighted source files in any directory there.
- Avoid copying from the separate private `antmhernandez/HLS-Teaching` repository or Memoria Press/Novare/publisher texts without appropriate rights review.
- The site does not provide account access, cloud uploads, student tracking, or paid AI processing.

## Important next work (FEATURES, NOT CURRICULUM EXPANSION)

1. **Real browser quality check** of homepage → Grade → Book → Concept → Study → Guided Practice → Back, including narrow screens, desktop and keyboard. Fix actual route errors, overflow, missing focus states or confusing paths. GitHub CI static checks are insufficient.
2. **Presentation / whiteboard mode** for a concept applet, preferably a lightweight full-screen toggle that leaves student data local, with reset/pause/reveal controls consistent across demos.
3. **Breadcrumbs / back-to-book contextual navigation.** Current linked concepts lead to an independent course route; a more refined experience should retain the originating book route in the URL or short-lived state *without browser-history traps* and without leaking an unapproved textbook alignment claim.
4. **Publisher editorial review lane.** Define a simple JSON schema and review status for future edition-specific mapping. Do not create exact chapter numbers or pages until an actual TOC and permission exist.
5. **Print / share workflow** for original notes and precise lesson URLs; optional copy-link button and projector controls. Confirm there is no analytics or student tracking unless explicitly authorized.
6. **Reduce the monolithic `app.js`** after putting regression tests in place. Aim for a maintainable original component registry and map pages from catalog data.
7. **Design refinement** based on Memoria Press's feedback—especially whether to adopt their actual sanctioned logo/design guide, not by scraping/recreating it.
8. **Clear demo pitch:** list benefits to students, teachers, parents and publisher, possible pilot sizes, editorial gates, security/hosting realities and how to coexist with existing instructional videos.

## Suggested five-minute publisher walkthrough

1. Open the independent homepage, acknowledge independent demo status and explain the text-first principle.
2. Visit `#books` → `#grade/8` → `#book/physical-science`. Show the real publisher catalog link and explicit disclaimer that the original concepts shown are **illustrative**.
3. Open `#lesson/scientific-measurement` or `#lesson/graph-slope-physics` and demonstrate the moving visual with *The Idea / Example / Think / Try it*.
4. Advance the worked example one step at a time, keeping previous steps visible. Open `#guided/graph-slope-physics` for the three-level explanation scaffold.
5. Show `#equations/1` and `lab/motion.html` briefly as supplementary resources.
6. Return to `#showcase` and ask how Memoria Press would want textbook-specific alignment, ownership, permissions and its actual design guide handled.

## Handoff prompt to paste into a fresh conversation

> Please continue developing my independent **The Learning Atlas / Interactive Academy** publisher-facing website, prioritizing **features, usability, navigation and design rather than adding more Physics or Calculus lessons**. The source of truth is the GitHub repository https://github.com/antmhernandez/Interactive-Academy, branch `main`.
>
> **First read in full:** https://github.com/antmhernandez/Interactive-Academy/blob/main/docs/HANDOFF_2026-10-25_PUBLISHER_DEMO.md and then https://github.com/antmhernandez/Interactive-Academy/blob/main/docs/15_PUBLISHER_DEMO_DESIGN_AND_PRODUCT_REVIEW.md . Consult `README.md`, `curriculum/catalog.json`, `content/book-pathways.json`, `index.html`, `styles.css`, `app.js`, the governing instructional standards in `docs/`, and CI.
>
> The website is to be demonstrated to **Memoria Press** as an **independent exploratory concept**, not an approved product. Preserve the classical-inspired original navy/burgundy/gold/cream aesthetic without copying publisher logos or cover art, retain the four **The Idea / Example / Think / Try it** tabs and vertically accumulating solution steps, and preserve all existing lessons and functioning mathematical demos.
>
> The new `#books`, `#grade/{grade}`, `#book/{id}`, and `#showcase` routes provide grade-level published-text references and original conceptual examples. Do not claim page/chapter alignment with Novare or other Memoria Press books until a **publisher-approved edition-specific crosswalk** is supplied. The existing Glencoe Physics chapter sequence is separate from these Memoria Press/Novare text references. Keep student/teacher IP and data protections intact.
>
> **Immediate task:** conduct thorough desktop/mobile/keyboard testing of the publisher demo journey; fix concrete UI problems; then improve contextual Back-to-Book navigation and evaluate a simple projector/presentation mode. Make actual GitHub changes on a feature branch, run validation, merge a successful PR into `main` when appropriate, and report exactly what changed, what was tested and what still needs publisher review. Keep the handoff current before conversation context grows long.

## Checklist for handoff completion

- [ ] Verify the latest `main` commit is deployed on GitHub Pages and CI passes.
- [ ] Use `main` as source of truth; link the merged PR in the new conversation.
- [ ] Revisit user feedback on design and textbook navigation before broadening scope.
- [ ] Update this handoff and the publisher proposal if substantial product decisions change.
- [ ] Ask the employer for the specific approved textbook titles, editions and publisher brand kit only when ready for formal alignment.

## Follow-up implementation: publisher journey and classroom mode (October 25, 2026)

**Merged:** [PR #9](https://github.com/antmhernandez/Interactive-Academy/pull/9) into `main` on October 25, 2026 (merge commit `7ad687a1d5b33614d410852bf9b1bef162408cd0`). **Scope:** features and accessibility, not new curriculum. This supplements rather than supersedes the original handoff above.

### What changed
- **Shareable, non-authoritative context URLs:** A grade selection opens `#book/physical-science?grade=8`. The book's original concept links open `#lesson/si-units?book=physical-science&grade=8`; that origin is preserved in `#study/...` and `#guided/...` (and optional short challenges). Book Back returns to Grade 8; lesson Back returns to the actual book; Next advances through that book's *illustrative* concept shortlist, not an invented Novare chapter sequence. A visible breadcrumb says **Illustrative concept**.
- **No forged association:** A `book` URL parameter is honored only when the matching topic ID actually occurs in that book's `content/book-pathways.json` examples. Invalid or missing book parameters fall back to the independent subject navigation. Direct `#lesson/id` links continue to function.
- **Keep two chapter systems separate:** Physics chapter-equation links remain available in the independent Glencoe course and its `existing-glencoe` pathway; they are hidden when arriving from any other book example to avoid labeling Glencoe Chapter 1 as a Novare chapter.
- **Teacher presentation view:** Every main lesson gains **Present lesson**; its reversible local focused overlay enlarges the original visual and its four tabs, retains sliders and vertically accumulating worked steps, allows exit by Escape or button, and removes background elements from keyboard navigation while active. It does not ask for true browser fullscreen or collect student data. An additional **Copy lesson link** shares the precise contextual URL in secure contexts and provides an address-bar fallback.
- **Touch and keyboard:** Minimum-height route controls, wrap-safe navigation at phone sizes, visible breadcrumbs, main-region focus after hash navigation, Escape to close mobile menu and presentation, improved skip-link label, and presentation typography.
- **Automated checks:** Extended `scripts/validate-book-portal.mjs` to test grade/book context integrity and invalid associations. Added `scripts/test-browser.mjs` and a GitHub Actions Chromium run covering 320, 375, 768, 1024, 1440px, classroom controls, route navigation, ARIA tab arrows, and cumulative worked solutions.

### Validation requirements
The JS edits were parser-checked while creating them. Run the existing Node validators and the new Chromium browser suite in `.github/workflows/validate.yml`. Do **not** claim actual mobile-device, screen-reader, Safari, physical projector or publisher QA solely from headless Chromium. Review the PR's CI result before merging.

### Intended continued feature work
1. Perform a genuine phone/tablet/classroom projector manual walkthrough, including iOS Safari and VoiceOver or NVDA; inspect text wrapping, scrollbar behavior and focus.
2. Improve the browse-by-book experience after actual publisher feedback; seek approved editions/table-of-contents metadata *before* any official chapter mapping.
3. Consider accessible diagram text alternatives and better math semantics (MathML) in a separate tested change.
4. Keep presentation mode a local, no-login enhancement; a secure teacher lane or publisher-branded edition requires a separate authorized architecture.
5. Maintain the original twenty lessons, four learning tabs and accumulative problem-reveal behavior without broad curriculum expansion.

**Rights invariant:** The existing Glencoe thirty-chapter framework remains independent from Novare/Memoria Press. The contextual URL is an *illustrative topic discovery link*, not a claim about a publisher book's adopted edition or chapter. No protected content, institutional files or branded art have been added.

### Verification record for follow-up

- **GitHub Actions PR run #32:** [Validate interactive academy](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40215750919) — **successful** after two corrections to test fixtures/timing and a genuine mobile masthead overflow fix.
- The existing syntax, resource, curriculum, simulation and numerical regression validators passed.
- Chromium successfully completed the grade-to-book-to-original-lesson-to-study-to-guided route, ARIA tab keyboard navigation, cumulative example/practice steps, present/Escape controls, no forbidden chapter crosswalk, independent direct links and no horizontal page overflow at **320, 375, 768, 1024 and 1440 px**.
- The merge was independently verified on `main`. A green PR CI run does **not** prove that GitHub Pages propagation has completed or that physical-device and assistive-technology QA has occurred.
- Future conversations should start on `main`, consult PR #9 for the exact code changes, and continue focusing on features and publisher review before adding more curriculum.

## October 25 continuation: visual refinement, library features and carefully scoped content

**Merged:** [PR #10](https://github.com/antmhernandez/Interactive-Academy/pull/10), squash commit `82b84a0fee9f78e333341f6e3deea580e96d92be`, October 25, 2026. **Requested change:** user explicitly authorized adding content after beautification and feature work. `main` is authoritative.

### Committed enhancements
- Original editorial two-column homepage with engraved-feeling mathematical illustration; responsive one-column arrangement on smaller devices; clearer four-part **The Idea / Example / Think / Try it** teaching method; contrast-minded navy/burgundy/gold/cream styles.
- Homepage privacy-first **Continue learning** links choose the next incomplete Physics or Calculus lesson from the existing local completion set. Nothing is uploaded to a server. School/student data and teacher keys are not introduced.
- Instant filter/search on `#books` with a result count, empty state, and accessible label. Book detail gives a **clearly illustrative** starting point with the existing rights note.
- Subject page completion progress bar with accessible ARIA values; concept page now names its original **essential question** alongside the visual, without changing the lesson's four tabs, cumulative steps or working applets.
- **Two independently authored Physics lessons (Chapter 6 of the existing Glencoe-index course only):**
  - `#lesson/two-dimensional-motion`: angle/speed vector components, live projections, misconception-aware checkpoint, worked example, 3 guided practice levels.
  - `#lesson/projectile-motion`: ideal level-to-level projectile path with live launch speed/angle and measured flight time/range/height, deriving results from horizontal uniform motion and gravity; 3 guided levels.
- Incremental path now goes `force-components → two-dimensional-motion → projectile-motion`, with the separate optional Chapter 28 atom curiosity still at the end of the published list. `existing-glencoe` book-pathways entry exposes these examples; publisher-catalog/Novare records are **unchanged**. No copied textbook language, artwork, answers, covers or proprietary alignment was added.
- Updated validator counts and added numerical simulator checks plus headless Chromium coverage for the new home layout, library search and lesson interactions. Coverage must be reviewed in CI before merge.
- Full design, mathematical model assumptions, teaching notes and acceptance scope: [`docs/16_EDITORIAL_INTERFACE_AND_CHAPTER_06.md`](16_EDITORIAL_INTERFACE_AND_CHAPTER_06.md).

### Remaining review and next session
- Verify full successful GitHub Actions execution and merged PR SHA. Check actual GitHub Pages deployment after merge.
- Run manual checks on physical iOS/Android phones, Safari, projector and NVDA/VoiceOver. Headless Chromium does not certify WCAG compliance.
- Review the expanded Chapter 6 pedagogy with a Physics editor and student users, paying attention to no-air-resistance assumptions and the distinction between range, displacement and total path length.
- Improve diagram text alternatives and printing, run a publisher review meeting, and request approved edition-specific TOCs/branding only once permissions exist.
- Maintain original content ownership. No ISBN/chapter/page assertions about Novare have been inferred.

### Validation record for PR #10
- [GitHub Actions run #37](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40219643743): **successful** on the feature PR before merge.
- Passed: 22 lesson records, 66 guided problems, 148 canonical curriculum topics (17 live Physics, 5 live Calculus), 84 equations, independent publisher-reference integrity, mathematical regression checks and both new visual simulator unit tests.
- Chromium: successful at 320, 375, 768, 1024 and 1440 px with homepage/editorial overflow checks, catalog search with empty state, grade/book/context route, 4-tab keyboard accessibility, cumulative steps, projector overlay/exit and Chapter 6 original simulator navigation.
- GitHub branch merge confirmed. As with earlier runs, the browser suite is not a substitute for real-device or screen-reader testing, nor a formal publisher permissions review.

## October 25 continuation: Interactive investigations and content (merged PR #11)

The user explicitly wants **many original PhET-style interactive applets** for difficult Physics/Calculus concepts, integrated with mathematical intuition and graduated computation. The project contains its own code, not externally embedded PhET resources. Keep independent rights status and original publisher demonstration visual identity.

**Merged:** [PR #11](https://github.com/antmhernandez/Interactive-Academy/pull/11) into `main` on October 25, 2026; squash commit `f60ee820161ab3562e8ccca89f4cc29842067a53`. **Source of truth:** `main`.

### Work completed on this branch
- New `#applets` route: **Experiment Room**, ten discoverable original teaching models with subject filter. The top navigation, homepage and publisher overview now link to the resource library.
- Four Chapter 6 concepts include original collapsible **Predict → Manipulate → Connect** activities that connect a manipulable investigation to governing equations.
- `#lesson/circular-motion`: speed and radius sliders, physically consistent `aᶜ=v²/r` and `T=2πr/v`, directions of velocity and acceleration, motion playback/pause, 30° step, reset, and arrow toggle. Animation is requestAnimationFrame-based, stops on detached views, and honors direct user control.
- `#lesson/relative-velocity`: river width, boat-through-water speed, eastward current and directional heading sliders, shore-frame path, arrival drift, crossing time, ground speed, an upstream-aiming button and reset. Physics adds velocity **vectors from stated reference frames**.
- Two more complete original concept lessons, worked examples, misconception checks and six more guided problems. Physics primary chain now `... projectile-motion → circular-motion → relative-velocity`, preserving the optional Chapter 28 preview as a separate appendix. Total 24 live lessons (19 Physics, 5 Calculus), 72 guided problems; mathematical curriculum registry still has 148 total planned/live topics.
- The `existing-glencoe` independent book entry includes both new applets; **no Novare/Memoria Press chapter references were added or relabeled**.
- Numerical simulator tests and responsive browser checks were expanded, along with existing content validation count assertions.
- Design and further-applications standard: [`docs/17_INTERACTIVE_INVESTIGATIONS_2026-10-25.md`](17_INTERACTIVE_INVESTIGATIONS_2026-10-25.md).

### Next focus
Keep expanding conceptual simulations selectively: friction/inclines, energy conservation, waves, electric fields and advanced Calculus convergence are promising *after* classroom testing identifies misconceptions. For each: a manipulable physical/mathematical model, explicit assumptions, predict/explain task, exact governing equations, solved example, conceptual distractors, numeric independent practice and 3 scaffolded problem levels. Do not equate more buttons with better pedagogy; do not incorporate school or publisher IP without permission.

**Successful CI before merge:** [GitHub Actions run #44](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40221549917). The existing content, Physics numeric, textbook source and five-width Chromium suites passed; browser covered gallery filtering, circular-motion step/play/pause, river-crossing aim/reset and existing classroom modes. Physical-device/Safari/VoiceOver/projector reviews have not been performed and must not be inferred from automated Chromium.

## October 25 continuation — Contact-force concept laboratories

**Merged:** [PR #12](https://github.com/antmhernandez/Interactive-Academy/pull/12) into `main` October 25, 2026; squash commit `d4578df7b0dda89831eab9835aac8b8e1261af68`. **User goal:** continue delivering original manipulative applets and problem scaffolding; `main` is authoritative.

### Implementation
- Two complete original student-facing Chapter 5 lessons:
  - `friction`: horizontal applied pull, mass, static coefficient and kinetic coefficient sliders; physically coherent initial-rest static equilibrium `|fs| ≤ μs N`, crossing to kinetic sliding `fk=μk N` and `a=(F-fk)/m`; an action jumps just beyond static threshold; Reset and numeric force/acceleration readouts.
  - `inclined-planes`: ramp angle/mass/coefficients, `mg sinθ` downhill, `mg cosθ` normal, adaptive static friction vs kinetic branch, critical angle `arctan μs`, acceleration and first-slip experiment button; Reset.
- **Important scope:** both models predict onset from rest under stated steady forces. They do not integrate motion trajectories, reverse slip, coasting, complex surface contact, rolling or hysteresis. Kinetic coefficient is constrained to ≤ static coefficient within this idealized educational model. Avoid treating these visual diagrams as exact-scaled force arrows; numeric readouts are authoritative.
- All existing twenty-four lessons and ten curated applet examples are retained. Total: **26 lessons (21 Physics + 5 Calculus), 78 three-level problems, 12 gallery applets**; equation reference remains 84 entries. The added lessons are inserted in Chapter 5 between `force-components` and `two-dimensional-motion` so the independent learning chain continues in textbook order, and the main optional Chapter 28 curiosity remains separate.
- The original applet engines are in `applets/contact-forces.js`, loaded as a plain deferred script before `app.js`, instead of further enlarging the main file. The existing `#applets` gallery and original Glencoe prototype route gain these examples. No Novare/Memoria Press edition or chapter alignment is claimed.
- Standard data/lesson validators, new physics-specific `scripts/test-contact-forces.mjs` and enhanced Chromium navigation tests at 320, 375, 768, 1024 and 1440 px. Check completed workflow result before merge.
- Full numerical teaching/design standard: [`docs/18_CONTACT_FORCES_AND_INCLINES_2026-10-25.md`](18_CONTACT_FORCES_AND_INCLINES_2026-10-25.md).

### Next work
- Verify numerical cases, browser accessibility/overflow, signed units, threshold controls and PR CI. Merge only after successful validation; record PR SHA, final main CI run and truthful untested areas.
- Human teacher/student review of static friction (not always μsN), start-of-slip and ramp component intuition; manual touch, Safari and screen-reader testing.
- Next high-value applet topics after a real classroom review: energy conservation and frictional loss; elastic/inelastic collisions; wave interference; graphical Calculus convergence.

### Verification record for friction/incline PR #12
- **PR validation successful:** [GitHub Actions run #50](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40229164106).
- Passed: all original validators; 26 lessons / 78 guided problems / 84 existing equation entries / 148 canonical curriculum topics; two separate force-model numerical regression suites testing threshold, kinetic branch, ramp components, critical angle, mass cancellation, constrained coefficients and reset.
- Headless Chromium passed at 320, 375, 768, 1024, and 1440px; covers the experiment-gallery count/filter, book navigation, lesson tabs, numeric sliders, both new onset-of-slip actions, progressive steps and presentation mode.
- Publishing: PR #12 merged into `main`. Re-verify main-branch CI and public Pages propagation separately; do not substitute a Chromium viewport for actual iOS/Safari, screen-reader, physical projector or lesson-pedagogy testing.

## October 25 continuation: original conservation-of-energy laboratory (merged PR #13)

**Merged into `main`:** [PR #13](https://github.com/antmhernandez/Interactive-Academy/pull/13); squash commit `958756d3f5220aab0e6e8e67590ab9e1936652dc`. **The authoritative branch is `main`.** The user requested continued implementation following completed Chapter 5 force applets; conserve original textbook order while opening a useful preview of Chapters 10–11.

### Features and lesson architecture
- New original `applets/energy-ramp.js` module exports global `energyRampState` (pure physics calculation) and `energyRamp` (accessible controls, geometric illustration, energy bars, step, real-equation playback, compare frictionless, reset).
- Ideal block/ramp/Earth thermal energy bookkeeping: ramp angle 35°; friction μk=0–0.4 (below tan35° so downslope motion exists from rest); mass 1–8kg, start height 2–12m, start speed 0–8m/s, position 0–100%. `K₀=mv₀²/2`, `U₀=mgH`, `Q=μₖmg cosθ × (pH/sinθ)`, `U=mgH(1−p)`, `K=K₀+mgHp−Q`; `K+U+Q=K₀+U₀`. Playback follows `s=v₀t+½at²` with `a=g(sinθ−μₖcosθ)` at slowed viewing speed; animation exits when lesson is detached.
- New **four complete, optional Physics previews** `work-energy`, `kinetic-energy`, `potential-energy`, `energy-conservation` inside existing canonical `phy-energy` registry (chapter 10–11). Each includes short readable definition, independently-authored three-step worked example, student numerical response/hints, misconception check, Predict–Manipulate–Connect activity, and exactly three guided problems.
- **Crucial sequencing policy:** all four energy lessons have `optionalPreview:true` and `next:null`. They are *not* the required next lesson after Chapter 6. A dedicated four-link lesson-local study path helps exploration in conceptual order, with an explicit optional banner. The Chapter 28 atomic preview remains optional. No invented Chapter 7/8/9 coverage.
- Energy demo appears once in the Experiment Room (13 curated models total) and all four lesson pages reuse the same physically correct diagram. This is not an endorsement or precise textbook mapping for any Novare or Memoria Press volume.
- Total after this pass: **30 lessons (25 Physics and 5 Calculus), 90 graded problems**, 148 registered topics with 30 available, 84 original equation index entries, 13 gallery models.
- New tests `scripts/test-energy-ramp.mjs`: many mass/height/speed/friction/position combinations, total energy, endpoint, ideal no-friction limit, friction comparison and input/reset. Extended lesson, registry, main-path and five-width Chromium checks; CI syntax validation for energy module.
- Full design and source/assumption review: [`docs/19_CONSERVATION_OF_ENERGY_LAB_2026-10-25.md`](19_CONSERVATION_OF_ENERGY_LAB_2026-10-25.md).

### Remaining acceptance and next development
- PR validation passed: [GitHub Actions run #55](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40232066089) (the exact run ID is authoritative; job completed successfully). Check final `main` push and Pages workflows separately after the documentation commits.
- Physical Safari/Android, keyboard and screen reader, projector and teacher/student comprehension audits are **not** established by automated Chromium.
- Future progression: first fill Chapters 7–9 sequentially (gravitation, rotation, momentum) when building the required course; or maintain other higher-chapter applets as *clearly optional previews*. Avoid silently skipping prerequisites.

### Verified energy feature implementation
- PR #13 merged after successful full [GitHub Actions run 40232066089](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40232066089), covering model numerics, school-year textbook sequencing and headless Chromium viewport journeys.
- Four energy lessons are explicitly `optionalPreview:true` and do not modify the regular Chapter 1–6 next chain; see source audit `docs/19_CONSERVATION_OF_ENERGY_LAB_2026-10-25.md`.
- Manual Safari/iOS/Android, VoiceOver/NVDA and large-display classroom comprehension reviews are still unperformed. Do not imply otherwise.

## October 25 continuation — Chapter 7 gravitation investigations (merged PR #14)

**Merged:** [PR #14](https://github.com/antmhernandez/Interactive-Academy/pull/14) into `main`, squash commit `849ae8c6c56831fba1952a366434ca9c7a01aeba`. User explicitly requested continued implementation after the energy applet release. The correct next primary unit is Glencoe-indexed Chapter 7, not Chapter 10–11, which remains an optional preview.

### Contents of this release
- Two original simulations in standalone `applets/gravitation.js`. First: `gravityField` with Earth-mass multiple 1–10, small test mass 1–10kg, center radius 1–8 Earth radii, Newtonian force and free-fall acceleration; explicit inverse-square numerics. Second: `orbitGravity` with central mass, satellite/test mass, radius 1.5–8 Earth radii, 360° orbit phase, manually stepped/visually slowed play, inward force, speed, period, gravitational acceleration and zero ideal normal-force readout. Central radius is fixed to Earth's even when mass varies, and the drawing is schematic.
- Three complete original `phy-gravity` student lessons, `universal-gravitation`, `orbital-motion`, `weightlessness`, connected into main required sequence immediately after `relative-velocity`, and each with 3 scaffolded problems, unique worked example, 3-choice misconception check, and inquiry prompt.
- Updated canonical topic statuses/official original lesson titles; no changes to textbook chapter indices or any Novare/Memoria Press volume listings. Separate independent Glencoe-based reference entry updated only.
- Existing optional preview `work-energy`, `kinetic-energy`, `potential-energy`, `energy-conservation` (Ch. 10–11) and `atom-spectra` (Ch. 28) stay optional with no false shortcut. Kepler/historical planetary model and remaining Chap. 7 topics remain `planned`.
- Totals become 33 complete lessons (28 Physics/5 Calculus), 99 guided problems, 15 gallery applets, original 84 equation entries, 148 registered canonical Physics/Calculus concepts.
- `scripts/test-gravitation.mjs` covers force vs test mass, inverse-square falloff, orbital speed, period/radius scaling, force/centripetal-acceleration agreement, ideal normal force, input changes and reset; headless Chromium expanded at five screen widths.
- [Mathematical model and teaching audit](20_GRAVITATION_CHAPTER_07_2026-10-25.md).

### Required handoff checks
PR CI, merge SHA, main push CI, Pages publishing workflow must all be independently verified and recorded before claiming success. Human iOS/Android, NVDA/VoiceOver, physical projector and pupil comprehension remain unverified; do not suggest this is a completed accessible commercial product. Chapter 8 Rotation and Chapter 9 Momentum are logical later primary expansions, but accuracy and design refinement should precede content acceleration.

### Chapter 7 acceptance result
- [Full PR validation #60](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40241966619) passed lesson/data/curriculum/source validators, regression models, Chapters 5/6/7 physics model tests, 33 lessons/99 guided problems/84 equation entries, and all five Chromium widths (320/375/768/1024/1440px), including orbit phase/step/play, 0N ideal support, gravity ratio and lesson next navigation.
- [PR #14](https://github.com/antmhernandez/Interactive-Academy/pull/14) successfully squash merged. Record final `main` CI and Pages workflow status after the last documentation push separately.
- The new Chapter 7 physics applets are original, simplified Newtonian models; physical phone, projector, Safari, screen-reader and educational efficacy testing have not been performed.

## October 25 continuation — Chapter 8 Rotational Motion optional extension (merged PR #15)

**Merged:** [PR #15](https://github.com/antmhernandez/Interactive-Academy/pull/15) into `main`, squash SHA `86777a7f991838a0ae0dc992b4015e36f71d0954`. The authoritative branch is `main`. User asked to continue implementation; prior recommendation was interactive torque, moment of inertia and angular acceleration.

### Important syllabus discovery
The authoritative `curriculum/catalog.json` marks Chapter 8 `scope:optional-extension` and the course schedule in `sourceAlignment.physicsCourse` explicitly lists Chapters 1–7 then 9, *not* Chapter 8. **Do not silently promote Chapter 8 to core.** The new `phy-rotation` registry unit has `syllabus.scope:"enrichment"`, and all three finished Chapter 8 lessons are `optionalPreview:true,next:null`. The primary Physics Next chain still ends at `weightlessness` (Chapter 7); Chapters 10–11 energy and Chapter 28 atomic content remain optional too. Chapter 8's own in-lesson links form a separately labeled three-topic study sequence.

### Implementation
- Three complete new original lessons: `torque-levers`, `rotational-inertia`, `rotational-dynamics`, with concise definitions, multi-step worked examples, conceptual distractors with feedback, Predict–Manipulate–Connect guidance, independently checked numeric practice and Begin/Extend/Challenge guided sets.
- New original `applets/rotation.js`: signed torque `τ=rFsinφ` for a horizontal lever with a single applied force and fixed pivot (positive CCW, negative CW); interactive distance, force, angle, perpendicular/along arm buttons and reset.
- Uniform solid disk/ideal thin hoop spin experiment: `I_disk=½mR²`, `I_hoop=mR²`, `α=τ/I`, from rest `ω=αt`, `θ=½αt²`, `K=½Iω²=τθ`. Adjust mass, outer radius, body shape, constant nonnegative net torque, elapsed time, play/pause at slowed visual speed, switch body, step +0.5s, reset. No rolling contact, friction, motor losses, changing torque or axis wobble.
- Two new Experiment Room cards, linking only to original lesson IDs. Append Chapter 8 to existing independent Glencoe-index prototype pathway; do not change any publisher-specific catalog/book associations or invent Novare alignments.
- Updated total: **36 complete lessons (31 Physics, 5 Calculus), 108 guided problems, 17 curated gallery models**, 151 canonical curriculum topics, existing 84 physics chapter equations.
- Test `scripts/test-rotation.mjs`: exact signed torque, mass/radius distributions, wheel angular acceleration/time, torque-work energy equality, angle direction and reset. Expanded CI numeric/registry checks plus five-width Chromium journey; explicit assertions Chapter 8 remains an optional/enrichment unit.
- Detailed mathematical/source/teacher audit: [`docs/21_ROTATIONAL_MOTION_CHAPTER_08_2026-10-25.md`](21_ROTATIONAL_MOTION_CHAPTER_08_2026-10-25.md).

### Acceptance and continuing priorities
- **PR validation passed:** [GitHub Actions run #65](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40247400161), covering 36 lesson records, 108 graduated exercises, 151 registered concepts, 84 physics equations, torque/inertia/kinematics regressions, chapter enrichment safeguards, publisher context and five Chromium viewports. PR #15 squash-merged successfully. Verify the latest main-branch CI and Pages workflows after final documentation commits.
- Human keyboard/VoiceOver/NVDA, mobile Safari, actual physical projector and student conceptual-comprehension checks remain outstanding.
- The next **required** book unit is Chapter 9 Momentum, given the authoritative course schedule; Chapter 8 is an optional illustration for interested users. Prioritize polishing/proven comprehension over content quantity if it improves the publisher demo.

### Chapter 8 release: verified details
- Headless Chromium test passed on the feature PR at 320, 375, 768, 1024 and 1440px, covering 17 experiment cards, independent Chapter 8 optional-study links, torque sign changes, disk/hoop inertia comparison, spin time stepping/play/pause and the existing site navigation.
- Mathematical regression verified `τ=rFsinφ` across directions, `I_disk=½mR²` and `I_hoop=mR²`, `Iα=τ`, `ω=αt`, `θ=½αt²` and `τθ=½Iω²` across a broad range of masses, radii, torque and elapsed time.
- Completed `main` merger is [PR #15](https://github.com/antmhernandez/Interactive-Academy/pull/15), squash commit `86777a7f991838a0ae0dc992b4015e36f71d0954`. Physical iOS/Safari, assistive-technology and projector testing are still outstanding.

## October 25 continuation — Chapter 9 Momentum, impulse, signed conservation (PR in progress)

**Working branch:** `feature/chapter-09-impulse-momentum-labs-2026-10-25` from verified `main` release `ba6e53de8946851b83b567f45a6dad579525f54e`. User requested continuing the independently authored publisher-facing Physics applets, specifically Chapter 9 as recommended at the end of PR #15.

### Implementation and curriculum integrity
- Three original complete **required school-year** lessons in canonical `phy-momentum` existing unit: `impulse` → `momentum-conservation` → `momentum-vectors`. Change `weightlessness.next` to `impulse`, `momentum-vectors.next=null`. This preserves main required sequence Chapter 1–7 then Chapter 9 and excludes optional Chapter 8. Align both lesson JSON order and guided practice order to the **registry unit order**: `weightlessness`, optional `torque-levers`/`rotational-inertia`/`rotational-dynamics`, then Chapter 9 impulse/conservation/vectors, then optional energy and atom. Registry validation requires this exact order.
- All three have original essential questions, three-step worked examples, concise definitions, original conceptual checks with distinct feedback, student numeric problem/hints, inquiry prompts and exactly three Begin/Extend/Challenge numerical problems. Total: **39 complete lessons (34 Physics, 5 Calculus), 117 graduated problems**.
- `collisions` remains `planned` because its registry prerequisite `energy-conservation` is only an optional Chapters 10–11 preview. Nevertheless the main momentum-conservation and signed-vector lessons legitimately contain an **ideal instantaneous two-cart example** for a sticking collision and an optional perfectly elastic comparison; these examples do not claim complete elastic/inelastic energy coverage.
- Two **original browser-native lab applets** in `applets/momentum.js`: force–time rectangular signed area under constant net force, `J=FΔt=Δp`, equality-of-impulse comparison; ideal 1D isolated approaching carts with masses/signed speeds, predict→reveal, stick-together or perfectly elastic outcome, conserved total signed momentum, explicitly optional kinetic-energy comparison, reset.
- New `scripts/test-momentum.mjs` separately tests signed impulses, mass cancellation, reversal, two-cart analytic outcomes, conservation of momentum across a broad grid, elastic energy conservation versus inelastic loss, and reveal/compare/reset. Extended five-width headless Chromium site journeys and data/source/learning validators.
- Adds two Experiment Room models, now **19**, and preserves 84 original physics equation references for 30 chapters. Canonical registry stays at 151 topics/22 units; only these three old planned entries flip to available. Expands *only* the independent Glencoe-index book pathway. Existing illustrative Memoria Press/Novare entries remain unchanged.
- Full model equations, caveats, acceptance cases and IP notes: [`docs/22_MOMENTUM_CHAPTER_09_2026-10-25.md`](22_MOMENTUM_CHAPTER_09_2026-10-25.md).

### Merge/quality gate and future direction
- Run GitHub Actions PR validations and Chromium five-width tests before merge. After merge record PR number, squash SHA, latest main-branch CI and latest Pages workflow separately. Human iPhone Safari, Android, VoiceOver/NVDA, projector/student comprehension remain **not done**.
- Next curricular progression Chapters 10–11 energy already has **optional** prototype lessons, but moving those into required school-year core requires a deliberate prerequisite/content review, especially before activating the planned dedicated collision lesson.
