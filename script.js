// cac3367a562f36aaf2f8245426d6c3bd
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={api key}

/*
    var city = $("#cityInput");
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cac3367a562f36aaf2f8245426d6c3bd";
*/

let searchBtn = $("#searchBtn");

// Function when search button is clicked
searchBtn.on("click", function(event) {
    event.preventDefault();
    // assigns new variable for name of city
    let searchCity = $("#cityInput").val();
    // Creates a new list item and stores the city name
    var liCity = $("<li>").addClass("collection-item").text(searchCity);
    // adds the list item to search history
    $("#searchHistoryList").append(liCity);

    $("#currentCityName").empty();
    $("#currentWeatherConditions").empty();
    $("#currentWeatherIcon").empty();


    currentWeatherSearch();
    forecastWeatherSearch();
});

// stores city names being stored in search history in a variable
let searchHistoryCity = $("#searchHistoryList").val();

// function to allow user to search by clicking on a city in search history
searchHistoryCity.on("click", function(event) {
    event.preventDefault();
    console.log("click history");

    currentWeatherSearch();
    forecastWeatherSearch();
})


// function to make API call for current weather conditions
function currentWeatherSearch() {
    var city = $("#cityInput").val();
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cac3367a562f36aaf2f8245426d6c3bd";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then (function(response) {        
        // Assigns variables for elements returned by API response
        let name = response.name;
        let icon = response.weather[0].icon;
        let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        // temperature is in kelvins
        let temp = response.main.temp;
        let tempF = ((temp - 273.15) * 9/5 + 32).toFixed(2)
        let windSpeed = response.wind.speed;
        let humidity = response.main.humidity;
    
        // Assigns variable for html elment to store current weather in
        let currentWeatherDiv = $("#currentWeather");
        let currentWeatherConditionsUl = $("#currentWeatherConditions");
        let currentCityDiv = $("#currentCityName");
        let currentWeatherIconDiv = $("#currentWeatherIcon");

        // Assignes variables and stores API response values in html elements
        let nameDisplay = $("<h5>").text(name);
        let iconDisplay = $("<img>").attr("src", iconLink);
        let tempDisplay = $("<li>").text("Temperature: " + tempF);
        let windSpeedDisplay = $("<li>").text("Wind speed: " + windSpeed);
        let humidityDisplay = $("<li>").text("Humidity: " + humidity);

        // Displays API response variables that are stored as html elements
        currentCityDiv.append(nameDisplay);
        currentWeatherIconDiv.append(iconDisplay);
        currentWeatherConditionsUl.append(tempDisplay);
        currentWeatherConditionsUl.append(windSpeedDisplay);
        currentWeatherConditionsUl.append(humidityDisplay);
    })
};

function forecastWeatherSearch() {
    var city = $("#cityInput").val();
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=5&appid=cac3367a562f36aaf2f8245426d6c3bd";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then (function(response) {
        console.log(response)

        // Sets varaible for forecast data div
        let forecastDiv = $("#weatherForecast");
        
        // Creates variables to hold response data
        let forecastDate = response.list.dt;
        let forecastIcon = response.list.weather.icon;
        let forecastIconLink = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
        let forecastTemp = response.list.temp;
        let forecastHumidity = response.list.humidity;

        // Stores response data in html elements
        let forecastDateDisplay = $("<p>").text(forecastDate);
        let forecastIconDisplay = $("<img").attr("src", forecastIconLink);
        let forecastTempDisplay = $("<p>").text(forecastTemp);
        let forecastHumidityDisplay = $("<p>").text(forecastHumidity);

        // appends html elements to page
        forecastDiv.append(forecastDateDisplay);
        forecastDiv.append(forecastIconDisplay);
        forecastDiv.append(forecastTempDisplay);
        forecastDiv.append(forecastHumidityDisplay);
    })
};

// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}