# Presentation Polish — The Learning Atlas Publisher Specimens

**Date:** October 25, 2026  
**Source:** `main` after [publisher-polish PR](https://github.com/antmhernandez/Interactive-Academy/pulls) merges.  
**Demo route:** https://antmhernandez.github.io/Interactive-Academy/#tour  
**Publisher overview:** https://antmhernandez.github.io/Interactive-Academy/#showcase

## Intent and design boundary

The user requests a polished, elegant, credible **test collection for a Memoria Press discussion**, not bulk content generation. The Learning Atlas remains an **independent original concept**, using navy, restrained burgundy and muted gold on warm white. No Memoria Press logo, copyrighted textbook passages, proprietary illustrations, book covers, protected assignments or endorsed chapter crosswalks were added. Catalog grade and textbook pathways are explicitly **illustrative**, not publisher-approved page, chapter, edition or assignment correlations.

## Discoverability and curated presentation

A new `#tour` route offers a compact three-stop demonstration that takes approximately 5–8 minutes to present, with an accessible three-option selector, Prev/Next buttons, large editorial illustration, essential question, a concrete control to manipulate, an observation to discuss, and a link to the **actual existing working student lesson**. The stops are:

1. `graph-slope-physics` — change the secant endpoints; distinguish position and position–time slope with units of m/s.
2. `friction` — increase the applied pull; witness the changing regime from responsive static friction to kinetic sliding friction.
3. `energy-conservation` — scrub the 35° ramp; compare friction and no friction, preserving kinetic + gravitational potential + thermal total.

The sample lessons have a context-specific `#tour` return link when opened from the guided tour. Other views retain their normal navigation; the presenter need not navigate through all 43 lessons to convey the central pedagogical method. The `#showcase` overview now explains See → Reason → Apply, includes explicit review limitations, and prominently links to the short tour. A link in the main navigation and homepage makes the tour easy to find.

## Language and student experience

Four publisher specimens were edited for compact and precise Physics/Calculus concepts, with no changes to numeric keys or exercise outcomes: `graph-slope-physics`, `friction`, `energy-conservation`, `tangent-line`. Stronger graph interpretation language explicitly distinguishes graph height and secant slope; force copy distinguishes actual static friction from its threshold; the energy problem avoids implying that friction always reduces **absolute** speed (instead it reduces final speed compared to an otherwise frictionless descent); the derivative lesson makes the secant-limit method clear.

Every lesson that already includes a Predict–Manipulate–Connect inquiry now displays the prediction **before** students change the model. The full inquiry remains available below as an optional expandable guide. Numerical feedback includes the relevant unit for a correct response and gives clear, nonjudgmental next action after an incorrect response.

## Art direction and screen-scale usability

Original CSS creates a publisher-style editorial cover, specimen selector with clear selected state, restrained diagram previews, readable task and observation sections, and clear small-screen stack. All illustrations are independently drawn SVG/CSS. No downloaded visual or branded proprietary asset is embedded. Mobile has horizontally scrollable labeled sample choices rather than overfull three-column tiles; the showcase method stacks. Existing focus outlines and reduced-motion rules remain active, and tour selectors use labeled semantic buttons with `aria-pressed` states. Prototype projector mode inside lessons remains available.

## Frozen content inventory

43 complete lessons (38 Physics, 5 Calculus), 129 graduated numerical guided problems, 21 featured original interactive investigations (18 Physics, 3 Calculus), 151 canonical curriculum concepts across 22 units, and 84 original chapter-equation-reference entries. The actual required main course progresses through Physics Chapter 9 and Chapters 10–11; Chapter 8 rotation, the post-energy Chapter 9 collision review, and Chapter 28 atom curiosity stay optional. No lesson IDs, numeric answers, publisher-book references or curricular prerequisites changed in this pass.

## Acceptance and remaining work

Automated `scripts/validate.mjs` checks demo routing, discoverability, original lesson hypothesis styling. `scripts/test-browser.mjs` adds end-to-end tour checks at **320, 375, 768, 1024, 1440px**: exactly three samples, switch by Next or direct selection, selection state, previous/next limits, no overflow, open an actual lesson, validate its prediction and return link, and verify publisher overview. The existing browser suite continues to verify textbooks, original study context, keyboard-accessible tabs, cumulative solved steps, in-lesson projector mode, guided practice and all physics applets. The user can inspect Actions run URLs and PR for proof of success.

**Not tested in person:** Android/iPhone Safari, VoiceOver/NVDA, touch ergonomics, brightness on a real projector, student comprehension, real editorial review, rights counsel. Automated Chromium does **not** certify accessibility, effectiveness or commercial readiness. These make sensible priorities for the next phase.

## Next iteration direction

Prioritize depth over counts. Make the three specimen applets more visually self-explanatory where a classroom test shows a real problem; refine labels, diagrams, keyboard/accessibility, touch targets and worked-example pedagogy. Test one real adopted textbook edition before asserting any publisher mapping. Then expand content only when approved and conceptually appropriate. Follow the separate [portable next-chat prompt](NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-25.md).
