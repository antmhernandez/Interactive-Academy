# NEXT CHAT — Interactive Academy / The Learning Atlas
## Repeatable Publisher Demonstration & Curriculum Improvement Handoff
**Prepared:** October 25, 2026. **Repository:** https://github.com/antmhernandez/Interactive-Academy  
**Published site:** https://antmhernandez.github.io/Interactive-Academy/  
**Guided publisher tour:** https://antmhernandez.github.io/Interactive-Academy/#tour  
**Publisher overview:** https://antmhernandez.github.io/Interactive-Academy/#showcase  
**Authoritative branch:** `main`; never assume a historical feature branch is authoritative.  
**Last merged implementation:** [PR #18](https://github.com/antmhernandez/Interactive-Academy/pull/18), squash commit `f0668ea03f2bf2193f961a52a86970fed010a956`, successful [PR CI](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40256442547).  
**Latest dedicated audit:** `docs/24_PUBLISHER_SHOWCASE_POLISH_2026-10-25.md`.  
**Earlier comprehensive archive:** `docs/HANDOFF_2026-10-25_PUBLISHER_DEMO.md`; it contains dated historical milestones and may be very long.

## Copy/paste the following prompt into a new ChatGPT conversation

> Please continue the production and iterative improvement of **The Learning Atlas / Interactive Academy**, our independent, original Physics and Calculus instructional web prototype, as an attractive, pedagogically rigorous demonstration for discussion with my employer, **Memoria Press**.
>
> **Read the live GitHub repository first:** https://github.com/antmhernandez/Interactive-Academy, branch `main`, including `README.md`, `docs/24_PUBLISHER_SHOWCASE_POLISH_2026-10-25.md`, `docs/HANDOFF_2026-10-25_PUBLISHER_DEMO.md`, `curriculum/catalog.json`, `content/lessons.json`, `content/guided-practice.json`, `content/book-pathways.json`, `app.js`, `styles.css`, `index.html`, the `applets/` modules, `scripts/` validation suites and `.github/workflows/validate.yml`. Check recent merged PRs and GitHub Actions runs; do not trust old counts over the live files.
>
> **Where the last pass ended:** We created a dedicated `#tour` route with three carefully curated live demonstrations (graph slope, friction, and conservation of energy), updated the publisher `#showcase` page, designed original restrained navy/burgundy/parchment/gold specimen surfaces, clarified the homepage and Experiment Room labels, foregrounded students' predictions within lesson pages, improved numeric answer feedback, and edited four sample lessons (graph slope, friction, energy conservation, Calculus tangent). All examples link to functioning original lessons. Read the relevant audit for exact implemented details and the final PR/CI results.
>
> **Our governing instructional vision:** Walk through the real chapter progression of the Physics textbook rather than jumping ahead to flashy late-chapter models. Each concept should offer a **brief, accurate definition**, one carefully developed worked example with **cumulative solution steps**, a separate student problem, a misconception-aware **Think** check, and Begin/Extend/Challenge numerical practice. Favor the visual investigation: **Predict → Manipulate → Connect**. Use scientific units, sign conventions, clear diagram keys and honest model limitations; make the student do the reasoning rather than replacing it with an AI solution.
>
> **Current curriculum boundaries:** Required Physics follows the independent Glencoe-indexed sequence through Chapters 1–7, then Chapter 9 and Chapters 10–11. Chapter 8 rotation remains optional school-year enrichment. The cross-chapter elastic/inelastic collision lesson is an optional **post-energy** synthesis even though its topic belongs to Chapter 9. Chapter 28 atomic spectroscopy is optional curiosity. Never promote content or add required-next links without reviewing syllabus, prerequisites and canonical registration. Canonical IDs/ownership come from `curriculum/catalog.json`; complete student pages must match it and the guided-practice registry exactly. Preserve textbook order.
>
> **The publisher boundary is essential:** Memoria Press has not endorsed, commissioned or authorized this project. Avoid importing protected textbook prose, diagrams, art, covers, branded fonts, teacher-only assessments or publisher logos. Grade/book connections from `content/book-pathways.json` are **illustrative concept associations**, not validated edition, chapter, page, or assignment crosswalks. Actual edition-specific mapping requires source verification and publisher approval. All diagrams and exercises should remain independently authored. Do not equate the Glencoe-index chapter progression to Novare/Memoria Press books.
>
> **Priorities for the next iteration:** Begin with a thoughtful visual/editorial/functional critique of the **published three-stop tour** (`#tour`), homepage (`#home`), publisher overview (`#showcase`), actual featured lessons and Experiment Room (`#applets`). Improve aesthetic coherence and visual precision, diagram and slider legibility, phone and classroom projector usability, navigation, accessible labels, short student-facing language, mathematical correctness, and helpful prompts. Consider a real classroom-style usability test checklist and concrete scripted MP demo. Fix any stale counts or misleading text. Prefer polishing a few representative experiences deeply before increasing topic quantity. If producing new content, choose it according to the actual lesson prerequisites and curriculum map and give it complete worked examples and practice—not placeholder pages.
>
> **How to implement:** Use the connected GitHub tools to inspect the current repository, create a descriptive short-lived feature branch, make substantive working changes to the site and/or lessons, and add regression/browser tests for changed behavior. Run the existing `scripts/validate.mjs`, `scripts/validate-learning-resources.mjs`, `scripts/validate-curriculum.mjs`, scientific applet regressions, and Chromium test suite through GitHub Actions across 320, 375, 768, 1024 and 1440 px. Do not merge until the PR CI passes; after merging, independently verify the current `main` validation and successful GitHub Pages deployment. Review physical iOS/Android, Safari, NVDA/VoiceOver and actual projector use **separately**—automated Chromium alone is not a certificate of accessibility.
>
> **Before ending:** Update the README's current inventory and release note, publish a concise new mathematical/editorial/design audit, and append a clear current-status note or link from the comprehensive handoff. Give me the live demo route, a summary of actual improvements, exact GitHub PR/commit/CI references, honest outstanding review issues, and a **new portable handoff prompt** for yet another conversation. Keep source code readable and maintainable; avoid parallel versions of the live site. Use `main` as the single source of truth.
>
> Please **implement and test the next improvement pass**, not merely suggest possibilities. Use good judgment and maintain a professional, academically serious, visually beautiful site suitable for a first discussion with MP.

## Engineering map for resuming quickly

- `index.html` — original static site shell, responsive navigation and script inclusion order.
- `app.js` — router `route()`, `home()`, `showcase()`, `demoTour()`, `appletsHome()`, `lesson(l)`, study/practice pages, textbook-aware routes and presenter mode.
- `styles.css` — original classical-inspired editorial identity plus specimen/tour, applet and phone/projector styles. Preserve focus outlines and the reduced-motion branch.
- `content/lessons.json`, `content/guided-practice.json`, `curriculum/catalog.json`, `content/equations-physics.json`, `content/book-pathways.json` — canonical synchronized data with existing course integrity tests.
- `applets/` — standalone original JavaScript/SVG teaching models; numerical state functions should be independently testable, and SVG drawing may be schematic so physics units/readouts must control conclusions.
- `scripts/validate.mjs`, `scripts/validate-learning-resources.mjs`, `scripts/validate-curriculum.mjs`, `scripts/test-browser.mjs`, applet-specific suites, `.github/workflows/validate.yml` — acceptance and responsive browser tests.
- `docs/24_PUBLISHER_SHOWCASE_POLISH_2026-10-25.md` — current curated demo design and known limitations; `docs/23_ENERGY_CORE_AND_COLLISION_REVIEW_2026-10-25.md` — previous core curriculum mathematics; `docs/HANDOFF_2026-10-25_PUBLISHER_DEMO.md` — dated historical backlog.

## Concrete next acceptance criteria

Confirm a reviewer unfamiliar with the site can find `#tour` immediately, identify each of the three original examples, change the suggested controls, understand what is being measured, get to the worked example and guided practice, navigate back to the tour, and distinguish proposed publisher integrations from approved mappings. Test on narrow phones, keyboard and presenter mode; no horizontal overflow, hidden answer controls, orphan links, contradictory text, or uncaught browser errors. Maintain accessible contrast and avoid decorative complexity that obscures Physics content.
