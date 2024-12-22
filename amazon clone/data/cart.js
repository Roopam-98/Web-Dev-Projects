export let cart= JSON.parse(localStorage.getItem('Cart'))|| [];//
//localStorage.setItem('Cart',JSON.stringify(cart));
export function manageCart(productId,price){  //function to add products into cart
    let matchingItem;
    let quantitySelectorValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);  //fetched quantity selector value and converted into number

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
