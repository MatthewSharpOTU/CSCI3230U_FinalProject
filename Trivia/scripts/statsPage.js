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
    img.src = "images/cloudy_sky.jpg";
    divHero.appendChild(img);

    let divCol = document.getElementById("col");

    let div = document.getElementById("midDiv");
    
    let br = document.createElement("br");
    div.appendChild(br);

    let h1 = document.createElement("h1");
    h1.innerHTML = "*UserName*'s Stats: ";
    h1.id = "stats"
    div.appendChild(h1);

    br = document.createElement("br");
    div.appendChild(br);
    br = document.createElement("br");
    div.appendChild(br);

    h1 = document.createElement("h1");
    h1.innerHTML = "*UserName*'s Question Accuracy (%): ";
    h1.id = "accuracy";
    div.appendChild(h1);

    const salesData = [
        {"year": 2012, "sales": 1063},
        {"year": 2013, "sales": 978},
        {"year": 2014, "sales": 1076},
        {"year": 2015, "sales": 1214},
        {"year": 2016, "sales": 1107},
        {"year": 2017, "sales": 1520},
        {"year": 2018, "sales": 1712},
        {"year": 2019, "sales": 1606},
        {"year": 2020, "sales": 2188},
    ];

    const margin = 50;
    const width = 800;
    const height = 500;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    const colourScale = d3.scaleLinear()
                            .domain([978, 2188])
                            .range(['black', 'black']);
    
    // scaleBand is used with ordinal (categorical data)
    const xScale = d3.scaleBand() // discrete, bucket
                        .domain(salesData.map((data) => data.year))
                        .range([0, chartWidth])
                        .padding(0.3);
    
    const yScale = d3.scaleLinear()
                        .domain([0, 2200])
                        .range([chartHeight, 0]);

    let svg = d3.select('#midDiv')
                    .append('svg')
                        .attr('width', width)
                        .attr('height', height);
    
    // title
    svg.append('text')
            .attr('x', width / 2)
            .attr('y', margin)
            .attr('text-anchor', 'middle')
            .text('Sales by Year');

    
    // create a group (g) for the bars
    // Transform to perform rotations. Here we use it for translation (up-down, side-side)
    // Here 'g' is a grouped svg object
    // See - https://jenkov.com/tutorials/svg/g-element.html
    let g = svg.append('g')
                    .attr('transform', `translate(${margin}, ${margin})`);

    // y-axis
    // Make it a child of 'g', appending another g
    // Here we're calling the yScale function for the next axis object
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // x-axis
    g.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(d3.axisBottom(xScale));
    
    
    // All the rectangles will now be binded to the Sales Data
    // Enter will be called for every sales data item which doesn't have
    // a rectangle. 
    // Arrow functions get data passed to them, and we map that to our xScale values
    let rectangles = g.selectAll('rect')
        .data(salesData)
        .enter()
            .append('rect')
                .attr('x', (data) => xScale(data.year))
                .attr('y', (data) => chartHeight)
                .attr('width', xScale.bandwidth())
                .attr('height', (data) => 0)
                .attr('fill', (data) => colourScale(data.sales))
                .on('mouseenter', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.5);
                })
                .on('mouseleave', function(source, index) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1.0);
                });
    
    rectangles.transition()
        .ease(d3.easeElastic)
        .attr('height', (data) => chartHeight - yScale(data.sales))
        .attr('y', (data) => yScale(data.sales))
        .duration(1000)
        .delay((data, index) => index * 50);

    //div.appendChild(g);            
}