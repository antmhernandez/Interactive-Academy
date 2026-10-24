# Development Backlog — Interactive Academy

This is a *working queue*, not an additional course catalog. The authoritative topic IDs, statuses, prerequisites, primary concepts and asset owners live in `curriculum/catalog.json`.

## Next high-value additions

| Suggested sequence | Canonical topic | Why next | Readiness condition |
|---|---|---|---|
| 1 | `friction` (Physics) | Builds on force components and Newton's second law with realistic contact forces | Review force diagrams and distinguish static/kinetic models clearly |
| 2 | `one-sided-limits` (Calculus) | Follows the new limits applet; reveals when two-sided limits fail | Verify left/right numerical and graphical views |
| 3 | `power-rule` (Calculus) | Turns the derivative idea into a usable symbolic calculation | Link algebraic steps to tangent graph and independent problems |
| 4 | `work-energy` (Physics) | Transitions from forces to energy without duplicating Newton's laws | Introduce work as force along displacement with correct units |

## Immediate quality work

- Conduct hands-on browser testing at 320px, ~390px and desktop widths. Check every slider, text label, color legend, concept check, Back/Home/Next link, printable view and focus order.
- Improve numerical answer checks for sign/unit mistakes and ensure examples represent the same physics as their applets.
- Move toward data-derived practice variants after preserving deterministic math checks.
- Review whether the current topic order (motion → forces → energy) best serves HLS and independent learners. Record changes in the catalog *before* renumbering or duplicating lessons.
- Evaluate student usability: after one visual and a brief explanation, can a learner correctly predict a new case?

## Document and assessment organization

Each canonical concept can later have student notes, practice, optional laboratory, quiz, and teacher solution, **but those are assets of one topic**, not independent curriculum units. Source documents stay in private archives until authorship, school and publisher permissions are settled. Never deploy actual test keys or protected source material with GitHub Pages.

## Release gates

Every implementation requires: linked catalog entry, one clear visual, precise focus cue, correct worked example, independent problem, conceptual misconception feedback, registered student resources, successful CI, rights review and mobile inspection.

Update the `nextBuild` array in the curriculum catalog as priorities change. Do not maintain a contradictory live checklist of all 79 topics here.
