var request = require('request');
//var mongojs = require('mongojs');
var parser = require('json-parser');
//var xlsxj = require('xlsx-to-json');

//require('angular-smart-table-improved');

// var db = mongojs('weather_data', ['weather_data']);

// xlsxj({
//     input: "weather_data.xlsx", 
//     output: "jsonObj.json"
//   }, function(err, result) {
//     if(err) {
//       console.error(err);
//     }else {

//     	parser.parse(JSON.stringify(result));
//     	db.weather_data.insert(result, function (err, doc){ // inserting in weather_data collections
// 	    	console.log("json file successfully inserted into mongojs");
// 	    	console.log("##################################");
// 	    	console.log("##################################")
// 	    	console.log("##################################")
// 	    	console.log("##################################")
// 	    	console.log("Kindly terminate this program, press Ctrl+C ;)")
// 		  if(err) throw err;
// 		    });
// 	console.log(result);

//     }
//   });