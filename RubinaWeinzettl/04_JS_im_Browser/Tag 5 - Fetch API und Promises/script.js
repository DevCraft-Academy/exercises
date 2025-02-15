document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("weatherForm");
    const cityInput = document.getElementById("city");
    const resultDiv = document.getElementById("weatherResult");
    const errorMessage = document.getElementById("errorMessage");
    resultDiv.innerHTML = "";
    
    form.addEventListener('submit', (e) => {   
        e.preventDefault();
        const city = cityInput.value;
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
          .then(response => response.json())
          .then(data => {
            // needed variables for second API Call
            const latitude = (data.results[0].latitude);
            const longitude = (data.results[0].longitude);
            const cityName = data.results[0].name;
            
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${latitude}&daily=temperature_2m_max`)
              .then(response => response.json())
              .then(data => {
    //            // Display temperature
                const temperature = (data.daily.temperature_2m_max[0]);

                resultDiv.innerHTML = `<p>Wetter in ${cityName}:</p><p>Temperatur: ${temperature}°C</p>`;
                errorMessage.textContent = ''; // Clear any previous error messages
              })
              .catch(error => {
                console.error('Fetch error:', error);
                resultDiv.textContent = ''; // Clear previous weather info
                errorMessage.textContent = 'Wetterdaten konnten nicht geladen werden.';
              });
          })
          .catch(error => {
            console.error('Fetch error:', error);
            weatherInfo.textContent = ''; // Clear previous weather info
            errorMessage.textContent = 'Der eingegebene Ort konnte nicht gefunden werden.';
          });
    });    
});     