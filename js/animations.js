// ============================================
//   BLUE BOX — Animation Utilities
// ============================================

// Auto-initialize all reveal animations on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initParticleEffects();
});

function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

function initParticleEffects() {
  // Enhanced particle effects for hero section
  const heroParticles = document.getElementById('hero-particles');
  if (heroParticles) {
    createHeroParticles();
  }

  // Character card hover effects
  initCharacterCards();
}

function createHeroParticles() {
  const container = document.getElementById('hero-particles');
  if (!container) return;

  // Clear any existing particles
  container.innerHTML = '';

  const particleCount = window.innerWidth > 768 ? 80 : 40;

  for (let i = 0; i < particleCount; i++) {
    setTimeout(() => {
      createParticle(container);
    }, i * 50);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  // Random properties
  const size = Math.random() * 6 + 2;
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const endX = Math.random() * 100 - 50;
  const endY = Math.random() * 100 + 50;
  const duration = Math.random() * 30 + 20;
  const delay = Math.random() * 20;

  // Set particle styles
  particle.style.position = 'absolute';
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.background = getRandomParticleColor();
  particle.style.borderRadius = '50%';
  particle.style.opacity = Math.random() * 0.5 + 0.1;
  particle.style.left = startX + '%';
  particle.style.top = startY + '%';
  particle.style.animation = `floatParticle ${duration}s linear infinite`;
  particle.style.animationDelay = delay + 's';

  // Add floating animation
  const floatKeyframes = `
    @keyframes floatParticle {
      from {
        transform: translate(0, 0);
      }
      to {
        transform: translate(${endX}px, ${endY}px);
        opacity: 0;
      }
    }
  `;

  // Inject keyframes into style tag
  let styleTag = document.getElementById('particle-keyframes');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'particle-keyframes';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent += floatKeyframes;

  container.appendChild(particle);
}

function getRandomParticleColor() {
  const blues = ['#3b82f6', '#60a5fa', '#1d4ed8', '#2563eb', '#1e40af', '#0944b4'];
  const accents = ['#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843'];

  const useBlue = Math.random() > 0.5;
  const colors = useBlue ? blues : accents;
  return colors[Math.floor(Math.random() * colors.length)];
}

function initCharacterCards() {
  const charCards = document.querySelectorAll('.char-card');

  charCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });
}

// Clean up particles on page hide
window.addEventListener('beforeunload', () => {
  const particles = document.querySelectorAll('.particle');
  particles.forEach(particle => particle.remove();
});

// Performance optimization for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
}