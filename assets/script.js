// Theme persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const toggleMobile = document.getElementById('theme-toggle-mobile');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = toggle && toggle.querySelector('.icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    const iconM = toggleMobile && toggleMobile.querySelector('.icon');
    if (iconM) iconM.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (saved) {
    setTheme(saved);
  } else if (prefersDark) {
    setTheme('dark');
  }
  function onClick() {
    const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
    setTheme(next);
  }
  if (toggle) toggle.addEventListener('click', onClick);
  if (toggleMobile) toggleMobile.addEventListener('click', onClick);
})();

// Contact form -> email via mailto
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  // If using FormSubmit backend, let the browser submit normally
  if (form.getAttribute('data-backend') === 'formsubmit') return;
  // Otherwise fallback to mailto (kept for completeness if backend removed)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const ages = (data.get('ages') || '').toString().trim();
    const pkg = (data.get('package') || '').toString();
    const date = (data.get('date') || '').toString();
    const message = (data.get('message') || '').toString().trim();
    const subject = encodeURIComponent(`Class booking inquiry — ${name || 'New Inquiry'}`);
    const bodyLines = [
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      phone ? `Phone: ${phone}` : '',
      ages ? `Students' Ages: ${ages}` : '',
      `Package Interest: ${pkg}`,
      date ? `Preferred Date: ${date}` : '',
      '',
      'Additional Information:',
      message || '(none)'
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:sewsmartcreationsschool@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setTimeout(() => { window.open(mailto, '_blank'); }, 300);
  });
})();

// Scroll reveal: observe .reveal elements
(function () {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, idx) => {
    el.style.transitionDelay = `${Math.min(idx * 60, 300)}ms`;
    observer.observe(el);
  });
})();

// Mobile hamburger menu
(function () {
  const burger = document.getElementById('hamburger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  function setOpen(open) {
    burger.setAttribute('aria-expanded', String(open));
    if (open) {
      menu.classList.add('open');
      menu.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      menu.classList.remove('open');
      menu.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  menu.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.closest('a')) setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) setOpen(false);
  });
})();


