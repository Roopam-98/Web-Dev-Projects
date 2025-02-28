// Function fetches air quality using api and display data
export function getAirQuality(longitude, latitude) {
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=f91a70d3b32ab07d9d08c9703a965c24`;
    fetch(airQualityUrl).then((response) => {
        response.json().then((airQualityData) => {
            renderAQI(airQualityData.list[0].main);
            renderPollutants(airQualityData.list[0].components);
        });
    });
}

// Function renders Air Quality Index
function renderAQI(aqiValue) {
    document.querySelector(".slider").value = aqiValue.aqi;
}

// Function renders pollutant amount
function renderPollutants(components) {
    const O3 = document.querySelector(".o3");
    const CO = document.querySelector(".co");
    const PM2_5 = document.querySelector(".pm2_5");
    const PM10 = document.querySelector(".pm10");

    O3.innerText = components.o3;
    CO.innerText = components.co;
    PM2_5.innerText = components["pm2_5"];
    PM10.innerText = components["pm10"];
}
