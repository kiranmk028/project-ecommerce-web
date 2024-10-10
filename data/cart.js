class Cart {
    cartItems;

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem('cart'));

        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ];
        }
    }

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    addToCart(productId, productQuantity) {
        let cartItem = null;

        if (cartItem = this.cartItems.find(item => item.productId === productId)) {
            cartItem.quantity += productQuantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: productQuantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);

        this.saveToStorage();
    }

    getCartQuantity() {
        let cartQuantity = 0;

        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });

        return cartQuantity;
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let cartItem = this.cartItems.find((item) => item.productId === productId);
        cartItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }
}

export const cart = new Cart();
cart.loadFromStorage();