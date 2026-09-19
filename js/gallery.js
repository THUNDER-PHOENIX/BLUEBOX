// ============================================
//   BLUE BOX — Gallery JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- GALLERY FILTERS ----
  const filterBtns = document.querySelectorAll('[data-gfilter]');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.gfilter;
      galleryItems.forEach(item => {
        const tags = item.dataset.gtag || '';
        if (filter === 'all' || tags.includes(filter)) {
          item.classList.remove('g-hidden');
        } else {
          item.classList.add('g-hidden');
        }
      });
    });
  });

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');
  const lbImgWrap = document.getElementById('lb-img-wrap');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  let currentIdx  = 0;
  const visibleItems = () => [...document.querySelectorAll('.gallery-item:not(.g-hidden)')];

  function openLightbox(idx) {
    const items = visibleItems();
    if (!items[idx]) return;
    currentIdx = idx;
    const caption = items[idx].querySelector('.gallery-overlay span')?.textContent || '';
    const placeholder = items[idx].querySelector('.gallery-placeholder');

    lbImgWrap.innerHTML = '';

    // If there's a real img, show it; otherwise show placeholder clone
    const img = items[idx].querySelector('img');
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt;
      lbImgWrap.appendChild(newImg);
    } else if (placeholder) {
      const clone = placeholder.cloneNode(true);
      Object.assign(clone.style, {
        width: '480px',
        height: '380px',
        maxWidth: '80vw',
        borderRadius: '12px',
      });
      lbImgWrap.appendChild(clone);
    }

    if (lbCaption) lbCaption.textContent = caption;
    if (lightbox)  lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      const items = visibleItems();
      const idx = items.indexOf(item);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  if (lbPrev) {
    lbPrev.addEventListener('click', () => {
      const items = visibleItems();
      openLightbox((currentIdx - 1 + items.length) % items.length);
    });
  }

  if (lbNext) {
    lbNext.addEventListener('click', () => {
      const items = visibleItems();
      openLightbox((currentIdx + 1) % items.length);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox || lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
    if (e.key === 'ArrowLeft'  && lbPrev) lbPrev.click();
  });

  // Close on backdrop click
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

});
