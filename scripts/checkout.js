import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

async function loadPage() {
    try {
        await loadProducts();
    } catch (error) {
        console.log('Something went wrong. Please try again later.')
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();