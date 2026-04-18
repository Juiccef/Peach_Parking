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
    <a href="${pfx}index.html#contact">Contact</a>
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

  document.querySelectorAll('.service-cols, .collage__grid, .why__grid, .about__grid, .contact__grid, .founders__grid').forEach(parent => {
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
  document.querySelectorAll('.collage__item img, .why__icon img, .about__media img, .two-col__media img').forEach(img => imgObs.observe(img));

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
