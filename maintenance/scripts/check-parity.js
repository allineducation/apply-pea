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
[[/\baula(s)?\b/i, "aula → salón/clase"], [/vosotros|vuestr/i, "vosotros → ustedes"], [/\bAIE\b/, "AIE in family-facing prose → ALL In Education"]]
  .forEach(([re, w]) => { if (re.test(esSrc)) problems.push(`ES vocabulary: ${w}`); });
if (/\bAIE\b/.test(JSON.stringify(T.en))) problems.push("EN vocabulary: AIE in family-facing prose → ALL In Education");

if (problems.length) { console.error("PARITY/VOCABULARY FAIL\n  " + problems.join("\n  ")); process.exit(1); }
const count = (o) => Array.isArray(o) ? o.reduce((n, x) => n + count(x), 0)
  : (o && typeof o === "object") ? Object.values(o).reduce((n, x) => n + count(x), 0) : 1;
console.log(`Parity OK — ${count(T.es)} ES strings, ${count(T.en)} EN strings, vocabulary clean.`);
