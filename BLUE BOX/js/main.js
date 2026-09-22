// ============================================
//   BLUE BOX — Main JavaScript
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
      hamburger.classList.toggle('active', navLinks.classList.contains('open'));
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

// Particles.js for hero section
document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    particlesContainer.innerHTML = '';
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 4 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = `linear-gradient(135deg, ${getRandomBlue()}, ${getRandomAccent()})`;
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      particle.style.animationDelay = Math.random() * 20 + 's';
      particlesContainer.appendChild(particle);
    }
  }
});

function getRandomBlue() {
  const blues = ['#3b82f6', '#60a5fa', '#1d4ed8', '#2563eb', '#1e40af'];
  return blues[Math.floor(Math.random() * blues.length)];
}

function getRandomAccent() {
  const accents = ['#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d'];
  return accents[Math.floor(Math.random() * accents.length)];
}