/* ==================================================================
   PEA Applicant Hub — app  (v0.9.4)
   Vanilla JS, no build step, no dependencies. State-based navigation
   (hash routes) per AIE Hub Design System §5.1. Every date, time and
   link resolves from facts.js; every string from copy.js.
   ================================================================== */
(function () {
  "use strict";

  var VERSION = "0.9.4";
  var UPDATED = "2026-09-24";
  var F = window.PEA_FACTS, T = window.T;
  var AZ = -7 * 3600 * 1000;                       /* Arizona: UTC-7, no DST */
  var LS_LANG = "aie_lang", LS_LIST = "pea_hub_checklist_v1";

  /* ---------- sections, groups, order ---------- */
  var GROUPS = [
    { id: "join",  color: "blue",   items: ["participar", "calendario", "zoom", "lista"] },
    { id: "about", color: "pink",   items: ["programa", "historia"] },
    { id: "help",  color: "purple", items: ["preguntas", "enlaces", "contacto"] }
  ];
  var ORDER = ["inicio"].concat(GROUPS[0].items, GROUPS[1].items, GROUPS[2].items);
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
  var AC = activeCohort(NOW), C = AC.cur, EV = sorted(C.events);
  LS_LIST += "_" + C.code;
  var CLASSES = EV.filter(function (e) { return e.kind === "cls"; });

  /* A link resolves or it does not exist. Families never see a gap marker. */
  function link(key, code) {
    var cohort = F.cohorts[code || C.code];
    if ((key === "zoom" || key === "info") && cohort) {
      if (cohort.projected) return null;
      var kind = key === "info" ? "info" : "cls";
      if (!cohort.events.some(function (e) { return e.kind === kind && new Date(e.end) > NOW; })) return null;
    }
    var m = F.links[code || C.code] || {};
    return m[key] || F.links.global[key] || null;
  }

  function cohortLabel() { return lang === "es" ? C.label_es : C.label_en; }
  function teachLang() { return lang === "es" ? C.teaching_es : C.teaching_en; }
  function classDays() {                              /* "martes y jueves" / "Tuesdays and Thursdays" */
    var seen = [];
    CLASSES.forEach(function (e) { var w = az(e.start).getUTCDay(); if (seen.indexOf(w) === -1) seen.push(w); });
    seen.sort();
    var names = seen.map(function (w) { return L.days.names[w] + (lang === "en" ? "s" : ""); });
    if (names.length <= 1) return names.join("");
    return names.slice(0, -1).join(", ") + " " + L.days.and + " " + names[names.length - 1];
  }
  function classTime(fmt) { var e = CLASSES[0]; return e ? fmt(e.start, e.end) : ""; }
  function weekOf(e) { var n = parseInt(e.code, 10); return isNaN(n) ? null : n; }
  function evTitle(e) {
    var K = L.cal.kinds, P = L.cal.topics;
    if (e.kind === "info") return { kind: K.info, topic: P.info };
    if (e.kind === "holiday") return { kind: K.holiday, topic: P.holiday };
    if (e.kind === "focus") return { kind: K.focus, topic: P.focus };
    return { kind: e.grad ? K.grad : K.cls, topic: lang === "es" ? e.title_es : e.title_en };
  }

  /* ---------- small builders ---------- */
  function ext(url, inner, cls, extra) {
    return '<a class="' + (cls || "") + '" href="' + esc(url) + '" target="_blank" rel="noopener"' + (extra || "") + ">" +
      inner + '<span class="sr-only"> ' + esc(L.ui.newTab) + "</span></a>";
  }
  function callout(variant, label, html) {
    return '<div class="callout ' + (variant || "") + '"><span class="label">' + esc(label) + "</span><p>" + html + "</p></div>";
  }
  function secHead(id) {
    var s = L.sections[id];
    return '<div class="sec-head"><span class="label ' + (colorOf(id) === "purple" ? "purple" : colorOf(id) === "pink" ? "ink" : "blue") + '">' +
      esc(L.nav.groups[groupOf(id)]) + "</span>" +
      '<h1 class="h-sec" tabindex="-1">' + esc(sectionTitle(id)) + "</h1>" +
      '<p class="small time">' + esc(L.ui.minutes(s.time)) + "</p></div>";
  }
  function groupOf(id) { for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].items.indexOf(id) !== -1) return GROUPS[i].id; return "join"; }
  function sectionTitle(id) {
    return { participar: L.steps.h, calendario: L.cal.h, zoom: L.zoom.h, lista: L.list.h, programa: L.prog.h,
             historia: L.hist.h, preguntas: L.faq.h, enlaces: L.links.h, contacto: L.contact.h }[id] || L.sections[id].label;
  }

  /* ---------- header band + nav + footer ---------- */
  function renderBand() {
    var other = lang === "es" ? "en" : "es";
    document.getElementById("band").innerHTML =
      '<div class="band-l"><img src="assets/img/aie-mark-96.png" width="32" height="32" alt="' + esc(L.markAlt) + '">' +
      '<div><div class="band-org">' + esc(L.org) + "</div>" +
      '<div class="band-tag" lang="en">' + esc(L.tagline) + "</div>" +
      (L.taglinePair ? '<div class="band-pair">' + esc(L.taglinePair) + "</div>" : "") + "</div></div>" +
      '<div class="band-r"><div><div class="band-title">' + esc(L.toolTitle) + "</div>" +
      '<div class="band-sub">' + esc(L.toolSub(cohortLabel())) + "</div></div>" +
      '<button class="lang" id="langbtn" type="button" lang="' + other + '" aria-label="' +
      esc(lang === "es" ? L.langSwitch.toEn : L.langSwitch.toEs) + '">' +
      lang.toUpperCase() + ' <span class="div" aria-hidden="true">|</span> ' + other.toUpperCase() + "</button></div>";
    document.getElementById("langbtn").addEventListener("click", function () { setLang(other); });
  }

  function renderNav(active) {
    var nav = document.getElementById("gnav");
    nav.setAttribute("aria-label", L.nav.label);
    var h = '<div class="g-row"><a class="chip home" href="#inicio"' + (active === "inicio" ? ' aria-current="page"' : "") + ">" + esc(L.nav.home) + "</a></div>";
    GROUPS.forEach(function (g) {
      h += '<div class="g-row" role="group" aria-label="' + esc(L.nav.groups[g.id]) + '"><span class="g-lbl ' + g.color + '" aria-hidden="true">' + esc(L.nav.groups[g.id]) + "</span>";
      g.items.forEach(function (id) {
        h += '<a class="chip ' + g.color + '" href="#' + id + '"' + (active === id ? ' aria-current="page"' : "") + ">" + esc(L.sections[id].label) + "</a>";
      });
      h += "</div>";
    });
    nav.innerHTML = h;
  }

  function renderFoot() {
    document.getElementById("foot").innerHTML =
      '<img src="assets/img/aie-logo-primary.png" width="220" height="30" alt="' + esc(L.foot.logoAlt) + '">' +
      '<div class="meta">' + esc(L.foot.rights) + "<br>" + esc(L.foot.version(VERSION, ymdLong(UPDATED))) +
      "<br>" + esc(L.foot.dates(ymdLong(F.syncedAt))) + "</div>";
  }

  /* ---------- next event card ---------- */
  function nextEvent() {                           /* this cohort first; then the next cohort's first date */
    var t = NOW.getTime(), pool = EV;
    for (var i = 0; i < pool.length; i++) if (new Date(pool[i].end).getTime() > t) return pool[i];
    return null;
  }
  function nextCard() {
    var U = L.next, e = nextEvent();
    if (!e) return '<div class="card"><p class="muted">' + esc(U.nothing) + "</p></div>";
    var live = new Date(e.start).getTime() <= NOW.getTime();
    var n = daysUntil(e.start, NOW);
    var when = live ? U.now : n <= 0 ? U.today : n === 1 ? U.tomorrow : U.inDays(n);
    var tt = evTitle(e), isInfo = e.kind === "info";
    var ecode = e._c;
    var title = e.kind === "cls" ? tt.topic : tt.kind;
    var wk = weekOf(e);
    var btns = "";
    if (isInfo && link("info", ecode)) btns += ext(link("info", ecode), esc(U.join), "btn btn-primary");
    if (link("zoom", ecode) && e.kind !== "holiday") btns += ext(link("zoom", ecode), esc(U.register), isInfo ? "btn btn-secondary" : "btn btn-primary");
    btns += '<button type="button" class="btn btn-ghost" data-ics="' + esc(e._c + ":" + e.code) + '">' + esc(U.addCal) + "</button>";
    var note = isInfo ? esc(L.cal.infoWording) + ". " + esc(L.steps.infoDatesNote)
             : e.kind === "holiday" ? esc(U.holidayNote)
             : e.projected ? esc(U.projected) : e.kind === "focus" ? esc(U.focusNote) : esc(U.classNote);
    return '<section class="card top-pink next" aria-labelledby="next-t">' +
      '<div class="next-top"><span class="label blue">' + esc(U.eyebrow) + '</span><span class="when' + (live ? " live" : "") + '">' + esc(when) + "</span>" +
      (isInfo ? '<span class="tag pink">' + esc(L.ui.optional) + "</span>" : "") + "</div>" +
      '<h2 class="next-title" id="next-t">' + esc(title) + "</h2>" +
      (e.kind === "cls" ? '<p class="small">' + esc(tt.kind + (wk ? " · " + L.cal.week(wk) : "")) + "</p>" : "") +
      '<p class="next-when">' + esc(cap(longDate(e.start))) + (e.kind === "holiday" ? "" : " · " + esc(spanDash(e.start, e.end))) + "</p>" +
      '<p class="note">' + note + "</p>" +
      '<div class="btnrow">' + btns + "</div></section>";
  }

  /* ---------- sections ---------- */
  function heroHtml() {
    var H = L.hero, chips = '<span class="hchip gold">' + esc(H.chipFree) + "</span>" +
      '<span class="hchip">' + esc(H.chipWeeks(C.weeks)) + "</span>" +
      '<span class="hchip">' + esc(H.chipZoom) + "</span>";
    if (CLASSES.length && !C.projected) chips += '<span class="hchip">' + esc(H.chipSchedule(cap(classDays()), classTime(spanDash))) + "</span>";
    if (teachLang()) chips += '<span class="hchip">' + esc(H.chipLang(teachLang())) + "</span>";
    var ctas = "";
    if (link("zoom")) ctas += ext(link("zoom"), esc(L.next.register), "btn btn-onblue");
    ctas += '<a class="btn btn-outline-onblue" href="#participar">' + esc(L.nav.start) + "</a>";
    return '<section class="hero"><p class="eyebrow">' + esc(H.eyebrow(cohortLabel(), C.num)) + "</p>" +
      '<h1 tabindex="-1">' + esc(H.title) + '</h1><p class="sub">' + esc(H.sub) + "</p>" +
      '<div class="chips">' + chips + '</div><div class="btnrow">' + ctas + "</div></section>";
  }

  function statsHtml() {
    var S = L.stats, fg = F.figures;
    return '<div class="stats">' +
      '<div class="stat"><div class="stat-n">$0</div><div class="stat-l">' + esc(S.cost) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + C.weeks + '</div><div class="stat-l">' + esc(S.weeks) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + CLASSES.length + '</div><div class="stat-l">' + esc(S.classes) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + fg.alumni + '</div><div class="stat-l">' + esc(S.alumni) + '</div><div class="stat-note">' +
      esc(S.alumniNote(ymdLong(fg.alumniAsOf))) + "</div></div></div>";
  }

  function stepsHtml(compact, hx) {
    hx = hx || "h3";
    return '<ol class="steps' + (compact ? " compact" : "") + '">' + L.steps.items.map(function (s, i) {
      var u = link(s.link);
      return '<li class="step' + (s.key ? " key" : "") + '"><span class="dot' + (s.key ? " blue" : "") + '" aria-hidden="true">' + (i + 1) + "</span>" +
        '<div class="step-body"><div class="step-head"><' + hx + ' class="h3">' + esc(s.t) + "</" + hx + ">" +
        (s.tag ? '<span class="tag pink">' + esc(s.tag) + "</span>" : "") +
        (s.key ? '<span class="tag solid-blue">' + esc(L.list.keyLabel) + "</span>" : "") + "</div>" +
        "<p>" + esc(s.d) + "</p>" +
        (u ? '<div class="btnrow">' + ext(u, esc(s.cta), "btn btn-sm " + (s.key ? "btn-primary" : "btn-secondary")) + "</div>" : "") +
        "</div></li>";
    }).join("") + "</ol>";
  }

  function listCount() {
    var st = readList(), req = L.list.items.filter(function (x) { return !x.optional; });
    return { done: req.filter(function (x) { return st[x.id]; }).length, total: req.length };
  }
  function ring(done, total) {
    var r = 12, c = 2 * Math.PI * r, off = c * (1 - (total ? done / total : 0));
    return '<svg class="ring" viewBox="0 0 30 30" aria-hidden="true"><g transform="rotate(-90 15 15)">' +
      '<circle class="trk" cx="15" cy="15" r="' + r + '"></circle>' +
      '<circle class="val" cx="15" cy="15" r="' + r + '" stroke-dasharray="' + c.toFixed(2) + '" stroke-dashoffset="' + off.toFixed(2) + '"></circle></g>' +
      '<text x="15" y="18" text-anchor="middle">' + (done >= total ? "✓" : done + "/" + total) + "</text></svg>";
  }

  function overviewHtml() {
    return GROUPS.map(function (g) {
      return '<div class="ogroup ' + g.color + '"><div class="ohead">' + esc(L.nav.groups[g.id]) + '</div><div class="otiles">' +
        g.items.map(function (id) {
          var s = L.sections[id], rec = id === "participar", lc = id === "lista" ? listCount() : null;
          return '<a class="otile' + (rec ? " rec" : "") + '" href="#' + id + '">' +
            (rec ? '<span class="badge">' + esc(L.ui.recommended) + "</span>" : "") +
            '<div class="ot-body"><div class="ot-t">' + esc(s.label) + '</div><div class="ot-d">' + esc(s.desc) + "</div>" +
            '<div class="ot-m"><span>' + esc(L.ui.minutes(s.time)) + '</span><span class="ot-go" aria-hidden="true">' + esc(L.nav.start) + "</span></div></div>" +
            (lc ? ring(lc.done, lc.total) : "") + "</a>";
        }).join("") + "</div></div>";
    }).join("");
  }

  function shareUrl() {
    var base = location.protocol.indexOf("http") === 0 ? location.origin + location.pathname : "https://";
    return base + "?lang=" + lang;
  }
  function shareHtml(headKey) {
    var msg = L.links.shareMsg(shareUrl());
    return '<div class="card top-gold"><span class="label ink">' + esc(headKey.h) + "</span>" +
      '<p class="lead">' + esc(headKey.lead) + "</p>" +
      '<div class="copyblock" id="sharemsg">' + esc(msg) +
      '<button type="button" class="copybtn" data-copy="sharemsg">' + esc(L.ui.copy) + "</button></div>" +
      '<div class="btnrow">' + ext("https://wa.me/?text=" + encodeURIComponent(msg), esc(L.links.shareWa), "btn btn-secondary btn-sm") + "</div></div>";
  }

  /* Applicant decision support; strings remain parallel in copy.js. */
  function applicantCards(items) {
    return '<div class="lgrid">' + items.map(function (item) {
      return '<div class="card top-blue"><h3 class="h3">' + esc(item[0]) + '</h3><p>' + esc(item[1]) + '</p></div>';
    }).join('') + '</div>';
  }
  function applicantSection(title, lead, body) {
    return '<section class="block"><h2 class="h-sec">' + esc(title) + '</h2>' +
      (lead ? '<p class="lead">' + esc(lead) + '</p>' : '') + body + '</section>';
  }
  function applicantContact() {
    return '<div class="btnrow"><a class="btn btn-secondary" href="#contacto">' + esc(L.applicant.askCta) + '</a></div>';
  }
  function benefitsHtml() {
    var A = L.applicant;
    return applicantSection(A.benefitsH, A.benefitsLead, applicantCards(A.benefits) +
      '<div class="btnrow"><a class="btn btn-primary" href="#programa">' + esc(A.learnCta) + '</a></div>');
  }
  function fitHtml() {
    var A = L.applicant;
    return applicantSection(A.fitH, A.fitLead, applicantCards(A.fitItems) + applicantContact());
  }
  function commitmentHtml() {
    var A = L.applicant;
    return applicantSection(A.commitmentH, A.commitmentText, '<p class="small">' + esc(A.commitmentNote) + '</p>') +
      applicantSection(A.certificateH, A.certificateText, '');
  }
  function supportHtml() {
    return applicantSection(L.applicant.supportH, L.applicant.supportText, applicantContact());
  }
  function welcomeHtml() {
    return applicantSection(L.applicant.welcomeH, '', applicantCards(L.applicant.welcome) + applicantContact());
  }
  function experienceHtml() {
    var A = L.applicant;
    return applicantSection(A.experienceH, A.experienceLead, applicantCards(A.experience)) +
      applicantSection(A.practiceH, A.practiceText, '<p class="small">' + esc(A.practiceNote) + '</p>');
  }
  function storiesHtml() {
    var A = L.applicant, url = link(lang === 'es' ? 'familyStoryEs' : 'familyStoryEn');
    var body = applicantCards(A.stories) + '<div class="btnrow">' + ext(url, esc(A.storyCta), 'btn btn-secondary') + '</div>';
    return applicantSection(A.storiesH, A.storiesLead, body) +
      applicantSection(A.evidenceH, A.evidenceText, '<p class="small">' + esc(A.evidenceSource) + '</p>') +
      applicantSection(A.videoH, A.videoText, '<div class="btnrow">' + ext(link('overviewVideo'), esc(A.videoCta), 'btn btn-secondary') + '</div>');
  }

  function springHtml() {
    var S = L.spring;
    return applicantSection(S.h, S.text, '<p class="small">' + esc(S.note) + '</p><div class="btnrow">' + ext(link('apply'), esc(S.cta), 'btn btn-primary') + '</div>');
  }
  function pageHome() {
    var cta = link("zoom")
      ? '<div class="cta-wrap">' + ext(link("zoom"), esc(L.next.register), "cta") + '<p class="cta-note">' + esc(L.home.ctaLead) + "</p></div>"
      : "";
    return heroHtml() + springHtml() + benefitsHtml() + fitHtml() + scheduleNote() + nextCard() + statsHtml() +
      '<section class="block"><span class="label blue">' + esc(L.nav.groups.join) + '</span><h2 class="h-sec">' + esc(L.home.stepsH) + "</h2>" +
      '<div class="block">' + stepsHtml(true) + "</div>" + cta + "</section>" +
      '<section class="block"><h2 class="h-sec">' + esc(L.home.overviewH) + '</h2><div class="block">' + overviewHtml() + "</div></section>" +
      '<section class="block">' + shareHtml({ h: L.home.shareH, lead: L.home.shareLead }) + "</section>";
  }

  function infoDatesHtml() {
    var infos = EV.filter(function (e) { return e.kind === "info"; });
    if (!infos.length) return "";
    return '<div class="card top-pink"><span class="label blue">' + esc(L.steps.infoDatesH) + "</span>" +
      '<ul class="checks">' + infos.map(function (e) {
        var past = new Date(e.end).getTime() < NOW.getTime();
        return '<li class="check"><div><div class="h3">' + esc(cap(longDate(e.start))) + '</div><div class="small">' + esc(spanDash(e.start, e.end)) +
          (past ? " · " + esc(L.cal.done) : "") + "</div></div></li>";
      }).join("") + "</ul>" +
      '<p class="small">' + esc(L.cal.infoWording) + ". " + esc(L.steps.infoDatesNote) + "</p>" +
      (link("info") ? '<div class="btnrow">' + ext(link("info"), esc(L.next.join), "btn btn-secondary btn-sm") + "</div>" : "") + "</div>";
  }

  function scheduleNote() {
    return callout("", L.cal.scheduleLabel, esc(L.cal.scheduleNote));
  }

  function pageParticipar() {
    var S = L.steps;
    return secHead("participar") + springHtml() + fitHtml() + commitmentHtml() + scheduleNote() + '<p class="lead">' + esc(S.lead) + "</p>" +
      '<div class="block">' + stepsHtml(false, "h2") + "</div>" +
      callout("", S.noteLabel, esc(S.note)) +
      '<div class="block">' + infoDatesHtml() + "</div>" +
      welcomeHtml() +
      '<section class="block"><h2 class="h-sec">' + esc(S.askH) + '</h2><div class="block">' +
      S.ask.map(function (a) { return '<div class="card top-blue"><h3 class="h3">' + esc(a[0]) + '</h3><p class="lead">' + esc(a[1]) + "</p></div>"; }).join("") +
      "</div></section>" +
      '<div class="panel"><div class="panel-head"><span class="label">' + esc(S.panelH) + "</span></div>" +
      "<p>" + esc(S.panelText) + '</p><div class="btnrow"><a class="btn btn-primary" href="#lista">' + esc(S.panelCta) + "</a></div></div>";
  }

  var calFilter = "all";
  function calRows() {
    return EV.filter(function (e) { return calFilter === "all" || (calFilter === "info" ? e.kind === "info" : e.kind === "cls"); })
      .map(function (e) {
        var tt = evTitle(e), sd = shortDate(e.start), wk = weekOf(e);
        var past = new Date(e.end).getTime() < NOW.getTime(), today = daysUntil(e.start, NOW) === 0;
        var cls = (past ? " is-past" : "") + (today ? " is-today" : "") + (e.kind === "info" ? " is-info" : "");
        var tags = (today ? ' <span class="tag gold row-tag">' + esc(L.cal.today) + "</span>" : past ? ' <span class="tag row-tag">' + esc(L.cal.done) + "</span>" : "") +
                   (e.kind === "info" ? ' <span class="tag pink row-tag">' + esc(L.ui.optional) + "</span>" : "");
        return '<tr class="' + cls.trim() + '"><td class="c-date"><span class="dow">' + esc(sd.dow) + "</span> " + esc(sd.dm) + "</td>" +
          '<td class="c-kind"><span class="tag ' + (e.kind === "info" ? "pink" : e.kind === "cls" ? (e.grad ? "gold" : "blue") : "") + '">' + esc(tt.kind) + "</span></td>" +
          '<td class="c-topic">' + (wk && e.kind === "cls" ? '<span class="wk">' + esc(L.cal.week(wk)) + "</span>" : "") + esc(tt.topic) + tags + "</td>" +
          '<td class="c-time">' + (e.kind === "holiday" ? "—" : esc(spanDash(e.start, e.end))) + "</td></tr>";
      }).join("");
  }
  function pageCalendario() {
    var K = L.cal, f = K.filters;
    var pills = ["all", "info", "cls"].map(function (k) {
      return '<button type="button" class="pill" data-filter="' + k + '" aria-pressed="' + (calFilter === k) + '">' + esc(f[k]) + "</button>";
    }).join("");
    return secHead("calendario") + springHtml() + scheduleNote() +
      (CLASSES.length && !C.projected ? '<p class="lead">' + esc(K.lead(classDays(), classTime(spanWords))) + "</p>" : "") +
      (C.projected ? callout("gold", K.projectedLabel, esc(K.projected)) : "") +
      '<div class="block">' + nextCard() + "</div>" +
      '<div class="filters" role="group" aria-label="' + esc(K.filterLabel) + '"><span class="label">' + esc(K.filterLabel) + "</span>" + pills + "</div>" +
      '<div class="tablewrap"><table class="cal"><caption class="sr-only">' + esc(K.h + " · " + cohortLabel()) + "</caption>" +
      '<thead><tr><th scope="col">' + esc(K.cols.date) + '</th><th scope="col">' + esc(K.cols.kind) + '</th><th scope="col">' +
      esc(K.cols.topic) + '</th><th scope="col">' + esc(K.cols.time) + '</th></tr></thead><tbody id="calbody">' + calRows() + "</tbody></table></div>" +
      '<p class="small mt">' + esc(K.note) + "</p>" +
      '<div class="btnrow"><button type="button" class="btn btn-primary" data-ics="all">' + esc(K.ics) + "</button>" +
      (link("cal") ? ext(link("cal"), esc(K.full), "btn btn-secondary") : "") + "</div>" +
      '<p class="small">' + esc(K.icsHelp) + "</p>";
  }

  function pageZoom() {
    var Z = L.zoom;
    var vids = Z.vids.map(function (v) {
      var u = link(v[0]); if (!u) return "";
      return "<li>" + ext(u, '<span class="t">' + esc(v[1]) + '</span><span class="d">' + esc(v[2]) + "</span>", "lnk") + "</li>";
    }).join("");
    var order = '<ol class="steps">' + Z.order.map(function (o, i) {
      return '<li class="step"><span class="dot' + (i === 1 ? " blue" : "") + '" aria-hidden="true">' + (i + 1) + '</span><div class="step-body"><h3 class="h3">' +
        esc(o[0]) + "</h3><p>" + esc(o[1]) + "</p></div></li>";
    }).join("") + "</ol>";
    return secHead("zoom") + '<p class="lead">' + esc(Z.lead) + "</p>" +
      '<ul class="lgrid">' + vids + "</ul>" +
      callout("gold", Z.tipLabel, esc(Z.tip)) + supportHtml() +
      '<section class="block"><h2 class="h-sec">' + esc(Z.orderH) + '</h2><div class="block">' + order + "</div></section>" +
      '<div class="block">' + callout("", Z.lostLabel, esc(Z.lost)) + callout("mid", Z.deviceLabel, esc(Z.device)) + "</div>";
  }

  function readList() { try { return JSON.parse(lsGet(LS_LIST) || "{}") || {}; } catch (e) { return {}; } }
  function writeList(st) { lsSet(LS_LIST, JSON.stringify(st)); }
  function pageLista() {
    var Li = L.list, st = readList(), lc = listCount();
    var rows = Li.items.map(function (it) {
      var u = it.link ? link(it.link) : null;
      /* Keep checklist steps visible even when an event or registration link expires. */
      var action = u ? ext(u, esc(it.cta), "btn btn-secondary btn-sm")
                 : it.route ? '<a class="btn btn-secondary btn-sm" href="#' + it.route + '">' + esc(it.cta) + "</a>" : "";
      return '<li class="check"><input type="checkbox" id="ck-' + it.id + '" data-check="' + it.id + '"' + (st[it.id] ? " checked" : "") + ">" +
        '<label for="ck-' + it.id + '"><span class="box" aria-hidden="true"></span><span class="ctext">' + esc(it.t) +
        (it.optional ? '<span class="tag pink">' + esc(L.ui.optional) + "</span>" : "") +
        (it.key ? '<span class="tag solid-blue">' + esc(Li.keyLabel) + "</span>" : "") + "</span></label>" + action + "</li>";
    }).join("");
    var done = lc.done >= lc.total;
    return secHead("lista") + '<p class="lead">' + esc(Li.lead) + "</p>" +
      '<div class="panel"><div class="panel-head"><span class="label">' + esc(Li.panelLabel) + '</span><span class="status' + (done ? " done" : "") + '" id="lststatus">' +
      esc(done ? Li.status.done : Li.status.todo) + "</span></div>" +
      '<ul class="checks">' + rows + "</ul>" +
      '<div class="bar" aria-hidden="true"><span id="lstbar"></span></div>' +
      '<p class="bar-cap" id="lstcap" aria-live="polite">' + esc(Li.progress(lc.done, lc.total)) + (done ? " — " + esc(Li.doneMsg) : "") + "</p>" +
      '<div class="btnrow"><button type="button" class="btn btn-ghost btn-sm" id="lstreset">' + esc(Li.reset) + "</button></div></div>";
  }
  function syncListUi() {
    var Li = L.list, lc = listCount(), done = lc.done >= lc.total;
    var bar = document.getElementById("lstbar"), cap = document.getElementById("lstcap"), stt = document.getElementById("lststatus");
    if (bar) bar.style.width = (lc.total ? Math.round(100 * lc.done / lc.total) : 0) + "%";
    if (cap) cap.textContent = Li.progress(lc.done, lc.total) + (done ? " — " + Li.doneMsg : "");
    if (stt) { stt.textContent = done ? Li.status.done : Li.status.todo; stt.className = "status" + (done ? " done" : ""); }
  }

  function pagePrograma() {
    var P = L.prog, weeks = {};
    EV.forEach(function (e) { var w = weekOf(e); if (w && (e.kind === "cls" || e.kind === "holiday")) (weeks[w] = weeks[w] || []).push(e); });
    var cards = Object.keys(weeks).sort(function (a, b) { return a - b; }).map(function (w) {
      var list = weeks[w], isGrad = list.some(function (e) { return e.grad; });
      return '<div class="week' + (isGrad ? " grad" : "") + '"><span class="label ' + (isGrad ? "ink" : "blue") + '">' + esc(P.weekH(w)) + "</span><ol>" +
        list.map(function (e) {
          var tt = evTitle(e), sd = shortDate(e.start);
          return '<li class="' + (e.kind === "holiday" ? "off" : "") + '"><span class="d">' + esc(cap(sd.dow) + " " + sd.dm) + "</span>" +
            esc(e.kind === "holiday" ? tt.kind + " — " + tt.topic : tt.topic) + (e.grad ? " · " + esc(P.gradNote) : "") + "</li>";
        }).join("") + "</ol></div>";
    }).join("");
    return secHead("programa") + experienceHtml() + commitmentHtml() + scheduleNote() + '<p class="lead">' + esc(P.lead) + "</p>" +
      callout("", P.classLabel, esc(P.classText)) +
      '<div class="weeks">' + cards + "</div>";
  }

  function pageHistoria() {
    var H = L.hist, fg = F.figures, S = H.stats;
    var stats = '<div class="stats">' +
      '<div class="stat"><div class="stat-n">' + fg.alumni + '</div><div class="stat-l">' + esc(S.alumni) + '</div><div class="stat-note">' +
      esc(S.alumniNote(fg.alumniCohorts, fg.alumniYears, ymdLong(fg.alumniAsOf))) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + C.num + '</div><div class="stat-l">' + esc(S.cohort) + '</div><div class="stat-note">' + esc(S.cohortNote) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + fg.counties + '</div><div class="stat-l">' + esc(S.counties) + '</div><div class="stat-note">' + esc(S.countiesNote) + "</div></div>" +
      '<div class="stat"><div class="stat-n">' + esc(fg.evalGrad) + '</div><div class="stat-l">' + esc(S.grad) + '</div><div class="stat-note">' + esc(S.gradNote) + "</div></div></div>";
    var changed = H.changed.map(function (c) {
      return '<div class="card"><h3 class="h3">' + esc(c[0]) + '</h3><div class="ba"><div class="b"><span class="label">' + esc(H.before) + "</span><p>" +
        esc(c[1]) + '</p></div><div class="a"><span class="label">' + esc(H.now) + "</span><p>" + esc(c[2]) + "</p></div></div></div>";
    }).join("");
    return secHead("historia") + storiesHtml() + H.p.map(function (p) { return '<p class="lead">' + esc(p) + "</p>"; }).join("") +
      '<div class="block">' + stats + "</div>" +
      '<section class="block"><span class="label purple">' + esc(H.missionH) + '</span><blockquote class="quote">' + esc(H.mission) + "</blockquote></section>" +
      '<section class="block"><h2 class="h-sec">' + esc(H.changedH) + '</h2><div class="block">' + changed + "</div></section>";
  }

  function faqItems() {
    var ctx = { label: lang === "es" ? lowerFirst(C.label_es) : C.label_en, lang: teachLang() || "" };
    var items = [];
    L.faq.items.forEach(function (q) {
      if (typeof q[1] === "function") { if (ctx.lang) items.push([q[0], q[1](ctx)]); }   /* needs a known teaching language */
      else items.push(q);
    });
    if (AC.next) items.push([L.faq.nextCohortQ, L.faq.nextCohortA(lang === "es" ? lowerFirst(AC.next.label_es) : AC.next.label_en)]);
    return items;
  }
  function pagePreguntas() {
    var items = faqItems();
    return secHead("preguntas") +
      '<div class="search"><label class="sr-only" for="faqq">' + esc(L.ui.searchPh) + "</label>" +
      '<input id="faqq" type="search" autocomplete="off" placeholder="' + esc(L.ui.searchPh) + '">' +
      '<button type="button" class="x" id="faqx" aria-label="' + esc(L.ui.clear) + '" hidden>×</button></div>' +
      '<p class="small" id="faqcount" aria-live="polite">' + esc(L.ui.count(items.length)) + "</p>" +
      '<div id="faqlist">' + items.map(function (q, i) {
        return '<details class="qa" data-q="' + esc(norm(q[0] + " " + q[1])) + '"' + (i === 0 ? " open" : "") + '><summary><span class="q">' + esc(q[0]) +
          '</span><span class="sh" aria-hidden="true"><span class="s">' + esc(L.ui.show) + '</span><span class="h">' + esc(L.ui.hide) + "</span></span></summary>" +
          '<div class="a"><p>' + esc(q[1]) + "</p></div></details>";
      }).join("") + "</div>" +
      '<div id="faqnone" hidden>' + callout("gold", L.ui.noResultsLabel, esc(L.ui.noResults) + ' <a href="#contacto">' + esc(L.contact.h) + "</a>") + "</div>";
  }

  function pageEnlaces() {
    var groups = L.links.groups.map(function (g) {
      var lis = g.items.map(function (it) {
        var u = link(it[0]); if (!u) return "";
        return "<li>" + ext(u, '<span class="t">' + esc(it[1]) + '</span><span class="d">' + esc(it[2]) + "</span>", "lnk" + (it[0] === "zoom" ? " key" : "")) + "</li>";
      }).join("");
      return lis ? '<section class="block"><span class="label blue">' + esc(g.h) + '</span><ul class="lgrid">' + lis + "</ul></section>" : "";
    }).join("");
    return secHead("enlaces") + springHtml() + '<p class="lead">' + esc(L.links.lead) + "</p>" + groups +
      '<div class="block">' + shareHtml({ h: L.links.shareH, lead: L.links.shareLead }) + "</div>";
  }

  function pageContacto() {
    var O = F.org, Lb = L.contact.labels;
    return secHead("contacto") + applicantSection(L.applicant.teamH, L.applicant.teamText, "") + '<p class="lead">' + esc(L.contact.lead) + "</p>" +
      '<div class="card top-blue block"><dl class="kv">' +
      "<dt>" + esc(Lb.email) + '</dt><dd><a href="mailto:' + esc(O.email) + '">' + esc(O.email) + "</a></dd>" +
      "<dt>" + esc(Lb.phone) + '</dt><dd><a href="' + esc(O.phoneHref) + '">' + esc(O.phone) + "</a></dd>" +
      "<dt>" + esc(Lb.wa) + "</dt><dd>" + ext(O.waHref, esc(L.contact.waCta)) + "</dd>" +
      "<dt>" + esc(Lb.web) + "</dt><dd>" + ext(O.web, esc(L.contact.webLabel)) + "</dd>" +
      "</dl></div>" + '<div class="btnrow">' + ext(O.waHref, esc(L.contact.waCta), "btn btn-primary") +
      '<a class="btn btn-secondary" href="mailto:' + esc(O.email) + '">' + esc(O.email) + "</a></div>" + applicantSection(L.applicant.supportH, L.applicant.supportText, "") + applicantSection(L.applicant.alumniH, L.applicant.alumniText, "");
  }

  var PAGES = { inicio: pageHome, participar: pageParticipar, calendario: pageCalendario, zoom: pageZoom, lista: pageLista,
                programa: pagePrograma, historia: pageHistoria, preguntas: pagePreguntas, enlaces: pageEnlaces, contacto: pageContacto };

  function prevNext(id) {
    var i = ORDER.indexOf(id), p = ORDER[i - 1], n = ORDER[i + 1];
    function lbl(x) { return x === "inicio" ? L.nav.home : L.sections[x].label; }
    var h = '<nav class="pn" aria-label="' + esc(L.nav.prev.replace(/[←→]/g, "").trim() + " / " + L.nav.next.replace(/[←→]/g, "").trim()) + '">';
    if (p) h += '<a class="prev" href="#' + p + '"><span class="pl">' + esc(L.nav.prev) + '</span><span class="pt">' + esc(lbl(p)) + "</span></a>";
    if (n) h += '<a class="next ' + colorOf(n) + '" href="#' + n + '"><span class="pl">' + esc(i === 0 ? L.nav.start : L.nav.next) + '</span><span class="pt">' + esc(lbl(n)) + "</span></a>";
    return h + "</nav>";
  }

  /* ---------- ICS ---------- */
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
  function buildIcs(evts) {
    var now = icsStamp(new Date().toISOString());
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ALL In Education//PEA Applicant Hub " + VERSION + "//" + lang.toUpperCase(), "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    evts.forEach(function (e) {
      var tt = evTitle(e), sum = L.cal.icsName + " · " + (e.kind === "cls" ? tt.topic : tt.kind);
      var desc = e.kind === "info" ? L.cal.infoWording + ". " + (link("info") || "")
               : e.kind === "cls" ? (e.projected ? L.next.projected : L.next.classNote)
               : e.kind === "holiday" ? L.next.holidayNote : tt.topic;
      lines.push("BEGIN:VEVENT", "UID:PEA-" + e._c + "-" + e.code + "@allineducation.org", "DTSTAMP:" + now,
        "DTSTART:" + icsStamp(e.start), "DTEND:" + icsStamp(e.end), icsFold("SUMMARY:" + icsEsc(sum)),
        icsFold("DESCRIPTION:" + icsEsc(desc)), (e.kind === "holiday" ? "LOCATION:" : "LOCATION:Zoom"), e.kind === "holiday" ? "TRANSP:TRANSPARENT" : "TRANSP:OPAQUE", "END:VEVENT");
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
  function copyText(text, btn) {
    function ok() { btn.textContent = L.ui.copied; btn.classList.add("ok"); announce(L.ui.copied);
      setTimeout(function () { btn.textContent = L.ui.copy; btn.classList.remove("ok"); }, 1500); }
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(ok, fallback); } else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "absolute"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); ok(); } catch (e) {} ta.remove();
    }
  }
  function announce(msg) { var el = document.getElementById("live"); if (el) { el.textContent = ""; setTimeout(function () { el.textContent = msg; }, 30); } }

  /* ---------- routing + render ---------- */
  function currentRoute() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    return PAGES[h] ? h : "inicio";
  }
  function render(focus) {
    if (!new URLSearchParams(location.search).has("today")) NOW = new Date();
    var id = currentRoute();
    L = T[lang];
    document.documentElement.lang = lang;
    document.title = (id === "inicio" ? "" : L.sections[id].label + " · ") + L.meta.title;
    var md = document.querySelector('meta[name="description"]'); if (md) md.setAttribute("content", L.meta.description);
    document.getElementById("skip").textContent = L.ui.skip;
    renderBand(); renderNav(id); renderFoot();
    var main = document.getElementById("main");
    main.innerHTML = PAGES[id]() + prevNext(id);
    if (id === "lista") syncListUi();
    if (focus) {
      window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      var h1 = main.querySelector("h1"); if (h1) h1.focus({ preventScroll: true });
    }
  }
  function setLang(l) {
    lang = l; lsSet(LS_LANG, l);
    try {
      var u = new URL(location.href); u.searchParams.set("lang", l);
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    } catch (e) {}
    var y = window.scrollY; render(false); window.scrollTo(0, y);
    var b = document.getElementById("langbtn"); if (b) b.focus();
  }

  /* ---------- events (delegated) ---------- */
  document.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target : null; if (!t) return;
    if (t.closest("#skip")) { ev.preventDefault(); document.getElementById("main").focus(); return; }
    var ics = t.closest("[data-ics]"); if (ics) { downloadIcs(ics.getAttribute("data-ics")); return; }
    var cp = t.closest("[data-copy]");
    if (cp) { var src = document.getElementById(cp.getAttribute("data-copy")); if (src) copyText(src.firstChild.nodeValue, cp); return; }
    var fl = t.closest("[data-filter]");
    if (fl) {
      calFilter = fl.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === fl)); });
      var body = document.getElementById("calbody"); if (body) body.innerHTML = calRows();
      return;
    }
    if (t.id === "lstreset") {
      writeList({}); document.querySelectorAll("[data-check]").forEach(function (c) { c.checked = false; }); syncListUi(); return;
    }
    if (t.id === "faqx") { var q = document.getElementById("faqq"); q.value = ""; filterFaq(""); q.focus(); }
  });
  document.addEventListener("change", function (ev) {
    var c = ev.target; if (!c.getAttribute || !c.getAttribute("data-check")) return;
    var st = readList(); st[c.getAttribute("data-check")] = c.checked; writeList(st); syncListUi();
  });
  document.addEventListener("input", function (ev) { if (ev.target.id === "faqq") filterFaq(ev.target.value); });
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
    render(true);
  });

  render(false);
  setInterval(function () {
    if (!document.hidden && ["inicio", "calendario"].indexOf(currentRoute()) !== -1) render(false);
  }, 60000);
})();
