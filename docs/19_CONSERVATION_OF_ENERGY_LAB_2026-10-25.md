# The Energy Laboratory — Physics and Teaching Review

**October 25, 2026** · The Learning Atlas / Interactive Academy  
**Scope:** original independent educational model, not an official Novare or Memoria Press resource. **Registry unit:** `phy-energy`, originally indexed to Chapters 10–11 in the independent Glencoe-based prototype.

## A useful intuition, not merely a moving illustration

Students watch a block slide down a straight ramp. A time-aware position slider moves the block; an original energy bar chart exposes what each joule becomes. The demonstration answers: where does the energy go when friction makes the block arrive with less speed?

**Underlying three-part energy balance:** `K + U + Q = K₀ + U₀`; gravitational potential U and kinetic K can change, and positive Q represents mechanical energy transferred into thermal forms in the block/ramp/surroundings. The complete block–Earth–ramp accounting conserves total energy, while mechanical energy alone need not remain constant.

The interface supports a **predict → manipulate → explain → calculate** cycle on each lesson, a local sequence of four introductory study pages, three progressive problems per page, and a conceptual-misconception check.

## Assumptions, variables and computation

Original `applets/energy-ramp.js`, loaded before `app.js`, uses a pure `energyRampState(m,H,v0,mu,p)` calculation. The geometric drawing is schematic; its physical outputs are computed from actual inputs.

- Fixed plane angle `θ=35°`, constant `g=9.8m/s²`, no air resistance, translational particle-like block without rotational kinetic energy.
- Vary `m` from 1 to 8 kg; initial height `H` from 2 to 12 m relative to the bottom; initial downhill speed `v0` from 0 to 8 m/s; coefficient `μk` from 0 to 0.4; progress `p` from 0 to 1.
- `μk≤0.4<tan(35°)≈0.7002` guarantees a positive downhill acceleration for the selected model. There is no static-friction startup in this particular sliding model; the prior static/kinetic Chapter 5 applets treat that question.
- Total ramp length `L=H/sinθ`, downhill displacement `s=pL`, current height `h=H(1−p)`.
- Initial kinetic energy `K0=½m v0²`; initial potential `U0=mgH`; friction-transferred thermal `Q=μk mg cosθ·s`.
- `U=mgh`; `K=K0+mg(H−h)−Q`; `v=√(2K/m)`; **`K+U+Q=K0+U0` at every position**.
- The physical time to each position follows `s=v0·t+½a·t²`, `a=g(sinθ−μkcosθ)`, `t=(√(v0²+2as)−v0)/a`. Playback uses this displacement-time equation but runs slower than real time for instructional viewing. Slider values and the numerical energy balance remain the physical results; the colored bar lengths represent shares of total energy.

## Reference cases and tests

At `m=2kg, H=5m, v0=0, μk=0.20`: at the top, `U=98J, K=0J, Q=0J`. At the bottom, `Q≈28.0J` and `K≈70.0J`, totaling 98 J. In the ideal frictionless case `μk=0`, the bottom has `K=98J`, `U=0`, `Q=0`, speed `v=√(2gH)≈9.90m/s`. Any start speed adds initial kinetic energy `½mv0²` to the total without changing the definition of height.

The regression suite checks the exact energy sum across combinations of masses, heights, speeds, friction values and positions; time and velocity finiteness; frictionless limits; doubling mass leaves the final speed unchanged when the other inputs and initial speed are fixed; visual controls step/scrub/friction-off/reset. Headless Chromium must additionally verify the gallery entry, lesson navigation, prediction prompt, play/pause controls, no overflow and value updates on 320/375/768/1024/1440px.

## Chapters 10–11 source progression

These original optional preview lessons **do not modify the course's Chapter 1–6 required Next sequence**:

1. `work-energy` (Chapter 10): work `W=Fd cosθ`, sign, joules, zero work at zero displacement.
2. `kinetic-energy` (Chapter 10): `K=½mv²`, net work = ΔK, nonlinear speed dependence.
3. `potential-energy` (Chapter 11): relative `U=mgh`, signed differences and arbitrary zero level.
4. `energy-conservation` (Chapter 11): partition of initial energy into final kinetic, potential and thermal stores/transfers.

Each lesson is registered as available under `phy-energy` with established prerequisites; all are marked `optionalPreview:true`, `next:null` to prevent skipping chapters 7–9 and have a **separate four-link study path**. The original Chapter 28 atom-spectra preview remains unrelated and optional. The only additional textbook link is in the independent Glencoe-index prototype reference; existing publisher-specific illustrative catalog mappings are unchanged.

## Editorial and rights limitations

All figures, code, prose and numeric exercises are original. The unit's historical Glencoe chapter index does not assert that Novare or Memoria Press editions contain equivalent numbered lessons. No copyrighted publisher material, official branding, teacher-only keys, student data, account or paid hosted simulation has been added. Before real deployment into a publisher product, review actual adopted texts, branded design assets/permissions, physical touch and screen-reader use, and observed student comprehension. Do not equate automation test completion with WCAG certification or classroom effectiveness.

## Integration verification, October 25, 2026

This pass was merged through [PR #13](https://github.com/antmhernandez/Interactive-Academy/pull/13), squash commit `958756d3f5220aab0e6e8e67590ab9e1936652dc`. The headless browser, numerical physics and course-structure checks completed successfully in [Actions run 40232066089](https://github.com/antmhernandez/Interactive-Academy/actions/runs/40232066089). Human classroom and accessibility audits remain pending.
