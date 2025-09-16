// Theme persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = toggle && toggle.querySelector('.icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (saved) {
    setTheme(saved);
  } else if (prefersDark) {
    setTheme('dark');
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      setTheme(next);
    });
  }
})();

// Contact form -> email via mailto
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
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

    if (!name || !email) {
      alert('Please provide your name and email.');
      return;
    }

    const subject = encodeURIComponent(`Class booking inquiry — ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      ages ? `Students' Ages: ${ages}` : '',
      `Package Interest: ${pkg}`,
      date ? `Preferred Date: ${date}` : '',
      '',
      'Additional Information:',
      message || '(none)'
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:hello@sewsmartcreations.com?subject=${subject}&body=${body}`;

    // Try to open mail client
    window.location.href = mailto;

    // As fallback, also open in a new tab (some browsers block direct navigation)
    setTimeout(() => {
      window.open(mailto, '_blank');
    }, 300);
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


