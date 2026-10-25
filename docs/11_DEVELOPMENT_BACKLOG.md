# Development Backlog — Interactive Academy

This is a *working queue*, not an additional course catalog. The authoritative topic IDs, statuses, prerequisites, primary concepts and asset owners live in `curriculum/catalog.json`.

## Immediate next-build priorities (read from catalog)

| Priority | Canonical topic | Classroom connection |
|---|---|---|
| 1 | `atomic-models` | Chapter 00 opening: evidence and changing models, before the current spectral-line example |
| 2 | `significant-figures` | Chapter 01 measurement, tool precision, and numerical communication |
| 3 | `newtons-third-law` | Chapter 04 equal-and-opposite force pairs on different bodies |
| 4 | `power-rule` | Shared AB/BC differential calculus; visual symbolic reasoning |

Short-challenge modules are registered under their parent topic in `curriculum/catalog.json`. Develop them only when the misconception merits a separate visualization. Syllabus coverage details are described in `docs/12_SYLLABUS_ALIGNMENT_AND_CHALLENGE_MODULES.md`.

## Immediate quality work

- Conduct hands-on browser testing at 320px, ~390px and desktop widths. Check every slider, text label, color legend, concept check, Back/Home/Next link, printable view and focus order.
- Improve numerical answer checks for sign/unit mistakes and ensure examples represent the same physics as their applets.
- Move toward data-derived practice variants after preserving deterministic math checks.
- Review whether the current syllabus order (atomic evidence → mathematical toolkit → motion → forces → gravitation → momentum/energy) best serves HLS and independent learners. Record changes in the catalog *before* renumbering or duplicating lessons.
- Evaluate student usability: after one visual and a brief explanation, can a learner correctly predict a new case?

## Document and assessment organization

Each canonical concept can later have student notes, practice, optional laboratory, quiz, and teacher solution, **but those are assets of one topic**, not independent curriculum units. Source documents stay in private archives until authorship, school and publisher permissions are settled. Never deploy actual test keys or protected source material with GitHub Pages.

## Release gates

Every implementation requires: linked catalog entry, one clear visual, precise focus cue, correct worked example, independent problem, conceptual misconception feedback, registered student resources, successful CI, rights review and mobile inspection.

Update the `nextBuild` array in the curriculum catalog as priorities change. Do not maintain a contradictory live checklist of all 145 topics here.
