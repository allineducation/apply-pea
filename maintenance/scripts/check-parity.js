/* PEA Applicant Hub — parity + vocabulary gate (AIE Hub DS §3.4, extended).
   Run before every release:  node scripts/check-parity.js
   Fails if ES and EN keys differ, if arrays differ in length or shape,
   or if a banned term appears in either language. */
const path = require("path");
const { T } = require(path.join(__dirname, "../../site/assets/js/copy.js"));

const problems = [];
function walk(a, b, p) {
  const ta = Array.isArray(a) ? "array" : typeof a, tb = Array.isArray(b) ? "array" : typeof b;
  const nullish = (x) => x === null || x === undefined;
  if (nullish(a) || nullish(b)) return;                     // taglinePair is intentionally null in EN
  if (ta !== tb) { problems.push(`type differs at ${p}: es=${ta} en=${tb}`); return; }
  if (ta === "array") {
    if (a.length !== b.length) problems.push(`length differs at ${p}: es=${a.length} en=${b.length}`);
    for (let i = 0; i < Math.min(a.length, b.length); i++) walk(a[i], b[i], `${p}[${i}]`);
  } else if (ta === "object") {
    const ka = Object.keys(a), kb = Object.keys(b);
    ka.filter(k => !kb.includes(k)).forEach(k => problems.push(`EN missing: ${p}.${k}`));
    kb.filter(k => !ka.includes(k)).forEach(k => problems.push(`ES missing: ${p}.${k}`));
    ka.filter(k => kb.includes(k) && k !== "_lang").forEach(k => walk(a[k], b[k], `${p}.${k}`));
  } else if (ta === "string" && (a.trim() === "" || b.trim() === "")) {
    problems.push(`empty string at ${p}`);
  }
}
walk(T.es, T.en, "T");

// Controlled vocabulary (brand §5.2) — scan every string and function body.
const src = JSON.stringify(T, (k, v) => typeof v === "function" ? v.toString() : v);
const esSrc = JSON.stringify(T.es, (k, v) => typeof v === "function" ? v.toString() : v);
[[/empower/i, "empower"], [/empodera/i, "empoderar/empoderamiento"]].forEach(([re, w]) => { if (re.test(src)) problems.push(`banned term: ${w}`); });
[[/\baula(s)?\b/i, "aula → salón/clase"], [/vosotros|vuestr/i, "vosotros → ustedes"], [/docente/i, "docentes → maestros"], [/\bAIE\b/, "AIE in family-facing prose → ALL In Education"]]
  .forEach(([re, w]) => { if (re.test(esSrc)) problems.push(`ES vocabulary: ${w}`); });
if (/\bAIE\b/.test(JSON.stringify(T.en))) problems.push("EN vocabulary: AIE in family-facing prose → ALL In Education");

// Naming (Danny Hernández, 2026-09-30): "Parent Educator Academy" is "Academia de Padres
// Educadores" in Spanish; the abbreviation stays "PEA" in both languages; "ALL In Education"
// and the tagline "Leadership · Power · Justice" are never translated. The English title of
// the 2022 evaluation report is a citation and is allowed.
function namingProblems(es, en, where) {
  const out = [];
  if (/Parent Educator Academy(?! Evaluation Report)/.test(es)) out.push(`${where} ES: "Parent Educator Academy" → "Academia de Padres Educadores"`);
  if (/\bAPE\b|\(APE\)/.test(es)) out.push(`${where} ES: abbreviation stays "PEA", not "APE"`);
  if (/Academia de Padres Educadores/.test(en)) out.push(`${where} EN: use "Parent Educator Academy"`);
  if (/Todos? en (la )?Educaci[oó]n|TODOS EN/i.test(es + en)) out.push(`${where}: "ALL In Education" is never translated`);
  if (/Liderazgo\s*[·•]\s*Poder|Poder\s*[·•]\s*Justicia/i.test(es + en)) out.push(`${where}: tagline "Leadership · Power · Justice" is never translated`);
  return out;
}
problems.push(...namingProblems(esSrc, JSON.stringify(T.en, (k, v) => typeof v === "function" ? v.toString() : v), "copy"));

// Module descriptions in facts.js: both languages present, same vocabulary rules,
// and every event's module exists.
global.window = global.window || {};
require(path.join(__dirname, "../../site/assets/js/facts.js"));
const FACTS = global.window.PEA_FACTS, MODS = FACTS.modules || {};
Object.entries(MODS).forEach(([k, m]) => {
  if (!m.es || !m.en) problems.push(`module ${k}: missing ${!m.es ? "es" : "en"} description`);
  if ((m.objectives_es || m.objectives_en) && (m.objectives_es || []).length !== (m.objectives_en || []).length)
    problems.push(`module ${k}: objectives_es and objectives_en differ in length`);
  const objES = (m.objectives_es || []).join(" "), objEN = (m.objectives_en || []).join(" ");
  if (/empower|empodera/i.test(objES + objEN)) problems.push(`module ${k} objectives: empower/empoderar`);
  if (/\baula(s)?\b|docente/i.test(objES)) problems.push(`module ${k} objectives: aula/docentes`);
  if (/stakeholder/i.test(objEN)) problems.push(`module ${k} objectives: "stakeholders"`);
  if (/empower|empodera/i.test(m.es + m.en)) problems.push(`module ${k}: empower/empoderar`);
  if (/\baula(s)?\b/i.test(m.es)) problems.push(`module ${k}: aula → salón/clase`);
  if (/docente/i.test(m.es)) problems.push(`module ${k}: docentes → maestros`);
  if (/stakeholder/i.test(m.en)) problems.push(`module ${k}: "stakeholders" (institutional register)`);
  if (/nueve semanas|nine[- ]week|diez semanas|ten[- ]week/i.test(m.es + m.en)) problems.push(`module ${k}: describe 18 classes, not weeks`);
});
Object.entries(MODS).forEach(([k, m]) => problems.push(...namingProblems(m.es || "", m.en || "", `module ${k}`)));
// Weekly notes ("Esta semana") need both languages; material titles follow the same vocabulary rules.
Object.values(FACTS.cohorts).forEach(c => Object.entries(c.weekNotes || {}).forEach(([w, n]) => {
  if (!n || !n.es || !n.en) problems.push(`${c.code} weekNotes ${w}: needs both es and en`);
  else {
    if (/empower|empodera/i.test(n.es + n.en)) problems.push(`${c.code} weekNotes ${w}: empower/empoderar`);
    if (/docente/i.test(n.es)) problems.push(`${c.code} weekNotes ${w}: docentes → maestros`);
    problems.push(...namingProblems(n.es, n.en, `${c.code} weekNotes ${w}`));
  }
}));
const TYPES = FACTS.materialTypes || {};
Object.entries(TYPES).forEach(([k, t]) => { if (!t.es || !t.en) problems.push(`materialTypes ${k}: needs es and en titles`); });
Object.entries(MODS).forEach(([k, m]) => ["materials", "resources"].forEach(list => (m[list] || []).forEach((it, i) => {
  if (!TYPES[it.type] && !(it.title_es && it.title_en)) problems.push(`module ${k} ${list}[${i}]: unknown type "${it.type}" without titles`);
  if (!it.es && !it.en && !it.any) problems.push(`module ${k} ${list}[${i}]: no URL in either language`);
})));
Object.values(FACTS.cohorts).forEach(c => (c.classResources || []).forEach(k => {
  if (!TYPES[k]) problems.push(`${c.code} classResources: "${k}" needs a materialTypes title`);
  if (!(FACTS.links[c.code] || {})[k] && !FACTS.links.global[k]) problems.push(`${c.code} classResources: no link "${k}"`);
}));
Object.values(FACTS.cohorts).forEach(c => c.events.forEach(e => {
  if (e.module && !MODS[e.module]) problems.push(`${c.code} ${e.code}: module ${e.module} missing from facts.modules`);
}));

if (problems.length) { console.error("PARITY/VOCABULARY FAIL\n  " + problems.join("\n  ")); process.exit(1); }
const count = (o) => Array.isArray(o) ? o.reduce((n, x) => n + count(x), 0)
  : (o && typeof o === "object") ? Object.values(o).reduce((n, x) => n + count(x), 0) : 1;
console.log(`Parity OK — ${count(T.es)} ES strings, ${count(T.en)} EN strings, vocabulary clean; ${Object.keys(MODS).length} module descriptions checked.`);
