export function getCurrentWeather() {
    let lat, lon;
    const API_KEY = "f91a70d3b32ab07d9d08c9703a965c24";

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {

            lat = position.coords.latitude;
            lon = position.coords.longitude;

            getWeather(lat, lon);
        });
    }
    else {
        console.log("Geolocation is not supported by your browser.");
    }

    async function getWeather(lat, lon) {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const response = await fetch(API_URL);
        const weatherData = await response.json();

        console.log(weatherData);
        renderWeather(weatherData);
    }

    function renderWeather(weatherData) {
        document.querySelector('.nav-center div').innerHTML = `<p>${weatherData.main.temp} &deg;C</p>
        <p> ${weatherData.name}, ${weatherData.sys.country}</p>`;
    }
}

