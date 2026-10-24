# The Learning Atlas — Interactive Physics & Calculus

**Working title:** Interactive Academy  
**Status:** Early educational prototype; not a complete course and not yet a commercial product.

A mobile-friendly, concept-first resource bringing together short explanations, interactive mathematical and physical diagrams, step-by-step worked examples, guided practice and printable student notes and laboratories.

## Current teaching preview
Nine original demonstration lessons (six Physics, three Calculus) now use a **visual-first page** with Back / Home / Next controls in a consistent position. Each topic opens with a large interactive diagram, one short focus cue, and four optional learning tabs: The idea, Example, Think, Try it. Nine misconception-aware checks and six printable student resources remain available. Slider-driven diagrams and answer checking execute in the browser. Completion flags are saved locally in the visitor's device without an account. An independent Motion Data Laboratory now lets students enter observations, fit linear/quadratic models, inspect residuals, print and export a CSV without submitting data to a server. These are not yet an entire graded course.

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
- `content/lessons.json` — original lessons, independent practice and conceptual questions with misconception-specific feedback
- `lab/motion.html` — browser-based position–time experiment and regression investigation
- `lab/regression.mjs` — separately tested least-squares numerical engine
- `scripts/test-regression.mjs` — independent mathematical model checks
- `docs/` — project standards, source provenance and development roadmap
- `materials/` — original printable student demonstration activities

## Next milestones
- Confirm repository rights and provenance before any import from HLS-Teaching.
- Review and refine the **nine-topic pilot** (six Physics, three Calculus) for mathematical accuracy, accessibility and mobile interaction.
- Extend the coordinated motion illustrations into a fuller mechanics unit with separate independent labs.
- Continue adding original student printables and independently controlled private teacher solutions.
- Improve exercise verification beyond initial single-number answers; add worked solution and misconception checks.
- Test with students, parents and teachers, then assess curriculum licensing or publisher distribution.

See `docs/PROJECT_PLAN.md`, `docs/PUBLICATION_AND_RIGHTS.md`, `docs/HOSTING.md`, `docs/08_MOTION_LAB_TEACHING_AND_QA.md`, and `docs/09_FOCUSED_LESSON_AND_VISUAL_DESIGN_STANDARD.md`.

© Original website prose and software are project development work; formal licensing and author ownership must be settled before commercial release.
