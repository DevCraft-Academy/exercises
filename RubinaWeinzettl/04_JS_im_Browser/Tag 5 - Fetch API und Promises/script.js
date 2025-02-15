document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("weatherForm");
    const plz = document.getElementById("plz").value;
    const city = document.getElementById("city").value;
    const resultDiv = document.getElementById("weatherResult");
    resultDiv.innerHTML = "";
    
    form.addEventListener("click", async function() {    
        if (plz == "" || city =="") {
            resultDiv.innerHTML = "<p style='color: red;'>Bitte PLZ und Ort eingeben</p>";
            return;
        }

        try {
            // Geocoding API von Open-Meteo verwenden, um Breiten- und Längengrad zu erhalten
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=de&format=json`);
            if (!geoResponse.ok) throw new Error("Fehler bei der Standortsuche");

            const geoData = await geoResponse.json();
            if (!geoData.results || geoData.results.length === 0) {
                resultDiv.innerHTML = "<p style='color: red;'>Ort nicht gefunden. Bitte überprüfe deine Eingabe.</p>";
                return;
            }

            const { latitude, longitude } = geoData.results[0];

            // Wetterdaten abrufen
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            if (!weatherResponse.ok) throw new Error("Fehler beim Abrufen der Wetterdaten");

            const weatherData = await weatherResponse.json();
            const weather = weatherData.current_weather;

            resultDiv.innerHTML = `
                <p>Aktuelle Temperatur in ${city} (${plz}): ${weather.temperature}°C</p>
                <p>Windgeschwindigkeit: ${weather.windspeed} km/h</p>
                <p>Wettercode: ${weather.weathercode}</p>
            `;
        } catch (error) {
            console.error("Fehler:", error);
            resultDiv.innerHTML = "<p style='color: red;'>Fehler beim Abrufen der Wetterdaten.</p>";
        }
    });    
});     