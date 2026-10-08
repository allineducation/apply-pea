# PEA applicant portal

Prepared by Danny Hernández · Entry guidance checked October 6, 2026 · Current repository code **v0.21.5**

The Parent Educator Academy (PEA) applicant portal is a public, bilingual information site for families, caregivers and school staff. It explains the program and routes visitors to the interest form, class registration, information session, calendar and team support. It does not track an applicant’s progress.

- Live site: https://apply-pea.netlify.app/
- Repository: https://github.com/allineducation/apply-pea
- Netlify project: https://app.netlify.com/projects/apply-pea
- Historical machine-readable handoff: [HANDOFF.json](HANDOFF.json), a snapshot from before v0.14.0; retained for provenance, not current entry guidance.
- Historical production verification: [v0.11.0 production receipt](maintenance/qa/production-v0.11.0-2026-09-27.json). This receipt does not verify current code or production parity.

## Start here

Read this README and [CLAUDE.md](CLAUDE.md), then inspect the current branch and working tree. Confirm the code version in [site/index.html](site/index.html) and [app.js](site/assets/js/app.js); both identify v0.21.5 at this documentation check. Check the live site when reviewing applicant-facing changes, and verify production against its deployed commit before claiming release parity. [facts.js](site/assets/js/facts.js) is the application’s fact registry; authoritative program sources and Danny Hernández’s approved corrections govern content. The historical JSON and release notes preserve earlier states and must not override current guidance. No production deployment or external program-data audit was performed for this documentation correction.

This repository is public. Keep credentials, participant records, private Zoom join links and other sensitive material out of it. Documentation lives outside `site/`, so it is available in GitHub but is not part of the applicant-facing Netlify publish directory.

## Names and the approved PEA description (Danny Hernández, 2026-09-30)

**Naming rules** (enforced by `maintenance/scripts/check-parity.js`):

| Name | Spanish | English |
| --- | --- | --- |
| Program | **Academia de Padres Educadores** | **Parent Educator Academy** |
| Abbreviation | **PEA** (never “APE”) | **PEA** |
| Organization | **ALL In Education** — never translated | **ALL In Education** |
| Tagline | **Leadership · Power · Justice** — never translated, no Spanish pairing on this site | **Leadership · Power · Justice** |

The one allowed English program name in Spanish text is the citation title *Parent Educator Academy Evaluation Report* (2022). Shared bilingual surfaces (og:title, the no-JavaScript fallback, the 404 page) show “Academia de Padres Educadores / Parent Educator Academy”.

**Approved description** — use verbatim wherever PEA is described (Home “¿Qué es PEA? / What is PEA?” = `home.what` + `home.what2`):

> La Academia de Padres Educadores (PEA) de ALL In Education es un programa introductorio de liderazgo y participación en la educación, dirigido principalmente a madres, padres y cuidadores de Arizona. Las familias comparten experiencias y adquieren conocimientos y herramientas para comprender y navegar el sistema escolar, abogar con confianza por sus hijos y apoyar su aprendizaje y éxito académico desde casa.
>
> También damos la bienvenida al personal escolar y a los enlaces comunitarios que desean aprender junto a las familias y fortalecer la colaboración entre el hogar y la escuela.

> ALL In Education’s Parent Educator Academy (PEA) is an introductory leadership and family engagement program designed primarily for parents and caregivers in Arizona. Families share experiences and gain knowledge and practical tools to understand and navigate the school system, confidently advocate for their children, and support their learning and academic success at home.
>
> We also welcome school staff and community liaisons who want to learn alongside families and strengthen the connection between home and school.

## Architecture and file map

Static HTML, CSS and vanilla JavaScript. No package installation, bundler, application server or database is required. Node 22 runs the deployment’s content check. Lato fonts and brand images are local assets.

| File | Responsibility |
| --- | --- |
| `site/index.html` | Page shell, asset loading and release metadata |
| `site/assets/js/facts.js` | Cohorts, event timestamps, primary URLs, contact information, impact figures, and curriculum module descriptions/worksheets |
| `site/assets/js/copy.js` | Spanish and English content dictionaries |
| `site/assets/js/app.js` | Rendering, hash navigation, language preference, date logic, calendar export and interactions |
| `site/assets/css/hub.css` | Responsive presentation and accessibility styles |
| `site/assets/img/aie-logo-primary.png` | Complete approved primary logo artwork |
| `site/_headers`, `site/_redirects` | Security/cache headers and language/entry aliases |
| `netlify.toml` | Build check, Node version and publish directory |
| `maintenance/scripts/check-parity.js` | Bilingual dictionary shape and vocabulary check |
| `maintenance/qa/` | Dated verification evidence and limitations |

Some wording and dates are still embedded in `app.js` and `copy.js`, including `springHtml()` and the fall schedule summary. A cohort update must inspect all three JavaScript files; editing `facts.js` alone is insufficient. Historical file-header versions and internal `weeks` fields are not applicant-facing release or duration authority.

## Navigation and language

Seven pages (v0.21.0), ordered along the family's path: `#inicio` (a short router: up next, audience cards, quick actions, what PEA is, how to join in four steps), `#participar` (applicants: the four steps → is PEA for me → time you'll need → info session → Zoom help → school personnel), `#esta-semana` (enrolled participants: this week's classes with every detail visible — the one link shared in class), `#calendario` (enrolled: schedule with class details, next cohort), `#historia` (stories, our roots, evaluation, mission), `#equipo` (PEA team) and `#ayuda` (talk with the team → FAQ → useful links → after PEA). Retired hashes redirect within the app: `#lista` and `#zoom` → `#participar`; `#programa` → `#calendario`; `#preguntas`, `#enlaces` and `#contacto` → `#ayuda`.

Language selection is `?lang=es` or `?lang=en`, then the stored `aie_lang` preference, then Spanish by default. `/es` and `/en` are server aliases; `/inscripcion` and `/join` open the corresponding participation page; `/esta-semana` (Spanish) and `/this-week` (English) open the week page. **Shared links default to Spanish** (Danny Hernández, 2026-10-06): share `/esta-semana` or the shortlink **`https://aie.s.gy/esta-semana`**, not the English alias. Do not use bit.ly for this Netlify site (Danny Hernández, 2026-10-06: it does not work); `bit.ly/peafa26semana` is retired (archived in Bitly). Only language preference is stored locally. There is no checklist, progress storage, embedded application form or analytics integration in the current application code. External forms and messaging services operate separately.

## Approved applicant content

- **922 PEA alumni** is authoritative, excluding the staff test record. Verify future alumni and participation figures first in the **AIE Alumni** Airtable base (`appAnb90zo02mNqpi`). Distinguish unique alumni from participation records; do not substitute the uncorrected 923 count.
- Fall 2026 has **18 scheduled classes**, Tuesdays and Thursdays, **5:00–6:30 PM Arizona time**, October 6–December 8. No class on Thanksgiving, November 26. The focus group is December 10. Describe scheduled classes, not nine or ten weeks.
- The remaining information session is **October 1, 2026, 5:00–6:30 PM Arizona time**. September 24 session details were removed from the public event list, date cards and calendar export. Do not reintroduce two-date copy.
- **Entry path (Danny Hernández, 2026-09-29): the interest form is the application.** There is no acceptance step and no commitment form. The team sets up each applicant's Zoom access and sends a **personal Zoom access link** in the welcome email; the same link is used for every fall class and records attendance. The site publishes **no class Zoom registration link** and no “Registro en Zoom / Register on Zoom” wording; do not reintroduce them. Participation follows four steps: interest form → welcome email and personal Zoom link → get ready → join the first class (Tuesday, October 6, 5:00 PM), then waiting in the PEA Virtual Waiting Room.
- The information session (October 1, 5:00–6:30 PM, confirmed by Danny Hernández 2026-09-29) is optional. Its registration link (`bit.ly/peafa26info`) stays on the site and is labelled as **for the information session only**. Info-session recording wording was removed; visitors who cannot attend are directed to call or text 602-759-0619.
- School personnel guidance: help families complete the interest form, find their welcome email and contact the team; each applicant receives a personal Zoom access link.
- The interest form defaults to Fall 2026 and allows Spring 2027 selection, as confirmed by Danny Hernández. Spring dates are March 16–May 13, 2027 and appear only on Calendar. No spring Zoom link is published. The full spring calendar and teaching language require confirmation before promotion.
- **No certificate or minimum-attendance details are published** (removed at Danny Hernández's direction, 2026-09-29). Do not reintroduce the 16-of-18 rule without an approved program source.
- **Class language (Danny Hernández, 2026-10-06; replaces the 2026-09-29 wording):** PEA is offered in Spanish and English; each cohort's options and format may be adjusted based on staff capacity and participant interest. The site no longer says a cohort is "taught in Spanish" (the `teaching_*` cohort fields and the "Clases en español" chip were removed). Do not publish the internal enrollment threshold for a separate English class. Applicants state their language on the interest form.
- **Emoji are approved** on this site (Danny Hernández, 2026-09-29). The earlier brand restriction on emoji in public-facing material is retired; keep the audience-card, quick-action and help-link emoji.
- **PEA is open to school staff** as well as families and caregivers — for example, family liaisons and teachers (Danny Hernández, 2026-09-25). Stated on the home page (“What is PEA?”), in “Is PEA a fit for me?” on How to take part, and in the FAQ. In Spanish, use **maestros**, not “docentes.”
- **PEA is free for every participant.** How seats are funded (including district-paid seats) is intentionally **not** published on this site.
- **Do not reintroduce** the financial-incentive FAQ or the “Lo que cambió este año / What changed this year” before-and-after section; both were removed at Danny Hernández’s direction on 2026-09-25.
- **Class cards (v0.21.0, Danny Hernández, 2026-10-06).** Every Calendar card shows its description on the card (three lines, full text when open). Opening a class shows **Materiales de la sesión / Session materials** and **Recursos / Resources** — one row per item: Spanish title · ES | English title · EN, showing only versions that have a link; a section with no links (or whose week has not opened) is left out — then the Zoom note, *Agregar a mi calendario*, and three buttons: **🎟️ Encuesta de salida / Exit Ticket** (`links.global.exit`, prefilled per class with `?prefill_Event+ID=FA26 - MM/DD/YYYY`), **🔁 Reenviar enlace de Zoom / Resend Zoom link** (`links.global.resend`, Airtable form) and **✉️ Avisar una ausencia / Report an absence** (`mailto:pea@allineducation.org`, subject “Ausencia / Absence — {date}”; until the class starts). Materials, resources and the exit ticket unlock week by week on the day of the week's first class (Arizona time); preview with `?today=YYYY-MM-DD`. The **resource list (`bit.ly/pealista`) is retired**; a new resource database is forthcoming, so `resources` lists are empty for now. Materials live in `facts.js → modules[*].materials` as `{ type, es, en }` (titles in `facts.materialTypes`), copied from the Airtable **Modules** table (`tblPkSBzSYKE4cBC6`: Participant Worksheet (ES) — PDF, Participant Communication Tool (ES) — PDF, Participant Resource - Other (ES) — PDF) on 2026-10-06. Only files shared “anyone with the link” are published: held back until shared are the MRGHT (5R) worksheet and the MRGHT communication tool (file IDs in the `facts.js` comment). The 1T Orientation worksheet is published in Spanish and English (added 2026-10-06, v0.21.1); no other English versions exist yet. Descriptions still come from the Modules table (read 2026-09-25); three edits differ from Airtable and should be made there too: MCOMM ES “docentes” → “maestros”; MPIP1 EN “stakeholders” → “key people”; MORIE ES/EN “nueve semanas / nine-week” → “18 clases / 18-class” (and the program name kept as “Parent Educator Academy”). Dates and class titles identify sessions; generated week labels are excluded.
- **Esta semana / This week (v0.21.0).** `#esta-semana` is the one link shared in class. It shows the Monday–Sunday week (Arizona time) that contains today — so Friday–Sunday still show the week that just ended — with every class card fully open, a “Hoy hay clase / Class today” notice on class days, optional weekly notes (`cohorts.FA26.weekNotes["<week>"] = { es, en }`; both languages required by the parity gate), the help card, a preview of next week and a link to the Calendar. Before the first class it says when classes begin; after the last it points to *Después de PEA*.
- **Exit-ticket form check (2026-10-06):** the Airtable form's class field (“Event ID”, read-only, required) was defaulting to **SP26 - 05/12/2026**. The site's per-class prefill should override it; confirm with one real submission, and clear or update that default in Airtable so the plain exit link (Help → Useful links) does not tag submissions to a spring class.
- Lotería is a participant activity and is excluded from this applicant portal. Avoid duplicate long paragraphs and any suggestion that the site logs application steps.

Airtable PEA Calendar (`appIqlWqvk2HkHVRM`, table `tblGVaBk7FSDybGuH`) is the source for event dates/times. The public registry intentionally omits the September 24 info session following the user’s direction; it is not a complete historical Calendar export. Timestamps are UTC and display at UTC−7 (Arizona, no daylight-saving shift).

## Brand and interaction rules

Use approved logo artwork without translating the tagline **Leadership · Power · Justice**, recoloring it or rebuilding the lockup with HTML text. Preserve its proportions. Both languages use the same complete logo.

Keep the compact information-page layout: filled blue or pink section headings, white or gold heading text, modest rounded corners (8px), tinted section backgrounds and aligned cards. Maintain clear contrast, keyboard focus and mobile readability. Use consistent, restrained icons. Keep navigation collapsible.

**v0.12.0 interface (brand exception, approved by Danny Hernández 2026-09-28):** a sticky, translucent header holds the logo, an **ES | EN** pill toggle (`aria-pressed`, announced in the live region) and the menu. Home opens with three audience cards: *Quiero unirme / I want to join* → `#participar`, *Ya estoy inscrito/a / I'm registered* → `#calendario`, and *Ya terminé PEA / I finished PEA* → `#ayuda`. “Is PEA a fit for me?” and the FAQ use `details.accordion-item`. The 16px card radius, pill shapes, Blue-tinted soft shadows and header/bar blur go beyond Brand Standard v4.1.0 §6.10 and are limited to this site. Every colour is still one of the 18 palette values, mapped through the `--color-*` tokens at the end of `hub.css`. `.skeleton-loader` is reserved CSS: the site has no live Airtable feed, and the CSP would block one.

Home quick actions (v0.14.0, per Danny's 2026-09-29 markup): **Ver calendario / View calendar**, **Registro a la sesión informativa / Info session registration** and **WhatsApp al equipo / WhatsApp the team**. Three bottom actions persist: **Inicio / Home**, Calendar and WhatsApp. The interest form is reached through the join steps. The third audience card reads *Ya terminé PEA / I finished PEA*. Avoid the ambiguous standalone label “Zoom.” Links open in the same tab.

## Date-dependent behavior and pending work

The app selects a confirmed cohort automatically. Projected Spring 2027 is not promoted. The `info` registration link disappears once no future information session remains. These checks use event **end** timestamps. The current date is refreshed on rendering; the site is not a scheduled publishing service.

For local review, `?lang=en&today=2026-10-02#participar` previews the day after the info session. Do not distribute staff preview URLs as applicant links.

For Spring 2027, obtain the language and full calendar before changing projected status or cohort promotion. Recheck all cohort-specific copy and dates during rollover.

## Local preview and checks

From the repository root:

```sh
node maintenance/scripts/check-parity.js
node --check site/assets/js/app.js
node --check site/assets/js/facts.js
node --check site/assets/js/copy.js
git diff --check
python3 -m http.server 8770 --bind 127.0.0.1 --directory site
```

Open `http://127.0.0.1:8770/?lang=es` and `?lang=en`. Local Python hosting does not apply Netlify headers or redirect aliases. For changed content, check affected routes in both languages; for layout changes, review phone and desktop widths, including 320px. Verify real link destinations without submitting test applications or sending messages. The parity check validates dictionary structure and vocabulary, not translation quality, factual accuracy or links.

## Publishing and rollback

Netlify project `apply-pea` (team `azdanhz`, site ID `47e247f5-7ecd-45a1-b487-9c24dc9c6e43`) publishes `site/` from repository branch `main`. Build command: `node maintenance/scripts/check-parity.js`. Node: `22`. Future updates should flow through GitHub; do not replace this workflow with a manual upload.

1. Review the diff and run relevant checks.
2. Commit and push the intended changes to `main` (or merge a reviewed branch).
3. Confirm the Netlify production deployment is ready and references the intended commit.
4. Reopen the production site and verify the affected routes, languages and links. A successful push alone does not establish publication.
5. Update release metadata in `app.js` and `index.html` for site releases, preserve factual source-check dates unless reverified, and refresh this handoff when its facts change. Documentation-only changes do not require a site version bump.

Rollback by reverting the faulty commit in GitHub and deploying that revert. A Netlify restore can provide an emergency recovery, but reconcile the repository afterward so the next automatic deployment does not restore the defect. Never force-reset shared history as a routine rollback.

## Verification and release history

The dated entries below describe their respective releases, including superseded behavior and past pending decisions. Use current entry guidance and later approved corrections for new work.

On September 25, all **18 served files** matched site revision `d7af9ce6dab19973936b634777f70473c695c951` byte for byte; the four aliases returned successful destinations and the production CSP header was present. See the receipt for hashes. This is site parity evidence, not a new Airtable audit or proof that an external form submission succeeds.

v0.11.0 QA (pre-deploy, local): see [maintenance/qa/v0.11.0.md](maintenance/qa/v0.11.0.md).

Earlier QA: v0.10.0 checked nine routes in both languages at phone/desktop widths and 16 external URLs; v0.10.1 checked the compact layout and logo at 320/390/1100px; v0.10.2 verified the October 1 session and recording wording. External links and authoritative Airtable records were **not freshly re-audited for this documentation update**.

- v0.10.0: action-first information site, revised navigation, removal of progress tracking, updated links and schedule copy.
- v0.10.1: original logo, untranslated tagline, compact sizing, rounded-corner headings, explicit Zoom registration label.
- v0.10.2: removal of September 24 session details; October 1 registration and recording guidance.
- v0.11.0: expandable class details in Calendar (module descriptions, Zoom registration, worksheet, resources and individual calendar downloads); financial-incentive FAQ and before/now section removed; school staff welcomed; free for every participant; “docentes” → “maestros”; parity gate now checks module descriptions and flags “docentes” and week-count language.
- v0.12.0: design tokens mapped to the palette, sticky header with ES | EN pill toggle, floating bottom action bar with safe-area padding and icon-above-label layout, Home audience router cards, accordion eligibility and FAQ, reserved skeleton utility. See [maintenance/qa/v0.12.0.md](maintenance/qa/v0.12.0.md).
- v0.13.0: Participar gains a 3-step applicant orientation timeline, a help card (email/call, 48px targets) beside the join CTAs, and a program-details/commitment accordion; audience icons 📝 🎓 🤝. See [maintenance/qa/v0.13.0.md](maintenance/qa/v0.13.0.md).
- v0.21.5 (Danny Hernández, 2026-10-08): on the **English** page, a class card's Session materials adds **Presentation · EN** from the Airtable Calendar field *Presentation URL (View Only) - EN* (`presentation_en` on the class; only 1R has one so far — its link sits on the 1T row in Airtable and belongs to 1R, per Danny). The exit survey for **1T and 1R** is the Jotform FA26 pre-survey (`https://form.jotform.com/team/261975497443068/pea_fa26_pre`), set per class with `exit`; other classes keep the prefilled Airtable exit ticket.
- v0.21.4 (Danny Hernández, 2026-10-07): the **Encuesta de salida / Exit Ticket** button is hidden, not greyed, until it is live. It first goes live on **Thursday, October 8, 2026** (Arizona time; `links.global.exitOpensOn`), and after that on the day of each week's first class. Class cards show the remaining buttons until then.
- v0.21.3 (Danny Hernández, 2026-10-06): 1T Orientación / Orientation worksheet links updated to the **v1.1.1** PDFs in the Session Materials folder (ES `1rtHSJog…`, EN `1o52Fa0o…`, both shared “anyone with the link”). `bit.ly/peafa26semana` archived in Bitly (the API cannot delete a custom back-half link).
- v0.21.2 (Danny Hernández, 2026-10-06): shared shortlink is now **`https://aie.s.gy/esta-semana`** (bit.ly does not work for this site); every class card's **Recursos / Resources** lists *Unirse al grupo de WhatsApp de la cohorte* (`bit.ly/peafa26whatsapp`) and *Ver el calendario de PEA* (`bit.ly/peafa26cal`) from `cohorts.FA26.classResources`; *Agregar a mi calendario* is now an outlined button with a 📅 icon. QR code regenerated for the new shortlink (`maintenance/assets/qr/*_v1.1.0`).
- v0.21.1 (Danny Hernández, 2026-10-06): 1T Orientación / Orientation participant worksheet published on its class card in Spanish and English (PDFs shared “anyone with the link”). A Session materials or Resources section appears only when it has at least one link, and a row shows only the language versions that have a link — no “Disponible pronto / Available soon” notes (Danny Hernández, 2026-10-06).
- v0.21.0 (Danny Hernández, 2026-10-06): **Esta semana / This week** page (`#esta-semana`, aliases `/esta-semana` and `/this-week`, shortlink `bit.ly/peafa26semana`, replaced in v0.21.2 by `aie.s.gy/esta-semana`); descriptions on every Calendar card; session materials and resources (ES | EN rows) replace the Class materials and Resource list buttons; class buttons are now Encuesta de salida / Exit Ticket (prefilled per class), Reenviar enlace de Zoom / Resend Zoom link and Avisar una ausencia / Report an absence; resource list retired; class-language copy now says PEA is offered in Spanish and English, adjusted by staff capacity and interest; English “exit survey” wording → “exit ticket”; Home *I'm registered* card opens This week. Plan: [maintenance/plans/this-week-page-plan-v1.1.md](maintenance/plans/this-week-page-plan-v1.1.md); QA: [maintenance/qa/v0.21.0.md](maintenance/qa/v0.21.0.md).
- v0.20.2 (Danny Hernández, 2026-10-02): Team page — Danny’s photo re-cropped (from the original 480×600: 422×528 region at x 36, y 71, scaled back to 480×600) so both head tops sit at the same height as Denia’s. Home page — the inline “Ver calendario / View calendar” and “WhatsApp al equipo” buttons removed because the sticky bar already carries both; the information-session button stays inline while an upcoming session exists, and the row disappears when it has no buttons.
- v0.20.1 (Danny Hernández, 2026-10-01): staff titles confirmed — Danny Hernández, “Gerente de Impacto Comunitario y Aprendizaje / Community Impact & Learning Manager”; Denia Uriarte, “Gerente de programas de liderazgo / Leadership Programs Manager”. Graduate recognition split by county: **Maricopa, Monday December 14, 2026, 9:00–11:00 AM** (`RECM`, shown as a milestone); **Yuma still undated** (`RECY`, hidden until dated). Milestones in the .ics download carry no location (no venue is published) and are marked free time.
- v0.20.0 (Danny Hernández, 2026-10-01): **Milestones** on the Calendar, with a “Fechas clave / Milestones” filter. Orientation and Graduation carry “Inicio del curso / Cohort begins” and “Cierre del curso / Cohort ends” tags (`milestone: "start" | "end"` in facts.js). **Applications open for the next cohort** is computed: all day on the Wednesday after the cohort's 3rd class (FA26: Oct 14 → Spring 2027 becomes the form's default and Fall 2027 is added; set by `applySwitch` on the cohort; the switch in the Airtable form itself is still made by hand). **Maricopa & Yuma County Graduate Recognition** is stored as `REC` with `start: null`: undated events never render; add start/end to publish it. Milestones use the `badge-hito` badge (Charcoal on Gold tint) and download as all-day .ics events. **Up next** on Home: the next 2 dated events (no-class days excluded), each linking to `#calendario/<COHORT>-<CODE>`, which opens and scrolls to that card; it is a status strip, not a collapsible section. **PEA team** page (`#equipo`): Danny Hernández and Denia Uriarte, with photos (480×600 JPEG), titles and firstname@allineducation.org; Questions & help links to it. Pending: Denia's title and approval of Danny's Spanish title. The interest form stays the Airtable form.
- v0.19.0 (Danny Hernández's calendar spec, 2026-09-30): the Calendar table is replaced by **date-badge cards** (72px date tile: month · day · weekday; category badge; title; 🕒 time) grouped under **sticky month dividers** that pin flush below the header (`--header-h` corrected to the measured 68px desktop / 64px phone). Tapping a card still opens its details and three class buttons; filters, past/today states and the 60-second refresh are unchanged. Badges: Clase = Blue on Blue tint; Sesión informativa = Charcoal on Pink tint (12px Pink text fails contrast), plus a Pink left edge on the card; Graduación = Charcoal on Gold tint (the spec's #8A6100 is off-palette); Grupo de enfoque = Purple on Purple tint (the spec's “Especial” slot); No hay clase = Charcoal on #F5F5F5. Spec tokens (`--brand-*`, `--tint-*-fill`, `--radius-badge`, `--shadow-card`) alias palette values; the spec's #F8FAFC / #E2E8F0 / slate shadows map to #F7F7F7 / #E7E7E7 / Blue-tinted shadows. Bottom buttons: “Descargar todas las fechas (.ics)” (solid Blue) and “Ver en calendario público / View the public calendar” (2px Blue outline), 48px tall, side by side on wider screens.
- v0.18.3 (Danny Hernández, 2026-09-30): Orientation (MORIE) description keeps only its first sentence, followed by a rewrite of the four learning goals (preparing for school conversations, knowing whom to contact, supporting learning at home, taking part in your community), with every detail from the retired “Lo que va a aprender / What you'll learn” cards. “Imagine una clase de PEA / Picture a PEA class” became the FAQ “¿Cómo es una clase de PEA? / What is a PEA class like?” (exit-survey length stays in its own FAQ; 18 questions now). Calendar ends with only “Próximas fechas / Coming up”. MORIE now differs from the Airtable Modules table; update Airtable to match.
- v0.18.2 (Danny Hernández, 2026-09-30): Spanish program name is **Academia de Padres Educadores** everywhere (page title, header, meta description, History origin paragraph, MORIE class description, web-app name, and ES/EN pairs on og:title, the no-JavaScript fallback and the 404 page). “PEA”, “ALL In Education” and the tagline stay untranslated. The parity gate now fails on any breach. New `CLAUDE.md` carries these rules and the approved description for future sessions.
- v0.18.1 (text supplied by Danny Hernández, 2026-09-30): Home “¿Qué es PEA? / What is PEA?” replaced verbatim with the new two-paragraph description (`home.what` + `home.what2`): an introductory leadership and family engagement program, primarily for parents and caregivers in Arizona, also welcoming school staff and community liaisons. The Spanish text names the program **Academia de Padres Educadores (PEA)** (applied site-wide in v0.18.2).
- v0.18.0 (approved by Danny Hernández, 2026-09-30): History panel renamed **Nuestras raíces / Our roots**. Design-spec tokens added with the spec's names but **palette values** (Danny's choice): `--color-text-primary` #333333, `--color-text-secondary` #707070 (AA, not AAA), `--color-text-inverse` white, `--color-bg-page` #F7F7F7, `--color-primary` Blue, `--color-primary-hover` Blue Mid; 8pt spacing scale `--space-1…8`; `--radius-sm/md/lg/full` (8/12/16/9999); `--shadow-top`. Shadows stay Blue-tinted. `h3` joins `h1`/`h2` at weight 900. Subpages show a **‹ Volver / Back** link (to Home) left of the logo; on phones (≤560px) it sits beside the round AIE mark, and up to 900px the header title text hides on subpages so the logo is never squeezed. The bottom bar (`nav.quick-actions-bar`) is now `position: sticky` with `--shadow-top`, 12px padding, a safe-area bottom inset and 48×48px minimum buttons; the body is a flex column so the bar sits at the screen bottom on short pages and never covers the footer. Header controls stay at the 44px brand minimum.
- v0.17.0 (approved by Danny Hernández, 2026-09-30): every titled section on every page is a collapsible panel, closed by default (the coloured heading bar is the toggle; eligibility and FAQ items also start closed). Open panels stay open through the 60-second refresh and a language switch. Home trimmed to a router — “Is PEA a fit for me?” and “The time you'll need” moved to How to take part; “What you'll learn” moved to Calendar (whose schedule note already covers fall dates). History's origin paragraphs and stats sit in a new “How PEA began / Cómo empezó PEA” panel. The footer no longer shows the “Dates: PEA calendar, verified…” line. Kept open on purpose: the Calendar table and the four steps on How to take part.
- v0.16.0: every class card in Calendar ends with the same three buttons, aligned along the bottom — 📄 Class materials, 🎟️ Survey / Encuesta, 📚 Resource list (one column on phones). Buttons are placeholders until their week opens, then unlock two classes at a time on the day of the week's first class; a class without a worksheet keeps a greyed “Available soon” Class materials button; calendar hint updated in both languages.
- v0.15.1: info-session copy is date-aware (the step-3 item, info card note, calendar detail and FAQ switch to “already taken place” wording once the session ends, so nothing points to an expired link); separate Call (`tel:`) and Text (`sms:`) actions in the help card and contact list; resend-flow build spec v0.2.0 (count written only after a successful send; daily team digest, duplicate and flood guards instead of one alert per submission). Resolves GitHub issues 5–8.
- v0.15.0: voice pass on every page in both languages (brand voice §11: warm, clear, action first); 7 pages reduced to 5 (Zoom help folded into How to take part, Contact folded into Questions & help); Home reordered for newcomers with a compact 4-step summary; FAQ trimmed to 17 journey-ordered questions; exit-ticket/exit-survey wording unified; optional `resend` link slot for a future Airtable “resend my Zoom link” form. See [maintenance/qa/v0.15.0.md](maintenance/qa/v0.15.0.md).
- v0.14.0: interest form is the application; all class Zoom registration links and wording removed; 4-step “from your interest form to your first class” flow with the personal Zoom link from the welcome email; info-session link labelled “only”; “What you'll learn” merged into Calendar and “Links” merged into Questions; home and bottom actions trimmed; school-personnel guidance added. See [maintenance/qa/v0.14.0.md](maintenance/qa/v0.14.0.md).

The old `allined-pea.netlify.app` site and the original ZIP are historical comparison sources, not the release authority for this repository. Current approved corrections and the sources above govern future changes.

Release corrections on September 27: no class-week labels or applicant exit-survey actions; Zoom recovery directs visitors to spam and team support; secondary text contrast improved. Periodic calendar refresh defers while focus is within the main content. Fresh visual/browser QA was unavailable because no browser surface was connected; generated-page, date-preview, syntax and source checks were used, and this limitation remains explicit.

Production v0.11.0 verified September 27, 2026 (Arizona): commit `2579aefe37100b78c986709bab50a1358300ebd7`, Netlify deploy `6ab9aff63b51d500084fab14`, 18 served files match; aliases and CSP presence pass.
