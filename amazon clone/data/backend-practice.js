// create request
const xhr = new XMLHttpRequest();

//Adding Event listener to get response stored
xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
});

// setup request
xhr.open('GET','https://supersimplebackend.dev/hello');
xhr.send();