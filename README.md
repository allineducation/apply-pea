# PEA applicant portal

Prepared by Danny Hernández · Handoff updated September 25, 2026 · Site release **v0.10.2**

The Parent Educator Academy (PEA) applicant portal is a public, bilingual information site for families and caregivers. It explains the program and routes visitors to the interest form, class registration, information session, calendar and team support. It does not track an applicant’s progress.

- Live site: https://apply-pea.netlify.app/
- Repository: https://github.com/allineducation/apply-pea
- Netlify project: https://app.netlify.com/projects/apply-pea
- Machine-readable handoff: [HANDOFF.json](HANDOFF.json)
- Latest production verification: [September 25 receipt](maintenance/qa/production-2026-09-25.json)

## Start here

Read this README and `HANDOFF.json`, inspect the current branch and working tree, then check the live site before making changes. The JSON is a dated snapshot, not a live data feed. `site/assets/js/facts.js` is the application’s fact registry; authoritative program sources and Danny Hernández’s approved corrections take precedence over this snapshot.

This repository is public. Keep credentials, participant records, private Zoom join links and other sensitive material out of it. Documentation lives outside `site/`, so it is available in GitHub but is not part of the applicant-facing Netlify publish directory.

## Architecture and file map

Static HTML, CSS and vanilla JavaScript. No package installation, bundler, application server or database is required. Node 22 runs the deployment’s content check. Lato fonts and brand images are local assets.

| File | Responsibility |
| --- | --- |
| `site/index.html` | Page shell, asset loading and release metadata |
| `site/assets/js/facts.js` | Cohorts, event timestamps, primary URLs, contact information and impact figures |
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

Hash routes: `#inicio`, `#participar`, `#calendario`, `#zoom`, `#programa`, `#historia`, `#preguntas`, `#enlaces`, `#contacto`. The legacy `#lista` hash redirects within the app to participation instructions.

Language selection is `?lang=es` or `?lang=en`, then the stored `aie_lang` preference, then Spanish by default. `/es` and `/en` are server aliases; `/inscripcion` and `/join` open the corresponding participation page. Only language preference is stored locally. There is no checklist, progress storage, embedded application form or analytics integration in the current application code. External forms and messaging services operate separately.

## Approved applicant content

- **922 PEA alumni** is authoritative, excluding the staff test record. Verify future alumni and participation figures first in the **AIE Alumni** Airtable base (`appAnb90zo02mNqpi`). Distinguish unique alumni from participation records; do not substitute the uncorrected 923 count.
- Fall 2026 has **18 scheduled classes**, Tuesdays and Thursdays, **5:00–6:30 PM Arizona time**, October 6–December 8. No class on Thanksgiving, November 26. The focus group is December 10. Describe scheduled classes, not nine or ten weeks.
- The remaining information session is **October 1, 2026, 5:00–6:30 PM Arizona time**. September 24 session details were removed from the public event list, date cards and calendar export. Do not reintroduce two-date copy.
- Visitors may register for the October 1 information session or view the recording afterward. **No recording URL has been supplied.** Current wording directs visitors to the team for that link when available.
- The interest form defaults to Fall 2026 and allows Spring 2027 selection, as confirmed by Danny Hernández. Spring dates are March 16–May 13, 2027 and appear only on Calendar. No spring Zoom registration link is published. The full spring calendar and teaching language require confirmation before promotion.
- The current fall registration copy states that at least 16 of 18 classes are required for a certificate. Reverify registration requirements with the program source before changing or reusing them for another cohort.
- Lotería is a participant activity and is excluded from this applicant portal. Avoid duplicate long paragraphs and any suggestion that the site logs application steps.

Airtable PEA Calendar (`appIqlWqvk2HkHVRM`, table `tblGVaBk7FSDybGuH`) is the source for event dates/times. The public registry intentionally omits the September 24 info session following the user’s direction; it is not a complete historical Calendar export. Timestamps are UTC and display at UTC−7 (Arizona, no daylight-saving shift).

## Brand and interaction rules

Use approved logo artwork without translating the tagline **Leadership · Power · Justice**, recoloring it or rebuilding the lockup with HTML text. Preserve its proportions. Both languages use the same complete logo.

Keep the compact information-page layout: filled blue or pink section headings, white or gold heading text, modest rounded corners (8px), tinted section backgrounds and aligned cards. Maintain clear contrast, keyboard focus and mobile readability. Use consistent, restrained icons. Keep navigation collapsible.

The first actions are interest form, class registration, calendar, information session and WhatsApp. Four bottom actions persist: Apply, **Register on Zoom**, Calendar and WhatsApp. Spanish registration wording is **Registro en Zoom**. Avoid the ambiguous standalone label “Zoom.” Links open in the same tab.

## Date-dependent behavior and pending work

The app selects a confirmed cohort automatically. Projected Spring 2027 is not promoted. The `info` registration link disappears once no future information session remains; the class Zoom link disappears once no future class remains. These checks use event **end** timestamps. The current date is refreshed on rendering; the site is not a scheduled publishing service.

For local review, `?lang=en&today=2026-10-02#participar` previews the day after the info session. Do not distribute staff preview URLs as applicant links.

When the recording is supplied, add a verified recording destination and bilingual call to action that remains available after the info-session registration link expires. No automatic recording swap currently exists. For Spring 2027, obtain the approved Zoom URL, language and full calendar before changing projected status or cohort promotion. Recheck all cohort-specific copy and dates during rollover.

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

Earlier QA: v0.10.0 checked nine routes in both languages at phone/desktop widths and 16 external URLs; v0.10.1 checked the compact layout and logo at 320/390/1100px; v0.10.2 verified the October 1 session and recording wording. External links and authoritative Airtable records were **not freshly re-audited for this documentation update**.

- v0.10.0: action-first information site, revised navigation, removal of progress tracking, updated links and schedule copy.
- v0.10.1: original logo, untranslated tagline, compact sizing, rounded-corner headings, explicit Zoom registration label.
- v0.10.2: removal of September 24 session details; October 1 registration and recording guidance.

The old `allined-pea.netlify.app` site and the original ZIP are historical comparison sources, not the release authority for this repository. Current approved corrections and the sources above govern future changes.
