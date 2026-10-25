# Editorial interface and Chapter 6 — implementation & teaching review

**Date:** October 25, 2026  
**Project:** The Learning Atlas / Interactive Academy  
**Status:** Original demonstration features and two Chapter 6 lessons, intended for publisher conversation. Not a publisher-authorized alignment.

## Design and usability intent

The independent interface prioritizes a readable mathematical figure, thoughtful whitespace, short explanatory copy, and clear movement from a printed text *toward* original demonstrations and back again. The updated homepage uses a genuinely original SVG figure (no supplied publisher art), an unmistakable **four-step teaching method**, and course cards. The book portal is searchable and still labeled as illustrative; a visible example start link does not assign a publisher chapter.

A private learning desk computes a simple next-incomplete topic link from existing local completion marks; it never sends analytics or progress to a cloud account. The course header shows an accessible ARIA progress bar. The lesson heading displays its defining question without adding a fifth tab. The existing presentation mode and cumulative step reveal remain unchanged.

## Original Chapter 6 conceptual lessons

### Motion in Two Dimensions (`two-dimensional-motion`)

- **Physical quantity:** signed velocity components from speed and angle measured counterclockwise from +x.
- **Equations:** `vx = v cos θ`, `vy = v sin θ`. Axes and direction matter. The SVG is recalculated from slider values and illustrates a single resultant vector with two perpendicular projections.
- **Worked example:** 12 m/s at 30° yields approximately (10.39, 6.00) m/s.
- **Independent answer:** 20 m/s at 30° has vertical component 10 m/s.
- **Guided progression:** vertical component → horizontal component → magnitude from perpendicular components (5–12–13).
- **Misconception:** retaining the angle while doubling speed doubles both components; an unchanged angle is not an unchanged component.

### The Path of a Projectile (`projectile-motion`)

- **Model domain:** two-dimensional classical mechanics, level launch and landing point, no air resistance, locally uniform `g = 9.8 m/s²`; zero initial height is an *origin choice*.
- **Equations:** `x(t) = v0 cos θ · t`, `y(t) = v0 sin θ · t − 0.5gt²`, `T = 2v0 sin θ /g`, `R = v0² sin(2θ)/g`, `H = (v0 sin θ)²/(2g)`.
- **Simulation:** 49 physically derived trajectory points plotted at a fixed spatial scale with highest point, landing point, flight time, range and peak height. Sliders are launch speed and angle. The parabola is not stock artwork.
- **Worked example:** 20 m/s at 30° returns to launch height after about 2.04 s; horizontal range about 35.35 m.
- **Independent answer:** 14 m/s at 30° returns to launch height after about 1.43 s.
- **Guided progression:** duration → level-ground range → maximum height from vertical energy/kinematics.
- **Misconception:** at the peak, vertical velocity equals zero but horizontal velocity persists and downward gravitational acceleration is still nonzero.

The progression is intentional: students first resolve a velocity vector, then see why constant horizontal velocity and accelerating vertical velocity combine into a trajectory. Circular motion, relative velocity and other later lessons remain planned.

## Test matrix and acceptance boundary

- JavaScript syntax; unique lesson IDs, complete checkpoint/answer data, linked prerequisite/next chain; exact source-registry ownership and Chapter 6 lesson-to-topic consistency.
- Two new 3-problem guided sets; numerical expected component results, level-ground flight/range checks and slider redraws in `scripts/test-interactives.mjs`.
- Chromium responsive smoke suite at **320, 375, 768, 1024, 1440 px**, covering illustrative book journey, classroom mode, all four tabs, accumulation, homepage layout, catalog filtering, new diagrams and next-lesson navigation.
- Additional manual review needed: iOS Safari, Chrome for Android, keyboard-only, screen-reader semantics, large display/projector and real classroom comprehension.
- This page records **intended** checks, not a claim of successful CI until the workflow passes. Report actual run and merge in the handoff once confirmed.

## Publisher and source safeguards

The app's Physics chapter sequence refers to the preexisting, independently represented **Glencoe: Physics: Principles and Problems** course ordering. That is **not** an approved table of contents for Novare or Memoria Press books. New lessons were linked only to the separate `existing-glencoe` prototype book entry, leaving publisher-catalog conceptual lists unchanged. There is no copied book text, diagram, cover, teacher key, school file, publisher font, logo, or personally identifiable student information. Formal edition-verified source alignment would need explicit editorial and rights permission before implementation.
