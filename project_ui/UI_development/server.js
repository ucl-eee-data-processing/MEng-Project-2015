require('dotenv').load();

var express = require('express');
var app = express();
var morgan = require('morgan');
var request = require('request');
var http = require('http').Server(app);
var path = require('path');
var destroy = require('destroy');
//var sentiment = require('sentiment-analysis'); lower threshold performance
var sentiment = require('sentiment'); // better threshold performance
var Twitter = require('ntwitter'); // use twitter to monitor phrases
var parser = require('json-parser');
var bodyParser = require('body-parser');// body parser to get user interaction using npm package
var Cornell = require('./Cornell.js');
var pwuid = require('pwuid');

//express
app.use(express.static(__dirname + "/public"));
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

// setting variables for later use
var twitterCount = 0;
var twitterTotalSenti = 0;
var checkStatus;

//twitter connection via .env for security
var twitterClient = new Twitter({
 consumer_key: process.env.consumer_key,
 consumer_secret: process.env.consumer_secret,
 access_token_key: process.env.access_token,
 //access_token: process.env.access_token,
 access_token_secret: process.env.access_token_secret
});


//restart the process
function restartStatus(){
  if (stream) {
    var toRestart = stream;
    stream = null;  // signal to event handlers to ignore end/destroy
    toRestart.destroy();
  }
  checkStatus = ""; // empty string
}

function startStatus (search_data){
  if (checkStatus){
    restartStatus();
  }
  checkStatus = search_data;
  twitterCount = 0;
  twitterTotalSenti = 0;

// twitter connection for data searched
// get the geolocation bounding box from http://www.mapdevelopers.com/geocode_bounding_box.php
//var NYC = [ '40.915256', '40.496044', '-73.700272', '-74.255735' ]; -79.762418, 40.477408, -71.778137, 45.010840

  twitterClient.stream ('statuses/filter', {
        'track': search_data, 'locations' : '-79.762418, 40.477408, -71.778137, 45.010840'
      }, function (inStream) {
        stream = inStream;

        stream.on('data', function (data){
          if (data.lang === 'en'){
            sentiment(data.text, function (error, result){
              twitterCount++;
              console.log(result.score);
              twitterTotalSenti += result.score;
            });
          }
        });
        stream.on('destroy', function (response) {
          console.error('stream broken down, starting again: ');
          restartStatus();
        });
        stream.on('end', function (response){
          if (stream){
            console.error("restart stream in process");
            restartStatus();
          }
        });
        stream.on('error', function (error, code){
          console.error("tweets stream error: "+ code);
          if (code === 500){
            console.error("twitter internal error, restarting");
            restartStatus();
          }
          else if (code === 504){
            console.error("twitter gateway error");
            restartStatus();
          }
          else{
            throw 'check the code error & rectify via twitter api response code';
          }
        });

      });
      return stream; 
}

// creating all the necessary functions to be used later
function picSentiment(){
  var pic = twitterTotalSenti / twitterCount;

  if (pic > 0.5){
    return '/data/images/happy_face.png';
  }
   if (pic < -0.01){
     return '/data/images/mad.jpg';
   }
  else {
    return '/data/images/police_wait.png';
  }
  
}


// from index.html
app.get('/solutions/solutions_energy_path', function (req, res) {
   var search_score;
   var file = res.sendFile('views/senergy.html', {root: __dirname});

   if (!checkStatus){
    file;
   }
   else{
    var checkResp = "<HEAD>" +
                      "<META http-equiv=\"refresh\" content=\"5; URL=http://" +
                      req.headers.host + "/solutions/solutions_energy_path" +
                      "/\">\n" +
                      "<title>Twitter Sentiment Analysis</title>\n" +
                      "</HEAD>\n" +
                      "<BODY>\n" +
                      "<div class=\"col-md-12 col-sm-3 text-center\">" +
                      "<P>\n" +
                      "Mood of the Tweets is as shown below <br>\n" +
                      "<IMG align=\"middle\" src=\"" + picSentiment() + "\"/><br>\n" +
                      "about " + checkStatus + ".<br><br>" +
                      "No of Tweets analyzed : " + twitterCount + " tweets...<br>" +
                      "</P>\n" +
                      "<A href=\"/restart\">Search another phrase</A>\n" +
                      "</div> \n"+
                      "</BODY>";
                  res.send(checkResp);
   }
});


app.get('/process_get', function (req, res){
     // Prepare output in JSON format
  response = {
       search:req.query.search,
   };
  startStatus(response.search);
  res.redirect(302, '/solutions/solutions_energy_path')
});

app.get('/restart', function (req, res){
  restartStatus();
  res.redirect(302, '/solutions/solutions_energy_path');
  res.end();
});

// Endpoint for Actual
    app.get('/actual', function(req, res){
        Cornell.downDataset('2016-05-31T23:30');
        //data = Cornell.getActualData('2016-05-30T00:30','2016-05-30T23:30');
        //console.log("received & sent data from server");
        //res.setHeader('Content-Type', 'application/json');
        //res.send(JSON.stringify(data));
        //res.status(400);
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
// port = process.env.PORT || 3000;

// http.listen(port, function(){
//  console.log("Listening on port: "+port)
// });

app.listen (3000);
console.log('server running on port 3000');