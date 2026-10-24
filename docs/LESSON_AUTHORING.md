# Lesson authoring and verification

## Canonical lesson structure
Store independent original lessons in `content/lessons.json`. Each entry contains:
`id, subject, unit, title, subtitle, duration, observe, idea, visualLead, visual, example, practice, next`.
- `example.question` is a short problem prompt; `example.steps` is an ordered array of explanations, not just equations.
- `practice.prompt`, `practice.answer`, `practice.tolerance`, `practice.unit`, and `practice.hints` support a numerical browser-only check.
- `visual` selects a rigorously defined original simulator in `app.js`.
- `next` is the next concept's identifier for linked course navigation.

This format is a small proof of concept. The mature system should separate prose, mathematical expressions, independently verifiable solution data, downloadable materials, and visual model parameters.

## Instructional standards
Start by asking one clear, meaningful question. Introduce the phenomenon, then a compact, correct explanation, then a diagram that allows direct testing. Show worked examples incrementally and pause at decisions where students should think. Give hints progressively, not the answer by default. End with a student problem that tests independent understanding and a sentence about the meaning of the result.

## Verification checklist
- Physics: define the object/system, sign convention, units and assumptions; graph axes and derivative/slope meanings must agree.
- Calculus: validate limits, algebra, domains, units, signed versus unsigned accumulation and numerical approximations.
- Numerical validators: tolerance must match exact/approximate expectations.
- Accessibility: actual input labels, keyboard controls, text alternative for each diagram and high-contrast chart features.
- Mobile: no horizontal overflow, readable axis labels, tappable controls, clear navigation.
- Provenance: document original authorship, sources of numerical data and any borrowed materials privately.

## Current sample lessons
`motion-diagrams`, `acceleration`, `tangent-line`, and `riemann-sums` were newly composed for the prototype. They do not contain HLS quizzes or textbook figures. Do not infer that the entire HLS source corpus is cleared for public use.

## Future guided-note bundles
Use canonical lesson concepts to produce synchronized blank/student and teacher editions and short observation labs. Test against the actual assessments. Release dates, license rights, institutional pricing and teacher-only access are future decisions, not current site features.
