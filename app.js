/* =====================================================================
   EvalAI · Mockups navegables por perfil
   Perfiles: Docente · Estudiante · Coordinación (UTP) · Apoderado (concepto) · Institución
   Teclas: H muestra/oculta la barra · ← → cambian de pantalla · M abre el mapa
   ===================================================================== */

// ===================== Datos de ejemplo =====================
const CURR = {
  'Matemática': {
    '5° básico': [
      { oa: 'OA 7 · Fracciones propias', ind: ['Representan fracciones propias de manera concreta y pictórica.', 'Comparan fracciones con igual denominador.'] },
      { oa: 'OA 11 · Números decimales', ind: ['Leen y escriben decimales hasta la milésima.', 'Ordenan números decimales en la recta numérica.'] }
    ],
    '6° básico': [
      { oa: 'OA 4 · Fracciones y números mixtos', ind: ['Convierten números mixtos en fracciones impropias.', 'Resuelven adiciones de fracciones con distinto denominador.'] },
      { oa: 'OA 7 · Razones', ind: ['Explican el concepto de razón con ejemplos de la vida diaria.', 'Identifican razones equivalentes.', 'Resuelven problemas que involucran razones.'] },
      { oa: 'OA 9 · Porcentajes', ind: ['Calculan el porcentaje de una cantidad.', 'Relacionan porcentajes con fracciones y decimales.'] }
    ]
  },
  'Lenguaje y Comunicación': {
    '5° básico': [{ oa: 'OA 3 · Lectura de textos variados', ind: ['Extraen información explícita de un texto.', 'Infieren el propósito del autor.'] }],
    '6° básico': [
      { oa: 'OA 4 · Textos literarios', ind: ['Describen a los personajes a partir de sus acciones.', 'Interpretan el lenguaje figurado.'] },
      { oa: 'OA 6 · Textos no literarios', ind: ['Identifican la idea principal de un texto informativo.', 'Relacionan la información del texto con imágenes y tablas.'] }
    ]
  }
};
const IND = ['I1 · Explican el concepto de razón', 'I2 · Identifican razones equivalentes', 'I3 · Resuelven problemas con razones'];
const Q0 = [
  { t: 'En un curso hay 12 niñas y 18 niños. ¿Cuál es la razón entre niñas y niños?', a: ['12 : 30', '2 : 3', '3 : 2', '18 : 12'], c: 1, i: 0 },
  { t: 'La razón entre lápices rojos y azules es 3 : 5. Si hay 15 lápices azules, ¿cuántos rojos hay?', a: ['5', '8', '9', '25'], c: 2, i: 2 },
  { t: '¿Cuál de estas razones es equivalente a 4 : 6?', a: ['2 : 3', '3 : 4', '6 : 4', '4 : 10'], c: 0, i: 1 },
  { t: 'Una receta usa 2 tazas de harina por cada taza de leche. ¿Qué razón hay entre harina y leche?', a: ['1 : 2', '2 : 1', '2 : 3', '3 : 1'], c: 1, i: 0 },
  { t: 'Un plano tiene escala 1 : 100. Si una pieza mide 4 cm en el plano, ¿cuánto mide en la realidad?', a: ['40 cm', '104 cm', '400 cm', '4.000 cm'], c: 2, i: 2 },
  { t: 'En una bolsa hay 5 bolitas verdes y 10 amarillas. ¿Qué razón equivalente representa verdes a amarillas?', a: ['1 : 2', '1 : 3', '2 : 1', '5 : 15'], c: 0, i: 1 },
  { t: 'En un refugio la razón entre perros y gatos es 4 : 1. Si hay 20 animales, ¿cuántos gatos hay?', a: ['4', '5', '16', '1'], c: 0, i: 2 },
  { t: '¿Qué significa que la razón entre cuadrados y círculos sea 3 : 4?', a: ['Por cada 3 cuadrados hay 4 círculos.', 'Por cada 3 círculos hay 4 cuadrados.', 'Siempre hay 7 figuras en total.', 'Hay más cuadrados que círculos.'], c: 0, i: 0 },
  { t: 'Juan lee 2 páginas en 5 minutos. A ese ritmo, ¿cuántas páginas lee en 20 minutos?', a: ['4', '8', '10', '40'], c: 1, i: 2 },
  { t: 'En un curso de 30 estudiantes, la razón entre quienes traen colación y quienes no es 2 : 1. ¿Cuántos traen colación?', a: ['10', '15', '20', '25'], c: 2, i: 2 }
];
// Banco para «Reemplazar pregunta» (CA-1.3-2): una pregunta nueva para el mismo indicador
const REPL = [
  [{ t: '¿Qué representa la razón 5 : 2 entre manzanas y peras?', a: ['Por cada 5 manzanas hay 2 peras.', 'Hay 7 frutas en total.', 'Por cada 5 peras hay 2 manzanas.', 'Hay 3 manzanas más que peras.'], c: 0, i: 0 },
   { t: 'En una sala hay 3 ventanas por cada puerta. ¿Qué razón hay entre puertas y ventanas?', a: ['3 : 1', '1 : 3', '1 : 4', '4 : 1'], c: 1, i: 0 }],
  [{ t: '¿Cuál razón NO es equivalente a 6 : 9?', a: ['2 : 3', '12 : 18', '3 : 2', '18 : 27'], c: 2, i: 1 },
   { t: '¿Qué número completa la razón equivalente 3 : 7 = 9 : __?', a: ['13', '21', '27', '63'], c: 1, i: 1 }],
  [{ t: 'Una mezcla usa 3 litros de pintura blanca por cada 2 de azul. ¿Cuánta azul se necesita para 12 litros de blanca?', a: ['6', '8', '10', '18'], c: 1, i: 2 },
   { t: 'Un auto recorre 150 km con 10 litros. ¿Cuántos litros necesita para 450 km?', a: ['15', '30', '45', '300'], c: 1, i: 2 }]
];
const STUDENTS = ['Martina González', 'Benjamín Rojas', 'Sofía Muñoz', 'Agustín Díaz', 'Isidora Pérez', 'Tomás Soto', 'Florencia Silva', 'Vicente Contreras'];
const COURSES = ['6° A', '6° B', '6° C'];
// Colores categóricos fijos por curso: el color sigue al curso, nunca a su posición
const COURSE_COLOR = { '6° A': '#2a78d6', '6° B': '#eb6834', '6° C': '#1baf7a' };
// Modo captura (?shot): sin barra, sin sombras ni animaciones, fondo blanco
const SHOT = /[?&]shot\b/.test(location.search);
if (SHOT) document.documentElement.classList.add('shot');
const NAVY = '#1F3864', GOLD = '#C99A2E', INK2 = '#52514e', GRID = '#eef0f3';
const REPORT = [
  ['OA 4 · I1', 'Convierten números mixtos en fracciones impropias', [86, 81, 74]],
  ['OA 4 · I2', 'Resuelven adiciones de fracciones con distinto denominador', [62, 55, 47]],
  ['OA 7 · I1', 'Explican el concepto de razón', [91, 84, 88]],
  ['OA 7 · I2', 'Identifican razones equivalentes', [44, 52, 38]],
  ['OA 7 · I3', 'Resuelven problemas que involucran razones', [71, 66, 58]],
  ['OA 9 · I1', 'Calculan el porcentaje de una cantidad', [79, 83, 69]]
];
const MONTHS = ['Agosto', 'Septiembre', 'Octubre', 'Noviembre'];
const PERIODS = ['2° semestre 2026', '1° semestre 2026', '2025'];

// ---- Generadores deterministas (mismos datos en cada carga) ----
function rng(seed) { let h = 0; for (const ch of String(seed)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return () => { h = (h * 1103515245 + 12345) >>> 0; return (h >>> 8) / 16777216; }; }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const avg = (a) => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0;

const FIRST = ['Martina', 'Benjamín', 'Sofía', 'Agustín', 'Isidora', 'Tomás', 'Florencia', 'Vicente', 'Josefa', 'Matías', 'Emilia', 'Lucas', 'Antonella', 'Joaquín', 'Catalina', 'Maximiliano', 'Trinidad', 'Gaspar', 'Amanda', 'Cristóbal', 'Javiera', 'Felipe', 'Valentina', 'Diego', 'Renata', 'Bastián', 'Ignacia', 'Nicolás', 'Maite', 'Alonso', 'Rafaela', 'Simón'];
const LAST = ['González', 'Rojas', 'Muñoz', 'Díaz', 'Pérez', 'Soto', 'Silva', 'Contreras', 'Morales', 'López', 'Fuentes', 'Castillo', 'Araya', 'Espinoza', 'Reyes', 'Torres'];
const COURSE_META = { '6° A': { mean: 7.0, done: 28, seed: 3, mode: 'Impresa' }, '6° B': { mean: 6.4, done: 12, seed: 11, mode: 'En línea' }, '6° C': { mean: 5.7, done: 31, seed: 7, mode: 'Impresa' } };
function roster(course) {
  const m = COURSE_META[course], r = rng(course);
  return FIRST.map((f, i) => {
    const name = i < STUDENTS.length && course === '6° A' ? STUDENTS[i] : `${f} ${LAST[(i * 7 + m.seed) % LAST.length]}`;
    let score = clamp(Math.round(m.mean + (r() + r() + r() - 1.5) * 3.4), 1, 10);
    if (course === '6° A' && i === 0) score = 7;
    const done = (i * 5 + m.seed) % 32 < m.done;
    return { name, score, done };
  });
}
// Tendencia mensual por indicador y curso (la cifra de noviembre coincide con el reporte)
function trend(indIdx, course) {
  const c = COURSES.indexOf(course), fin = REPORT[indIdx][2][c];
  const step = indIdx === 3 && c === 2 ? -3 : ((indIdx + c) % 3) + 2 + (indIdx === 3 && c === 1 ? 4 : 0);
  return MONTHS.map((_, k) => clamp(fin - (3 - k) * step + (k === 1 ? (c - 1) * 2 : 0), 15, 100));
}

// ===================== Estado =====================
const S0 = () => ({
  asig: '', nivel: '', oa: '', ind: [], n: 10, dif: 'Intermedia', newInd: false,
  qs: JSON.parse(JSON.stringify(Q0)), editIdx: 1, replCount: 0,
  pubError: false, published: false, hideAns: false, online: true, printed: true,
  student: 0, cam: 'encuadre', illegible: 'qr',
  course: '6° A', resTab: 'estudiantes',
  semaforo: false, rep: { asig: 'Matemática', nivel: '6° básico', curso: 'Todos', periodo: PERIODS[0] },
  trendInd: 3, exportFmt: 'xlsx',
  ans: [1, 2, null, 1, 0, null, 0, 0, 1, 2], cur: 2, sent: false, animate: true,
  instAsig: 'Matemática', instNivel: '6° básico', instOa: 1, importing: false, invite: false
});
const S = S0();

// ===================== Utilidades UI =====================
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.add('hidden'), 2600); }
const L = 'ABCD';
const initials = (n) => n.split(' ').map((x) => x[0]).slice(0, 2).join('');
function logo(light) {
  return `<div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg ${light ? 'bg-white/15' : 'bg-navy'} grid place-items-center text-white font-bold">E</div><span class="font-bold text-lg ${light ? 'text-white' : 'text-navy'}">Eval<span class="text-gold">AI</span></span></div>`;
}
function btn(label, cls = '', attrs = '') { return `<button ${attrs} class="px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap ${cls}">${label}</button>`; }
const P1 = 'bg-navy text-white hover:bg-navy-900', P2 = 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100';
const card = (inner, cls = '') => `<div class="bg-white rounded-xl border border-slate-200 ${cls}">${inner}</div>`;
const kpi = (label, value, sub = '') => card(`<div class="text-sm text-slate-500">${label}</div><div class="text-3xl font-bold text-navy mt-1">${value}</div>${sub ? `<div class="text-xs text-slate-500 mt-1">${sub}</div>` : ''}`, 'p-5');
const chartBox = (id, h) => `<div class="chart-box" style="height:${h}px"><canvas id="${id}" role="img"></canvas></div>`;
const legend = (items) => `<div class="flex flex-wrap gap-4 text-xs text-slate-600">${items.map(([c, t, dash]) => `<span class="flex items-center gap-1.5">${dash ? `<span style="width:14px;border-top:2px dashed ${c}"></span>` : `<span class="legend-sw" style="background:${c}"></span>`}${t}</span>`).join('')}</div>`;

function semColor(v) { return v < 50 ? 'bg-red-100 text-red-800' : v < 80 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'; }
function dot(v) { return v < 50 ? 'bg-red-500' : v < 80 ? 'bg-amber-400' : 'bg-emerald-500'; }
function semLabel(v) { return v < 50 ? 'Bajo' : v < 80 ? 'Medio' : 'Logrado'; }
const pill = (v) => `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold text-xs ${semColor(v)}"><span class="w-2 h-2 rounded-full ${dot(v)}"></span>${v}%</span>`;

function qr(seed, size = 84) {
  let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const n = 21, cell = size / n; let r = '';
  const finder = (x, y) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    let on;
    if (finder(x, y)) { const fx = x >= n - 7 ? x - (n - 7) : x, fy = y >= n - 7 ? y - (n - 7) : y; on = fx === 0 || fx === 6 || fy === 0 || fy === 6 || (fx >= 2 && fx <= 4 && fy >= 2 && fy <= 4); }
    else { h = (h * 1103515245 + 12345) >>> 0; on = (h >> 16) % 2 === 0; }
    if (on) r += `<rect x="${x * cell}" y="${y * cell}" width="${cell + .2}" height="${cell + .2}"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="#111">${r}</svg>`;
}

// ===================== Gráficos (Chart.js) =====================
let CHARTS = [];
function killCharts() { CHARTS.forEach((c) => c.destroy()); CHARTS = []; }
function chart(id, cfg) {
  const el = document.getElementById(id);
  if (!el) return;
  if (!window.Chart) { el.parentElement.innerHTML = '<div class="h-full grid place-items-center text-xs text-slate-400 border border-dashed rounded-lg">Gráfico no disponible sin conexión (Chart.js)</div>'; return; }
  CHARTS.push(new Chart(el, cfg));
}
// Líneas de referencia del semáforo (50% y 80%)
const thresholdPlugin = {
  id: 'thresholds',
  afterDatasetsDraw(c, _a, o) {
    if (!o || !o.lines) return;
    const horiz = c.options.indexAxis === 'y', sc = horiz ? c.scales.x : c.scales.y, a = c.chartArea, ctx = c.ctx;
    o.lines.forEach((l) => {
      const p = sc.getPixelForValue(l.v);
      ctx.save(); ctx.strokeStyle = l.c; ctx.setLineDash([4, 4]); ctx.lineWidth = 1; ctx.beginPath();
      if (horiz) { ctx.moveTo(p, a.top); ctx.lineTo(p, a.bottom); } else { ctx.moveTo(a.left, p); ctx.lineTo(a.right, p); }
      ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = l.c; ctx.font = '600 10px Inter, sans-serif';
      if (horiz) ctx.fillText(l.t, p + 4, a.bottom - 4); else ctx.fillText(l.t, a.right - ctx.measureText(l.t).width - 2, p - 4);
      ctx.restore();
    });
  }
};
const SEM_LINES = { lines: [{ v: 50, c: '#dc2626', t: '50%' }, { v: 80, c: '#059669', t: '80%' }] };
function opts({ pct = true, legend = false, horizontal = false, max, stacked = false, thresholds = null, tipSuffix } = {}) {
  const suf = tipSuffix != null ? tipSuffix : pct ? '%' : '';
  const val = { beginAtZero: true, grid: { color: GRID }, border: { display: false }, ticks: { color: '#64748b', font: { size: 11 } }, stacked };
  if (pct) { val.max = 100; val.ticks.callback = (v) => v + '%'; val.ticks.stepSize = 25; }
  if (max != null) val.max = max;
  const cat = { grid: { display: false }, border: { color: '#cbd5e1' }, ticks: { color: '#475569', font: { size: 11 } }, stacked };
  return {
    responsive: true, maintainAspectRatio: false, animation: SHOT ? false : { duration: 350 },
    indexAxis: horizontal ? 'y' : 'x',
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: legend, position: 'top', align: 'start', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, pointStyle: 'rectRounded', color: '#334155', font: { size: 11 } } },
      tooltip: { backgroundColor: '#0f172a', padding: 10, cornerRadius: 8, titleFont: { weight: '600' }, boxPadding: 4,
        callbacks: { label: (c) => ` ${c.dataset.label}: ${c.formattedValue}${suf}` } },
      thresholds
    },
    scales: horizontal ? { x: val, y: cat } : { x: cat, y: val }
  };
}
const barDs = (label, data, color, extra = {}) => ({ label, data, backgroundColor: color, borderRadius: 4, borderSkipped: 'start', maxBarThickness: 22, categoryPercentage: .72, barPercentage: .88, ...extra });
const lineDs = (label, data, color, extra = {}) => ({ label, data, borderColor: color, backgroundColor: color, borderWidth: 2, pointRadius: 4, pointHoverRadius: 6, pointBorderColor: '#fff', pointBorderWidth: 2, tension: .25, ...extra });

// ===================== Marcos por perfil =====================
const ROLES = {
  doc: { user: 'Carla Rojas', label: 'Docente · Matemática', nav: [['Inicio', 'P-01'], ['Nueva evaluación', 'P-02'], ['Corregir hojas', 'P-08'], ['Resultados del curso', 'P-15']] },
  utp: { user: 'Patricia Leiva', label: 'Coordinación académica (UTP)', nav: [['Reporte de logro', 'P-11'], ['Tendencias', 'P-16'], ['Exportar', 'P-17']] },
  inst: { user: 'Rodrigo Fuentes', label: 'Encargado institucional', nav: [['Base curricular', 'P-22'], ['Cursos y cuentas', 'P-23']] }
};
function desktop(role, body, active, overlay = '') {
  const R = ROLES[role];
  return `<div id="capture" class="w-[1200px] min-h-[720px] bg-slate-50 rounded-xl overflow-hidden sheet-shadow flex">
    <aside class="w-56 bg-navy text-white p-5 flex flex-col gap-6 shrink-0">
      ${logo(true)}
      <nav class="flex flex-col gap-1 text-sm">${R.nav.map(([n, id]) => `<a data-go="${id}" class="nav-item ${n === active ? 'on' : ''}"><span class="nav-dot"></span>${n}</a>`).join('')}</nav>
      <div class="mt-auto text-xs text-white/60 leading-relaxed">Colegio Alerce Andino<br><span class="text-white/40">2° semestre 2026</span></div>
    </aside>
    <div class="flex-1 flex flex-col relative min-w-0">
      <header class="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div class="text-sm text-slate-500">${R.label}</div>
        <div class="flex items-center gap-4"><span class="relative text-slate-400 text-lg">🔔${role === 'doc' ? '<span class="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-gold"></span>' : ''}</span><span class="text-sm font-medium">${R.user}</span><div class="w-9 h-9 rounded-full bg-gold/20 text-gold grid place-items-center font-bold">${initials(R.user)}</div></div>
      </header>
      <section class="flex-1 p-8 fade-in">${body}</section>
      ${overlay}
    </div>
  </div>`;
}
function phone(body, dark) {
  return `<div id="capture" class="phone sheet-shadow ${dark ? 'bg-slate-900' : ''}"><div class="h-full flex flex-col ${dark ? 'text-white' : ''}">
    <div class="h-10 px-6 pt-3 flex justify-between text-xs shrink-0 ${dark ? 'text-white/80' : 'text-slate-500'}"><span>19:42</span><span>●●● 5G ▮</span></div>
    ${body}</div></div>`;
}
function student(body, active = 'Mis evaluaciones') {
  return `<div id="capture" class="w-[1000px] min-h-[680px] bg-slate-50 rounded-xl overflow-hidden sheet-shadow flex flex-col">
    <header class="h-16 bg-navy px-8 flex items-center justify-between shrink-0">
      <div class="flex items-center gap-8">${logo(true)}<nav class="flex gap-1 text-sm">${[['Mis evaluaciones', 'P-18'], ['Mis resultados', 'P-19']].map(([n, id]) => `<a data-go="${id}" class="px-3 py-1.5 rounded-lg ${n === active ? 'bg-white/15 text-white font-semibold' : 'text-white/70 hover:text-white'}">${n}</a>`).join('')}</nav></div>
      <span class="text-white/80 text-sm flex items-center gap-2">Martina González · 6° A <span class="w-8 h-8 rounded-full bg-white/15 grid place-items-center text-xs font-bold">MG</span></span></header>
    <section class="flex-1 p-10 fade-in">${body}</section></div>`;
}
const conceptBanner = (txt) => `<div class="concept-ribbon rounded-lg px-3 py-2 text-[11px] font-semibold">Concepto · fuera del MVP — ${txt}</div>`;

// ===================== Perfiles =====================
const PROFILES = [
  { k: 'doc', name: 'Docente', who: 'Carla Rojas', role: 'Usuario principal', need: 'Generar y corregir evaluaciones alineadas al OA en minutos.' },
  { k: 'est', name: 'Estudiante', who: 'Martina González', role: 'Usuario final', need: 'Rendir sin errores y conocer su resultado el mismo día.' },
  { k: 'utp', name: 'Coordinación (UTP)', who: 'Patricia Leiva', role: 'Usuario de análisis', need: 'Ver el logro por OA e indicador en todos los cursos.' },
  { k: 'apo', name: 'Apoderado', who: 'Claudia González', role: 'Usuario indirecto · fuera del MVP', need: 'Acompañar el aprendizaje de su pupilo/a.', concept: true },
  { k: 'inst', name: 'Institución', who: 'Rodrigo Fuentes', role: 'Cliente · encargado', need: 'Estandarizar el proceso: currículum, cursos y cuentas.' }
];

// ===================== Pantallas =====================
const SCREENS = [
  // ------------------------------------------------------------------ MAPA
  { id: 'P-00', p: 'map', name: 'Mapa de pantallas', hu: 'Índice', hint: 'Punto de partida: elige un perfil y una pantalla. Tecla M vuelve aquí; H muestra u oculta la barra superior.', render() {
    const colors = { doc: 'bg-navy text-white', est: 'bg-sky-600 text-white', utp: 'bg-gold text-slate-900', apo: 'bg-slate-300 text-slate-700', inst: 'bg-emerald-700 text-white' };
    return `<div id="capture" class="w-[1240px] bg-slate-50 rounded-xl sheet-shadow p-10">
      <div class="flex items-end justify-between mb-8"><div>${logo(false)}<h1 class="text-3xl font-bold text-navy mt-4">Mockups por perfil</h1>
      <p class="text-slate-500 mt-1">${SCREENS.length - 1} pantallas navegables · los botones dentro de cada mockup también llevan a la siguiente pantalla del flujo.</p></div>
      <div class="text-xs text-slate-500 bg-white border rounded-lg px-4 py-3 leading-relaxed"><b class="text-slate-700">Atajos</b><br>H · mostrar/ocultar barra superior<br>← → · pantalla anterior / siguiente<br>M · volver a este mapa</div></div>
      <div class="grid grid-cols-5 gap-4">${PROFILES.map((pr) => `
        <div class="bg-white rounded-xl border ${pr.concept ? 'border-dashed border-slate-300' : 'border-slate-200'} p-4 flex flex-col">
          <div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full grid place-items-center font-bold text-sm ${colors[pr.k]}">${initials(pr.who)}</div>
          <div><div class="font-bold text-navy leading-tight">${pr.name}</div><div class="text-[11px] text-slate-500">${pr.who}</div></div></div>
          <div class="text-[11px] mt-3 ${pr.concept ? 'concept-ribbon rounded px-2 py-1 font-semibold' : 'text-slate-500'}">${pr.role}</div>
          <p class="text-xs text-slate-600 mt-2 min-h-[2.5rem]">${pr.need}</p>
          <div class="mt-3 space-y-1.5">${SCREENS.filter((s) => s.p === pr.k).map((s) => `<button data-go="${s.id}" class="w-full text-left rounded-lg border border-slate-200 hover:border-navy hover:bg-navy-50 px-2.5 py-2"><div class="text-[11px] font-bold text-navy">${s.id} <span class="font-normal text-slate-400">· ${s.hu}</span></div><div class="text-xs">${s.name}</div></button>`).join('')}</div>
        </div>`).join('')}</div>
      <div class="mt-6 grid grid-cols-3 gap-4 text-xs text-slate-600">
        <div class="bg-white rounded-lg border p-3"><b class="text-navy">Flujo impreso:</b> P-01 → P-02 → P-03 → P-04 → P-06 → P-07 → P-08 → P-09 → P-15 → P-11</div>
        <div class="bg-white rounded-lg border p-3"><b class="text-navy">Flujo en línea:</b> P-06 → P-18 → P-12 → P-13 → P-19 → P-11</div>
        <div class="bg-white rounded-lg border p-3"><b class="text-navy">Preparación:</b> P-22 (currículum) y P-23 (cursos y cuentas) habilitan P-02</div>
      </div></div>`;
  } },

  // ------------------------------------------------------------------ DOCENTE
  { id: 'P-01', p: 'doc', name: 'Panel del docente', hu: 'HU-1.1', hint: 'Resumen con gráficos de logro por curso y hojas corregidas. «Nueva evaluación» va a P-02; «Abrir» en una corregida va a P-15.', render() {
    const rows = [['Razones', '6° A', 'Corregida', '28 de 32 hojas', 'P-15'], ['Porcentajes', '6° B', 'Publicada', 'En línea · 12 de 31 respuestas', 'P-15'], ['Fracciones y números mixtos', '6° C', 'Corregida', '31 de 32 hojas', 'P-15'], ['Comprensión de textos literarios', '6° A', 'Borrador', '—', 'P-04']];
    const badge = { Corregida: 'bg-emerald-100 text-emerald-800', Publicada: 'bg-navy-50 text-navy', Borrador: 'bg-slate-200 text-slate-700' };
    return desktop('doc', `
      <div class="flex items-end justify-between mb-6"><div><h1 class="text-2xl font-bold text-navy">Hola, Carla</h1><p class="text-slate-500">Tienes 4 hojas pendientes de corregir en 6° A.</p></div>
      ${btn('+ Nueva evaluación', P1 + ' px-5 py-3 text-base', 'data-go="P-02"')}</div>
      <div class="grid grid-cols-4 gap-4 mb-6">${kpi('Evaluaciones creadas', '12', '3 este mes')}${kpi('Hojas corregidas', '214', '96% leídas a la primera')}${kpi('Logro promedio', '68%', '+5 pts. vs. agosto')}${kpi('Horas ahorradas', '9,5', 'estimado del semestre')}</div>
      <div class="grid grid-cols-5 gap-4 mb-6">
        ${card(`<div class="flex justify-between items-start mb-3"><div><div class="font-semibold">Logro promedio por evaluación</div><div class="text-xs text-slate-500">Matemática · mis tres cursos</div></div>${legend(COURSES.map((c) => [COURSE_COLOR[c], c]))}</div>${chartBox('cDocTrend', 200)}`, 'p-5 col-span-3')}
        ${card(`<div class="font-semibold">Hojas corregidas por semana</div><div class="text-xs text-slate-500 mb-3">Fotos procesadas con el celular</div>${chartBox('cDocWeek', 200)}`, 'p-5 col-span-2')}
      </div>
      ${card(`<div class="px-6 py-4 font-semibold border-b">Mis evaluaciones</div>
      <table class="w-full text-sm"><thead class="bg-slate-50 text-slate-500"><tr><th class="text-left px-6 py-3">Evaluación</th><th class="text-left">Curso</th><th class="text-left">Estado</th><th class="text-left">Avance</th><th></th></tr></thead>
      <tbody>${rows.map((r) => `<tr class="border-t"><td class="px-6 py-3.5 font-medium">${r[0]}</td><td>${r[1]}</td><td><span class="px-2 py-1 rounded-full text-xs font-semibold ${badge[r[2]]}">${r[2]}</span></td><td class="text-slate-500">${r[3]}</td><td class="pr-6 text-right"><a data-go="${r[4]}" data-course="${r[1]}" class="text-navy font-semibold">Abrir</a></td></tr>`).join('')}</tbody></table>`, 'overflow-hidden')}`, 'Inicio');
  }, bind() {
    $$('[data-course]').forEach((a) => a.addEventListener('click', () => { S.course = a.dataset.course; }, true));
    const evals = ['Decimales', 'Fracciones', 'Mixtos', 'Porcentajes', 'Razones'];
    const data = { '6° A': [61, 64, 70, 72, 73], '6° B': [58, 63, 61, 67, 69], '6° C': [52, 55, 60, 58, 63] };
    chart('cDocTrend', { type: 'line', data: { labels: evals, datasets: COURSES.map((c) => lineDs(c, data[c], COURSE_COLOR[c])) }, options: opts({ max: 100 }) });
    chart('cDocWeek', { type: 'bar', data: { labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'], datasets: [barDs('Hojas', [12, 0, 31, 28, 18, 32, 64, 29], NAVY)] }, options: opts({ pct: false, tipSuffix: ' hojas' }) });
  } },

  { id: 'P-02', p: 'doc', name: 'Nueva evaluación', hu: 'HU-1.1 · HU-1.2.2', hint: 'Asignatura y nivel filtran los OA (CA-1.1-1). «Generar» requiere al menos un indicador (CA-1.1-2) y entre 5 y 30 preguntas (CA-1.2-2). Puedes crear un indicador propio (RF-2).',
    states: [['Vacía', () => { Object.assign(S, { asig: '', nivel: '', oa: '', ind: [], n: 10, newInd: false }); }], ['Completa', () => { Object.assign(S, { asig: 'Matemática', nivel: '6° básico', oa: 'OA 7 · Razones', ind: [0, 1, 2], n: 10, dif: 'Intermedia' }); }], ['Cantidad inválida', () => { Object.assign(S, { asig: 'Matemática', nivel: '6° básico', oa: 'OA 7 · Razones', ind: [1], n: 40 }); }]],
    render() {
    const niveles = S.asig ? Object.keys(CURR[S.asig]) : [];
    const oas = S.asig && S.nivel ? CURR[S.asig][S.nivel] : [];
    const oaObj = oas.find((o) => o.oa === S.oa);
    const nOk = S.n >= 5 && S.n <= 30;
    const ok = S.ind.length > 0 && nOk;
    const sel = (id, label, opts, val, dis) => `<label class="block"><span class="text-sm font-medium text-slate-600">${label}</span>
      <select id="${id}" ${dis ? 'disabled' : ''} class="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 ${dis ? 'bg-slate-100 text-slate-400' : ''}">
      <option value="">Selecciona…</option>${opts.map((o) => `<option ${o === val ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`;
    const indList = oaObj ? oaObj.ind.map((t, i) => `<label class="flex items-start gap-3 p-3 rounded-lg border ${S.ind.includes(i) ? 'border-navy bg-navy-50' : 'border-slate-200'} cursor-pointer"><input type="checkbox" data-ind="${i}" ${S.ind.includes(i) ? 'checked' : ''} class="mt-1 accent-[#1F3864]"><span class="text-sm"><b class="text-navy">I${i + 1}</b> · ${t}${(oaObj.own || []).includes(i) ? ' <span class="ml-1 text-[10px] font-semibold bg-gold-50 text-gold rounded px-1.5 py-0.5">Propio</span>' : ''}</span></label>`).join('')
      + (S.newInd ? `<div class="flex gap-2 p-3 rounded-lg border border-dashed border-gold bg-gold-50/50"><input id="newIndTxt" placeholder="Escribe el indicador de logro propio…" class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm">${btn('Agregar', P1, 'id="addInd"')}${btn('✕', P2, 'id="cancelInd"')}</div>`
        : `<button id="openInd" class="text-sm text-navy font-semibold px-1">+ Crear indicador propio</button>`)
      : '<div class="text-sm text-slate-400 p-3 border border-dashed rounded-lg">Elige un OA para ver sus indicadores.</div>';
    return desktop('doc', `
      <div class="text-sm text-slate-500 mb-1">Inicio › Nueva evaluación</div>
      <h1 class="text-2xl font-bold text-navy mb-6">Nueva evaluación</h1>
      <div class="flex gap-6">
        <div class="flex-1 bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <div class="grid grid-cols-2 gap-4">${sel('sAsig', '1. Asignatura', Object.keys(CURR), S.asig)}${sel('sNivel', '2. Nivel', niveles, S.nivel, !S.asig)}</div>
          ${sel('sOa', '3. Objetivo de aprendizaje (OA)', oas.map((o) => o.oa), S.oa, !S.nivel)}
          <div><span class="text-sm font-medium text-slate-600">4. Indicadores de logro</span><div class="mt-2 space-y-2">${indList}</div></div>
        </div>
        <div class="w-80 space-y-4">
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <div class="font-semibold mb-4">5. Configuración</div>
            <label class="block text-sm"><span class="text-slate-600">Cantidad de preguntas</span>
              <input id="nQ" type="number" min="5" max="30" value="${S.n}" class="mt-1 w-full rounded-lg border ${nOk ? 'border-slate-300' : 'border-red-400 bg-red-50'} px-3 py-2"></label>
            ${nOk ? '<p class="text-xs text-slate-400 mt-1">Entre 5 y 30.</p>' : '<p class="text-xs text-red-700 mt-1">Debe estar entre 5 y 30 preguntas. No se generará la evaluación.</p>'}
            <div class="text-sm text-slate-600 mt-4 mb-1">Dificultad</div>
            <div class="grid grid-cols-3 gap-1 bg-slate-100 rounded-lg p-1">${['Básica', 'Intermedia', 'Avanzada'].map((d) => `<button data-dif="${d}" class="text-xs py-1.5 rounded-md ${S.dif === d ? 'bg-white shadow font-semibold text-navy' : 'text-slate-500'}">${d}</button>`).join('')}</div>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <div class="font-semibold mb-3">Resumen</div>
            <dl class="text-sm space-y-2"><div class="flex justify-between"><dt class="text-slate-500">Preguntas</dt><dd>${S.n}</dd></div><div class="flex justify-between"><dt class="text-slate-500">Dificultad</dt><dd>${S.dif}</dd></div><div class="flex justify-between"><dt class="text-slate-500">Indicadores</dt><dd>${S.ind.length}</dd></div><div class="flex justify-between"><dt class="text-slate-500">Alternativas</dt><dd>4 por pregunta</dd></div></dl>
            ${btn('Generar preguntas', (ok ? P1 : 'bg-slate-200 text-slate-400 cursor-not-allowed') + ' w-full mt-6 py-3', ok ? 'id="gen"' : 'disabled')}
            ${S.ind.length ? '' : '<p class="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mt-3">Selecciona al menos un indicador de logro para generar preguntas.</p>'}
          </div>
        </div>
      </div>`, 'Nueva evaluación');
  },
    bind() {
      const on = (id, f) => { const e = $('#' + id); if (e) e.onchange = (ev) => { f(ev.target.value); draw(); }; };
      on('sAsig', (v) => { S.asig = v; S.nivel = S.oa = ''; S.ind = []; S.newInd = false; });
      on('sNivel', (v) => { S.nivel = v; S.oa = ''; S.ind = []; S.newInd = false; });
      on('sOa', (v) => { S.oa = v; S.ind = []; S.newInd = false; });
      on('nQ', (v) => { S.n = parseInt(v, 10) || 0; });
      $$('[data-ind]').forEach((c) => c.onchange = () => { const i = +c.dataset.ind; S.ind = c.checked ? [...S.ind, i] : S.ind.filter((x) => x !== i); draw(); });
      $$('[data-dif]').forEach((b) => b.onclick = () => { S.dif = b.dataset.dif; draw(); });
      const o = $('#openInd'); if (o) o.onclick = () => { S.newInd = true; draw(); $('#newIndTxt').focus(); };
      const c = $('#cancelInd'); if (c) c.onclick = () => { S.newInd = false; draw(); };
      const a = $('#addInd'); if (a) a.onclick = () => {
        const txt = $('#newIndTxt').value.trim(); if (!txt) { toast('Escribe el indicador antes de agregarlo.'); return; }
        const oa = CURR[S.asig][S.nivel].find((x) => x.oa === S.oa); oa.ind.push(txt); oa.own = [...(oa.own || []), oa.ind.length - 1];
        S.ind.push(oa.ind.length - 1); S.newInd = false; toast('Indicador propio agregado al OA (RF-2).'); draw();
      };
      const g = $('#gen'); if (g) g.onclick = () => {
        S.qs = Array.from({ length: S.n }, (_, k) => JSON.parse(JSON.stringify(k < Q0.length ? Q0[k] : REPL[k % 3][Math.floor(k / 3) % 2])));
        S.animate = true; go('P-03');
      };
    } },

  { id: 'P-03', p: 'doc', name: 'Generando preguntas', hu: 'HU-1.2.1', hint: 'Simula la espera mientras la IA genera (menos de 60 s, CA-1.2-3). Usa «Congelar» para capturar la barra quieta.',
    states: [['Animar', () => S.animate = true], ['Congelar', () => S.animate = false]],
    render() {
    const steps = [['Leyendo el OA y los indicadores', true], ['Redactando preguntas', true], ['Generando alternativas y distractores', !S.animate], ['Verificando la respuesta correcta', false]];
    return desktop('doc', `<div class="h-full grid place-items-center"><div class="bg-white rounded-2xl border border-slate-200 p-12 w-[560px] text-center">
      <div class="w-16 h-16 mx-auto rounded-full border-4 border-navy-100 border-t-navy ${S.animate ? 'spin' : ''}"></div>
      <h2 class="text-xl font-bold text-navy mt-6">Generando preguntas con IA…</h2>
      <p class="text-slate-500 mt-2">OA 7 · Razones · ${S.ind.length || 3} indicadores de logro</p>
      <div class="mt-6 h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-gold ${S.animate ? 'grow' : ''}" style="width:${S.animate ? '5' : '64'}%"></div></div>
      <ul class="text-left text-sm mt-6 space-y-2 max-w-xs mx-auto">${steps.map(([t, d]) => `<li class="flex gap-2 ${d ? 'text-slate-700' : 'text-slate-400'}"><span>${d ? '✓' : '○'}</span>${t}</li>`).join('')}</ul>
      <div class="flex justify-center gap-6 mt-6 text-sm text-slate-600"><span>${S.n} preguntas</span><span>·</span><span>Dificultad ${S.dif.toLowerCase()}</span><span>·</span><span>4 alternativas</span></div>
      <p class="text-xs text-slate-400 mt-6">Esto toma menos de un minuto.</p></div></div>`, 'Nueva evaluación');
  }, bind() { clearTimeout(S._t); if (S.animate) S._t = setTimeout(() => { if (cur().id === 'P-03') go('P-04'); }, 3400); } },

  { id: 'P-04', p: 'doc', name: 'Preguntas generadas', hu: 'HU-1.2.1 · HU-1.3', hint: 'Preguntas con cuatro alternativas y la correcta marcada (CA-1.2-1). Gráfico de cobertura por indicador. «Editar» va a P-05, «Descartar» quita la pregunta (RF-5) y «Publicar» va a P-06.', render() {
    const cover = IND.map((_, i) => S.qs.filter((q) => q.i === i).length);
    return desktop('doc', `
      <div class="flex items-end justify-between mb-5"><div><div class="text-sm text-slate-500">Nueva evaluación › Revisión</div><h1 class="text-2xl font-bold text-navy">Razones · 6° básico</h1>
      <p class="text-slate-500 text-sm">${S.qs.length} preguntas generadas · dificultad ${S.dif.toLowerCase()} · revisa antes de publicar</p></div>
      <div class="flex gap-2">${btn('Volver', P2, 'data-go="P-02"')}${btn('Publicar evaluación', P1, 'data-go="P-06"')}</div></div>
      <div class="flex gap-5">
      <div class="flex-1 grid grid-cols-2 gap-4 content-start">${S.qs.map((q, n) => `<div class="bg-white rounded-xl border border-slate-200 p-4">
        <div class="flex justify-between items-start gap-3"><div class="text-sm"><span class="font-bold text-navy">${n + 1}.</span> ${q.t}</div>
        <div class="flex gap-1 shrink-0"><button data-edit="${n}" class="text-xs font-semibold text-navy border border-navy-100 rounded-md px-2 py-1 hover:bg-navy-50">Editar</button><button data-del="${n}" title="Descartar" class="text-xs text-slate-400 border border-slate-200 rounded-md px-2 py-1 hover:text-red-600 hover:border-red-200">✕</button></div></div>
        <div class="grid grid-cols-2 gap-1.5 mt-3 text-xs">${q.a.map((a, j) => `<div class="px-2 py-1.5 rounded-md border ${j === q.c ? 'border-emerald-400 bg-emerald-50 text-emerald-900 font-semibold' : 'border-slate-200 text-slate-600'}">${L[j]}) ${a} ${j === q.c ? '✓' : ''}</div>`).join('')}</div>
        <div class="text-[11px] text-slate-400 mt-2">${IND[q.i]}</div></div>`).join('')}</div>
      <div class="w-64 shrink-0 space-y-4">
        ${card(`<div class="font-semibold text-sm">Cobertura por indicador</div><div class="text-xs text-slate-500 mb-2">Preguntas por indicador</div>${chartBox('cCover', 150)}`, 'p-4')}
        ${card(`<div class="font-semibold text-sm mb-2">Distribución de respuestas correctas</div><div class="grid grid-cols-4 gap-1 text-center text-xs">${[0, 1, 2, 3].map((j) => `<div class="rounded-md bg-slate-50 border py-2"><div class="font-bold text-navy">${L[j]}</div><div class="text-slate-500">${S.qs.filter((q) => q.c === j).length}</div></div>`).join('')}</div><p class="text-[11px] text-slate-400 mt-2">Evita que la correcta caiga siempre en la misma letra.</p>`, 'p-4')}
      </div></div>`, 'Nueva evaluación');
  }, bind() {
    $$('[data-edit]').forEach((b) => b.onclick = () => { S.editIdx = +b.dataset.edit; go('P-05'); });
    $$('[data-del]').forEach((b) => b.onclick = () => { if (S.qs.length <= 5) { toast('La evaluación debe tener al menos 5 preguntas.'); return; } S.qs.splice(+b.dataset.del, 1); toast('Pregunta descartada.'); draw(); });
    chart('cCover', { type: 'bar', data: { labels: IND.map((t) => t.split(' · ')[0]), datasets: [barDs('Preguntas', IND.map((_, i) => S.qs.filter((q) => q.i === i).length), NAVY)] }, options: { ...opts({ pct: false, horizontal: true, tipSuffix: '' }), scales: { x: { beginAtZero: true, ticks: { stepSize: 1, color: '#64748b' }, grid: { color: GRID }, border: { display: false } }, y: { grid: { display: false }, ticks: { color: '#475569' } } } } });
  } },

  { id: 'P-05', p: 'doc', name: 'Editar pregunta', hu: 'HU-1.3', hint: 'Se edita el enunciado, las alternativas y la correcta (CA-1.3-1). «Reemplazar» pide una pregunta nueva para el mismo indicador (CA-1.3-2).', render() {
    const q = S.qs[Math.min(S.editIdx, S.qs.length - 1)];
    return desktop('doc', `
      <div class="text-sm text-slate-500 mb-1">Razones · 6° básico › Revisión › Pregunta ${S.editIdx + 1}</div>
      <h1 class="text-2xl font-bold text-navy mb-6">Editar pregunta ${S.editIdx + 1}</h1>
      <div class="flex gap-6">
      <div class="bg-white rounded-xl border border-slate-200 p-6 flex-1 max-w-3xl">
        <label class="text-sm font-medium text-slate-600">Enunciado</label>
        <textarea id="eT" rows="3" class="mt-1 w-full rounded-lg border border-slate-300 p-3">${q.t}</textarea>
        <div class="text-sm font-medium text-slate-600 mt-5 mb-2">Alternativas <span class="font-normal text-slate-400">(marca la correcta)</span></div>
        <div class="space-y-2">${q.a.map((a, j) => `<label class="flex items-center gap-3"><input type="radio" name="corr" value="${j}" ${j === q.c ? 'checked' : ''} class="w-4 h-4 accent-[#1F3864]"><span class="w-6 font-bold text-slate-500">${L[j]}</span><input data-alt="${j}" value="${a}" class="flex-1 rounded-lg border ${j === q.c ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300'} px-3 py-2"></label>`).join('')}</div>
        <div class="text-xs text-slate-400 mt-4">Indicador: ${IND[q.i]}</div>
        <div class="flex justify-between mt-6 pt-5 border-t">
          ${btn('↻ Reemplazar pregunta', P2, 'id="repl"')}
          <div class="flex gap-2">${btn('Cancelar', P2, 'data-go="P-04"')}${btn('Guardar cambios', P1, 'id="save"')}</div></div>
      </div>
      <div class="w-72 bg-white rounded-xl border border-slate-200 p-5 h-fit text-sm">
        <div class="font-semibold mb-2">Vista del estudiante</div>
        <p class="text-slate-700">${S.editIdx + 1}. ${q.t}</p>
        <div class="space-y-1.5 mt-3">${q.a.map((a, j) => `<div class="flex gap-2 items-center rounded-lg border px-2 py-1.5 text-xs"><span class="w-5 h-5 rounded-full bg-slate-100 grid place-items-center font-bold">${L[j]}</span>${a}</div>`).join('')}</div>
      </div></div>`, 'Nueva evaluación');
  }, bind() {
    $('#repl').onclick = () => { const q = S.qs[S.editIdx], bank = REPL[q.i]; S.qs[S.editIdx] = JSON.parse(JSON.stringify(bank[S.replCount++ % bank.length])); toast('Nueva pregunta generada para ' + IND[q.i].split(' · ')[0] + ' (CA-1.3-2).'); draw(); };
    $('#save').onclick = () => { const q = S.qs[S.editIdx]; q.t = $('#eT').value; $$('[data-alt]').forEach((i) => q.a[+i.dataset.alt] = i.value); const r = document.querySelector('input[name=corr]:checked'); q.c = r ? +r.value : null; toast('Pregunta guardada.'); go('P-04'); };
  } },

  { id: 'P-06', p: 'doc', name: 'Publicar evaluación', hu: 'HU-1.3 · HU-5', hint: 'Con error: no se puede publicar si una pregunta no tiene respuesta correcta (CA-1.3-3). Opción «Ocultar respuestas» controla la retroalimentación del estudiante (CA-5-3).',
    states: [['Con error', () => { S.pubError = true; S.published = false; }], ['Sin errores', () => { S.pubError = false; S.published = false; }], ['Publicada', () => { S.pubError = false; S.published = true; }]],
    render() {
    const missing = S.pubError ? [7] : S.qs.map((q, i) => q.c == null ? i + 1 : 0).filter(Boolean);
    const ok = missing.length === 0 && (S.online || S.printed);
    const tog = (id, on, label, sub) => `<label class="flex items-start gap-3 text-sm cursor-pointer"><input id="${id}" type="checkbox" ${on ? 'checked' : ''} class="mt-0.5 accent-[#1F3864]"><span>${label}${sub ? `<span class="block text-xs text-slate-400">${sub}</span>` : ''}</span></label>`;
    const overlay = S.published ? `<div class="absolute inset-0 bg-slate-900/40 grid place-items-center"><div class="bg-white rounded-2xl p-8 w-[460px] text-center shadow-xl">
        <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto text-2xl">✓</div>
        <h2 class="text-xl font-bold text-navy mt-4">Evaluación publicada</h2><p class="text-sm text-slate-500 mt-1">Razones · 6° A · ${[S.online && 'en línea', S.printed && 'impresa'].filter(Boolean).join(' e ')}</p>
        <p class="text-xs text-slate-500 mt-3 bg-slate-50 rounded-lg p-2">Los 32 estudiantes ya la ven en «Mis evaluaciones».</p>
        <div class="flex gap-2 justify-center mt-6">${btn('Ir al panel', P2, 'data-go="P-01"')}${S.printed ? btn('Descargar imprimible', P1, 'data-go="P-07"') : ''}</div></div></div>` : '';
    return desktop('doc', `
      <div class="text-sm text-slate-500 mb-1">Razones · 6° básico › Publicar</div>
      <h1 class="text-2xl font-bold text-navy mb-6">Publicar evaluación</h1>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div class="font-semibold mb-4">Revisión antes de publicar</div>
          <ul class="space-y-3 text-sm">
            <li class="flex gap-3"><span class="text-emerald-600">✔</span>${S.qs.length} preguntas de selección múltiple</li>
            <li class="flex gap-3"><span class="text-emerald-600">✔</span>3 indicadores de logro cubiertos</li>
            <li class="flex gap-3">${missing.length === 0 ? '<span class="text-emerald-600">✔</span>Todas las preguntas tienen respuesta correcta' : `<span class="text-red-600">✖</span><span class="text-red-700 font-medium">La pregunta ${missing.join(', ')} no tiene respuesta correcta marcada</span>`}</li>
            <li class="flex gap-3">${S.online || S.printed ? '<span class="text-emerald-600">✔</span>Forma de aplicación elegida' : '<span class="text-red-600">✖</span><span class="text-red-700 font-medium">Elige al menos una forma de aplicación</span>'}</li>
          </ul>
          ${missing.length === 0 ? '' : `<div class="mt-5 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">No se puede publicar una evaluación con preguntas sin respuesta correcta. <a class="font-semibold underline" id="fixQ">Corregir la pregunta ${missing[0]}</a></div>`}
        </div>
        <div class="bg-white rounded-xl border border-slate-200 p-6 h-fit space-y-3">
          <div class="font-semibold">Curso</div><div class="rounded-lg border px-3 py-2 text-sm">6° A · 32 estudiantes</div>
          <div class="font-semibold pt-2">Forma de aplicación</div>
          ${tog('tPrint', S.printed, 'Impresa con hoja de respuestas y QR', 'Se corrige fotografiando la hoja')}
          ${tog('tOnline', S.online, 'En línea', 'Los estudiantes responden desde el navegador')}
          <div class="font-semibold pt-2">Retroalimentación</div>
          ${tog('tHide', S.hideAns, 'Ocultar respuestas correctas', 'El estudiante solo verá su logro por indicador')}
          ${btn('Publicar', (ok ? P1 : 'bg-slate-200 text-slate-400 cursor-not-allowed') + ' w-full py-3 mt-2', ok ? 'id="pub"' : 'disabled')}
        </div>
      </div>`, 'Nueva evaluación', overlay);
  }, bind() {
    const p = $('#pub'); if (p) p.onclick = () => { S.published = true; draw(); };
    const f = $('#fixQ'); if (f) f.onclick = () => { S.editIdx = 6; go('P-05'); };
    [['tPrint', 'printed'], ['tOnline', 'online'], ['tHide', 'hideAns']].forEach(([id, k]) => { $('#' + id).onchange = (e) => { S[k] = e.target.checked; draw(); }; });
  } },

  { id: 'P-07', p: 'doc', name: 'Descargar imprimible', hu: 'HU-4', hint: 'Vista previa del PDF: enunciados y una hoja de respuestas con QR por estudiante (CA-4-1, CA-4-2). Cambia el estudiante para ver otro QR.', render() {
    const st = STUDENTS[S.student];
    return desktop('doc', `
      <div class="flex items-end justify-between mb-5"><div><div class="text-sm text-slate-500">Razones · 6° A › Versión imprimible</div><h1 class="text-2xl font-bold text-navy">Vista previa del PDF</h1></div>
      <div class="flex gap-2 items-center"><select id="stSel" class="rounded-lg border border-slate-300 px-3 py-2 text-sm">${STUDENTS.map((s, i) => `<option value="${i}" ${i === S.student ? 'selected' : ''}>Hoja de ${s}</option>`).join('')}</select>${btn('⬇ Descargar PDF (32 hojas)', P1, 'id="dlpdf"')}</div></div>
      <div class="flex gap-6 justify-center bg-slate-200 rounded-xl p-6">
        <div class="bg-white w-[380px] h-[490px] p-6 text-[10px] leading-snug shadow">
          <div class="flex justify-between border-b pb-2 mb-3"><b class="text-[12px]">Evaluación · Razones</b><span>6° A · Matemática</span></div>
          ${S.qs.slice(0, 6).map((q, n) => `<div class="mb-2.5"><b>${n + 1}.</b> ${q.t}<div class="grid grid-cols-2 gap-x-3 mt-1 text-slate-600">${q.a.map((a, j) => `<span>${L[j]}) ${a}</span>`).join('')}</div></div>`).join('')}
          <div class="text-center text-slate-400 mt-2">Página 1 de 2</div></div>
        <div class="bg-white w-[380px] h-[490px] p-6 text-[10px] shadow flex flex-col">
          <div class="flex justify-between items-start border-b pb-3"><div><b class="text-[12px]">Hoja de respuestas</b><div class="mt-1">Estudiante: <b>${st}</b></div><div>Curso: 6° A · Matemática · Razones</div><div>Docente: Carla Rojas</div></div>${qr(st + 'razones', 78)}</div>
          <div class="text-slate-500 mt-3 mb-2">Rellena completamente un círculo por pregunta.</div>
          <div class="grid grid-cols-2 gap-x-6 gap-y-2">${S.qs.slice(0, 10).map((_, n) => `<div class="flex items-center gap-2"><b class="w-4 text-right">${n + 1}</b>${[0, 1, 2, 3].map((j) => `<span class="w-5 h-5 rounded-full border border-slate-700 grid place-items-center text-[8px]">${L[j]}</span>`).join('')}</div>`).join('')}</div>
          <div class="mt-auto flex justify-between text-slate-400"><span>■</span><span>Fotografía la hoja completa dentro del marco</span><span>■</span></div></div>
      </div>`, 'Nueva evaluación');
  }, bind() { $('#stSel').onchange = (e) => { S.student = +e.target.value; draw(); }; $('#dlpdf').onclick = () => toast('Se descargaría el PDF con 32 hojas de respuestas.'); } },

  { id: 'P-08', p: 'doc', name: 'Tomar y procesar la foto', hu: 'HU-2.1', hint: 'Vista del celular. El disparador pasa a «procesando» y luego al resultado (P-09). «Simular foto ilegible» lleva a P-14 (HU-2.2).',
    states: [['Encuadre', () => S.cam = 'encuadre'], ['Procesando', () => S.cam = 'procesando']],
    render() {
    const proc = S.cam === 'procesando';
    return phone(`
      <div class="px-5 py-2 flex justify-between items-center"><span class="text-sm font-semibold">Corregir · Razones 6° A</span><span class="text-xs bg-white/15 rounded-full px-2 py-1">14 / 32</span></div>
      <div class="flex-1 relative mx-4 rounded-2xl overflow-hidden bg-slate-700">
        <div class="absolute inset-6 bg-white rounded-sm rotate-[-2deg] p-3 text-[7px] text-slate-700 flex flex-col">
          <div class="flex justify-between"><div><b>Hoja de respuestas</b><br>Martina González · 6° A</div>${qr('Martina Gonzálezrazones', 44)}</div>
          <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">${Q0.map((_, n) => `<div class="flex items-center gap-1"><b class="w-3">${n + 1}</b>${[0, 1, 2, 3].map((j) => `<span class="w-3.5 h-3.5 rounded-full border border-slate-600 ${[1, 2, 2, 1, 2, 1, 0, 0, 0, 2][n] === j ? 'bg-slate-800' : ''}"></span>`).join('')}</div>`).join('')}</div></div>
        ${['top-3 left-3 border-t-4 border-l-4', 'top-3 right-3 border-t-4 border-r-4', 'bottom-3 left-3 border-b-4 border-l-4', 'bottom-3 right-3 border-b-4 border-r-4'].map((c) => `<div class="absolute w-10 h-10 ${c} border-gold rounded-sm"></div>`).join('')}
        ${proc ? `<div class="absolute inset-0 bg-slate-900/70 grid place-items-center"><div class="text-center"><div class="w-12 h-12 mx-auto rounded-full border-4 border-white/20 border-t-gold spin"></div><div class="mt-4 font-semibold">Leyendo la hoja…</div><div class="text-xs text-white/70 mt-2 space-y-1"><div>✓ Código QR leído</div><div>Reconociendo marcas…</div></div></div></div>` : ''}
      </div>
      <p class="text-center text-xs text-white/70 mt-3 px-6">${proc ? 'No muevas el celular' : 'Ubica la hoja completa dentro del marco'}</p>
      <div class="h-28 flex items-center justify-between px-10"><a data-go="P-15" class="text-[11px] text-white/60 w-16">Resumen</a><button id="shoot" class="w-16 h-16 rounded-full border-4 border-white grid place-items-center"><span class="w-12 h-12 rounded-full bg-white block"></span></button><a id="bad" class="text-[11px] text-white/60 w-16 text-right">Simular foto ilegible</a></div>`, true);
  }, bind() {
    clearTimeout(S._t);
    $('#shoot').onclick = () => { S.cam = 'procesando'; draw(); S._t = setTimeout(() => { S.cam = 'encuadre'; go('P-09'); }, 2000); };
    $('#bad').onclick = () => { S.cam = 'procesando'; draw(); S._t = setTimeout(() => { S.cam = 'encuadre'; go('P-14'); }, 1500); };
  } },

  { id: 'P-09', p: 'doc', name: 'Resultado de la hoja', hu: 'HU-2.1', hint: 'El QR identifica al estudiante sin seleccionarlo; muestra puntaje y logro por indicador (CA-2-1). «Corregir de nuevo» lleva a P-10.', render() {
    const ok = [1, 1, 0, 1, 1, 0, 1, 1, 0, 1];
    const per = [0, 1, 2].map((i) => { const ids = Q0.map((q, n) => q.i === i ? n : -1).filter((n) => n >= 0); return Math.round(ids.filter((n) => ok[n]).length / ids.length * 100); });
    return phone(`
      <div class="px-5 py-2 flex justify-between items-center"><a data-go="P-08" class="text-navy text-sm">‹ Cámara</a><span class="text-sm font-semibold">Resultado</span><span class="w-10"></span></div>
      <div class="flex-1 overflow-hidden px-5">
        <div class="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-emerald-500 text-white grid place-items-center">✓</div><div><div class="text-xs text-emerald-700">Identificada por el código QR</div><div class="font-bold">Martina González · 6° A</div></div></div>
        <div class="text-center my-5"><div class="text-5xl font-bold text-navy">7<span class="text-2xl text-slate-400">/10</span></div><div class="text-sm text-slate-500 mt-1">70% de logro · corregida en 4 s</div></div>
        <div class="font-semibold text-sm mb-2">Logro por indicador</div>
        <div class="space-y-3">${IND.map((t, i) => `<div><div class="flex justify-between text-xs mb-1"><span>${t}</span><b>${per[i]}%</b></div><div class="h-2.5 bg-slate-100 rounded-full"><div class="h-full rounded-full bg-navy" style="width:${Math.max(per[i], 2)}%"></div></div></div>`).join('')}</div>
        <div class="flex flex-wrap gap-1 mt-5">${ok.map((o, n) => `<span class="w-7 h-7 rounded-md text-xs grid place-items-center font-semibold ${o ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-700'}">${n + 1}</span>`).join('')}</div>
      </div>
      <div class="p-5 space-y-2">${btn('Siguiente hoja', P1 + ' w-full py-3', 'data-go="P-08"')}${btn('Corregir de nuevo esta hoja', P2 + ' w-full py-3', 'data-go="P-10"')}</div>`);
  } },

  { id: 'P-10', p: 'doc', name: 'Hoja ya corregida', hu: 'HU-2.1', hint: 'Una hoja ya corregida no se reemplaza sin confirmación (CA-2-3).', render() {
    return phone(`
      <div class="px-5 py-2 text-center text-sm font-semibold">Corregir · Razones 6° A</div>
      <div class="flex-1 relative bg-slate-100">
        <div class="absolute inset-0 bg-slate-900/50"></div>
        <div class="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl">
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-600 grid place-items-center text-xl mx-auto">!</div>
          <h2 class="text-lg font-bold text-center mt-3">Esta hoja ya fue corregida</h2>
          <div class="rounded-xl bg-slate-50 border p-3 mt-4 text-sm"><div class="font-semibold">Martina González · 6° A</div><div class="text-slate-500 text-xs mt-1">Resultado anterior: 7/10 · 12 nov, 19:42</div></div>
          <p class="text-sm text-slate-600 mt-4 text-center">¿Quieres reemplazar el resultado anterior por el de esta foto?</p>
          <div class="grid grid-cols-2 gap-2 mt-5">${btn('Cancelar', P2 + ' py-3', 'data-go="P-09"')}${btn('Reemplazar', 'bg-amber-500 text-white py-3', 'id="rep"')}</div>
        </div>
      </div>`);
  }, bind() { $('#rep').onclick = () => { toast('Resultado reemplazado.'); go('P-09'); }; } },

  { id: 'P-14', p: 'doc', name: 'Foto ilegible', hu: 'HU-2.2', hint: 'Si la foto no se puede leer no se registra resultado, se indica el motivo y se pide repetirla (CA-2-2) sin reiniciar la corrección del curso (CA-2-5).',
    states: [['QR no leído', () => S.illegible = 'qr'], ['Marcas no reconocidas', () => S.illegible = 'marcas'], ['Hoja fuera del marco', () => S.illegible = 'marco']],
    render() {
    const R = { qr: ['No pudimos leer el código QR', 'El QR está doblado, tapado o con reflejo.', ['Aplana la hoja sobre la mesa', 'Evita sombras y reflejos sobre el QR']],
      marcas: ['No reconocimos algunas marcas', 'Las preguntas 4 y 9 tienen marcas muy suaves o dobles.', ['Pide al estudiante rellenar el círculo completo', 'Usa luz pareja, sin flash directo']],
      marco: ['La hoja no está completa en el marco', 'Falta una esquina de la hoja en la foto.', ['Aleja el celular unos 10 cm', 'Alinea los cuatro cuadrados negros con el marco']] }[S.illegible];
    return phone(`
      <div class="px-5 py-2 flex justify-between items-center"><a data-go="P-08" class="text-navy text-sm">‹ Cámara</a><span class="text-sm font-semibold">Corregir · Razones 6° A</span><span class="text-xs bg-slate-100 rounded-full px-2 py-1">14 / 32</span></div>
      <div class="flex-1 px-5 pt-3">
        <div class="relative rounded-2xl overflow-hidden h-56 bg-slate-700">
          <div class="absolute inset-6 bg-white/90 rounded-sm ${S.illegible === 'marco' ? 'translate-x-16 -translate-y-6 rotate-6' : 'rotate-[-3deg]'} blur-[1px] p-3 text-[7px] text-slate-500"><b>Hoja de respuestas</b><div class="mt-2 ${S.illegible === 'qr' ? 'opacity-30' : ''}">${qr('x', 36)}</div></div>
          <div class="absolute inset-0 grid place-items-center"><div class="w-14 h-14 rounded-full bg-red-500 text-white grid place-items-center text-2xl font-bold shadow-lg">!</div></div>
        </div>
        <h2 class="text-lg font-bold mt-5">${R[0]}</h2>
        <p class="text-sm text-slate-600 mt-1">${R[1]}</p>
        <div class="rounded-xl bg-red-50 border border-red-200 p-3 mt-4 text-xs text-red-800"><b>No se registró ningún resultado</b> para esta hoja.</div>
        <div class="font-semibold text-sm mt-5 mb-2">Para la próxima foto</div>
        <ul class="text-sm space-y-1.5">${R[2].map((t) => `<li class="flex gap-2"><span class="text-gold">●</span>${t}</li>`).join('')}</ul>
      </div>
      <div class="p-5 space-y-2">${btn('📷 Repetir la foto', P1 + ' w-full py-3', 'data-go="P-08"')}${btn('Saltar esta hoja', P2 + ' w-full py-3', 'id="skip"')}</div>`);
  }, bind() { $('#skip').onclick = () => { toast('Hoja marcada como pendiente. Sigues en la hoja 15 de 32.'); go('P-08'); }; } },

  { id: 'P-15', p: 'doc', name: 'Resultados del curso', hu: 'HU-2.1 · HU-3.1', hint: 'El docente ve los resultados individuales de su curso (RNF-3): distribución de puntajes, logro por indicador y estudiantes pendientes. Cambia de curso con las pestañas.',
    states: [['Estudiantes', () => S.resTab = 'estudiantes'], ['Pendientes', () => S.resTab = 'pendientes']],
    render() {
    const ro = roster(S.course), done = ro.filter((r) => r.done), pend = ro.filter((r) => !r.done);
    const mean = done.length ? Math.round(avg(done.map((r) => r.score * 10))) : 0;
    const ci = COURSES.indexOf(S.course), indVals = [2, 3, 4].map((k) => REPORT[k][2][ci]);
    const list = (S.resTab === 'estudiantes' ? done : pend).slice(0, 9);
    return desktop('doc', `
      <div class="flex items-end justify-between mb-5"><div><div class="text-sm text-slate-500">Resultados del curso</div><h1 class="text-2xl font-bold text-navy">Razones · ${S.course}</h1>
      <p class="text-slate-500 text-sm">OA 7 · ${COURSE_META[S.course].mode} · ${done.length} de 32 corregidas</p></div>
      <div class="flex gap-2 items-center"><div class="flex bg-white border rounded-lg p-1">${COURSES.map((c) => `<button data-c="${c}" class="px-3 py-1.5 text-sm rounded-md ${c === S.course ? 'bg-navy text-white font-semibold' : 'text-slate-600'}">${c}</button>`).join('')}</div>${btn('📷 Seguir corrigiendo', P1, 'data-go="P-08"')}</div></div>
      <div class="grid grid-cols-4 gap-4 mb-5">${kpi('Corregidas', `${done.length}<span class="text-lg text-slate-400">/32</span>`)}${kpi('Logro promedio', mean + '%')}${kpi('Indicador más débil', 'I2', `Razones equivalentes · ${indVals[1]}%`)}${kpi('Pendientes', pend.length, pend.length ? 'Sin hoja o sin responder' : 'Curso completo')}</div>
      <div class="grid grid-cols-5 gap-4 mb-5">
        ${card(`<div class="font-semibold">Distribución de puntajes</div><div class="text-xs text-slate-500 mb-3">Cantidad de estudiantes por puntaje (de 10)</div>${chartBox('cHist', 190)}`, 'p-5 col-span-3')}
        ${card(`<div class="font-semibold">Logro por indicador</div><div class="text-xs text-slate-500 mb-3">Líneas: umbral 50% y 80%</div>${chartBox('cInd', 190)}`, 'p-5 col-span-2')}
      </div>
      ${card(`<div class="px-6 py-3 border-b flex items-center gap-4 text-sm">${[['estudiantes', `Corregidas (${done.length})`], ['pendientes', `Pendientes (${pend.length})`]].map(([k, t]) => `<button data-tab="${k}" class="py-1 border-b-2 ${S.resTab === k ? 'border-navy text-navy font-semibold' : 'border-transparent text-slate-500'}">${t}</button>`).join('')}<span class="ml-auto text-xs text-slate-400">Solo tú ves los resultados individuales</span></div>
        ${list.length ? `<table class="w-full text-sm"><tbody>${list.map((r) => `<tr class="border-t first:border-t-0"><td class="px-6 py-2.5 flex items-center gap-3"><span class="w-7 h-7 rounded-full bg-navy-50 text-navy grid place-items-center text-[11px] font-bold">${initials(r.name)}</span>${r.name}</td>
          ${S.resTab === 'estudiantes' ? `<td class="w-40"><div class="h-2 bg-slate-100 rounded-full w-32"><div class="h-full rounded-full bg-navy" style="width:${r.score * 10}%"></div></div></td><td class="w-20 font-semibold">${r.score}/10</td><td class="w-28">${pill(r.score * 10)}</td>` : `<td class="text-slate-500">${COURSE_META[S.course].mode === 'En línea' ? 'No ha enviado la evaluación' : 'Hoja sin fotografiar'}</td><td class="pr-6 text-right"><a class="text-navy font-semibold text-xs">${COURSE_META[S.course].mode === 'En línea' ? 'Enviar recordatorio' : 'Corregir ahora'}</a></td>`}</tr>`).join('')}</tbody></table>`
          : '<div class="p-6 text-sm text-slate-400 text-center">No hay estudiantes pendientes.</div>'}`, 'overflow-hidden')}`, 'Resultados del curso');
  }, bind() {
    $$('[data-c]').forEach((b) => b.onclick = () => { S.course = b.dataset.c; draw(); });
    $$('[data-tab]').forEach((b) => b.onclick = () => { S.resTab = b.dataset.tab; draw(); });
    const ro = roster(S.course).filter((r) => r.done), ci = COURSES.indexOf(S.course);
    const counts = Array.from({ length: 11 }, (_, s) => ro.filter((r) => r.score === s).length);
    chart('cHist', { type: 'bar', data: { labels: counts.map((_, s) => String(s)), datasets: [barDs('Estudiantes', counts, COURSE_COLOR[S.course], { categoryPercentage: .9, barPercentage: .92, maxBarThickness: 34 })] }, options: { ...opts({ pct: false, tipSuffix: ' estudiantes' }), plugins: { ...opts({ pct: false }).plugins, tooltip: { ...opts().plugins.tooltip, callbacks: { title: (i) => `Puntaje ${i[0].label}/10`, label: (c) => ` ${c.formattedValue} estudiantes` } } } } });
    chart('cInd', { type: 'bar', data: { labels: ['I1', 'I2', 'I3'], datasets: [barDs('Logro', [2, 3, 4].map((k) => REPORT[k][2][ci]), COURSE_COLOR[S.course], { maxBarThickness: 36 })] }, options: opts({ thresholds: SEM_LINES }), plugins: [thresholdPlugin] });
  } },

  // ------------------------------------------------------------------ ESTUDIANTE
  { id: 'P-18', p: 'est', name: 'Mis evaluaciones', hu: 'HU-7', hint: 'Inicio del estudiante: evaluaciones en línea disponibles y resultados anteriores. «Comenzar» abre P-12; «Ver retroalimentación» abre P-19.', render() {
    const items = [
      ['Razones', 'Matemática', 'Disponible', 'En línea · 10 preguntas · sin límite de tiempo', S.sent ? ['Ver retroalimentación', 'P-19'] : ['Comenzar', 'P-12']],
      ['Porcentajes', 'Matemática', 'Próxima', 'Se abre el 25 de noviembre', null],
      ['Fracciones y números mixtos', 'Matemática', 'Revisada', 'Impresa · 8/10 · 80% de logro', ['Ver resultado', 'P-19']],
      ['Textos literarios', 'Lenguaje y Comunicación', 'Revisada', 'En línea · 6/10 · 60% de logro', ['Ver retroalimentación', 'P-19']]
    ];
    const badge = { Disponible: 'bg-gold-50 text-gold', Próxima: 'bg-slate-100 text-slate-500', Revisada: 'bg-emerald-100 text-emerald-800' };
    return student(`
      <h1 class="text-2xl font-bold text-navy">Hola, Martina</h1><p class="text-slate-500 mb-6">Tienes ${S.sent ? 'ninguna evaluación pendiente' : '1 evaluación disponible para responder'}.</p>
      ${S.sent ? '' : `<div class="rounded-2xl bg-navy text-white p-6 flex items-center justify-between mb-6"><div><div class="text-xs uppercase tracking-wide text-gold font-semibold">Disponible ahora</div><div class="text-xl font-bold mt-1">Razones · Matemática</div><div class="text-white/70 text-sm mt-1">10 preguntas · Profesora Carla Rojas · puedes avanzar y volver</div></div>${btn('Comenzar ›', 'bg-gold text-slate-900 px-6 py-3', 'data-go="P-12"')}</div>`}
      <div class="space-y-3">${items.map((it) => `<div class="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-navy-50 text-navy grid place-items-center font-bold">${it[1][0]}</div>
        <div class="flex-1"><div class="font-semibold">${it[0]} <span class="ml-2 px-2 py-0.5 rounded-full text-[11px] font-semibold ${badge[it[2]]}">${it[2]}</span></div><div class="text-sm text-slate-500">${it[1]} · ${it[3]}</div></div>
        ${it[4] ? btn(it[4][0], it[4][0] === 'Comenzar' ? P1 : P2, `data-go="${it[4][1]}"`) : ''}</div>`).join('')}</div>`, 'Mis evaluaciones');
  } },

  { id: 'P-12', p: 'est', name: 'Responder en línea', hu: 'HU-7 · mejora M-1', hint: 'El estudiante responde pregunta por pregunta y puede avanzar y volver (CA-7-1). La barra de progreso permite saltar a cualquier pregunta.', render() {
    const q = Q0[S.cur];
    return student(`
      <div class="flex justify-between items-center mb-2"><div><div class="text-sm text-slate-500">Evaluación en línea · Matemática</div><h1 class="text-xl font-bold text-navy">Razones</h1></div><div class="text-sm text-slate-500">Pregunta <b class="text-navy">${S.cur + 1}</b> de 10 · ${S.ans.filter((a) => a != null).length} respondidas</div></div>
      <div class="flex gap-1.5 mb-8">${Q0.map((_, n) => `<button data-jump="${n}" title="Pregunta ${n + 1}" class="h-2 flex-1 rounded-full ${n === S.cur ? 'bg-gold' : S.ans[n] != null ? 'bg-navy' : 'bg-slate-200'}"></button>`).join('')}</div>
      <div class="bg-white rounded-2xl border border-slate-200 p-8">
        <p class="text-lg font-medium">${S.cur + 1}. ${q.t}</p>
        <div class="space-y-3 mt-6">${q.a.map((a, j) => `<label class="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer ${S.ans[S.cur] === j ? 'border-navy bg-navy-50' : 'border-slate-200 hover:border-slate-300'}"><input type="radio" name="ans" data-ans="${j}" ${S.ans[S.cur] === j ? 'checked' : ''} class="w-5 h-5 accent-[#1F3864]"><span class="w-7 h-7 rounded-full bg-slate-100 grid place-items-center font-bold text-sm">${L[j]}</span><span>${a}</span></label>`).join('')}</div>
      </div>
      <div class="flex justify-between mt-6">${btn('‹ Anterior', P2 + (S.cur === 0 ? ' opacity-40' : ''), 'id="pv"')}
      ${S.cur === 9 ? btn('Revisar y enviar', P1, 'data-go="P-13"') : btn('Siguiente ›', P1, 'id="nx"')}</div>`);
  }, bind() {
    $$('[data-ans]').forEach((r) => r.onchange = () => { S.ans[S.cur] = +r.dataset.ans; draw(); });
    $$('[data-jump]').forEach((b) => b.onclick = () => { S.cur = +b.dataset.jump; draw(); });
    const pv = $('#pv'); if (pv) pv.onclick = () => { if (S.cur > 0) { S.cur--; draw(); } };
    const nx = $('#nx'); if (nx) nx.onclick = () => { S.cur++; draw(); };
  } },

  { id: 'P-13', p: 'est', name: 'Enviar evaluación', hu: 'HU-7 · mejora M-1', hint: 'Antes de enviar muestra las preguntas sin responder; el envío es único (CA-7-2) y el resultado llega al reporte (CA-7-3).',
    states: [['Confirmar envío', () => S.sent = false], ['Enviada', () => S.sent = true]],
    render() {
    const pend = S.ans.map((a, n) => a == null ? n + 1 : 0).filter(Boolean);
    const body = S.sent ? `<div class="bg-white rounded-2xl border border-slate-200 p-10 max-w-lg mx-auto text-center">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center text-3xl mx-auto">✓</div>
        <h2 class="text-2xl font-bold text-navy mt-5">Evaluación enviada</h2><p class="text-slate-500 mt-2">Tus respuestas quedaron registradas el 2 de diciembre a las 10:14.</p>
        <p class="text-sm text-slate-500 mt-4 bg-slate-50 rounded-lg p-3">Ya no puedes volver a enviar esta evaluación.</p>
        ${btn('Ver mi retroalimentación', P1 + ' mt-6 px-6 py-3', 'data-go="P-19"')}</div>`
      : `<div class="bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
        <h2 class="text-xl font-bold text-navy">¿Enviar la evaluación?</h2>
        <div class="grid grid-cols-2 gap-3 mt-5"><div class="rounded-xl bg-navy-50 p-4"><div class="text-3xl font-bold text-navy">${10 - pend.length}</div><div class="text-sm text-slate-600">respondidas</div></div>
        <div class="rounded-xl ${pend.length ? 'bg-amber-50' : 'bg-emerald-50'} p-4"><div class="text-3xl font-bold ${pend.length ? 'text-amber-600' : 'text-emerald-600'}">${pend.length}</div><div class="text-sm text-slate-600">sin responder</div></div></div>
        ${pend.length ? `<p class="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">Te faltan las preguntas ${pend.join(' y ')}. <a class="font-semibold underline" id="goq">Volver a responderlas</a></p>` : ''}
        <p class="text-sm text-slate-500 mt-4">Solo puedes enviar la evaluación una vez.</p>
        <div class="flex gap-2 justify-end mt-6">${btn('Seguir respondiendo', P2, 'data-go="P-12"')}${btn('Enviar evaluación', P1, 'id="send"')}</div></div>`;
    return student(`<div class="pt-6">${body}</div>`);
  }, bind() {
    const s = $('#send'); if (s) s.onclick = () => { S.sent = true; draw(); };
    const g = $('#goq'); if (g) g.onclick = () => { S.cur = S.ans.findIndex((a) => a == null); go('P-12'); };
  } },

  { id: 'P-19', p: 'est', name: 'Retroalimentación', hu: 'HU-5', hint: 'Al enviar, el estudiante ve su logro por indicador (CA-5-1) y la alternativa correcta de cada pregunta fallada (CA-5-2). Con «Ocultar respuestas» solo ve el logro (CA-5-3).',
    states: [['Con respuestas', () => S.hideAns = false], ['Respuestas ocultas', () => S.hideAns = true]],
    render() {
    const right = Q0.map((q, n) => S.ans[n] === q.c);
    const score = right.filter(Boolean).length, pct = score * 10;
    const per = [0, 1, 2].map((i) => { const ids = Q0.map((q, n) => q.i === i ? n : -1).filter((n) => n >= 0); return Math.round(ids.filter((n) => right[n]).length / ids.length * 100); });
    const wrong = Q0.map((q, n) => ({ q, n })).filter(({ n }) => !right[n]);
    const weakest = per.indexOf(Math.min(...per));
    return student(`
      <div class="flex items-end justify-between mb-6"><div><div class="text-sm text-slate-500">Mis resultados › Matemática</div><h1 class="text-2xl font-bold text-navy">Razones · tu retroalimentación</h1></div><span class="text-xs text-slate-400">Solo tú ves estos resultados</span></div>
      <div class="grid grid-cols-3 gap-5">
        ${card(`<div class="text-sm text-slate-500">Tu logro</div><div class="text-6xl font-bold text-navy mt-2">${pct}<span class="text-2xl text-slate-400">%</span></div><div class="text-sm text-slate-500 mt-1">${score} de 10 correctas</div>
          <div class="mt-4">${pill(pct)} <span class="text-xs text-slate-500 ml-1">${semLabel(pct)}</span></div>
          <div class="mt-5 rounded-lg bg-gold-50 p-3 text-xs text-slate-700"><b>Para reforzar:</b> ${IND[weakest].split(' · ')[1]}.</div>`, 'p-6')}
        ${card(`<div class="font-semibold">Logro por indicador</div><div class="text-xs text-slate-500 mb-3">Porcentaje de preguntas correctas en cada indicador</div>${chartBox('cStu', 190)}`, 'p-6 col-span-2')}
      </div>
      <div class="mt-5">${S.hideAns ? card('<div class="p-5 text-sm text-slate-600 flex gap-3 items-center"><span class="text-xl">🔒</span>Tu profesora decidió no mostrar las respuestas correctas de esta evaluación. Puedes ver tu logro por indicador arriba.</div>')
        : card(`<div class="px-6 py-4 font-semibold border-b">Preguntas que debes revisar (${wrong.length})</div><div class="divide-y">${wrong.map(({ q, n }) => `<div class="px-6 py-4 text-sm"><div><b class="text-navy">${n + 1}.</b> ${q.t}</div>
          <div class="flex gap-3 mt-2 text-xs">${S.ans[n] == null ? '<span class="px-2 py-1 rounded-md bg-slate-100 text-slate-600">Sin responder</span>' : `<span class="px-2 py-1 rounded-md bg-red-50 text-red-700 border border-red-200">Tu respuesta: ${L[S.ans[n]]}) ${q.a[S.ans[n]]}</span>`}<span class="px-2 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">Correcta: ${L[q.c]}) ${q.a[q.c]}</span><span class="text-slate-400 self-center">${IND[q.i].split(' · ')[0]}</span></div></div>`).join('')}</div>`)}</div>`, 'Mis resultados');
  }, bind() {
    const right = Q0.map((q, n) => S.ans[n] === q.c);
    const per = [0, 1, 2].map((i) => { const ids = Q0.map((q, n) => q.i === i ? n : -1).filter((n) => n >= 0); return Math.round(ids.filter((n) => right[n]).length / ids.length * 100); });
    chart('cStu', { type: 'bar', data: { labels: IND.map((t) => t.split(' · ')[1]), datasets: [barDs('Tu logro', per, NAVY, { maxBarThickness: 26 }), barDs('Promedio del curso', [91, 44, 71], '#cbd5e1', { maxBarThickness: 26 })] }, options: opts({ horizontal: true, legend: true, thresholds: SEM_LINES }), plugins: [thresholdPlugin] });
  } },

  // ------------------------------------------------------------------ UTP
  { id: 'P-11', p: 'utp', name: 'Reporte de logro (UTP)', hu: 'HU-3.1 · HU-3.2', hint: 'Logro por indicador agregado por curso (CA-3-2, CA-3-3) con filtros (CA-3-1). Versión 2: semáforo rojo < 50%, amarillo 50–79%, verde ≥ 80% (CA-3-8). «Sin datos» muestra el mensaje de CA-3-5.',
    states: [['Versión 1', () => { S.semaforo = false; S.rep.periodo = PERIODS[0]; S.rep.asig = 'Matemática'; }], ['Versión 2 · semáforo', () => { S.semaforo = true; S.rep.periodo = PERIODS[0]; S.rep.asig = 'Matemática'; }], ['Sin datos', () => { S.rep.periodo = '2025'; }]],
    render() {
    const d = repData();
    const cell = (v) => S.semaforo ? pill(v) : `<span class="font-medium">${v}%</span>`;
    const f = S.rep;
    const fsel = (id, label, opts, val) => `<label class="text-xs text-slate-500">${label}<select id="${id}" class="block mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 ${id === 'fPer' ? 'w-48' : 'w-[8.5rem]'}">${opts.map((o) => `<option ${o === val ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`;
    const filters = `<div class="flex items-end gap-3 mb-5">${fsel('fAsig', 'Asignatura', Object.keys(CURR), f.asig)}${fsel('fNivel', 'Nivel', ['6° básico', '5° básico'], f.nivel)}${fsel('fCurso', 'Curso', ['Todos', ...COURSES], f.curso)}${fsel('fPer', 'Período', PERIODS, f.periodo)}
      <div class="ml-auto flex gap-2">${btn('Tendencias', P2, 'data-go="P-16"')}${btn('⬇ Exportar', P1, 'data-go="P-17"')}</div></div>`;
    if (!d) return desktop('utp', `<div class="text-sm text-slate-500">Reportes</div><h1 class="text-2xl font-bold text-navy mb-5">Logro por indicador</h1>${filters}
      ${card(`<div class="py-20 text-center"><div class="w-14 h-14 rounded-full bg-slate-100 grid place-items-center mx-auto text-2xl">∅</div><div class="font-semibold text-lg mt-4">Sin evaluaciones corregidas</div><p class="text-sm text-slate-500 mt-1">Ningún curso tiene evaluaciones corregidas con estos filtros.</p>${btn('Limpiar filtros', P2 + ' mt-5', 'id="clr"')}</div>`)}`, 'Reporte de logro');
    const atn = d.rows.filter((r) => r[2].some((v) => v < 50));
    return desktop('utp', `
      <div class="flex items-end justify-between mb-4"><div><div class="text-sm text-slate-500">Reportes</div><h1 class="text-2xl font-bold text-navy">Logro por indicador</h1>
      <p class="text-slate-500 text-sm">${f.asig} · ${f.nivel} · ${f.periodo} · ${f.periodo === PERIODS[0] ? 11 : 9} evaluaciones corregidas</p></div>
      ${S.semaforo ? `<div class="flex gap-3 text-xs bg-white border rounded-lg px-3 py-2">${[['bg-red-500', 'Bajo 50%'], ['bg-amber-400', '50% a 79%'], ['bg-emerald-500', '80% o más']].map(([c, t]) => `<span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full ${c}"></span>${t}</span>`).join('')}</div>` : ''}</div>
      ${filters}
      ${card(`<div class="flex justify-between items-center mb-2"><div class="font-semibold text-sm">Comparación entre cursos</div>${legend(d.cols.map((c) => [COURSE_COLOR[c], c]))}</div>${chartBox('cRep', 210)}`, 'p-5 mb-4')}
      ${card(`<table class="w-full text-sm"><thead class="bg-navy-50 text-navy"><tr><th class="text-left px-5 py-2.5 w-28">Indicador</th><th class="text-left">Descripción</th>${d.cols.map((c) => `<th class="w-24 text-center">${c}</th>`).join('')}${d.cols.length > 1 ? '<th class="w-24 text-center">Nivel</th>' : ''}</tr></thead>
      <tbody>${d.rows.map((r) => `<tr class="border-t"><td class="px-5 py-2.5 font-semibold text-navy">${r[0]}</td><td class="text-slate-600">${r[1]}</td>${r[2].map((v) => `<td class="text-center">${cell(v)}</td>`).join('')}${d.cols.length > 1 ? `<td class="text-center font-bold">${cell(avg(r[2]))}</td>` : ''}</tr>`).join('')}</tbody></table>`, 'overflow-hidden')}
      <p class="text-xs text-slate-400 mt-3">Datos agregados por curso. Los resultados individuales solo los ve el docente de cada curso.</p>
      ${S.semaforo && atn.length ? `<div class="mt-3 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800"><b>Requiere atención:</b> ${atn.map((r) => `${r[0]} (${r[1]}) en ${d.cols.filter((_, k) => r[2][k] < 50).join(' y ')}`).join('; ')}.</div>` : ''}`, 'Reporte de logro');
  }, bind() {
    const set = (id, k) => { const e = $('#' + id); if (e) e.onchange = (ev) => { S.rep[k] = ev.target.value; draw(); }; };
    set('fAsig', 'asig'); set('fNivel', 'nivel'); set('fCurso', 'curso'); set('fPer', 'periodo');
    const c = $('#clr'); if (c) c.onclick = () => { S.rep = { asig: 'Matemática', nivel: '6° básico', curso: 'Todos', periodo: PERIODS[0] }; draw(); };
    const d = repData(); if (!d) return;
    chart('cRep', { type: 'bar', data: { labels: d.rows.map((r) => r[0]), datasets: d.cols.map((c, k) => barDs(c, d.rows.map((r) => r[2][k]), COURSE_COLOR[c])) }, options: opts({ thresholds: S.semaforo ? SEM_LINES : null }), plugins: [thresholdPlugin] });
  } },

  { id: 'P-16', p: 'utp', name: 'Tendencia por período', hu: 'HU-3.2', hint: 'Compara el avance de un indicador entre cursos y meses (CA-3-1). Elige el indicador; las líneas punteadas marcan los umbrales del semáforo.', render() {
    const ind = REPORT[S.trendInd];
    const rows = COURSES.map((c) => { const t = trend(S.trendInd, c); return [c, t[0], t[3], t[3] - t[0]]; });
    return desktop('utp', `
      <div class="flex items-end justify-between mb-5"><div><div class="text-sm text-slate-500">Reportes › Tendencias</div><h1 class="text-2xl font-bold text-navy">Evolución del logro</h1>
      <p class="text-slate-500 text-sm">Matemática · 6° básico · agosto a noviembre 2026</p></div>
      <label class="text-xs text-slate-500">Indicador<select id="tInd" class="block mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800">${REPORT.map((r, i) => `<option value="${i}" ${i === S.trendInd ? 'selected' : ''}>${r[0]} · ${r[1]}</option>`).join('')}</select></label></div>
      ${card(`<div class="flex justify-between items-start mb-3"><div><div class="font-semibold">${ind[0]} · ${ind[1]}</div><div class="text-xs text-slate-500">Logro mensual por curso</div></div>${legend([...COURSES.map((c) => [COURSE_COLOR[c], c]), ['#dc2626', 'Umbral 50%', true], ['#059669', 'Umbral 80%', true]])}</div>${chartBox('cTrend', 300)}`, 'p-6 mb-5')}
      <div class="grid grid-cols-3 gap-4">${rows.map(([c, a, b, dlt]) => card(`<div class="flex items-center gap-2 text-sm font-semibold"><span class="legend-sw" style="background:${COURSE_COLOR[c]}"></span>${c}</div>
        <div class="flex items-end gap-3 mt-2"><div class="text-3xl font-bold text-navy">${b}%</div><div class="text-sm font-semibold ${dlt >= 0 ? 'text-emerald-700' : 'text-red-700'} pb-1">${dlt >= 0 ? '▲' : '▼'} ${Math.abs(dlt)} pts.</div></div>
        <div class="text-xs text-slate-500 mt-1">Desde ${a}% en agosto</div>`, 'p-5')).join('')}</div>`, 'Tendencias');
  }, bind() {
    $('#tInd').onchange = (e) => { S.trendInd = +e.target.value; draw(); };
    chart('cTrend', { type: 'line', data: { labels: MONTHS, datasets: COURSES.map((c) => lineDs(c, trend(S.trendInd, c), COURSE_COLOR[c])) }, options: opts({ thresholds: SEM_LINES }), plugins: [thresholdPlugin] });
  } },

  { id: 'P-17', p: 'utp', name: 'Exportar reporte', hu: 'HU-3.3', hint: 'El archivo contiene los mismos datos y filtros que se ven en pantalla (CA-3-6) y solo datos agregados por curso (CA-3-7).',
    states: [['Excel', () => S.exportFmt = 'xlsx'], ['PDF', () => S.exportFmt = 'pdf']],
    render() {
    const d = repData() || { cols: COURSES, rows: [] }, f = S.rep, xl = S.exportFmt === 'xlsx';
    const preview = xl ? `<div class="bg-white border rounded-lg overflow-hidden text-[11px] font-mono">
        <div class="flex bg-emerald-700 text-white px-3 py-1.5 text-xs font-sans font-semibold">Reporte_logro_6basico.xlsx</div>
        <table class="w-full"><thead><tr class="bg-slate-100 text-slate-500">${['', 'A', 'B', ...d.cols.map((_, k) => 'CDEF'[k]), 'G'].slice(0, d.cols.length + 3).map((h) => `<th class="border px-2 py-0.5 font-normal">${h}</th>`).join('')}</tr></thead><tbody>
        <tr><td class="border px-2 bg-slate-100 text-slate-500">1</td><td class="border px-2 font-bold" colspan="${d.cols.length + 2}">Filtros: ${f.asig} · ${f.nivel} · ${f.curso} · ${f.periodo}</td></tr>
        <tr><td class="border px-2 bg-slate-100 text-slate-500">2</td><td class="border px-2 font-bold">Indicador</td><td class="border px-2 font-bold">Descripción</td>${d.cols.map((c) => `<td class="border px-2 font-bold">${c}</td>`).join('')}</tr>
        ${d.rows.map((r, i) => `<tr><td class="border px-2 bg-slate-100 text-slate-500">${i + 3}</td><td class="border px-2">${r[0]}</td><td class="border px-2 truncate max-w-[180px]">${r[1]}</td>${r[2].map((v) => `<td class="border px-2 text-right">${v}%</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
      : `<div class="bg-white shadow mx-auto w-[400px] p-6 text-[10px]"><div class="flex justify-between border-b pb-2">${logo(false).replace('text-lg', 'text-sm')}<span class="text-slate-500">Colegio Alerce Andino</span></div>
        <div class="font-bold text-[13px] text-navy mt-3">Reporte de logro por indicador</div><div class="text-slate-500">${f.asig} · ${f.nivel} · ${f.curso} · ${f.periodo}</div>
        <table class="w-full mt-3"><tr class="bg-navy-50 text-navy"><th class="text-left p-1">Indicador</th>${d.cols.map((c) => `<th class="p-1">${c}</th>`).join('')}</tr>${d.rows.map((r) => `<tr class="border-t"><td class="p-1">${r[0]}</td>${r[2].map((v) => `<td class="text-center p-1">${S.semaforo ? `<span class="inline-block w-1.5 h-1.5 rounded-full ${dot(v)} mr-1"></span>` : ''}${v}%</td>`).join('')}</tr>`).join('')}</table>
        <div class="text-slate-400 mt-4">Solo datos agregados por curso · generado el 19 nov 2026</div></div>`;
    return desktop('utp', `
      <div class="text-sm text-slate-500">Reportes › Exportar</div><h1 class="text-2xl font-bold text-navy mb-6">Exportar reporte</h1>
      <div class="flex gap-6">
        <div class="w-80 shrink-0 space-y-4">
          ${card(`<div class="font-semibold mb-3">Formato</div><div class="space-y-2">${[['xlsx', 'Excel (.xlsx)', 'Para analizar y filtrar'], ['pdf', 'PDF', 'Para presentar en reunión técnica']].map(([k, t, s]) => `<label class="flex gap-3 p-3 rounded-lg border cursor-pointer ${S.exportFmt === k ? 'border-navy bg-navy-50' : 'border-slate-200'}"><input type="radio" name="fmt" value="${k}" ${S.exportFmt === k ? 'checked' : ''} class="accent-[#1F3864] mt-0.5"><span class="text-sm"><b>${t}</b><span class="block text-xs text-slate-500">${s}</span></span></label>`).join('')}</div>`, 'p-5')}
          ${card(`<div class="font-semibold mb-2">Filtros incluidos</div><dl class="text-sm space-y-1.5">${[['Asignatura', f.asig], ['Nivel', f.nivel], ['Curso', f.curso], ['Período', f.periodo]].map(([a, b]) => `<div class="flex justify-between"><dt class="text-slate-500">${a}</dt><dd class="font-medium">${b}</dd></div>`).join('')}</dl><a data-go="P-11" class="text-xs text-navy font-semibold block mt-3">Cambiar filtros en el reporte ›</a>`, 'p-5')}
          <div class="rounded-lg bg-navy-50 text-navy text-xs p-3">🔒 El archivo solo incluye datos agregados por curso. No contiene nombres ni resultados individuales.</div>
          ${btn(`⬇ Descargar ${xl ? 'Excel' : 'PDF'}`, P1 + ' w-full py-3', 'id="doExp"')}
        </div>
        <div class="flex-1 bg-slate-200 rounded-xl p-6"><div class="text-xs text-slate-500 mb-3">Vista previa</div>${preview}</div>
      </div>`, 'Exportar');
  }, bind() {
    $$('input[name=fmt]').forEach((r) => r.onchange = () => { S.exportFmt = r.value; draw(); });
    $('#doExp').onclick = () => toast(`Se descargaría Reporte_logro_6basico.${S.exportFmt}.`);
  } },

  // ------------------------------------------------------------------ APODERADO (concepto)
  { id: 'P-20', p: 'apo', name: 'Correo de notificación', hu: 'HU-6 · postergada', hint: 'Concepto para una versión posterior: el apoderado recibe un correo cuando se publica el nivel de logro de su pupilo/a (RF-12). Fuera del MVP.', render() {
    return phone(`
      <div class="px-5 py-2 flex items-center gap-3 border-b"><span class="text-navy text-lg">‹</span><span class="text-sm font-semibold flex-1">Bandeja de entrada</span><span class="text-slate-400">⋯</span></div>
      <div class="flex-1 phone-scroll px-5 py-4">
        ${conceptBanner('HU-6')}
        <div class="flex items-center gap-3 mt-4"><div class="w-10 h-10 rounded-full bg-navy grid place-items-center text-white font-bold">E</div><div class="flex-1"><div class="text-sm font-semibold">EvalAI · Colegio Alerce Andino</div><div class="text-xs text-slate-500">para Claudia González · 2 dic, 10:20</div></div></div>
        <h2 class="text-lg font-bold mt-4 leading-snug">Martina ya tiene su resultado en Razones</h2>
        <div class="rounded-2xl border border-slate-200 p-4 mt-4">
          <div class="text-xs text-slate-500">Matemática · 6° A · Profesora Carla Rojas</div>
          <div class="flex items-end gap-2 mt-2"><div class="text-4xl font-bold text-navy">70%</div><div class="text-sm text-slate-500 pb-1">de logro</div></div>
          <div class="mt-4 space-y-2.5">${[['Explican el concepto de razón', 100], ['Identifican razones equivalentes', 33], ['Resuelven problemas con razones', 80]].map(([t, v]) => `<div><div class="flex justify-between text-xs mb-1"><span>${t}</span><b>${v}%</b></div><div class="h-2 bg-slate-100 rounded-full"><div class="h-full rounded-full ${dot(v)}" style="width:${v}%"></div></div></div>`).join('')}</div>
        </div>
        <div class="rounded-xl bg-gold-50 p-3 mt-4 text-sm"><b>¿Cómo acompañarla?</b> Practiquen juntos con recetas: «si 2 tazas de harina son para 1 de leche, ¿cuánta leche para 6 tazas?».</div>
        ${btn('Ver el progreso de Martina', P1 + ' w-full py-3 mt-5', 'data-go="P-21"')}
        <p class="text-[10px] text-slate-400 mt-4 text-center">Recibes este correo porque eres apoderada registrada. Puedes dejar de recibirlos.</p>
      </div>`);
  } },

  { id: 'P-21', p: 'apo', name: 'Progreso del pupilo', hu: 'HU-6 · postergada', hint: 'Concepto: vista móvil del apoderado con la evolución del logro de su pupilo/a frente al promedio del curso. Fuera del MVP.', render() {
    return phone(`
      <div class="px-5 py-2 flex items-center justify-between"><a data-go="P-20" class="text-navy text-sm">‹ Correo</a>${logo(false).replace('text-lg', 'text-base')}<span class="w-10"></span></div>
      <div class="flex-1 phone-scroll px-5 pb-5">
        ${conceptBanner('HU-6')}
        <div class="flex items-center gap-3 mt-4"><div class="w-11 h-11 rounded-full bg-gold/20 text-gold grid place-items-center font-bold">MG</div><div><div class="font-bold">Martina González</div><div class="text-xs text-slate-500">6° A · Matemática</div></div></div>
        <div class="grid grid-cols-2 gap-2 mt-4"><div class="rounded-xl bg-navy-50 p-3"><div class="text-2xl font-bold text-navy">74%</div><div class="text-[11px] text-slate-600">logro del semestre</div></div><div class="rounded-xl bg-emerald-50 p-3"><div class="text-2xl font-bold text-emerald-700">▲ 9</div><div class="text-[11px] text-slate-600">pts. desde agosto</div></div></div>
        <div class="font-semibold text-sm mt-5">Evolución por evaluación</div>
        <div class="mt-1 mb-2">${legend([[NAVY, 'Martina'], ['#94a3b8', 'Promedio del curso', true]])}</div>
        ${chartBox('cApo', 170)}
        <div class="font-semibold text-sm mt-5 mb-2">Indicadores a reforzar</div>
        <div class="space-y-2">${[['Identifican razones equivalentes', 33], ['Adiciones con distinto denominador', 50]].map(([t, v]) => `<div class="flex items-center justify-between rounded-xl border p-3 text-sm"><span>${t}</span>${pill(v)}</div>`).join('')}</div>
      </div>`);
  }, bind() {
    chart('cApo', { type: 'line', data: { labels: ['Decimales', 'Fracciones', 'Mixtos', 'Porcent.', 'Razones'], datasets: [lineDs('Martina', [65, 70, 80, 75, 70], NAVY), lineDs('Promedio del curso', [61, 64, 70, 72, 73], '#94a3b8', { borderDash: [5, 4], pointRadius: 0, borderWidth: 2 })] }, options: { ...opts({ max: 100 }), scales: { ...opts().scales, y: { ...opts().scales.y, min: 50, ticks: { ...opts().scales.y.ticks, stepSize: 10 } } } } });
  } },

  // ------------------------------------------------------------------ INSTITUCIÓN
  { id: 'P-22', p: 'inst', name: 'Base curricular', hu: 'RF-1 · RF-2', hint: 'El encargado carga asignaturas, niveles, OA e indicadores (RF-1), condición previa de HU-1.1. Los indicadores propios creados por docentes se marcan (RF-2).',
    states: [['Listado', () => S.importing = false], ['Importación', () => S.importing = true]],
    render() {
    const niveles = Object.keys(CURR[S.instAsig]);
    if (!CURR[S.instAsig][S.instNivel]) S.instNivel = niveles[niveles.length - 1];
    const oas = CURR[S.instAsig][S.instNivel], oa = oas[Math.min(S.instOa, oas.length - 1)];
    const totalOa = Object.values(CURR).flatMap((a) => Object.values(a)).flat();
    const overlay = S.importing ? `<div class="absolute inset-0 bg-slate-900/40 grid place-items-center"><div class="bg-white rounded-2xl p-8 w-[480px] shadow-xl">
        <h2 class="text-lg font-bold text-navy">Importar currículum</h2><p class="text-sm text-slate-500 mt-1">Bases curriculares MINEDUC · archivo CSV</p>
        <div class="mt-5 rounded-xl border-2 border-dashed border-slate-300 p-5 text-center text-sm"><div class="text-2xl">📄</div><div class="font-semibold mt-1">bases_curriculares_basica_2026.csv</div><div class="text-xs text-slate-500">412 KB</div></div>
        <div class="mt-5 space-y-2 text-sm">${[['Asignaturas', 2], ['Niveles', 4], ['OA', 48], ['Indicadores de logro', 212]].map(([t, n]) => `<div class="flex justify-between"><span class="text-slate-600">✓ ${t}</span><b>${n}</b></div>`).join('')}<div class="flex justify-between text-amber-700"><span>! Filas con error</span><b>3</b></div></div>
        <div class="flex gap-2 justify-end mt-6">${btn('Cancelar', P2, 'id="cImp"')}${btn('Confirmar importación', P1, 'id="okImp"')}</div></div></div>` : '';
    return desktop('inst', `
      <div class="flex items-end justify-between mb-5"><div><div class="text-sm text-slate-500">Institución</div><h1 class="text-2xl font-bold text-navy">Base curricular</h1><p class="text-sm text-slate-500">${Object.keys(CURR).length} asignaturas · ${totalOa.length} OA · ${totalOa.reduce((s, o) => s + o.ind.length, 0)} indicadores cargados</p></div>
      <div class="flex gap-2">${btn('⬆ Importar CSV', P2, 'id="imp"')}${btn('+ Nuevo OA', P1, 'id="newOa"')}</div></div>
      <div class="flex gap-5">
        <div class="w-64 shrink-0 space-y-3">${Object.keys(CURR).map((a) => card(`<div class="px-4 py-3 font-semibold text-sm border-b">${a}</div><div class="p-2">${Object.keys(CURR[a]).map((n) => `<button data-an="${a}|${n}" class="w-full flex justify-between text-left text-sm px-3 py-2 rounded-lg ${a === S.instAsig && n === S.instNivel ? 'bg-navy-50 text-navy font-semibold' : 'hover:bg-slate-50'}"><span>${n}</span><span class="text-xs text-slate-400">${CURR[a][n].length} OA</span></button>`).join('')}</div>`)).join('')}</div>
        <div class="flex-1 space-y-4">
          ${card(`<div class="px-5 py-3 border-b text-sm font-semibold">${S.instAsig} · ${S.instNivel}</div><div class="divide-y">${oas.map((o, i) => `<button data-oa="${i}" class="w-full text-left px-5 py-3 flex items-center justify-between text-sm ${o === oa ? 'bg-navy-50' : 'hover:bg-slate-50'}"><span class="font-medium ${o === oa ? 'text-navy' : ''}">${o.oa}</span><span class="text-xs text-slate-500">${o.ind.length} indicadores${(o.own || []).length ? ` · ${o.own.length} propio` : ''}</span></button>`).join('')}</div>`, 'overflow-hidden')}
          ${card(`<div class="flex justify-between items-center mb-3"><div class="font-semibold">${oa.oa}</div><span class="text-xs text-slate-400">Usado en 5 evaluaciones</span></div><ul class="space-y-2">${oa.ind.map((t, i) => `<li class="flex items-center gap-3 text-sm rounded-lg border px-3 py-2"><b class="text-navy w-6">I${i + 1}</b><span class="flex-1">${t}</span>${(oa.own || []).includes(i) ? '<span class="text-[10px] font-semibold bg-gold-50 text-gold rounded px-1.5 py-0.5">Propio · docente</span>' : '<span class="text-[10px] text-slate-400">MINEDUC</span>'}</li>`).join('')}</ul>`, 'p-5')}
        </div>
      </div>`, 'Base curricular', overlay);
  }, bind() {
    $$('[data-an]').forEach((b) => b.onclick = () => { [S.instAsig, S.instNivel] = b.dataset.an.split('|'); S.instOa = 0; draw(); });
    $$('[data-oa]').forEach((b) => b.onclick = () => { S.instOa = +b.dataset.oa; draw(); });
    $('#imp').onclick = () => { S.importing = true; draw(); };
    $('#newOa').onclick = () => toast('Formulario de nuevo OA (fuera del alcance de este mockup).');
    const c = $('#cImp'); if (c) c.onclick = () => { S.importing = false; draw(); };
    const o = $('#okImp'); if (o) o.onclick = () => { S.importing = false; toast('Currículum importado: 48 OA y 212 indicadores. 3 filas quedaron para revisar.'); draw(); };
  } },

  { id: 'P-23', p: 'inst', name: 'Cursos y cuentas', hu: 'RNF-3 · gestión', hint: 'El encargado administra cursos, docentes y estudiantes, y ve el uso de EvalAI por docente. «Invitar usuario» asigna un perfil (Docente, UTP, Estudiante).',
    states: [['Listado', () => S.invite = false], ['Invitar usuario', () => S.invite = true]],
    render() {
    const courses = [['6° A', 'Carla Rojas', 32, 12], ['6° B', 'Carla Rojas', 31, 9], ['6° C', 'Carla Rojas', 32, 10], ['5° A', 'Jorge Medina', 30, 6], ['5° B', 'Ana Castro', 29, 4]];
    const overlay = S.invite ? `<div class="absolute inset-0 bg-slate-900/40 grid place-items-center"><div class="bg-white rounded-2xl p-8 w-[460px] shadow-xl">
        <h2 class="text-lg font-bold text-navy">Invitar usuario</h2>
        <label class="block text-sm mt-5"><span class="text-slate-600">Correo institucional</span><input value="jorge.medina@alerceandino.cl" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"></label>
        <div class="text-sm text-slate-600 mt-4 mb-2">Perfil</div>
        <div class="grid grid-cols-3 gap-2">${['Docente', 'Coordinación (UTP)', 'Estudiante'].map((r, i) => `<label class="text-center text-xs rounded-lg border p-3 cursor-pointer ${i === 0 ? 'border-navy bg-navy-50 font-semibold text-navy' : ''}"><input type="radio" name="rol" ${i === 0 ? 'checked' : ''} class="hidden">${r}</label>`).join('')}</div>
        <label class="block text-sm mt-4"><span class="text-slate-600">Cursos asignados</span><div class="mt-1 flex gap-2 flex-wrap">${['5° A', '5° B'].map((c) => `<span class="px-2 py-1 rounded-full bg-navy-50 text-navy text-xs font-semibold">${c} ✕</span>`).join('')}</div></label>
        <p class="text-xs text-slate-500 mt-4 bg-slate-50 rounded-lg p-2">Cada perfil ve solo lo que le corresponde: el UTP ve datos agregados; el docente, los resultados de sus cursos.</p>
        <div class="flex gap-2 justify-end mt-6">${btn('Cancelar', P2, 'id="cInv"')}${btn('Enviar invitación', P1, 'id="okInv"')}</div></div></div>` : '';
    return desktop('inst', `
      <div class="flex items-end justify-between mb-5"><div><div class="text-sm text-slate-500">Institución</div><h1 class="text-2xl font-bold text-navy">Cursos y cuentas</h1></div>${btn('+ Invitar usuario', P1, 'id="inv"')}</div>
      <div class="grid grid-cols-4 gap-4 mb-5">${kpi('Docentes', '14', '12 activos este mes')}${kpi('Coordinación (UTP)', '2')}${kpi('Estudiantes', '412', 'en 14 cursos')}${kpi('Evaluaciones', '96', 'en el semestre')}</div>
      <div class="grid grid-cols-5 gap-4">
        ${card(`<div class="px-5 py-3 border-b font-semibold text-sm">Cursos</div><table class="w-full text-sm"><thead class="text-slate-500 bg-slate-50"><tr><th class="text-left px-5 py-2">Curso</th><th class="text-left">Docente (Matemática)</th><th>Estudiantes</th><th>Evaluaciones</th></tr></thead><tbody>${courses.map((c) => `<tr class="border-t"><td class="px-5 py-2.5 font-semibold text-navy">${c[0]}</td><td>${c[1]}</td><td class="text-center">${c[2]}</td><td class="text-center">${c[3]}</td></tr>`).join('')}</tbody></table>`, 'col-span-3 overflow-hidden')}
        ${card(`<div class="font-semibold text-sm">Evaluaciones creadas por docente</div><div class="text-xs text-slate-500 mb-3">2° semestre 2026</div>${chartBox('cUse', 230)}`, 'col-span-2 p-5')}
      </div>`, 'Cursos y cuentas', overlay);
  }, bind() {
    $('#inv').onclick = () => { S.invite = true; draw(); };
    const c = $('#cInv'); if (c) c.onclick = () => { S.invite = false; draw(); };
    const o = $('#okInv'); if (o) o.onclick = () => { S.invite = false; toast('Invitación enviada con perfil Docente.'); draw(); };
    const doc = [['Carla Rojas', 31], ['Jorge Medina', 14], ['Ana Castro', 12], ['Luis Vera', 11], ['Paula Ortiz', 9], ['Marcela Rivas', 8], ['Hugo Saavedra', 6], ['Otros (7)', 5]];
    chart('cUse', { type: 'bar', data: { labels: doc.map((d) => d[0]), datasets: [barDs('Evaluaciones', doc.map((d) => d[1]), NAVY, { maxBarThickness: 16 })] }, options: opts({ pct: false, horizontal: true, tipSuffix: '' }) });
  } }
];

// Datos filtrados del reporte UTP (null = sin evaluaciones corregidas, CA-3-5)
function repData() {
  const f = S.rep;
  if (f.periodo === '2025' || f.asig !== 'Matemática' || f.nivel !== '6° básico') return null;
  const shift = f.periodo === '1° semestre 2026';
  const cols = f.curso === 'Todos' ? COURSES : [f.curso];
  return { cols, rows: REPORT.map(([code, desc, vals], i) => [code, desc, cols.map((c) => { const k = COURSES.indexOf(c); let v = vals[k]; if (shift) v = Math.max(20, v - 5 - ((i * 7 + k * 3) % 11)); return v; })]) };
}

// ===================== Navegación =====================
let idx = 0;
const stSel = {}; // estado elegido por pantalla (para marcar el botón activo)
const cur = () => SCREENS[idx];
function go(id) { const i = SCREENS.findIndex((s) => s.id === id); if (i >= 0) { idx = i; try { history.replaceState(null, '', '#' + id); } catch (e) { /* file:// */ } draw(); window.scrollTo(0, 0); } }
function draw() {
  const sc = cur();
  killCharts();
  $('#stage').innerHTML = '<div class="w-max mx-auto">' + sc.render() + '</div>';
  $('#screenSel').value = sc.id;
  $('#fabId').textContent = sc.id;
  const pr = PROFILES.find((p) => p.k === sc.p);
  $('#hint').innerHTML = `<b class="text-gold">${sc.id} · ${sc.name}</b> · ${pr ? pr.name + ' · ' : ''}${sc.hu} — ${sc.hint}`;
  $('#states').innerHTML = (sc.states || []).map((s, i) => `<button data-st="${i}" class="tb-btn text-xs ${stSel[sc.id] === i ? 'on' : ''}">${s[0]}</button>`).join('');
  $$('[data-st]').forEach((b) => b.onclick = () => { stSel[sc.id] = +b.dataset.st; sc.states[+b.dataset.st][1](); draw(); });
  $$('#profiles [data-prof]').forEach((b) => b.classList.toggle('on', b.dataset.prof === sc.p));
  $$('#stage [data-go]').forEach((e) => e.addEventListener('click', () => go(e.dataset.go)));
  if (sc.bind) sc.bind();
}

// Barra superior: perfiles y selector agrupado
$('#profiles').innerHTML = [{ k: 'map', name: 'Mapa' }, ...PROFILES].map((p) => `<button data-prof="${p.k}" class="prof-btn">${p.name}${p.concept ? ' <span class="opacity-60">(concepto)</span>' : ''}</button>`).join('');
$$('#profiles [data-prof]').forEach((b) => b.onclick = () => { const s = SCREENS.find((x) => x.p === b.dataset.prof); if (s) go(s.id); });
$('#screenSel').innerHTML = [{ k: 'map', name: 'Mapa' }, ...PROFILES].map((p) => `<optgroup label="${p.name}">${SCREENS.filter((s) => s.p === p.k).map((s) => `<option value="${s.id}">${s.id} · ${s.name} (${s.hu})</option>`).join('')}</optgroup>`).join('');
$('#screenSel').onchange = (e) => go(e.target.value);
$('#prev').onclick = () => { idx = (idx - 1 + SCREENS.length) % SCREENS.length; go(cur().id); };
$('#next').onclick = () => { idx = (idx + 1) % SCREENS.length; go(cur().id); };
document.querySelectorAll('#toolbar [data-go]').forEach((e) => e.onclick = () => go(e.dataset.go));

// Mostrar / ocultar la barra (oculta por defecto; se recuerda la preferencia)
function setBar(open) {
  $('#toolbar').classList.toggle('hidden', !open);
  document.body.classList.toggle('bar-open', open);
  try { localStorage.setItem('evalai.bar', open ? '1' : '0'); } catch (e) { /* sin almacenamiento */ }
}
function toggleBar() { setBar($('#toolbar').classList.contains('hidden')); }
$('#hide').onclick = toggleBar; $('#showBar').onclick = toggleBar;
let barPref = '0'; try { barPref = localStorage.getItem('evalai.bar') || '0'; } catch (e) { /* */ }
setBar(barPref === '1');

document.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
  if (e.key === 'h' || e.key === 'H') toggleBar();
  if (e.key === 'm' || e.key === 'M') go('P-00');
  if (e.key === 'ArrowRight') $('#next').click();
  if (e.key === 'ArrowLeft') $('#prev').click();
});

// Captura PNG de la pantalla actual
$('#dl').onclick = async () => {
  const el = $('#capture'); const sc = cur();
  if (!window.html2canvas) { toast('No se pudo cargar la librería de captura. Usa la captura de pantalla del sistema.'); return; }
  toast('Generando imagen…');
  const extra = sc.states && stSel[sc.id] != null ? '_' + sc.states[stSel[sc.id]][0] : '';
  const canvas = await html2canvas(el, { scale: 2, backgroundColor: null, useCORS: true });
  const a = document.createElement('a');
  a.download = `${sc.id}_${(sc.name + extra).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w]+/g, '_')}.png`;
  a.href = canvas.toDataURL('image/png'); a.click();
};

// Chart.js: tipografía y color por defecto
if (window.Chart) { Chart.defaults.font.family = 'Inter, system-ui, sans-serif'; Chart.defaults.color = INK2; }

// Enlace directo a un estado: #P-11~1 aplica el estado 1 de P-11 (útil para capturas)
const [startId, startSt] = (location.hash || '#P-00').slice(1).split('~');
const startSc = SCREENS.find((s) => s.id === startId);
if (startSc && startSc.states && startSt != null && startSc.states[+startSt]) { stSel[startId] = +startSt; startSc.states[+startSt][1](); }
go(startId);
