# The Learning Atlas — Interactive Physics & Calculus

**Working title:** Interactive Academy  
**Status:** Early educational prototype; not a complete course and not yet a commercial product.

A mobile-friendly, concept-first resource bringing together short explanations, interactive mathematical and physical diagrams, step-by-step worked examples, guided practice and printable student notes and laboratories.

## Full-lesson evidence and accessibility iteration — October 25, 2026 · [PR #20](https://github.com/antmhernandez/Interactive-Academy/pull/20)

The latest **feature branch** deepens the actual full lessons beyond the compact publisher tour. Three representative complete student lessons—[position–time slope](https://antmhernandez.github.io/Interactive-Academy/#lesson/graph-slope-physics), [friction](https://antmhernandez.github.io/Interactive-Academy/#lesson/friction), and [conservation of energy](https://antmhernandez.github.io/Interactive-Academy/#lesson/energy-conservation)—now include an original **evidence workbench**: current numerical derivations with units, plain-language SVG descriptions, a recorded prediction and a connection revealed after model interaction. The graph receives explicit Δx/Δt marking and a labeled scale; the full energy ramp's visual triangle has been corrected from ~31.9° to ~35°, matching its fixed-angle physical model.

Keyboard range controls provide unit-bearing accessible values. Larger touch targets, readable mobile evidence blocks, and projector-scaled calculations strengthen the presentation. `scripts/test-lesson-evidence.mjs` proofs the graph secant, static/kinetic threshold and multi-position energy identity; the five-width Chromium browser suite now exercises the actual lesson workbench and recorded prediction, not just the tour. These are **automated tests**, not physical device, classroom or screen-reader validation.

**Presenter aid:** [7-minute step-by-step publisher presentation, numerical/design audit and specific classroom checklist](docs/26_FULL_LESSON_EVIDENCE_ACCESSIBILITY_2026-10-25.md). The prototype remains unapproved and unaffiliated with Memoria Press; no edition-specific mappings, protected art/text, publisher fonts or logos. The inventory stays **43 complete lessons, 129 graduated problems, 21 featured original investigations, 151 canonical concepts and 84 formula entries**, with the required Chapters 1–7, 9, 10–11 curriculum and optional enrichment unchanged.

**Release gate:** Review [PR #20 Actions](https://github.com/antmhernandez/Interactive-Academy/pull/20/checks) before merging. Afterwards independently check `main` validation and GitHub Pages deployment. See [portable next-conversation handoff](docs/NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-25.md).

## Publisher demonstration iteration — live evidence in three original mini-labs (October 25, 2026 · [PR #19](https://github.com/antmhernandez/Interactive-Academy/pull/19))

The [three-stop guided tour](https://antmhernandez.github.io/Interactive-Academy/#tour) now includes **live controls**, numerical evidence and explanatory connections for its existing graph-slope, friction and energy samples. Instead of seeing only a specimen illustration, the visitor answers a question, moves a control and sees the corresponding quantitative result; the conclusion is revealed after interaction. A link opens the full original lesson with cumulative worked steps, independent student work and three graduated practice questions. On returning to the tour, the last-selected stop is retained for the current page session.

The compact investigations live in `applets/tour-labs.js` and reuse the full lesson's `energyRampState` for energy bookkeeping. The contact-force sample explicitly uses a **release-from-rest threshold**, and the graph plots the actual function `x(t)=1+t²`. The small ramp is drawn to match its specified 35-degree angle. Responsive editorial design, keyboard-operated controls and a reduced-motion path support classroom presentation, subject to real-device and assistive technology review.

**Inventory remains unchanged:** 43 complete lessons, 129 graduated problems, 21 original Experiment Room investigations, 151 curriculum concepts across 22 units, and 84 original formula entries. Required chapter order, optional Chapter 8/Chapter 28 content and optional post-energy collision synthesis are unchanged. No publisher-owned materials, edition-specific mappings or endorsement are claimed. See [iteration #25 model and QA audit](docs/25_PUBLISHER_LIVE_MINI_LABS_2026-10-25.md) and [next-conversation handoff](docs/NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-25.md). Validate PR CI, `main` and Pages deployment before treating this release as published.

## Publisher presentation polish — Three-stop guided tour (October 25, 2026 · [merged PR #18](https://github.com/antmhernandez/Interactive-Academy/pull/18))

**Begin with the [curated publisher demonstration](https://antmhernandez.github.io/Interactive-Academy/#tour)** or read the [publisher overview](https://antmhernandez.github.io/Interactive-Academy/#showcase). The new route is a deliberately short teaching exhibition, not another list of capabilities: **(1) a changing graph slope, (2) the static-to-kinetic friction transition, and (3) energy conservation on a ramp**. Each sample introduces a question, a student manipulation, a scientifically accurate conclusion, and a direct working lesson link, with an explicit return path to the tour.

The lesson interface now foregrounds each topic's student prediction; explanations, cumulative worked steps, conceptual checks, and independent practice remain accessible underneath. Four representative lessons—graph slope, friction, energy conservation and a Calculus derivative—received a targeted language and mathematical-meaning proofread. A refreshed publisher overview, refined original editorial CSS, responsive specimen selection, accessible buttons, clearer answer feedback and corrected homepage/gallery labels aim to make the **independent** prototype more presentation-ready. It is **not** an authorized Memoria Press product, book companion or edition-specific map.

This pass changes **no course content counts, numeric answers, canonical lesson IDs or learning-path prerequisites**: there are still 43 complete lessons, 129 guided problems, 21 original featured experiments, 151 registry topics, and 84 original physics equation-reference entries. See the [presentation polish and QA audit](docs/24_PUBLISHER_SHOWCASE_POLISH_2026-10-25.md) and the [portable next-conversation prompt](docs/NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-25.md).

## Current verified release — Chapters 10–11 integrated (October 25, 2026 · [merged PR #17](https://github.com/antmhernandez/Interactive-Academy/pull/17))

This release carries the **required Physics sequence from Chapter 9 into seven sequenced Chapter 10–11 lessons**, while preserving Chapter 8 rotational motion as optional enrichment. The coherent student path is **Work Transfers Energy → Which Part of a Force Does Work? → Energy of Motion → How Quickly Is Work Done? → Why Simple Machines Help → Energy Stored by Height → Where Does the Energy Go?**. The existing original frictional-ramp energy lab now appears as part of the required course. New investigations examine signed work under a rotated force and the trade-off between input force, distance, useful output, efficiency and power.

After energy, students may separately visit [When Momentum Meets Energy](https://antmhernandez.github.io/Interactive-Academy/#lesson/collisions), a clearly **optional integrated review** of Chapter 9 momentum and Chapters 10–11 energy. The review carefully distinguishes conserved total momentum and total energy from changing *translational kinetic energy* in a sticking collision. It does not create a compulsory backwards jump in the lesson sequence.

**Current inventory: 43 complete lessons (38 Physics, five Calculus), 129 graduated problems, 21 original curated experiments, 151 curriculum concepts across 22 units, and 84 physics equation references covering 30 printed textbook chapters.** New source and teaching audit: [Chapter 10–11 energy integration](docs/23_ENERGY_CORE_AND_COLLISION_REVIEW_2026-10-25.md).

Older numbered sections below record historical development milestones and their counts *at those releases*, not the current site inventory. The publisher remains unconnected to or unaffiliated with the original demonstration.

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

The project now has **26 lessons and 78 graduated problems**; the original 84-equation reference index remains available. See [the investigation design and mathematical QA standard](docs/17_INTERACTIVE_INVESTIGATIONS_2026-10-25.md).

## Contact forces and inclined planes — October 25, 2026 · [merged PR #12](https://github.com/antmhernandez/Interactive-Academy/pull/12)

Two new original, classroom-oriented PhET-style investigations extend the existing **Chapter 5** force unit *before* Chapter 6:

- [When Does Friction Give Way?](https://antmhernandez.github.io/Interactive-Academy/#lesson/friction) — vary horizontal pull, crate mass, μₛ and μₖ to predict the transition between rest and sliding; see actual static friction, its maximum, kinetic friction and acceleration.
- [Forces on an Inclined Plane](https://antmhernandez.github.io/Interactive-Academy/#lesson/inclined-planes) — vary ramp angle, mass and friction coefficients to see how gravity resolves, whether static friction can hold, and how sliding begins.

Both have original diagrams and numerical physical models, a Predict–Manipulate–Connect inquiry, a worked example, a misconception-aware check and **three progressively scaffolded guided problems**. Each diagram states its ideal assumptions; the models represent release from rest and do not simulate later velocity-dependent behavior.

The site now has **12 curated Experiment Room applets, 26 complete lessons and 78 guided problems**. The new applet engines reside in the dedicated source file `applets/contact-forces.js`; the independent Physics sequence remains separate from publisher-specific Novare chapter claims. See [design/math audit](docs/18_CONTACT_FORCES_AND_INCLINES_2026-10-25.md).

## Chapters 10–11 energy laboratory · Optional later-chapter exploration (October 25, 2026 · [merged PR #13](https://github.com/antmhernandez/Interactive-Academy/pull/13))

An original [conservation of energy experiment](https://antmhernandez.github.io/Interactive-Academy/#lesson/energy-conservation) demonstrates **kinetic + gravitational potential + transferred thermal energy = constant total** as a block travels down a ramp. Students change mass, release height, initial speed, kinetic friction, or progress; they may scrub, step, play/pause a physically derived descent, compare with friction removed, and reset. Responsive energy bars and numeric work/energy readouts communicate the results. The simulator lives in dedicated `applets/energy-ramp.js`, using an independently derived ideal 35° ramp model.

A short optional **four-lesson pathway** keeps necessary concepts in order: [Work Transfers Energy](https://antmhernandez.github.io/Interactive-Academy/#lesson/work-energy) → [Energy of Motion](https://antmhernandez.github.io/Interactive-Academy/#lesson/kinetic-energy) → [Energy Stored by Height](https://antmhernandez.github.io/Interactive-Academy/#lesson/potential-energy) → [Where Does the Energy Go?](https://antmhernandez.github.io/Interactive-Academy/#lesson/energy-conservation). All four include original concept definitions, worked examples, conceptual-misconception checks, prediction prompts, independent answers, and three graduated guided problems each.

**Sequencing boundary:** Because this is an optional preview of **Glencoe-indexed Chapters 10–11**, the main textbook-first lesson chain still ends at Chapter 6; energy has a separate contextual sequence, not a premature Next Lesson link. The independent prototype does *not* claim Novare/Memoria Press edition alignment. Site inventory after this pass: **30 lessons (25 Physics, 5 Calculus), 90 guided problems, 13 featured applets**, with the existing 84-equation index unchanged. See [the energy model and pedagogy audit](docs/19_CONSERVATION_OF_ENERGY_LAB_2026-10-25.md).

## Chapter 7 Gravitation — New required Physics sequence (October 25, 2026 · [merged PR #14](https://github.com/antmhernandez/Interactive-Academy/pull/14))

The required course now continues beyond Chapter 6 into three original **Chapter 7: Gravitation** lessons:

- [Gravity Weakens with Distance](https://antmhernandez.github.io/Interactive-Academy/#lesson/universal-gravitation): Earth-mass multiple, test-body mass and center-to-center orbital radius; precise Newtonian `F=GMm/r²` and `g=GM/r²` readouts show the inverse-square law, test-mass cancellation, and real measurement units.
- [Falling Around a Planet](https://antmhernandez.github.io/Interactive-Academy/#lesson/orbital-motion): ideal circular orbital speed, period, gravitational acceleration, inward force, tangent-velocity arrow, phase step and slowed animation; `v=√(GM/r)` and `T=2π√(r³/GM)`.
- [Why Orbit Feels Weightless](https://antmhernandez.github.io/Interactive-Academy/#lesson/weightlessness): original free-fall concept explanation reusing the circular-orbit applet to distinguish nonzero gravitational force from zero ideal normal/support force.

Each has an original definition, three-step worked example, conceptual misconception check, Predict–Manipulate–Connect inquiry and three increasingly difficult numerical guided problems. Two original applets are in `applets/gravitation.js`. The regular Next Lesson path is now `relative-velocity → universal-gravitation → orbital-motion → weightlessness`, so **Chapter 7 follows Chapter 6**, while Chapters 10–11 energy and Chapter 28 atomic investigations remain optional previews. Other Chapter 7 topics (historical planetary models, Kepler's laws, cosmology) remain planned, not fabricated as complete.

This adds **33 total lessons (28 Physics, 5 Calculus), 99 guided problems and 15 Experiment Room models**. The independent Glencoe-indexed prototype chapter ordering remains separate from *illustrative*, unauthorized Novare/Memoria Press book connections. Full mathematics and test limitations: [Chapter 7 design audit](docs/20_GRAVITATION_CHAPTER_07_2026-10-25.md).

## Chapter 8 Rotational Motion — Optional textbook extension (October 25, 2026 · [merged PR #15](https://github.com/antmhernandez/Interactive-Academy/pull/15))

An original, deliberately **optional** [Chapter 8 rotational mechanics pathway](https://antmhernandez.github.io/Interactive-Academy/#lesson/torque-levers) introduces students to three new exploratory concepts without changing the present school-year syllabus or the regular Chapter 1–7 Next Lesson sequence:

- [How a Force Turns a Lever](https://antmhernandez.github.io/Interactive-Academy/#lesson/torque-levers): change force magnitude, location, and signed direction to investigate torque `τ=rF sinφ`; discover why a force along the arm produces zero turning effect and a perpendicular force maximizes it.
- [Why Some Wheels Resist Spinning](https://antmhernandez.github.io/Interactive-Academy/#lesson/rotational-inertia): compare ideal uniform solid disks `I=½mR²` and thin hoops `I=mR²` under identical applied net torque.
- [Torque Changes Rotation](https://antmhernandez.github.io/Interactive-Academy/#lesson/rotational-dynamics): investigate `τ_net=Iα`, `ω=αt`, `θ=½αt²` and `½Iω²=τθ` from rest, with mass, radius, shape, torque and time controls.

Two original interactive SVG models live in `applets/rotation.js`. The three linked lessons have independently authored definitions, graduated worked examples, misconception checks, optional inquiry and nine additional guided problems. Rotational Motion is registered as an `enrichment` unit and Chapter 8 retains `optional-extension` scope. The **required Physics course still concludes with Chapter 7 weightlessness**, while Chapters 10–11 energy and Chapter 28 atomic previews retain their status.

After this addition the prototype contains **36 complete lessons (31 Physics, five Calculus), 108 guided problems, and 17 Experiment Room applets**. Textbook mappings remain independent prototype examples, *not* Memoria Press or Novare edition-approved chapter claims. See [rotational mechanics and teaching audit](docs/21_ROTATIONAL_MOTION_CHAPTER_08_2026-10-25.md).

## Chapter 9 Momentum — Three required lessons and two interactive models (October 25, 2026 · [merged PR #16](https://github.com/antmhernandez/Interactive-Academy/pull/16))

The school-year Physics sequence now continues from Chapter 7 into **Chapter 9: Momentum and Its Conservation**, correctly skipping optional Chapter 8 enrichment in the *required* Next links.

- [A Force Acting over Time](https://antmhernandez.github.io/Interactive-Academy/#lesson/impulse): original force–time rectangle with signed impulse `J=FΔt=Δp`; adjust cart mass, force, interval and initial velocity; compare two force pulses with equal area.
- [When Two Carts Interact](https://antmhernandez.github.io/Interactive-Academy/#lesson/momentum-conservation): an ideal isolated two-cart collision that **hides results until students predict**; reveal the signed total momentum and velocities when two carts stick together, or compare a perfectly elastic rebound.
- [Momentum Has a Direction](https://antmhernandez.github.io/Interactive-Academy/#lesson/momentum-vectors): see how opposite one-dimensional momenta cancel while individual carts may remain in motion.

All three original lessons include clear definitions, worked steps, misconception-based reasoning questions, numerical student practice and three graduated challenges; the two new interactive models are implemented in `applets/momentum.js`. In the two-cart model the collision-energy figures are clearly labeled as **advanced context** for Chapters 10–11; the dedicated `collisions` lesson remains planned until its energy prerequisite is handled deliberately. The accepted core sequence ends at `momentum-vectors`, while Chapter 8 rotation, Chapters 10–11 energy and Chapter 28 atomic content remain opt-in previews.

**Current inventory: 39 complete lessons (34 Physics, five Calculus), 117 guided problems, 19 original featured applets and 84 chapter-equation entries.** The publisher concept remains unaffiliated and original; the Glencoe-indexed prototype is not a Memoria Press or Novare chapter/page crosswalk. See [the Chapter 9 mathematical and teaching audit](docs/22_MOMENTUM_CHAPTER_09_2026-10-25.md).

## Current teaching preview
Forty-three original demonstration lessons (thirty-eight Physics, five Calculus) now use a **visual-first page** with Back / Home / Next controls in a consistent position. Each topic opens with a large interactive diagram, one short focus cue, and four optional learning tabs: The idea, Example, Think, Try it. Forty-three misconception-aware checks, three focused mini-challenges and nine printable student resources are now available. Slider-driven diagrams and answer checking execute in the browser. Completion flags are saved locally in the visitor's device without an account. An independent Motion Data Laboratory now lets students enter observations, fit linear/quadratic models, inspect residuals, print and export a CSV without submitting data to a server. These are not yet an entire graded course.

## Course map and source boundaries

The site offers a dedicated **Course Map** page for each subject, listing available lessons and planned topics separately. There are currently **151 canonical topic slots** across 22 units; 43 are implemented, 108 remain planned. Future topic slots are not published lesson links. Every public resource has one primary topic owner, and CI verifies the dependency graph.

## Textbook progression and learning companions

Physics begins with **Chapter 1: A Physics Toolkit**, then proceeds through Chapters 2–7, required Chapter 9 and Chapters 10–11 (with Chapter 8 offered as an optional textbook extension), including original **two-dimensional velocity**, **projectile motion**, **circular motion**, and **river-crossing relative velocity** simulations in Chapter 6. Atomic spectroscopy remains an **optional Chapter 28 curiosity preview**, not the next main-course lesson. The complete textbook chapter index is arranged from 1 through 30, including those not yet developed as student lessons.

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
