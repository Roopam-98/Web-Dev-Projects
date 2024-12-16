// Created selection array for search bar
let searchArea = ['All','All Categories','Alexa Skills',
    'Amazon Devices', 'Amazon Fashion', 'Amazon Pharmacy', 'Appliances', 'Apps & Games',
    'Audible Audiobooks', 'Baby', 'Beauty', 'Books', 'Car & Motorbike', 'Clothing & Accessories',
    'Collectibles', 'Computers & Accessories', 'Deals', 'Electronics', 'Furniture',
    'Garden & Outdoors', 'Gift Cards', 'Gorcery & Gourmet Foods', 'Health & Personal Care',
    'Home & Kitchen', 'Industrial & Scientific', 'Jewellery', 'Kindle Store', 'Luggage & Bags',
    'Luxury Beauty', 'Movies & TV Shows', 'MP3 Music', 'Music', 'Musical Instruments', 
    'Office Products', 'Pet Supplies', 'Prime Video', 'Shoes & Handbags', 'Software',
    'Sports, Fitness & Outdoors', 'Subscribe & Save', 'Tools & Home Improvement', 'Toys & Games',
    'Under 500rs', 'Video Games', 'Watches'
];

// Created Selector of search bar in JS
const searchAreaSelector = document.querySelector('.select-search-area-options');
for(let i=0; i< searchArea.length ; i++){
    searchAreaSelector.innerHTML += `<option>${searchArea[i]}</option>`
}


// Code used to generate HTML for products
const renderProduct = document.querySelector('.js-products');
products.forEach((value)=>{
    renderProduct.innerHTML += `<div class="product-items">
        <img src="images/${value.image}.jpg" class="image-size">
        <div class="description-section">
            <div><p class="description">${value.description}</p></div>
            <div><p class="rating-count">${value.rating.count}</p></div>
            <div><p class="cost"><span class="discount">${value.discount}</span><sup>&#8377;</sup>${value.cost}<sup>00</sup><span  class="org-price">M.R.P.: <strike>&#8377;${value.originalPrice}</strike></span></p></div>
            <div class="description-common-section">
                <p class="free-delivery">FREE Delivery over &#8377;499. Fulfilled by Amazon.</p>
                <button class="js-addCart add-to-cart" data-product-id="${value.id}" data-price="${value.cost}">Add to Cart</button>
                <select class="js-quantity-options quantity-options js-quantity-selector-${value.id}"></select>
                <p class="js-added-to-cart-${value.id} added-to-cart"></p>
            </div>
        </div>
        <br>
    </div>`;
})


// Code for Quantity selector
const selectQuantityOption = document.querySelectorAll('.js-quantity-options');
selectQuantityOption.forEach((value)=>{
    for(let i=0;i<10;i++){
        value.innerHTML += `<option>${i+1}</option>`;
    }
})

//Code for Add to Cart updates
const addToCart = document.querySelectorAll('.js-addCart');
addToCart.forEach((value)=>{
    value.addEventListener('click',()=>{

        let productId = value.dataset.productId;
        let price= value.dataset.price;
        let matchingItem;
        let quantitySelectorValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);  //fetched quantity selector value and converted into number

        cart.forEach((item)=>{      //checking if product already exists in cart
            if(productId === item.productId && price === item.price){
                matchingItem = item;
            };
        })

        if(matchingItem){       //if product exists in cart, increase quantity by 1 in existing object.
            matchingItem.cartQuantity+=1;
        }
        else{                                                   //if product doesn't exist in cart, add product to cart as new object.
            cart.push({productId,cartQuantity:quantitySelectorValue,price});
        }

        //Calculating Total Cart quantity and Updating on webpage
        let totalCartQuantity=0;
        cart.forEach((item)=>{
            totalCartQuantity += item.cartQuantity;
        })
        document.querySelector('.cart-count').innerHTML = totalCartQuantity;

        console.log(cart);

        //Code for showing that cart has been updated with item
        const addedCart = document.querySelector(`.js-added-to-cart-${productId}`);
        addedCart.innerHTML = '&check; Added!';
        let timerId = setTimeout(()=>{
            addedCart.innerHTML = '';
        },2000);
        //clearTimeout(timerId);
    });
})

