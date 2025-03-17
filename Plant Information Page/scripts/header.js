document.querySelector('.header-section').innerHTML =
    `
        <div class="nav-left">
            <div class="nav-logo"><img src="./images/freepik__background__77813.png" alt="earth.img" class="logo"></div>
            <div class="web-name">MediaWare</div>
        </div>
        <div class="nav-center">
        <i class="fa-solid fa-location-dot"></i>  
        <div></div>
        </div>
        <div class="nav-right">

                <img src="https://flagsapi.com/BE/flat/64.png">
                <img class="flag-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN1ZkxpaxTx4jchUUj1xoXpjDHn342UYW6jnk2PioSQCVK1hCJZpWHF4V9Q5suZx41kh4&usqp=CAU">
                <button class="header-btn">Category</button>

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

// document.querySelector('.mode').addEventListener('click', () => {
//     document.body.classList.toggle('dark-mode');
// })

const subscribeBtn = document.querySelector('.subscribe-btn');
subscribeBtn.addEventListener('click', () => {
    let El = document.querySelector('.subscription-section');
    El.classList.add('visibility');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        El.classList.remove('visibility');
    });
})
