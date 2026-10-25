# Chapter 1 — A Physics Toolkit: Production Review

**Updated:** October 24, 2026  
**Scope:** Five student-ready interactive topic previews, with original explanations and independent problems. Not a reproduction of Glencoe exercises or teacher assessments.

## Intended student journey

1. **SI Units and Prefixes** — a measurement combines a number and unit; scaling the numerical representation must not change the physical distance.
2. **Measurement and Uncertainty** — distinguish a ruler's resolution from a broader claim of accuracy; the ±half-division exercise is explicitly a model for a clear analog scale, not a universal error law.
3. **Meaningful Digits** — distinguish measured significant figures from gratuitous calculator digits; multiplication/division and addition/subtraction use different conventional reporting rules.
4. **Let the Units Guide You** — cancel units algebraically and check dimensional consistency without treating it as physical proof.
5. **What a Graph's Slope Means** — calculate `Δposition/Δtime` and carry the units, noticing that secant slopes on a curved graph can change with the interval.

These are the canonical topic IDs `si-units`, `scientific-measurement`, `significant-figures`, `dimensional-analysis`, and `graph-slope-physics`. They appear consecutively in the textbook-first student journey before Chapter 2.

## Teaching structure

Each topic follows the shared presentation:

- **Concept:** One interactive figure, a precise definition, then the tabs `The idea`, `Example`, `Think`, and `Try it`.
- **Study page:** `#study/{topicId}` displays the same canonical definition, a fully visible worked example, and one independent student task.
- **Guided practice:** `#guided/{topicId}` has Begin, Extend and Challenge tasks with correct numeric keys. Each student-requested thinking step appears **below** the previous steps.
- **Reference:** `#equations/1` identifies basic equations, uncertainty approximations, dimensional checks, and reporting rules. Any student can reach the course-wide `#equations` index.

Chapter 1 has one public original printable: `materials/physics-toolkit-chapter1-notes.html`. It is registered under `scientific-measurement` to avoid multiple independent asset inventories. Teachers can open the printable and use the browser's Print/Save as PDF feature. The page has intentionally blank student work areas and no published answer key.

## Intellectual and mathematical care

- Ruler graphics must show the same minor divisions as the chosen instrument-resolution setting. The half-division uncertainty is an illustrative **measurement reading model**, and actual uncertainty can involve calibration, technique, repeatability and bias.
- Significant-figure reporting is partly about **written notation**, not only numerical equality. The numeric answer checker cannot distinguish `7` from `7.0`; avoid using that ambiguity as a graded numerical response. Consider future text-format grading after explicit teacher review.
- For graphical slopes, the secant identifies **average**, not automatically instantaneous, velocity. Units must come from the plotted axes.
- Units cancelling does not establish the validity of a physical assumption, such as constant speed.
- No proprietary workbook problems, textbook drawings, private syllabus language or secure teacher keys were imported.

## Current validation

The repository's CI runs syntax checks, curriculum consistency, source-to-study agreement, guided numeric datasets, and visual math model assertions. Additional reviews still needed: desktop/mobile browser interaction and visual polish, screen-reader labeling, teacher proofreading, and testing with actual students.

## Next Chapter 1 additions

The roadmap retains *planned* topics for scientific notation, parallax, regression and explicit scientific modeling. They remain independent only insofar as they have a distinct teaching objective; any microchallenge should remain attached to its parent topic rather than creating duplicative full lessons.

Proceed to Chapters 2 and 3 only as Chapter 1's problem-solving practices become dependable. Continue maintaining central definitions and equation ownership rather than copying them across templates.
