# Chapter 8 — Torque, Rotational Inertia and Rotation Dynamics

**Date:** 2026-10-25  
**Project:** The Learning Atlas / independent Interactive Academy  
**School-scope decision:** OPTIONAL extension, not part of the presently declared school-year Physics syllabus. Chapter 8's independent textbook index remains `scope:"optional-extension"`; the `phy-rotation` curriculum unit is `syllabus.scope:"enrichment"`.

## Purpose and progression

Connect familiar linear-motion concepts (force, acceleration, mass, displacement) to their fixed-axis rotational counterparts without relying on animation alone. Three original content pages are linked as a separate optional sequence and all use the same narrative pedagogy: **Predict → Manipulate → Connect**, then definition, example, reasoning check and numerical practice.

1. `torque-levers` — signed torque from force, lever-arm radius and direction.
2. `rotational-inertia` — inertia of ideal solid disks versus thin hoops about the central axle.
3. `rotational-dynamics` — angular acceleration, angular speed, displacement and kinetic energy after constant torque acts from rest.

The primary textbook progression remains through Chapter 7 `weightlessness`. Chapter 8 lessons all use `optionalPreview:true, next:null`, and their own three-link lesson path. Chapters 10–11 and 28 also remain independent previews.

## Experiment A — a single force on a lever

**Source:** `applets/rotation.js` — `torqueState(radius,force,degrees)`, `torqueLever(el)`.

Assume an ideal horizontal lever to the right of a frictionless fixed pivot with one applied force, neglecting other torque contributions. Radius `r=0.2–2.0 m`, force `F=0–60 N`, signed force angle `φ=−90°…+90°` measured from the rightward lever arm.

- Signed moment `τ=rFsinφ`, in N·m.
- Signed force perpendicular to arm `Fperp=Fsinφ`, in N.
- Moment arm magnitude `r_perp=r|sinφ|`, in m.
- **Counterclockwise positive**, clockwise negative. Force along arm gives `τ=0`; perpendicular force yields maximum magnitude at fixed F,r.
- The force arrow and lever are schematic; measured values follow equations. The comparison buttons set perpendicular/upward force, force along arm and reset.

**Worked reference:** at r=1 m, F=20 N, φ=+90°, `τ=+20 N·m`. At φ=−90°, `τ=−20 N·m`. At φ=0°, `τ=0`. A lever radius change from 0.5 to 1 m doubles torque if force/angle remain unchanged.

There is no claim that this applet solves a real lever's full static equilibrium or that a pivot bearing is physically frictionless outside this model. It predicts the moment of a single force about the pivot.

## Experiment B — wheel under a constant torque

**Source:** `spinState(shape,m,R,torque,t)`, `rotationalSpin(el)`.

Ideal rotating rigid body on a fixed frictionless axle, in a plane perpendicular to its axis, beginning from rest at time zero. Two deliberate shapes: uniformly filled solid disk and thin hoop (all mass at radius R). Inputs: mass 1–8 kg; outer radius 0.50–2.00 m; **net torque** 0–20 N·m, always nonnegative; elapsed time 0–5 seconds, with play/pause, +0.5s step, body switch and reset.

- `I_disk=½mR²`; `I_hoop=mR²`, units kg·m².
- `τ_net=Iα`; hence `α=τ_net/I`, rad/s².
- `ω=αt` from rest, rad/s.
- `θ=½αt²`, rad; turns `θ/(2π)`.
- `K_rot=½Iω²`. For no loss and constant net torque, `W=τθ=K_rot` from rest.

**Worked reference:** disk, 4 kg, 1 m, 8 N·m, 2 s: `I=2 kg·m²`, `α=4 rad/s²`, `ω=8 rad/s`, `θ=8 rad`, `K=64 J`. The same-mass hoop instead has `I=4 kg·m²`, `α=2 rad/s²`, `ω=4 rad/s`, `θ=4 rad`, `K=32 J` with the same torque and time. Rotating the wheel marker visualizes `θ` modulo a turn; numeric `θ` reports all rotations.

The model deliberately omits rolling, off-axis rotation, gyroscopic precession, motor torque curves, friction, deformation and gravitational torque. Playback runs at a slowed teaching speed; elapsed time/output use the actual equations. The simulation visually rotates a geometric wheel but does not imply a physical motor-driven real-world apparatus.

## Validation and rights

- Unit tests use exact torque and moment-of-inertia formulas over a grid of values, plus sign inversion, zero-angle case, `Iα=τ`, angular kinematics, kinetic-energy/work agreement, and control changes/reset.
- Five headless Chromium viewport tests (320, 375, 768, 1024, 1440px) must exercise gallery counts and subject filter, independent optional-study navigation, diagram readouts, signed torque controls, body comparison, spin stepping, animation play/pause and horizontal overflow.
- Content totals after this change: 36 lessons (31 Physics, five Calculus), 108 graduated guided problems, 17 curated applet entries, 151 registered curriculum topics, original 84-equation chapter reference preserved.
- Rights: Original figures, script, exercises and explanations. No PhET assets or proprietary publisher problems are copied. This is an independent Glencoe-indexed classroom-idea demonstration, not an authorized Memoria Press or Novare book companion. Do not modify publisher title alignment without authorized edition references.
- Human touch, Safari, screen reader, projector, pedagogical-comprehension and formal copyright review still require in-person completion. Automated tests do not certify accessibility or classroom outcomes.
