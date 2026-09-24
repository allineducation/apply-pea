# PEA Applicant Portal

Bilingual applicant portal for ALL In Education. Initial release: reviewed package v0.9.4.

## Publishing

Netlify publishes `site/` from `main`. Push or merge updates to `main` to deploy. The build runs the English/Spanish dictionary parity check; no dependencies are required.

## Content updates

- `site/assets/js/facts.js`: dates, URLs and cohort facts.
- `site/assets/js/copy.js`: English and Spanish wording.
- `site/assets/js/app.js`: rendering and interactions.
- `site/assets/css/hub.css`: presentation.

Run `node maintenance/scripts/check-parity.js` before publishing. Preview phone and desktop layouts in both languages and verify changed links.

PEA alumni is 922, excluding the staff test record, as confirmed by Danny Hernández. Verify future alumni and participation figures in the AIE Alumni Airtable base first; distinguish unique people from participation records.

Spring 2027 interest is open. The form defaults to Fall 2026 but allows Spring 2027 selection. Do not publish a spring Zoom registration link until released. The fall calendar shortlink is https://bit.ly/peafa26cal. Lotería is a participant tool and is excluded from this applicant portal.
