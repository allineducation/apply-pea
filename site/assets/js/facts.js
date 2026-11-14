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

  /* Materiales y recursos search (v0.23.13; draft for Danny Hernández's review). Each group lists words families
     might type that mean the same thing, in Spanish and English: a search for one also lists rows with the others
     under "También podría interesarle" (never as exact matches). Lower case; accents are ignored when matching.
     Add a word to a group, or a new group, to widen the search. searchSuggest: tappable searches shown when
     nothing matches; same number of entries in both languages. */
  searchSynonyms: [
    ["becas", "beca", "scholarship", "scholarships", "subvención", "subvenciones", "grant", "grants"],
    ["ayuda financiera", "financial aid", "fafsa", "dinero", "pagar", "pay", "costo", "costos", "cost", "matrícula", "tuition", "préstamo", "loan"],
    ["universidad", "university", "college", "colegio comunitario", "community college", "admisión", "admission", "transferencia", "transfer"],
    ["inglés", "english", "esl", "clases de inglés", "english classes", "idioma", "language"],
    ["ged", "diploma", "equivalencia", "equivalency", "hse"],
    ["pei", "iep", "504", "educación especial", "special education", "discapacidad", "disability", "discapacidades", "disabilities"],
    ["lectura", "leer", "reading", "read", "libros", "books", "alfabetización", "literacy", "biblioteca", "library"],
    ["matemáticas", "math", "mates", "números", "numbers"],
    ["tecnología", "technology", "internet", "digital", "computadora", "computer", "celular", "phone", "redes sociales", "social media", "pantallas", "screens"],
    ["seguridad", "safety", "acoso", "bullying", "bienestar", "well-being", "salud mental", "mental health"],
    ["derechos", "rights", "ley", "law", "leyes", "laws", "queja", "complaint", "salvaguardias", "safeguards"],
    ["maestro", "maestra", "maestros", "teacher", "teachers", "conferencia", "conference", "reunión", "meeting"],
    ["escuela", "school", "distrito", "district", "director", "principal", "junta escolar", "school board"],
    ["indocumentado", "indocumentados", "undocumented", "dreamers", "daca", "inmigrante", "immigrant", "estatus migratorio", "immigration status"],
    ["trabajo", "empleo", "job", "jobs", "carrera", "career", "aprendiz", "apprenticeship", "aprendizajes", "apprenticeships"],
    ["elección escolar", "school choice", "chárter", "charter", "esa", "opciones escolares", "school options"],
    ["dotados", "gifted", "avanzados", "advanced", "excepcionales", "exceptional"],
    ["preparatoria", "high school", "graduación", "graduation", "créditos", "credits"]
  ],
  /* Rows with one link for both languages (`any`) carry `langs`: the languages the destination can actually be used in
     (Codex review, PR #65). [] = not recorded; such rows show only when no language filter is on. check-parity.js
     requires `langs` on every `any` row. */
  /* Searches that always list certain rows (Danny Hernández, 2026-11-13): a search with any `when` word lists every row
     that mentions a `show` word first under "También podría interesarle", even when its words don't match. */
  searchBoost: [
    { when: ["becas", "beca", "scholarship", "scholarships", "subvención", "grants", "universidad", "university", "college", "colegio comunitario",
             "community college", "admisión", "admission", "ayuda financiera", "financial aid", "dinero", "pagar", "pay", "matrícula", "tuition",
             "préstamo", "préstamos", "loan", "loans", "costo", "costos", "cost"],
      show: ["fafsa"] }
  ],
  searchSuggest: {
    es: ["FAFSA", "becas", "inglés", "GED", "IEP", "lectura", "matemáticas", "maestro"],
    en: ["FAFSA", "scholarships", "English", "GED", "IEP", "reading", "math", "teacher"]
  },

  /* Curriculum modules — canonical, cohort-independent descriptions and learning objectives.
     Descriptions: Airtable · PEA base · Modules table tblPkSBzSYKE4cBC6 (Description (ES) / (EN)), read 2026-09-25.
     Materials and resources are NOT here since v0.24.0: every worksheet, communication tool, handout,
     presentation, featured link and outside resource lives in Airtable · PEA Resource List and reaches the site
     through site/assets/js/resources.js (generated by maintenance/scripts/sync-resources.js), which fills
     materials / resources / featured on these modules and featured / presentation_en on cohort events.
     `topic` (below) is still set here: it is a module's home topic on Materiales y recursos.
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
      en: "This opening course introduces participants to ALL In Education, the Parent Educator Academy, and the expectations and supports that shape the 18-class learning experience. It also introduces the program’s learning goals, which every family experiences in its own way: preparing for school conversations (what to ask, what to share, and how to follow up with school staff); knowing whom to contact, by understanding how schools and districts are organized and whom to go to when a concern comes up; supporting learning at home, with ideas for reading and math and for talking with the school about what your student needs; and taking part in your community by sharing your experience, working alongside other families, and having a voice in school decisions." },
    MHIST: { id: "PEA-M02", topic: "history",
      es: "Este curso examina los acontecimientos, las políticas y las decisiones que formaron la educación pública en Arizona y que continúan influyendo en las oportunidades estudiantiles. Las familias relacionan esta historia con sus propias experiencias escolares y consideran cómo el contexto histórico puede orientar el aprendizaje, la participación comunitaria y la defensa educativa.",
      en: "This course examines the historical events, policies, and decisions that shaped public education in Arizona and continue to influence students’ opportunities today. Families connect this history to their own school experiences and consider how historical context can inform learning, community involvement, and education advocacy." },
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
      ] },
    MSDOE: { id: "PEA-M03", topic: "history",
      es: "Este curso explora cómo la vivienda, la salud, el transporte, los ingresos, el acceso lingüístico y los recursos comunitarios pueden influir en las experiencias y los resultados educativos. Las familias identifican fortalezas y barreras en sus comunidades, relacionan estos factores con la equidad y la justicia y consideran cómo abogar por los apoyos que necesitan sus estudiantes.",
      en: "This course explores how conditions such as housing, health, transportation, income, language access, and neighborhood resources can influence students’ educational experiences and outcomes. Families identify strengths and barriers in their communities, connect these factors to equity and justice, and consider ways to advocate for the supports their students need." },
    MBIAS: { id: "PEA-M04", topic: "history",
      es: "Este curso invita a las personas participantes a examinar la identidad, el sentido de pertenencia, los prejuicios conscientes e inconscientes y cómo influyen en las experiencias escolares y el acceso a oportunidades. Mediante la reflexión y el diálogo, las familias relacionan sus vivencias con patrones más amplios e identifican maneras de apoyar entornos de aprendizaje más equitativos e inclusivos.",
      en: "This course invites participants to examine identity, belonging, conscious and unconscious bias, and the ways these forces shape students’ school experiences and access to opportunity. Through reflection and dialogue, families connect personal experiences to broader patterns and identify ways to support more equitable and inclusive learning environments." },
    MQUAL: { id: "PEA-M05", topic: "quality",
      es: "Este curso ayuda a las familias a definir una educación de alta calidad y comprender las opciones de escuelas públicas disponibles en Arizona, dentro y fuera de la escuela asignada. Las personas participantes analizan información sobre las escuelas, consideran cómo cada opción apoya el aprendizaje y la equidad y practican preguntas que orienten decisiones para sus estudiantes.",
      en: "This course helps families define high-quality education and understand Arizona’s public school options, including choices available within and beyond their assigned school. Participants examine information about schools, consider how different options support learning and equity, and practice asking questions that can inform decisions for their students." },
    MCOMM: { id: "PEA-M06", topic: "schools",
      es: "Este curso explica cómo se organizan los salones, las escuelas y los distritos e identifica a las personas y las rutas de comunicación que las familias pueden usar cuando surgen preguntas o inquietudes. Las personas participantes practican estrategias de comunicación de dos vías con maestros, directores, consejeros y otro personal escolar para construir alianzas enfocadas en las necesidades estudiantiles.",
      en: "This course explains how classrooms, schools, and districts are organized and identifies the people and communication pathways families can use when questions or concerns arise. Participants practice strategies for two-way communication with teachers, principals, counselors, and other school staff so they can build productive partnerships around student needs." },
    MREAD: { id: "PEA-M07", topic: "literacy",
      es: "Este curso presenta las habilidades fundamentales de la lectura y cómo puede verse una enseñanza eficaz mientras los estudiantes se desarrollan como lectores. Las familias aprenden a reconocer señales de que un estudiante podría necesitar apoyo adicional, revisan preguntas para el personal educativo y practican cómo abogar por una enseñanza de lectura apropiada y al nivel de grado.",
      en: "This course introduces foundational reading skills and what effective literacy instruction can look like as students develop as readers. Families learn how to recognize signs that a student may need additional support, review questions they can ask educators, and practice advocating for appropriate, grade-level literacy instruction." },
    MHOME: { id: "PEA-M08", topic: "literacy",
      es: "Este curso se enfoca en formas prácticas y culturalmente relevantes de apoyar el desarrollo de la lectura en casa y en cualquier idioma. Las familias practican estrategias para leer juntas, hacer preguntas, ampliar el vocabulario y crear rutinas que fortalezcan la confianza y conecten la lectura en casa con el aprendizaje escolar.",
      en: "This course focuses on practical, culturally responsive ways families can support reading development at home and in any language. Participants practice strategies for reading together, asking questions, building vocabulary, and creating routines that strengthen confidence and connect home literacy experiences with classroom learning." },
    MDIGI: { id: "PEA-M09", topic: "digital",
      es: "Este curso presenta conceptos de alfabetización digital que afectan a estudiantes y familias, incluyendo la seguridad en línea, el uso de medios, la desinformación, la privacidad y el acceso a herramientas de aprendizaje. Las personas participantes practican cómo evaluar información digital e identifican estrategias y recursos para orientar el uso responsable de la tecnología, comunicarse con las escuelas y apoyar el aprendizaje en casa.",
      en: "This course introduces digital literacy concepts that affect students and families, including online safety, media use, misinformation, privacy, and access to learning tools. Participants practice evaluating online information and identify strategies and resources for guiding responsible technology use, communicating with schools, and supporting learning at home." },
    MRGHT: { id: "PEA-M10", topic: "rights",
      es: "Este curso presenta los derechos y las responsabilidades clave de las familias y los estudiantes en la educación pública de Arizona, incluyendo protecciones para aprendices de inglés, estudiantes con discapacidades y familias con estatus migratorio mixto. Las personas participantes aprenden dónde encontrar información confiable, cómo expresar inquietudes y qué rutas de defensa pueden proteger el acceso, la inclusión y el éxito estudiantil.",
      en: "This course introduces key rights and responsibilities of families and students in Arizona public education, including protections for English Learners, students with disabilities, and mixed-status families. Participants learn where to locate reliable information, how to raise concerns, and which advocacy pathways can help protect access, inclusion, and student success." },
    MMATH: { id: "PEA-M11", topic: "math",
      es: "Este curso explora cómo ha cambiado la enseñanza de las matemáticas y qué se espera que los estudiantes comprendan y demuestren en los salones actuales. Las familias revisan estrategias para fortalecer la confianza y la resolución de problemas, identifican preguntas para el personal educativo y practican cómo abogar cuando un estudiante necesita una explicación más clara o apoyo adicional.",
      en: "This course explores how mathematics instruction has changed and what students are expected to understand and demonstrate in today’s math classrooms. Families examine strategies for supporting confidence and problem solving, identify questions to ask educators, and practice advocating when a student needs clearer instruction or additional support." },
    MOPHS: { id: "PEA-M12", topic: "opportunities",
      es: "Este curso presenta caminos disponibles después de la preparatoria, incluyendo colegios comunitarios, universidades, educación técnica y profesional, aprendizajes, servicio militar e ingreso directo al trabajo. Las familias consideran los intereses y las metas de sus estudiantes, exploran preguntas de planificación y ayuda financiera e identifican maneras de apoyar decisiones informadas sobre educación, capacitación y carreras.",
      en: "This course introduces pathways available after high school, including community college, universities, career and technical education, apprenticeships, military service, and direct entry into the workforce. Families consider students’ interests and goals, explore planning and financial-aid questions, and identify ways to support informed decisions about education, training, and careers.",
      /* NAU first-year admission (Danny Hernández, 2026-11-13): address supplied by Danny; nau.edu could not be opened from
         the build environment (TLS error through the proxy), so the title follows his description and names no figures. */
      /* Ask Benji's Spanish page (Danny Hernández, 2026-11-13; read that day) is now the row's Spanish link: text help 24/7
         ("Hola Benji" to 602-786-8171; #language switches the language) and the AZ FAFSA line in Spanish, 1-833-MiFAFSA,
         Monday–Friday 9 AM–3 PM. */
      /* Added 2026-11-13 (Danny Hernández): StudentAid.gov ES | EN after the USAGov FAFSA row; Aliento scholarships and
         ScholarshipsA-Z in the undocumented-students group; AZTransfer in college and career planning; a new group with
         the ASU and University of Arizona first-year course and GPA requirement pages. Pages opened 2026-11-13, except
         ScholarshipsA-Z (a Cloudflare check blocks automated reads; the address is the one in Danny's 6R handout). NAU's
         first-year page is held back: its site could not be reached from the build environment. */
      /* Added 2026-11-12 at Danny Hernández's request (named in the 6R handouts): Ask Benji and College Depot under
         "Pagar la universidad", USA Learns under "Clases de inglés". Each site has one address for both languages (no
         Spanish page; USA Learns has an English/Spanish switch for its instructions). Pages opened and read 2026-11-12. */
       },
    MEXCP: { id: "PEA-M13", topic: "sped",
      es: "Este curso explica cómo las escuelas identifican y apoyan a estudiantes excepcionales y presenta sistemas como educación especial, Programas de Educación Individualizados (IEP), planes de la Sección 504 y apoyos de varios niveles. Las familias comparan los apoyos disponibles, preparan preguntas para los equipos escolares y practican cómo abogar por servicios y oportunidades inclusivas que respondan a las fortalezas y necesidades de cada estudiante.",
      en: "This course explains how schools identify and support exceptional students and introduces common systems such as special education, Individualized Education Programs (IEPs), Section 504 plans, and multi-tiered supports. Families compare available supports, prepare questions for school teams, and practice advocating for services and inclusive opportunities aligned with each student’s strengths and needs." },
    MCENG: { id: "PEA-M14", topic: "family",
      es: "Este curso examina cómo se ve la participación familiar y comunitaria auténtica cuando las familias colaboran como socias en decisiones que afectan a estudiantes y escuelas. Las personas participantes exploran principios de participación significativa, distinguen entre asistir y compartir decisiones e identifican oportunidades para contribuir a la mejora escolar dentro y fuera de la escuela.",
      en: "This course examines what authentic family and community engagement looks like when families participate as partners in decisions that affect students and schools. Participants explore principles of meaningful engagement, distinguish participation from shared decision-making, and identify opportunities to contribute to school improvement within and beyond the school building." },
    MSELF: { id: "PEA-M15", topic: "advocacy",
      es: "Este curso ayuda a las personas participantes a desarrollar una Historia Personal que conecte su identidad, experiencias, valores, desafíos y decisiones con su liderazgo y defensa educativa. Las familias practican cómo construir y compartir una narrativa que comunique por qué la educación es importante para ellas y que apoye acciones con propósito a favor de estudiantes y comunidades.",
      en: "This course helps participants develop a Story of Self by connecting identity, lived experience, values, challenges, and choices to their leadership and advocacy. Families practice shaping and sharing a personal narrative that communicates why education matters to them and supports purposeful action on behalf of students and communities." },
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
      resend:      "https://airtable.com/appIqlWqvk2HkHVRM/paghCk5ZbEsieUtwb/form",
      /* "Sugerir un recurso / Suggest a resource" form (Airtable · PEA Resource List · Submissions), v0.24.0.
         Published by Danny Hernández, 2026-11-14 (alumni only; spec: maintenance/specs/suggest-resource-form.v1.json). */
      suggest:     "https://airtable.com/app1VeAGxcVHsV2bQ/pagiog0nqqde1TKgP/form"
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
           exit: "https://form.jotform.com/team/261975497443068/pea_fa26_pre" },
        { code: "2T",  kind: "cls", module: "MSAFE", start: "2026-10-14T00:00:00Z", end: "2026-10-14T01:30:00Z", title_es: "Seguridad y bienestar en la escuela", title_en: "School Safety and Well-Being" },
        { code: "2R",  kind: "cls", module: "MBIAS", start: "2026-10-16T00:00:00Z", end: "2026-10-16T01:30:00Z", title_es: "Sesgo, identidad y el mito de la oportunidad", title_en: "Bias, Identity & the Opportunity Myth" },
        { code: "3T",  kind: "cls", module: "MQUAL", start: "2026-10-21T00:00:00Z", end: "2026-10-21T01:30:00Z", title_es: "Acceso a una educación de calidad y la elección escolar", title_en: "Access to Quality Education & School Choice" },
        { code: "3R",  kind: "cls", module: "MCOMM", start: "2026-10-23T00:00:00Z", end: "2026-10-23T01:30:00Z", title_es: "Navegando salones, escuelas y distritos escolares", title_en: "Navigating Classrooms, Schools, and School Districts" },
        { code: "4T",  kind: "cls", module: "MREAD", start: "2026-10-28T00:00:00Z", end: "2026-10-28T01:30:00Z", title_es: "Fundamentos de la lectura y cómo abogar por los estudiantes", title_en: "Foundational Reading Skills & Advocating for Students in the Literacy Classroom" },
        { code: "4R",  kind: "cls", module: "MHOME", start: "2026-10-30T00:00:00Z", end: "2026-10-30T01:30:00Z", title_es: "Lectura en casa", title_en: "Reading at Home" },
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
