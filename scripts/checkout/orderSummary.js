import { cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
    let cartItemsHTML = '';
    let product = null;

    updateCartQuantity();
    function updateCartQuantity() {
        document.querySelector('.js-cart-quantity').innerHTML = cart.getCartQuantity();
    }

    cart.cartItems.forEach((cartItem) => {
        product = products.find((product) => product.id === cartItem.productId);
        let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        cartItemsHTML += `
            <div class="cart-item-container 
                js-cart-item-container
                js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                    Delivery date: ${getDeliveryDateString(deliveryOption)}
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
                        <div class="product-quantity js-product-quantity-${cartItem.productId}">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary
                                js-delete-cart-item js-delete-cart-item-${cartItem.productId}"
                                data-product-id="${cartItem.productId}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(cartItem)}
                    </div>
                </div>
            </div>
    `;
    });

    function getDeliveryDateString(deliveryOption) {
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays,
            'days'
        );
        return deliveryDate.format(
            'dddd, MMMM D'
        );
    }

    function deliveryOptionsHTML(cartItem) {
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const priceString =
                deliveryOption.priceCents === 0
                    ? 'FREE'
                    : `$${formatCurrency(deliveryOption.priceCents)} -`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                <div class="delivery-option js-delivery-option"
                    data-product-id="${cartItem.productId}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                    <div>
                        <div class="delivery-option-date">
                        ${getDeliveryDateString(deliveryOption)}
                        </div>
                        <div class="delivery-option-price">
                        ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });

        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartItemsHTML;

    document.querySelectorAll('.js-delete-cart-item').forEach((button) => {
        button.addEventListener('click', () => {
            let productId = button.dataset.productId;
            cart.removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            updateCartQuantity();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach(
        (deliveryItem) => {
            deliveryItem.addEventListener('click', () => {
                const { productId, deliveryOptionId } = deliveryItem.dataset;
                cart.updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        }
    );
}