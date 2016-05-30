var fs = require('fs');
var readline = require('readline')
var webdriver = require('selenium-webdriver'); 
var pwuid = require('pwuid');
var browser = new webdriver.Builder()
                .usingServer()
                .withCapabilities({'browserName': 'chrome' })
                .build();
var HOME_DIR = pwuid()['dir']

function downDataset(endTime){
    var res = endTime.split("T");
    var endUnixTime = new Date(Date.parse(res[0]))
    var date = res[0].split("-");
    //First Date of Month is a Bug
    var startDay = parseInt(date[2]) - 1;
    var startDate = date[0] + "-" + date[1] + "-" + "0" + startDay.toString();
    var startUnixTime = new Date(Date.parse(startDate))
    var endTime = endUnixTime.getTime()/1000;
    var startTime = startUnixTime.getTime()/1000;
    var url = "http://portal.emcs.cornell.edu/Campus/TotalEnergyDemand?cmd=download&s=1d&b=" + startTime.toString() + "&e=" + endTime.toString();
    var xpath = "/html/body[@class='onecolumn']/div[@id='wrap']/div[@id='content']/div[@id='main']/div[@class='properties']/form/table/tbody/tr[6]/td[2]/input[2]"
    // Delete Existing file
    if (fs.existsSync(HOME_DIR + '/Downloads/ReportData.txt')) {
        fs.unlinkSync(HOME_DIR + '/Downloads/ReportData.txt'); 
    }
    browser.get(url);
    browser.findElement(webdriver.By.xpath(xpath)).click();
};

function intToString(integer){
    if (integer.toString().length < 2){
        return "0" + integer.toString();
    }else{
        return integer.toString();
    }
};

function timeStampExists(timeStamp,timeStamps){
    for (var i = 0; i < timeStamps.length; i++) {
        if (timeStamps[i] === timeStamp) {
            return true;
        }
    }
    return false;
};

function generateTimeStamps(startTime, endTime){
    var timeStamps = [];
    var start = startTime.split("T")[1];
    var end = endTime.split("T")[1];
    var startHourMin = start.split(":");
    var endHourMin = end.split(":");
    var startHour = parseInt(startHourMin[0]);
    var startMin = parseInt(startHourMin[1]);
    var endHour = parseInt(endHourMin[0]);
    var endMin = parseInt(endHourMin[1]);

    if (startMin == 30 ){
        firstTimeStamp = intToString(startHour) + ":" + "30";
        startHour = startHour + 1;
        timeStamps.push(firstTimeStamp);
    }

    for (var i = startHour; i < endHour + 1 ; i ++){
        if (i == endHour){
            continue;

        }
        var firstTimeStamp = intToString(i) + ":" + "00";
        var secondTimeStamp = intToString(i) + ":" + "30";
        timeStamps.push(firstTimeStamp);
        timeStamps.push(secondTimeStamp);
    }

    if (endMin == 30 ){
        firstTimeStamp = intToString(endHour) + ":" + "00";
        secondTimeStamp = intToString(endHour) + ":" + "30";
        timeStamps.push(firstTimeStamp);
        timeStamps.push(secondTimeStamp);
    }else{
        firstTimeStamp = intToString(endHour) + ":" + "00";
        timeStamps.push(firstTimeStamp);
    }

   return timeStamps;
};

function getActualData(startTime, endTime){
    var timeStamps = generateTimeStamps(startTime, endTime);
    var timePrefix = startTime.split("T")[0]
    var actualData = {};
    var array = fs.readFileSync(HOME_DIR + '/Downloads/ReportData.txt').toString().split("\n");
    for(i in array) {
        var tmp = array[i].split("\t");
        var tmpTime = tmp[0].split(" ")[1];
        var energy = tmp[1]
        var time;
        if( tmpTime != undefined){
            hourMinSec = tmpTime.split(":");
            time = hourMinSec[0] + ":" + hourMinSec[1]
        }
        if(timeStampExists(time, timeStamps)){
            actualData[timePrefix +"T"+ time] = energy;
        } 

    }
    return actualData;
};
//downDataset('2016-04-03T23:30');
//browser.quit();
//data = getActualData('2016-04-03T00:30','2016-04-03T23:30');
//console.log(data);
module.exports.downDataset = downDataset;
module.exports.getActualData = getActualData;
