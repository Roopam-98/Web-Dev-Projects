import { countryList } from "./countrycode.js";

let fromVal = document.getElementById("fromVal");
let toVal = document.getElementById("toVal");
let fromCurrency = 'USD',toCurrency = 'INR';        //default conversion
const countryCode = Object.entries(countryList);    //converts objects each key:value pair  into array of [key,pair]

const selectBtnFrm = document.querySelector("#from");
const selectBtnTo = document.querySelector("#to");
function createOptions(selectBtn){
    countryCode.forEach((value)=>{
        let code = value[0];
        if(code === 'USD' && selectBtn === selectBtnFrm){
            selectBtn.innerHTML+=`<option value="${code}" selected >${code}</option>`;
        }
        else if(code === 'INR' && selectBtn === selectBtnTo){
            selectBtn.innerHTML+=`<option value="${code}" selected>${code}</option>`;
        }
        else{
            selectBtn.innerHTML+=`<option value="${code}" >${code}</option>`;
        }
    })
}

createOptions(selectBtnFrm);
createOptions(selectBtnTo);

document.querySelector('#from').addEventListener('change',(event)=>{
    fromCurrency = event.target.value;          //gets newly selected country code for #from
    changeImg();
})
document.querySelector('#to').addEventListener('change',(event)=>{
    toCurrency = event.target.value;            //gets newly selected country code for #to
    changeImg();
})

fromVal.addEventListener('keypress',()=>{
    getRate();          //calculate output value as input value is being entered
})

const convertBtn = document.querySelector(".convert");
convertBtn.addEventListener('click',()=>{   //calculate amount
    getRate();
})
async function getRate(){       //fetches rate
    fromCurrency= fromCurrency.toLowerCase();
    toCurrency = toCurrency.toLowerCase();
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurrency][toCurrency];      //objects with string keys can be accessed this way.
    renderRate(rate);
    calculate(rate);
}

function calculate(rate){       //calculates totalAmnt based on rate and fromCurrency Value;
    let totalAmnt = 0;
    totalAmnt = rate*fromVal.value;
    toVal.value=totalAmnt.toFixed(2);
}

function renderRate(rate){      //displays standard rate of 1{from Currency type}
    document.querySelector('.show-rate').innerHTML = `${1}${fromCurrency.toUpperCase()} = ${rate.toFixed(4)}${toCurrency.toUpperCase()} `;
}

const exchngBtn = document.querySelector('.exchange');      //switch conversion
exchngBtn.addEventListener('click',()=>{
    let temp = toCurrency;  //switches currency 
    toCurrency = fromCurrency;
    fromCurrency = temp;
    changeImg();
    changeSelector();
    getRate();
})

function changeImg(){           // updates image after exchange
    let fromImg = document.querySelector("#fromImg");   //gets img tag
    let toImg = document.querySelector("#toImg");
    let fromImgcode = countryList[fromCurrency.toUpperCase()];  //searches for ISO-2 using ISO-3
    let toImgcode = countryList[toCurrency.toUpperCase()];
    fromImg.src = `https://flagsapi.com/${fromImgcode}/flat/64.png`;    //updates image location api
    toImg.src = `https://flagsapi.com/${toImgcode}/flat/64.png`;
}

function changeSelector(){      //update selected value for select of from & to.
    document.getElementById("from").value = fromCurrency.toUpperCase();     //changes selected option tag to mentioned value;
    document.getElementById("to").value = toCurrency.toUpperCase();
}
