

//page loads automatically on London
$(document).ready(function () {
    var currentWeatherEL = $('#today');
    var futureWeatherEL = $('#forecast');
    var searchInput = $('#search-input');
    var searchButton = $('#search-button');

    var currentDate = dayjs();
    var formattedDate = currentDate.format('D/MM/YYYY');
    console.log(currentDate);
    var nextFiveDates = [];

    var API_KEY = 'b6607d95fdf680a89ffd501aedb4f29a';
    // var city = "London";//needs changing to match search box



    let lat;
    let lon;
    let cityName;
    let todaysTemp;
    let roundedTemp;
    let todaysWind;
    let todaysHumidity;

    function getGeo(city) {
        var geoLocateURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
        fetch(geoLocateURL)
            .then(function (response) {
                return response.json();
            })
            //     .catch(error => {
            //         // Handle any errors that occurred during the request
            //         console.error(error);
            // })
            .then(function (data) {
                console.log("Current Weather", data[0]);
                // lat = data[0].lat;
                // lon = data[0].lon;
                getWeather(data[0])
            })
    }
    // console.log(lat);
    // console.log(lon);
    // weatherPrediction(lat,lon);
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
                displayForecast(data.list);
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
    function noonCall (current){
    return current.dt_txt.includes('12')
    //function to change display to searched city/location

    }
    var futureForecast = current.filter(noonCall);
    console.log(futureForecast);
    for (let i = 0; i < futureForecast.length; i++) {
        displayCard(futureForecast[i]);
        
    }
    //function to save search input as button in list-group div


    function displayCard(current) {
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

            //display current weather in today section
            // var currentTitle = $('<h3>').text(`${city} (${formattedDate})`);//add icon

            // var card = document.createElement('div');
            // card.classList.add('card');
            // futureWeatherEL.append(card);
            //var tempP = document.createElement('p');
            //tempP.classList.add('card-text');

            var currentTitle = $('<h3>').text(dayjs(current.dt_txt).format('D/MM/YYYY'));//add icon
            futureWeatherEL.append(currentTitle)
            var iconImg = $('<img>').attr('src', iconURL);
            currentTitle.append(iconImg);
            var currentTemp = $('<p>').text(`Temperature: ${roundedTemp} °C`);
            futureWeatherEL.append(currentTemp);
            var currentWind = $('<p>').text(`Wind Speed: ${todaysWind} KPH`);
            futureWeatherEL.append(currentWind);
            var currentHumidity = $('<p>').text(`Humidity: ${todaysHumidity} %`);
            futureWeatherEL.append(currentHumidity);
        }
    }

    //created 5 seperate html divs with jquery for each date


    //function to display 5 day forecast in forecast section

    //1. Sort out 5 day weather forecast input (maybe with an array)
    //2. Set up a basic page load template (London as default)
    //3. Set up a search function that adds a button to the sidebar and changes the main content on page
    //4.get icons to load



    searchButton.on('click', searchCity);
    function searchCity(event) {
        event.preventDefault();
        var userInput = searchInput.val();
        city = userInput;
        console.log("User input: ", userInput);
        getGeo(city);
        currentWeatherEL.html('');
    } 
})