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

var divHero = undefined;

window.onload = function() {
  divHero = document.getElementById("hero");
  let img = document.createElement("img");
  img.className = "hero-background is-transparent";
  img.src = "Styling/Images/cloudy_sky.jpg";
  divHero.appendChild(img);

  divCol = document.createElement("div");
  divCol.className = "columns";

  let div = document.createElement("div");
  div.className = "column is-one-third";
  fetch('info.json')
  .then((resp) => resp.json())
  .then(function (data) {
    data.forEach((element) => {
      let br = document.createElement("br");
      div.appendChild(br);
      br = document.createElement("br");
      div.appendChild(br);

      let button = document.createElement("button");
      button.className = "button is-danger is-rounded";
      button.id = element.genre;
      button.innerHTML = "Browse "+element.genre+" Songs";
      button.setAttribute('onclick', 'myFunction');

      div.appendChild(button);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

  divCol.appendChild(div);

  div = document.createElement("div");
  div.className = "column is-one-third";

  div = document.createElement("div");
  div.className = "column is-one-third";

  divCol.appendChild(div);
  divHero.appendChild(divCol);

  console.log(window.localStorage.getItem("storageName"));
}

$(document).ready(function(){

  $("div").on("click", "button", function(event) {
    console.log(event.target.id);
    window.localStorage.setItem("genre", event.target.id);
    location.href = "display.html"
  });
});
