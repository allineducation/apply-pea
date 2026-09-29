/* ==================================================================
   PEA Applicant Hub — COPY DICTIONARY  (v0.14.0)
   ------------------------------------------------------------------
   Every user-visible string, in two complete languages with identical
   keys (AIE Hub Design System §3). ES and EN are parallel originals,
   not translations of each other.

   Reviewed for FA26. Most dynamic values come from facts.js.
   The bilingual schedule notice and policy copy must also be reviewed
   when preparing a new cohort.

   Narrative copy marked [G] originated in the PEA Program Guide
   v2.1.0. Version 0.9.4 includes editorial corrections and live-source checks.
   Human native-speaker sign-off is not claimed.

   Controlled vocabulary: never "empower"/"empoderar"; "salón" or
   "clase", never "aula"; "ustedes", never "vosotros"; "familias" or
   "padres y cuidadores", never "padres" alone.
   ================================================================== */
(function (root) {
  var T = {
    es: {
      _lang: "es",
      meta: {
        title: "Únase a PEA — Parent Educator Academy",
        description: "Todo lo que necesita saber para unirse a la Parent Educator Academy de ALL In Education: pasos, calendario, Zoom y preguntas frecuentes."
      },
      org: "ALL In Education",
      tagline: "Leadership · Power · Justice",
      taglinePair: null,
      toolTitle: "Parent Educator Academy",
      toolSub: function (c) { return "Centro de inscripción · " + c; },
      langSwitch: { toEn: "Switch to English", toEs: "Cambiar a español", group: "Idioma", announced: "Página en español" },

      nav: {
        home: "Inicio", label: "Secciones del sitio",
        prev: "← Anterior", next: "Siguiente →", start: "Comenzar →",
        groups: { join: "Unirse", about: "Conozca PEA", help: "Ayuda" }
      },
      sections: {
        participar: { label: "Cómo participar", desc: "Del formulario de interés a su primera clase.", time: "3 min" },
        calendario: { label: "Calendario y temas", desc: "Fechas, horarios y lo que va a aprender en cada clase.", time: "3 min" },
        zoom:       { label: "Zoom paso a paso", desc: "Videos cortos y consejos para entrar sin problema.", time: "3 min" },
        historia:   { label: "Experiencias e historia", desc: "Historias de familias, resultados y la organización.", time: "2 min" },
        preguntas:  { label: "Preguntas y enlaces", desc: "Respuestas rápidas y todos los enlaces útiles.", time: "4 min" },
        contacto:   { label: "Contacto", desc: "Escríbanos o mándenos un mensaje.", time: "1 min" }
      },

      ui: {
        skip: "Saltar al contenido",
        copy: "Copiar", copied: "✓ Copiado",
        show: "▼ Ver", hide: "▲ Ocultar",
        newTab: "(se abre en una pestaña nueva)",
        searchPh: "Buscar una pregunta…",
        clear: "Borrar búsqueda",
        noResults: "Sin resultados. Pruebe otra palabra o escríbanos.",
        noResultsLabel: "Sin resultados",
        count: function (n) { return n === 1 ? "1 pregunta" : n + " preguntas"; },
        recommended: "Empiece aquí",
        optional: "Opcional",
        minutes: function (t) { return "Lectura: " + t; }
      },

      hero: {
        eyebrow: function (label, num) { return label + " · Cohorte " + num; },
        title: "Todo lo que necesita saber para participar",                      /* [G] */
        sub: "La Parent Educator Academy es un programa de liderazgo para familias y cuidadores que quieren abogar por sus hijos dentro del sistema escolar de Arizona. También está abierto al personal escolar, como enlaces con las familias y maestros.", /* [G] + school-staff sentence (Danny, 2026-09-25) */
        chipFree: "Gratis",
        chipZoom: "En línea, por Zoom",
        chipSchedule: function (days, time) { return days + " · " + time; },
        chipLang: function (l) { return "Clases en " + l; }
      },

      next: {
        eyebrow: "Lo que sigue",                                                   /* [G] */
        now: "Ahora mismo",
        today: "Hoy", tomorrow: "Mañana",                                          /* [G] */
        inDays: function (n) { return "En " + n + " días"; },                    /* [G] */
        join: "Registrarse solo para la sesión informativa",
        addCal: "Agregar a mi calendario",
        classNote: "Para entrar a clase, use el enlace personal de Zoom de su correo de bienvenida. Es el mismo para todas las clases. No lo comparta.",
        holidayNote: "No hay clase ese día.",
        focusNote: "El equipo de PEA compartirá las instrucciones para participar en el grupo de enfoque.",
        nothing: "No hay eventos próximos en el calendario.",                      /* [G] */
        projected: "Fecha proyectada, todavía no confirmada."
      },

      stats: {
        cost: "Costo para participantes",
        classes: "Clases en vivo",
        alumni: "Personas en el registro histórico de exalumnos de PEA",
        alumniNote: function (d) { return "al " + d; }
      },

      home: {
        stepsH: "Otoño de 2026: del formulario a su primera clase"
      },

      steps: {                                                                     /* "Joining the Parent Educator Academy" (Danny, 2026-09-29) */
        h: "Cómo participar",
        items: [
          { t: "Llene el formulario de interés de PEA", d: "El formulario de interés es su solicitud. Escriba su nombre, correo electrónico, idioma preferido y la demás información que pide el formulario. Use un correo que revise con frecuencia: ahí le enviaremos la información de sus clases.", link: "apply", cta: "Ir al formulario", key: true },
          { t: "Busque su correo de bienvenida y guarde su enlace personal de Zoom", d: "Su correo de bienvenida incluye:", list: [
              "Su enlace personal de acceso a Zoom. Use este mismo enlace para entrar a todas las clases de PEA este otoño. También lo usamos para registrar su asistencia.",
              "Las fechas y el horario del programa.",
              "La guía para solicitantes de PEA.",
              "Maneras opcionales de hacer preguntas y conectar con otras familias y cuidadores."
            ], after: "Su enlace es solo para usted; por favor, no lo comparta. No necesita registrarse por separado en Zoom ni pedir un enlace nuevo cada semana." },
          { t: "Prepárese para el programa", d: "Antes y durante la primera semana del programa:", list: [
              "Lea la guía para solicitantes y agregue las fechas de clase a su calendario.",
              "Entre a su primera clase el martes 6 de octubre a las 5:00 p. m.",
              "Opcional: asista a la sesión informativa del jueves 1 de octubre, de 5:00 a 6:30 p. m., para conocer más y hacer preguntas. El enlace de registro viene en su correo de bienvenida y en esta página.",
              "Opcional: únase al grupo de WhatsApp de su cohorte para conectar con sus compañeros de clase.",
              "Descargue la aplicación de Zoom en su dispositivo y asegúrese de poder iniciar sesión.",
              "Pruebe su cámara, micrófono y conexión a Wi-Fi."
            ] },
          { t: "Entre a su primera clase", d: "Las clases de otoño de 2026 comienzan el martes 6 de octubre a las 5:00 p. m. Nos reunimos los martes y jueves de 5:00 a 6:30 p. m. hasta el martes 8 de diciembre. No hay clase el jueves 26 de noviembre, Día de Acción de Gracias. Unos minutos antes de cada clase:", list: [
              "Abra la aplicación de Zoom e inicie sesión.",
              "Haga clic en su enlace personal de acceso a Zoom.",
              "Espere en la sala de espera virtual de PEA."
            ], ordered: true, after: "Cuando el equipo de PEA esté listo, Zoom le pasará automáticamente a la clase. Podrá ver y escuchar a los facilitadores y a las demás familias y cuidadores de su cohorte." }
        ],
        infoDatesH: "Sesión informativa (opcional)",
        infoDatesNote: "Opcional. Es para conocer más el programa y hacer preguntas. Este registro es solo para la sesión informativa; no es el registro para las clases. El enlace también viene en su correo de bienvenida. ¿No puede asistir o tiene preguntas? Llame o mande un mensaje al 602-759-0619."
      },

      cal: {
        h: "Calendario y temas",
        scheduleLabel: "Fechas de otoño de 2026",
        scheduleNote: "18 clases programadas, martes y jueves, del 6 de octubre al 8 de diciembre de 2026. No hay clase el jueves 26 de noviembre (Día de Acción de Gracias). Sesión informativa opcional: jueves 1 de octubre. Grupo de enfoque: 10 de diciembre. Todo de 5:00 a 6:30 p. m., hora de Arizona. Si las clases ya comenzaron, consulte al equipo sobre la posibilidad de inscribirse.",
        tapHint: "Toque una clase para ver de qué trata, la hoja de trabajo y la lista de recursos. Para entrar a clase, use el enlace personal de Zoom de su correo de bienvenida.",
        filterLabel: "Mostrar",
        filters: { all: "Todo", info: "Sesiones informativas", cls: "Clases" },
        cols: { date: "Fecha", kind: "Tipo", topic: "Tema", time: "Hora" },
        kinds: { info: "Sesión informativa", cls: "Clase", holiday: "No hay clase", focus: "Grupo de enfoque", grad: "Graduación" }, /* [G] */
        topics: {                                                                  /* [G] */
          info: "Conozca más el programa y haga preguntas",
          holiday: "Día de Acción de Gracias",
          focus: "Conversación sobre su experiencia en PEA"
        },
        infoWording: "Opcional. Para conocer más el programa y hacer preguntas",
        week: function (n) { return "Semana " + n; },
        today: "Hoy", done: "Ya pasó",
        note: "Hora de Arizona. Las clases son por Zoom.",                         /* [G] */
        full: "Ver el calendario publicado",
        ics: "Descargar todas las fechas (.ics)",
        icsHelp: "El archivo .ics agrega las fechas al calendario de su teléfono o computadora.",
        icsName: "PEA",
        detail: {
          open: "Ver detalles de la clase", close: "Ocultar detalles",
          openInfo: "Ver detalles de la sesión",
          about: "Sobre esta clase", aboutInfo: "Sobre la sesión",
          zoomNote: "Entre con el enlace personal de Zoom de su correo de bienvenida; es el mismo para todas las clases. Si no lo encuentra, revise la carpeta de spam o correo no deseado y comuníquese con el equipo.",
          resources: "Lista de recursos",
          worksheet: "Hoja de trabajo (PDF)",
          addCal: "Agregar a mi calendario"
        },
        projectedLabel: "Por confirmar",
        projected: "Fechas proyectadas, todavía no confirmadas."
      },

      zoom: {
        h: "Zoom paso a paso",
        lead: "Si nunca ha usado Zoom, o si no está seguro de algún paso, estos videos cortos le muestran cómo hacerlo. Los videos están en español.", /* [G] */
        vids: [                                                                    /* [G] */
          ["vidAccount", "Crear una cuenta de Zoom", "Para poder iniciar sesión en la aplicación de Zoom."],
          ["vidName", "Cambiar el nombre que se muestra", "Para que le reconozcamos al entrar."]
        ],
        watch: "Ver el video",
        tipLabel: "Muy importante",
        tip: "Use el enlace personal de Zoom de su correo de bienvenida para entrar a todas las clases. Es solo para usted: no lo comparta. No necesita registrarse por separado en Zoom ni pedir un enlace nuevo cada semana.",
        orderH: "En este orden",
        order: [
          ["Descargue la aplicación de Zoom", "Instálela en su teléfono, tableta o computadora y asegúrese de poder iniciar sesión."],
          ["Pruebe su equipo", "Revise su cámara, micrófono y conexión a Wi-Fi."],
          ["Guarde su correo de bienvenida", "Trae su enlace personal de acceso a Zoom. Es el mismo para todas las clases."],
          ["Unos minutos antes de clase", "Abra la aplicación de Zoom, inicie sesión y haga clic en su enlace personal."],
          ["Espere en la sala de espera virtual de PEA", "Cuando el equipo de PEA esté listo, Zoom le pasará automáticamente a la clase."]
        ],
        lostLabel: "¿No encuentra su correo de bienvenida?",
        lost: "Revise la carpeta de spam o correo no deseado. Si aún no lo encuentra, escríbanos a pea@allineducation.org o llame, mande un texto o un WhatsApp al 602-759-0619.",
        deviceLabel: "¿Computadora o teléfono?",
        device: "La computadora o la tableta hacen la experiencia mejor: se ven los materiales y es más fácil participar. Si el teléfono es lo que tiene, el teléfono funciona." /* [G] */
      },


      hist: {                                                                      /* [G] */
        h: "Experiencias e historia",
        p: [
          "PEA nació durante la pandemia. ALL In Education vio que la distancia entre las escuelas y las familias se había vuelto el obstáculo principal, y creó la Parent Educator Academy para que madres, padres y cuidadores pudieran navegar el aprendizaje virtual, entender cómo funciona el sistema escolar y ganar confianza para abogar por sus hijos.",
          "La primera cohorte se graduó en la primavera de 2021, con 27 personas. La evaluación de LeCroy & Milligan de agosto de 2022 reportó una asistencia promedio del 96.4% a las 15 sesiones centrales y que las 111 personas participantes de la cohorte de primavera de 2022 se graduaron.",
          "Desde entonces cada cohorte ha dejado algo: preguntas que se volvieron parte del currículo, lugares donde el sistema se atoraba una y otra vez, y exalumnos que ahora acompañan a las familias que llegan."
        ],
        stats: {
          alumni: "Personas en el registro histórico de exalumnos de PEA",
          alumniNote: function (cohorts, years, date) { return "Registro histórico al " + date + ". No es la matrícula actual."; },
          cohort: "Cohorte número",
          cohortNote: "cohorte presentada en esta página",
          counties: "Condados principales",
          countiesNote: "Maricopa, Pima y Yuma",
          grad: "Graduación",
          gradNote: "cohorte de primavera de 2022; 111 participantes"
        },
        missionH: "La misión de ALL In Education",
        mission: "Asegurar que las personas de las comunidades más afectadas por las desigualdades educativas sean quienes toman las decisiones que dan forma a los sistemas educativos, para que todos los estudiantes y las familias de Arizona puedan prosperar.",
      },

      faq: {
        h: "Preguntas frecuentes",
        items: [
          ["¿Cómo solicito un lugar en PEA?", "El formulario de interés es su solicitud. No hay proceso de aceptación ni formulario de compromiso. Después de enviarlo, preparamos su acceso a Zoom y le mandamos su enlace personal en el correo de bienvenida."],
          ["¿Cómo sé que ya tengo mi lugar?", "Le llegará un correo de bienvenida con su enlace personal de Zoom, las fechas del programa y la guía para solicitantes de PEA. Guarde ese enlace: lo usará para entrar a todas las clases."],
          ["¿Quién puede participar?", "Familias y cuidadores que quieren abogar por sus hijos dentro del sistema escolar de Arizona. PEA también está abierto al personal escolar, como enlaces con las familias y maestros. No hay proceso de selección: el formulario de interés es la manera de entrar."],
          ["¿Es obligatorio asistir a la sesión informativa?", "No. Es opcional. Es el jueves 1 de octubre, de 5:00 a 6:30 p. m., hora de Arizona: una oportunidad para conocernos, conocer más el programa y hacer preguntas. El registro es solo para la sesión informativa. No asistir no afecta su lugar de ninguna manera."],
          ["¿Qué pasa si no puedo asistir a la sesión informativa?", "No pasa nada: no es obligatoria. Si tiene preguntas, llame o mande un mensaje al 602-759-0619."],
          ["¿En qué idioma es el programa?", function (c) { return "La cohorte de " + c.label + " se imparte en " + c.lang + ". La sesión informativa es bilingüe — se habla español e inglés — para que cualquier familia pueda conocer más el programa y hacer preguntas."; }], /* cohort resolved from facts */
          ["¿Cuánto cuesta?", "Nada. PEA es gratuito para todas las personas participantes."], /* [G], widened to all participants (Danny, 2026-09-25) */
          ["¿Necesito una cuenta de Zoom?", "Descargue la aplicación de Zoom en su dispositivo y asegúrese de poder iniciar sesión. Para entrar a clase, use el enlace personal de su correo de bienvenida. No necesita registrarse por separado en Zoom. La sección «Zoom paso a paso» le muestra cómo prepararse."],
          ["No encuentro mi correo de bienvenida. ¿Qué hago?", "Revise la carpeta de spam o correo no deseado. Si aún no lo encuentra, escríbanos a pea@allineducation.org o llame, mande un texto o un WhatsApp al 602-759-0619."],
          ["Trabajo en una escuela. ¿Cómo puedo ayudar a las familias?", "Ayude a las familias a llenar el formulario de interés, a encontrar su correo de bienvenida y a comunicarse con nuestro equipo si necesitan ayuda. Cada persona recibe su propio enlace personal de acceso a Zoom."],
          ["¿Qué pasa si falto a una clase?", "Avise al equipo de PEA con anticipación si no puede asistir. Para recibir su certificado, debe asistir al menos a 16 de las 18 clases. Escríbanos si necesita apoyo para cumplir este requisito."], /* [G] */
          ["¿Puedo participar desde el teléfono?", "Sí, aunque la computadora o la tableta hacen la experiencia mejor: se ven los materiales y es más fácil participar. Si el teléfono es lo que tiene, el teléfono funciona."], /* [G] */
          ["¿Qué es la encuesta de salida?", "Es una encuesta corta que se completa después de cada clase — entre cinco y ocho preguntas, dos a cuatro minutos. Nos dice qué está funcionando y qué no, y es la razón por la que el programa cambia de una cohorte a otra."], /* [G] */
          ["¿Hay algo después del programa?", "Sí. Los exalumnos siguen conectados con ALL In Education — hay grupos de enfoque, oportunidades de liderazgo y acompañamiento a las familias nuevas. La graduación es el final del curso, no del vínculo."] /* [G]; "AIE" → full name per brand §4 */
        ],
      },

      links: {
        h: "Enlaces útiles",
        lead: "Todo lo que va a necesitar, en un solo lugar.",                    /* [G] */
        groups: [
          { h: "Para unirse", items: [
            ["apply", "Formulario de interés", "Su solicitud para PEA: el primer paso."],
            ["info", "Registro solo para la sesión informativa", "Opcional. Jueves 1 de octubre, de 5:00 a 6:30 p. m. No es el registro para las clases."],
            ["cal", "Calendario publicado", "Todas las fechas del programa."]                    /* [G] */
          ]},
          { h: "Tutoriales de Zoom", items: [
            ["vidAccount", "Crear una cuenta de Zoom", "Para poder iniciar sesión en la aplicación de Zoom."],
            ["vidName", "Cambiar el nombre que se muestra", "Para que le reconozcamos al entrar."]
          ]},
          { h: "Durante el programa", items: [
            ["whatsapp", "Grupo de WhatsApp de otoño de 2026 (opcional)", "Para conectar con sus compañeros de clase."],
            ["exit", "Encuesta de salida", "Se completa después de cada clase."],              /* [G] */
            ["lista", "Lista de recursos", "Materiales y enlaces de apoyo."],                   /* [G] */
          ]},
          { h: "Para compartir", items: [
            ["flyer", "Volante del programa", "Para imprimir o mandar por mensaje."]
          ]}
        ],
      },

      contact: {
        h: "Contacto",
        lead: "Escríbanos o mándenos un mensaje. Contestamos en español y en inglés.", /* [G] */
        labels: { email: "Correo", phone: "Teléfono (llamada o texto)", wa: "WhatsApp", web: "Sitio web" },
        waCta: "Mandar un mensaje",
        webLabel: "allineducation.org"
      },

      foot: {
        rights: "© ALL In Education. Todos los derechos reservados.",
        version: function (v, d) { return "Versión " + v + " · Actualizado el " + d; },
        dates: function (d) { return "Fechas: calendario de PEA, verificado el " + d; },
        logoAlt: "ALL In Education — Leadership · Power · Justice"
      },

      markAlt: "ALL In Education",
      days: { names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
              short: ["dom","lun","mar","mié","jue","vie","sáb"],
              months: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
              and: "y" }
    },

    en: {
      _lang: "en",
      meta: {
        title: "Join PEA — Parent Educator Academy",
        description: "Everything you need to know to join ALL In Education's Parent Educator Academy: steps, calendar, Zoom and frequently asked questions."
      },
      org: "ALL In Education",
      tagline: "Leadership · Power · Justice",
      taglinePair: null,
      toolTitle: "Parent Educator Academy",
      toolSub: function (c) { return "Registration hub · " + c; },
      langSwitch: { toEn: "Switch to English", toEs: "Cambiar a español", group: "Language", announced: "Page in English" },

      nav: {
        home: "Home", label: "Site sections",
        prev: "← Previous", next: "Next →", start: "Get started →",
        groups: { join: "Join", about: "About PEA", help: "Help" }
      },
      sections: {
        participar: { label: "How to take part", desc: "From your interest form to your first class.", time: "3 min" },
        calendario: { label: "Calendar & topics", desc: "Dates, times, and what you will learn in each class.", time: "3 min" },
        zoom:       { label: "Zoom step by step", desc: "Short videos and tips to get in without trouble.", time: "3 min" },
        historia:   { label: "Stories & history", desc: "Family experiences, findings, and the organization.", time: "2 min" },
        preguntas:  { label: "Questions & links", desc: "Quick answers and every useful link.", time: "4 min" },
        contacto:   { label: "Contact", desc: "Write to us or send a message.", time: "1 min" }
      },

      ui: {
        skip: "Skip to content",
        copy: "Copy", copied: "✓ Copied",
        show: "▼ Show", hide: "▲ Hide",
        newTab: "(opens in a new tab)",
        searchPh: "Search the questions…",
        clear: "Clear search",
        noResults: "No matches. Try another word, or write to us.",
        noResultsLabel: "No matches",
        count: function (n) { return n === 1 ? "1 question" : n + " questions"; },
        recommended: "Start here",
        optional: "Optional",
        minutes: function (t) { return t + " read"; }
      },

      hero: {
        eyebrow: function (label, num) { return label + " · Cohort " + num; },
        title: "Everything you need to know to take part",
        sub: "The Parent Educator Academy is a leadership program for families and caregivers who want to advocate for their children inside Arizona's school system. It is also open to school staff, such as family liaisons and teachers.",
        chipFree: "Free",
        chipZoom: "Online, on Zoom",
        chipSchedule: function (days, time) { return days + " · " + time; },
        chipLang: function (l) { return "Taught in " + l; }
      },

      next: {
        eyebrow: "Coming up",
        now: "Happening now",
        today: "Today", tomorrow: "Tomorrow",
        inDays: function (n) { return "In " + n + " days"; },
        join: "Register for the info session only",
        addCal: "Add to my calendar",
        classNote: "To join class, use the personal Zoom link in your welcome email. It is the same for every class. Do not share it.",
        holidayNote: "There is no class that day.",
        focusNote: "The PEA team will share instructions for joining the focus group.",
        nothing: "Nothing else on the calendar right now.",
        projected: "Projected date, not yet confirmed."
      },

      stats: {
        cost: "Cost to participants",
        classes: "Live classes",
        alumni: "People in the historical PEA alumni registry",
        alumniNote: function (d) { return "as of " + d; }
      },

      home: {
        stepsH: "Fall 2026: from your interest form to your first class"
      },

      steps: {                                                                     /* "Joining the Parent Educator Academy" (Danny, 2026-09-29) */
        h: "How to take part",
        items: [
          { t: "Complete the PEA interest form", d: "The interest form is your application. Enter your name, email address, preferred language, and the other information requested on the form. Use an email address you check often. We will send your class information there.", link: "apply", cta: "Go to the form", key: true },
          { t: "Find your welcome email and save your personal Zoom link", d: "Your welcome email includes:", list: [
              "Your personal Zoom access link. Use this same link to join every PEA class this fall. We also use it to record attendance.",
              "The program dates and schedule.",
              "The PEA applicant guide.",
              "Optional ways to ask questions and connect with other parents and caregivers."
            ], after: "Your link is for you only, so please do not share it. You do not need to register separately in Zoom or get a new link each week." },
          { t: "Get ready for the program", d: "Before and during the first week of the program:", list: [
              "Read the applicant guide and add the class dates to your calendar.",
              "Join your first class on Tuesday, October 6, at 5:00 PM.",
              "Optional: attend the information session on Thursday, October 1, 5:00–6:30 PM, to learn more and ask questions. The registration link is in your welcome email and on this page.",
              "Optional: join the WhatsApp group for your cohort to connect with classmates.",
              "Download the Zoom app to your device and make sure you can sign in.",
              "Test your camera, microphone, and Wi-Fi connection."
            ] },
          { t: "Join your first class", d: "Fall 2026 classes begin on Tuesday, October 6, at 5:00 PM. Classes meet on Tuesdays and Thursdays from 5:00–6:30 PM through Tuesday, December 8. There is no class on Thanksgiving, Thursday, November 26. A few minutes before each class:", list: [
              "Open the Zoom app and sign in.",
              "Click your personal Zoom access link.",
              "Wait in the PEA Virtual Waiting Room."
            ], ordered: true, after: "When the PEA team is ready, Zoom will automatically move you into the class. You will be able to see and hear the facilitators and the other parents and caregivers in your cohort." }
        ],
        infoDatesH: "Information session (optional)",
        infoDatesNote: "Optional. A chance to learn more about the program and ask questions. This registration is for the information session only; it is not class registration. The link is also in your welcome email. Unable to join or have questions? Call or text 602-759-0619."
      },

      cal: {
        h: "Calendar & topics",
        scheduleLabel: "Fall 2026 dates",
        scheduleNote: "18 scheduled classes on Tuesdays and Thursdays, October 6–December 8, 2026. No class Thursday, November 26 (Thanksgiving). Optional information session: Thursday, October 1. Focus group: December 10. All events run 5:00–6:30 PM Arizona time. If classes have already started, contact the team about joining.",
        tapHint: "Tap a class to see what it covers, the worksheet, and the resource list. To join class, use the personal Zoom link in your welcome email.",
        filterLabel: "Show",
        filters: { all: "All", info: "Information sessions", cls: "Classes" },
        cols: { date: "Date", kind: "Type", topic: "Topic", time: "Time" },
        kinds: { info: "Information session", cls: "Class", holiday: "No class", focus: "Focus group", grad: "Graduation" },
        topics: {
          info: "Learn more about the program and ask questions",
          holiday: "Thanksgiving",
          focus: "A conversation about your time in PEA"
        },
        infoWording: "Optional. Learn more about the program and ask questions",
        week: function (n) { return "Week " + n; },
        today: "Today", done: "Past",
        note: "Arizona time. Classes meet on Zoom.",
        full: "See the published calendar",
        ics: "Download every date (.ics)",
        icsHelp: "The .ics file adds the dates to the calendar on your phone or computer.",
        icsName: "PEA",
        detail: {
          open: "See class details", close: "Hide details",
          openInfo: "See session details",
          about: "About this class", aboutInfo: "About the session",
          zoomNote: "Join with the personal Zoom link in your welcome email; it is the same for every class. If you cannot find it, check your spam or junk folder and contact the team.",
          resources: "Resource list",
          worksheet: "Worksheet (PDF, in Spanish)",
          addCal: "Add to my calendar"
        },
        projectedLabel: "To be confirmed",
        projected: "Projected dates, not yet confirmed."
      },

      zoom: {
        h: "Zoom step by step",
        lead: "If you have never used Zoom, or are unsure about a step, these short videos walk you through it. The videos are in Spanish.",
        vids: [
          ["vidAccount", "Create a Zoom account", "So you can sign in to the Zoom app."],
          ["vidName", "Change your display name", "So we recognize you when you arrive."]
        ],
        watch: "Watch the video",
        tipLabel: "Very important",
        tip: "Use the personal Zoom link in your welcome email to join every class. It is for you only, so please do not share it. You do not need to register separately in Zoom or get a new link each week.",
        orderH: "In this order",
        order: [
          ["Download the Zoom app", "Install it on your phone, tablet, or computer and make sure you can sign in."],
          ["Test your device", "Check your camera, microphone, and Wi-Fi connection."],
          ["Save your welcome email", "It has your personal Zoom access link. It is the same for every class."],
          ["A few minutes before class", "Open the Zoom app, sign in, and click your personal link."],
          ["Wait in the PEA Virtual Waiting Room", "When the PEA team is ready, Zoom will automatically move you into the class."]
        ],
        lostLabel: "Can't find your welcome email?",
        lost: "Check your spam or junk folder. If you still cannot find it, contact us at pea@allineducation.org or call, text, or WhatsApp 602-759-0619.",
        deviceLabel: "Computer or phone?",
        device: "A computer or tablet makes for a better experience: the materials are easier to see and it is easier to take part. If a phone is what you have, a phone works."
      },


      hist: {
        h: "Stories & history",
        p: [
          "PEA began during the pandemic. ALL In Education saw that the distance between schools and families had become the main barrier, and built the Parent Educator Academy so that parents and caregivers could navigate virtual learning, understand how the school system works, and gain the confidence to advocate for their children.",
          "The first cohort graduated in spring 2021, with 27 people. The August 2022 LeCroy & Milligan evaluation reported average attendance of 96.4% across the 15 core sessions and graduation by all 111 participants in the spring 2022 cohort.",
          "Every cohort since has left something behind: questions that became part of the curriculum, places where the system kept getting stuck, and alumni who now walk alongside the families coming in."
        ],
        stats: {
          alumni: "People in the historical PEA alumni registry",
          alumniNote: function (cohorts, years, date) { return "Historical registry as of " + date + ". This is not current enrollment."; },
          cohort: "Cohort number",
          cohortNote: "cohort featured on this page",
          counties: "Primary counties",
          countiesNote: "Maricopa, Pima and Yuma",
          grad: "Graduation rate",
          gradNote: "spring 2022 cohort; 111 participants"
        },
        missionH: "The ALL In Education mission",
        mission: "To ensure that individuals from the communities most impacted by education inequities are the ones making decisions that shape education systems, so all students and families in Arizona can thrive.",
      },

      faq: {
        h: "Frequently asked questions",
        items: [
          ["How do I apply for PEA?", "The interest form is your application. There is no acceptance process and no commitment form. After you submit it, we set up your Zoom access and send your personal link in your welcome email."],
          ["How do I know I have a place?", "You will receive a welcome email with your personal Zoom link, the program dates, and the PEA applicant guide. Save that link: you will use it to join every class."],
          ["Who can take part?", "Families and caregivers who want to advocate for their children inside Arizona's school system. PEA is also open to school staff, such as family liaisons and teachers. There is no selection process: the interest form is the way in."],
          ["Do I have to attend the information session?", "No. It is optional. It takes place Thursday, October 1, 5:00–6:30 PM Arizona time: a chance to meet us, learn more about the program, and ask questions. The registration is for the information session only. Not attending does not affect your place in any way."],
          ["What if I cannot attend the information session?", "That is fine: it is not required. If you have questions, call or text 602-759-0619."],
          ["What language is the program in?", function (c) { return "The " + c.label + " cohort is taught in " + c.lang + ". The information session is bilingual — Spanish and English — so any family can learn more about the program and ask questions."; }], /* cohort resolved from facts */
          ["What does it cost?", "Nothing. PEA is free for everyone who takes part."],
          ["Do I need a Zoom account?", "Download the Zoom app to your device and make sure you can sign in. To join class, use the personal link in your welcome email. You do not need to register separately in Zoom. The “Zoom step by step” section shows you how to get ready."],
          ["I cannot find my welcome email. What do I do?", "Check your spam or junk folder. If you still cannot find it, contact us at pea@allineducation.org or call, text, or WhatsApp 602-759-0619."],
          ["I work at a school. How can I help families?", "Please help families complete the interest form, find their welcome email, and contact our team if they need help. Each applicant receives a personal Zoom access link."],
          ["What happens if I miss a class?", "Notify the PEA team in advance if you cannot attend. To receive your certificate, you must attend at least 16 of the 18 classes. Contact us if you need support meeting this requirement."],
          ["Can I take part from my phone?", "Yes, though a computer or tablet makes for a better experience: the materials are easier to see and it is easier to take part. If a phone is what you have, a phone works."],
          ["What is the exit ticket?", "It is a short survey completed after each class — five to eight questions, two to four minutes. It tells us what is working and what is not, and it is the reason the program changes from one cohort to the next."],
          ["Is there anything after the program?", "Yes. Alumni stay connected to ALL In Education — there are focus groups, leadership opportunities, and the chance to walk alongside families coming in. Graduation ends the course, not the relationship."]
        ],
      },

      links: {
        h: "Useful links",
        lead: "Everything you will need, in one place.",
        groups: [
          { h: "To join", items: [
            ["apply", "Interest form", "Your PEA application: the first step."],
            ["info", "Information session registration only", "Optional. Thursday, October 1, 5:00–6:30 PM. This is not class registration."],
            ["cal", "Published calendar", "Every date in the program."]
          ]},
          { h: "Zoom tutorials", items: [
            ["vidAccount", "Create a Zoom account", "So you can sign in to the Zoom app."],
            ["vidName", "Change your display name", "So we recognize you when you arrive."]
          ]},
          { h: "During the program", items: [
            ["whatsapp", "Fall 2026 WhatsApp group (optional)", "Connect with your classmates."],
            ["exit", "Exit ticket", "Completed after each class."],
            ["lista", "Resource list", "Supporting materials and links."],
          ]},
          { h: "To share", items: [
            ["flyer", "Program flyer", "To print or send by message."]
          ]}
        ],
      },

      contact: {
        h: "Contact",
        lead: "Write to us or send a message. We answer in Spanish and English.",
        labels: { email: "Email", phone: "Phone (call or text)", wa: "WhatsApp", web: "Website" },
        waCta: "Send a message",
        webLabel: "allineducation.org"
      },

      foot: {
        rights: "© ALL In Education. All rights reserved.",
        version: function (v, d) { return "Version " + v + " · Updated " + d; },
        dates: function (d) { return "Dates: PEA calendar, checked " + d; },
        logoAlt: "ALL In Education — Leadership · Power · Justice"
      },

      markAlt: "ALL In Education",
      days: { names: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              short: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
              months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
              and: "and" }
    }
  };

  T.es.applicant = {
  "helpText": "¿Tiene preguntas o no encuentra su correo de bienvenida? Revise la carpeta de spam o correo no deseado. Si aún no lo encuentra, comuníquese con nuestro equipo.",
  "helpEmail": "Escribir al equipo",
  "helpCall": "Llamar o mandar texto",
  "detailsH": "Detalles del programa y compromiso",
  "audienceH": "¿Dónde está usted con PEA?",
  "audience": [
    ["Quiero unirme", "Pasos para inscribirse y la sesión informativa."],
    ["Ya estoy inscrito/a", "Calendario de clases, su enlace de Zoom y materiales."],
    ["Ya terminé PEA", "Cómo seguir conectado después de PEA."]
  ],
  "benefitsH": "Herramientas para acompañar a su estudiante",
  "benefitsLead": "Explore lo que puede aprender y cómo se relaciona con situaciones de la vida diaria. Estos son objetivos de aprendizaje; cada familia tiene su propia experiencia.",
  "benefits": [
    [
      "Preparar una conversación con la escuela",
      "Pensar qué preguntas hacer, qué información compartir y cómo dar seguimiento a una conversación con el personal escolar."
    ],
    [
      "Encontrar a quién acudir",
      "Conocer cómo se organizan las escuelas y los distritos y explorar a quién dirigirse cuando surge una inquietud."
    ],
    [
      "Apoyar el aprendizaje en casa",
      "Explorar ideas para acompañar la lectura y las matemáticas, y conversar con la escuela sobre las necesidades de su estudiante."
    ],
    [
      "Participar en su comunidad",
      "Identificar maneras de compartir su experiencia, colaborar con otras familias y participar en decisiones escolares."
    ]
  ],
  "learnCta": "Conocer la experiencia y los temas →",
  "fitH": "¿PEA es para mí?",
  "fitLead": "PEA se dirige a familias y cuidadores que quieren acompañar a sus hijos y abogar por ellos dentro del sistema escolar de Arizona. También está abierto al personal escolar, como enlaces con las familias y maestros.",
  "fitItems": [
    [
      "Su relación con el estudiante",
      "Si usted es abuelo, abuela, tutor u otra persona cuidadora y tiene dudas sobre su participación, el equipo puede orientarle."
    ],
    [
      "Su escuela o función",
      "Si trabaja en una escuela —por ejemplo, como enlace con las familias o maestro—, también puede participar. Si tiene dudas sobre si el programa corresponde al tipo de escuela o grado de su estudiante, consulte al equipo."
    ],
    [
      "Su idioma",
      "Las clases de otoño de 2026 se imparten en español. La sesión informativa y la atención del equipo están disponibles en español e inglés. Si busca clases en inglés, comuníquese con nosotros."
    ]
  ],
  "askCta": "Consultar al equipo de PEA →",
  "experienceH": "Imagine una clase de PEA",
  "experienceLead": "Las clases son reuniones en vivo por Zoom. La participación incluye conversaciones, preguntas y actividades con otras personas. El formato puede variar según el tema.",
  "experience": [
    [
      "Aprender",
      "Conocer el tema de la sesión y relacionarlo con su experiencia familiar o escolar."
    ],
    [
      "Conversar y participar",
      "Compartir preguntas e ideas durante las conversaciones y actividades."
    ],
    [
      "Reflexionar",
      "Completar la encuesta de salida al terminar: de cinco a ocho preguntas, aproximadamente dos a cuatro minutos."
    ]
  ],
  "practiceH": "Una pregunta para empezar",
  "practiceText": "Piense en una conversación que le gustaría tener con la escuela de su estudiante. ¿Qué le gustaría entender mejor? Anote una pregunta y la información que le ayudaría a explicarla.",
  "practiceNote": "Esta es una invitación opcional a reflexionar antes de participar. No es una tarea ni necesita enviarla.",
  "commitmentH": "El tiempo que necesita reservar",
  "commitmentText": "18 sesiones de 90 minutos: 27 horas programadas en vivo. Nos reunimos los martes y jueves de 5:00 a 6:30 p. m., hora de Arizona. El calendario incluye la pausa por el Día de Acción de Gracias.",
  "commitmentNote": "Ese cálculo corresponde solo a las 18 clases, incluida la graduación. No incluye la sesión informativa opcional ni el grupo de enfoque. Consulte al equipo si necesita saber cuánto tiempo adicional requieren los materiales o las actividades.",
  "certificateH": "Su certificado",
  "certificateText": "Debe asistir al menos a 16 de las 18 clases para recibir su certificado. Avise con anticipación si no puede asistir. El equipo puede explicarle los demás requisitos de participación y cómo se entrega el certificado.",
  "staffH": "Para el personal escolar",
  "staffText": "Ayude a las familias a llenar el formulario de interés, a encontrar su correo de bienvenida y a comunicarse con nuestro equipo si necesitan ayuda. Cada persona recibe su propio enlace personal de acceso a Zoom.",
  "supportH": "Hablemos de lo que necesita para participar",
  "supportText": "Puede comunicarse con el equipo en español o inglés antes de la primera clase. Cuéntenos si necesita ayuda con Zoom, si su conexión es inestable o si tiene alguna necesidad de accesibilidad. Pregunte también por subtítulos, uso de cámara, grabaciones o recuperación de una clase; el equipo le explicará las opciones y las reglas vigentes.",
  "teamH": "Conozca al equipo que le acompaña",
  "storiesH": "Experiencias de familias",
  "storiesLead": "Estas historias publicadas en 2023 muestran experiencias de participantes de años anteriores. Las fechas y condiciones de esas historias no describen la cohorte actual.",
  "stories": [
    [
      "Patricia: hablar con la escuela",
      "Arizona Luminaria cuenta cómo Patricia Ojeda pasó de sentirse intimidada al hablar con la escuela a expresar inquietudes y buscar apoyo para el aprendizaje de sus hijos."
    ],
    [
      "Gloria: otra forma de navegar el sistema",
      "Gloria Castejón, madre y exmaestra, relata cómo participar en PEA le permitió compartir lo que sabía y descubrir otras maneras de navegar el sistema educativo."
    ]
  ],
  "storyCta": "Leer la historia en Arizona Luminaria",
  "videoH": "Conozca ALL In Education",
  "videoText": "Video institucional: «ALL In Education — Who We Are». Duración: 6 minutos y 44 segundos. Está en inglés; YouTube ofrece subtítulos automáticos en inglés. Presenta a la organización y su misión.",
  "videoCta": "Ver el video en YouTube",
  "evidenceH": "Lo que encontró una evaluación anterior",
  "evidenceText": "La evaluación de LeCroy & Milligan de 2022 encontró una mejora en la efectividad que las personas participantes reportaron al comunicarse con maestros. Es un resultado de aquella cohorte, no una garantía para cada participante.",
  "evidenceSource": "Fuente: Parent Educator Academy Evaluation Report, agosto de 2022, página 25; análisis de encuestas antes y después del programa, 109 participantes.",
  "alumniH": "Después de PEA",
  "alumniText": "La relación puede continuar después de la graduación. Pregunte al equipo por las oportunidades actuales de participación, grupos de enfoque y liderazgo, y por la manera de recibir esos avisos.",
  "faq": [
    [
      "¿Cuánto tiempo debo reservar?",
      "Las 18 clases de 90 minutos suman 27 horas en vivo. Las clases son los martes y jueves, de 5:00 a 6:30 p. m., hora de Arizona. La sesión informativa opcional y el grupo de enfoque son adicionales; consulte al equipo sobre el tiempo para actividades fuera de clase."
    ],
    [
      "¿Recibiré un certificado?",
      "Para recibir su certificado, debe asistir al menos a 16 de las 18 clases. Consulte al equipo sobre los demás requisitos de participación y la entrega del certificado."
    ],
    [
      "¿Se graban las clases o puedo recuperar una sesión?",
      "Antes de inscribirse, consulte al equipo sobre la política vigente de grabaciones y recuperación de clases. Si sabe que faltará a una sesión, avise con anticipación y pregunte cómo puede mantenerse al día."
    ],
    [
      "¿Qué pasa si mi conexión falla o no puedo encender la cámara?",
      "Avise al equipo para explicar su situación y pedir orientación. Antes de comenzar, pruebe su conexión, cámara y micrófono. Consulte las expectativas vigentes para su caso."
    ],
    [
      "¿Puedo pedir subtítulos u otro apoyo de accesibilidad?",
      "Sí puede comunicar sus necesidades al equipo antes de la primera clase. El equipo le explicará qué apoyos están disponibles y cómo solicitarlos."
    ],
    [
      "¿Puedo participar si trabajo en una escuela o soy otra persona cuidadora?",
      "Sí. PEA también está abierto al personal escolar, como enlaces con las familias y maestros, y a otras personas cuidadoras. Si tiene dudas sobre su caso, el equipo puede orientarle."
    ],
    [
      "¿Hay clases en inglés en esta cohorte?",
      "Las clases de otoño de 2026 se imparten en español. La sesión informativa es bilingüe y el equipo atiende en español e inglés. Si necesita clases en inglés, pregunte por las opciones disponibles."
    ]
  ],
  "teamText": "El equipo de PEA es su contacto para preguntas sobre el formulario de interés, su correo de bienvenida, el acceso a Zoom y la participación. Use el correo, WhatsApp o teléfono que aparecen abajo para pedir orientación antes de decidir o durante el programa."
};
  T.en.applicant = {
  "helpText": "Questions, or missing your welcome email? Check your spam or junk folder. If you still cannot find it, contact our team.",
  "helpEmail": "Email the team",
  "helpCall": "Call or text",
  "detailsH": "Program details and commitment",
  "audienceH": "Where are you with PEA?",
  "audience": [
    ["I want to join", "Steps to sign up and the information session."],
    ["I’m registered", "Class calendar, your Zoom link, and materials."],
    ["I finished PEA", "How to stay connected after PEA."]
  ],
  "benefitsH": "Tools to support your student",
  "benefitsLead": "Explore what you can learn and how it connects to everyday situations. These are learning goals; each family’s experience is different.",
  "benefits": [
    [
      "Prepare for a school conversation",
      "Think through questions to ask, information to share, and ways to follow up with school staff."
    ],
    [
      "Find whom to contact",
      "Learn how schools and districts are organized and explore whom to approach when a concern arises."
    ],
    [
      "Support learning at home",
      "Explore ways to support reading and math and discuss your student’s learning needs with the school."
    ],
    [
      "Take part in your community",
      "Identify ways to share your experience, collaborate with other families, and participate in school decisions."
    ]
  ],
  "learnCta": "Explore the experience and topics →",
  "fitH": "Is PEA a fit for me?",
  "fitLead": "PEA is for families and caregivers who want to support their children and advocate for them within Arizona’s school system. It is also open to school staff, such as family liaisons and teachers.",
  "fitItems": [
    [
      "Your relationship to the student",
      "If you are a grandparent, guardian, or another caregiver and have questions about participating, the team can guide you."
    ],
    [
      "Your school or role",
      "If you work at a school — for example, as a family liaison or teacher — you are welcome to take part. If you have questions about your student’s school type or grade level, contact the team."
    ],
    [
      "Your language",
      "Fall 2026 classes are taught in Spanish. The information session and team support are available in Spanish and English. Contact us if you are looking for classes in English."
    ]
  ],
  "askCta": "Ask the PEA team →",
  "experienceH": "Picture a PEA class",
  "experienceLead": "Classes meet live on Zoom. Participation includes conversations, questions, and activities with others. The format may vary by topic.",
  "experience": [
    [
      "Learn",
      "Explore the session topic and connect it with your family or school experience."
    ],
    [
      "Discuss and participate",
      "Share questions and ideas during conversations and activities."
    ],
    [
      "Reflect",
      "Complete the exit survey at the end: five to eight questions, taking about two to four minutes."
    ]
  ],
  "practiceH": "A question to get started",
  "practiceText": "Think of a conversation you would like to have with your student’s school. What would you like to understand better? Write down one question and the information that would help you explain it.",
  "practiceNote": "This is an optional invitation to reflect before participating. It is not an assignment, and you do not need to submit it.",
  "commitmentH": "The time to set aside",
  "commitmentText": "18 sessions of 90 minutes: 27 scheduled live hours. Classes meet Tuesdays and Thursdays, 5:00–6:30 PM Arizona time. The calendar includes the Thanksgiving break.",
  "commitmentNote": "This calculation covers the 18 classes, including graduation. It excludes the optional information session and the focus group. Ask the team how much additional time materials or activities may require.",
  "certificateH": "Your certificate",
  "certificateText": "You must attend at least 16 of the 18 classes to receive your certificate. Give advance notice if you cannot attend. The team can explain other participation requirements and how the certificate is delivered.",
  "staffH": "For school personnel",
  "staffText": "Please help families complete the interest form, find their welcome email, and contact our team if they need help. Each applicant receives a personal Zoom access link.",
  "supportH": "Let’s talk about what you need to participate",
  "supportText": "You can contact the team in Spanish or English before the first class. Tell us if you need Zoom help, have an unreliable connection, or have an accessibility need. You can also ask about captions, camera use, recordings, or catching up after an absence; the team will explain the available options and current rules.",
  "teamH": "Meet the team supporting you",
  "storiesH": "Family experiences",
  "storiesLead": "These stories published in 2023 describe experiences from earlier years. Their dates and program conditions do not describe the current cohort.",
  "stories": [
    [
      "Patricia: speaking with the school",
      "Arizona Luminaria describes how Patricia Ojeda moved from feeling intimidated about school conversations to raising concerns and seeking support for her children’s learning."
    ],
    [
      "Gloria: navigating the system differently",
      "Gloria Castejón, a mother and former teacher, describes how PEA gave her a chance to share her knowledge and discover other ways to navigate the education system."
    ]
  ],
  "storyCta": "Read the story in Arizona Luminaria",
  "videoH": "Get to know ALL In Education",
  "videoText": "Organization introduction: “ALL In Education — Who We Are.” Length: 6 minutes, 44 seconds. It is in English; YouTube offers automatic English captions. The video introduces the organization and its mission.",
  "videoCta": "Watch on YouTube",
  "evidenceH": "What an earlier evaluation found",
  "evidenceText": "The 2022 LeCroy & Milligan evaluation found an improvement in participants’ self-reported effectiveness in communicating with teachers. This finding describes that cohort and is not a guarantee for each participant.",
  "evidenceSource": "Source: Parent Educator Academy Evaluation Report, August 2022, page 25; analysis of pre- and post-program surveys, 109 participants.",
  "alumniH": "After PEA",
  "alumniText": "The connection can continue after graduation. Ask the team about current participation, focus-group, and leadership opportunities, and how to receive those notices.",
  "faq": [
    [
      "How much time should I set aside?",
      "The 18 classes of 90 minutes total 27 live hours. Classes meet Tuesdays and Thursdays, 5:00–6:30 PM Arizona time. The optional information session and focus group are additional; ask the team about time for activities outside class."
    ],
    [
      "Will I receive a certificate?",
      "You must attend at least 16 of the 18 classes to receive your certificate. Ask the team about other participation requirements and certificate delivery."
    ],
    [
      "Are classes recorded, or can I make up a session?",
      "Before registering, ask the team about the current recording and make-up policy. If you know you will miss a session, give advance notice and ask how to stay up to date."
    ],
    [
      "What if my connection fails or I cannot turn on my camera?",
      "Let the team know about your situation and ask for guidance. Test your connection, camera, and microphone before starting. Ask about the current expectations for your circumstances."
    ],
    [
      "Can I request captions or other accessibility support?",
      "You can share your needs with the team before the first class. The team will explain which supports are available and how to request them."
    ],
    [
      "Can I participate if I work at a school or am another caregiver?",
      "Yes. PEA is also open to school staff, such as family liaisons and teachers, and to other caregivers. If you have questions about your situation, the team can guide you."
    ],
    [
      "Are English classes available in this cohort?",
      "Fall 2026 classes are taught in Spanish. The information session is bilingual, and the team provides support in Spanish and English. If you need classes in English, ask about available options."
    ]
  ],
  "teamText": "The PEA team is your contact for questions about the interest form, your welcome email, Zoom access, and participation. Use the email, WhatsApp, or phone details below to ask for guidance before deciding or during the program."
};
  ["es", "en"].forEach(function (l) { T[l].faq.items = T[l].faq.items.concat(T[l].applicant.faq); });

  root.T = T;
  if (typeof module !== "undefined" && module.exports) module.exports = { T: T };
})(typeof window !== "undefined" ? window : globalThis);
