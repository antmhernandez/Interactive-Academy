# Interactive Academy — project plan

## Vision
Create a coherent, mobile-first, topic-organized tutoring resource for Physics and Calculus. Teach each concept visually and precisely. Provide original animations, readable explanations, graduated worked examples, independent checks, and printable guided notes, laboratory activities and reviews. Plan for homeschool students, independent learners, teachers, and small schools.

## Teaching sequence
**Observe → Understand → Explore → Follow a Worked Example → Try Independently → Review.**
The model or diagram must teach something, not merely entertain. Build the concept before expecting the student to use formulas. Physics connects observation, units, physical systems, vectors and experimental evidence. Calculus connects symbolic, numerical, graphical and verbal representations.

## First pilot — now nine linked demonstration lessons
### Physics: Motion and its representation
1. **Distance is not displacement** — number line and two-leg journey.
2. **How can dots describe motion?** — constant speed, speeding up and slowing down.
3. **Read velocity from a graph** — moving secant across a position-time curve.
4. **When velocity changes** — change in velocity and signed acceleration.
5. **Why does a falling object speed up?** — before-impact free-fall comparison under Earth and Moon gravity.
6. **Three graphs tell one story** — synchronized position, velocity and acceleration.

### Calculus: Understanding change
1. **The derivative is a changing slope** — secant approaches tangent.
2. **Area under velocity measures a journey** — signed accumulation introduced through a positive-velocity model.
3. **How rectangles discover area** — Riemann sums and convergence.

**Status:** source and preliminary interactives built; needs full independent browser/phone evaluation, subject-expert review and test users. These topics are a beginning, not a complete Physics or Calculus course. Printable examples include motion diagrams, linked motion graphs, two practical observation/data labs, and derivative/integral guided notes.

**Next:** improve explanatory animation, add diagrams with properly estimated measurement uncertainty, develop the remaining Mechanics subjects, and pair student notes with tightly controlled teacher editions.

### Motion Data Laboratory — new pilot
A standalone, mobile-responsive scientific laboratory now allows students to type or paste position-time observations, choose linear or quadratic models, inspect position and residual graphs, interpret physical coefficients, print a report and download CSV data. Each topic has an original conceptual reasoning check with misconception-specific feedback. Regression calculations use a standalone tested module. The laboratory does not claim to infer the physical model merely from a high R².

## Student deliverables
Each lesson has a focused main question, brief essential explanation, original figure or simulation, one exemplary worked problem, independently checked practice, and printable student pages when useful. Teacher editions are separately approved, controlled and never published by accident.

## Editorial acceptance
- Every mathematical claim and result is independently verified.
- Model assumptions and units are explicit and physically sensible.
- Historically significant statements are checked against credible references.
- Each diagram's axes, data, color-coding and accessibility text are correct.
- Practice and hints build independent skill rather than reveal answers prematurely.
- Notes and quizzes agree in scope and difficulty; multiple-choice answers are defensible.
- All student-facing text is natural, concise and intellectually serious.
- Mobile layout works at 320–430 px, desktop at standard widths, with keyboard operation.
- Nothing is published without rights approval and a final human review.

## Growth milestones
**Stage 1:** Working static pilot; browser-only animations; no student data.
**Stage 2:** Develop guided notes and laboratory samples into polished classroom packets, beginning with the new motion model investigation report; establish a teacher-review workflow.
**Stage 3:** Complete Mechanics unit, then broader Physics and Calculus maps.
**Stage 4:** After validating demand and permissions, trial a publisher or direct-sales partnership and suitable commercial hosting.
**Stage 5:** Add secure student accounts, diagnostic progress, adaptive practice and optional image-analysis tutoring only after privacy and server-side authorization are properly designed.

The project must remain useful without AI runtime calls. Do not automatically publish model-generated lessons, scrape textbook contents, or put private student work in the repo.

## Visual clarity pass (2026-10-24)
All lesson pages now begin with consistent Back / Home / Next controls, a large title and brief subtitle, one dominant interactive figure, a small diagram color key, and a precise “Notice” cue. The idea, example, conceptual check and independent practice are separate tab panels rather than a vertical sequence of crowded boxes. The Motion Data Laboratory places its graph and physical coefficient interpretation first, with data entry and fit diagnostics expandable below. The design standard is `docs/09_FOCUSED_LESSON_AND_VISUAL_DESIGN_STANDARD.md`.

**Review boundary:** Automated source tests are necessary but not a substitute for visual checks on desktop and mobile or a subject expert proofreading the mathematics and labeling.

## Additional implementation (2026-10-24)

Beyond the nine original demonstration lessons, the site now includes three concept-distinct force lessons (vector components, external forces/free-body diagrams, and net force/mass/acceleration) and a visual limit lesson. The available preview totals 13 interactive lessons, with eight registered printable student resources and one interactive motion lab. A canonical curriculum registry reserves 79 topics across Physics and Calculus, showing planned topics separately from live lessons. Unique primary concept ownership, prerequisite validation, resource ownership and unit consistency prevent drift and duplicative development. The governing rules are `docs/10_CURRICULUM_ARCHITECTURE_AND_OWNERSHIP.md`.

**Scope note:** Reserved catalog entries are not completed courses or commitments to cover every textbook chapter. All existing previews require teaching/editorial and mobile QA before use in high-stakes instruction.

## Syllabus-aligned expansion (October 24, 2026)

The current registry contains **145 planned concept slots across 20 units**, with 15 available lessons, plus 34 chapter-owned challenge modules (three available). High-level Physics chapter order now opens with atomic evidence, models and spectroscopy (Ch. 00), then measurement and graphing (Ch. 01), followed by motion, Newton's laws, two-dimensional motion, gravitation, momentum/energy, waves/sound, optics and electricity/circuits. Additional courses remain clearly marked as enrichment. The Calculus library shares AB/BC fundamentals while marking extra BC content separately, including parametric/polar/vector work and infinite series.

This dated section supersedes previous pilot count snapshots above. The live topic counts and status remain authoritative only in `curriculum/catalog.json` and `content/lessons.json`. See `docs/12_SYLLABUS_ALIGNMENT_AND_CHALLENGE_MODULES.md` for source comparison and difficult-concept priorities. All diagrams and numerical examples remain subject to teacher review and mobile testing.
