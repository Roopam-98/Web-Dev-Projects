

let cart= JSON.parse(localStorage.getItem('Cart'))|| [];//
//localStorage.setItem('Cart',JSON.stringify(cart));
function manageCart(productId,price){  //function to add products into cart
    let matchingItem, quantitySelectorValue;
      //fetched quantity selector value and converted into number
    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    if(quantitySelector){
        quantitySelectorValue = Number(quantitySelector.value);
    }


    cart.forEach((cartItem)=>{      //checking if product already exists in cart
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    })

    if(matchingItem){       //if product exists in cart, increase quantity by 1 in existing object.
        matchingItem.cartQuantity+=1;
        localStorage.setItem('Cart',JSON.stringify(cart));
    }
    else{                                                   //if product doesn't exist in cart, add product to cart as new object.
        cart.push({productId,cartQuantity:quantitySelectorValue,price:Number(price),deliveryId:0});
        localStorage.setItem('Cart',JSON.stringify(cart));
    }
}
