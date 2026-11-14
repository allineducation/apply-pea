/* ==================================================================
   PEA Applicant Hub — app  (v0.21.10)
   Vanilla JS, no build step, no dependencies. State-based navigation
   (hash routes) per AIE Hub Design System §5.1. Every date, time and
   link resolves from facts.js; every string from copy.js.
   ================================================================== */
(function () {
  "use strict";

  var VERSION = "0.24.0";
  var UPDATED = "2026-11-14";
  var F = window.PEA_FACTS, T = window.T;
  var AZ = -7 * 3600 * 1000;                       /* Arizona: UTC-7, no DST */
  var LS_LANG = "aie_lang";

  /* ---------- sections, groups, order ---------- */
  var GROUPS = [
    { id: "join",  color: "blue",   items: ["participar", "esta-semana", "calendario", "recursos"] },   /* Materiales y recursos after Calendario (v0.23.0) */
    { id: "help",  color: "purple", items: ["ayuda"] }      /* Información y ayuda: help, team and story on one page (v0.22.0) */
  ];
  var ORDER = [].concat.apply(["inicio"], GROUPS.map(function (g) { return g.items; }));
  function colorOf(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].items.indexOf(id) !== -1) return GROUPS[i].color;
    return "blue";
  }

  /* ---------- storage (never load-bearing) ---------- */
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- language ---------- */
  function initialLang() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("lang"); } catch (e) {}
    if (q === "es" || q === "en") return q;
    var saved = lsGet(LS_LANG);
    if (saved === "es" || saved === "en") return saved;
    return "es";                                    /* PEA default is Spanish (brand §5.3) */
  }
  var lang = initialLang();
  var L = T[lang];

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function az(iso) { return new Date(new Date(iso).getTime() + AZ); }
  function clockParts(iso) {
    var d = az(iso), h = d.getUTCHours(), m = d.getUTCMinutes();
    return { t: (h % 12 || 12) + ":" + (m < 10 ? "0" : "") + m, ap: h >= 12 ? "PM" : "AM" };
  }
  function clock(iso) { var c = clockParts(iso); return c.t + " " + c.ap; }
  function spanDash(a, b) {
    var A = clockParts(a), B = clockParts(b);
    return (A.ap === B.ap ? A.t : A.t + " " + A.ap) + "–" + B.t + " " + B.ap;
  }
  function spanWords(a, b) {
    var A = clockParts(a), B = clockParts(b), w = lang === "es" ? " a " : " to ";
    return (A.ap === B.ap ? A.t : A.t + " " + A.ap) + w + B.t + " " + B.ap;
  }
  function longDate(iso) {
    var d = az(iso), D = L.days;
    return lang === "es"
      ? D.names[d.getUTCDay()] + " " + d.getUTCDate() + " de " + D.months[d.getUTCMonth()] + " de " + d.getUTCFullYear()
      : D.names[d.getUTCDay()] + ", " + D.months[d.getUTCMonth()] + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
  }
  function shortDate(iso) {
    var d = az(iso), D = L.days;
    return lang === "es"
      ? { dow: D.short[d.getUTCDay()], dm: d.getUTCDate() + " " + D.months[d.getUTCMonth()].slice(0, 3) }
      : { dow: D.short[d.getUTCDay()], dm: D.months[d.getUTCMonth()].slice(0, 3) + " " + d.getUTCDate() };
  }
  function ymdLong(ymd) {                          /* "2026-07-17" -> "17 de julio de 2026" / "July 17, 2026" */
    var p = ymd.split("-"), y = +p[0], m = +p[1] - 1, d = +p[2], M = L.days.months;
    return lang === "es" ? d + " de " + M[m] + " de " + y : M[m] + " " + d + ", " + y;
  }
  function dayKey(date) { var d = new Date(date.getTime() + AZ); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); }
  function daysUntil(iso, now) { return Math.round((dayKey(new Date(iso)) - dayKey(now)) / 864e5); }
  function lowerFirst(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function norm(s) { return String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

  /* ---------- the active cohort (computed, never chosen) ---------- */
  var NOW = new Date();
  (function () {                                    /* ?today=2026-10-07 lets staff preview another day */
    try {
      var t = new URLSearchParams(location.search).get("today");
      if (t && /^\d{4}-\d{2}-\d{2}(T[\d:]+)?$/.test(t)) {
        var d = new Date(t.length === 10 ? t + "T12:00:00-07:00" : t + "-07:00");
        if (!isNaN(d)) NOW = d;
      }
    } catch (e) {}
  })();

  function sorted(evts) { return evts.slice().sort(function (a, b) { return new Date(a.start) - new Date(b.start); }); }
  function activeCohort(now) {
    var list = Object.keys(F.cohorts).map(function (k) {
      var c = F.cohorts[k], s = c.events.map(function (e) { return new Date(e.start).getTime(); });
      return { c: c, start: Math.min.apply(null, s), end: Math.max.apply(null, s) };
    }).filter(function (x) { return x.c.events.length; })
      .sort(function (a, b) { return a.start - b.start; });
    var t = now.getTime();
    var confirmed = list.filter(function (x) { return !x.c.projected; });
    var selected = confirmed.find(function (x) { return t <= x.end + 14 * 864e5; }) || confirmed[confirmed.length - 1] || list[0];
    var index = list.indexOf(selected);
    return { cur: selected.c, next: list[index + 1] ? list[index + 1].c : null };
  }
  Object.keys(F.cohorts).forEach(function (k) { F.cohorts[k].events.forEach(function (e) { e._c = k; }); });
  /* Undated events (a date still to be confirmed) stay in facts.js but are never shown. */
  Object.keys(F.cohorts).forEach(function (k) { var c = F.cohorts[k]; c.events = c.events.filter(function (e) { return e.start && e.end; }); });
  /* "Applications open" milestone: all day on the Wednesday after the cohort's 3rd class (Arizona time). */
  function appSwitch(c) {
    var cls = sorted(c.events).filter(function (e) { return e.kind === "cls"; });
    if (!c.applySwitch || cls.length < 3) return null;
    var d = az(cls[2].start), add = (3 - d.getUTCDay() + 7) % 7 || 7;
    var day = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + add) - AZ;   /* midnight in Arizona, as UTC */
    return { code: "APP", kind: "milestone", sub: "apply", allDay: true, _c: c.code,
             start: new Date(day).toISOString(), end: new Date(day + 864e5).toISOString() };
  }
  Object.keys(F.cohorts).forEach(function (k) { var m = appSwitch(F.cohorts[k]); if (m) F.cohorts[k].events.push(m); });
  var AC = activeCohort(NOW), C = AC.cur, EV = sorted(C.events);
  var CLASSES = EV.filter(function (e) { return e.kind === "cls"; });

  /* A link resolves or it does not exist. Families never see a gap marker.
     Class Zoom access is a personal link sent in the welcome email, so the
     only Zoom registration link here is the optional information session. */
  function link(key, code) {
    var cohort = F.cohorts[code || C.code];
    if (key === "info" && cohort) {
      if (cohort.projected) return null;
      if (!cohort.events.some(function (e) { return e.kind === "info" && new Date(e.end) > NOW; })) return null;
    }
    var m = F.links[code || C.code] || {};
    return m[key] || F.links.global[key] || null;
  }

  function opensLabel(e) {                         /* the cohort an "applications open" milestone switches to */
    var s = F.cohorts[e._c].applySwitch, o = F.cohorts[s.opens];
    return o ? (lang === "es" ? o.label_es : o.label_en) : s.opens;
  }
  function isMilestone(e) { return e.kind === "milestone" || !!e.milestone; }
  function eventKey(e) { return e._c + "-" + e.code; }
  function cohortLabel() { return lang === "es" ? C.label_es : C.label_en; }
  function classDays() {                              /* "martes y jueves" / "Tuesdays and Thursdays" */
    var seen = [];
    CLASSES.forEach(function (e) { var w = az(e.start).getUTCDay(); if (seen.indexOf(w) === -1) seen.push(w); });
    seen.sort();
    var names = seen.map(function (w) { return L.days.names[w] + (lang === "en" ? "s" : ""); });
    if (names.length <= 1) return names.join("");
    return names.slice(0, -1).join(", ") + " " + L.days.and + " " + names[names.length - 1];
  }
  function classTime(fmt) { var e = CLASSES[0]; return e ? fmt(e.start, e.end) : ""; }
  function evTitle(e) {
    var K = L.cal.kinds, P = L.cal.topics;
    if (e.kind === "info") return { kind: K.info, topic: P.info };
    if (e.kind === "holiday") return { kind: K.holiday, topic: P.holiday };
    if (e.kind === "focus") return { kind: K.focus, topic: P.focus };
    if (e.kind === "milestone") return { kind: K.milestone, topic: e.sub === "apply" ? L.cal.applyOpens(opensLabel(e)) : (lang === "es" ? e.title_es : e.title_en) };
    return { kind: e.grad ? K.grad : K.cls, topic: lang === "es" ? e.title_es : e.title_en };
  }

  /* ---------- small builders ---------- */
  function ext(url, inner, cls, extra) {
    if (!url) return '';
    return '<a class="' + (cls || '') + '" href="' + esc(url) + '"' + (extra || '') + '>' + inner + '</a>';
  }
  function callout(variant, label, html) {
    return '<div class="callout ' + (variant || "") + '"><span class="label">' + esc(label) + "</span><p>" + html + "</p></div>";
  }
  function groupOf(id) { for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].items.indexOf(id) !== -1) return GROUPS[i].id; return "join"; }
  function secHead(id) {
    var s = L.sections[id], c = colorOf(id);
    return '<div class="sec-head"><span class="label ' + (c === "purple" ? "purple" : c === "pink" ? "ink" : "blue") + '">' +
      esc(L.nav.groups[groupOf(id)]) + "</span>" +
      '<h1 class="h-sec" tabindex="-1">' + esc(s.label) + "</h1>" +
      '<p class="small time">' + esc(L.ui.minutes(s.time)) + "</p></div>";
  }
  function panel(title, inner, o) {               /* every titled section collapses and starts closed; o: { level: 3, id: "p-…" } */
    var h = o && o.level === 3 ? "h3" : "h2";
    return '<details class="block sec"' + (o && o.id ? ' id="' + o.id + '"' : "") + '><summary class="sec-sum"><' + h + ' class="h-sec">' + esc(title) + "</" + h + "></summary>" +
      '<div class="sec-body">' + inner + '</div></details>';
  }
  function section(title, lead, body, o) {
    return panel(title, (lead ? '<p class="lead">' + esc(lead) + '</p>' : '') + body, o);
  }

  function cards(items) {
    return '<div class="lgrid">' + items.map(function (item) {
      return '<div class="card top-blue"><h3 class="h3">' + esc(item[0]) + '</h3><p>' + esc(item[1]) + '</p></div>';
    }).join('') + '</div>';
  }
  function accordion(items) {
    return '<div class="accordion">' + items.map(function (item) {
      return '<details class="accordion-item"><summary class="accordion-header"><span>' + esc(item[0]) +
        '</span><span class="acc-chev" aria-hidden="true"></span></summary><div class="accordion-body"><p>' + esc(item[1]) + "</p>" +
        (item[2] ? '<p class="small">' + esc(item[2]) + "</p>" : "") + "</div></details>";
    }).join("") + "</div>";
  }
  function btnRow(inner) { return inner ? '<div class="btnrow">' + inner + "</div>" : ""; }
  function inLink(hash, label, cls) { return '<a class="btn ' + (cls || "btn-secondary") + '" href="' + hash + '">' + esc(label) + "</a>"; }
  function linkList(items) {                        /* [key, title, description] → link cards; missing links are skipped */
    var lis = items.map(function (it) {
      var u = link(it[0]); if (!u) return "";
      return "<li>" + ext(u, '<span class="t">' + esc(it[1]) + '</span><span class="d">' + esc(it[2]) + "</span>", "lnk" + (it[0] === "apply" ? " key" : "")) + "</li>";
    }).join("");
    return lis ? '<ul class="lgrid">' + lis + "</ul>" : "";
  }

  /* ---------- header band + nav + footer ---------- */
  function renderBand(route) {                     /* subpages get a Back link to Home, left of the logo */
    var back = route === "inicio" ? "" : '<a class="back-link" href="#inicio" aria-label="' + esc(L.ui.backLabel) + '">' +
      '<span aria-hidden="true">‹</span><span class="back-txt">' + esc(L.ui.back) + "</span></a>";
    document.getElementById("bandinner").innerHTML =
      '<div class="band-l">' + back + (back ? '<picture class="band-logo"><source media="(max-width: 560px)" srcset="assets/img/aie-mark-96.png" width="36" height="36">' : "") +
      '<img src="assets/img/aie-logo-primary.png" width="260" height="36" alt="ALL In Education — Leadership · Power · Justice">' + (back ? "</picture>" : "") + "</div>" +
      '<div class="band-r"><div><div class="band-title">' + esc(L.toolTitle) + "</div>" +
      '<div class="band-sub">' + esc(L.toolSub(cohortLabel())) + "</div></div>" +
      '<div class="lang-toggle" role="group" aria-label="' + esc(L.langSwitch.group) + '">' +
      ["es", "en"].map(function (l) {
        return '<button type="button" class="lang-pill" data-lang="' + l + '" lang="' + l + '" aria-pressed="' + (l === lang) + '"' +
          (l === lang ? "" : ' aria-label="' + esc(l === "en" ? L.langSwitch.toEn : L.langSwitch.toEs) + '"') + ">" + l.toUpperCase() + "</button>";
      }).join("") + "</div></div>";
  }
  function renderNav(active) {
    document.getElementById('gnav').innerHTML = '<details class="menu"><summary><span aria-hidden="true">☰</span> <span class="menu-txt">' + esc(L.nav.menu) + '</span></summary><div class="menu-links">' + ORDER.filter(function (id) { return id !== 'esta-semana'; }).map(function (id) {   /* Esta semana stays reachable by its shared link, not the menu (Danny Hernández, 2026-10-14) */
      return '<a href="#' + id + '"' + (id === active ? ' aria-current="page"' : '') + '>' + esc(id === 'inicio' ? L.nav.home : L.sections[id].label) + '</a>';
    }).join('') + '</div></details>';
  }
  function renderFoot() {
    document.getElementById("foot").innerHTML =
      '<img src="assets/img/aie-logo-primary.png" width="220" height="30" alt="' + esc(L.foot.logoAlt) + '">' +
      '<div class="meta">' + esc(L.foot.rights) + "<br>" + esc(L.foot.version(VERSION, ymdLong(UPDATED))) + "</div>";
  }

  /* ---------- shared blocks ---------- */
  function stepsHtml(compact) {                    /* compact: titles + one line each, for Home */
    return '<ol class="steps' + (compact ? " compact" : "") + '">' + L.steps.items.map(function (s, i) {
      var u = link(s.link), tag = s.ordered ? "ol" : "ul";
      return '<li class="step' + (s.key ? " key" : "") + '"><span class="dot' + (s.key ? " blue" : "") + '" aria-hidden="true">' + (i + 1) + "</span>" +
        '<div class="step-body"><div class="step-head"><h3 class="h3">' + esc(s.t) + "</h3></div>" +
        (compact ? "<p>" + esc(s.short) + "</p>"
          : "<p>" + esc(s.d) + "</p>" +
            (s.list ? "<" + tag + ' class="step-list">' + s.list.map(function (x) {
              if (typeof x === "object") { if (x.whileInfo && !link("info")) return ""; x = x.t; }   /* info-session items hide once it has passed */
              return "<li>" + esc(x) + "</li>";
            }).join("") + "</" + tag + ">" : "") +
            (s.after ? "<p>" + esc(s.after) + "</p>" : "")) +
        (u ? btnRow(ext(u, esc(s.cta), "btn btn-sm " + (s.key ? "btn-primary" : "btn-secondary"))) : "") +
        "</div></li>";
    }).join("") + "</ol>";
  }
  function helpCardHtml() {
    var S = L.steps, O = F.org;
    return '<aside class="help-card" aria-label="' + esc(L.help.contactH) + '"><p>' + esc(S.helpText) + '</p><div class="help-links">' +
      '<a class="help-link" href="mailto:' + esc(O.email) + '"><span aria-hidden="true">✉️</span><span>' + esc(S.helpEmail) + "</span></a>" +
      '<a class="help-link" href="' + esc(O.phoneHref) + '"><span aria-hidden="true">📞</span><span>' + esc(S.helpCall + " " + O.phone) + "</span></a>" +
      '<a class="help-link" href="' + esc(O.smsHref) + '"><span aria-hidden="true">💬</span><span>' + esc(S.helpSms) + "</span></a>" +
      "</div></aside>";
  }
  function infoNote() { return link("info") ? L.steps.infoNote : L.steps.infoPastNote; }   /* never point to an expired link */
  function infoCardHtml() {
    var infos = EV.filter(function (e) { return e.kind === "info"; });
    if (!infos.length) return "";
    return '<div class="card top-pink">' +
      '<ul class="checks">' + infos.map(function (e) {
        var past = new Date(e.end).getTime() < NOW.getTime();
        return '<li class="check"><div><div class="h3">' + esc(cap(longDate(e.start))) + '</div><div class="small">' + esc(spanDash(e.start, e.end)) +
          (past ? " · " + esc(L.cal.done) : "") + "</div></div></li>";
      }).join("") + "</ul>" +
      '<p class="small">' + esc(infoNote()) + "</p>" +
      btnRow(ext(link("info"), esc(L.cal.infoJoin), "btn btn-secondary btn-sm")) + "</div>";
  }
  function zoomHelpHtml() {
    var S = L.steps;
    var vids = S.vids.map(function (v) {
      var u = link(v[0]); if (!u) return "";
      return "<li>" + ext(u, '<span class="t">' + esc(v[1]) + '</span><span class="d">' + esc(v[2]) + "</span>", "lnk") + "</li>";
    }).join("");
    var resend = link("resend");
    return section(S.zoomH, S.zoomLead, '<ul class="lgrid">' + vids + "</ul>" +
      '<div class="block">' + callout("gold", S.lostLabel, esc(S.lost)) + btnRow(ext(resend, esc(S.resendCta), "btn btn-primary btn-sm")) +
      callout("mid", S.deviceLabel, esc(S.device)) + "</div>");
  }

  /* ---------- pages ---------- */
  function audienceHtml() {
    var H = L.home, routes = ["#participar", "#esta-semana", "#ayuda/despues"], icons = ["📝", "🎓", "🤝"];
    return '<nav class="audience-router" aria-label="' + esc(H.audienceH) + '"><h2 class="audience-h">' + esc(H.audienceH) + "</h2>" +
      '<div class="audience-grid">' + H.audience.map(function (a, i) {
        return '<a class="audience-card" href="' + routes[i] + '"><span class="audience-badge" aria-hidden="true">' + icons[i] + "</span>" +
          '<span class="audience-body"><span class="audience-t">' + esc(a[0]) + '</span><span class="audience-d">' + esc(a[1]) + "</span></span>" +
          '<span class="audience-go" aria-hidden="true">→</span></a>';
      }).join("") + "</div></nav>";
  }
  function upNextHtml() {                         /* the next 2 dated events (no "no class" days), linked to their Calendar cards */
    var H = L.home, items = EV.filter(function (e) { return e.kind !== "holiday" && !e.projected && new Date(e.end) > NOW; }).slice(0, 2);
    if (!items.length) return "";
    return '<section class="up-next" aria-labelledby="upnext-h"><h2 class="up-next-h" id="upnext-h">' + esc(H.upNextH) + '</h2>' + upList(items) + "</section>";
  }
  function upList(items) {                         /* compact date cards, each linked to its Calendar card */
    return '<ul class="up-next-list">' + items.map(function (e) {
      var tt = evTitle(e), today = daysUntil(e.start, NOW) === 0;
      return '<li><a class="up-next-card" href="#calendario/' + esc(eventKey(e)) + '">' + dateBadge(e) +
        '<span class="up-next-body"><span class="event-tags"><span class="category-badge badge-' + badgeOf(e) + '">' + esc(tt.kind) + "</span>" +
        (today ? '<span class="tag gold">' + esc(L.cal.today) + "</span>" : "") + "</span>" +
        '<span class="up-next-t">' + esc(tt.topic) + '</span>' + (e.kind === "holiday" ? "" : '<span class="event-time">' + whenHtml(e) + "</span>") +
        '<span class="up-next-cta">' + esc(L.home.upNextCta) + "</span></span></a></li>";
    }).join("") + "</ul>";
  }
  function pageHome() {                            /* short router: up next → what PEA is → how to join; details live on their pages */
    var H = L.home;
    var chips = '<div class="chips"><span class="tag gold">' + esc(H.chipFree) + '</span><span class="tag blue">' + esc(H.chipZoom) + "</span>" +
      '<span class="tag blue">' + esc(H.chipLang) + "</span></div>";
    return '<h1 class="home-title" tabindex="-1">' + esc(H.h) + "</h1>" + upNextHtml() + audienceHtml() + actionsHtml(false) +
      section(H.whatH, H.what, '<p class="lead">' + esc(H.what2) + "</p>" + chips) +
      section(H.stepsH, "", stepsHtml(true) + btnRow(inLink("#participar", H.stepsCta, "btn-primary")));
  }
  function pageParticipar() {                      /* applicant order: steps → fit → time → info session → Zoom help → staff */
    var S = L.steps, H = L.home;
    return secHead("participar") + '<p class="lead">' + esc(S.lead) + "</p>" +
      '<section class="block">' + stepsHtml(false) + helpCardHtml() + "</section>" +
      section(H.fitH, H.fitLead, accordion(H.fitItems) + btnRow(inLink("#ayuda/contacto", H.askCta))) +
      section(H.timeH, H.timeText, '<p class="small">' + esc(H.timeNote) + "</p>") +
      section(S.infoH, "", infoCardHtml()) +
      zoomHelpHtml() +
      section(S.staffH, S.staffText, "");
  }

  var calFilter = 'all';
  var calOpen = {};                                /* expanded rows — survive filter changes and the 60-second refresh */
  function expandable(e) { return e.kind === "cls" || e.kind === "info" || e.kind === "milestone"; }
  function weekOpens(e) {                         /* first class of the same week ("3R" → the "3T" class) */
    var wk = parseInt(e.code, 10), cohort = F.cohorts[e._c];
    return sorted(cohort.events).find(function (x) { return x.kind === "cls" && parseInt(x.code, 10) === wk; }) || e;
  }
  function eventDesc(e) {                         /* shown on the card itself; the details add the rest */
    var mod = e.module && F.modules ? F.modules[e.module] : null;
    var sw = e.sub === "apply" ? F.cohorts[e._c].applySwitch : null;
    return e.kind === "info" ? infoNote() : sw ? L.cal.applyOpensDesc(opensLabel(e), lang === "es" ? sw.adds_es : sw.adds_en) : (mod ? mod[lang] : "");
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }
  function exitUrl(e) {                            /* the exit ticket, prefilled with this class (Airtable "Event ID": "FA26 - 10/06/2026") */
    if (e.exit) return e.exit;                     /* a class-specific survey replaces the Airtable form */
    var u = link("exit", e._c), f = F.links.global.exitClassField, d = az(e.start);
    if (!u || !f) return u;
    var id = e._c + " - " + pad2(d.getUTCMonth() + 1) + "/" + pad2(d.getUTCDate()) + "/" + d.getUTCFullYear();
    return u + (u.indexOf("?") === -1 ? "?" : "&") + "prefill_" + encodeURIComponent(f) + "=" + encodeURIComponent(id);
  }
  function absenceHref(e) {                        /* opens the visitor's mail app: to pea@, subject "Ausencia / Absence — {date}" */
    return "mailto:" + F.org.email + "?subject=" + encodeURIComponent(L.cal.detail.absenceSubject(cap(longDate(e.start))));
  }
  function matRows(items) {
    /* One row per item (Danny Hernández, 2026-10-29): the title in the page language, linked to that
       version, then a language code for each version that has a link — "Título ES | EN". The English page
       shows the English title linked to the English version. A one-language item shows its own title and code;
       an item with `any` (one link for both languages) shows only its title. */
    var MT = F.materialTypes || {};
    return '<ul class="mat-list">' + items.map(function (it) {
      var t = MT[it.type] || MT.resource || {};
      var q = ' data-q="' + esc(norm([it.title_es, it.title_en, t.es, t.en].filter(Boolean).join(" "))) + '"';   /* both languages, for the resource search */
      q += ' data-l="' + (it.any ? (it.langs || []).join(" ") : ["es", "en"].filter(function (l) { return it[l]; }).join(" ")) + '"';   /* language filter: a shared link names its real languages in langs (Codex review, PR #65) */
      if (it.any) return "<li" + q + ">" + ext(it.any, esc(it["title_" + lang] || t[lang] || ""), "mat-link") + "</li>";
      var langs = ["es", "en"].filter(function (l) { return it[l]; });
      var main = it[lang] ? lang : langs[0], title = it["title_" + main] || t[lang] || t[main] || "";
      var codes = langs.map(function (l) {
        return ext(it[l], '<span class="lc">' + l.toUpperCase() + "</span>", "mat-code",
          ' lang="' + l + '" hreflang="' + l + '" aria-label="' + esc(title + " (" + (l === "es" ? "Español" : "English") + ")") + '"');
      }).join('<span class="mat-sep" aria-hidden="true">|</span>');
      return "<li" + q + ">" + ext(it[main], esc(title), "mat-link", ' lang="' + main + '" hreflang="' + main + '"') + '<span class="mat-codes">' + codes + "</span></li>";
    }).join("") + "</ul>";
  }
  function hasLink(it) { return it.es || it.en || it.any; }
  var matOpen = {};                                 /* open resource groups by "<cohort><class>:<n>"; survives every re-render (language, refresh, calendar filter) */
  document.addEventListener("toggle", function (ev) {
    var d = ev.target;
    if (d.getAttribute && d.tagName === "DETAILS" && d.hasAttribute("data-k")) matOpen[d.getAttribute("data-k")] = d.open;   /* card sections, groups, resource topics */
  }, true);
  function rowCount(list) { return list.reduce(function (n, it) { return n + (it.items ? it.items.filter(hasLink).length : 1); }, 0); }
  function matBody(linked, key) {
    /* Groups ({ title_es, title_en, items }) render as closed sub-panels with a count, so a long resource
       list stays short until a family opens the topic it needs (v0.22.11). Items keep their order: a run of
       plain items is one list (v0.22.15). */
    var out = "", run = [], gi = 0;
    var flush = function () { if (run.length) out += matRows(run); run = []; };
    linked.forEach(function (it) {
      if (!it.items) return run.push(it);
      flush();
      var rows = it.items.filter(hasLink), k = (key || "") + ":" + gi++;
      out += '<details class="mat-group" data-k="' + esc(k) + '" data-q="' + esc(norm((it.title_es || "") + " " + (it.title_en || ""))) + '"' + (matOpen[k] ? " open" : "") + "><summary><span>" + esc(it["title_" + lang]) + '</span><span class="mat-count">' + rows.length + "</span></summary>" + matRows(rows) + "</details>";
    });
    flush();
    return out;
  }
  function onlyLinked(items) { return (items || []).filter(function (it) { return it.items ? it.items.some(hasLink) : hasLink(it); }); }
  function englishOnly(it) { return !!it.en && !it.es && !it.any; }
  function splitByLang(items, other) {             /* keep groups; each side gets the group's items in its language bucket */
    return onlyLinked(items.map(function (it) {
      if (!it.items) return englishOnly(it) === other ? it : null;
      if (it.whole) return other ? null : it;      /* a `whole` group stays together under Additional resources */
      return { title_es: it.title_es, title_en: it.title_en, items: it.items.filter(function (x) { return englishOnly(x) === other; }) };
    }).filter(Boolean));
  }
  function resSection(name, h, items, open, key, lead) {
    /* One collapsible section of a class card (v0.22.16): Featured, ALL In Education materials, Additional
       resources (Spanish and English, or Spanish only) and Other resources (English only). Left out when empty. */
    if (!items.length) return "";
    var k = key + ":" + name, isOpen = matOpen[k] === undefined ? open : matOpen[k];
    return '<details class="res-sec res-' + name + '" data-k="' + esc(k) + '"' + (isOpen ? " open" : "") + '><summary><span>' + esc(h) +
      '</span><span class="mat-count">' + rowCount(items) + "</span></summary>" + (lead ? '<p class="det-lead">' + esc(lead) + "</p>" : "") + matBody(items, k) + "</details>";
  }
  function calDetail(e) {
    var D = L.cal.detail, over = new Date(e.end).getTime() < NOW.getTime();
    var mod = e.module && F.modules ? F.modules[e.module] : null;
    var b = "", secs = "", notes = "", foot = "";
    if (e.kind === "info") {
      if (!over && link("info", e._c)) b += ext(link("info", e._c), esc(L.cal.infoJoin), "btn btn-primary btn-sm");
    } else if (e.kind === "cls") {
      /* Session materials and resources unlock week by week: both classes of a week open
         together on the day of that week's first class (Arizona time); a section with no
         links is left out (Danny Hernández, 2026-10-06). Every class card
         ends with the same three actions: exit ticket (unlocks with its week), resend my
         Zoom link, and report an absence (until the class starts). */
      var open = weekOpens(e), live = !e.projected && daysUntil(open.start, NOW) <= 0;
      var started = new Date(e.start).getTime() <= NOW.getTime();
      var mats = ((mod && mod.materials) || []).concat(lang === "en" && e.presentation_en ? [{ type: "presentation", en: e.presentation_en }] : []);
      var objs = mod && mod["objectives_" + lang];   /* shown whenever the module has them, before materials */
      secs = (objs && objs.length ? '<div class="det-sec"><h4 class="det-h">' + esc(D.objectives) + '</h4><p class="det-lead">' + esc(D.objectivesLead) + '</p><ol class="obj-list">' +
        objs.map(function (o) { return "<li>" + esc(o) + "</li>"; }).join("") + "</ol></div>" : "") +
        (live ? (function () {
          /* Sections unlock with the week. Featured: the class's own key links (e.g. a partner form), then the
             module's. The cohort's WhatsApp and calendar links live on Esta semana, not on every card (v0.22.16). */
          var key = e._c + e.code, res = (mod && mod.resources) || [];
          var html = resSection("featured", D.secFeatured, onlyLinked((e.featured || []).concat((mod && mod.featured) || [])), true, key) +
            resSection("aie", D.secAie, onlyLinked(mats), true, key) +
            resSection("more", D.secMore, splitByLang(res, false), false, key) +
            resSection("other", D.secOther, splitByLang(res, true), false, key, D.secOtherLead);
          return html ? '<div class="det-sec res-secs">' + html + "</div>" : "";
        })() : "");
      if (!e.projected) notes += "<li>" + esc(D.zoomNote) + "</li>";
      var exitFrom = F.links.global.exitOpensOn, exitLive = live && !(exitFrom && daysUntil(exitFrom + "T12:00:00-07:00", NOW) > 0);
      var acts = [
        exitLive ? [exitUrl(e), D.exit, "🎟️", D.soon] : null,   /* hidden until live */
        [!e.projected && link("resend", e._c), D.resend, "🔁", D.soon],
        [!e.projected && !started && absenceHref(e), D.absence, "✉️", started ? D.past : D.soon]
      ];
      foot = '<div class="det-actions" role="group" aria-label="' + esc(D.actions) + '">' + acts.filter(Boolean).map(function (a) {
        var inner = '<span aria-hidden="true">' + a[2] + "</span><span>" + esc(a[1]) + "</span>";
        return a[0] ? ext(a[0], inner, "btn btn-secondary btn-sm")
          : '<span class="btn btn-secondary btn-sm is-off" aria-disabled="true">' + inner + '<span class="soon">' + esc(a[3]) + "</span></span>";
      }).join("") + "</div>";
    }
    b += '<button type="button" class="btn btn-secondary btn-sm det-cal" data-ics="' + esc(e._c + ":" + e.code) + '"><span aria-hidden="true">📅</span><span>' + esc(D.addCal) + "</span></button>";
    return '<div class="det' + (foot ? " has-actions" : "") + '">' + secs +
      (notes ? '<ul class="det-notes">' + notes + "</ul>" : "") + '<div class="btnrow">' + b + "</div>" + foot + "</div>";
  }
  function badgeOf(e) {                          /* category badge: class · info · graduation · special (focus) · no class */
    return e.kind === "info" ? "info" : e.kind === "milestone" ? "hito" : e.kind === "focus" ? "especial" : e.kind === "holiday" ? "none" : e.grad ? "graduacion" : "clase";
  }
  function dateBadge(e) {
    var d = az(e.start), D = L.days;
    return '<span class="date-badge"><span class="month">' + esc(D.months[d.getUTCMonth()].slice(0, 3)) + '</span><span class="day-number">' + d.getUTCDate() +
      '</span><span class="day-name">' + esc(D.short[d.getUTCDay()]) + "</span></span>";
  }
  function whenHtml(e) { return '<span aria-hidden="true">🕒 </span>' + esc(e.allDay ? L.cal.allDay : spanDash(e.start, e.end)); }
  function openLabel(kind) { var D = L.cal.detail; return kind === "info" ? D.openInfo : kind === "milestone" ? D.openMilestone : D.open; }
  function calMatch(e) {
    return calFilter === "all" || (calFilter === "info" ? e.kind === "info" : calFilter === "milestone" ? isMilestone(e) : e.kind === "cls");
  }
  function calRows() {                             /* date-badge cards, grouped under sticky month dividers */
    var D = L.days, groups = [], cur = null;
    EV.filter(calMatch).forEach(function (e) {
        var d = az(e.start), mk = d.getUTCFullYear() * 12 + d.getUTCMonth();
        if (!cur || cur.mk !== mk) groups.push(cur = { mk: mk, label: cap(D.months[d.getUTCMonth()]) + " " + d.getUTCFullYear(), items: [] });
        cur.items.push(e);
      });
    return groups.map(function (g) {
      return '<section class="month-group"><h2 class="month-divider">' + esc(g.label) + '</h2><ol class="event-list">' + g.items.map(function (e) {
        return eventCard(e, false);
      }).join("") + "</ol></section>";
    }).join("");
  }
  function eventCard(e, week, fold) {              /* week: "Esta semana" shows every detail, always open;
                                                     fold: an earlier day of that week — collapsed, opens on tap */
    var tt = evTitle(e), key = eventKey(e), x = expandable(e), tog = x && (!week || fold), open = tog ? !!calOpen[key] : x;
    var past = new Date(e.end).getTime() < NOW.getTime(), today = daysUntil(e.start, NOW) === 0, desc = x ? eventDesc(e) : "";
    var cls = "event-card" + (week ? " week-card" : "") + (past ? " is-past" : "") + (today ? " is-today" : "") + (e.kind === "info" ? " is-info" : "") +
      (e.kind === "milestone" ? " is-milestone" : "") + (tog ? " has-det" : "") + (fold ? " folded" : "") + (open ? " open" : "");
    var tags = (e.milestone ? '<span class="tag gold">' + esc(e.milestone === "start" ? L.cal.mStart : L.cal.mEnd) + "</span>" : "") +
               (today ? '<span class="tag gold">' + esc(L.cal.today) + "</span>" : past ? '<span class="tag">' + esc(L.cal.done) + "</span>" : "") +
               (e.kind === "info" ? '<span class="tag pink">' + esc(L.ui.optional) + "</span>" : "");
    var label = esc(tt.topic);
    var title = tog
      ? '<button type="button" class="cal-open" data-row="' + esc(key) + '" aria-expanded="' + open + '" aria-controls="det-' + esc(key) + '">' +
        '<span class="ct">' + label + '</span><span class="chev" aria-hidden="true"></span><span class="sr-only"> — ' +
        esc(open ? L.cal.detail.close : openLabel(e.kind)) + "</span></button>"
      : label;
    return '<li class="' + cls + '"' + (tog ? ' data-rowkey="' + esc(key) + '"' : "") + ">" + dateBadge(e) +
      '<div class="event-content"><div class="event-tags"><span class="category-badge badge-' + badgeOf(e) + '">' + esc(tt.kind) + "</span>" + tags + "</div>" +
      '<h3 class="event-title">' + title + "</h3>" +
      (e.kind === "holiday" ? "" : '<p class="event-time">' + whenHtml(e) + "</p>") +
      (desc ? '<p class="event-desc">' + esc(desc) + "</p>" : "") + "</div>" +
      (x ? '<div class="event-det"' + (tog ? ' id="det-' + esc(key) + '"' : "") + (open ? "" : " hidden") + ">" + calDetail(e) + "</div>" : "") + "</li>";
  }
  function toggleRow(key) {
    calOpen[key] = !calOpen[key];
    var btn = document.querySelector('.cal-open[data-row="' + key + '"]'), det = document.getElementById("det-" + key);
    var tr = document.querySelector('.event-card[data-rowkey="' + key + '"]');
    if (!btn || !det) return;
    btn.setAttribute("aria-expanded", String(calOpen[key]));
    det.hidden = !calOpen[key];
    if (tr) tr.classList.toggle("open", calOpen[key]);
    var sr = btn.querySelector(".sr-only");
    if (sr) sr.textContent = " — " + (calOpen[key] ? L.cal.detail.close : openLabel(tr && tr.classList.contains("is-info") ? "info" : tr && tr.classList.contains("is-milestone") ? "milestone" : "cls"));
  }
  function pageCalendario() {
    var K = L.cal, f = K.filters;
    var pills = ["all", "milestone", "info", "cls"].map(function (k) {
      return '<button type="button" class="pill" data-filter="' + k + '" aria-pressed="' + (calFilter === k) + '">' + esc(f[k]) + "</button>";
    }).join("");
    return secHead("calendario") + '<p class="lead">' + esc(K.tapHint) + "</p>" + callout("", K.scheduleLabel, esc(K.scheduleNote)) +
      (C.projected ? callout("gold", K.projectedLabel, esc(K.projected)) : "") +
      '<div class="filters" role="group" aria-label="' + esc(K.filterLabel) + '"><span class="label">' + esc(K.filterLabel) + "</span>" + pills + "</div>" +
      '<div class="cal-cards" id="calbody" role="region" aria-label="' + esc(K.h + " · " + cohortLabel()) + '">' + calRows() + "</div>" +
      '<p class="small mt">' + esc(K.note) + "</p>" + btnRow(inLink("#recursos", K.resCta)) +
      '<div class="btnrow cal-actions"><button type="button" class="btn btn-primary" data-ics="all">' + esc(K.ics) + "</button>" +
      ext(link("cal"), esc(K.full), "btn btn-secondary") + "</div>" +
      '<p class="small">' + esc(K.icsHelp) + "</p>" +
      section(K.springH, K.spring, "");
  }

  /* ---------- Información y ayuda: help → team → our story, one page (v0.22.0) ---------- */
  var LEARN = [["preguntas", "❓"], ["equipo", "👥"], ["historia", "📖"]];
  function mediaMonth(ymd) {                       /* "2023-05-19" → "mayo de 2023" / "May 2023" */
    var y = ymd.slice(0, 4), mo = L.days.months[parseInt(ymd.slice(5, 7), 10) - 1];
    return lang === "es" ? mo + " de " + y : cap(mo) + " " + y;
  }
  function storyHtml() {                         /* where we started → what each cohort builds → why → who we are → what others say */
    var H = L.hist, fg = F.figures, S = H.stats, o = { level: 3 };
    var stats = '<div class="stats">' +
      '<div class="stat"><div class="stat-n">' + fg.alumni + '</div><div class="stat-l">' + esc(S.alumni) + '</div><div class="stat-note">' +
      esc(S.alumniNote(fg.alumniCohorts, fg.alumniYears, ymdLong(fg.alumniAsOf))) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + C.num + '</div><div class="stat-l">' + esc(S.cohort) + '</div><div class="stat-note">' + esc(cohortLabel()) + "</div></div></div>";
    var media = F.media.slice().sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); }).map(function (m) {
      var url = m["url_" + lang] || m.url_es || m.url_en, art = m["url_" + lang] ? lang : (m.url_es ? "es" : "en");
      var other = art === "es" ? "en" : "es", alt = m["url_" + other];
      var meta = [m.outlet, m.date ? mediaMonth(m.date) : "", m.kind === "video" ? H.mediaVideo : "",
                  art !== lang ? H.mediaLang[art] : ""].filter(Boolean).join(" · ");
      return "<li>" + ext(url, '<span class="t">' + esc(m[lang]) + '</span><span class="d">' + esc(meta) + "</span>", "lnk") +
        (alt ? '<a class="media-alt" href="' + esc(alt) + '">' + esc(H.mediaAlt[other]) + "</a>" : "") + "</li>";
    }).join("");
    return panel(H.originH, '<p class="lead">' + esc(H.p[0]) + "</p>", o) +
      panel(H.cohortH, '<p class="lead">' + esc(H.p[1]) + "</p>" +
        '<p class="lead">' + esc(H.evalLine) + '<sup class="fn-ref" aria-describedby="nota-1">1</sup></p>' +
        '<div class="block">' + stats + "</div>" +
        '<p class="footnote" id="nota-1"><span class="sr-only">' + esc(H.noteLabel) + " </span><sup>1</sup> " + esc(H.footnote) + "</p>", o) +
      panel(H.missionH, '<p class="lead">' + esc(H.missionLead) + '</p><blockquote class="quote">' + esc(H.mission) + "</blockquote>", o) +
      section(H.videoH, H.videoText, btnRow(ext(link("overviewVideo"), esc(H.videoCta), "btn btn-secondary")), o) +
      panel(H.mediaH, '<p class="lead">' + esc(H.mediaLead) + '</p><ul class="lgrid media-list">' + media + "</ul>", o);
  }
  function teamHtml() {
    var M = L.team;
    return '<p class="lead">' + esc(M.lead) + '</p><ul class="team-grid">' + F.staff.map(function (p) {
      var title = lang === "es" ? p.title_es : p.title_en;
      return '<li class="team-card"><img class="team-photo" src="' + esc(p.photo) + '" width="480" height="600" alt="' + esc(M.photoAlt(p.name)) + '">' +
        '<div class="team-body"><h3 class="team-name">' + esc(p.name) + "</h3>" + (title ? '<p class="team-title">' + esc(title) + "</p>" : "") +
        '<a class="team-email" href="mailto:' + esc(p.email) + '"><span aria-hidden="true">✉️</span><span>' + esc(p.email) + "</span></a></div></li>";
    }).join("") + "</ul>";
  }
  function learnNavHtml() {
    var R = L.learn;
    return '<nav class="learn-nav" aria-label="' + esc(R.onPage) + '"><span class="learn-nav-l">' + esc(R.onPage) + '</span><ul>' + LEARN.map(function (x) {
      return '<li><a class="learn-pill" href="#ayuda/' + x[0] + '" data-part="' + x[0] + '"><span aria-hidden="true">' + x[1] + "</span> " + esc(R.parts[x[0]]) + "</a></li>";
    }).join("") + "</ul></nav>";
  }
  function learnGroup(id, body) {
    var R = L.learn, intro = R.intros[id];
    return '<section class="learn-group" id="g-' + id + '" aria-labelledby="gh-' + id + '"><h2 class="learn-h" id="gh-' + id + '" tabindex="-1">' + esc(R.parts[id]) + "</h2>" +
      (intro ? '<p class="lead">' + esc(intro) + "</p>" : "") + body + "</section>";
  }

  function faqItems() {
    var ctx = { label: lang === "es" ? lowerFirst(C.label_es) : C.label_en, infoOpen: !!link("info") };
    var items = [];
    L.faq.items.forEach(function (q) {
      var a = typeof q[1] === "function" ? q[1](ctx) : q[1];   /* date- and cohort-aware answers; "" hides the question */
      if (a) items.push([q[0], a, q[2] && link(q[2][0]) ? q[2] : null]);   /* optional [link key, button label] */
    });
    return items;
  }
  function contactHtml() {
    var O = F.org, P = L.help, Lb = P.labels;
    return section(P.contactH, P.contactLead, '<div class="card top-blue"><dl class="kv">' +
      "<dt>" + esc(Lb.email) + '</dt><dd><a href="mailto:' + esc(O.email) + '">' + esc(O.email) + "</a></dd>" +
      "<dt>" + esc(Lb.phone) + '</dt><dd><a href="' + esc(O.phoneHref) + '">' + esc(O.phone) + '</a> · <a href="' + esc(O.smsHref) + '">' + esc(P.smsCta) + "</a></dd>" +
      "<dt>" + esc(Lb.wa) + "</dt><dd>" + ext(O.waHref, esc(P.waCta)) + "</dd>" +
      "<dt>" + esc(Lb.web) + "</dt><dd>" + ext(O.web, esc(P.webLabel)) + "</dd>" +
      "</dl></div>" + btnRow(inLink("#ayuda/equipo", P.teamCta)), { level: 3, id: "p-contacto" });
  }
  function pageAyuda() {                           /* help (talk to us → answers → links → after PEA) → team → our story */
    var items = faqItems(), P = L.help, o = { level: 3 };
    var links = P.linkGroups.map(function (g) {
      var l = linkList(g.items);
      return l ? '<h4 class="h3 mt">' + esc(g.h) + "</h4>" + l : "";
    }).join("");
    var help = contactHtml() +
      panel(P.faqH, '<div class="search"><label class="sr-only" for="faqq">' + esc(L.ui.searchPh) + "</label>" +
      '<input id="faqq" type="search" autocomplete="off" placeholder="' + esc(L.ui.searchPh) + '">' +
      '<button type="button" class="x" id="faqx" aria-label="' + esc(L.ui.clear) + '" hidden>×</button></div>' +
      '<p class="small" id="faqcount" aria-live="polite">' + esc(L.ui.count(items.length)) + "</p>" +
      '<div id="faqlist">' + items.map(function (q) {
        return '<details class="qa accordion-item" data-q="' + esc(norm(q[0] + " " + q[1])) + '"' + '><summary class="accordion-header"><span class="q">' + esc(q[0]) +
          '</span><span class="sh" aria-hidden="true"><span class="s">' + esc(L.ui.show) + '</span><span class="h">' + esc(L.ui.hide) + "</span></span></summary>" +
          '<div class="a"><p>' + esc(q[1]) + "</p>" + (q[2] ? btnRow(ext(link(q[2][0]), esc(q[2][1]), "btn btn-primary btn-sm")) : "") + "</div></details>";
      }).join("") + "</div>" +
      '<div id="faqnone" hidden>' + callout("gold", L.ui.noResultsLabel, esc(L.ui.noResults)) + "</div>", o) +
      section(P.linksH, "", links, o) +
      section(P.alumniH, P.alumniText, "", { level: 3, id: "p-despues" });
    return secHead("ayuda") + learnNavHtml() + learnGroup("preguntas", help) + learnGroup("equipo", teamHtml()) + learnGroup("historia", storyHtml());
  }

  function weekStartKey(date) { var k = dayKey(date), dow = new Date(k).getUTCDay(); return k - ((dow + 6) % 7) * 864e5; }
  function inWeek(e, ws) { var k = dayKey(new Date(e.start)); return k >= ws && k < ws + 7 * 864e5; }
  function weekRange(ws) {
    var a = new Date(ws), b = new Date(ws + 6 * 864e5), M = L.days.months, cross = a.getUTCMonth() !== b.getUTCMonth();
    return lang === "es"
      ? L.week.range(a.getUTCDate() + (cross ? " de " + M[a.getUTCMonth()] : ""), b.getUTCDate() + " de " + M[b.getUTCMonth()] + " de " + b.getUTCFullYear())
      : L.week.range(M[a.getUTCMonth()] + " " + a.getUTCDate(), (cross ? M[b.getUTCMonth()] + " " : "") + b.getUTCDate() + ", " + b.getUTCFullYear());
  }
  function cohortLinksHtml() {                       /* the cohort's WhatsApp group and calendar, once at the top of Esta semana (v0.22.16) */
    var rows = (C.classResources || []).map(function (k) { return { type: k, any: link(k, C.code) }; }).filter(hasLink);
    return rows.length ? '<section class="cohort-links" aria-labelledby="cohort-h"><h2 class="up-next-h" id="cohort-h">' + esc(L.week.cohortH) + "</h2>" + matRows(rows) + "</section>" : "";
  }
  function pageSemana() {
    var W = L.week, ws = weekStartKey(NOW);
    var shown = function (e) { return !e.projected; };
    var wk = EV.filter(function (e) { return shown(e) && inWeek(e, ws); });
    var nxt = EV.filter(function (e) { return shown(e) && inWeek(e, ws + 7 * 864e5); });
    var cls = CLASSES.filter(shown), first = cls[0], last = cls[cls.length - 1];
    var hasCls = wk.some(function (e) { return e.kind === "cls"; });
    /* Once an earlier day of the week has passed, its cards fold (still one tap away) and the page opens at
       today's or the next class. When every class of the week has passed, all cards stay open. */
    var current = wk.some(function (e) { return expandable(e) && daysUntil(e.start, NOW) >= 0; });
    var fold = function (e) { return current && expandable(e) && daysUntil(e.start, NOW) < 0; };
    var top = "";
    wk.filter(function (e) { return e.kind === "cls" && daysUntil(e.start, NOW) === 0; }).forEach(function (e) {
      top += callout("gold", W.todayLabel, esc(W.today(evTitle(e).topic, spanWords(e.start, e.end))));
    });
    var wn = hasCls ? parseInt(wk.filter(function (e) { return e.kind === "cls"; })[0].code, 10) : null;
    var note = wn && C.weekNotes && C.weekNotes[String(wn)];
    if (note && note[lang]) top += callout("purple", W.notesLabel, esc(note[lang]));
    if (!hasCls) {
      if (first && NOW.getTime() < new Date(first.start).getTime()) top += callout("", W.beforeLabel, esc(W.before(longDate(first.start))));
      else if (!last || NOW.getTime() > new Date(last.end).getTime()) top += callout("", W.doneLabel, esc(W.done)) + btnRow(inLink("#ayuda/despues", W.doneCta));
      else if (!wk.length) top += callout("", W.emptyLabel, esc(W.empty));
    }
    return secHead("esta-semana") + '<p class="lead">' + esc(W.lead) + "</p>" +
      '<h2 class="week-range">' + esc(weekRange(ws)) + "</h2>" + top +
      cohortLinksHtml() +
      (wk.length ? '<ol class="event-list week-list">' + wk.map(function (e) { return eventCard(e, true, fold(e)); }).join("") + "</ol>" : "") +
      helpCardHtml() +
      (nxt.length ? '<section class="up-next week-next" aria-labelledby="wknext-h"><h2 class="up-next-h" id="wknext-h">' + esc(W.nextH) +
        " · " + esc(weekRange(ws + 7 * 864e5)) + "</h2>" + upList(nxt) + "</section>" : "") +
      btnRow(inLink("#calendario", W.calCta) + inLink("#recursos", W.resCta));
  }

  /* ---------- Materiales y recursos (v0.23.0) ----------
     Every material and resource on the current cohort's class cards, by topic (facts.topics), whatever the
     week: the cards keep their weekly unlock, the index does not (Danny Hernández, 2026-10-29). A link that
     sits on more than one card is listed once, under its first class. Rows, groups and the four sections are
     the card's own builders, so the index reads like the cards. */
  function linkKey(it) { return (it.any || "") + "|" + (it.es || "") + "|" + (it.en || ""); }
  function topicName(k) { return F.topics[k][lang]; }
  function topicQ(k) { return norm(F.topics[k].es + " " + F.topics[k].en); }
  function byName(a, b) { return topicName(a).localeCompare(topicName(b), lang); }
  function resourceIndex() {
    var B = {}, seen = {};
    var bucket = function (k) { return B[k] || (B[k] = { featured: [], aie: [], res: [], classes: [] }); };
    var fresh = function (it) { var k = linkKey(it); if (seen[k]) return false; seen[k] = true; return true; };
    var note = function (k, e) { var c = bucket(k).classes; if (c.indexOf(e) === -1) c.push(e); };
    /* v0.23.6: a row moved here from another class (its own `topic`) gives way when a class of that topic lists the
       same link itself, so it stays in that class's group (e.g. 3R's Understood math rows sit in 6T's groups). */
    var native = {};
    CLASSES.filter(function (e) { return !e.projected; }).forEach(function (e) {
      var mod = e.module && F.modules[e.module], t = mod && mod.topic;
      if (t) (mod.resources || []).forEach(function (r) {
        if ((r.topic || t) === t) (r.items || [r]).forEach(function (x) { if ((x.topic || t) === t && hasLink(x)) native[linkKey(x)] = t; });
      });
    });
    CLASSES.filter(function (e) { return !e.projected; }).forEach(function (e) {
      var mod = e.module && F.modules[e.module], t = mod && mod.topic;
      if (!t || !F.topics[t]) return;
      onlyLinked((e.featured || []).concat(mod.featured || [])).forEach(function (it) { if (fresh(it)) { bucket(t).featured.push(it); note(t, e); } });
      var mats = onlyLinked((mod.materials || []).concat(lang === "en" && e.presentation_en ? [{ type: "presentation", en: e.presentation_en }] : [])).filter(fresh);
      if (mats.length) { bucket(t).aie.push({ title_es: e.code + " · " + e.title_es, title_en: e.code + " · " + e.title_en, items: mats }); note(t, e); }
      (mod.resources || []).forEach(function (r) {
        if (!r.items) { if (hasLink(r) && fresh(r)) { bucket(r.topic || t).res.push(r); note(r.topic || t, e); } return; }
        var gt = r.topic || t, keep = [];
        r.items.filter(hasLink).forEach(function (x) {
          if (x.topic && x.topic !== gt && native[linkKey(x)] === x.topic) return;
          if (!fresh(x)) return;
          if (x.topic && x.topic !== gt) { bucket(x.topic).res.push(x); note(x.topic, e); } else keep.push(x);
        });
        if (keep.length) { bucket(gt).res.push({ title_es: r.title_es, title_en: r.title_en, whole: r.whole, items: keep }); note(gt, e); }
      });
    });
    /* v0.24.0: resources suggested by participants and approved by the PEA team (facts.communityResources). They join
       their topic after the class links, as plain rows (no credit label), and give way to a class that lists the same link. */
    (F.communityResources || []).forEach(function (r) {
      if (F.topics[r.topic] && hasLink(r) && fresh(r)) bucket(r.topic).res.push(r);
    });
    return B;
  }
  function topicBody(k, b) {
    var D = L.cal.detail, R = L.res, key = "rec-" + k;
    return resSection("featured", D.secFeatured, b.featured, true, key) +
      resSection("aie", D.secAie, b.aie.length === 1 ? b.aie[0].items : b.aie, true, key) +   /* one class: its rows directly; several: one group per class */
      resSection("more", D.secMore, splitByLang(b.res, false), false, key) +
      resSection("other", D.secOther, splitByLang(b.res, true), false, key, D.secOtherLead) +
      (b.classes.length ? '<p class="rec-cal">' + esc(R.seeCal) + " " + b.classes.map(function (e) {
        return '<a href="#calendario/' + esc(eventKey(e)) + '">' + esc(e.code) + "</a>";
      }).join(", ") + "</p>" : "");
  }
  function bucketCount(b) { return b ? rowCount(b.featured) + rowCount(b.aie) + rowCount(b.res) : 0; }
  /* Filters (v0.23.14): topic (main topics and their sub-topics), language (a version in Spanish, in English, or both)
     and type (ALL In Education materials or other organizations' resources). They work alone or with the search. */
  var resFilter = { topic: "", lang: "", type: "" };
  function filtersOn() { return !!(resFilter.topic || resFilter.lang || resFilter.type); }
  function filtersHtml(mains, subsOf) {
    var R = L.res, sel = function (id, label, opts, val) {   /* v0.23.15: a compact pill; its empty option shows the filter's name */
      opts[0] = ["", label];
      return '<label class="res-filter"><span class="sr-only">' + esc(label) + '</span><select id="' + id + '"' + (val ? ' class="is-set"' : "") + ">" + opts.map(function (o) {
        return '<option value="' + esc(o[0]) + '"' + (o[0] === val ? " selected" : "") + ">" + esc(o[1]) + "</option>";
      }).join("") + "</select></label>";
    };
    var topics = [["", R.fAll]];
    mains.forEach(function (m) { topics.push([m, topicName(m)]); subsOf(m).forEach(function (k) { topics.push([k, "— " + topicName(k)]); }); });
    return '<div class="res-filters" role="group" aria-label="' + esc(R.filtersLabel) + '">' +
      sel("resf-topic", R.fTopic, topics, resFilter.topic) +
      sel("resf-lang", R.fLang, [["", R.fAll], ["es", R.fLangEs], ["en", R.fLangEn], ["both", R.fLangBoth]], resFilter.lang) +
      sel("resf-type", R.fType, [["", R.fAll], ["aie", R.fTypeAie], ["res", R.fTypeRes]], resFilter.type) +
      '<button type="button" class="res-reset" id="resreset"' + (filtersOn() || resQuery ? "" : " hidden") + ">" + esc(R.fReset) + "</button></div>";
  }
  function passesFilters(li) {
    var f = resFilter, l = (li.getAttribute("data-l") || "").split(" ");
    if (f.topic) { var sub = li.closest(".rec-sub"), top = li.closest(".rec-topic"); if (!((sub && sub.id === "p-" + f.topic) || (top && top.id === "p-" + f.topic))) return false; }
    if (f.lang === "es" && l.indexOf("es") === -1) return false;
    if (f.lang === "en" && l.indexOf("en") === -1) return false;
    if (f.lang === "both" && !(l.indexOf("es") !== -1 && l.indexOf("en") !== -1)) return false;
    if (f.type) { var aie = !!li.closest(".res-aie"); if ((f.type === "aie") !== aie) return false; }
    return true;
  }
  function resetRes() { resQuery = ""; resFilter = { topic: "", lang: "", type: "" }; }
  function boosted(words) {                       /* facts.searchBoost: some searches always list certain rows (e.g. FAFSA for scholarships) */
    var q = " " + words.join(" ") + " ";
    return (F.searchBoost || []).filter(function (b) {
      return b.when.some(function (t) { t = norm(t); return q.indexOf(" " + t + " ") !== -1 || words.some(function (w) { return w.length >= 4 && t.indexOf(w) === 0; }); });
    }).reduce(function (a, b) { return a.concat(b.show.map(norm)); }, []);
  }
  /* "Sugerir un recurso / Suggest a resource" (v0.24.0): participants send a link through the Airtable form; the PEA
     team reviews it before it is published. Hidden until links.global.suggest is set. */
  function addCardHtml() {
    var R = L.res, u = link("suggest");
    if (!u) return "";
    return '<aside class="help-card rec-add" aria-labelledby="recadd-h"><p><strong id="recadd-h">' + esc(R.addH) + "</strong> " + esc(R.addLead) + "</p>" +
      '<div class="help-links">' + ext(u, '<span aria-hidden="true">💡</span><span>' + esc(R.addCta) + "</span>", "help-link") + "</div></aside>";
  }
  function pageRecursos() {
    var R = L.res, B = resourceIndex(), keys = Object.keys(F.topics);
    var subsOf = function (m) { return keys.filter(function (k) { return F.topics[k].parent === m && bucketCount(B[k]); }).sort(byName); };
    var total = function (m) { return subsOf(m).reduce(function (n, k) { return n + bucketCount(B[k]); }, bucketCount(B[m])); };
    var mains = keys.filter(function (k) { return !F.topics[k].parent && total(k); }).sort(byName);
    if (!mains.length) return secHead("recursos") + '<p class="lead">' + esc(R.lead) + "</p>" + callout("", R.emptyLabel, esc(R.empty)) + addCardHtml();
    var count = function (n) { return '<span class="mat-count"><span aria-hidden="true">' + n + '</span><span class="sr-only">' + esc(R.count(n)) + "</span></span>"; };
    var open = function (k, dflt) { var o = matOpen["rec-" + k]; return (o === undefined ? dflt : o) ? " open" : ""; };
    /* Topic panels remember their own state by key (topic order differs between languages), so render()'s
       by-position restore skips them (details[data-k]). */
    var body = mains.map(function (m) {
      var subs = subsOf(m).map(function (k) {
        return '<details class="rec-sub" id="p-' + k + '" data-k="rec-' + k + '" data-q="' + esc(topicQ(k)) + '"' + open(k, false) + '><summary><h3 class="rec-sub-h">' + esc(topicName(k)) + "</h3>" +
          count(bucketCount(B[k])) + "</summary>" + topicBody(k, B[k]) + "</details>";
      }).join("");
      /* v0.23.15: a light row (icon, name, count, chevron) instead of the filled section bar, so seven topics read as a list */
      return '<details class="rec-topic" id="p-' + m + '" data-k="rec-' + m + '" data-q="' + esc(topicQ(m)) + '"' + open(m, false) + '><summary class="rec-sum">' +
        '<span class="rec-ico" aria-hidden="true">' + F.topics[m].icon + '</span><h2 class="rec-h">' + esc(topicName(m)) + "</h2>" + count(total(m)) + "</summary>" +
        '<div class="rec-body">' + (B[m] ? topicBody(m, B[m]) : "") + subs + "</div></details>";
    }).join("");
    var add = addCardHtml();
    var search = '<div class="search rec-search"><label class="sr-only" for="resq">' + esc(R.searchLabel) + "</label>" +
      '<input id="resq" type="search" autocomplete="off" placeholder="' + esc(R.searchPh) + '" value="' + esc(resQuery) + '"' + (resQuery ? ' class="filled"' : "") + ">" +
      '<button type="button" class="x" id="resx" aria-label="' + esc(L.ui.clear) + '"' + (resQuery ? "" : " hidden") + ">×</button></div>" +
      filtersHtml(mains, subsOf) +
      '<p class="small" id="rescount" aria-live="polite"></p><div id="resnone" hidden>' + callout("gold", R.noneLabel, esc(R.none)) + '<div class="res-suggest"></div>' +
        (link("suggest") ? '<p class="small rec-add-none">' + esc(R.addNone) + " " + ext(link("suggest"), esc(R.addCta)) + "</p>" : "") + "</div>" +
      '<div id="resresults" class="res-results" hidden></div>';
    return secHead("recursos") + '<p class="lead">' + esc(R.lead) + "</p>" + search + '<p class="rec-list-h">' + esc(R.topicsLabel) + '</p><div class="rec-list">' + body + "</div>" +   /* the topic list is the menu (v0.23.15) */
      add + btnRow(inLink("#esta-semana", R.weekCta) + inLink("#calendario", R.calCta));
  }

  var PAGES = { inicio: pageHome, participar: pageParticipar, "esta-semana": pageSemana, calendario: pageCalendario, recursos: pageRecursos, ayuda: pageAyuda };
  var ALIASES = { lista: "participar", zoom: "participar", programa: "calendario",   /* retired routes */
                  preguntas: "ayuda/preguntas", enlaces: "ayuda/preguntas", contacto: "ayuda/preguntas",
                  historia: "ayuda/historia", equipo: "ayuda/equipo" };   /* pages folded into Información y ayuda (v0.22.0) */

  function icsStamp(iso) { return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  function icsEsc(s) { return String(s).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }
  function icsFold(line) {                        /* RFC 5545: 75 octets per line, UTF-8 aware */
    var out = [], cur = "", bytes = 0;
    Array.from(line).forEach(function (ch) {
      var n = unescape(encodeURIComponent(ch)).length;
      if (bytes + n > 74) { out.push(cur); cur = " "; bytes = 1; }
      cur += ch; bytes += n;
    });
    out.push(cur); return out.join("\r\n");
  }
  function icsDay(iso) { var d = az(iso); return String(d.getUTCFullYear()) + String(d.getUTCMonth() + 1).padStart(2, "0") + String(d.getUTCDate()).padStart(2, "0"); }
  function buildIcs(evts) {
    var now = icsStamp(new Date().toISOString());
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ALL In Education//PEA Applicant Hub " + VERSION + "//" + lang.toUpperCase(), "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    evts.forEach(function (e) {
      var tt = evTitle(e), sum = L.cal.icsName + " · " + (e.kind === "cls" || e.kind === "milestone" ? tt.topic : tt.kind);
      var sw = e.sub === "apply" ? F.cohorts[e._c].applySwitch : null;
      var desc = sw ? L.cal.applyOpensDesc(opensLabel(e), lang === "es" ? sw.adds_es : sw.adds_en)
               : e.kind === "info" ? L.cal.infoWording + ". " + (link("info") || "")
               : e.kind === "cls" ? (e.projected ? L.cal.projected : L.cal.classNote)
               : e.kind === "holiday" ? L.cal.holidayNote : tt.topic;
      lines.push("BEGIN:VEVENT", "UID:PEA-" + e._c + "-" + e.code + "@allineducation.org", "DTSTAMP:" + now,
        e.allDay ? "DTSTART;VALUE=DATE:" + icsDay(e.start) : "DTSTART:" + icsStamp(e.start),
        e.allDay ? "DTEND;VALUE=DATE:" + icsDay(e.end) : "DTEND:" + icsStamp(e.end), icsFold("SUMMARY:" + icsEsc(sum)),
        icsFold("DESCRIPTION:" + icsEsc(desc)), (e.kind === "holiday" || e.kind === "milestone" ? "LOCATION:" : "LOCATION:Zoom"),   /* no venue is published for milestones */
        e.kind === "holiday" || e.kind === "milestone" ? "TRANSP:TRANSPARENT" : "TRANSP:OPAQUE", "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.join("\r\n") + "\r\n";
  }
  function downloadIcs(which) {
    var evts = which === "all" ? EV : [].concat.apply([], Object.keys(F.cohorts).map(function (k) { return F.cohorts[k].events; }))
      .filter(function (e) { return e._c + ":" + e.code === which; });
    if (!evts.length) return;
    var blob = new Blob([buildIcs(evts)], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "PEA_" + (which === "all" ? C.code : which.replace(":", "_")) + "_" + lang.toUpperCase() + ".ics";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  /* ---------- copy ---------- */
  function announce(msg) { var el = document.getElementById("live"); if (el) { el.textContent = ""; setTimeout(function () { el.textContent = msg; }, 30); } }

  /* ---------- routing + render ---------- */
  function actionsHtml(sticky) {
    var A = L.actions;
    var all = {
      home: ['#inicio', '🏠', A.home, A.home],
      cal:  ['#calendario', '📅', A.cal, A.calShort],
      info: [link('info'), '👋', A.info, ''],
      wa:   [F.org.waHref, '💬', A.wa, A.waShort]
    };
    var keys = sticky ? ['home', 'cal', 'wa'] : ['info'];   /* calendar + WhatsApp live in the sticky bar only */
    var btns = keys.map(function (k) {
      var a = all[k]; if (!a[0]) return '';
      return ext(a[0], '<span aria-hidden="true">' + a[1] + '</span><span>' + esc(sticky ? a[3] : a[2]) + '</span>', 'quick-action action-' + k);
    }).join('');
    if (!btns) return '';
    return '<div class="' + (sticky ? 'sticky-actions' : 'quick-actions') + '" aria-label="' + esc(L.ui.quick) + '">' + btns + '</div>';
  }
  function styleSections(main) {
    if (currentRoute() !== 'inicio') {
      var head = main.querySelector('.sec-head');
      if (head) { var wrapper = document.createElement('div'); wrapper.className='page-section'; main.insertBefore(wrapper,head); while(wrapper.nextSibling) wrapper.appendChild(wrapper.nextSibling); }
    }
    main.querySelectorAll('section.block, details.sec').forEach(function(el) { el.classList.add('section-panel'); });
    main.querySelectorAll('.section-panel').forEach(function(el,i) { el.classList.toggle('pink-section', i%2===1); });
  }
  function routeParts() {                         /* "#calendario/FA26-1T" → ["calendario", "FA26-1T"] */
    var h = (location.hash || "").replace(/^#\/?/, ""), i = h.indexOf("/");
    var r = i === -1 ? [h, ""] : [h.slice(0, i), h.slice(i + 1)], a = ALIASES[r[0]];   /* aliases may carry a part: "#equipo" → ["ayuda", "equipo"] */
    if (a) { var j = a.indexOf("/"); r = [j === -1 ? a : a.slice(0, j), r[1] || (j === -1 ? "" : a.slice(j + 1))]; }
    return r;
  }
  var pendingDeep = true;                          /* scroll to a linked card once per navigation, not on every refresh */
  function currentRoute() {
    var h = routeParts()[0];
    return PAGES[h] ? h : "inicio";
  }
  var shownRoute = null;
  function render(focus) {
    if (!new URLSearchParams(location.search).has("today")) NOW = new Date();
    var id = currentRoute();
    L = T[lang];
    document.documentElement.lang = lang;
    document.title = (id === "inicio" ? "" : L.sections[id].label + " · ") + L.meta.title;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", L.meta.description);
    document.getElementById("skip").textContent = L.ui.skip;
    renderBand(id); renderNav(id); renderFoot();
    var deep = "";
    if (id === "calendario" && pendingDeep) {
      try { deep = decodeURIComponent(routeParts()[1]); } catch (e) {}
      if (deep && !EV.some(function (e) { return eventKey(e) === deep && expandable(e); })) deep = "";
      if (deep) { calFilter = "all"; calOpen[deep] = true; }
    }
    var weekJump = id === "esta-semana" && pendingDeep;
    var part = (id === "ayuda" || id === "recursos") && pendingDeep ? routeParts()[1] : "";
    if (id === "recursos" && part) resetRes();   /* going to a topic clears the search, or it would hide that topic again (Codex review, PR #63) */
    if (spy) { spy.disconnect(); spy = null; }
    if (reveal) { reveal.disconnect(); reveal = null; }
    var fresh = id !== shownRoute;                 /* fade in on arrival only, not on the minute refresh or a language switch */
    pendingDeep = false;
    var main = document.getElementById("main"), FOLD = "details.sec:not([data-k]), details.accordion-item";   /* keyed panels restore themselves */
    var wasOpen = id === shownRoute ? Array.prototype.map.call(main.querySelectorAll(FOLD), function (d) { return d.open; }) : [];
    main.classList.remove("rec-searching");
    main.innerHTML = PAGES[id]();
    main.querySelectorAll(FOLD).forEach(function (d, i) { if (wasOpen[i]) d.open = true; });   /* refresh and language switch keep open panels open */
    shownRoute = id;
    styleSections(main);
    document.getElementById("quickbar").innerHTML = actionsHtml(true);
    if (deep) {                                    /* open card sits just below the header and its month divider */
      var card = main.querySelector('.event-card[data-rowkey="' + deep + '"]'), div = card && card.closest(".month-group").querySelector(".month-divider");
      if (card) {
        var hh = document.querySelector("header.site-header").offsetHeight;
        window.scrollTo(0, card.getBoundingClientRect().top + window.scrollY - hh - (div ? div.offsetHeight : 0) - 12);
        card.querySelector(".cal-open").focus({ preventScroll: true });
      }
    } else if (part && goToPart(main, part)) {     /* a part or panel of Información y ayuda, or a resource topic */
    } else if (weekJump && main.querySelector(".week-list > .folded")) {   /* open at today's (or the next) class */
      var tgt = main.querySelector(".week-list > .event-card:not(.folded)");
      if (tgt) {
        window.scrollTo(0, tgt.getBoundingClientRect().top + window.scrollY - document.querySelector("header.site-header").offsetHeight - 12);
        var h = main.querySelector("h1"); if (h) h.focus({ preventScroll: true });
      }
    } else if (focus) {
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      var h1 = main.querySelector("h1"); if (h1) h1.focus({ preventScroll: true });
    }
    if (id === "ayuda") learnSpy(main);
    if (id === "recursos" && (resQuery || filtersOn())) filterRes(resQuery);
    if (id === "esta-semana" && fresh) revealOnScroll(main);
  }
  var reveal = null;
  function revealOnScroll(main) {                  /* "Esta semana": week headings, dates and class titles fade in as they scroll into view */
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    reveal = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); } });
    }, { threshold: 0.2 });
    main.querySelectorAll(".week-range, .week-next .up-next-h, .week-card .date-badge, .week-card .event-title").forEach(function (el) {
      el.classList.add("reveal"); reveal.observe(el);
    });
  }
  function goToPart(main, part) {                 /* scroll a part (#g-…) or panel (#p-…) just below the header and section menu */
    var el = main.querySelector("#g-" + part) || main.querySelector("#p-" + part), nav = main.querySelector(".learn-nav");
    if (!el) return false;
    for (var p = el; p && p !== main; p = p.parentElement) if (p.tagName === "DETAILS") p.open = true;   /* a sub-topic opens its main topic too */
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - document.querySelector("header.site-header").offsetHeight - (nav ? nav.offsetHeight : 0) - 12);
    var hd = el.querySelector(".learn-h, summary"); if (hd) hd.focus({ preventScroll: true });
    return true;
  }
  var spy = null;
  function learnSpy(main) {                        /* highlight the part on screen in the "En esta página" menu */
    var pills = main.querySelectorAll(".learn-pill"), groups = main.querySelectorAll(".learn-group");
    if (!pills.length || !("IntersectionObserver" in window)) return;
    var seen = {};
    spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen[en.target.id] = en.isIntersecting ? en.intersectionRect.height : 0; });
      var best = null; groups.forEach(function (g) { if (seen[g.id] > 0 && (best === null || seen[g.id] > seen[best])) best = g.id; });
      if (best) pills.forEach(function (p) { if ("g-" + p.getAttribute("data-part") === best) p.setAttribute("aria-current", "true"); else p.removeAttribute("aria-current"); });
    }, { rootMargin: "-120px 0px -40% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] });
    groups.forEach(function (g) { spy.observe(g); });
  }
  function setLang(l) {
    lang = l; lsSet(LS_LANG, l);
    try {
      var u = new URL(location.href); u.searchParams.set("lang", l);
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    } catch (e) {}
    var y = window.scrollY; render(false); window.scrollTo(0, y);
    var b = document.querySelector('.lang-pill[data-lang="' + l + '"]'); if (b) b.focus();
    announce(L.langSwitch.announced);
  }

  /* ---------- events (delegated) ---------- */
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target : null; if (!t) return;
    if (t.closest(".menu a")) document.querySelector(".menu").open = false;
    var same = t.closest('a[href^="#ayuda/"], a[href^="#recursos/"]');   /* same hash → no hashchange fires, so scroll here (a pill tapped again after scrolling away) */
    if (same && same.getAttribute("href") === location.hash && ["ayuda", "recursos"].indexOf(currentRoute()) !== -1) {
      if ((resQuery || filtersOn()) && currentRoute() === "recursos") { resetRes(); render(false); }   /* same rule when the pill's hash is already current */
      if (goToPart(document.getElementById("main"), routeParts()[1])) { ev.preventDefault(); return; }
    }
    var lp = t.closest(".lang-pill");
    if (lp) { var nl = lp.getAttribute("data-lang"); if (nl !== lang) setLang(nl); return; }
    if (t.closest("#skip")) { ev.preventDefault(); document.getElementById("main").focus(); return; }
    var ics = t.closest("[data-ics]"); if (ics) { downloadIcs(ics.getAttribute("data-ics")); return; }
    var ob = t.closest(".cal-open");
    if (ob) { toggleRow(ob.getAttribute("data-row")); return; }
    var rowEl = t.closest(".event-card.has-det");
    if (rowEl && !t.closest("a,button,.event-det")) { toggleRow(rowEl.getAttribute("data-rowkey")); return; }
    var fl = t.closest("[data-filter]");
    if (fl) {
      calFilter = fl.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === fl)); });
      var body = document.getElementById("calbody"); if (body) body.innerHTML = calRows();
      return;
    }
    if (t.id === "faqx") { var q = document.getElementById("faqq"); q.value = ""; filterFaq(""); q.focus(); }
    if (t.id === "resx") { var rqx = document.getElementById("resq"); if (rqx) rqx.value = ""; filterRes(""); }   /* with filters on there is no re-render, so clear the box here (Codex review, PR #65) */
    if (t.id === "resreset") { resetRes(); render(false); var rq0 = document.getElementById("resq"); if (rq0) rq0.focus(); return; }
    var chip = t.closest("[data-resq]");
    if (chip) { var rq = document.getElementById("resq"); rq.value = chip.getAttribute("data-resq"); filterRes(rq.value); rq.focus(); return; }
  });
  document.addEventListener("change", function (ev) {
    var id = ev.target.id, k = id === "resf-topic" ? "topic" : id === "resf-lang" ? "lang" : id === "resf-type" ? "type" : "";
    if (!k) return;
    resFilter[k] = ev.target.value; ev.target.classList.toggle("is-set", !!ev.target.value);
    var rq = document.getElementById("resq"); filterRes(rq ? rq.value : "");
    var el = document.getElementById(id); if (el) el.focus();
  });
  document.addEventListener("input", function (ev) { if (ev.target.id === "faqq") filterFaq(ev.target.value); if (ev.target.id === "resq") filterRes(ev.target.value); });
  /* Materiales y recursos search (v0.23.12; flexible matching v0.23.13). While a search is on, the topic panels
     give way to a results list in two tiers. Matches: every word appears, accents ignored, in a row's title (in
     either language) or in the name of its group, sub-topic or topic. "También podría interesarle": rows that match
     some of the words, a synonym from facts.searchSynonyms, or a close spelling (one letter off, two for long
     words). Each result shows where it lives (topic › group). With no result at all, tappable suggestions
     replace the list. The query survives a language switch; clearing it restores the panels as they were. */
  var resQuery = "";
  var STOP = ["de", "del", "la", "las", "el", "los", "y", "e", "o", "en", "para", "por", "con", "un", "una", "mi", "mis", "su", "sus", "que", "a", "al",
              "the", "of", "and", "or", "to", "for", "in", "on", "my", "your", "an", "with"];
  function editDist(a, b) {                        /* edits between two words, a swap of neighbours counting as one ("becsa" → "becas"); stops past 2 */
    if (Math.abs(a.length - b.length) > 2) return 3;
    var pp = null, prev = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      var cur = [i], best = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        if (pp && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) cur[j] = Math.min(cur[j], pp[j - 2] + 1);
        if (cur[j] < best) best = cur[j];
      }
      if (best > 2) return 3;
      pp = prev; prev = cur;
    }
    return prev[b.length];
  }
  function closeWord(w, hayWords) {                /* a typo away: 1 edit for words of 4–6 letters, 2 for longer */
    if (w.length < 4) return false;
    var max = w.length >= 7 ? 2 : 1;
    return hayWords.some(function (h) { return h.length >= 3 && editDist(w, h) <= max; });
  }
  function synonymsOf(w) {                         /* every term in any synonym group that contains this word */
    var out = [];
    (F.searchSynonyms || []).forEach(function (g) {
      var terms = g.map(function (t) { return norm(t).replace(/[^a-z0-9ñ]+/g, " ").trim(); });
      if (terms.some(function (t) { return t === w || (w.length >= 4 && t.indexOf(w) === 0); })) out = out.concat(terms);
    });
    return out;
  }
  function filterRes(v) {
    var main = document.getElementById("main"), R = L.res;
    var all = norm(v.trim()).split(/[\s,.;:¿?¡!()]+/).filter(Boolean);
    var words = all.filter(function (w) { return STOP.indexOf(w) === -1; });
    if (!words.length) words = all;
    resQuery = words.length ? v : "";   /* punctuation alone is no query; render() re-applies resQuery, so it must not loop (Codex review, PR #64) */
    var x = document.getElementById("resx"), inp = document.getElementById("resq"), rb = document.getElementById("resreset");
    if (x) x.hidden = !words.length;
    if (inp) inp.classList.toggle("filled", !!words.length);
    if (rb) rb.hidden = !(words.length || filtersOn());
    if (!words.length && !filtersOn()) { var y = window.scrollY; render(false); window.scrollTo(0, y); var q = document.getElementById("resq"); if (q) { q.value = v; q.focus(); } return; }
    var syn = words.map(synonymsOf), boost = boosted(words);
    var exact = [], related = [];   /* resourceIndex() already lists each bilingual link pair once; rows sharing one language's link stay distinct (Codex review, PR #64) */
    main.querySelectorAll(".rec-topic .mat-list > li").forEach(function (li) {
      if (!passesFilters(li)) return;
      if (!words.length) { exact.push(li); return; }   /* filters alone: every row that passes */
      var ctx = [li, li.closest(".mat-group"), li.closest(".rec-sub"), li.closest(".rec-topic")];
      var hay = ctx.map(function (el) { return el ? el.getAttribute("data-q") || "" : ""; }).join(" ");
      var hayWords = hay.split(/[^a-z0-9ñ]+/).filter(Boolean), hayPad = " " + hayWords.join(" ") + " ";   /* synonyms match whole words only ("esa" ≠ "mesa") */
      var full = 0, part = 0;
      words.forEach(function (w, k) {
        if (hay.indexOf(w) !== -1) full++;
        else if (syn[k].some(function (t) { return hayPad.indexOf(" " + t + " ") !== -1; }) || closeWord(w, hayWords)) part++;
      });
      var pinned = boost.some(function (t) { return hayPad.indexOf(" " + t + " ") !== -1; });
      if (full === words.length) exact.push(li);
      else if (pinned) related.push({ li: li, score: 1000 });   /* boosted rows come first and are never cut */
      else if (full + part > 0) related.push({ li: li, score: full * 2 + part });
    });
    related.sort(function (a, b) { return b.score - a.score; });
    related = related.filter(function (r, i) { return r.score >= 1000 || i < 15; }).map(function (r) { return r.li; });
    var crumb = function (li) {
      var top = li.closest(".rec-topic"), sub = li.closest(".rec-sub"), grp = li.closest(".mat-group"), t = [];
      if (top) t.push(top.querySelector(".rec-h").textContent.trim());
      if (sub) t.push(sub.querySelector(".rec-sub-h").textContent.trim());
      if (grp) t.push(grp.querySelector(":scope > summary > span").textContent.trim());
      return '<span class="res-crumb">' + esc(t.join(" › ")) + "</span>";
    };
    var list = function (rows) {
      return '<ul class="mat-list res-list">' + rows.map(function (li) {
        var c = li.cloneNode(true); c.removeAttribute("hidden");
        return "<li>" + c.innerHTML + crumb(li) + "</li>";
      }).join("") + "</ul>";
    };
    var box = document.getElementById("resresults");
    box.innerHTML = (exact.length ? '<h2 class="res-tier">' + esc(R.exactH) + "</h2>" + list(exact) : "") +
      (related.length ? '<h2 class="res-tier">' + esc(R.relatedH) + '</h2><p class="small">' + esc(R.relatedNote) + "</p>" + list(related) : "");
    box.hidden = !(exact.length || related.length);
    main.classList.add("rec-searching");             /* topic panels and their counts step aside for the results */
    document.getElementById("rescount").textContent = words.length ? R.results(exact.length, related.length) : R.filtered(exact.length);
    var none = document.getElementById("resnone"), sug = none.querySelector(".res-suggest");
    none.hidden = !!(exact.length || related.length);
    if (none.hidden) return;
    /* nothing at all: offer the closest topic names, then common searches */
    if (!words.length) { sug.innerHTML = ""; return; }   /* filters alone found nothing: the reset button is the way back */
    var topics = Object.keys(F.topics).filter(function (k) {
      var n = F.topics[k][lang], nw = norm(n).split(/\s+/);
      return words.some(function (w) { return norm(n).indexOf(w) !== -1 || closeWord(w, nw); });
    }).map(function (k) { return F.topics[k][lang]; });
    var picks = topics.concat((F.searchSuggest || {})[lang] || []).filter(function (t, i, a) { return a.indexOf(t) === i; }).slice(0, 8);
    sug.innerHTML = picks.length ? '<p class="small">' + esc(R.suggestH) + '</p><div class="res-chips">' + picks.map(function (t) {
      return '<button type="button" class="pill" data-resq="' + esc(t) + '">' + esc(t) + "</button>";
    }).join("") + "</div>" : "";
  }
  function filterFaq(v) {
    var q = norm(v.trim()), n = 0, inp = document.getElementById("faqq"), x = document.getElementById("faqx");
    document.querySelectorAll("#faqlist .qa").forEach(function (d) {
      var hit = !q || d.getAttribute("data-q").indexOf(q) !== -1;
      d.hidden = !hit; if (hit) n++;
      if (q && hit) d.open = true;
    });
    if (inp) inp.classList.toggle("filled", !!q);
    if (x) x.hidden = !q;
    document.getElementById("faqcount").textContent = L.ui.count(n);
    document.getElementById("faqnone").hidden = n !== 0;
  }
  window.addEventListener("hashchange", function () {
    if (location.hash === "#main") { document.getElementById("main").focus(); return; }
    pendingDeep = true;
    render(true);
  });

  render(false);
  setInterval(function () {
    if (!document.hidden && ["inicio", "esta-semana", "calendario"].indexOf(currentRoute()) !== -1 &&
        !(document.activeElement && document.activeElement.closest("#main"))) render(false);
  }, 60000);
})();
