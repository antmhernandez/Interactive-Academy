# Required Chapters 10–11 Work and Energy — Curriculum Promotion and Mathematics Audit

**Date:** October 25, 2026  
**Project:** The Learning Atlas / Interactive Academy  
**Publisher relationship:** Independent, unaffiliated educational prototype. Existing thirty-chapter Glencoe-index framework is separate from illustrative publisher/Novare catalog links; no grade-specific proprietary book pages or chapter mappings are claimed or reused.

## Curricular acceptance and prerequisite repair

The user requested continued actual site development after successfully merging required Chapter 9 momentum. Previous original energy content was marked optional only because earlier course prerequisites were missing; the required Chapter 9 lesson path is now in place. Mathematical and editorial review of the existing four energy lessons confirms that each already contains a concise definition, sensible three-step worked explanation, individual practice question and hints, three misconception-check choices with unique feedback, gradual Begin/Extend/Challenge problem set, and original manipulative ramp inquiry. The existing 35° ramp applet passed a broad conservation grid and headless Chromium in its earlier development.

Reorganize Chapter 10 **Work and Simple Machines** before Chapter 11 **Energy Conservation**, preserving the explicit `phy-energy` unit. Required live order:
1. `work-energy` — work transfers energy, `W=Fd cosφ`.
2. `work-angle` — distinguish parallel/perpendicular force components and signed work.
3. `kinetic-energy` — `K=½mv²` and `W_net=ΔK`.
4. `power-efficiency` — `P=W/t`, useful/input ratio.
5. `mechanical-advantage` — force–distance tradeoff and output work.
6. `potential-energy` — near-Earth `U=mgh` relative to chosen zero.
7. `energy-conservation` — constant `K+U+E_thermal` for the combined block/Earth/surroundings account.

The current required Next path is `... momentum-conservation → momentum-vectors → work-energy → work-angle → kinetic-energy → power-efficiency → mechanical-advantage → potential-energy → energy-conservation → null`. Chapter 8 (rotation) is still an **optional** non-core enrichment. `atom-spectra` remains a Chapter 28 optional curiosity.

Registry `power-efficiency` previously required `energy-conservation`, creating a circular teaching order if power was to be taught in Chapter 10; the new lesson needs only work and time, so change its prerequisite to `work-energy`. Mechanical advantage needs completed work/power conceptual foundation (prerequisites `work-energy` and `power-efficiency`). The remaining `energy-flow-diagrams` topic is planned, not complete. All live topics continue to have acyclic, available prerequisites and match publication order exactly.

## New original work-angle investigation

**Source:** `applets/work-machines.js`, pure function `workAngleState(force,distance,angleDegrees)`, interactive `workAngleLab`.

Assume a constant single force of 0–60 N at angle 0–180° to a rightward horizontal displacement of 1–8 m. Calculate:

- Parallel component `F∥=Fcosφ`; perpendicular `F⊥=Fsinφ`.
- Signed work by **that force**: `W=F d cosφ`, J=N·m.
- 0° is positive, 90° zero, 180° negative; angle sliders and three quick-comparison controls expose those cases.

There is no modeled acceleration, friction, support or claimed net work beyond this force. Reference: 20 N at 60° along 4 m gives `W=+40 J`; at 90° gives zero; at 180° gives `−80 J`. Negative work means this force transfers energy *out* of the object's mechanical kinetic energy during that displacement if other work terms are accounted for. A schematic force arrow encodes angle, not physical magnitude.

## New abstract passive-machine investigation

**Source:** `simpleMachineState(inputForce,inputDistance,outputDistance,efficiencyPercent,seconds)`, `simpleMachineLab` in the same standalone module.

Choose positive input force 10–100 N, input travel 0.5–5 m, output travel 0.25–5 m, useful work efficiency 40–100%, operation time 1–10 s. Assume one constant input force acting in the direction of input travel and an output force acting in the direction of output travel, no storing of net work across cycles, passive machine and no creation of work:

- Input `W_in=F_in d_in`, J.
- Useful output `W_out=(η/100) W_in=F_out d_out`, J.
- Thus `F_out=W_out/d_out`, N.
- Ideal mechanical advantage `MA_ideal=d_in/d_out`; actual force mechanical advantage `MA_actual=F_out/F_in=(η/100)MA_ideal`.
- Average input and useful powers `P_in=W_in/t` and `P_useful=W_out/t` in watts.
- Unavailable output work `W_in−W_out` is transferred to other stores and shown as a separate original SVG bar. Useful + transferred = total input work.

Reference default: `F_in=50N`, `d_in=2m`, `d_out=0.5m`, `η=80%`, `t=4s` → input 100J, useful 80J, other 20J, output force 160N, actual MA 3.2, ideal MA 4, input 25W and useful output 20W. Set η=100% to get 200N output; halve output travel to 0.25m and ideal output force becomes 400N, *without increasing output work*. Halving operating time doubles power for the same work. This is a deliberately abstract idealized machine, **not** a friction simulation, measured real-world device or a device blueprint.

## Existing original ramp model review

`applets/energy-ramp.js` uses fixed θ=35°, `g=9.8m/s²`, `μ_k≤0.40 < tan35°`, and motion downhill with no rolling/air drag:
- `s=pH/sinθ`, `h=H(1−p)`.
- `Q=μ_kmgcosθ·s`, `U=mgh`, `K=½mv₀²+mg(H−h)−Q`.
- Thus `K+U+Q=½mv₀²+mgH` at every progress. `v²=2K/m`.
- Uniform `a=g(sinθ−μ_k cosθ)` and `s=v₀t+½at²` supply the displayed physical elapsed-time estimates; playback deliberately slowed relative to that displayed time.
- The system boundary includes block, Earth, ramp and surroundings; the energy transferred into thermal stores is not magically removed from total energy. Potential energy zero at bottom is a reference choice.

## Optional post-energy collision synthesis

**Lesson:** `collisions`, the canonical earlier Chapter 9 momentum unit topic, now complete and `available` but **optionalPreview:true,next:null** so it is never forced prematurely between Chapter 9 and Chapters 10–11. A clearly labeled cross-link after energy conservation invites students to return to the existing `applets/momentum.js` predict→reveal two-cart lab and compare translational kinetic energy and total signed momentum.

Momentum in isolated 1D collisions: `P=m₁u₁+m₂u₂=m₁v₁+m₂v₂`. For perfectly inelastic sticking `v=(m₁u₁+m₂u₂)/(m₁+m₂)` and final kinetic energy is generally less than initial; other energy stores gain the balance. In a perfectly elastic event both total signed momentum and translational kinetic energy are conserved. Reference: 2 kg cart at +4 m/s and 3 kg cart at −2 m/s have total +2 kg·m/s. Sticking speed = +0.4 m/s, translational K drops from 22 J to 0.4 J and 21.6 J transfers elsewhere. Elastic velocities −3.2 m/s and +2.8 m/s retain 22 J. A complete independent lesson and three graduated problems present this contrast **after** all required conceptual prereqs have been encountered.

## Acceptance, inventory, intellectual property and limitations

- Exact content: **43 original complete lessons**, including 38 Physics, 5 Calculus; **129** Begin/Extend/Challenge numerical questions; **21** featured original experiments (18 Physics, 3 Calculus); **151** canonical topic slots (43 available, 108 planned) over **22** units; 84 original equation summaries across 30 printed Physics chapters.
- Mathematical regressions: force-angle 0°/90°/180°, signed work vs force components, machine useful/input bookkeeping over a broad input grid, power/time and force/distance inverse relation, ideal η=100%, controls and resets. Existing ramp and two-cart regressions remain required. Source content/ordering/prerequisite, 5-width Chromium and crosslink tests strengthened.
- Physical touch devices, VoiceOver/NVDA, classroom projector, student comprehension, expert editorial and IP reviews are **not established** through automated Chromium.
- No copied branded imagery, proprietary copyrighted textbook text, teacher answer keys, publisher-approved chapter/page references or external PhET assets are introduced. Existing prototype remains a classroom/publisher discussion example rather than a complete graded course or endorsed commercial product.

**Recommended next development after this merge:** verify new concepts with teachers/pupils and use that feedback to improve visual clarity and mobile/control ergonomics. Improve publisher demonstration/presentation experience, science unit pacing and textbook-specific edition review rather than expanding blindly into later chapters.

## Release and test result

Successfully squash merged [PR #17](https://github.com/antmhernandez/Interactive-Academy/pull/17), commit `c0abb671f9b3202c645cdc87803cfdb13dfe9e9e`. [Workflow run #75](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40253863493) completed successfully, including source/registry/course sequence, work-angle and machine regression grid, ramp and momentum model tests, publisher rights constraints, and Chromium journeys at 320/375/768/1024/1440px. Final main and Pages workflow statuses must be checked after documenting this release. No physical Safari, screen reader, projector or student-understanding audit has been done.
