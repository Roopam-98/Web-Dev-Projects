class Cart{
    cartItems=JSON.parse(localStorage.getItem(this.localStorageKey))|| [];
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;
    }
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
            localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
        }
        else{                                                   //if product doesn't exist in cart, add product to cart as new object.
            this.cartItems.push({productId,cartQuantity:quantitySelectorValue,price:Number(price),deliveryId:0});
            localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
        }
    }

}

const cartVal = new Cart('cartVal');
cartVal.manageCart('0301018450181',299);
cartVal.manageCart('80505361775',1196);

const businessCart = new Cart('bus-cart');

console.log(cartVal);
console.log(businessCart);
console.log(businessCart instanceof Cart);
