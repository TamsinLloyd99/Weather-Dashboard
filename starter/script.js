var currentWeatherEL = $('#today');
var futureWeatherEL = $('#forecast');
var searchInput = $('#search-input');
var searchButton = $('#search-button');

var currentDate = dayjs();
var formattedDate = currentDate.format('D/MM/YYYY');
console.log(currentDate);
var nextFiveDates = [];

var API_KEY = 'b6607d95fdf680a89ffd501aedb4f29a';
var city = "London";//needs changing to match search box
var geoLocateURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;



let lat;
let lon;
let cityName;
let todaysTemp;
let roundedTemp;
let todaysWind;
let todaysHumidity;

//page loads automatically on London
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
    
    todaysTemp = data.list[0].main.temp - 273.15;
    console.log("todays temp: ",todaysTemp);
    roundedTemp = Math.floor(todaysTemp);
    todaysWind = data.list[0].wind['speed'];
    console.log("todays wind: ", todaysWind);
    todaysHumidity = data.list[0].main.humidity;    
    console.log("todays humidity: ", todaysHumidity);
    
    // displayCurrent(todaysTemp,todaysWind,todaysHumidity);
    // displayForecast();

    var iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

    //display current weather in today section
    var currentTitle = $('<h3>').text(`${city} (${formattedDate})`);//add icon
    currentWeatherEL.append(currentTitle)
    var iconImg = $('<img>').attr('src', iconURL);
    currentTitle.append(iconImg);
    var currentTemp = $('<p>').text(`Temperature: ${roundedTemp} °C`);
    currentWeatherEL.append(currentTemp);
    var currentWind = $('<p>').text(`Wind Speed: ${todaysWind} KPH`);
    currentWeatherEL.append(currentWind);
    var currentHumidity = $('<p>').text(`Humidity: ${todaysHumidity} %`);
    currentWeatherEL.append(currentHumidity);

    
    })
    })
    };

function weatherPrediction (lat,lon){
console.log("Latitude and Longitude" , lat,lon);
}

//function to change display to searched city/location


//function to save search input as button in list-group div



for (let i = 0; i < 5; i++) {
    var nextDay = currentDate.add(i, 'day');
    nextFiveDates.push(nextDay);
}

var formattedDates = nextFiveDates.map(date => date.format('D/MM/YYYY'));

formattedDates.forEach(date => {
    var dateEl = $('<button>').text(date);
    futureWeatherEL.append(dateEl);
})
//created 5 seperate html divs with jquery for each date


//function to display 5 day forecast in forecast section
function displayForecast (){
//add weatehr variables 

}

//1. Sort out 5 day weather forecast input (maybe with an array)
//2. Set up a basic page load template (London as default)
//3. Set up a search function that adds a button to the sidebar and changes the main content on page
//4.get icons to load

searchButton.on('click', function(event){
    event.preventDefault();
    var userInput = searchInput.val();
    city = userInput;
    console.log("User input: ",userInput);
})