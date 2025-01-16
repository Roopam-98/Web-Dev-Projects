import { Flowers } from "./flower.js";
import {birdsNames} from '../data/name.js';

class Birds extends Flowers{

    constructor(birdsName){
        super();
        this.id = this.generateId();
        this.name = birdsName;
        this.type = 'Birds';
        this.image = `./images/Birds/${birdsName}.jpg`;
    }

};

let birdsNamesList = [];
birdsNames.forEach((value,index)=>{
    birdsNamesList[index] = new Birds(value);
});

function addBirds(bird){
    let addFlower = document.querySelector('.bird-row-imgs');
    addFlower.innerHTML+= `<div class="bird-section">
                    <img class="bird-img" src="${bird.image}"  alt="${bird.name}" title="${bird.name}">
                    <div class="desc">
                        <p class="bird-name">${bird.name}</p>
                    </div>
            </div>`;
}

// Calling rendering function
export function renderBirds(){
    birdsNamesList.forEach((bird)=>{
        addBirds(bird);
    });
}