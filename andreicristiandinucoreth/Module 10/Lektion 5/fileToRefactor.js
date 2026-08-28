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
    fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
        .then((responde) => responde.json())
        .then((data) => {
            if (data.error)
                throw new Error(data.error.message);

            errorMessage.textContent = '';
            
            const location = data.location.name + ', ' + data.location.country;
            const temp = data.current.temp_c;
            const feelsLike = data.current.feelslike_c;
            const humidity = data.current.humidity;
            const condition = data.current.condition.text;

            weatherData.innerHTML = `
                <h3>${location}</h3>
                <p>Temperature: ${temp}°C</p>
                <p>Feels Like: ${feelsLike}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Condition: ${condition}</p>
            `;
        })
        .catch((error) => {
            console.error(error);
            weatherData.textContent = '';
            errorMessage.textContent = 'An error occurred while fetching the weather data.';
        })
}

locationForm.addEventListener("submit", getWeather);