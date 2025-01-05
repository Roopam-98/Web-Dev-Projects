import { Flowers } from "./flower.js";
import {landAnimalNames} from '../data/name.js';

class LandAnimals extends Flowers{

    constructor(landAnimalName){
        super();
        this.id = this.generateId();
        this.name = landAnimalName;
        this.type = this;
        this.image = `../images/LandAnimals/${this.name}.jpg`;
    }

}

let landAnimalNamesList = [];
landAnimalNames.forEach((value,index)=>{
    landAnimalNamesList[index] = new LandAnimals(value);
})

console.log(landAnimalNamesList);