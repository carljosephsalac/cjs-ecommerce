const cart = {
  cartItems: undefined,

  loadFromStorage() { // put inside a function so that it can use in test
    this.cartItems = JSON.parse(localStorage.getItem('cart-oop')) || 
    [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      productName: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
      quantity: 1,
      deliveryOptionId: '1'
    }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      productName: 'Intermediate Size Basketball',
      quantity: 1,
      deliveryOptionId: '2'
    }, {
      productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
      productName: 'Adults Plain Cotton T-Shirt - 2 Pack',
      quantity: 1,
      deliveryOptionId: '3'
    }];
  },

  saveToStorage() { 
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
  },

  // CREATE
  addToCart(productId, productName) {
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`) || {value: 1};             
    let matchingItem;    
    // cart.forEach(item => item.productId === productId && (matchingItem = item)); // shorthand
    this.cartItems.forEach(item => { // longhand (verbose)
      if (item.productId === productId) {
          matchingItem = item;
        }
      });
    if (matchingItem) {
      matchingItem.quantity += Number(quantitySelector.value);
    } else {
      this.cartItems.push({
        productId, // property shorthand (same property name & var name)
        productName, // property shorthand (same property name & var name)
        quantity: Number(quantitySelector.value),
        deliveryOptionId: 1
      });
    }    
    this.saveToStorage();
  },

  // DELETE
  removeFromCart(productId) { // updates the cart when item gets deleted
    const newCart = []; // container for items that not going to delete
    cart.forEach((cartItem) => {
      if (cartItem.productId !== productId) { // if cart item in not equal to item that not want to delete
        newCart.push(cartItem); // put that to new cart array container
      }
    });
    cart = newCart; // save the value of newCart to cart
    this.saveToStorage();
  },

  // DELETE
  removeFromCart(productId) { // updates the cart when item gets deleted
    const newCart = []; // container for items that not going to delete
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) { // if cart item in not equal to item that not want to delete
        newCart.push(cartItem); // put that to new cart array container
      }
    });
    this.cartItems = newCart; // save the value of newCart to cart
    this.saveToStorage();
  },

  // UPDATE
  updateQuantity(productId, newQuantity) { // updates the cart array
    const newCart = []; // new container with new quantity value
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) { // if cart item in not equal to item that not want to update
        newCart.push(cartItem); // put that to new cart array container
      } else {
        cartItem.quantity = newQuantity;     
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart; // save the value of newCart to cart
    this.saveToStorage();
  },

  // update cart value in header
  calculateCartQuantity() { 
    let totalQuantity = 0;
    this.cart.forEach((item) => {
      totalQuantity += item.quantity;
    });    
    return totalQuantity;
  },

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;    
    // cart.forEach(item => item.productId === productId && (matchingItem = item)); // shorthand
    this.cart.forEach(cartItem => { // longhand (verbose)
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId; // updates the deliveryOptionId in cart
    this.saveToStorage();
  }
};

cart.loadFromStorage();
cart.addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53', '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set');
console.log(cart);







