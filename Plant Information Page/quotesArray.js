const quotesArray = JSON.parse(localStorage.getItem('quoteArray')) || [];
export let quotes = quotesArray;
const quoteVar = document.querySelector('.quote');
const authorNameVar = document.querySelector('.author-name');

console.log(quotesArray);

function storeItem(quote,author){
    quotesArray.push({id:quotesArray.length,quote,author});
            localStorage.setItem('quoteArray',JSON.stringify(quotesArray));
}
function storeData(quote,author){
    if(quote !== ''){
        if(quotesArray.length === 0){
            storeItem(quote,author);
        }
        else{
            let isduplicate;
            for(let i=0;i<quotesArray.length;i++){
                if(quotesArray[i].quote === quote){
                    isduplicate = true;
                }
            }
            if(isduplicate !== true){
                storeItem(quote,author);
            }
        }
    }
}

function getData(){
    let quote = quoteVar.value;
    let author = authorNameVar.value;
    if(!author){
        author='Unknown';
    }

    storeData(quote,author);

    return {quote,author};
}

function clearData(){
    quoteVar.value='';
    authorNameVar.value='';
}

function submit(){
    getData();
    clearData();
}

const previewButton = document.querySelector('.preview');
previewButton?.addEventListener('click',()=>{
    const previewQuote = document.querySelector('.quote-generator');
    previewQuote.classList.add('preview-quote');
    let data = getData();
    previewQuote.innerHTML = `
        <div>
            <h2 class="quote-preview-heading">Quote Preview</h2>
        </div>
        <div class="quote-preview-font"><img src="./images/double-quotes.png" class="quotation">${data.quote}.<img src="./images/double-quotes.png" class="quotation">
        </div>
        <div class="author-preview ">- ${data.author}</div>
        <div><a href="quotes.html"><button class="preview">Discard</button></a>
        <button class="submit" onclick="submit()">Submit</button></div>`;

});


