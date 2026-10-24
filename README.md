# The Learning Atlas — Interactive Physics & Calculus

**Working title:** Interactive Academy  
**Status:** Early educational prototype; not a complete course and not yet a commercial product.

A mobile-friendly, concept-first resource bringing together short explanations, interactive mathematical and physical diagrams, step-by-step worked examples, graded practice and future printable guided notes and laboratories.

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
The initial site is static, does not require a database or login, does not collect student information, and makes no paid API calls. Public Pages sites must not be used as the primary checkout or paid SaaS application; migrate commercial services to an appropriate platform when needed.

## Architecture
- `index.html` — accessible single-page entry
- `styles.css` — responsive design system
- `app.js` — navigation, diagrams, lesson interactions
- `content/lessons.json` — structured original lesson text and examples
- `docs/` — project standards, source provenance and development roadmap
- `materials/` — original printable student demonstration activities

## Next milestones
- Confirm repository rights and provenance before any import from HLS-Teaching.
- Complete a six-lesson Mechanics & Motion pilot and three Calculus lessons.
- Add synchronized position–velocity–acceleration plots and robust, independent answer checks.
- Create accessible original diagrams, student/teacher publishing modes, and downloadable samples.
- Test with students, parents and teachers, then assess curriculum licensing or publisher distribution.

See `docs/PROJECT_PLAN.md`, `docs/PUBLICATION_AND_RIGHTS.md`, and `docs/HOSTING.md`.

© Original website prose and software are project development work; formal licensing and author ownership must be settled before commercial release.
