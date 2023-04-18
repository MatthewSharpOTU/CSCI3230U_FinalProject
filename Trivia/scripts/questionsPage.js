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

let questions = undefined;
var qID = undefined;


fetch('questions.json')
      .then((resp) => resp.json())
      .then(function (data) {
        data.forEach((element) => {
            console.log(element.type);
            console.log(window.localStorage.getItem("type"));
            if (element.type == window.localStorage.getItem("type")){
                element.category.forEach((e) => {
                    if (e.topic == window.localStorage.getItem("trivia")){
                        questions = e.questions;
                        qID = e.id;
                        console.log(questions[1].Q);
                    }
                });
            }
        });
      })
      .catch(function(error) {
        console.log(error);
      });

let oldCard = undefined;
var count = 0;

window.onload = function() {
    console.log(window.localStorage.getItem("trivia"));
    let h1 = document.getElementById("Header");
    h1.innerHTML = window.localStorage.getItem("trivia") + " Quiz - Good Luck :)";

    let h2 = document.getElementById("subheader");
    h2.innerHTML = "Do Not Include Option Letter In Answer"


    const app = Vue.createApp({
    // Shorthand syntax for data: function() {}
    data() {
        console.log(questions);
        return {
            // Array of card objects
            // Recall - Previously we had only simple data structure, now we're using an array as part of
            // our returned data() object.
            cards: [
                { model: questions[0].Q, question: questions[0].Options, correct: questions[0].Right},
                { model: questions[1].Q, question: questions[1].Options, correct: questions[1].Right},
                { model: questions[2].Q, question: questions[2].Options, correct: questions[2].Right},
                { model: questions[3].Q, question: questions[3].Options, correct: questions[3].Right},
                { model: questions[4].Q, question: questions[4].Options, correct: questions[4].Right},
            ],
            options: [
                { model: questions[0].Options, correct: questions[0].Right, isSelect: false},
                { model: questions[1].Options, correct: questions[1].Right, isSelect: false},
                { model: questions[2].Options, correct: questions[2].Right, isSelect: false},
                { model: questions[3].Options, correct: questions[3].Right, isSelect: false},            
                { model: questions[4].Options, correct: questions[4].Right, isSelect: false},                
            ],
            // Should we show the graphics card?
            showCard: true,
            // Store URLs
        }
    },
        methods: {
            // changeModel(model, price, cores) {
            //     this.model = model
            //     this.price = price
            //     this.cores = cores
            // },
            toggleCard() {
                // Flip the boolean value
                // if (card != undefined){
                //     card.showCard = !card.showCard;
                // }
                // console.log(card);
                // card = this;
                this.showCard = this.showCard;
            },
            toggleSelect(card) {
                card.isSelect = !card.isSelect
                if (oldCard != undefined){
                    oldCard.isSelect = !oldCard.isSelect
                }
                if (oldCard == card){
                    card.isSelect = !card.isSelect
                    oldCard = undefined;
                } else {
                    oldCard = card;
                }
                
            }
        }
    }).mount('#app')

}

$(document).ready(function(){

    $("body").on("click", "button", function(event) {
        console.log(event.target);
        count = 0;
        let i1 = document.getElementById("a1").value;
        if (i1 == questions[0].Right){
            count++;
        }
        let i2 = document.getElementById("a2").value;
        if (i2 == questions[1].Right){
            count++;
        }
        let i3 = document.getElementById("a3").value;
        if (i3 == questions[2].Right){
            count++;
        }
        let i4 = document.getElementById("a4").value;
        if (i4 == questions[3].Right){
            count++;
        }
        let i5 = document.getElementById("a5").value;
        if (i5 == questions[4].Right){
            count++;
        }
        console.log(count);
        let scores = window.localStorage.getItem("stats").split(",");
        scores.forEach((e) => {
            console.log(e);
        });
        if (scores[qID-1] == -1){
            //console.log(qID);
            scores[qID-1] = count;
            console.log(scores);
            window.localStorage.setItem("stats", scores);
            alert("Your Score For The "+window.localStorage.getItem("trivia")+" quiz is: "+count+"/5");  
        } else {
            alert("You have taken this quiz already, redirecting you to trivia home page");  
        }
        location.href = "triviaPage.html";
    });
  });