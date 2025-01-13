import './scripts/flower.js';
import './scripts/succulent.js';
import './scripts/birds.js';
import './scripts/aquaticAnimals.js';
import './scripts/landAnimals.js';
import {quotes} from './quotes/script.js';


document.querySelector('.species').addEventListener('click',()=>{
    document.querySelector('.species-list').classList.add('species-list-show');
    document.querySelector('.species-list-now').classList.remove('.species-list');
});

document.querySelector('.subscribe').addEventListener('click',()=>{
    let state = false;
    document.querySelector('.subscribed').classList.add('subscribed-show');
    document.querySelector('.subscribed').classList.remove('subscribed');
})



setInterval(()=>{
    changeQuote();
},10000);            //changes quote every 8 seconds

function changeQuote(){  //function that changes quote
    let currentQuoteVar = document.querySelector('.quote-text');
    let currentQuote = currentQuoteVar.innerText;
    let currentAuthorVar = document.querySelector('.quote-author');
    console.log(currentQuote);
    let matchingIndex=0;
    quotes.forEach((value,index)=>{
        if(value.quote === currentQuote){
            matchingIndex = index;
        }
    })

    if(matchingIndex === quotes.length-1){
        currentQuoteVar.innerHTML = `${quotes[matchingIndex-(quotes.length-1)].quote}`;
        currentAuthorVar.innerText = `- ${quotes[matchingIndex-(quotes.length-1)].author}`;
    }
    else if(matchingIndex === 0 || matchingIndex > 0){
        currentQuoteVar.innerHTML = `${quotes[matchingIndex+1].quote}`;
        currentAuthorVar.innerText = `- ${quotes[matchingIndex+1].author}`;
    }
}

document.querySelector('.change-quote').addEventListener('click',()=>{
    changeQuote();
});     //changes quote when clicked



