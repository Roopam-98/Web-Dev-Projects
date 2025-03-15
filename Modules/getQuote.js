export const quote_url = "https://zenquotes.io/api/today";
const quoteValue = document.querySelector(".js-quote");

export async function getQuote(quote_url) {
    let response = await fetch(quote_url);
    let quote = await response.json();
    // console.log(quote); --quote is array
    quoteValue.innerHTML = quote[0].h;
}

