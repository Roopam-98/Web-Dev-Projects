import { Flowers } from "./flower.js";
import {aquaticAnimalsNames} from '../data/name.js';

class Aquatics extends Flowers{

    constructor(aquaticAnimalName){
        super();
        this.id = this.generateId();
        this.name = aquaticAnimalName;
        this.type = this;
        this.image = `../images/AquaticAnimals/${this.name}.jpg`;
    }

}

let aquaticAnimalsList = [];
aquaticAnimalsNames.forEach((value,index)=>{
    aquaticAnimalsList[index] = new Aquatics(value);
})

console.log(aquaticAnimalsList);