(function($) {

  // Following script makes use of following services:
  // http://ipinfo.io/ (geo data)
  // http://openweathermap.org/ (weather data)

  $(document).ready(function() {

    var $city             = $('.js-city'),
        $country          = $('.js-country'),
        $temperature      = $('.js-temp'),
        $temperatureUnit  = $('.js-temp-unit'),
        $weather          = $('.js-weather'),
        $weatherIcon      = $('.js-weather-icon');

    // Get geo data
    $.getJSON('https://ipinfo.io', function() {
    }).done(function(geoJSON) {

      var city              = geoJSON.city,
          country           = geoJSON.country,
          openWeatherAPPID  = '57d6d3575458519af4e1386b34a7ac48', // :(
          openWeatherURL    = '//api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=' + openWeatherAPPID;

      // Fill in city and country
      $city.text(city);
      $country.text(country);

      // Get weather data
      $.getJSON(openWeatherURL, function() {
      }).done(function(weatherJSON) {

        var kelvin    = weatherJSON.main.temp,
            farenheit = kelvinToFarenheit(kelvin),
            celcius   = kelvinToCelcius(kelvin),
            weather   = weatherJSON.weather[0].main,
            icon      = weatherJSON.weather[0].icon;

        // Fill in temperature and weather info
        $temperature.text(celcius); // Default to celcius
        $weather.text(weather);
        $weatherIcon.html(function() {
          return '<img src="http://openweathermap.org/img/w/' + icon + '.png" alt="Weather Icon">';
        });

        // Fahrenheit / Celcius Toggle
        $temperatureUnit.on('click', function(e) {
          e.preventDefault();
          var $this = $(this);
          if ($this.text() === 'F') {
            // Convert to Celcius
            $this.text('C');
            $temperature.text(celcius);
          } else {
            // Convert to Farenheit
            $this.text('F');
            $temperature.text(farenheit);
          }
        });

      });
    });

  });
  
  function kelvinToFarenheit(kelvin) {
    return parseInt((kelvin - 273.15) * (9 / 5) + 32, 10);
  }
  
  function kelvinToCelcius(kelvin) {
    return parseInt(kelvin - 273.15, 10);
  }

})(jQuery);
