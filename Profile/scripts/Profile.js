const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const backButton = document.getElementById("backward-button");
const forwardButton = document.getElementById("forward-button");
const progress = document.getElementById("song-progress");
const homeButton = document.querySelector("#home-icon");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const disk = document.querySelector(".song-image");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");
const shuffle = document.getElementById("shuffle-button");
const repeat = document.getElementById("repeat-button");

let isPlaying = false;
let currentMusic = 0;
volume.value = 100;
shuffleStatus = false;
repeatStatus = false;

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
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");

  } else {
    audio.play();
    isPlaying = true;
    playButton.classList.add("fa-pause");
    playButton.classList.remove("fa-play");
  }
}

setInterval(()=>{
  progress.value = (audio.currentTime/audio.duration)*100;
},500);

function updateProgress() {
  songDuration.innerHTML = formatTime(audio.duration - audio.currentTime);
  currentTime.innerHTML = formatTime(audio.currentTime);
}

progress.onchange = function(){
  audio.play;
  audio.currentTime = (progress.value/100)*audio.duration;
  playButton.classList.add("fa-pause");
  playButton.classList.remove("fa-play");
}

volume.onchange = function(){
  audio.volume = volume.value/100;
  console.log(volume.value);
  if(volume.value < 50){
    volumeIcon.classList.add("fa-volume-down");
    volumeIcon.classList.remove("fa-volume-up");
  } else {
    volumeIcon.classList.remove("fa-volume-down");
    volumeIcon.classList.add("fa-volume-up");
  }
}

homeButton.addEventListener("click", () =>{
  location.href = '../Homepage/Homepage.html';
});

audio.addEventListener("timeupdate", updateProgress);
playButton.addEventListener("click", togglePlay);

shuffle.addEventListener("click", ()=>{
  if(shuffleStatus === false){
    shuffleStatus = true;
    $("#shuffle-button").css("color", "#f53192");
  }else{
    shuffleStatus = false;
    $("#shuffle-button").css("color", "black");
  }
});

repeat.addEventListener("click", ()=>{
  if(repeatStatus === false){
    repeatStatus = true;
    $("#repeat-button").css("color", "#f53192");
    audio.loop = true;
  }else{
    repeatStatus = false;
    $("#repeat-button").css("color", "black");
    audio.loop = false;
  }
});

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
  if(shuffleStatus === true){
    currentMusic = Math.random() * 4;
  }
  }else{
    currentMusic++;
  }
  setMusic(currentMusic);
  audio.play;
});

audio.addEventListener('ended', function(){
  currentMusic++;
  setMusic(currentMusic);
  audio.play;
});

Array.from(document.getElementsByClassName('song')).forEach((element, i)=>{
  element.getElementsByTagName('img')[0].src = songs[i].cover;
  element.getElementsByTagName('h5')[0].innerHTML = songs[i].name;
  element.getElementsByTagName('div')[0].innerHTML = songs[i].name;
})
