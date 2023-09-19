//Current time

function formatDate(now) {
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
  let today = `${day} ${month} ${date} ${hours}:${mins}`;
  return today;
}

let now = document.querySelector(".today");
now.innerHTML = formatDate(new Date());

//Current weather
function showWeather(response) {
  //OpenWeather Data
  //console.log(response.data);
  //document.querySelector(".city-title").innerHTML = response.data.name;
  //document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);
  //document.querySelector("#current-humidity").innerHTML = Math.round(response.data.main.humidity);
  //document.querySelector("#current-windspeed").innerHTML = Math.round(response.data.wind.speed);
  //document.querySelector("#current-description").innerHTML = response.data.weather[0].main;

  //SheCodes Weather Data

  if (response.data.city) {
    console.log(response.data);
    document.querySelector(".city-title").innerHTML = response.data.city;
    document.querySelector("#current-temp").innerHTML = Math.round(
      response.data.temperature.current
    );
    document.querySelector("#current-humidity").innerHTML = Math.round(
      response.data.temperature.humidity
    );
    document.querySelector("#current-windspeed").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#current-description").innerHTML =
      response.data.condition.description;
    document.querySelector("#weather-icon-today").src =
      response.data.condition.icon_url;
  } else {
    console.log("Error: Invalid city name");
  }
}

//Search trigger
function search(cityName) {
  //OpenWeather API
  //let keyOpenWeather = "0f8bc384a7c31b717a18cfe38a95ae06";
  //let unitOpenWeather = "imperial";
  //let urlOpenWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyOpenWeather}&units=${unitOpenWeather}`;
  //console.log(urlOpenWeather);
  //axios.get(urlOpenWeather).then(showWeather);

  //SheCodes Weather API
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

//City input
function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  search(cityName);
}

function searchLocation(position) {
  //OpenWeather API
  //let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  //let unitName = "imperial";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unitName}`;
  //console.log(apiUrl);
  //axios.get(apiUrl).then(showWeather);

  //SheCodes Weather API
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

function getCurrentLocation(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

//City default
search("Chicago");
