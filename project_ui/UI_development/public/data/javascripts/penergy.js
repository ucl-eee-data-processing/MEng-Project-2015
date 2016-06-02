$(document).ready(function() {

	/// data received from cornell university and stored as hard (backup plan for presentation) 
var dataset = [
	{
		"created_time":"2016-01-01T09:30",
		"actual": 21589,
		"predicted": 24589
	},
	{
		"created_time":"2016-01-01T10:00",
		"actual": 18957.3398438,
		"predicted": 20399,
	},
	{
		"created_time":"2016-01-01T10:30",
		"actual": 24237.550781,
		"predicted": 21854
	},{
		"created_time":"2016-01-01T11:00",
		"actual": 25589.234341,
		"predicted": 24163
	},
	{
		"created_time":"2016-01-01T11:30",
		"actual": 26589.234341,
		"predicted": 24744
	},
	{
		"created_time":"2016-01-01T12:00",
		"actual": 20139.9609375,
		"predicted": 22604
	},
	{
		"created_time":"2016-01-01T12:30",
		"actual": 23017.5507812,
		"predicted": 21630
	},
	{
		"created_time":"2016-01-01T13:00",
		"actual": 24118.7304688,
		"predicted": 21967
	},
	{
		"created_time":"2016-01-01T13:30",
		"actual": 23008.6503906,
		"predicted": 21434
	},
	{
		"created_time":"2016-01-01T14:00",
		"actual": 21056.9394531,
		"predicted": 20296
	},
	{
		"created_time":"2016-01-01T14:30",
		"actual": 22501.140625,
		"predicted": 24474
	},{
		"created_time":"2016-01-01T15:00",
		"actual": 18970.9804688,
		"predicted": 20483
	},
	{
		"created_time": "2016-01-01T15:30",
		"actual": 18988.0703125,
		"predicted": 20086
	},
	{
		"created_time":"2016-01-01T16:00",
		"actual": 18687.6699219,
		"predicted": 20892
	},
	 {
	 	"created_time" : "2016-01-01T16:30",
		"actual": 24164.5507812,
		"predicted": 22884
	},
	{
		"created_time":"2016-01-01T17:00",
		"actual": 24001.140625,
		"predicted": 21642
	},
	{
		"created_time":"2016-01-01T17:30",
		"actual": 25187.4003906,
		"predicted": 22606
	},
	{
		"created_time":"2016-01-01T18:00",
		"actual": 25337.5507812,
		"predicted": 21376
	},
	{
		"created_time":"2016-01-01T18:30",
		"actual": 25957.3398438,
		"predicted": 24566
	},
	{
		"created_time":"2016-01-01T19:00",
		"actual": 18879.1699219,
		"predicted": 20015
	},
	{
		"created_time":"2016-01-01T19:30",
		"actual": 18884.359375,
		"predicted": 20603
	},{
		"created_time":"2016-01-01T20:00",
		"actual": 23970.9804688,
		"predicted": 20958
	},
	{
		"created_time": "2016-01-01T20:30",
		"actual": 25237.5507812,
		"predicted": 23749
	},
	{
		"created_time":"2016-01-01T21:00",
		"actual": 22209.8300781,
		"predicted": 24295
	},
	 {
	 	"created_time" : "2016-01-01T21:30",
		"actual": 22022.359375,
		"predicted": 24539
	},
	{
		"created_time":"2016-01-01T22:00",
		"actual": 25781.3203125,
		"predicted": 23698
	},
	{
		"created_time":"2016-01-01T22:30",
		"actual": 18118.7304688,
		"predicted": 21124
	},
	{
		"created_time":"2016-01-01T23:00",
		"actual": 18202.3496094,
		"predicted": 21481
	},
	{
		"created_time":"2016-01-01T23:30",
		"actual": 18879.1699219,
		"predicted": 20124
	}
];




//using crossfilter.js on the data array
var ndx = crossfilter(dataset);
// matching the filtered data2 to the predicted key/value
var actual2 = ndx.dimension(function(d){return d.actual; });
// get the required date format
var parseDate2 = d3.time.format("%Y-%m-%dT%H:%M").parse;
//LOOP to get the key (time) for each response & predicted data
dataset.forEach(function(d){
	d.date = parseDate2(d.created_time);
	d.actual2 = d.actual;
	d.total = Math.abs(d.actual - d.predicted);
	d.month = d3.time.month(d.date);
});
// filter on data from data2
var dateDimen = ndx.dimension(function(d) {return d.date;});
//match the date with predicted data
var actualHits = dateDimen.group().reduceSum(function(d) {return d.actual2; });
var predictedHits = dateDimen.group().reduceSum(function(d) {return d.predicted; });
var total2 = dateDimen.group().reduceSum(function(d){return d.total; });
// calculate the minimum & maximum data
var minDate = dateDimen.bottom(1)[0].date;
var maxDate = dateDimen.top(1)[0].date;

// start of dc.js js sccript for predicting energy
var productslineChart = dc.lineChart("#chart-product-hitsperday");
productslineChart.width(700).height(350)
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
			.yAxisLabel("Overall Energy Usage")
			.margins({top:11, left:51, right:11, bottom:51})
			.on("renderlet", function (chart) {chart.selectAll("g.x text").attr('dx', '-35').attr('dy', '-9').attr('transform', "rotate(-90)");});

//computattion of pie chart for months
/*var prod_monthRingChart = dc.pieChart("#chart-product-month");
var monthDim = ndx.dimension(function(d){return d.month; });
var month_total = monthDim.group().reduceSum(function(d){return d.actual2; });

prod_monthRingChart.width(150).height(150)
				.dimension(monthDim)
				.group(month_total)
				.innerRadius(30);*/

//end of dc.js js sccript for predicting energy


dc.renderAll();

});

//using channing for multi ajax requests
var channing1 =	$.ajax({
                url: "/predict",
                    //URL for the request
                type: "GET",
                    // this is a GET request
                dataType: "json",
                    // data we expect back
                data : {'start_time' : document.getElementById('start_time').value, 'end_time' : document.getElementById('end_time').value}
            });

var channing2 = $.ajax({
                url: "/actual",
                    //URL for the request
                type: "GET",
                    // this is a GET request
                dataType: "json"});

window.datenow = function() {

	$.when(channing1, channing2).done(function(r1, r2) {
    // Each returned resolve has the following structure:
    // [data, textStatus, jqXHR]
    // e.g. To access returned data, access the array at index 0
    //console.log(r1[0]);
    var obj = jQuery.parseJSON(r1[0]);

                   //empty array
                   	var data2 = [];
                   	//creating loop to go through response object
					  for (var p in obj) {
					    if( obj.hasOwnProperty(p) ) {//get value for each key
					    	// create it in this format
					      var result = {
					      				created_time: String(p),
					      				predicted: obj[p]
					      			}
					      			//stringify the result
					      JSON.stringify(result);
					      data2.push(result);// push it to the empty array
					      //console.log(data2);
					    } 
					  };

					  //using crossfilter.js on the data array
					  var ndx2 = crossfilter(data2);
					  // matching the filtered data2 to the predicted key/value
					  var predicted2 = ndx2.dimension(function(d){return d.predicted; });
					  // get the required date format
                     var parseDate = d3.time.format("%Y-%m-%dT%H:%M").parse;
                    
                    
                   //LOOP to get the key (time) for each response & predicted data
                    data2.forEach(function(d){
                    	d.date = parseDate(d.created_time);
                    	d.predicted2 = d.predicted;
                    });

                    // filter on data from data2
					var dateDimen2 = ndx2.dimension(function(d) {return d.date; });
					//match the date with predicted data
					var predictedHits2 = dateDimen2.group().reduceSum(function(d) {return d.predicted; });
					// calculate the minimum & maximum data
					var minDate1 = dateDimen2.bottom(1)[0].date;
					var maxDate1 = dateDimen2.top(1)[0].date;
					// start of dc.js js sccript for predicting energy
					var productslineChart2 = dc.lineChart("#predicted_values");//#predicted energy in the HTML
					productslineChart2.width(700).height(350)
								.dimension(dateDimen2)
								.group(predictedHits2, 'Predicted')
								.renderArea(true)
								.x(d3.time.scale().domain([minDate1, maxDate1]))
								.renderHorizontalGridLines(true)
								.renderVerticalGridLines(true)
								.legend(dc.legend().x(55).y(12).itemHeight(13).gap(5))
								.brushOn(false)
								.elasticX(true)
								.yAxisLabel("Predicted Energy Usage (kWh)")
								.margins({top:11, left:51, right:11, bottom:51})
								.on("renderlet", function (chart) {chart.selectAll("g.x text").attr('dx', '-35').attr('dy', '-9').attr('transform', "rotate(-90)");});
								dc.renderAll();

			var obj1 = r2[0];// CODE FOR ACTUAL DATA BELOW  -->console.log(r2[0]);
                    //console.log(obj);
                   //empty array
                   	var data21 = [];
                   	//creating loop to go through response object
					  for (var p in obj1) {
					    if( obj1.hasOwnProperty(p) ) {//get value for each key
					    	// create it in this format
					      var result1 = {
					      				created_time: String(p),
					      				Actual: obj1[p]
					      			}
					      			//stringify the result
					      JSON.stringify(result1);
					      data21.push(result1);// push it to the empty array
					    } 
					  };

					  //using crossfilter.js on the data array
					  var ndx21 = crossfilter(data21);
					  // matching the filtered data2 to the predicted key/value
					  var predicted21 = ndx21.dimension(function(d){return d.Actual; });
					  // get the required date format
                     var parseDate1 = d3.time.format("%Y-%m-%dT%H:%M").parse;
                    
                    
                   //LOOP to get the key (time) for each response & predicted data
                    data21.forEach(function(d){
                    	d.date1 = parseDate1(d.created_time);
                    	d.predicted2 = d.Actual;
                    });

                    // filter on data from data2
					var dateDimen21 = ndx21.dimension(function(d) {return d.date1; });
					//match the date with predicted data
					var predictedHits21 = dateDimen21.group().reduceSum(function(d) {return d.Actual; });
					// calculate the minimum & maximum data
					var minDate11 = dateDimen21.bottom(1)[0].date;
					var maxDate11 = dateDimen21.top(1)[0].date;
					// start of dc.js js sccript for predicting energy
					var productslineChart21 = dc.lineChart("#chart-home-hitsperday");//#predicted energy in the HTML
					productslineChart21.width(700).height(350)
								.dimension(dateDimen21)
								.group(predictedHits21, 'Actual data')
								.renderArea(true)
								.x(d3.time.scale().domain([minDate11, maxDate11]))
								.renderHorizontalGridLines(true)
								.renderVerticalGridLines(true)
								.legend(dc.legend().x(55).y(12).itemHeight(13).gap(5))
								.brushOn(false)
								.elasticX(true)
								.yAxisLabel("Actual Energy Usage (kWh)")
								.margins({top:11, left:51, right:11, bottom:51})
								.on("renderlet", function (chart) {chart.selectAll("g.x text").attr('dx', '-35').attr('dy', '-9').attr('transform', "rotate(-90)");});
								dc.renderAll();    
});
};