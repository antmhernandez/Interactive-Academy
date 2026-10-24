# Publication and provenance requirements

**Private source repository:** `antmhernandez/HLS-Teaching`.  
**Website repository:** this project.  
**Current status:** only independent original sample lessons may be published.

## Rights are determined per asset
Create a private provenance record for each lesson, problem, diagram, figure, worksheet, photograph, animation or video before bringing it into a public release. Suggested columns:
`asset_id, asset_kind, author, source_location, original_or_licensed, license_or_permission, employment_rights_review, publisher_rights_review, independent_fact_check, editorial_review, cleared_for_publication, approver, approval_date`.

## Hard boundaries
1. Do **not** automatically synchronize an entire private HLS repo into the public site.
2. Do **not** assume the owner of a GitHub repository owns copyright in every file within it.
3. Do **not** lightly paraphrase protected textbook expression. Recreate explanations with a genuinely original structure, fresh language, newly designed examples and independently constructed diagrams based on underlying physical/mathematical facts. For material whose adaptation requires permission, obtain it.
4. Confirm employment and school intellectual-property terms for any course material produced as part of work before using it commercially.
5. Do not publish textbook scans, publisher assets, proprietary tests/keys, student information, or material licensed for classroom use only.
6. Keep actual graded tests and teacher keys outside a publicly served GitHub Pages directory. Even a private GitHub source repo can produce a publicly accessible Pages site.
7. Review and independently solve every new problem. Correct scientific and historical inaccuracies before publication. Check graphs against solutions and state units/conditions.
8. PhET and other third-party applets have licensing and attribution conditions; do not bundle them into commercial content without the required permissions.
9. A potential Memoria Press/Novare partnership must be separately negotiated; this prototype claims no endorsement or affiliation.

## Import workflow
**Identify concept → inspect source → classify provenance → secure rights → independently write → build figures → verify → review for close similarity → approve → publish.**
The original source and permission register remain private. The public website receives only release-approved files.

## School versions
Keep student printables separate from teacher solutions and assessments. Prefer one canonical problem dataset with controlled student/teacher renderers; the public static site has only the student view. Paywalls must eventually be enforced by server-side access controls, not hidden routes or client-side passwords.

## Change review
Before public deployment inspect diffs for credentials, exam keys, student-identifying information, unlicensed figures, and accidentally copied text. Assume everything in a public Pages output folder can be downloaded.
