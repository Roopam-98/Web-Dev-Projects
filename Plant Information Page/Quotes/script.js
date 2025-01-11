let defaultValue = [{id:0,
    quote:'Never be bullied into silence. Never allow yourself to be made a victim. Accept no one’s definition of your life; define yourself.',
    author:'Harvey Fierstein'},
    {id:1,
    quote:'Find ecstasy in life; the mere sense of living is joy enough.',
    author:'Emily Dickinson'},
    {id:2,
    quote:'The whole secret of a successful life is to find out what is one’s destiny to do, and then do it.',
    author:'Henry Ford'},
    {id:3,
    quote:'Don\'t let the success of others discourage you.',
    author:'Unknown'}];
let quotesArray = JSON.parse(localStorage.getItem('quoteArray')) || defaultValue;
//localStorage.setItem('quoteArray',JSON.stringify(quotesArray));

export let quotes = quotesArray;

const quoteVar = document.querySelector('.quote');
const authorNameVar = document.querySelector('.author-name');

console.log(quotesArray);

/* To get window height & width
var w = window.innerWidth;
var h = window.innerHeight;
console.log(w,h); */

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

function getData(actionButton){
    let quote = quoteVar.value;
    quote = `${quote}`;
    let author = authorNameVar.value;
    if(!author){
        author='Unknown';
    }

    if(actionButton === 'submit'){
        storeData(quote,author);
    }
    console.log(JSON.parse(localStorage.getItem('quoteArray')));
    return {quote,author};
}

function clearData(){
    quoteVar.value='';
    authorNameVar.value='';
}

function submit(){
    getData('submit');
    clearData();
}

const previewButton = document.querySelector('.preview');
previewButton?.addEventListener('click',()=>{
    const previewQuote = document.querySelector('.quote-generator');
    previewQuote.classList.add('preview-quote');
    let data = getData('preview');
    previewQuote.innerHTML = `
        <div>
            <h2 class="quote-preview-heading">Quote Preview</h2>
        </div>
        <div class="quote-preview-font"><span class="quote-style">&ldquo;</span>${data.quote}<span class="quote-style">&rdquo;</span></div>
        <div class="author-preview ">- ${data.author}</div>
        <div><a href="index.html"><button class="preview">Discard</button></a>
        <button class="submit">Submit</button></div>`;
    submitEvent();

});

function submitEvent(){
    document.querySelector('.submit')?.addEventListener('click',()=>{submit();
        document.querySelector('.snackbar').classList.add('snackbar-show');
        setTimeout(()=>{
            document.querySelector('.snackbar').classList.remove('snackbar-show');
        },3000);
    });
}

submitEvent();


