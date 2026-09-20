// ============================================
//   BLUE BOX — Animations JS (GSAP-free)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- HERO TITLE LETTER SPLIT EFFECT ----
  const heroEn = document.querySelector('.hero-en');
  if (heroEn) {
    const text = heroEn.textContent;
    heroEn.innerHTML = text.split('').map((char, i) =>
      `<span style="
        display:inline-block;
        animation: fadeInUp 0.5s ease ${0.2 + i * 0.05}s forwards;
        opacity: 0;
      ">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
  }

  // ---- CURSOR GLOW TRAIL ----
  const cursor = document.createElement('div');
  cursor.id = 'cursor-glow';
  Object.assign(cursor.style, {
    position:     'fixed',
    width:        '300px',
    height:       '300px',
    background:   'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents:'none',
    transform:    'translate(-50%, -50%)',
    zIndex:       '0',
    transition:   'left 0.08s ease, top 0.08s ease',
  });
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  // ---- SMOOTH HOVER ON CARDS ----
  document.querySelectorAll('.stat-card, .char-card, .arc-content, .music-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width  - 0.5) * 20;
      const yPercent = (y / rect.height - 0.5) * 20;
      if (!this.classList.contains('char-card')) {
        this.style.transform = `perspective(800px) rotateX(${-yPercent * 0.3}deg) rotateY(${xPercent * 0.3}deg) translateY(-4px)`;
      }
    });
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('char-card')) {
        this.style.transform = '';
      }
    });
  });

  // ---- NAVBAR LOGO PULSE ON HOVER ----
  const navLogo = document.querySelector('.nav-logo-jp');
  if (navLogo) {
    navLogo.addEventListener('mouseenter', () => {
      navLogo.style.animation = 'pulse 0.8s ease';
    });
    navLogo.addEventListener('animationend', () => {
      navLogo.style.animation = '';
    });
  }

});
