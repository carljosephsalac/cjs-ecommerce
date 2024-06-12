export let cart = JSON.parse(localStorage.getItem('cart')) || [];

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

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}