import {cart,manageCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';


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

//Function to calculate shipping item cost
function updateShippingItemCost(){
let totalCartQuantity = 0;
let totalAmount =0;
let totalShippingCost = 0;

cart.forEach((cartItem)=>{
    totalCartQuantity+= Number(cartItem.cartQuantity);
    let amount = Number(cartItem.cartQuantity) * Number(cartItem.price);
    totalAmount += amount;
    //totalShippingCost += shippingCost;
})

//header of the webpage
if(totalCartQuantity > 1){
    document.querySelector('.header-section').innerHTML = `Checkout (${totalCartQuantity} items)`;
}
else if(totalCartQuantity<=0){
    if(cart.length === 0){
        document.querySelector('.order-summary').innerHTML += `<p class="empty-cart">Cart is empty!<br> <a href="amazon-basic.html"><button class="view-products">View Products</button></a></p>`;
    }
    document.querySelector('.header-section').innerHTML = `Checkout (${totalCartQuantity} item)`;
}
else{
    document.querySelector('.header-section').innerHTML = `Checkout (${totalCartQuantity} item)`;
}

//calling to display total cost
renderShippingItemsCost(totalCartQuantity, totalAmount, totalShippingCost);
}

updateShippingItemCost();

//Function to add cart Items to Webpage checkout
function addItemOrder(product,cartItem){
    let addItems = document.querySelector('.order-summary');
    addItems.innerHTML +=`
        <div class="item-container product-${product.id}">
            <div class="delivery-date"></div>
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
                        <p><button class="remove">-</button><span class="quantity js-quantity-${product.id}">${cartItem.cartQuantity}</span><button
                                class="addup">+</button></p>
                    </div>
                    <div>
                        <button class="update js-update update-${product.id}" data-product-id="${product.id}">Update</button>
                        <input type="text" placeholder="Quantity" class="quantity-input not-editing-quantity quantity-input-${product.id}">
                        <button data-product-id="${product.id}" class="save-quantity-link link-primary not-editing-quantity save-${product.id}">Save</button>
                        <button class="delete js-delete" data-product-id="${product.id}">Delete</button>
                    </div>
                </div>
                <div class="product-delivery">
                    <p class="product-name">Choose a delivery option:</p>
                    <div class="select-delivery-date">
                        <div>
                            <input type="radio" id="free-shipping" checked class="radio-type" name="${product.id}">
                            <label class="date" for="free-shipping">${deliveryOptions[0].deliveryDate}<br>
                            <span class="delivery-type"> Free shipping</span></label>
                        </div>
                        <div>
                            <input type="radio" id="fast-shipping" class="radio-type" name="${product.id}">
                            <label class="date" for="fast-shipping">${deliveryOptions[1].deliveryDate}<br>
                            <span class="delivery-type"> &#8377;40 - Shipping cost</span> </label>
                        </div>
                        <div>
                            <input type="radio" id="prime-shipping" class="radio-type" name="${product.id}">
                            <label class="date" for="prime-shipping">${deliveryOptions[2].deliveryDate}<br>
                            <span class="delivery-type">&#8377;70 - Shipping cost</span> </label>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="item-separator">
        </div>
    `;
}

//Call function to add cart Items to checkout page
function updateOrderSummary(){
cart.forEach((cartItem)=>{
    let matchingProduct;
    products.forEach((product)=>{
        if(cartItem.productId === product.id){
            matchingProduct = product;
            addItemOrder(matchingProduct,cartItem);
        }
    })
})
}

updateOrderSummary();

//Adding delete function for each cart Item
const deleteButton = document.querySelectorAll('.js-delete');
deleteButton.forEach((button)=>{
    button.addEventListener('click',()=>{
        let productId = button.dataset.productId;
        cart.forEach((cartItem,index)=>{
            if(productId === cartItem.productId){
                cart.splice(index,1);
                let productContainer = document.querySelector(`.product-${productId}`);
                productContainer.remove();
                updateShippingItemCost();
                localStorage.setItem('Cart',JSON.stringify(cart));
            }
        })
    })
})


//Added function to Update button
document.querySelectorAll('.js-update').forEach((updateButton)=>{
        updateButton.addEventListener('click',()=>{
            let productId = updateButton.dataset.productId;
            document.querySelector(`.quantity-input-${productId}`).classList.remove('not-editing-quantity');
            document.querySelector(`.save-${productId}`).classList.remove('not-editing-quantity');
            updateButton.classList.add('not-editing-quantity');
        })
    });

//Added function to Save button
document.querySelectorAll('.save-quantity-link').forEach((saveButton)=>{
    saveButton.addEventListener('click',()=>{
        let productId = saveButton.dataset.productId;
        document.querySelector(`.quantity-input-${productId}`).classList.add('not-editing-quantity');
        document.querySelector(`.update-${productId}`).classList.remove('not-editing-quantity');
        saveButton.classList.add('not-editing-quantity');

        let updatedQuantity = document.querySelector(`.quantity-input-${productId}`).value;
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                cartItem.cartQuantity = Number(updatedQuantity);
                updateShippingItemCost();
                localStorage.setItem('Cart',JSON.stringify(cart));
                console.log(JSON.parse(localStorage.getItem('Cart')));
                document.querySelector(`.js-quantity-${productId}`).innerHTML =  `${cartItem.cartQuantity}`;
            }
        });
    })
})



function showDeliveryDate(){
    const freeDelivery = document.getElementById('free-shipping');
    const fastDelivery = document.getElementById('fast-shipping');
    const primeDelivery = document.getElementById('prime-shipping');
    const finalizedDate = document.querySelector('.delivery-date');
    let shippingCost =0;

    if(primeDelivery.checked){
        finalizedDate.innerHTML = `Delivery date: ${deliveryOptions[2].deliveryDate}`;
        shippingCost = 70;
    }
    else if(fastDelivery.checked) {
        finalizedDate.innerHTML = `Delivery date: ${deliveryOptions[1].deliveryDate}`;
        shippingCost = 40;
    }
    else{
        finalizedDate.innerHTML = `Delivery date: ${deliveryOptions[0].deliveryDate}`;
        shippingCost =0;
    }
    return shippingCost;
}
let shippingCost = showDeliveryDate();


let selector = document.querySelectorAll('.radio-type');
selector.forEach((select)=>{
    select.addEventListener('click',()=>{
        let shippingCost = showDeliveryDate();
        console.log(shippingCost);
    })
});