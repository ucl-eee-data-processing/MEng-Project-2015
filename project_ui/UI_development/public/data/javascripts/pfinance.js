$(document).ready(function() {
	//include a GET AJAX HERE to the end point
            $.ajax({
                url: "/actual",
                    //URL for the request
                type: "GET",
                    // this is a GET request
                dataType: "json",
                    // data we expect back
                //data : {'start_time' : document.getElementById('start_time').value, 'end_time' : document.getElementById('end_time').value},
                success: function (response) {
                    // print out the data we get back
                    //converting to a json object
                    var obj = response;
                    //console.log(obj);
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
					var productslineChart2 = dc.lineChart("#chart-home-hitsperday");//#predicted energy in the HTML
					productslineChart2.width(700).height(350)
								.dimension(dateDimen2)
								.group(predictedHits2, 'Actual data')
								.renderArea(true)
								.x(d3.time.scale().domain([minDate1, maxDate1]))
								.renderHorizontalGridLines(true)
								.renderVerticalGridLines(true)
								.legend(dc.legend().x(55).y(12).itemHeight(13).gap(5))
								.brushOn(false)
								.elasticX(true)
								.yAxisLabel("Actual Energy (kWh)")
								.margins({top:11, left:51, right:11, bottom:51})
								.on("renderlet", function (chart) {chart.selectAll("g.x text").attr('dx', '-35').attr('dy', '-9').attr('transform', "rotate(-90)");});
								dc.renderAll();

                },
                error: function (xhr, status) {
                    // if request fails print out this
                    console.log("Sorry, there is a problem!");
                },
                complete: function (xhr, status) { // code to runs if yay or nay
                    console.log("The request is now complete!");
                }
            })
	  //};
 });

