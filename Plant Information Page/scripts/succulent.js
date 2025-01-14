import {succulentsNames} from '../data/name.js';
import { Flowers } from './flower.js';

// SUCCULENTS

// Below Class is used to create succulent object
class Succulents extends Flowers{

    constructor(succulentName){
        super();
        this.id = this.generateId();
        this.name = succulentName;
        this.type = "Succulents";
        this.image = `./images/Succulents/${succulentName}.jpg`;
    }

}

//Creating Succulent object
let succulentList =[];
succulentsNames.forEach((value,index)=>{
    succulentList[index] = new Succulents(value);
})


//Rendering function for succulent objects on webpage
function addItemSucculent(succulent){
    let addSucculent = document.querySelector('.succulent-row-imgs');
    addSucculent.innerHTML+=`<div class="succulent-card">
                    <img src="${succulent.image}" class="succulent-img">
                    <div class="desc">
                        <p class="succulent-name">${succulent.name}</p>
                    </div>
                </div>`;
}

//Calling rendering function to put data on website
succulentList.forEach((succulent)=>{
    addItemSucculent(succulent);
})
