import { Flowers } from "./flower.js";
import {birdsNames} from '../data/name.js';

class Birds extends Flowers{

    constructor(birdsName){
        super();
        this.id = this.generateId;
        this.name = birdsName;
        this.type = this;
        this.image = `../images/Birds/${this.name}.jpg`;
    }

}

let birdsNamesList = [];
birdsNames.forEach((value,index)=>{
    birdsNamesList[index] = new Birds(value);
})

console.log(birdsNamesList);