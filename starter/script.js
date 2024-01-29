var currentWeatherEL = $('#today');
var futureWeatherEL = $('#forecast');

var API_KEY = 'b6607d95fdf680a89ffd501aedb4f29a';
var city = "Edinburgh";//needs changing to match search box
var geoLocateURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;

// var iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

let lat;
let lon;
let cityName;
let temp;
let roundedTemp;
let wind;
let humidity;

$(document).ready(getWeather);
function getWeather() {
    
fetch(geoLocateURL)
.then(function (response) {
return response.json();
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
})
    .then(function (data) {
        console.log("Current Weather",data);
lat = data[0].lat;
lon = data[0].lon;

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
    
    temp = data.list[0].main.temp - 273.15;
    console.log("todays temp: ",temp);
    roundedTemp = Math.floor(temp);
    wind = data.list[0].wind['speed'];
    console.log("todays wind: ",wind);
    humidity = data.list[0].main.humidity;    
    console.log("todays humidity: ",humidity);

    displayCurrent(temp,wind,humidity);
    })
    })

};

function weatherPrediction (lat,lon){
console.log("Latitude and Longitude" , lat,lon);
}

//function to save search input as button in list-group div



//function to display current weather in today section
function displayCurrent (temp,wind,humidity){
    console.log("Current Weather",temp,wind,humidity);
   var currentTitle = $('<h2>').text(`${city}`);
   currentWeatherEL.append(currentTitle)
   var currentTemp = $('<p>').text(`Temperature: ${roundedTemp} °C`);
   currentWeatherEL.append(currentTemp);
   var currentWind = $('<p>').text(`Wind Speed: ${wind} KPH`);
   currentWeatherEL.append(currentWind);
   var currentHumidity = $('<p>').text(`Humidity: ${humidity} %`);
   currentWeatherEL.append(currentHumidity);
        

    

}

//function to display 5 day forecast in forecast section
//created 5 seperate html divs with jquery
//add data to each div