// Base de datos de recursos
const recursosPorNivel = {
  inicial: {
    videos: [
      {
        id: 1,
        titulo: "Motricidad Fina - Ejercicios para Preescolar",
        url: "https://www.youtube.com/embed/mKASUJfentY",
        descripcion: "Ejercicios lúdicos para desarrollar motricidad fina en niños de inicial",
        tipo: "video",
        disgrafia: "motriz",
        duracion: "15 min"
      },
      {
        id: 2,
        titulo: "Caligrafía con Canciones - Preescolar",
        url: "https://www.youtube.com/embed/I71JiwUlNO0",
        descripcion: "Actividades de grafomotricidad con música y ritmo",
        tipo: "video",
        disgrafia: "motriz",
        duracion: "10 min"
      },
      {
        id: 3,
        titulo: "Ejercicios de Coordinación Ojo-Mano",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Juegos interactivos para mejorar coordinación",
        tipo: "video",
        disgrafia: "visuoespacial",
        duracion: "12 min"
      }
    ],
    pdfs: [
      {
        id: 1,
        titulo: "Cuaderno de Motricidad Fina (62 actividades)",
        url: "https://profe.social/posts/92578-cuaderno-disgrafia-infantil-y-primaria-62-actividades",
        descripcion: "Compilación de 62 actividades para trabajar motricidad fina",
        tipo: "pdf",
        disgrafia: "motriz",
        descargas: 2500
      },
      {
        id: 2,
        titulo: "Fichas de Grafomotricidad para Inicial",
        url: "https://imageneseducativas.com/?s=motricidad+fina",
        descripcion: "100+ fichas imprimibles de grafomotricidad",
        tipo: "pdf",
        disgrafia: "motriz",
        descargas: 3200
      },
      {
        id: 3,
        titulo: "Orientación Espacial - Actividades Inicial",
        url: "https://www.orientacionandujar.es/?s=disgrafia",
        descripcion: "Recursos para trabajar noción espacial",
        tipo: "pdf",
        disgrafia: "visuoespacial",
        descargas: 1800
      }
    ],
    juegos: [
      {
        id: 1,
        titulo: "GCompris",
        url: "https://gcompris.net/",
        descripcion: "Suite educativa con 100+ juegos de motricidad y coordinación",
        tipo: "juego",
        disgrafia: "motriz",
        plataforma: "Windows, Mac, Linux, Android"
      },
      {
        id: 2,
        titulo: "Tux Typing",
        url: "https://www.tuxtype.com/",
        descripcion: "Juego educativo de mecanografía para niños",
        tipo: "juego",
        disgrafia: "motriz",
        plataforma: "Multiplataforma"
      }
    ],
    herramientas: [
      {
        id: 1,
        titulo: "MyPaint",
        url: "https://mypaint.app/",
        descripcion: "Programa de dibujo para desarrollar motricidad",
        tipo: "herramienta",
        disgrafia: "motriz",
        costo: "Gratuito"
      },
      {
        id: 2,
        titulo: "OpenOffice Draw",
        url: "https://www.openoffice.org/",
        descripcion: "Herramienta de dibujo y esquemas",
        tipo: "herramienta",
        disgrafia: "visuoespacial",
        costo: "Gratuito"
      }
    ]
  },

  elemental: {
    videos: [
      {
        id: 1,
        titulo: "Caligrafía Paso a Paso - Primaria",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Técnicas de caligrafía para estudiantes de primaria",
        tipo: "video",
        disgrafia: "motriz",
        duracion: "20 min"
      },
      {
        id: 2,
        titulo: "Mejora tu Letra - Ejercicios Diarios",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Rutina diaria de 10 minutos para mejorar caligrafía",
        tipo: "video",
        disgrafia: "motriz",
        duracion: "10 min"
      },
      {
        id: 3,
        titulo: "Organización del Espacio en la Escritura",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Cómo ayudar a los niños a organizar el espacio en papel",
        tipo: "video",
        disgrafia: "visuoespacial",
        duracion: "15 min"
      }
    ],
    pdfs: [
      {
        id: 1,
        titulo: "Cuadernillo de Caligrafía (Elemental)",
        url: "https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/",
        descripcion: "Ejercicios completos de caligrafía para 2°-4° grado",
        tipo: "pdf",
        disgrafia: "motriz",
        descargas: 2800
      },
      {
        id: 2,
        titulo: "40 Fichas de Disgrafía - Educación 3.0",
        url: "https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/",
        descripcion: "Fichas variadas para trabajar diferentes tipos de disgrafía",
        tipo: "pdf",
        disgrafia: "mixta",
        descargas: 3500
      },
      {
        id: 3,
        titulo: "Organizadores Gráficos para Elemental",
        url: "https://www.orientacionandujar.es/organigramas/",
        descripcion: "Cuadros y esquemas para organizar ideas",
        tipo: "pdf",
        disgrafia: "visuoespacial",
        descargas: 2100
      }
    ],
    juegos: [
      {
        id: 1,
        titulo: "Klavaro Typing",
        url: "https://www.klavaro.org/",
        descripcion: "Tutor interactivo de mecanografía",
        tipo: "juego",
        disgrafia: "motriz",
        plataforma: "Windows, Mac, Linux"
      },
      {
        id: 2,
        titulo: "TypeRacer",
        url: "https://www.typeracer.com/",
        descripcion: "Juego multijugador para mejorar velocidad de escritura",
        tipo: "juego",
        disgrafia: "motriz",
        plataforma: "Web"
      }
    ],
    herramientas: [
      {
        id: 1,
        titulo: "LibreOffice Writer",
        url: "https://www.libreoffice.org/",
        descripcion: "Procesador de textos con corrector ortográfico",
        tipo: "herramienta",
        disgrafia: "linguistica",
        costo: "Gratuito"
      }
    ]
  },

  media: {
    videos: [
      {
        id: 1,
        titulo: "Producción de Textos - Técnicas Básicas",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Metodología para la producción escrita en secundaria",
        tipo: "video",
        disgrafia: "linguistica",
        duracion: "22 min"
      },
      {
        id: 2,
        titulo: "Organizadores Gráficos - Mapas Mentales",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Cómo usar mapas mentales antes de escribir",
        tipo: "video",
        disgrafia: "visuoespacial",
        duracion: "18 min"
      },
      {
        id: 3,
        titulo: "Escritura de Párrafos Coherentes",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Estructura y coherencia en párrafos",
        tipo: "video",
        disgrafia: "linguistica",
        duracion: "20 min"
      }
    ],
    pdfs: [
      {
        id: 1,
        titulo: "Organizadores Gráficos Imprimibles",
        url: "https://www.orientacionandujar.es/organigramas/",
        descripcion: "Más de 50 modelos de organizadores gráficos",
        tipo: "pdf",
        disgrafia: "visuoespacial",
        descargas: 2900
      },
      {
        id: 2,
        titulo: "Guía de Producción Textual - Secundaria",
        url: "https://www.aulapt.org/tag/disgrafia/",
        descripcion: "Manual completo para producción de textos",
        tipo: "pdf",
        disgrafia: "linguistica",
        descargas: 2200
      }
    ],
    juegos: [
      {
        id: 1,
        titulo: "Kahoot",
        url: "https://kahoot.com/",
        descripcion: "Plataforma de juegos educativos interactivos",
        tipo: "juego",
        disgrafia: "linguistica",
        plataforma: "Web"
      },
      {
        id: 2,
        titulo: "Quizlet",
        url: "https://quizlet.com/",
        descripcion: "Aplicación para crear y jugar flashcards",
        tipo: "juego",
        disgrafia: "linguistica",
        plataforma: "Web, App"
      }
    ],
    herramientas: [
      {
        id: 1,
        titulo: "FreeMind",
        url: "http://freemind.sourceforge.net/",
        descripcion: "Creador de mapas mentales gratuito",
        tipo: "herramienta",
        disgrafia: "visuoespacial",
        costo: "Gratuito"
      },
      {
        id: 2,
        titulo: "Google Docs",
        url: "https://docs.google.com/",
        descripcion: "Procesador de textos colaborativo en línea",
        tipo: "herramienta",
        disgrafia: "linguistica",
        costo: "Gratuito"
      }
    ]
  },

  superior: {
    videos: [
      {
        id: 1,
        titulo: "Redacción Académica - Ensayos",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Cómo escribir ensayos académicos correctamente",
        tipo: "video",
        disgrafia: "linguistica",
        duracion: "25 min"
      },
      {
        id: 2,
        titulo: "Investigación y Citas APA",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Normas APA para citar fuentes",
        tipo: "video",
        disgrafia: "linguistica",
        duracion: "20 min"
      },
      {
        id: 3,
        titulo: "Herramientas TIC para Estudiantes",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Tecnologías asistivas para estudiantes con disgrafía",
        tipo: "video",
        disgrafia: "mixta",
        duracion: "18 min"
      }
    ],
    pdfs: [
      {
        id: 1,
        titulo: "Manual de Redacción Académica",
        url: "https://www.aulapt.org/tag/disgrafia/",
        descripcion: "Guía completa de redacción a nivel superior",
        tipo: "pdf",
        disgrafia: "linguistica",
        descargas: 1900
      }
    ],
    juegos: [
      {
        id: 1,
        titulo: "Duolingo",
        url: "https://www.duolingo.com/",
        descripcion: "Aprendizaje de idiomas con gamificación",
        tipo: "juego",
        disgrafia: "linguistica",
        plataforma: "Web, App"
      }
    ],
    herramientas: [
      {
        id: 1,
        titulo: "Zotero",
        url: "https://www.zotero.org/",
        descripcion: "Gestor de referencias bibliográficas",
        tipo: "herramienta",
        disgrafia: "linguistica",
        costo: "Gratuito"
      },
      {
        id: 2,
        titulo: "Hemingway Editor",
        url: "https://www.hemingwayapp.com/",
        descripcion: "Herramienta para mejorar la redacción",
        tipo: "herramienta",
        disgrafia: "linguistica",
        costo: "Gratuito"
      }
    ]
  },

  bachillerato: {
    videos: [
      {
        id: 1,
        titulo: "Escritura de Tesis Universitaria",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Cómo estructurar y escribir una tesis académica",
        tipo: "video",
        disgrafia: "linguistica",
        duracion: "30 min"
      },
      {
        id: 2,
        titulo: "Investigación Científica y Escritura",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Proceso de investigación y documentación",
        tipo: "video",
        disgrafia: "linguistica",
        duracion: "25 min"
      }
    ],
    pdfs: [
      {
        id: 1,
        titulo: "Guía Completa de Investigación Académica",
        url: "https://www.aulapt.org/tag/disgrafia/",
        descripcion: "Manual para investigación universitaria",
        tipo: "pdf",
        disgrafia: "linguistica",
        descargas: 1500
      }
    ],
    herramientas: [
      {
        id: 1,
        titulo: "Mendeley",
        url: "https://www.mendeley.com/",
        descripcion: "Gestor de referencias académicas",
        tipo: "herramienta",
        disgrafia: "linguistica",
        costo: "Freemium"
      },
      {
        id: 2,
        titulo: "Overleaf",
        url: "https://www.overleaf.com/",
        descripcion: "Editor LaTeX colaborativo",
        tipo: "herramienta",
        disgrafia: "linguistica",
        costo: "Gratuito"
      },
      {
        id: 3,
        titulo: "Dragon NaturallySpeaking",
        url: "https://www.nuance.com/dragon.html",
        descripcion: "Dictado por voz avanzado",
        tipo: "herramienta",
        disgrafia: "motriz",
        costo: "De pago"
      }
    ]
  },

  especial: {
    videos: [
      {
        id: 1,
        titulo: "Sistemas AAC - Comunicación Aumentativa",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Introducción a sistemas de comunicación aumentativa",
        tipo: "video",
        disgrafia: "mixta",
        duracion: "20 min"
      },
      {
        id: 2,
        titulo: "Tecnología Asistiva para Discapacidad",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        descripcion: "Herramientas de accesibilidad tecnológica",
        tipo: "video",
        disgrafia: "mixta",
        duracion: "22 min"
      }
    ],
    pdfs: [
      {
        id: 1,
        titulo: "Adaptaciones Significativas - Educación Especial",
        url: "https://www.orientacionandujar.es/?s=disgrafia",
        descripcion: "Guía de adaptaciones para educación especial",
        tipo: "pdf",
        disgrafia: "mixta",
        descargas: 1200
      }
    ],
    herramientas: [
      {
        id: 1,
        titulo: "Proloquo4Text",
        url: "https://www.proloquotec.com/",
        descripcion: "AAC con predicción de palabras",
        tipo: "herramienta",
        disgrafia: "mixta",
        costo: "De pago"
      },
      {
        id: 2,
        titulo: "JABtalk",
        url: "http://www.jabtalk.com/",
        descripcion: "Comunicación aumentativa alternativa",
        tipo: "herramienta",
        disgrafia: "mixta",
        costo: "Freemium"
      },
      {
        id: 3,
        titulo: "PECS",
        url: "https://www.pecsusa.com/",
        descripcion: "Sistema de comunicación por símbolos",
        tipo: "herramienta",
        disgrafia: "mixta",
        costo: "De pago"
      }
    ]
  }
};

// Portales educativos globales
const portalesEducativos = [
  {
    id: 1,
    nombre: "Orientación Andújar",
    url: "https://www.orientacionandujar.es/",
    descripcion: "Recursos educativos gratuitos para orientación, PT y educación especial",
    logo: "🎓",
    tipo: "Portal general"
  },
  {
    id: 2,
    nombre: "Aula PT",
    url: "https://www.aulapt.org/",
    descripcion: "Recursos para apoyo educativo y educación especial",
    logo: "📚",
    tipo: "Portal especial"
  },
  {
    id: 3,
    nombre: "Educación 3.0",
    url: "https://www.educaciontrespuntocero.com/",
    descripcion: "Noticias, recursos y herramientas educativas innovadoras",
    logo: "💻",
    tipo: "Portal general"
  },
  {
    id: 4,
    nombre: "Imágenes Educativas",
    url: "https://imageneseducativas.com/",
    descripcion: "Banco de imágenes y fichas educativas imprimibles",
    logo: "🖼️",
    tipo: "Banco de recursos"
  },
  {
    id: 5,
    nombre: "Twinkl Educación",
    url: "https://www.twinkl.com.es/",
    descripcion: "Plataforma con miles de recursos educativos imprimibles",
    logo: "📄",
    tipo: "Portal premium"
  }
];

// Guías y manuales
const guiasDescargas = [
  {
    id: 1,
    titulo: "Guía Completa de Disgrafía",
    descripcion: "Manual exhaustivo sobre disgrafía: definición, tipos, diagnóstico e intervención",
    url: "https://crea.ujaen.es/bitstreams/3d4bd287-9501-4c33-bd5a-cf7919145087/download",
    tipo: "pdf",
    tamaño: "2.5 MB",
    paginas: 85
  },
  {
    id: 2,
    titulo: "Estrategias de Intervención en Disgrafía",
    descripcion: "Propuestas prácticas y basadas en evidencia para trabajar disgrafía",
    url: "https://www.aulapt.org/tag/disgrafia/",
    tipo: "pdf",
    tamaño: "1.8 MB",
    paginas: 62
  },
  {
    id: 3,
    titulo: "Evaluación y Diagnóstico de Disgrafía",
    descripcion: "Instrumentos y protocolos para evaluar disgrafía",
    url: "https://www.orientacionandujar.es/?s=disgrafia",
    tipo: "pdf",
    tamaño: "1.2 MB",
    paginas: 45
  }
];

// Recomendaciones por tipo
const recomendacionesPorTipo = {
  motriz: {
    titulo: "Disgrafía Motriz",
    descripcion: "Dificultad en el control motor fino de la mano",
    síntomas: [
      "Presión anormal del lápiz",
      "Movimientos lentos e inseguros",
      "Mala postura al escribir",
      "Fatiga rápida"
    ],
    recomendaciones: [
      "Ejercicios de motricidad fina (plastilina, punzones)",
      "Juegos de coordinación ojo-mano",
      "Práctica de caligrafía progresiva",
      "Mecanografía como alternativa",
      "Herramientas adaptadas (lápices gruesos)"
    ],
    herramientasRecomendadas: ["GCompris", "Tux Typing", "MyPaint"],
    recursosPDF: 15,
    recursosVideo: 8
  },
  visuoespacial: {
    titulo: "Disgrafía Visuoespacial",
    descripcion: "Dificultad en la organización del espacio en el papel",
    síntomas: [
      "Escritura desorganizada",
      "Márgenes inconsistentes",
      "Dificultad en alineación",
      "Problemas con el espacio entre letras"
    ],
    recomendaciones: [
      "Uso de pautas y cuadrículas",
      "Organizadores gráficos",
      "Ejercicios de simetría",
      "Mapas mentales",
      "Actividades visuoespaciales"
    ],
    herramientasRecomendadas: ["FreeMind", "OpenOffice Draw", "GCompris"],
    recursosPDF: 12,
    recursosVideo: 6
  },
  linguistica: {
    titulo: "Disgrafía Lingüística",
    descripcion: "Dificultad en la expresión escrita y construcción de textos",
    síntomas: [
      "Dificultad de ortografía",
      "Construcción gramatical incorrecta",
      "Ideas desorganizadas",
      "Dificultad de expresión"
    ],
    recomendaciones: [
      "Producción textual guiada",
      "Modelos de textos",
      "Dictado por voz",
      "Procesadores de texto con corrector",
      "Actividades de expresión escrita"
    ],
    herramientasRecomendadas: ["LibreOffice Writer", "Google Docs", "Hemingway Editor"],
    recursosPDF: 18,
    recursosVideo: 10
  },
  mixta: {
    titulo: "Disgrafía Mixta",
    descripcion: "Combinación de dos o más tipos de disgrafía",
    síntomas: [
      "Síntomas de múltiples tipos",
      "Complejidad en evaluación",
      "Requiere abordaje multidimensional"
    ],
    recomendaciones: [
      "Combinación de estrategias",
      "Evaluación integral",
      "Plan personalizado",
      "Trabajo interdisciplinario",
      "Uso de múltiples herramientas"
    ],
    herramientasRecomendadas: ["LibreOffice", "GCompris", "Google Docs", "Mapas mentales"],
    recursosPDF: 20,
    recursosVideo: 12
  }
};

// Cargar recursos al iniciar
document.addEventListener('DOMContentLoaded', function() {
  cargarTodosLosRecursos();
  mostrarGuias();
  mostrarRecomendaciones();
});

function cargarTodosLosRecursos() {
  cargarVideos();
  cargarPDFs();
  cargarJuegos();
  cargarHerramientas();
  cargarPortales();
  aplicarFiltros();
}

function cargarVideos() {
  let html = '';
  Object.keys(recursosPorNivel).forEach(nivel => {
    recursosPorNivel[nivel].videos.forEach(video => {
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="ratio ratio-16x9">
              <iframe src="${video.url}" title="${video.titulo}" allowfullscreen="" loading="lazy"></iframe>
            </div>
            <div class="card-body">
              <h6 class="card-title">${video.titulo}</h6>
              <p class="small text-muted">${video.descripcion}</p>
              <div class="mt-3">
                <span class="badge bg-info" data-nivel="${nivel}">${nivel}</span>
                <span class="badge bg-warning" data-disgrafia="${video.disgrafia}">${video.disgrafia}</span>
                <span class="badge bg-secondary">${video.duracion}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });
  document.getElementById('contenidoVideos').innerHTML = html;
}

function cargarPDFs() {
  let html = '';
  Object.keys(recursosPorNivel).forEach(nivel => {
    recursosPorNivel[nivel].pdfs.forEach(pdf => {
      html += `
        <div class="col-md-6 col-lg-4">
          <a href="${pdf.url}" target="_blank" class="card h-100 border-0 shadow-sm text-decoration-none" style="color: inherit;">
            <div class="card-body text-center py-5" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <i class="bi bi-file-earmark-pdf" style="font-size: 3rem; margin-bottom: 15px;"></i>
              <h6 class="card-title">${pdf.titulo}</h6>
            </div>
            <div class="card-body">
              <p class="small">${pdf.descripcion}</p>
              <div class="mt-3">
                <span class="badge bg-info" data-nivel="${nivel}">${nivel}</span>
                <span class="badge bg-warning" data-disgrafia="${pdf.disgrafia}">${pdf.disgrafia}</span>
                <span class="badge bg-success"><i class="bi bi-download"></i> ${pdf.descargas}</span>
              </div>
            </div>
          </a>
        </div>
      `;
    });
  });
  document.getElementById('contenidoPDFs').innerHTML = html;
}

function cargarJuegos() {
  let html = '';
  Object.keys(recursosPorNivel).forEach(nivel => {
    recursosPorNivel[nivel].juegos.forEach(juego => {
      html += `
        <div class="col-md-6 col-lg-4">
          <a href="${juego.url}" target="_blank" class="card h-100 border-0 shadow-sm text-decoration-none" style="color: inherit;">
            <div class="card-header bg-warning">
              <h6 class="mb-0"><i class="bi bi-joystick"></i> ${juego.titulo}</h6>
            </div>
            <div class="card-body">
              <p class="small">${juego.descripcion}</p>
              <p class="small text-muted"><strong>Plataforma:</strong> ${juego.plataforma}</p>
              <div class="mt-3">
                <span class="badge bg-info" data-nivel="${nivel}">${nivel}</span>
                <span class="badge bg-primary" data-disgrafia="${juego.disgrafia}">${juego.disgrafia}</span>
              </div>
            </div>
          </a>
        </div>
      `;
    });
  });
  document.getElementById('contenidoJuegos').innerHTML = html;
}

function cargarHerramientas() {
  let html = '';
  Object.keys(recursosPorNivel).forEach(nivel => {
    recursosPorNivel[nivel].herramientas.forEach(herr => {
      html += `
        <div class="col-md-6 col-lg-4">
          <a href="${herr.url}" target="_blank" class="card h-100 border-0 shadow-sm text-decoration-none" style="color: inherit;">
            <div class="card-header bg-info text-white">
              <h6 class="mb-0"><i class="bi bi-laptop"></i> ${herr.titulo}</h6>
            </div>
            <div class="card-body">
              <p class="small">${herr.descripcion}</p>
              <p class="small text-muted"><strong>Costo:</strong> ${herr.costo}</p>
              <div class="mt-3">
                <span class="badge bg-success" data-nivel="${nivel}">${nivel}</span>
                <span class="badge bg-secondary" data-disgrafia="${herr.disgrafia}">${herr.disgrafia}</span>
              </div>
            </div>
          </a>
        </div>
      `;
    });
  });
  document.getElementById('contenidoHerramientas').innerHTML = html;
}

function cargarPortales() {
  let html = '';
  portalesEducativos.forEach(portal => {
    html += `
      <div class="col-md-6 col-lg-4">
        <a href="${portal.url}" target="_blank" class="card h-100 border-0 shadow-sm text-decoration-none" style="color: inherit;">
          <div class="card-body text-center">
            <h3 style="font-size: 3rem; margin-bottom: 15px;">${portal.logo}</h3>
            <h6 class="card-title">${portal.nombre}</h6>
            <p class="small text-muted">${portal.descripcion}</p>
            <span class="badge bg-primary">${portal.tipo}</span>
          </div>
        </a>
      </div>
    `;
  });
  document.getElementById('contenidoPortales').innerHTML = html;
}

function mostrarGuias() {
  let html = '';
  guiasDescargas.forEach(guia => {
    html += `
      <div class="col-md-6 col-lg-4">
        <a href="${guia.url}" target="_blank" class="card h-100 border-0 shadow-sm text-decoration-none" style="color: inherit;">
          <div class="card-body">
            <h6 class="card-title"><i class="bi bi-book"></i> ${guia.titulo}</h6>
            <p class="small text-muted mb-3">${guia.descripcion}</p>
            <div class="small">
              <p class="mb-1"><strong>Tamaño:</strong> ${guia.tamaño}</p>
              <p class="mb-2"><strong>Páginas:</strong> ${guia.paginas}</p>
            </div>
            <button class="btn btn-sm btn-primary w-100">
              <i class="bi bi-download"></i> Descargar
            </button>
          </div>
        </a>
      </div>
    `;
  });
  document.getElementById('contenidoGuias').innerHTML = html;
}

function mostrarRecomendaciones() {
  let html = '';
  Object.keys(recomendacionesPorTipo).forEach(tipo => {
    const rec = recomendacionesPorTipo[tipo];
    const colores = {
      motriz: 'danger',
      visuoespacial: 'warning',
      linguistica: 'info',
      mixta: 'secondary'
    };
    
    html += `
      <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-header bg-${colores[tipo]} text-white">
            <h5 class="mb-0"><i class="bi bi-lightbulb"></i> ${rec.titulo}</h5>
          </div>
          <div class="card-body">
            <p class="text-muted small mb-3">${rec.descripcion}</p>
            
            <h6 class="mt-4 mb-2"><strong>Síntomas principales:</strong></h6>
            <ul class="small mb-3">
              ${rec.síntomas.map(s => `<li>${s}</li>`).join('')}
            </ul>
            
            <h6 class="mb-2"><strong>Recomendaciones:</strong></h6>
            <ul class="small mb-3">
              ${rec.recomendaciones.map(r => `<li>${r}</li>`).join('')}
            </ul>
            
            <h6 class="mb-2"><strong>Herramientas recomendadas:</strong></h6>
            <div class="mb-3">
              ${rec.herramientasRecomendadas.map(h => `<span class="badge bg-${colores[tipo]} me-1">${h}</span>`).join('')}
            </div>
            
            <hr>
            
            <div class="row text-center">
              <div class="col-6">
                <small><strong>${rec.recursosPDF}</strong> PDFs</small>
              </div>
              <div class="col-6">
                <small><strong>${rec.recursosVideo}</strong> Videos</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById('contenidoRecomendaciones').innerHTML = html;
}

function aplicarFiltros() {
  const nivel = document.getElementById('filtroNivel').value;
  const disgrafia = document.getElementById('filtroDisgrafia').value;
  const tipoRecurso = document.querySelector('input[name="filtroTipo"]:checked').value;

  let html = '';

  // Recopilar todos los recursos
  let todosRecursos = [];
  
  Object.keys(recursosPorNivel).forEach(niv => {
    if (!nivel || nivel === niv) {
      ['videos', 'pdfs', 'juegos', 'herramientas'].forEach(tipo => {
        recursosPorNivel[niv][tipo].forEach(recurso => {
          todosRecursos.push({
            ...recurso,
            nivel: niv,
            tipoRecurso: tipo
          });
        });
      });
    }
  });

  // Filtrar por disgrafía
  if (disgrafia) {
    todosRecursos = todosRecursos.filter(r => r.disgrafia === disgrafia || r.disgrafia === 'mixta');
  }

  // Filtrar por tipo de recurso
  if (tipoRecurso === 'video') {
    todosRecursos = todosRecursos.filter(r => r.tipoRecurso === 'videos');
  } else if (tipoRecurso === 'pdf') {
    todosRecursos = todosRecursos.filter(r => r.tipoRecurso === 'pdfs');
  } else if (tipoRecurso === 'juego') {
    todosRecursos = todosRecursos.filter(r => r.tipoRecurso === 'juegos');
  } else if (tipoRecurso === 'herramienta') {
    todosRecursos = todosRecursos.filter(r => r.tipoRecurso === 'herramientas');
  }

  if (todosRecursos.length === 0) {
    html = '<div class="col-12"><div class="alert alert-info">No hay recursos que coincidan con los filtros seleccionados</div></div>';
  } else {
    todosRecursos.forEach(recurso => {
      const icono = {
        videos: '▶️',
        pdfs: '📄',
        juegos: '🎮',
        herramientas: '💻'
      };

      html += `
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 shadow-sm">
            <div class="card-header bg-primary text-white">
              <h6 class="mb-0">${icono[recurso.tipoRecurso]} ${recurso.titulo}</h6>
            </div>
            <div class="card-body">
              <p class="small">${recurso.descripcion}</p>
              <div class="mt-3">
                <span class="badge bg-info">${recurso.nivel}</span>
                <span class="badge bg-warning">${recurso.disgrafia}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  document.getElementById('contenidoRecursos').innerHTML = html ? 
    `<h3 class="mb-4">Recursos filtrados (${todosRecursos.length})</h3><div class="row g-4">${html}</div>` : 
    `<div class="alert alert-info">No hay recursos disponibles</div>`;
}