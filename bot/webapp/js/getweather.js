$(document).ready(function() {

  var long;
  var lat;
  var celsius;
  var fahrenheit;
  var tempSwap = true;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      var api = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(' + lat + '%2C' + long + ')%22)%20and%20u%3D\'c\'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
     console.log(api);

      $.getJSON(api, function(data) {
        //alert(data.query.lang);
        var city = data.query.results.channel.location.city;
        celsius = data.query.results.channel.item.condition.temp;
        fahrenheit = Math.round(celsius * 1.8 + 32);
        var weatherType = data.query.results.channel.item.condition.text.toLowerCase();
        var weatherCode = data.query.results.channel.item.condition.code;

        $('#js-city').html(city);
        $('#js-celsius').html(celsius + " °C");
        $('#js-fahrenheit').html(fahrenheit);
        $('#js-weather-type').html(weatherType);
        $('#js-weather-icon').html('<i class="wi wi-yahoo-' + weatherCode + '"></i>');
        $("#js-temp-change").html("fahrenheit");
        $('#js-temp-swap-button').click(function() {
          if (tempSwap === false) {
            $("#js-celsius").html(celsius + " °C");
            $("#js-temp-change").html("fahrenheit");
            tempSwap = true;
          } else {
            $("#js-celsius").html(fahrenheit + " °F");
            $("#js-temp-change").html("celsius");
            tempSwap = false;
          }
          
        });

      });
    });
  }
});
  
  function kelvinToFarenheit(kelvin) {
    return parseInt((kelvin - 273.15) * (9 / 5) + 32, 10);
  }
  
  function kelvinToCelcius(kelvin) {
    return parseInt(kelvin - 273.15, 10);
  }

})(jQuery);
