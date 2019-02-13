// Load CSV file
d3.csv("data/wealth-health-2014.csv", function(data){
	

  // Convert to number
  data.forEach(function(d) {
    d.Income = +d.Income;
	d.Population = +d.Population;
	d.LifeExpectancy = +d.LifeExpectancy;
    
  });
  
 var margin = {top:20, right:10, bottom:10,left:50};
	
	// Larger circles overlap or cover smaller circles. Sort the countries by population before drawing them.

	data.sort(function(x,y){
	return d3.descending(x.Population,y.Population)});
	
	// Analyze the dataset in the web console
	var a = data[0].LifeExpectancy+data[0].LifeExpectancy;
	console.log(data);
	console.log("HELLO");
	console.log("Countries: " + data.length)

	// Append a new SVG area with D3 and add in the scatterplot
   var width = 960 - margin.left-margin.right;
    var height = 500 - margin.top-margin.bottom;
var padding = 20; 	
	var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left-margin.right)
    .attr("height", height+ margin.top-margin.bottom)
	.append("g")
	.attr("transform","translate("+margin.left+","+margin.top+")");
    

	//Create scale functions. 
	    var Incomemax = d3.max(data, function(d) { return d.Income;} );
		 var Incomemin = d3.min(data, function(d) { return d.Income;} );
		var Lifemax = d3.max(data, function(d) { return d.LifeExpectancy;} );
		 var Lifemin = d3.min(data, function(d) { return d.LifeExpectancy;} );

	var incomeScale = d3.scaleLinear()
							.domain([Incomemin, Incomemax])
							.range([0, width])

	var lifeExpectancyScale = d3.scaleLinear()
								.domain([Lifemin, Lifemax])
								.range([height, 0])
								
	var populationScale = d3.scaleSqrt().domain([0,1369435670]).range([0,30]);

	
	
	
	// Add in x-, y- axis and r (radius)
	var xAxis = d3.axisBottom()
							.scale(incomeScale)
							.ticks(12);
    var yAxis = d3.axisLeft()
							.scale(lifeExpectancyScale)
							.ticks(5);
							
							// Add the x-axis.
							// Add the y-axis.
	var xAxis = d3.axisBottom();
	var yAxis = d3.axisLeft();
	xAxis.scale(incomeScale);
	yAxis.scale(lifeExpectancyScale);




// Add an x-axis label.
svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 35)
    .text("Income per person (GDP per Capita)")

// Add a y-axis label.
svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 15)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Life Expectancy ");
	
	// Color palette

	   var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

	
	// Create group element



	// Draw the axis
svg.append("g")
.attr("class","axis x-axis")
  .attr('transform', 'translate(0,' + (440) + ')')
.call(xAxis);
svg.append("g")
.attr("class","axis y-axis")
 .attr('transform', 'translate(0,' +(-10)  + ')')
.call(yAxis);


  // ADD DOT
  var circles = svg.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
	.attr('cx',function (d) { return incomeScale(d.Income) })
      .attr('cy',function (d) { return lifeExpectancyScale(d.LifeExpectancy) })
	  .style("fill", function(d) { return colorScale(d.Country); })
      .attr('r',function(d) {return populationScale(d.Population);})
	  
});
