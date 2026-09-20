// ============================================
//   BLUE BOX — Characters Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Audio Manager for Characters
  const voicePlayer = new Audio();
  const bgPlayer = new Audio(); // Assuming character BGM

  // Placeholder for Character Audio Data (to be updated)
  const charAudioData = {
    taiki: { voice: 'path/to/taiki_voice.mp3', bgm: 'path/to/taiki_bgm.mp3' },
    chinatsu: { voice: 'path/to/chinatsu_voice.mp3', bgm: 'path/to/chinatsu_bgm.mp3' },
    hina: { voice: 'path/to/hina_voice.mp3', bgm: 'path/to/hina_bgm.mp3' },
    kyo: { voice: 'path/to/kyo_voice.mp3', bgm: 'path/to/kyo_bgm.mp3' }
  };

  const charProfiles = document.querySelectorAll('.char-profile');

  charProfiles.forEach(profile => {
    profile.addEventListener('click', () => {
      const charId = profile.getAttribute('data-char');
      if (charId && charAudioData[charId]) {
        playCharacterAudio(charAudioData[charId]);
      }
    });
  });

  function playCharacterAudio(audioFiles) {
    // Stop previous
    voicePlayer.pause();
    bgPlayer.pause();

    // Set and play new
    voicePlayer.src = audioFiles.voice;
    bgPlayer.src = audioFiles.bgm;
    bgPlayer.loop = true;
    bgPlayer.volume = 0.3;

    voicePlayer.play().catch(e => console.log('Voice play blocked', e));
    bgPlayer.play().catch(e => console.log('BGM play blocked', e));
  }
});
