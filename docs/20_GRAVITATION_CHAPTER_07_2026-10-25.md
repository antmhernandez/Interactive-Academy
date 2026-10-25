# Chapter 7 — Gravity, Circular Orbits and Apparent Weightlessness

**Project:** The Learning Atlas / Independent Interactive Academy  
**Date:** 2026-10-25  
**Editorial status:** Original educational prototype, not official textbook content, not a publisher-approved crosswalk.

## Intent and teaching progression

The user requested ongoing original, student-controlled, PhET-like applets emphasizing difficult physical concepts and their mathematical computation. Following completion of Chapters 1–6, the correct next subject is Chapter 7 **Gravitation** in the independently indexed Glencoe-based course. These three complete concepts now join the required Next sequence:

1. **Gravity Weakens with Distance** — universal gravitation; separate force from acceleration and teach inverse-square reasoning.
2. **Falling Around a Planet** — connect gravity's inward acceleration to circular orbital speed and period.
3. **Why Orbit Feels Weightless** — free fall and normal contact force, not the absence of gravity.

The gravitational models invite the same **Predict → Manipulate → Connect** question format as earlier original applets, followed by worked steps, conceptual distractors, numeric independent Try it and three increasingly challenging guided problems. Historical planetary models, Kepler's full laws and cosmology remain planned.

## Model A: Newtonian force and field

Source: `applets/gravitation.js` global function `gravityState(planetEarthMasses,testMassKg,radiusEarthRadii)` and renderer `gravityField`.

Constants:
- `G=6.67430×10⁻¹¹ N m²/kg²`.
- Reference Earth mass `M⊕=5.9722×10²⁴kg` and Earth radius `R⊕=6.371×10⁶m`.
- Planet mass 1–10 Earth masses; *its radius is deliberately fixed to R⊕*, not estimated from density.
- Test body 1–10kg, negligible relative to central mass.
- Separation 1–8 Earth radii, measured **center to center** and always at or outside the model spherical planet.

Calculate `g=GM/r²`, `F=GMm/r²=mg`, `g/g_surface = (R⊕/r)²`. The visual force arrow points toward the planet, while numerical output supplies the physical magnitude. Doubling center distance quarters gravitational force and acceleration for unchanged masses. Increasing the small test mass changes force proportionally *but not gravitational acceleration*. The visual is intentionally not to scale for physical distance or vectors.

**Nominal check:** one-Earth-mass source, test mass 2kg, r=2R⊕ yields g≈2.455m/s² and force≈4.91N; surface g≈9.82m/s². At 4R⊕, g is one sixteenth of surface, 6.25%.

## Model B: ideal circular orbits

Source: `orbitState(planetEarthMasses,testMassKg,radiusEarthRadii)` and `orbitGravity`; no genuine N-body integration. Same constants and primary assumptions as Model A; orbital center-to-center radius is 1.5–8R⊕ to remain outside spherical planet. A small test mass is negligible in the motion of the primary.

For an ideal circular orbit, `GMm/r²=mv²/r`. Therefore:
- `v=√(GM/r)`, tangent to the path.
- `a=v²/r=GM/r²`, radially inward.
- `T=2πr/v=2π√(r³/GM)`.
- `F=GMm/r²` on satellite; force changes with test mass but speed, period and acceleration do not.
- Ideal apparent weight read by an onboard support scale is `N=0N` because passenger and craft share free fall; it is **not** the gravitational force, which remains nonzero.

The orbit phase slider, 30° Step button, Play/Pause and Reset illustrate continuously changing directions. Playback is **sped up for visual teaching**, not physically synchronized with orbital period; the displayed period is the physical value. The scene is schematic and lacks drag, eccentricity, orbital injection, precession, thrust, perturbers, planetary rotation, atmosphere and relativity.

**Nominal check:** Earth mass, r=2R⊕, test mass 5kg gives orbital speed≈5.59km/s, period≈3.98hours, inward g≈2.455m/s² and test-body gravitational force≈12.28N, while the ideal scale normal force remains 0N. From r=2R to r=4R: v changes by a factor 1/√2 and T by 2^(3/2).

## Curriculum integrity

The canonical `phy-gravity` unit already defines these IDs and stable ownership fields. Mark only the three completed IDs `available` and sync titles to the student-facing wording. Main sequence now: `... circular-motion → relative-velocity → universal-gravitation → orbital-motion → weightlessness`. The current remaining Chapter 7 items remain `planned`. Later chapters 10–11 energy and Chapter 28 atomic applets retain their explicit optional status and do not connect to main Next.

These examples are added only to `existing-glencoe`, an **independent prototype**. None of the publisher-catalog reference pages or Novare mappings is given a new chapter/edition claim. All figures, tests and prose are independently authored; no third-party PhET asset, copyright illustration, proprietary assessment or answer key is imported.

## Acceptance and limitations

- Source/lesson registry validators: 33 lessons (28 Physics, 5 Calculus), 99 progressive guided problems, 84 formula-reference entries and 148 canonical registry topics.
- Unit tests: gravitational force and acceleration ratios, Earth's surface reference, mass scaling, exact circular kinematics, period scaling, weightlessness/support force, controls/step/reset.
- Chromium journeys at 320/375/768/1024/1440px: gallery 15 models, lesson navigation, direct links, default readouts, phase/step/play/pause, and page overflow.
- Additional required review before a publisher demo: in-person Physics editorial review, touch devices, Safari, keyboard/screen-reader assistive technology, visual pacing on a physical projector, student understanding of apparent weight versus gravity, and original IP review.

**Next incremental direction:** a carefully scoped Chapter 8 rotational-motion or Chapter 9 momentum investigation following actual book order; first address issues surfaced by classroom testing of the current 15 original applets.

## Implemented and verified (post-merge)

Merged via [PR #14](https://github.com/antmhernandez/Interactive-Academy/pull/14), squash SHA `849ae8c6c56831fba1952a366434ca9c7a01aeba`. Before merge, [Actions run #60](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40241966619) successfully completed content, physics, publisher-pathway and five-width Chromium validations. Real-device/assistive technology and classroom observation remain pending.
