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
            <div class="species-dropdown">
                <button class="species-btn">Species <span class="invert">&#x25BC;</span></button>
                <div class="species-list">
                    <a href="species.html" class="section-link" id='flower' data-id='flower'>Flowers</a>
                    <a href="species.html" class="section-link"  id='succulent' data-id='succulent'>Succulents</a>
                    <a href="species.html" class="section-link"  id='bird' data-id='bird'>Birds</a>
                    <a href="species.html" class="section-link"  id='aquatic' data-id='aquatic'>Aquatic </a>
                    <a href="species.html" class="section-link"  id='land' data-id='land'>Land</a>
                </div>
            </div>
            <div class="subscribe">
                <button class="subscribe-btn">Subscribe</button>
                <div class="subscribed">Subscribed!</div>
            </div>
            <div><button class="donate">Donate</button></div>
        </div>
`;
