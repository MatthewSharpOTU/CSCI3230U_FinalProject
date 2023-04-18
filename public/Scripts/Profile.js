//Store relevant HTML elements
const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const backButton = document.getElementById("backward-button");
const forwardButton = document.getElementById("forward-button");
const progress = document.getElementById("song-progress");
const homeButton = document.querySelector(".logo");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const cover = document.querySelector(".song-image");
const currentTime = document.querySelector(".current-time");
const songDuration = document.querySelector(".song-duration");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");
const shuffle = document.getElementById("shuffle-button");
const repeat = document.getElementById("repeat-button");
const addSong = document.getElementById("add-song");
let createPlaylist = document.getElementById("playlist-add");

//Initialize player variables
let isPlaying = false;
let currentSong = 0;
volume.value = 100;
shuffleStatus = false;

//Play selected song
function playSong(i){
  let song = songs[i];
  currentSong = i;
  audio.src = song.path;
  title.innerHTML = song.name;
  artist.innerHTML = song.artist;
  cover.style.backgroundImage = `url('${song.cover}')`;
  document.getElementById("song-id").setAttribute("value", `${currentSong}`);

  currentTime.innerHTML = "00:00";
  setTimeout(() => {
    songDuration.innerHTML = formatTime(audio.duration);
  }, 300);
}
//initialize player
playSong(0);

//Add new song's UI elements to selected playlist
function addToPlaylist(x, y){
  let newSong = document.createElement("li");
  newSong.classList.add('song');
  newSong.innerHTML = 
  `
  <span>0${y}</span>
  <img src="${songs[x].cover}">
  <h5>
    ${songs[x].name}
      <div class="artist-name">${songs[x].artist}</div>
  </h5>
      <i class="fas fa-play-circle play_now" id="${x}"></i>`

  document.getElementsByClassName("songs")[0].appendChild(newSong);
}

//initialize playlist
function initializePlaylist(){
  for(var i=0; i<playlists[0].tracks.length; i++){
    addToPlaylist(playlists[0].tracks[i], i+1);
  }
}
initializePlaylist()

//correctly format song duration
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

//Handle play/pause button
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
playButton.addEventListener("click", togglePlay);

//Update song progress bar while playing
setInterval(()=>{
  progress.value = (audio.currentTime/audio.duration)*100;
},500);

//Update time stamps
function updateProgress() {
  songDuration.innerHTML = formatTime(audio.duration - audio.currentTime);
  currentTime.innerHTML = formatTime(audio.currentTime);
}
audio.addEventListener("timeupdate", updateProgress);

//Update currentTime of song when user interacts with progress slider
progress.onchange = function(){
  audio.play;
  audio.currentTime = (progress.value/100)*audio.duration;
  playButton.classList.add("fa-pause");
  playButton.classList.remove("fa-play");
}

//Update volume level when volume slider is changed
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

//Take user to homepage when logo icon is clicked
homeButton.addEventListener("click", () =>{
  location.href = 'Homepage.html';
});

//Enable or disable shuffle feature
shuffle.addEventListener("click", ()=>{
  if(shuffleStatus === false){
    shuffleStatus = true;
    $("#shuffle-button").css("color", "#f53192");
  }else{
    shuffleStatus = false;
    $("#shuffle-button").css("color", "black");
  }
});

//Enable or disable repeat feature
repeat.addEventListener("click", ()=>{
  if(audio.loop === false){
    $("#repeat-button").css("color", "#f53192");
    audio.loop = true;
  }else{
    $("#repeat-button").css("color", "black");
    audio.loop = false;
  }
});

//Event listener for plus button on player for adding to playlists
let selectedSong = 0;
let add = false;
addSong.addEventListener("click", () => {
  add = true;
  selectedSong = document.getElementById("song-id").getAttribute("value");
});

//Adds song to selected playlist if add === true
let currentPlaylist = 0;
document.querySelectorAll('.playlist').forEach(item => {
  item.addEventListener("click", ()=>{  
    if(add===true){
      for(var z in playlists){
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
  });
});

//Event listener for plus button in sidebar for creating new playlists
createPlaylist.addEventListener("click",() => {
  playlists.push({
    name: `Playlist #${playlists.length+1}`,
    tracks: ['1'],
  })
  let newPlaylist = document.createElement("h4");
  newPlaylist.classList.add('playlist');
  newPlaylist.innerHTML = `<span></span>Playlist #${playlists.length}`;
  document.getElementsByClassName("playlists")[0].appendChild(newPlaylist);
  console.log(playlists);
})

//Go to previous track
backButton.addEventListener("click",() => {
  if(currentSong <= 0){
   currentSong = songs.length - 1;
  }else{
   currentSong--;
  }
  playSong(currentSong);
  audio.play;
 });

 //Go to next track
forwardButton.addEventListener("click", () => {
  if(currentSong >= songs.length - 1){
    currentSong = 0;
  if(shuffleStatus === true){
    currentSong = Math.random() * 4;
    console.log()
  }
  }else{
    currentSong++;
  }
  playSong(currentSong);
  audio.play;
});

//Play next song when current song ends
audio.addEventListener('ended', function(){
  currentSong++;
  playSong(currentSong);
  audio.play;
});

//Rename playlists
const edit = document.getElementById("edit");
edit.addEventListener("click", () => {
  let newName = prompt("Rename your playlist:", `${playlists[currentPlaylist].name}`);

  if (newName != null) {
    document.querySelector(".playlists").children.item(currentPlaylist).innerHTML = `<span></span>${newName}`;
    playlists[currentPlaylist].name = newName;
  }
})

//Delete selected playlist
const deletePlaylist = document.getElementById("delete");
deletePlaylist.addEventListener("click", () => {
  document.querySelector(".playlists").children.item(currentPlaylist).innerHTML = "";
  playlists[currentPlaylist].remove;
  
});

//Play selected song in playlist
playSong = document.querySelectorAll(".play_now").forEach(playSong => {
  playSong.addEventListener("click", ()=>{
    currentSong = parseInt(playSong.getAttribute("id"));
    playSong(currentSong);
    audio.play;
  })
})

//Edit user information (display name, motto, bio)
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
    saveProfile();
    editUser.classList.remove("fa-save");
    editUser.classList.add("fa-user-edit");
  }
})
//go to settings page
document.querySelector("#settings").addEventListener("click",()=>{
  location.href = 'accountSettings.html';
});
//go to following page
document.querySelector("#friends").addEventListener("click",()=>{
  location.href = 'friends.html';
});

function saveProfile(){
  //send user info
  fetch('/updateProfile',{
    method: "post",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        display: document.getElementById("user-name").innerText,
        motto: document.getElementById("user-motto").innerHTML,
        bio: document.getElementById("user-bio").innerHTML
    })
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      
  })
  .catch(function(error){
      console.log(error);
  })
}
//sets profile picture
function setPFP(profile){
  if (profile==1){
    document.querySelector("#profile-icon").src = "Styling/Images/profile1.jpg";
  }else if (profile==2){
      document.querySelector("#profile-icon").src = "Styling/Images/profile2.jpg";
  }else if (profile==3){
      document.querySelector("#profile-icon").src = "Styling/Images/profile3.jpg";
  }
}
//sets background for page
function setBG(choice){
  if (choice==1){
      document.getElementsByClassName("primary-container")[0].style.backgroundImage = "url('Styling/Images/background.gif')";
  }else if (choice==2){
      document.getElementsByClassName("primary-container")[0].style.backgroundImage = "url('Styling/Images/background2.gif')";
  }else{
      document.getElementsByClassName("primary-container")[0].style.backgroundImage = "url('Styling/Images/background3.gif')";
  }
}
//sets profile values
function setProfile(data){
  //set bg
  setBG(data.background);
  //set user values
  document.getElementById("user-name").innerText= data.display;
  document.getElementById("user-motto").innerHTML = data.motto;
  document.getElementById("user-bio").innerHTML = data.bio;
  document.getElementById("bio-header").innerHTML = `About ${data.display}`;
  document.getElementById("pointsNum").innerHTML = data.points;

  //set profile pic
  setPFP(data.profile);

  
  var fanaticScore = data.fanaticScore.split(",");  
  for (var i=0;i<fanaticScore.length;i++){
    var item = document.createElement("li");
    item.innerHTML = fanaticScore[i];
    document.querySelector("#fanaticScore").appendChild(item);
  }

  //set trivia ranks
  var triviaRanks = data.triviaRanks.split(",");
  for (var i=0;i<triviaRanks.length;i++){
    var item = document.createElement("li");
    item.innerHTML = triviaRanks[i];
    document.querySelector("#triviaRanks").appendChild(item);
  }
}

//get user's profile info
function getProfile(){
  var data = { display: "",
                motto: "",
                triviaRanks: "",
                fanaticScore: "",
                bio: "",
                points: "",
                background: "",
                profile: ""
              };
  fetch('/getProfile')
  .then(response => response.json())
  .then(data => {
      setProfile(data);
  })
  .catch(function(error){
      console.log(error);
  })
}

window.onload = function(){
  getProfile();
}