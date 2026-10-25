# Textbook Progression, Definition Pages, Guided Practice and Equation References

**Date:** October 24, 2026  
**Course:** Physics: Principles and Problems (Glencoe / McGraw-Hill; the edition used in HLS Physics)

## Teaching order

The **student learning path begins in Chapter 1**, not with an out-of-sequence atom/Chapter 28 unit. The website follows the *printed textbook chapter numbers* in ascending order. It is permissible to interest students with historical atomic observations at the start of the year, but quantitative spectroscopy and energy-level models need later prerequisites. The Chapter 28 demonstration may remain an **optional curiosity preview** linked from the Physics catalog; it must not be the first required lesson or the automatic Next step after early mechanics.

The canonical chapter titles, their 1–30 order, school-core vs additional status, and topic ownership are in `curriculum/catalog.json` under `textbook.chapters`. This document does not reproduce proprietary lesson text or textbook exercises. Chapters without authored topics still appear in the reference index so planning remains coherent; they must not masquerade as implemented student lessons.

**Currently implemented Physics path:** SI units (Chapter 1) → representation of motion (Chapter 2) → accelerated motion (Chapter 3) → free-body diagrams and Newton's law (Chapter 4) → vector components (Chapter 5). Chapter 28 is separate until the intervening book develops.

## One concept, three connected student experiences

### Interactive concept page: `#lesson/{id}`

Preserve the four familiar activities **The idea · Example · Think · Try it**, with one prominent interactive visualization. Start The idea with the canonical short definition (`lesson.definition`). The Example tab reveals a solution one step at a time; each new step is added **below the previous steps**, and the previous work stays visible. Previous and Start over are still available. Put access to study, guided practice and the relevant equation chapter **at the bottom** so they do not compete with the visualization.

### Definition and first worked example: `#study/{id}`

A clean, single-purpose page contains, in sequence:

1. One precise definition sourced from the existing lesson's `definition`.
2. One fully worked provided example using the existing `lesson.example` question and steps.
3. One independent student example using the existing `lesson.practice` question, numeric answer and hints.

Do not copy these into an additional source file. The study page is a **view of the canonical lesson**, so changing an example in the lesson automatically changes it on the study page. Do not expose teacher-only material.

### Graduated reasoning: `#guided/{id}`

A separate quiet page presents three levels **Begin → Extend → Challenge**, one problem at a time. Each level has a student-answer check plus optional reasoning steps. Revealing a second or third step **appends it below** the previous steps. It never overwrites the earlier explanation, preserving the train of thought. The student can try the problem without using hints, show a thinking step, hide the steps, or choose a different difficulty.

The source is `content/guided-practice.json`: one set per implemented topic, with the first level aligned to its existing independent problem and two separately authored, more demanding applications. Each problem's fields are `level`, `prompt`, `answer`, `tolerance`, `unit` and `steps`. The website provides deterministic numeric checks; there is **no AI evaluation, telemetry or account requirement**.

**Editorial caution:** It is better to ask fewer mathematically meaningful questions than to create multiple superficial changes of numbers. The third level should require a genuine decision about direction, units, model assumptions, multiple segments, or changed representations. Check answers and tolerances by independent calculation. Store a numeric answer solely for checking; the original explanation belongs in `steps`.

## Physics equation library

The comprehensive navigation index `#equations` lists **all 30 printed textbook chapters** in their correct sequence. Each `#equations/{chapterNumber}` opens a chapter-specific reference with selected key equations and a note on their domain of applicability.

Canonical data: `content/equations-physics.json`. Each chapter stores `number`, `title`, `scope`, `note`, and individual equation `name`, `formula`, `conditions` entries. Definitions and assumptions prevent common mistakes (for example, `N = mg` is not universally valid and `f_s = μ_sN` is not universally valid).

The current edition is an **original reference preview** containing representative relations for 30 chapters, not a guarantee of every equation printed in the publisher's book. Future instructor reviews should add or clarify equations under the proper chapter, without replicating publisher-designed formula sheets or copyrighted explanatory language. Topics may link to their chapter, but must not carry independent, contradictory copies of its formula entries.

## Source-of-truth rules

- **`curriculum/catalog.json`** owns textbook chapter order, major units and topic prerequisites/status.
- **`content/lessons.json`** owns the original definition, primary example, first student practice, visualization and its main learning route.
- **`content/guided-practice.json`** owns the progressively harder problems and their optional reasoning steps.
- **`content/equations-physics.json`** owns the centralized Physics equation reference.
- **`app.js`** renders views and manages navigation, cumulative steps, and student answer checking; it is not a second curriculum data source.

The scripts `validate.mjs`, `validate-curriculum.mjs`, and `validate-learning-resources.mjs` check these agreements in CI. All resource pages use simple same-site hash routes and static data, suitable for GitHub Pages.

## Editorial and release checks

- [ ] Chapter progression follows the Glencoe table of contents; preview topics do not skip prerequisites.
- [ ] Every published lesson has a concise, mathematically precise definition.
- [ ] The provided example and student exercise use matching definitions and units.
- [ ] Three guided problems increase in meaningful difficulty; full solutions and tolerances are checked independently.
- [ ] Steps remain visible as new reasoning is revealed.
- [ ] Equations state assumptions and distinguish signed/vector quantities from magnitudes.
- [ ] All 30 chapter entries appear in the Physics equation index; no links point to unpublished pages.
- [ ] All text and diagrams are original; no HLS assessment keys or unlicensed textbook content enter the public repository.
- [ ] CI passes and browser/mobile keyboard, touch, overflow and reading-order checks are completed.
