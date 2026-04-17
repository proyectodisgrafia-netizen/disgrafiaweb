let actividadesSeleccionadas = [];
let draggedElement = null;

// Drag and Drop
function dragStart(event) {
  draggedElement = event.target.closest('.actividad-item');
  draggedElement.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'copy';
}

function dragEnd(event) {
  if (draggedElement) {
    draggedElement.classList.remove('dragging');
  }
}

function dragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  document.getElementById('curriculumConstructor').classList.add('drag-over');
}

function dragLeave(event) {
  if (event.target === document.getElementById('curriculumConstructor')) {
    document.getElementById('curriculumConstructor').classList.remove('drag-over');
  }
}

function drop(event) {
  event.preventDefault();
  document.getElementById('curriculumConstructor').classList.remove('drag-over');
  
  if (draggedElement) {
    const actividadId = draggedElement.getAttribute('data-id');
    const nivel = draggedElement.getAttribute('data-nivel');
    const actividad = obtenerActividadPorId(nivel, actividadId);
    
    if (actividad) {
      agregarActividadAlConstructor(actividad, nivel, actividadId);
    }
  }
}

function agregarActividadAlConstructor(actividad, nivel, id) {
  // Evitar duplicados
  if (actividadesSeleccionadas.some(a => a.id === id && a.nivel === nivel)) {
    alert('Esta actividad ya está en el currículum');
    return;
  }

  actividadesSeleccionadas.push({
    id: id,
    nivel: nivel,
    nombre: actividad.nombre,
    duracion: actividad.duracion,
    tipo: actividad.tipo,
    descripcion: actividad.descripcion,
    materiales: actividad.materiales,
    instrucciones: actividad.instrucciones,
    criterios: actividad.criterios,
    recursos: actividad.recursos
  });

  renderizarConstructor();
}

function renderizarConstructor() {
  const constructor = document.getElementById('curriculumConstructor');
  
  if (actividadesSeleccionadas.length === 0) {
    constructor.innerHTML = `
      <p class="text-muted text-center py-5">
        <i class="bi bi-arrow-left"></i> Arrastra actividades aquí para construir tu currículum
      </p>
    `;
    document.getElementById('contadorActividades').textContent = '0 actividades';
    return;
  }

  let html = '';
  actividadesSeleccionadas.forEach((act, index) => {
    html += `
      <div class="actividad-item-construida">
        <div style="flex: 1;">
          <h6 class="mb-2">${index + 1}. ${act.nombre}</h6>
          <div class="mb-2">
            <span class="actividad-badge">${act.tipo}</span>
            <span class="actividad-badge">${act.duracion}</span>
            <span class="actividad-badge">${act.nivel}</span>
          </div>
          <p class="small text-muted mb-0">${act.descripcion}</p>
        </div>
        <button class="btn btn-sm btn-danger btn-remove" onclick="removerActividad(${index})">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    `;
  });

  constructor.innerHTML = html;
  document.getElementById('contadorActividades').textContent = `${actividadesSeleccionadas.length} actividades`;
}

function removerActividad(index) {
  actividadesSeleccionadas.splice(index, 1);
  renderizarConstructor();
}

function limpiarConstructor() {
  if (confirm('¿Estás seguro de que quieres limpiar el currículum?')) {
    actividadesSeleccionadas = [];
    document.getElementById('nombreCurriculo').value = '';
    document.getElementById('docenteNombre').value = '';
    document.getElementById('institucion').value = '';
    document.getElementById('duracionTotal').value = '';
    renderizarConstructor();
  }
}

function guardarCurriculo() {
  const nombre = document.getElementById('nombreCurriculo').value;
  const docente = document.getElementById('docenteNombre').value;
  const institucion = document.getElementById('institucion').value;
  const duracion = document.getElementById('duracionTotal').value;

  if (!nombre || !docente || !institucion || actividadesSeleccionadas.length === 0) {
    alert('Por favor, completa todos los campos y agrega al menos una actividad');
    return;
  }

  const curriculo = {
    id: Date.now(),
    nombre: nombre,
    docente: docente,
    institucion: institucion,
    duracion: duracion,
    fecha: new Date().toLocaleDateString('es-ES'),
    actividades: actividadesSeleccionadas
  };

  let curriculosSaved = JSON.parse(localStorage.getItem('curriculosGuardados')) || [];
  curriculosSaved.push(curriculo);
  localStorage.setItem('curriculosGuardados', JSON.stringify(curriculosSaved));

  alert('¡Currículum guardado exitosamente!');
  mostrarCurriculosGuardados();
}

function mostrarCurriculosGuardados() {
  const curriculosSaved = JSON.parse(localStorage.getItem('curriculosGuardados')) || [];
  let html = '';

  if (curriculosSaved.length === 0) {
    html = '<p class="text-muted text-center">No hay currículos guardados</p>';
  } else {
    curriculosSaved.forEach(cur => {
      html += `
        <div class="card mb-3 border-0">
          <div class="card-body">
            <h6 class="card-title">${cur.nombre}</h6>
            <p class="small text-muted mb-2">
              <i class="bi bi-person"></i> ${cur.docente} | 
              <i class="bi bi-building"></i> ${cur.institucion}
            </p>
            <p class="small mb-2">
              <strong>${cur.actividades.length}</strong> actividades | 
              <strong>${cur.duracion}</strong> semanas
            </p>
            <div class="btn-group btn-group-sm w-100">
              <button class="btn btn-outline-primary" onclick="cargarCurriculo(${cur.id})">
                <i class="bi bi-pencil"></i> Editar
              </button>
              <button class="btn btn-outline-danger" onclick="eliminarCurriculo(${cur.id})">
                <i class="bi bi-trash"></i> Eliminar
              </button>
              <button class="btn btn-outline-success" onclick="exportarPDFCurriculo(${cur.id})">
                <i class="bi bi-file-earmark-pdf"></i> PDF
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  document.getElementById('curriculosList').innerHTML = html;
}

function cargarCurriculo(id) {
  const curriculosSaved = JSON.parse(localStorage.getItem('curriculosGuardados')) || [];
  const curriculo = curriculosSaved.find(c => c.id === id);

  if (curriculo) {
    document.getElementById('nombreCurriculo').value = curriculo.nombre;
    document.getElementById('docenteNombre').value = curriculo.docente;
    document.getElementById('institucion').value = curriculo.institucion;
    document.getElementById('duracionTotal').value = curriculo.duracion;
    actividadesSeleccionadas = [...curriculo.actividades];
    renderizarConstructor();
    window.scrollTo(0, 0);
  }
}

function eliminarCurriculo(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este currículum?')) {
    let curriculosSaved = JSON.parse(localStorage.getItem('curriculosGuardados')) || [];
    curriculosSaved = curriculosSaved.filter(c => c.id !== id);
    localStorage.setItem('curriculosGuardados', JSON.stringify(curriculosSaved));
    mostrarCurriculosGuardados();
  }
}

function exportarPDF() {
  const nombre = document.getElementById('nombreCurriculo').value;
  if (!nombre || actividadesSeleccionadas.length === 0) {
    alert('Por favor, completa el formulario y agrega actividades antes de exportar');
    return;
  }

  const curriculo = {
    nombre: document.getElementById('nombreCurriculo').value,
    docente: document.getElementById('docenteNombre').value,
    institucion: document.getElementById('institucion').value,
    duracion: document.getElementById('duracionTotal').value,
    actividades: actividadesSeleccionadas,
    fecha: new Date().toLocaleDateString('es-ES')
  };

  generarPDFProfesional(curriculo);
}

function exportarPDFCurriculo(id) {
  const curriculosSaved = JSON.parse(localStorage.getItem('curriculosGuardados')) || [];
  const curriculo = curriculosSaved.find(c => c.id === id);
  
  if (curriculo) {
    generarPDFProfesional(curriculo);
  }
}

function generarPDFProfesional(curriculo) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Colores
  const colorPrimario = [13, 110, 253]; // Azul
  const colorSecundario = [108, 117, 125]; // Gris
  const colorFondo = [245, 247, 250]; // Azul muy claro
  const colorTexto = [50, 50, 50]; // Gris oscuro
  
  let yPos = 15;
  const anchoMax = 190; // Ancho máximo de contenido
  const margenIzq = 10;
  
  // ==================== PORTADA ====================
  
  // Header decorativo
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, 210, 50, 'F');
  
  // Logo/Título
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('GUÍA DIDÁCTICA DIGITAL', 105, 15, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont(undefined, 'normal');
  doc.text('Atención a Estudiantes con Disgrafía', 105, 25, { align: 'center' });
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('Currículum Personalizado', 105, 35, { align: 'center' });
  
  yPos = 70;
  
  // Información principal
  doc.setTextColor(...colorTexto);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('INFORMACIÓN DEL CURRÍCULUM', margenIzq, yPos);
  
  // Cuadro de información
  doc.setDrawColor(...colorPrimario);
  doc.setLineWidth(0.5);
  doc.rect(margenIzq, yPos + 5, anchoMax, 55);
  
  // Líneas internas
  doc.line(margenIzq + 95, yPos + 5, margenIzq + 95, yPos + 60);
  doc.line(margenIzq, yPos + 20, margenIzq + anchoMax, yPos + 20);
  doc.line(margenIzq, yPos + 35, margenIzq + anchoMax, yPos + 35);
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Currículum:', margenIzq + 3, yPos + 13);
  doc.setFont(undefined, 'normal');
  doc.text(curriculo.nombre, margenIzq + 30, yPos + 13);
  
  doc.setFont(undefined, 'bold');
  doc.text('Docente:', margenIzq + 98, yPos + 13);
  doc.setFont(undefined, 'normal');
  doc.text(curriculo.docente, margenIzq + 120, yPos + 13);
  
  doc.setFont(undefined, 'bold');
  doc.text('Institución:', margenIzq + 3, yPos + 28);
  doc.setFont(undefined, 'normal');
  doc.text(curriculo.institucion, margenIzq + 30, yPos + 28);
  
  doc.setFont(undefined, 'bold');
  doc.text('Duración:', margenIzq + 98, yPos + 28);
  doc.setFont(undefined, 'normal');
  doc.text(curriculo.duracion + ' semanas', margenIzq + 120, yPos + 28);
  
  doc.setFont(undefined, 'bold');
  doc.text('Fecha:', margenIzq + 3, yPos + 43);
  doc.setFont(undefined, 'normal');
  doc.text(curriculo.fecha, margenIzq + 30, yPos + 43);
  
  doc.setFont(undefined, 'bold');
  doc.text('Total de Actividades:', margenIzq + 98, yPos + 43);
  doc.setFont(undefined, 'normal');
  doc.text(curriculo.actividades.length.toString(), margenIzq + 125, yPos + 43);
  
  yPos += 70;
  
  // ==================== LISTADO DE ACTIVIDADES ====================
  
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('ACTIVIDADES PLANIFICADAS', margenIzq, yPos);
  
  yPos += 10;
  
  curriculo.actividades.forEach((actividad, index) => {
    // Verificar si cabe en la página
    if (yPos > 250) {
      doc.addPage();
      yPos = 15;
    }
    
    // Número de actividad con fondo
    doc.setFillColor(...colorPrimario);
    doc.circle(margenIzq + 5, yPos, 4, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text((index + 1).toString(), margenIzq + 5, yPos + 1.5, { align: 'center' });
    
    // Nombre de actividad
    doc.setTextColor(...colorTexto);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(actividad.nombre, margenIzq + 15, yPos);
    
    yPos += 7;
    
    // Cuadro principal de la actividad
    doc.setDrawColor(...colorPrimario);
    doc.setLineWidth(0.3);
    doc.setFillColor(...colorFondo);
    doc.rect(margenIzq + 2, yPos, anchoMax - 2, 65, 'FD');
    
    // Contenido dentro del cuadro
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    
    // Tipo y Duración
    doc.text('Tipo:', margenIzq + 5, yPos + 5);
    doc.setFont(undefined, 'normal');
    doc.text(actividad.tipo, margenIzq + 20, yPos + 5);
    
    doc.setFont(undefined, 'bold');
    doc.text('Duración:', margenIzq + 65, yPos + 5);
    doc.setFont(undefined, 'normal');
    doc.text(actividad.duracion, margenIzq + 85, yPos + 5);
    
    doc.setFont(undefined, 'bold');
    doc.text('Nivel:', margenIzq + 130, yPos + 5);
    doc.setFont(undefined, 'normal');
    doc.text(actividad.nivel, margenIzq + 150, yPos + 5);
    
    // Descripción
    doc.setFont(undefined, 'bold');
    doc.text('Descripción:', margenIzq + 5, yPos + 13);
    doc.setFont(undefined, 'normal');
    const textosDesc = doc.splitTextToSize(actividad.descripcion, anchoMax - 10);
    doc.text(textosDesc, margenIzq + 5, yPos + 18, { maxWidth: anchoMax - 10 });
    
    // Materiales
    const alturaDesc = textosDesc.length * 4 + 5;
    doc.setFont(undefined, 'bold');
    doc.text('Materiales:', margenIzq + 5, yPos + 18 + alturaDesc);
    doc.setFont(undefined, 'normal');
    const materiales = actividad.materiales.join(', ');
    const textosMat = doc.splitTextToSize(materiales, anchoMax - 10);
    doc.text(textosMat, margenIzq + 25, yPos + 18 + alturaDesc, { maxWidth: anchoMax - 30 });
    
    yPos += 70;
    
    // Criterios en página siguiente si es necesario
    if (yPos > 200) {
      doc.addPage();
      yPos = 15;
    }
    
    // Instrucciones
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Instrucciones:', margenIzq, yPos);
    doc.setFont(undefined, 'normal');
    const textosInst = doc.splitTextToSize(actividad.instrucciones, anchoMax - 5);
    doc.text(textosInst, margenIzq, yPos + 5, { maxWidth: anchoMax });
    yPos += textosInst.length * 4 + 5;
    
    // Criterios de evaluación
    doc.setFont(undefined, 'bold');
    doc.text('Criterios de Evaluación:', margenIzq, yPos);
    yPos += 5;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    
    actividad.criterios.forEach(criterio => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 15;
      }
      doc.text('• ' + criterio, margenIzq + 5, yPos);
      yPos += 4;
    });
    
    yPos += 5;
  });
  
  // ==================== PÁGINA FINAL CON INFORMACIÓN ====================
  
  if (yPos > 200) {
    doc.addPage();
  }
  
  // Footer en todas las páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Línea separadora
    doc.setDrawColor(...colorSecundario);
    doc.setLineWidth(0.3);
    doc.line(10, 287, 200, 287);
    
    // Número de página
    doc.setFontSize(9);
    doc.setTextColor(...colorSecundario);
    doc.text('Página ' + i + ' de ' + totalPages, 105, 293, { align: 'center' });
    
    // Pie
    doc.setFontSize(8);
    doc.text('© 2026 Guía Didáctica Digital para Disgrafía - Educación Inclusiva', 105, 300, { align: 'center' });
  }
  
  // Generar nombre del archivo
  const nombreArchivo = `curriculo-${curriculo.nombre.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
  
  // Descargar
  doc.save(nombreArchivo);
  
  alert('¡PDF exportado correctamente!');
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
  const constructor = document.getElementById('curriculumConstructor');
  constructor.addEventListener('dragover', dragOver);
  constructor.addEventListener('dragleave', dragLeave);
  constructor.addEventListener('drop', drop);
  
  mostrarCurriculosGuardados();
});