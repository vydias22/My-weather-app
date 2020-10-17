function formatDate(date) {
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let year = date.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let ampm = hours >= 12 ? "pm" : "am";
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  return `${day}  ${month} ${currentDate},${year}  ${hours}:${minutes} ${ampm}`;
}
let now = new Date();
let wholeDate = document.querySelector("#date-day-time");
wholeDate.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#name-of-city").innerHTML = response.data.name;
  document.querySelector("#showCityTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDiscription").innerHTML =
    response.data.weather[0].main;
}
function currentSearch(city) {
  let apiKey = "a1caf389b339797606525e379e24f195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCity(event) {
  event.preventDefault();
  let = city = document.querySelector("#search-text-input").value;
  currentSearch(city);
}

let enterInCity = document.querySelector("#search-city");
enterInCity.addEventListener("submit", searchCity);

function convertToCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  //temperatureElement.innerHTML = 19;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector(".temperature");
  let temperature = temperatureElement.innerHTML;
  //temperatureElement.innerHTML = 66;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `${temperature}`;
}

function searchLocation(position) {
  let apiKey = "a1caf389b339797606525e379e24f195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

currentSearch("Boston");
