// ============================================
//   BLUE BOX — Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2400);
    document.body.style.overflow = 'hidden';
  }

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
  });

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
      spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
    });
    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- THEME TOGGLE ----
  const themeBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('bb-theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    if (themeBtn) themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = body.classList.contains('light-mode');
      body.classList.toggle('light-mode', !isLight);
      body.classList.toggle('dark-mode', isLight);
      themeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      localStorage.setItem('bb-theme', isLight ? 'dark' : 'light');
    });
  }

  // ---- MUSIC TOGGLE ----
  const musicBtn   = document.getElementById('music-toggle');
  const bgAudio    = document.getElementById('bg-audio');
  let musicPlaying = false;
  if (musicBtn && bgAudio) {
    musicBtn.addEventListener('click', () => {
      musicPlaying = !musicPlaying;
      if (musicPlaying) {
        bgAudio.play().catch(() => {});
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        bgAudio.pause();
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
      }
    });
  }

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // Auto-add reveal class to major section children if not already set
  const autoReveal = document.querySelectorAll(
    '.stat-card, .char-card, .arc-item, .music-card, .about-text, .about-image-wrap'
  );
  autoReveal.forEach((el, i) => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-scale')) {
      el.classList.add('reveal');
      el.classList.add(`delay-${(i % 5) + 1}`);
      revealObserver.observe(el);
    }
  });

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

});
