import {cart, manageCart} from '../../data/cart.js';


describe("test suite: addToCart", ()=>{
    it('adds an existing product to the cart',()=>{
        expect(cart[0].cartQuantity).toBe(true);
    });
    it('adds a new product to the cart',()=>{
        manageCart('80505361775',1196);
        expect(cart.length).toEqual(1);
    });
})