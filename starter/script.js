var currentWeatherEL = $('today');
var futureWeatherEL = $('forecast');

var API_KEY = 'b6607d95fdf680a89ffd501aedb4f29a';
var city = $('form-input').val();
var todaysForecastURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
var futureForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
console.log(queryUrl)




fetch(todaysForecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
    })

var longitute;

var latitude;

  fetch(futureForecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })



