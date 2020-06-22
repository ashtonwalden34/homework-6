// cac3367a562f36aaf2f8245426d6c3bd
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={api key}

// creates variable for search button
let searchBtn = $("#searchBtn");

// stores city names being stored in search history in a variable
let searchHistoryCityList = $("#searchHistoryList")

// adding current date
let currentDate = new Date();
let day = String(currentDate.getDate()).padStart(2, '0');
let month = String(currentDate.getMonth() + 1).padStart(2, '0'); //January is 0!
let year = currentDate.getFullYear();

let date = month + '-' + day + '-' + year;
$("#currentDate").text(date);

// Function when search button is clicked
searchBtn.on("click", function(event) {
    event.preventDefault();
    // assigns new variable for name of city
    let searchCity = $("#cityInput").val();
    // Creates a new list item and stores the city name
    // stores searched city in list item in html
    var liCity = $("<li>").addClass("collection-item").text(searchCity);
    
    // adds the list item to search history
    $("#searchHistoryList").append(liCity);
    currentWeatherSearch();
    forecastWeatherSearch();
});

// function to make API call for current weather conditions
function currentWeatherSearch() {
    var city = $("#cityInput").val();
   
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
        // converts temp to farenheit
        let tempF = ((temp - 273.15) * 9/5 + 32).toFixed(2)
        let windSpeed = response.wind.speed;
        let humidity = response.main.humidity;
    
        // Assigns variable for html elment to store current weather in
        let currentWeatherConditionsLiTemp = $("#currentWeatherConditionsTemp");
        let currentWeatherConditionsLiWind = $("#currentWeatherConditionsWind");
        let currentWeatherConditionsLiHumidity = $("#currentWeatherConditionsHumidity");
        let currentCityDiv = $("#currentCityName");
        let currentWeatherIconDiv = $("#currentWeatherIcon");

        // Assignes variables and stores API response values in html elements
        let nameDisplay = $("<h5>").text(name);
        let iconDisplay = $("<img>").attr("src", iconLink);
        let tempDisplay = $("<li>").text("Temperature: " + tempF);
        let windSpeedDisplay = $("<li>").text("Wind speed: " + windSpeed + " mph");
        let humidityDisplay = $("<li>").text("Humidity: " + humidity + " %");

        // Displays API response variables that are stored as html elements
        currentCityDiv.html(nameDisplay);
        currentWeatherIconDiv.html(iconDisplay);
        currentWeatherConditionsLiTemp.html(tempDisplay);
        currentWeatherConditionsLiWind.html(windSpeedDisplay);
        currentWeatherConditionsLiHumidity.html(humidityDisplay);
    })
};


// function to search for weather forecast
function forecastWeatherSearch() {
    // variable to store city typed in by user
    var city = $("#cityInput").val();
    // url for API call
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=cac3367a562f36aaf2f8245426d6c3bd";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then (function(response) {
        // console.log(response.list)

        // Sets varaible for forecast data div
        let forecastDiv = $("#weatherForecast")

        /*
        let forecastDay1 = $("#forecastDay1");
        let forecastDay2 = $("#forecastDay2");
        let forecastDay3 = $("#forecastDay3");
        let forecastDay4 = $("#forecastDay4");
        let forecastDay5 = $("#forecastDay5");
        */
        

        var forecastDateArray = [];

        for (var i = 0; i < response.list.length; i++) {
           // console.log(response.list[i].dt_txt.split(' '))
            if (response.list[i].dt_txt.split(' ')[1] === "00:00:00") {
                forecastDateArray.push(response.list[i])
            }
        }

        for (var i = 0; i < forecastDateArray.length; i++) {
            
            let forecastDateTime = forecastDateArray[i].dt_txt;
            let forecastDate = forecastDateTime.split(' ')[0];
            let forecastTemp = forecastDateArray[i].main.temp;
            let forecastTempF = ((forecastTemp - 273.15) * 9/5 + 32).toFixed(2);
            let forecastHumidity = forecastDateArray[i].main.humidity;
            let forecastIcon = forecastDateArray[i].weather[0].icon;
            let forecastIconUrl = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";

            let forecastDateDisplay = $("<p>").text(forecastDate);
            let forecastTempDisplay = $("<p>").text("Temperature: " + forecastTempF);
            let forecastHumidityDisplay = $("<p>").text("Humidity: " + forecastHumidity + " %");
            let forecastIconDisplay = $("<img>").attr("src", forecastIconUrl);

            forecastDiv.append(forecastDateDisplay);
            forecastDiv.append(forecastTempDisplay);
            forecastDiv.append(forecastHumidityDisplay);
            forecastDiv.append(forecastIconDisplay);
         }
    })
};

// function to allow user to search by clicking on a city in search history
$(document).on("click", '.collection-item',function(event) {
    event.preventDefault();

    let searchHistoryCity = $(".collection-item").text().trim();

    console.log(searchHistoryCity);

    currentWeatherSearch(searchHistoryCity);
    forecastWeatherSearch(searchHistoryCity);
});

// api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}