# Interactive Investigations — Models, Pedagogy and Source Boundaries

**Date:** October 25, 2026  
**Status:** Independent publisher-facing demonstration; original SVG/JavaScript applets, not PhET content or authorized textbook alignment.

## What is meant by a PhET-style resource

Students can deliberately change physically meaningful variables and observe how an honest mathematical model responds. The interface supports prediction, manipulation, interpretation, and a connection to computation. These applets do not use or reproduce PhET code, art, name branding, or third-party hosted simulations. Educational intuitions are *verified against governing equations*, not free-form animation.

The `#applets` **Experiment Room** curates ten existing/new original models (seven Physics, three Calculus), exposes simple subject filtering, and connects directly to focused lessons, worked examples and independent practice. The regular lesson tabs are still The Idea, Example, Think, Try it. Four Chapter 6 lessons have an optional Predict → Manipulate → Connect prompt after the visual, so the student investigates before calculating.

## New model: uniform circular motion

- **Inputs:** speed `v` = 2–16 m/s; radius `r` = 2–10 m.
- **Readouts:** inward acceleration `a = v²/r` and revolution period `T = 2πr/v`. At v=6m/s,r=3m, a=12m/s², T≈π seconds.
- **Directions:** tangent velocity `(-v sinθ, v cosθ)`, inward acceleration `(-a cosθ, -a sinθ)` in physical Cartesian coordinates. SVG y-coordinate is inverted. Drawn arrow *lengths are schematic* and should not be compared as physical vector magnitudes.
- **Controls:** Play/pause with `requestAnimationFrame`, 30° step, reset, show/hide directional arrows. Angular rate is `ω = v/r`, so animation rate changes with both controlled quantities. The applet stops its animation when the lesson view is detached.
- **Conceptual payoff:** Doubling speed at constant radius makes acceleration four times as great; acceleration points inward despite unchanging speed. "Centripetal force" denotes a resultant inward force, not an extra new force.

## New model: crossing a moving river

- **Inputs:** boat speed relative water `v=4–10 m/s`, current eastward `c=0–3 m/s`, heading `θ=-45°…+45°` from north, river width `w=60–120 m`.
- **Reference-frame equations:** `vEast = c + v sinθ`; `vNorth = v cosθ`; `t=w/vNorth`; `drift=vEast*t`; `groundSpeed=√(vEast²+vNorth²)`.
- **At defaults** v=6,c=2,θ=0,w=90: t=15s, drift=30m east and ground speed≈6.325m/s.
- **Controls:** Adjust inputs, press Aim upstream (nearest whole-degree heading approximating `θ = -arcsin(c/v)`) and Reset.
- **Interpretive limits:** Current is uniform eastward, boat heading/speed are held steady, and acceleration/transients are ignored. SVG uses a schematic river; geographic distances are given by numeric results. For negative `vEast`, drift is west. The aim button is *approximate*, not a guarantee of precisely zero drift.

## Inquiry-to-calculation bridges

1. Two-dimensional velocity components: predict what increasing angle does to vₓ and vᵧ; manipulate angle while speed is fixed; explain cosine/sine projections.
2. Projectile flight: compare 30° and 60° at constant launch speed; distinguish equal range from different height/time; connect to `R=v² sin 2θ/g` under equal landing height and no air resistance.
3. Circular motion: compare acceleration at two speeds with constant radius and inspect changing tangent; connect to `a=v²/r`.
4. Relative velocity: compare straight-across steering to aiming upstream and trace the landing location; calculate ground-relative velocity by components.

## Contents, tests, and remaining reviews

Two new lesson records have concise definitions, visible worked equations, short misconception questions, independent numeric responses, and **exactly three** escalating guided-practice problems with vertically accumulating reasoning steps. Chapter 6 now contains four original student lessons. Total site: 24 lessons, 72 guided problems, 84 preexisting reference equations. The historical Glencoe-index course ordering is a separate internal learning sequence; it is **not** an assertion about any current Novare or Memoria Press book's chapter content.

GitHub Actions must run the existing JS/lesson/curriculum/source validators, unit-test physical outputs and step/reset logic, and headless Chromium mobile/desktop navigation checks. Manual keyboard and screen-reader testing, motion-reduction behavior, real-device touch, projector use, and teacher/student comprehension remain separate acceptance gates.

## Future applet candidates, prioritized by conceptual difficulty

- **Friction and incline:** gravity decomposed parallel/perpendicular to plane, static friction until slip threshold, kinetic friction when sliding; make the onset of motion visible.
- **Energy transformation:** adjustable height/speed and gravitational/elastic potential vs kinetic; energy bar charts and no-energy-loss vs friction cases.
- **Wave superposition:** interactively move amplitude, phase, and frequency; display standing and traveling waves with a time marker, carefully separating displacement from wave transport.
- **Electric potential vs field:** map field lines and equipotentials for two charges with limitations and unit interpretation.
- **Calculus convergence:** secant difference quotient tending toward a derivative and signed Riemann sums with error and subdivisions, tied to the five current Calculus concepts.

Use original source equations and diagrams and design concept cards only when each can be integrated with the course registry and a working test. No teacher keys, copyrighted workbook problems, accounts or publisher fonts/images should be bundled into the public site.

## Verified implementation record

The changes were merged through [PR #11](https://github.com/antmhernandez/Interactive-Academy/pull/11), commit `f60ee820161ab3562e8ccca89f4cc29842067a53`. Before merge, [GitHub Actions run #44](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40221549917) passed all Node curriculum and numerical tests and five-width Chromium navigation/interaction journeys. Follow-up physical phone, screen-reader and classroom teaching reviews remain needed.
