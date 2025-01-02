class Product{
    id;
    image;
    description;
    rating;
    discount;
    cost;
    originalPrice;

    constructor(productDetails){
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.description = productDetails.description;
        this.rating = productDetails.rating;
        this.discount = productDetails.discount;
        this.cost = productDetails.cost;
        this.originalPrice = productDetails.originalPrice;
    }

    getStars(){
        return `${this.rating.stars}`;
    }
}

/* child class-inheritance
class Clothing extends Product{
    sizeChartLink;

    constructor(productDetails){
        super(productDetails); //calls the constructor of parent class
        this.sizeChartLink = 'small';
    }
}

const tshirt = new Clothing({
    id: '0301018301087',
    image:'book',
    description:'Before the Coffee Gets Cold',
    rating:{
    stars: 4.3,
    count: '22,317'},
    discount: '-32%',
    cost: 374 ,
    originalPrice: '550.00' ,
});
console.log(tshirt);
console.log(tshirt.getStars());*/

let item0 = {
    id: '0301018301087',
    image:'book',
    description:'Before the Coffee Gets Cold',
    rating:{
    stars: 4.3,
    count: '22,317'},
    discount: '-32%',
    cost: 374 ,
    originalPrice: '550.00' ,
};
let item1 = {
    id: '0301018598088',
    image:'chandelier',
    description:'Kinis 10Watt Curvy Style 3 Color Led Wall Light for Living Room',
    rating:{
    stars: 3.6,
    count: 86},
    discount: '-53%',
    cost: 1399 ,
    originalPrice: '2,999.00' ,
};
let item2 = {
    id: '0301018450181',
    image: 'top',
    description:'KOTTY Womens Satin Sleeveless Solid Top',
    rating:{
    stars: 3.9,
    count: 120},
    discount: '-77%',
    cost: 299 ,
    originalPrice: '1,299.00' ,
};
let item3={
    id: '02010101581810',
    image: 'baking-bowls',
    description:'KOMUEE Baking Dish Set',
    rating:{
    stars: 4.5,
    count: 897},
    discount: '-30%',
    cost: 11918 ,
    originalPrice: '1,299.00' ,
}
let item4={
    id: '22197318962',
    image: 'office-chair',
    description:'Da URBAN® Merlion Office Chair',
    rating:{
    stars: 4.4,
    count: '3,034'},
    discount: '-76%',
    cost: 6499 ,
    originalPrice: '26,999.00' ,
}
let item5={
    id: '81865465786',
    image: 'pine-cone',
    description:'eCraftIndia Natural Pine Cone for Christmas Tree Decoration (Pack of 6)',
    rating:{
    stars: 4.0,
    count: 22},
    discount: '-26%',
    cost: 148 ,
    originalPrice: '199.00' ,
}
let item6={
    id: '80505361775',
    image: 'swan',
    description:'amazon basics Modern Elite Swan Pair Ceramic Art Figurine',
    rating:{
    stars: 4.4,
    count: 174},
    discount: '-63%',
    cost: 1196 ,
    originalPrice: '3,199.00' ,
}
export const products=[item0,item1,item2,item3,item4,item5,item6].map((value)=>{
    return new Product(value);
});

//Built in class
let date = new Date();
console.log(date);