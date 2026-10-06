# PEA “Esta semana / This week” page — plan v1.0

Prepared for Danny Hernández · October 6, 2026 · Implemented in site release **v0.21.0** · Audience: internal (PEA team)

## The ask

Give participants one link, shared in every class, where they find everything for the day's class and the week: class details, session materials, resources, the exit ticket, and any other notes.

## Decisions (Danny Hernández, 2026-10-06)

| # | Decision |
| --- | --- |
| Default | Links shared with participants open the **Spanish** version of a page. |
| 1 | Survey button is **“Encuesta de salida / Exit Ticket.”** |
| 2 | Friday–Sunday keep showing the **week that just ended** (the week runs Monday–Sunday, Arizona time). |
| 3 | Paths **`/esta-semana`** (Spanish) and **`/this-week`** (English); shortlink **`bit.ly/peafa26semana`**; QR code in AIE palette colors. |
| 4 | Exit-ticket prefill: build it if the form has a class field. |
| 5 | Weekly notes come in **both ES and EN**. |
| 6 | This plan lives in the repository's `maintenance/` folder. |

Changes requested in the same message:

- **Class language:** remove “Fall 2026 is taught in Spanish” wording. New wording: PEA is offered in Spanish and English; each cohort's options and format may be adjusted based on staff capacity and interest.
- **Resource list retired:** remove the *Lista de recursos* button and link (`bit.ly/pealista`). A new resource database is forthcoming.
- **Class cards carry materials as sections, not buttons:** description, **session materials**, and **resources**. One row per item: Spanish title · ES | English title · EN, each a link where that version exists.
- **Three buttons per class card:** Encuesta de salida / Exit Ticket; Reenviar enlace de Zoom / Resend Zoom link (Airtable form); Avisar una ausencia / Report an absence (email to pea@allineducation.org, subject “Ausencia / Absence — {date}”).
- **Calendar:** description visible on every card; opening a card shows all sections.
- **This week page:** every class detail for the week is visible without tapping.

## What was built

| Area | Result |
| --- | --- |
| Route | `#esta-semana` (menu: *Unirse → Esta semana*). Home's *Ya estoy inscrito/a* card now opens it. |
| Aliases | `/esta-semana` → `/?lang=es#esta-semana`; `/this-week` → `/?lang=en#esta-semana` (`site/_redirects`). |
| Week logic | Monday–Sunday, Arizona time, computed from today. Class days show “Hoy hay clase.” Before the first class: “Las clases empiezan el …”. After the last: link to *Después de PEA*. A preview of next week and a link to the full calendar close the page. |
| Weekly notes | `facts.js → cohorts.FA26.weekNotes["<week number>"] = { es, en }`. Parity gate fails if either language is missing or the vocabulary rules are broken. |
| Class cards | Description on the card (three lines in Calendar, full when open; full on This week). Sections: Materiales de la sesión, Recursos, Zoom note, Agregar a mi calendario. Buttons: exit ticket, resend Zoom link, report an absence. |
| Unlocking | Materials, resources and the exit ticket open on the day of the week's first class (unchanged rule). Report an absence is available until the class starts. Resend Zoom link is always available. |
| Exit ticket prefill | `?prefill_Event ID=FA26 - MM/DD/YYYY` per class (form field “Event ID”, linked to the Calendar table, primary field format confirmed in Airtable). |
| Materials data | Airtable Modules table (read 2026-10-06): participant worksheets and communication tools shared “anyone with the link.” No English versions or “Other” resources exist yet. |
| Shortlink | `bit.ly/peafa26semana` → `https://apply-pea.netlify.app/esta-semana` (Bitly group *PEA*). |
| QR code | Bitly's plan returned *UPGRADE_REQUIRED* for QR codes, so a static QR code was generated that encodes `https://bit.ly/peafa26semana` (scans still count as Bitly clicks). Colors: Blue `#053CAA` modules and finder rings, Pink `#EC108D` finder centers, White ground. Files in `maintenance/assets/qr/`, verified by decoding. |

## Open items for Danny

1. **Share three Drive files “anyone with the link”** (currently owner-only, so they are held back from the site):
   - 1T Orientación worksheet — `1kv5bHHZ0ylsL4dr6HbCo-pVTdLlmmc6M` (**tonight's class**)
   - 5R Derechos worksheet — `1kmwiDnjCCI0KCMebtYlJGQNeVHCyYW6i`
   - 5R Derechos communication tool — `1zCTm31aRz4OcDhNtLg0WkpePcHEOx_Ju`
2. **Exit-ticket form default:** the read-only class field defaults to **SP26 - 05/12/2026**. Submit one test from a class card to confirm the prefill overrides it, then clear the default in Airtable.
3. **English versions** of worksheets and tools: add `en:` URLs in `facts.js` as they exist.
4. **Resources:** add to `modules[*].resources` when the new resource database is ready.
5. **Merge and deploy:** the shortlink and QR code work only after v0.21.0 is live on Netlify.

## Fit check

- **Simple:** one permanent link and one QR code; the page updates itself by date.
- **Sustainable:** weekly upkeep is optional (a note or a new file link), edited in `facts.js`.
- **Right-size:** static site, no new services; a live Airtable feed can come later if needed (the site's CSP blocks it today).
