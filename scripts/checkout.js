import { products } from "../data/products.js";
import { cart, getCartQuantity, removeFromCart } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

let cartItemsHTML = '';
let product = null;

updateCartQuantity();
function updateCartQuantity() {
    document.querySelector('.js-cart-quantity').innerHTML = getCartQuantity();
}

cart.forEach((cartItem) => {
    product = products.find((product) => product.id === cartItem.productId);
    cartItemsHTML += `
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                    Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${product.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(product.priceCents)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-cart-item" data-product-id="${cartItem.productId}">
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${cartItem.productId}">
                        <div>
                            <div class="delivery-option-date">
                            Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                            FREE Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${cartItem.productId}">
                        <div>
                            <div class="delivery-option-date">
                            Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                            $4.99 - Shipping
                            </div>
                        </div>
                        </div>
                        <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${cartItem.productId}">
                        <div>
                            <div class="delivery-option-date">
                            Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                            $9.99 - Shipping
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
});

document.querySelector('.js-order-summary').innerHTML = cartItemsHTML;

document.querySelectorAll('.js-delete-cart-item').forEach((button) => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId;
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCartQuantity();
    });
});