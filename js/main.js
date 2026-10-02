/* ============================================================
   Portfolio — interactions
   1. Typed roles  2. Scroll reveals  3. Nav + mobile menu
   4. Skills marquee  5. Cursor-tracking eye  6. Contact form
   ============================================================ */
(function () {
  'use strict';

  /* ---------- 1. TYPED ROLES ---------- */
  var roles = [
    'Aspiring Software Engineer',
    'Full-Stack Developer',
    'Java + Spring Boot',
    'React + Tailwind',
    'AI in the Loop'
  ];
  var typedEl = document.getElementById('typed');
  var ri = 0, ci = 0, deleting = false;
  function typeLoop() {
    if (!typedEl) return;
    var word = roles[ri];
    typedEl.textContent = word.slice(0, ci);
    var delay = deleting ? 38 : 75;
    if (!deleting && ci === word.length) { delay = 1700; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 350; }
    ci += deleting ? -1 : 1;
    setTimeout(typeLoop, delay);
  }

  /* ---------- 2. SCROLL REVEALS ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------- 3. NAV ---------- */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
  var menuBtn = document.getElementById('menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  menuBtn.addEventListener('click', function () { mobileMenu.classList.toggle('open'); });
  mobileMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { mobileMenu.classList.remove('open'); });
  });
  // active link highlight
  var secIds = ['home', 'about', 'work', 'skills', 'contact'];
  var navAs = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var secIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        navAs.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  secIds.forEach(function (id) {
    var s = document.getElementById(id);
    if (s) secIO.observe(s);
  });

  /* ---------- 4. MARQUEE (duplicate for seamless loop) ---------- */
  var track = document.getElementById('marquee-track');
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- 4b. WORK FILTERS ---------- */
  var fpills = document.querySelectorAll('.fpill');
  var workCards = document.querySelectorAll('.work-card');
  fpills.forEach(function (btn) {
    btn.addEventListener('click', function () {
      fpills.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      workCards.forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.classList.toggle('hide', !show);
        if (show) { card.classList.remove('in'); requestAnimationFrame(function () { requestAnimationFrame(function () { card.classList.add('in'); }); }); }
      });
    });
  });

  /* ---------- 5. CURSOR-TRACKING EYE ---------- */
  var pupil = document.getElementById('pupil');
  var eyeWrap = document.getElementById('eye-wrap');
  if (pupil && eyeWrap && window.matchMedia('(pointer: fine)').matches) {
    var px = 0, py = 0, tx = 0, ty = 0, raf = null;
    document.addEventListener('mousemove', function (e) {
      var r = eyeWrap.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var dx = e.clientX - cx, dy = e.clientY - cy;
      var d = Math.hypot(dx, dy) || 1, max = 20;
      tx = dx / d * Math.min(max, d / 12);
      ty = dy / d * Math.min(max, d / 12);
      if (!raf) raf = requestAnimationFrame(animPupil);
    });
    function animPupil() {
      px += (tx - px) * 0.2; py += (ty - py) * 0.2;
      pupil.style.transform = 'translate(' + px + 'px,' + py + 'px)';
      raf = (Math.abs(tx - px) > 0.1 || Math.abs(ty - py) > 0.1) ? requestAnimationFrame(animPupil) : null;
    }
    // blink
    setInterval(function () {
      eyeWrap.querySelector('.eye').style.transform = 'scaleY(0.08)';
      setTimeout(function () { eyeWrap.querySelector('.eye').style.transform = ''; }, 140);
    }, 4600);
  } else if (eyeWrap) {
    eyeWrap.style.display = 'none';
  }

  /* ---------- 6. CONTACT FORM (mailto) ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var subject = document.getElementById('cf-subject').value.trim() || 'Portfolio enquiry';
      var msg = document.getElementById('cf-msg').value.trim();
      var body = encodeURIComponent('Hi Sujay,\n\n' + msg + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:sujanleo242@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
    });
  }

  /* ---------- GO ---------- */
  typeLoop();
})();
