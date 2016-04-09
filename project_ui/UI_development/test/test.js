// writing some test cases using Mocha, should and supertest

var supertest = require('supertest');
var should = require('should');
var request = require('request');

//lets create an agent to access the required port
var home = "http://localhost:3000";
var products = "http://localhost:3000/products";
var penergy = "http://localhost:3000/products/predict_energy_path";
var error ="http://localhost:3000/products/error_path";

var solutions = "http://localhost:3000/solutions";
var senergy = "http://localhost:3000/solutions/solutions_energy_path";
var serror ="http://localhost:3000/solutions/solutions_finance_path";


var about = "http://localhost:3000/about";
var contact = "http://localhost:3000/contact";

// lets begin the UNIT testing

describe("Homepage unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(home, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});

describe("products unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(products, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});


describe("Predict Energy for products page unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(penergy, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});

describe("Error page unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(error, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});

describe("solutions unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(solutions, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});


describe("Predict Energy for solutions page unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(senergy, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});

describe("Solutions Error page unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(serror, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});

describe("About page unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(about, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});

describe("Contact page unit test",function(){
	// check the status code to see the system has the right status code
  	it("returns status 200", function() {
      request(contact, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
      });
    });

});