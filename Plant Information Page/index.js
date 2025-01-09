import './scripts/flower.js';
import './scripts/succulent.js';
import './scripts/birds.js';
import './scripts/aquaticAnimals.js';
import './scripts/landAnimals.js';
import {quotes} from './quotesArray.js';


document.querySelector('.change').addEventListener('click',()=>{
    let currentQuoteVar = document.querySelector('.quote');
    let currentQuote = currentQuoteVar.innerText;
    let matchingIndex=0;
    quotes.forEach((value,index)=>{
        if(value.quote === currentQuote){
            matchingIndex = index;
        }
    })

    if(matchingIndex === quotes.length-1){
        currentQuoteVar.innerHTML = `${quotes[matchingIndex-(quotes.length-1)].quote}`;
    }
    else if(matchingIndex === 0 || matchingIndex > 0){
        currentQuoteVar.innerHTML = `${quotes[matchingIndex+1].quote}`;
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


