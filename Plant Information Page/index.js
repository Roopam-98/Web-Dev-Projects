import './scripts/flower.js';
import './scripts/succulent.js';
import './scripts/birds.js';
import './scripts/aquaticAnimals.js';
import './scripts/landAnimals.js';


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
})