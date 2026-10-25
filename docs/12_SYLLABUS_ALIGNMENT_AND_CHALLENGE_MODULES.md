# Syllabus Alignment and Targeted Challenge Modules

**Reviewed October 24, 2026.** This is an independently written scope and instructional design reference, not a reproduction of school-owned syllabi or textbook pages.

## Source hierarchy

1. HLS **General Physics 2026–27 syllabus with at-a-glance schedule** and **Physics_Course_Planning_2026-27** (SharePoint classroom course documents) establish the intended teaching order and essential 11th-grade general Physics concepts. Historical teacher-authored materials and actual enacted lesson decisions take precedence over provisional planning when a conflict is discovered.
2. HLS **AP Calculus AB 2026–27 syllabus** and **HLS AP Calculus BC 2026–27 syllabus** define common Calculus content and the additional BC course scope. The classroom text is Larson, Hostetler, and Edwards, *Calculus*, 8th ed.
3. The official **College Board AP Calculus AB/BC course framework** is a completeness and exam-language cross-check, not a demand to replace the teacher's chosen chapter sequence. Official reference: https://apcentral.collegeboard.org/courses/ap-calculus-bc . As of 2026–27, College Board clarifications do not change the course content.
4. Research on common conceptual difficulties informs the selection of extra short challenges. For examples, the University of Washington Physics Education Group tutorials highlight interpretation across motion representations, signed acceleration, Newton's third-law force pairs and translating a free-body diagram to an actual situation: https://www.physport.org/curricula/UWTutorials/research and https://www.physport.org/curricula/UWTutorials/t/tutorial.cfm?G=N231st .

**Publication boundary:** the original syllabi, restricted course files and teacher assessments remain outside this public website. We record only short topic headings, general chapter placement and independently composed learning objectives. The source texts and existing institutional intellectual property are not copied into the student site.

## Physics: honor the actual chapter progression

| Glencoe course sequence | Core emphasis | Website ownership / submodule opportunities |
|---|---|---|
| Ch. 00 (28.1–28.2), atoms and light | historical atomic models, evidence, spectral lines, Bohr energies, photon E=hf, quantum ideas, lasers | **Atoms, Light, and Models**, with an original interactive hydrogen emission diagram and a planned energy–wavelength challenge |
| Ch. 01, Physics Toolkit | mathematics as physical language, SI units, scientific notation, dimensional reasoning, measurement, significant figures, parallax, graphs and regression | **Measurement and Scientific Models**; focused precision and graph-slope challenges |
| Ch. 02–03, motion | position and displacement, motion diagrams, average velocity, acceleration, free fall, multiple graph representations | **Motion and Kinematics**; difficult distinctions: height/slope and sign/speed |
| Ch. 04, one-dimensional forces | Newton's first and second laws, free-body diagrams, mass versus weight, normal/tension and interaction forces | **Forces and Newton's Laws**; third-law pairs and apparent weight |
| Ch. 05–06, vectors and 2-D motion | vector components, friction, inclines, projectile trajectories, circular and relative motion | **Forces** and **Motion in Two Dimensions**, with the overlap handled by prerequisite links |
| Ch. 07, gravitation | cosmological history, Kepler, inverse-square gravitational force, satellites and weightlessness | **Circular Motion/Gravitation**; inverse-square and weightlessness |
| Ch. 09, momentum | impulse, conservation, collisions | **Momentum and Collisions**; signed momentum in interactions |
| Ch. 10–11, energy | work, machine advantage, kinetic/potential energy, conservation | **Work and Energy**; system boundaries and angle between force and displacement |
| Ch. 14–15, waves and sound | period, frequency, traveling waves, wave behavior, sound, Doppler and musical resonance | **Oscillations and Waves**; particle motion versus wave propagation |
| Ch. 16–18, light and optics | light, plane/curved mirrors, refraction, convex/concave lenses and ray diagrams | **Light and Optics**; real versus virtual images, sign conventions |
| Ch. 20–23, electricity | charge, electric fields, current, circuits, series and parallel resistor networks | **Electricity and Magnetism**; current conservation versus energy transfer |

**Important:** Some previously planned general-physics extras, notably extended thermal/modern units, do not appear on the principal 2026–27 classroom schedule. They remain *enrichment*, not represented as course requirements. Our list intentionally skips chapters that the published HLS schedule does not cover.

## Calculus: shared AB/BC core and additional BC work

The student's main experience should retain one shared library of concept lessons. An AB student and a BC student should not receive different duplicate explanations of the same derivative rule.

**Shared AB/BC foundation:** functions/precalculus preparation; limits and continuity; derivatives and rules (including chain, implicit, inverse); verbal/numerical/graphical/analytic representations; derivative applications and modeling; integration and accumulation; FTC and volumes; foundational differential equations.

**Additional BC scope:** extensions to integration, Euler's method and logistic differential models, parametric/polar/vector-valued motion, arc length, and infinite sequences and series (convergence tests, power series, Taylor/Maclaurin and error). The catalog marks these as `bc-additional` rather than allowing them to interrupt an AB path.

The College Board framework groups BC into ten broad units: eight shared with AB plus parametric/polar/vector and sequences/series. We use that scope cross-check but retain the HLS/Larson conceptual sequence as the authoring basis.

## Why short challenge modules?

A four-minute visualization can isolate one stubborn misunderstanding without burdening the main lesson with six competing explanations. An available challenge has its own ID and small page, **but remains owned by the parent concept** in `curriculum/catalog.json`. It must not become a second copy of the chapter.

Initial examples now implemented:
- `slope-versus-height`, parent `average-velocity`: horizontal movement changes position while graph slope stays constant.
- `signs-of-acceleration`, parent `acceleration`: negative acceleration can increase speed when motion is toward the negative axis.
- `hole-versus-limit`, parent `limits-near-a-point`: function value is independent from a two-sided limit if nearby behavior is unchanged.

The rest of the `submodules` array records challenging future targets under their rightful lesson, with status `planned` until a student-ready page exists. Priorities include third-law pairs, significant figures, friction thresholds, cross-graph translation, related rates, chain-rule composition, signed Riemann sums, Euler step-size error, polar negative radius and series terms versus partial sums.

## Development standards

- Full lessons are a coherent, finite Back/Home/Next path. Challenges branch off one owning lesson, and must return to it; **they do not change chapter order**.
- Planned challenge metadata cannot create a broken student link or count as completed material.
- Each module has one misconception, one dominant mathematical visualization and one original independently checked question.
- Differentiation must distinguish derivative value and units from function height; integrals must distinguish signed accumulation from geometric area.
- Teacher solutions, restricted quiz/test banks and adaptations of copyrighted textbook exposition never enter a static public deployment.
- The library of available lessons and challenges must agree with the registry; CI enforces IDs, prerequisites and status.

## Immediate next review and development

1. Complete early Physics chapter support: historical atomic models and measurement/significant figures, using genuinely original illustrations.
2. Add the next teacher-prioritized concepts in Chapter 4: third-law interactions, apparent weight and tension systems.
3. Strengthen calculus limits and derivatives with a one-sided-limit applet, chain-rule composition and units-of-derivatives challenge.
4. Broaden BC only after the common core has a clean progression: Euler's method, parametric/polar curves, series and Taylor remainders.
5. Teacher review for physically correct models, mathematically sound constraints, mobile layout, and the actual HLS class sequence before interpreting the public roadmap as an official school curriculum.
