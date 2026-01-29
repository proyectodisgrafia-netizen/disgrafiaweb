/* =====================================================
   UTILIDAD SEGURA PARA OBTENER ELEMENTOS
===================================================== */
function $(id) {
  return document.getElementById(id);
}



/* =====================================================
   MOSTRAR / OCULTAR CONSTRUCTOR (DOCENTES)
===================================================== */
function mostrarConstructor() {
  const contenedor = $("constructorGuia");
  if (!contenedor) return;

  contenedor.classList.toggle("d-none");

  // Scroll suave al constructor cuando aparece
  if (!contenedor.classList.contains("d-none")) {
    contenedor.scrollIntoView({ behavior: "smooth" });
  }
}

/* =====================================================
   DRAG & DROP AVANZADO (TODAS LAS GUÍAS)
===================================================== */

// Iniciar arrastre
document.addEventListener("dragstart", function (e) {
  const el = e.target;

  // Bloques didácticos completos (docentes)
  if (el.classList.contains("bloque")) {
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify(el.dataset)
    );
    e.dataTransfer.effectAllowed = "copy";
  }

  // Textos simples (estudiantes)
  if (el.classList.contains("draggable") && !el.classList.contains("bloque")) {
    e.dataTransfer.setData("text/plain", el.innerText);
    e.dataTransfer.effectAllowed = "move";
  }
});

// Permitir soltar
document.addEventListener("dragover", function (e) {
  if (e.target.classList.contains("zona-drop")) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }
});

// Soltar elementos
document.addEventListener("drop", function (e) {
  if (!e.target.classList.contains("zona-drop")) return;

  e.preventDefault();

  // Caso 1: bloques didácticos (docentes)
  const jsonData = e.dataTransfer.getData("application/json");
  if (jsonData) {
    const data = JSON.parse(jsonData);

    const bloque = document.createElement("div");
    bloque.className = "item-guia";
    bloque.innerHTML = `
      <strong>${data.titulo}</strong><br>
      <em>¿Qué se va a hacer?</em> ${data.que}<br>
      <em>¿Cómo se va a hacer?</em> ${data.como}<br>
      <em>Recursos:</em> ${data.recursos}<br>
      <em>Competencias:</em> ${data.competencias}<br>
      <em>¿Qué se va a evaluar?</em> ${data.evaluacion}<br>
      <em>Técnica / instrumento:</em> ${data.tecnica}
    `;
    e.target.appendChild(bloque);
    return;
  }

  // Caso 2: texto simple (juegos estudiantes)
  const texto = e.dataTransfer.getData("text/plain");
  if (texto) {
    const item = document.createElement("div");
    item.className = "item-guia";
    item.innerText = texto;
    e.target.appendChild(item);
  }
});

/* =====================================================
   GENERAR GUÍA DIDÁCTICA FORMAL (DOCENTES)
===================================================== */
function generarGuia() {
  const salida = $("resultadoGuia");
  const zona = $("zonaGuia");
  if (!salida || !zona) return;

  const items = zona.querySelectorAll(".item-guia");
  let contenido = "";

  if (items.length === 0) {
    contenido = "<em>No se seleccionaron actividades o recursos.</em>";
  } else {
    contenido = "<ul>";
    items.forEach(item => {
      contenido += `<li>${item.innerHTML}</li>`;
    });
    contenido += "</ul>";
  }

  salida.innerHTML = `
    <h3 class="mb-4">📘 Guía Didáctica Generada</h3>

    <table class="table table-bordered">
      <tr>
        <th>Curso</th><td>${$("curso")?.value || ""}</td>
        <th>Área</th><td>${$("area")?.value || ""}</td>
      </tr>
      <tr>
        <th>Jornada</th><td>${$("jornada")?.value || ""}</td>
        <th>Total de horas</th><td>${$("horas")?.value || ""}</td>
      </tr>
      <tr>
        <th>Duración</th><td colspan="3">${$("duracion")?.value || ""}</td>
      </tr>
    </table>

    <table class="table table-bordered">
      <tr>
        <th>Desarrollo de la guía</th>
        <td>${contenido}</td>
      </tr>
    </table>
  `;

  salida.scrollIntoView({ behavior: "smooth" });
}

/* =====================================================
   EXPORTAR GUÍA A PDF (DOCENTES)
===================================================== */
function descargarPDF() {
  const contenido = document.getElementById("resultadoGuia");
  if (!contenido) return;

  html2canvas(contenido, {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("guia_didactica_2_bachillerato.pdf");
  });
}




function mostrarMasTecnicas() {
  const ocultas = document.getElementById("tecnicasOcultas");
  const btn = document.getElementById("btnMostrarMas");

  ocultas.classList.remove("d-none");
  btn.style.display = "none";

  ocultas.scrollIntoView({ behavior: "smooth" });
}


/*********************************************************
 * BASE DE DATOS DE TÉCNICAS (15)
 *********************************************************/
const tecnicas = {

  1: {
    nombre: "Instrucción multimodal",
    descripcion: "Uso combinado de recursos visuales, auditivos y digitales para facilitar la escritura.",
    recursos: [
      {
        titulo: "Canva Educativo",
        tipo: "Herramienta",
        descripcion: "Diseño de esquemas visuales, organizadores y presentaciones.",
        enlace: "https://www.canva.com/education/",
        ejemploRecurso: {
          docente: "Crea organizadores visuales para planificar textos.",
          estudiante: "Organiza ideas antes de escribir.",
          evaluacion: "Claridad y coherencia del esquema."
        }
      },
      {
        titulo: "Canva en educación – Tutorial",
        tipo: "Video",
        descripcion: "Cómo usar Canva paso a paso en el aula.",
        enlace: "https://www.youtube.com/watch?v=6R3xkK2Z3cA",
        ejemploRecurso: {
          docente: "Explica el uso básico de Canva.",
          estudiante: "Diseña su organizador gráfico.",
          evaluacion: "Uso correcto de la herramienta."
        }
      },
      {
        titulo: "Guía de estrategias para estudiantes con disgrafía",
        tipo: "PDF",
        descripcion: "Orientaciones prácticas en español.",
        enlace: "https://disfam.org/wp-content/uploads/2023/06/Disgrafia-15-actividades-para-el-aula-y-casa-1.pdf",
        ejemploRecurso: {
          docente: "Selecciona actividades multimodales.",
          estudiante: "Aplica estrategias propuestas.",
          evaluacion: "Participación y progreso."
        }
      }
    ]
  },

    2: {
    nombre: "Dictado por voz",
    descripcion: "Uso de voz a texto para reducir la carga motriz de la escritura.",
    recursos: [
      {
        titulo: "Google Docs – Dictado por voz",
        tipo: "Herramienta",
        descripcion: "Función de voz a texto integrada.",
        enlace: "https://docs.google.com",
        ejemploRecurso: {
          docente: "Activa la función y modela su uso.",
          estudiante: "Dicta su texto en lugar de escribirlo.",
          evaluacion: "Coherencia del texto generado."
        }
      },
      {
        titulo: "Cómo usar dictado por voz en Google Docs",
        tipo: "Video",
        descripcion: "Tutorial completo en español.",
        enlace: "https://www.youtube.com/watch?v=0f8nA3qW6nI",
        ejemploRecurso: {
          docente: "Explica comandos básicos.",
          estudiante: "Corrige su texto con voz.",
          evaluacion: "Uso funcional de la herramienta."
        }
      },
      {
        titulo: "Guía de accesibilidad en Google Docs",
        tipo: "PDF",
        descripcion: "Funciones accesibles para estudiantes.",
        enlace: "https://support.google.com/docs/answer/4492226?hl=es",
        ejemploRecurso: {
          docente: "Explica opciones de accesibilidad.",
          estudiante: "Configura el entorno.",
          evaluacion: "Autonomía digital."
        }
      }
    ]
  },
    3: {
    nombre: "Escritura guiada por fases",
    descripcion: "Planificación, redacción y revisión con apoyo digital.",
    recursos: [
      {
        titulo: "Google Docs – Comentarios y sugerencias",
        tipo: "Herramienta",
        descripcion: "Retroalimentación en tiempo real.",
        enlace: "https://docs.google.com",
        ejemploRecurso: {
          docente: "Deja comentarios por fase.",
          estudiante: "Corrige por etapas.",
          evaluacion: "Mejora progresiva."
        }
      },
      {
        titulo: "Cómo usar comentarios en Google Docs",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=Zp7rJ5n9y2E",
        ejemploRecurso: {
          docente: "Explica el sistema de revisión.",
          estudiante: "Aplica correcciones.",
          evaluacion: "Proceso de escritura."
        }
      },
      {
        titulo: "Cuadernillo de escritura guiada",
        tipo: "PDF",
        descripcion: "Ejercicios secuenciados.",
        enlace: "https://blogsaverroes.juntadeandalucia.es/rafasclassroom/files/2024/02/CUADERNILLO-DISGRAF%C3%8DA.pdf",
        ejemploRecurso: {
          docente: "Trabaja una fase por sesión.",
          estudiante: "Completa actividades.",
          evaluacion: "Organización textual."
        }
      }
    ]
  },
    4: {
    nombre: "Uso de plantillas de escritura",
    descripcion: "Uso de estructuras digitales para facilitar la redacción.",
    recursos: [
      {
        titulo: "Plantillas en Google Docs",
        tipo: "Herramienta",
        descripcion: "Plantillas prediseñadas para textos.",
        enlace: "https://docs.google.com/templates",
        ejemploRecurso: {
          docente: "Entrega plantilla digital.",
          estudiante: "Completa cada sección.",
          evaluacion: "Estructura del texto."
        }
      },
      {
        titulo: "Cómo usar plantillas en Google Docs",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=Gq5k8xZB7pE",
        ejemploRecurso: {
          docente: "Explica el uso.",
          estudiante: "Edita la plantilla.",
          evaluacion: "Uso adecuado."
        }
      },
      {
        titulo: "Guía de escritura estructurada",
        tipo: "PDF",
        descripcion: "Apoyo didáctico en español.",
        enlace: "https://www.educacionyfp.gob.es/dam/jcr:guia_escritura.pdf",
        ejemploRecurso: {
          docente: "Refuerza la estructura.",
          estudiante: "Organiza ideas.",
          evaluacion: "Coherencia."
        }
      }
    ]
  },

  5: {
    nombre: "Organizadores gráficos digitales",
    descripcion: "Uso de herramientas visuales para organizar ideas.",
    recursos: [
      {
        titulo: "Coggle",
        tipo: "Herramienta",
        descripcion: "Mapas mentales en línea.",
        enlace: "https://coggle.it/",
        ejemploRecurso: {
          docente: "Crea mapa modelo.",
          estudiante: "Organiza ideas.",
          evaluacion: "Jerarquía."
        }
      },
      {
        titulo: "Cómo usar Coggle",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=fxU2B2y0A1Y",
        ejemploRecurso: {
          docente: "Explica funciones.",
          estudiante: "Crea su mapa.",
          evaluacion: "Orden lógico."
        }
      },
      {
        titulo: "Organizadores gráficos – PDF",
        tipo: "PDF",
        descripcion: "Ejemplos imprimibles.",
        enlace: "https://disfam.org/wp-content/uploads/2023/06/Disgrafia-15-actividades-para-el-aula-y-casa-1.pdf",
        ejemploRecurso: {
          docente: "Selecciona organizador.",
          estudiante: "Aplica esquema.",
          evaluacion: "Claridad."
        }
      }
    ]
  },

  6: {
    nombre: "Reducción de copia mediante recursos digitales",
    descripcion: "Evitar copia extensa usando materiales digitales.",
    recursos: [
      {
        titulo: "Google Classroom",
        tipo: "Herramienta",
        descripcion: "Entrega de materiales digitales.",
        enlace: "https://classroom.google.com/",
        ejemploRecurso: {
          docente: "Publica materiales.",
          estudiante: "Consulta sin copiar.",
          evaluacion: "Comprensión."
        }
      },
      {
        titulo: "Uso básico de Classroom",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=M9o4P8F9E2g",
        ejemploRecurso: {
          docente: "Explica la plataforma.",
          estudiante: "Accede al material.",
          evaluacion: "Participación."
        }
      },
      {
        titulo: "Ajustes razonables para disgrafía",
        tipo: "PDF",
        descripcion: "Adaptaciones educativas.",
        enlace: "https://www.speldnsw.org.au/wp-content/uploads/2022/07/Adjustments-for-Dysgraphia-.pdf",
        ejemploRecurso: {
          docente: "Aplica adaptaciones.",
          estudiante: "Responde oralmente.",
          evaluacion: "Proceso."
        }
      }
    ]
  },

  7: {
    nombre: "Tiempo ampliado con apoyo digital",
    descripcion: "Flexibilidad temporal apoyada con plataformas.",
    recursos: [
      {
        titulo: "Google Forms",
        tipo: "Herramienta",
        descripcion: "Evaluaciones con tiempo flexible.",
        enlace: "https://forms.google.com/",
        ejemploRecurso: {
          docente: "Configura sin límite.",
          estudiante: "Responde a su ritmo.",
          evaluacion: "Logro de objetivos."
        }
      },
      {
        titulo: "Cómo usar Google Forms",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=1JXkC0J9pP4",
        ejemploRecurso: {
          docente: "Explica el formulario.",
          estudiante: "Completa respuestas.",
          evaluacion: "Comprensión."
        }
      },
      {
        titulo: "Guía de evaluación inclusiva",
        tipo: "PDF",
        descripcion: "Orientaciones en español.",
        enlace: "https://www.educacionyfp.gob.es/dam/jcr:evaluacion_inclusiva.pdf",
        ejemploRecurso: {
          docente: "Aplica criterios.",
          estudiante: "Trabaja sin presión.",
          evaluacion: "Proceso."
        }
      }
    ]
  },

  8: {
    nombre: "Modelado de textos con recursos digitales",
    descripcion: "Uso de textos modelo digitales.",
    recursos: [
      {
        titulo: "Google Docs – Comentarios",
        tipo: "Herramienta",
        descripcion: "Análisis colaborativo.",
        enlace: "https://docs.google.com",
        ejemploRecurso: {
          docente: "Analiza texto.",
          estudiante: "Identifica partes.",
          evaluacion: "Comprensión estructural."
        }
      },
      {
        titulo: "Cómo comentar en Google Docs",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=Zp7rJ5n9y2E",
        ejemploRecurso: {
          docente: "Explica comentarios.",
          estudiante: "Responde sugerencias.",
          evaluacion: "Corrección."
        }
      },
      {
        titulo: "Textos modelo comentados",
        tipo: "PDF",
        descripcion: "Ejemplos de escritura.",
        enlace: "https://www.um.es/documents/378246/2964900/Plantillas_escritura.pdf",
        ejemploRecurso: {
          docente: "Entrega modelo.",
          estudiante: "Imita estructura.",
          evaluacion: "Coherencia."
        }
      }
    ]
  },

  9: {
    nombre: "Escritura digital",
    descripcion: "Uso de editores para reducir dificultad motriz.",
    recursos: [
      {
        titulo: "Google Docs",
        tipo: "Herramienta",
        descripcion: "Redacción digital.",
        enlace: "https://docs.google.com",
        ejemploRecurso: {
          docente: "Autoriza uso.",
          estudiante: "Redacta digitalmente.",
          evaluacion: "Claridad."
        }
      },
      {
        titulo: "Editor de texto educativo",
        tipo: "Video",
        descripcion: "Uso pedagógico.",
        enlace: "https://www.youtube.com/watch?v=7w4K9bKpZpM",
        ejemploRecurso: {
          docente: "Explica funciones.",
          estudiante: "Edita texto.",
          evaluacion: "Autonomía."
        }
      },
      {
        titulo: "Guía de escritura digital",
        tipo: "PDF",
        descripcion: "Orientaciones.",
        enlace: "https://www.redalyc.org/pdf/1941/194114584009.pdf",
        ejemploRecurso: {
          docente: "Refuerza prácticas.",
          estudiante: "Mejora redacción.",
          evaluacion: "Progreso."
        }
      }
    ]
  },

  10: {
    nombre: "Retroalimentación formativa digital",
    descripcion: "Feedback continuo con TIC.",
    recursos: [
      {
        titulo: "Rúbricas en Google Classroom",
        tipo: "Herramienta",
        descripcion: "Evaluación clara.",
        enlace: "https://classroom.google.com/",
        ejemploRecurso: {
          docente: "Evalúa con rúbrica.",
          estudiante: "Comprende criterios.",
          evaluacion: "Mejora."
        }
      },
      {
        titulo: "Cómo usar rúbricas en Classroom",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=Y8F9Rk2Jw0A",
        ejemploRecurso: {
          docente: "Explica rúbrica.",
          estudiante: "Revisa feedback.",
          evaluacion: "Corrección."
        }
      },
      {
        titulo: "Guía de evaluación formativa",
        tipo: "PDF",
        descripcion: "Documento oficial.",
        enlace: "https://www.educacionyfp.gob.es/dam/jcr:formativa.pdf",
        ejemploRecurso: {
          docente: "Aplica criterios.",
          estudiante: "Reflexiona.",
          evaluacion: "Proceso."
        }
      }
    ]
  },

  11: {
    nombre: "Producción colaborativa digital",
    descripcion: "Escritura compartida mediante plataformas.",
    recursos: [
      {
        titulo: "Google Docs colaborativo",
        tipo: "Herramienta",
        descripcion: "Edición simultánea.",
        enlace: "https://docs.google.com",
        ejemploRecurso: {
          docente: "Organiza equipos.",
          estudiante: "Colabora.",
          evaluacion: "Participación."
        }
      },
      {
        titulo: "Cómo escribir en equipo con Google Docs",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=9zK4F0kTQZ4",
        ejemploRecurso: {
          docente: "Asigna roles.",
          estudiante: "Comparte ideas.",
          evaluacion: "Trabajo en grupo."
        }
      },
      {
        titulo: "Guía de aprendizaje colaborativo",
        tipo: "PDF",
        descripcion: "Fundamentos.",
        enlace: "https://www.eduteka.org/articulos/AprendizajeColaborativo",
        ejemploRecurso: {
          docente: "Refuerza metodología.",
          estudiante: "Participa.",
          evaluacion: "Cooperación."
        }
      }
    ]
  },

  12: {
    nombre: "Fragmentación de tareas con apoyo digital",
    descripcion: "Dividir actividades en pasos claros.",
    recursos: [
      {
        titulo: "Trello",
        tipo: "Herramienta",
        descripcion: "Gestión visual de tareas.",
        enlace: "https://trello.com/",
        ejemploRecurso: {
          docente: "Crea tablero.",
          estudiante: "Avanza por pasos.",
          evaluacion: "Cumplimiento."
        }
      },
      {
        titulo: "Cómo usar Trello en educación",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=6w1D6Z5fB5M",
        ejemploRecurso: {
          docente: "Explica columnas.",
          estudiante: "Gestiona tareas.",
          evaluacion: "Organización."
        }
      },
      {
        titulo: "Planificadores de tareas",
        tipo: "PDF",
        descripcion: "Formato imprimible.",
        enlace: "https://disfam.org/wp-content/uploads/2023/06/Disgrafia-15-actividades-para-el-aula-y-casa-1.pdf",
        ejemploRecurso: {
          docente: "Entrega planificador.",
          estudiante: "Organiza trabajo.",
          evaluacion: "Gestión del tiempo."
        }
      }
    ]
  },

  13: {
    nombre: "Autoevaluación guiada digital",
    descripcion: "Reflexión metacognitiva con apoyo TIC.",
    recursos: [
      {
        titulo: "Google Forms – Autoevaluación",
        tipo: "Herramienta",
        descripcion: "Formularios reflexivos.",
        enlace: "https://forms.google.com",
        ejemploRecurso: {
          docente: "Diseña formulario.",
          estudiante: "Reflexiona.",
          evaluacion: "Conciencia del proceso."
        }
      },
      {
        titulo: "Cómo crear autoevaluaciones",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=1JXkC0J9pP4",
        ejemploRecurso: {
          docente: "Explica preguntas.",
          estudiante: "Responde.",
          evaluacion: "Sinceridad."
        }
      },
      {
        titulo: "Guía de autoevaluación",
        tipo: "PDF",
        descripcion: "Orientaciones.",
        enlace: "https://www.redalyc.org/pdf/1941/194114584009.pdf",
        ejemploRecurso: {
          docente: "Refuerza reflexión.",
          estudiante: "Analiza desempeño.",
          evaluacion: "Metacognición."
        }
      }
    ]
  },

  14: {
    nombre: "Uso de material ergonómico y digital",
    descripcion: "Apoyos físicos y tecnológicos.",
    recursos: [
      {
        titulo: "Microsoft Word – Dictado",
        tipo: "Herramienta",
        descripcion: "Voz a texto.",
        enlace: "https://support.microsoft.com/es-es/word",
        ejemploRecurso: {
          docente: "Activa dictado.",
          estudiante: "Dicta texto.",
          evaluacion: "Claridad."
        }
      },
      {
        titulo: "Cómo usar dictado en Word",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=K5F8QJ6R2Z8",
        ejemploRecurso: {
          docente: "Explica función.",
          estudiante: "Produce texto.",
          evaluacion: "Fluidez."
        }
      },
      {
        titulo: "Guía de adaptaciones para escritura",
        tipo: "PDF",
        descripcion: "Apoyos materiales.",
        enlace: "https://www.speldnsw.org.au/wp-content/uploads/2022/07/Adjustments-for-Dysgraphia-.pdf",
        ejemploRecurso: {
          docente: "Aplica adaptaciones.",
          estudiante: "Escribe con apoyo.",
          evaluacion: "Legibilidad."
        }
      }
    ]
  },

  15: {
    nombre: "Portafolio digital de escritura",
    descripcion: "Seguimiento del progreso con evidencias digitales.",
    recursos: [
      {
        titulo: "Google Sites",
        tipo: "Herramienta",
        descripcion: "Creación de portafolios.",
        enlace: "https://sites.google.com/",
        ejemploRecurso: {
          docente: "Guía estructura.",
          estudiante: "Publica trabajos.",
          evaluacion: "Progreso."
        }
      },
      {
        titulo: "Cómo crear portafolios con Google Sites",
        tipo: "Video",
        descripcion: "Tutorial en español.",
        enlace: "https://www.youtube.com/watch?v=VYB3mK2F7yE",
        ejemploRecurso: {
          docente: "Explica secciones.",
          estudiante: "Organiza evidencias.",
          evaluacion: "Seguimiento."
        }
      },
      {
        titulo: "Guía de evaluación por portafolios",
        tipo: "PDF",
        descripcion: "Documento metodológico.",
        enlace: "https://www.redalyc.org/pdf/567/56712345006.pdf",
        ejemploRecurso: {
          docente: "Evalúa avances.",
          estudiante: "Reflexiona.",
          evaluacion: "Proceso global."
        }
      }
    ]
  }
};








/*********************************************************
 * CARGA DINÁMICA EN recursos.html y ejemplo.html
 *********************************************************/
const params = new URLSearchParams(window.location.search);
const tecnicaId = params.get("tecnica");

if (tecnicaId && tecnicas[tecnicaId]) {
  const t = tecnicas[tecnicaId];

  if (document.getElementById("tituloTecnica")) {
    document.getElementById("tituloTecnica").innerText = t.nombre;
    document.getElementById("descripcionTecnica").innerText = t.descripcion;

    const contenedor = document.getElementById("contenedorRecursos");
    if (contenedor) {
      t.recursos.forEach(r => {
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <h5>${r.titulo}</h5>
              <span class="badge bg-secondary mb-2">${r.tipo}</span>
              <p class="small">${r.descripcion}</p>
            </div>
            <div class="card-footer text-center">
              <a href="${r.enlace}" target="_blank" class="btn btn-outline-primary btn-sm">
                Abrir recurso
              </a>
            </div>
          </div>`;
        contenedor.appendChild(col);
      });
    }
  }

  if (document.getElementById("contenidoEjemplo")) {
    document.getElementById("tituloEjemplo").innerText = t.nombre;
    document.getElementById("contenidoEjemplo").innerHTML = t.ejemplo;
  }
}

/*********************************************************
 * EJEMPLO DE APLICACIÓN POR RECURSO
 *********************************************************/
if (document.getElementById("ejemplosPorRecurso") && tecnicaId && tecnicas[tecnicaId]) {

  const tecnica = tecnicas[tecnicaId];

  document.getElementById("tituloEjemplo").innerText =
    `Ejemplo de aplicación: ${tecnica.nombre}`;

  document.getElementById("descripcionTecnica").innerText =
    tecnica.descripcion;

  const contenedor = document.getElementById("ejemplosPorRecurso");

  tecnica.recursos.forEach((recurso, index) => {

    const bloque = document.createElement("div");
    bloque.className = "card mb-4 shadow-sm";

    bloque.innerHTML = `
      <div class="card-body">
        <h5>🔹 Recurso ${index + 1}: ${recurso.titulo}</h5>
        <span class="badge bg-secondary mb-2">${recurso.tipo}</span>

        <p class="mt-2">
          <strong>¿Para qué se utiliza?</strong><br>
          ${recurso.descripcion}
        </p>

<p><strong>¿Cómo lo usa el docente?</strong><br>
${recurso.ejemploRecurso.docente}
</p>

<p><strong>¿Qué hace el estudiante?</strong><br>
${recurso.ejemploRecurso.estudiante}
</p>

<p><strong>¿Qué se evalúa?</strong><br>
${recurso.ejemploRecurso.evaluacion}
</p>


        <a href="${recurso.enlace}" target="_blank"
           class="btn btn-outline-primary btn-sm mt-2">
          Abrir recurso
        </a>
      </div>
    `;

    contenedor.appendChild(bloque);
  });
}
/*********************************************************
 * PÁGINA RECURSOS.HTML
 *********************************************************/
if (document.getElementById("panelRecursos") && tecnicaId && tecnicas[tecnicaId]) {

  const tecnica = tecnicas[tecnicaId];

  document.getElementById("tituloTecnica").innerText =
    `Recursos para: ${tecnica.nombre}`;

  document.getElementById("descripcionTecnica").innerText =
    tecnica.descripcion;

  const panel = document.getElementById("panelRecursos");

  tecnica.recursos.forEach(recurso => {

    let icono = "bi-folder";
    if (recurso.tipo === "Video") icono = "bi-play-circle";
    if (recurso.tipo === "PDF") icono = "bi-file-earmark-pdf";
    if (recurso.tipo === "Web") icono = "bi-globe";

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="recurso-card" onclick="window.open('${recurso.enlace}','_blank')">
        <i class="bi ${icono}"></i>
        <h5>${recurso.titulo}</h5>
        <span>${recurso.tipo}</span>
      </div>
    `;

    panel.appendChild(card);
  });
}
