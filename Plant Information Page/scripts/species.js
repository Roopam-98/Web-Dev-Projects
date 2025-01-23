import {flowerNames,succulentsNames,landAnimalNames,aquaticAnimalsNames,birdsNames} from '../data/name.js';
import './header.js';
import './footer.js';

export class Species{                              //Is class & creates list of objects for each species such as birds,flowers,succulents,etc.
    constructor(speciesType,speciesName){
        this.id = this.generateId();
        this.speciesType = speciesType;
        this.name = speciesName;
        this.imagePath = this.getImgPath(speciesType,this.name);
    }

    getImgPath(speciesType,speciesName){                //to set image path for each object type
        let path;
        if(speciesType === 'Land Animals'){
            path = `./images/${speciesType}/${speciesName}.jpeg`;
        }
        else{
            path =`./images/${speciesType}/${speciesName}.jpg`;
        }
        return path;
    }

    generateId(){                           //generates unique id
        var S4 = ()=>{
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};

//Separate arrays to store different species objects
let flowersList=[];
let landAnimalsList=[];
let aquaticAnimalsList=[];
let birdsList=[];
let succulentsList=[];

function createObject(arrayName,arrayList,arrayType){               //Function that loops through class to create object of each species.
    arrayName.forEach((value)=>{
        let newObject = new Species(arrayType,value);
        arrayList.push(newObject);
    })
}

createObject(flowerNames,flowersList,"Flowers");                    //Function call to create object
createObject(landAnimalNames,landAnimalsList,"Land Animals");
createObject(aquaticAnimalsNames,aquaticAnimalsList,"Aquatic Animals");
createObject(birdsNames,birdsList,"Birds");
createObject(succulentsNames,succulentsList,"Succulents");


function addItems(speciesItem,heading){                             //Function renders each object on the webpage
    let addFlower = document.querySelector(`.${heading}-rows`);
    addFlower.innerHTML+= `<div class="species-section">
                    <img class="species-img" src="${speciesItem.imagePath}" alt="${speciesItem.name}" title="${speciesItem.name}">
                    <div class="desc">
                        <p class="species-name">${speciesItem.name}</p>
                    </div>
            </div>`;
}

function renderItems(speciesList){                                   //Function to call addItems() for display of individual species
    let heading = speciesList[0].speciesType.replace(" ","-").toLowerCase();    //Add section to place objects on page
    document.querySelector(".container").innerHTML = `<div class="${speciesList[0].speciesType}">
            <h2>${speciesList[0].speciesType}</h2>
            <div class="${heading}-rows"></div>
        </div>`;

    speciesList.forEach((speciesItem)=>{    //Calls addItems()
        addItems(speciesItem,heading);
    })
}

function renderAllItems(speciesList){                       //Function to call addItems() for display of all species
    let heading = speciesList[0].speciesType.replace(" ","-").toLowerCase(); //Add section to place objects on page
    document.querySelector(".container").innerHTML += `<div class="${speciesList[0].speciesType}">
                <h2>${speciesList[0].speciesType}</h2>
                <div class="${heading}-rows"></div>
            </div>`;

    speciesList.forEach((speciesItem)=>{        //Calls addItems()
        addItems(speciesItem,heading);
    })
}

const filterBtn = document.querySelectorAll('.filter button');
filterBtn.forEach((value)=>{                //Loops through buttons used for filtering and adds event listener to render item being clicked
    value.addEventListener('click',()=>{
        document.querySelector('.filter-enabled').classList.remove('filter-enabled');       //removes default filter
        value.classList.add('filter-enabled');                  //adds filter to clicked button
        let currentSectionClass = value.classList[0];           //identifies type of btn based on classname
        filterBasedRendering(currentSectionClass);              //check class type and render similar object to page
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
        document.querySelector(".container").innerHTML ='';
        [flowersList,birdsList,succulentsList,aquaticAnimalsList,landAnimalsList].forEach((valuelist)=>{
            renderAllItems(valuelist);
        });
    }

}

//Default value on species page is set to all
[flowersList,birdsList,succulentsList,aquaticAnimalsList,landAnimalsList].forEach((valuelist)=>{
    renderAllItems(valuelist);
});