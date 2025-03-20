import { languageCode, countryCode } from './countryCode.js';
import { getNews, getTopNews } from './data.js';

document.querySelector('.header-section').innerHTML =
    `
        <div class="nav-left">
            <div class="nav-logo"><img src="./images/freepik__background__77813.png" alt="earth.img" class="logo"></div>
            <div class="web-name">MediaWare</div>
        </div>
        <div class="nav-center">
        <i class="fa-solid fa-location-dot"></i>
        <div></div>
        </div>
        <div class="nav-right">
                <img src="" class="flag-img">
                <select class="country"></select>
                <img class="lang-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1ZkxpaxTx4jchUUj1xoXpjDHn342UYW6jnk2PioSQCVK1hCJZpWHF4V9Q5suZx41kh4&usqp=CAU">
                <select class="lang"></select>
                <button class="header-btn">Category</button>

            <div class="species-dropdown">
                <a href="species.html"><button class="species-btn">Species</button></a>
            </div>
            <div class="subscribe">
                <button class="subscribe-btn">Newsletter</button>
                <div class="subscribed">Subscribed!</div>
            </div>
            <div><button class="donate">Donate</button></div>
        </div>
`;

// document.querySelector('.mode').addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// })

const subscribeBtn = document.querySelector('.subscribe-btn');
subscribeBtn.addEventListener('click', () => {
    let El = document.querySelector('.subscription-section');
    El.classList.add('visibility');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        El.classList.remove('visibility');
    });
})

const selectBtns = document.querySelectorAll('select');
selectBtns.forEach((selectedBtn) => {
    let code;
    selectedBtn.innerHTML = '';
    if (selectedBtn.className === 'country') {
        code = countryCode;
        for (let i = 0; i < code.length; i++) {
            const optionEl = document.createElement("option");
            selectedBtn.appendChild(optionEl);
            optionEl.id = `code-${i}`;
            optionEl.text = code[i][0].toUpperCase();
            optionEl.value = code[i][0].toUpperCase();

            if (code[i][0] === 'us') {
                optionEl.selected = true;
            }

        }
    }
    else {
        code = languageCode;
        for (let i = 0; i < code.length; i++) {
            const optionEl = document.createElement("option");
            selectedBtn.appendChild(optionEl);
            optionEl.text = code[i].toUpperCase();
            optionEl.value = code[i].toUpperCase();

            if (code[i] === 'en') {
                optionEl.selected = true;
            }

        }

        // console.log(optionEl);
    }
})

const flagSelector = document.querySelector('.flag-img');
const selectedCountry = document.querySelectorAll('select')[0].value;

flagSelector.src = `https://flagsapi.com/${selectedCountry}/flat/64.png`;

selectBtns[0].addEventListener('change', () => {
    const flagSelector = document.querySelector('.flag-img');
    const locale = document.querySelectorAll('select')[0].value.toLowerCase();
    const lang = document.querySelectorAll('select')[1].value.toLowerCase();
    console.log(locale, lang);

    flagSelector.src = `https://flagsapi.com/${locale.toUpperCase()}/flat/64.png`;

    getTopNews(locale, lang);
    for (let i = 0; i < 4; i++) {
        getNews(i + 1, locale, lang);
    }
})
