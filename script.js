async function getWeather() {

    const city = document.getElementById("cityInput").value;
    const result = document.getElementById("weatherResult");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    try {

        // Free Open-Meteo Geocoding API
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results) {
            result.innerHTML = "<p>City not found.</p>";
            return;
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;

        // Weather API
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

        const weatherData = await weatherResponse.json();

        const temp = weatherData.current.temperature_2m;
        const humidity = weatherData.current.relative_humidity_2m;
        const wind = weatherData.current.wind_speed_10m;

        result.innerHTML = `
            <h2>${city}</h2>
            <p><strong>Temperature:</strong> ${temp} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${wind} km/h</p>
        `;

    } catch (error) {

        result.innerHTML = `
            <p>Error fetching weather data.</p>
        `;

        console.error(error);
    }
}
