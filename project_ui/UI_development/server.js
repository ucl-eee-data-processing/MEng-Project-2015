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
var flow;
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());


   // api call
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

// personal authentication from twitter app under SmartDatabytes
var twiter = new twitter ({
				consumer_key: '3URAtTpYP7b12hzgZjeKinipb',
				consumer_secret: 'JElnyOeGV6ejoEgYmicNMla3HPGBU3R3TuVs1TApgltMPhwGTy',
				access_token_key: '2463721208-9pboPePnKwoRpqeEAVDyLLhTPTdRKCpOlP9vdoA',
				access_token_secret: 'gdehPf30Uw5KDPgcCOpCm8XgSQzXKlhpk2g3hubRk8Od5'
			});

//checking if authentication works https://www.npmjs.com/package/ntwitter
app.get('/solutions/solutions_energy_path/twitterCheck', function (req, res){
	twiter.verifyCredentials(function (error, data){
		console.log(data);
		res.send('I received correct credentials from Twitter and my name is ' + data.name);
	});
});

// setting variables for later use
var twitterCount = 0;
var twitterTotalSenti = 0;
var checkStatus;

// creating all the necessary functions to be used later
function picSentiment(){
	var pic = twitterTotalSenti / twitterCount;
	if (pic > 0.1){
		return '/data/images/happyCat.jpg';
	}
	else if (pic < -0.1){
		return '/data/images/angryBird.png';
	}
	else {
		return '/data/images/noMoodPug.png';
	}
}

app.get('/sentiment', function (req, res){
	res.json({
		monitoring : (checkStatus != null),
		monitoringPhrase : checkStatus,
		tweetCount : twitterCount,
		tweetTotalSentiment : twitterTotalSenti,
		sentimentImageURL : picSentiment()
	});
});

app.post('/sentiment', function (req, res){
	if (req.body.placeholder){
		startStatus(req.body.placeholder);
		res.send(200);
	}else{
		res.status(400).send('bad request, try another phrase');
	}
});



//restart the process
function restartStatus(){
	if (stream){
		var y = stream;
		stream =  null;
		y.destroySilent();
	}
	checkStatus = "";
}

function startStatus (placeholder){
	if (checkStatus){
		restartStatus();
	}
	checkStatus = placeholder;
	twitterCount = 0;
	twitterTotalSenti = 0;
	twiter.verifyCredentials(function (error, data){
		if (error){
			restartStatus();
			console.error('persisting error at: ' + error);
			if (error.statusCode === 401){
				console.error("Check Twitter's APIs to fix this error from config");
			}
		}
		else{
			twiter.stream ('statuses/filter', {
				'track': placeholder
			}, function (inStream) {
				stream = inStream;
				stream.on('data', function (data){
					if (data.lang === 'es'){
						sentiment(data.text, function (err, result){
							twitterCount++;
							twitterTotalSenti += result.score;
						});
					}
					else if (data.lang === 'en'){
						sentiment(data.text, function (err, result){
							twitterCount++;
							twitterTotalSenti += result.score;
						});
					}
					else {
						throw 'different language used.. not analyzing it';
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
	});

}




app.get('/check', function (req, res){
	startStatus(req.query.placeholder);
	res.redirect(302, '/solutions/solutions_finance_path');
});
app.get('/restart', function (req, res){
	restartStatus();
	res.redirect(302, '/solutions/solutions_finance_path');
});

// https://www.npmjs.com/package/ntwitter for docs / search for occurence of CORNELL
app.get('/auth/twitter/callback/', function (req, res){
	var flow; //get the data flow
	var TweetsCount = 0;
	var placeholder = 'Cornell'; // if no search, default to cornell

	twiter.verifyCredentials(function (error, data){
		if(error){
			res.send("there is an error with twitter connection" + error);
		}
		flow = twiter.stream('statuses/filter', {
			'track': placeholder
		}, function(stream){
			res.send('checking tweets for ' + DEFAULT_TOPIC);
			stream.on('data', function(data){
				TweetsCount++;
				if (TweetsCount % 10 === 0){
					console.log('Tweets no' + TweetsCount + '=' + data.text);
				}
			});
		});
	});
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