// ============================================
//   BLUE BOX — Hero Section Enhancements
// ============================================

// Initialize hero-specific functionality
document.addEventListener('DOMContentLoaded', () => {
  initHeroStatsAnimation();
  initScrollEffects();
});

function initHeroStatsAnimation() {
  const stats = document.querySelectorAll('.hero-stat .stat-num');

  stats.forEach(stat => {
    const target = stat.textContent;
    const isNumber = /^\d+$/.test(target);

    if (isNumber) {
      animateNumber(stat, 0, parseInt(target), 1000);
    }
  });
}

function animateNumber(element, start, end, duration) {
  const startTime = performance.now();
  const difference = end - start;

  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const currentValue = Math.floor(start + difference * progress);
    element.textContent = currentValue;

    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

function initScrollEffects() {
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');

  if (!hero || !heroContent) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollTop < heroHeight * 0.6) {
      const opacity = 1 - scrollTop / (heroHeight * 0.6);
      const translateY = scrollTop * 0.3;

      heroContent.style.opacity = opacity;
      heroContent.style.transform = `translateY(${translateY}px)`;

      // Parallax effect for background
      const bgElement = document.querySelector('#hero');
      if (bgElement) {
        bgElement.style.backgroundPositionY = `calc(50% + ${scrollTop * 0.5}px)`;
      }
    }
  });
}