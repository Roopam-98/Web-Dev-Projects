import './scripts/header.js';
import './scripts/footer.js';
import {quotes} from './quotes/quotescript.js';
import './data/usermail.js';

setInterval(()=>{
    changeQuote();
},10000);   //changes quote every 8 seconds

function changeQuote(){  //function that changes quote
    let currentQuoteVar = document.querySelector('.quote-text');
    let currentQuote = currentQuoteVar.innerText;
    let currentAuthorVar = document.querySelector('.quote-author');
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


