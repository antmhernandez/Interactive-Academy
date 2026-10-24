# Motion Data Laboratory — instructional specification and review guide

**Status:** Original pilot, subject to teacher review and mobile/browser user testing.

## Purpose
Help students progress from measured position to graphical representation, mathematical modeling, coefficient interpretation, and judgment about experimental evidence. Designed for introductory physics and to reinforce the calculus interpretation of derivatives.

## Student workflow
1. **Predict** which pattern should produce a line or a curve.
2. **Record** at least two distinct time-position pairs for a line or three for a quadratic. Students may select an ideal example, a measurement-like dataset, enter values or paste two numerical columns.
3. **Compare** a linear x=A+Bt or quadratic x=A+Bt+Ct² least-squares fit.
4. **Inspect** observed points, model curve, residual plot and residual size.
5. **Explain** A (position at t=0), B (velocity at t=0) and, for the constant-acceleration model, a=2C. Explain the units and model's limitations.
6. **Submit** a printed result or CSV together with their own reasoning, not a calculator value alone.

## Why these particular models?
For one-dimensional motion with constant velocity, x(t)=x₀+vt. For one-dimensional motion with constant acceleration, x(t)=x₀+v₀t+½at². This is a physical model under explicit assumptions, not a generic claim that all motion is linear or quadratic. In the quadratic fit, A estimates x₀, B estimates v₀ and 2C estimates a. If no measurement is made at t=0, A and B are extrapolated estimates.

## Fit and diagnostics
- All fitting happens on the student's device via Householder QR decomposition of a centered/scaled design matrix; no third-party numerical API is needed.
- Duplicated times are rejected. Linear fit requires 2 distinct times; quadratic requires 3. Input and count limits protect responsive browser operation.
- Fitting returns predicted positions, residuals (observed minus fitted), RMS residual, and R² where defined.
- R² may be undefined for constant-position data. The tool does not claim that R² proves a physical law. With exactly as many points as coefficients, an exact fit is not independent confirmation of the model.
- The tool does not estimate measurement uncertainties, confidence intervals, significant-figure correctness, outliers, air resistance or changing acceleration. Students must evaluate these separately.
- CSV export contains only locally entered time/position and model results. There is no network request to upload experiment data.

## Accessible teaching
- Each numerical field has a label, graphs have accessible names, and the fitted equation and values are also provided in text.
- Pasting a header is optional and original spreadsheet measurements are not sent to our servers.
- Navigation and controls should be tested at phone widths and with keyboard-only operation before public release.

## Further research and engineering
- Add an optional uncertainty model and units other than SI only if properly checked.
- Compare matched velocity–time and acceleration–time graphs derived from the fitted quadratic.
- Add carefully defined conceptual diagnostics for slope, derivatives, area under velocity and experimental residuals.
- Explore teaching-oriented TI-84 regression walkthroughs using our own screenshots and written instruction; do not distribute proprietary calculator firmware or pretend our graphing tool is TI's official emulator.

## Source and licensing boundary
All sample equations, exercises and plots were written for this prototype rather than copied from textbooks or the private HLS Teaching source archive. The source archive's governed materials remain private pending employer/publisher rights review. No student names or grades should be pasted into this demonstration.

## Release acceptance
A teacher independently checks the mathematical interpretation, printed worksheet, sample datasets and misleading edge cases. Verify full browser behavior (including CSV and print) on one current desktop browser and one smartphone browser before public launch.
