var currentWeatherEL = $('today');
var futureWeatherEL = $('forecast');

var API_KEY = 'b6607d95fdf680a89ffd501aedb4f29a';
var city = "London";//needs changing to match search box
var todaysForecastURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

// var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

let lat;
let lon;



fetch(todaysForecastURL)
.then(function (response) {
 return response.json();
    })
    .then(function (data) {
        console.log("Current Weather",data);
lat = data.coord.lat;
lon = data.coord.lon;
// console.log(lat);
// console.log(lon);
weatherPrediction(lat,lon);

var futureForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

fetch(futureForecastUrl)
.then(function (response) {
return response.json();
})
    .then(function (data) {
        console.log("Future Forecast",data);
    
    })
    })





function weatherPrediction (lat,lon){
  console.log("Latitude and Longitude" , lat,lon);
}

//   



