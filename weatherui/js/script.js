/*
User Story: I can see the wheather in my current location
*/

//check if the browser supports geo
$(document).ready(function(){
  if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(function(position) {
      showWeather(position.coords.latitude, position.coords.longitude);
    });
    //console.log('geo is available');
  } else{
    $('.error').html('<p>Geo is not available in your browser</p>');
    //console.log('geo is not available');
  }
});

  $('#show-weather span').html('<div class="uil-ripple-css" style="transform:scale(0.26); top:-42px; left:15px;"><div></div><div></div></div>');

function showWeather(latitude, longitude){
  var urlWeather = "https://api.openweathermap.org/data/2.5/weather?";
  var lat = "lat=" + latitude;
  var lon = "&lon=" + longitude;
  var APIKEY = "&APPID=" + "f4b463ce4558c625c7004c6d7fa86b1a";
  var unitsCelcius = "&units=metric";
  var fetchUrl = urlWeather + lat + lon + unitsCelcius + APIKEY;
  $.ajax({
   url: fetchUrl,
   success:function(data){
     var temperature = data.main.temp;
     var weatherIcons = data.weather[0].main;
     
        $('#show-weather span').text(Math.round(temperature));     
        $('#location').text(data.name);
     $('#myonoffswitch').on('click', function(){
         if( $('#myonoffswitch').is(':checked') ){
              temperature = temperature * 9/5 + 32;
              $('#show-weather span').text(Math.round(temperature));
              console.log(temperature);
          }else{
              temperature = data.main.temp;
              $('#show-weather span').text(temperature);
          }
     });
     
     switch(weatherIcons){
       case "Clouds":
         $('.weather-icons').html(
          '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>'
         );
         break;
       case "Thunderstorm":
         $('.weather-icons').html('<div class="icon thunder-storm"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>');
         break;
       case "Rain":
         $('.weather-icons').html('<div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div>');
         break;
       case "Snow":
         $('.weather-icons').html('<div class="icon flurries"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>');
       case "Clear":
        $('.weather-icons').html('<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>');
     };
   }
  });

}
