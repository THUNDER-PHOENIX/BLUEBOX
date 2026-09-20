// ============================================
//   BLUE BOX — Music Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // BLUE BOX Music Tracks - Local MP3 Files
  const tracks = [
    { title: '1 on 1', artist: 'Blue Box OST', dur: 'N/A', src: 'assets/audio/1 on 1.mp3' },
    // { title: 'Same Blue', artist: 'Official髭男dism', dur: 'N/A', src: 'assets/audio/Official髭男dism - Same Blue [Official Video].mp3' },
    { title: 'Ao no Hako', artist: 'Blue Box OST', dur: 'N/A', src: 'assets/audio/アオのハコ.mp3' },
    { title: 'Oshaberi', artist: 'Blue Box OST', dur: 'N/A', src: 'assets/audio/おしゃべり.mp3' },
    { title: 'Teenage Blue', artist: 'Eve', dur: 'N/A', src: 'assets/audio/ティーンエイジブルー (Teenage Blue) – Eve Official Audio.mp3' },
    { title: 'Douyou', artist: 'Blue Box OST', dur: 'N/A', src: 'assets/audio/動揺.mp3' }
  ];

  let currentTrack = 0;
  const audioPlayer = document.getElementById('bg-audio');
  const npTitle   = document.getElementById('np-title');
  const npArtist  = document.getElementById('np-artist');
  const playBtn   = document.getElementById('play-btn');
  const discInner = document.querySelector('.np-disc-inner');
  const plItems   = document.querySelectorAll('.playlist-item');

  function loadTrack(index) {
    currentTrack = index;
    const t = tracks[index];
    if (npTitle)  npTitle.textContent  = t.title;
    if (npArtist) npArtist.textContent = t.artist;

    // Update track duration display
    const durDisplay = document.getElementById('np-duration');
    if (durDisplay) durDisplay.textContent = t.dur;

    // Update active playlist item
    plItems.forEach((item, i) => item.classList.toggle('active', i === index));

    // Update and Play Audio
    audioPlayer.src = t.src;
    audioPlayer.play();
    if (playBtn) playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    discInner.classList.remove('paused');
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Toggle play state and disc animation
      if (audioPlayer.paused) {
        audioPlayer.play();
        discInner.classList.remove('paused');
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        audioPlayer.pause();
        discInner.classList.add('paused');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
  }

  // Playlist clicks
  plItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      loadTrack(i);
    });

    const btn = item.querySelector('.pl-play-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        loadTrack(i);
      });
    }
  });

  loadTrack(0); // Load first track
});
