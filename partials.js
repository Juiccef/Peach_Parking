/* ─────────────────────────────────────────────────────────
   Peach Parking — shared partials (nav, footer, scripts)
   Each page loads this and injects the nav/footer into
   <div id="site-nav"></div> and <div id="site-footer"></div>.
   ───────────────────────────────────────────────────────── */

(function () {
  // Determine relative path prefix (sub-page like /services/* needs ../)
  const path = location.pathname.replace(/\\/g, '/');
  const inSub = /\/services\//.test(path);
  const pfx = inSub ? '../' : '';
  const activePage = (() => {
    if (path.endsWith('/about.html')) return 'about';
    if (/\/services\/file-a-claim\.html$/.test(path)) return 'contact';
    if (/\/services\//.test(path)) return 'services';
    if (path === '/' || path.endsWith('/index.html') || path === '') return 'home';
    return '';
  })();

  const navHTML = `
<div class="grain" aria-hidden="true"></div>
<header class="nav">
  <a class="nav__brand" href="${pfx}index.html" aria-label="Peach Parking Solutions home">
    <img src="${pfx}images/img7.png" class="nav__logo" alt="" />
    <div class="nav__brand-text">
      <span class="nav__brand-name">Peach Parking Solutions</span>
      <span class="nav__brand-sub">Atlanta, GA</span>
    </div>
  </a>
  <nav class="nav__links" aria-label="Main navigation">
    <a href="${pfx}index.html"${activePage==='home'?' class="is-active"':''}>Home</a>
    <div class="nav__dropdown-wrap">
      <button class="nav__dropdown-trigger${activePage==='services'?' is-active':''}" aria-haspopup="true" aria-expanded="false">
        Services <span class="nav__dropdown-arrow" aria-hidden="true">▾</span>
      </button>
      <ul class="nav__dropdown" role="menu">
        <li><a href="${pfx}services/valet-service.html" role="menuitem">Valet Service</a></li>
        <li><a href="${pfx}services/parking-management.html" role="menuitem">Parking Management</a></li>
        <li><a href="${pfx}services/event-parking.html" role="menuitem">Event Parking</a></li>
      </ul>
    </div>
    <a href="${pfx}about.html"${activePage==='about'?' class="is-active"':''}>About</a>
    <div class="nav__dropdown-wrap">
      <button class="nav__dropdown-trigger${activePage==='contact'?' is-active':''}" aria-haspopup="true" aria-expanded="false">
        Contact <span class="nav__dropdown-arrow" aria-hidden="true">▾</span>
      </button>
      <ul class="nav__dropdown" role="menu">
        <li><a href="${pfx}index.html#contact" role="menuitem">Get in Touch</a></li>
        <li><a href="${pfx}services/file-a-claim.html" role="menuitem">File a Claim</a></li>
        <li><a href="${pfx}index.html#stay-in-touch" role="menuitem">Follow Us</a></li>
      </ul>
    </div>
  </nav>
  <a href="${pfx}index.html#contact" class="btn btn--outline nav__cta">Get a Quote</a>
  <button class="nav__burger" aria-label="Open menu" onclick="this.closest('.nav').classList.toggle('open')">
    <span></span><span></span><span></span>
  </button>
</header>`;

  const footerHTML = `
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <img src="${pfx}images/img7.png" alt="Peach Parking Solutions logo" class="footer__logo" />
      <span class="footer__name">Peach Parking Solutions</span>
    </div>
    <nav class="footer__nav" aria-label="Footer navigation">
      <a href="${pfx}index.html">Home</a>
      <a href="${pfx}index.html#services">Services</a>
      <a href="${pfx}about.html">About</a>
      <a href="${pfx}index.html#contact">Contact</a>
    </nav>
    <div class="footer__social" aria-label="Follow us on social media">
      <a href="https://www.instagram.com/peachparkingsolutions/?hl=en" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
      </a>
      <a href="https://www.linkedin.com/company/peachparkingsolutions/" target="_blank" rel="noopener" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.6 4.74 6V21h-4v-5.5c0-1.3-.02-3-1.84-3-1.83 0-2.12 1.43-2.12 2.9V21h-4V9z"/></svg>
      </a>
    </div>
    <address class="footer__address">
      P.O. Box 620767 · Atlanta, GA 30362
    </address>
  </div>
  <div class="footer__bottom">
    <div class="container">
      <span>© <span id="yr"></span> Peach Parking Solutions.</span>
    </div>
  </div>
</footer>`;

  // Inject
  const navMount = document.getElementById('site-nav');
  const footMount = document.getElementById('site-footer');
  if (navMount) navMount.outerHTML = navHTML;
  if (footMount) footMount.outerHTML = footerHTML;

  // Set year
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  // Scroll reveal with stagger
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || e.target.style.getPropertyValue('--i') || 0;
        e.target.style.transitionDelay = (parseFloat(delay) * 120) + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.service-cols, .collage__grid, .about__grid, .contact__grid').forEach(parent => {
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      if (!el.style.getPropertyValue('--i')) el.dataset.delay = i;
    });
  });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Image fade-in
  const imgObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('img-in'), 120);
        imgObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.collage__item img, .about__media img, .two-col__media img, .spotlight__media img').forEach(img => imgObs.observe(img));

  // Dropdown toggle (mobile / keyboard)
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('.nav__dropdown-trigger');
    const wrap = e.target.closest('.nav__dropdown-wrap');
    document.querySelectorAll('.nav__dropdown-wrap.open').forEach(w => {
      if (w !== wrap) w.classList.remove('open');
    });
    if (trigger) {
      const w = trigger.closest('.nav__dropdown-wrap');
      const open = w.classList.toggle('open');
      trigger.setAttribute('aria-expanded', open);
    }
  });

  // Testimonials switcher
  document.querySelectorAll('.testimonials').forEach(section => {
    section.querySelectorAll('.t-avatar').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.idx;
        section.querySelectorAll('.t-avatar, .testimonials__quote, .t-author').forEach(el => el.classList.remove('is-active'));
        section.querySelectorAll('.t-avatar').forEach(b => b.setAttribute('aria-selected', 'false'));
        section.querySelectorAll(`.t-avatar[data-idx="${idx}"], .testimonials__quote[data-idx="${idx}"], .t-author[data-idx="${idx}"]`).forEach(el => el.classList.add('is-active'));
        btn.setAttribute('aria-selected', 'true');
      });
    });
  });

  // Global handleSubmit
  window.handleSubmit = function (e) {
    e.preventDefault();
    e.target.querySelector('.form__status').textContent = "Thanks! We'll be in touch soon.";
  };
})();
