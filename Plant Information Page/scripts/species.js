import {flowerNames,succulentsNames,landAnimalNames,aquaticAnimalsNames,birdsNames} from '../data/name.js';
import './header.js';
import './footer.js';

export class Species{
    constructor(speciesType,speciesName){
        this.id = this.generateId();
        this.speciesType = speciesType;
        this.name = speciesName;
        this.imagePath = this.getImgPath(speciesType,this.name);
    }

    getImgPath(speciesType,speciesName){
        let path;
        if(speciesType === 'Land Animals'){
            path = `./images/${speciesType}/${speciesName}.jpeg`;
        }
        else{
            path =`./images/${speciesType}/${speciesName}.jpg`;
        }
        return path;
    }

    generateId(){
        var S4 = ()=>{
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};

let flowersList=[];
let landAnimalsList=[];
let aquaticAnimalsList=[];
let birdsList=[];
let succulentsList=[];

function createObject(arrayName,arrayList,arrayType){
    arrayName.forEach((value)=>{
        arrayList.push(new Species(arrayType,value));
    })
}

createObject(flowerNames,flowersList,"Flowers");
createObject(landAnimalNames,landAnimalsList,"Land Animals");
createObject(aquaticAnimalsNames,aquaticAnimalsList,"Aquatic Animals");
createObject(birdsNames,birdsList,"Birds");
createObject(succulentsNames,succulentsList,"Succulents");


function addItems(speciesItem,heading){
    let addFlower = document.querySelector(`.${heading}-rows`);
    addFlower.innerHTML+= `<div class="species-section">
                    <img class="species-img" src="${speciesItem.imagePath}" alt="${speciesItem.name}" title="${speciesItem.name}">
                    <div class="desc">
                        <p class="species-name">${speciesItem.name}</p>
                    </div>
            </div>`;
}

function renderItems(speciesList,isAllSpecies = false){
    let heading = speciesList[0].speciesType.replace(" ","-").toLowerCase();
    if(isAllSpecies){
        document.querySelector(".container").innerHTML += `<div class="${speciesList[0].speciesType}">
                <h2>${speciesList[0].speciesType}</h2>
                <div class="${heading}-rows"></div>
            </div>`;
    }
    else{
        document.querySelector(".container").innerHTML = `<div class="${speciesList[0].speciesType}">
                <h2>${speciesList[0].speciesType}</h2>
                <div class="${heading}-rows"></div>
            </div>`;
    }


    speciesList.forEach((speciesItem)=>{
        addItems(speciesItem,heading);
    })
}



const filterBtn = document.querySelectorAll('.filter button');
filterBtn.forEach((value)=>{
    value.addEventListener('click',()=>{
        document.querySelector('.filter-enabled').classList.remove('filter-enabled');
        value.classList.add('filter-enabled');
        let currentSectionClass = value.classList[0];
        filterBasedRendering(currentSectionClass);
    })
})


function filterBasedRendering(checkSpecies){
    if(checkSpecies === 'flower-btn'){
        renderItems(flowersList);
    }
    else if(checkSpecies === 'bird-btn'){
        renderItems(birdsList);
    }
    else if(checkSpecies === 'succulent-btn'){
        renderItems(succulentsList);
    }
    else if(checkSpecies === 'aquatic-btn'){
        renderItems(aquaticAnimalsList);
    }
    else if(checkSpecies === 'land-btn'){
        renderItems(landAnimalsList);
    }
    else{
        [flowersList,birdsList,succulentsList,aquaticAnimalsList,landAnimalsList].forEach((valuelist)=>{
            renderItems(valuelist,true);
            console.log('working');
        });
    }

}

//Default value on species page is set to all
[flowersList,birdsList,succulentsList,aquaticAnimalsList,landAnimalsList].forEach((valuelist)=>{
    renderItems(valuelist,true);
});