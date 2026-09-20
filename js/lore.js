// ============================================
//   BLUE BOX — Lore / Story Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- ACCORDION ARC TOGGLES ----
  const arcs = document.querySelectorAll('.lore-arc');

  arcs.forEach(arc => {
    const header = arc.querySelector('.lore-arc-header');
    const toggle = arc.querySelector('.arc-toggle');

    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = arc.classList.contains('arc-open');

      // Close all first (one-open-at-a-time behavior)
      arcs.forEach(a => a.classList.remove('arc-open'));

      // Toggle clicked arc
      if (!isOpen) {
        arc.classList.add('arc-open');

        // Smooth scroll into view if needed
        setTimeout(() => {
          const rect = arc.getBoundingClientRect();
          if (rect.bottom > window.innerHeight) {
            arc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 50);
      }
    });
  });

  // Open the first arc by default
  if (arcs.length > 0) {
    arcs[0].classList.add('arc-open');
  }

});
