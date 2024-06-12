export const cart = [];

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