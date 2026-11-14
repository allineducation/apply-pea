# PEA Resource List base → source for Materiales y recursos — plan v1.0

Prepared for Danny Hernández · November 14, 2026 · Built in release **v0.24.0** · Audience: internal (PEA team)

## Results (2026-11-14)

| Step | Result |
| --- | --- |
| Snapshot | Resources (262 rows, every field), Submissions (1), Ratings (1) as CSV → Google Drive › PEA › PEA Resource List snapshots |
| Schema | Fields renamed and added as in §1; **Groups** table created; **Ratings** and **Base Fields** tables deleted |
| Import | 219 Published rows (68 existing records updated, 151 created); 42 groups; 194 older records **To review** with a mapped Topic (58 without one: Basic Needs, Community Organizations, District & School Contacts, Internet & Tech Support); 1 old record stays Archived; the retired MSDOE communication tool added as Archived |
| Group order | Shared links sit in different positions in different groups (e.g. the Understood math checklist is first in 3R and last in 6T), so one Order per link cannot hold. **Inside a group, the order of the group's Resources list is the order on the card**; Order sorts everything outside groups |
| Equivalence | Whole `PEA_FACTS` after the change (stripped `facts.js` + generated `resources.js`) is identical to before, apart from MSDOE (archived) and one unified title. 18 rendered views (Materiales y recursos, full calendar with every card open, six Esta semana weeks; ES and EN) identical apart from that title |
| Sync | Re-run gives "No change"; stops on an unknown topic, an unknown class, a material without a type, or no Published rows; a row set to *To review* disappears; a Published row with no class becomes a community row |

### Decisions for Danny

1. **Encircle Families *Resource Library* title — confirmed by Danny, 2026-11-14 (long title).** Before: *Family Resource Library (Encircle Families)* on 3R; *Encircle Families Resource Library: special education, disability supports and navigating services* on 5R and 7T. Now the long title everywhere. Change it in Airtable if you prefer the short one.
2. **Done by Danny, 2026-11-14:** **Delete the fields marked for removal** (§1 table): 23 in Resources, 8 in Submissions, plus the old *Category*, *PEA Session*, *Language* and *Resource Type* now that their values are mapped. The Airtable API cannot delete fields.
3. **Done by Danny, 2026-11-14:** **Unused choices** left by the API: Status *Under Review*, Review Status *Rejected* (rename to *Not now* or delete).
4. **Modules table** in the main PEA base: its material PDF columns are no longer the site's source. Keep them for staff or remove.

## Context

v0.24.0 ([allineducation/apply-pea#68](https://github.com/allineducation/apply-pea/pull/68)) first added participant suggestions with a hand-kept `facts.communityResources` list. Danny (2026-11-14) approved the Airtable changes and widened the goal:

- Review the **PEA Resource List** base (`app1VeAGxcVHsV2bQ`), built before topics and the resource list existed. Nobody uses it yet, so keep **only the fields needed to maintain the resource list**.
- Make sure **every resource published today** is in the base.
- The base becomes **authoritative**, and the site displays what the base says.

Decisions (Danny, 2026-11-14):
- **Sync with review:** a GitHub Action (run on demand, plus nightly) copies Published records into a data file and opens a PR. Danny merges it.
- **Scope is everything on the page and the class cards:** outside resources *and* the ALL In Education session materials.
- **Older records** not on the site are kept as a hidden **"To review"** backlog.

What's there today (read 2026-11-14):

| | Count |
|---|---|
| Base · Resources | 262 records, 36 fields, old categories, 0 Published (1 Archived) |
| Base · other tables | Submissions (1 test record), Ratings, Base Fields |
| Site · unique links | 214 = 45 ALL In Education materials + 169 outside resources/featured (184 placements; 42 curated groups) |
| Already in base (URL match) | 68 of the outside resources; about 194 base records are not on the site |
| Links on more than one class | 14 (e.g. the AZURA and Colorín Colorado links on 4T and 4R), sometimes in different groups |

The site can't read Airtable live: the CSP blocks it (`connect-src 'self'`) and an API key can't be public. So a **sync** step turns Published records into a static data file.

## 1. Base design: three working tables

### Resources: one row per link

| Field | Type | From (rename/repurpose) or new | Why it's needed |
|---|---|---|---|
| Resource | formula, primary | existing *Resource ID*, simplified to `Title (EN) · Title (ES)` | readable row name |
| Title (ES) / Title (EN) | text | *Resource Name (ES/EN)* | row text on each page |
| Link (ES) / Link (EN) | URL | *URL (ES)* / *URL* | `es` / `en` links |
| Link (both pages) | URL | new | `any`: one link shown on both pages |
| Languages served | multi: Spanish, English | *Language* (choices reduced) | `langs`, language filter, review Q5 |
| Kind | single: ALL In Education material · Outside resource | new | the "Tipo" filter and card sections |
| Material type | single: worksheet, comm, handout, resource, presentation | *Resource Type* (choices replaced) | material titles (`facts.materialTypes`) |
| Topic | single: the 13 topic keys (ES · EN names) | *Category* (choices replaced) | topic on Materiales y recursos |
| Classes | multi: 18 classes (`1T · MORIE` … `10T · MGRAD`) | *PEA Session* (choices replaced) | which class cards list it (no group) |
| Groups | link → Groups | new | curated sub-groups on the cards |
| Featured in | multi: 18 classes | new | ⭐ Destacado |
| Cohort | single: FA26, SP27 (optional) | new | rows only for one cohort: the 6 FA26 English presentations, the AZURA featured links |
| Order | number | new | curated order (today's order × 10) |
| Status | single: **Published · To review · Archived** | existing (choices updated) | only Published syncs |
| Organization | text | existing | review Q2 (credible source) |
| Check again on | date | *Date Expired* | review Q3 (time-sensitive items) |
| Notes (Internal) | long text | existing | reviewer notes |
| Submission | link → Submissions | new | traceability for suggestions |
| Date Added | created time | existing | audit |

**Rows with no Classes, Groups or Featured in** are approved suggestions. They appear only on Materiales y recursos under their Topic (this replaces `facts.communityResources`).

### Groups: the 42 curated sub-groups (new table)

Title (ES), Title (EN), Class (single select), Topic (optional, for the moved 3R and 4T groups), Keep together (the `whole` flag), Order, Resources (link).

### Submissions: trimmed to the approved form

Keep and rename: *Submitter First Name* → **Name**, *Resource URL* → **Link**, *Description*, *Review Status* (New · In review · Approved · Published · Not now · Duplicate), *Reviewer Notes*. Add: **Contact**, **Role**, **Topic**, **Received** (created time), **Alignment** (A1–A4), **Quality** (Q1–Q6), **Reviewer**, **Decided on**, **Resource** (link). On approval, the reviewer creates the linked Resources row (Status Published). The form and notification follow plan §1 of `resource-suggestions-plan-v1.0.md`.

### Recommended removals

| Remove | Reason |
|---|---|
| **Resources:** Description (EN), Description (ES), Summary (EN), Summary (ES) (AI fields, which use Airtable AI credits), Tags, Cost, Free?, Language Code, Location, Audience, Contact, Phone, Email, Submitted By, Submission Type, Date Reviewed (it's really "last modified"), ALL in Education Approved? (Status does this), Average Rating, Rating Count, Resource Image, Ratings, Source Row Count, Legacy Row ID (removed after migration) | Not shown on the site and not used in the review: 23 fields |
| **Submissions:** Submitter Last Name, Submitter Email, Confirm Email, Resource Name, Category Suggestion, Language, Location, Submission Date | Replaced by Name, Contact, Topic and Received: 8 fields |
| **Tables:** Ratings, Base Fields | Ratings are not part of the site; Base Fields is a dated schema snapshot from 2026-08-23 |
| **Elsewhere, flagged only:** main PEA base · Modules table material columns (Participant Worksheet / Communication Tool / Resource – Other PDFs) | No longer the site's source once materials move. Danny decides whether to keep them for staff. |

Safety: before changing anything, I take a **full CSV snapshot** of Resources and Submissions and save it to Google Drive (not to the repo, which is public). Airtable's tools here can create and rename fields but **can't delete them**. Danny deletes the fields listed above in the Airtable UI. I delete the two tables only after the snapshot.

Older records get mapped to the new topics where it's clear (e.g. Mathematics → math, Literacy & Reading → literacy, Exceptional Students / Special Ed → sped, Parent & Student Rights → rights, School Choice → quality). Basic Needs, Community Organizations, District & School Contacts and Internet & Tech Support get no topic; the reviewer sets one if the row is published.

## 2. Migration (one time)

1. Snapshot to Drive. Update the schema (§1).
2. **Import the site's 214 links**, read from `facts.js`. If a record's normalized URL already matches, update that record (68); otherwise create one. The site's titles, languages, topic, classes, groups, featured, cohort and order win. Status → **Published**.
3. Remaining older records → **To review**, with the mapped topic.
4. Generate the site data from the base and compare it with today's `facts.js` (see Verification). The only allowed differences are listed for Danny:
   - The Encircle *Family Resource Library* has two titles today; the base keeps one, and Danny picks which.
   - The order of the 14 shared links may shift within groups.

## 3. Site: read the base's data file

| File | Change |
|---|---|
| `maintenance/scripts/sync-resources.js` (new) | Node 22, no dependencies. Reads Published Resources + Groups through the Airtable REST API (`AIRTABLE_TOKEN`), or from a JSON file (`--from-json`, for this migration and for tests). Writes `site/assets/js/resources.js`: `window.PEA_RESOURCES = { modules: { MREAD: { materials, resources, featured } }, events: { "FA26-4T": { featured, presentation_en } }, community: [...] }`. Uses the same `{ type, es, en, any, langs, title_es, title_en, topic }` and group `{ title_es, title_en, topic, whole, items }` shapes as today. Output is stable (sorted by Order, then title), with a header: *Generated from Airtable — edit there, not here*. |
| `site/assets/js/resources.js` (new, generated) | committed; reviewed in each sync PR |
| `site/assets/js/facts.js` | Remove `materials`, `resources`, `featured` from `modules`; remove `featured` / `presentation_en` from events; remove `communityResources`. Keep topics, `materialTypes`, search vocabulary, links and cohorts. |
| `site/assets/js/app.js` | One small `mergeResources()` at start-up copies `PEA_RESOURCES` into `F.modules` / events / `F.communityResources`, so every existing renderer (`resourceIndex`, `resSection`, `matBody`, card sections) stays unchanged. |
| `site/index.html` | Load `resources.js` after `facts.js`, before `app.js` (same-origin, CSP unchanged). |
| `maintenance/scripts/check-parity.js` | Load `resources.js` and run the existing item checks on the merged data. Fail on: an unknown class or topic, a Published material without a Material type, a group with no Published rows, or an empty file. |
| `.github/workflows/sync-resources.yml` (new) | `workflow_dispatch` (**Run workflow** = the sync button) + nightly at 13:17 UTC (6:17 AM Arizona time). Steps: checkout → `node sync-resources.js` → `check-parity.js` → if `resources.js` changed, open or update a PR from branch `resources-sync` with the list of added, changed and removed rows. Uses `GITHUB_TOKEN` (pull-requests: write); actions pinned by version. Netlify builds a preview for it, and Danny merges. |
| `README.md`, plan doc `maintenance/plans/resource-base-plan-v1.0.md`, QA note | New rule: **edit resources in Airtable, never in the code**. Covers the sync steps and how to fix a failed sync. Updates the suggestions plan (§3 there now points to the base). |

Release: this work goes on the same branch as #68, which becomes **v0.24.0: resource base + suggestions**. The PR description gets updated.

## 4. What Danny sets up (one time)

1. Create an Airtable **personal access token**, read-only (`data.records:read`, `schema.bases:read`), limited to the PEA Resource List base.
2. Add it as GitHub repository secret **`AIRTABLE_TOKEN`**.
3. Turn on *Settings → Actions → Allow GitHub Actions to create pull requests*.
4. Delete the fields marked for removal (§1), after checking the snapshot.
5. Build or confirm the suggestion form, and share its URL. If Airtable's tools can build it, I will.

## Verification

- **No visual change from the migration:** the merged `F.modules` / events data from `resources.js` must deep-equal today's `facts.js` data, apart from the listed exceptions (a script diff in the scratchpad). Row counts must match: 109 EN / 103 ES unique on Materiales y recursos, as in the v0.23.0 count method, plus the rows added since.
- `check-parity.js`, `node --check` on all JS, `git diff --check`. Negative tests: a record with an unknown topic, a Spanish link with no Spanish title, a material with no type → each fails.
- Playwright, ES and EN, at 320/390/1100px: topic counts, search, filters, a few class cards (4T, 4R, 3R, 6T with `?today=2026-12-31`), the English presentations on the EN page only, and the AZURA featured links on FA26 4T and 4R.
- Sync with `--from-json` on an Airtable export: running it twice gives byte-identical output; a test record changed to *To review* disappears; a Published row with no classes shows only on Materiales y recursos.
- After Danny adds the secret: one **Run workflow** → a PR with no change (or only the expected diff). Its Netlify preview passes.

## Fit check

- **Simple:** one place to edit (Airtable), one button to publish, and every change shows up as a readable PR before it goes live.
- **Sustainable:** no server or new service; the content check guards every sync; the old site keeps running if Airtable is down.
- **Right-size:** 3 working tables and about 20 fields per table. The two-table split (Resources + Groups) exists only because 14 links sit in different groups on different classes.
