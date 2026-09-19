// ============================================
//   BLUE BOX — Characters Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- FILTER BUTTONS ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const charCards  = document.querySelectorAll('.char-profile');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      charCards.forEach(card => {
        const tags = card.dataset.tags || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- HASH SCROLL (e.g. characters.html#chinatsu) ----
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.style.boxShadow = '0 0 60px rgba(59,130,246,0.5)';
        setTimeout(() => { target.style.boxShadow = ''; }, 2000);
      }
    }, 2600);
  }

});
