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

    weatherSearch();
});


function weatherSearch() {
    var city = $("#cityInput").val();
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=cac3367a562f36aaf2f8245426d6c3bd";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then (function(response) {
        console.log(response)

        let name = response.name;
        let icon = response.weather[0].icon;
        let iconLink = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        let temp = response.main.temp;
        let windSpeed = response.wind.speed;
        let humidity = response.main.humidity;
    

        let currentWeatherDiv = $("#currentWeather");

        let nameDisplay = $("<p>").text(name);
        let iconDisplay = $("<img>").attr("src", iconLink);


        currentWeatherDiv.append(nameDisplay);
        currentWeatherDiv.append(iconDisplay);


    })
};

