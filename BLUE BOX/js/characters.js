// ============================================\n//   BLUE BOX — Characters Page JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // Audio Manager for Characters
  const voicePlayer = new Audio();
  const bgPlayer = new Audio(); // Assuming character BGM

  // Character Audio Data - YouTube Embeds
  const charAudioData = {
    taiki: { voice: 'https://www.youtube.com/embed/VIDEO_ID_TAIKI?autoplay=1', bgm: 'https://www.youtube.com/embed/YygpCEv_Y74?autoplay=1' },
    chinatsu: { voice: 'https://www.youtube.com/embed/VIDEO_ID_CHINATSU?autoplay=1', bgm: 'https://www.youtube.com/embed/YygpCEv_Y74?autoplay=1' },
    hina: { voice: 'https://www.youtube.com/embed/VIDEO_ID_HINA?autoplay=1', bgm: 'https://www.youtube.com/embed/YygpCEv_Y74?autoplay=1' },
    kyo: { voice: 'https://www.youtube.com/embed/VIDEO_ID_KYO?autoplay=1', bgm: 'https://www.youtube.com/embed/YygpCEv_Y74?autoplay=1' }
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

    // Set and play new YouTube embed links
    voicePlayer.src = audioFiles.voice;
    bgPlayer.src = audioFiles.bgm;
    bgPlayer.loop = true;
    bgPlayer.volume = 0.3;

    // For YouTube embeds, we need to use iframe approach
    // For now, show message about YouTube audio
    console.log('Character voice audio:', audioFiles.voice);
    console.log('Character BGM:', audioFiles.bgm);

    // Create YouTube embed for character voice
    const voiceEmbed = document.createElement('iframe');
    voiceEmbed.src = audioFiles.voice;
    voiceEmbed.style.display = 'none';
    voiceEmbed.allow = 'autoplay';

    // Create YouTube embed for character BGM
    const bgEmbed = document.createElement('iframe');
    bgEmbed.src = audioFiles.bgm;
    bgEmbed.style.display = 'none';
    bgEmbed.allow = 'autoplay';
    bgEmbed.loop = true;

    // Add embeds to page
    document.body.appendChild(voiceEmbed);
    document.body.appendChild(bgEmbed);
  }
});
