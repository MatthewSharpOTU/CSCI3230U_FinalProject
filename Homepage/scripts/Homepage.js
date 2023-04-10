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
  var points = [
    {xpoint: 120, ypoint: 25},
    {xpoint: 125, ypoint: 40},
    {xpoint: 150, ypoint: 25},
    {xpoint: 125, ypoint: 0},
    {xpoint: 100, ypoint: 25},
    {xpoint: 100, ypoint: 50},

    {xpoint: 225, ypoint: 75},
    {xpoint: 675, ypoint: 75},

    {xpoint: 900, ypoint: 50},
    {xpoint: 900, ypoint: 25},
    {xpoint: 875, ypoint: 0},
    {xpoint: 850, ypoint: 25},
    {xpoint: 875, ypoint: 40},
    {xpoint: 875, ypoint: 25},
  ]
    
  var Gen = d3.line()
    .x((p) => p.xpoint)
    .y((p) => p.ypoint)
    .curve(d3.curveBasis);
      
  d3.select("#top-line")
    .append("path")
    .attr("d", Gen(points))
    .attr("fill", "none")
}