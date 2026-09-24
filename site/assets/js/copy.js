/* ==================================================================
   PEA Applicant Hub — COPY DICTIONARY  (v0.9.4)
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
      taglinePair: "Liderazgo · Poder · Justicia",
      toolTitle: "Parent Educator Academy",
      toolSub: function (c) { return "Centro de inscripción · " + c; },
      langSwitch: { toEn: "Switch to English", toEs: "Cambiar a español" },

      nav: {
        home: "Inicio", label: "Secciones del sitio",
        prev: "← Anterior", next: "Siguiente →", start: "Comenzar →",
        groups: { join: "Unirse", about: "Conozca PEA", help: "Ayuda" }
      },
      sections: {
        participar: { label: "Cómo participar", desc: "Tres pasos. El tercero asegura su lugar.", time: "2 min" },
        calendario: { label: "Calendario", desc: "Todas las fechas y horarios del programa.", time: "1 min" },
        zoom:       { label: "Zoom paso a paso", desc: "Videos cortos y consejos para entrar sin problema.", time: "3 min" },
        programa:   { label: "Qué va a aprender", desc: "Los temas de las 18 clases.", time: "2 min" },
        historia:   { label: "Experiencias e historia", desc: "Historias de familias, resultados y la organización.", time: "2 min" },
        preguntas:  { label: "Preguntas", desc: "Respuestas rápidas a las dudas más comunes.", time: "3 min" },
        enlaces:    { label: "Enlaces", desc: "Todo lo que va a necesitar, en un solo lugar.", time: "1 min" },
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
        sub: "La Parent Educator Academy es un programa de liderazgo para familias y cuidadores que quieren abogar por sus hijos dentro del sistema escolar de Arizona.", /* [G] */
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
        join: "Registro para la sesión informativa",                                                   /* [G] */
        register: "Registrarse en Zoom",                                           /* [G] */
        addCal: "Agregar a mi calendario",
        classNote: "Para entrar a clase, use el enlace personal de su correo de confirmación de Zoom. No lo comparta.",
        holidayNote: "No hay clase ese día.",
        focusNote: "El equipo de PEA compartirá las instrucciones para participar en el grupo de enfoque.",
        nothing: "No hay eventos próximos en el calendario.",                      /* [G] */
        projected: "Fecha proyectada, todavía no confirmada."
      },

      stats: {
        cost: "Costo para las familias",
        classes: "Clases en vivo",
        alumni: "Personas en el registro histórico de exalumnos de PEA",
        alumniNote: function (d) { return "al " + d; }
      },

      home: {
        stepsH: "Otoño de 2026: tres pasos para unirse",
        ctaLead: "El tercer paso es el que asegura su lugar.",
        overviewH: "Todo en un solo lugar",
        shareH: "¿Conoce a otra familia?",
        shareLead: "Compártale esta página. El programa es gratuito y el cupo se llena por orden de registro."
      },

      steps: {                                                                     /* [G] */
        h: "Cómo participar",
        lead: "Otoño de 2026: tres pasos. El tercero es el que asegura su lugar. Para primavera de 2027, complete por ahora el formulario de interés.",
        items: [
          { t: "Llene el formulario de interés", d: "Nos dice quién es usted y cómo comunicarnos con usted. No es una solicitud y no hay proceso de selección.", link: "apply", cta: "Ir al formulario" },
          { t: "Asista a la sesión informativa", d: "Opcional, pero es muy recomendable asistir a una sesión. Es la misma sesión en dos fechas, así que basta con una. Es bilingüe: se habla español e inglés. Al final, el equipo le ayuda a completar su registro para las clases.", link: "info", cta: "Registrarse para la sesión", tag: "Opcional" },
          { t: "Complete su registro en Zoom", d: "Este paso es el que asegura su lugar. El cupo es limitado y se llena por orden de registro.", link: "zoom", cta: "Registrarse en Zoom", key: true }
        ],
        noteLabel: "Importante",
        note: "No hay formulario de compromiso, no hay invitación y no hay proceso de selección. Para otoño de 2026, el registro en Zoom reserva su lugar. Para primavera de 2027, por ahora solo está disponible el formulario de interés.",
        infoDatesH: "Fechas de la sesión informativa",
        infoDatesNote: "Es la misma sesión en las dos fechas. Asista a la que mejor le acomode.",
        whoLabel: "Quién puede participar",
        who: "Familias y cuidadores que quieren abogar por sus hijos dentro del sistema escolar de Arizona. No hay proceso de selección: el cupo se llena por orden de registro.",
        askH: "Qué esperamos de cada persona",                                     /* [G] */
        ask: [
          ["Asistir", "Asista al menos a 16 de las 18 clases para recibir su certificado. Si no puede asistir, avise al equipo con anticipación."],
          ["Participar", "Encienda su cámara si puede, hable, pregunte. El salón funciona cuando todos aportan."],
          ["Comunicar", "Si algo se le dificulta — la tecnología, el horario, el idioma — díganos. Casi siempre hay una solución."]
        ],
      },

      cal: {
        h: "Calendario",
        scheduleLabel: "Fechas de otoño de 2026",
        scheduleNote: "18 clases programadas, martes y jueves, del 6 de octubre al 8 de diciembre de 2026. No hay clase el 26 de noviembre. Grupo de enfoque: 10 de diciembre. Todo de 5:00 a 6:30 p. m., hora de Arizona. Si las clases ya comenzaron, consulte al equipo sobre la posibilidad de inscribirse.",
        lead: function (days, time) { return "Las clases son los " + days + ", de " + time + ", hora de Arizona."; },
        filterLabel: "Mostrar",
        filters: { all: "Todo", info: "Sesiones informativas", cls: "Clases" },
        cols: { date: "Fecha", kind: "Tipo", topic: "Tema", time: "Hora" },
        kinds: { info: "Sesión informativa", cls: "Clase", holiday: "No hay clase", focus: "Grupo de enfoque", grad: "Graduación" }, /* [G] */
        topics: {                                                                  /* [G] */
          info: "Conozca el programa antes de decidir",
          holiday: "Día de Acción de Gracias",
          focus: "Conversación sobre su experiencia en PEA"
        },
        infoWording: "Opcional, pero es muy recomendable asistir a una sesión",     /* applicant calendar wording, copyedited */
        week: function (n) { return "Semana " + n; },
        today: "Hoy", done: "Ya pasó",
        note: "Hora de Arizona. Las clases son por Zoom.",                         /* [G] */
        full: "Ver el calendario publicado",
        ics: "Descargar todas las fechas (.ics)",
        icsHelp: "El archivo .ics agrega las fechas al calendario de su teléfono o computadora.",
        icsName: "PEA",
        projectedLabel: "Por confirmar",
        projected: "Fechas proyectadas, todavía no confirmadas."
      },

      zoom: {
        h: "Zoom paso a paso",
        lead: "Si nunca ha usado Zoom, o si no está seguro de algún paso, estos videos cortos le muestran cómo hacerlo. Los videos están en español.", /* [G] */
        vids: [                                                                    /* [G] */
          ["vidAccount", "Crear una cuenta de Zoom", "Necesita una cuenta activa para entrar a clase."],
          ["vidRegister", "Completar su registro", "El paso que asegura su lugar, explicado en pantalla."],
          ["vidName", "Cambiar el nombre que se muestra", "Para que le reconozcamos al entrar."]
        ],
        watch: "Ver el video",
        tipLabel: "Muy importante",
        tip: "Use el mismo correo en su cuenta de Zoom y en el registro. Inicie sesión en Zoom con esa misma cuenta antes de entrar a clase.", /* [G] */
        orderH: "En este orden",
        order: [
          ["Cree su cuenta de Zoom", "Es gratuita. Anote el correo que usó."],
          ["Regístrese para la cohorte", "Use el mismo correo de su cuenta de Zoom."],
          ["Busque el correo de confirmación", "Revise su bandeja de entrada y la carpeta de spam. Guárdelo: trae su enlace personal para entrar a clase."],
          ["Cambie el nombre que se muestra", "Ponga su nombre y apellido para que podamos registrar su asistencia."],
          ["El día de clase, entre con su enlace", "Use el enlace de su correo de confirmación. Entre unos minutos antes."]
        ],
        lostLabel: "¿No encuentra el correo de confirmación?",
        lost: "Revise su bandeja de entrada y la carpeta de spam. Si no aparece, escríbanos para que le ayudemos a recuperar su enlace personal.", /* [G] */
        deviceLabel: "¿Computadora o teléfono?",
        device: "La computadora o la tableta hacen la experiencia mejor: se ven los materiales y es más fácil participar. Si el teléfono es lo que tiene, el teléfono funciona." /* [G] */
      },

      prog: {
        h: "Qué va a aprender",
        lead: "Durante el programa nos reunimos en línea para aprender juntos cómo funciona el sistema educativo, cuáles son sus derechos, y cómo usar su voz con las escuelas, los distritos y quienes toman decisiones. Usted ya conoce a su hijo mejor que nadie. El programa le da el mapa del sistema y las herramientas para moverse dentro de él.", /* [G] */
        classLabel: "Cómo es cada clase",
        classText: "Nos reunimos en grupo por Zoom. Al final de cada clase hay una encuesta de salida corta: entre cinco y ocho preguntas, dos a cuatro minutos. Nos dice qué está funcionando y qué no.",
        gradNote: "Cierre del programa"
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
        changedH: "Lo que cambió este año",
        before: "Antes", now: "Hoy",
        changed: [
          ["Ya no hay solicitud ni selección", "Antes había que solicitar y esperar una invitación.", "Para otoño de 2026, el registro en Zoom reserva su lugar, y el límite es el cupo, no un comité."],
          ["Las sesiones informativas son opcionales", "Antes eran tres sesiones distintas y había que asistir a dos para tener lugar.", "Hoy es una sola sesión, ofrecida dos veces, y asistir es recomendable pero no obligatorio."],
          ["Ya no hay formulario de compromiso", "Antes las expectativas se acordaban en un formulario previo.", "Las expectativas siguen siendo las mismas — asistir, participar, comunicar — pero se acuerdan en la primera clase."]
        ]
      },

      faq: {
        h: "Preguntas frecuentes",
        items: [
          ["¿Tengo que solicitar o esperar una invitación?", "No. No hay solicitud, no hay invitación y no hay proceso de selección. Para otoño de 2026, llene el formulario de interés y complete su registro en Zoom; ese registro es lo que reserva su lugar."], /* [G] */
          ["¿Cómo sé que ya tengo mi lugar?", "Cuando complete su registro en Zoom, le llega un correo de confirmación de Zoom. Ese correo es su confirmación y trae su enlace personal para entrar a clase. Guárdelo."],
          ["¿Quién puede participar?", "Familias y cuidadores que quieren abogar por sus hijos dentro del sistema escolar de Arizona. No hay proceso de selección: el cupo se llena por orden de registro."],
          ["¿Es obligatorio asistir a la sesión informativa?", "No. Es opcional, pero es muy recomendable asistir a una sesión. Es una oportunidad para conocernos, conocer el programa y hacer preguntas, y al final el equipo le ayuda a completar su registro para las clases. No asistir no afecta su lugar de ninguna manera."], /* [G] */
          ["¿Las dos fechas de la sesión informativa son distintas?", "No, es la misma sesión en dos fechas. Asista a la que mejor le acomode; no hace falta ir a las dos."], /* [G] */
          ["¿En qué idioma es el programa?", function (c) { return "La cohorte de " + c.label + " se imparte en " + c.lang + ". La sesión informativa es bilingüe — se habla español e inglés — porque es la puerta de entrada y queremos que cualquier familia pueda venir a conocernos antes de decidir."; }], /* [G], cohort resolved from facts */
          ["¿Cuánto cuesta?", "Nada. PEA es gratuito para las familias participantes."], /* [G] */
          ["¿PEA incluye un incentivo económico?", "No. Esta cohorte no incluye un incentivo económico. Lo que el programa ofrece es contenido, materiales y el acompañamiento del equipo y del grupo. Si tiene preguntas sobre esto, escríbanos — con gusto lo platicamos."], /* [G] */
          ["¿Necesito una cuenta de Zoom?", "Sí. Para participar necesita una cuenta activa de Zoom, y es gratuita. El correo que use para registrarse debe ser el mismo de su cuenta de Zoom. Inicie sesión con esa cuenta antes de entrar a clase. La sección «Zoom paso a paso» le muestra cómo crearla."], /* [G], last sentence adapted */
          ["No encuentro el correo de confirmación de Zoom. ¿Qué hago?", "Revise su bandeja de entrada y la carpeta de spam. Si no aparece, escríbanos para que le ayudemos a recuperar su enlace personal."], /* [G] */
          ["¿Qué pasa si falto a una clase?", "Avise al equipo de PEA con anticipación si no puede asistir. Para recibir su certificado, debe asistir al menos a 16 de las 18 clases. Escríbanos si necesita apoyo para cumplir este requisito."], /* [G] */
          ["¿Puedo participar desde el teléfono?", "Sí, aunque la computadora o la tableta hacen la experiencia mejor: se ven los materiales y es más fácil participar. Si el teléfono es lo que tiene, el teléfono funciona."], /* [G] */
          ["¿Qué es la encuesta de salida?", "Es una encuesta corta que se completa después de cada clase — entre cinco y ocho preguntas, dos a cuatro minutos. Nos dice qué está funcionando y qué no, y es la razón por la que el programa cambia de una cohorte a otra."], /* [G] */
          ["¿Hay algo después del programa?", "Sí. Los exalumnos siguen conectados con ALL In Education — hay grupos de enfoque, oportunidades de liderazgo y acompañamiento a las familias nuevas. La graduación es el final del curso, no del vínculo."] /* [G]; "AIE" → full name per brand §4 */
        ],
        nextCohortQ: "¿Cuándo es la próxima cohorte?",
        nextCohortA: function (label) { return "Primavera de 2027: del 16 de marzo al 13 de mayo, martes y jueves, de 5:00 a 6:30 p. m., hora de Arizona. Ya puede llenar el formulario de interés. El registro de Zoom se publicará más adelante. Seleccione Primavera / Spring 2027 (S27) en el formulario de interés."; }
      },

      links: {
        h: "Enlaces rápidos",
        lead: "Todo lo que va a necesitar, en un solo lugar.",                    /* [G] */
        groups: [
          { h: "Para unirse", items: [
            ["zoom", "Registro de la cohorte", "El paso que asegura su lugar."],                 /* [G] */
            ["info", "Registro para la sesión informativa", "El mismo enlace sirve para las dos fechas."], /* [G] */
            ["apply", "Formulario de interés", "El primer paso, si todavía no lo ha llenado."],   /* [G] */
            ["cal", "Calendario publicado", "Todas las fechas del programa."]                    /* [G] */
          ]},
          { h: "Tutoriales de Zoom", items: [
            ["vidAccount", "Crear una cuenta de Zoom", "Necesita una cuenta activa para entrar a clase."],
            ["vidRegister", "Completar su registro", "El paso que asegura su lugar, explicado en pantalla."],
            ["vidName", "Cambiar el nombre que se muestra", "Para que le reconozcamos al entrar."]
          ]},
          { h: "Durante el programa", items: [
            ["whatsapp", "Grupo de WhatsApp", "Avisos rápidos y apoyo entre clases."],          /* [G] */
            ["exit", "Encuesta de salida", "Se completa después de cada clase."],              /* [G] */
            ["lista", "Lista de recursos", "Materiales y enlaces de apoyo."],                   /* [G] */
          ]},
          { h: "Para compartir", items: [
            ["flyer", "Volante del programa", "Para imprimir o mandar por mensaje."]
          ]}
        ],
        shareH: "Invite a otra familia",
        shareLead: "Copie este mensaje o mándelo directo por WhatsApp.",
        shareMsg: function (url) {
          return "Hola, te comparto la Parent Educator Academy (PEA) de ALL In Education. Es un programa gratuito, por Zoom, para familias y cuidadores que quieren abogar por sus hijos en la escuela. Aquí está toda la información y cómo registrarse: " + url;
        },
        shareWa: "Enviar por WhatsApp"
      },

      contact: {
        h: "Contacto",
        lead: "Escríbanos o mándenos un mensaje. Contestamos en español y en inglés.", /* [G] */
        labels: { email: "Correo", phone: "Teléfono", wa: "WhatsApp", web: "Sitio web" },
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
      langSwitch: { toEn: "Switch to English", toEs: "Cambiar a español" },

      nav: {
        home: "Home", label: "Site sections",
        prev: "← Previous", next: "Next →", start: "Get started →",
        groups: { join: "Join", about: "About PEA", help: "Help" }
      },
      sections: {
        participar: { label: "How to take part", desc: "Three steps. The third one secures your place.", time: "2 min" },
        calendario: { label: "Calendar", desc: "Every date and time in the program.", time: "1 min" },
        zoom:       { label: "Zoom step by step", desc: "Short videos and tips to get in without trouble.", time: "3 min" },
        programa:   { label: "What you'll learn", desc: "Topics across the 18 classes.", time: "2 min" },
        historia:   { label: "Stories & history", desc: "Family experiences, findings, and the organization.", time: "2 min" },
        preguntas:  { label: "Questions", desc: "Quick answers to the most common questions.", time: "3 min" },
        enlaces:    { label: "Links", desc: "Everything you will need, in one place.", time: "1 min" },
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
        sub: "The Parent Educator Academy is a leadership program for families and caregivers who want to advocate for their children inside Arizona's school system.",
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
        join: "Information session registration",
        register: "Register on Zoom",
        addCal: "Add to my calendar",
        classNote: "To join class, use the personal link in your Zoom confirmation email. Do not share it.",
        holidayNote: "There is no class that day.",
        focusNote: "The PEA team will share instructions for joining the focus group.",
        nothing: "Nothing else on the calendar right now.",
        projected: "Projected date, not yet confirmed."
      },

      stats: {
        cost: "Cost to families",
        classes: "Live classes",
        alumni: "People in the historical PEA alumni registry",
        alumniNote: function (d) { return "as of " + d; }
      },

      home: {
        stepsH: "Fall 2026: three steps to join",
        ctaLead: "The third step is the one that secures your place.",
        overviewH: "Everything in one place",
        shareH: "Know another family?",
        shareLead: "Share this page with them. The program is free, and places fill in the order people register."
      },

      steps: {
        h: "How to take part",
        lead: "Fall 2026: three steps. The third secures your place. For Spring 2027, complete the interest form for now.",
        items: [
          { t: "Fill out the interest form", d: "It tells us who you are and how to reach you. It is not an application, and there is no selection process.", link: "apply", cta: "Go to the form" },
          { t: "Come to the information session", d: "Optional, but attending one session is highly recommended. It is the same session on two dates, so one is enough. It is bilingual — Spanish and English. At the end, the team helps you complete your class registration.", link: "info", cta: "Register for the session", tag: "Optional" },
          { t: "Complete your Zoom registration", d: "This is the step that secures your place. Space is limited and fills in the order people register.", link: "zoom", cta: "Register on Zoom", key: true }
        ],
        noteLabel: "Important",
        note: "There is no commitment form, no invitation and no selection process. For Fall 2026, Zoom registration holds your place. For Spring 2027, complete the interest form for now; Zoom registration will be available later.",
        infoDatesH: "Information session dates",
        infoDatesNote: "It is the same session on both dates. Come to whichever suits you.",
        whoLabel: "Who can take part",
        who: "Families and caregivers who want to advocate for their children inside Arizona's school system. There is no selection process: places fill in the order people register.",
        askH: "What we ask of everyone",
        ask: [
          ["Attend", "Attend at least 16 of the 18 classes to receive your certificate. If you cannot attend, notify the team in advance."],
          ["Take part", "Turn your camera on if you can, speak up, ask questions. The class works when everyone contributes."],
          ["Tell us", "If something is getting in the way — the technology, the schedule, the language — tell us. There is almost always a way around it."]
        ],
      },

      cal: {
        h: "Calendar",
        scheduleLabel: "Fall 2026 dates",
        scheduleNote: "18 scheduled classes on Tuesdays and Thursdays, October 6–December 8, 2026. No class November 26. Focus group: December 10. All events run 5:00–6:30 PM Arizona time. If classes have already started, contact the team about joining.",
        lead: function (days, time) { return "Classes meet " + days + ", " + time + " Arizona time."; },
        filterLabel: "Show",
        filters: { all: "All", info: "Information sessions", cls: "Classes" },
        cols: { date: "Date", kind: "Type", topic: "Topic", time: "Time" },
        kinds: { info: "Information session", cls: "Class", holiday: "No class", focus: "Focus group", grad: "Graduation" },
        topics: {
          info: "Meet the program before you decide",
          holiday: "Thanksgiving",
          focus: "A conversation about your time in PEA"
        },
        infoWording: "Optional, but attending one session is highly recommended",
        week: function (n) { return "Week " + n; },
        today: "Today", done: "Past",
        note: "Arizona time. Classes meet on Zoom.",
        full: "See the published calendar",
        ics: "Download every date (.ics)",
        icsHelp: "The .ics file adds the dates to the calendar on your phone or computer.",
        icsName: "PEA",
        projectedLabel: "To be confirmed",
        projected: "Projected dates, not yet confirmed."
      },

      zoom: {
        h: "Zoom step by step",
        lead: "If you have never used Zoom, or are unsure about a step, these short videos walk you through it. The videos are in Spanish.",
        vids: [
          ["vidAccount", "Create a Zoom account", "You need an active account to join class."],
          ["vidRegister", "Complete your registration", "The step that secures your place, shown on screen."],
          ["vidName", "Change your display name", "So we recognize you when you arrive."]
        ],
        watch: "Watch the video",
        tipLabel: "Very important",
        tip: "Use the same email for your Zoom account and your registration. Sign in to Zoom with that same account before joining class.",
        orderH: "In this order",
        order: [
          ["Create your Zoom account", "It is free. Note the email you used."],
          ["Register for the cohort", "Use the same email as your Zoom account."],
          ["Find the confirmation email", "Check your inbox and your spam folder. Keep it: it carries your personal link to join class."],
          ["Change your display name", "Use your full name so we can record your attendance."],
          ["On class day, join with your link", "Use the link in your confirmation email. Join a few minutes early."]
        ],
        lostLabel: "Can't find the confirmation email?",
        lost: "Check your inbox and your spam folder. If it is not there, contact us for help recovering your personal link.",
        deviceLabel: "Computer or phone?",
        device: "A computer or tablet makes for a better experience: the materials are easier to see and it is easier to take part. If a phone is what you have, a phone works."
      },

      prog: {
        h: "What you'll learn",
        lead: "During the program we meet online to learn together how the education system works, what your rights are, and how to use your voice with schools, districts and the people who make decisions. You already know your child better than anyone. The program gives you the map of the system and the tools to move through it.",
        classLabel: "What each class is like",
        classText: "We meet as a group on Zoom. Each class ends with a short exit ticket: five to eight questions, two to four minutes. It tells us what is working and what is not.",
        gradNote: "Closing the program"
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
        changedH: "What changed this year",
        before: "Before", now: "Now",
        changed: [
          ["No application, no selection", "There used to be an application and a wait for an invitation.", "For Fall 2026, Zoom registration holds your place, and the limit is capacity, not a committee."],
          ["Information sessions are optional", "There used to be three different sessions, and you had to attend two to hold a place.", "Today there is one session, offered twice, and attending is encouraged but not required."],
          ["No commitment form", "Expectations used to be agreed in a form beforehand.", "The expectations are the same — attend, take part, tell us — but they are agreed in the first class."]
        ]
      },

      faq: {
        h: "Frequently asked questions",
        items: [
          ["Do I have to apply or wait for an invitation?", "No. There is no application, no invitation and no selection process. For Fall 2026, fill out the interest form and complete your Zoom registration; that registration is what holds your place."],
          ["How do I know I have a place?", "When you complete your Zoom registration, Zoom sends you a confirmation email. That email is your confirmation, and it carries your personal link to join class. Keep it."],
          ["Who can take part?", "Families and caregivers who want to advocate for their children inside Arizona's school system. There is no selection process: places fill in the order people register."],
          ["Do I have to attend the information session?", "No. It is optional, but attending one session is highly recommended. It is a chance to meet us, learn about the program and ask questions, and the team helps you complete your class registration at the end. Not attending does not affect your place in any way."],
          ["Are the two information session dates different?", "No, it is the same session on two dates. Come to whichever suits you; there is no need to attend both."],
          ["What language is the program in?", function (c) { return "The " + c.label + " cohort is taught in " + c.lang + ". The information session is bilingual — Spanish and English — because it is the front door, and any family should be able to come meet us before deciding."; }], /* [G], cohort resolved from facts */
          ["What does it cost?", "Nothing. PEA is free for participating families."],
          ["Does PEA include a financial incentive?", "No. This cohort does not include a financial incentive. What the program offers is content, materials, and the support of the team and the group. If you have questions about this, write to us — we are glad to talk it through."],
          ["Do I need a Zoom account?", "Yes. You need an active Zoom account to take part, and it is free. The email you register with must be the same one on your Zoom account. Sign in with that account before joining class. The “Zoom step by step” section shows you how to set it up."],
          ["I cannot find my Zoom confirmation email. What do I do?", "Check your inbox and your spam folder. If it is not there, contact us for help recovering your personal link."],
          ["What happens if I miss a class?", "Notify the PEA team in advance if you cannot attend. To receive your certificate, you must attend at least 16 of the 18 classes. Contact us if you need support meeting this requirement."],
          ["Can I take part from my phone?", "Yes, though a computer or tablet makes for a better experience: the materials are easier to see and it is easier to take part. If a phone is what you have, a phone works."],
          ["What is the exit ticket?", "It is a short survey completed after each class — five to eight questions, two to four minutes. It tells us what is working and what is not, and it is the reason the program changes from one cohort to the next."],
          ["Is there anything after the program?", "Yes. Alumni stay connected to ALL In Education — there are focus groups, leadership opportunities, and the chance to walk alongside families coming in. Graduation ends the course, not the relationship."]
        ],
        nextCohortQ: "When is the next cohort?",
        nextCohortA: function (label) { return "Spring 2027 runs March 16–May 13, Tuesdays and Thursdays, 5:00–6:30 PM Arizona time. The interest form is open now. Zoom registration will be available later. Select Primavera / Spring 2027 (S27) in the interest form."; }
      },

      links: {
        h: "Quick links",
        lead: "Everything you will need, in one place.",
        groups: [
          { h: "To join", items: [
            ["zoom", "Cohort registration", "The step that secures your place."],
            ["info", "Information session registration", "The same link works for both dates."],
            ["apply", "Interest form", "The first step, if you have not filled it out yet."],
            ["cal", "Published calendar", "Every date in the program."]
          ]},
          { h: "Zoom tutorials", items: [
            ["vidAccount", "Create a Zoom account", "You need an active account to join class."],
            ["vidRegister", "Complete your registration", "The step that secures your place, shown on screen."],
            ["vidName", "Change your display name", "So we recognize you when you arrive."]
          ]},
          { h: "During the program", items: [
            ["whatsapp", "WhatsApp group", "Quick notices and support between classes."],
            ["exit", "Exit ticket", "Completed after each class."],
            ["lista", "Resource list", "Supporting materials and links."],
          ]},
          { h: "To share", items: [
            ["flyer", "Program flyer", "To print or send by message."]
          ]}
        ],
        shareH: "Invite another family",
        shareLead: "Copy this message, or send it straight through WhatsApp.",
        shareMsg: function (url) {
          return "Hi! I wanted to share ALL In Education's Parent Educator Academy (PEA) with you. It is a free program on Zoom for families and caregivers who want to advocate for their children at school. Everything you need to know, and how to register, is here: " + url;
        },
        shareWa: "Send on WhatsApp"
      },

      contact: {
        h: "Contact",
        lead: "Write to us or send a message. We answer in Spanish and English.",
        labels: { email: "Email", phone: "Phone", wa: "WhatsApp", web: "Website" },
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
  "fitLead": "PEA se dirige a familias y cuidadores que quieren acompañar a sus hijos y abogar por ellos dentro del sistema escolar de Arizona.",
  "fitItems": [
    [
      "Su relación con el estudiante",
      "Si usted es abuelo, abuela, tutor u otra persona cuidadora y tiene dudas sobre su participación, el equipo puede orientarle."
    ],
    [
      "Su escuela o función",
      "Si trabaja en educación, o tiene dudas sobre si el programa corresponde al tipo de escuela o grado de su estudiante, consulte al equipo antes de registrarse."
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
  "certificateText": "El registro de Zoom de esta cohorte indica que debe asistir al menos a 16 de las 18 clases para recibir su certificado. Avise con anticipación si no puede asistir. El equipo puede explicarle los demás requisitos de participación y cómo se entrega el certificado.",
  "welcomeH": "Después de registrarse",
  "welcome": [
    [
      "Guarde su correo de Zoom",
      "Incluye su enlace personal para entrar a clase. Revise también la carpeta de spam y no comparta ese enlace."
    ],
    [
      "Prepare su acceso",
      "Inicie sesión con la misma cuenta que usó para registrarse. Compruebe su cámara, micrófono y conexión; use su nombre y apellido completos."
    ],
    [
      "Guarde el calendario",
      "Añada las fechas a su calendario y entre unos minutos antes de la primera clase."
    ],
    [
      "Busque apoyo si algo falta",
      "Si no encuentra su enlace o necesita saber cómo recibirá materiales y avisos, escríbanos. El equipo le indicará los siguientes pasos."
    ]
  ],
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
  "evidenceText": "La evaluación de LeCroy & Milligan de 2022 encontró una mejora en la efectividad que las personas participantes reportaron al comunicarse con docentes. Es un resultado de aquella cohorte, no una garantía para cada participante.",
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
      "Consulte al equipo para confirmar cómo se aplica la participación a su función, relación con el estudiante y contexto escolar."
    ],
    [
      "¿Hay clases en inglés en esta cohorte?",
      "Las clases de otoño de 2026 se imparten en español. La sesión informativa es bilingüe y el equipo atiende en español e inglés. Si necesita clases en inglés, pregunte por las opciones disponibles."
    ]
  ],
  "teamText": "El equipo de PEA es su contacto para preguntas sobre inscripción, acceso a Zoom y participación. Use el correo, WhatsApp o teléfono que aparecen abajo para pedir orientación antes de decidir o durante el programa."
};
  T.en.applicant = {
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
  "fitLead": "PEA is for families and caregivers who want to support their children and advocate for them within Arizona’s school system.",
  "fitItems": [
    [
      "Your relationship to the student",
      "If you are a grandparent, guardian, or another caregiver and have questions about participating, the team can guide you."
    ],
    [
      "Your school or role",
      "If you work in education, or have questions about your student’s school type or grade level, contact the team before registering."
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
  "certificateText": "This cohort’s Zoom registration states that you must attend at least 16 of the 18 classes to receive your certificate. Give advance notice if you cannot attend. The team can explain other participation requirements and how the certificate is delivered.",
  "welcomeH": "After you register",
  "welcome": [
    [
      "Save your Zoom email",
      "It contains your personal class link. Check your spam folder too, and do not share the link."
    ],
    [
      "Prepare to join",
      "Sign in with the same account you used to register. Check your camera, microphone, and connection, and use your full name."
    ],
    [
      "Save the calendar",
      "Add the dates to your calendar and join a few minutes before the first class."
    ],
    [
      "Ask for help if something is missing",
      "If you cannot find your link or need to know how materials and notices will reach you, contact us. The team will explain the next steps."
    ]
  ],
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
      "Contact the team to confirm how participation applies to your role, relationship to the student, and school setting."
    ],
    [
      "Are English classes available in this cohort?",
      "Fall 2026 classes are taught in Spanish. The information session is bilingual, and the team provides support in Spanish and English. If you need classes in English, ask about available options."
    ]
  ],
  "teamText": "The PEA team is your contact for registration, Zoom access, and participation questions. Use the email, WhatsApp, or phone details below to ask for guidance before deciding or during the program."
};
  ["es", "en"].forEach(function (l) { T[l].faq.items = T[l].faq.items.concat(T[l].applicant.faq); });

  root.T = T;
  if (typeof module !== "undefined" && module.exports) module.exports = { T: T };
})(typeof window !== "undefined" ? window : globalThis);
