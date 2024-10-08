export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [
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

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity) {
    let cartItem = null;

    if (cartItem = cart.find(item => item.productId === productId)) {
        cartItem.quantity += productQuantity;
    } else {
        cart.push({
            productId : productId,
            quantity : productQuantity,
            deliveryOptionId: '1'
        });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => cartItem.productId !== productId);

    saveToStorage();
}

export function getCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let cartItem = cart.find((item) => item.productId === productId);
    cartItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}