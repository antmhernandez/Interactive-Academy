# Curriculum Architecture: One Concept, One Owner

**Status:** Working project governance (October 24, 2026). This document governs new Physics and Calculus curriculum work after the interactive pilot.

## The three sources of truth

| File | Owns | Must not own |
|---|---|---|
| `curriculum/catalog.json` | Subject/unit sequence, topic IDs, canonical concepts, prerequisites, planned vs available status, cross-course bridges, registered assets and next-build priorities | Finished student prose or answers |
| `content/lessons.json` | Fully implemented **available** student lessons, their examples, question feedback, practice keys, graphics selection, concise headings and teaching cues | Backlog topics, unapproved assessment banks, copies of textbooks |
| `scripts/validate-curriculum.mjs` | Automated consistency rules that keep roadmap, lessons, prerequisites, and assets in agreement | Editorial judgment or copyright permission |

Never create the same concept as two independent lessons merely because it appears in two courses. For example: *average velocity as a secant* is owned by `average-velocity` (Physics); *derivative as a tangent-limit* is owned by `tangent-line` (Calculus). The catalog's `connections` explain the bridge. Lessons can briefly review each other's results and link to the concept owner, but should not duplicate the core interactive applet, explanation, or graded question bank.

## Identity, ownership, and status

Every topic has an immutable slug `id`, human title, `owns` concept key, one canonical `unit`, one short teaching `goal`, `prerequisites`, and `status`:
- `planned`: reserved topic; visible in the Course Map only; no lesson link.
- `available`: a working student lesson exists in `content/lessons.json`. It is **not** a claim of commercial licensing, school authorization, or full editorial approval.

A topic can own **one primary concept**. Concept keys must be unique. If a proposed topic duplicates a concept key or another topic's learning goal, develop it as an example, extension, classroom demonstration or asset under the existing owner—not a second competing lesson. If truly different, define a clear new learning goal and test a student can tell why each exists.

Every available lesson must supply a matching `unitId`, `unit` title, subject, and exact topic title. The order of available lessons per subject must match the catalog order. The site's Next/Back chain must agree with that order.

## Prerequisite graph

Prerequisites name canonical topic IDs, not loose page names. The validator rejects:
- unknown topic or unit IDs;
- duplicate IDs or duplicate `owns` concepts;
- self-prerequisites and cyclic prerequisites;
- public available lessons depending on unfinished planned concepts;
- mismatched unit/title/status between source files;
- lesson ordering that contradicts the curriculum map.

Planned topics can depend on other planned topics. Teachers may revise the order before a topic is released. Progress from introductory representation to application. Do not impose BC-only methods on students before the common AB foundations are introduced.

## Content asset register

`catalog.assets` assigns **one owner** to every public worksheet, interactive experiment, lab report, or guided notes file. Reuse the asset from other lessons by link; do not copy it under a different filename with slight alterations. The validator ensures all registered public assets have an owner, unique path and existing file.

For *new* resources:
1. Confirm the concept owner and that the new resource solves a genuine learner need.
2. Create an independently authored student worksheet, lab, original applet, or similar file.
3. Register its `id`, `label`, `path`, `owner`, `kind`, `visibility`, and `origin`.
4. Connect it to the site through the registry; do not hardcode a second list of downloads.
5. Check the worksheet's questions, answer keys, units, diagrams, figure rights, print layout and relevance.

Do not store teacher solutions, paid assessment answers, student information, secrets, or classroom-only copyrighted content anywhere deployed to public GitHub Pages. A static site cannot enforce a teacher-only folder by hiding links.

## Suggested folder boundaries

```text
curriculum/catalog.json         # global scope; planning + release metadata
content/lessons.json            # available original lessons only
app.js, styles.css              # focused site template and original diagrams
lab/                            # experimental tools, each asset registered once
materials/                      # public approved student printables only
docs/                            # governance, pedagogy, source rights, roadmap
scripts/                         # quality gates and numerical model tests
.github/workflows/               # run all checks on every PR
```

Future growth can split `content/lessons.json` by subject or topic, but only after preserving one canonical ID and a generated or validated index. Do not create redundant, independently maintained catalogs for lessons, links, unit order, and resources.

## Editorial workflow for each addition

**Propose → classify → author → review → test → make available.**

1. **Find the topic's canonical slot.** Search the catalog for the concept and related learning goal before inventing a new ID.
2. **Check predecessors** and decide whether the learner has what the new lesson assumes. Write or link a short review instead of silently repeating an earlier unit.
3. **Define one success criterion:** what will the learner be able to identify, calculate, explain or predict independently?
4. **Author one strong visual.** Clear axes, units, appropriate sign conventions, accessible text, and colors tied to specific objects. Use a concise focus cue. Follow `docs/09_FOCUSED_LESSON_AND_VISUAL_DESIGN_STANDARD.md`.
5. **Add one worked example, one independent exercise, and one reasoning check**, with independently verified solutions and meaningful misconception feedback.
6. **Match supporting material.** Blank guided notes, demonstrations and labs should derive from this concept; summative tests and teacher keys remain private until rights and secure access are established.
7. **Review rights.** The HLS-Teaching repository and publisher texts are not automatic import sources. Do not conceal plagiarism by surface paraphrasing. Write a substantively original explanation and obtain permission for any protected derivative work or institutional content.
8. **Run checks**, inspect diagrams on small and large screens, and seek teacher/editorial approval before production.

## Current map and next scope

The registry currently reserves **145 unique topics across 20 units**, including 15 available and 130 planned topics, plus 34 small challenge slots (three available). These are *planning slots*, not 130 completed lessons or an unconditional promise about a finished full curriculum. Review topic sequence and scope against the HLS teaching approach, homeschool needs, approved source rights, and anticipated publisher requirements before authoring at scale.

The catalog's `nextBuild` field currently proposes: atomic models, significant figures, Newton's third-law interactions and the power rule. Only begin another new unit when its foundational topic and the previous unit's review are coherent.

## Review checklist

- [ ] Topic ID and concept ownership are unique and appropriate.
- [ ] New objective does not repeat an existing topic in different words.
- [ ] All prerequisites exist; no cycles and no unfinished prerequisites for live lessons.
- [ ] Status `available` matches an implemented lesson and correct next/back navigation.
- [ ] Student text and figures are original and rights-reviewed.
- [ ] Problem, response feedback, equation and visual agree mathematically.
- [ ] Supporting PDFs or printable pages have one registered public owner.
- [ ] Classroom and teacher-only resources are not in the public site.
- [ ] CI succeeds and mobile + keyboard review is complete.

## Chapter-owned difficult-concept challenges

A submodule is an optional four-minute visual clarification attached to exactly one parent topic. Its record is in `curriculum/catalog.json` under `submodules`; its implemented, independently written student material lives in `content/submodules.json`. Its `status` must match across the two files. Planned challenges remain unpublished, and available challenges are reachable through a small `Explore deeper` link at the end of their parent lesson.

A challenge must not become a competing course topic, must not change the parent chapter sequence, and must not duplicate a lesson's core question. Challenges have one troublesome inference (e.g., slope vs graph height, sign of acceleration vs slowing down) and a short demonstrator with one original conceptual check. The syllabus review and source hierarchy are in `docs/12_SYLLABUS_ALIGNMENT_AND_CHALLENGE_MODULES.md`.
