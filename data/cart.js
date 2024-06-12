export let cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 1
}, {
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}, {
  productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  quantity: 2
}];

export function addToCart (productId, productName) {
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
}

export function removeFromCart (productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}