// Variables globales
let estudiantes = [];
let evaluaciones = [];
let estudianteSeleccionado = null;
let graficoCompetencias = null;

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
  estudiantes = JSON.parse(localStorage.getItem('estudiantes')) || [];
  evaluaciones = JSON.parse(localStorage.getItem('evaluaciones')) || [];
  
  document.getElementById('fechaEval').valueAsDate = new Date();
  
  // Agregar esta línea
  cargarReportesGuardados();
  
  mostrarEstudiantes();
  actualizarSelectEstudiantes();
  actualizarEstadisticas();
});

// ==================== GESTIÓN DE ESTUDIANTES ====================

function agregarEstudiante() {
  const nombre = document.getElementById('nombreEstudiante').value;
  const apellido = document.getElementById('apellidoEstudiante').value;
  const cedula = document.getElementById('cedulaEstudiante').value;
  const nivel = document.getElementById('nivelEstudiante').value;
  const tipoDisgrafia = document.getElementById('tipoDisgrafiaEstudiante').value;
  const notasIniciales = document.getElementById('notasIniciales').value;

  if (!nombre || !cedula) {
    alert('Por favor, completa nombre y cédula');
    return;
  }

  // Verificar que la cédula sea única
  if (estudiantes.some(e => e.cedula === cedula)) {
    alert('Este estudiante ya está registrado');
    return;
  }

  const estudiante = {
    id: Date.now(),
    nombre: nombre,
    apellido: apellido,
    cedula: cedula,
    nivel: nivel,
    tipoDisgrafia: tipoDisgrafia,
    notasIniciales: notasIniciales,
    fechaRegistro: new Date().toLocaleDateString('es-ES'),
    estado: 'Activo'
  };

  estudiantes.push(estudiante);
  localStorage.setItem('estudiantes', JSON.stringify(estudiantes));

  // Limpiar formulario
  document.getElementById('nombreEstudiante').value = '';
  document.getElementById('apellidoEstudiante').value = '';
  document.getElementById('cedulaEstudiante').value = '';
  document.getElementById('notasIniciales').value = '';

  alert('✅ Estudiante agregado exitosamente');
  mostrarEstudiantes();
  actualizarSelectEstudiantes();
  actualizarEstadisticas();
}

function mostrarEstudiantes() {
  const lista = document.getElementById('listaEstudiantes');
  
  if (estudiantes.length === 0) {
    lista.innerHTML = '<p class="text-muted text-center">No hay estudiantes registrados</p>';
    return;
  }

  let html = '';
  estudiantes.forEach(est => {
    const evaluacionesEstudiante = evaluaciones.filter(e => e.estudianteId === est.id);
    const promedio = evaluacionesEstudiante.length > 0
      ? (evaluacionesEstudiante.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesEstudiante.length).toFixed(1)
      : 'Sin evaluar';

    const colorPromedio = promedio === 'Sin evaluar' ? 'secondary' : promedio >= 7 ? 'success' : promedio >= 5 ? 'warning' : 'danger';

    html += `
      <div class="card mb-3 border-0 border-start border-4 border-${colorPromedio}">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-md-8">
              <h6 class="card-title mb-1">${est.nombre} ${est.apellido}</h6>
              <p class="small text-muted mb-2">
                <i class="bi bi-hash"></i> Cédula: ${est.cedula} | 
                <i class="bi bi-book"></i> ${est.nivel}
              </p>
              <p class="small mb-0">
                <span class="badge bg-info">${est.tipoDisgrafia}</span>
                <span class="badge bg-primary">${evaluacionesEstudiante.length} evaluaciones</span>
              </p>
            </div>
            <div class="col-md-4 text-end">
              <h4 class="mb-2">
                <span class="badge bg-${colorPromedio}">${promedio}</span>
              </h4>
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary" onclick="verPerfilEstudiante(${est.id})">
                  <i class="bi bi-eye"></i> Ver
                </button>
                <button class="btn btn-outline-danger" onclick="eliminarEstudiante(${est.id})">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  lista.innerHTML = html;
}

function filtrarEstudiantes() {
  const filtro = document.getElementById('filtroEstudiantes').value.toLowerCase();
  const estudiantesFiltrados = estudiantes.filter(e => 
    (e.nombre + ' ' + e.apellido).toLowerCase().includes(filtro)
  );

  const lista = document.getElementById('listaEstudiantes');
  
  if (estudiantesFiltrados.length === 0) {
    lista.innerHTML = '<p class="text-muted text-center">No hay estudiantes que coincidan</p>';
    return;
  }

  let html = '';
  estudiantesFiltrados.forEach(est => {
    const evaluacionesEstudiante = evaluaciones.filter(e => e.estudianteId === est.id);
    const promedio = evaluacionesEstudiante.length > 0
      ? (evaluacionesEstudiante.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesEstudiante.length).toFixed(1)
      : 'Sin evaluar';

    const colorPromedio = promedio === 'Sin evaluar' ? 'secondary' : promedio >= 7 ? 'success' : promedio >= 5 ? 'warning' : 'danger';

    html += `
      <div class="card mb-3 border-0 border-start border-4 border-${colorPromedio}">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-md-8">
              <h6 class="card-title mb-1">${est.nombre} ${est.apellido}</h6>
              <p class="small text-muted mb-2">
                <i class="bi bi-hash"></i> Cédula: ${est.cedula} | 
                <i class="bi bi-book"></i> ${est.nivel}
              </p>
              <p class="small mb-0">
                <span class="badge bg-info">${est.tipoDisgrafia}</span>
                <span class="badge bg-primary">${evaluacionesEstudiante.length} evaluaciones</span>
              </p>
            </div>
            <div class="col-md-4 text-end">
              <h4 class="mb-2">
                <span class="badge bg-${colorPromedio}">${promedio}</span>
              </h4>
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary" onclick="verPerfilEstudiante(${est.id})">
                  <i class="bi bi-eye"></i> Ver
                </button>
                <button class="btn btn-outline-danger" onclick="eliminarEstudiante(${est.id})">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  lista.innerHTML = html;
}

function verPerfilEstudiante(id) {
  const estudiante = estudiantes.find(e => e.id === id);
  if (!estudiante) return;

  const evaluacionesEstudiante = evaluaciones.filter(e => e.estudianteId === id);
  
  alert(`
    PERFIL DE ESTUDIANTE
    
    Nombre: ${estudiante.nombre} ${estudiante.apellido}
    Cédula: ${estudiante.cedula}
    Nivel: ${estudiante.nivel}
    Tipo de Disgrafía: ${estudiante.tipoDisgrafia}
    Fecha de Registro: ${estudiante.fechaRegistro}
    
    Evaluaciones Realizadas: ${evaluacionesEstudiante.length}
    
    ${estudiante.notasIniciales ? `Notas: ${estudiante.notasIniciales}` : ''}
  `);
}

function eliminarEstudiante(id) {
  if (confirm('¿Estás seguro? Se eliminarán también todas sus evaluaciones.')) {
    estudiantes = estudiantes.filter(e => e.id !== id);
    evaluaciones = evaluaciones.filter(e => e.estudianteId !== id);
    
    localStorage.setItem('estudiantes', JSON.stringify(estudiantes));
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
    
    mostrarEstudiantes();
    actualizarSelectEstudiantes();
    actualizarEstadisticas();
  }
}

function actualizarSelectEstudiantes() {
  const selectEval = document.getElementById('estudianteEval');
  const selectReporte = document.getElementById('estudianteReporte');
  
  let html = '<option value="">-- Elige un estudiante --</option>';
  estudiantes.forEach(est => {
    html += `<option value="${est.id}">${est.nombre} ${est.apellido}</option>`;
  });
  
  selectEval.innerHTML = html;
  
  let htmlReporte = '<option value="">-- Todos los estudiantes --</option>';
  estudiantes.forEach(est => {
    htmlReporte += `<option value="${est.id}">${est.nombre} ${est.apellido}</option>`;
  });
  
  selectReporte.innerHTML = htmlReporte;
}

function cargarDatosEstudiante() {
  const estudianteId = document.getElementById('estudianteEval').value;
  if (!estudianteId) return;

  const estudiante = estudiantes.find(e => e.id == estudianteId);
  if (estudiante) {
    estudianteSeleccionado = estudiante;
  }
}

// ==================== GESTIÓN DE EVALUACIONES ====================

function guardarEvaluacion() {
  const estudianteId = document.getElementById('estudianteEval').value;
  const actividad = document.getElementById('actividadEval').value;
  const fecha = document.getElementById('fechaEval').value;
  const calificacion = parseFloat(document.getElementById('calificacionEval').value);
  const porcentaje = parseInt(document.getElementById('porcentajeEval').value);
  const competencia = document.getElementById('competenciaEval').value;
  const fortalezas = document.getElementById('fortalezasEval').value;
  const mejoras = document.getElementById('mejoriasEval').value;
  const observaciones = document.getElementById('observacionesEval').value;

  if (!estudianteId || !actividad || !fecha || isNaN(calificacion) || calificacion < 0 || calificacion > 10) {
    alert('Por favor, completa todos los campos correctamente');
    return;
  }

  const evaluacion = {
    id: Date.now(),
    estudianteId: parseInt(estudianteId),
    actividad: actividad,
    fecha: fecha,
    calificacion: calificacion,
    porcentaje: porcentaje,
    competencia: competencia,
    fortalezas: fortalezas,
    mejoras: mejoras,
    observaciones: observaciones,
    fechaRegistro: new Date().toLocaleDateString('es-ES')
  };

  evaluaciones.push(evaluacion);
  localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));

  // Limpiar formulario
  document.getElementById('estudianteEval').value = '';
  document.getElementById('actividadEval').value = '';
  document.getElementById('calificacionEval').value = '';
  document.getElementById('porcentajeEval').value = '';
  document.getElementById('fortalezasEval').value = '';
  document.getElementById('mejoriasEval').value = '';
  document.getElementById('observacionesEval').value = '';
  document.getElementById('fechaEval').valueAsDate = new Date();

  alert('✅ Evaluación guardada exitosamente');
  mostrarHistorialEvaluaciones();
  actualizarEstadisticas();
}

function mostrarHistorialEvaluaciones() {
  const lista = document.getElementById('historialEvaluaciones');
  
  if (evaluaciones.length === 0) {
    lista.innerHTML = '<p class="text-muted text-center">No hay evaluaciones registradas</p>';
    return;
  }

  let html = '';
  // Ordenar por fecha descendente
  const evaluacionesOrdenadas = [...evaluaciones].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  evaluacionesOrdenadas.forEach((eval) => {
    const estudiante = estudiantes.find(e => e.id == eval.estudianteId);
    if (!estudiante) return;

    const color = eval.calificacion >= 7 ? 'success' : eval.calificacion >= 5 ? 'warning' : 'danger';
    
    html += `
      <div class="card mb-2 border-0 border-start border-4 border-${color}">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-md-7">
              <h6 class="mb-1">${estudiante.nombre} ${estudiante.apellido}</h6>
              <p class="small text-muted mb-1">
                <i class="bi bi-activity"></i> ${eval.actividad} | 
                <i class="bi bi-calendar"></i> ${new Date(eval.fecha).toLocaleDateString('es-ES')}
              </p>
              <p class="small mb-0">
                <span class="badge bg-info">${eval.competencia}</span>
              </p>
            </div>
            <div class="col-md-5 text-end">
              <h5 class="mb-2">
                <span class="badge bg-${color}">${eval.calificacion}/10</span>
                <span class="badge bg-secondary">${eval.porcentaje}%</span>
              </h5>
              <button class="btn btn-sm btn-outline-primary" onclick="verDetallesEvaluacion(${eval.id})">
                <i class="bi bi-eye"></i> Ver
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="eliminarEvaluacion(${eval.id})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  lista.innerHTML = html;
}

function verDetallesEvaluacion(evalId) {
  const evaluacion = evaluaciones.find(e => e.id === evalId);
  const estudiante = estudiantes.find(e => e.id == evaluacion.estudianteId);

  alert(`
    DETALLES DE EVALUACIÓN
    
    Estudiante: ${estudiante.nombre} ${estudiante.apellido}
    Actividad: ${evaluacion.actividad}
    Fecha: ${new Date(evaluacion.fecha).toLocaleDateString('es-ES')}
    
    Calificación: ${evaluacion.calificacion}/10 (${evaluacion.porcentaje}%)
    Competencia: ${evaluacion.competencia}
    
    Fortalezas:
    ${evaluacion.fortalezas || 'Sin registrar'}
    
    Áreas de Mejora:
    ${evaluacion.mejoras || 'Sin registrar'}
    
    Observaciones:
    ${evaluacion.observaciones || 'Sin registrar'}
  `);
}

function filtrarEvaluaciones() {
  const filtro = document.getElementById('filtroEvaluaciones').value.toLowerCase();
  const lista = document.getElementById('historialEvaluaciones');

  const evaluacionesFiltradas = evaluaciones.filter(e => {
    const estudiante = estudiantes.find(est => est.id == e.estudianteId);
    return estudiante && (estudiante.nombre + ' ' + estudiante.apellido).toLowerCase().includes(filtro);
  });

  if (evaluacionesFiltradas.length === 0) {
    lista.innerHTML = '<p class="text-muted text-center">No hay evaluaciones que coincidan</p>';
    return;
  }

  let html = '';
  const evaluacionesOrdenadas = [...evaluacionesFiltradas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  evaluacionesOrdenadas.forEach((eval) => {
    const estudiante = estudiantes.find(e => e.id == eval.estudianteId);
    const color = eval.calificacion >= 7 ? 'success' : eval.calificacion >= 5 ? 'warning' : 'danger';
    
    html += `
      <div class="card mb-2 border-0 border-start border-4 border-${color}">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-md-7">
              <h6 class="mb-1">${estudiante.nombre} ${estudiante.apellido}</h6>
              <p class="small text-muted mb-1">
                <i class="bi bi-activity"></i> ${eval.actividad} | 
                <i class="bi bi-calendar"></i> ${new Date(eval.fecha).toLocaleDateString('es-ES')}
              </p>
              <p class="small mb-0">
                <span class="badge bg-info">${eval.competencia}</span>
              </p>
            </div>
            <div class="col-md-5 text-end">
              <h5 class="mb-2">
                <span class="badge bg-${color}">${eval.calificacion}/10</span>
                <span class="badge bg-secondary">${eval.porcentaje}%</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  lista.innerHTML = html;
}

function eliminarEvaluacion(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta evaluación?')) {
    evaluaciones = evaluaciones.filter(e => e.id !== id);
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
    mostrarHistorialEvaluaciones();
    actualizarEstadisticas();
  }
}

// ==================== ESTADÍSTICAS Y REPORTES ====================

function actualizarEstadisticas() {
  const totalEstudiantes = estudiantes.length;
  const totalEvaluaciones = evaluaciones.length;
  
  document.getElementById('totalEstudiantes').textContent = totalEstudiantes;
  document.getElementById('totalEvaluaciones').textContent = totalEvaluaciones;

  if (totalEvaluaciones === 0) {
    document.getElementById('promedioGeneral').textContent = '0.0';
    document.getElementById('tasaEvaluados').textContent = '0%';
    return;
  }

  const promedioGeneral = (evaluaciones.reduce((sum, e) => sum + e.calificacion, 0) / totalEvaluaciones).toFixed(1);
  document.getElementById('promedioGeneral').textContent = promedioGeneral;

  // Estudiantes evaluados
  const estudiantesEvaluados = new Set(evaluaciones.map(e => e.estudianteId)).size;
  const tasaEvaluados = totalEstudiantes > 0 ? Math.round((estudiantesEvaluados / totalEstudiantes) * 100) : 0;
  document.getElementById('tasaEvaluados').textContent = tasaEvaluados + '%';

  actualizarGraficoCompetencias();
}

function generarReporteEstudiante() {
  const estudianteId = document.getElementById('estudianteReporte').value;
  
  if (!estudianteId) {
    document.getElementById('reporteDetallado').innerHTML = '<p class="text-muted text-center">Selecciona un estudiante para ver su reporte detallado</p>';
    return;
  }

  const estudiante = estudiantes.find(e => e.id == estudianteId);
  const evaluacionesEstudiante = evaluaciones.filter(e => e.estudianteId == estudianteId);

  if (evaluacionesEstudiante.length === 0) {
    document.getElementById('reporteDetallado').innerHTML = '<p class="text-muted">Este estudiante aún no tiene evaluaciones registradas.</p>';
    return;
  }

  const promedio = (evaluacionesEstudiante.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesEstudiante.length).toFixed(1);
  const promedioPorc = (evaluacionesEstudiante.reduce((sum, e) => sum + e.porcentaje, 0) / evaluacionesEstudiante.length).toFixed(1);

  let html = `
    <h5>${estudiante.nombre} ${estudiante.apellido}</h5>
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h4>${promedio}</h4>
            <p class="text-muted small">Promedio Calificación</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h4>${promedioPorc}%</h4>
            <p class="text-muted small">Promedio Porcentaje</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h4>${evaluacionesEstudiante.length}</h4>
            <p class="text-muted small">Total Evaluaciones</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center">
          <div class="card-body">
            <h4>${estudiante.tipoDisgrafia}</h4>
            <p class="text-muted small">Tipo de Disgrafía</p>
          </div>
        </div>
      </div>
    </div>

    <h6>Evaluaciones Realizadas</h6>
    <table class="table table-sm table-striped">
      <thead class="table-dark">
        <tr>
          <th>Fecha</th>
          <th>Actividad</th>
          <th>Competencia</th>
          <th>Calificación</th>
          <th>Porcentaje</th>
        </tr>
      </thead>
      <tbody>
        ${evaluacionesEstudiante.map(e => `
          <tr>
            <td>${new Date(e.fecha).toLocaleDateString('es-ES')}</td>
            <td>${e.actividad}</td>
            <td>${e.competencia}</td>
            <td><span class="badge bg-${e.calificacion >= 7 ? 'success' : e.calificacion >= 5 ? 'warning' : 'danger'}">${e.calificacion}</span></td>
            <td>${e.porcentaje}%</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.getElementById('reporteDetallado').innerHTML = html;
}

function actualizarGraficoCompetencias() {
  const ctx = document.getElementById('graficoCompetencias');
  if (!ctx) return;

  // Agrupar evaluaciones por competencia
  const competencias = {};
  evaluaciones.forEach(e => {
    if (!competencias[e.competencia]) {
      competencias[e.competencia] = [];
    }
    competencias[e.competencia].push(e.calificacion);
  });

  const labels = Object.keys(competencias);
  const datos = labels.map(comp => {
    const promedio = competencias[comp].reduce((a, b) => a + b, 0) / competencias[comp].length;
    return promedio.toFixed(1);
  });

  if (graficoCompetencias) {
    graficoCompetencias.destroy();
  }

  graficoCompetencias = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Promedio por Competencia',
        data: datos,
        backgroundColor: [
          '#0d6efd',
          '#198754',
          '#ffc107',
          '#0dcaf0',
          '#e83e8c',
          '#6f42c1'
        ],
        borderColor: '#333',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          title: {
            display: true,
            text: 'Calificación'
          }
        }
      }
    }
  });
}

// ==================== EXPORTAR A PDF ====================

function descargarReportePDF() {
  const estudianteId = document.getElementById('estudianteReporte').value;

  if (estudianteId) {
    generarPDFEstudiante(estudianteId);
  } else {
    generarPDFGeneral();
  }
}

function generarPDFEstudiante(estudianteId) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const estudiante = estudiantes.find(e => e.id == estudianteId);
  const evaluacionesEstudiante = evaluaciones.filter(e => e.estudianteId == estudianteId);

  const colorPrimario = [13, 110, 253];
  const colorSecundario = [108, 117, 125];
  const colorFondo = [245, 247, 250];
  const colorTexto = [50, 50, 50];

  let yPos = 15;
  const margenIzq = 12;
  const anchoMax = 190;

  // PORTADA
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, 210, 50, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('REPORTE DE EVALUACIÓN', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Atención a Disgrafía', 105, 32, { align: 'center' });

  yPos = 70;

  // INFORMACIÓN DEL ESTUDIANTE
  doc.setTextColor(...colorTexto);
  doc.setFillColor(...colorFondo);
  doc.setDrawColor(...colorPrimario);
  doc.setLineWidth(0.5);
  doc.rect(margenIzq, yPos, anchoMax, 40, 'FD');

  yPos += 5;

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('INFORMACIÓN DEL ESTUDIANTE', margenIzq + 3, yPos);

  yPos += 8;

  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.text('Nombre:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.nombre + ' ' + estudiante.apellido, margenIzq + 35, yPos);

  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text('Cédula:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.cedula, margenIzq + 35, yPos);

  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text('Nivel:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.nivel, margenIzq + 35, yPos);

  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text('Tipo de Disgrafía:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.tipoDisgrafia, margenIzq + 35, yPos);

  yPos += 15;

  // ESTADÍSTICAS
  const promedio = evaluacionesEstudiante.length > 0
    ? (evaluacionesEstudiante.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesEstudiante.length).toFixed(1)
    : '0.0';

  doc.setFillColor(...colorFondo);
  doc.rect(margenIzq, yPos, anchoMax, 25, 'FD');

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Promedio General: ' + promedio + '/10', margenIzq + 50, yPos + 8);
  doc.text('Total Evaluaciones: ' + evaluacionesEstudiante.length, margenIzq + 50, yPos + 15);

  yPos += 30;

  // TABLA DE EVALUACIONES
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('HISTORIAL DE EVALUACIONES', margenIzq, yPos);

  yPos += 8;

  // Encabezados tabla
  doc.setFillColor(...colorPrimario);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);

  const colAncho = anchoMax / 5;
  doc.text('Fecha', margenIzq + 2, yPos);
  doc.text('Actividad', margenIzq + 2 + colAncho, yPos);
  doc.text('Competencia', margenIzq + 2 + colAncho * 2, yPos);
  doc.text('Calif.', margenIzq + 2 + colAncho * 3, yPos);
  doc.text('%', margenIzq + 2 + colAncho * 4, yPos);

  yPos += 7;

  // Contenido tabla
  doc.setTextColor(...colorTexto);
  doc.setDrawColor(...colorSecundario);
  doc.setLineWidth(0.2);

  evaluacionesEstudiante.forEach((eval) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 15;
    }

    doc.setFontSize(7);
    doc.text(new Date(eval.fecha).toLocaleDateString('es-ES'), margenIzq + 2, yPos);
    doc.text(eval.actividad, margenIzq + 2 + colAncho, yPos);
    doc.text(eval.competencia, margenIzq + 2 + colAncho * 2, yPos);
    doc.text(eval.calificacion.toString(), margenIzq + 2 + colAncho * 3, yPos);
    doc.text(eval.porcentaje + '%', margenIzq + 2 + colAncho * 4, yPos);

    yPos += 6;
  });

  // OBSERVACIONES
  yPos += 10;

  if (yPos > 240) {
    doc.addPage();
    yPos = 15;
  }

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('OBSERVACIONES FINALES', margenIzq, yPos);

  yPos += 8;

  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  const observacionesTexto = evaluacionesEstudiante
    .filter(e => e.observaciones)
    .map(e => `• ${e.actividad}: ${e.observaciones}`)
    .join('\n');

  if (observacionesTexto) {
    const textos = doc.splitTextToSize(observacionesTexto, anchoMax - 5);
    doc.text(textos, margenIzq + 3, yPos, { maxWidth: anchoMax - 5 });
  } else {
    doc.text('No hay observaciones registradas', margenIzq + 3, yPos);
  }

  // Descargar
  const nombreArchivo = `reporte-${estudiante.nombre}-${Date.now()}.pdf`;
  doc.save(nombreArchivo);

  alert('✅ Reporte PDF descargado correctamente');
}

function generarPDFGeneral() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const colorPrimario = [13, 110, 253];
  const colorTexto = [50, 50, 50];

  let yPos = 15;
  const margenIzq = 12;
  const anchoMax = 190;

  // PORTADA
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, 210, 60, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.text('REPORTE GENERAL DE EVALUACIONES', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Guía Didáctica Digital - Disgrafía', 105, 35, { align: 'center' });

  doc.setFontSize(10);
  doc.text('Fecha: ' + new Date().toLocaleDateString('es-ES'), 105, 48, { align: 'center' });

  yPos = 80;

  // RESUMEN GENERAL
  doc.setTextColor(...colorTexto);
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('RESUMEN GENERAL', margenIzq, yPos);

  yPos += 8;

  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('Total de Estudiantes: ' + estudiantes.length, margenIzq + 5, yPos);
  yPos += 6;
  doc.text('Total de Evaluaciones: ' + evaluaciones.length, margenIzq + 5, yPos);
  yPos += 6;

  const promedioGeneral = evaluaciones.length > 0
    ? (evaluaciones.reduce((sum, e) => sum + e.calificacion, 0) / evaluaciones.length).toFixed(1)
    : '0.0';
  doc.text('Promedio General: ' + promedioGeneral + '/10', margenIzq + 5, yPos);

  yPos += 15;

  // TABLA POR ESTUDIANTE
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('EVALUACIONES POR ESTUDIANTE', margenIzq, yPos);

  yPos += 8;

  // Encabezados
  doc.setFillColor(...colorPrimario);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);

  doc.text('Estudiante', margenIzq + 2, yPos);
  doc.text('Evaluaciones', margenIzq + 60, yPos);
  doc.text('Promedio', margenIzq + 100, yPos);
  doc.text('Nivel', margenIzq + 140, yPos);

  yPos += 7;

  // Contenido
  doc.setTextColor(...colorTexto);

  estudiantes.forEach((est) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 15;
    }

    const evalEst = evaluaciones.filter(e => e.estudianteId === est.id);
    const promedio = evalEst.length > 0
      ? (evalEst.reduce((sum, e) => sum + e.calificacion, 0) / evalEst.length).toFixed(1)
      : 'N/A';

    doc.setFontSize(8);
    doc.text(est.nombre + ' ' + est.apellido, margenIzq + 2, yPos);
    doc.text(evalEst.length.toString(), margenIzq + 60, yPos);
    doc.text(promedio.toString(), margenIzq + 100, yPos);
    doc.text(est.nivel, margenIzq + 140, yPos);

    yPos += 6;
  });

  // Descargar
  const nombreArchivo = `reporte-general-${Date.now()}.pdf`;
  doc.save(nombreArchivo);

  alert('✅ Reporte general PDF descargado correctamente');
}

// ==================== GESTIÓN DE REPORTES GUARDADOS ====================

let reportesGuardados = [];

// Cargar reportes guardados al iniciar
function cargarReportesGuardados() {
  reportesGuardados = JSON.parse(localStorage.getItem('reportesGuardados')) || [];
  mostrarReportesGuardados();
}

function mostrarReportesGuardados() {
  const lista = document.getElementById('listaReportesGuardados');
  
  if (reportesGuardados.length === 0) {
    lista.innerHTML = '<p class="text-muted text-center">No hay reportes guardados</p>';
    document.getElementById('contadorReportes').textContent = '0';
    return;
  }

  let html = '';
  reportesGuardados.forEach((reporte, indice) => {
    const fecha = new Date(reporte.fechaGuardado).toLocaleDateString('es-ES');
    const hora = new Date(reporte.fechaGuardado).toLocaleTimeString('es-ES');
    
    html += `
      <div class="card mb-3 border-0 border-start border-4 border-primary">
        <div class="card-body p-3">
          <div class="row">
            <div class="col-md-8">
              <h6 class="card-title mb-1">
                <i class="bi bi-file-earmark-pdf"></i> ${reporte.nombreReporte}
              </h6>
              <p class="small text-muted mb-1">
                <i class="bi bi-calendar"></i> ${fecha} a las ${hora}
              </p>
              <p class="small mb-0">
                <span class="badge bg-info">${reporte.estudiantes} estudiantes</span>
                <span class="badge bg-success">${reporte.evaluaciones} evaluaciones</span>
              </p>
            </div>
            <div class="col-md-4 text-end">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary" onclick="verReporteGuardado(${indice})" title="Ver reporte">
                  <i class="bi bi-eye"></i> Ver
                </button>
                <button class="btn btn-outline-success" onclick="descargarReporteGuardado(${indice})" title="Descargar PDF">
                  <i class="bi bi-download"></i> Descargar
                </button>
                <button class="btn btn-outline-danger" onclick="eliminarReporteGuardado(${indice})" title="Eliminar reporte">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  lista.innerHTML = html;
  document.getElementById('contadorReportes').textContent = reportesGuardados.length;
}

function exportarReporteLocal() {
  const estudianteId = document.getElementById('estudianteReporte').value;
  
  let nombreReporte = '';
  let dataReporte = {};
  let numEstudiantes = 0;
  let numEvaluaciones = 0;

  if (estudianteId) {
    const estudiante = estudiantes.find(e => e.id == estudianteId);
    const evalEstudiante = evaluaciones.filter(e => e.estudianteId == estudianteId);
    nombreReporte = `Reporte - ${estudiante.nombre} ${estudiante.apellido}`;
    numEstudiantes = 1;
    numEvaluaciones = evalEstudiante.length;
    dataReporte = {
      tipo: 'individual',
      estudiante: estudiante,
      evaluaciones: evalEstudiante
    };
  } else {
    nombreReporte = `Reporte General - ${new Date().toLocaleDateString('es-ES')}`;
    numEstudiantes = estudiantes.length;
    numEvaluaciones = evaluaciones.length;
    dataReporte = {
      tipo: 'general',
      estudiantes: estudiantes,
      evaluaciones: evaluaciones
    };
  }

  const nuevoReporte = {
    id: Date.now(),
    nombreReporte: nombreReporte,
    fechaGuardado: new Date().toISOString(),
    estudiantes: numEstudiantes,
    evaluaciones: numEvaluaciones,
    data: dataReporte
  };

  reportesGuardados.push(nuevoReporte);
  localStorage.setItem('reportesGuardados', JSON.stringify(reportesGuardados));

  alert('✅ Reporte guardado correctamente');
  mostrarReportesGuardados();
}

function verReporteGuardado(indice) {
  const reporte = reportesGuardados[indice];
  
  if (reporte.data.tipo === 'individual') {
    const estudiante = reporte.data.estudiante;
    const evaluacionesEstudiante = reporte.data.evaluaciones;

    if (evaluacionesEstudiante.length === 0) {
      alert('Este estudiante no tiene evaluaciones en este reporte.');
      return;
    }

    const promedio = (evaluacionesEstudiante.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesEstudiante.length).toFixed(1);
    const promedioPorc = (evaluacionesEstudiante.reduce((sum, e) => sum + e.porcentaje, 0) / evaluacionesEstudiante.length).toFixed(1);

    let html = `
      <h5>${estudiante.nombre} ${estudiante.apellido}</h5>
      <p class="small text-muted">Guardado el: ${new Date(reporte.fechaGuardado).toLocaleDateString('es-ES')} a las ${new Date(reporte.fechaGuardado).toLocaleTimeString('es-ES')}</p>
      
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${promedio}</h4>
              <p class="text-muted small">Promedio Calificación</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${promedioPorc}%</h4>
              <p class="text-muted small">Promedio Porcentaje</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${evaluacionesEstudiante.length}</h4>
              <p class="text-muted small">Total Evaluaciones</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${estudiante.tipoDisgrafia}</h4>
              <p class="text-muted small">Tipo de Disgrafía</p>
            </div>
          </div>
        </div>
      </div>

      <h6>Evaluaciones en este Reporte</h6>
      <table class="table table-sm table-striped">
        <thead class="table-dark">
          <tr>
            <th>Fecha</th>
            <th>Actividad</th>
            <th>Competencia</th>
            <th>Calificación</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          ${evaluacionesEstudiante.map(e => `
            <tr>
              <td>${new Date(e.fecha).toLocaleDateString('es-ES')}</td>
              <td>${e.actividad}</td>
              <td>${e.competencia}</td>
              <td><span class="badge bg-${e.calificacion >= 7 ? 'success' : e.calificacion >= 5 ? 'warning' : 'danger'}">${e.calificacion}/10</span></td>
              <td>${e.porcentaje}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('reporteDetallado').innerHTML = html;
  } else {
    // Reporte general
    const estudiantesReporte = reporte.data.estudiantes;
    const evaluacionesReporte = reporte.data.evaluaciones;

    let html = `
      <h5>Reporte General</h5>
      <p class="small text-muted">Guardado el: ${new Date(reporte.fechaGuardado).toLocaleDateString('es-ES')} a las ${new Date(reporte.fechaGuardado).toLocaleTimeString('es-ES')}</p>
      
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${estudiantesReporte.length}</h4>
              <p class="text-muted small">Total Estudiantes</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${evaluacionesReporte.length}</h4>
              <p class="text-muted small">Total Evaluaciones</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${evaluacionesReporte.length > 0 ? (evaluacionesReporte.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesReporte.length).toFixed(1) : '0'}</h4>
              <p class="text-muted small">Promedio General</p>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card text-center">
            <div class="card-body">
              <h4>${estudiantesReporte.length > 0 ? Math.round((new Set(evaluacionesReporte.map(e => e.estudianteId)).size / estudiantesReporte.length) * 100) : 0}%</h4>
              <p class="text-muted small">Evaluados</p>
            </div>
          </div>
        </div>
      </div>

      <h6>Evaluaciones por Estudiante</h6>
      <table class="table table-sm table-striped">
        <thead class="table-dark">
          <tr>
            <th>Estudiante</th>
            <th>Evaluaciones</th>
            <th>Promedio</th>
            <th>Nivel</th>
          </tr>
        </thead>
        <tbody>
          ${estudiantesReporte.map(est => {
            const evalEst = evaluacionesReporte.filter(e => e.estudianteId === est.id);
            const promedio = evalEst.length > 0 ? (evalEst.reduce((sum, e) => sum + e.calificacion, 0) / evalEst.length).toFixed(1) : 'N/A';
            return `
              <tr>
                <td>${est.nombre} ${est.apellido}</td>
                <td>${evalEst.length}</td>
                <td><span class="badge bg-${promedio === 'N/A' ? 'secondary' : promedio >= 7 ? 'success' : promedio >= 5 ? 'warning' : 'danger'}">${promedio}</span></td>
                <td>${est.nivel}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    document.getElementById('reporteDetallado').innerHTML = html;
  }
}

function descargarReporteGuardado(indice) {
  const reporte = reportesGuardados[indice];
  
  if (reporte.data.tipo === 'individual') {
    generarPDFEstudianteGuardado(reporte);
  } else {
    generarPDFGeneralGuardado(reporte);
  }
}

function generarPDFEstudianteGuardado(reporte) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const estudiante = reporte.data.estudiante;
  const evaluacionesEstudiante = reporte.data.evaluaciones;

  const colorPrimario = [13, 110, 253];
  const colorSecundario = [108, 117, 125];
  const colorFondo = [245, 247, 250];
  const colorTexto = [50, 50, 50];

  let yPos = 15;
  const margenIzq = 12;
  const anchoMax = 190;

  // PORTADA
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, 210, 50, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('REPORTE DE EVALUACIÓN', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Atención a Disgrafía', 105, 32, { align: 'center' });

  yPos = 70;

  // INFORMACIÓN DEL ESTUDIANTE
  doc.setTextColor(...colorTexto);
  doc.setFillColor(...colorFondo);
  doc.setDrawColor(...colorPrimario);
  doc.setLineWidth(0.5);
  doc.rect(margenIzq, yPos, anchoMax, 40, 'FD');

  yPos += 5;

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('INFORMACIÓN DEL ESTUDIANTE', margenIzq + 3, yPos);

  yPos += 8;

  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.text('Nombre:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.nombre + ' ' + estudiante.apellido, margenIzq + 35, yPos);

  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text('Cédula:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.cedula, margenIzq + 35, yPos);

  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text('Nivel:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.nivel, margenIzq + 35, yPos);

  yPos += 7;
  doc.setFont(undefined, 'bold');
  doc.text('Tipo de Disgrafía:', margenIzq + 3, yPos);
  doc.setFont(undefined, 'normal');
  doc.text(estudiante.tipoDisgrafia, margenIzq + 35, yPos);

  yPos += 15;

  // ESTADÍSTICAS
  const promedio = evaluacionesEstudiante.length > 0
    ? (evaluacionesEstudiante.reduce((sum, e) => sum + e.calificacion, 0) / evaluacionesEstudiante.length).toFixed(1)
    : '0.0';

  doc.setFillColor(...colorFondo);
  doc.rect(margenIzq, yPos, anchoMax, 25, 'FD');

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Promedio General: ' + promedio + '/10', margenIzq + 50, yPos + 8);
  doc.text('Total Evaluaciones: ' + evaluacionesEstudiante.length, margenIzq + 50, yPos + 15);

  yPos += 30;

  // TABLA DE EVALUACIONES
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('HISTORIAL DE EVALUACIONES', margenIzq, yPos);

  yPos += 8;

  // Encabezados tabla
  doc.setFillColor(...colorPrimario);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);

  const colAncho = anchoMax / 5;
  doc.text('Fecha', margenIzq + 2, yPos);
  doc.text('Actividad', margenIzq + 2 + colAncho, yPos);
  doc.text('Competencia', margenIzq + 2 + colAncho * 2, yPos);
  doc.text('Calif.', margenIzq + 2 + colAncho * 3, yPos);
  doc.text('%', margenIzq + 2 + colAncho * 4, yPos);

  yPos += 7;

  // Contenido tabla
  doc.setTextColor(...colorTexto);
  doc.setDrawColor(...colorSecundario);
  doc.setLineWidth(0.2);

  evaluacionesEstudiante.forEach((eval) => {
    if (yPos > 260) {
      doc.addPage();
      yPos = 15;
    }

    doc.setFontSize(7);
    doc.text(new Date(eval.fecha).toLocaleDateString('es-ES'), margenIzq + 2, yPos);
    doc.text(eval.actividad, margenIzq + 2 + colAncho, yPos);
    doc.text(eval.competencia, margenIzq + 2 + colAncho * 2, yPos);
    doc.text(eval.calificacion.toString(), margenIzq + 2 + colAncho * 3, yPos);
    doc.text(eval.porcentaje + '%', margenIzq + 2 + colAncho * 4, yPos);

    yPos += 6;
  });

  // Descargar
  const nombreArchivo = `reporte-${estudiante.nombre.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
  doc.save(nombreArchivo);

  alert('✅ Reporte PDF descargado correctamente');
}

function generarPDFGeneralGuardado(reporte) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const colorPrimario = [13, 110, 253];
  const colorTexto = [50, 50, 50];

  let yPos = 15;
  const margenIzq = 12;
  const anchoMax = 190;

  // PORTADA
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, 210, 60, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.text('REPORTE GENERAL DE EVALUACIONES', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Guía Didáctica Digital - Disgrafía', 105, 35, { align: 'center' });

  doc.setFontSize(10);
  doc.text('Fecha: ' + new Date(reporte.fechaGuardado).toLocaleDateString('es-ES'), 105, 48, { align: 'center' });

  yPos = 80;

  // RESUMEN GENERAL
  doc.setTextColor(...colorTexto);
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('RESUMEN GENERAL', margenIzq, yPos);

  yPos += 8;

  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('Total de Estudiantes: ' + reporte.data.estudiantes.length, margenIzq + 5, yPos);
  yPos += 6;
  doc.text('Total de Evaluaciones: ' + reporte.data.evaluaciones.length, margenIzq + 5, yPos);
  yPos += 6;

  const promedioGeneral = reporte.data.evaluaciones.length > 0
    ? (reporte.data.evaluaciones.reduce((sum, e) => sum + e.calificacion, 0) / reporte.data.evaluaciones.length).toFixed(1)
    : '0.0';
  doc.text('Promedio General: ' + promedioGeneral + '/10', margenIzq + 5, yPos);

  yPos += 15;

  // TABLA POR ESTUDIANTE
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('EVALUACIONES POR ESTUDIANTE', margenIzq, yPos);

  yPos += 8;

  // Encabezados
  doc.setFillColor(...colorPrimario);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);

  doc.text('Estudiante', margenIzq + 2, yPos);
  doc.text('Evaluaciones', margenIzq + 60, yPos);
  doc.text('Promedio', margenIzq + 100, yPos);
  doc.text('Nivel', margenIzq + 140, yPos);

  yPos += 7;

  // Contenido
  doc.setTextColor(...colorTexto);

  reporte.data.estudiantes.forEach((est) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 15;
    }

    const evalEst = reporte.data.evaluaciones.filter(e => e.estudianteId === est.id);
    const promedio = evalEst.length > 0
      ? (evalEst.reduce((sum, e) => sum + e.calificacion, 0) / evalEst.length).toFixed(1)
      : 'N/A';

    doc.setFontSize(8);
    doc.text(est.nombre + ' ' + est.apellido, margenIzq + 2, yPos);
    doc.text(evalEst.length.toString(), margenIzq + 60, yPos);
    doc.text(promedio.toString(), margenIzq + 100, yPos);
    doc.text(est.nivel, margenIzq + 140, yPos);

    yPos += 6;
  });

  // Descargar
  const nombreArchivo = `reporte-general-${Date.now()}.pdf`;
  doc.save(nombreArchivo);

  alert('✅ Reporte general PDF descargado correctamente');
}

function eliminarReporteGuardado(indice) {
  const reporte = reportesGuardados[indice];
  
  if (confirm(`¿Estás seguro de que quieres eliminar el reporte "${reporte.nombreReporte}"?`)) {
    reportesGuardados.splice(indice, 1);
    localStorage.setItem('reportesGuardados', JSON.stringify(reportesGuardados));
    
    alert('✅ Reporte eliminado correctamente');
    mostrarReportesGuardados();
    document.getElementById('reporteDetallado').innerHTML = '<p class="text-muted text-center">Selecciona un estudiante para ver su reporte detallado</p>';
  }
}

function eliminarReportes() {
  if (reportesGuardados.length === 0) {
    alert('No hay reportes para eliminar');
    return;
  }

  if (confirm(`⚠️ Estás a punto de eliminar ${reportesGuardados.length} reporte(s).\n\n¿Estás seguro?`)) {
    if (confirm('Por favor, confirma nuevamente que deseas eliminar TODOS los reportes:')) {
      reportesGuardados = [];
      localStorage.setItem('reportesGuardados', JSON.stringify(reportesGuardados));
      
      alert('✅ Todos los reportes han sido eliminados');
      mostrarReportesGuardados();
    }
  }
}

function imprimirReporte() {
  const contenido = document.getElementById('reporteDetallado').innerHTML;
  
  if (contenido === '<p class="text-muted text-center">Selecciona un estudiante para ver su reporte detallado</p>') {
    alert('Por favor, selecciona un estudiante o reporte para imprimir');
    return;
  }

  const ventana = window.open('', '', 'height=500,width=800');
  ventana.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Imprimir Reporte</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body { padding: 20px; }
        @media print { body { padding: 0; } }
      </style>
    </head>
    <body>
      ${contenido}
      <script>
        window.print();
      </script>
    </body>
    </html>
  `);
  ventana.document.close();
}