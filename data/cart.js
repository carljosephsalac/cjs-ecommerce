export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
      quantity: Number(quantitySelector.value)
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
export function calculateCartQuantity() { // update cart value in header
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });    
  return totalQuantity;
}


function saveToStorage() { 
  localStorage.setItem('cart', JSON.stringify(cart));
}