(() => {
  const toggle = document.getElementById('nav-toggle');
  const sidebar = document.getElementById('sidebar');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close sidebar when a nav link is tapped on mobile
    sidebar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) sidebar.classList.remove('open');
      });
    });

    // Close on outside click
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

  // Mark active nav link based on scroll position
  const sections = document.querySelectorAll('.content-section[id]');
  const navLinks = document.querySelectorAll('.sidebar a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.sidebar a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s));
})();
