$(document).ready(function() {
	//set time frame to request data from the backend 
	$("button").click(function() {
	 var value = "'time_frame' : {" + "'start_time :'" + document.getElementById('start_time').value + 
				 "," + "'end_time :'" + 
				 document.getElementById('end_time').value + "}";
	  	  console.log(value);
	});

	function penergy(){

};

var dataset2 = [
	{
		"created_time":"01/01/2015 12:30",
		"actual": 337.7,
		"predicted": 506.8629090622853
	},
	{
		"created_time":"02/01/2015 12:30",
		"actual": 544.13,
		"predicted": 513.7654045324598
	},
	{
		"created_time":"03/01/2015 12:30",
		"actual": 612.94,
		"predicted": 534.4728909430123
	},{
		"created_time":"04/01/2015 12:30",
		"actual": 621.67,
		"predicted": 541.3753864131868
	},
	{
		"created_time":"05/01/2015 12:30",
		"actual": 673.02,
		"predicted": 548.2778818833758
	},
	{
		"created_time":"06/01/2015 12:30",
		"actual": 550.32,
		"predicted": 555.1803773535503
	},
	{
		"created_time":"07/01/2015 12:30",
		"actual": 516.51,
		"predicted": 562.0828728237248
	},
	{
		"created_time":"08/01/2015 12:30",
		"actual": 481.43,
		"predicted": 582.7903592342773
	},
	{
		"created_time":"9/01/2015 12:30",
		"actual": 440.08,
		"predicted": 589.6928547044517
	},
	{
		"created_time":"10/01/2015 12:30",
		"actual": 601.67,
		"predicted": 596.5953501746408
	},
	{
		"created_time":"12/01/2015 12:30",
		"actual": 561.59,
		"predicted": 603.4978456448152
	},{
		"created_time":"16/01/2015 12:30",
		"actual": 602.94,
		"predicted": 610.4003411149897
	},
	{
		"created_time": "19/01/2015 12:30",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"20/01/2015 12:30",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "21/01/2015 12:30",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"22/01/2015 12:30",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"23/01/2015 12:30",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"26/01/2015 12:30",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"27/01/2015 12:30",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"28/01/2015 12:30",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"29/01/2015 12:30",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"30/01/2015 12:30",
		"actual": 635.48,
		"predicted": 707.0352776975342
	},
	{
		"created_time": "01/02/2015 12:30",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"02/02/2015 12:30",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "03/02/2015 12:30",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"04/02/2015 12:30",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"05/02/2015 12:30",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"06/02/2015 12:30",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"07/02/2015 12:30",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"08/02/2015 12:30",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"09/02/2015 12:30",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"10/02/2015 12:30",
		"actual": 635.48,
		"predicted": 707.0352776975342
	},
	{
		"created_time":"10/01/2015 12:30",
		"actual": 601.67,
		"predicted": 596.5953501746408
	},
	{
		"created_time":"12/02/2015 12:30",
		"actual": 561.59,
		"predicted": 603.4978456448152
	},{
		"created_time":"16/02/2015 12:30",
		"actual": 602.94,
		"predicted": 610.4003411149897
	},
	{
		"created_time": "19/02/2015 12:30",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"20/02/2015 12:30",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "21/02/2015 12:30",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"22/02/2015 12:30",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"23/02/2015 12:30",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"26/02/2015 12:30",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"27/02/2015 12:30",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"28/02/2015 12:30",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"29/02/2015 12:30",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"30/02/2015 12:30",
		"actual": 635.48,
		"predicted": 707.0352776975342
	}
];

//computation for dc.js line chart
var ndx = crossfilter(dataset2);

var actual2 = ndx.dimension(function(d){return d.actual; });

var parseDate2 = d3.time.format("%d/%m/%Y %H:%M").parse;

dataset2.forEach(function(d){
	d.date = parseDate2(d.created_time);
	d.actual2 = d.actual;
	d.total = Math.abs(d.actual - d.predicted);
	d.month = d3.time.month(d.date);
});

var dateDimen = ndx.dimension(function(d) {return d.date;});
var actualHits = dateDimen.group().reduceSum(function(d) {return d.actual2; });
var predictedHits = dateDimen.group().reduceSum(function(d) {return d.predicted; });
var total2 = dateDimen.group().reduceSum(function(d){return d.total; });

var minDate = dateDimen.bottom(1)[0].date;
var maxDate = dateDimen.top(1)[0].date;

var hitslineChart = dc.lineChart("#chart-line-hitsperday");

hitslineChart.width(650).height(250)
			.dimension(dateDimen)
			.group(actualHits, 'actual')
			.stack(predictedHits, 'predicted')
			.stack(total2, 'Abs. Diff.')
			.renderArea(true)
			.x(d3.time.scale().domain([minDate,maxDate]))
			.renderHorizontalGridLines(true)
			.renderVerticalGridLines(true)
			.legend(dc.legend().x(55).y(12).itemHeight(13).gap(5))
			.brushOn(false)
			.elasticX(true)
			.yAxisLabel("Actual Energy")
			.margins({top:11, left:51, right:11, bottom:51})
			.renderlet(function (chart) {chart.selectAll("g.x text").attr('dx', '-35').attr('dy', '-9').attr('transform', "rotate(-90)");});

//computattion of pie chart for months
var monthRingChart = dc.pieChart('#chart-ring-month');
var monthDim = ndx.dimension(function(d){return d.month; });
var month_total = monthDim.group().reduceSum(function(d){return d.actual2; });

monthRingChart.width(150).height(150)
				.dimension(monthDim)
				.group(month_total)
				.innerRadius(30);

dc.renderAll();

});

