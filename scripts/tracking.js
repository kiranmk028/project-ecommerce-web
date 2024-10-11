import { getProduct, loadProducts } from "../data/products.js";
import { findOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function renderTrackingPage() {
    await loadProducts();

    let url = new URL(window.location.href);
    let orderId = url.searchParams.get('orderId');
    let productId = url.searchParams.get('productId');
    let order = findOrder(orderId);
    console.log(order);
    let orderDetail = order.products.find((item) => item.productId === productId);
    console.log(orderDetail);
    let product = getProduct(productId);

    let trackingPageHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
        </a>

        <div class="delivery-date">
        Arriving on ${renderTimeString(orderDetail.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
        ${product.name}
        </div>

        <div class="product-info">
        Quantity: ${orderDetail.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
        <div class="progress-label">
            Preparing
        </div>
        <div class="progress-label current-status">
            Shipped
        </div>
        <div class="progress-label">
            Delivered
        </div>
        </div>

        <div class="progress-bar-container">
        <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingPageHTML;

    function renderTimeString(timeString) {
        return dayjs(timeString).format('dddd, MMMM D');
    }
}

renderTrackingPage();