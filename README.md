# The Learning Atlas — Interactive Physics & Calculus

**Working title:** Interactive Academy  
**Status:** Early educational prototype; not a complete course and not yet a commercial product.

A mobile-friendly, concept-first resource bringing together short explanations, interactive mathematical and physical diagrams, step-by-step worked examples, guided practice and printable student notes and laboratories.

## Publisher discussion edition (October 25, 2026)

**Development focus: elegant accessible interactions, coherent textbook discovery and deliberately limited original curriculum expansion.** This public prototype now has an independent classical-inspired visual identity and a *textbook-aware discovery experience*, without presenting itself as an authorized Memoria Press product.

- [Browse by grade and book](https://antmhernandez.github.io/Interactive-Academy/#books) — official public catalog references and curated original topic links. All links from publisher texts to lessons are explicitly **illustrative, not chapter-, page- or edition-approved**.
- [Explore a Grade 8 textbook path](https://antmhernandez.github.io/Interactive-Academy/#book/physical-science) — Novare Physical Science as a navigation example, with an official public catalog link.
- [Publisher demonstration overview](https://antmhernandez.github.io/Interactive-Academy/#showcase) — product concept, educational use, evidence of existing features, and the required editorial/rights decisions.
- [Publisher proposal/design/approval brief](docs/15_PUBLISHER_DEMO_DESIGN_AND_PRODUCT_REVIEW.md).
- [Portable handoff and next-conversation prompt](docs/HANDOFF_2026-10-25_PUBLISHER_DEMO.md).

The user-facing design takes inspiration from a classical publishing aesthetic (navy, burgundy, parchment, restrained gold and serif headings). **No Memoria Press logo, proprietary artwork, covers, passages, or branded fonts were copied**, and the publisher has not authorized this project. Our existing Glencoe-based 30-chapter Physics sequence is *separate* from the Novare textbook references in the discovery portal.

## Navigation and classroom display (follow-up)

Book-origin lesson routes retain a clearly labeled **illustrative** context through the concept, definition and guided practice, with Back-to-Book controls. For instance, `#lesson/si-units?book=physical-science&grade=8` links an original demonstration to an example Grade 8 discovery path; it **does not** claim Novare chapter or edition alignment. Teachers may use a local **Present lesson** overlay (Escape exits) and copy a direct lesson link. New headless Chromium smoke tests cover several viewport sizes and keyboard journeys; manual real-device and assistive-technology review remains necessary.

## Editorial interface and Chapter 6 expansion (October 25, 2026 · [merged PR #10](https://github.com/antmhernandez/Interactive-Academy/pull/10))

The homepage now uses an original mathematics illustration, a four-part lesson-method overview, more refined editorial typography and a private **Continue learning** area. The book library has instant search, a visible result count and an accessible empty state. Course pages show local completion progress and lessons foreground an essential question. The original navy, burgundy, antiqued-gold and cream palette remains distinct from official publisher branding.

Two new original Physics units of study are available: [Motion in Two Dimensions](https://antmhernandez.github.io/Interactive-Academy/#lesson/two-dimensional-motion) and [The Path of a Projectile](https://antmhernandez.github.io/Interactive-Academy/#lesson/projectile-motion). Each includes a dynamically calculated SVG model, four teaching tabs, stepwise worked example, reasoning check, numeric practice, and a three-level guided practice set. The projectile model assumes level launch/landing height, no air resistance and g = 9.8 m/s². The new content extends the independent Glencoe-index course and is **not** a Novare edition/chapter mapping. See [the implementation and pedagogy review](docs/16_EDITORIAL_INTERFACE_AND_CHAPTER_06.md).

## Interactive investigations / Experiment Room (October 25, 2026 · [merged PR #11](https://github.com/antmhernandez/Interactive-Academy/pull/11))

The new [Experiment Room](https://antmhernandez.github.io/Interactive-Academy/#applets) gives students a dedicated gallery of **ten original Physics and Calculus applets**, filterable by subject and linked directly to their complete lessons. These are independently built educational models, **not copies or embeds of PhET simulations**.

Two additional complete Chapter 6 Physics concepts are available:

- [Why Circular Motion Accelerates](https://antmhernandez.github.io/Interactive-Academy/#lesson/circular-motion): manipulate radius and speed, step through 30° increments, play/pause orbital motion, hide or show tangent/inward arrows, and connect the model to `aᶜ = v²/r` and period `T = 2πr/v`.
- [Crossing a Moving River](https://antmhernandez.github.io/Interactive-Academy/#lesson/relative-velocity): change speed, current, heading, and width; compare the ground-frame landing point, drift, crossing time, and net ground speed; aim upstream to counter the current.

The four Chapter 6 visual concepts now include optional **Predict → Manipulate → Connect** inquiry prompts directly beneath the demonstration. These prepare students to reason physically *before* they calculate. The basic The Idea / Example / Think / Try it framework, three graduated guided problems per lesson, and accumulating worked steps remain unchanged.

The project now has **24 lessons and 72 graduated problems**; the original 84-equation reference index remains available. See [the investigation design and mathematical QA standard](docs/17_INTERACTIVE_INVESTIGATIONS_2026-10-25.md).

## Current teaching preview
Twenty-four original demonstration lessons (nineteen Physics, five Calculus) now use a **visual-first page** with Back / Home / Next controls in a consistent position. Each topic opens with a large interactive diagram, one short focus cue, and four optional learning tabs: The idea, Example, Think, Try it. Twenty-four misconception-aware checks, three focused mini-challenges and nine printable student resources are now available. Slider-driven diagrams and answer checking execute in the browser. Completion flags are saved locally in the visitor's device without an account. An independent Motion Data Laboratory now lets students enter observations, fit linear/quadratic models, inspect residuals, print and export a CSV without submitting data to a server. These are not yet an entire graded course.

## Course map and source boundaries

The site offers a dedicated **Course Map** page for each subject, listing available lessons and planned topics separately. There are currently **148 canonical topic slots** across 21 units; 22 are implemented, 126 remain planned. Future topic slots are not published lesson links. Every public resource has one primary topic owner, and CI verifies the dependency graph.

## Textbook progression and learning companions

Physics begins with **Chapter 1: A Physics Toolkit**, then proceeds through Chapters 2–6, including original **two-dimensional velocity**, **projectile motion**, **circular motion**, and **river-crossing relative velocity** simulations in Chapter 6. Atomic spectroscopy remains an **optional Chapter 28 curiosity preview**, not the next main-course lesson. The complete textbook chapter index is arranged from 1 through 30, including those not yet developed as student lessons.

Every completed topic now includes **Definition & Example** (`#study/{id}`) and **Guided Practice** (`#guided/{id}`) pages. The study page has the original definition, fully worked example, and a student problem directly below. The practice page moves through Begin, Extend, and Challenge problems, progressively revealing each reasoning step *beneath* earlier steps. A separate **Physics Equation Reference** (`#equations`) indexes the formula notes for all 30 chapters. See `docs/13_TEXTBOOK_ORDER_STUDY_GUIDED_PRACTICE_AND_EQUATIONS.md`.

## Start
Open `index.html` through a local static server, such as `python -m http.server 8000`. In GitHub Pages, publish `main` from `/(root)` once the account is eligible.

## Educational promise
1. **Observe:** What is the interesting question or phenomenon?
2. **Explain:** What is the essential idea and governing quantity?
3. **Explore:** Use a diagram or an experimental model to see the relationship.
4. **Follow:** Work through a correct, well-motivated solution, one step at a time.
5. **Try:** Answer independently with optional graduated hints.
6. **Review:** Revisit the concept until the reasoning is secure.

## Source boundaries
The separate private repository `antmhernandez/HLS-Teaching` remains the working archive of Physics and Calculus notes, teacher keys, assessments and source files. **Do not directly copy those materials here.** A mathematics or physics concept is not proprietary, but the wording, figures and textbook-derived expressions can be protected. New website lessons must be independently authored, checked for accuracy, and reviewed for employment/publisher rights before publication. Do not merely synonym-replace a textbook passage. Never include actual student work or identifiable student records in this repository.

The public prototype is independently developed and is not affiliated with or endorsed by HLS, Memoria Press, Novare, College Board or Texas Instruments.

## Operating boundaries
The initial site is static, does not require a database or login, does not collect personally identifying student information, and makes no paid API calls. A simple completed-lesson list is saved only in the visitor’s browser, never sent to a server. Public Pages sites must not be used as the primary checkout or paid SaaS application; migrate commercial services to an appropriate platform when needed.

## Architecture
- `index.html` — accessible single-page entry
- `styles.css` — responsive design system
- `app.js` — navigation, diagrams, lesson interactions
- `curriculum/catalog.json` — canonical syllabus-aligned map of available/planned topics, AB/BC scope, 34 difficulty-focused submodule slots, prerequisites, course order, and resource links
- `content/submodules.json` — three available short visual challenges tied to primary chapter lessons
- `content/guided-practice.json` — three graduated student problems for every working lesson (60 total)
- `content/equations-physics.json` — 30 chapters of selected Physics equations with modeling assumptions
- `content/lessons.json` — only available original lessons, independent practice and conceptual questions with misconception-specific feedback
- `content/book-pathways.json` — independent publisher discussion catalog with authentic outbound grade/textbook links and explicitly illustrative topic associations
- `scripts/validate-book-portal.mjs` — grade, book, publisher source, and route HTML consistency checks
- `scripts/validate-curriculum.mjs` — guards against duplicated topics, broken prerequisites, conflicting unit assignments and unregistered resources
- `lab/motion.html` — browser-based position–time experiment and regression investigation
- `lab/regression.mjs` — separately tested least-squares numerical engine
- `scripts/test-regression.mjs` — independent mathematical model checks
- `docs/` — project standards, source provenance and development roadmap
- `materials/` — original printable student demonstration activities

## Next milestones
- Confirm repository rights and provenance before any import from HLS-Teaching.
- Review and refine the **sixteen-topic preview** (eleven Physics, five Calculus) for mathematical accuracy, accessibility and mobile interaction.
- Expand Physics Chapter 00 models and Chapter 01 mathematical measurement before further mechanics, and build Calculus derivative applications and BC sequences systematically; reserve topics and short challenges in the canonical map first.
- Continue adding original student printables and independently controlled private teacher solutions.
- Improve exercise verification beyond initial single-number answers; add worked solution and misconception checks.
- Test with students, parents and teachers, then assess curriculum licensing or publisher distribution.

See `docs/PROJECT_PLAN.md`, `docs/PUBLICATION_AND_RIGHTS.md`, `docs/HOSTING.md`, `docs/08_MOTION_LAB_TEACHING_AND_QA.md`, and `docs/09_FOCUSED_LESSON_AND_VISUAL_DESIGN_STANDARD.md`, `docs/10_CURRICULUM_ARCHITECTURE_AND_OWNERSHIP.md`, and `docs/11_DEVELOPMENT_BACKLOG.md`, and `docs/12_SYLLABUS_ALIGNMENT_AND_CHALLENGE_MODULES.md` and `docs/13_TEXTBOOK_ORDER_STUDY_GUIDED_PRACTICE_AND_EQUATIONS.md`.

© Original website prose and software are project development work; formal licensing and author ownership must be settled before commercial release.

## Chapter 1 production milestone (October 2026)

The first textbook chapter now includes **five complete interactive topic previews**, each with a separate definition/example page and three progressively scaffolded practice tasks. The shared `#equations/1` reference addresses simple measurement-uncertainty bounds, units, precision conventions and graph slopes. There is a new original printable student review under `materials/physics-toolkit-chapter1-notes.html`. See `docs/14_CHAPTER_01_FOUNDATIONS_BUILD.md` for editorial and mathematical caveats.
