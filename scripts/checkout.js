import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

new Promise((resolve) => {
    loadProducts(() => {
        console.log('Inside promise 1.')
        resolve('Value from Promise 1.');
    });
}).then((value1) => {
    console.log(value1);
    return new Promise((resolve) => {
        console.log('Inside Promise 2.');
        resolve('Value from Promise 2.');
    });
}).then((value2) => {
    console.log(value2);
    renderOrderSummary();
    renderPaymentSummary();
});
