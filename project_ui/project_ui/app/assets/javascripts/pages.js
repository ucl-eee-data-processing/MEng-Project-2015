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




});