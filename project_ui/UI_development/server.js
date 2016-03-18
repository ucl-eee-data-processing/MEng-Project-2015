var express = require('express');
var app = express();
var morgan = require('morgan');
var parser = require('json-parser');

//var mongojs = require('mongojs');
//var db = mongojs('weather_data', ['weather_data']);

// first one requires mongojs module and 2nd one says which collection we'll be using
var bodyParser = require('body-parser');// body parser to get user interaction usingnpm package

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//app.use(morgan('dev'));



app.get('/home', function (req, res){
	console.log('i received a GET request')
	res.sendFile('public/index.html', {root: __dirname});
	});
// app.get('/energy', function (req, res){
// 	console.log('i received a GET request')
// 	res.sendFile('views/energy.html', {root: __dirname});
// 	});
app.get('/products', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/products.html', {root: __dirname});
	});
app.get('/product/predict_energy_path', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/penergy.html', {root: __dirname});
	});
app.get('/product/predict_finance_path', function (req, res){
	console.log('i received a GET request')
	res.sendFile('views/pfinance.html', {root: __dirname});
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


app.listen (3000);
console.log('server running on port 3000');