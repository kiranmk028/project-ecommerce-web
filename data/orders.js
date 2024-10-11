export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function findOrder(orderId) {
    return orders.find((item) => item.id === orderId);
}

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}