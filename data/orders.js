export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); // save the latest order response from backend to the front of the array
  saveToStorage();
  // console.log(orders);
  // console.log(orders[0].products[0].productId);
  // localStorage.removeItem('orders');
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}