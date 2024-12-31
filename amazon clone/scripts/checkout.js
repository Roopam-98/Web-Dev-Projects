import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import {updateShippingItemCost} from './checkout/shippingCost.js';
import { isChecked,showDeliveryDate,calculateTotalShippingCost } from './checkout/checkoutFeatures.js';
import '../data/cart-oop.js';
import '../data/cart-class.js';

let totalShippingCost=0;

//Function to add cart Items to Webpage checkout
function addItemOrder(product,cartItem){
    let addItems = document.querySelector('.order-summary');
    addItems.innerHTML +=`
        <div class="item-container product-${product.id}">
            <div class="delivery-date delivery-${product.id}" data-product-id="${product.id}">Delivery date: Select from the available options </div>
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
                        <button class="remove" data-product-id="${product.id}">-</button>
                        <span class="quantity js-quantity-${product.id}">${cartItem.cartQuantity}</span>
                        <button class="add-up" data-product-id="${product.id}">+</button>
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
                            <input type="radio" id="free-shipping-${product.id}" class="radio-type radio-type-${product.id}" name="${product.id}" data-delivery-id="0">
                            <label class="date" for="free-shipping-${product.id}">${deliveryOptions[0].deliveryDate}<br>
                            <span class="delivery-type"> Free shipping</span></label>
                        </div>
                        <div>
                            <input type="radio" id="fast-shipping-${product.id}" class="radio-type radio-type-${product.id}" name="${product.id}" data-delivery-id="1">
                            <label class="date" for="fast-shipping-${product.id}">${deliveryOptions[1].deliveryDate}<br>
                            <span class="delivery-type"> &#8377;40 - Shipping cost</span> </label>
                        </div>
                        <div>
                            <input type="radio" id="prime-shipping-${product.id}" class="radio-type radio-type-${product.id}" name="${product.id}" data-delivery-id="2">
                            <label class="date" for="prime-shipping-${product.id}">${deliveryOptions[2].deliveryDate}<br>
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


document.querySelectorAll('.remove').forEach((removeButton)=>{      // to decrease cart quantity by 1.
    let productId= removeButton.dataset.productId;
    removeButton.addEventListener('click',()=>{
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                if(cartItem.cartQuantity > 1){
                    cartItem.cartQuantity--;
                    localStorage.setItem('Cart',JSON.stringify(cart));
                    calculateTotalShippingCost();
                    document.querySelector(`.js-quantity-${productId}`).innerHTML = `${cartItem.cartQuantity}`;
                }
            }
        })
    });
});

document.querySelectorAll('.add-up').forEach((addButton)=>{         // to increase cart quantity by 1
    let productId= addButton.dataset.productId;
    addButton.addEventListener('click',()=>{
        cart.forEach((cartItem)=>{
            if(productId === cartItem.productId){
                if(cartItem.cartQuantity < 10){
                    cartItem.cartQuantity++;
                    localStorage.setItem('Cart',JSON.stringify(cart));
                    calculateTotalShippingCost();
                    document.querySelector(`.js-quantity-${productId}`).innerHTML = `${cartItem.cartQuantity}`;
                }
            }
        })
    });
});


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
                localStorage.setItem('Cart',JSON.stringify(cart));
                updateShippingItemCost(totalShippingCost);
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
                localStorage.setItem('Cart',JSON.stringify(cart));
                updateShippingItemCost(totalShippingCost);
                document.querySelector(`.js-quantity-${productId}`).innerHTML =  `${cartItem.cartQuantity}`;
            }
        });
    })
})

//Function to Show expected delivery date
showDeliveryDate();

//Event listener for all delivery option input
document.querySelectorAll('.radio-type').forEach((inputValue)=>{
    inputValue.addEventListener('click',()=>{
        showDeliveryDate();
        calculateTotalShippingCost();
    })
})

//to update deliveryOption in cart and confirm that same option is checked even after refresh
isChecked();

