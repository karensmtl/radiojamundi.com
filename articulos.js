/* =========================================
   RADIO JAMUNDI — app.js
   Navegación entre secciones + Radio
   ========================================= */

// ─── ESTADO ──────────────────────────────────
const state = {
  playing: false,
};

// ─── SECCIONES REGISTRADAS ───────────────────
// Agrega aquí el id de cada sección que crees
const SECTIONS = {
  home:      document.querySelector('.homePage'),
  noticias:  document.getElementById('catNoticias'),
  deportes:  document.getElementById('catDeportes'),
  cultura:   document.getElementById('catCultura'),
  politica:  document.getElementById('catPolitica'),
};

// ─── OCULTAR TODAS LAS SECCIONES ─────────────
function hideAll() {
  Object.values(SECTIONS).forEach(section => {
    if (section) section.style.display = 'none';
  });
}

// ─── MOSTRAR UNA SECCIÓN ──────────────────────
function showSection(key) {
  hideAll();
  const target = SECTIONS[key];
  if (target) {
    target.style.display = 'block';
    // Scroll suave al top al cambiar de sección
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ─── NAVEGAR AL HOME ──────────────────────────
function goHome() {
  showSection('home');
  setActiveBySection('home');
}

// ─── MOSTRAR SECCIÓN DESDE NAV ───────────────
// Llamado desde los onclick del nav
function showHome(section) {
  if (!section) {
    showSection('home');
  } else {
    showSection(section);
    updateCatHero(section);
  }
}

// ─── ACTUALIZAR HERO DE CATEGORÍA ────────────
const CAT_META = {
  noticias: {
    icon:  'N',
    title: '<span class="cat-accent">N</span>OTICIAS',
    desc:  'Todo lo que está pasando en Colombia y el mundo. Información verificada y actualizada.',
  },
  deportes: {
    icon:  'D',
    title: '<span class="cat-accent">D</span>EPORTES',
    desc:  'Resultados, fichajes y todo el deporte nacional e internacional.',
  },
  cultura: {
    icon:  'C',
    title: '<span class="cat-accent">C</span>ULTURA',
    desc:  'Arte, música, cine y todo lo que mueve a nuestra región.',
  },
  politica: {
    icon:  'P',
    title: '<span class="cat-accent">P</span>OLÍTICA',
    desc:  'Decisiones, debates y análisis del panorama político colombiano.',
  },
};

function updateCatHero(section) {
  const meta = CAT_META[section];
  if (!meta) return;

  // Actualiza el hero si el HTML lo comparte (id="catHero")
  const heroIcon  = document.querySelector('#catHero .cat_hero_icon');
  const heroTitle = document.querySelector('#catHero .cat_hero_text h1');
  const heroDesc  = document.querySelector('#catHero .cat_hero_text .parraf');

  if (heroIcon)  heroIcon.textContent  = meta.icon;
  if (heroTitle) heroTitle.innerHTML   = meta.title;
  if (heroDesc)  heroDesc.textContent  = meta.desc;
}

// ─── MARCAR LINK ACTIVO EN EL NAV ────────────
function setActive(el) {
  document.querySelectorAll('.nav_list a').forEach(a => a.classList.remove('active'));
  el.classList.add('active');
}

// Marcar activo por nombre de sección (para goHome y carga inicial)
function setActiveBySection(section) {
  document.querySelectorAll('.nav_list a').forEach(a => {
    a.classList.remove('active');
    // Detecta por el onclick del elemento
    const onclick = a.getAttribute('onclick') || '';
    if (section === 'home'  && onclick.includes('showHome()')) a.classList.add('active');
    if (section !== 'home'  && onclick.includes(`'${section}'`)) a.classList.add('active');
  });
}

// ─── RADIO PLAYER ────────────────────────────
function toggleRadio() {
  const audio   = document.getElementById('miReproductor');
  const icon    = document.getElementById('radioPlayIcon');
  const label   = document.getElementById('radioPlayLabel');
  const bars    = document.querySelectorAll('.rv-bar');

  if (!audio) return;

  if (state.playing) {
    audio.pause();
    icon.textContent   = '▶';
    label.textContent  = 'Escuchar en vivo';
    // Pausa animación de barras
    bars.forEach(b => b.style.animationPlayState = 'paused');
    state.playing = false;
  } else {
    audio.play().catch(() => {
      label.textContent = 'Error al cargar el stream';
    });
    icon.textContent   = '⏸';
    label.textContent  = 'En vivo · Reproduciendo';
    // Reanuda animación de barras
    bars.forEach(b => b.style.animationPlayState = 'running');
    state.playing = true;
  }
}

// ─── ABRIR ARTÍCULO ──────────────────────────
// Placeholder: aquí conectarás tu lógica de artículo
function openArticle(id) {
  console.log('Abrir artículo:', id);
  // TODO: mostrar modal o página de artículo con el id
}

// ─── TICKER DINÁMICO (opcional) ──────────────
// Puedes reemplazar los spans del ticker con noticias reales
function updateTicker(headlines) {
  const track = document.querySelector('.ticker_track');
  if (!track || !headlines.length) return;
  // Duplicamos para loop infinito
  const all = [...headlines, ...headlines];
  track.innerHTML = all.map(h => `<span>${h}</span>`).join('');
}

// Ejemplo de uso:
// updateTicker(['Colombia gana 3-0', 'Precio del dólar sube', 'Nuevo alcalde en Cali']);

// ─── INICIALIZACIÓN ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar home al cargar
  hideAll();
  if (SECTIONS.home) SECTIONS.home.style.display = 'block';

  // Marcar INICIO como activo
  const inicioLink = document.querySelector('.nav_list a');
  if (inicioLink) inicioLink.classList.add('active');

  // Las barras del visualizador empiezan pausadas hasta que se da play
  document.querySelectorAll('.rv-bar').forEach(b => {
    b.style.animationPlayState = 'paused';
  });
});