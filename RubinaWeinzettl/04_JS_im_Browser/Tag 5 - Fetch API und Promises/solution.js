const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value;

  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  const apiKey = 'YOUR_API_KEY';

  // Make a Fetch request to the OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Display weather information
      const temperature = (data.main.temp - 273.15).toFixed(2); // Convert to Celsius
      const description = data.weather[0].description;
      const cityName = data.name;
      weatherInfo.innerHTML = `<p>Weather in ${cityName}: ${description}</p><p>Temperature: ${temperature}°C</p>`;
      errorMessage.textContent = ''; // Clear any previous error messages
    })
    .catch(error => {
      console.error('Fetch error:', error);
      weatherInfo.textContent = ''; // Clear previous weather info
      errorMessage.textContent = 'City not found. Please enter a valid city name.';
    });
});