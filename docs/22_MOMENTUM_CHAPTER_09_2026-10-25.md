# Chapter 9 — Impulse and Conservation of Momentum

**Date:** October 25, 2026  
**Project:** The Learning Atlas / Independent Interactive Academy  
**Scope:** required school-year Physics Chapter 9 in the independent Glencoe-indexed prototype. No licensed publisher or Novare/Memoria Press edition map.

## Pedagogical objective

Return from the optional Chapter 8 rotation enrichment to the prescribed core Physics chapter 9. The original learning progression is deliberately modest:

1. **A Force Acting over Time** (`impulse`) introduces signed linear momentum, force–time area, impulse and velocity change.
2. **When Two Carts Interact** (`momentum-conservation`) treats two carts as an isolated one-dimensional system, predicting a perfectly inelastic common speed.
3. **Momentum Has a Direction** (`momentum-vectors`) makes cancellation and conservation of signed vector momentum explicit, independently of kinetic-energy calculations.

Each concept has an original definition, a worked problem with accumulating reasoning, a concept-check question with three misconception-aware choices, an independently answerable numeric question with hints, three progressive guided problems and a Predict → Manipulate → Connect inquiry prompt.

**Curriculum sequencing:** main required Next sequence `... orbital-motion → weightlessness → impulse → momentum-conservation → momentum-vectors`. The Chapter 8 rotation unit retains `enrichment` syllabus scope with optional previews and no required Next links. The `collisions` registry topic remains **planned** because its governing prerequisite includes `energy-conservation` (the latter is currently a Chapter 10–11 optional preview, not a core prerequisite). This release provides the *momentum* models for sticking and perfectly elastic collision events as a concept-level experiment without prematurely claiming that the complete elastic/inelastic energy curriculum is taught. Chapter 28 atomic also remains optional.

## Experiment A — impulse from a signed force–time rectangle

**Code:** `applets/momentum.js` global pure function `impulsePulseState(m,F,Δt,u)`, UI `impulsePulse(el)`.

Ideal one-dimensional cart moving on a frictionless horizontal track under a single constant **net** force for time Δt. Right is positive. Student inputs: cart mass `m=1–8kg`, signed net force `F=−24…+24N`, duration `0.5–6s` and initial signed velocity `u=−8…+8m/s`. The force pulse graph shows a rectangle above or below the zero line and is not a measured physical collision waveform.

The physics:
- Initial momentum `p₀=mu`, kg·m/s.
- Impulse `J=FΔt`, N·s = kg·m/s. This equals the signed force–time area and `Δp`.
- Final momentum `p₁=p₀+J`, final velocity `v₁=p₁/m`, velocity change `Δv=J/m`.
- A comparison button sets force to half and duration to double (when duration can remain within model bounds), preserving impulse. Reset returns to a 3kg cart, +12N over 2s, starting at +1m/s.

**Reference:** `m=3kg, F=+12N, Δt=2s, u=+1m/s` gives `p₀=3kg·m/s, J=+24N·s, p₁=27kg·m/s, v₁=+9m/s`. A −10N force applied for 1s to a 2kg cart moving at +3m/s gives `v₁=−2m/s`: the signed impulse can reverse motion.

## Experiment B — instantaneous isolated two-cart event

**Code:** pure `momentumCollisionState(mA,mB,uA,uB,kind)`; UI `momentumCollision(el)`.

Cart A starts to the left of cart B and **always approaches** it: `uA=+2…+8m/s`, `uB=−5…+1m/s`, so `uA>uB`. Both masses are positive integers 1–8kg. No external impulse or friction during the ideal instantaneous event. The interface is intentionally **Predict → Reveal**; changing inputs conceals the outcome again. It plots signed cart arrows and a schematic before/after view, and allows switching two explanatory model extremes:

1. **Perfectly inelastic sticking:** `vA=vB=(mAuA+mBuB)/(mA+mB)`.
2. **Perfectly elastic one-dimensional collision:**
   `vA=((mA−mB)uA+2mBuB)/(mA+mB)`
   `vB=(2mAuA+(mB−mA)uB)/(mA+mB)`.

Always calculate `P₀=mAuA+mBuB`, `P₁=mAvA+mBvB` and enforce `P₁=P₀` algebraically. The kinetic-energy readouts are **advanced forward-looking context**: `K₀=½mAuA²+½mBuB²`, `K₁=½mAvA²+½mBvB²`. For a perfectly elastic event `K₁=K₀`; for sticking `K₁≤K₀`, with `K₀−K₁` transferred to internal deformation, sound, heating and other forms. This does not assert that total energy vanishes or that the collision force–time curve was measured. The website clearly labels the energy detail as a preview for Chapters 10–11.

**Reference:** `mA=2kg,uA=+4m/s,mB=3kg,uB=−2m/s` gives `P=+2kg·m/s`. In sticking mode both depart at `+0.4m/s`; incoming translational kinetic energy 22J becomes 0.4J; 21.6J is transferred into nonmechanical stores. In elastic mode the outgoing velocities are `vA=−3.2m/s,vB=+2.8m/s`; total momentum remains +2kg·m/s and translational kinetic energy remains 22J. A special zero-momentum example `mA=2kg,uA=+3m/s,mB=3kg,uB=−2m/s` sticks with shared velocity zero.

**Deliberate omissions:** No collision duration, deformation progression, friction, rotation, multi-body or 2D impacts, partially elastic restitution slider, drag or actual measured cart trajectories. The graphic is not to scale. The software does not substitute a collision diagram for a detailed energy or contact-force derivation.

## Tests and source boundaries

- `scripts/test-momentum.mjs` uses independently calculated reference cases for impulse sign, equality of different force–time pulses, reversing velocities, 1D sticking and elastic closed formulas, unchanged signed momentum across a broad mass/velocity grid, and correctly conserved versus nonconserved translational kinetic energy; it also tests reveal/compare/reset interactions.
- Extend JavaScript syntax checks, the source/lesson registry validators and five-width Chromium classroom journey to include Chapter 9 equations, numeric readouts, predicted/revealed states, no horizontal overflow, required Next path and publisher-book alignment safeguards.
- Total after pass: **39 complete lessons (34 Physics and 5 Calculus), 117 three-level problems, 19 curated Experiment Room applets**, 151 canonical concept entries across 22 units, existing 84 original physics equation reference items across 30 textbook chapters.
- All content, diagrams and code are original; the `existing-glencoe` listing is an independent prototype chapter index. Do not claim a publisher-approved Memoria Press or Novare edition, chapter or page mapping. Real mobile Safari, VoiceOver/NVDA, in-person classroom understanding, physical projector and accessibility audits are **not** established by a headless Chromium pass.

The next required book study is Chapters 10–11 energy, but promoting their current optional previews into the required course requires deliberate prerequisite, completeness, and syllabus review; do not silently flip their status or link Chapter 9 to them.
