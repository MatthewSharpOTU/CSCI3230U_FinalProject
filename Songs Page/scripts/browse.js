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
  img.src = "images/cloudy_sky.jpg";
  divHero.appendChild(img);

  

  let table = document.createElement("table");
  let tbody = document.createElement("tbody");
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  let td = document.createElement("td");

  th.innerHTML = "Search by Artist";
  
  let input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.placeholder = "Your Favourite Artist";
  td.appendChild(input);
  //td.innerHTML = "hello";
  tr.appendChild(th);
  tr.appendChild(td);
  tbody.appendChild(tr);
  table.appendChild(tbody);

  tbody = document.createElement("tbody");
  tr = document.createElement("tr");
  th = document.createElement("th");
  td = document.createElement("td");

  th.innerHTML = "Search by Song";

  input = document.createElement("input");
  input.className = "input";
  input.type = "text";
  input.placeholder = "Your Favourite Song";
  td.appendChild(input);
  //td.innerHTML = "hello";
  tr.appendChild(th);
  tr.appendChild(td);
  tbody.appendChild(tr);
  table.appendChild(tbody);

  button2 = document.createElement("button");
  button2.className = "button is-danger";
  button2.innerHTML = "Search";
  button2.id = "searchBar"




  let divCol = document.createElement("div");
  divCol.className = "columns";
  let div = document.createElement("div");
  div.className = "column is-one-third";

  divCol.appendChild(div);
  div = document.createElement("div");
  div.className = "column is-one-third";

  let br = document.createElement("br");
  div.appendChild(br);

  let a = document.createElement("a");
  a.innerHTML = "Browse Through Our Catalog Of Songs";
  a.id = "welcome";
  div.appendChild(a);

  for (let i = 0; i<5; i++){
    br = document.createElement("br");
    div.appendChild(br);
  }
  let button = document.createElement("button");
  button.className = "button is-info is-rounded";
  button.id = "genres";
  button.innerHTML = "Browse By Genre";

  div.appendChild(button);

  br = document.createElement("br");
  div.appendChild(br);
  br = document.createElement("br");
  div.appendChild(br);

  button = document.createElement("button");
  button.className = "button is-primary is-rounded";
  button.id = "songs";
  button.innerHTML = "Browse By Song";

  div.appendChild(button);
  br = document.createElement("br");
  div.appendChild(br);
  br = document.createElement("br");
  div.appendChild(br);

  button = document.createElement("button");
  button.className = "button is-success is-rounded";
  button.id = "artists";
  button.innerHTML = "Browse By Artist";

  div.appendChild(button);
  for (let i = 0; i<5; i++){
    br = document.createElement("br");
    div.appendChild(br);
  }

  div.appendChild(table);
  div.appendChild(button2);
  divCol.appendChild(div);

  div = document.createElement("div");
  div.className = "column is-one-third";

  divCol.appendChild(div);
  divHero.appendChild(divCol);
}