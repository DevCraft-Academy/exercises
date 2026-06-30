<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wetter App</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }

      .container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }

      #weather-info {
        margin-top: 20px;
      }

      #error-message {
        color: red;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Wetter App</h1>
      <form id="weather-form">
        <input
          type="text"
          id="city-input"
          placeholder="Stadt eingeben"
          required
        />
        <button type="submit">Wetter prüfen</button>
      </form>
      <div id="weather-info"></div>
      <div id="error-message"></div>
    </div>
    <script>
      document.getElementById("weather-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;
    const apiKey = "DEIN_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht ok");
        }
        return response.json();
      })
      .then((data) => {
        const weatherInfo = `
                <h2>Wetter in ${data.name}</h2>
                <p>Temperatur: ${data.main.temp} °C</p>
                <p>Beschreibung: ${data.weather[0].description}</p>
                <p>Feuchtigkeit: ${data.main.humidity} %</p>
                <p>Windgeschwindigkeit: ${data.wind.speed} m/s</p>
            `;
        document.getElementById("weather-info").innerHTML = weatherInfo;
        document.getElementById("error-message").innerHTML = "";
      })
      .catch((error) => {
        document.getElementById("error-message").innerHTML =
          "Fehler: " + error.message;
        document.getElementById("weather-info").innerHTML = "";
      });
  });

    </script>
  </body>
</html>
