/* ==================================================================
   PEA Applicant Hub — COPY DICTIONARY  (v0.15.1)
   ------------------------------------------------------------------
   Every user-visible string, in two complete languages with identical
   keys (AIE Hub Design System §3). ES and EN are parallel originals,
   not translations of each other.

   v0.15.0 voice pass (2026-09-29): warm, natural, concise and clear,
   per PEA Brand Voice & Tone Guide §11 — dignity, clarity (lead with
   the action, date or time), community. Pages follow the family's
   path: learn about PEA → apply → get ready → join class → get help.
   Human native-speaker sign-off is not claimed.

   Entry path (Danny Hernández, 2026-09-29): the interest form is the
   application. The welcome email carries a personal Zoom link used for
   every class. There is no class Zoom registration link and no
   certificate or minimum-attendance detail on this site.

   Controlled vocabulary: never "empower"/"empoderar"; "salón" or
   "clase", never "aula"; "ustedes", never "vosotros"; "familias" or
   "padres y cuidadores", never "padres" alone; "maestros", never
   "docentes".
   ================================================================== */
(function (root) {
  var T = {
    es: {
      _lang: "es",
      meta: {
        title: "Únase a PEA — Parent Educator Academy",
        description: "Todo lo que necesita para unirse a la Parent Educator Academy de ALL In Education: cómo inscribirse, fechas, temas y ayuda."
      },
      toolTitle: "Parent Educator Academy",
      toolSub: function (c) { return "Centro de inscripción · " + c; },
      langSwitch: { toEn: "Switch to English", toEs: "Cambiar a español", group: "Idioma", announced: "Página en español" },

      nav: { home: "Inicio", menu: "Menú", groups: { join: "Unirse", about: "Conozca PEA", help: "Ayuda" } },
      sections: {
        participar: { label: "Cómo participar", time: "3 min" },
        calendario: { label: "Calendario y temas", time: "3 min" },
        historia:   { label: "Historias", time: "2 min" },
        ayuda:      { label: "Preguntas y ayuda", time: "4 min" }
      },

      ui: {
        skip: "Saltar al contenido",
        show: "▼ Ver", hide: "▲ Ocultar",
        searchPh: "Buscar una pregunta…",
        clear: "Borrar búsqueda",
        noResults: "No encontramos esa palabra. Pruebe con otra o escríbanos.",
        noResultsLabel: "Sin resultados",
        count: function (n) { return n === 1 ? "1 pregunta" : n + " preguntas"; },
        optional: "Opcional",
        minutes: function (t) { return "Lectura: " + t; },
        quick: "Acciones rápidas"
      },

      actions: {
        home: "Inicio",
        cal: "Ver calendario", calShort: "Calendario",
        info: "Registro a la sesión informativa",
        wa: "WhatsApp al equipo", waShort: "WhatsApp"
      },

      home: {
        h: "Su próximo paso con PEA",
        whatH: "¿Qué es PEA?",
        what: "La Parent Educator Academy (PEA) es un programa gratuito de ALL In Education para madres, padres y cuidadores. Juntos aprendemos cómo funciona el sistema escolar de Arizona y cómo abogar por nuestros hijos con confianza. El personal escolar, como enlaces con las familias y maestros, también es bienvenido.",
        chipFree: "Gratis",
        chipZoom: "En línea, por Zoom",
        chipLang: function (l) { return "Clases en " + l; },
        audienceH: "¿Dónde está usted con PEA?",
        audience: [
          ["Quiero unirme", "Cómo inscribirse, paso a paso."],
          ["Ya estoy inscrito/a", "Calendario de clases, temas y materiales."],
          ["Ya terminé PEA", "Cómo seguir en contacto."]
        ],
        fitH: "¿PEA es para mí?",
        fitLead: "PEA es para madres, padres y cuidadores que quieren acompañar a sus hijos y abogar por ellos en el sistema escolar de Arizona. El personal escolar también es bienvenido.",
        fitItems: [
          ["Su relación con el estudiante", "¿Es abuela, abuelo, tutor u otra persona que cuida a un estudiante? Usted también puede participar. Si tiene dudas, con gusto le orientamos."],
          ["Su escuela o su trabajo", "Si trabaja en una escuela —por ejemplo, como enlace con las familias o maestro—, es bienvenido. Si tiene preguntas sobre el tipo de escuela o el grado de su estudiante, escríbanos."],
          ["Su idioma", "Las clases de otoño de 2026 son en español. Si habla inglés, también puede participar: ofrecemos apoyos en inglés, como subtítulos traducidos o trabajo en grupos pequeños, según lo que necesiten las personas inscritas. Indique su idioma preferido en el formulario de interés; nuestro equipo le atiende en español y en inglés."]
        ],
        askCta: "Preguntarle al equipo →",
        benefitsH: "Lo que va a aprender",
        benefitsLead: "Estos son los objetivos del programa. Cada familia los vive a su manera.",
        benefits: [
          ["Prepararse para hablar con la escuela", "Pensar qué preguntar, qué información compartir y cómo dar seguimiento a una conversación con el personal escolar."],
          ["Saber a quién acudir", "Entender cómo se organizan las escuelas y los distritos, y a quién dirigirse cuando surge una inquietud."],
          ["Apoyar el aprendizaje en casa", "Descubrir ideas para acompañar la lectura y las matemáticas, y hablar con la escuela sobre lo que necesita su estudiante."],
          ["Participar en su comunidad", "Compartir su experiencia, colaborar con otras familias y tomar parte en las decisiones de la escuela."]
        ],
        topicsCta: "Ver los temas de las 18 clases →",
        datesH: "Otoño de 2026: fechas y tiempo",
        timeH: "El tiempo que necesita",
        timeText: "18 clases de 90 minutos: 27 horas en vivo en total.",
        timeNote: "No incluye la sesión informativa opcional ni el grupo de enfoque. Si quiere saber cuánto tiempo toman los materiales o actividades fuera de clase, pregúntenos.",
        stepsH: "Cómo unirse, en cuatro pasos",
        stepsCta: "Ver los pasos completos →"
      },

      steps: {
        h: "Cómo participar",
        lead: "Del formulario de interés a su primera clase. No hay proceso de selección ni formulario de compromiso: el formulario de interés es su solicitud.",
        items: [
          { t: "Llene el formulario de interés", short: "Es su solicitud para PEA.",
            d: "El formulario de interés es su solicitud para PEA. Complételo con su nombre, correo electrónico, idioma preferido y la demás información que se le pide. Use un correo que revise con frecuencia: ahí le enviaremos novedades e información importante sobre PEA.",
            link: "apply", cta: "Llenar el formulario", key: true },
          { t: "Busque su correo de bienvenida", short: "Trae su enlace personal de Zoom para todas las clases.",
            d: "Después de recibir su formulario, preparamos su acceso a Zoom y le enviamos un correo de bienvenida con:",
            list: [
              "Su enlace personal de Zoom. Es el mismo para todas las clases de PEA de este otoño, y también nos ayuda a registrar su asistencia.",
              "Las fechas y el horario del programa.",
              "La guía para solicitantes de PEA.",
              "Maneras opcionales de hacer preguntas y conectar con otras familias y cuidadores."
            ],
            after: "Su enlace es solo para usted, así que le pedimos no compartirlo. No necesita registrarse aparte en Zoom ni pedir un enlace nuevo cada semana." },
          { t: "Prepárese para el programa", short: "Descargue Zoom y pruebe su cámara, micrófono y conexión.",
            d: "Antes de la primera clase y durante la primera semana:",
            list: [
              "Lea la guía para solicitantes y agregue las fechas de clase a su calendario.",
              "Descargue la aplicación de Zoom en su dispositivo y confirme que puede iniciar sesión.",
              "Pruebe su cámara, micrófono y conexión a Wi-Fi.",
              { t: "Opcional: venga a la sesión informativa el jueves 1 de octubre, de 5:00 a 6:30 p. m., para conocer más el programa y hacer sus preguntas.", whileInfo: true },
              "Opcional: únase al grupo de WhatsApp de su cohorte para conocer a sus compañeros de clase."
            ] },
          { t: "Entre a su primera clase", short: "Martes 6 de octubre, 5:00 p. m., hora de Arizona.",
            d: "Las clases de otoño de 2026 empiezan el martes 6 de octubre a las 5:00 p. m. Nos reunimos los martes y jueves, de 5:00 a 6:30 p. m., hasta el martes 8 de diciembre. No hay clase el jueves 26 de noviembre, Día de Acción de Gracias. Unos minutos antes de cada clase:",
            list: [
              "Abra la aplicación de Zoom e inicie sesión.",
              "Haga clic en su enlace personal de Zoom.",
              "Espere en la sala de espera virtual de PEA."
            ], ordered: true,
            after: "Cuando el equipo de PEA esté listo, Zoom le pasará a la clase automáticamente. Ahí podrá ver y escuchar a las personas facilitadoras y a las demás familias de su cohorte." }
        ],
        helpText: "¿Tiene preguntas? Estamos para ayudarle, en español o en inglés.",
        helpEmail: "Escribir al equipo",
        helpCall: "Llamar al",
        helpSms: "Mandar texto",
        infoH: "Sesión informativa (opcional)",
        infoPastNote: "La sesión informativa de este otoño ya pasó. ¿Tiene preguntas sobre el programa? Llame o mande un texto o WhatsApp al 602-759-0619; con gusto le ayudamos.",
        infoNote: "Venga a conocer más el programa y a hacer sus preguntas. Este registro es solo para la sesión informativa; no lo necesita para las clases. El enlace también viene en su correo de bienvenida. ¿No puede venir o tiene preguntas? Llame o mande un texto o WhatsApp al 602-759-0619.",
        zoomH: "¿Necesita ayuda con Zoom?",
        zoomLead: "Estos videos cortos, en español, le muestran cómo prepararse.",
        vids: [
          ["vidAccount", "Crear una cuenta de Zoom", "Para iniciar sesión en la aplicación."],
          ["vidName", "Cambiar el nombre que se muestra", "Use su nombre y apellido para que le reconozcamos al entrar."]
        ],
        lostLabel: "¿No encuentra su correo de bienvenida?",
        lost: "Revise la carpeta de spam o correo no deseado. Si aún no aparece, escríbanos a pea@allineducation.org o llame, mande un texto o WhatsApp al 602-759-0619. Con gusto le volvemos a enviar su enlace.",
        resendCta: "Pedir que me reenvíen mi enlace",
        deviceLabel: "¿Computadora, tableta o teléfono?",
        device: "Con una computadora o tableta es más fácil ver los materiales y participar. Si solo tiene teléfono, también funciona.",
        staffH: "Para el personal escolar",
        staffText: "Gracias por acompañar a las familias. Puede ayudarles a llenar el formulario de interés, a encontrar su correo de bienvenida y a comunicarse con nuestro equipo si necesitan apoyo. Cada persona recibe su propio enlace personal de Zoom."
      },

      cal: {
        h: "Calendario y temas",
        tapHint: "Toque una clase para ver de qué trata, su hoja de trabajo y la lista de recursos.",
        scheduleLabel: "Otoño de 2026",
        scheduleNote: "18 clases, los martes y jueves, del 6 de octubre al 8 de diciembre de 2026, de 5:00 a 6:30 p. m., hora de Arizona. No hay clase el jueves 26 de noviembre (Día de Acción de Gracias). Sesión informativa opcional: jueves 1 de octubre. Grupo de enfoque: jueves 10 de diciembre. ¿Las clases ya empezaron? Escríbanos y vemos cómo puede unirse.",
        filterLabel: "Mostrar",
        filters: { all: "Todo", info: "Sesión informativa", cls: "Clases" },
        cols: { date: "Fecha", kind: "Tipo", topic: "Tema", time: "Hora" },
        kinds: { info: "Sesión informativa", cls: "Clase", holiday: "No hay clase", focus: "Grupo de enfoque", grad: "Graduación" },
        topics: { info: "Conozca el programa y haga sus preguntas", holiday: "Día de Acción de Gracias", focus: "Conversación sobre su experiencia en PEA" },
        infoWording: "Opcional. Para conocer el programa y hacer sus preguntas",
        infoJoin: "Registrarse solo para la sesión informativa",
        today: "Hoy", done: "Ya pasó",
        note: "Hora de Arizona. Todas las clases son por Zoom.",
        full: "Ver el calendario publicado",
        ics: "Descargar todas las fechas (.ics)",
        icsHelp: "Agregue todas las fechas al calendario de su teléfono o computadora.",
        icsName: "PEA",
        detail: {
          open: "Ver detalles de la clase", close: "Ocultar detalles", openInfo: "Ver detalles de la sesión",
          about: "Sobre esta clase", aboutInfo: "Sobre la sesión",
          zoomNote: "Entre con el enlace personal de Zoom de su correo de bienvenida; es el mismo para todas las clases.",
          resources: "Lista de recursos", worksheet: "Hoja de trabajo (PDF)", addCal: "Agregar a mi calendario"
        },
        classNote: "Entre a clase con el enlace personal de Zoom de su correo de bienvenida. Es el mismo para todas las clases; por favor, no lo comparta.",
        holidayNote: "No hay clase este día.",
        projectedLabel: "Por confirmar",
        projected: "Fechas proyectadas, aún por confirmar.",
        experienceH: "Imagine una clase de PEA",
        experienceLead: "Nos reunimos en vivo por Zoom para conversar, hacer preguntas y trabajar en actividades con otras familias. El formato cambia un poco según el tema.",
        experience: [
          ["Aprender", "Conocer el tema del día y relacionarlo con su experiencia en familia o en la escuela."],
          ["Conversar", "Compartir preguntas e ideas con su grupo."],
          ["Reflexionar", "Al final, responder una encuesta corta: de cinco a ocho preguntas, entre dos y cuatro minutos."]
        ],
        springH: "Próximas fechas",
        spring: "Primavera de 2027: del 16 de marzo al 13 de mayo, los martes y jueves, de 5:00 a 6:30 p. m., hora de Arizona. Ya puede llenar el formulario de interés."
      },

      hist: {
        h: "Experiencias e historia",
        storiesH: "Historias de familias",
        storiesLead: "Estas historias se publicaron en 2023 y cuentan experiencias de años anteriores; sus fechas y detalles no describen la cohorte actual.",
        stories: [
          ["Patricia: hablar con la escuela", "Arizona Luminaria cuenta cómo Patricia Ojeda pasó de sentirse intimidada al hablar con la escuela a expresar sus inquietudes y buscar apoyo para el aprendizaje de sus hijos."],
          ["Gloria: otra forma de navegar el sistema", "Gloria Castejón, madre y exmaestra, cuenta cómo PEA le dio la oportunidad de compartir lo que sabía y descubrir otras maneras de navegar el sistema educativo."]
        ],
        storyCta: "Leer la historia en Arizona Luminaria",
        p: [
          "PEA nació durante la pandemia. ALL In Education vio que la distancia entre las escuelas y las familias se había vuelto el mayor obstáculo, y creó la Parent Educator Academy para que madres, padres y cuidadores pudieran navegar el aprendizaje virtual, entender el sistema escolar y abogar por sus hijos con confianza.",
          "La primera cohorte se graduó en la primavera de 2021, con 27 personas. Según la evaluación de LeCroy & Milligan de agosto de 2022, la asistencia promedio a las 15 sesiones centrales fue del 96.4%, y las 111 personas de la cohorte de primavera de 2022 se graduaron.",
          "Cada cohorte ha dejado algo: preguntas que hoy son parte del currículo, lecciones sobre dónde se atora el sistema, y personas que terminaron PEA y ahora acompañan a las familias que llegan."
        ],
        stats: {
          alumni: "Personas que han terminado PEA",
          alumniNote: function (cohorts, years, date) { return "Registro histórico al " + date + ". No es la matrícula actual."; },
          cohort: "Número de cohorte",
          cohortNote: "la cohorte de esta página",
          counties: "Condados principales",
          countiesNote: "Maricopa, Pima y Yuma",
          grad: "Graduación",
          gradNote: "cohorte de primavera de 2022; 111 participantes"
        },
        evidenceH: "Lo que encontró una evaluación anterior",
        evidenceText: "La evaluación de LeCroy & Milligan de 2022 encontró que las personas participantes se sentían más capaces de comunicarse con los maestros. Es un resultado de esa cohorte, no una garantía para cada participante.",
        evidenceSource: "Fuente: Parent Educator Academy Evaluation Report, agosto de 2022, página 25; encuestas antes y después del programa, 109 participantes.",
        videoH: "Conozca ALL In Education",
        videoText: "Video «ALL In Education — Who We Are» (6 minutos y 44 segundos). Está en inglés, con subtítulos automáticos en inglés en YouTube. Presenta a la organización y su misión.",
        videoCta: "Ver el video en YouTube",
        missionH: "La misión de ALL In Education",
        mission: "Asegurar que las personas de las comunidades más afectadas por las desigualdades educativas sean quienes toman las decisiones que dan forma a los sistemas educativos, para que todos los estudiantes y las familias de Arizona puedan prosperar."
      },

      help: {
        contactH: "Hable con nuestro equipo",
        contactLead: "Le respondemos en español y en inglés. Escríbanos antes de decidir, antes de la primera clase o en cualquier momento del programa: con gusto le ayudamos con Zoom, su conexión, subtítulos u otra necesidad de accesibilidad.",
        labels: { email: "Correo", phone: "Teléfono (llamada o texto)", wa: "WhatsApp", web: "Sitio web" },
        waCta: "Mandar un mensaje",
        smsCta: "Mandar texto",
        webLabel: "allineducation.org",
        faqH: "Preguntas frecuentes",
        linksH: "Enlaces útiles",
        linkGroups: [
          { h: "Para unirse", items: [
            ["apply", "Formulario de interés", "Su solicitud para PEA."],
            ["info", "Registro solo para la sesión informativa", "Opcional. Jueves 1 de octubre, de 5:00 a 6:30 p. m. No es el registro para las clases."],
            ["cal", "Calendario publicado", "Todas las fechas del programa."]
          ]},
          { h: "Zoom", items: [
            ["resend", "Reenviar mi enlace de Zoom", "Se lo enviamos de nuevo al correo con el que se inscribió."],
            ["vidAccount", "Crear una cuenta de Zoom", "Video corto, en español."],
            ["vidName", "Cambiar el nombre que se muestra", "Video corto, en español."]
          ]},
          { h: "Durante el programa", items: [
            ["whatsapp", "Grupo de WhatsApp de otoño de 2026", "Opcional. Para conectar con sus compañeros de clase."],
            ["exit", "Encuesta de salida", "Al final de cada clase."],
            ["lista", "Lista de recursos", "Materiales y enlaces de apoyo."]
          ]},
          { h: "Para compartir", items: [
            ["flyer", "Volante del programa", "Para imprimir o compartir por mensaje."]
          ]}
        ],
        alumniH: "Después de PEA",
        alumniText: "Su relación con PEA sigue después de la graduación. Pregúntenos por los grupos de enfoque, las oportunidades de liderazgo y cómo recibir esos avisos."
      },

      faq: {
        items: [
          ["¿Cómo me inscribo en PEA?", "Llene el formulario de interés: es su solicitud. No hay proceso de selección ni formulario de compromiso. Después de recibirlo, preparamos su acceso a Zoom y le enviamos su enlace personal en un correo de bienvenida."],
          ["¿Quién puede participar?", "Madres, padres y cuidadores que quieren acompañar a sus hijos y abogar por ellos en el sistema escolar de Arizona. El personal escolar, como enlaces con las familias y maestros, también es bienvenido. Si tiene dudas sobre su caso, escríbanos."],
          ["¿Cuánto cuesta?", "Nada. PEA es gratuito para todas las personas participantes."],
          ["¿En qué idioma son las clases?", function (c) { return !c.lang ? "" : "Las clases de " + c.label + " son en " + c.lang + ", con apoyos en inglés, como subtítulos traducidos o trabajo en grupos pequeños. Organizamos las clases según lo que necesiten las personas inscritas, así que indique su idioma preferido en el formulario de interés. La sesión informativa es bilingüe, y nuestro equipo le atiende en español y en inglés."; }],
          ["¿Cómo sé que ya tengo mi lugar?", "Recibirá un correo de bienvenida con su enlace personal de Zoom, las fechas del programa y la guía para solicitantes. Guarde ese enlace: lo usará para entrar a todas las clases."],
          ["¿Es obligatoria la sesión informativa?", function (c) { return c.infoOpen ? "No. Es opcional y no afecta su lugar. Es el jueves 1 de octubre, de 5:00 a 6:30 p. m., hora de Arizona: un espacio para conocernos y resolver sus dudas. Si no puede venir, llame o mande un mensaje al 602-759-0619." : "No. Es opcional y no afecta su lugar. La sesión de este otoño ya pasó; si tiene preguntas, llame o mande un mensaje al 602-759-0619."; }],
          ["¿Necesito una cuenta de Zoom?", "Sí. Necesita poder iniciar sesión en la aplicación de Zoom, y la cuenta es gratuita. Para entrar a clase, use el enlace personal de su correo de bienvenida; no necesita registrarse aparte en Zoom."],
          ["No encuentro mi correo de bienvenida. ¿Qué hago?", "Revise la carpeta de spam o correo no deseado. Si aún no aparece, escríbanos a pea@allineducation.org o llame, mande un texto o WhatsApp al 602-759-0619. Con gusto le volvemos a enviar su enlace."],
          ["¿Puedo participar desde el teléfono?", "Sí. Con una computadora o tableta es más fácil ver los materiales y participar, pero si solo tiene teléfono, también funciona."],
          ["¿Qué pasa si mi conexión falla o no puedo encender la cámara?", "Avísenos y le orientamos. Antes de empezar, pruebe su conexión, cámara y micrófono."],
          ["¿Cuánto tiempo debo reservar?", "Las 18 clases de 90 minutos suman 27 horas en vivo, los martes y jueves de 5:00 a 6:30 p. m., hora de Arizona. La sesión informativa y el grupo de enfoque son aparte. Si quiere saber cuánto tiempo toman las actividades fuera de clase, pregúntenos."],
          ["¿Qué pasa si falto a una clase?", "Avísenos con anticipación y pregúntenos cómo ponerse al día."],
          ["¿Se graban las clases?", "Pregúntenos por la política actual de grabaciones y cómo recuperar una clase."],
          ["¿Puedo pedir subtítulos u otro apoyo de accesibilidad?", "Sí. Cuéntenos lo que necesita antes de la primera clase y le explicamos qué apoyos hay y cómo pedirlos."],
          ["¿Qué es la encuesta de salida?", "Una encuesta corta al final de cada clase: de cinco a ocho preguntas, entre dos y cuatro minutos. Sus respuestas nos ayudan a mejorar el programa de una cohorte a otra."],
          ["Trabajo en una escuela. ¿Cómo puedo ayudar a las familias?", "Puede ayudarles a llenar el formulario de interés, a encontrar su correo de bienvenida y a comunicarse con nuestro equipo si necesitan apoyo. Cada persona recibe su propio enlace personal de Zoom."],
          ["¿Hay algo después del programa?", "Sí. Quienes terminan PEA siguen en contacto con ALL In Education: hay grupos de enfoque, oportunidades de liderazgo y la oportunidad de acompañar a las familias nuevas. La graduación cierra el curso, no la relación."]
        ]
      },

      foot: {
        rights: "© ALL In Education. Todos los derechos reservados.",
        version: function (v, d) { return "Versión " + v + " · Actualizado el " + d; },
        dates: function (d) { return "Fechas: calendario de PEA, verificado el " + d; },
        logoAlt: "ALL In Education — Leadership · Power · Justice"
      },

      days: { names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
              short: ["dom","lun","mar","mié","jue","vie","sáb"],
              months: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
              and: "y" }
    },

    en: {
      _lang: "en",
      meta: {
        title: "Join PEA — Parent Educator Academy",
        description: "Everything you need to join ALL In Education's Parent Educator Academy: how to apply, dates, topics and help."
      },
      toolTitle: "Parent Educator Academy",
      toolSub: function (c) { return "Registration hub · " + c; },
      langSwitch: { toEn: "Switch to English", toEs: "Cambiar a español", group: "Language", announced: "Page in English" },

      nav: { home: "Home", menu: "Menu", groups: { join: "Join", about: "About PEA", help: "Help" } },
      sections: {
        participar: { label: "How to take part", time: "3 min" },
        calendario: { label: "Calendar & topics", time: "3 min" },
        historia:   { label: "Stories", time: "2 min" },
        ayuda:      { label: "Questions & help", time: "4 min" }
      },

      ui: {
        skip: "Skip to content",
        show: "▼ Show", hide: "▲ Hide",
        searchPh: "Search the questions…",
        clear: "Clear search",
        noResults: "We couldn't find that word. Try another one, or write to us.",
        noResultsLabel: "No matches",
        count: function (n) { return n === 1 ? "1 question" : n + " questions"; },
        optional: "Optional",
        minutes: function (t) { return t + " read"; },
        quick: "Quick actions"
      },

      actions: {
        home: "Home",
        cal: "View calendar", calShort: "Calendar",
        info: "Info session registration",
        wa: "WhatsApp the team", waShort: "WhatsApp"
      },

      home: {
        h: "Your next step with PEA",
        whatH: "What is PEA?",
        what: "The Parent Educator Academy (PEA) is a free ALL In Education program for parents and caregivers. Together, we learn how Arizona's school system works and how to advocate for our children with confidence. School staff, such as family liaisons and teachers, are welcome too.",
        chipFree: "Free",
        chipZoom: "Online, on Zoom",
        chipLang: function (l) { return "Taught in " + l; },
        audienceH: "Where are you with PEA?",
        audience: [
          ["I want to join", "How to sign up, step by step."],
          ["I’m registered", "Class calendar, topics, and materials."],
          ["I finished PEA", "How to stay connected."]
        ],
        fitH: "Is PEA a fit for me?",
        fitLead: "PEA is for parents and caregivers who want to support their children and advocate for them in Arizona’s school system. School staff are welcome too.",
        fitItems: [
          ["Your relationship to the student", "Are you a grandparent, guardian, or another caregiver? You can take part too. If you have questions, we’re happy to help."],
          ["Your school or role", "If you work at a school — for example, as a family liaison or teacher — you’re welcome to join. If you have questions about your student’s school type or grade level, write to us."],
          ["Your language", "Fall 2026 classes are taught in Spanish. English speakers are welcome too: we offer English supports, such as translated subtitles or small-group work, based on what enrolled participants need. Share your preferred language on the interest form; our team supports you in Spanish and English."]
        ],
        askCta: "Ask the team →",
        benefitsH: "What you’ll learn",
        benefitsLead: "These are the program’s learning goals. Every family experiences them in its own way.",
        benefits: [
          ["Prepare for school conversations", "Think through what to ask, what to share, and how to follow up with school staff."],
          ["Know whom to contact", "Understand how schools and districts are organized, and whom to go to when a concern comes up."],
          ["Support learning at home", "Find ideas for supporting reading and math, and talk with the school about what your student needs."],
          ["Take part in your community", "Share your experience, work alongside other families, and have a voice in school decisions."]
        ],
        topicsCta: "See the topics of all 18 classes →",
        datesH: "Fall 2026: dates and time",
        timeH: "The time you’ll need",
        timeText: "18 classes of 90 minutes: 27 live hours in all.",
        timeNote: "This doesn’t include the optional information session or the focus group. If you’d like to know how much time materials or activities outside class take, just ask.",
        stepsH: "How to join, in four steps",
        stepsCta: "See the full steps →"
      },

      steps: {
        h: "How to take part",
        lead: "From your interest form to your first class. There is no selection process and no commitment form: the interest form is your application.",
        items: [
          { t: "Complete the interest form", short: "It’s your PEA application.",
            d: "The interest form is your PEA application. Complete the form with your name, email address, preferred language, and the other information requested. Be sure to use an email address you check regularly — we’ll use it to send you important updates and information about PEA.",
            link: "apply", cta: "Complete the form", key: true },
          { t: "Find your welcome email", short: "It has your personal Zoom link for every class.",
            d: "Once we receive your form, we set up your Zoom access and send you a welcome email with:",
            list: [
              "Your personal Zoom link. It’s the same link for every PEA class this fall, and it also helps us record attendance.",
              "The program dates and schedule.",
              "The PEA applicant guide.",
              "Optional ways to ask questions and connect with other parents and caregivers."
            ],
            after: "Your link is just for you, so please don’t share it. You don’t need to register separately in Zoom or get a new link each week." },
          { t: "Get ready for the program", short: "Download Zoom and test your camera, microphone, and connection.",
            d: "Before your first class and during the first week:",
            list: [
              "Read the applicant guide and add the class dates to your calendar.",
              "Download the Zoom app to your device and make sure you can sign in.",
              "Test your camera, microphone, and Wi-Fi connection.",
              { t: "Optional: come to the information session on Thursday, October 1, 5:00–6:30 PM, to learn more and ask your questions.", whileInfo: true },
              "Optional: join your cohort’s WhatsApp group to meet your classmates."
            ] },
          { t: "Join your first class", short: "Tuesday, October 6, 5:00 PM Arizona time.",
            d: "Fall 2026 classes begin on Tuesday, October 6, at 5:00 PM. We meet Tuesdays and Thursdays, 5:00–6:30 PM, through Tuesday, December 8. There is no class on Thanksgiving, Thursday, November 26. A few minutes before each class:",
            list: [
              "Open the Zoom app and sign in.",
              "Click your personal Zoom link.",
              "Wait in the PEA Virtual Waiting Room."
            ], ordered: true,
            after: "When the PEA team is ready, Zoom will move you into class automatically. You’ll be able to see and hear the facilitators and the other parents and caregivers in your cohort." }
        ],
        helpText: "Have questions? We’re here to help, in Spanish or English.",
        helpEmail: "Email the team",
        helpCall: "Call",
        helpSms: "Send a text",
        infoH: "Information session (optional)",
        infoPastNote: "This fall’s information session has already taken place. Have questions about the program? Call, text, or WhatsApp 602-759-0619 — we’re happy to help.",
        infoNote: "Come learn more about the program and ask your questions. This registration is only for the information session; you don’t need it for classes. The link is also in your welcome email. Can’t make it, or have questions? Call, text, or WhatsApp 602-759-0619.",
        zoomH: "Need help with Zoom?",
        zoomLead: "These short videos, in Spanish, show you how to get set up.",
        vids: [
          ["vidAccount", "Create a Zoom account", "So you can sign in to the app."],
          ["vidName", "Change your display name", "Use your first and last name so we recognize you when you join."]
        ],
        lostLabel: "Can’t find your welcome email?",
        lost: "Check your spam or junk folder. If it’s still not there, email pea@allineducation.org or call, text, or WhatsApp 602-759-0619. We’re happy to send your link again.",
        resendCta: "Ask us to resend my link",
        deviceLabel: "Computer, tablet, or phone?",
        device: "A computer or tablet makes it easier to see the materials and take part. If a phone is what you have, a phone works.",
        staffH: "For school personnel",
        staffText: "Thank you for supporting families. You can help them complete the interest form, find their welcome email, and contact our team if they need help. Each applicant receives their own personal Zoom link."
      },

      cal: {
        h: "Calendar & topics",
        tapHint: "Tap a class to see what it covers, its worksheet, and the resource list.",
        scheduleLabel: "Fall 2026",
        scheduleNote: "18 classes on Tuesdays and Thursdays, October 6–December 8, 2026, 5:00–6:30 PM Arizona time. No class Thursday, November 26 (Thanksgiving). Optional information session: Thursday, October 1. Focus group: Thursday, December 10. Have classes already started? Write to us and we’ll see how you can join.",
        filterLabel: "Show",
        filters: { all: "All", info: "Information session", cls: "Classes" },
        cols: { date: "Date", kind: "Type", topic: "Topic", time: "Time" },
        kinds: { info: "Information session", cls: "Class", holiday: "No class", focus: "Focus group", grad: "Graduation" },
        topics: { info: "Get to know the program and ask your questions", holiday: "Thanksgiving", focus: "A conversation about your time in PEA" },
        infoWording: "Optional. Get to know the program and ask your questions",
        infoJoin: "Register for the info session only",
        today: "Today", done: "Past",
        note: "Arizona time. All classes meet on Zoom.",
        full: "See the published calendar",
        ics: "Download every date (.ics)",
        icsHelp: "Add every date to the calendar on your phone or computer.",
        icsName: "PEA",
        detail: {
          open: "See class details", close: "Hide details", openInfo: "See session details",
          about: "About this class", aboutInfo: "About the session",
          zoomNote: "Join with the personal Zoom link in your welcome email; it’s the same for every class.",
          resources: "Resource list", worksheet: "Worksheet (PDF, in Spanish)", addCal: "Add to my calendar"
        },
        classNote: "Join class with the personal Zoom link in your welcome email. It’s the same for every class; please don’t share it.",
        holidayNote: "There is no class this day.",
        projectedLabel: "To be confirmed",
        projected: "Projected dates, not yet confirmed.",
        experienceH: "Picture a PEA class",
        experienceLead: "We meet live on Zoom to talk, ask questions, and work through activities with other families. The format shifts a little with each topic.",
        experience: [
          ["Learn", "Explore the day’s topic and connect it to your experience at home or at school."],
          ["Talk it through", "Share questions and ideas with your group."],
          ["Reflect", "At the end, answer a short exit survey: five to eight questions, two to four minutes."]
        ],
        springH: "Coming up",
        spring: "Spring 2027: March 16–May 13, Tuesdays and Thursdays, 5:00–6:30 PM Arizona time. The interest form is open now."
      },

      hist: {
        h: "Stories & history",
        storiesH: "Family stories",
        storiesLead: "These stories were published in 2023 and describe earlier years; their dates and details don’t describe the current cohort.",
        stories: [
          ["Patricia: speaking up at school", "Arizona Luminaria tells how Patricia Ojeda went from feeling intimidated in school conversations to raising her concerns and seeking support for her children’s learning."],
          ["Gloria: a new way through the system", "Gloria Castejón, a mother and former teacher, shares how PEA gave her a chance to share what she knew and find new ways to navigate the education system."]
        ],
        storyCta: "Read the story in Arizona Luminaria",
        p: [
          "PEA began during the pandemic. ALL In Education saw that the distance between schools and families had become the biggest barrier, and created the Parent Educator Academy so parents and caregivers could navigate virtual learning, understand the school system, and advocate for their children with confidence.",
          "The first cohort graduated in spring 2021, with 27 people. According to LeCroy & Milligan’s August 2022 evaluation, average attendance across the 15 core sessions was 96.4%, and all 111 participants in the spring 2022 cohort graduated.",
          "Every cohort has left something behind: questions that are now part of the curriculum, lessons about where the system gets stuck, and people who finished PEA and now walk alongside the families coming in."
        ],
        stats: {
          alumni: "People who have finished PEA",
          alumniNote: function (cohorts, years, date) { return "Historical record as of " + date + ". This is not current enrollment."; },
          cohort: "Cohort number",
          cohortNote: "the cohort on this page",
          counties: "Primary counties",
          countiesNote: "Maricopa, Pima and Yuma",
          grad: "Graduation rate",
          gradNote: "spring 2022 cohort; 111 participants"
        },
        evidenceH: "What an earlier evaluation found",
        evidenceText: "LeCroy & Milligan’s 2022 evaluation found that participants felt more able to communicate with teachers. This finding describes that cohort and isn’t a guarantee for every participant.",
        evidenceSource: "Source: Parent Educator Academy Evaluation Report, August 2022, page 25; pre- and post-program surveys, 109 participants.",
        videoH: "Get to know ALL In Education",
        videoText: "“ALL In Education — Who We Are” (6 minutes, 44 seconds). In English, with automatic English captions on YouTube. It introduces the organization and its mission.",
        videoCta: "Watch on YouTube",
        missionH: "The ALL In Education mission",
        mission: "To ensure that individuals from the communities most impacted by education inequities are the ones making decisions that shape education systems, so all students and families in Arizona can thrive."
      },

      help: {
        contactH: "Talk with our team",
        contactLead: "We answer in Spanish and English. Reach out before you decide, before your first class, or any time during the program — we’re glad to help with Zoom, your connection, captions, or any accessibility need.",
        labels: { email: "Email", phone: "Phone (call or text)", wa: "WhatsApp", web: "Website" },
        waCta: "Send a message",
        smsCta: "Send a text",
        webLabel: "allineducation.org",
        faqH: "Frequently asked questions",
        linksH: "Useful links",
        linkGroups: [
          { h: "To join", items: [
            ["apply", "Interest form", "Your PEA application."],
            ["info", "Information session registration only", "Optional. Thursday, October 1, 5:00–6:30 PM. This isn’t class registration."],
            ["cal", "Published calendar", "Every date in the program."]
          ]},
          { h: "Zoom", items: [
            ["resend", "Resend my Zoom link", "We’ll send it again to the email you signed up with."],
            ["vidAccount", "Create a Zoom account", "Short video, in Spanish."],
            ["vidName", "Change your display name", "Short video, in Spanish."]
          ]},
          { h: "During the program", items: [
            ["whatsapp", "Fall 2026 WhatsApp group", "Optional. Connect with your classmates."],
            ["exit", "Exit survey", "At the end of each class."],
            ["lista", "Resource list", "Supporting materials and links."]
          ]},
          { h: "To share", items: [
            ["flyer", "Program flyer", "To print or share by message."]
          ]}
        ],
        alumniH: "After PEA",
        alumniText: "Your connection with PEA continues after graduation. Ask us about focus groups, leadership opportunities, and how to hear about them."
      },

      faq: {
        items: [
          ["How do I sign up for PEA?", "Complete the interest form — it’s your application. There is no selection process and no commitment form. Once we receive it, we set up your Zoom access and send your personal link in a welcome email."],
          ["Who can take part?", "Parents and caregivers who want to support their children and advocate for them in Arizona’s school system. School staff, such as family liaisons and teachers, are welcome too. If you’re unsure about your situation, write to us."],
          ["What does it cost?", "Nothing. PEA is free for everyone who takes part."],
          ["What language are classes in?", function (c) { return !c.lang ? "" : c.label + " classes are taught in " + c.lang + ", with English supports such as translated subtitles or small-group work. We plan how classes are delivered around what applicants need, so share your preferred language on the interest form. The information session is bilingual, and our team supports you in Spanish and English."; }],
          ["How do I know I have a place?", "You’ll receive a welcome email with your personal Zoom link, the program dates, and the applicant guide. Save that link — you’ll use it to join every class."],
          ["Do I have to attend the information session?", function (c) { return c.infoOpen ? "No. It’s optional and doesn’t affect your place. It’s on Thursday, October 1, 5:00–6:30 PM Arizona time — a chance to meet us and get your questions answered. If you can’t make it, call or text 602-759-0619." : "No. It’s optional and doesn’t affect your place. This fall’s session has already taken place; if you have questions, call or text 602-759-0619."; }],
          ["Do I need a Zoom account?", "Yes. You need to be able to sign in to the Zoom app, and the account is free. To join class, use the personal link in your welcome email; you don’t need to register separately in Zoom."],
          ["I can’t find my welcome email. What should I do?", "Check your spam or junk folder. If it’s still not there, email pea@allineducation.org or call, text, or WhatsApp 602-759-0619. We’re happy to send your link again."],
          ["Can I take part from my phone?", "Yes. A computer or tablet makes it easier to see the materials and take part, but if a phone is what you have, a phone works."],
          ["What if my connection drops or I can’t turn on my camera?", "Let us know and we’ll help. Before you start, test your connection, camera, and microphone."],
          ["How much time should I set aside?", "The 18 classes of 90 minutes add up to 27 live hours, Tuesdays and Thursdays, 5:00–6:30 PM Arizona time. The information session and focus group are separate. If you’d like to know how much time activities outside class take, just ask."],
          ["What if I miss a class?", "Let us know ahead of time, and ask us how to catch up."],
          ["Are classes recorded?", "Ask us about the current recording policy and how to make up a class."],
          ["Can I ask for captions or other accessibility support?", "Yes. Tell us what you need before your first class, and we’ll explain which supports are available and how to request them."],
          ["What is the exit survey?", "A short survey at the end of each class: five to eight questions, two to four minutes. Your answers help us improve the program from one cohort to the next."],
          ["I work at a school. How can I help families?", "You can help them complete the interest form, find their welcome email, and contact our team if they need help. Each applicant receives their own personal Zoom link."],
          ["Is there anything after the program?", "Yes. People who finish PEA stay connected with ALL In Education through focus groups, leadership opportunities, and the chance to walk alongside new families. Graduation ends the course, not the relationship."]
        ]
      },

      foot: {
        rights: "© ALL In Education. All rights reserved.",
        version: function (v, d) { return "Version " + v + " · Updated " + d; },
        dates: function (d) { return "Dates: PEA calendar, checked " + d; },
        logoAlt: "ALL In Education — Leadership · Power · Justice"
      },

      days: { names: ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              short: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
              months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
              and: "and" }
    }
  };

  root.T = T;
  if (typeof module !== "undefined" && module.exports) module.exports = { T: T };
})(typeof window !== "undefined" ? window : globalThis);
