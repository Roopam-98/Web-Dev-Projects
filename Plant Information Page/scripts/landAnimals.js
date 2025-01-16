import { Flowers } from "./flower.js";
import {landAnimalNames} from '../data/name.js';

class LandAnimals extends Flowers{

    constructor(landAnimalName){
        super();
        this.id = this.generateId();
        this.name = landAnimalName;
        this.type = "Land Animals";
        this.image = `./images/LandAnimals/${this.name}.jpeg`;
    }

}

let landAnimalNamesList = [];
landAnimalNames.forEach((value,index)=>{
    landAnimalNamesList[index] = new LandAnimals(value);
});

function addLandAnimals(landAnimal){
    let addLandAnimal = document.querySelector('.land-animals-row-imgs');
    addLandAnimal.innerHTML+= `<div class="land-section">
                    <img class="land-img" src="${landAnimal.image}"  alt="${landAnimal.name}" title="${landAnimal.name}">
                    <div class="desc">
                        <p class="land-name">${landAnimal.name}</p>
                    </div>
            </div>`;
}

export function renderLands(){
    landAnimalNamesList.forEach((value)=>{
        addLandAnimals(value);
    });
}