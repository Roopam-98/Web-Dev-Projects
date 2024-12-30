import {cart} from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { updateShippingItemCost } from './shippingCost.js';

export function showDeliveryDate(){               //Function to Show expected delivery date
    document.querySelectorAll('.delivery-date').forEach((value)=>{
        let productId = value.dataset.productId;
        const freeShipping = document.getElementById(`free-shipping-${productId}`);
        const fastShipping = document.getElementById(`fast-shipping-${productId}`);
        const primeShipping = document.getElementById(`prime-shipping-${productId}`);


        if(primeShipping.checked){
            value.innerHTML = `Delivery date: ${deliveryOptions[2].deliveryDate}`;
        }
        else if(fastShipping.checked){
            value.innerHTML = `Delivery date: ${deliveryOptions[1].deliveryDate}`;
        }
        else{
            value.innerHTML = `Delivery date: ${deliveryOptions[0].deliveryDate}`;
        }
    })
}
export function calculateTotalShippingCost(){       // Function to switch between delivery option and update Shipping Cost
    let shippingCost = [];
    cart.forEach((cartItem)=>{
        let productId = cartItem.productId;
        const freeShipping = document.getElementById(`free-shipping-${productId}`);
        const fastShipping = document.getElementById(`fast-shipping-${productId}`);
        const primeShipping = document.getElementById(`prime-shipping-${productId}`);

        if(primeShipping.checked){
            shippingCost.push(70);
            cartItem.deliveryId = 2;
        }
        else if(fastShipping.checked){
            shippingCost.push(40);
            cartItem.deliveryId = 1;
        }
        else{
            shippingCost.push(0);
            cartItem.deliveryId = 0;
        }
    })
    localStorage.setItem('Cart',JSON.stringify(cart));

    let totalShippingCost = 0;
    for(let i=0; i<shippingCost.length; i++){
        totalShippingCost +=shippingCost[i];
    }
    updateShippingItemCost(totalShippingCost);
}

export function isChecked(){       //to update deliveryOption in cart and confirm that same option is checked even after refresh
    cart.forEach((cartItem)=>{
        let productId = cartItem.productId;
        document.querySelectorAll(`.radio-type-${productId}`).forEach((selector)=>{
            let deliveryId = selector.dataset.deliveryId;
            if(Number(deliveryId) === cartItem.deliveryId){
                selector.checked = true;
            }
        })
    })
    showDeliveryDate();
    calculateTotalShippingCost();
}