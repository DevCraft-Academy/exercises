'use strict';

const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const countryName = document.getElementById('country-name');
const temp = document.getElementById('temperature');
const wind = document.getElementById('wind');
const cityError = document.getElementById('city-error');
const weatherResultError = document.getElementById('weather-result-error');
const weatherError = document.getElementById('weather-error-message');

const validateCityInput = () => {
    if ((!cityInput.value || cityInput.value.trim() === '') && weatherResult.classList.contains('hidden')) {
        cityError.classList.remove('hidden');
        return false;
    }
    cityError.classList.add('hidden');
    return true;
};

const setWeatherResultView = (temperature) => {
    temp.className = '';
    if (temperature <= 10) {
        temp.classList.add('cold');
    } else if (temperature < 20) {
        temp.classList.add('mild');
    } else {
        temp.classList.add('hot');
    }
};

document.getElementById('weather-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (city === '') {
        alert('Please enter a city name.');
    }
    getCityWeatherInfo(city);
});

cityInput.addEventListener('blur', () => {
    validateCityInput();
});

cityInput.addEventListener('focus', () => {
    cityError.classList.add('hidden');
    weatherResultError.classList.add('hidden');
});

const getCityWeatherInfo = (city) => {
    if (!validateCityInput()) {
        return;
    }
    weatherResultError.classList.add('hidden');
    weatherResult.classList.add('hidden');
    cityInput.value = '';
    fetch(`https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json&name=${city}`)
        .then((cityResponse) => {
            if (!cityResponse) {
                return Promise.reject('Error while searching for city');
            }
            if (!cityResponse.ok) {
                return Promise.reject('Network response was not ok');
            }
            return cityResponse.json();
        })
        .then((cityInfo) => {
            if (!cityInfo.results || cityInfo.results.length === 0) {
                return Promise.reject('City not found: ' + city);
            }
            const { country, name, latitude, longitude } = cityInfo.results[0];
            cityName.textContent = name;
            countryName.textContent = country;
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        })
        .then((weatherResponse) => {
            if (!weatherResponse) {
                return Promise.reject('Error while fetching weather data');
            }
            if (!weatherResponse.ok) {
                return Promise.reject('Network response was not ok');
            }
            return weatherResponse.json()
        })
        .then((weatherInfo) => {
            if (!weatherInfo || !weatherInfo.current_weather) {
                return Promise.reject('Invalid weather data received');
            }
            weatherResult.classList.remove('hidden');
            const { temperature, windspeed } = weatherInfo.current_weather;
            setWeatherResultView(temperature);
            temp.textContent = temperature;
            wind.textContent = `${windspeed} km/h`;
            weatherResult.classList.remove('hidden');
        })
        .catch((error) => {
            weatherError.textContent = error;
            weatherResultError.classList.remove('hidden');
        });
}
