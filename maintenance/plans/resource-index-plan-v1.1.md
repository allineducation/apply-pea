# PEA “Materiales y recursos / Materials & resources” page — plan v1.1

Prepared for Danny Hernández · October 29, 2026 · Built on repository **v0.22.20** · Target release: **v0.23.0** · Audience: internal (PEA team)

v1.1: topics edited by Danny Hernández (2026-10-29) into **6 main topics, 3 of them with sub-topics**; the three moves out of 3R and 4T approved.

## The ask

One page that lists every material and resource linked on the Calendar's class cards, organized by topic, so a family can find something again without remembering which class it came from.

## Decisions (Danny Hernández, 2026-10-29)

| # | Decision |
| --- | --- |
| 1 | The index lists **every available item now**. It does not wait for the weekly unlock. Class cards keep their weekly unlock. |
| 2 | Name: **Materiales y recursos / Materials & resources**. |
| 3 | Order: **by topic, alphabetical** (e.g. Literacy, Continued Learning, Math, Digital Literacy & Tech). |
| 4 | In the ☰ menu, **after Calendario**. |
| 5 | Shortlink **`https://aie.s.gy/recursos`** (Spanish default). Danny creates it once the page is live. |
| 6 | **General topics, based on session themes, are set now** and the page is organized by them. |
| 7 | The page is the **public face of the forthcoming resource database**: the database feeds `facts.js`, and the page reads `facts.js`. |
| 8 | **Topics (v1.1):** six main topics; *Liderazgo y defensa educativa*, *Navegando sistemas escolares* and *Oportunidades y aprendizaje continuo* hold sub-topics (table below). Moves out of 3R and 4T approved. |

Standing rules that still apply: shared links open the Spanish page; no bit.ly for this site; palette colours only; never “empower” in either language.

## What the page draws from (v0.22.20, counted 2026-10-29)

Every item comes from the same `facts.js` lists the class cards use. Nothing is entered twice.

| Card section (v0.22.16) | Source in `facts.js` | Rows |
| --- | --- | --- |
| ⭐ Destacado / Featured | `featured` on a class event, then on its module | 8 (4T, 4R) |
| Materiales de ALL In Education / ALL In Education materials | `modules[*].materials`; `presentation_en` (English page only) | 24 + 6 presentations |
| Recursos adicionales / Additional resources | `modules[*].resources` with a Spanish or shared link | 78 resources split between these two sections |
| Otros recursos / Other resources (English only) | `modules[*].resources` with an English link only | (included above) |
| **Total** | | **116 rows, 109 unique links** |

Seven links appear on both 4T and 4R: the AZURA Literacy form and flyer, Colorín Colorado *Ayude a su niño a aprender a leer*, Read On Arizona *Conversar para aprender*, Access Group, FCRR for families and Storyline Online. The index lists each of these **once**.

## Topics (Danny Hernández, 2026-10-29)

Six **main topics**. Three of them hold **sub-topics**. A module carries one topic, and every item in it goes there by default. An item or a resource group can be moved to another topic when its subject differs from the class.

Main topics, and the sub-topics inside each, are sorted **alphabetically in the page's language**, so the Spanish and English pages have different orders. A topic or sub-topic with no published links is hidden until it has one.

| Main topic (EN · ES) | Sub-topic (EN · ES) | Classes | Moved in | Links today |
| --- | --- | --- | --- | --- |
| **Advocacy & Leadership** · *Liderazgo y defensa educativa* | *(the main topic's own links)* | 8T MSELF, 9T MPIP1, 9R MPIP2, 10T MGRAD | — | 1 |
| | Education Rights · Derechos escolares | 5R MRGHT | — | 0 (hidden) |
| | Family & Community Engagement · Participación familiar y comunitaria | 7R MCENG | 3R group *Participar en la escuela* (5) | 6 |
| | History & Identity · Historia e identidad | 1R MHIST, 2R MBIAS | — | 5 |
| **Digital Literacy & Tech** · *Alfabetización digital y tecnología* | — | 5T MDIGI | — | 1 |
| **Literacy** · *Lectura* | — | 4T MREAD, 4R MHOME | — | 46 |
| **Math** · *Matemáticas* | — | 6T MMATH | 3R: two Understood math checklists | 2 |
| **Navigating School Systems** · *Navegando sistemas escolares* | *(the main topic's own links)* | 3R MCOMM | — | 21 |
| | Quality Education · Educación de calidad | 3T MQUAL | — | 19 |
| | Safety & Well-Being · Seguridad y bienestar | 2T MSAFE | — | 2 |
| | Special Education & Exceptional Students · Educación especial y estudiantes excepcionales | 7T MEXCP | 3R: Center for Parent Information and Resources FAQ, ADE *Special Education Highway*; 4T group *Si su hijo o hija necesita más apoyo* (1) | 4 |
| **Opportunities & Continued Learning** · *Oportunidades y aprendizaje continuo* | *(the main topic's own links)* | 6R MOPHS | — | 1 |
| | Getting Started with PEA · Para empezar en PEA | 1T MORIE | — | 1 |
| **Total** | | | | **109** |

Opportunities & Continued Learning is also the home for **English classes for adults, GED information and opportunities after high school** as they are added (Danny Hernández, 2026-10-29). The 3R *Parent Guide for English Learners* (Education Northwest) is about supporting a student who is learning English at school, so it stays with Navigating School Systems.

## Page layout

1. **Heading and lead**: *Materiales y recursos* — everything shared in PEA classes, by topic. New links are added as classes happen.
2. **Topic menu**: one pill per **main** topic, with a count that includes its sub-topics. Tapping a pill opens that topic and scrolls to it (the same pattern as the *En esta página* menu on Info & help).
3. **One collapsible panel per main topic**, closed by default (site rule since v0.17.0), with a count on the heading bar. Inside, in order:
   - the main topic's **own links** (e.g. 3R under Navigating School Systems), then
   - **one nested, collapsible panel per sub-topic**, closed, with its own count.
4. **Inside every topic or sub-topic**, the same four sections as a class card, in the same order and style:
   - **⭐ Destacado / Featured** (open)
   - **Materiales de ALL In Education** (open), with **one sub-group per class**, titled “4T · Fundamentos de la lectura…”, because every class has a worksheet with the same title
   - **Recursos adicionales** (closed), keeping the curated groups (e.g. *Encontrar libros*)
   - **Otros recursos — Disponibles solo en inglés** (closed)
5. **Panel footer**: *Ver en el calendario:* links to each class card in the topic or sub-topic (`#calendario/FA26-4T`, `#calendario/FA26-4R`).
6. **Page footer**: links to *Esta semana* and *Calendario*.

Nesting goes **at most three levels deep**: main topic → sub-topic → card section (and a curated resource group inside it, as on the cards). This keeps a phone screen readable.

The rows themselves don't change: Spanish title · ES | English title · EN, only versions that have a link, and the English presentation on the English page only.

**What's not on this page:** exit tickets, Zoom and absence buttons (they belong to a class date); the cohort WhatsApp and calendar links (they sit at the top of *Esta semana*); Spring 2027 projected classes; staff-only files.

## Implication of decision 1

Because the index shows everything published, a link added to `facts.js` for a future class appears on the index at once, before its class card unlocks. To keep a future class's files off the index until its week, add them to `facts.js` on the day they should go live. Nothing changes on the class cards.

## How it will be built

| Step | File | Change |
| --- | --- | --- |
| 1 | `facts.js` | New `topics` list (`key: { es, en, parent? }`; a sub-topic names its main topic in `parent`). Each module gets `topic: "<key>"`. Optional `topic` on a resource item or group moves it (the 3R and 4T moves above). |
| 2 | `app.js` | New `pageRecursos()`: walks the current cohort's classes, collects each item into its topic, removes repeats by link, sorts topics by name in the page language, and reuses `resSection()` / `matBody()` / `matRows()` / `splitByLang()` so rows look exactly like the cards. Panel open state is remembered across the 60-second refresh and a language switch, under a `rec-` key so it never collides with card keys. |
| 3 | `app.js` | Register in `PAGES`; add `recursos` to the *Unirse* nav group after `calendario`. Footer links from *Esta semana* and Calendar. |
| 4 | `copy.js` | ES and EN strings: nav label, heading, lead, topic menu label, “see on the calendar”, empty state. |
| 5 | `check-parity.js` | Fail if a module used by a cohort has no topic, a `topic` names an unknown key, a `parent` is not a main topic (one level of sub-topics only), or a topic lacks an ES or EN name (and run the usual vocabulary rules on topic names). |
| 6 | `hub.css` | Reuse card and pill styles; add only the topic-panel heading if needed. Palette tokens only. |
| 7 | `_redirects` | `/recursos` → `/?lang=es#recursos`, `/resources` → `/?lang=en#recursos`. |
| 8 | Release | v0.23.0 in `app.js` and `index.html`; README release note and a *Resource index* line in Navigation; QA note `maintenance/qa/v0.23.0.md`. |

Estimated size: about 120–160 lines of JavaScript, 13 topic names (6 main, 7 sub) plus about 10 copy strings per language, under 30 lines of CSS, and about 20 lines in the parity check.

## Checks before push

- `node maintenance/scripts/check-parity.js`, `node --check` on the JS files, `git diff --check`.
- **Count check:** the page lists 109 unique links on the English page and 103 on the Spanish page (no presentations). Every link on any class card appears on the index exactly once.
- Both languages: alphabetical order of main topics and of sub-topics in each; pill counts include sub-topics; hidden empty sub-topic (Education Rights); English-only rows under *Otros recursos*; presentations on the English page only.
- Topic pills open and scroll to the right panel; panels stay open through a language switch and the minute refresh.
- Phone (320px, 390px) and desktop; keyboard order; screen-reader names for pills and panel counts.
- `/recursos` and `/resources` aliases after deploy (local Python hosting does not apply redirects).

## Fit check

- **Simple:** one link, topics a family recognizes, and the same rows they already know from the cards.
- **Sustainable:** a link is added once, to its class in `facts.js`, and shows on the card and the index. A new module needs one `topic` field, and the parity check catches it if that's forgotten.
- **Right-size:** static page on the existing site, no new service. When the resource database arrives, it fills the same `facts.js` fields, topics included, so the page doesn't need to be rebuilt.

## Open items for Danny

1. **Create `https://aie.s.gy/recursos`** after v0.23.0 is live.
2. **Resource database:** when it's designed, give each resource a *Topic* field using these 13 topic keys, so it maps straight into `facts.js`.
3. **Adult English, GED and after-high-school links:** send them when ready; they go to Opportunities & Continued Learning.
