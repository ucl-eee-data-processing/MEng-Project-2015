var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('request');
var parser = require('json-parser');
var bodyParser = require('body-parser');// body parser to get user interaction using npm package

//var penergyjs = require('./public/data/javascripts/penergy');

//express
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

//api
// request('http://rodrig-2.ee.ucl.ac.uk:8080/predict/2016-04-01T22:34/2016-03-01T23:30', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//    // console.log(body) // Print the UCL web page.
//     app.get('/get/data', function(req, res){
//     	res.writeHead(200, {'content-type': 'text/json' });
//     	res.write( JSON.stringify(body));
//     	res.json(JSON.stringify(body));
//     	console.log("received data on server");
//     });
//   }
// });

var customers = [
	{
		"created_time":"2015-01-01T12:30",
		"actual": 337.7,
		"predicted": 506.8629090622853
	},
	{
		"created_time":"2015-01-02T12:30",
		"actual": 544.13,
		"predicted": 513.7654045324598,
	},
	{
		"created_time":"2015-01-03T12:30",
		"actual": 612.94,
		"predicted": 534.4728909430123
	},{
		"created_time":"2015-01-04T12:30",
		"actual": 621.67,
		"predicted": 541.3753864131868
	},
	{
		"created_time":"2015-01-05T12:30",
		"actual": 673.02,
		"predicted": 548.2778818833758
	},
	{
		"created_time":"2015-01-06T12:30",
		"actual": 550.32,
		"predicted": 555.1803773535503
	},
	{
		"created_time":"2015-01-07T12:30",
		"actual": 516.51,
		"predicted": 562.0828728237248
	},
	{
		"created_time":"2015-01-08T12:30",
		"actual": 481.43,
		"predicted": 582.7903592342773
	},
	{
		"created_time":"2015-01-09T12:30",
		"actual": 440.08,
		"predicted": 589.6928547044517
	},
	{
		"created_time":"2015-01-10T12:30",
		"actual": 601.67,
		"predicted": 596.5953501746408
	},
	{
		"created_time":"2015-01-12T12:30",
		"actual": 561.59,
		"predicted": 603.4978456448152
	},{
		"created_time":"2015-01-16T12:30",
		"actual": 602.94,
		"predicted": 610.4003411149897
	},
	{
		"created_time": "2015-01-19T12:30",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"2015-01-20T12:30",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "2015-01-21T12:30",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"2015-01-22T12:30",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"2015-01-23T12:30",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"2015-01-26T12:30",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"2015-01-27T12:30",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"2015-01-28T12:30",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"2015-01-29T12:30",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"2015-01-30T12:30",
		"actual": 635.48,
		"predicted": 707.0352776975342
	},
	{
		"created_time": "2015-02-01T12:30",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"2015-02-02T12:30",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "2015-02-03T12:30",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"2015-02-04T12:30",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"2015-02-05T12:30",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"2015-02-06T12:30",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"2015-02-07T12:30",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"2015-02-08T12:30",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"2015-02-09T12:30",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"2015-02-10T12:30",
		"actual": 635.48,
		"predicted": 707.0352776975342
	},
	{
		"created_time":"2015-02-11T12:30",
		"actual": 601.67,
		"predicted": 596.5953501746408
	},
	{
		"created_time":"2015-02-12T12:30",
		"actual": 561.59,
		"predicted": 603.4978456448152
	},{
		"created_time":"2015-02-16T12:30",
		"actual": 602.94,
		"predicted": 610.4003411149897
	},
	{
		"created_time": "2015-02-19T12:30",
		"actual": 695.56,
		"predicted": 631.1078275255422
	},
	{
		"created_time":"2015-02-20T12:30",
		"actual": 721.83,
		"predicted": 638.0103229957167
	},
	 {
	 	"created_time" : "2015-02-21T12:30",
		"actual": 783.18,
		"predicted": 644.9128184659057
	},
	{
		"created_time":"2015-02-22T12:30",
		"actual": 716.83,
		"predicted": 651.8153139360802
	},
	{
		"created_time":"2015-02-23T12:30",
		"actual": 734.37,
		"predicted": 658.7178094062692
	},
	{
		"created_time":"2015-02-26T12:30",
		"actual": 650.48,
		"predicted": 679.4252958168072
	},
	{
		"created_time":"2015-02-27T12:30",
		"actual": 584.13,
		"predicted": 686.3277912869817
	},
	{
		"created_time":"2015-02-28T12:30",
		"actual": 679.29,
		"predicted": 693.2302867571707
	},
	{
		"created_time":"2015-02-29T12:30",
		"actual": 690.56,
		"predicted": 700.1327822273452
	},{
		"created_time":"2015-02-30T12:30",
		"actual": 635.48,
		"predicted": 707.0352776975342
	}
];
app.get('/customers', function(req, res) {
	res.type('text/json');
	res.json(JSON.stringify(customers));
});


//get files
app.get('/home', function (req, res){
	console.log('i received a GET request')
	res.sendFile('public/index.html', {root: __dirname});
	});
app.get('/products', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/products.html', {root: __dirname});
	});

app.get('/products/predict_energy_path', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/penergy.html', {root: __dirname});
	});
app.get('/products/error_path', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/error_path.html', {root: __dirname});
	});
app.get('/solutions', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/solutions.html', {root: __dirname});
	});
app.get('/solutions/solutions_energy_path', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/senergy.html', {root: __dirname});
	});
app.get('/solutions/solutions_finance_path', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/sfinance.html', {root: __dirname});
	});
app.get('/about', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/about.html', {root: __dirname});
	});
app.get('/contact', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/contact.html', {root: __dirname});
	});



//start server
app.listen (3000);
console.log('server running on port 3000');