import { Flowers } from "./flower.js";
import {aquaticAnimalsNames} from '../data/name.js';

class Aquatics extends Flowers{

    constructor(aquaticAnimalName){
        super();
        this.id = this.generateId();
        this.name = aquaticAnimalName;
        this.type = 'Aquatic Animals';
        this.image = `./images/AquaticAnimals/${this.name}.jpg`;
    }

}

let aquaticAnimalsList = [];
aquaticAnimalsNames.forEach((value,index)=>{
    aquaticAnimalsList[index] = new Aquatics(value);
})

function addAquaticAnimals(aquaticAnimal){
    let addAquaticAnimal = document.querySelector('.aquatic-animals-row-imgs');
    addAquaticAnimal.innerHTML+= `<div class="aquatic-section">
                    <img class="aquatic-img" src="${aquaticAnimal.image}" alt="${aquaticAnimal.name}" title="${aquaticAnimal.name}">
                    <div class="desc">
                        <p class="aquatic-name">${aquaticAnimal.name}</p>
                    </div>
            </div>`;
}

aquaticAnimalsList.forEach((value)=>{
    addAquaticAnimals(value);
})