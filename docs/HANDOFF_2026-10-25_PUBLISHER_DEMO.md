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
