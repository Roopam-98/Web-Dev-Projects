const quote_url = "https://zenquotes.io/api/today";
const quoteValue = document.querySelector(".js-quote");
const O3 = document.querySelector('.o3');
const CO = document.querySelector('.co');
const PM2_5 = document.querySelector('.pm2_5');
const PM10 = document.querySelector('.pm10');
let longitude,latitude, sunriseSunsetUrl;
const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
}

async function getQuote(quote_url){
    let response = await fetch(quote_url);
    let quote = await response.json();
    // console.log(quote); --quote is array
    quoteValue.innerHTML = quote[0].h;
}

getQuote(quote_url);

document.querySelector('.input-select').addEventListener('click',()=>{
    document.querySelector('.type-location').classList.toggle('hidden');
})

document.querySelector('.search-location').addEventListener('click',()=>{
    let inputLocation = document.querySelector('input').value;
    document.querySelector('.type-location').classList.toggle('hidden');
    document.getElementById('set-location').innerText = `${inputLocation}`;

    let geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputLocation}&appid=f91a70d3b32ab07d9d08c9703a965c24`;
    fetch(geocodeUrl).then((response) =>{
        response.json().then((result)=>{
            longitude = result[0].lon;
            latitude = result[0].lat;

            setVal(longitude,latitude);
            getWeather(longitude,latitude);
            getAirQuality(longitude,latitude);
        })
    })

})

document.querySelector('.auto-select').addEventListener('click',()=>{
    if(!navigator.geolocation){
        alert("Your Browser does not support this feature!");
    }
    else{
        navigator.geolocation.getCurrentPosition(successResponse,errorResponse,options);
    }

})

function successResponse(position){
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    console.log(longitude,latitude);

    let reverseGeocodeUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=f91a70d3b32ab07d9d08c9703a965c24`;
    fetch(reverseGeocodeUrl).then((result)=>{
        result.json().then((data) =>{
            document.getElementById('set-location').innerText = data[0].name;
        });
    });

    setVal(longitude,latitude);
    getWeather(longitude,latitude);
    getAirQuality(longitude,latitude);
}

function errorResponse(){
    alert("Unable to detect location.");
}

async function SunriseSunset(longitude,latitude,day){
    try{
        sunriseSunsetUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${day}`;
    }
    catch(err){
        alert("URL did not fetch data!!")
    }
    let response = await fetch(sunriseSunsetUrl);

    let data = await response.json();
    let result = data.results;

    return result;
}

function setVal(longitude,latitude){
    let result = [];
    forecastDates.forEach((day) =>{
        let returnVal = SunriseSunset(longitude,latitude,day);
        result.push(returnVal);
    })
    prevNext(result);
}

function prevNext(result){
    function renderData(result){
        result.then((data)=>{
            document.querySelector('.data').innerHTML = `
                        <div class="sunrise-sunset">
                            <h4 class="date">${formatDate(data.date)}</h4>
                            <p><img class="icon" title="sunrise" src="./dawn_1582750.png"><span class="right">${formatTime(data.sunrise)} am</span></p>
                            <p><img class="icon" title="sunset" src="./sunset_1582749.png"> <span class="right">${formatTime(data.sunset)} pm</span></p>
                            <p><img class="icon" title="golden hour" src="./sunrise_6753118.png"><span class="right">${formatTime(data.golden_hour)} pm</span></p>
                        </div>`;
        })
    }

    renderData(result[0]);

    document.getElementById('previous').addEventListener('click',()=>{
        let matchingIndex;
        for(let i=result.length-1;i>0; i--){
            let setDate = document.querySelector('.date').innerHTML;
            result[i].then((data) =>{
                if(formatDate(data.date) === setDate){
                    matchingIndex = i;
                    renderData(result[matchingIndex-1]);
                    document.querySelector('.active').classList.remove('active');
                    document.getElementById(`${matchingIndex-1}`).classList.add('active');
                }
        })}
    })

    document.getElementById('next').addEventListener('click',()=>{
        let matchingIndex;
        for(let i=0;i<result.length; i++){
            let setDate = document.querySelector('.date').innerHTML;
            result[i].then((data) =>{
                if(formatDate(data.date) === setDate){
                    matchingIndex = i;
                    renderData(result[matchingIndex+1]);
                    document.querySelector('.active').classList.remove('active');
                    document.getElementById(`${matchingIndex+1}`).classList.add('active');
                }
        })}
    })
}



function getWeather(longitude,latitude){
    let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=f91a70d3b32ab07d9d08c9703a965c24&units=metric`;
    fetch(weatherUrl).then((response) =>{
        response.json().then((data) =>{
            renderWeather(data);
        })
    })

}

function renderWeather(data){
    let currentWeather = data.list.slice(0,8);
    document.querySelector('#forecast').innerHTML='';
    console.log(currentWeather);
    currentWeather.forEach((day)=>{
        let totalDate = day.dt_txt.split(' ')[0];
        let year = totalDate.split('-')[0];
        let month = totalDate.split('-')[1];
        let date = totalDate.split('-')[2];
        let newDate = `${year}-${month}-${date}`;
        day.dt_txt.split(' ')[0].split('-')[0];
        let time = day.dt_txt.split(' ')[1];
        document.querySelector('#forecast').innerHTML +=`<div><p class="bold">${formatTime(time)}</p>
                <img class = "forecast-icon" src="https://cdn-icons-png.freepik.com/256/2204/2204336.png?uid=R182106668&ga=GA1.1.175180818.1729070584">
                <p><span class="value">${day.weather[0].main}</span></p>
                <p class="value">${day.main.temp}&deg;C</p>
                <p class="value">${formatDate(newDate).split('2025')[0]}</p>
                <!--
                <p class="value"><span>Feels</span><span>${day.main.feels_like}&deg;C</span></p>
                <p>Description: <span class="right value">${day.weather[0].description}</span></p>--></div>`;
    })
}


let date,month,year;
let forecastDates=[];
date = dayjs().date();
month = dayjs().month() + 1;
year = dayjs().year();
let currentDate = dayjs(`${month}-${date}-${year}`,['DD','MMM','YYYY']);
for(let i=0; i< 5; i++){
    let date = currentDate.add(i,'day');
    forecastDates.push(date.format('YYYY-MM-DD'));
}



function getAirQuality(longitude,latitude){
    const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=f91a70d3b32ab07d9d08c9703a965c24`;
    fetch(airQualityUrl).then((response)=>{
        response.json().then((airQualityData)=>{
            renderPollutants(airQualityData.list[0].components);
        })
    })
}





function formatTime(time){
    let inputTime = time.split(":")
    let newTime = `${inputTime[0]}:${inputTime[1]}`;
    return newTime;
}

function renderPollutants(components){

    O3.innerText = components.o3;
    CO.innerText = components.co;
    PM2_5.innerText = components['pm2_5'];
    PM10.innerText = components['pm10'];
}

function formatDate(date){
    let formattedDate = dayjs(date).format('DD MMM YYYY');
    return formattedDate;
}