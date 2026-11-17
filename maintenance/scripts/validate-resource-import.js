#!/usr/bin/env node
/* PEA Applicant Hub — bulk resource import check (v0.24.1).
   Checks a filled copy of maintenance/templates/resources-import.csv before it is imported into
   Airtable · PEA Resource List → Resources. It reads nothing from Airtable (no token needed) and writes nothing.

   Usage
     node maintenance/scripts/validate-resource-import.js my-list.csv
     … --group "4R · New group name"     accept a group created in Airtable that has no Published rows yet (repeatable)

   The rules mirror maintenance/specs/resource-record.v1.json, maintenance/scripts/sync-resources.js and
   check-parity.js: known choice names, one link shape, titles per linked language, Languages served with a shared
   link, material type and placement, Cohort only on presentations and featured rows, Topic when there is no
   placement, vocabulary and naming, https links, and duplicates (inside the file and against every link already
   published in site/assets/js/resources.js). Rows must arrive as "To review". Exit 1 on any problem. */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "../..");
const SPEC = JSON.parse(fs.readFileSync(path.join(ROOT, "maintenance/specs/resource-record.v1.json"), "utf8"));

global.window = global.window || {};
require(path.join(ROOT, "site/assets/js/facts.js"));
require(path.join(ROOT, "site/assets/js/resources.js"));
const F = global.window.PEA_FACTS, PUB = global.window.PEA_RESOURCES;

/* ---------- CSV (RFC 4180: quotes, doubled quotes, newlines inside quotes; BOM; CRLF) ---------- */
function parseCsv(text) {
  text = text.replace(/^﻿/, "");
  const rows = []; let row = [], cell = "", q = false, line = 1, rowLine = 1;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else { if (c === "\n") line++; cell += c; }
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push({ cells: row, line: rowLine }); row = []; cell = ""; line++; rowLine = line;
    } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push({ cells: row, line: rowLine }); }
  return rows.filter((r) => r.cells.some((x) => x.trim() !== ""));
}

/* ---------- vocabulary from the spec and the published site ---------- */
const field = (k) => SPEC.fields.find((f) => f.key === k);
const names = (k) => (field(k).choices || []).map((c) => (typeof c === "string" ? c : c.value));
const CHOICE = {
  Status: names("status"), Kind: names("kind"), "Material type": names("material_type"), Topic: names("topic"),
  "Languages served": names("languages_served"), Cohort: names("cohort"), Classes: SPEC.class_choices, "Featured in": SPEC.class_choices
};
const COLUMNS = SPEC.fields.filter((f) => f.table === "resources" && !["submission"].includes(f.key)).map((f) => f.airtable_field_name);
const REQUIRED_COLUMNS = ["Status", "Kind", "Material type", "Title (ES)", "Title (EN)", "Link (ES)", "Link (EN)", "Link (both pages)", "Languages served", "Topic", "Classes"];
const MATERIAL = "ALL In Education material";

/* Group names as Airtable shows them ("<class code> · <English title>"), from the published groups. */
const codeOf = {}; Object.values(F.cohorts).forEach((c) => c.events.forEach((e) => { if (e.module && !codeOf[e.module]) codeOf[e.module] = e.code; }));
const GROUPS = new Set();
Object.entries(PUB.modules).forEach(([m, l]) => (l.resources || []).forEach((r) => { if (r.items && codeOf[m]) GROUPS.add(`${codeOf[m]} · ${r.title_en}`); }));
process.argv.forEach((a, i) => { if (a === "--group" && process.argv[i + 1]) GROUPS.add(process.argv[i + 1].trim()); });

/* ---------- duplicates ---------- */
function norm(u) {
  let s = String(u || "").trim(); if (!s) return "";
  try {
    const url = new URL(s);
    [...url.searchParams.keys()].forEach((k) => { if (/^utm_|^(fbclid|gclid|usp)$/i.test(k)) url.searchParams.delete(k); });
    const qs = url.searchParams.toString();
    return (url.host.toLowerCase().replace(/^www\./, "") + url.pathname.replace(/\/+$/, "") + (qs ? "?" + qs : ""));
  } catch (e) { return s.toLowerCase(); }
}
const published = new Map();             /* normalized URL → where it is on the site */
const addPub = (it, where) => {
  if (it.items) return it.items.forEach((x) => addPub(x, `${where} › ${it.title_en}`));
  [it.es, it.en, it.any].filter(Boolean).forEach((u) => { const n = norm(u); if (!published.has(n)) published.set(n, `${where}: ${it.title_en || it.title_es || it.type}`); });
};
Object.entries(PUB.modules).forEach(([m, l]) => ["materials", "resources", "featured"].forEach((k) => (l[k] || []).forEach((it) => addPub(it, `${codeOf[m] || m} ${k}`))));
Object.entries(PUB.events).forEach(([k, e]) => { (e.featured || []).forEach((it) => addPub(it, `${k} featured`)); if (e.presentation_en) addPub({ en: e.presentation_en, type: "presentation" }, k); });
(PUB.community || []).forEach((it) => addPub(it, `Materiales y recursos (${it.topic})`));

/* ---------- vocabulary and naming (same rules as check-parity.js) ---------- */
function wording(es, en) {
  const out = [];
  if (/empower|empodera/i.test(es + en)) out.push('never "empower" or any variant (empoderar, empoderamiento)');
  if (/docente/i.test(es)) out.push('"docentes" → "maestros"');
  if (/\baula(s)?\b/i.test(es)) out.push('"aula" → "salón/clase"');
  if (/vosotros|vuestr/i.test(es)) out.push('"vosotros" → "ustedes"');
  if (/Parent Educator Academy(?! Evaluation Report)/.test(es)) out.push('Spanish title: "Parent Educator Academy" → "Academia de Padres Educadores"');
  if (/\bAPE\b|\(APE\)/.test(es)) out.push('the abbreviation stays "PEA", not "APE"');
  if (/Academia de Padres Educadores/.test(en)) out.push('English title: use "Parent Educator Academy"');
  if (/Todos? en (la )?Educaci[oó]n|TODOS EN/i.test(es + en)) out.push('"ALL In Education" is never translated');
  if (/Liderazgo\s*[·•]\s*Poder|Poder\s*[·•]\s*Justicia/i.test(es + en)) out.push('the tagline "Leadership · Power · Justice" is never translated');
  return out;
}

/* ---------- main ---------- */
function validate(file) {
  const problems = [], warnings = [];
  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  if (!rows.length) return { problems: ["the file is empty"], warnings, count: 0 };
  const head = rows[0].cells.map((h) => h.trim());
  REQUIRED_COLUMNS.filter((c) => !head.includes(c)).forEach((c) => problems.push(`header: missing column "${c}"`));
  head.filter((c) => c && !COLUMNS.includes(c)).forEach((c) => problems.push(`header: unknown column "${c}" (use the exact Airtable field names from the template)`));
  if (new Set(head).size !== head.length) problems.push("header: a column appears twice");
  if (problems.length) return { problems, warnings, count: 0 };

  const seen = new Map();
  const body = rows.slice(1);
  if (!body.length) problems.push("no rows under the header");
  body.forEach((r, i) => {
    const n = i + 2, at = `row ${n} (line ${r.line})`;
    const v = {}; head.forEach((h, j) => { v[h] = (r.cells[j] || "").trim(); });
    if (r.cells.length > head.length && r.cells.slice(head.length).some((x) => x.trim())) problems.push(`${at}: more cells than columns (an unquoted comma?)`);
    const p = (m) => problems.push(`${at}: ${m}`), w = (m) => warnings.push(`${at}: ${m}`);
    const multi = (k) => (v[k] || "").split(",").map((s) => s.trim()).filter(Boolean);

    /* choices */
    ["Status", "Kind", "Material type", "Topic", "Cohort"].forEach((k) => { if (v[k] && !CHOICE[k].includes(v[k])) p(`${k} "${v[k]}" is not a choice (${CHOICE[k].join(" | ")})`); });
    ["Classes", "Featured in", "Languages served"].forEach((k) => multi(k).forEach((x) => { if (!CHOICE[k].includes(x)) p(`${k} "${x}" is not a choice`); }));
    if (!v.Kind) p("Kind is required (ALL In Education material | Outside resource)");
    if (v.Status !== "To review") p(`Status must be "To review" for an import (got "${v.Status || ""}"); publish after the review`);

    /* groups (linked by the Group name; names with commas cannot be linked through a CSV) */
    let groups = [];
    if (v.Groups) {
      const commaNames = [...GROUPS].filter((g) => g.includes(",") && v.Groups.includes(g));
      let rest = v.Groups; commaNames.forEach((g) => { rest = rest.split(g).join(""); });
      commaNames.forEach((g) => p(`group "${g}" has a comma in its name; leave Groups empty and link it in Airtable after the import`));
      groups = rest.split(",").map((s) => s.trim()).filter(Boolean);
      groups.forEach((g) => { if (!GROUPS.has(g)) p(`group "${g}" not found (use the Group name, e.g. "4R · Finding books"; new group: --group "<name>")`); });
      groups = groups.concat(commaNames);
    }

    /* links */
    const links = [["Link (ES)", v["Link (ES)"]], ["Link (EN)", v["Link (EN)"]], ["Link (both pages)", v["Link (both pages)"]]].filter((x) => x[1]);
    if (!links.length) p("no link");
    if (v["Link (both pages)"] && (v["Link (ES)"] || v["Link (EN)"])) p("use Link (both pages) or Link (ES)/(EN), not both");
    links.forEach(([k, u]) => {
      if (!/^https:\/\/[^\s/]+\.[^\s]+$/.test(u)) p(`${k} must be a full https:// address with no spaces`);
      if (/^https?:\/\/(bit\.ly|tinyurl\.com|t\.co|goo\.gl|ow\.ly)\//i.test(u)) w(`${k} is a shortlink; use the page it opens`);
      if (/(^|\.)example\.(org|com)$/i.test((() => { try { return new URL(u).host; } catch (e) { return ""; } })())) w(`${k} is an example link; replace or delete this row before importing`);
      const key = norm(u);
      if (published.has(key)) p(`${k} is already on the site — ${published.get(key)}. Add the class, group or topic to that row in Airtable instead`);
      else if (seen.has(key)) p(`${k} repeats row ${seen.get(key)} in this file`);
      else seen.set(key, n);
      if (/drive\.google\.com|docs\.google\.com/.test(u)) w(`${k} is a Google file: confirm it is shared "Anyone with the link · Viewer" before publishing`);
    });
    if (v["Link (both pages)"] && !multi("Languages served").length) p("Link (both pages) needs Languages served (Spanish, English or both)");
    if (!v["Link (both pages)"] && v["Languages served"]) w("Languages served is only used with Link (both pages)");

    /* titles and kind */
    const mat = v.Kind === MATERIAL;
    if (mat) {
      if (!v["Material type"]) p("an ALL In Education material needs a Material type");
    } else {
      if (v["Material type"]) p("Material type is only for ALL In Education materials");
      if ((v["Link (ES)"] || v["Link (both pages)"]) && !v["Title (ES)"]) p("a Spanish or shared link needs Title (ES)");
      if ((v["Link (EN)"] || v["Link (both pages)"]) && !v["Title (EN)"]) p("an English or shared link needs Title (EN)");
      if (v["Link (EN)"] && !v["Link (ES)"] && v["Title (ES)"] && !/ingl[eé]s/i.test(v["Title (ES)"])) w('English-only link with a Spanish title: add "(sitio en inglés)" if the page is in English');
    }

    /* placement */
    const classes = multi("Classes"), featured = multi("Featured in"), placed = classes.length || featured.length || groups.length;
    if (mat && !classes.length && !featured.length) p("an ALL In Education material needs Classes");
    if (!placed && !v.Topic) p("a row with no Classes, Groups or Featured in needs a Topic (it shows only on Materiales y recursos)");
    if (v["Material type"] === "Presentation") {
      if (!v.Cohort) p("a Presentation needs a Cohort");
      if (!v["Link (EN)"]) p("a Presentation needs Link (EN)");
    }
    if (v.Cohort && v["Material type"] !== "Presentation" && !featured.length) p("Cohort is only for presentations and Featured in rows");
    if (v.Cohort && v["Material type"] !== "Presentation" && classes.length) p("Cohort on a row with Classes stops the sync; put cohort-only links in Featured in");
    if (v.Order && !/^\d+$/.test(v.Order)) p("Order must be a whole number (steps of 10)");
    if (v["Check again on"] && !/^\d{4}-\d{2}-\d{2}$/.test(v["Check again on"])) p("Check again on must be a date like 2027-01-15");

    wording(v["Title (ES)"] || "", v["Title (EN)"] || "").forEach((m) => p(m));
    if (/empower|empodera/i.test(v["Notes (Internal)"] || "")) p('Notes: never "empower" or any variant');
  });
  return { problems, warnings, count: body.length };
}

if (require.main === module) {
  const file = process.argv.slice(2).find((a, i, all) => !a.startsWith("--") && all[i - 1] !== "--group");
  if (!file) { console.error("Usage: node maintenance/scripts/validate-resource-import.js <file.csv> [--group \"<class> · <title>\"]"); process.exit(2); }
  const { problems, warnings, count } = validate(path.resolve(file));
  warnings.forEach((m) => console.log("check:   " + m));
  if (problems.length) { console.error(`IMPORT NOT READY — ${problems.length} problem(s):\n  ` + problems.join("\n  ")); process.exit(1); }
  console.log(`OK — ${count} row(s) ready to import into Airtable · Resources as "To review". ${published.size} published links checked for duplicates.`);
}
module.exports = { validate, norm, parseCsv };
