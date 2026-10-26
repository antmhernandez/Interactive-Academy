# 25 — Publisher Live Mini-Labs: Pedagogy, Mathematical Audit, and QA
**Date:** October 25, 2026
**Authoritative source:** `main` after approved CI and merge. **Feature branch:** `feat/publisher-live-mini-labs-20261025`.
**Tour:** https://antmhernandez.github.io/Interactive-Academy/#tour

## Purpose
The original curated tour presented attractive static specimen images while telling the reviewer to adjust a control in a separate lesson. This iteration makes that first publisher encounter a real learning interaction without adding lessons or introducing publisher-owned materials. Each of the three stops now makes the question visible **before** the controls, updates SVG and numerical measurements from the visitor's choices, and withholds the explanatory statement until manipulation. A clear link leads to the entire canonical lesson, with worked example, misconception check, independent response, and three graduated problems. The current tour stop is retained on a same-page session return from the lesson.

## Three compact original investigations
1. **Graph slope:** An exact drawn parabola for `x(t)=1+t²` meters, `0 ≤ t ≤ 4 s`. First secant endpoint at `t=0`; second selectable from `1` to `4 s` in half-second increments. The displayed `Δx=t² m`, `Δt=t s`, and `v_avg=Δx/Δt=t m/s` are coupled numerically and graphically. The secant, endpoints, run and rise are visible. The graph's *height* is position, not its slope.
2. **Contact forces:** Initial rest on a horizontal floor with `m=5 kg`, `g=9.8 m/s²`, `μs=0.50`, `μk=0.30`. The normal force is `49 N`, maximum static friction `24.5 N`, kinetic friction `14.7 N`. At applied pull `0–24.5 N`, actual static friction matches the applied pull, acceleration zero; if the applied pull exceeds `24.5 N`, the onset-of-slip branch uses kinetic friction and `a=(F−14.7 N)/5 kg`. The lab depicts *onset from rest*, not the subsequent history of motion, and force arrows are directional rather than scaled.
3. **Ramp and energy:** The mini-lab delegates every energy calculation to the **existing full-lesson `energyRampState`** model, fixing `m=2 kg`, `H=5 m`, `v₀=0`, `θ=35°`, and switching `μk` between `0.20` and `0`. Users scrub the distance fraction `0–100%`. At any position, `K+U+Q=98 J`, where `Q` is mechanical energy transferred into thermal surroundings, not a disappearing term. The compact SVG now draws the ramp at the stated nominal angle. The physics assumptions and limits are identical to the full model.

## Visual/editorial choices
- Professional independent parchment/navy/burgundy/teal/gold presentation preserved. No Memoria Press logo, cover, trademark-derived branding, font, protected text, illustration, or assignment copied.
- The tour makes its three phases explicit: **01 Predict → 02 Manipulate → 03 Connect**, and preserves an obvious continuation to the *real* lesson.
- Labels, SVG alt descriptions, track controls, numeric units, visually distinct energy quantities, `aria-pressed` friction comparison and keyboard-operable native range inputs are included.
- Conclusions stay hidden until a control is changed. The live numbers are visible from the outset to support comparison and mathematical checks; response to changes uses normal DOM text instead of announcing a large live region at every slider step.
- Viewport-specific CSS supports narrow screens and reduced motion; no speculative changes to the canonical lesson registry, textbook pathway ordering, or grade/book mapping.
- Separate small `applets/tour-labs.js` avoids inflating the router and reuses the proven energy engine.

## QA contract
CI syntax-checks the new tour module, runs unchanged catalog/curriculum/lesson/equation/physics checks, and exercises real Chromium UI across **320, 375, 768, 1024 and 1440 px**. New browser assertions change the slope slider by **keyboard** and verify the numeric slope and hidden-to-revealed connection; cross the friction static threshold and verify kinetic friction/acceleration; scrub the energy ramp, verify conserved `98 J`, and compare zero friction. They also check navigation and return to the same tour stop, existing applet gallery filters, and horizontal overflow. Verify the actual CI status rather than treating this document as evidence of completed testing.

## Known limitations and next checks
- This is a three-stop demonstration, not a full textbook course, teacher dashboard, learning analytics service, or formal assessment of student understanding.
- Tour force arrows are schematic and its threshold is fixed for the sample; all four variables remain adjustable inside the complete lesson.
- The tour only exposes a *secant* comparison, not an instantaneous derivative proof; the complete graph-slope and Calculus lessons provide the appropriate conceptual continuation.
- The ramp draws a fixed geometric sample but the underlying height and motion are represented mathematically by the main engine. Friction here is idealized constant kinetic friction and does not imply a real object slows in absolute speed while going downhill.
- Screen reader announcements, touch target dimensions, color contrast, actual iOS/Android Safari, VoiceOver/NVDA, and projected-room readability still require hands-on QA, even after Chromium passes.
- Publisher-specific edition/chapter/page/assignment links remain illustrative and must receive explicit source verification and authorization.
- An ideal next session should refine keyboard and spoken diagram equivalents on the **full** lesson pages, teach students to identify evidence before viewing the explanation, and conduct an editor-led check of numeric/scientific precision. Avoid bulk expansion until the representative experience passes human testing.

## Release verification (complete after CI and merge)
- PR: to be recorded.
- PR validation run: to be recorded.
- Merge commit: to be recorded.
- Final `main` validation and GitHub Pages deployment: to be verified independently.
