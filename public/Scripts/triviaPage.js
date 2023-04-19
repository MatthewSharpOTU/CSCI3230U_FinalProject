// // Requiring fs module
// import {fs} from './fs';

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
});

async function getScores(){
    var data = {username: "",
                quizzes: ""};
    return fetch('/getTrivia')
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        //use data.username to set username wherever needed
        //return data.quizzes.split(",");
        return data.username;
    })
    .catch(function(error){
        console.log(error);
    })
}


window.onload = async function() {
    let user = getScores();
    console.log(user);


    let divHero = document.getElementById("hero");
    let img = document.createElement("img");
    img.className = "hero-background is-transparent";
    img.src = "Styling/images/cloudy_sky.jpg";
    divHero.appendChild(img);
  
    let divCol = document.createElement("div");
    divCol.className = "columns";

    let div = document.createElement("div");
    div.className = "column is-one-quarter";


    divCol.appendChild(div);
    div = document.createElement("div");
    div.className = "column is-half";

    let br = document.createElement("br");
    div.appendChild(br);

    let a = document.createElement("a");
    a.innerHTML = "Test Your Knowledge In Quizzes";
    a.id="welcome";
    div.appendChild(a);

    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);

    let button = document.createElement("button");
    button.id = "btn";
    button.className = "button is-info is-rounded";
    button.id = "genre";
    button.innerHTML = "Genre Quizzes"
    button.setAttribute('onclick', 'location.href = "genrePage.html"');
    div.appendChild(button);

    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);

    button = document.createElement("button");
    button.id = "btn";
    button.className = "button is-link is-rounded";
    button.id = "artist";
    button.innerHTML = "Artist Quizzes"
    button.setAttribute('onclick', 'location.href = "artistsPage.html"');
    div.appendChild(button);

    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);

    button = document.createElement("button");
    button.className = "button is-primary is-rounded";
    button.id = "settingsBtn";
    button.innerHTML = "View Trivia Stats"
    img = document.createElement("img");
    img.id = "settings";
    img.src = "Styling/Images/settings.png";
    button.appendChild(img);
    button.setAttribute('onclick', 'location.href = "statsPage.html"');
    div.appendChild(button);

    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);

    button = document.createElement("button");
    button.className = "button is-warning is-rounded";
    button.id = "reset";
    button.innerHTML = "Start/Reset Stat Tracking";
    button.setAttribute('onclick', 'resetFunc()');
    div.appendChild(button);

    divCol.appendChild(div);
    //divHero.appendChild(divCol);

    div = document.createElement("div");
    div.className = "column is-one-quarter";

    divCol.appendChild(div);
    divHero.appendChild(divCol);

    //Get User From Database

    let x = false;

    // fetch('storage.json')
    //   .then((resp) => resp.json())
    //   .then(function (data) {
    //     data.forEach((element) => {
    //       if (element.user == //username){
    //         window.localStorage.setItem("username", user);
    //         x = true;
    //         break;
    //         });
    //       }
    //       console.log(element);
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    if (x == false) {       
        
      // Defining new data to be added
      let newData = {
          "user": user,
          //"user": "sampleUser",
          "stats": [
              {
                  "genre": [
                      {
                          "HipHop": -1
                      },
                      {
                          "Pop": -1
                      },
                      {
                          "Rock": -1
                      }
                  ]
              },
              {
                  "artist": [
                      {
                          "ACDC": -1
                      },
                      {
                          "BTS": -1
                      },
                      {
                          "Daft Punk": -1
                      },
                      {
                          "Drake": -1
                      }
                  ]
              }
          ]
      };

  }
}

function resetScores(){
    //send bg update
    fetch('/resetScores',{
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            quizzes: "-1,-1,-1,-1,-1,-1,-1"
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.quizzes);
    })
    .catch(function(error){
        console.log(error);
    })
}

function resetFunc(){
    window.localStorage.setItem("stats", "-1,-1,-1,-1,-1,-1,-1");
    console.log(window.localStorage.getItem("stats"));
    //reset scores on server
    resetScores();
    alert("Stats have been Reset");
}