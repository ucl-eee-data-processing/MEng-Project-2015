var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('request');
//var sentiment = require('sentiment-analysis'); lower threshold performance
var sentiment = require('sentiment'); // better threshold performance
var twitter = require('ntwitter'); // use twitter to monitor phrases
var parser = require('json-parser');
var bodyParser = require('body-parser');// body parser to get user interaction using npm package

//express
app.use(express.static(__dirname + "/public"));

var placeholder = 'Cornell'; // if no search, default to cornell
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());


   // api call from penergy.js ONLY WORKS UNDER UCL EDUROAM DUE TO SECURITY REASONS
    app.get('/predict', function(req, res){
    	console.log(req.query.start_time);
    	console.log(req.query.end_time);
    	request('http://rodrig-2.ee.ucl.ac.uk:8080/predict/' + req.query.start_time + '/' + req.query.end_time, function (error, response, body){
    		if (!error && response.statusCode == 200) {
    			console.log(body);
    			res.type('text/json');
    			res.json(body);
    		}
    	});
    	console.log("received & sent data from server");
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