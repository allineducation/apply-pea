#!/usr/bin/env node
/* PEA Applicant Hub — resource sync (v0.24.0).
   Airtable · PEA Resource List (app1VeAGxcVHsV2bQ) is the source of every material and resource on the class
   cards and on Materiales y recursos (Danny Hernández, 2026-11-14). This script reads the Published rows of the
   Resources and Groups tables and writes site/assets/js/resources.js, which the site loads after facts.js.

   Usage
     AIRTABLE_TOKEN=pat… node maintenance/scripts/sync-resources.js     read the base (read-only token)
     node maintenance/scripts/sync-resources.js --from-json export.json  read a saved export instead (tests)
     … --out other.js                                                    write somewhere else

   Fields are read by ID, so renaming a field in Airtable never breaks the sync. Output is stable (no dates,
   fixed order), so a run with no changes in Airtable leaves the file byte-for-byte the same. The script stops
   with a list of problems, and writes nothing, if a Published row names something the site does not know. */
"use strict";
const fs = require("fs"), path = require("path");

const BASE = "app1VeAGxcVHsV2bQ";
const TABLES = { resources: "tbl5lf1RoGV7sgqbt", groups: "tblOLXmnLD8xo62b9" };
const R = {                                   /* Resources table */
  status: "fldWsXEuEDQpzMxjT", titleEn: "fldcC2OVa8ozFcyoq", titleEs: "fldAh2KSuJtkGNurU",
  linkEn: "fldOpIuUk85gkEFt4", linkEs: "fldaXBNGSVsNdBk1H", linkBoth: "fldWK9HdPXp5mh0ub", langs: "fldGj669qXVhIqgB5",
  kind: "fldMWIqgVDNig1noY", mtype: "fldVOwsor6bvonCBS", topic: "fld1bL1PClIZejHZP", classes: "fldjO7csJT0JX6bye",
  featured: "fldSQGeUa2UiD2KmS", cohort: "fldM8A4cBcZTqZkdS", order: "fld8XOD92Flt16CfA", groups: "fldQBrRIEPkH8Irqz"
};
const G = {                                   /* Groups table */
  titleEs: "fldZQUPhF6QTHSqzo", titleEn: "fldehnb9vpV4WB2Bn", cls: "fld1ck83Oh4IJEbx2", topic: "fldAciRt6N9nxXryr",
  whole: "fldhF59eueYtbEKce", order: "fld9zmT0nfw53ac6U", members: "fldEm7MSL5VOpreCv"
};
const MATERIAL = "ALL In Education material", PUBLISHED = "Published";
const LANG = { Spanish: "es", English: "en" };

const ROOT = path.join(__dirname, "../..");
const arg = (n) => { const i = process.argv.indexOf(n); return i === -1 ? null : process.argv[i + 1]; };
const OUT = path.resolve(arg("--out") || path.join(ROOT, "site/assets/js/resources.js"));

global.window = global.window || {};
require(path.join(ROOT, "site/assets/js/facts.js"));
const F = global.window.PEA_FACTS;

async function fetchTable(table) {           /* Airtable REST API, every page, fields keyed by ID */
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) throw new Error("AIRTABLE_TOKEN is not set (or use --from-json <file>)");
  const out = []; let offset = "";
  do {
    const url = `https://api.airtable.com/v0/${BASE}/${table}?returnFieldsByFieldId=true&pageSize=100` + (offset ? `&offset=${offset}` : "");
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Airtable ${table}: HTTP ${res.status} ${await res.text()}`);
    const body = await res.json(); out.push(...body.records.map((r) => ({ id: r.id, fields: r.fields }))); offset = body.offset || "";
  } while (offset);
  return out;
}

function build(resources, groups) {
  const problems = [];
  const topicKey = {}; Object.entries(F.topics).forEach(([k, t]) => { topicKey[t.en] = k; });
  const typeKey = {}; Object.entries(F.materialTypes).forEach(([k, t]) => { typeKey[t.en] = k; });
  const classOrder = [];                       /* "4T · MREAD" → { code: "4T", module: "MREAD" } */
  const cls = (name, where) => {
    const m = /^(\S+) · (\S+)$/.exec(name || "");
    if (!m || !F.modules[m[2]]) { problems.push(`${where}: unknown class "${name}"`); return null; }
    if (classOrder.indexOf(name) === -1) classOrder.push(name);
    return { code: m[1], module: m[2] };
  };
  const topic = (name, where) => { if (!name) return null; if (!topicKey[name]) { problems.push(`${where}: unknown topic "${name}"`); return null; } return topicKey[name]; };
  const ord = (f, k) => (typeof f[k] === "number" ? f[k] : 1e9);
  const label = (r) => r.fields[R.titleEn] || r.fields[R.titleEs] || r.fields[R.linkEn] || r.fields[R.linkEs] || r.fields[R.linkBoth] || r.id;

  const pub = resources.filter((r) => r.fields[R.status] === PUBLISHED);
  const gById = {}; groups.forEach((g) => { gById[g.id] = g; });

  function item(r, containerTopic) {            /* one row, in the shape facts.js used: { type, title_es, title_en, es, en, any, langs, topic } */
    const f = r.fields, it = {}, where = `"${label(r)}"`;
    if (f[R.kind] === MATERIAL) {
      if (!typeKey[f[R.mtype]]) problems.push(`${where}: ALL In Education material needs a Material type`);
      it.type = typeKey[f[R.mtype]] || "resource";
    } else it.type = "resource";
    if (f[R.titleEs]) it.title_es = f[R.titleEs];
    if (f[R.titleEn]) it.title_en = f[R.titleEn];
    if (f[R.linkBoth]) {
      if (f[R.linkEs] || f[R.linkEn]) problems.push(`${where}: use Link (both pages) or Link (ES)/(EN), not both`);
      it.any = f[R.linkBoth];
      it.langs = (f[R.langs] || []).map((l) => LANG[l]).filter(Boolean).sort((a, b) => (a === "es" ? -1 : b === "es" ? 1 : 0));
    } else {
      if (f[R.linkEs]) it.es = f[R.linkEs];
      if (f[R.linkEn]) it.en = f[R.linkEn];
      if (!it.es && !it.en) problems.push(`${where}: no link`);
    }
    const t = topic(f[R.topic], where);
    if (t && containerTopic !== undefined && t !== containerTopic) it.topic = t;
    return it;
  }
  const byOrder = (a, b) => (a.o - b.o) || a.t.localeCompare(b.t);

  const modules = {}, events = {}, community = [];
  const mod = (m) => modules[m] || (modules[m] = { materials: [], resources: [], featured: [] });
  pub.forEach((r) => {
    const f = r.fields, where = `"${label(r)}"`, cohort = f[R.cohort] || null;
    const isMat = f[R.kind] === MATERIAL, o = ord(f, R.order), t = label(r);
    const classes = (f[R.classes] || []).map((c) => cls(c, where)).filter(Boolean);
    const feat = (f[R.featured] || []).map((c) => cls(c, where)).filter(Boolean);
    const grs = (f[R.groups] || []).map((id) => gById[id] || (problems.push(`${where}: linked group ${id} not found`), null)).filter(Boolean);
    if (cohort && !F.cohorts[cohort]) problems.push(`${where}: unknown cohort "${cohort}"`);
    feat.forEach((c) => {
      const entry = { o, t, it: item(r) };
      if (cohort) { const k = cohort + "|" + c.code; (events[k] || (events[k] = { featured: [] })).featured.push(entry); }
      else mod(c.module).featured.push(entry);
    });
    classes.forEach((c) => {
      const mtype = typeKey[f[R.mtype]];
      if (isMat && mtype === "presentation") {
        if (!cohort) { problems.push(`${where}: a presentation needs a Cohort`); return; }
        if (!f[R.linkEn]) { problems.push(`${where}: a presentation needs Link (EN)`); return; }
        const k = cohort + "|" + c.code; (events[k] || (events[k] = { featured: [] })).presentation_en = f[R.linkEn];
        return;
      }
      if (cohort) { problems.push(`${where}: Cohort is only for presentations and featured rows`); return; }
      const entry = { o, t, it: item(r, isMat ? undefined : F.modules[c.module].topic) };
      if (isMat) mod(c.module).materials.push(entry); else mod(c.module).resources.push(entry);
    });
    grs.forEach((g) => {
      const c = cls(g.fields[G.cls], `group "${g.fields[G.titleEn]}"`); if (!c) return;
      const gt = topic(g.fields[G.topic], `group "${g.fields[G.titleEn]}"`) || F.modules[c.module].topic;
      const m = mod(c.module); let grp = m.resources.find((e) => e.gid === g.id);
      if (!grp) {
        grp = { gid: g.id, o: ord(g.fields, G.order), t: g.fields[G.titleEn] || "", it: { title_es: g.fields[G.titleEs], title_en: g.fields[G.titleEn] }, items: [] };
        if (g.fields[G.topic]) grp.it.topic = gt;
        if (g.fields[G.whole]) grp.it.whole = true;
        m.resources.push(grp);
      }
      /* inside a group, rows follow the order of the group's Resources list (drag to reorder in Airtable); Order breaks ties */
      const pos = (g.fields[G.members] || []).indexOf(r.id);
      grp.items.push({ o: pos === -1 ? 1e6 + o : pos, t, it: item(r, gt) });
    });
    if (!feat.length && !classes.length && !grs.length) {
      if (isMat) problems.push(`${where}: an ALL In Education material needs a class`);
      const ct = topic(f[R.topic], where);
      if (!ct) problems.push(`${where}: a row with no class needs a Topic`);
      const it = item(r); delete it.topic;
      community.push({ o, t, it: Object.assign({ topic: ct }, it) });
    }
  });

  const finish = (list) => list.sort(byOrder).map((e) => (e.items ? Object.assign({}, e.it, { items: e.items.sort(byOrder).map((x) => x.it) }) : e.it));
  const classRank = (m) => { const i = classOrder.findIndex((c) => c.endsWith(" · " + m)); return i === -1 ? 999 : i; };
  const data = { modules: {}, events: {}, community: finish(community) };
  Object.keys(modules).sort((a, b) => classRank(a) - classRank(b) || a.localeCompare(b)).forEach((k) => {
    const m = modules[k], out = {};
    ["materials", "resources", "featured"].forEach((l) => { if (m[l].length) out[l] = finish(m[l]); });
    data.modules[k] = out;
  });
  Object.keys(events).sort().forEach((k) => {
    const e = events[k], out = {};
    if (e.featured.length) out.featured = finish(e.featured);
    if (e.presentation_en) out.presentation_en = e.presentation_en;
    data.events[k] = out;
  });
  return { data, problems, published: pub.length };
}

const HEADER = `/* GENERATED FILE — do not edit by hand.
   Source: Airtable · PEA Resource List (Resources and Groups tables, Published rows only).
   Edit resources in Airtable, then run the "Sync resources from Airtable" workflow (or
   node maintenance/scripts/sync-resources.js); the change arrives as a pull request.
   The merge at the end copies these lists into PEA_FACTS (modules, events, communityResources),
   so the class cards and Materiales y recursos read them exactly as they read facts.js before v0.24.0. */
`;
const MERGE = `
(function (F, R) {
  if (!F || !R) return;
  Object.keys(R.modules).forEach(function (k) {
    var m = F.modules[k], r = R.modules[k];
    if (!m) return;
    ["materials", "resources", "featured"].forEach(function (l) { if (r[l]) m[l] = r[l]; });
  });
  Object.keys(R.events).forEach(function (key) {
    var p = key.split("|"), c = F.cohorts[p[0]], r = R.events[key];
    if (!c) return;
    c.events.forEach(function (e) {
      if (e.code !== p[1] || !e.module) return;
      if (r.featured) e.featured = r.featured;
      if (r.presentation_en) e.presentation_en = r.presentation_en;
    });
  });
  F.communityResources = R.community || [];
})(window.PEA_FACTS, window.PEA_RESOURCES);
`;
function render(data) { return HEADER + "window.PEA_RESOURCES = " + JSON.stringify(data, null, 2) + ";\n" + MERGE; }

async function main() {
  let resources, groups;
  const from = arg("--from-json");
  if (from) ({ resources, groups } = JSON.parse(fs.readFileSync(from, "utf8")));
  else [resources, groups] = await Promise.all([fetchTable(TABLES.resources), fetchTable(TABLES.groups)]);
  const { data, problems, published } = build(resources, groups);
  if (problems.length) { console.error("SYNC STOPPED — fix these rows in Airtable:\n  " + [...new Set(problems)].join("\n  ")); process.exit(1); }
  if (!published) { console.error("SYNC STOPPED — no Published rows (refusing to empty the site)."); process.exit(1); }
  const text = render(data), before = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (text === before) { console.log(`No change — ${published} Published rows.`); return; }
  fs.writeFileSync(OUT, text);
  console.log(`Wrote ${path.relative(ROOT, OUT)} — ${published} Published rows, ${Object.keys(data.modules).length} classes, ${data.community.length} community rows.`);
}
if (require.main === module) main().catch((e) => { console.error(e.message || e); process.exit(1); });
module.exports = { build, render };
