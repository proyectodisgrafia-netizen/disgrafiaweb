// Base de datos de actividades por nivel
const actividadesPorNivel = {
  inicial: [
    {
      id: 1,
      nombre: "Ejercicios de prensión del lápiz",
      descripcion: "Fortalecimiento de coordinación mano-ojo usando plastilina y pintura",
      tipo: "Motriz",
      duracion: "15 minutos",
      materiales: ["Lápices", "Papel", "Plastilina", "Colores"],
      instrucciones: "Realiza ejercicios con plastilina haciendo bolitas, luego práctica de trazos gruesos",
      criterios: ["Mantiene postura correcta", "Mejora coordinación"],
      recursos: {
        videos: ["https://www.youtube.com/watch?v=mKASUJfentY"],
        pdfs: ["https://www.orientacionandujar.es/?s=disgrafia"],
        herramientas: ["GCompris", "MyPaint"]
      }
    },
    {
      id: 2,
      nombre: "Trazos pre-escritura",
      descripcion: "Líneas rectas, curvas, zigzag para preparar la mano",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Papel pautado", "Lápiz", "Colores"],
      instrucciones: "Seguir caminos marcados en papel, primero con dedo, luego con lápiz",
      criterios: ["Sigue el camino sin salirse", "Mantiene presión adecuada"],
      recursos: {
        videos: ["https://www.youtube.com/@AbrilManosalva/videos"],
        pdfs: ["https://imageneseducativas.com/?s=motricidad+fina"],
        herramientas: ["Papel pautado imprimible"]
      }
    },
    {
      id: 3,
      nombre: "Laberintos sencillos",
      descripcion: "Recorridos visuales y motores para coordinación",
      tipo: "Visuoespacial",
      duracion: "15 minutos",
      materiales: ["Fichas de laberintos", "Lápiz"],
      instrucciones: "Guiar el lápiz desde entrada a salida del laberinto sin tocar las paredes",
      criterios: ["Completa el laberinto", "No sale del camino"],
      recursos: {
        videos: [],
        pdfs: ["https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/"],
        herramientas: ["Plantillas imprimibles"]
      }
    },
    {
      id: 4,
      nombre: "Unir puntos para formar figuras",
      descripcion: "Conexión de puntos para crear formas y figuras",
      tipo: "Visuoespacial",
      duracion: "15 minutos",
      materiales: ["Fichas de puntos", "Lápiz"],
      instrucciones: "Unir puntos numerados para revelar figuras",
      criterios: ["Une puntos en orden", "Forma es reconocible"],
      recursos: {
        videos: [],
        pdfs: ["https://www.aulapt.org/tag/disgrafia/"],
        herramientas: ["Fichas para imprimir"]
      }
    },
    {
      id: 5,
      nombre: "Rasgado y pegado",
      descripcion: "Actividad manipulativa para fortalecer dedos",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Papel de color", "Pegante", "Cartulina"],
      instrucciones: "Rasgar papel con los dedos y pegar en dibujos",
      criterios: ["Rasga papel con precisión", "Pega dentro de límites"],
      recursos: {
        videos: ["https://mundoinicial.com/tecnicas-divertidas-para-desarrollar-la-motricidad-fina-en-ninos-de-preescolar/"],
        pdfs: [],
        herramientas: ["Plantillas de collage"]
      }
    },
    {
      id: 6,
      nombre: "Actividades con punzón",
      descripcion: "Perforación de líneas y formas",
      tipo: "Motriz",
      duracion: "15 minutos",
      materiales: ["Punzón", "Papel grueso", "Tapete de trabajo"],
      instrucciones: "Perforar sobre líneas punteadas siguiendo direcciones",
      criterios: ["Perfora sobre la línea", "Mantiene ritmo"],
      recursos: {
        videos: [],
        pdfs: ["https://www.orientacionandujar.es/?s=disgrafia"],
        herramientas: ["Fichas con líneas punteadas"]
      }
    },
    {
      id: 7,
      nombre: "Pintura con dedos",
      descripcion: "Expresión libre con pinturas no tóxicas",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Pintura para dedos", "Papel", "Trapos"],
      instrucciones: "Crear formas y patrones usando dedos directamente",
      criterios: ["Usa múltiples dedos", "Controla presión"],
      recursos: {
        videos: ["https://www.youtube.com/watch?v=mKASUJfentY"],
        pdfs: [],
        herramientas: ["Pintura segura para niños"]
      }
    },
    {
      id: 8,
      nombre: "Modelado con plastilina",
      descripcion: "Fortalecimiento mediante modelado libre",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Plastilina de colores", "Bandeja de trabajo"],
      instrucciones: "Crear figuras: bolas, serpientes, formas geométricas",
      criterios: ["Forma figuras coherentes", "Usa ambas manos"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Plastilina educativa"]
      }
    },
    {
      id: 9,
      nombre: "Juegos de coordinación ojo-mano",
      descripcion: "Ejercicios lúdicos para sincronización",
      tipo: "Motriz",
      duracion: "15 minutos",
      materiales: ["Objetos variados", "Contenedores"],
      instrucciones: "Lanzar y atrapar objetos, meter en contenedores",
      criterios: ["Atrapa objetos", "Mejora precisión"],
      recursos: {
        videos: ["https://www.youtube.com/results?search_query=grafomotricidad+preescolar"],
        pdfs: [],
        herramientas: ["GCompris - juegos de coordinación"]
      }
    },
    {
      id: 10,
      nombre: "Escritura de nombre con trazos gruesos",
      descripcion: "Introducción a la escritura propia",
      tipo: "Motriz",
      duracion: "15 minutos",
      materiales: ["Papel especial", "Marcadores gruesos"],
      instrucciones: "Repasar y escribir el nombre propio",
      criterios: ["Reconoce su nombre", "Intenta escribir"],
      recursos: {
        videos: [],
        pdfs: ["https://profe.social/posts/92578-cuaderno-disgrafia-infantil-y-primaria-62-actividades"],
        herramientas: ["Papel pautado adaptado"]
      }
    }
  ],

  elemental: [
    {
      id: 1,
      nombre: "Caligrafía progresiva",
      descripcion: "Práctica de letras minúsculas y mayúsculas",
      tipo: "Motriz",
      duracion: "25 minutos",
      materiales: ["Cuaderno de caligrafía", "Lápiz", "Regla"],
      instrucciones: "Repasar letras manteniendo tamaño, forma y espaciado uniformes",
      criterios: ["Letra legible", "Tamaño consistente"],
      recursos: {
        videos: ["https://www.youtube.com/watch?v=mKASUJfentY"],
        pdfs: ["https://eduki.com/es/material/1734698/cuaderno-disgrafia-infantil-y-primaria---62-actividades"],
        herramientas: ["LibreOffice Writer"]
      }
    },
    {
      id: 2,
      nombre: "Copia de palabras y frases",
      descripcion: "Transcripción de textos cortos",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Papel", "Modelo impreso"],
      instrucciones: "Copiar palabras y frases manteniendo formato",
      criterios: ["Copia exactamente", "Ortografía correcta"],
      recursos: {
        videos: [],
        pdfs: ["https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/"],
        herramientas: ["Papel pautado"]
      }
    },
    {
      id: 3,
      nombre: "Ejercicios de simetría",
      descripcion: "Completar figuras simétricas",
      tipo: "Visuoespacial",
      duracion: "15 minutos",
      materiales: ["Fichas de simetría"],
      instrucciones: "Dibujar la mitad faltante de figuras",
      criterios: ["La mitad es simétrica", "Líneas precisas"],
      recursos: {
        videos: [],
        pdfs: ["https://www.orientacionandujar.es/organigramas/"],
        herramientas: ["Plantillas"]
      }
    },
    {
      id: 4,
      nombre: "Dictado con adaptaciones",
      descripcion: "Dictado progresivo con apoyos",
      tipo: "Lingüística",
      duracion: "20 minutos",
      materiales: ["Papel", "Lápiz"],
      instrucciones: "Escribir palabras o frases dictadas con pausas",
      criterios: ["Escribe correctamente", "Ortografía adecuada"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Lista de palabras"]
      }
    },
    {
      id: 5,
      nombre: "Escritura de oraciones simples",
      descripcion: "Redacción de oraciones con estructura básica",
      tipo: "Lingüística",
      duracion: "25 minutos",
      materiales: ["Papel", "Lápiz"],
      instrucciones: "Escribir oraciones usando modelo: Sujeto + Verbo + Complemento",
      criterios: ["Estructura correcta", "Sentido completo"],
      recursos: {
        videos: [],
        pdfs: ["https://www.aulapt.org/tag/disgrafia/"],
        herramientas: ["Plantillas de oraciones"]
      }
    },
    {
      id: 6,
      nombre: "Organización espacial con cuadriculado",
      descripcion: "Escritura en papel cuadriculado",
      tipo: "Visuoespacial",
      duracion: "15 minutos",
      materiales: ["Papel cuadriculado"],
      instrucciones: "Escribir letras dentro de cuadrículas",
      criterios: ["Respeta cuadrículas", "Espaciado uniforme"],
      recursos: {
        videos: [],
        pdfs: ["https://imageneseducativas.com/?s=motricidad+fina"],
        herramientas: ["Papel cuadriculado"]
      }
    },
    {
      id: 7,
      nombre: "Ejercicios de postura y prensión",
      descripcion: "Corrección de postura al escribir",
      tipo: "Motriz",
      duracion: "10 minutos",
      materiales: ["Escritorio", "Silla"],
      instrucciones: "Revisar y corregir: posición del cuerpo, inclinación del papel, agarre del lápiz",
      criterios: ["Postura correcta", "Agarre adecuado"],
      recursos: {
        videos: ["https://www.youtube.com/watch?v=mKASUJfentY"],
        pdfs: ["https://www.orientacionandujar.es/?s=disgrafia"],
        herramientas: []
      }
    },
    {
      id: 8,
      nombre: "Escritura creativa guiada",
      descripcion: "Redacción con pistas e imágenes",
      tipo: "Lingüística",
      duracion: "30 minutos",
      materiales: ["Imágenes", "Papel"],
      instrucciones: "Escribir historia basada en imágenes proporcionadas",
      criterios: ["Relata la imagen", "Ideas coherentes"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Banco de imágenes"]
      }
    },
    {
      id: 9,
      nombre: "Corrección de errores propios",
      descripcion: "Identificación y corrección de fallos",
      tipo: "Lingüística",
      duracion: "20 minutos",
      materiales: ["Texto con errores"],
      instrucciones: "Revisar texto propio e identificar errores de ortografía y puntuación",
      criterios: ["Identifica errores", "Corrige adecuadamente"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["LibreOffice Writer corrector"]
      }
    },
    {
      id: 10,
      nombre: "Uso de organizadores gráficos simples",
      descripcion: "Mapas conceptuales básicos",
      tipo: "Visuoespacial",
      duracion: "20 minutos",
      materiales: ["Plantilla de mapa"],
      instrucciones: "Organizar ideas en mapa conceptual simple",
      criterios: ["Estructura clara", "Ideas ordenadas"],
      recursos: {
        videos: [],
        pdfs: ["https://www.orientacionandujar.es/organigramas/"],
        herramientas: ["Plantillas imprimibles"]
      }
    }
  ],

  media: [
    {
      id: 1,
      nombre: "Producción de párrafos coherentes",
      descripcion: "Escritura de párrafos bien estructurados",
      tipo: "Lingüística",
      duracion: "30 minutos",
      materiales: ["Papel", "Lápiz"],
      instrucciones: "Escribir párrafo con tema, ideas de desarrollo y conclusión",
      criterios: ["Tema claro", "Ideas relacionadas", "Conclusión"],
      recursos: {
        videos: [],
        pdfs: ["https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/"],
        herramientas: ["Plantilla de párrafo"]
      }
    },
    {
      id: 2,
      nombre: "Organizadores gráficos avanzados",
      descripcion: "Mapas mentales, cuadros sinópticos",
      tipo: "Visuoespacial",
      duracion: "30 minutos",
      materiales: ["Papel grande", "Marcadores"],
      instrucciones: "Crear organizador gráfico para tema específico",
      criterios: ["Jerarquía clara", "Conexiones visibles"],
      recursos: {
        videos: [],
        pdfs: ["https://www.orientacionandujar.es/organigramas/"],
        herramientas: ["Software: FreeMind"]
      }
    },
    {
      id: 3,
      nombre: "Escritura de tipos de texto",
      descripcion: "Narrativo, descriptivo, instructivo",
      tipo: "Lingüística",
      duracion: "40 minutos",
      materiales: ["Modelos de texto"],
      instrucciones: "Escribir texto según tipo especificado",
      criterios: ["Estructura adecuada", "Características del tipo"],
      recursos: {
        videos: [],
        pdfs: ["https://www.aulapt.org/tag/disgrafia/"],
        herramientas: ["LibreOffice"]
      }
    },
    {
      id: 4,
      nombre: "Corrección y autoevaluación",
      descripcion: "Revisión crítica de texto propio",
      tipo: "Lingüística",
      duracion: "25 minutos",
      materiales: ["Lista de cotejo"],
      instrucciones: "Revisar usando checklist: ortografía, puntuación, claridad",
      criterios: ["Identifica todos los errores", "Correcciones adecuadas"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Lista de cotejo imprimible"]
      }
    },
    {
      id: 5,
      nombre: "Dictado con texto complejo",
      descripcion: "Dictado de párrafos",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Papel"],
      instrucciones: "Escribir párrafo completo dictado con pausas",
      criterios: ["Transcripción exacta", "Ortografía"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 6,
      nombre: "Escritura basada en imágenes",
      descripcion: "Descripción e interpretación visual",
      tipo: "Lingüística",
      duracion: "30 minutos",
      materiales: ["Imágenes variadas"],
      instrucciones: "Describir imagen con detalles y sentimientos",
      criterios: ["Detalle", "Vocabulario", "Expresión"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Banco de imágenes"]
      }
    },
    {
      id: 7,
      nombre: "Elaboración de esquemas conceptuales",
      descripcion: "Representación visual de conceptos",
      tipo: "Visuoespacial",
      duracion: "40 minutos",
      materiales: ["Papel", "Colores"],
      instrucciones: "Crear esquema de tema con categorías y subcategorías",
      criterios: ["Jerarquía clara", "Completo"],
      recursos: {
        videos: [],
        pdfs: ["https://imageneseducativas.com/?s=motricidad+fina"],
        herramientas: ["Plantillas"]
      }
    },
    {
      id: 8,
      nombre: "Redacción de resúmenes",
      descripcion: "Síntesis de textos",
      tipo: "Lingüística",
      duracion: "30 minutos",
      materiales: ["Texto fuente"],
      instrucciones: "Leer y resumir en máximo 10 líneas",
      criterios: ["Incluye ideas principales", "Respeta límite"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 9,
      nombre: "Escritura colaborativa",
      descripcion: "Trabajo en parejas en textos",
      tipo: "Lingüística",
      duracion: "40 minutos",
      materiales: ["Papel", "Tema"],
      instrucciones: "Escribir historia conjunta tomando turnos",
      criterios: ["Coherencia", "Cooperación"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 10,
      nombre: "Uso de herramientas TIC para escritura",
      descripcion: "Escritura en computadora",
      tipo: "Motriz",
      duracion: "30 minutos",
      materiales: ["Computadora", "Software"],
      instrucciones: "Escribir texto usando LibreOffice Writer",
      criterios: ["Domina teclado", "Usa herramientas"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["LibreOffice Writer", "Tux Typing"]
      }
    }
  ],

  superior: [
    {
      id: 1,
      nombre: "Producción de textos argumentativos",
      descripcion: "Escritura de argumentos con evidencia",
      tipo: "Lingüística",
      duracion: "45 minutos",
      materiales: ["Tema", "Fuentes"],
      instrucciones: "Escribir argumento con tesis, tres argumentos y conclusión",
      criterios: ["Tesis clara", "Argumentos válidos", "Conclusión sólida"],
      recursos: {
        videos: [],
        pdfs: ["https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/"],
        herramientas: ["LibreOffice"]
      }
    },
    {
      id: 2,
      nombre: "Análisis y síntesis de información",
      descripcion: "Comparación y síntesis de textos",
      tipo: "Lingüística",
      duracion: "50 minutos",
      materiales: ["Textos múltiples"],
      instrucciones: "Analizar y sintetizar información de múltiples fuentes",
      criterios: ["Comprensión profunda", "Síntesis clara"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 3,
      nombre: "Escritura académica",
      descripcion: "Estructura formal de trabajos",
      tipo: "Lingüística",
      duracion: "60 minutos",
      materiales: ["Guía de formato"],
      instrucciones: "Escribir trabajo con introducción, desarrollo, conclusión",
      criterios: ["Estructura formal", "Citas correctas"],
      recursos: {
        videos: [],
        pdfs: ["https://www.aulapt.org/tag/disgrafia/"],
        herramientas: ["Plantilla APA"]
      }
    },
    {
      id: 4,
      nombre: "Ensayos cortos",
      descripcion: "Composición de 2-3 páginas",
      tipo: "Lingüística",
      duracion: "90 minutos",
      materiales: ["Tema asignado"],
      instrucciones: "Escribir ensayo coherente sobre tema específico",
      criterios: ["Coherencia", "Profundidad", "Extensión"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Plantilla de ensayo"]
      }
    },
    {
      id: 5,
      nombre: "Uso avanzado de organizadores gráficos",
      descripcion: "Diagramas complejos y esquemas",
      tipo: "Visuoespacial",
      duracion: "45 minutos",
      materiales: ["Software"]  ,
      instrucciones: "Crear diagrama complejo de proceso o concepto",
      criterios: ["Precisión", "Claridad visual"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Lucidchart", "FreeMind"]
      }
    },
    {
      id: 6,
      nombre: "Citación y referencias",
      descripcion: "Aplicación de normas APA/Chicago",
      tipo: "Lingüística",
      duracion: "30 minutos",
      materiales: ["Guía de citas"],
      instrucciones: "Citar fuentes según formato especificado",
      criterios: ["Citas correctas", "Bibliografía completa"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Generador de citas"]
      }
    },
    {
      id: 7,
      nombre: "Revisión crítica de textos",
      descripcion: "Análisis crítico de escritura",
      tipo: "Lingüística",
      duracion: "40 minutos",
      materiales: ["Texto a revisar"],
      instrucciones: "Revisar críticamente: lógica, coherencia, efectividad",
      criterios: ["Análisis profundo", "Sugerencias válidas"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 8,
      nombre: "Escritura colaborativa en línea",
      descripcion: "Trabajo conjunto en documentos digitales",
      tipo: "Lingüística",
      duracion: "45 minutos",
      materiales: ["Plataforma colaborativa"],
      instrucciones: "Escribir documento conjuntamente en tiempo real",
      criterios: ["Coherencia", "Participación"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Google Docs", "Etherpad"]
      }
    },
    {
      id: 9,
      nombre: "Elaboración de informes",
      descripcion: "Redacción de reportes técnicos",
      tipo: "Lingüística",
      duracion: "60 minutos",
      materiales: ["Datos para reportar"],
      instrucciones: "Escribir informe con datos, análisis y conclusiones",
      criterios: ["Datos presentados", "Análisis válido"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["LibreOffice"]
      }
    },
    {
      id: 10,
      nombre: "Textos de opinión",
      descripcion: "Editoriales y comentarios",
      tipo: "Lingüística",
      duracion: "40 minutos",
      materiales: ["Tema de opinión"],
      instrucciones: "Escribir texto de opinión con posición clara",
      criterios: ["Posición clara", "Argumentos válidos"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    }
  ],

  bachillerato: [
    {
      id: 1,
      nombre: "Ensayos académicos completos",
      descripcion: "Composiciones extensas y complejas",
      tipo: "Lingüística",
      duracion: "120 minutos",
      materiales: ["Tema"],
      instrucciones: "Escribir ensayo formal de 5-7 páginas",
      criterios: ["Profundidad", "Argumentación", "Estructura"],
      recursos: {
        videos: [],
        pdfs: ["https://www.educaciontrespuntocero.com/recursos/disgrafia-actividades-recursos/"],
        herramientas: ["Plantilla ensayo universitario"]
      }
    },
    {
      id: 2,
      nombre: "Investigación y producción textual",
      descripcion: "Trabajos de investigación",
      tipo: "Lingüística",
      duracion: "180 minutos",
      materiales: ["Tema de investigación"],
      instrucciones: "Investigar, analizar y escribir reporte completo",
      criterios: ["Investigación rigurosa", "Análisis profundo"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Gestores bibliográficos"]
      }
    },
    {
      id: 3,
      nombre: "Escritura científica",
      descripcion: "Artículos y reportes científicos",
      tipo: "Lingüística",
      duracion: "120 minutos",
      materiales: ["Datos científicos"],
      instrucciones: "Escribir reporte científico con metodología",
      criterios: ["Método científico", "Precisión"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["LibreOffice"]
      }
    },
    {
      id: 4,
      nombre: "Producción de artículos",
      descripcion: "Artículos para publicación",
      tipo: "Lingüística",
      duracion: "120 minutos",
      materiales: ["Tema especificado"],
      instrucciones: "Escribir artículo listo para publicar",
      criterios: ["Publicable", "Impacto"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 5,
      nombre: "Análisis crítico y redacción",
      descripcion: "Crítica literaria y de contenido",
      tipo: "Lingüística",
      duracion: "90 minutos",
      materiales: ["Obra a criticar"],
      instrucciones: "Escribir análisis crítico de obra",
      criterios: ["Análisis profundo", "Juicio crítico"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 6,
      nombre: "Textos especializados por área",
      descripcion: "Escritura específica de disciplina",
      tipo: "Lingüística",
      duracion: "90 minutos",
      materiales: ["Tema del área"],
      instrucciones: "Escribir texto especializado según disciplina",
      criterios: ["Vocabulario técnico", "Precisión"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 7,
      nombre: "Tesis y trabajos extensos",
      descripcion: "Proyectos de investigación mayores",
      tipo: "Lingüística",
      duracion: "300 minutos",
      materiales: ["Tema de tesis"],
      instrucciones: "Desarrollar proyecto de investigación completo",
      criterios: ["Rigor académico", "Extensión"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Plantilla de tesis"]
      }
    },
    {
      id: 8,
      nombre: "Presentaciones multimodales",
      descripcion: "Textos acompañados de multimedia",
      tipo: "Lingüística",
      duracion: "120 minutos",
      materiales: ["Software de presentación"],
      instrucciones: "Crear presentación con texto e imágenes",
      criterios: ["Integración multimedia", "Claridad"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["PowerPoint", "LibreOffice Impress"]
      }
    },
    {
      id: 9,
      nombre: "Escritura profesional",
      descripcion: "Documentos para contexto laboral",
      tipo: "Lingüística",
      duracion: "60 minutos",
      materiales: ["Contexto profesional"],
      instrucciones: "Escribir documento profesional (carta, memo, etc)",
      criterios: ["Registro formal", "Claridad"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 10,
      nombre: "Uso avanzado de tecnología asistiva",
      descripcion: "Herramientas de transcripción y síntesis",
      tipo: "Motriz",
      duracion: "60 minutos",
      materiales: ["Software asistivo"],
      instrucciones: "Usar dictado por voz y otras herramientas",
      criterios: ["Dominio de herramientas", "Productividad"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Dasher", "Dragon NaturallySpeaking"]
      }
    }
  ],

  especial: [
    {
      id: 1,
      nombre: "Comunicación con símbolos",
      descripcion: "Comunicación alternativa visual",
      tipo: "Motriz",
      duracion: "30 minutos",
      materiales: ["Tablero de símbolos"],
      instrucciones: "Usar tablero de símbolos para comunicarse",
      criterios: ["Comprende símbolos", "Se comunica"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["PECS", "Boardmaker"]
      }
    },
    {
      id: 2,
      nombre: "Escritura con ayuda técnica",
      descripcion: "Uso de teclados adaptados",
      tipo: "Motriz",
      duracion: "25 minutos",
      materiales: ["Teclado adaptado"],
      instrucciones: "Escribir usando teclado con teclas grandes",
      criterios: ["Produce texto", "Independencia"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Teclados accesibles"]
      }
    },
    {
      id: 3,
      nombre: "Ejercicios de coordinación severa",
      descripcion: "Ejercicios para discapacidad motora",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Materiales adaptados"],
      instrucciones: "Realizar ejercicios según capacidad motora",
      criterios: ["Mejora independencia", "Participación"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 4,
      nombre: "Sistemas aumentativos y alternativos",
      descripcion: "AAC (Augmentative Alternative Communication)",
      tipo: "Lingüística",
      duracion: "40 minutos",
      materiales: ["Dispositivo AAC"],
      instrucciones: "Usar dispositivo AAC para comunicarse",
      criterios: ["Usa sistema", "Se comunica efectivamente"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Proloquo4Text", "JABtalk"]
      }
    },
    {
      id: 5,
      nombre: "Adaptación de material curricular",
      descripcion: "Tareas modificadas según capacidad",
      tipo: "Lingüística",
      duracion: "Variable",
      materiales: ["Material adaptado"],
      instrucciones: "Trabajar con material adaptado al nivel",
      criterios: ["Accesible", "Desafiante apropiadamente"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 6,
      nombre: "Uso de tableros de comunicación",
      descripcion: "Comunicación visual estructurada",
      tipo: "Motriz",
      duracion: "20 minutos",
      materiales: ["Tableros visuales"],
      instrucciones: "Señalar o seleccionar elementos del tablero",
      criterios: ["Comprende tablero", "Comunica necesidades"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Tableros personalizados"]
      }
    },
    {
      id: 7,
      nombre: "Escritura con software especializado",
      descripcion: "Software asistivo especializado",
      tipo: "Motriz",
      duracion: "30 minutos",
      materiales: ["Software"]  ,
      instrucciones: "Usar software con predicción y símbolos",
      criterios: ["Produce contenido", "Usa herramientas"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["WordQ", "CoughDrop"]
      }
    },
    {
      id: 8,
      nombre: "Evaluación cualitativa",
      descripcion: "Evaluación basada en observación",
      tipo: "Lingüística",
      duracion: "Continua",
      materiales: ["Rúbricas cualitativas"],
      instrucciones: "Evaluar progreso sin pruebas tradicionales",
      criterios: ["Progreso observable", "Participación"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Rúbricas adaptadas"]
      }
    },
    {
      id: 9,
      nombre: "Actividades de expresión no verbal",
      descripcion: "Arte, música, movimiento",
      tipo: "Motriz",
      duracion: "40 minutos",
      materiales: ["Materiales variados"],
      instrucciones: "Expresar ideas mediante arte o movimiento",
      criterios: ["Participación", "Expresión"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: []
      }
    },
    {
      id: 10,
      nombre: "Integración con tecnología asistiva",
      descripcion: "Coordinación de múltiples herramientas",
      tipo: "Motriz",
      duracion: "45 minutos",
      materiales: ["Múltiples dispositivos"],
      instrucciones: "Usar integración de herramientas asistivas",
      criterios: ["Domina múltiples herramientas", "Productivo"],
      recursos: {
        videos: [],
        pdfs: [],
        herramientas: ["Integración de sistemas"]
      }
    }
  ]
};

// Función para cargar actividades por nivel
function cargarActividades() {
  const nivel = document.getElementById('nivelSelect').value;
  if (!nivel) {
    document.getElementById('actividadesList').innerHTML = '<p class="text-muted text-center">Selecciona un nivel para ver actividades</p>';
    return;
  }
  filtrarActividades();
}

// Función para filtrar actividades
function filtrarActividades() {
  const nivel = document.getElementById('nivelSelect').value;
  const tipo = document.getElementById('tipoDisgrafiaSelect').value;
  
  if (!nivel) return;

  let actividades = actividadesPorNivel[nivel];
  
  if (tipo) {
    actividades = actividades.filter(a => a.tipo === tipo);
  }

  let html = '';
  actividades.forEach(actividad => {
    html += `
      <div class="actividad-item" draggable="true" ondragstart="dragStart(event)" data-id="${actividad.id}" data-nivel="${nivel}">
        <div>
          <strong>${actividad.nombre}</strong>
          <div class="small text-muted mt-1">${actividad.descripcion}</div>
          <div class="mt-2">
            <span class="badge bg-primary">${actividad.tipo}</span>
            <span class="badge bg-secondary">${actividad.duracion}</span>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById('actividadesList').innerHTML = html;
}

// Exportar función para uso en otros archivos
function obtenerActividadesNivel(nivel) {
  return actividadesPorNivel[nivel] || [];
}

function obtenerActividadPorId(nivel, id) {
  const actividades = obtenerActividadesNivel(nivel);
  return actividades.find(a => a.id == id);
}