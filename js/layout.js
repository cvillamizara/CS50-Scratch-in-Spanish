(() => {
  'use strict';

  const WEEKS = [
    { slug: 'semana-1.html', label: 'Semana 1 — Objetos' },
    { slug: 'semana-2.html', label: 'Semana 2 — Funciones' },
    { slug: 'semana-3.html', label: 'Semana 3 — Eventos' },
    { slug: 'semana-4.html', label: 'Semana 4 — Valores' },
    { slug: 'semana-5.html', label: 'Semana 5 — Condiciones' },
    { slug: 'semana-6.html', label: 'Semana 6 — Bucles' },
    { slug: 'semana-7.html', label: 'Semana 7 — Variables' },
    { slug: 'semana-8.html', label: 'Semana 8 — Abstracción' },
    { slug: 'semana-9.html', label: 'Semana 9 — Construyendo desde Cero' },
  ];

  const pd = window.PAGE_DATA || {};
  const currentWeek = pd.week;

  // ── Templates ──────────────────────────────────────────────

  function sidebarHTML() {
    const weekLinks = WEEKS.map((w, i) => {
      const active = i === currentWeek ? ' class="active"' : '';
      return `<li><a href="${w.slug}"${active}>${w.label}</a></li>`;
    }).join('\n          ');

    return `
      <button id="nav-toggle" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav id="sidebar" class="sidebar" aria-label="Navegación del curso">
        <div class="sidebar-title">
          <a href="index.html">
            Introducción a la Programación con Scratch
          </a>
        </div>

        <div class="sidebar-weeks">
          <ul>
          ${weekLinks}
          </ul>
        </div>

        <div class="sidebar-attribution">
          Adaptación en español de
          <a href="https://cs50.harvard.edu/scratch/weeks/1/" target="_blank" rel="noopener">
            CS50's Introduction to Programming with Scratch
          </a>
          de Harvard University. Contenido original del equipo de CS50.
          Licencia Creative Commons.
        </div>
      </nav>`;
  }

  function footerHTML() {
    return `
      <footer class="site-footer">
        <p>
          Adaptación en español de
          <a href="https://cs50.harvard.edu/scratch/" target="_blank" rel="noopener">CS50's Introduction to Programming with Scratch</a>
          de la Universidad de Harvard (&copy; President and Fellows of Harvard College),
          licenciado bajo
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>.
          Esta adaptación incluye cambios al material original y se distribuye bajo la misma licencia.
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

    if (hm) hm.remove();
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
