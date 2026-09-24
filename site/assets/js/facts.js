/* ==================================================================
   PEA Applicant Hub — FACTS  (v0.9.4)
   ------------------------------------------------------------------
   PRIMARY DATE AND LINK REGISTRY. Also review cohort policy copy.
   Cohort dates, duration and links are maintained here.

   Sources (do not type a date anywhere else):
   - Dates, times, session codes, Zoom links: Airtable · PEA base
     appIqlWqvk2HkHVRM · Calendar table tblGVaBk7FSDybGuH
     (live Calendar checked 2026-09-24; all 22 FA26 timestamps match).
     The Airtable Calendar is authoritative. Where any other surface
     disagrees, Airtable wins.
   - Session titles: title_es = Message Studio family-facing title;
     title_en = PEA Module Master Table v1.2 (via fa26-session-index).
   - Shortlinks: Bitly registry in the Message Studio.
   - Alumni figure: AIE Alumni base appAnb90zo02mNqpi. Exclude staff/test records.
   - PEA alumni: 922 authoritative, confirmed by Danny Hernández on 2026-09-24;
     raw PEA membership is 923 before the staff-test exclusion.

   Times are stored in UTC. Arizona is UTC-7 all year (no DST);
   app.js subtracts exactly seven hours to display them.

   A missing link is simply not shown. Families never see a gap marker.
   ================================================================== */
window.PEA_FACTS = {
  syncedAt: "2026-09-24",
  source: "Airtable · PEA · Calendar",

  org: {
    email: "pea@allineducation.org",
    phone: "602-759-0619",
    phoneHref: "tel:+16027590619",
    waHref: "https://api.whatsapp.com/send?phone=16027590619",
    web: "https://allineducation.org"
  },

  /* Figures cited externally carry their as-of date (Data Release rule). */
  figures: {
    alumni: 922,
    alumniCohorts: 11,
    alumniYears: "2021–2026",
    alumniAsOf: "2026-09-24",
    counties: 3,
    evalGrad: "100%",            /* LeCroy & Milligan, PEA Evaluation Report, Aug 2022 */
    evalAttend: "96.4%"
  },

  links: {
    global: {
      overviewVideo: "https://www.youtube.com/watch?v=FEV_87qoqjc",
      familyStoryEn: "https://azluminaria.org/2023/05/18/a-program-helping-parents-navigate-arizonas-education-system-as-leaders-and-advocates-for-their-kids/",
      familyStoryEs: "https://azluminaria.org/2023/05/19/un-programa-que-ayuda-a-padres-latinos-a-navegar-el-sistema-educativo-de-arizona-como-lideres-y-defensores-de-sus-hijos/",
      apply:       "https://bit.ly/peaapply",
      exit:        "https://airtable.com/appIqlWqvk2HkHVRM/pagsaimIoBv1ZTWYd/form",
      lista:       "https://bit.ly/pealista",
      flyer:       "https://bit.ly/peaflyer",
      vidAccount:  "https://bit.ly/peacuentadezoom",
      vidRegister: "https://bit.ly/pearegistrozoom",
      vidName:     "https://bit.ly/peazoomnombre"
    },
    FA26: {
      info:     "https://bit.ly/peafa26info",
      zoom:     "https://bit.ly/peafa26zoom",
      cal:      "https://bit.ly/peafa26cal",
      whatsapp: "https://chat.whatsapp.com/KHdNf1nJalPLUW64lCkIdg?s=sh&p=i&mlu=4"
    },
    SP27: {
      /* Spring interest is open; Zoom registration will be released later. */
    }
  },

  /* kind: info | cls | holiday | focus
     Only confirmed cohorts can be promoted automatically; projected future
     cohorts are mentioned in the FAQ without opening registration. */
  cohorts: {
    FA26: {
      code: "FA26", num: 12,
      minimumAttendance: 16,
      label_es: "Otoño 2026", label_en: "Fall 2026",
      teaching_es: "español", teaching_en: "Spanish",
      weeks: 10,
      events: [
        { code: "IS1", kind: "info",    start: "2026-09-25T00:00:00Z", end: "2026-09-25T01:30:00Z" },
        { code: "IS2", kind: "info",    start: "2026-10-02T00:00:00Z", end: "2026-10-02T01:30:00Z" },
        { code: "1T",  kind: "cls", start: "2026-10-07T00:00:00Z", end: "2026-10-07T01:30:00Z", title_es: "Orientación", title_en: "Orientation" },
        { code: "1R",  kind: "cls", start: "2026-10-09T00:00:00Z", end: "2026-10-09T01:30:00Z", title_es: "La historia de la educación pública en Arizona", title_en: "History of Public Education in Arizona" },
        { code: "2T",  kind: "cls", start: "2026-10-14T00:00:00Z", end: "2026-10-14T01:30:00Z", title_es: "Determinantes sociales de la educación", title_en: "Social Determinants of Education" },
        { code: "2R",  kind: "cls", start: "2026-10-16T00:00:00Z", end: "2026-10-16T01:30:00Z", title_es: "Sesgo, identidad y el mito de la oportunidad", title_en: "Bias, Identity & the Opportunity Myth" },
        { code: "3T",  kind: "cls", start: "2026-10-21T00:00:00Z", end: "2026-10-21T01:30:00Z", title_es: "Acceso a una educación de calidad y la elección escolar", title_en: "Access to Quality Education & School Choice" },
        { code: "3R",  kind: "cls", start: "2026-10-23T00:00:00Z", end: "2026-10-23T01:30:00Z", title_es: "Navegando salones, escuelas y distritos escolares", title_en: "Navigating Classrooms, Schools, and School Districts" },
        { code: "4T",  kind: "cls", start: "2026-10-28T00:00:00Z", end: "2026-10-28T01:30:00Z", title_es: "Fundamentos de la lectura y cómo abogar por los estudiantes", title_en: "Foundational Reading Skills & Advocating for Students in the Literacy Classroom" },
        { code: "4R",  kind: "cls", start: "2026-10-30T00:00:00Z", end: "2026-10-30T01:30:00Z", title_es: "Lectura en casa", title_en: "Reading at Home" },
        { code: "5T",  kind: "cls", start: "2026-11-04T00:00:00Z", end: "2026-11-04T01:30:00Z", title_es: "Alfabetización digital para padres y cuidadores", title_en: "Digital Literacy for Parents & Caregivers" },
        { code: "5R",  kind: "cls", start: "2026-11-06T00:00:00Z", end: "2026-11-06T01:30:00Z", title_es: "Derechos de padres y cuidadores", title_en: "Your Rights as Parents & Caregivers" },
        { code: "6T",  kind: "cls", start: "2026-11-11T00:00:00Z", end: "2026-11-11T01:30:00Z", title_es: "Abogando por nuestros estudiantes en el salón de matemáticas", title_en: "Advocating for Students in the Math Classroom" },
        { code: "6R",  kind: "cls", start: "2026-11-13T00:00:00Z", end: "2026-11-13T01:30:00Z", title_es: "Explorando oportunidades después de la preparatoria", title_en: "Exploring Opportunities After High School" },
        { code: "7T",  kind: "cls", start: "2026-11-18T00:00:00Z", end: "2026-11-18T01:30:00Z", title_es: "Abogando por estudiantes excepcionales", title_en: "Advocating for Exceptional Students" },
        { code: "7R",  kind: "cls", start: "2026-11-20T00:00:00Z", end: "2026-11-20T01:30:00Z", title_es: "Participación comunitaria auténtica", title_en: "Authentic Community Engagement" },
        { code: "8T",  kind: "cls", start: "2026-11-25T00:00:00Z", end: "2026-11-25T01:30:00Z", title_es: "Historia personal: construyendo poder a través de la incidencia", title_en: "Story of Self: Creating Power Through Advocacy" },
        { code: "8R",  kind: "holiday", start: "2026-11-27T00:00:00Z", end: "2026-11-27T01:30:00Z" },
        { code: "9T",  kind: "cls", start: "2026-12-02T00:00:00Z", end: "2026-12-02T01:30:00Z", title_es: "Poniéndolo en práctica I", title_en: "Putting It Into Practice I" },
        { code: "9R",  kind: "cls", start: "2026-12-04T00:00:00Z", end: "2026-12-04T01:30:00Z", title_es: "Poniéndolo en práctica II", title_en: "Putting It Into Practice II" },
        { code: "10T", kind: "cls", start: "2026-12-09T00:00:00Z", end: "2026-12-09T01:30:00Z", title_es: "Graduación", title_en: "Graduation", grad: true },
        { code: "10R", kind: "focus",   start: "2026-12-11T00:00:00Z", end: "2026-12-11T01:30:00Z" }
      ]
    },
    SP27: {
      code: "SP27", num: 13,
      label_es: "Primavera 2027", label_en: "Spring 2027",
      teaching_es: null, teaching_en: null,
      weeks: 9,
      projected: true,          /* full session calendar is not published in this hub */
      interestOpen: true,
      startDate: "2027-03-16", endDate: "2027-05-13",
      schedulePublished: true,
      events: [
        { code: "1T", kind: "cls", start: "2027-03-17T00:00:00Z", end: "2027-03-17T01:30:00Z", title_es: "Orientación", title_en: "Orientation", projected: true }
      ]
    }
  }
};
