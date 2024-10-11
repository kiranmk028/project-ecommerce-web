import { orders } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { formatCurrency } from './utils/money.js';
import { getProduct, loadProducts } from '../data/products.js';
import { cart } from '../data/cart.js';

let ordersHTML = '';

async function renderOrders() {
    await loadProducts();

    updateCartQuantity();
    function updateCartQuantity() {
        let cartQuantity = cart.getCartQuantity();
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }

    orders.forEach((order) => {
        ordersHTML += `
                <div class="order-container">
                    <div class="order-header">
                        <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${formatTimeString(order.orderTime)}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(order.totalCostCents)}</div>
                        </div>
                        </div>

                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${order.id}</div>
                        </div>
                    </div>

                    ${renderOrderDetails(order.id, order.products)}
                </div>
                `;
    });

    function renderOrderDetails(orderId, orderDetails) {
        let orderDetailsHTML = '';

        orderDetails.forEach((orderDetail) => {
            let product = getProduct(orderDetail.productId);
            console.log(orderDetail);
            orderDetailsHTML += `
                    <div class="order-details-grid">
                        <div class="product-image-container">
                            <img src="${product.image}">
                        </div>
    
                        <div class="product-details">
                            <div class="product-name">
                                ${product.name}
                            </div>
                            <div class="product-delivery-date">
                                Arriving on: ${formatTimeString(orderDetail.estimatedDeliveryTime)}
                            </div>
                        <div class="product-quantity">
                            Quantity: ${orderDetail.quantity}
                        </div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                        </div>
    
                        <div class="product-actions">
                        <a href="tracking.html?orderId=${orderId}&productId=${orderDetail.productId}">
                            <button class="track-package-button button-secondary">
                            Track package
                            </button>
                        </a>
                        </div>
                    </div>
        `;
        });

        return orderDetailsHTML;
    }

    function formatTimeString(orderTimeString) {
        return dayjs(orderTimeString).format('MMMM D');
    }

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}
renderOrders();