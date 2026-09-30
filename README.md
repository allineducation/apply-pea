# PEA applicant portal

Prepared by Danny Hernández · Handoff updated September 27, 2026 · Site release **v0.11.0**

The Parent Educator Academy (PEA) applicant portal is a public, bilingual information site for families, caregivers and school staff. It explains the program and routes visitors to the interest form, class registration, information session, calendar and team support. It does not track an applicant’s progress.

- Live site: https://apply-pea.netlify.app/
- Repository: https://github.com/allineducation/apply-pea
- Netlify project: https://app.netlify.com/projects/apply-pea
- Machine-readable handoff: [HANDOFF.json](HANDOFF.json) (dated snapshot from before v0.14.0; where it mentions class Zoom registration, this README governs)
- Latest production verification: [v0.11.0 production receipt](maintenance/qa/production-v0.11.0-2026-09-27.json)

## Start here

Read this README and `HANDOFF.json`, inspect the current branch and working tree, then check the live site before making changes. The JSON is a dated snapshot, not a live data feed. `site/assets/js/facts.js` is the application’s fact registry; authoritative program sources and Danny Hernández’s approved corrections take precedence over this snapshot.

This repository is public. Keep credentials, participant records, private Zoom join links and other sensitive material out of it. Documentation lives outside `site/`, so it is available in GitHub but is not part of the applicant-facing Netlify publish directory.

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

Five pages (v0.15.0), ordered along the family's path: `#inicio` (newcomers: what PEA is → is it for me → what you'll learn → dates and time → how to join), `#participar` (applicants: the four steps → info session → Zoom help → school personnel), `#calendario` (enrolled: schedule, class topics, what a class is like, next cohort), `#historia` (stories, history, evaluation, mission) and `#ayuda` (talk with the team → FAQ → useful links → after PEA). Retired hashes redirect within the app: `#lista` and `#zoom` → `#participar`; `#programa` → `#calendario`; `#preguntas`, `#enlaces` and `#contacto` → `#ayuda`.

Language selection is `?lang=es` or `?lang=en`, then the stored `aie_lang` preference, then Spanish by default. `/es` and `/en` are server aliases; `/inscripcion` and `/join` open the corresponding participation page. Only language preference is stored locally. There is no checklist, progress storage, embedded application form or analytics integration in the current application code. External forms and messaging services operate separately.

## Approved applicant content

- **922 PEA alumni** is authoritative, excluding the staff test record. Verify future alumni and participation figures first in the **AIE Alumni** Airtable base (`appAnb90zo02mNqpi`). Distinguish unique alumni from participation records; do not substitute the uncorrected 923 count.
- Fall 2026 has **18 scheduled classes**, Tuesdays and Thursdays, **5:00–6:30 PM Arizona time**, October 6–December 8. No class on Thanksgiving, November 26. The focus group is December 10. Describe scheduled classes, not nine or ten weeks.
- The remaining information session is **October 1, 2026, 5:00–6:30 PM Arizona time**. September 24 session details were removed from the public event list, date cards and calendar export. Do not reintroduce two-date copy.
- **Entry path (Danny Hernández, 2026-09-29): the interest form is the application.** There is no acceptance step and no commitment form. The team sets up each applicant's Zoom access and sends a **personal Zoom access link** in the welcome email; the same link is used for every fall class and records attendance. The site publishes **no class Zoom registration link** and no “Registro en Zoom / Register on Zoom” wording; do not reintroduce them. Participation follows four steps: interest form → welcome email and personal Zoom link → get ready → join the first class (Tuesday, October 6, 5:00 PM), then waiting in the PEA Virtual Waiting Room.
- The information session (October 1, 5:00–6:30 PM, confirmed by Danny Hernández 2026-09-29) is optional. Its registration link (`bit.ly/peafa26info`) stays on the site and is labelled as **for the information session only**. Info-session recording wording was removed; visitors who cannot attend are directed to call or text 602-759-0619.
- School personnel guidance: help families complete the interest form, find their welcome email and contact the team; each applicant receives a personal Zoom access link.
- The interest form defaults to Fall 2026 and allows Spring 2027 selection, as confirmed by Danny Hernández. Spring dates are March 16–May 13, 2027 and appear only on Calendar. No spring Zoom link is published. The full spring calendar and teaching language require confirmation before promotion.
- **No certificate or minimum-attendance details are published** (removed at Danny Hernández's direction, 2026-09-29). Do not reintroduce the 16-of-18 rule without an approved program source.
- **Class language (Danny Hernández, 2026-09-29):** Fall 2026 is taught in Spanish with English supports (for example, translated subtitles or small-group work), planned around applicant need. Delivery can shift if English applications increase. Do not publish the internal enrollment threshold for a separate English class. Applicants state their language on the interest form.
- **Emoji are approved** on this site (Danny Hernández, 2026-09-29). The earlier brand restriction on emoji in public-facing material is retired; keep the audience-card, quick-action and help-link emoji.
- **PEA is open to school staff** as well as families and caregivers — for example, family liaisons and teachers (Danny Hernández, 2026-09-25). Stated on the home page (“What is PEA?” and “Is PEA a fit for me?”) and in the FAQ. In Spanish, use **maestros**, not “docentes.”
- **PEA is free for every participant.** How seats are funded (including district-paid seats) is intentionally **not** published on this site.
- **Do not reintroduce** the financial-incentive FAQ or the “Lo que cambió este año / What changed this year” before-and-after section; both were removed at Danny Hernández’s direction on 2026-09-25.
- **Class details in Calendar.** Each class (and the information session) expands to show a description, a note to join with the personal Zoom link from the welcome email, and individual calendar downloads. Every class card ends with the same three buttons, aligned along its bottom: **📄 Class materials** (the participant worksheet), **🎟️ Survey / Encuesta** (exit survey, `links.global.exit`) and **📚 Resource list** (`links.global.lista`). All three start as greyed placeholders that say when they open. They unlock week by week, two classes at a time: both classes of a week open on the day of that week's first class (Arizona time), e.g. 1T and 1R on October 6. After its week opens, a button whose link isn't published yet (a class with no `worksheet` in `facts.js`) stays greyed and says “Available soon / Disponible pronto”; add the URL to switch it on. Preview any date with `?today=YYYY-MM-DD`. Descriptions and worksheets live in `facts.js → modules`, copied from the Airtable **Modules** table (`tblPkSBzSYKE4cBC6`: Description ES/EN, Participant Worksheet (ES) — PDF) on 2026-09-25; each class event names its `module`. Three edits differ from Airtable and should be made there too: MCOMM ES “docentes” → “maestros”; MPIP1 EN “stakeholders” → “key people”; MORIE ES/EN “nueve semanas / nine-week” → “18 clases / 18-class” (and the program name kept as “Parent Educator Academy”). Worksheets exist for 3T, 3R, 6R, 7T, 7R and 8T; all six Drive files were confirmed shared “anyone with the link.” Exit surveys were excluded from this calendar until v0.16.0; Danny approved adding the exit survey to every class card on 2026-09-29. Dates and class titles identify sessions; generated week labels are excluded.
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

On September 25, all **18 served files** matched site revision `d7af9ce6dab19973936b634777f70473c695c951` byte for byte; the four aliases returned successful destinations and the production CSP header was present. See the receipt for hashes. This is site parity evidence, not a new Airtable audit or proof that an external form submission succeeds.

v0.11.0 QA (pre-deploy, local): see [maintenance/qa/v0.11.0.md](maintenance/qa/v0.11.0.md).

Earlier QA: v0.10.0 checked nine routes in both languages at phone/desktop widths and 16 external URLs; v0.10.1 checked the compact layout and logo at 320/390/1100px; v0.10.2 verified the October 1 session and recording wording. External links and authoritative Airtable records were **not freshly re-audited for this documentation update**.

- v0.10.0: action-first information site, revised navigation, removal of progress tracking, updated links and schedule copy.
- v0.10.1: original logo, untranslated tagline, compact sizing, rounded-corner headings, explicit Zoom registration label.
- v0.10.2: removal of September 24 session details; October 1 registration and recording guidance.
- v0.11.0: expandable class details in Calendar (module descriptions, Zoom registration, worksheet, resources and individual calendar downloads); financial-incentive FAQ and before/now section removed; school staff welcomed; free for every participant; “docentes” → “maestros”; parity gate now checks module descriptions and flags “docentes” and week-count language.
- v0.12.0: design tokens mapped to the palette, sticky header with ES | EN pill toggle, floating bottom action bar with safe-area padding and icon-above-label layout, Home audience router cards, accordion eligibility and FAQ, reserved skeleton utility. See [maintenance/qa/v0.12.0.md](maintenance/qa/v0.12.0.md).
- v0.13.0: Participar gains a 3-step applicant orientation timeline, a help card (email/call, 48px targets) beside the join CTAs, and a program-details/commitment accordion; audience icons 📝 🎓 🤝. See [maintenance/qa/v0.13.0.md](maintenance/qa/v0.13.0.md).
- v0.16.0: every class card in Calendar ends with the same three buttons, aligned along the bottom — 📄 Class materials, 🎟️ Survey / Encuesta, 📚 Resource list (one column on phones). Buttons are placeholders until their week opens, then unlock two classes at a time on the day of the week's first class; a class without a worksheet keeps a greyed “Available soon” Class materials button; calendar hint updated in both languages.
- v0.15.1: info-session copy is date-aware (the step-3 item, info card note, calendar detail and FAQ switch to “already taken place” wording once the session ends, so nothing points to an expired link); separate Call (`tel:`) and Text (`sms:`) actions in the help card and contact list; resend-flow build spec v0.2.0 (count written only after a successful send; daily team digest, duplicate and flood guards instead of one alert per submission). Resolves GitHub issues 5–8.
- v0.15.0: voice pass on every page in both languages (brand voice §11: warm, clear, action first); 7 pages reduced to 5 (Zoom help folded into How to take part, Contact folded into Questions & help); Home reordered for newcomers with a compact 4-step summary; FAQ trimmed to 17 journey-ordered questions; exit-ticket/exit-survey wording unified; optional `resend` link slot for a future Airtable “resend my Zoom link” form. See [maintenance/qa/v0.15.0.md](maintenance/qa/v0.15.0.md).
- v0.14.0: interest form is the application; all class Zoom registration links and wording removed; 4-step “from your interest form to your first class” flow with the personal Zoom link from the welcome email; info-session link labelled “only”; “What you'll learn” merged into Calendar and “Links” merged into Questions; home and bottom actions trimmed; school-personnel guidance added. See [maintenance/qa/v0.14.0.md](maintenance/qa/v0.14.0.md).

The old `allined-pea.netlify.app` site and the original ZIP are historical comparison sources, not the release authority for this repository. Current approved corrections and the sources above govern future changes.

Release corrections on September 27: no class-week labels or applicant exit-survey actions; Zoom recovery directs visitors to spam and team support; secondary text contrast improved. Periodic calendar refresh defers while focus is within the main content. Fresh visual/browser QA was unavailable because no browser surface was connected; generated-page, date-preview, syntax and source checks were used, and this limitation remains explicit.

Production v0.11.0 verified September 27, 2026 (Arizona): commit `2579aefe37100b78c986709bab50a1358300ebd7`, Netlify deploy `6ab9aff63b51d500084fab14`, 18 served files match; aliases and CSP presence pass.
