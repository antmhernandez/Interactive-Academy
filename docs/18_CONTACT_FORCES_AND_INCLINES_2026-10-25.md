# Chapter 5 — Friction and Inclined-Plane Interactive Investigations

**Date:** October 25, 2026  
**Source:** `applets/contact-forces.js`, `content/lessons.json`, `content/guided-practice.json`  
**Intended use:** Independent original classical-study companion, not an authorized publisher chapter crosswalk.

## Teaching progression and motivation

The course reaches these models immediately after force components and before two-dimensional motion. Each problem builds a bridge from a manipulable model to Newton's second law.

- **Friction:** static friction is *not always* at its maximum. It adjusts to the required balancing force until slip occurs; then kinetic friction describes sliding contact.
- **Inclines:** rotating the surface changes both the normal force and downhill weight component. The incline model makes the slipping angle visible, then uses kinetic friction to calculate acceleration.

The primary original lesson follows **The Idea → Example → Think → Try it**, with optional **Predict → Manipulate → Connect** inquiry, separate Definition & Example page, and three graded practice problems with vertically accumulating steps.

## Simulator A — horizontal crate

*Assumptions:* initially at rest, dry friction described by constant coefficients, horizontal steady applied force, level support, g = 9.8 m/s², μₖ ≤ μₛ. No rolling, drag, mixed-material complexity or longitudinal motion history.

```text
N = mg
maximum |static friction| = μs N
if applied pull F ≤ μs N:
    actual static friction = F (leftward); net force = 0; acceleration = 0
if F > μs N:
    model starts sliding right
    kinetic friction = μk N (leftward)
    net force = F − μk N; acceleration = net force / m
```

The threshold button sets the applied pull to the first whole-newton value strictly above `μs mg`. A discrete 1 N slider means the threshold crossing is sampled, not exact. Force arrows are schematic; numeric values show the physical magnitudes.

**Reference example:** m=5 kg, μₛ=0.50, μₖ=0.30, F=20 N: limit=24.5 N, actual static friction=20 N, acceleration=0. Change to F=40 N: kinetic friction=14.7 N, a=5.06 m/s² to the right.

**Student challenge:** Why is static friction only 10 N when a 10 N pull is applied, even though the maximum is 24.5 N? Compare rest and start-of-slip conditions.

## Simulator B — straight inclined plane

*Assumptions:* initially at rest, straight fixed plane, g=9.8 m/s², no perpendicular acceleration, gravity as the only driving force, constant coefficients, μₖ ≤ μₛ, and after release kinetic friction opposes downhill slip. It does not model later reversals or incoming kinetic energy.

```text
downhill component = mg sinθ
normal force = mg cosθ
maximum static friction = μs mg cosθ
if mg sinθ ≤ μs mg cosθ:
    actual static friction = mg sinθ uphill; acceleration = 0
otherwise:
    block slides downhill
    kinetic friction = μk mg cosθ uphill
    downhill acceleration = g(sinθ − μk cosθ)
critical angle at impending slip = arctan(μs)
```

The “first sliding angle” button selects the next whole-degree slider setting beyond the ideal continuous critical angle. The ramp angle can reach 50°. The block drawing and arrows show directions without promising a common force-length scale.

**Reference example:** θ=30°, m=4 kg, μₛ=0.40, μₖ=0.20, gravity downhill=19.6 N, normal≈33.95 N, maximum static friction≈13.58 N, so it slides. Then a≈3.20 m/s² downhill. **At rest**, actual static friction equals mg sinθ, not μₛN unless at threshold.

**Student challenge:** Double the mass without changing θ or friction coefficients. Why does the slip angle remain unchanged? Show cancellation of mg in tanθ = μₛ.

## Curriculum, data and verification

- Add `friction` and `inclined-planes` as `available` in canonical Chapter 5 unit `phy-forces`. Preserve original `owns` fields and prerequisites. The independent Physics Next sequence becomes `force-components → friction → inclined-planes → two-dimensional-motion`.
- Add two complete original lessons, each with three escalating guided problems, a misconception check, a short question, original worked reasoning and local numerical answer. Totals: 26 lessons (21 Physics, 5 Calculus), 78 guided problems, 12 gallery applets.
- Add module syntax checks, independent quantitative physics tests (threshold, acceleration, mass cancellation, critical angle, constrained coefficients, reset) and responsive Chromium interactions to CI. All initial-rest assumptions must be shown on screen, not hidden in this document.
- Do not introduce any textbook diagrams, school-owned keys, Memoria Press typography, logos or chapter assertions. Only add these examples to the separate `existing-glencoe` independent prototype mapping.
- Physical classroom/projector and screen-reader/Safari tests remain necessary. Automated Chromium tests are not a substitute for observing learning outcomes.
