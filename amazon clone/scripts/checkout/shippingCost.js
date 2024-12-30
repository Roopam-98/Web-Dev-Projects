import {cart} from '../../data/cart.js';
let totalShippingCost = 0;

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
export function updateShippingItemCost(totalShippingCost){
    let totalCartQuantity = 0;
    let totalAmount =0;

    cart.forEach((cartItem)=>{
        totalCartQuantity+= Number(cartItem.cartQuantity);
        let amount = Number(cartItem.cartQuantity) * Number(cartItem.price);
        totalAmount += amount;
        //totalShippingCost += shippingCost;
    })

    //header of the webpage
    if(totalCartQuantity > 1){
        document.querySelector('.header-section-checkout').innerHTML = `Checkout (${totalCartQuantity} items)`;
        document.querySelector('.cart-count').innerHTML = totalCartQuantity;
    }
    else if(totalCartQuantity<=0){
        if(cart.length === 0){
            document.querySelector('.order-summary').innerHTML = `<p class="empty-cart">Cart is empty!<br> <a href="amazon-basic.html"><button class="view-products">View Products</button></a></p>`;
        }
        document.querySelector('.header-section-checkout').innerHTML = `Checkout (${totalCartQuantity} item)`;
        document.querySelector('.cart-count').innerHTML = totalCartQuantity;
    }
    else{
        document.querySelector('.header-section-checkout').innerHTML = `Checkout (${totalCartQuantity} item)`;
        document.querySelector('.cart-count').innerHTML = totalCartQuantity;
    }

    //calling to display total cost
    renderShippingItemsCost(totalCartQuantity, totalAmount, totalShippingCost);
}

updateShippingItemCost(totalShippingCost);