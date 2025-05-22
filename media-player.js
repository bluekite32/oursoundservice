const audio = document.getElementById('audio');
const playPause = document.getElementById('play-pause');
const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');

let isMuted = false;

playPause.onclick = () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = '⏸️';
  } else {
    audio.pause();
    playPause.textContent = '▶️';
  }
};

audio.onplay = () => playPause.textContent = '⏸️';
audio.onpause = () => playPause.textContent = '▶️';

volumeBtn.onclick = () => {
  isMuted = !isMuted;
  audio.muted = isMuted;
  volumeBtn.textContent = isMuted ? '🔈' : '🔊';
};

volumeSlider.oninput = (e) => {
  audio.volume = e.target.value;
  if (audio.volume === 0) {
    audio.muted = true;
    volumeBtn.textContent = '🔈';
  } else {
    audio.muted = false;
    volumeBtn.textContent = '🔊';
  }
};