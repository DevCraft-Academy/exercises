import { API_KEY } from "./env.js"
// did not want to submit my API key to the public repo

const locationForm = document.getElementById("locationForm");
const locationInput = document.getElementById("location");

const weatherData = document.getElementById("weatherData");
const errorMessage = document.getElementById("errorMessage");

const getWeather = (event) => {
    event.preventDefault();

    const location = locationInput.value;

    // Fetch weather data from the API
    fetchData(location)
        .then((data) => {
            handleData(data);
        })
        .catch((error) => {
            console.error(error);
            weatherData.textContent = '';
            errorMessage.textContent = 'An error occurred while fetching the weather data.';
        })
}

function fetchData(location) {
    return fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
        .then((response) => response.json());
}

function handleData(data) {
    if (data.error)
        throw new Error(data.error.message);

    errorMessage.textContent = '';

    const viewModel = parseDataToViewModel(data);
    displayWeather(viewModel);
}

function parseDataToViewModel(data) {
    return {
        location: data.location.name + ', ' + data.location.country,
        temperature: data.current.temp_c + '°C',
        feelsLike: data.current.feelslike_c + '°C',
        humidity: data.current.humidity + '%',
        condition: data.current.condition.text
    }
}

function displayWeather(viewModel) {
    weatherData.innerHTML = `
        <h3>${viewModel.location}</h3>
        <p>Temperature: ${viewModel.temperature}</p>
        <p>Feels Like: ${viewModel.feelsLike}</p>
        <p>Humidity: ${viewModel.humidity}</p>
        <p>Condition: ${viewModel.condition}</p>
    `;
}

locationForm.addEventListener("submit", getWeather);