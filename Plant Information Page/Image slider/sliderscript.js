let imageArray = ['./images/seagulls-birds-fly-blue-sky.jpg', './images/pexels-nietjuh-776656.jpg', './images/pexels-pixabay-46235.jpg',
    './images/pexels-nietjuh-1906439.jpg', './images/pexels-pixabay-35060.jpg'
];
//location of image should be changed based on the execution location of the script
function setImage(i) {
    let setImg = imageArray[i];
    setTimeout(() => {
        document.querySelector('.image-container').innerHTML = `<img src="${setImg}" class="image" data-image="${setImg}">`;
    }, 0.01);
}

setImage(0);



const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');

nextButton.addEventListener('click', () => {
    loopThroughImages();
})

previousButton.addEventListener('click', () => {
    let currentImg = document.querySelector('.image').dataset.image;
    let matchingIndex = imageArray.length - 1;
    for (let i = 0; i < imageArray.length; i++) {
        if (currentImg === imageArray[i]) {
            matchingIndex = i;
        }
    }

    if (matchingIndex === 0) {
        setImage(imageArray.length - 1);
    }
    else {
        setImage(matchingIndex - 1);
    }

})


function loopThroughImages() {
    let currentImg = document.querySelector('.image').dataset.image;
    let matchingIndex = 0;
    for (let i = 0; i < imageArray.length; i++) {
        if (currentImg === imageArray[i]) {
            matchingIndex = i;
        }
    }

    if (matchingIndex === imageArray.length - 1) {
        setImage(0);
    }
    else {
        setImage(matchingIndex + 1);
    }
}

setInterval(() => {
    loopThroughImages();
}, 20000);
