// ============================================
//   BLUE BOX — Music Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // PASTE YOUR EMBED URLS HERE!
  const tracks = [
    { title: 'Curtain Call',  artist: 'Tani Yuuki — Opening Theme', dur: 'N/A', src: 'https://www.youtube.com/embed/CNeKh1YxQio?autoplay=1' },
    { title: 'Himitsu',       artist: 'Aimer — Ending Theme',        dur: 'N/A', src: 'https://www.youtube.com/embed/A7cp6OVa0Qc?autoplay=1' },
    { title: 'Blue Morning',  artist: 'Blue Box OST',                 dur: 'N/A', src: 'https://www.youtube.com/embed/0CFR8nHn-4U?autoplay=1' },
    { title: 'Gymnasium',     artist: 'Blue Box OST',                 dur: 'N/A', src: 'https://www.youtube.com/embed/YygpCEv_Y74?autoplay=1' },
    { title: 'Evening Sky',   artist: 'Blue Box OST',                 dur: 'N/A', src: 'PASTE_EMBED_URL_HERE' },
    { title: 'First Serve',   artist: 'Blue Box OST',                 dur: 'N/A', src: 'PASTE_EMBED_URL_HERE' },
  ];

  let currentTrack = 0;

  const npTitle   = document.getElementById('np-title');
  const npArtist  = document.getElementById('np-artist');
  const playBtn   = document.getElementById('play-btn');
  const discInner = document.querySelector('.np-disc-inner');
  const plItems   = document.querySelectorAll('.playlist-item');
  const playerContainer = document.getElementById('music-player');

  function loadTrack(index) {
    currentTrack = index;
    const t = tracks[index];
    if (npTitle)  npTitle.textContent  = t.title;
    if (npArtist) npArtist.textContent = t.artist;

    // Update active playlist item
    plItems.forEach((item, i) => item.classList.toggle('active', i === index));

    // Update real player
    playerContainer.innerHTML = `<iframe src="${t.src}" style="display:none;" allow="autoplay"></iframe>`;
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Toggle play state and disc animation
      discInner.classList.toggle('paused');
      playBtn.innerHTML = discInner.classList.contains('paused')
        ? '<i class="fas fa-play"></i>'
        : '<i class="fas fa-pause"></i>';
    });
  }

  // Playlist clicks
  plItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      loadTrack(i);
      if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      discInner.classList.remove('paused');
    });

    const btn = item.querySelector('.pl-play-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        loadTrack(i);
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        discInner.classList.remove('paused');
      });
    }
  });

  loadTrack(0); // Load first track
});
