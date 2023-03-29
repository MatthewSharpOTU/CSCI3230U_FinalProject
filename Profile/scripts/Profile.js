const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const backButton = document.getElementById("back-button");
const forwardButton = document.getElementById("forward-button");
const progress = document.getElementById("progress");
let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  } else {
    audio.play();
    isPlaying = true;
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  }
}

function back() {
  audio.currentTime -= 10;
}

function forward() {
  audio.currentTime += 10;
}

function updateProgress() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percentage}%`;
}

audio.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", togglePlay);
pauseButton.addEventListener("click", togglePlay);
backButton.addEventListener("click", back);
forwardButton.addEventListener("click", forward);
