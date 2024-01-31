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

        var current = forecast;
        futureWeatherEL.html('');
        $('<h2>').text('5 Day Forecast').appendTo(futureWeatherEL);

        function noonCall(current) {
            return current.dt_txt.includes('12')

        }
        var futureForecast = current.filter(noonCall);
        console.log(futureForecast);
        for (let i = 0; i < futureForecast.length; i++) {
            displayCard(futureForecast[i]);

        }



        function displayCard(current) {


            todaysTemp = current.main.temp - 273.15;
            console.log("todays temp: ", todaysTemp);
            roundedTemp = Math.floor(todaysTemp);
            todaysWind = current.wind['speed'];
            console.log("todays wind: ", todaysWind);
            todaysHumidity = current.main.humidity;
            console.log("todays humidity: ", todaysHumidity);



            var iconURL = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;




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
        }
        ///can't get these to show up (iconURl undefined)
    }

    searchButton.on('click', searchCity);

    function searchHistory(event) {
        city = $(event.currentTarget).text();
        getGeo(city);
        currentWeatherEL.html('');
        //not working
    }

    function searchCity(event) {
        event.preventDefault();
        var userInput = searchInput.val();
        city = userInput;
        console.log("User input: ", userInput);

        if (userInput) {
            getGeo(city)
                .then(function (data) {
                    //.then returning undefined
                    //added to stop empty input creating buttons
                    currentWeatherEL.html('');
                    searchInput.value = '';
                    var listItem = $('<button>').text(userInput);
                    listItem.css('width', '100%');
                    listItem.on('click', searchHistory);
                    historyEl.append(listItem);
                    $('#search-button').after(listItem);
                })
                .catch(function (error) {
                    console.log('Error: ' + error.message);
                });
        } else {
            console.log('Please enter a city name.');

        }
    };

})



//searchinput not clearing
//buttons not sitting under line
//buttons not linking to relevant weather data
//5 day cards not showing up
