// ============================================
//   BLUE BOX — Characters Page JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initFilterButtons();
  initCharacterCards();
  initScrollEffects();
});

function initFilterButtons() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const charProfiles = document.querySelectorAll('.char-profile');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter characters
      charProfiles.forEach(profile => {
        const tags = profile.getAttribute('data-tags') || '';
        const charName = profile.getAttribute('id');

        let shouldShow = false;

        switch(filter) {
          case 'all':
            shouldShow = true;
            break;
          case 'main':
            shouldShow = tags.includes('main');
            break;
          case 'support':
            shouldShow = tags.includes('support');
            break;
          case 'badminton':
            shouldShow = tags.includes('badminton');
            break;
          case 'basketball':
            shouldShow = tags.includes('basketball');
            break;
        }

        if (shouldShow) {
          profile.style.display = 'grid';
          profile.classList.remove('hidden');
          profile.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
          profile.style.display = 'none';
        }
      });
    });
  });
}

function initCharacterCards() {
  const charCards = document.querySelectorAll('.char-card');

  charCards.forEach(card => {
    card.addEventListener('click', () => {
      const charId = card.getAttribute('data-char');
      const targetElement = document.getElementById(charId);

      if (targetElement) {
        // Smooth scroll to character profile
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add highlight effect
        targetElement.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
        setTimeout(() => {
          targetElement.style.boxShadow = '';
        }, 2000);
      }
    });
  });
}

function initScrollEffects() {
  // Intersection Observer for character profiles
  const observerOptions = {
    threshold: 0.1,
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

  const charProfiles = document.querySelectorAll('.char-profile');
  charProfiles.forEach(profile => observer.observe(profile));
}

// Smooth scroll for anchor links
function initAnchorLinks() {
  document.querySelectorAll('a[href^="#taiki"], a[href^="#chinatsu"], a[href^="#hina"], a[href^="#kyo"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Update URL without page reload
        history.pushState(null, null, `#${targetId}`);

        // Scroll to target
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight the character
        targetElement.style.border = '2px solid var(--accent)';
        targetElement.style.boxShadow = '0 0 20px rgba(244, 114, 182, 0.3)';

        setTimeout(() => {
          targetElement.style.border = '';
          targetElement.style.boxShadow = '';
        }, 3000);
      }
    });
  });
}

// Initialize on DOM ready
initAnchorLinks();

// Keyboard navigation support
function initKeyboardNavigation() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const charProfiles = document.querySelectorAll('.char-profile');
      const visibleProfiles = Array.from(charProfiles).filter(p => p.style.display !== 'none');

      if (visibleProfiles.length === 0) return;

      const currentIndex = visibleProfiles.findIndex(p => p === document.activeElement);
      let nextIndex;

      if (e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % visibleProfiles.length;
      } else {
        nextIndex = currentIndex === -1 ? visibleProfiles.length - 1 : (currentIndex - 1 + visibleProfiles.length) % visibleProfiles.length;
      }

      visibleProfiles[nextIndex].focus();
      visibleProfiles[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

initKeyboardNavigation();

// Performance optimization - lazy load images
function initLazyLoading() {
  const images = document.querySelectorAll('.char-big-avatar img, .char-main-img, .char-avatar img');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  }, { threshold: 0.1 });

  images.forEach(img => {
    if (img.getAttribute('data-src')) {
      imageObserver.observe(img);
    }
  });
}

initLazyLoading();

// Track character view analytics (placeholder for future implementation)
function trackCharacterView(charId) {
  console.log(`Character viewed: ${charId}`);
  // Could send to analytics service here
}