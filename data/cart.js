export let cart = JSON.parse(localStorage.getItem('cart')) || [];
// [{
//   productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//   productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//   quantity: 1,
//   deliveryOptionId: '1'
// }, {
//   productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//   productName: 'Intermediate Size Basketball',
//   quantity: 1,
//   deliveryOptionId: '2'
// }, {
//   productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
//   productName: 'Adults Plain Cotton T-Shirt - 2 Pack',
//   quantity: 1,
//   deliveryOptionId: '3'
// }];

// CREATE
export function addToCart(productId, productName) {
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);             
  let matchingItem;    
  // cart.forEach(item => item.productId === productId && (matchingItem = item)); // shorthand
  cart.forEach(item => { // longhand (verbose)
    if (item.productId === productId) {
      matchingItem = item;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += Number(quantitySelector.value);
  } else {
    cart.push({
      productId, // property shorthand (same property name & var name)
      productName, // property shorthand (same property name & var name)
      quantity: Number(quantitySelector.value),
      deliveryOptionId: 1
    });
  }    
  saveToStorage();
}

// DELETE
export function removeFromCart(productId) { // updates the cart when item gets deleted
  const newCart = []; // container for items that not going to delete
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) { // if cart item in not equal to item that not want to delete
      newCart.push(cartItem); // put that to new cart array container
    }
  });
  cart = newCart; // save the value of newCart to cart
  saveToStorage();
}

// UPDATE
export function updateQuantity(productId, newQuantity) { // updates the cart array
  const newCart = []; // new container with new quantity value
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) { // if cart item in not equal to item that not want to update
      newCart.push(cartItem); // put that to new cart array container
    } else {
      cartItem.quantity = newQuantity;     
      newCart.push(cartItem);
    }
  });
  cart = newCart; // save the value of newCart to cart
  saveToStorage();
}

// update cart value in header
export function calculateCartQuantity() { 
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });    
  return totalQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;    
  // cart.forEach(item => item.productId === productId && (matchingItem = item)); // shorthand
  cart.forEach(cartItem => { // longhand (verbose)
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId; // updates the deliveryOptionId in cart
  saveToStorage();
}

function saveToStorage() { 
  localStorage.setItem('cart', JSON.stringify(cart));
}