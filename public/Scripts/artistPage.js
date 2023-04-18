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

window.onload = function() {
    divHero = document.getElementById("hero");
    let img = document.createElement("img");
    img.className = "hero-background is-transparent";
    img.src = "Styling/Images/cloudy_sky.jpg";
    divHero.appendChild(img);

    let divCol = document.createElement("div");
    divCol.className = "columns";

    let div = document.createElement("div");
    div.className = "column is-one-third";
    divCol.appendChild(div);

    div = document.createElement("div");
    div.className = "column is-one-third";

    let h1 = document.createElement("h1");
    h1.innerHTML = "Browse Artist Quizzes";
    div.appendChild(h1);

    fetch('questions.json')
      .then((resp) => resp.json())
      .then(function (data) {
        data.forEach((element) => {
          if (element.type == "artist"){
            element.category.forEach((e) => {
              let br = document.createElement("br");
              div.appendChild(br);
              br = document.createElement("br");
              div.appendChild(br);

              let button = document.createElement("button");
              button.className = "button is-warning is-rounded";
              button.id = e.topic;
              button.innerHTML = "Take the "+e.topic+" Quiz";
              //button.setAttribute('onclick', 'myFunction');

              div.appendChild(button);
            });
          }
          console.log(element);
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    divCol.appendChild(div);

    divHero.appendChild(divCol);
}

$(document).ready(function(){

  $("div").on("click", "button", function(event) {
    console.log(event.target.id);
    window.localStorage.setItem("trivia", event.target.id);
    window.localStorage.setItem("type", "artist");
    location.href = "questionsPage.html";
  });
});