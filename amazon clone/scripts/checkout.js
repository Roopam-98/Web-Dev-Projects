import {cart} from '../data/cart.js';
import {products} from '../data/products.js';

// Shipping calculator
function renderShippingItemsCost(totalCartQuantity, totalAmount, totalShippingCost){

    let totalCostBeforeTax = (totalAmount + totalShippingCost).toFixed(2);
    let estimatedTax = (totalCostBeforeTax*0.05).toFixed(2);
    let orderTotal = Number(totalCostBeforeTax) + Number(estimatedTax);

    const shippingCalculator = document.querySelector('.order-cost');
    shippingCalculator.innerHTML = `
            <div>
                <p class="order-cost-header">Order Summary</p>
            </div>
            <div>
                <p class="order-cost-details">Items(${totalCartQuantity}) : <span class="amount">&#8377;${totalAmount.toFixed(2)}</span></p>
                <p class="order-cost-details">Shipping & handling : <span class="amount">&#8377;${totalShippingCost.toFixed(2)}</span></p>
            </div>
            <hr class="total-item-cost-line">
            <div>
                <p class="order-cost-details">Total before tax : <span class="amount">&#8377;${totalCostBeforeTax}</span></p>
                <p class="order-cost-details">Estimated tax(5%) : <span class="amount">&#8377;${estimatedTax}</span></p>
            </div>
            <hr class="total-line">
            <div>
                <p class="order-cost-header">Order total: <span class="amount">&#8377;${orderTotal}</span></p>
            </div>
            <div><button class="place-order">Place your order</button></div>
    `;
}

let totalCartQuantity = 0;
let totalAmount =0;
let totalShippingCost = 0;
cart.forEach((cartItem)=>{
    totalCartQuantity+= Number(cartItem.cartQuantity);
    let amount = Number(cartItem.cartQuantity) * Number(cartItem.price);
    totalAmount += amount;
})

renderShippingItemsCost(totalCartQuantity, totalAmount, totalShippingCost);


//Function to add cart Items to Webpage checkout
function addItemOrder(product,cartItem){
    const addItems = document.querySelector('.order-summary');
    addItems.innerHTML +=`
        <hr class="item-separator">
        <div class="item-container">
            <div class="delivery-date">Delivery date:</div>
            <div class="items">
                <div class="product-image"><img src="images/${product.image}.jpg" class="image-size"></div>
                <div class="product-details">
                    <div class="product-name">
                        <p>${product.description}</p>
                    </div>
                    <div class="product-cost">
                        <p>&#8377;${product.cost}</p>
                    </div>
                    <div class="product-quantity">
                        <p><button class="remove">-</button><span class="quantity">${cartItem.cartQuantity}</span><button
                                class="addup">+</button></p>
                    </div>
                    <div><button class="update">Update</button>
                        <button class="delete js-delete">Delete</button>
                    </div>
                </div>
                <div class="product-delivery">
                    <p class="product-name">Choose a delivery option:</p>
                    <div class="select-delivery-date">
                        <div><input type="radio" id="radio-selector" class="radio-type" name="${product.id}"><label class="date">Friday <br><span
                                    class="delivery-type"> Free
                                    Delivery</span></label></div>
                        <div><input type="radio" id="radio-selector" class="radio-type" name="${product.id}"><label class="date">Thursday <br><span
                                    class="delivery-type">Fast
                                    Delivery</span> </label></div>
                        <div><input type="radio" id="radio-selector" class="radio-type" name="${product.id}"><label class="date">Tomorrow <br><span
                                    class="delivery-type">Prime
                                    Delivery</span> </label></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

//To call function to add cart Items to checkout page
cart.forEach((cartItem)=>{
    let matchingProduct;
    products.forEach((product)=>{
        if(cartItem.productId === product.id){
            matchingProduct = product;
            addItemOrder(matchingProduct,cartItem);
        }
    })
})