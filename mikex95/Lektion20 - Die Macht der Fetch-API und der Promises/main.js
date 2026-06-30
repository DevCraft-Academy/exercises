"use strict";
const input = document.querySelector("#ort");
const form = document.getElementById("weather-form");
const result = document.getElementById("result");
const API_KEY = "xxx";

//const COORDINATE_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=5&appid=${API_KEY}`;
//const FORECAST_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = input.value.trim();
  result.textContent = "Loading...";

  try {
    const coords = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );
    const coordsData = await coords.json();
    const { lon, lat } = coordsData[0];

    const forecast = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const forcastData = await forecast.json();
    const formattedData = JSON.stringify(forcastData, null, 2);

    // simply show the reponse data of the city
    result.textContent = formattedData;
  } catch (err) {
    result.textContent = err.message;
  }
});
