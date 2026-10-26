# 28 — Signed Accumulation and Riemann Convergence
**Publisher demo iteration:** October 26, 2026  
**Authoritative starting source:** `main` at `989d0473468752a5cc1f93e0098f82192c67c3ff` (validated PR #21).  
**This feature branch:** `feat/signed-accumulation-riemann-labs-20261026`  
**Proposed change:** [PR #22](https://github.com/antmhernandez/Interactive-Academy/pull/22). **Verify the actual merge/Actions status before treating it as live.**

## Rationale

The earlier complete `velocity-accumulation` lesson showed only **positive velocity** and the earlier `riemann-sums` lesson showed only **right-endpoint rectangles**. Those were correct as elementary special cases, but not enough to convey why integration answers different motion questions or why left, right and midpoint rules can disagree without contradicting the integral. This iteration replaces those two *existing* applets with independently authored investigations and full model-derived text, while preserving course order and problem keys.

Instructional sequence remains **predict → manipulate → inspect numerical evidence → explain → cumulative worked example → concept check → independent practice → three graduated problems**. The student is never asked to infer mathematics from a decorative graphic alone.

## 1. Signed velocity–time accumulation · `#lesson/velocity-accumulation`

### Two original mathematical models

**Forward-only cart:** `v(t)=3+t` metres/second for `0≤t≤5` seconds. Here `v(t)>0`, so displacement equals distance:
```text
Δx = ∫₀ᵀ(3+t)dt = 3T + T²/2 metres.
At T=2s: v(0)=3m/s; v(2)=5m/s; trapezoid area = (3+5)/2×2=8m.
```

**Reversing cart:** `v(t)=6−2t` m/s. The line crosses the time axis at **t=3s**. Integrating gives
```text
Δx(T) = ∫₀ᵀ(6−2t)dt = 6T−T² metres.
Positive signed area P(T) = Δx(T), when T ≤ 3, or 9m for T > 3.
Negative signed area N(T) = 0, when T ≤ 3, or Δx(T)−9m for T > 3.
Net displacement = P+N; total distance = P−N = ∫₀ᵀ|v(t)|dt.
At T=5: P=9m, N=−4m, net displacement=+5m, distance=13m, final v=−4m/s.
```

**Finite rectangle estimates:** With n equal time slices `Δt=T/n` and left/right sample `tᵢ`, the sum `Σv(tᵢ)Δt` gives approximate signed displacement, **not** a second exact integrand. For a linear velocity `v(t)=b+mt`, the exact error is:
```text
right sum − exact integral = +m T²/(2n)
left sum − exact integral = −m T²/(2n)
```
For the reversing cart at T=5 and n=4, `m=−2` and errors are **+6.25m left**, **−6.25m right**. Thus the left sum is **11.25m**, right sum **−1.25m**, despite exact displacement +5m. This is pedagogically useful: a coarse rectangle model can assign too much weight to one side of a crossing, making endpoint selection *visibly consequential*. Avoid suggesting that a coarse sample sum is guaranteed to have the correct sign.

The visual displays graph axes and tick labels, the exact positive/negative signed regions with distinct fills, outlined sampled rectangles on the correct side of the zero axis, an end-time marker, exact displacement, total distance and approximation error. Separate written calculations (including units) and a non-color-only description accompany the SVG. Time may be zero; this correctly gives zero width, zero area and zero displacement without division by zero.

### Student misconception to test

A cart which goes forward 9m and backward 4m has **traveled 13m**, but its **net displacement is +5m**. The graph's vertical height means velocity (m/s), and graph area is velocity × time (metres): not location, not acceleration. Negative area denotes direction, not “negative distance.” The existing checkpoint about constant −3m/s for 2s stays valid and becomes better supported.

## 2. Three sampling methods for Riemann sums · `#lesson/riemann-sums`

Exact nonnegative model: `y=x` over `[0,4]`. The geometric region is a triangle of exact area `8` square units. For `n` equal intervals, `Δx=4/n`. Using `Σf(xᵢ)Δx`:
```text
Left endpoints:    Lₙ = (4/n)² Σ(i), i=0,...,n−1 = 8−8/n.
Right endpoints:   Rₙ = (4/n)² Σ(i), i=1,...,n   = 8+8/n.
Midpoints:         Mₙ = (4/n)² Σ(i+1/2), i=0,...,n−1 = 8.
Signed errors:     Lₙ−8 = −8/n, Rₙ−8 = +8/n, Mₙ−8 = 0.
```

| Number of rectangles | Left sum | Midpoint sum | Right sum |
|---:|---:|---:|---:|
| 2 | 4 | 8 | 12 |
| 4 | 6 | 8 | 10 |
| 8 | 7 | 8 | 9 |
| 16 | 7.5 | 8 | 8.5 |
| 32 | 7.75 | 8 | 8.25 |

The graphical sampler chooses left, midpoint or right and `2 ≤ n ≤ 32`. A **Double rectangles** button halves widths when possible, up to 32. The visible five-row table gives a side-by-side convergence comparison even when a student cannot see, perceive the colors of, or enlarge the SVG; a complete plain-language diagram description is attached with `aria-describedby`.

**Scope caveat:** midpoint is exactly correct for **this straight line**, not for arbitrary curved functions. The previous focus incorrectly risked reducing all Riemann sums to a “right-endpoint overestimate”; the rewritten definition now correctly introduces sampling as a choice.

## Interface, literature and rights audit

- The new original `applets/accumulation-labs.js` holds **two pure state functions**, `velocityAccumulationState` and `riemannLinearState`, used by both drawing and derivation via `applets/lesson-evidence.js`. No copy-and-paste mathematical formula in a separate visualization engine.
- Controls are keyboard-accessible native ranges or semantic `aria-pressed` buttons. Results appear in selectable, ordinary DOM text. The graph is a scoped scroll region rather than expanding the entire phone layout. There are visible line/region labels, unit-bearing outputs, visual focus outlines, and enlarged presentation mode text. Avoid chatty live regions during slider adjustment.
- A student records a prediction before the conceptual answer is unlocked by a subsequent model change. The model remains freely usable. The proof is available in the cumulative **Example** steps and three guided solutions; independent answers retain numeric validation.
- Arithmetic is performed without intermediate display rounding; UI readouts use up to four decimal places. The exact mathematical region can differ substantially from a finite sum; the interface labels both distinctly. The diagram uses separate axis scales, so **do not** measure “area” by counting screen pixels.
- The independent **Glencoe-indexed** Physics course sequence remains required Chapters **1–7, 9, 10–11**, optional Chapter **8** rotation and **28** atomic spectroscopy, optional collisions synthesis. **No authorized Memoria Press/Novare alignment** has been established.
- All diagrams, teaching text, equations and layouts are original. Memoria Press has **not commissioned, approved or endorsed** the project. No proprietary publisher covers, text, exercises, typefaces or visual branding have been copied.

## Suggested five-minute supplementary live demonstration

1. **0:00–0:40** Open [Area Becomes Displacement](https://antmhernandez.github.io/Interactive-Academy/#lesson/velocity-accumulation). Ask “What does a negative region mean? Does it make the distance traveled negative?” Hold the prediction.
2. **0:40–1:40** Show positive forward `v=3+t` at `T=2`: exact displacement and distance both **8m**. Switch to reversing `v=6−2t`; extend `T` to 5. Contrast **+9m** forward, **−4m** backward, **+5m** net, **13m** distance, using explicit units.
3. **1:40–2:25** At `T=5`, `n=4`, compare left and right sample rectangles: **11.25m** vs **−1.25m** estimates for the *same* exact 5m displacement. Increase `n` to show shrinking bias. Make the approximation/exact distinction verbal.
4. **2:25–3:55** Open [Discovering Area with Rectangles](https://antmhernandez.github.io/Interactive-Academy/#lesson/riemann-sums). With `n=4` read **6** left, **10** right, **8** midpoint, compare with exact triangular area **8** square units. Double `n` and read convergence table. Ask why midpoint is special *for a line*.
5. **3:55–5:10** Record a student prediction; manipulate a control; reveal the model-specific, readable derivation. Show four cumulatively revealed steps and the three original graded practice questions. Ask whether students could independently distinguish signed area, distance, underestimation and overestimation.

## Regression tests and release gates

- `scripts/test-accumulation-labs.mjs`: **200 velocity scenarios** (2 laws × 10 end times × 5 rectangle counts × 2 sample endpoints), **93 Riemann scenarios** (31 counts × 3 sample rules), explicit reversal and invalid-input guards. Verify model identities, true distance, signed positive/negative areas, exact finite rectangle bias and sampled coordinates.
- `scripts/test-browser.mjs`: automated functional browser at **320, 375, 768, 1024, 1440 px** exercises the calculations, switching direction, reversal, keyboard controls, prediction unlocking, SVG descriptions, full-unit outputs, all three samplers, convergence table and whole-document overflow. Historical publisher demo, unrelated lessons and curriculum tests must remain green.
- Full CI includes `scripts/validate.mjs`, original curriculum/prerequisite validations, physics tests, print/book portal and the five-width Chromium suite.
- **Merge only after final-head PR Actions success. Then independently confirm `main` Actions and Pages deployment success for the *same* new merge SHA.** Record the true final release receipt in the PR comment rather than assuming CI passed.
- **Inventory intended unchanged:** 43 complete lessons, 129 graduated problems, 21 curated original applets, 151 curriculum concepts, 22 units and 84 physics equation entries. Validate counts against source and Actions, not this prose.

## Remaining human acceptance

Hands-on Safari/iOS, Android, NVDA/VoiceOver/TalkBack, actual projectors and student trials have **not occurred here**; neither has independent physics/math editorial review or formal Memoria Press review. Automated browser and algebra tests are valuable but not proof of classroom comprehension, commercial rights or production readiness. Favor a two-student comparative trial: request verbal explanation of 13m distance versus 5m displacement and left-versus-right errors without revealing the model's conclusion first.

See [audit #27](27_TWO_SIDED_DERIVATIVE_LAB_2026-10-26.md) for the preceding derivative-model proof, and [next-chat handoff](NEXT_CHAT_PROMPT_PUBLISHER_ITERATION_2026-10-26_SIGNED_AREA.md) for the follow-on iteration.
