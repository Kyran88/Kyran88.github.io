const oF = "&#8457;"; // Degrees Fahrenheit Symbol
const oC = "&#8451;"; // Degrees Celcius Symbol
const Deg = "&#176;"; // Degree Symbol

//NOTE: we retrieve and store US and SI data instead of converting it as weather summary reports from DarkSky use 
//      various units of measure depending on geographic location. Upon first load; the page automatically retrieves
//      the most relevant data.
var weatherDataUS = {}; //store US formatted weather report
var weatherDataSI = {}; //store SI formatted weather report

var unitOfMeasureState = ""; //holds the state of the currently displayed unit of measure - used for toggle

let skycons = new Skycons({ //instantiate weather icons
    "color": "#dde2e3"
});


$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            getLocationName(position);
            getWeather("auto", position); //automatically retrieve and display the most relevant units of measure
            skycons.play();
        }, showGetLocationError, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    } else {
        $("#my-location").html("Geolocation is not supported by this browser.");
    }

    $("#unitOfMeasure").on("click", () => toggleUnitsOfMeasure());
});

function getLocationName(position) {
    let myKey = "c0ee8661c7a9204ab048e26cf9f41ebd";
    //JSON parameters can be passed as an object !! who knew ...
    //https://stackoverflow.com/questions/9570562/how-to-pass-parameters-to-a-jquery-getjson-callback-method
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json", {
            key: myKey,
            latlng: position.coords.latitude + ", " + position.coords.longitude
        },
        function (mapLocationData) {
            var locationName = mapLocationData.results[0].address_components[2].short_name;
            $("#my-location").html(locationName);
        });
}

function getWeather(measureUnits, position) {

    //using https://cors-anywhere.herokuapp.com/ CORS proxy to make API call
    let key = "7e4d1e9f2e4c76a2a6619507408a7fbb";
    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + key + "/" + position.coords.latitude + "," + position.coords.longitude, {
            exclude: "alerts, minutely, hourly",
            units: measureUnits
        },
        function (jsonWeatherData) {
            //show weather report based on geographic location using appropriate units of measure
            showForecast(jsonWeatherData);
            showTemps(jsonWeatherData);
        }
    );

    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + key + "/" + position.coords.latitude + "," + position.coords.longitude, {
        exclude: "alerts, minutely, hourly",
        units: "uk"
    }, (jsonWeatherData) => weatherDataUK = jsonWeatherData); //prefetch US formatted weather report

    $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + key + "/" + position.coords.latitude + "," + position.coords.longitude, {
        exclude: "alerts, minutely, hourly",
        units: "si"
    }, (jsonWeatherData) => weatherDataSI = jsonWeatherData); //prefetch SI formatted weather report
}


function showForecast(weatherData) {
    skycons.add("current-icon", weatherData.currently.icon);

    $("#weather-summary").html(
        "<p> <span class='weather-summary-headings'>Now:</span>&nbsp;&nbsp;" + weatherData.currently.summary + ".<br>" +
        "<span  class='weather-summary-headings'>Later:</span>&nbsp;&nbsp;" + weatherData.daily.data[0].summary + "</p> " +
        "<span  class='weather-summary-headings'>Forecast:</span>&nbsp;&nbsp;" + weatherData.daily.summary
    );

    // var weatherDateRetrievedTimeStamp = new Date(weatherData.daily.data[0].time * 1000);
    // console.log("Data retrieved:" + weatherDateRetrievedTimeStamp);

    // Multiply by 1000 because source time stamp is Unix
    // JS works in milliseconds instead of the UNIX seconds
    var laterToday = new Date(weatherData.daily.data[0].time * 1000);
    $("#later-today-day").html("Later");
    skycons.add("later-today-icon", weatherData.daily.data[0].icon);

    var forecastDay1Tomorrow = new Date(weatherData.daily.data[1].time * 1000);
    $("#forecast-day1-tomorrow-day").html("Tomorrow");
    skycons.add("forecast-day1-tomorrow-icon", weatherData.daily.data[1].icon);

    var forecastDay2 = new Date(weatherData.daily.data[2].time * 1000);
    $("#forecast-day2-day").html(forecastDay2.toString().slice(0, 3));
    skycons.add("forecast-day2-icon", weatherData.daily.data[2].icon);

    var forecastDay3 = new Date(weatherData.daily.data[3].time * 1000);
    $("#forecast-day3-day").html(forecastDay3.toString().slice(0, 3));
    skycons.add("forecast-day3-icon", weatherData.daily.data[3].icon);
    
    
    var forecastDay4 = new Date(weatherData.daily.data[4].time * 1000);
    $("#forecast-day4-day").html(forecastDay3.toString().slice(0, 3));
    skycons.add("forecast-day4-icon", weatherData.daily.data[4].icon);
}


function showTemps(weatherData) {
    unitOfMeasureState = weatherData.flags.units; //retrieve and set state of unit of measure

    //display matching temperature symbol
    switch (unitOfMeasureState) {
        case "us":
            $("#celcius").removeClass("selected");
            $("#farenheit").addClass("selected");
            break;

        default:
            $("#farenheit").removeClass("selected");
            $("#celcius").addClass("selected");
    }

    $("#current-temp").html(Math.round(weatherData.currently.temperature));
    $("#later-today-max").html(Math.round(weatherData.daily.data[0].temperatureMax) + Deg);
    $("#later-today-min").html(Math.round(weatherData.daily.data[0].temperatureMin) + Deg);
    $("#forecast-day1-tomorrow-max").html(Math.round(weatherData.daily.data[1].temperatureMax) + Deg);
    $("#forecast-day1-tomorrow-min").html(Math.round(weatherData.daily.data[1].temperatureMin) + Deg);
    $("#forecast-day2-max").html(Math.round(weatherData.daily.data[2].temperatureMax) + Deg);
    $("#forecast-day2-min").html(Math.round(weatherData.daily.data[2].temperatureMin) + Deg);
    $("#forecast-day3-max").html(Math.round(weatherData.daily.data[3].temperatureMax) + Deg);
    $("#forecast-day3-min").html(Math.round(weatherData.daily.data[3].temperatureMin) + Deg);
    $("#forecast-day3-max").html(Math.round(weatherData.daily.data[4].temperatureMax) + Deg);
    $("#forecast-day3-min").html(Math.round(weatherData.daily.data[4].temperatureMin) + Deg);
}

function toggleUnitsOfMeasure() {
    if (unitOfMeasureState != "us") { //if not US, must be SI.. covert to US
        showForecast(weatherDataUS);
        showTemps(weatherDataUS);
    } else { //else must be US, conver to SI
        showForecast(weatherDataSI);
        showTemps(weatherDataSI);
    }
}


function showGetLocationError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            $("#my-location").html("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            $("#my-location").html("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            $("#my-location").html("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            $("#my-location").html("An unknown error occurred.");
            break;
    }
}
