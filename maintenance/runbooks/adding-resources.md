# Adding resources and session materials — runbook v1.0

**For:** the PEA team (internal). **Owner:** Danny Hernández. **Updated:** 2026-11-17.
**Master copy:** this file in the repo. A Google Doc copy lives in Drive › PEA; if the two differ, this file wins.

Since v0.24.0, **Airtable · PEA Resource List** is the only place where materials and resources are added or changed. The site shows a row only after three things happen: the row is **Published**, the sync runs, and its pull request is merged. Never add links in `facts.js` or `resources.js`.

| You want to… | Go to |
| --- | --- |
| Add one outside link (website, video, guide) | §2 |
| Add or update a worksheet, communication tool, handout or presentation | §3 |
| Add a new sub-group on a class card | §4 |
| Add many links at once | §5 |
| Make the change appear on the site | §6 |
| Remove a link | §7 |
| Ask Claude to do it | §8 |

---

## 1. Before you add anything

1. **Search first.** In Airtable → Resources, search for the link and the organization **in all statuses** (Published, To review, Archived). Also search *Materiales y recursos* on the site.
   - Found it? **Do not add a second row.** Add the new class, group or topic to the existing row.
2. **Run the review checks** on every outside link. Every box must pass.
   - **A1** Helps families understand or navigate the school system, advocate for their children, or support learning at home.
   - **A2** Fits one of the site topics.
   - **A3** Useful to Arizona families or school staff (Arizona-specific, or national and applies here).
   - **A4** Free to use.
   - **Q1** Opens on a phone, with no login or paywall.
   - **Q2** Credible source: government, school/district, university, library or established nonprofit.
   - **Q3** Current: dates, deadlines and figures are still accurate. If they will expire, fill **Check again on**.
   - **Q4** No selling, heavy ads, political campaigning, or requests for personal data beyond what the service needs.
   - **Q5** Languages verified: record which languages the page really serves. A Spanish link must have real Spanish content.
   - **Q6** Not already on the site (step 1).
3. **Google Drive files** must be shared **Anyone with the link · Viewer** before they are Published.
4. **No personal data** in any field: no participant names, emails, phones or private Zoom links. The site and repo are public.

## 2. Add one outside resource

Create a row in **Resources**:

| Field | What to enter |
| --- | --- |
| **Status** | `To review` (change to `Published` once §1 passes) |
| **Kind** | `Outside resource` |
| **Title (ES)** | Needed with a Spanish or shared link. Pattern: `Título (Organización)`. If the Spanish page shows an English-only link, add `(sitio en inglés)`. |
| **Title (EN)** | Needed with an English or shared link. Pattern: `Title (Organization)`. |
| **Links** | **Either** `Link (ES)` and/or `Link (EN)` (separate pages per language), **or** `Link (both pages)` (one page for both). Never both shapes. Use the final page URL, not a shortlink. |
| **Languages served** | Only with `Link (both pages)`: the languages the page really serves. |
| **Placement** | Choose one or more (next table). |
| **Topic** | Required when there is **no** placement. Otherwise only when the subject differs from the class's topic. |
| **Order** | For rows outside groups: steps of 10 (10, 20, 30…) so you can insert later. |
| **Organization / Notes (Internal)** | For staff. Notes: where the link came from, and anything to watch for. |

**Where the row shows (placement):**

| Field | The row appears… |
| --- | --- |
| **Classes** | on that class card, outside any group |
| **Groups** | inside a curated group on the group's class card. **Order inside a group = the order of the group's Resources list**; drag it there. |
| **Featured in** | under ⭐ Destacado / Featured on that class card. Add **Cohort** to limit it to one cohort. |
| none + **Topic** | only on *Materiales y recursos*, under that topic (an approved suggestion, for example) |

**Wording rules:**
- Never translate *ALL In Education* or *Leadership · Power · Justice*.
- Program names:
  - *Academia de Padres Educadores* in Spanish
  - *Parent Educator Academy* in English
  - *PEA* in both
- In Spanish:
  - *maestros*, not *docentes*
  - *salón/clase*, not *aula*
  - *ustedes*, not *vosotros*
- Never use *empower* or any variant, in either language (*empoderar*, *empoderamiento*).

## 3. Add or update a session material

Session materials are the ALL In Education worksheets, communication tools, handouts and presentations for one class.

| Field | What to enter |
| --- | --- |
| **Kind** | `ALL In Education material` |
| **Material type** | `Participant worksheet`, `Communication tool`, `Handout`, `Resource` or `Presentation`. **Required.** It gives the row its standard title. |
| **Classes** | The class, e.g. `8T · MSELF`. **Required.** |
| **Link (ES) / Link (EN)** | The Drive files, shared *Anyone with the link*. |
| **Title (ES/EN)** | Leave empty unless the standard title is wrong (e.g. two handouts on one class). **Required** when the material is in *Featured in* (a title for each linked language). |
| **Order** | Steps of 10. The usual order is worksheet, then communication tool, then handouts. |

**A presentation** also needs:
- **Cohort** (e.g. `FA26`)
- **Link (EN)**

There is one presentation per cohort and class. For a new presentation file, replace the link in the existing row.

**A new version of a file:** open the **existing row** and replace the link. Do not add a second row; the row keeps its place and history. Write the date and reason in *Notes (Internal)*.

## 4. Add a new group on a class card

1. In **Groups**, create a row:
   - **Group** = `<class code> · <English title>`, e.g. `4R · Finding books`
   - **Title (ES)** and **Title (EN)**
   - **Class**
   - **Order** (steps of 10, among the class's other rows and groups)
   - **Topic** only if the whole group belongs to another topic
   - **Keep together** if needed
2. Link the Resources rows to it, then drag them into order in the group's **Resources** list.
3. A group appears only once at least one of its rows is Published.

## 5. Add many links at once (bulk)

1. Copy `maintenance/templates/resources-import.csv`.
   - Keep the header row exactly as it is.
   - Look at `resources-import.example.csv` for filled examples.
2. Fill one row per link. Follow the same rules as §2–§3, and:
   - **Status** = `To review` on every row
   - several Classes or Languages go in one cell, separated by commas, e.g. `"Spanish,English"`
   - **Groups** use the group name (`4R · Finding books`). If a group's name contains a comma, leave Groups empty and link that group by hand after the import.
3. Check the file, then fix every row it names until it says **OK**:

   ```bash
   node maintenance/scripts/validate-resource-import.js my-list.csv
   ```

   It checks:
   - choice names
   - links (https, one shape, no duplicates in the file or on the site)
   - titles per language
   - Languages served
   - material type and placement
   - Cohort
   - Topic
   - wording rules

   Lines starting `check:` are reminders, such as Drive sharing, example links or shortlinks.
4. The script only knows **Published** links. Search Airtable for *To review* and *Archived* duplicates too (§1).
5. In Airtable, open **Resources** and import the CSV, adding the rows to the existing table. Match each column to the field of the same name.
6. Filter to *To review* and check the new rows:
   - link any groups the CSV could not link
   - drag group order
   - run §1 checks
7. Set **Published** in small batches, then publish (§6).

**Bulk best practices:**
- **Keep batches small.** 10–30 rows is easy to review in one pull request.
- **One topic or class per batch** makes the preview quick to check.
- **Keep the CSV.** Save it in Drive › PEA with the date, so you know what came in and from where.

## 6. Publish (make it appear on the site)

1. GitHub → **Actions** → *Sync resources from Airtable* → **Run workflow** (branch `main`). It also runs every day at 6:17 AM Arizona time.
2. A pull request **Resources: sync from Airtable** opens. Open its **Netlify deploy preview** and check:
   - the class cards and *Materiales y recursos*
   - **both Spanish and English**
3. Merge it. The site updates in about a minute.

**If the run says `SYNC STOPPED`**, it lists each row to fix in Airtable. Fix them, then run again:

| Message | Fix |
| --- | --- |
| unknown class / topic / cohort | Use an existing choice name. A new class or topic needs a site change first. |
| needs a Material type | Set Material type on the ALL In Education material. |
| use Link (both pages) or Link (ES)/(EN), not both | Keep one link shape. |
| no link | Add a link or set the row back to To review. |
| a presentation needs a Cohort / Link (EN) | Fill both. |
| Cohort is only for presentations and featured rows | Clear Cohort, or move the row to Featured in. |
| needs a class | An ALL In Education material needs Classes. |
| a row with no class needs a Topic | Set Topic. |
| HTTP 401/403 | The Airtable token secret is wrong or expired (GitHub → Settings → Secrets → `AIRTABLE_TOKEN`). |

If the *Content check* step fails, the log names the row and the rule (e.g. a Spanish link without a Spanish title).

## 7. Remove or retire a link

Set **Status** = `Archived` and write the reason and date in *Notes (Internal)*. Then publish (§6).

**Never delete a row**: archived rows keep the history and stop the same link from being added again.

## 8. Asking Claude to add resources

You can still send Claude a list. Example: *"Add these links to 6T Math, in a group called Math games"*.

Claude:
1. follows [`maintenance/specs/resource-record.v1.json`](../specs/resource-record.v1.json), the machine-readable version of this runbook
2. checks for duplicates
3. writes the rows as **To review** (or fills the CSV and runs the validator)
4. reports what needs your review before anything is Published

## Files

| File | Purpose |
| --- | --- |
| `maintenance/specs/resource-record.v1.json` | Machine-readable rules and steps (field IDs, choices, procedures). `check-parity.js` keeps it in line with the site and the sync. |
| `maintenance/templates/resources-import.csv` | Empty bulk template (exact Airtable column names) |
| `maintenance/templates/resources-import.example.csv` | Four filled examples |
| `maintenance/scripts/validate-resource-import.js` | Bulk check; reads no Airtable data, writes nothing |
| `maintenance/scripts/sync-resources.js` | The sync (Airtable → `resources.js`) |
| `maintenance/plans/resource-suggestions-plan-v1.0.md` | Participant suggestions and the review checks |
