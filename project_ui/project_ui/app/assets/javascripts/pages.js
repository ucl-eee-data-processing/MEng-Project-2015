$(document).ready(function() {
//$(document).on('page:load', function () {
	//set time frame to request data from the backend 
	$("button").click(function() {
	 var value = "'time_frame' : {" + "'start_time :'" + document.getElementById('start_time').value + 
				 "," + "'end_time :'" + 
				 document.getElementById('end_time').value + "}";
	  	  console.log(value);
	});

	var dataset = [
	{
		"created_time":"01/01/2015 12:30:56",
		"actual": 337.7,
		"predicted": 506.8629090622853
	},
	{
		"created_time":"02/01/2015 12:30:23",
		"actual": 544.13,
		"predicted": 513.7654045324598
	},
	{
		"created_time":"05/01/2015 12:30:12",
		"actual": 612.94,
		"predicted": 534.4728909430123
	},{
		"created_time":"06/01/2015 12:30:43",
		"actual": 621.67,
		"predicted": 541.3753864131868
	},
	{
		"created_time":"07/01/2015 12:30:34",
		"actual": 673.02,
		"predicted": 548.2778818833758
	},
	{
		"created_time":"08/01/2015 12:30:21",
		"actual": 550.32,
		"predicted": 555.1803773535503
	},
	{
		"created_time":"09/01/2015 12:30:43",
		"actual": 516.51,
		"predicted": 562.0828728237248
	},
	{
		"created_time":"12/01/2015 12:30:34",
		"actual": 481.43,
		"predicted": 582.7903592342773
	},
	{
		"created_time":"13/01/2015 12:30:12",
		"actual": 440.08,
		"predicted": 589.6928547044517
	},
	{
		"created_time":"14/01/2015 12:30:23",
		"actual": 601.67,
		"predicted": 596.5953501746408
	},
	{
		"created_time":"15/01/2015 12:30:45",
		"actual": 561.59,
		"predicted": 603.4978456448152
	},{
		"created_time":"16/01/2015 12:30:21",
		"actual": 602.94,
		"predicted": 610.4003411149897
	},
	{
		"created_time": "19/01/2015 12:30:23",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"20/01/2015 12:30:21",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "21/01/2015 12:30:00",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"22/01/2015 12:30:23",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"23/01/2015 12:30:35",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"26/01/2015 12:30:51",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"27/01/2015 12:30:43",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"28/01/2015 12:30:52",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"29/01/2015 12:30:43",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"30/01/2015 12:30:46",
		"actual": 635.48,
		"predicted": 707.0352776975342
	}
];

	var contain = d3.select("#penergy"),
		margins = {
        top: 20,
	    right: 20,
	    bottom: 20,
	    left: 120
	   },
    	width = 1000,
    	height = 600;
    
	// Parse the date / time
	var	parseDate = d3.time.format("%d/%m/%Y %H:%M:%S").parse;

	//area available to plot the graph on x-axis

	 // var x = d3.time.scale()
  //    .domain([new Date(dataset[0].created_time), d3.time.day.offset(new Date(dataset[dataset.length - 1].created_time), 1)])
  //    .rangeRound([0, width - margins.right ]);

     var x = d3.time.scale().range([0, width ]);

     var y = d3.scale.linear()
         .range([height - margins.top, margins.bottom]);
	// var y = d3.scale.linear().domain([0, d3.max(dataset, function(d) { return d.actual; })])
 //    .range([height - margins.top, margins.bottom]);

    var xAxis =  d3.svg.axis()
				    .scale(x)
				    .orient("bottom")
				    .tickFormat(d3.time.format("%d %b %H:%M %p"))
				    .tickSize(0)
				    .tickPadding(8);

    var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient('left')
				    .tickPadding(8);

	var lineGenerator = d3.svg.line()
	  .x(function(d) {
	    return x(d.created_time);
	  })
	  .y(function(d) {
	    return y(d.actual);
	  });

	  var svg = d3.select('#penergy').append("svg")
			    .attr('width', width)
			    .attr('height', height)
			  	.append('g')
			    .attr('transform', 'translate(' + margins.left + ', ' + margins.top + ')');
	  dataset.forEach(function(d){
	  	d.created_time = parseDate(d.created_time);
	  	d.actual = +d.actual;
	  });



	  x.domain(d3.extent(dataset, function(d) {
	  	return d.created_time;
	  }));
	  y.domain(d3.extent(dataset, function(d) {
	  	return d.actual;
	  }));

	   contain.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height - margins.bottom) + ")")
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
	      .attr("dx", "-.8em")
	      .attr("dy", "-.55em")
	      .attr("transform", "rotate(-90)" );

    	contain.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + (margins.left) + ", 0)")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(0)")
          .attr("y", 6)
          .attr("dy", "-0.60em")
          .style("text-anchor", "end")
          .text("Actual value");

    svg.append("path")
          .datum(dataset)
          .attr("class", "line")
           .style("fill", "none")
    .style("stroke", "blue")
          .attr("d", lineGenerator);

	function penergy(){

};

});

