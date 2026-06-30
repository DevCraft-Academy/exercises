"use strict";

const city = document.getElementById("city");
const search = document.getElementById("search-btn");
const form = document.getElementById("form");
const apiKey = "sag ich dir nicht ;)";
const url = "https://api.weatherapi.com/v1";

function handleSubmit(event) {
  event.preventDefault();
  let cityName = city.value;
  console.log(cityName);
  getWeather(cityName);
}

form.addEventListener("submit", handleSubmit);
hideWeatherContainer();
hideAlert();

function getWeather(cityName) {
  fetch(`${url}/current.json?key=${apiKey}&q=${cityName}&lang=de`)
    .then((response) => {
      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayWeather(data);
    })
    .catch((error) => {
      // Handle fetch or other errors
      console.error("Error fetching weather data:", error);
      hideWeatherContainer();
      showAlert(error.message);
    });
}

function displayWeather(data) {
  const resultForCity = document.getElementById("intro");
  const icon = document.getElementById("icon");
  const weatherContainer = document.getElementById("weather-container");
  const description = document.getElementById("description");

  resultForCity.textContent = `Hier das Wetter in ${data.location.name}, ${data.location.localtime} Uhr`;
  icon.src = data.current.condition.icon;
  description.textContent = `${data.current.condition.text} bei ${data.current.temp_c}°C`;
  weatherContainer.style.display = "block";
  console.log("city", data.location.name);
}

function hideWeatherContainer() {
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.style.display = "none";
}

function hideAlert() {
  const sectionAlert = document.getElementById("section-alert");
  sectionAlert.style.display = "none";
}

function showAlert(message) {
  const sectionAlert = document.getElementById("section-alert");
  const alertText = document.getElementById("alert-text");
  sectionAlert.style.display = "block";
  alertText.textContent = `${message}`;
}
