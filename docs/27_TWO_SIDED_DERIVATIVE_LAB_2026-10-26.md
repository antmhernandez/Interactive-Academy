# 27 — Calculus Two-Sided Limits: Original Model, Mathematical QA and Publisher Teaching Script

**Date:** October 26, 2026  
**Base:** `main` at `d9b513d462ad9d95c015ee3fb037b9a8ba62c5e5`, previous merged PR #20.  
**Current work:** [PR #21](https://github.com/antmhernandez/Interactive-Academy/pull/21). Its branch is not authoritative until merged and validated.  
**Complete student route:** https://antmhernandez.github.io/Interactive-Academy/#lesson/tangent-line

## Intent

A tangent line must be grounded in a **limit of secant slopes**, not merely in two animated lines appearing to coincide. The previous original quadratic renderer used only positive `h`, gave two slope totals, and could leave students thinking `h = 0` should be substituted into the quotient. This pass makes the two-sided nature of the derivative explicit, gives the actual coordinate differences and numeric convergence, and preserves a deliberate transition from student prediction to mathematical justification.

This is a refinement of one **existing** complete Calculus lesson, not a new lesson, syllabus requirement, third-party visual asset, publisher correlation or uncontrolled content expansion.

## Exact mathematical model and independent derivation

For dimensionless `f(x) = x²`, fixed base point `a`, and a **nonzero signed** separation `h`:

```text
A = (a, a²)
B = (a+h, (a+h)²)
Δx = h
Δf = (a+h)² − a² = 2ah + h²
secant slope = Δf/Δx = (2ah+h²)/h = 2a+h, only for h ≠ 0
left secant at magnitude d>0: 2a−d
right secant at magnitude d>0: 2a+d
lim (h→0−) secant = lim (h→0+) secant = 2a
derivative f′(a) = 2a
signed secant minus derivative = h; absolute error = |h|
```

The model never offers `h=0` as a selectable secant. Instead, the native keyboard-operated separation range selects five nonzero magnitudes: **1, 0.5, 0.25, 0.125, 0.0625**. The signed direction is a pair of accessible `aria-pressed` buttons. The fixed `a` slider is `−1.4 ≤ a ≤ 1.4` in tenths. All available combinations have two distinct real graph points and finite mathematical values.

**Examples audited:**

| a | signed h | A | B | Δf/h | f′(a) |
|---|---:|---|---|---:|---:|
| 1 | +1 | (1,1) | (2,4) | 3 | 2 |
| 1 | −1 | (1,1) | (0,0) | 1 | 2 |
| 1 | −0.25 | (1,1) | (0.75,0.5625) | 1.75 | 2 |
| −1 | −0.25 | (−1,1) | (−1.25,1.5625) | −2.25 | −2 |
| 0 | ±0.0625 | (0,0) | (±0.0625,0.00390625) | ±0.0625 | 0 |

The table separately displays the left and right approximations at each of the five magnitudes, so the limiting agreement can be **read without reliance on colors or an animated convergence illusion**. Computation uses full JavaScript floating-point results; **display** rounds at most five decimals, not intermediate arithmetic. Visual coordinate axes use different pixel-per-unit scales and are therefore not intended for reading slopes by measuring on-screen line angles.

## Pedagogical and interface changes

1. The existing `#lesson/tangent-line` now exposes an **investigation prediction above the model**: will approaching from opposite sides yield the same limiting slope? The separate full-lesson evidence workbench records a testable hypothesis and requires a subsequent control change before showing its conclusion.
2. New original `applets/derivative-lab.js` provides the pure `derivativeSecantState` engine and renderer. Both the plot and the plain-language evidence call the **same** pure state function. The plot includes axes and numeric scales, the upward-opening parabola, labeled points A/B, solid secant, dashed limiting tangent and rise/run geometry; a text legend distinguishes line styles as well as color.
3. The model reports **signed** horizontal change `h`, signed `Δf`, secant `Δf/h`, derivative `2a` and their signed difference; the prose states coordinates and writes out the actual difference quotient with numeric substitutions. When the fixed point becomes negative, the derivative and secants become negative despite positive quadratic heights.
4. The five-row accessible convergence table has `caption`, row and column headers, both approaching sides and highlighting for current magnitude.
5. Native range and button keyboard controls, unit-bearing `aria-valuetext` where appropriate, an SVG `aria-describedby` description and a scroll-contained SVG graph prevent dependence on minuscule phone labels. On small phones the graph and table scroll *inside their bounded regions*, without widening the whole page. A visual focus style shows the scroll region; a separate readable evidence block gives all numerical content without horizontal exploration. Projector mode enlarges prose.
6. The existing lesson's worked example now actually evaluates two secant sequences at `a=3` to derive `f′(3)=6`; independent practice and all three graduated solutions explicitly use a nonzero-h difference quotient before taking the two-sided limit. The earlier unnatural unit `slope` has been removed for this dimensionless mathematical example. All keys and tolerances remain the same.
7. The original conceptual check remains, reinforces that *the horizontal distance approaches zero* rather than the function value or the slope, and distinguishes the limiting value from an undefined zero-denominator quotient.

## Accessible reasoning and remaining uncertainties

A mathematical text description is associated with the SVG; slider readouts use native outputs and exposed value text, but **do not continuously broadcast lengthy live regions** during range adjustment. Buttons indicate pressed state. All essential arithmetic can be read in ordinary text without seeing a plot.

An automated Chromium pass at five widths is **not** a physical assistive-technology evaluation. Check NVDA + Chrome, VoiceOver + Safari and Android TalkBack with the directional buttons, 5-level range, SVG description, table, recorded prediction and stepwise proof. Specifically verify that returning from the `#tour` does not strand keyboard focus and that the internal chart scroll region can be traversed without accidentally changing the slider.

## Publisher mini-presentation (approximately 3 minutes; supplement to the original seven-minute Physics script)

| Segment | Presenter action | Ask audience |
|---|---|---|
| 0:00–0:40 | Open [tangent lesson](https://antmhernandez.github.io/Interactive-Academy/#lesson/tangent-line). Read the prediction aloud **before changing controls**. | “Can one number describe a curve's slope at a single point?” |
| 0:40–1:30 | At `a=1`, try the right `h=+1` secant (slope 3). Press left `h=−1` (slope 1). Progressively halve the magnitude; compare the two columns of the table. | “Why do both approaches move toward 2, though neither starts at 2?” |
| 1:30–2:15 | Set `a=−1`, show negative tangent slope while the quadratic's height stays positive. Contrast slope with function value. Record a prediction and unlock the conceptual connection. | “How can an upward-opening curve have a negative tangent slope?” |
| 2:15–3:05 | Open the **Example** tab; reveal the four cumulative algebra steps. Open Guided Practice for Begin/Extend/Challenge, pointing out the `h ≠ 0` cancellation and `h → 0` limit. | “Which algebraic step explains the pictures—and would a student solve the next problem unaided?” |

## Regression and release gates

- **Pure numerical tests:** `scripts/test-derivative-lab.mjs` tests seven base points × five magnitudes × two directions; verifies difference quotient equals `2a+h`, symmetric convergence, negative slopes and a zero-denominator input guard.
- **Browser tests:** `scripts/test-browser.mjs` exercises `#lesson/tangent-line` at **320, 375, 768, 1024 and 1440px**: accessible direction state, positive/negative slopes, keyboard slider and halve button, evidence text, recorded prediction, explanation reveal/reset, no whole-page horizontal overflow, tab and cumulative solution steps.
- **Complete existing suite:** syntax, 43-lesson catalog and full resource validators, canonical curriculum/prerequisite/textbook-portal checks, physical model tests and other original applet/browser checks must remain green in `.github/workflows/validate.yml`.
- **Publication threshold:** verify PR Actions success **before merging**; then verify independent `main` validation and GitHub Pages deployment against the exact squash-merge SHA. Document actual observed status in PR release comment.
- **Inventory:** 43 complete lessons, 129 graduated numerical problems, 21 original Experiment Room investigations, 151 canonical curriculum concepts and 84 physics equation entries; no required Physics chapter ordering or optional enrichment flags changed.

## Open human/editorial work

1. Genuine student trial with both approaching directions and independent algebraic explanation. Do not conflate attractive applet usage with proof of learning.
2. Physical iOS and Android touch ergonomics; NVDA, VoiceOver and TalkBack comprehension of table and changing SVG text; actual classroom projector legibility.
3. Further refinement of Physics and Calculus after actual classroom feedback, rather than indiscriminate page expansion.
4. Publisher counsel, subject editor and rights review. Memoria Press has **not** approved, commissioned or endorsed this independent concept; do not invent edition-specific Novare/MP mappings or copy protected content.

Historical audits [#26](26_FULL_LESSON_EVIDENCE_ACCESSIBILITY_2026-10-25.md), [#25](25_PUBLISHER_LIVE_MINI_LABS_2026-10-25.md) and [#24](24_PUBLISHER_SHOWCASE_POLISH_2026-10-25.md) remain intact. New full handoff goes in [NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-25.md](NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-25.md).
