function getForecastDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function formatDate(date) {
  let currentDate = date.getDate();
  let time = formatAMPM(date);
  let year = date.getFullYear();

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
  let day = getForecastDay(date);
  let month = months[date.getMonth()];
  return `${day} ${month} ${currentDate},${year} ${time}`;
}
let now = new Date();
let wholeDate = document.querySelector("#date-day-time");
wholeDate.innerHTML = formatDate(now);

let currentCelsius;

function displayWeatherCondition(response) {
  document.querySelector("#name-of-city").innerHTML = response.data.name;

  currentCelsius = Math.round(response.data.main.temp);
  document.querySelector("#showCityTemperature").innerHTML = currentCelsius;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDiscription").innerHTML =
    response.data.weather[0].main;

  let mainImageWeather = document.querySelector("#first-weather-image");
  setIcon(mainImageWeather, response.data.weather[0]);
}

function currentSearch(city) {
  let apiKey = "a1caf389b339797606525e379e24f195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayWeatherCondition)
    .then(function () {
      getForecast(city);
    });
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  currentSearch(city);
}

let enterInCity = document.querySelector("#search-city");
enterInCity.addEventListener("submit", searchCity);

function convertToCelsius(event) {
  event.preventDefault();
  document.querySelector("#showCityTemperature").innerHTML = currentCelsius;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#showCityTemperature").innerHTML = toFahrenheit(
    currentCelsius
  );
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function searchLocation(position) {
  let apiKey = "a1caf389b339797606525e379e24f195";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    displayWeatherCondition(response);
    getForecast(response.data.name);
  });
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

currentSearch("Boston");

function showNewYorkTemperature() {
  currentSearch("New York");
}

let newYorkTemperatureElement = document.querySelector("#new-York-city-btn");
newYorkTemperatureElement.addEventListener("click", showNewYorkTemperature);

function showAustinTemperature() {
  currentSearch("Austin");
}

let austinTemperatureElement = document.querySelector("#austin-city-btn");
austinTemperatureElement.addEventListener("click", showAustinTemperature);

function showLosAngelesTemperature() {
  currentSearch("Los Angeles");
}

let losAngelesTemperatureElement = document.querySelector(
  "#los-angeles-city-btn"
);
losAngelesTemperatureElement.addEventListener(
  "click",
  showLosAngelesTemperature
);

function getForecast(city) {
  let apiKey = "a1caf389b339797606525e379e24f195";
  let units = "metric";
  let apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiForecastUrl).then(showForecast);
}

function setIcon(element, weatherItem) {
  element.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherItem.icon}@2x.png`
  );
  element.setAttribute("alt", weatherItem.description);
}

function showForecast(response) {
  let days = response.data.list;

  displayForecast("day2", days[0]);
  displayForecast("day3", days[1]);
  displayForecast("day4", days[2]);
  displayForecast("day5", days[3]);
  displayForecast("day6", days[4]);
  displayForecast("day7", days[5]);
}

function displayForecast(id, data) {
  let forecastDate = new Date(data.dt * 1000);
  let day = getForecastDay(forecastDate);
  let dayAbreviation = day.substring(0, 3);
  let time = `${dayAbreviation} ${formatAMPM(forecastDate)}`;

  let celsius = Math.round(data.main.temp);
  let fahrenheit = toFahrenheit(data.main.temp);
  let temp = `<strong>${celsius}°</strong> ${fahrenheit}°`;
  let dayHtml = document.querySelector(`#${id}`);
  dayHtml.querySelector(".days-of-the-week").innerHTML = time;
  dayHtml.querySelector(".degree").innerHTML = temp;
  let iconHtml = dayHtml.querySelector("img");
  setIcon(iconHtml, data.weather[0]);
}

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
