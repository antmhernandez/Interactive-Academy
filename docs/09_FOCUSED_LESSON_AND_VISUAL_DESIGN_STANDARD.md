# Focused Lesson and Visual Design Standard

**Status:** Provisional governing standard for the Interactive Academy pilot (2026-10-24). Review before expanding the curriculum.

## The one-screen promise

Every topic should immediately show:
1. **Navigation in a consistent place**, at the upper left: Back, Home, Next. The first and final lessons return to a subject index as needed.
2. **One strong title** (large, meaningful, and specific) and a brief subtitle describing what the student will understand.
3. **A large interactive diagram, experiment, or example**, visually dominant over prose. Make the student's first action obvious.
4. **A short “Notice” cue** naming exactly which line, angle, value, motion, or relationship deserves attention.

Do not begin with long expository paragraphs. The mathematical or physical object is the center of the lesson.

## Progressive explanation

The visually prominent interactive remains visible. Below it, provide one active pane at a time:
- **The idea:** a concise conceptual explanation with the essential definition or equation.
- **Example:** one problem, shown step by step at a natural pace.
- **Think:** a conceptual question with plausible wrong choices and feedback addressing misconceptions.
- **Try it:** an independent problem with optional graduated hints.

In this version, those panes use tabs. Their controls must work by touch and keyboard, with accurate ARIA selection and hidden-state behavior. Avoid long pages requiring students to scroll past all four activities.

## Use of color

Color conveys meaning, not decoration. Use a consistent small palette:
- Teal for primary measured object, curve, or quantity.
- Amber for a moving point, secant, selected time, or variable under investigation.
- Green for derived geometric objects (such as the tangent).
- Violet for tertiary related functions (for example acceleration in a three-graph display).

Use a **diagram-specific legend** where there are multiple named visual elements. A student must be able to tell the elements apart without color alone: labels, shapes, line styles, position, and accompanying text should support interpretation. Avoid excessive saturated decoration or competing colored cards.

## Student-facing language

Aim for:
- title of about 2–7 words;
- subtitle of one concise sentence;
- direction of one short imperative or question;
- “Notice” cue naming the exact learning relationship;
- essential explanation of two to four short sentences when possible;
- worked solutions broken at meaningful reasoning decisions.

Prefer ordinary, natural classroom English. Technical terms and equations belong where they are required. No generic production language, vague education jargon, or dense lecture paragraphs.

## Originality and fidelity

Preserve genuine physics and mathematics, not merely what makes an attractive animation. Diagrams must match the equations, including signs, coordinates, units, time bounds, physical assumptions and scaling. Practice answer keys, visual cues and misconceptions must agree. Historical and textbook-related explanations require independent review. Do not lightly paraphrase protected textbook prose or upload HLS assessments without permission.

## Mobile requirements

The **Back / Home / Next** controls remain in the same relative position and remain tappable at 320–430 px. Title wraps cleanly. The interactive diagram stays readable, with controls below it and at least 42 px target height. Tabs must not require horizontal scrolling. All content must work without hover, without a login, and without paid inference calls. Respect reduced-motion preferences.

## Lab and specialized applets

A specialized tool such as Motion Data Lab follows the same page header:
- the primary graph or experiment is visible immediately;
- only the most relevant controls and coefficients are initially shown;
- raw data entry, residuals, experimental assumptions and downloadable output can live in clearly labeled, expandable sections;
- keep uncertainty, residuals, and model limits available rather than omitting them in pursuit of simplicity.

External simulations such as PhET must not be bundled without the appropriate commercial permissions. Original browser-rendered SVG/canvas simulations remain the default.

## Release checklist

- [ ] Navigation appears where expected on desktop and mobile.
- [ ] One main visual commands attention; most prose is optional.
- [ ] Text is concise and correct; topic, subtitle, and visual are aligned.
- [ ] Color labels and focus cue agree with actual rendered diagram colors.
- [ ] Tabs, sliders, answer input, hints and completion operate correctly.
- [ ] Review keyboard tab order, mobile touch sizes, print styles and screen-reader labels.
- [ ] No proprietary source or teacher-only material is accidentally public.
- [ ] Run GitHub Actions and conduct a hands-on browser review before announcing a production release.
