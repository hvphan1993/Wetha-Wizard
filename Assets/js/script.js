function findWeatherApiOne(a, b) {
  var queryURL2 =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    a +
    "&lon=" +
    b +
    "&exclude=minutely,hourly&appid=aec299195260a001b09706b5bfe740f7&units=imperial";
  // second API call for rest of the current weather data + 5 day forecast
  $.ajax({
    url: queryURL2,
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