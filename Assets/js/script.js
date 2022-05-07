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

    }
  }
}