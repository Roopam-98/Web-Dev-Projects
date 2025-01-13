/* import './scripts/flower.js';
import './scripts/succulent.js';
import './scripts/birds.js';
import './scripts/aquaticAnimals.js';
import './scripts/landAnimals.js'; */
import {quotes} from './quotes/script.js';


document.querySelector('.change-quote').addEventListener('click',()=>{
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

});


/*
//Dark theme
document.querySelector('.js-dark').addEventListener('click',()=>{
    document.body.classList.add('dark-theme');
    document.querySelector('.js-dark').classList.add('visibility');
    document.querySelector('.js-light').classList.remove('visibility');
})

//Light theme
document.querySelector('.js-light').addEventListener('click',()=>{
    document.body.classList.remove('dark-theme');
    document.querySelector('.js-dark').classList.remove('visibility');
    document.querySelector('.js-light').classList.add('visibility');
}) */


