# PEA “Sugerir un recurso / Suggest a resource” — plan v1.0

Prepared for Danny Hernández · November 14, 2026 · Site code built in release **v0.24.0** · Audience: internal (PEA team)

## Context

*Materiales y recursos* (`#recursos`, v0.23.0–v0.23.16) lists every material and resource from the class cards, by topic. Today only staff can add to it (by editing `facts.js`). Danny wants participants to be able to add their own resources: a straightforward flow that asks for the minimum needed so the team can **receive → check alignment → vet quality → publish**.

What exists already (found 2026-11-14):
- Airtable base **PEA Resource List** (`app1VeAGxcVHsV2bQ`) — the planned "resource database". Its **Submissions** table (`tblI4gAXJqMXHrpYz`) already has name, email, confirm email, resource name, URL, description, category suggestion, language (English / Spanish / Bilingual), location, review status (New / Approved / Rejected) and reviewer notes. 1 record (a rejected test). **No form exists** (no interfaces or forms in the base).
- Its **Resources** table has Status (Published / Under Review / Archived), Submission Type (incl. *PEA Alumni*, *District/School Personnel*), *ALL in Education Approved?*, Notes (Internal).
- The site CSP has `form-action 'none'` and `connect-src 'self'`, so the site cannot hold a form; it links out to Airtable forms (same pattern as the exit ticket and the Zoom resend form).

Decisions (Danny Hernández, 2026-11-14): suggestions go to the **PEA Resource List** base; ask for **name + phone/WhatsApp or email**; **no credit label** on the public site; this plan is saved as a **repo .md, internal audience**.

> **Update 2026-11-14 (Danny Hernández): alumni only for now.** The current, exact form is specified in [maintenance/specs/suggest-resource-form.v1.json](../specs/suggest-resource-form.v1.json): link, description, topic, name, the email used in PEA (required), and phone/WhatsApp (optional). There is no Alumni ID picker on the public form; an automation matches the email to the *All alumni* table, and *Email Confirmation* shows Match or Missing. The spec overrides the table below where they differ.

## 1. The form — "Sugerir un recurso / Suggest a resource"

Airtable form on the Submissions table. Bilingual labels, Spanish first. **Six questions, five required (the sixth is one optional tap).** About one minute on a phone.

| # | Question (ES / EN) | Type | Req. | Help text |
|---|---|---|---|---|
| 1 | Enlace del recurso / Link to the resource | URL | ✅ | Copie y pegue el enlace. / Copy and paste the link. |
| 2 | ¿Qué es y cómo ayuda a las familias? / What is it, and how does it help families? | Long text | ✅ | Una o dos oraciones. / One or two sentences. |
| 3 | Tema / Topic | Single select: the 7 main topics (ES / EN names from `facts.topics`) + *No estoy seguro/a / Not sure* | ✅ | — |
| 4 | Su nombre / Your name | Short text | ✅ | — |
| 5 | Teléfono (WhatsApp) o correo electrónico / Phone (WhatsApp) or email | Short text | ✅ | Solo para preguntas sobre su sugerencia. / Only for questions about your suggestion. |
| 6 | ¿Usted es…? / Are you…? | Single select: Participante de PEA · Egresado/a de PEA · Personal escolar · Otro | optional | — |

Form intro (one line): *Comparta un sitio web, video o documento gratuito que le haya ayudado. El equipo de PEA lo revisará antes de publicarlo.* / *Share a free website, video or document that helped you. The PEA team reviews it before it is published.*
Footer note: *No incluya información personal de su familia.* / *Please don't include your family's personal information.*
Confirmation message: *¡Gracias! Revisamos las sugerencias cada dos semanas.* / *Thank you! We review suggestions every two weeks.*

Not asked (staff fill these during review): resource titles ES/EN, language(s) the link serves, organization, location. The existing **Email / Confirm Email / Category Suggestion / Location / Resource Name** fields stay in the table but are left off the form.

### Table changes (Submissions)

Add: **Topic** (single select, 13 keys incl. sub-topics, so staff can refine), **Contact** (short text), **Role** (single select), **Received** (created time), **Alignment** (multiple select, A1–A4 below), **Quality** (multiple select, Q1–Q6), **Reviewer** (collaborator), **Decided on** (date), **Title (ES)**, **Title (EN)**, **Languages** (multiple select: es / en).
Review Status choices become: **New → In review → Approved → Published**, plus **Not now** and **Duplicate** (rename *Rejected* → *Not now*; keeps the test record).
One Airtable automation: on a new record, email `pea@allineducation.org` ("Nueva sugerencia de recurso").

## 2. Review — alignment, then quality

A reviewer checks every box before approving. Any unchecked box → **Not now** (with a one-line reviewer note) or **Duplicate**.

**Alignment** (does it belong on a PEA page?) — drawn from the approved PEA description:
- **A1** Helps families understand or navigate the school system, advocate for their children, or support learning at home.
- **A2** Fits one of the 7 topics (reviewer sets the final topic/sub-topic).
- **A3** Useful to Arizona families or school staff (Arizona-specific, or national and applies here).
- **A4** Free to use.

**Quality** (is it trustworthy and usable?):
- **Q1** Link opens on a phone, no login or paywall.
- **Q2** Credible source: government, school/district, university, library, or established nonprofit.
- **Q3** Current: dates, deadlines and figures still accurate (flag time-sensitive items with a review date in Notes).
- **Q4** No selling, heavy ads, political campaigning, or requests for personal data beyond what the service needs.
- **Q5** Languages verified: record which languages the link really serves (feeds `langs`); a Spanish link must have real Spanish content.
- **Q6** Not already on *Materiales y recursos* (search the page).

Cadence: **every two weeks**, one reviewer (assigned by Danny). Reviewer writes Title (ES) / Title (EN) using the site's naming and vocabulary rules (README and CLAUDE.md; never translate ALL In Education).
Optional follow-up to the submitter (Contact field) when published or "not now" — short ES/EN message templates included in the plan doc.

## 3. Publish — onto the site (updated 2026-11-14: Airtable is the source)

Since v0.24.0 the PEA Resource List base is authoritative ([resource-base-plan-v1.0.md](resource-base-plan-v1.0.md)). On approval the reviewer creates a **Resources** row (Status **Published**, Kind *Outside resource*, Title (ES/EN), links, Languages served when one link serves both pages, **Topic**, no class) and links it to the Submission. The next sync (*Sync resources from Airtable*, on demand or daily) brings it to the site as a pull request. Rows with no class, group or featured placement are community rows: they appear only on Materiales y recursos under their Topic, in search, filters and counts, **with no credit label** and not on class cards. `facts.communityResources` is no longer edited by hand; `resources.js` fills it.

## 4. Site changes (v0.24.0)

| File | Change |
|---|---|
| `site/assets/js/facts.js` | `links.global.suggest` (Airtable form URL; empty until the form exists → button hidden). New `communityResources: []`. |
| `site/assets/js/app.js` | `resourceIndex()` (≈ line 677): after the class walk, push each linked `communityResources` item through the existing `fresh()` de-dupe into `bucket(item.topic).res`. Reuses `hasLink`, `linkKey`, `splitByLang`, `resSection` — no new renderers. `pageRecursos()` (≈ line 756): a small "💡 Sugerir un recurso" card after the topic list, and a line + link in the no-results callout (`#resnone`). Release metadata → v0.24.0. |
| `site/assets/js/copy.js` | ES/EN strings under `res`: `addH` (*¿Conoce un recurso útil? / Know a helpful resource?*), `addLead` (*El equipo de PEA lo revisa antes de publicarlo. / The PEA team reviews it before it is published.*), `addCta` (*Sugerir un recurso / Suggest a resource*), `addNone` (*¿Conoce un recurso que debería estar aquí? / Know a resource that should be here?*). |
| `site/assets/css/hub.css` | Reuse the Home card / `callout` styles; at most a few lines, palette tokens only. |
| `maintenance/scripts/check-parity.js` | `communityResources`: `topic` must be a known `facts.topics` key; a Spanish link needs `title_es`; an `any` link needs `langs` (same rules as module resources); vocabulary rules on titles; `links.global.suggest`, when set, must be an `https://airtable.com/` URL. |
| `site/index.html` | Version → v0.24.0. |
| `README.md` | Release note; Approved content line on suggestions (form, review cadence, no credit label). |
| `maintenance/plans/resource-suggestions-plan-v1.0.md` | This plan, for the PEA team (internal). |
| `maintenance/qa/v0.24.0.md` | QA note. |

Links open in the same tab (site rule). Shared links stay Spanish (`/recursos`, `https://aie.s.gy/recursos`).

## 5. Status and order of work

| # | Step | Status (2026-11-14) |
| --- | --- | --- |
| 1 | This plan in the repo | Done |
| 2 | Site code (§4), v0.24.0 | Done. `links.global.suggest` is empty, so the card stays hidden and v0.24.0 can ship before the form |
| 3 | Airtable: Submissions fields and status choices (§1) | Pending Danny's approval |
| 4 | Airtable: the form, from the table in §1 | Pending |
| 5 | Airtable: notification automation to `pea@allineducation.org` | Pending |
| 6 | Paste the form URL into `links.global.suggest`, run the checks, release | Pending the form URL |

Note on §4: the strings are named `add*` because `suggestH` was already the search's "Pruebe con:" label. The card reuses the help-card styles plus four lines of CSS (`.rec-add`).

## 6. Follow-up messages (optional, by text or email)

**Published**

> ES: ¡Hola, {nombre}! Gracias por sugerir {recurso}. Ya está en Materiales y recursos: https://aie.s.gy/recursos — Equipo de PEA · ALL In Education
>
> EN: Hi {name}! Thank you for suggesting {resource}. It's now on Materials & resources: https://aie.s.gy/recursos — PEA team · ALL In Education

**Not now**

> ES: ¡Hola, {nombre}! Gracias por sugerir {recurso}. Por ahora no lo vamos a agregar a Materiales y recursos ({motivo breve}). ¡Siga compartiendo lo que le ayuda! — Equipo de PEA · ALL In Education
>
> EN: Hi {name}! Thank you for suggesting {resource}. We won't be adding it to Materials & resources for now ({short reason}). Please keep sharing what helps you! — PEA team · ALL In Education

The shortlink `https://aie.s.gy/recursos` opens the Spanish page (shared-link rule); it works once Danny creates it (resource-index plan, open item 1).

## Verification

- `node maintenance/scripts/check-parity.js`, `node --check` on the three JS files, `git diff --check`.
- Parity negative tests (scratchpad copies): unknown topic, Spanish link without `title_es`, `any` without `langs` → each fails.
- Local preview `python3 -m http.server 8770 --bind 127.0.0.1 --directory site`, `?lang=es#recursos` and `?lang=en#recursos`: with a temporary test item in `communityResources`, confirm it shows under the right topic, counts rise by one, search finds it, the language and *Otras organizaciones* filters include it, and no class card shows it; remove the test item.
- Suggest card hidden when `suggest` is empty; visible and pointing to the form when set; no-results callout shows the link. Phone 320/390px and desktop; keyboard focus.
- Airtable: one test submission from a phone (then mark it *Not now*), confirm the notification email arrives and every required field enforces.

## Fit check

- **Simple:** five required short questions, one link on the page families already use; reviewers tick ten boxes.
- **Sustainable:** one reviewer every two weeks; publishing is the same `facts.js` edit staff already make, guarded by the parity check.
- **Right-size:** reuses the existing resource base and site renderers, no new service; when the database feeds `facts.js` automatically later, `communityResources` is filled the same way.
