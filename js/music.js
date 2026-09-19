// ============================================
//   BLUE BOX — Music Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  const tracks = [
    { title: 'Curtain Call',  artist: 'Tani Yuuki — Opening Theme', dur: '3:42', src: '' },
    { title: 'Himitsu',       artist: 'Aimer — Ending Theme',        dur: '4:10', src: '' },
    { title: 'Blue Morning',  artist: 'Blue Box OST',                 dur: '2:55', src: '' },
    { title: 'Gymnasium',     artist: 'Blue Box OST',                 dur: '3:08', src: '' },
    { title: 'Evening Sky',   artist: 'Blue Box OST',                 dur: '3:30', src: '' },
    { title: 'First Serve',   artist: 'Blue Box OST',                 dur: '2:47', src: '' },
  ];

  let currentTrack = 0;
  let playing = false;
  let fakeProgress = 0;
  let fakeTimer = null;

  const npTitle   = document.getElementById('np-title');
  const npArtist  = document.getElementById('np-artist');
  const npFill    = document.getElementById('np-fill');
  const npCurrent = document.getElementById('np-current');
  const npDur     = document.getElementById('np-duration');
  const playBtn   = document.getElementById('play-btn');
  const prevBtn   = document.getElementById('prev-btn');
  const nextBtn   = document.getElementById('next-btn');
  const discInner = document.querySelector('.np-disc-inner');
  const plItems   = document.querySelectorAll('.playlist-item');

  function loadTrack(index) {
    currentTrack = index;
    const t = tracks[index];
    if (npTitle)  npTitle.textContent  = t.title;
    if (npArtist) npArtist.textContent = t.artist;
    if (npDur)    npDur.textContent    = t.dur;
    fakeProgress = 0;
    updateProgress();
    plItems.forEach((item, i) => item.classList.toggle('active', i === index));
  }

  function updateProgress() {
    if (npFill)    npFill.style.width   = fakeProgress + '%';
    if (npCurrent) npCurrent.textContent = formatTime(fakeProgress);
  }

  function formatTime(pct) {
    const total = 222; // ~3:42 in seconds as default
    const secs  = Math.floor((pct / 100) * total);
    return `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  }

  function startFake() {
    clearInterval(fakeTimer);
    fakeTimer = setInterval(() => {
      fakeProgress += 100 / 222; // advance ~1 sec worth
      if (fakeProgress >= 100) {
        fakeProgress = 0;
        nextTrack();
      }
      updateProgress();
    }, 1000);
  }

  function stopFake() {
    clearInterval(fakeTimer);
  }

  function nextTrack() {
    loadTrack((currentTrack + 1) % tracks.length);
    if (playing) startFake();
  }

  function prevTrack() {
    loadTrack((currentTrack - 1 + tracks.length) % tracks.length);
    if (playing) startFake();
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playing = !playing;
      playBtn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
      if (discInner) discInner.classList.toggle('paused', !playing);
      playing ? startFake() : stopFake();
    });
  }

  if (nextBtn) nextBtn.addEventListener('click', nextTrack);
  if (prevBtn) prevBtn.addEventListener('click', prevTrack);

  // Playlist clicks
  plItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      loadTrack(i);
      if (!playing) {
        playing = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        if (discInner) discInner.classList.remove('paused');
      }
      startFake();
    });

    const btn = item.querySelector('.pl-play-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        loadTrack(i);
        playing = true;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        startFake();
      });
    }
  });

  // Progress bar click
  const npBar = document.querySelector('.np-bar');
  if (npBar) {
    npBar.addEventListener('click', (e) => {
      const rect = npBar.getBoundingClientRect();
      fakeProgress = ((e.clientX - rect.left) / rect.width) * 100;
      updateProgress();
    });
  }

  loadTrack(0);
});
