const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const backButton = document.getElementById("backward-button");
const forwardButton = document.getElementById("forward-button");
const progress = document.getElementById("progress");
const homeButton = document.querySelector("#home-icon");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const disk = document.querySelector(".song-image");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");

let isPlaying = false;
let currentMusic = 0;

const setMusic = (i) => {
  let song = songs[i];
  currentMusic = i;
  audio.src = song.path;
  title.innerHTML = song.name;
  artist.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    songDuration.innerHTML = formatTime(audio.duration);
  }, 300);
}

setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time/60);
  if(min<10){
    min=`0${min}`;
  }
  let sec = Math.floor(time % 60);
  if(sec < 10){
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;

  } else {
    audio.play();
    isPlaying = true;

  }
}

function updateProgress() {
  const percentage = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percentage}%`;
  songDuration.innerHTML = formatTime(audio.duration - audio.currentTime);
  currentTime.innerHTML = formatTime(audio.currentTime);

}

homeButton.addEventListener("click", () =>{
  location.href = '../Homepage/Homepage.html';
});

audio.addEventListener("timeupdate", updateProgress);
playButton.addEventListener("click", togglePlay);

backButton.addEventListener("click",() => {
  if(currentMusic <= 0){
   currentMusic = songs.length - 1;
  }else{
   currentMusic--;
  }
  setMusic(currentMusic);
  audio.play;
 });
forwardButton.addEventListener("click", () => {
 if(currentMusic >= songs.length - 1){
  currentMusic = 0;
 }else{
  currentMusic++;
 }
 setMusic(currentMusic);
 audio.play;
});