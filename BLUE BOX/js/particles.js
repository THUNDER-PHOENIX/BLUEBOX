// ============================================
//   BLUE BOX — Particles
// ============================================

(function() {
  const container = document.getElementById('particles');
  if (!container) return;

  const PARTICLE_COUNT = 40;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size    = Math.random() * 5 + 2;
    const left    = Math.random() * 100;
    const delay   = Math.random() * 8;
    const dur     = Math.random() * 10 + 8;
    const drift   = (Math.random() - 0.5) * 200 + 'px';
    const opacity = Math.random() * 0.6 + 0.2;

    // Alternate between blue dots and sakura-like shapes
    const isBlue = Math.random() > 0.4;

    Object.assign(p.style, {
      position:   'absolute',
      bottom:     '-20px',
      left:       left + '%',
      width:      size + 'px',
      height:     size + 'px',
      borderRadius: isBlue ? '50%' : '50% 0 50% 0',
      background:  isBlue
        ? `rgba(59, 130, 246, ${opacity})`
        : `rgba(244, 114, 182, ${opacity})`,
      '--drift':  drift,
      animation:  `particleFloat ${dur}s ease-in ${delay}s infinite`,
      pointerEvents: 'none',
    });

    container.appendChild(p);
  }
})();
