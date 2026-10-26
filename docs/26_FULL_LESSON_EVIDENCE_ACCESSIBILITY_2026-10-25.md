# 26 — Full-Lesson Mathematical Evidence, Accessibility and Publisher Walkthrough
**Date:** October 25, 2026  
**Source:** feature branch `feat/full-lesson-evidence-accessibility-20261025` from authoritative `main` at `c2736f6728f3aff28380ab12ce5daa9aa1d9556d`.  
**PR:** [#20](https://github.com/antmhernandez/Interactive-Academy/pull/20). **Release only after PR Actions succeeds, merge, and independently verified `main` + Pages runs.**

## Why this iteration exists

The three mini-labs in the short `#tour` already give a memorable introduction, but a professional curriculum prototype also needs **meaningful, independently inspectable explanations inside the actual student lessons**. Reviewers must be able to ask whether the depicted quantity, the written sentence and the calculated value all describe the same phenomenon.

This iteration adds a consistent **full-lesson evidence workbench** to `graph-slope-physics`, `friction` and `energy-conservation`. Each uses the original model's current sliders, prints the arithmetic in text with units, gives a changing plain-language description associated with its SVG, and asks a recorded multiple-choice prediction. The model remains freely manipulable; the prediction-to-evidence explanation unlocks only after a prediction is recorded and a control is changed. This does not certify student understanding or substitute for the independent practice below.

## Scientific and numerical audit

### Position against time · `#lesson/graph-slope-physics`
- **Canonical full-lesson model:** `x(t) = 1 + t²` metres, `0 ≤ t ≤ 4 s`. Do not confuse this with the separate earlier `average-velocity` renderer's `x(t) = 1 + 2t + 0.25t²`.
- `Δx = x(t₂)−x(t₁) = t₂²−t₁²` metres, `Δt = t₂−t₁` seconds, and `v̄ = Δx/Δt = t₁+t₂` m/s (for distinct times). The interface maintains `t₁ ≤ 1.5` and `t₂ ≥ 2`, so division by zero is excluded.
- Starting at `t₁=0`, `t₂=2`: `x₁=1 m`, `x₂=5 m`, `Δx=4 m`, `Δt=2 s`, `v̄=2 m/s`. Moving the end to `t₂=2.5` gives `v̄=2.5 m/s`.
- Full graph now includes labeled axes, numerical tick labels, secant, and an explicit dashed **rise (Δx)** / **run (Δt)** triangle. It distinguishes **position (vertical coordinate)** from **average velocity (secant slope)**.
- The separate `averageVelocity` graph also receives labeled ticks and rise/run marking; no lesson identifiers or keys changed.

### Contact friction · `#lesson/friction`
- Instantaneous onset from rest on level ground, with no vertical applied component. `N=mg`, `fₛ,max=μₛN`, and **at rest** `fₛ=Fpull` as needed, not the constant maximum.
- At 5 kg, `g=9.8 m/s²`, `μₛ=0.50`, `μₖ=0.30`: `N=49 N`, `fₛ,max=24.5 N`. At `Fpull=20 N`, the actual static friction is 20 N, horizontal net force zero, acceleration zero.
- At **exactly 24.5 N** the ideal model still supports static equilibrium; at **25 N**, it uses kinetic friction `fₖ=14.7 N`, `Fnet=10.3 N`, and `a=2.06 m/s²` to the right. This is an onset model, not a complete time history of motion.
- If a visitor sets `μₖ > μₛ`, the existing simulator clamps the kinetic coefficient to the static coefficient; the new text reads the clamped value. Arrows remain schematic, not scaled force vectors.

### Energy · `#lesson/energy-conservation`
- Original `energyRampState` remains the **single engine** for ramp state. For a block of mass `m` descending fraction `p` of a straight 35° ramp with release height `H`, the displacement is `s=pH/sin(35°)`; remaining height is `H(1−p)`.
- `K=½mv₀²+mgHp−Q`, `U=mgH(1−p)`, `Q=μₖ mg cos(35°)s`; hence `K+U+Q=½mv₀²+mgH`. Here `Q` represents a transfer into **thermal surroundings**, and the closed accounting system contains block, Earth and surroundings.
- In the default `m=2 kg, H=5 m, v₀=0` example, total remains `98 J`. At half distance, `U=49 J`; with `μₖ=.20`, transferred thermal energy is approximately `14 J` and kinetic energy approximately `35 J`. At the **same** position with `μₖ=0`, `K=49 J`: the kinetic difference equals the modeled thermal transfer.
- For `μₖ ≤ 0.40 < tan(35°)`, ideal acceleration remains downhill for the permitted controls. No air resistance or rotation; zero gravitational potential is defined at the ramp bottom.
- **Drawing correction:** original full-lesson ramp vector was 350 screen units horizontally / 218 vertically, approximately **31.9°** while labeling 35°. Now horizontal run is 350, vertical rise 245; `atan(245/350) ≈ 34.99°`. The block position and orientation follow that revised geometric representation. The fixed diagram remains **schematic** when a user changes the physical release height.

## Reader experience and accessibility contract

- Actual numerical derivations and model-specific diagram descriptions are **ordinary DOM text**, not SVG-only text or inaccessible canvas. Dynamic SVGs reference `#evidence-description` with `aria-describedby`. Each slider exposes a meaningful `aria-valuetext` with units; its label remains the native visible label.
- A prediction fieldset offers three labeled radio choices. **Record my prediction** provides polite status feedback. The **Connect** button stays unavailable until a prediction is recorded and a control is used. Conceptual explanation is not disclosed by default.
- Ranges and actions use native keyboard-operable controls; larger touch areas, visible focus, high-contrast numerical evidence, single-column choice controls on narrow screens, and projector-scaled evidence type support varied contexts.
- Updates do **not** continuously announce all long equations on every arrow key press. Instead, a user can navigate to the readable evidence block after changing the control. Live announcements are limited to voluntary prediction actions. Whether this is effective for NVDA/VoiceOver users needs in-person testing.
- Model assumptions remain visible. Dynamic numerical text prints to two decimal places in the supplementary explanation; underlying physics uses unrounded numbers for totals and conservation checks. A rounded component sum can differ at the last decimal place.

## Seven-minute publisher presentation script

This is a suggested human-presented sequence, not an assertion that a classroom trial occurred.

| Time | Presenter action | Ask audience |
| --- | --- | --- |
| 0:00–0:40 | Open `#tour`. State that this is an original independent prototype, not an MP-endorsed product. | “Could an interactive diagram serve a rigorous printed curriculum rather than compete with it?” |
| 0:40–2:00 | **Graph:** Ask for a prediction; move the secant time. Open `#lesson/graph-slope-physics?tour=1`; show labeled Δx/Δt and the written equation. | “Is the graph’s vertical height the velocity? Where do metres per second enter?” |
| 2:00–3:40 | Return tour and choose **Friction**. Show pull below and above 24.5 N; enter the full friction lesson and read the static/kinetic evidence. | “Why is the actual friction 20 N before release, rather than 24.5 N?” |
| 3:40–5:20 | Return tour and choose **Energy**. Scrub the ramp; compare friction off. Open the full lesson; read the energy equation and thermal accounting. | “Does friction make energy disappear, or move into another account?” |
| 5:20–6:35 | In the full lesson, record a student prediction and manipulate one model control, then activate **Connect**. Show The Idea, an accumulating worked example and the three-stage Guided Practice link. | “Can the student explain the computation independently, not merely observe animation?” |
| 6:35–7:15 | Show the projector mode, phone-size responsive layout and Experiment Room gallery. State the approval/rights boundaries. | “Which human classroom trials and editorial reviews should precede adoption?” |

**Route order:** [tour](https://antmhernandez.github.io/Interactive-Academy/#tour) → [slope lesson](https://antmhernandez.github.io/Interactive-Academy/#lesson/graph-slope-physics?tour=1) → [friction](https://antmhernandez.github.io/Interactive-Academy/#lesson/friction?tour=1) → [energy](https://antmhernandez.github.io/Interactive-Academy/#lesson/energy-conservation?tour=1) → [showcase](https://antmhernandez.github.io/Interactive-Academy/#showcase) → [applets](https://antmhernandez.github.io/Interactive-Academy/#applets).

## Specific hands-on classroom usability trials — **not yet completed**

1. **Student comprehension:** 3–5 students independently work each specimen. Before changing a slider, record their predictions. Afterwards, ask them to explain graph position versus slope, actual versus maximum static friction, and why `K+U+Q` is constant. Check whether they can set up the equivalent exercise without the model.
2. **Projector:** On the actual room projector at the back row, read every axis, dashed Δ marker, current number, unit, and the new calculations. Repeat with projector mode at typical lecture-room ambient light. Correct illegible contrast or cramped figures based on direct observation.
3. **Keyboard and AT:** Navigate from `#tour` to each `#lesson` via keyboard only; arrow-adjust sliders; record prediction; activate Connect; return to tour. Check with **NVDA + Chrome/Firefox, VoiceOver + Safari, and TalkBack + Chrome**; verify each model state can be understood without the SVG image.
4. **Physical responsive/touch:** Real iPhone Safari, Android Chrome, tablet, and laptop at 320/375/768/1024/1440 equivalents. Ensure track targets, focus outlines, numeric descriptions, tabs, and projector overlay are functional and free of horizontal clipping. Browser emulation alone is insufficient.
5. **Editorial/rights:** Independent Physics teacher proofreads equations and assumptions; classical curriculum editor judges vocabulary, prerequisite scaffolding and worked-example pacing; publishing counsel verifies rights and lack of unauthorized MP/Novare chapter alignment.

## Automated acceptance gates and unresolved issues

- CI must pass `node --check` for the new JS and test; catalog, full content/equations/curriculum/book-pathways validators; numerical engines; `test-lesson-evidence.mjs`; and five-width Chromium keyboard/route/overflow tests. See [PR #20](https://github.com/antmhernandez/Interactive-Academy/pull/20) for actual results.
- No new lessons, guided problems or curated applets: inventory remains **43 / 129 / 21**; 151 canonical concepts and 84 formula references unchanged.
- This is still a prototype. Open: hands-on assistive technologies, physical devices, comprehension data, projector legibility, rights/edition review, and independent teacher scientific peer review. Do not interpret an automated pass as evidence those trials occurred.
- Retain the earlier audits (including [#25](25_PUBLISHER_LIVE_MINI_LABS_2026-10-25.md) and [#24](24_PUBLISHER_SHOWCASE_POLISH_2026-10-25.md)) as historical release records; this audit supplements rather than retroactively overwrites their findings.

## Release verification (complete only after observed results)

- PR CI: pending independent verification.
- Merge SHA: pending.
- Post-merge `main` validation: pending.
- Post-merge Pages deployment: pending.
