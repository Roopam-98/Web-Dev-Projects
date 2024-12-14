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

const searchAreaSelector = document.querySelector('.select-search-area-options');
for(let i=0; i< searchArea.length ; i++){
    searchAreaSelector.innerHTML += `<option>${searchArea[i]}</option>`
}


let item0 = {
    image:'book',
    description:'Before the Coffee Gets Cold',
    rating:{
    stars: 4.3,
    count: '22,317'},
    discount: '-32%',
    cost: 374 ,
    originalPrice: 550.00 ,
    deliveryDate: 'Get it by Monday,December 16',
};
let item1 = {
    image:'chandelier',
    description:'Kinis 10Watt Curvy Style 3 Color Led Wall Light for Living Room, Led Wall Lamps for Bedroom, Led Wall Scone for Home Decoration, Led Wall Lamp for Home Wall, Led Wall Lamp for Home/Resturant/Cafe/Bar',
    rating:{
    stars: 3.6,
    count: 86},
    discount: '-53%',
    cost: 1399 ,
    originalPrice: 2999.00 ,
    deliveryDate: 'Get it by Wednesday,December 18',
};
let item2 = {
    image: 'top',
    description:'KOTTY Womens Satin Sleeveless Solid Top',
    rating:{
    stars: 3.9,
    count: 120},
    discount: '-77%',
    cost: 299 ,
    originalPrice: 1299.00 ,
    deliveryDate: 'Get it by Wednesday,December 18',
};
let item3={
    image: 'baking-bowls',
    description:'KOMUEE Baking Dish Set',
    rating:{
    stars: 4.5,
    count: 897},
    discount: '-30%',
    cost: 11918 ,
    originalPrice: 17029 ,
    deliveryDate: 'Get it by Wednesday,December 18',
}
const products=[item0,item1,item2,item3];

const renderProduct = document.querySelector('.js-products');
products.forEach((value,index)=>{
    renderProduct.innerHTML += `<div class="product-items">
        <img src="images/${value.image}.jpg" class="image-size">
        <p class="description">${value.description}</p>
        <p>${value.rating.count}</p>
        <p><span class="discount">${value.discount}</span>$${value.cost}</p>
        <p class="org-price">M.R.P.:$${value.originalPrice}</p>
        <p>FREE Delivery over &#8377;499. Fulfilled by Amazon.</p>
        <select class="js-quantity-options quantity-options"></select>
        <button class="add-to-cart">Add to Cart</button><br>
    </div>`;
})

const selectQuantityOption = document.querySelector('.js-quantity-options');
selectQuantityOption.addEventListener('click',()=>{
    for(let i=0;i<10;i++){
        selectQuantityOption.innerHTML += `<option>${i+1}</option>`;
    }
});
