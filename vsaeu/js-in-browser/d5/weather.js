const input = document.getElementById("ort");
const outputOrt = document.getElementById("ortAusgabe");
const wetterDaten = document.getElementById("wetterdaten");
const form = document.getElementById("Wetterformular");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  outputOrt.textContent = input.value;
  try {
    e.preventDefault();
    const city = input.value.trim();
    const url = `http://api.weatherapi.com/v1/current.json?key=e9ecf893a7034b12bf3175443250207&q=${encodeURIComponent(city)}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    wetterDaten.innerHTML = data.current.temp_c;
    errorMessage.textContent = "";
} catch (error) {
    console.error(error);
    wetterDaten.innerHTML = '';
    errorMessage.textContent = "Stadt nicht gefunden";
  }
});
