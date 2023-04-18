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

    divCol = document.createElement("div");
    divCol.className = "columns";

    let div = document.createElement("div");
    div.className = "column is-one-third";

    console.log(window.localStorage.getItem("genre"));
    console.log(window.localStorage.getItem("artistName"));
    console.log(window.localStorage.getItem("songName"));


    fetch('info.json')
        .then((resp) => resp.json())
        .then(function (data) {
            data.forEach((element) => {
                if (element.genre == window.localStorage.getItem("genre")) {
                    let table = document.createElement("table");
                    table.className = "table is-striped is-fullwidth";
                    let tbody = document.createElement("tbody");
                    let tr = document.createElement("tr");
                    let th = document.createElement("th");
                    let td = document.createElement("td");

                    th.innerHTML = "Artist";
                    th.className = "has-text-centered";
                    tr.appendChild(th);

                    th = document.createElement("th");
                    th.innerHTML = "Song Name";
                    th.className = "has-text-centered";
                    tr.appendChild(th);

                    th = document.createElement("th");
                    th.innerHTML = "Duration";
                    th.className = "has-text-centered";
                    tr.appendChild(th);

                    th = document.createElement("th");
                    th.innerHTML = "Add";
                    th.className = "has-text-centered";
                    tr.appendChild(th);
                    tr.className = "headers";
                    tbody.appendChild(tr);
                    table.appendChild(tbody);

                    element.tracks.forEach((track) => {
                        tbody = document.createElement("tbody");
                        tr = document.createElement("tr");
                        td = document.createElement("td");
                        td.innerHTML = track.artist;
                        td.className = "has-text-centered py-2";
                        tr.appendChild(td);
                        td = document.createElement("td");
                        td.innerHTML = track.title;
                        td.className = "has-text-centered py-2";
                        tr.appendChild(td);
                        td = document.createElement("td"); 
                        td.innerHTML = track.duration;
                        td.className = "has-text-centered py-2";
                        tr.appendChild(td);
                        td = document.createElement("td");
                        td.className = "has-text-centered py-2";
                        let button = document.createElement("button");
                        button.className = "button is-rounded";
                        button.innerHTML = "+"
                        button.id = "btn";
                        td.appendChild(button);
                        td.id = "btn";
                        tr.appendChild(td);
                        tr.className = "content py-2";
                        tbody.appendChild(tr);
                        tbody.className = "py-2";
                        table.appendChild(tbody);  
                    });
                    div.appendChild(table);
                }
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    divCol.appendChild(div);

    div = document.createElement("div");
    div.className = "column is-one-third";
    divCol.appendChild(div);

    divHero.appendChild(divCol);
}

$(document).ready(function(){

    $("body").click(function(event){
        if (event.target.id == "btn"){
            console.log("hi there :D")
        }
    });
});