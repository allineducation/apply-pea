/* ==================================================================
   PEA Applicant Hub — FACTS  (v0.16.0)
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

   Entry path (Danny, 2026-09-29): the interest form is the application.
   The team sets up each applicant's Zoom access and sends a personal Zoom
   link in the welcome email. There is no public class Zoom registration
   link; do not add one back.
   ================================================================== */
window.PEA_FACTS = {
  syncedAt: "2026-09-24",
  source: "Airtable · PEA · Calendar",

  org: {
    email: "pea@allineducation.org",
    phone: "602-759-0619",
    phoneHref: "tel:+16027590619",
    smsHref: "sms:+16027590619",
    waHref: "https://api.whatsapp.com/send?phone=16027590619",
    web: "https://allineducation.org"
  },

  /* Figures cited externally carry their as-of date (Data Release rule). */
  figures: {
    alumni: 922,
    alumniCohorts: 11,
    alumniYears: "2021–2026",
    alumniAsOf: "2026-09-24",
    /* Source records only — no longer displayed (Danny Hernández, 2026-10-09): the evaluation is
       referenced indirectly in "Lo que deja cada cohorte" and cited in its footnote. */
    counties: 3,
    evalGrad: "100%",            /* LeCroy & Milligan, PEA Evaluation Report, Aug 2022 */
    evalAttend: "96.4%"
  },

  /* "En los medios / In the media" (Info & help → Nuestra historia), newest first; undated items last.
     Summaries are written for this site (not quoted headlines). date: "YYYY-MM-DD" from the article
     URL, or null until confirmed. url_es / url_en: the edition in each language (one may be absent).
     Chosen 2026-10-09; excluded on purpose: ABC15's 2020 pilot story (describes a 4-week teaching-
     assistant pathway), Yuma Sun enrollment notices, KJZZ's funding story, opinion pieces. */
  media: [
    { outlet: "azFamily · La Familia de Arizona", date: "2026-04-16", kind: "video",
      url_es: "https://www.azfamily.com/video/2026/04/16/educacin-en-arizona-la-familia-de-arizona/",
      es: "Stephanie Parra, directora ejecutiva de ALL In Education, habla sobre la educación en Arizona y los programas para familias latinas.",
      en: "ALL In Education CEO Stephanie Parra talks about education in Arizona and programs for Latino families." },
    { outlet: "Arizona Luminaria", date: "2023-05-19",
      url_es: "https://azluminaria.org/2023/05/19/un-programa-que-ayuda-a-padres-latinos-a-navegar-el-sistema-educativo-de-arizona-como-lideres-y-defensores-de-sus-hijos/",
      url_en: "https://azluminaria.org/2023/05/18/a-program-helping-parents-navigate-arizonas-education-system-as-leaders-and-advocates-for-their-kids/",
      es: "Cómo PEA ayuda a madres y padres a navegar el sistema educativo de Arizona como líderes y defensores de sus hijos.",
      en: "How PEA helps parents navigate Arizona’s education system as leaders and advocates for their children." },
    { outlet: "KJZZ", date: "2021-02-05",
      url_en: "https://www.kjzz.org/2021-02-05/content-1656870-new-arizona-program-teach-parents-how-support-students-education-during-covid-19-and",
      es: "Un nuevo programa en Arizona prepara a las familias para apoyar la educación de sus hijos durante la pandemia.",
      en: "A new Arizona program prepares families to support their children’s education during the pandemic." },
    { outlet: "ABC15", date: null,          /* published early 2022 (inferred from the article); confirm */
      url_en: "https://www.abc15.com/rebound/state-of-education/demand-soars-for-parent-educator-academy-amidst-turbulent-school-year",
      es: "La demanda por la Academia de Padres Educadores crece durante un año escolar difícil.",
      en: "Demand for the Parent Educator Academy grows during a turbulent school year." },
    { outlet: "Yuma Sun", date: null,       /* date to confirm */
      url_en: "https://www.yumasun.com/news/parent-educator-academy-strives-to-give-parents-confidence-information/article_9c316a7f-e64d-499c-8175-0a8c571563ac.html",
      es: "Una madre de Somerton cuenta cómo PEA da a las familias confianza e información sobre la educación en Arizona.",
      en: "A Somerton parent shares how PEA gives families confidence and information about education in Arizona." }
  ],

  /* Shared titles for session materials and resources. A class card shows one row per
     item: the Spanish version (title · ES) | the English version (title · EN); a version
     without a URL is left out. An item with `any` (one link for both languages) shows one
     link titled in the page language. Override with title_es / title_en. */
  materialTypes: {
    worksheet: { es: "Hoja de trabajo", en: "Participant worksheet" },
    comm:      { es: "Herramienta de comunicación", en: "Communication tool" },
    handout:   { es: "Material de apoyo", en: "Handout" },
    resource:  { es: "Recurso", en: "Resource" },
    presentation: { es: "Presentación", en: "Presentation" },
    whatsapp:  { es: "Unirse al grupo de WhatsApp de la cohorte", en: "Join the cohort WhatsApp group" },
    cal:       { es: "Ver el calendario de PEA", en: "View the PEA calendar" }
  },

  /* Topics for the Materiales y recursos page (v0.23.0; Danny Hernández, 2026-10-29). Each module names
     one topic; a resource item or group can name another with `topic` when its subject differs from the
     class. A sub-topic names its main topic in `parent` (one level only). The page sorts main topics and
     sub-topics by name in the page language and hides any that have no links yet. Opportunities & Continued
     Learning is also the home for adult English classes, GED information and life after high school. */
  topics: {
    advocacy:      { icon: "📣", es: "Liderazgo y defensa educativa", en: "Advocacy & Leadership" },
    rights:        { parent: "advocacy", es: "Derechos escolares", en: "Education Rights" },
    family:        { parent: "advocacy", es: "Participación familiar y comunitaria", en: "Family & Community Engagement" },
    history:       { parent: "advocacy", es: "Historia e identidad", en: "History & Identity" },
    digital:       { icon: "💻", es: "Alfabetización digital y tecnología", en: "Digital Literacy & Tech" },
    start:         { icon: "🧭", es: "Para empezar en PEA", en: "Getting Started with PEA" },
    literacy:      { icon: "📚", es: "Lectura", en: "Literacy" },
    math:          { icon: "➗", es: "Matemáticas", en: "Math" },
    schools:       { icon: "🏫", es: "Navegando sistemas escolares", en: "Navigating School Systems" },
    quality:       { parent: "schools", es: "Educación de calidad", en: "Quality Education" },
    safety:        { parent: "schools", es: "Seguridad y bienestar", en: "Safety & Well-Being" },
    sped:          { parent: "schools", es: "Educación especial y estudiantes excepcionales", en: "Special Education & Exceptional Students" },
    opportunities: { icon: "🎓", es: "Oportunidades y aprendizaje continuo", en: "Opportunities & Continued Learning" }
  },

  /* Curriculum modules — canonical, cohort-independent descriptions, session
     materials and resources. Each list item: { type, es: url, en: url }.
     Source: Airtable · PEA base · Modules table tblPkSBzSYKE4cBC6
     (Description (ES) / Description (EN) / Participant Worksheet (ES) — PDF /
     Participant Communication Tool (ES) — PDF / Participant Resource - Other (ES) — PDF),
     descriptions read 2026-09-25, materials read 2026-10-06. Only files shared
     "anyone with the link" are published (checked 2026-10-06). The MRGHT worksheet and communication tool
     held back on 2026-10-06 are superseded by the 2026-11-05 MRGHT folder PDFs (see MRGHT). MORIE worksheet: v1.1.1 ES + EN PDFs from the Session
     Materials folder (PEA_FA26_1T_Hoja_de_Trabajo_ES_v1_1_1.pdf, PEA_FA26_1T_Participant_Worksheet_EN_v1_1_1.pdf),
     shared "anyone with the link"; they replace the v1.0.0 PDFs (Danny Hernández, 2026-10-06). Other English versions and "Other"
     resources do not exist in Airtable yet; a new resource database is forthcoming. The MDIGI
     communication tool is one bilingual file, so both versions point to it.
     Calendar events link to a module by its planning ID.
     Edits: MPIP1 EN "stakeholders" → "key people" (brand §5.2; matches ES);
     MCOMM ES "docentes" → "maestros" (Danny, 2026-09-25: "docentes" is not in common use);
     MORIE ES/EN "nueve semanas"/"nine-week" → "18 clases"/"18-class" (repo rule: describe
     scheduled classes, not weeks); MORIE ES program name → "Academia de Padres Educadores" (Danny, 2026-09-30: the
     program name is translated in Spanish; "PEA", "ALL In Education" and the tagline never are);
     MORIE ES/EN (Danny, 2026-09-30): keeps only its first sentence, then the program's four
     learning goals (formerly the "Lo que va a aprender / What you'll learn" cards). */
  modules: {
    MORIE: { id: "PEA-M01", topic: "start",
      es: "Este curso de apertura presenta a las familias ALL In Education, la Academia de Padres Educadores y los acuerdos y apoyos que guían la experiencia de las 18 clases. También presenta los objetivos del programa, que cada familia vive a su manera: prepararse para hablar con la escuela (qué preguntar, qué información compartir y cómo dar seguimiento a una conversación con el personal escolar); saber a quién acudir, entendiendo cómo se organizan las escuelas y los distritos y a quién dirigirse cuando surge una inquietud; apoyar el aprendizaje en casa, con ideas para acompañar la lectura y las matemáticas y para hablar con la escuela sobre lo que necesita su estudiante; y participar en su comunidad, compartiendo su experiencia, colaborando con otras familias y tomando parte en las decisiones de la escuela.",
      en: "This opening course introduces participants to ALL In Education, the Parent Educator Academy, and the expectations and supports that shape the 18-class learning experience. It also introduces the program’s learning goals, which every family experiences in its own way: preparing for school conversations (what to ask, what to share, and how to follow up with school staff); knowing whom to contact, by understanding how schools and districts are organized and whom to go to when a concern comes up; supporting learning at home, with ideas for reading and math and for talking with the school about what your student needs; and taking part in your community by sharing your experience, working alongside other families, and having a voice in school decisions.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1rtHSJogz_FTi7VFTPHvMWDBkK4iKxvpq/view?usp=drivesdk", en: "https://drive.google.com/file/d/1o52Fa0oSKtvjY-NCWzKvmYsuhz55ZXMB/view?usp=drivesdk" }] },
    MHIST: { id: "PEA-M02", topic: "history",
      es: "Este curso examina los acontecimientos, las políticas y las decisiones que formaron la educación pública en Arizona y que continúan influyendo en las oportunidades estudiantiles. Las familias relacionan esta historia con sus propias experiencias escolares y consideran cómo el contexto histórico puede orientar el aprendizaje, la participación comunitaria y la defensa educativa.",
      en: "This course examines the historical events, policies, and decisions that shaped public education in Arizona and continue to influence students’ opportunities today. Families connect this history to their own school experiences and consider how historical context can inform learning, community involvement, and education advocacy.",
      /* 1R materials reviewed 2026-10-09 (Airtable Modules): worksheet ES + EN PDFs v1.0.0 (added 2026-10-08)
         and the communication tool, all "anyone with the link". The communication tool is a Spanish-participant
         tool (Danny Hernández, 2026-10-09; its filename says BIL because it shows the English phrasing), so it is
         listed in Spanish only. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1Sh6qNxMDMRcvEjSBVMGq4WVNKZtzhHUD/view?usp=drivesdk", en: "https://drive.google.com/file/d/1dh3ZWTiHhqdxOJfPxMtgMsE9DlNhNyCA/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1_AdiISrF03a3XtDlvb9RsIJNPsFa5ZH8/view?usp=drivesdk" }] },
    /* MSAFE replaces MSDOE for FA26 2T (Airtable Modules PEA-M19, created 2026-10-08). Description and
       objectives as supplied by Danny Hernández, 2026-10-08; the Airtable descriptions still carry an extra
       "nine social determinants" sentence that was left out here. */
    MSAFE: { id: "PEA-M19", topic: "safety",
      es: "Este curso se centra en condiciones que muchas familias consideran decisivas para sus estudiantes: si se sienten seguros en la escuela, si hay adultos que los conocen y si reciben apoyo para su bienestar. Las familias aprenden a reconocer señales de preocupación, describir por escrito lo que han observado, identificar a quién contactar y dar seguimiento cuando una situación no se resuelve. El curso gira en torno a una pregunta que cada familia puede poner en práctica esta semana.",
      en: "This course focuses on school safety, supportive relationships, and student well-being. Families learn to recognize signs of concern, describe what they have observed in writing, choose whom to contact, and follow up when a concern remains unresolved.",
      objectives_es: [
        "Nombrar al menos tres señales concretas que indican que algo no está bien para su hijo o hija en la escuela.",
        "Explicar por qué las observaciones de madres, padres y cuidadores aportan información valiosa a la escuela.",
        "Reconocer qué tipo de preocupación tienen —acoso escolar u hostigamiento, seguridad, una necesidad relacionada con una discapacidad, discriminación o un asunto general del salón— y escribir un relato breve basado en hechos.",
        "Identificar a quién contactar primero para su preocupación y cuál es el siguiente paso si no se resuelve."
      ],
      objectives_en: [
        "Name at least three concrete signs that something is wrong for their child at school.",
        "Explain how parents’ and caregivers’ observations provide valuable information to the school.",
        "Recognize the type of concern—bullying or harassment, safety, a disability-related need, discrimination, or a general classroom issue—and write a brief account based on facts.",
        "Identify whom to contact first and the next step if the concern is not resolved."
      ],
      /* 2T materials from the Session Materials folder (Danny Hernández, 2026-10-13): worksheet ES + EN PDFs
         v1.0.0 and the communication tool v1.0.1, all shared "anyone with the link". The communication tool is a
         Spanish-participant tool (its filename says BIL), so it is listed in Spanish only. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1dUOmLrxqAVD6VGvZKCSeMyYJZQxP1Nyi/view?usp=drivesdk", en: "https://drive.google.com/file/d/1ltm-a-ap9vTd_MYHPQqW47OYWrVAZdIY/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1_Pyn4N1rPLFC9dF9TbTjQVNMFtUux0km/view?usp=drivesdk" }] },
    MSDOE: { id: "PEA-M03", topic: "history",
      es: "Este curso explora cómo la vivienda, la salud, el transporte, los ingresos, el acceso lingüístico y los recursos comunitarios pueden influir en las experiencias y los resultados educativos. Las familias identifican fortalezas y barreras en sus comunidades, relacionan estos factores con la equidad y la justicia y consideran cómo abogar por los apoyos que necesitan sus estudiantes.",
      en: "This course explores how conditions such as housing, health, transportation, income, language access, and neighborhood resources can influence students’ educational experiences and outcomes. Families identify strengths and barriers in their communities, connect these factors to equity and justice, and consider ways to advocate for the supports their students need.",
      materials: [{ type: "comm", es: "https://drive.google.com/file/d/18yXbpyLsCcEsQQMihOi7l2BMmuQ5_7mB/view?usp=drivesdk" }] },
    MBIAS: { id: "PEA-M04", topic: "history",
      es: "Este curso invita a las personas participantes a examinar la identidad, el sentido de pertenencia, los prejuicios conscientes e inconscientes y cómo influyen en las experiencias escolares y el acceso a oportunidades. Mediante la reflexión y el diálogo, las familias relacionan sus vivencias con patrones más amplios e identifican maneras de apoyar entornos de aprendizaje más equitativos e inclusivos.",
      en: "This course invites participants to examine identity, belonging, conscious and unconscious bias, and the ways these forces shape students’ school experiences and access to opportunity. Through reflection and dialogue, families connect personal experiences to broader patterns and identify ways to support more equitable and inclusive learning environments.",
      materials: [{ type: "comm", es: "https://drive.google.com/file/d/1tZ3oEPuYE9RYuLW_F-tEp8DiSsKL4rWs/view?usp=drivesdk" }] },
    MQUAL: { id: "PEA-M05", topic: "quality",
      es: "Este curso ayuda a las familias a definir una educación de alta calidad y comprender las opciones de escuelas públicas disponibles en Arizona, dentro y fuera de la escuela asignada. Las personas participantes analizan información sobre las escuelas, consideran cómo cada opción apoya el aprendizaje y la equidad y practican preguntas que orienten decisiones para sus estudiantes.",
      en: "This course helps families define high-quality education and understand Arizona’s public school options, including choices available within and beyond their assigned school. Participants examine information about schools, consider how different options support learning and equity, and practice asking questions that can inform decisions for their students.",
      /* 3T materials from the 3T class folder (Danny Hernández, 2026-10-20), PDFs only, all shared "anyone with the
         link": worksheet ES + EN v1.0.1, family handout ES + EN v1.0.0 (Hoja informativa / Family handout), and the
         communication tool ES v1.0.0 (Spanish only, per the package README), which replaces the earlier BIL v1_0_0
         tool. The Opciones escolares resource is Spanish only. The small-group guide is staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1RM8Qf41_zncpYnB6MibjiSPIHFxuBz2T/view?usp=drivesdk", en: "https://drive.google.com/file/d/1-OrN4LLqtP4EV6-7NoLhIFlezN4kvl60/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1N1gR0F-7daYwawI227ZQqV_8jxyH00FU/view?usp=drivesdk", en: "https://drive.google.com/file/d/11xZsalIftWo7nW6K7wjV-OHiucvYuHyw/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1KJRzBjdX1VqpssK2v6qzCCS1NqewH4JJ/view?usp=drivesdk" }],
      /* 3T resources (Danny Hernández, 2026-10-20), ordered: Spanish first, then Arizona sources, then national
         school-search tools. The two videos are one row (ES | EN), as is the ADE Parents page (Spanish via Google
         Translate | English original). Spanish versions added 2026-10-21 (Danny: some English-only links have Spanish
         versions): GreatSchools ?lang=es; Arizona School Choice Resources → opcionesescolares.com/arizona, the National
         School Choice Awareness Foundation's Spanish site; Spanish-only additions: the Opciones Escolares school finder (linked from the PDF), its resources index (Danny, 2026-10-21) and Guía Escolar AZ (free Spanish advisors, a School Choice Week partner); ESA → the Opciones Escolares ESA guide (not an ADE page; ADE
         has no Spanish ESA page). No Spanish version found for AZ School Report Cards, the Charter Schools
         Association, SchoolDigger, Niche, NCES or U.S. News; they show their English title on both pages. YouTube share trackers (?si=) dropped. */
      resources: [
        { type: "resource", title_es: "Video: Conozca sus opciones escolares en Arizona", es: "https://youtu.be/KiCpFerMUhk",
          title_en: "Video: Your School Choice Guide in Arizona", en: "https://youtu.be/Xis_7NExf_A" },
        { type: "resource", title_es: "Opciones escolares en Arizona", es: "https://drive.google.com/file/d/1LyNjb40IY_53ee4ek8mcTeP_gJFHE471/view?usp=drivesdk" },
        { type: "resource", title_es: "Buscar escuelas cerca de mí (Opciones Escolares)", es: "https://opcionesescolares.com/escuelascercademi" },
        { type: "resource", title_es: "Más recursos para familias (Opciones Escolares)", es: "https://opcionesescolares.com/recursos/" },
        { type: "resource", title_es: "Guía Escolar AZ: asesoría gratuita en español para elegir escuela", es: "https://guiaescolaraz.org/" },
        { type: "resource", title_es: "Departamento de Educación de Arizona: Familias (traducción de Google)", es: "https://www-azed-gov.translate.goog/parents?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=en&_x_tr_pto=wapp",
          title_en: "Arizona Department of Education: Parents", en: "https://www.azed.gov/parents" },
        { type: "resource", title_es: "Guía del programa ESA de Arizona (Opciones Escolares)", es: "https://opcionesescolares.com/recursos/esa-arizona/",
          title_en: "Arizona ESA Program", en: "https://www.azed.gov/esa" },
        { type: "resource", title_en: "AZ School Report Cards", en: "https://azreportcards.azed.gov" },
        { type: "resource", title_en: "Arizona Charter Schools Association", en: "https://azcharters.org" },
        { type: "resource", title_es: "Conozca sus opciones escolares en Arizona", es: "https://opcionesescolares.com/arizona/",
          title_en: "Arizona School Choice Resources", en: "https://schoolchoiceweek.com/states/arizona/" },
        { type: "resource", title_es: "GreatSchools", es: "https://www.greatschools.org/?lang=es", title_en: "GreatSchools", en: "https://www.greatschools.org" },
        { type: "resource", title_en: "SchoolDigger", en: "https://www.schooldigger.com" },
        { type: "resource", title_en: "Niche: School Rankings & Reviews", en: "https://www.niche.com/?ref=k12" },
        { type: "resource", title_en: "U.S. Department of Education: Search for Public Schools", en: "https://nces.ed.gov/ccd/schoolsearch" },
        { type: "resource", title_en: "U.S. News: K–12 Schools", en: "https://www.usnews.com/education/k12" }
      ] },
    MCOMM: { id: "PEA-M06", topic: "schools",
      es: "Este curso explica cómo se organizan los salones, las escuelas y los distritos e identifica a las personas y las rutas de comunicación que las familias pueden usar cuando surgen preguntas o inquietudes. Las personas participantes practican estrategias de comunicación de dos vías con maestros, directores, consejeros y otro personal escolar para construir alianzas enfocadas en las necesidades estudiantiles.",
      en: "This course explains how classrooms, schools, and districts are organized and identifies the people and communication pathways families can use when questions or concerns arise. Participants practice strategies for two-way communication with teachers, principals, counselors, and other school staff so they can build productive partnerships around student needs.",
      /* 3R materials from the 3R class folder (Danny Hernández, 2026-10-22), PDFs only, all shared "anyone with the
         link": worksheet ES + EN, family handout ES + EN and the communication tool (Spanish only), all v2.0.1, replacing
         the v1.0.0 PDFs of 2026-10-20; and the new "Quién es quién / Who's Who in Arizona Education" reference sheet
         ES + EN v1.0.2. The small-group guide is staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1ufDExff91mNsyP-l3e-1vslcerAgMGFE/view?usp=drivesdk", en: "https://drive.google.com/file/d/1kHTmO34KPxdZgcXCvCY-T-Fnu7FufPyu/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1QYuARuM8YB1puA30bx4rLyFVfRhbWV4a/view?usp=drivesdk", en: "https://drive.google.com/file/d/1S3qk8aYpHyZbGGpMj3SrFN-gRYTfZOxD/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1uVqed9XN9O-P5BTekR2E7TNtGiLFp7ol/view?usp=drivesdk" },
        { type: "handout", title_es: "Quién es quién en la educación de Arizona", es: "https://drive.google.com/file/d/14R5zCJP5rtVxucqL7VYfNclvPQcIaWmp/view?usp=drivesdk",
          title_en: "Who’s Who in Arizona Education", en: "https://drive.google.com/file/d/1HgynF1O7FfBK_5H4w6AEmtDf9Ha42EMd/view?usp=drivesdk" }],
      /* 3R resources (Danny Hernández, 2026-10-22): 28 rows in five closed groups so the card stays short. ES and EN
         versions of a resource share a row; Spanish links carry Spanish titles. Within a group, specific resources
         (articles, guides, checklists, videos, PDFs) come before general sites and directories. Dropped tracking
         params (?si=) and a trailing "#". Codex review (PR #40) fixes: Understood
         conference row now pairs the same checklist in both languages; Understood math EN gets /en/; ADE family
         engagement moved to /titlei/familyengagement; English newcomer guide added; "Helping Your Child Through School
         Partnerships" (www2.ed.gov) and "Raise the Bar: Parents" removed (both return 404); the 2021 reopening
         checklist was removed (Danny Hernández, 2026-10-22); ADE special-education guide EN moved to /sites/default/files;
         Yuma board list moved to yumaesa.org; open groups are remembered by class and position. Other links not checked from the build environment. */
      resources: [
        { title_es: "Quién es quién en la escuela", title_en: "Who’s who at school", items: [
          { type: "resource", title_es: "Quién es quién en la escuela de su hijo o hija (Colorín Colorado)", es: "https://www.colorincolorado.org/es/articulo/gu%C3%ADa-para-los-padres-qui%C3%A9n-es-qui%C3%A9n-en-la-escuela-de-su-ni%C3%B1o", title_en: "Who’s Who at Your Child’s School (Colorín Colorado)", en: "https://www.colorincolorado.org/article/parent-guide-whos-who-your-childs-school" },
          { type: "resource", title_es: "Preguntas que hacen las familias sobre las escuelas (Departamento de Educación de EE. UU.)", es: "https://drive.google.com/file/d/1oHno51Aloln6t5r2Vz2oeSMOk93xboQT/view?usp=drivesdk" },
          { type: "resource", title_es: "La escuela en Estados Unidos: guía para familias recién llegadas (Departamento de Educación de EE. UU.)", es: "https://ies.ed.gov/ncee/edlabs/regions/northwest/pdf/newcomer-guide-infographic-es.pdf", title_en: "Schooling in the United States: A Guide for Newcomer Families (U.S. Department of Education)", en: "https://ies.ed.gov/ncee/edlabs/regions/northwest/pdf/newcomer-guide-infographic.pdf" },
          { type: "resource", title_es: "Video: ¿Qué es una escuela de Título I?", es: "https://youtu.be/yN7otTSSbXk" }
        ] },
        { title_es: "Hablar con el maestro y la escuela", title_en: "Talking with teachers and the school", items: [
          /* Learning Heroes "Carta al maestro | Dear Teacher Letter" (Danny Hernández, 2026-11-10; pages read that day). */
          { type: "resource", title_es: "Carta al maestro: presente a su hijo o hija al nuevo maestro con una carta personalizada (Learning Heroes)", es: "https://bealearninghero.org/es/carta-2022/",
            title_en: "“Dear Teacher” Letter: introduce your child to their new teacher with a personalized letter (Learning Heroes)", en: "https://bealearninghero.org/dear-teacher-letter-fall/" },
          { type: "resource", title_es: "Consejos para la reunión con el maestro (Colorín Colorado)", es: "https://www.colorincolorado.org/es/articulo/consejos-para-padres-conferencias-de-padres-y-maestros", title_en: "Tips for Parent-Teacher Conferences (Colorín Colorado)", en: "https://www.colorincolorado.org/article/tips-parents-parent-teacher-conferences" },
          { type: "resource", title_es: "Reuniones con el maestro: hoja de consejos (Illinois Early Learning Project)", es: "https://illinoisearlylearning.org/es/tipsheets/conferences-sp", title_en: "Parent-Teacher Conferences: Tip Sheet (Illinois Early Learning Project)", en: "https://illinoisearlylearning.org/tipsheets/conferences" },
          { type: "resource", title_es: "Preguntas para llevar a la reunión con el maestro (Understood)", es: "https://www.understood.org/es-mx/articles/checklist-questions-to-ask-at-your-parent-teacher-conference", title_en: "Questions to Ask at Your Parent-Teacher Conference (Understood)", en: "https://www.understood.org/en/articles/checklist-questions-to-ask-at-your-parent-teacher-conference" },
          { type: "resource", title_es: "Consejos para hablar con los maestros sobre el rendimiento escolar (Saber es Poder)", es: "https://saberespoder.com/articles/education/consejos-para-hablar-del-rendimiento-escolar-de-su-hijo-con-sus-maestros" },
          { type: "resource", title_es: "Preguntas para hacerle al director de la escuela (Keep Learning California)", es: "https://keeplearningca.org/es/recursos-para-familias/preguntas-que-los-padres-deberian-de-hacerle-a-los-directores/", title_en: "Questions Parents Should Ask School Leaders (Keep Learning California)", en: "https://keeplearningca.org/resources-for-families/questions-parents-should-ask" },
          { type: "resource", title_es: "Preguntas y pasos para que su hijo o hija triunfe en la escuela (Departamento de Educación de EE. UU.)", es: "https://www2.ed.gov/documents/family-community/parent-checklist-es.pdf", title_en: "Questions and Steps for Children to Succeed in School (U.S. Department of Education)", en: "https://www2.ed.gov/documents/family-community/parent-checklist.pdf" }
        ] },
        { title_es: "Matemáticas, educación especial e inglés", title_en: "Math, special education and English learners", items: [
          { type: "resource", topic: "math", title_es: "Lista de preguntas sobre matemáticas para la conferencia de padres y maestros (Understood; PDF de una página)", es: "https://cdn-assets.understood.org/p0qf7j048i0q/5d0Jz4e6LCJ5YnA8BubfPI/d92f6aab5703f2311af6b897a196b606/Preguntas_de_matem__ticas_para_la_reuni__n_de_padres_y_maestros_Understood.pdf", title_en: "Parent-Teacher Conference Checklist for Math (Understood; one-page PDF)", en: "https://cdn-assets.understood.org/p0qf7j048i0q/3aKsBwV58UzhwJ01JM2RDf/5f395c57e7918c754228ac3c82363bf0/Parent-Teacher_Conference_Checklist_for_Math_Understood.pdf" },
          { type: "resource", topic: "math", title_es: "Dificultad con las matemáticas: cómo iniciar la conversación con el maestro de su hijo (Understood)", es: "https://www.understood.org/es-mx/articles/math-trouble-conversation-starters-to-use-with-your-childs-teacher", title_en: "Math Trouble: Conversation Starters to Use With Your Child’s Teacher (Understood)", en: "https://www.understood.org/en/articles/math-trouble-conversation-starters-to-use-with-your-childs-teacher" },
          { type: "resource", topic: "sped", title_es: "Preguntas frecuentes de las familias sobre la educación especial (Center for Parent Information and Resources)", es: "https://www.parentcenterhub.org/lg1sp/", title_en: "Questions Often Asked by Parents About Special Education Services (Center for Parent Information and Resources)", en: "https://www.parentcenterhub.org/lg1/" },
          { type: "resource", topic: "sped", title_es: "El camino de la educación especial (Departamento de Educación de Arizona)", es: "https://www.azed.gov/sites/default/files/2020/12/Traveling%20the%20Special%20Education%20Highway%20Spa%20%2719%20acc.pdf", title_en: "Traveling the Special Education Highway (Arizona Department of Education)", en: "https://www.azed.gov/sites/default/files/2016/12/Traveling%20the%20Special%20Education%20Highway%20%2719.pdf" },
          { type: "resource", title_es: "Guía para familias de estudiantes aprendiendo inglés (Education Northwest)", es: "https://educationnorthwest.org/sites/default/files/resources/parent-guide-el-spanish.pdf", title_en: "Parent Guide for English Learners (Education Northwest)", en: "https://educationnorthwest.org/sites/default/files/resources/parent-guide-el-english.pdf" }
        ] },
        { topic: "family", title_es: "Participar en la escuela", title_en: "Getting involved at school", items: [
          { type: "resource", title_es: "Cómo participar en las actividades escolares (Colorín Colorado)", es: "https://www.colorincolorado.org/es/articulo/participaci%C3%B3n-de-los-padres-c%C3%B3mo-mantenerse-involucrado-en-las-actividades-escolares-de-su", title_en: "Parent Participation: Getting Involved in School Activities (Colorín Colorado)", en: "https://www.colorincolorado.org/article/parent-participation-how-get-involved-your-childs-school-activities" },
          { type: "resource", title_es: "Escuelas y familias: colección de artículos (Colorín Colorado)", es: "https://www.colorincolorado.org/es/node/36889/articles", title_en: "Schools and Families: Article Collection (Colorín Colorado)", en: "https://www.colorincolorado.org/node/36889/articles" },
          { type: "resource", topic: "sped", title_es: "Biblioteca de recursos para familias (Encircle Families)", es: "https://encirclefamilies.org/es/resources/", title_en: "Family Resource Library (Encircle Families)", en: "https://encirclefamilies.org/resources/" },
          { type: "resource", title_en: "Family Engagement (Arizona Department of Education)", en: "https://www.azed.gov/titlei/familyengagement" },
          { type: "resource", title_en: "Arizona PTA", en: "https://azpta.org" }
        ] },
        { title_es: "Quién decide en su distrito", title_en: "Who decides in your district", items: [
          { type: "resource", title_en: "Arizona School Boards Association", en: "https://azsba.org" },
          { type: "resource", title_en: "Maricopa County: District Superintendents", en: "https://mcss.knack.com/school-districts#district-superintendents" },
          { type: "resource", title_en: "Maricopa County: Governing Board Members", en: "https://mcss.knack.com/school-districts#governing-board-members" },
          { type: "resource", title_en: "Pima County: Governing Board Members and Terms", en: "https://www.schools.pima.gov/elections/governing-board-members-and-terms" },
          { type: "resource", title_en: "Yuma County: School Board Members", en: "https://yumaesa.org/board-members.html" }
        ] }
      ] },
    MREAD: { id: "PEA-M07", topic: "literacy",
      es: "Este curso presenta las habilidades fundamentales de la lectura y cómo puede verse una enseñanza eficaz mientras los estudiantes se desarrollan como lectores. Las familias aprenden a reconocer señales de que un estudiante podría necesitar apoyo adicional, revisan preguntas para el personal educativo y practican cómo abogar por una enseñanza de lectura apropiada y al nivel de grado.",
      en: "This course introduces foundational reading skills and what effective literacy instruction can look like as students develop as readers. Families learn how to recognize signs that a student may need additional support, review questions they can ask educators, and practice advocating for appropriate, grade-level literacy instruction.",
      /* 4T materials from the 4T class folder (Danny Hernández, 2026-10-26), PDFs only, all shared "anyone with the
         link": worksheet ES + EN v1.0.0, family handout ES + EN v1.1.1 (Hoja familiar) and the communication tool
         ES v2.0.0 (Spanish only, cohort-neutral), which replaces the FA26 BIL v1_0_1 tool. The small-group guide is
         staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1OTVVzclBvqOSSzfi3-4WRYGXrSsDpM6z/view?usp=drivesdk", en: "https://drive.google.com/file/d/1gAWLxHCoVbXtBJWmLH4DyGjsuRAgIfVj/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/10G869cFJcfTOEWRNfRnKpkldH9J14YZe/view?usp=drivesdk", en: "https://drive.google.com/file/d/1MdKyK84TxHrpZXQdGBTTwEL7YQrj-Xf1/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1Lr8OQYkmmU2RLyb4EvPkakjwYquqEIym/view?usp=drivesdk" }],
      /* 4T resources (Danny Hernández, 2026-10-27), chosen from Danny's 39-item literacy list for this class's focus:
         what reading looks like by age and grade, signs a student needs support, and where to get help. Since
         v0.22.16 the card sorts them itself: rows with a Spanish link go under Additional resources, English-only rows
         under Other resources; groups keep their titles in both. No Spanish version found for AdLit or Find Your
         Parent Center (web search, 2026-10-27). Featured: Read On Arizona (Danny, 2026-10-27). v0.22.17: added the
         links the FA26 4T deck uses (Canva DAHSSjcFSGI, slides and presenter notes): the two class videos (language
         not verified, so one link for both pages), Access Group, Colorín Colorado, Reading Rockets and the FCRR
         activity PDFs (the deck's second PDF was on fcrr.fsu.acsitefactory.com; the same path on fcrr.org is used).
         Seek Common Ground's family guides (ES | EN) added at Danny's request (2026-10-27); they were written for the
         2020–21 school year. Links not checked from the build environment (DNS blocked). */
      featured: [{ type: "resource", title_es: "Ayude a su niño a aprender a leer (Colorín Colorado)", es: "https://www.colorincolorado.org/es/families/ayude-su-ni%C3%B1o-aprender-leer",
          title_en: "Help Your Child Learn to Read (Colorín Colorado)", en: "https://www.colorincolorado.org/help-your-child-learn-read" },
        { type: "resource", title_es: "Conversar para aprender: hablar, leer y aprender con niños pequeños (Read On Arizona)", es: "https://readonarizona.org/resources/conversar-para-aprender/",
          title_en: "Smart Talk: talk, read and learn with young children (Read On Arizona)", en: "https://readonarizona.org/resources/smart-talk/" }],
      resources: [
        { title_es: "Lo que se espera en cada edad y grado", title_en: "What to expect at each age and grade", items: [
          { type: "resource", title_es: "Habilidades lectoras a diferentes edades (Understood)", es: "https://www.understood.org/es-mx/articles/reading-skills-what-to-expect-at-different-ages",
            title_en: "Reading Skills: What to Expect at Different Ages (Understood)", en: "https://www.understood.org/en/articles/reading-skills-what-to-expect-at-different-ages" },
          { type: "resource", title_es: "La lectura: lo que se espera en cada grado (GreatSchools)", es: "https://www.greatschools.org/gk/crianza/milestones-temas/la-lectura?lang=es",
            title_en: "Reading Milestones by Grade (GreatSchools)", en: "https://www.greatschools.org/gk/parenting/milestones-subjects/milestones-reading" },
          { type: "resource", title_es: "Guías familiares: lo que su hijo o hija aprende en cada grado (Seek Common Ground)", es: "https://seekcommonground.org/guias-familiares",
            title_en: "Family Guides: what your child learns in each grade (Seek Common Ground)", en: "https://seekcommonground.org/family-guides" },
          { type: "resource", title_en: "AdLit: All About Adolescent Literacy (grades 4–12)", en: "https://www.adlit.org" }
        ] },
        { topic: "sped", title_es: "Si su hijo o hija necesita más apoyo", title_en: "If your child needs more support", items: [
          { type: "resource", title_en: "Find Your Parent Center: help for children with disabilities or learning difficulties", en: "https://www.parentcenterhub.org/find-your-center" }
        ] },
        { title_es: "Videos de la clase", title_en: "Videos from class", items: [
          { type: "resource", title_es: "Video: Jade cuenta cómo vive la dificultad para leer", title_en: "Video: Jade describes her reading challenges", any: "https://youtu.be/dXg2oY6fC8w" },
          { type: "resource", title_es: "Video: un ejemplo de práctica de conciencia fonológica", title_en: "Video: phonological awareness practice in action", any: "https://youtu.be/gaodKlCjwUg?t=60" }
        ] },
        { title_es: "Cómo se enseña a leer", title_en: "How reading is taught", items: [
          /* Go Beyond Grades reading questions, K–8 (Danny Hernández, 2026-11-10): the ES PDF is dated October 2026; the EN
             PDF's file name says "Science of Reading" but it is "Questions to Ask Your Child's Teacher About Reading". */
          { type: "resource", title_es: "Preguntas para hacerle al maestro sobre la lectura, de kínder a 8.º grado (Go Beyond Grades; PDF de 2 páginas)", es: "https://gobeyondgrades.org/wp-content/uploads/2026/10/Lectura-k-8-oct-2026.pdf",
            title_en: "Questions to Ask Your Child’s Teacher About Reading, grades K–8 (Go Beyond Grades; 2-page PDF)", en: "https://gobeyondgrades.org/wp-content/uploads/2026/10/Science-of-Reading-oct-2026.pdf" },
          { type: "resource", title_en: "What Parents Should Know About Reading Instruction (Access Group)", en: "https://accessgroupinc.org/what-parents-should-know-about-reading-instruction/" },
          { type: "resource", title_es: "Colorín Colorado: lectura para familias (sitio en español)", es: "https://www.colorincolorado.org/es", title_en: "Colorín Colorado: reading for families", en: "https://www.colorincolorado.org" },
          { type: "resource", title_en: "Reading Rockets", en: "https://www.readingrockets.org" }
        ] },
        { title_es: "Actividades para practicar en casa", title_en: "Activities to practice at home", items: [
          { type: "resource", title_en: "Letter-Sound Bingo (Florida Center for Reading Research, PDF)", en: "https://fcrr.org/sites/g/files/upcbnu2836/files/media/PDFs/student_center_activities/k1_phonics/k1_letter_sound_correspondence/k1_p022_letter_sound_bingo.pdf" },
          { type: "resource", title_en: "Vowel Stars (Florida Center for Reading Research, PDF)", en: "https://fcrr.org/sites/g/files/upcbnu2836/files/media/PDFs/student_center_activities/k1_phonics/k1_encoding_and_decoding/k1_p034_vowel_stars.pdf" },
          { type: "resource", title_en: "Reading Activities for Families (Florida Center for Reading Research)", en: "https://fcrr.org/families" },
          { type: "resource", title_en: "Storyline Online: picture books read aloud by actors (SAG-AFTRA Foundation)", en: "https://storylineonline.net" }
        ] }
      ] },
    MHOME: { id: "PEA-M08", topic: "literacy",
      es: "Este curso se enfoca en formas prácticas y culturalmente relevantes de apoyar el desarrollo de la lectura en casa y en cualquier idioma. Las familias practican estrategias para leer juntas, hacer preguntas, ampliar el vocabulario y crear rutinas que fortalezcan la confianza y conecten la lectura en casa con el aprendizaje escolar.",
      en: "This course focuses on practical, culturally responsive ways families can support reading development at home and in any language. Participants practice strategies for reading together, asking questions, building vocabulary, and creating routines that strengthen confidence and connect home literacy experiences with classroom learning.",
      /* 4R materials from the 4R class folder (Danny Hernández, 2026-10-26), PDFs only, all shared "anyone with the
         link": worksheet ES + EN v1.0.0, family handout ES + EN v1.0.0 (Volante familiar / Family handout) and the
         communication tool BIL v2.0.0 (for Spanish-speaking families, so it is listed as the Spanish version), which
         replaces the FA26 BIL v1_1_0 tool. The small-group guide is staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1errhRqTNpWvslo6nxtPtxJRbUTP6zArV/view?usp=drivesdk", en: "https://drive.google.com/file/d/1-8W8czqErHwMBVcUGRom5cGJAX8AXl-H/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1ZHY0Qb2ci4iEshxnoHaedqWjHg8J6dAV/view?usp=drivesdk", en: "https://drive.google.com/file/d/1odG3YHIspLJD1Ac8qeyrHQPTnpwMHN6H/view?usp=drivesdk" },
        /* Reading-levels reference sheet (Lexile, AASA, Move On When Reading, AZELLA, guided-reading letters), ES v1.0.0,
           Spanish only, shared "anyone with the link" (Danny Hernández, 2026-10-30). */
        { type: "handout", title_es: "Entender los niveles de lectura: hoja de referencia", es: "https://drive.google.com/file/d/1q7FLw2xhztp9WLlVNI0Vgzyrv8pA1k20/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1YRAzUB8Mq3FF4CxszoKltNYK9_Tj7WKQ/view?usp=drivesdk" }],
      /* 4R resources (Danny Hernández, 2026-10-27), chosen from Danny's 39-item literacy list: 18 rows in three closed
         groups (reading at home, finding books, free library cards). ES and EN versions share a row; specific resources
         come before general sites. Colorín Colorado's English page is the counterpart of the Spanish one on the list
         (colorincolorado.org/help-your-child-learn-read, found by web search). Unite for Literacy and the Lexile book
         search are one site for both languages, so they use `any`; the Lexile search interface is in English but
         filters Spanish books. Phoenix pairs its Spanish portal with the English eCard page. Left out: Kanopy (films),
         Kids Need to Read (serves organizations), U.S. ED early learning (not literacy), Reading Rockets "About",
         the Colorín Colorado homepage (the specific page is listed), Scholastic (book sales), Seek Common Ground
         guides (2020–21 school year), Stand for Children (URL does not reach Growing Readers) and the "Jade, 8th
         grade" video (publisher unverified). v0.22.16 (Danny, 2026-10-27): Read On Arizona moved to Featured; PBS KIDS
         paired with its Spanish parents page (pbs.org/es/parents, found by web search). English-only rows show under
         Other resources. v0.22.17: added the links the FA26 4R deck uses (Canva DAHSShcTYCI, presenter notes): Access
         Group, Flocabulary, two Common Sense Media lists, Scholastic Top 25 picture books, Read Brightly (2020 list)
         and Scholastic's Lexile guide; all English only. Links not checked from the build environment (DNS blocked). */
      featured: [{ type: "resource", title_es: "Ayude a su niño a aprender a leer (Colorín Colorado)", es: "https://www.colorincolorado.org/es/families/ayude-su-ni%C3%B1o-aprender-leer",
          title_en: "Help Your Child Learn to Read (Colorín Colorado)", en: "https://www.colorincolorado.org/help-your-child-learn-read" },
        { type: "resource", title_es: "Conversar para aprender: hablar, leer y aprender con niños pequeños (Read On Arizona)", es: "https://readonarizona.org/resources/conversar-para-aprender/",
          title_en: "Smart Talk: talk, read and learn with young children (Read On Arizona)", en: "https://readonarizona.org/resources/smart-talk/" }],
      resources: [
        { title_es: "Leer en casa", title_en: "Reading at home", items: [
          { type: "resource", title_en: "Literacy at Home (Reading Rockets)", en: "https://www.readingrockets.org/literacy-home" },
          { type: "resource", title_en: "What Parents Should Know About Reading Instruction (Access Group)", en: "https://accessgroupinc.org/what-parents-should-know-about-reading-instruction/" },
          { type: "resource", title_en: "3rd Grade Vocabulary Word List (Flocabulary)", en: "https://www.flocabulary.com/3rd-grade-vocabulary-word-list/" },
          { type: "resource", title_en: "Reading Activities for Families (Florida Center for Reading Research)", en: "https://fcrr.org/families" },
          { type: "resource", title_en: "Games to Support Early Literacy Skills (Rhode Island Department of Education)", en: "https://ride.ri.gov/sites/g/files/xkgbur806/files/IAC/StructuredLiteracy/GamesToSupportEarlyLiteracySkills-Sept2020.pdf" },
          { type: "resource", title_es: "Recursos en español para la primera infancia (First Things First)", es: "https://www.firstthingsfirst.org/recursos-en-espanol",
            title_en: "Parent Resources for Early Childhood (First Things First)", en: "https://www.firstthingsfirst.org/resources" },
          { type: "resource", title_es: "PBS KIDS para padres y cuidadores (en español)", es: "https://www.pbs.org/es/parents", title_en: "PBS KIDS for Parents", en: "https://www.pbs.org/parents/" }
        ] },
        { title_es: "Encontrar libros", title_en: "Finding books", items: [
          { type: "resource", title_es: "Unite for Literacy: libros digitales gratis con narración en español y otros idiomas", title_en: "Unite for Literacy: free digital picture books with narration in many languages", any: "https://www.uniteforliteracy.com" },
          { type: "resource", title_es: "Medidas Lexile en su hogar (guía en PDF)", es: "https://lexile.com/wp-content/uploads/2017/09/Lexile-Home-Spanish.pdf" },
          { type: "resource", title_es: "Buscar libros por nivel Lexile, también en español (sitio en inglés)", title_en: "Find a Book by Lexile Measure", any: "https://hub.lexile.com/find-a-book/search" },
          { type: "resource", title_en: "Roving Readers: read-aloud books on social justice (Social Justice Books)", en: "https://socialjusticebooks.org/booklists/roving-readers" },
          { type: "resource", title_es: "Common Sense Media: reseñas de contenidos según la edad para las familias", es: "https://www.commonsensemedia.org/es",
            title_en: "Book Reviews by Age (Common Sense Media)", en: "https://www.commonsensemedia.org/book-reviews" },
          { type: "resource", title_en: "50 Books All Kids Should Read Before They’re 12 (Common Sense Media)", en: "https://www.commonsensemedia.org/lists/50-books-all-kids-should-read-before-theyre-12" },
          { type: "resource", title_en: "Book Lists by Age and Topic (Common Sense Media)", en: "https://www.commonsensemedia.org/book-lists" },
          { type: "resource", title_en: "Teacher Picks: Top 25 Picture Books (Scholastic)", en: "https://www.scholastic.com/teachers/teaching-tools/book-lists/teacher-picks--top-25-picture-books.html" },
          { type: "resource", title_en: "Award-Winning Picture Books, 2020 (Read Brightly)", en: "https://www.readbrightly.com/picture-books-2020/" },
          { type: "resource", title_en: "Lexile Levels Made Easy (Scholastic)", en: "https://www.scholastic.com/parents/books-and-reading/reading-resources/book-selection-tips/lexile-levels-made-easy.html" },
          { type: "resource", title_en: "Storyline Online: picture books read aloud by actors (SAG-AFTRA Foundation)", en: "https://storylineonline.net" }
        ] },
        /* `whole`: the six libraries stay together under Additional resources instead of being split by
           language (Danny Hernández, 2026-10-30). */
        { title_es: "Tarjeta de biblioteca gratis", title_en: "Free library cards", whole: true, items: [
          { type: "resource", title_es: "Biblioteca Pública de Phoenix (en español)", es: "https://www.phoenixpubliclibrary.org/espanol",
            title_en: "Phoenix Public Library: eCard Registration", en: "https://www.phoenixpubliclibrary.org/services/borrowing/ecard-registration" },
          { type: "resource", title_en: "Greater Phoenix Digital Library: Library Cards", en: "https://phoenix.overdrive.com/support/card" },
          { type: "resource", title_es: "Biblioteca del Condado de Yuma: tarjeta electrónica", es: "https://yumalibrary.org/tarjeta-electronica",
            title_en: "Yuma County Library: eCard Registration", en: "https://yumalibrary.org/quipu-ecard" },
          { type: "resource", title_en: "Pima County Public Library: Get a Library Card", en: "https://www.library.pima.gov/getalibrarycard" },
          { type: "resource", title_en: "Pinal County Library District", en: "https://www.pinal.gov/639/Library-District" },
          { type: "resource", title_en: "Casa Grande Public Library", en: "https://casagrandeaz.gov/library" }
        ] }
      ] },
    MDIGI: { id: "PEA-M09", topic: "digital",
      es: "Este curso presenta conceptos de alfabetización digital que afectan a estudiantes y familias, incluyendo la seguridad en línea, el uso de medios, la desinformación, la privacidad y el acceso a herramientas de aprendizaje. Las personas participantes practican cómo evaluar información digital e identifican estrategias y recursos para orientar el uso responsable de la tecnología, comunicarse con las escuelas y apoyar el aprendizaje en casa.",
      en: "This course introduces digital literacy concepts that affect students and families, including online safety, media use, misinformation, privacy, and access to learning tools. Participants practice evaluating online information and identify strategies and resources for guiding responsible technology use, communicating with schools, and supporting learning at home.",
      /* 5T materials from the FA26 5T MDIGI Materials folder (Danny Hernández, 2026-11-03), PDFs only, all shared
         "anyone with the link": worksheet ES + EN v1.1.0, family handout ES + EN v1.1.0 (Hoja informativa / Family
         handout) and the communication tool BIL v2.1.0, one bilingual file for both pages. They replace the FA26 BIL
         v1.0.0 tool, which is now in the Drive trash. The facilitator guide, small-group guide and deck corrections are
         staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1kYQVJsyWTqPS7OcsyOyA-MDq07GhtCAf/view?usp=drivesdk", en: "https://drive.google.com/file/d/1hYy5gxBym34jpWX-rhI4_UttzeZmraby/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1HU0Ay4Llujul0Ma-W10mTaYnjvZxY9MI/view?usp=drivesdk", en: "https://drive.google.com/file/d/1ximcFruV_nOrKhrtCLsL8ri5-fm_-Sdd/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1YszfWlhumy8TUjyqLlN99duDsNelQOgt/view?usp=drivesdk", en: "https://drive.google.com/file/d/1YszfWlhumy8TUjyqLlN99duDsNelQOgt/view?usp=drivesdk" }],
      /* 5T resources (Danny Hernández, 2026-11-03): Danny's 17-line list, reviewed and grouped, plus the resource
         list from Delia Padilla's guest seminar deck (Prácticas seguras en internet y seguridad en línea; the decks
         themselves stay internal). Duplicates merged: AT&T ScreenReady (listed twice), the
         WhatsApp misinformation FAQ (now linked directly, not through Google Translate), the U.S. Department of
         Education digital learning guide and Common Sense Media are ES | EN rows. Spanish versions found by web
         search, 2026-11-03: NetSmartz (NCMEC.org/NetSmartz/es), ConnectSafely quick guides, HealthyChildren.org
         family media plan (replaces the aap.org home page), Child Mind Institute, StopBullying.gov, MHA screening,
         NAMI support groups and 988 Lifeline (988lineadevida.org). Stop.Think.Connect. is now CISA's Secure Our World
         (Spanish tip sheets on its translated-resources page). El Detector's WhatsApp number (+1 305 447 2910) is the
         one Univision's Instagram lists; older articles give +1 786 685 8284. Links not checked from the build
         environment (network blocked). Codex review (PR #54): the ScreenReady digital-literacy URL returned 404, so the
         row links ScreenReady's adults-and-seniors page; both Cox Digital Academy links redirect to a low-cost internet
         sales page, so the row is left out until Danny finds the current page. Microsoft Family Safety removed at
         Danny's request (2026-11-03); Danny checked every other link on the live site. */
      featured: [{ type: "resource", title_es: "Common Sense Media: reseñas de contenidos según la edad para las familias", es: "https://www.commonsensemedia.org/es",
          title_en: "Common Sense Media: age-based media reviews for families", en: "https://www.commonsensemedia.org/" },
        { type: "resource", title_es: "Aprender a usar la tecnología: recursos para adultos (AT&T ScreenReady; sitio en inglés)", title_en: "Learning resources for adults and seniors (AT&T ScreenReady)", any: "https://screenready.att.com/adults-seniors/" }],
      resources: [
        { title_es: "Seguridad en línea y ciudadanía digital", title_en: "Online safety and digital citizenship", items: [
          { type: "resource", title_es: "Guía de aprendizaje digital para padres y familias (Departamento de Educación de EE. UU.)", es: "https://tech.ed.gov/publications/digital-learning-guide/parent-family-es/",
            title_en: "Parent and Family Digital Learning Guide (U.S. Department of Education)", en: "https://tech.ed.gov/publications/digital-learning-guide/parent-family/" },
          { type: "resource", title_es: "NetSmartz: videos y guías sobre seguridad en internet para niños y familias (NCMEC)", es: "https://ncmec.org/NetSmartz/es",
            title_en: "NetSmartz: internet safety lessons and videos for kids (NCMEC)", en: "https://www.missingkids.org/netsmartz" },
          { type: "resource", title_es: "Guías rápidas sobre aplicaciones y seguridad, algunas en español (ConnectSafely; sitio en inglés)", es: "https://connectsafely.org/quickguides/",
            title_en: "Parent Guides: apps, safety and parenting (ConnectSafely)", en: "https://connectsafely.org/parentguides/" },
          { type: "resource", title_es: "Secure Our World: hojas de consejos de ciberseguridad en español (CISA; página en inglés)", es: "https://www.cisa.gov/secure-our-world/translated-resources",
            title_en: "Secure Our World: cybersecurity tips (CISA)", en: "https://www.cisa.gov/secure-our-world" },
          { type: "resource", title_en: "Protecting Kids Online (Federal Trade Commission)", en: "https://consumer.ftc.gov/identity-theft-and-online-security/protecting-kids-online" },
          { type: "resource", title_en: "StaySafeOnline: cybersecurity tips for families (National Cybersecurity Alliance)", en: "https://staysafeonline.org" },
          { type: "resource", title_en: "Internet Matters: advice for keeping kids safe online (UK)", en: "https://www.internetmatters.org" }
        ] },
        { title_es: "Controles parentales y hábitos saludables", title_en: "Parental controls and healthy habits", items: [
          { type: "resource", title_es: "Plan familiar de uso de pantallas (Academia Americana de Pediatría, HealthyChildren.org)", es: "https://www.healthychildren.org/Spanish/fmp/Paginas/MediaPlan.aspx",
            title_en: "Family Media Plan (American Academy of Pediatrics, HealthyChildren.org)", en: "https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx" },
          { type: "resource", title_es: "Google Family Link: controles parentales", es: "https://families.google.com/intl/es-419/familylink/",
            title_en: "Google Family Link: parental controls", en: "https://families.google.com/familylink/" },
          { type: "resource", title_es: "Centro de Seguridad de Google: familias", es: "https://safety.google/intl/es-419/families/",
            title_en: "Google Safety Center: families", en: "https://safety.google/families/" }
        ] },
        { title_es: "Verificar antes de compartir", title_en: "Check before you share", items: [
          { type: "resource", title_es: "El Detector: verificación de datos en español (Univision Noticias)", es: "https://www.univision.com/especiales/noticias/detector" },
          { type: "resource", title_es: "📱 Envíe a El Detector lo que quiere verificar por WhatsApp: +1 (305) 447-2910", es: "https://wa.me/13054472910" },
          { type: "resource", title_es: "✉️ O por correo electrónico: eldetector@univision.net", es: "mailto:eldetector@univision.net" },
          { type: "resource", title_es: "Factchequeado: contra la desinformación en las comunidades latinas de EE. UU.", es: "https://factchequeado.com/quienes-somos" },
          { type: "resource", title_es: "WhatsApp: cómo prevenir la difusión de información errónea", es: "https://faq.whatsapp.com/431498999157251/?locale=es_LA",
            title_en: "WhatsApp: how to prevent the spread of misinformation", en: "https://faq.whatsapp.com/431498999157251/?locale=en_US" },
          { type: "resource", title_en: "Snopes: fact checks", en: "https://www.snopes.com/fact-check/" }
        ] },
        { title_es: "Inteligencia artificial", title_en: "Artificial intelligence", items: [
          { type: "resource", title_es: "AI & You: aprenda qué es la inteligencia artificial y cómo usarla", es: "https://aiandyou.org/es/",
            title_en: "AI & You: learn what artificial intelligence is and how to use it", en: "https://aiandyou.org/" }
        ] },
        { topic: "safety", title_es: "Bienestar y ayuda en una crisis", title_en: "Well-being and crisis support", items: [
          { type: "resource", title_es: "988 Línea de Prevención del Suicidio y Crisis: llame al 988 y marque 2, o envíe AYUDA al 988", es: "https://988lineadevida.org",
            title_en: "988 Suicide & Crisis Lifeline: call or text 988", en: "https://988lifeline.org" },
          { type: "resource", title_es: "Crisis Text Line: envíe AYUDA al 741741 o escriba al 442-AYUDAME por WhatsApp (sitio en inglés)",
            title_en: "Crisis Text Line: free 24/7 support by text, text HOME to 741741", any: "https://www.crisistextline.org" },
          { type: "resource", title_es: "Child Mind Institute: tiempo frente a las pantallas, ansiedad y apoyo para padres", es: "https://childmind.org/es/",
            title_en: "Child Mind Institute: screen time, anxiety and parenting support", en: "https://childmind.org/" },
          { type: "resource", title_es: "StopBullying.gov: prevenir el acoso escolar y el ciberacoso", es: "https://espanol.stopbullying.gov",
            title_en: "StopBullying.gov: bullying and cyberbullying prevention", en: "https://www.stopbullying.gov" },
          { type: "resource", title_es: "Pruebas de salud mental gratuitas y confidenciales (Mental Health America)", es: "https://screening.mhanational.org/es/",
            title_en: "Free, confidential mental health screening (Mental Health America)", en: "https://screening.mhanational.org/" },
          { type: "resource", title_es: "Grupos de apoyo en español (NAMI)", es: "https://www.nami.org/support-groups/los-grupos-de-apoyo/",
            title_en: "NAMI: support groups and resources", en: "https://www.nami.org" },
          { type: "resource", title_en: "The Trevor Project: support and crisis help for LGBTQ+ young people", en: "https://www.thetrevorproject.org" }
        ] }
      ] },
    MRGHT: { id: "PEA-M10", topic: "rights",
      es: "Este curso presenta los derechos y las responsabilidades clave de las familias y los estudiantes en la educación pública de Arizona, incluyendo protecciones para aprendices de inglés, estudiantes con discapacidades y familias con estatus migratorio mixto. Las personas participantes aprenden dónde encontrar información confiable, cómo expresar inquietudes y qué rutas de defensa pueden proteger el acceso, la inclusión y el éxito estudiantil.",
      en: "This course introduces key rights and responsibilities of families and students in Arizona public education, including protections for English Learners, students with disabilities, and mixed-status families. Participants learn where to locate reliable information, how to raise concerns, and which advocacy pathways can help protect access, inclusion, and student success.",
      /* 5R materials from the MRGHT session-materials folder (Drive 1TWCWZICHDtuhXI04CcHIXH7RUt-cysv2; Danny Hernández,
         2026-11-05), the most recent PDF of each file (built 2026-11-05), all checked as shared "anyone with the link":
         worksheet ES + EN v4.1.0, family handout ES + EN v4.4.0 (Volante familiar / Family handout), the communication
         tool BIL v5.1.0 (one bilingual file for both pages) and the rights reference ES + EN v2.1.0. They replace the
         worksheet and communication tool held back on 2026-10-06. The facilitator guide ES v2.3.0, the small-group guide
         BIL v4.1.0, the deck-corrections notes and the DOCX sources are staff-only and not published; older versions
         in the folder (v2.0.0, v3.0.0) and the duplicate Volante_Familiar_ES_v4_4_0.pdf are not linked. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1w5cSQtoAp0XA6fis2SERxRvygvDBqZKq/view?usp=drivesdk", en: "https://drive.google.com/file/d/1B94xf-4SKMklC4YxIYjt_ar0xaoPVQVg/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1VAtan9bku6zDMODzcWUcwBC6XjJW7EOe/view?usp=drivesdk", en: "https://drive.google.com/file/d/1S0Ez2KCbksvOvDCtuQkVetQ4SGNTZRgr/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1vbz7uQmfJXGyXUienjs_97sTo-t1Z0Q8/view?usp=drivesdk", en: "https://drive.google.com/file/d/1vbz7uQmfJXGyXUienjs_97sTo-t1Z0Q8/view?usp=drivesdk" },
        { type: "handout", title_es: "Referencia de derechos de padres y estudiantes", es: "https://drive.google.com/file/d/10kVvoGvBD65Ub8jgPIcu1VrF8uobKfDj/view?usp=drivesdk",
          title_en: "Parent and Student Rights Reference", en: "https://drive.google.com/file/d/1_mmL4ypWr8_hxtNC1cOxkwuWNmt07xIw/view?usp=drivesdk" }],
      /* 5R resources (Danny Hernández, 2026-11-05): Danny's reviewed list "Parent and Student Education Rights", kept in
         his six sections and order; every row has a Spanish version, so all sit under Recursos adicionales. One link
         for both pages (`any`): the IDRA bilingual infographic (Aug 2025; supersedes the 2017 IDRA handout), Aliento's
         and ILRC's bilingual collections, and Abriendo Puertas' Spanish video with English subtitles. Edition notes
         kept in the titles: ADE handbooks are August 2023 (check current law and district policy); MALDEF is an older
         introductory pamphlet. Replacements per Danny's list: NILC fact sheets replace inaccessible SPLC pages and
         unverified Drive copies; HealthyChildren IEP/504 replaces English-only legal sites; studentprivacy.ed.gov FERPA
         replaces duplicate FERPA links; ILRC red cards replace the Drive cards labelled NILC; iAmerica /es/ replaces
         the obsolete /conozca-sus-derechos; the National Archives Mendez pages replace the YouTube pair (related, not
         exact translations). Special education → Educación especial; Mendez → Historia e identidad. Encircle Families
         (formerly Raising Special Kids; use only the current name) website and resource library added to the special
         education group (Danny Hernández, 2026-11-06); the library also sits on 3R, now tagged sped. Links not opened
         from the build environment. */
      resources: [
        { title_es: "Derechos de los padres en Arizona: escuelas del distrito y chárter", title_en: "Arizona parent rights: district and charter schools", items: [
          { type: "resource", title_es: "Manual de derechos parentales: distritos escolares públicos (Departamento de Educación de Arizona, agosto de 2023)", es: "https://www.azed.gov/sites/default/files/2023/08/Manual%20de%20Derechos%20Parentales%20-%20Public%20District%20Schools.pdf",
            title_en: "Parental Rights Handbook: Public School Districts (Arizona Department of Education, August 2023)", en: "https://www.azed.gov/sites/default/files/2023/08/Parent_Rights_Handbook_Public_District_Schools_2023_Final.pdf" },
          { type: "resource", title_es: "Manual de derechos parentales: escuelas chárter públicas (Departamento de Educación de Arizona, agosto de 2023)", es: "https://www.azed.gov/sites/default/files/2023/08/Manual%20de%20Derechos%20Parentales%20-%20Public%20Charter%20Schools.pdf",
            title_en: "Parental Rights Handbook: Public Charter Schools (Arizona Department of Education, August 2023)", en: "https://www.azed.gov/sites/default/files/2023/08/Parental%20Rights%20Handbook_Public%20Charter%20Schools__2023_Final.pdf" }
        ] },
        { title_es: "Inscripción escolar, estudiantes inmigrantes e igualdad de acceso", title_en: "School enrollment, immigrant students and equal access", items: [
          { type: "resource", title_es: "Información sobre los derechos de todos los niños a matricularse en la escuela (Colorín Colorado)", es: "https://www.colorincolorado.org/es/guide/hoja-informativa-informaci%C3%B3n-sobre-los-derechos-de-todos-los-ni%C3%B1os-matricularse-en-la-escuela",
            title_en: "Information on the Rights of All Children to Enroll in School (Colorín Colorado)", en: "https://www.colorincolorado.org/guide/fact-sheet-information-rights-all-children-enroll-school" },
          { type: "resource", title_es: "Bienvenida a estudiantes inmigrantes: infografía bilingüe (IDRA, agosto de 2025)",
            title_en: "Welcoming Immigrant Students: bilingual infographic (IDRA, August 2025)", any: "https://www.idra.org/wp-content/uploads/2025/08/Welcoming-Immigrant-Students-IDRA-Infographic-English-Spanish-Aug-2025.pdf" },
          { type: "resource", title_es: "Derechos de los estudiantes inmigrantes y las escuelas (NILC)", es: "https://www.nilc.org/wp-content/uploads/2025/02/rights_for_immigrant_students_schools_spanish_0.pdf",
            title_en: "Know Your Rights: Immigrant Students and Schools (NILC)", en: "https://www.nilc.org/wp-content/uploads/2025/02/rights_for_immigrant_students_schools_0.pdf" },
          { type: "resource", title_es: "Derechos educativos federales: folleto introductorio (MALDEF; publicación anterior)", es: "https://www.maldef.org/wp-content/uploads/2018/11/derechos_educativos_federales_folleto.pdf",
            title_en: "Federal Education Rights: introductory pamphlet (MALDEF; older publication)", en: "https://www.maldef.org/wp-content/uploads/2018/11/federal_education_rights_pamphlet.pdf" }
        ] },
        { topic: "sped", title_es: "Educación especial, derechos de las personas con discapacidad y apoyos escolares", title_en: "Special education, disability rights and school supports", items: [
          { type: "resource", title_es: "Derechos de los padres bajo IDEA (Centro de Información y Recursos para Padres)", es: "https://www.parentcenterhub.org/derechos/",
            title_en: "Parental Rights Under IDEA (Center for Parent Information and Resources)", en: "https://www.parentcenterhub.org/parental-rights/" },
          { type: "resource", title_es: "Programas IEP y planes 504: guía de servicios de apoyo escolar para su hijo (HealthyChildren.org)", es: "https://www.healthychildren.org/Spanish/health-issues/conditions/developmental-disabilities/Paginas/Individualized-Education-Program.aspx",
            title_en: "IEPs and 504 Plans: A Guide to School Supports for Your Child (HealthyChildren.org)", en: "https://www.healthychildren.org/English/health-issues/conditions/developmental-disabilities/Pages/Individualized-Education-Program.aspx" },
          { type: "resource", title_es: "Encircle Families: información, programas y apoyo para familias de niños con discapacidad en Arizona", es: "https://encirclefamilies.org/es/",
            title_en: "Encircle Families: information, programs and support for Arizona families of children with disabilities", en: "https://encirclefamilies.org/" },
          { type: "resource", title_es: "Biblioteca de recursos de Encircle Families: educación especial, apoyos para discapacidad y cómo navegar los servicios", es: "https://encirclefamilies.org/es/resources/",
            title_en: "Encircle Families Resource Library: special education, disability supports and navigating services", en: "https://encirclefamilies.org/resources/" }
        ] },
        { title_es: "Expedientes, privacidad, encuestas y consentimiento", title_en: "Student records, privacy, surveys and consent", items: [
          { type: "resource", title_es: "Una guía para padres sobre la Ley de Derechos Educativos y Privacidad Familiar, FERPA (Departamento de Educación de EE. UU.)", es: "https://studentprivacy.ed.gov/es/resources/una-gu%C3%ADa-para-padres-sobre-la-ley-de-derechos-educativos-y-privacidad-familiar-ferpa",
            title_en: "A Parent Guide to the Family Educational Rights and Privacy Act, FERPA (U.S. Department of Education)", en: "https://studentprivacy.ed.gov/resources/parent-guide-family-educational-rights-and-privacy-act-ferpa" },
          { type: "resource", title_es: "Enmienda de Protección de los Derechos del Alumno (PPRA): orientación general (Departamento de Educación de EE. UU.)", es: "https://studentprivacy.ed.gov/resources/protection-pupil-rights-amendment-ppra-general-guidance-en-espa%C3%B1ol",
            title_en: "Protection of Pupil Rights Amendment (PPRA): General Guidance (U.S. Department of Education)", en: "https://studentprivacy.ed.gov/resources/protection-pupil-rights-amendment-ppra-general-guidance" }
        ] },
        { title_es: "Derechos de inmigración y preparación familiar", title_en: "Immigration rights and family preparedness", items: [
          { type: "resource", title_es: "Conoce tus derechos: volantes en español e inglés y recursos para familias (Aliento)",
            title_en: "Know Your Rights: English and Spanish flyers and family resources (Aliento)", any: "https://alientoaz.org/resources/know-your-rights" },
          { type: "resource", title_es: "Conozca sus derechos ante la aplicación de las leyes de inmigración (iAmerica)", es: "https://iamerica.org/es/know-your-rights/",
            title_en: "Know Your Rights during immigration enforcement (iAmerica)", en: "https://iamerica.org/know-your-rights/" },
          { type: "resource", title_es: "Tarjetas rojas para imprimir: ejercer sus derechos constitucionales (Immigrant Legal Resource Center)",
            title_en: "Red Cards to print: exercising your constitutional rights (Immigrant Legal Resource Center)", any: "https://www.ilrc.org/redcards" },
          { type: "resource", title_es: "Video: cómo hablar con niños pequeños sobre la incertidumbre migratoria (Abriendo Puertas; subtítulos disponibles)",
            title_en: "Video: talking with young children about immigration uncertainty (Abriendo Puertas/Opening Doors; in Spanish with English subtitles)", any: "https://ap-od.org/2025/10/30/immigration-know-your-rights/" }
        ] },
        { topic: "history", title_es: "Contexto histórico: igualdad en la educación", title_en: "Historical context: educational equality", items: [
          { type: "resource", title_es: "Mendez v. Westminster y la desegregación escolar (Archivos Nacionales)", es: "https://www.archives.gov/espanol/la-desegregacion-escolar",
            title_en: "Mendez v. Westminster School District (National Archives)", en: "https://www.archives.gov/education/lessons/mendez-case" }
        ] }
      ] },
    MMATH: { id: "PEA-M11", topic: "math",
      es: "Este curso explora cómo ha cambiado la enseñanza de las matemáticas y qué se espera que los estudiantes comprendan y demuestren en los salones actuales. Las familias revisan estrategias para fortalecer la confianza y la resolución de problemas, identifican preguntas para el personal educativo y practican cómo abogar cuando un estudiante necesita una explicación más clara o apoyo adicional.",
      en: "This course explores how mathematics instruction has changed and what students are expected to understand and demonstrate in today’s math classrooms. Families examine strategies for supporting confidence and problem solving, identify questions to ask educators, and practice advocating when a student needs clearer instruction or additional support.",
      /* 6T materials from the FA26 6T MMATH Materials folder (Drive 1jDo6tHC1kcfV5g2worPslOoI6sED-XRM; Danny Hernández,
         2026-11-10), PDFs only, all v2.0.0 (built 2026-11-10 to the Participant Materials Standard) and checked as shared
         "anyone with the link": worksheet ES + EN, family handout ES + EN (Hoja_Informativa_1_ES / Handout_1_EN, the new
         numbered handout names) and the communication tool, Spanish only. The small-group guide BIL v3.0.0, the
         facilitator guide, the deck-corrections notes and the DOCX sources are staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1gw7d0bEXVyzWWfFEzNXU2VKlp79DvmEf/view?usp=drivesdk", en: "https://drive.google.com/file/d/1oVKTUxDfWYLYO2ynTmLWYr8QDm0AF56B/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1Xzo3JW7VTGJ7q7elEp83YKVbvjJrwr9h/view?usp=drivesdk", en: "https://drive.google.com/file/d/1Ntf-uG84dFImamKXRZ8m7Nm6wT0Sp2HS/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1EN61ZhP941bb19hkxGycHbXowPI_Ywk0/view?usp=drivesdk" }],
      /* Danny Hernández, 2026-11-10: Learning Heroes Readiness Check moved to ⭐ Destacado (it was the first row of
         "Entender el aprendizaje"). Spanish link: Danny's /es/chequeo-academico-2022/ ("Readiness Check Fall –
         Spanish"; Danny Hernández, 2026-11-10), not /es/readiness-check/.
         Added: Go Beyond Grades "Preguntas para hacerle al maestro sobre las matemáticas | Questions to
         Ask Your Child's Teacher About Math" (K–8, 2 pages; the EN PDF is hosted by Learning Heroes) and National PTA
         "Ayudando a su hijo con la matemática de hoy | Helping Your Child With Today's Math" (2017, 3 pages). All
         opened and read 2026-11-10. */
      featured: [{ type: "resource", title_es: "Chequeo académico: actividades cortas para explorar las habilidades de lectura y matemáticas de su hijo o hija y encontrar recursos (Learning Heroes; herramienta para familias, no es una evaluación diagnóstica)", es: "https://bealearninghero.org/es/chequeo-academico-2022/",
        title_en: "Readiness Check: short activities to explore your child’s reading and math skills and find learning resources (Learning Heroes; a family learning tool, not a diagnostic assessment)", en: "https://bealearninghero.org/readiness-check/" } ],
      /* 6T resources (Danny Hernández, 2026-11-06): Danny's reviewed list "Mathematics: Family Learning and Advocacy",
         11 rows in four groups, all ES | EN. Link corrections from the list: Learning Heroes uses the current
         /readiness-check/ pages (not /readiness-check-02), Understood's Spanish math-skills article its current address,
         and the two conference-checklist PDFs the current cdn-assets.understood.org domain (not assets.ctfassets.net;
         3R's copies updated to match, so Materiales y recursos lists each once). Replacements for workbook entries:
         Understood "Why Math Is Taught Differently Today" (for the unmatched "What Happened to Math Class?" video);
         PBS SoCal Family Math publisher pages (for the indirect PBS toolkit link and unmatched early-learning videos,
         counting songs and English-only activity collections); Understood math-homework article (for the unverified
         Craft PDF "Ayude a su hijo en el área de matemáticas"); Khan Academy math (for platforms with no distinct
         Spanish link; the ES and EN catalogs differ, so not every lesson is translated or aligned to Arizona
         standards); Understood conversation starters (for the inaccessible supplemental advocacy guides); Child Mind
         Institute (for the English-only Edutopia article). Colorín Colorado's topic pages replace its general home
         page. Readiness Check is a family learning tool, not a diagnostic assessment. Links not checked from the build
         environment (network blocked). */
      resources: [
        { title_es: "Entender el aprendizaje y apoyar el progreso", title_en: "Understanding learning and supporting progress", items: [
          { type: "resource", title_es: "Habilidades matemáticas según la edad (Understood)", es: "https://www.understood.org/es-mx/articles/habilidades-matematicas-segun-la-edad",
            title_en: "Math Skills: What to Expect at Different Ages (Understood)", en: "https://www.understood.org/en/articles/math-skills-what-to-expect-at-different-ages" },
          { type: "resource", title_es: "Por qué actualmente las matemáticas se enseñan de manera diferente: cambios que puede notar en la tarea y en el salón (Understood)", es: "https://www.understood.org/es-mx/articles/por-que-actualmente-las-matematicas-se-ensenan-de-manera-diferente",
            title_en: "Why Math Is Taught Differently Today: changes you may notice in homework and in class (Understood)", en: "https://www.understood.org/en/articles/why-math-is-taught-differently-today" },
          { type: "resource", title_es: "Ayudando a su hijo con la matemática de hoy: guía para familias (National PTA; PDF)", es: "https://www.pta.org/docs/default-source/files/family-resources/2018/family-guides/familyguide-math-esp.pdf",
            title_en: "Helping Your Child With Today’s Math: guide for families (National PTA; PDF)", en: "https://www.pta.org/docs/default-source/files/family-resources/2018/family-guides/familyguide-math.pdf" }
        ] },
        { title_es: "Aprender y practicar matemáticas en casa", title_en: "Learning and practicing math at home", items: [
          { type: "resource", title_es: "Aprendiendo juntos: matemáticas, ideas para las rutinas y actividades en familia (Colorín Colorado)", es: "https://www.colorincolorado.org/es/families/learning-together-home/aprendiendo-juntos-matem%C3%A1ticas",
            title_en: "Learning Together at Home: Math, ideas for family routines and activities (Colorín Colorado)", en: "https://www.colorincolorado.org/learning-together-home-math" },
          { type: "resource", title_es: "Matemáticas en familia: actividades, videos y recursos para niños pequeños (PBS SoCal)", es: "https://www.pbssocal.org/educacion/family-math-en-espanol",
            title_en: "Family Math: activities, videos and resources for young children (PBS SoCal)", en: "https://www.pbssocal.org/education/pbs-socal-family-math" },
          { type: "resource", title_es: "Cómo ayudar a los niños con la tarea de matemáticas (Understood)", es: "https://www.understood.org/es-mx/articles/como-ayudar-a-los-ninos-con-la-tarea-de-matematicas",
            title_en: "How to Help Kids With Tricky Math Homework (Understood)", en: "https://www.understood.org/en/articles/how-to-help-kids-with-tricky-math-homework" },
          { type: "resource", title_es: "Matemáticas: lecciones y práctica por tema y curso (Khan Academy; los cursos en español no son todos los de inglés)", es: "https://es.khanacademy.org/math",
            title_en: "Math: lessons and practice by topic and course (Khan Academy)", en: "https://www.khanacademy.org/math" }
        ] },
        { title_es: "Hablar con el maestro y abogar por apoyo", title_en: "Talking with teachers and advocating for support", items: [
          { type: "resource", title_es: "Preguntas para hacerle al maestro sobre las matemáticas, de kínder a 8.º grado (Go Beyond Grades; PDF de 2 páginas)", es: "https://gobeyondgrades.org/wp-content/uploads/2026/08/Matematicas-K-8.pdf",
            title_en: "Questions to Ask Your Child’s Teacher About Math, grades K–8 (Go Beyond Grades; 2-page PDF)", en: "https://bealearninghero.org/wp-content/uploads/2023/11/LH_Math-V4.pdf" },
          { type: "resource", title_es: "Dificultad con las matemáticas: cómo iniciar la conversación con el maestro de su hijo (Understood)", es: "https://www.understood.org/es-mx/articles/math-trouble-conversation-starters-to-use-with-your-childs-teacher",
            title_en: "Math Trouble: Conversation Starters to Use With Your Child’s Teacher (Understood)", en: "https://www.understood.org/en/articles/math-trouble-conversation-starters-to-use-with-your-childs-teacher" },
          { type: "resource", title_es: "Lista de preguntas sobre matemáticas para la conferencia de padres y maestros (Understood; PDF de una página)", es: "https://cdn-assets.understood.org/p0qf7j048i0q/5d0Jz4e6LCJ5YnA8BubfPI/d92f6aab5703f2311af6b897a196b606/Preguntas_de_matem__ticas_para_la_reuni__n_de_padres_y_maestros_Understood.pdf",
            title_en: "Parent-Teacher Conference Checklist for Math (Understood; one-page PDF)", en: "https://cdn-assets.understood.org/p0qf7j048i0q/3aKsBwV58UzhwJ01JM2RDf/5f395c57e7918c754228ac3c82363bf0/Parent-Teacher_Conference_Checklist_for_Math_Understood.pdf" }
        ] },
        { title_es: "Ansiedad y confianza en matemáticas", title_en: "Math anxiety and confidence", items: [
          { type: "resource", title_es: "¿Qué es la ansiedad matemática? Cómo puede afectar el aprendizaje (Understood)", es: "https://www.understood.org/es-mx/articles/que-es-la-ansiedad-matematica",
            title_en: "What Is Math Anxiety? How it can affect learning (Understood)", en: "https://www.understood.org/en/articles/what-is-math-anxiety" },
          { type: "resource", title_es: "Cómo ayudar a los niños que tienen ansiedad por las matemáticas (Child Mind Institute)", es: "https://childmind.org/es/articulo/como-ayudar-a-los-ninos-que-sienten-ansiedad-por-las-matematicas/",
            title_en: "Tips for Helping Kids Overcome Math Anxiety (Child Mind Institute)", en: "https://childmind.org/article/help-kids-with-math-anxiety/" }
        ] }
      ] },
    MOPHS: { id: "PEA-M12", topic: "opportunities",
      es: "Este curso presenta caminos disponibles después de la preparatoria, incluyendo colegios comunitarios, universidades, educación técnica y profesional, aprendizajes, servicio militar e ingreso directo al trabajo. Las familias consideran los intereses y las metas de sus estudiantes, exploran preguntas de planificación y ayuda financiera e identifican maneras de apoyar decisiones informadas sobre educación, capacitación y carreras.",
      en: "This course introduces pathways available after high school, including community college, universities, career and technical education, apprenticeships, military service, and direct entry into the workforce. Families consider students’ interests and goals, explore planning and financial-aid questions, and identify ways to support informed decisions about education, training, and careers.",
      /* 6R materials from the MOPHS folder (Drive 1FAanxeyEvu3k6rHwagtaoNH22tE_ILyM; Danny Hernández, 2026-11-12), PDFs only,
         all checked as shared "anyone with the link" and read that day; every file is Spanish only: worksheet v1.0.0,
         communication tool v1.0.0, and six family handouts (Explorando oportunidades v2.0.1; H01 Graduación y universidad
         v2.0.0; H02 Ayuda financiera, H03 Inglés y GED, H04 Estudios del extranjero and Preparación temprana, v1.0.0). They
         replace the FA26 Airtable worksheet (18Ta0-1J…). Staff-only and not published: small-group guide BIL v2.1.0, DOCX
         sources, the archive folder. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1hISHVovTSpoN2EAOmptn-Jz7kSFe_QIN/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1PcchOaViMLUn1FbfMUa4Z5o8-bj05M71/view?usp=drivesdk" },
        { type: "handout", title_es: "Explorando oportunidades después de high school", es: "https://drive.google.com/file/d/1_UeKMs2bcPYRZlwN_SnGybASogkRD1P3/view?usp=drivesdk" },
        { type: "handout", title_es: "De la preparatoria al siguiente paso: requisitos para graduarse y para la universidad", es: "https://drive.google.com/file/d/1ZG2MZc7YxvrGN_I7nKcnDzky8vwuX7A0/view?usp=drivesdk" },
        { type: "handout", title_es: "Comparar costos y buscar ayuda financiera", es: "https://drive.google.com/file/d/1Dcn9BuU2T04Z-1jXVbC_Z-vt-09kQFln/view?usp=drivesdk" },
        { type: "handout", title_es: "Aprender inglés u obtener su diploma de equivalencia (GED)", es: "https://drive.google.com/file/d/13PjBTNhY-9uSQ2fuR5NttX_wF3Ge2Jgl/view?usp=drivesdk" },
        { type: "handout", title_es: "Usar los estudios que hizo en otro país", es: "https://drive.google.com/file/d/1lbrR7d3ybt0CuJnH-lQ3uW24ZFSeFYBK/view?usp=drivesdk" },
        { type: "handout", title_es: "Preparar para el futuro desde pequeños (hasta 8.º grado)", es: "https://drive.google.com/file/d/1l9U-bxno0FVTo6BEy05Vh7FI1YX7JJI4/view?usp=drivesdk" } ],
      /* Added 2026-11-13 (Danny Hernández): StudentAid.gov ES | EN after the USAGov FAFSA row; Aliento scholarships and
         ScholarshipsA-Z in the undocumented-students group; AZTransfer in college and career planning; a new group with
         the ASU and University of Arizona first-year course and GPA requirement pages. Pages opened 2026-11-13, except
         ScholarshipsA-Z (a Cloudflare check blocks automated reads; the address is the one in Danny's 6R handout). NAU's
         first-year page is held back: its site could not be reached from the build environment. */
      /* Added 2026-11-12 at Danny Hernández's request (named in the 6R handouts): Ask Benji and College Depot under
         "Pagar la universidad", USA Learns under "Clases de inglés". Each site has one address for both languages (no
         Spanish page; USA Learns has an English/Spanish switch for its instructions). Pages opened and read 2026-11-12. */
      /* 6R resources (Danny Hernández, reviewed list "PEA Resource List — MOPHS and MEXCP", 2026-11-10): 16 rows in his
         seven groups and order, plus CPIR's Transition to Adulthood (from the MEXCP list, marked "also relevant to
         MOPHS"). ES | EN rows; Literacy Connects ELA, Rio Salado and the ADE adult-education directory have no
         verified Spanish page, so they sit under Otros recursos. Family-facing limits from Danny's notes are kept in
         the titles (CPLC: GED classes not offered when reviewed; Friendly House enrollment line; Literacy Connects:
         Pima County, 18+; Rio Salado: classes taught in English). Staff notes, not on the page: confirm the FAFSA
         year and deadlines, 529 tax and program rules, Prop. 308 eligibility with each college, apprenticeship
         requirements, provider location/cost/language/seats before referring, and that the receiving college,
         employer or board accepts an ECE or IEE report before a family pays (an evaluation does not transfer credit
         or grant a licence). Friendly House: the ES link is its 211 Arizona listing, not a translation of the EN
         page. Links not opened from the build environment (network blocked). */
      resources: [
        { title_es: "Planificar la universidad y la carrera", title_en: "College and career planning", items: [
          { type: "resource", title_es: "Guía para padres: planificar la educación y explorar carreras (Arizona GEAR UP, NAU)", es: "https://in.nau.edu/gear-up/parent-guide-spanish/",
            title_en: "Parent Guide: education planning and career exploration (Arizona GEAR UP, NAU)", en: "https://in.nau.edu/gear-up/parent-guide-english/" },
          { type: "resource", title_es: "Transición a la vida adulta: estudiantes con discapacidad (Centro de Información y Recursos para Padres)", es: "https://www.parentcenterhub.org/transicion-adulta/",
            title_en: "Transition to Adulthood: students with disabilities (Center for Parent Information and Resources)", en: "https://www.parentcenterhub.org/transitionadult/" },
          { type: "resource", title_es: "AZTransfer: planear el paso de un colegio comunitario a una universidad de Arizona y revisar qué cursos se transfieren (en inglés)",
            title_en: "AZTransfer: plan the move from a community college to an Arizona university and check which courses transfer", any: "https://www.aztransfer.com/" }
        ] },
        { title_es: "Requisitos de admisión a las universidades de Arizona", title_en: "Arizona university admission requirements", items: [
          { type: "resource", title_es: "ASU: cursos de preparatoria y promedio (GPA) que se piden para entrar como estudiante de primer año (en inglés)",
            title_en: "ASU: high school course competencies and GPA required for first-year admission", any: "https://admission.asu.edu/apply/first-year/competency-requirements" },
          { type: "resource", title_es: "Universidad de Arizona: cursos de preparatoria que se piden y promedio de 3.0 en las 16 materias básicas (en inglés)",
            title_en: "University of Arizona: required high school courses and a 3.0 GPA in the 16 core courses", any: "https://www.arizona.edu/admissions/apply/high-school-competency" }
        ] },
        { title_es: "Pagar la universidad y ahorrar para la educación", title_en: "Paying for college and education savings", items: [
          { type: "resource", title_es: "FAFSA: Solicitud Gratuita de Ayuda Federal para Estudiantes (USAGov en español)", es: "https://www.usa.gov/es/fafsa-ayuda-federal-estudiantes",
            title_en: "FAFSA: Free Application for Federal Student Aid (USAGov)", en: "https://www.usa.gov/fafsa" },
          { type: "resource", title_es: "StudentAid.gov en español: el sitio oficial de la FAFSA y la ayuda federal para estudiantes (Departamento de Educación de EE. UU.)", es: "https://studentaid.gov/es",
            title_en: "StudentAid.gov: the official FAFSA and federal student aid site (U.S. Department of Education)", en: "https://studentaid.gov/" },
          { type: "resource", title_es: "Ask Benji: ayuda gratis por mensaje de texto para llenar la FAFSA, las 24 horas (Education Forward Arizona; en inglés)",
            title_en: "Ask Benji: free 24/7 FAFSA help by text message (Education Forward Arizona)", any: "https://www.askbenji.org/" },
          { type: "resource", title_es: "College Depot: citas y talleres gratis sobre admisión, ayuda financiera y becas (Biblioteca Pública de Phoenix, Burton Barr; sitio en inglés)",
            title_en: "College Depot: free appointments and workshops on admissions, financial aid and scholarships (Phoenix Public Library, Burton Barr)", any: "https://www.phoenixpubliclibrary.org/collegedepot" },
          { type: "resource", title_es: "¿Qué es un plan 529 de Arizona? Ahorrar para la educación (AZ529)", es: "https://espanol.az529.gov/planificacion-y-herramientas/que-es-un-plan-529-de-arizona/",
            title_en: "What Is a 529 Plan? Saving for education (AZ529, Arizona’s Education Savings Plan)", en: "https://az529.gov/what-is-a-529-plan/" }
        ] },
        { title_es: "Estudiantes indocumentados y colegiatura estatal en Arizona", title_en: "Undocumented students and Arizona tuition access", items: [
          { type: "resource", title_es: "Colegiatura estatal para Dreamers: la Proposición 308 (Aliento)", es: "https://alientoaz.org/in-state-for-dreamers-esp",
            title_en: "In-State Tuition for Dreamers: Proposition 308 (Aliento)", en: "https://alientoaz.org/education" },
          { type: "resource", title_es: "Estudiantes indocumentados: planificar y pagar la universidad (Universidad de Arizona, Empieza Hoy)", es: "https://startnow.arizona.edu/es/pagar-por-la-universidad/indocumentados",
            title_en: "Undocumented Students: planning and paying for college (University of Arizona, Start Now)", en: "https://startnow.arizona.edu/pay-for-college/undocumented-students" },
          { type: "resource", title_es: "Aliento: becas para estudiantes sin importar su estatus migratorio; la lista se actualiza cada mes (en inglés)",
            title_en: "Aliento: Scholarships for Dreamers, available regardless of immigration status; list updated monthly", any: "https://alientoaz.org/resources/scholarships" },
          { type: "resource", title_es: "ScholarshipsA-Z: becas y talleres gratis para estudiantes indocumentados en Arizona (contenido en español e inglés)",
            title_en: "ScholarshipsA-Z: scholarships and free workshops for undocumented students in Arizona", any: "https://scholarshipsaz.org/" }
        ] },
        { title_es: "Aprendizajes y capacitación para una carrera", title_en: "Apprenticeships and career training", items: [
          { type: "resource", title_es: "Aprendizajes registrados: trabajar y aprender al mismo tiempo (Departamento de Seguridad Económica de Arizona)", es: "https://des.az.gov/sites/default/files/media/Registered-Apprenticeships-Career-Seeker-Flyer-Spanish.pdf",
            title_en: "Registered Apprenticeships: Career Seeker Flyer (Arizona Department of Economic Security)", en: "https://des.az.gov/sites/default/files/media/Registered-Apprenticeships-Career-Seeker-Flyer-English.pdf" }
        ] },
        { title_es: "Clases de inglés y educación para adultos", title_en: "English classes and adult education", items: [
          { type: "resource", title_es: "Educación para adultos e inglés, área de Phoenix (Chicanos Por La Causa; clases de GED no disponibles al revisar)", es: "https://cplc.org/es/programs/adult-education",
            title_en: "Adult Education and English, Phoenix area (Chicanos Por La Causa; GED classes not offered when reviewed)", en: "https://www.cplc.org/programs/adult-education" },
          { type: "resource", title_es: "Inglés y preparación para el GED en Phoenix (Friendly House, ficha en 211 Arizona); inscripción en español: 602-416-7210", es: "https://search.211arizona.org/es/search/265c1e77-44b6-5ba5-8c14-a3653a55fcea",
            title_en: "Adult Education and Workforce Development, Phoenix (Friendly House); enrollment: 602-416-7210, enroll@friendlyhouse.org", en: "https://friendlyhouse.org/adult-education-and-workforce-development/" },
          { type: "resource", title_es: "USA Learns: clases de inglés y de ciudadanía gratis en línea, en el teléfono o la computadora (las instrucciones se pueden ver en español)",
            title_en: "USA Learns: free online English and U.S. citizenship classes, on a phone or computer", any: "https://www.usalearns.org/" },
          { type: "resource", title_en: "English Language Acquisition for Adults, online and in person, Pima County, ages 18+ (Literacy Connects)", en: "https://literacyconnects.org/english-language-acquisition-for-adults/" },
          { type: "resource", title_en: "Adult Education: GED prep, English and career readiness, Phoenix area; classes taught in English (Rio Salado College)", en: "https://www.riosalado.edu/start-rio/adult-education" },
          { type: "resource", title_en: "Adult Education and English Classes by County (Arizona Department of Education)", en: "https://www.azed.gov/adultedservices/Adult-Education-Programs" }
        ] },
        { title_es: "Preparación para el GED y diploma de Arizona", title_en: "GED preparation and the Arizona diploma", items: [
          { type: "resource", title_es: "Examen GED: cuenta, preparación y pruebas (GED Testing Service)", es: "https://www.ged.com/es",
            title_en: "GED: account, test prep and testing (GED Testing Service)", en: "https://www.ged.com/" },
          { type: "resource", title_es: "Requisitos del GED en Arizona: elegibilidad, inscripción y reglas del estado (GED Testing Service)", es: "https://www.ged.com/es/policies/arizona.html",
            title_en: "Arizona GED Requirements: eligibility, registration and state policies (GED Testing Service)", en: "https://www.ged.com/policies/arizona.html" },
          { type: "resource", title_es: "Clases de preparación para el GED en español, sur de Arizona (Literacy Connects)", es: "https://literacyconnects.org/ged-en-espanol/",
            title_en: "GED preparation classes in English, Southern Arizona (Literacy Connects)", en: "https://literacyconnects.org/ged-in-english/" }
        ] },
        { title_es: "Estudios en otro país: evaluar credenciales", title_en: "Education from another country: credential evaluation", items: [
          { type: "resource", title_es: "Evaluación de estudios hechos fuera de EE. UU. (Educational Credential Evaluators, ECE); antes de pagar, pregunte si la institución la acepta", es: "https://es.ece.org/ECE/Applicants",
            title_en: "Credential Evaluations for Applicants (Educational Credential Evaluators, ECE); before paying, ask whether the school, employer or board accepts it", en: "https://www.ece.org/ECE/Applicants" },
          { type: "resource", title_es: "Evaluación de credenciales y traducción de documentos (International Education Evaluations, IEE); antes de pagar, pregunte si la institución la acepta", es: "https://myiee.org/es",
            title_en: "Credential evaluation and document translation (International Education Evaluations, IEE); before paying, ask whether the school, employer or board accepts it", en: "https://myiee.org/" }
        ] }
      ] },
    MEXCP: { id: "PEA-M13", topic: "sped",
      es: "Este curso explica cómo las escuelas identifican y apoyan a estudiantes excepcionales y presenta sistemas como educación especial, Programas de Educación Individualizados (IEP), planes de la Sección 504 y apoyos de varios niveles. Las familias comparan los apoyos disponibles, preparan preguntas para los equipos escolares y practican cómo abogar por servicios y oportunidades inclusivas que respondan a las fortalezas y necesidades de cada estudiante.",
      en: "This course explains how schools identify and support exceptional students and introduces common systems such as special education, Individualized Education Programs (IEPs), Section 504 plans, and multi-tiered supports. Families compare available supports, prepare questions for school teams, and practice advocating for services and inclusive opportunities aligned with each student’s strengths and needs.",
      /* 7T materials from the MEXCP folder (Drive 10nhAZV2wClLGAxRkAIZWgY22EiUHOg8C; Danny Hernández, 2026-11-12), PDFs only,
         all checked as shared "anyone with the link" and read that day, v1.0.0: worksheet ES + EN; family handout ES + EN
         (Abogando por estudiantes excepcionales / Advocating for Exceptional Students); handout H02 Evaluación y apoyos
         (Spanish only); communication tool (Spanish only). They replace the FA26 Airtable worksheet (1cRa0toD…). Staff-only
         and not published: facilitator guide ES, small-group guide BIL, DOCX sources, the archive folder. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/16vWSYPkSpCpJmARp831mBySZFJsyk8jy/view?usp=drivesdk", en: "https://drive.google.com/file/d/1iqHfO5UPMWOy6I2KKRjxd9LPg9CJV9cW/view?usp=drivesdk" },
        { type: "handout", title_es: "Abogando por estudiantes excepcionales", es: "https://drive.google.com/file/d/1HOFldtkM8JGEMcT_7DXJ3nlPjGReb3iw/view?usp=drivesdk",
          title_en: "Advocating for Exceptional Students", en: "https://drive.google.com/file/d/1cX9kgsOJKzQLgWuKE_BqNb7fPwrZxlWy/view?usp=drivesdk" },
        { type: "handout", title_es: "Pedir una evaluación y entender los apoyos escolares (PEI y Plan 504)", es: "https://drive.google.com/file/d/1qyxDaasGqg7N0Qt5iNCPDXafaNbgaH68/view?usp=drivesdk" },
        { type: "comm", es: "https://drive.google.com/file/d/1VNfyZDs35LtSEogIYmbeozFVVkP6ZE-w/view?usp=drivesdk" } ],
      /* 7T resources (Danny Hernández, reviewed list "PEA Resource List — MOPHS and MEXCP", 2026-11-10): 13 rows in his six
         groups and order, all ES | EN. Encircle Families (formerly Raising Special Kids; use only the current name; on
         7T since 2026-11-06), HealthyChildren IEP/504 and CPIR parent rights under IDEA are also on 5R with the same
         titles, so Materiales y recursos lists each once. CPIR Transition to Adulthood is also on 6R. Notes from the
         list: NAGC's ES and EN tip-sheet collections overlap but are not identical and do not replace Arizona or
         district gifted procedures; AZ FIND flyers are the August 2022 editions; ADE procedural safeguards are the
         August 28, 2025 editions; the autism Spanish page and the English site are related, not translations; ACDHH is
         a broader referral, not a school accommodation plan. Links not opened from the build environment. */
      resources: [
        { title_es: "Estudiantes dotados y avanzados", title_en: "Gifted and advanced learners", items: [
          { type: "resource", title_es: "Hojas de consejos para familias de estudiantes dotados (National Association for Gifted Children)", es: "https://www.nagc.org/spanish-family-tip-sheets",
            title_en: "Family Tip Sheets for families of gifted learners (National Association for Gifted Children)", en: "https://www.nagc.org/family-tip-sheets" }
        ] },
        { title_es: "Apoyo y orientación para familias en Arizona", title_en: "Arizona family support and navigation", items: [
          { type: "resource", title_es: "Encircle Families: información, programas y apoyo para familias de niños con discapacidad en Arizona", es: "https://encirclefamilies.org/es/",
            title_en: "Encircle Families: information, programs and support for Arizona families of children with disabilities", en: "https://encirclefamilies.org/" },
          { type: "resource", title_es: "Biblioteca de recursos de Encircle Families: educación especial, apoyos para discapacidad y cómo navegar los servicios", es: "https://encirclefamilies.org/es/resources/",
            title_en: "Encircle Families Resource Library: special education, disability supports and navigating services", en: "https://encirclefamilies.org/resources/" }
        ] },
        { title_es: "Identificar necesidades y pedir una evaluación", title_en: "Identifying needs and requesting an evaluation", items: [
          { type: "resource", title_es: "AZ FIND: cómo obtener ayuda si cree que su hijo o hija tiene una discapacidad (Departamento de Educación de Arizona, 2022)", es: "https://www.azed.gov/sites/default/files/2022/09/AZ%20Find%20Flyer%20Spanish%20%2822-08%29.pdf",
            title_en: "AZ FIND: How to Get Help if you think your child has a disability (Arizona Department of Education, 2022)", en: "https://www.azed.gov/sites/default/files/2022/10/AZ%20Find%20Flyer%20English%20%2822-08%29.pdf" },
          { type: "resource", title_es: "¿Qué es una evaluación de educación especial? (Understood)", es: "https://www.understood.org/es-mx/articles/que-es-una-evaluacion-de-educacion-especial",
            title_en: "What Is an Evaluation for Special Education? (Understood)", en: "https://www.understood.org/en/articles/understanding-evaluations" },
          { type: "resource", title_es: "Cartas modelo de educación especial: pedir una evaluación, información o una reunión; guarde una copia con fecha (Disability Rights Arizona)", es: "https://disabilityrightsaz.org/resource/educacion-especial-cartas-modelo/",
            title_en: "Special Education Sample Letters: request an evaluation, records or a meeting; keep a dated copy (Disability Rights Arizona)", en: "https://disabilityrightsaz.org/resource/special-education-sample-letters/" }
        ] },
        { title_es: "IEP, planes 504 y derechos de los padres", title_en: "IEPs, Section 504 plans and parent rights", items: [
          { type: "resource", title_es: "Programas IEP y planes 504: guía de servicios de apoyo escolar para su hijo (HealthyChildren.org)", es: "https://www.healthychildren.org/Spanish/health-issues/conditions/developmental-disabilities/Paginas/Individualized-Education-Program.aspx",
            title_en: "IEPs and 504 Plans: A Guide to School Supports for Your Child (HealthyChildren.org)", en: "https://www.healthychildren.org/English/health-issues/conditions/developmental-disabilities/Pages/Individualized-Education-Program.aspx" },
          { type: "resource", title_es: "IDEA, Sección 504 y ADA: ¿qué regulan estas leyes? (Understood)", es: "https://www.understood.org/es-mx/articles/idea-seccion-504-y-ada-que-regulan-estas-leyes",
            title_en: "IDEA, Section 504 and the ADA: Which Laws Do What (Understood)", en: "https://www.understood.org/en/articles/at-a-glance-which-laws-do-what" },
          { type: "resource", title_es: "Derechos de los padres bajo IDEA (Centro de Información y Recursos para Padres)", es: "https://www.parentcenterhub.org/derechos/",
            title_en: "Parental Rights Under IDEA (Center for Parent Information and Resources)", en: "https://www.parentcenterhub.org/parental-rights/" },
          { type: "resource", title_es: "Aviso de las salvaguardias procesales: sus derechos en educación especial (Departamento de Educación de Arizona, agosto de 2025)", es: "https://www.azed.gov/sites/default/files/2025/08/Procedural%20Safeguards%20Spanish%20-8-28-25.pdf",
            title_en: "Procedural Safeguards Notice: your special education rights (Arizona Department of Education, August 2025)", en: "https://www.azed.gov/sites/default/files/2025/08/Procedural%20Safeguards%20Rev%20_8-28-25.pdf" }
        ] },
        { title_es: "Transición después de la preparatoria", title_en: "Transition after high school", items: [
          { type: "resource", title_es: "Transición a la vida adulta: estudiantes con discapacidad (Centro de Información y Recursos para Padres)", es: "https://www.parentcenterhub.org/transicion-adulta/",
            title_en: "Transition to Adulthood: students with disabilities (Center for Parent Information and Resources)", en: "https://www.parentcenterhub.org/transitionadult/" }
        ] },
        { title_es: "Información y referencias según la discapacidad", title_en: "Disability-specific information and referrals", items: [
          { type: "resource", title_es: "Servicios y recursos en español para personas sordas o con pérdida auditiva (Comisión de Arizona para Sordos y Personas con Dificultades Auditivas)", es: "https://www.acdhh.org/espanol",
            title_en: "Deaf and Hard of Hearing Support Services (Arizona Commission for the Deaf and the Hard of Hearing)", en: "https://www.acdhh.org/" },
          { type: "resource", title_es: "Ayuda en español sobre el autismo para familias (Autism Society of Greater Phoenix)", es: "https://phxautism.org/resources/ayuda-en-espanol/",
            title_en: "Autism Society of Greater Phoenix: family information, support and community resources", en: "https://phxautism.org/" }
        ] }
      ] },
    MCENG: { id: "PEA-M14", topic: "family",
      es: "Este curso examina cómo se ve la participación familiar y comunitaria auténtica cuando las familias colaboran como socias en decisiones que afectan a estudiantes y escuelas. Las personas participantes exploran principios de participación significativa, distinguen entre asistir y compartir decisiones e identifican oportunidades para contribuir a la mejora escolar dentro y fuera de la escuela.",
      en: "This course examines what authentic family and community engagement looks like when families participate as partners in decisions that affect students and schools. Participants explore principles of meaningful engagement, distinguish participation from shared decision-making, and identify opportunities to contribute to school improvement within and beyond the school building.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/172jJ4Ur3DwHS6DnRcY3ePA2gMXffPPrF/view?usp=drivesdk" }] },
    MSELF: { id: "PEA-M15", topic: "advocacy",
      es: "Este curso ayuda a las personas participantes a desarrollar una Historia Personal que conecte su identidad, experiencias, valores, desafíos y decisiones con su liderazgo y defensa educativa. Las familias practican cómo construir y compartir una narrativa que comunique por qué la educación es importante para ellas y que apoye acciones con propósito a favor de estudiantes y comunidades.",
      en: "This course helps participants develop a Story of Self by connecting identity, lived experience, values, challenges, and choices to their leadership and advocacy. Families practice shaping and sharing a personal narrative that communicates why education matters to them and supports purposeful action on behalf of students and communities.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1bWohNr9jlSV2JvznJcOHe__W1wh1C1cD/view?usp=drivesdk" }] },
    MPIP1: { id: "PEA-M16", topic: "advocacy",
      es: "Este curso reúne los aprendizajes de sesiones anteriores de PEA y apoya a las personas participantes para aplicarlos a una situación escolar, del salón o de la comunidad que quieran abordar. Las familias definen la situación, aclaran su meta, identifican personas clave y recursos y comienzan un plan de defensa que puedan llevar a la práctica con comentarios de sus compañeros y facilitadores.",
      en: "This course brings together learning from earlier PEA sessions and supports participants in applying it to a school, classroom, or community issue they want to address. Families define the issue, clarify their goal, identify key people and resources, and begin an actionable advocacy plan with feedback from peers and facilitators." },
    MPIP2: { id: "PEA-M17", topic: "advocacy",
      es: "Este curso apoya a las personas participantes para fortalecer y comunicar los planes de defensa desarrollados en Poniéndolo en Práctica I. Las familias usan comentarios para mejorar sus estrategias, practican cómo presentar un plan claro y centrado en las familias e identifican próximos pasos, formas de comunicación y apoyos necesarios para pasar de la planificación a la acción.",
      en: "This course supports participants in strengthening and communicating the advocacy plans developed in Putting It Into Practice I. Families use feedback to refine their strategies, practice presenting a clear family-centered plan, and identify immediate next steps, communication approaches, and support needed to move from planning to action." },
    MGRAD: { id: "PEA-M18", topic: "advocacy",
      es: "Este curso de cierre celebra que las personas participantes completaron PEA y ofrece un espacio para reflexionar sobre los aprendizajes, las relaciones y el crecimiento logrado durante la cohorte. Las personas graduadas identifican cómo seguirán usando sus conocimientos y habilidades de defensa como líderes familiares, alumni y colaboradoras para fortalecer las oportunidades educativas de los estudiantes.",
      en: "This culminating course celebrates participants’ completion of PEA and creates space to reflect on learning, relationships, and growth across the cohort. Graduates identify how they will continue using their knowledge and advocacy skills as family leaders, alumni, and partners in strengthening educational opportunities for students." }
  },

  /* PEA team page. Names, titles (ES/EN) and emails confirmed by Danny Hernández, 2026-10-01.
     Emails: firstname@allineducation.org. An empty title is simply not shown.
     Photos: site/assets/img/staff/, 480x600. */
  staff: [
    { name: "Danny Hernández", title_es: "Gerente de Impacto Comunitario y Aprendizaje", title_en: "Community Impact & Learning Manager",
      email: "danny@allineducation.org", photo: "assets/img/staff/danny-hernandez.jpg" },
    { name: "Denia Uriarte", title_es: "Gerente de programas de liderazgo", title_en: "Leadership Programs Manager",
      email: "denia@allineducation.org", photo: "assets/img/staff/denia-uriarte.jpg" }
  ],

  links: {
    global: {
      overviewVideo: "https://www.youtube.com/watch?v=FEV_87qoqjc",
      familyStoryEn: "https://azluminaria.org/2023/05/18/a-program-helping-parents-navigate-arizonas-education-system-as-leaders-and-advocates-for-their-kids/",
      familyStoryEs: "https://azluminaria.org/2023/05/19/un-programa-que-ayuda-a-padres-latinos-a-navegar-el-sistema-educativo-de-arizona-como-lideres-y-defensores-de-sus-hijos/",
      apply:       "https://airtable.com/appIqlWqvk2HkHVRM/pagKt0dz2HEbrxL0d/form",
      /* Exit ticket (Airtable form "Encuesta de salida / Exit Ticket"). Each class card adds
         ?prefill_Event+ID=<cohort> - MM/DD/YYYY so the read-only class field names that class
         (field "Event ID", linked to the Calendar table, whose primary field reads e.g.
         "FA26 - 10/06/2026"). The resource list (bit.ly/pealista) was retired on 2026-10-06. */
      exit:        "https://airtable.com/appIqlWqvk2HkHVRM/pagsaimIoBv1ZTWYd/form",
      exitClassField: "Event ID",
      /* The exit ticket button is hidden (not greyed) until it is live: from this date (Arizona
         time) and, after that, from the day of each week's first class (Danny Hernández, 2026-10-07).
         2026-10-09: hidden again until Tuesday's class, October 13 (Danny Hernández). */
      exitOpensOn: "2026-10-13",
      flyer:       "https://bit.ly/peaflyer",
      vidAccount:  "https://bit.ly/peacuentadezoom",
      vidName:     "https://bit.ly/peazoomnombre",
      /* "Resend my Zoom link" request form (Airtable), supplied by Danny Hernández 2026-10-06. */
      resend:      "https://airtable.com/appIqlWqvk2HkHVRM/paghCk5ZbEsieUtwb/form"
    },
    FA26: {
      info:     "https://bit.ly/peafa26info",          /* info session only — not class registration */
      cal:      "https://bit.ly/peafa26cal",
      whatsapp: "https://bit.ly/peafa26whatsapp",
      week:     "https://aie.s.gy/esta-semana"          /* "Esta semana" page; Spanish by default. Not bit.ly (Danny, 2026-10-06) */
    },
    SP27: {
      /* Spring interest is open through the interest form. */
    }
  },

  /* kind: info | cls | holiday | focus | milestone   (milestone: "start" | "end" flags a class as a cohort milestone)
     Optional on a class: presentation_en = English presentation, view-only (shown on the English page only, under
     Session materials). 1R's link was entered on the 1T row of the Airtable Calendar
     "Presentation URL (View Only) - EN" field; Danny confirmed it belongs to 1R (2026-10-08). 2R link supplied by Danny Hernández, 2026-10-15; 3T and 3R links, 2026-10-20; exit = a class-specific exit survey that replaces the Airtable exit
     ticket (no prefill). 1T and 1R use the Jotform FA26 pre-survey (Danny Hernández, 2026-10-08).
     Only confirmed cohorts can be promoted automatically; projected future
     cohorts are mentioned in the FAQ without opening registration. */
  cohorts: {
    FA26: {
      code: "FA26", num: 12,
      label_es: "Otoño 2026", label_en: "Fall 2026",
      weeks: 10,
      /* Notes for the "Esta semana / This week" page, by class week ("1" = classes 1T and 1R).
         Both languages are required (the parity check enforces it). Example:
         "2": { es: "Traiga la boleta de calificaciones de su estudiante el jueves.", en: "Bring your student's report card on Thursday." } */
      weekNotes: {},
      /* Cohort links listed under Recursos / Resources on every class card (keys of links.<cohort>;
         one link, titled in the page language). Danny Hernández, 2026-10-06. */
      classResources: ["whatsapp", "cal"],
      /* Applications switch to the next cohort the Wednesday after class 3 (computed in app.js).
         The interest form stays open year-round; on that day it defaults to "opens" and adds "adds". */
      applySwitch: { opens: "SP27", adds_es: "Otoño 2027", adds_en: "Fall 2027" },
      events: [
        { code: "IS2", kind: "info",    start: "2026-10-02T00:00:00Z", end: "2026-10-02T01:30:00Z" },
        { code: "1T",  kind: "cls", module: "MORIE", start: "2026-10-07T00:00:00Z", end: "2026-10-07T01:30:00Z", title_es: "Orientación", title_en: "Orientation", milestone: "start",
          exit: "https://form.jotform.com/team/261975497443068/pea_fa26_pre" },
        { code: "1R",  kind: "cls", module: "MHIST", start: "2026-10-09T00:00:00Z", end: "2026-10-09T01:30:00Z", title_es: "La historia de la educación pública en Arizona", title_en: "History of Public Education in Arizona",
          presentation_en: "https://canva.link/nmb3yhwv4thuvpd", exit: "https://form.jotform.com/team/261975497443068/pea_fa26_pre" },
        { code: "2T",  kind: "cls", module: "MSAFE", start: "2026-10-14T00:00:00Z", end: "2026-10-14T01:30:00Z", title_es: "Seguridad y bienestar en la escuela", title_en: "School Safety and Well-Being" },
        { code: "2R",  kind: "cls", module: "MBIAS", start: "2026-10-16T00:00:00Z", end: "2026-10-16T01:30:00Z", title_es: "Sesgo, identidad y el mito de la oportunidad", title_en: "Bias, Identity & the Opportunity Myth",
          presentation_en: "https://canva.link/k4c2u53eb9nteal" },
        { code: "3T",  kind: "cls", module: "MQUAL", start: "2026-10-21T00:00:00Z", end: "2026-10-21T01:30:00Z", title_es: "Acceso a una educación de calidad y la elección escolar", title_en: "Access to Quality Education & School Choice",
          presentation_en: "https://canva.link/9z0bhmaqneftpq5" },
        { code: "3R",  kind: "cls", module: "MCOMM", start: "2026-10-23T00:00:00Z", end: "2026-10-23T01:30:00Z", title_es: "Navegando salones, escuelas y distritos escolares", title_en: "Navigating Classrooms, Schools, and School Districts",
          presentation_en: "https://canva.link/xpsjah3iu3387cx" },
        { code: "4T",  kind: "cls", module: "MREAD", start: "2026-10-28T00:00:00Z", end: "2026-10-28T01:30:00Z", title_es: "Fundamentos de la lectura y cómo abogar por los estudiantes", title_en: "Foundational Reading Skills & Advocating for Students in the Literacy Classroom",
          presentation_en: "https://canva.link/es58z5vcbmuowlg",
          featured: [{ type: "resource", title_es: "📝 Inscriba a su hijo o hija en tutoría de lectura gratis en línea (kínder a 6.º grado): formulario de interés de AZURA Literacy", title_en: "📝 Sign up your child for free online reading tutoring (grades K–6): AZURA Literacy Virtual Reading Program interest form", any: "https://airtable.com/appYkl41r0lzOsnAs/shrPkGQHAR9BP1chw" },
            { type: "resource", title_es: "📄 Cómo funciona la tutoría de lectura gratis: volante para familias de AZURA Literacy (español e inglés)", title_en: "📄 How the free reading tutoring works: AZURA Literacy family flyer (English and Spanish)", any: "https://drive.google.com/file/d/11qgL1fWSKKSNn4BPs_VV56-VZrfxfGCL/view?usp=drivesdk" }] },
        { code: "4R",  kind: "cls", module: "MHOME", start: "2026-10-30T00:00:00Z", end: "2026-10-30T01:30:00Z", title_es: "Lectura en casa", title_en: "Reading at Home",
          presentation_en: "https://canva.link/kieb51i1lruyplj",
          featured: [{ type: "resource", title_es: "📝 Inscriba a su hijo o hija en tutoría de lectura gratis en línea (kínder a 6.º grado): formulario de interés de AZURA Literacy", title_en: "📝 Sign up your child for free online reading tutoring (grades K–6): AZURA Literacy Virtual Reading Program interest form", any: "https://airtable.com/appYkl41r0lzOsnAs/shrPkGQHAR9BP1chw" },
            { type: "resource", title_es: "📄 Cómo funciona la tutoría de lectura gratis: volante para familias de AZURA Literacy (español e inglés)", title_en: "📄 How the free reading tutoring works: AZURA Literacy family flyer (English and Spanish)", any: "https://drive.google.com/file/d/11qgL1fWSKKSNn4BPs_VV56-VZrfxfGCL/view?usp=drivesdk" }] },
        { code: "5T",  kind: "cls", module: "MDIGI", start: "2026-11-04T00:00:00Z", end: "2026-11-04T01:30:00Z", title_es: "Alfabetización digital para padres y cuidadores", title_en: "Digital Literacy for Parents & Caregivers" },
        { code: "5R",  kind: "cls", module: "MRGHT", start: "2026-11-06T00:00:00Z", end: "2026-11-06T01:30:00Z", title_es: "Derechos de padres y cuidadores", title_en: "Your Rights as Parents & Caregivers" },
        { code: "6T",  kind: "cls", module: "MMATH", start: "2026-11-11T00:00:00Z", end: "2026-11-11T01:30:00Z", title_es: "Abogando por nuestros estudiantes en el salón de matemáticas", title_en: "Advocating for Students in the Math Classroom" },
        { code: "6R",  kind: "cls", module: "MOPHS", start: "2026-11-13T00:00:00Z", end: "2026-11-13T01:30:00Z", title_es: "Explorando oportunidades después de la preparatoria", title_en: "Exploring Opportunities After High School" },
        { code: "7T",  kind: "cls", module: "MEXCP", start: "2026-11-18T00:00:00Z", end: "2026-11-18T01:30:00Z", title_es: "Abogando por estudiantes excepcionales", title_en: "Advocating for Exceptional Students" },
        { code: "7R",  kind: "cls", module: "MCENG", start: "2026-11-20T00:00:00Z", end: "2026-11-20T01:30:00Z", title_es: "Participación comunitaria auténtica", title_en: "Authentic Community Engagement" },
        { code: "8T",  kind: "cls", module: "MSELF", start: "2026-11-25T00:00:00Z", end: "2026-11-25T01:30:00Z", title_es: "Historia personal: construyendo poder a través de la incidencia", title_en: "Story of Self: Creating Power Through Advocacy" },
        { code: "8R",  kind: "holiday", start: "2026-11-27T00:00:00Z", end: "2026-11-27T01:30:00Z" },
        { code: "9T",  kind: "cls", module: "MPIP1", start: "2026-12-02T00:00:00Z", end: "2026-12-02T01:30:00Z", title_es: "Poniéndolo en práctica I", title_en: "Putting It Into Practice I" },
        { code: "9R",  kind: "cls", module: "MPIP2", start: "2026-12-04T00:00:00Z", end: "2026-12-04T01:30:00Z", title_es: "Poniéndolo en práctica II", title_en: "Putting It Into Practice II" },
        { code: "10T", kind: "cls", module: "MGRAD", start: "2026-12-09T00:00:00Z", end: "2026-12-09T01:30:00Z", title_es: "Graduación", title_en: "Graduation", grad: true, milestone: "end" },
        { code: "10R", kind: "focus",   start: "2026-12-11T00:00:00Z", end: "2026-12-11T01:30:00Z" },
        /* Graduate recognitions (Danny, 2026-10-01). Maricopa: Mon Dec 14, 9:00–11:00 AM Arizona.
           Yuma: date to be confirmed. Undated events stay here but are never shown; add start/end (UTC) to publish. */
        { code: "RECM", kind: "milestone", sub: "recognition", start: "2026-12-14T16:00:00Z", end: "2026-12-14T18:00:00Z",
          title_es: "Reconocimiento de graduados del condado Maricopa", title_en: "Maricopa County Graduate Recognition" },
        { code: "RECY", kind: "milestone", sub: "recognition", start: null, end: null,
          title_es: "Reconocimiento de graduados del condado Yuma", title_en: "Yuma County Graduate Recognition" }
      ]
    },
    SP27: {
      code: "SP27", num: 13,
      label_es: "Primavera 2027", label_en: "Spring 2027",
      weeks: 9,
      projected: true,          /* full session calendar is not published in this hub */
      interestOpen: true,
      startDate: "2027-03-16", endDate: "2027-05-13",
      schedulePublished: true,
      events: [
        { code: "1T", kind: "cls", module: "MORIE", start: "2027-03-17T00:00:00Z", end: "2027-03-17T01:30:00Z", title_es: "Orientación", title_en: "Orientation", projected: true }
      ]
    }
  }
};
