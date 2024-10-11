import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            console.log('Inside promise 1.')
            resolve('Value from Promise 1.');
        });
    }),
    new Promise((resolve) => {
        console.log('Inside Promise 2.');
        resolve('Value from Promise 2.');
    })
]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});