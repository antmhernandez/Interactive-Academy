# Lesson authoring and verification

## Canonical lesson structure
Store independent original lessons in `content/lessons.json`. Each entry contains:
`id, subject, unitId, unit, title, subtitle, duration, observe, idea, visualLead, visual, example, practice, checkpoint, next, focus`.
- `example.question` is a short problem prompt; `example.steps` is an ordered array of explanations, not just equations.
- `practice.prompt`, `practice.answer`, `practice.tolerance`, `practice.unit`, and `practice.hints` support a numerical browser-only check.
- `visual` selects a rigorously defined original simulator in `app.js`.
- `checkpoint` is one independently written conceptual question with `choices`, a zero-based `correct` index, feedback matching each choice, and a careful explanation. The check is meant to reveal understanding rather than test a routine numerical calculation.
- `next` is the next concept's identifier for linked course navigation, or `null` for the final lesson in the subject path.

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
Thirteen interactive samples are now present. The initial motion/derivative/integral collection included: `position-displacement`, `motion-diagrams`, `average-velocity`, `acceleration`, `free-fall`, `motion-graphs`, `tangent-line`, `velocity-accumulation`, and `riemann-sums`. All are newly composed demonstrations rather than HLS assessment reproductions. They do not contain HLS quizzes or textbook figures. Do not infer that the entire HLS source corpus is cleared for public use.

## Future guided-note bundles
Use canonical lesson concepts to produce synchronized blank/student and teacher editions and short observation labs. Test against the actual assessments. Release dates, license rights, institutional pricing and teacher-only access are future decisions, not current site features.

## Learner progress
The prototype records only a set of completed lesson identifiers in browser local storage (`learning-atlas-completed-v1`). It does not synchronize across devices, identify students or send progress to a remote server. This does not constitute a parent/teacher gradebook. The progress feature should be reevaluated before collecting any student information or adding authenticated accounts.

## Concept check standards
Include at least two plausible wrong answers grounded in common student misunderstandings, not frivolous distractors. Do not reveal the correct choice on first load. Feedback should identify the misunderstanding, not merely announce right/wrong. Only show the full explanation after the student answers correctly. Never require a login for the free conceptual preview.

## Experimental data tools
The new `lab/motion.html` page and `lab/regression.mjs` separate interactive data entry from tested numerical fitting. Follow `docs/08_MOTION_LAB_TEACHING_AND_QA.md` before adding statistical claims or physical models. Differentiate measured observations from model predictions and avoid automatically treating a high R² as proof of constant acceleration.

## Canonical curriculum registry
Before authoring, check `curriculum/catalog.json` for the existing concept owner, prerequisite topics, and unit. Every available lesson's `id`, `unitId`, `unit` and title must match its registered topic. The catalog is also the single source of resource links; put supporting student printables in its `assets` list with one canonical owner. Planned topics never appear as broken lesson links. See `docs/10_CURRICULUM_ARCHITECTURE_AND_OWNERSHIP.md`.

## Expanded lessons
The new pilot builds force components, free-body diagrams and Newton's second law as distinct successive Physics concepts, plus a Calculus limit applet with an omitted point. Each receives an original visualization, example, practice and reasoning check. Do not duplicate the core applet in later lessons—link to it and apply the knowledge in new contexts.
