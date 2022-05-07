// need to have current weather status, five day forecast (connect to moment??) color icons for UV index, icons to show up, dynamically created button elements
// buttons saved from local storage so user can search/click previous selections again if needed, color match cards and boxes to match example, gradient for top bar?
// api calls- get help if needed

$(document).ready(function () {
  var cityName = "";
  // latitude and longitude retrieved in API 1 to be used in second API call
  var lat = "";
  var lon = "";
  // call to get the current weather and the daily weather
  function findWeatherApiOne(a, b) {
    var searchUrl2 =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      a +
      "&lon=" +
      b +
      "&exclude=minutely,hourly&appid=64202e177c289863c7fc1a91faaa2e6b&units=imperial";
    // second API call for rest of the current weather data + 5 day forecast
    $.ajax({
      url: searchUrl2,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // clears the 5- day forecast before displaying next set of city data
      $(".card-deck").empty();
      var icon = response.current.weather[0].icon;
      var iconImg = $("<img>");
      // append weather icon to the page
      iconImg.addClass("img-fluid");
      iconImg.attr(
        "src",
        "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      );
      $("#city").append(iconImg);

      // use if statement to update UV index background color based on UV number- green, yellow, orange, red, violet
      var uvindex = parseInt(response.current.uvi);
      if (uvindex <= 2) {
        $(".color").css({ "background-color": "green", color: "white" });
      } else if (uvindex >= 3 && uvindex <= 5) {
        $(".color").css({ "background-color": "yellow", color: "black" });
      } else if (uvindex >= 6 && uvindex <= 7) {
        $(".color").css({ "background-color": "orange" });
      } else if (uvindex >= 8 && uvindex <= 10) {
        $(".color").css({ "background-color": "red", color: "white" });
      } else if (uvindex >= 11) {
        $(".color").css({ "background-color": "violet", color: "white" });
      }

      // fills the matching Ids in html with current weather data
      $("#temp").text("Temperature: " + response.current.temp + " °F");
      $("#humidity").text("Humidity: " + response.current.humidity + "%");
      $("#wind").text("Wind Speed: " + response.current.wind_speed + " MPH");
      $(".color").text(response.current.uvi);
      // display html content to the user
      $("#current").css({ display: "block" });
      var dailyWeather = response.daily;
      // daily response array
      // use for loop to loop through the daily response array and
      for (i = 1; i < dailyWeather.length - 2; i++) {
        // save responses in a variable each time
        var dailyDate = moment
          .unix(dailyWeather[i].dt)
          .format("dddd MM/DD/YYYY");
        var dailyTemp = dailyWeather[i].temp.day;
        var dailyHum = dailyWeather[i].humidity;
        var dailyIcon = dailyWeather[i].weather[0].icon;
        // create dynamic elements dailyDivBox ptemp phum icon hdate
        var dailyDivBox = $("<div class='card text-white bg-dark p-2'>");
        var pTemp = $("<p>");
        var pHum = $("<p>");
        var imgIcon = $("<img>");
        var hDate = $("<h6>");
        // adds text + attributes to dynamically created elements
        hDate.text(dailyDate);
        imgIcon.attr(
          "src",
          "https://openweathermap.org/img/wn/" + dailyIcon + "@2x.png"
        );
        imgIcon.addClass("img-fluid");
        imgIcon.css({ width: "100%" });
        pTemp.text("Temp: " + dailyTemp + "° F");
        pHum.text("Humidity: " + dailyHum + "%");
        // elements created dynamically added/appended to html
        dailyDivBox.append(hDate);
        dailyDivBox.append(imgIcon);
        dailyDivBox.append(pTemp);
        dailyDivBox.append(pHum);
        $(".card-deck").append(dailyDivBox);
        // displays html content to the user
        $("#fiveDay").css({ display: "block" });
      }
    });
  }
  // getweather function will use user input to specify api call to that city
  function getWeather() {
    var searchUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&lang=en&appid=64202e177c289863c7fc1a91faaa2e6b";
    // call to get lat and lon
    $.ajax({
      url: searchUrl,
      method: "GET",
    }).then(function (response) {
      // stores the lat and lon coordinates from API response
      lat = response.coord.lat;
      lon = response.coord.lon;
      // adds city name, date for current weather
      $("#city").text(response.name);
      $("#date").text(moment.unix(response.dt).format("dddd, MM/DD/YYYY"));
      // save city names to local storage
      localStorage.setItem("cityname", response.name);
      // pass coordinates to the next function
      findWeatherApiOne(lat, lon);
    });
  }

  // savecity function will display data from last searched city
  function saveCity() {
    cityName = localStorage.getItem("cityname");
    if (cityName !== null) {
      var citiesList = $("<button>");
      citiesList.addClass("list-group-item list-group-item-action");

      citiesList.text(cityName);
      $("ul").prepend(citiesList);
      getWeather();
    }
  }

  function searchButton() {
    cityName = $("input").val().trim();
    // more buttons will be created dynamically each time a city is searched
    var cityList = $("<button>");
    cityList.addClass(
      "list-group-item list-group-item-action text-center text-capitalize bg-secondary text-white mt-2 mb-2"
    );
    cityList.text(cityName);
    // add buttons to sidebar list
    $("ul").prepend(cityList);
    // clear input list after user search query saved
    $("input").val("");
    getWeather();
  }
  saveCity();

  // submit event occurs when user enters city name into city search area
  $("#city-form").submit(function (event) {
    event.preventDefault();
    searchButton();
  });
  $("#form-submit").click(function (event) {
    event.preventDefault();
    searchButton();
  });
  // Event listener activates on click- reloads saved city name
  $("ul").on("click", "button", function () {
    cityName = $(this).text();
    console.log(cityName);
    getWeather();
  });


   // error handling protocol for when user fails to add city name or misspells city name
   $(document).ajaxError(function () {
    // create a dynamic p element
    var error = $("<p>");
    error.addClass("error");
    error.css({ color: "red"});
    error.text("Please enter a valid city name");
    // error message prepended to appear below text field
    $("ul").prepend(error);
    // identify and find created button linked to incorrect user input for deletion
    var p = $(this).find("button");
    // remove the button connected to incorrect input
    p[1].remove();
    // set timer of error message to 3 seconds
    setTimeout(function () {
      error.remove();
    }, 3000);
  });
});
