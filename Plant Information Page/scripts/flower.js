import {flowerNames} from '../data/name.js';

// Class to create flower object
export class Flowers{
    id;
    image;
    name;
    type = '';
    constructor(flowerName){
        this.id = this.generateId();
        this.name = flowerName;
        this.type = "Flower";
        this.image = `./images/Flowers/${flowerName}.jpg`;
    }

    generateId(){  //generates randomId
        var S4 = ()=> {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
};

// Creating flower object
let flowerList=[];
flowerNames.forEach((value,index)=>{
    flowerList[index] = new Flowers(value);
});




// Rendering function to create flower object on webpage
function addItemFlower(flower){
    let addFlower = document.querySelector('.flower-row-imgs');
    addFlower.innerHTML+= `<div class="flower-section">
                    <img class="flower-img" src="${flower.image}" alt="${flower.name}" title="${flower.name}">
                    <div class="desc">
                        <p class="flower-name">${flower.name}</p>
                    </div>
            </div>`;
}

// Calling rendering function
export function renderFlowers(){
    flowerList.forEach((flower)=>{
        addItemFlower(flower);
    })
}



