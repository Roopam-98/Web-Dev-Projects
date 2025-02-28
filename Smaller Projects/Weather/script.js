import { formatDate, formatStrLocation, formatTime, setCurrentTime } from "./scripts/formatters.js";
import { quote_url, getQuote } from './scripts/quote.js';
import { getAirQuality } from "./scripts/airQuality.js";
import { forecastDates } from "./scripts/generateDates.js";
import { setVal } from "./scripts/sunriseSunset.js";

getQuote(quote_url);        //Sets Quote on the page
setCurrentTime();           //Sets time on the page


let longitude, latitude;

document.querySelector("#city-name").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        let inputLocation = document.querySelector("input").value;

        document.getElementById("set-location").innerText = `${formatStrLocation(
            inputLocation
        )}`;

        let geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputLocation}&appid=f91a70d3b32ab07d9d08c9703a965c24`;
        fetch(geocodeUrl).then((response) => {
            response.json().then((result) => {
                longitude = result[0].lon;
                latitude = result[0].lat;

                document.querySelector("input").value = " ";

                setVal(longitude, latitude);
                getCurrentWeather(longitude, latitude);
                getWeather(longitude, latitude);
                getAirQuality(longitude, latitude);
            });
        });
    }
});

document.querySelector(".auto-select").addEventListener("click", () => {
    getCoordinates();
});

function getCoordinates() {
    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };

    if (!navigator.geolocation) {
        alert("Your Browser does not support this feature!");
    } else {
        navigator.geolocation.getCurrentPosition(
            successResponse,
            errorResponse,
            options
        );
    }
}

getCoordinates();


function successResponse(position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    // console.log(longitude,latitude);

    let reverseGeocodeUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=f91a70d3b32ab07d9d08c9703a965c24`;
    fetch(reverseGeocodeUrl).then((result) => {
        result.json().then((data) => {
            document.getElementById("set-location").innerText = data[0].name;
        });
    });

    setVal(longitude, latitude);
    getCurrentWeather(longitude, latitude);
    getWeather(longitude, latitude);
    getAirQuality(longitude, latitude);
}

function errorResponse() {
    alert("Unable to detect location.");
}


function getWeather(longitude, latitude) {
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f91a70d3b32ab07d9d08c9703a965c24&units=metric`;
    fetch(weatherUrl).then((response) => {
        response.json().then((data) => {
            renderWeeklyTemp(data.list);
            renderWeather(data);
        });
    });
}

function renderWeather(data) {
    let currentWeather = data.list.slice(0, 8);
    document.querySelector("#forecast").innerHTML = "";
    // console.log(currentWeather);
    currentWeather.forEach((day) => {
        let totalDate = day.dt_txt.split(" ")[0];
        let year = totalDate.split("-")[0];
        let month = totalDate.split("-")[1];
        let date = totalDate.split("-")[2];
        let newDate = `${year}-${month}-${date}`;
        day.dt_txt.split(" ")[0].split("-")[0];
        let time = day.dt_txt.split(" ")[1];
        document.querySelector(
            "#forecast"
        ).innerHTML += `<div><p class="bold">${formatTime(time)}</p>
                <img class = "forecast-icon" src="./images/${getWeatherImgPath(
            day.weather[0].main
        )}">
                <p><span class="value">${day.weather[0].main}</span></p>
                <p class="value">${day.main.temp}&deg;C</p>
                <p class="value">${formatDate(newDate).split("2025")[0]}</p>
                <!--
                <p class="value"><span>Feels</span><span>${day.main.feels_like
            }&deg;C</span></p>
                <p>Description: <span class="right value">${day.weather[0].description
            }</span></p>--></div>`;
    });
}

function getWeatherImgPath(weather) {
    switch (weather) {
        case "Clear":
            return "sunny.png";
        case "Clouds":
            return "cloudy.png";
        case "Winds":
            return "windy.png";
        case "Rain":
            return "rain.png";
        case "Storm":
            return "storm.png";
        case "Thunder":
            return "thunder.png";
        case "Snow":
            return "snow.png";
    }
}




function getCurrentWeather(longitude, latitude) {
    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f91a70d3b32ab07d9d08c9703a965c24`;
    fetch(currentWeatherUrl).then((response) => {
        response.json().then((data) => {
            renderCurrentWeather(data.main, data.weather[0], data.wind);
        });
    });
}

function renderCurrentWeather(main, weather, windStatus) {
    const wind = document.getElementById("wind");
    const pressure = document.getElementById("pressure");
    const humidity = document.getElementById("humidity");

    wind.innerHTML = `${windStatus.speed}<span class="weather-unit">m/sec</span>`;
    pressure.innerHTML = `${main.pressure}<span class="weather-unit">hPa</span>`;
    humidity.innerHTML = `${main.humidity}<span class="weather-unit">%</span>`;

    const weatherData = document.getElementById("weather");
    weatherData.innerHTML = `
    <div class="weather-temp">
        <p class="set-temp">${main.temp}&deg;C</p>
        <p class="weather-font">High <span class="space"></span>${main.temp_max
        }&deg;C </p>
        <p class="weather-font">Low <span class="space"></span>${main.temp_min
        }&deg;C</p>
        <p class="weather-font">Feels Like <span class="space"></span>${main.feels_like
        }&deg;C</p>
    </div>
    <div class="weather-image">
        <img class="weather-img" src="./images/${getWeatherImgPath(weather.main)}">
        <p class="weather-description">${weather.main}</p>
    </div>
    `;
}





function weeklyTemp(date, temp) {
    document.querySelector(".weekly-temp").innerHTML += ` <div><div>${formatDate(date).split("2025")[0]
        }</div>
            <div>${temp} &deg;C</div></div>
            <hr class="line-separator">`;
}

function renderWeeklyTemp(weeklyData) {
    document.querySelector(".weekly-temp").innerHTML = "";
    const numOfDays = weeklyData.length / 8;
    let start = 0;
    let end = 8;
    let weathertemp = [];
    for (let i = 0; i < numOfDays; i++) {
        let sum = 0;
        for (start; start < end; start++) {
            sum += weeklyData[start].main.temp;
        }
        let avg = (sum / 8).toFixed(2);
        weathertemp.push(avg);
        start = end;
        end = end + 8;
    }

    for (let i = 0; i < numOfDays; i++) {
        weeklyTemp(forecastDates[i], weathertemp[i]);
    }
}


