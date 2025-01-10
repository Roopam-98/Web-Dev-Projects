let imageArray = ['./images/bee-eater-trying-eat-insect-another-one-tree-branch.jpg','./images/red-tulips-white-background.jpg',
    './images/seagulls-birds-fly-blue-sky.jpg','./images/pexels-nietjuh-776656.jpg'
];

function setImage(i){
    let setImg = imageArray[i];
    setTimeout(()=>{
        document.querySelector('.image-container').innerHTML = `<img src="${setImg}" class="image" data-image="${setImg}">`;
    },0.01);
}

setImage(0);



const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');

nextButton.addEventListener('click',()=>{
    let currentImg = document.querySelector('.image').dataset.image;
    let matchingIndex = 0;
    for(let i=0;i<imageArray.length; i++){
        if(currentImg === imageArray[i]){
            matchingIndex = i;
        }
    }

    if(matchingIndex === imageArray.length-1){
        setImage(0);
    }
    else{
        setImage(matchingIndex+1);
    }
})

previousButton.addEventListener('click',()=>{
    let currentImg = document.querySelector('.image').dataset.image;
    let matchingIndex = imageArray.length-1;
    for(let i=0;i<imageArray.length; i++){
        if(currentImg === imageArray[i]){
            matchingIndex = i;
        }
    }

    if(matchingIndex === 0){
        setImage(imageArray.length-1);
    }
    else{
        setImage(matchingIndex-1);
    }

})
