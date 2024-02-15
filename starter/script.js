
//page loads automatically on London
$(document).ready(function () {
    var currentWeatherEL = $('#today');
    var searchInput = $('#search-input');
    var searchButton = $('#search-button');
    var historyEl = $('#history');
    var futureWeatherEL = $('#forecast-container');
    var cityHistory = [];

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
        return fetch(geoLocateURL)
            .then(function (response) {
                return response.json();
            })

            .then(function (data) {
                console.log("Current Weather", data[0]);
                setHistory(city);
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
        currentWeatherEL.html('');
        currentWeatherEL.css('border', '1px solid black');
        currentWeatherEL.css('padding', '5px');
        var currentTitle = $('<h3>').text(`${city} (${formattedDate})`);//add icon
        currentWeatherEL.append(currentTitle)
        var iconImg = $('<img>').attr('src', iconURL);
        iconImg.css({
            'width': '50px',   // Set the width to your desired size
            'height': '50px'   // Set the height to your desired size
        });

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

        // var row = $('<div>').addClass('row');
        for (let i = 0; i < futureForecast.length; i++) {
            displayCard(futureForecast[i]);

        }



        function displayCard(data) {
            var cardContainer = $('<div>').addClass('col mb-3');
            var card = $('<div>').addClass('card');
            var cardBody = $('<div>').addClass('card-body');
            var cardTitle = $('<h5>').addClass('card-title').text(dayjs(data.dt_txt).format('D/MM/YYYY'));
            var iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            var cardImage = $('<img>').addClass('card-img-top').attr('src', iconURL).attr('alt', 'Daily weather icon');
            cardImage.css({
                'width': '50px',   // Set the width to your desired size
                'height': '50px'   // Set the height to your desired size
            });

            var cardTextTemp = $('<p>').addClass('card-text').text(`Temperature: ${Math.floor(data.main.temp - 273.15)} °C`);
            var cardTextWind = $('<p>').text(`Wind Speed: ${data.wind.speed} KPH`);
            var cardTextHumidity = $('<p>').text(`Humidity: ${data.main.humidity} %`);

            // Append elements to build the card structure
            cardBody.append(cardTitle, cardImage, cardTextTemp, cardTextWind, cardTextHumidity);
            card.append(cardBody);
            cardContainer.append(card);
            futureWeatherEL.append(cardContainer);
        }


    }

    searchButton.on('click', searchCity);





    function searchCity(event) {
        if (!searchInput.val()) {
            return;
        }
        event.preventDefault();
        var city = searchInput.val();
        // city = userInput;
        // console.log("User input: ", userInput);
        getGeo(city)
        searchInput.val('');

    }


    function setHistory(city) {
        console.log("City: ", city);
        cityHistory.push(city);
        localStorage.setItem('history', JSON.stringify(cityHistory));
        displayCityHistory()
    }

    function displayCityHistory() {
        historyEl.html('');
        for (let i = 0; i < cityHistory.length; i++) {
            var listItem = $('<button>');
            listItem.text(cityHistory[i]);
            listItem.attr('data-city', cityHistory[i]);
            listItem.attr('type', 'button');
            listItem.addClass('history-item');
            listItem.css({
                'width': searchInput.width(), // Set width to the search bar's width
                'margin-bottom': '10px', // Add a bottom margin for separation
                'background-color': '#dddddd', // Grey background color
                'border': '0px solid #999999', // Border color
                'border-radius': '5px', // Rounded corners
                'padding': '5px', // Padding for content
                'cursor': 'pointer' // Change cursor on hover
            });

            historyEl.append(listItem);

        }
    }

    function deployBtnStorage() {
        var history = localStorage.getItem('search-history');
        if (history) {
            cityHistory = JSON.parse(history);
            displayCityHistory();
        }
    }

    // if (userInput) {
    //         .then(function (data) {
    //     // .then block
    //     currentWeatherEL.html('');
    //     searchInput.val('');

    //     var listItem = $('<button>').text(userInput);
    //     listItem.attr('data-city', userInput);
    //     listItem.attr('type', 'button');


    //         listItem.css({
    //             'width': searchInput.width(), // Set width to the search bar's width
    //             'margin-bottom': '10px', // Add a bottom margin for separation
    //             'background-color': '#dddddd', // Grey background color
    //             'border': '0px solid #999999', // Border color
    //             'border-radius': '5px', // Rounded corners
    //             'padding': '5px', // Padding for content
    //             'cursor': 'pointer' // Change cursor on hover
    //         });

    //         listItem.addClass('history-item');
    //         historyEl.append(listItem);
    //         // historyEl.append('<hr>');
    //     })
    //             .catch(function (error) {
    //                 console.log('Error: ' + error.message);
    //             });
    //     } else {
    //         console.log('Please enter a city name.');
    //     }
    // };

    // })
    function btnValidator(event) {
        if (!$(event.target).hasClass('history-item')) {
            return;
        }
        // event.preventDefault();
        var city = $(event.currentTarget).text();
        getGeo(city)

    }

    historyEl.on('click', btnValidator);
    deployBtnStorage()


})



