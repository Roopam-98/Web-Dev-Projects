function Cart(localStorageKey){
    const cart = {
        cartItems:JSON.parse(localStorage.getItem(localStorageKey))|| [],

        manageCart(productId,price){  //function to add products into cart
            let matchingItem, quantitySelectorValue;
              //fetched quantity selector value and converted into number
            let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
            if(quantitySelector){
                quantitySelectorValue = Number(quantitySelector.value);
            }else{
                quantitySelectorValue = 1;
            }

            this.cartItems.forEach((cartItem)=>{      //checking if product already exists in cart
                if(productId === cartItem.productId){
                    matchingItem = cartItem;
                }
            })

            if(matchingItem){       //if product exists in cart, increase quantity by 1 in existing object.
                matchingItem.cartQuantity+=1;
                localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
            }
            else{                                                   //if product doesn't exist in cart, add product to cart as new object.
                this.cartItems.push({productId,cartQuantity:quantitySelectorValue,price:Number(price),deliveryId:0});
                localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
            }
        }

    };

    return cart;
}

//Calling above function generates multiple objects with different localstorage location

const cartVal = Cart('cart-regular');
cartVal.manageCart('0301018450181',299);
cartVal.manageCart('80505361775',1196);

const businessCart =Cart('cart-business');
businessCart.manageCart('80505361775',1196);


//console.log(cartVal);
//console.log(businessCart);
/* local storage key is used as parameter to have different
location for each cart object in the storage*/