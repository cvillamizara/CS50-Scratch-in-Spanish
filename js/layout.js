(() => {
  'use strict';

  const WEEKS = [
    { slug: 'semana-0.html', label: 'Semana 0 — Sprites' },
    { slug: 'semana-1.html', label: 'Semana 1 — Funciones' },
    { slug: 'semana-2.html', label: 'Semana 2 — Eventos' },
    { slug: 'semana-3.html', label: 'Semana 3 — Valores' },
    { slug: 'semana-4.html', label: 'Semana 4 — Condiciones' },
    { slug: 'semana-5.html', label: 'Semana 5 — Bucles' },
    { slug: 'semana-6.html', label: 'Semana 6 — Variables' },
    { slug: 'semana-7.html', label: 'Semana 7 — Abstracción' },
    { slug: 'semana-8.html', label: 'Semana 8 — Construyendo desde Cero' },
    { slug: 'proyecto-final.html', label: 'Proyecto Final' },
  ];

  const pd = window.PAGE_DATA || {};
  const currentWeek = pd.week;   // 0-9 for week pages, undefined for homepage

  // ── Templates ──────────────────────────────────────────────

  function headerHTML() {
    return `
      <header class="site-header">
        <a href="index.html" class="header-brand">
          <span class="cs50-logo">CS50</span>
          <span class="course-name">Introducción a la Programación con Scratch</span>
        </a>
        <div class="header-right">
          <a class="header-link" href="https://cs50.harvard.edu/scratch/" target="_blank" rel="noopener">
            Ver en inglés ↗
          </a>
          <button id="nav-toggle" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>`;
  }

  function sidebarHTML() {
    const weekLinks = WEEKS.map((w, i) => {
      const active = i === currentWeek ? ' class="active"' : '';
      return `<li><a href="${w.slug}"${active}>${w.label}</a></li>`;
    }).join('\n          ');

    return `
      <nav id="sidebar" class="sidebar" aria-label="Navegación del curso">
        <div class="nav-section">
          <div class="nav-section-title">Semanas</div>
          <ul>
          ${weekLinks}
          </ul>
        </div>

        <div class="nav-divider"></div>

        <div class="nav-section">
          <div class="nav-section-title">Información</div>
          <ul>
            <li><a href="index.html#como-tomar">Cómo tomar este curso</a></li>
            <li><a href="index.html#como-ensenar">Cómo enseñar este curso</a></li>
            <li><a href="index.html#honestidad">Honestidad académica</a></li>
            <li><a href="index.html#certificado">Certificado CS50</a></li>
            <li><a href="index.html#preguntas">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div class="nav-divider"></div>

        <div class="nav-section">
          <div class="nav-section-title">Comunidad</div>
          <ul>
            <li><a href="https://discord.gg/cs50" target="_blank" rel="noopener">Discord</a></li>
            <li><a href="https://www.reddit.com/r/cs50/" target="_blank" rel="noopener">Reddit</a></li>
            <li><a href="https://cs50.stackexchange.com/" target="_blank" rel="noopener">Stack Exchange</a></li>
          </ul>
        </div>

        <div class="nav-divider"></div>

        <div class="nav-section">
          <div class="nav-section-title">Otros cursos CS50</div>
          <ul>
            <li><a href="https://cs50.harvard.edu/x/" target="_blank" rel="noopener">CS50x — Informática</a></li>
            <li><a href="https://cs50.harvard.edu/python/" target="_blank" rel="noopener">CS50 Python</a></li>
            <li><a href="https://cs50.harvard.edu/web/" target="_blank" rel="noopener">CS50 Web</a></li>
            <li><a href="https://cs50.harvard.edu/ai/" target="_blank" rel="noopener">CS50 IA</a></li>
            <li><a href="https://cs50.harvard.edu/sql/" target="_blank" rel="noopener">CS50 SQL</a></li>
          </ul>
        </div>
      </nav>`;
  }

  function footerHTML() {
    return `
      <footer class="site-footer">
        <p>
          &copy; 2024–2026 President and Fellows of Harvard College.
          Distribuido bajo
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">
            Creative Commons BY-NC-SA 4.0
          </a>.
        </p>
        <p class="attribution">
          Esta página es una adaptación en español de
          <a href="https://cs50.harvard.edu/scratch/" target="_blank" rel="noopener">
            CS50's Introduction to Programming with Scratch
          </a>
          de la Universidad de Harvard.
          Todo el contenido original pertenece al equipo de CS50 —
          David J. Malan, Brian Yu y colaboradores.
        </p>
      </footer>`;
  }

  function prevNextHTML() {
    if (currentWeek === undefined || currentWeek === null) return '';
    const prev = currentWeek > 0 ? WEEKS[currentWeek - 1] : null;
    const next = currentWeek < WEEKS.length - 1 ? WEEKS[currentWeek + 1] : null;
    return `
      <nav class="week-nav">
        <div class="week-nav-prev">
          ${prev ? `<a href="${prev.slug}">← ${prev.label}</a>` : ''}
        </div>
        <div class="week-nav-next">
          ${next ? `<a href="${next.slug}">${next.label} →</a>` : ''}
        </div>
      </nav>`;
  }

  // ── Mount ───────────────────────────────────────────────────

  function mount() {
    const get = id => document.getElementById(id);

    const hm = get('header-mount');
    const sm = get('sidebar-mount');
    const fm = get('footer-mount');
    const pm = get('prevnext-mount');

    if (hm) hm.innerHTML = headerHTML();
    if (sm) sm.innerHTML = sidebarHTML();
    if (fm) fm.innerHTML = footerHTML();
    if (pm) pm.innerHTML = prevNextHTML();

    initMobileNav();
    if (pd.isHome) initScrollObserver();
  }

  // ── Mobile nav ──────────────────────────────────────────────

  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const sidebar = document.getElementById('sidebar');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    sidebar.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
      });
    });

    document.addEventListener('click', e => {
      if (
        window.innerWidth <= 768 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !toggle.contains(e.target)
      ) {
        sidebar.classList.remove('open');
      }
    });
  }

  // ── Scroll-based active link (homepage only) ─────────────────

  function initScrollObserver() {
    const sections = document.querySelectorAll('.content-section[id]');
    const navLinks = document.querySelectorAll('.sidebar a[href^="index.html#"]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(
            `.sidebar a[href="index.html#${entry.target.id}"]`
          );
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  // ── Init ────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
