const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const backButton = document.getElementById("backward-button");
const forwardButton = document.getElementById("forward-button");
const progress = document.getElementById("song-progress");
const homeButton = document.querySelector(".logo");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const disk = document.querySelector(".song-image");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");
const shuffle = document.getElementById("shuffle-button");
const repeat = document.getElementById("repeat-button");
const addSong = document.getElementById("add-song");

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
  document.getElementById("song-id").setAttribute("value", `${currentMusic}`);

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    songDuration.innerHTML = formatTime(audio.duration);
  }, 300);
}

setMusic(0);

function addToPlaylist(x, y){
  let newSong = document.createElement("li");
  newSong.classList.add('song');
  newSong.innerHTML = 
  `
  <span>0${y}</span>
  <img src="${songs[x].cover}" alt="Alan">
  <h5>
    ${songs[x].name}
      <div class="subtitle">${songs[x].artist}</div>
  </h5>
      <i class="fas fa-play-circle play_now" id="${x}"></i>`

  document.getElementsByClassName("songs")[0].appendChild(newSong);
}



for(var i=0; i<playlists[0].tracks.length; i++){
  addToPlaylist(playlists[0].tracks[i], i+1);
}

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

//add song to playlist
let selectedSong = 0;
let add = false;
addSong.addEventListener("click", () => {
  add = true;
  //console.log(document.getElementById("song-id").getAttribute("value"));
  selectedSong = document.getElementById("song-id").getAttribute("value");
});

let currentPlaylist = 0;
document.querySelectorAll('.playlist').forEach(item => {
  item.addEventListener("click", ()=>{
    
      if(add===true){
        for(var z in playlists){
          //console.log(i);
          if(playlists[z].name === item.textContent){
            console.log(z);
            playlists[z].tracks.push(selectedSong);
            if(z === currentPlaylist){
              console.log(z);
              addToPlaylist(selectedSong, playlists[z].tracks.length);
            }
          }
        }
        add=false;
      } else {
        document.querySelector(".songs").innerHTML= "";
        for(var i in playlists){
          if(playlists[i].name === item.textContent){
              currentPlaylist = i;
              console.log(i);
              for(var j=0; j<playlists[i].tracks.length; j++){
                addToPlaylist(playlists[i].tracks[j], j+1);
              }
              break; 
          }
      }
      }
    })
})

let createPlaylist = document.getElementById("playlist-add");

createPlaylist.addEventListener("click",() => {
  playlists.push({
    name: `Playlist #${playlists.length+1}`,
    tracks: ['1'],
  })

  let newPlaylist = document.createElement("h4");
  newPlaylist.classList.add('playlist');
  newPlaylist.innerHTML = `<span></span>Playlist #${playlists.length}`;

  document.getElementsByClassName("playlists")[0].appendChild(newPlaylist);

  var x = 
  console.log(playlists);
})

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
    console.log()
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

const edit = document.getElementById("edit");
edit.addEventListener("click", () => {
  let newName = prompt("Rename your playlist:", `${playlists[currentPlaylist].name}`);

  if (newName != null) {
    document.querySelector(".playlists").children.item(currentPlaylist).innerHTML = `<span></span>${newName}`;
    playlists[currentPlaylist].name = newName;
  }
})

const deletePlaylist = document.getElementById("delete");
deletePlaylist.addEventListener("click", () => {
  document.querySelector(".playlists").children.item(currentPlaylist).innerHTML = "";
  playlists[currentPlaylist].remove;
  
});

playSong = document.querySelectorAll(".play_now").forEach(playSong => {
  playSong.addEventListener("click", ()=>{
    currentMusic = parseInt(playSong.getAttribute("id"));
    setMusic(currentMusic);
    audio.play;
  })
})

editUser = document.getElementById("edit-user");
editUser.addEventListener("click", () => {
  if(editUser.classList.value === "fas fa-user-edit"){
    document.getElementById("user-name").setAttribute("contenteditable", "true");
    document.getElementById("user-motto").setAttribute("contenteditable", "true");
    document.getElementById("user-bio").setAttribute("contenteditable", "true");
    editUser.classList.remove("fa-user-edit");
    editUser.classList.add("fa-save");
  }else{
    document.getElementById("user-name").setAttribute("contenteditable", "false");
    document.getElementById("user-motto").setAttribute("contenteditable", "false");
    document.getElementById("user-bio").setAttribute("contenteditable", "false");
    editUser.classList.remove("fa-save");
    editUser.classList.add("fa-user-edit");
  }
})