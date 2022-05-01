var currentDate = moment();
var searchInput = document.querySelector("#name-input");
var searchName = searchInput.textContent;

var container = document.querySelector("#container");
var cityList = document.querySelector("#city-list");
var li1 = document.createElement("li");
li1.classList = "btn list-group-item mt-1 mb-1 bg-secondary text-black";
var li2 = document.createElement("li");
li2.classList = "btn list-group-item mt-1 mb-1 bg-secondary text-black";
var li3 = document.createElement("li");
li3.classList = "btn list-group-item mt-1 mb-1 bg-secondary text-black";
var li4 = document.createElement("li");
li4.classList = "btn list-group-item mt-1 mb-1 bg-secondary text-black";
var li5 = document.createElement("li");
li5.classList = "btn list-group-item mt-1 mb-1 bg-secondary text-black";

var btn1 = document.createElement("button");
btn1.classList.add("rounded");
var btn2 = document.createElement("button");
btn2.classList.add("rounded");
var btn3 = document.createElement("button");
btn3.classList.add("rounded");
var btn4 = document.createElement("button");
btn4.classList.add("rounded");
var btn5 = document.createElement("button");
btn5.classList.add("rounded");

var buttonsArray = [btn1, btn2, btn3, btn4, btn5];

li1.appendChild(btn1);
li2.appendChild(btn2);
li3.appendChild(btn3);
li4.appendChild(btn4);
li5.appendChild(btn5);

var saveLocationArray = [];
var arraySize = 5;

$(document).ready(function () {
  $("#submit").click(function (e) {
    $.ajax({
      type: "GET",
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        $("#name-input").val() +
        "&appid=64202e177c289863c7fc1a91faaa2e6b&units=imperial",
      dataType: "json",
      success: function (result, status, xhr) {
        // var table = document.createElement("table");
        // header = document.createElement("tr");
        // title = document.createElement("td");
        // title.innerHTML = "Weather Description";
        // header.append(title);
        // table.append(header);

        // table.append("City: " + result["name"]);
        // table.append("Country: " + result["sys"]["country"]);
        // table.append(
        //   "Current Temperature: " + result["main"]["temp"] + "°C"
        // );
        // table.append("Humidity: " + result["main"]["humidity"]);
        // table.append(
        //   "Weather: " + result["weather"][0]["description"]);

        // $("#message").html(table);
        // $("#city-search-header").html(result["name"] + currentDate);
        // -----------------------------------------------
        for (i = 0; i < arraySize; i++) {
          saveLocationArray.push(searchInput.value);
          console.log(searchInput.value);

          var persistData = JSON.parse(
            localStorage.getItem(saveLocationArray[i])
          );
          console.log(persistData + " get item spot");

          if (searchInput.value !== buttonsArray[i].textContent) {
            btn1.textContent = saveLocationArray[0];
            btn2.textContent = saveLocationArray[1];
            btn3.textContent = saveLocationArray[2];
            btn4.textContent = saveLocationArray[3];
            btn5.textContent = saveLocationArray[4];
            // need to append the list structure before adding in list elements
          }
        }
        container.appendChild(cityList);
        cityList.append(li1, li2, li3, li4, li5);

        var table = $("<table><tr><th>Weather Description</th></tr>");

        table.append(
          "<tr><td>Current Temperature:</td><td>" +
            result["main"]["temp"] +
            " °F</td></tr>"
        );
        table.append(
          "<tr><td>Wind:</td><td>" + result["wind"]["speed"] + " MPH</td></tr>"
        );
        table.append;
        "tr><td>Humidity:</td><td>" + result["main"]["humidity"] + "</td></tr>";
        table.append(
          "<tr><td>UV Index:<tr><td>" + result["main"]["uvi"] + "</tr></td>"
        );

        $("#message").html(table);
        $("#city-search-header").html(
          result["name"] + " " + moment().format("l")
        );
      },
      error: function (xhr, status, error) {
        alert(
          "Result: " +
            status +
            " " +
            error +
            " " +
            xhr.status +
            " " +
            xhr.statusText
        );
      },
    });
  });

  $(document).ajaxStart(function () {
    $("img").show();
  });

  $(document).ajaxStop(function () {
    $("img").hide();
  });
  // get data for card forecast from other api
  // copy paste creation of table data for each card
  // figure out how to set future date for each card header

  // save search to local storage and place in div --> grab all local storage, loop uses local storage as length(< 10) or get to the local storage.length
});
