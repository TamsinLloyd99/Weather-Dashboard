var searchInput = $('#search-input');
var searchButton = $('#search-button');
var historyEl = $('#history');

//page loads automatically on London
$(document).ready(function () {
    var currentWeatherEL = $('#today');
    var futureWeatherEL = $('#forecast');


    var currentDate = dayjs();
    var formattedDate = currentDate.format('D/MM/YYYY');
    console.log(currentDate);

    var API_KEY = 'b6607d95fdf680a89ffd501aedb4f29a';
    // var city = "London";//needs changing to match search box



    let lat;
    let lon;
    let cityName;
    let todaysTemp;
    let roundedTemp;
    let todaysWind;
    let todaysHumidity;
    let iconURL;

    function getGeo(city) {
        var geoLocateURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
        fetch(geoLocateURL)
            .then(function (response) {
                return response.json();
            })
        
            .then(function (data) {
                console.log("Current Weather", data[0]);
                
                getWeather(data[0])
            })
    }

    function getWeather(location) {
        console.log(location);
        //     lat = location.lat;
        //     lon = location.lon;
        var { lat, lon } = location;
        var city = location.name;
        var futureForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        fetch(futureForecastUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log("Future Forecast", data);
                displayCurrent(data.list[0], city);
                console.log("Display current: ", data.list[0]);
                displayForecast(data.list);
                console.log("Display forecast: ", data.list);
            })
    }

    function displayCurrent(current, city) {
        todaysTemp = current.main.temp - 273.15;
        console.log("todays temp: ", todaysTemp);
        roundedTemp = Math.floor(todaysTemp);
        todaysWind = current.wind['speed'];
        console.log("todays wind: ", todaysWind);
        todaysHumidity = current.main.humidity;
        console.log("todays humidity: ", todaysHumidity);



        var iconURL = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

        //display current weather in today section

        currentWeatherEL.css('border', '1px solid black');
        currentWeatherEL.css('padding', '5px');
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


    }

    function displayForecast(forecast) {
        // console.log("Latitude and Longitude" , lat,lon);
        var current = forecast;
        futureWeatherEL.html('');
        $('<h2>').text('5 Day Forecast').appendTo(futureWeatherEL);
        // displayCard(current)
        // }
        function noonCall(current) {
            return current.dt_txt.includes('12')
            //function to change display to searched city/location

        }
        var futureForecast = current.filter(noonCall);
        console.log(futureForecast);
        for (let i = 0; i < futureForecast.length; i++) {
            displayCard(futureForecast[i]);

        }
        //function to save search input as button in list-group div


        function displayCard(current, index) {
            // for (let i = 0; i < 5; i++) {
            //     var nextDay = currentDate.add(i, 'day');
            // nextFiveDates.push(nextDay);

            // var formattedDates = nextFiveDates.map(date => date.format('D/MM/YYYY'));

            // formattedDates.forEach(date => {
            //     var dateEl = $('<button>').text(date);
            //     futureWeatherEL.append(dateEl);
            // })

            todaysTemp = current.main.temp - 273.15;
            console.log("todays temp: ", todaysTemp);
            roundedTemp = Math.floor(todaysTemp);
            todaysWind = current.wind['speed'];
            console.log("todays wind: ", todaysWind);
            todaysHumidity = current.main.humidity;
            console.log("todays humidity: ", todaysHumidity);



            var iconURL = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

        }


        var futureCards = document.createElement('div');
        futureCards.classList.add('card', 'mb-3', 'mx-2', 'future-card');
        futureCards.innerHTML = `
            <div class="card text-center">
            <div class="card-body">
            <h5 class="card-title">${dayjs(current.dt_txt).format('D/MM/YYYY')}</h5>
            <img src="${iconURL}" class="card-img-top" alt="Daily weather icon">
            <p class="card-text"> Temperature: ${roundedTemp} °C</p>
            <p>Wind Speed: ${todaysWind} KPH</p>
            <p>Humidity: ${todaysHumidity} %</p>
            </div>
            </div>`;
        futureWeatherEL.append(futureCards);
///can't get these to show up (iconURl undefined)
    }

    searchButton.on('click', searchCity);

function searchHistory(event) {
    city = event.target.textContent;
    getGeo(city);
    currentWeatherEL.html('');
}

function searchCity(event) {
    event.preventDefault();
    var userInput = searchInput.val().trim();
    city = userInput;
    console.log("User input: ", userInput);
    getGeo(city);
    currentWeatherEL.html('');
    var searchHistory = $('<button>').text(userInput);
    historyEl.append(searchHistory);
    searchHistory.on('click', searchHistory);
    $('#search-button').after(searchHistory);
    //append the button under the search button
    //link the buttons to relevant weather data

};

})




