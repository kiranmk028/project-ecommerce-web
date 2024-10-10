import { cart } from "../../data/cart.js";

describe('test suite: addToCart', () => {
    beforeEach(() => {
        spyOn(Object.getPrototypeOf(localStorage), 'setItem');

        spyOn(Object.getPrototypeOf(localStorage), 'getItem').and.callFake((key) => {
            if (key === 'cart') {
                return JSON.stringify([{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
            }

            return null;
        });

        cart.loadFromStorage();
    });

    it('adds an existing product to the cart', () => {
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        // spyOn(Object.getPrototypeOf(localStorage), 'getItem').and.callFake(() => {
        //     return JSON.stringify([]);
        // });

        cart.loadFromStorage();
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6g', 1);
        expect(cart.cartItems.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[1].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6g');
        expect(cart.cartItems[1].quantity).toEqual(1);
    });
});