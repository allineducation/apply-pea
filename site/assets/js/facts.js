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

  /* Curriculum modules — canonical, cohort-independent descriptions, session
     materials and resources. Each list item: { type, es: url, en: url }.
     Source: Airtable · PEA base · Modules table tblPkSBzSYKE4cBC6
     (Description (ES) / Description (EN) / Participant Worksheet (ES) — PDF /
     Participant Communication Tool (ES) — PDF / Participant Resource - Other (ES) — PDF),
     descriptions read 2026-09-25, materials read 2026-10-06. Only files shared
     "anyone with the link" are published (checked 2026-10-06). Held back until shared:
     MRGHT worksheet (1kmwiDnjCCI0KCMebtYlJGQNeVHCyYW6i) and MRGHT communication tool
     (1zCTm31aRz4OcDhNtLg0WkpePcHEOx_Ju). MORIE worksheet: v1.1.1 ES + EN PDFs from the Session
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
    MORIE: { id: "PEA-M01",
      es: "Este curso de apertura presenta a las familias ALL In Education, la Academia de Padres Educadores y los acuerdos y apoyos que guían la experiencia de las 18 clases. También presenta los objetivos del programa, que cada familia vive a su manera: prepararse para hablar con la escuela (qué preguntar, qué información compartir y cómo dar seguimiento a una conversación con el personal escolar); saber a quién acudir, entendiendo cómo se organizan las escuelas y los distritos y a quién dirigirse cuando surge una inquietud; apoyar el aprendizaje en casa, con ideas para acompañar la lectura y las matemáticas y para hablar con la escuela sobre lo que necesita su estudiante; y participar en su comunidad, compartiendo su experiencia, colaborando con otras familias y tomando parte en las decisiones de la escuela.",
      en: "This opening course introduces participants to ALL In Education, the Parent Educator Academy, and the expectations and supports that shape the 18-class learning experience. It also introduces the program’s learning goals, which every family experiences in its own way: preparing for school conversations (what to ask, what to share, and how to follow up with school staff); knowing whom to contact, by understanding how schools and districts are organized and whom to go to when a concern comes up; supporting learning at home, with ideas for reading and math and for talking with the school about what your student needs; and taking part in your community by sharing your experience, working alongside other families, and having a voice in school decisions.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1rtHSJogz_FTi7VFTPHvMWDBkK4iKxvpq/view?usp=drivesdk", en: "https://drive.google.com/file/d/1o52Fa0oSKtvjY-NCWzKvmYsuhz55ZXMB/view?usp=drivesdk" }] },
    MHIST: { id: "PEA-M02",
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
    MSAFE: { id: "PEA-M19",
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
    MSDOE: { id: "PEA-M03",
      es: "Este curso explora cómo la vivienda, la salud, el transporte, los ingresos, el acceso lingüístico y los recursos comunitarios pueden influir en las experiencias y los resultados educativos. Las familias identifican fortalezas y barreras en sus comunidades, relacionan estos factores con la equidad y la justicia y consideran cómo abogar por los apoyos que necesitan sus estudiantes.",
      en: "This course explores how conditions such as housing, health, transportation, income, language access, and neighborhood resources can influence students’ educational experiences and outcomes. Families identify strengths and barriers in their communities, connect these factors to equity and justice, and consider ways to advocate for the supports their students need.",
      materials: [{ type: "comm", es: "https://drive.google.com/file/d/18yXbpyLsCcEsQQMihOi7l2BMmuQ5_7mB/view?usp=drivesdk" }] },
    MBIAS: { id: "PEA-M04",
      es: "Este curso invita a las personas participantes a examinar la identidad, el sentido de pertenencia, los prejuicios conscientes e inconscientes y cómo influyen en las experiencias escolares y el acceso a oportunidades. Mediante la reflexión y el diálogo, las familias relacionan sus vivencias con patrones más amplios e identifican maneras de apoyar entornos de aprendizaje más equitativos e inclusivos.",
      en: "This course invites participants to examine identity, belonging, conscious and unconscious bias, and the ways these forces shape students’ school experiences and access to opportunity. Through reflection and dialogue, families connect personal experiences to broader patterns and identify ways to support more equitable and inclusive learning environments.",
      materials: [{ type: "comm", es: "https://drive.google.com/file/d/1tZ3oEPuYE9RYuLW_F-tEp8DiSsKL4rWs/view?usp=drivesdk" }] },
    MQUAL: { id: "PEA-M05",
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
    MCOMM: { id: "PEA-M06",
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
          { type: "resource", title_es: "Consejos para la reunión con el maestro (Colorín Colorado)", es: "https://www.colorincolorado.org/es/articulo/consejos-para-padres-conferencias-de-padres-y-maestros", title_en: "Tips for Parent-Teacher Conferences (Colorín Colorado)", en: "https://www.colorincolorado.org/article/tips-parents-parent-teacher-conferences" },
          { type: "resource", title_es: "Reuniones con el maestro: hoja de consejos (Illinois Early Learning Project)", es: "https://illinoisearlylearning.org/es/tipsheets/conferences-sp", title_en: "Parent-Teacher Conferences: Tip Sheet (Illinois Early Learning Project)", en: "https://illinoisearlylearning.org/tipsheets/conferences" },
          { type: "resource", title_es: "Preguntas para llevar a la reunión con el maestro (Understood)", es: "https://www.understood.org/es-mx/articles/checklist-questions-to-ask-at-your-parent-teacher-conference", title_en: "Questions to Ask at Your Parent-Teacher Conference (Understood)", en: "https://www.understood.org/en/articles/checklist-questions-to-ask-at-your-parent-teacher-conference" },
          { type: "resource", title_es: "Consejos para hablar con los maestros sobre el rendimiento escolar (Saber es Poder)", es: "https://saberespoder.com/articles/education/consejos-para-hablar-del-rendimiento-escolar-de-su-hijo-con-sus-maestros" },
          { type: "resource", title_es: "Preguntas para hacerle al director de la escuela (Keep Learning California)", es: "https://keeplearningca.org/es/recursos-para-familias/preguntas-que-los-padres-deberian-de-hacerle-a-los-directores/", title_en: "Questions Parents Should Ask School Leaders (Keep Learning California)", en: "https://keeplearningca.org/resources-for-families/questions-parents-should-ask" },
          { type: "resource", title_es: "Preguntas y pasos para que su hijo o hija triunfe en la escuela (Departamento de Educación de EE. UU.)", es: "https://www2.ed.gov/documents/family-community/parent-checklist-es.pdf", title_en: "Questions and Steps for Children to Succeed in School (U.S. Department of Education)", en: "https://www2.ed.gov/documents/family-community/parent-checklist.pdf" }
        ] },
        { title_es: "Matemáticas, educación especial e inglés", title_en: "Math, special education and English learners", items: [
          { type: "resource", title_es: "Preguntas de matemáticas para la reunión con el maestro (Understood)", es: "https://assets.ctfassets.net/p0qf7j048i0q/5d0Jz4e6LCJ5YnA8BubfPI/d92f6aab5703f2311af6b897a196b606/Preguntas_de_matem__ticas_para_la_reuni__n_de_padres_y_maestros_Understood.pdf", title_en: "Math Questions for a Parent-Teacher Conference (Understood)", en: "https://assets.ctfassets.net/p0qf7j048i0q/3aKsBwV58UzhwJ01JM2RDf/5f395c57e7918c754228ac3c82363bf0/Parent-Teacher_Conference_Checklist_for_Math_Understood.pdf" },
          { type: "resource", title_es: "Dificultades en matemáticas: cómo hablar con el maestro (Understood)", es: "https://www.understood.org/es-mx/articles/math-trouble-conversation-starters-to-use-with-your-childs-teacher", title_en: "Math Trouble: Talking to Your Child’s Teacher (Understood)", en: "https://www.understood.org/en/articles/math-trouble-conversation-starters-to-use-with-your-childs-teacher" },
          { type: "resource", title_es: "Preguntas frecuentes de las familias sobre la educación especial (Center for Parent Information and Resources)", es: "https://www.parentcenterhub.org/lg1sp/", title_en: "Questions Often Asked by Parents About Special Education Services (Center for Parent Information and Resources)", en: "https://www.parentcenterhub.org/lg1/" },
          { type: "resource", title_es: "El camino de la educación especial (Departamento de Educación de Arizona)", es: "https://www.azed.gov/sites/default/files/2020/12/Traveling%20the%20Special%20Education%20Highway%20Spa%20%2719%20acc.pdf", title_en: "Traveling the Special Education Highway (Arizona Department of Education)", en: "https://www.azed.gov/sites/default/files/2016/12/Traveling%20the%20Special%20Education%20Highway%20%2719.pdf" },
          { type: "resource", title_es: "Guía para familias de estudiantes aprendiendo inglés (Education Northwest)", es: "https://educationnorthwest.org/sites/default/files/resources/parent-guide-el-spanish.pdf", title_en: "Parent Guide for English Learners (Education Northwest)", en: "https://educationnorthwest.org/sites/default/files/resources/parent-guide-el-english.pdf" }
        ] },
        { title_es: "Participar en la escuela", title_en: "Getting involved at school", items: [
          { type: "resource", title_es: "Cómo participar en las actividades escolares (Colorín Colorado)", es: "https://www.colorincolorado.org/es/articulo/participaci%C3%B3n-de-los-padres-c%C3%B3mo-mantenerse-involucrado-en-las-actividades-escolares-de-su", title_en: "Parent Participation: Getting Involved in School Activities (Colorín Colorado)", en: "https://www.colorincolorado.org/article/parent-participation-how-get-involved-your-childs-school-activities" },
          { type: "resource", title_es: "Escuelas y familias: colección de artículos (Colorín Colorado)", es: "https://www.colorincolorado.org/es/node/36889/articles", title_en: "Schools and Families: Article Collection (Colorín Colorado)", en: "https://www.colorincolorado.org/node/36889/articles" },
          { type: "resource", title_es: "Biblioteca de recursos para familias (Encircle Families)", es: "https://encirclefamilies.org/es/resources/", title_en: "Family Resource Library (Encircle Families)", en: "https://encirclefamilies.org/resources/" },
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
    MREAD: { id: "PEA-M07",
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
         Parent Center (web search, 2026-10-27). Featured: Read On Arizona (Danny, 2026-10-27). Links not checked
         from the build environment (DNS blocked). */
      featured: [{ type: "resource", title_es: "Conversar para aprender: hablar, leer y aprender con niños pequeños (Read On Arizona)", es: "https://readonarizona.org/resources/conversar-para-aprender/",
          title_en: "Smart Talk: talk, read and learn with young children (Read On Arizona)", en: "https://readonarizona.org/resources/smart-talk/" }],
      resources: [
        { title_es: "Lo que se espera en cada edad y grado", title_en: "What to expect at each age and grade", items: [
          { type: "resource", title_es: "Habilidades lectoras a diferentes edades (Understood)", es: "https://www.understood.org/es-mx/articles/reading-skills-what-to-expect-at-different-ages",
            title_en: "Reading Skills: What to Expect at Different Ages (Understood)", en: "https://www.understood.org/en/articles/reading-skills-what-to-expect-at-different-ages" },
          { type: "resource", title_es: "La lectura: lo que se espera en cada grado (GreatSchools)", es: "https://www.greatschools.org/gk/crianza/milestones-temas/la-lectura?lang=es",
            title_en: "Reading Milestones by Grade (GreatSchools)", en: "https://www.greatschools.org/gk/parenting/milestones-subjects/milestones-reading" },
          { type: "resource", title_en: "AdLit: All About Adolescent Literacy (grades 4–12)", en: "https://www.adlit.org" }
        ] },
        { title_es: "Si su hijo o hija necesita más apoyo", title_en: "If your child needs more support", items: [
          { type: "resource", title_en: "Find Your Parent Center: help for children with disabilities or learning difficulties", en: "https://www.parentcenterhub.org/find-your-center" }
        ] }
      ] },
    MHOME: { id: "PEA-M08",
      es: "Este curso se enfoca en formas prácticas y culturalmente relevantes de apoyar el desarrollo de la lectura en casa y en cualquier idioma. Las familias practican estrategias para leer juntas, hacer preguntas, ampliar el vocabulario y crear rutinas que fortalezcan la confianza y conecten la lectura en casa con el aprendizaje escolar.",
      en: "This course focuses on practical, culturally responsive ways families can support reading development at home and in any language. Participants practice strategies for reading together, asking questions, building vocabulary, and creating routines that strengthen confidence and connect home literacy experiences with classroom learning.",
      /* 4R materials from the 4R class folder (Danny Hernández, 2026-10-26), PDFs only, all shared "anyone with the
         link": worksheet ES + EN v1.0.0, family handout ES + EN v1.0.0 (Volante familiar / Family handout) and the
         communication tool BIL v2.0.0 (for Spanish-speaking families, so it is listed as the Spanish version), which
         replaces the FA26 BIL v1_1_0 tool. The small-group guide is staff-only and not published. */
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1errhRqTNpWvslo6nxtPtxJRbUTP6zArV/view?usp=drivesdk", en: "https://drive.google.com/file/d/1-8W8czqErHwMBVcUGRom5cGJAX8AXl-H/view?usp=drivesdk" },
        { type: "handout", es: "https://drive.google.com/file/d/1ZHY0Qb2ci4iEshxnoHaedqWjHg8J6dAV/view?usp=drivesdk", en: "https://drive.google.com/file/d/1odG3YHIspLJD1Ac8qeyrHQPTnpwMHN6H/view?usp=drivesdk" },
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
         Other resources. Links not checked from the build environment (DNS blocked). */
      featured: [{ type: "resource", title_es: "Conversar para aprender: hablar, leer y aprender con niños pequeños (Read On Arizona)", es: "https://readonarizona.org/resources/conversar-para-aprender/",
          title_en: "Smart Talk: talk, read and learn with young children (Read On Arizona)", en: "https://readonarizona.org/resources/smart-talk/" }],
      resources: [
        { title_es: "Leer en casa", title_en: "Reading at home", items: [
          { type: "resource", title_es: "Ayude a su niño a aprender a leer (Colorín Colorado)", es: "https://www.colorincolorado.org/es/families/ayude-su-ni%C3%B1o-aprender-leer",
            title_en: "Help Your Child Learn to Read (Colorín Colorado)", en: "https://www.colorincolorado.org/help-your-child-learn-read" },
          { type: "resource", title_en: "Literacy at Home (Reading Rockets)", en: "https://www.readingrockets.org/literacy-home" },
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
          { type: "resource", title_en: "Book Reviews by Age (Common Sense Media)", en: "https://www.commonsensemedia.org/book-reviews" }
        ] },
        { title_es: "Tarjeta de biblioteca gratis", title_en: "Free library cards", items: [
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
    MDIGI: { id: "PEA-M09",
      es: "Este curso presenta conceptos de alfabetización digital que afectan a estudiantes y familias, incluyendo la seguridad en línea, el uso de medios, la desinformación, la privacidad y el acceso a herramientas de aprendizaje. Las personas participantes practican cómo evaluar información digital e identifican estrategias y recursos para orientar el uso responsable de la tecnología, comunicarse con las escuelas y apoyar el aprendizaje en casa.",
      en: "This course introduces digital literacy concepts that affect students and families, including online safety, media use, misinformation, privacy, and access to learning tools. Participants practice evaluating online information and identify strategies and resources for guiding responsible technology use, communicating with schools, and supporting learning at home.",
      materials: [{ type: "comm", es: "https://drive.google.com/file/d/1WEa6qLDxOsMN_eAUqVgdOJl45HQXXobI/view?usp=drivesdk", en: "https://drive.google.com/file/d/1WEa6qLDxOsMN_eAUqVgdOJl45HQXXobI/view?usp=drivesdk" }] },
    MRGHT: { id: "PEA-M10",
      es: "Este curso presenta los derechos y las responsabilidades clave de las familias y los estudiantes en la educación pública de Arizona, incluyendo protecciones para aprendices de inglés, estudiantes con discapacidades y familias con estatus migratorio mixto. Las personas participantes aprenden dónde encontrar información confiable, cómo expresar inquietudes y qué rutas de defensa pueden proteger el acceso, la inclusión y el éxito estudiantil.",
      en: "This course introduces key rights and responsibilities of families and students in Arizona public education, including protections for English Learners, students with disabilities, and mixed-status families. Participants learn where to locate reliable information, how to raise concerns, and which advocacy pathways can help protect access, inclusion, and student success." },
    MMATH: { id: "PEA-M11",
      es: "Este curso explora cómo ha cambiado la enseñanza de las matemáticas y qué se espera que los estudiantes comprendan y demuestren en los salones actuales. Las familias revisan estrategias para fortalecer la confianza y la resolución de problemas, identifican preguntas para el personal educativo y practican cómo abogar cuando un estudiante necesita una explicación más clara o apoyo adicional.",
      en: "This course explores how mathematics instruction has changed and what students are expected to understand and demonstrate in today’s math classrooms. Families examine strategies for supporting confidence and problem solving, identify questions to ask educators, and practice advocating when a student needs clearer instruction or additional support." },
    MOPHS: { id: "PEA-M12",
      es: "Este curso presenta caminos disponibles después de la preparatoria, incluyendo colegios comunitarios, universidades, educación técnica y profesional, aprendizajes, servicio militar e ingreso directo al trabajo. Las familias consideran los intereses y las metas de sus estudiantes, exploran preguntas de planificación y ayuda financiera e identifican maneras de apoyar decisiones informadas sobre educación, capacitación y carreras.",
      en: "This course introduces pathways available after high school, including community college, universities, career and technical education, apprenticeships, military service, and direct entry into the workforce. Families consider students’ interests and goals, explore planning and financial-aid questions, and identify ways to support informed decisions about education, training, and careers.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/18Ta0-1JoumzowXE1ZJx4vevMfzN5oFJs/view?usp=drivesdk" }] },
    MEXCP: { id: "PEA-M13",
      es: "Este curso explica cómo las escuelas identifican y apoyan a estudiantes excepcionales y presenta sistemas como educación especial, Programas de Educación Individualizados (IEP), planes de la Sección 504 y apoyos de varios niveles. Las familias comparan los apoyos disponibles, preparan preguntas para los equipos escolares y practican cómo abogar por servicios y oportunidades inclusivas que respondan a las fortalezas y necesidades de cada estudiante.",
      en: "This course explains how schools identify and support exceptional students and introduces common systems such as special education, Individualized Education Programs (IEPs), Section 504 plans, and multi-tiered supports. Families compare available supports, prepare questions for school teams, and practice advocating for services and inclusive opportunities aligned with each student’s strengths and needs.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1cRa0toDWW4-n61eosAVWFCs2y01wxZ-r/view?usp=drivesdk" }] },
    MCENG: { id: "PEA-M14",
      es: "Este curso examina cómo se ve la participación familiar y comunitaria auténtica cuando las familias colaboran como socias en decisiones que afectan a estudiantes y escuelas. Las personas participantes exploran principios de participación significativa, distinguen entre asistir y compartir decisiones e identifican oportunidades para contribuir a la mejora escolar dentro y fuera de la escuela.",
      en: "This course examines what authentic family and community engagement looks like when families participate as partners in decisions that affect students and schools. Participants explore principles of meaningful engagement, distinguish participation from shared decision-making, and identify opportunities to contribute to school improvement within and beyond the school building.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/172jJ4Ur3DwHS6DnRcY3ePA2gMXffPPrF/view?usp=drivesdk" }] },
    MSELF: { id: "PEA-M15",
      es: "Este curso ayuda a las personas participantes a desarrollar una Historia Personal que conecte su identidad, experiencias, valores, desafíos y decisiones con su liderazgo y defensa educativa. Las familias practican cómo construir y compartir una narrativa que comunique por qué la educación es importante para ellas y que apoye acciones con propósito a favor de estudiantes y comunidades.",
      en: "This course helps participants develop a Story of Self by connecting identity, lived experience, values, challenges, and choices to their leadership and advocacy. Families practice shaping and sharing a personal narrative that communicates why education matters to them and supports purposeful action on behalf of students and communities.",
      materials: [{ type: "worksheet", es: "https://drive.google.com/file/d/1bWohNr9jlSV2JvznJcOHe__W1wh1C1cD/view?usp=drivesdk" }] },
    MPIP1: { id: "PEA-M16",
      es: "Este curso reúne los aprendizajes de sesiones anteriores de PEA y apoya a las personas participantes para aplicarlos a una situación escolar, del salón o de la comunidad que quieran abordar. Las familias definen la situación, aclaran su meta, identifican personas clave y recursos y comienzan un plan de defensa que puedan llevar a la práctica con comentarios de sus compañeros y facilitadores.",
      en: "This course brings together learning from earlier PEA sessions and supports participants in applying it to a school, classroom, or community issue they want to address. Families define the issue, clarify their goal, identify key people and resources, and begin an actionable advocacy plan with feedback from peers and facilitators." },
    MPIP2: { id: "PEA-M17",
      es: "Este curso apoya a las personas participantes para fortalecer y comunicar los planes de defensa desarrollados en Poniéndolo en Práctica I. Las familias usan comentarios para mejorar sus estrategias, practican cómo presentar un plan claro y centrado en las familias e identifican próximos pasos, formas de comunicación y apoyos necesarios para pasar de la planificación a la acción.",
      en: "This course supports participants in strengthening and communicating the advocacy plans developed in Putting It Into Practice I. Families use feedback to refine their strategies, practice presenting a clear family-centered plan, and identify immediate next steps, communication approaches, and support needed to move from planning to action." },
    MGRAD: { id: "PEA-M18",
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
          featured: [{ type: "resource", title_es: "📝 Formulario de interés del programa de lectura virtual", title_en: "📝 AZURA Literacy Virtual Reading Program Interest Form", any: "https://airtable.com/appYkl41r0lzOsnAs/shrPkGQHAR9BP1chw" }] },
        { code: "4R",  kind: "cls", module: "MHOME", start: "2026-10-30T00:00:00Z", end: "2026-10-30T01:30:00Z", title_es: "Lectura en casa", title_en: "Reading at Home",
          presentation_en: "https://canva.link/kieb51i1lruyplj",
          featured: [{ type: "resource", title_es: "📝 Formulario de interés del programa de lectura virtual", title_en: "📝 AZURA Literacy Virtual Reading Program Interest Form", any: "https://airtable.com/appYkl41r0lzOsnAs/shrPkGQHAR9BP1chw" }] },
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
