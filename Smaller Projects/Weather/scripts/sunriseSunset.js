import { forecastDates } from "./generateDates.js";
import { formatDate, formatTime } from "./formatters.js";

export function setVal(longitude, latitude) {
    let result = [];
    forecastDates.forEach((day) => {
        let returnVal = SunriseSunset(longitude, latitude, day);
        result.push(returnVal);
    });
    prevNext(result);
}

async function SunriseSunset(longitude, latitude, day) {
    let sunriseSunsetUrl;

    try {
        sunriseSunsetUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${day}`;
    } catch (err) {
        alert("URL did not fetch data!!");
    }

    let response = await fetch(sunriseSunsetUrl);
    let data = await response.json();
    let result = data.results;

    return result;
}

function prevNext(result) {
    function renderData(result) {
        result.then((data) => {
            document.querySelector(".data").innerHTML = `
                        <div class="sunrise-sunset">
                            <h4 class="date">${formatDate(data.date)}</h4>
                            <p><img class="icon" title="sunrise" src="./images/dawn_1582750.png"><span class="right">${formatTime(
                data.sunrise
            )} am</span></p>
                            <p><img class="icon" title="sunset" src="./images/sunset_1582749.png"> <span class="right">${formatTime(
                data.sunset
            )} pm</span></p>
                            <p><img class="icon" title="golden hour" src="./images/sunrise_6753118.png"><span class="right">${formatTime(
                data.golden_hour
            )} pm</span></p>
                        </div>`;
        });
    }

    renderData(result[0]);

    document.getElementById("previous").addEventListener("click", () => {
        let matchingIndex;
        for (let i = result.length - 1; i > 0; i--) {
            let setDate = document.querySelector(".date").innerHTML;
            result[i].then((data) => {
                if (formatDate(data.date) === setDate) {
                    matchingIndex = i;
                    renderData(result[matchingIndex - 1]);
                    document.querySelector(".active").classList.remove("active");
                    document
                        .getElementById(`${matchingIndex - 1}`)
                        .classList.add("active");
                }
            });
        }
    });

    document.getElementById("next").addEventListener("click", () => {
        let matchingIndex;
        for (let i = 0; i < result.length; i++) {
            let setDate = document.querySelector(".date").innerHTML;
            result[i].then((data) => {
                if (formatDate(data.date) === setDate) {
                    matchingIndex = i;
                    renderData(result[matchingIndex + 1]);
                    document.querySelector(".active").classList.remove("active");
                    document
                        .getElementById(`${matchingIndex + 1}`)
                        .classList.add("active");
                }
            });
        }
    });
}