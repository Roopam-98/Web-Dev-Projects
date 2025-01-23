document.querySelector('.header-section').innerHTML =
`
        <div class="nav-left">
            <div class="nav-logo"><img src="./images/freepik__background__77813.png" alt="earth.img" class="logo"></div>
            <div class="web-name">Planet IQ</div>
        </div>
        <div class="nav-center">
            <div><input type="search" placeholder="Search" class="search-bar"></div>
        </div>
        <div class="nav-right">
            <div><button class='language'><img src="https://www.svgrepo.com/show/348179/language.svg" class="icon-img"></button></div>
            <div><button  class='mode'>&#9788;</button></div>
            <div class="species-dropdown">
                <a href="species.html"><button class="species-btn">Species</button></a>
            </div>
            <div class="subscribe">
                <button class="subscribe-btn">Newsletter</button>
                <div class="subscribed">Subscribed!</div>
            </div>
            <div><button class="donate">Donate</button></div>
        </div>
`;

document.querySelector('.mode').addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode');
})

const subscribeBtn = document.querySelector('.subscribe-btn');
subscribeBtn.addEventListener('click',()=>{
    let El = document.querySelector('.subscription-section');
    El.classList.add('visibility');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click',()=>{
        El.classList.remove('visibility');
    });
})
