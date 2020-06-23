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
// putting current date on html page
$("#currentDate").text(date);

// Function when search button is clicked
searchBtn.on("click", function(event, searchCity) {
    event.preventDefault();
    // assigns new variable for name of city
    var searchCity = $("#cityInput").val();
    // Creates a new list item and stores the city name
    // stores searched city in list item in html
    var liCity = $("<li>").addClass("collection-item").text(searchCity);
    // adds the list item to search history
    $("#searchHistoryList").append(liCity);
    // runs current weather & forecast functions
    currentWeatherSearch();
    forecastWeatherSearch();
    // places "city" in local storage
    window.localStorage.setItem("searchCity", JSON.stringify(searchCity));
    // console.log(localStorage);
    // console.log(searchCity);
});

// function to make API call for current weather conditions
function currentWeatherSearch() {
    // sets variables for city & api url
    var city = $("#cityInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cac3367a562f36aaf2f8245426d6c3bd";
    // makes api call
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
        let lat = response.coord.lat;
        let lon = response.coord.lon;
    
        // Assigns variable for html elment to store current weather in
        let currentWeatherConditionsLiTemp = $("#currentWeatherConditionsTemp");
        let currentWeatherConditionsLiWind = $("#currentWeatherConditionsWind");
        let currentWeatherConditionsLiHumidity = $("#currentWeatherConditionsHumidity");
        let currentCityDiv = $("#currentCityName");
        let currentWeatherIconDiv = $("#currentWeatherIcon");

        // Assigns variables and stores API response values in html elements
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

        // runs function to get UV index by using lattitude and longitude from API response
        getUV(lat, lon);
    })
};

// getting UV index from API
function getUV(lat, lon) {
    // sets variable for api variable
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=cac3367a562f36aaf2f8245426d6c3bd" + "&lat=" + lat + "&lon=" + lon
    $.ajax({
        // api call
        url: queryURL,
        type: "GET"
        // function with api response to get uv index
    }).then (function(response) {
        // sets variable for response of uv index value
        let uv = response.value;
        // stores uv index into html element
        let uvDisplay = $("<li>").text("UV Index: " + uv);
        // gets html element to display uv index
        let currentUV = $("#currentUV");
        // adds uv index to hmtl page
        currentUV.html(uvDisplay);
        // function to change background color of uv index based on danger level
        if (uv < 3) {

            $("#currentUV").css("background-color", "green");
        } else if (uv > 7 && uv < 3) {  
            $("#currentUV").css("background-color", "yellow")
        } else {
            $("#currentUV").css("background-color", "red")
        }
    })
};

// function to search for weather forecast
function forecastWeatherSearch() {
    // variable to store city typed in by user
    var city = $("#cityInput").val();
    // variable to store url for API call
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=cac3367a562f36aaf2f8245426d6c3bd";
    // api call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then (function(response) {
        // Sets varaible for forecast data div
        let forecastDiv = $("#forecast")
        // array to store forecast dates
        var forecastDateArray = [];

        
        // adds only one response per day to the array
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.split(' ')[1] === "00:00:00") {
                forecastDateArray.push(response.list[i])
            }
        }
        for (var i = 0; i < forecastDateArray.length; i++) {
            // variables to store api responses
            let forecastDateTime = forecastDateArray[i].dt_txt;
            let forecastDate = forecastDateTime.split(' ')[0];
            let forecastTemp = forecastDateArray[i].main.temp;
            let forecastTempF = ((forecastTemp - 273.15) * 9/5 + 32).toFixed(2);
            let forecastHumidity = forecastDateArray[i].main.humidity;
            let forecastIcon = forecastDateArray[i].weather[0].icon;
            let forecastIconUrl = "https://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
            // stores forecast variables in html format
            let forecastDateDisplay = $("<p>").text(forecastDate);
            let forecastTempDisplay = $("<p>").text("Temperature: " + forecastTempF);
            let forecastHumidityDisplay = $("<p>").text("Humidity: " + forecastHumidity + " %");
            let forecastIconDisplay = $("<img>").attr("src", forecastIconUrl);
            // adds forecast variables to the page
            let forecastCol = $("<div>")
            forecastCol.addClass("col")
            forecastCol.append(forecastDateDisplay);
            forecastCol.append(forecastTempDisplay);
            forecastCol.append(forecastHumidityDisplay);
            forecastCol.append(forecastIconDisplay);

            // forecastDiv.empty();
            forecastDiv.append(forecastCol);
         }
    })
};

// function to allow user to search by clicking on a city in search history
$(document).on("click", '.collection-item',function(event, forecastDiv) {
    event.preventDefault();

    // let i = ($(".collection-item"));
    // console.log(i);

    let searchHistoryCity = $(".collection-item")[0].textContent;

    // console.log(searchHistoryCity);

    currentWeatherSearch(searchHistoryCity);
    forecastWeatherSearch(searchHistoryCity);
});

function storageSearch() {
    var storedCity = localStorage.getItem("searchCity");
    
    currentWeatherSearch(storedCity);
    forecastWeatherSearch(storedCity);
};

// console.log(localStorage);
document.onload(storageSearch());