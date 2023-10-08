let button1 = document.querySelector("#btnradio1");
let button2 = document.querySelector("#btnradio2");

//Current time
function formatCurrentDate(now) {
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let today = `${day}, ${month} ${date} ${hours}:${mins}`;
  return today;
}

let now = document.querySelector(".today");
now.innerHTML = formatCurrentDate(new Date());

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function formatIndexLabel(index) {
  return index + `Day`;
}

//Current Weather
function showWeather(response) {
  if (response.data.city) {
    console.log(response.data);
    //Display Data
    document.querySelector(".city-title").innerHTML = response.data.city;
    document.querySelector("#weather-icon-today").src =
      response.data.condition.icon_url;
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.temperature.current
    );
    document.querySelector("#current-description").innerHTML =
      response.data.condition.description;
    document.querySelector("#current-feel").innerHTML = Math.round(
      response.data.temperature.feels_like
    );
    document.querySelector("#current-humidity").innerHTML =
      response.data.temperature.humidity;
    document.querySelector("#current-windspeed").innerHTML = Math.round(
      response.data.wind.speed
    );
    //Update Variable
    farenheitTemperature = response.data.temperature.current;
    farenheitFeel = response.data.temperature.feels_like;
    mphWind = response.data.wind.speed;
    //Update Button
    checkedFarenheit();
    let now = document.querySelector(".today");
    now.innerHTML = formatCurrentDate(new Date());
  } else {
    console.log("Error: Invalid city name");
  }
}

//Forecast Weather
function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#week-weather");
  let forecastHTML = "";
  //Display Data with Loop
  forecast.forEach(function (forecastDay, index) {
    forecastHTML =
      forecastHTML +
      `
          <div class="accordion-item">
            <div class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapse${formatForecastDay(
                  forecastDay.time
                )}"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapse${formatForecastDay(
                  forecastDay.time
                )}"
                id="button${formatForecastDay(forecastDay.time)}"
              >
                <div class="col-3">
                  <h5 class="titleDay">
                    ${formatForecastDay(forecastDay.time)}
                  </h5>
                </div>
                <div class="col-4">
                  <img
                    class="iconDay"
                    src="${forecastDay.condition.icon_url}"
                    alt=""
                  />
                </div>

                <div class="col-2">
                  <h6 class="tempDay">
                    <i class="fa-solid fa-arrow-up"></i>
                    <span class="high${formatIndexLabel(index)}"
                      >${Math.round(forecastDay.temperature.maximum)}</span
                    >°
                  </h6>
                </div>

                <div class="col-2">
                  <h6 class="tempDay">
                    <i class="fa-solid fa-arrow-down"></i>
                    <span class="low${formatIndexLabel(index)}"
                      >${Math.round(forecastDay.temperature.minimum)}</span
                    >°
                  </h6>
                </div>
              </button>
            </div>
            <div
              id="panelsStayOpen-collapse${formatForecastDay(forecastDay.time)}"
              class="accordion-collapse collapse"
            >
              <div class="accordion-body">
                <div class="d-flex flex-row">
                  <div
                    class="col-4"
                    id="firstColumn${formatForecastDay(forecastDay.time)}"
                  >
                    <i class="fa-solid fa-temperature-empty"></i>
                    <span class="icon-title">WEATHER</span>
                    <br />
                    <span
                      class="description${formatIndexLabel(index)}"
                      >${forecastDay.condition.description}</span
                    >
                  </div>
                  <div
                    class="col-4"
                    id="secondColumn${formatForecastDay(forecastDay.time)}"
                  >
                    <i class="fa-solid fa-droplet"></i>
                    <span class="icon-title">HUMIDITY</span>
                    <br />
                    <span
                      class="humidity${formatIndexLabel(index)}"
                      >${forecastDay.temperature.humidity}</span
                    >%
                  </div>
                  <div
                    class="col-4"
                    id="thirdColumn${formatForecastDay(forecastDay.time)}"
                  >
                    <i class="fa-solid fa-wind"></i>
                    <span class="icon-title">WIND</span>
                    <br />
                    <span
                      class="wind${formatIndexLabel(index)}"
                      >${Math.round(forecastDay.wind.speed)}</span
                    >
                    <span class="windUnit${formatIndexLabel(index)}">mph</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
  });
  forecastElement.innerHTML = forecastHTML;

  //Update Variables

  // Day 0
  fHighDayZero = response.data.daily[0].temperature.maximum;
  fLowDayZero = response.data.daily[0].temperature.minimum;
  mphWindDayZero = response.data.daily[0].wind.speed;

  // Day 1
  fHighDayOne = response.data.daily[1].temperature.maximum;
  fLowDayOne = response.data.daily[1].temperature.minimum;
  mphWindDayOne = response.data.daily[1].wind.speed;

  // Day 2
  fHighDayTwo = response.data.daily[2].temperature.maximum;
  fLowDayTwo = response.data.daily[2].temperature.minimum;
  mphWindDayTwo = response.data.daily[2].wind.speed;

  // Day 3
  fHighDayThree = response.data.daily[3].temperature.maximum;
  fLowDayThree = response.data.daily[3].temperature.minimum;
  mphWindDayThree = response.data.daily[3].wind.speed;

  // Day 4
  fHighDayFour = response.data.daily[4].temperature.maximum;
  fLowDayFour = response.data.daily[4].temperature.minimum;
  mphWindDayFour = response.data.daily[4].wind.speed;

  // Day 5
  fHighDayFive = response.data.daily[5].temperature.maximum;
  fLowDayFive = response.data.daily[5].temperature.minimum;
  mphWindDayFive = response.data.daily[5].wind.speed;

  // Day 6
  fHighDaySix = response.data.daily[6].temperature.maximum;
  fLowDaySix = response.data.daily[6].temperature.minimum;
  mphWindDaySix = response.data.daily[6].wind.speed;

  mphConversion();
}

function getCityCurrent(cityName) {
  let keySheCodes = "0ae8ed0af65d0db03aet4f1o89f6d9a8";
  let unitSheCodes = "imperial";
  let urlSheCodes = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${keySheCodes}&units=${unitSheCodes}`;
  console.log(urlSheCodes);
  axios
    .get(urlSheCodes)
    .then(showWeather)
    .catch((error) => {
      console.log("Error fetching data from the SheCodes Weather API:", error);
    });
}

function getCityForecast(cityName) {
  let keySheCodes = "0ae8ed0af65d0db03aet4f1o89f6d9a8";
  let unitSheCodes = "imperial";
  let urlSheCodes = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${keySheCodes}&units=${unitSheCodes}`;
  console.log(urlSheCodes);
  axios
    .get(urlSheCodes)
    .then(showForecast)
    .catch((error) => {
      console.log("Error fetching data from the SheCodes Weather API:", error);
    });
}

//City input
function findCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  getCityCurrent(cityName);
  getCityForecast(cityName);
}

function getLocationCurrent(position) {
  let keySheCodes = "0ae8ed0af65d0db03aet4f1o89f6d9a8";
  let unitSheCodes = "imperial";
  let urlSheCodes = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${keySheCodes}&units=${unitSheCodes}`;
  console.log(urlSheCodes);
  axios
    .get(urlSheCodes)
    .then(showWeather)
    .catch((error) => {
      console.log("Error fetching data from the SheCodes Weather API:", error);
    });
}

function getLocationForecast(position) {
  let keySheCodes = "0ae8ed0af65d0db03aet4f1o89f6d9a8";
  let unitSheCodes = "imperial";
  let urlSheCodes = `https://api.shecodes.io/weather/v1/forecast?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${keySheCodes}&units=${unitSheCodes}`;
  console.log(urlSheCodes);
  axios
    .get(urlSheCodes)
    .then(showForecast)
    .catch((error) => {
      console.log("Error fetching data from the SheCodes Weather API:", error);
    });
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocationCurrent);
  navigator.geolocation.getCurrentPosition(getLocationForecast);
}

function checkedFarenheit() {
  button1.checked = true;
  button2.checked = false;
  console.log("Farenheit selected");
}

function mphConversion() {
  let mphUnitHTML = "mph";

  //Current
  let windUnitElement = document.querySelector(".windUnit");
  windUnitElement.innerHTML = mphUnitHTML;

  //Forecast
  let windUnitFirstElement = document.querySelector(".windUnit0Day");
  windUnitFirstElement.innerHTML = mphUnitHTML;

  let windUnitSecondElement = document.querySelector(".windUnit1Day");
  windUnitSecondElement.innerHTML = mphUnitHTML;

  let windUnitThirdElement = document.querySelector(".windUnit2Day");
  windUnitThirdElement.innerHTML = mphUnitHTML;

  let windUnitFourthElement = document.querySelector(".windUnit3Day");
  windUnitFourthElement.innerHTML = mphUnitHTML;

  let windUnitFifthElement = document.querySelector(".windUnit4Day");
  windUnitFifthElement.innerHTML = mphUnitHTML;

  let windUnitSixthElement = document.querySelector(".windUnit5Day");
  windUnitSixthElement.innerHTML = mphUnitHTML;

  let windUnitSeventhElement = document.querySelector(".windUnit6Day");
  windUnitSeventhElement.innerHTML = mphUnitHTML;
}

function checkedCelsius() {
  button1.checked = false;
  button2.checked = true;
  console.log("Celsius selected");
}

function kmphConversion() {
  let kmphUnitHTML = "kmph";

  //Current
  let windUnitElement = document.querySelector(".windUnit");
  windUnitElement.innerHTML = kmphUnitHTML;

  //Forecast
  let windUnitFirstElement = document.querySelector(".windUnit0Day");
  windUnitFirstElement.innerHTML = kmphUnitHTML;

  let windUnitSecondElement = document.querySelector(".windUnit1Day");
  windUnitSecondElement.innerHTML = kmphUnitHTML;

  let windUnitThirdElement = document.querySelector(".windUnit2Day");
  windUnitThirdElement.innerHTML = kmphUnitHTML;

  let windUnitFourthElement = document.querySelector(".windUnit3Day");
  windUnitFourthElement.innerHTML = kmphUnitHTML;

  let windUnitFifthElement = document.querySelector(".windUnit4Day");
  windUnitFifthElement.innerHTML = kmphUnitHTML;

  let windUnitSixthElement = document.querySelector(".windUnit5Day");
  windUnitSixthElement.innerHTML = kmphUnitHTML;

  let windUnitSeventhElement = document.querySelector(".windUnit6Day");
  windUnitSeventhElement.innerHTML = kmphUnitHTML;
}

function convertFarenheit() {
  //Current Weather
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(farenheitTemperature);

  let feelElement = document.querySelector("#current-feel");
  feelElement.innerHTML = Math.round(farenheitFeel);

  let windElement = document.querySelector("#current-windspeed");
  windElement.innerHTML = Math.round(mphWind);

  //Forecast Weather
  // Day 0
  let highFirstElement = document.querySelector(".high0Day");
  highFirstElement.innerHTML = Math.round(fHighDayZero);

  let lowFirstElement = document.querySelector(".low0Day");
  lowFirstElement.innerHTML = Math.round(fLowDayZero);

  let windFirstElement = document.querySelector(".wind0Day");
  windFirstElement.innerHTML = Math.round(mphWindDayZero);

  // Day 1

  let highSecondElement = document.querySelector(".high1Day");
  highSecondElement.innerHTML = Math.round(fHighDayOne);

  let lowSecondElement = document.querySelector(".low1Day");
  lowSecondElement.innerHTML = Math.round(fLowDayOne);

  let windSecondElement = document.querySelector(".wind1Day");
  windSecondElement.innerHTML = Math.round(mphWindDayOne);

  // Day 2
  let highThirdElement = document.querySelector(".high2Day");
  highThirdElement.innerHTML = Math.round(fHighDayTwo);

  let lowThirdElement = document.querySelector(".low2Day");
  lowThirdElement.innerHTML = Math.round(fLowDayTwo);

  let windThirdElement = document.querySelector(".wind2Day");
  windThirdElement.innerHTML = Math.round(mphWindDayTwo);

  // Day 3
  let highFourthElement = document.querySelector(".high3Day");
  highFourthElement.innerHTML = Math.round(fHighDayThree);

  let lowFourthElement = document.querySelector(".low3Day");
  lowFourthElement.innerHTML = Math.round(fLowDayThree);

  let windFourthElement = document.querySelector(".wind3Day");
  windFourthElement.innerHTML = Math.round(mphWindDayThree);

  // Day 4
  let highFifthElement = document.querySelector(".high4Day");
  highFifthElement.innerHTML = Math.round(fHighDayFour);

  let lowFifthElement = document.querySelector(".low4Day");
  lowFifthElement.innerHTML = Math.round(fLowDayFour);

  let windFifthElement = document.querySelector(".wind4Day");
  windFifthElement.innerHTML = Math.round(mphWindDayFour);

  // Day 5

  let highSixthElement = document.querySelector(".high5Day");
  highSixthElement.innerHTML = Math.round(fHighDayFive);

  let lowSixthElement = document.querySelector(".low5Day");
  lowSixthElement.innerHTML = Math.round(fLowDayFive);

  let windSixthElement = document.querySelector(".wind5Day");
  windSixthElement.innerHTML = Math.round(mphWindDayFive);

  // Day 6

  let highSeventhElement = document.querySelector(".high6Day");
  highSeventhElement.innerHTML = Math.round(fHighDaySix);

  let lowSeventhElement = document.querySelector(".low6Day");
  lowSeventhElement.innerHTML = Math.round(fLowDaySix);

  let windSeventhElement = document.querySelector(".wind6Day");
  windSeventhElement.innerHTML = Math.round(mphWindDaySix);

  //Update Button
  checkedFarenheit();
  mphConversion();
}

function convertCelsius() {
  //Current Weather
  let tempElement = document.querySelector("#current-temp");
  let celsiusTemperature = (farenheitTemperature - 32) * (5 / 9);
  tempElement.innerHTML = Math.round(celsiusTemperature);

  let feelElement = document.querySelector("#current-feel");
  let celsiusFeel = (farenheitFeel - 32) * (5 / 9);
  feelElement.innerHTML = Math.round(celsiusFeel);

  let windElement = document.querySelector("#current-windspeed");
  let kmphWind = mphWind * 1.609344;
  windElement.innerHTML = Math.round(kmphWind);

  //Forecast Weather
  // Day 0
  let highFirstElement = document.querySelector(".high0Day");
  let cHighDayZero = (fHighDayZero - 32) * (5 / 9);
  highFirstElement.innerHTML = Math.round(cHighDayZero);

  let lowFirstElement = document.querySelector(".low0Day");
  let cLowDayZero = (fLowDayZero - 32) * (5 / 9);
  lowFirstElement.innerHTML = Math.round(cLowDayZero);

  let windFirstElement = document.querySelector(".wind0Day");
  let kmphWindDayZero = mphWindDayZero * 1.609344;
  windFirstElement.innerHTML = Math.round(kmphWindDayZero);

  // Day 1

  let highSecondElement = document.querySelector(".high1Day");
  let cHighDayOne = (fHighDayOne - 32) * (5 / 9);
  highSecondElement.innerHTML = Math.round(cHighDayOne);

  let lowSecondElement = document.querySelector(".low1Day");
  let cLowDayOne = (fLowDayOne - 32) * (5 / 9);
  lowSecondElement.innerHTML = Math.round(cLowDayOne);

  let windSecondElement = document.querySelector(".wind1Day");
  let kmphWindDayOne = mphWindDayOne * 1.609344;
  windSecondElement.innerHTML = Math.round(kmphWindDayOne);

  // Day 2
  let highThirdElement = document.querySelector(".high2Day");
  let cHighDayTwo = (fHighDayTwo - 32) * (5 / 9);
  highThirdElement.innerHTML = Math.round(cHighDayTwo);

  let lowThirdElement = document.querySelector(".low2Day");
  let cLowDayTwo = (fLowDayTwo - 32) * (5 / 9);
  lowThirdElement.innerHTML = Math.round(cLowDayTwo);

  let windThirdElement = document.querySelector(".wind2Day");
  let kmphWindDayTwo = mphWindDayTwo * 1.609344;
  windThirdElement.innerHTML = Math.round(kmphWindDayTwo);

  // Day 3
  let highFourthElement = document.querySelector(".high3Day");
  let cHighDayThree = (fHighDayThree - 32) * (5 / 9);
  highFourthElement.innerHTML = Math.round(cHighDayThree);

  let lowFourthElement = document.querySelector(".low3Day");
  let cLowDayThree = (fLowDayThree - 32) * (5 / 9);
  lowFourthElement.innerHTML = Math.round(cLowDayThree);

  let windFourthElement = document.querySelector(".wind3Day");
  let kmphWindDayThree = mphWindDayThree * 1.609344;
  windFourthElement.innerHTML = Math.round(kmphWindDayThree);

  // Day 4
  let highFifthElement = document.querySelector(".high4Day");
  let cHighDayFour = (fHighDayFour - 32) * (5 / 9);
  highFifthElement.innerHTML = Math.round(cHighDayFour);

  let lowFifthElement = document.querySelector(".low4Day");
  let cLowDayFour = (fLowDayFour - 32) * (5 / 9);
  lowFifthElement.innerHTML = Math.round(cLowDayFour);

  let windFifthElement = document.querySelector(".wind4Day");
  let kmphWindDayFour = mphWindDayFour * 1.609344;
  windFifthElement.innerHTML = Math.round(kmphWindDayFour);

  // Day 5

  let highSixthElement = document.querySelector(".high5Day");
  let cHighDayFive = (fHighDayFive - 32) * (5 / 9);
  highSixthElement.innerHTML = Math.round(cHighDayFive);

  let lowSixthElement = document.querySelector(".low5Day");
  let cLowDayFive = (fLowDayFive - 32) * (5 / 9);
  lowSixthElement.innerHTML = Math.round(cLowDayFive);

  let windSixthElement = document.querySelector(".wind5Day");
  let kmphWindDayFive = mphWindDayFive * 1.609344;
  windSixthElement.innerHTML = Math.round(kmphWindDayFive);

  // Day 6

  let highSeventhElement = document.querySelector(".high6Day");
  let cHighDaySix = (fHighDaySix - 32) * (5 / 9);
  highSeventhElement.innerHTML = Math.round(cHighDaySix);

  let lowSeventhElement = document.querySelector(".low6Day");
  let cLowDaySix = (fLowDaySix - 32) * (5 / 9);
  lowSeventhElement.innerHTML = Math.round(cLowDaySix);

  let windSeventhElement = document.querySelector(".wind6Day");
  let kmphWindDaySix = mphWindDaySix * 1.609344;
  windSeventhElement.innerHTML = Math.round(kmphWindDaySix);

  //Update Button
  checkedCelsius();
  kmphConversion();
}

// Current Weather
let farenheitTemperature = null;
let farenheitFeel = null;
let mphWind = null;

// Forecast Weather

// Day 0
let fHighDayZero = null;
let fLowDayZero = null;
let mphWindDayZero = null;

// Day 1
let fHighDayOne = null;
let fLowDayOne = null;
let mphWindDayOne = null;

// Day 2
let fHighDayTwo = null;
let fLowDayTwo = null;
let mphWindDayTwo = null;

// Day 3
let fHighDayThree = null;
let fLowDayThree = null;
let mphWindDayThree = null;

// Day 4
let fHighDayFour = null;
let fLowDayFour = null;
let mphWindDayFour = null;

// Day 5
let fHighDayFive = null;
let fLowDayFive = null;
let mphWindDayFive = null;

// Day 6
let fHighDaySix = null;
let fLowDaySix = null;
let mphWindDaySix = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", findCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", findLocation);

let farenheitButton = document.querySelector("#btnradio1");
farenheitButton.addEventListener("click", convertFarenheit);

let celsiusButton = document.querySelector("#btnradio2");
celsiusButton.addEventListener("click", convertCelsius);

//City default
getCityCurrent("Chicago");
getCityForecast("Chicago");
