// Import necessary functions and variables from cart.js
import { addToCart, cart, loadFromStorage } from '../../data/cart.js' 

// Define the test suite for the addToCart function
describe('test suite: addToCart', () => {
  // This block runs before each test
  beforeEach(() => {
    // Setup DOM elements
    // Create an input element to simulate the quantity selector in the DOM
    const quantitySelector = document.createElement('input');
    // Assign a class to the input element that includes the productId
    quantitySelector.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    // Set the initial value of the input element to '1'
    quantitySelector.value = '1'; 
    // Append the input element to the document body
    document.body.appendChild(quantitySelector);

    // Mock localStorage methods
    // Spy on localStorage.setItem to monitor calls to it
    spyOn(localStorage, 'setItem');
    // Spy on localStorage.getItem and provide a fake implementation that returns an empty array
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    // Initialize the cart from the mocked localStorage
    loadFromStorage();
  });

  // This block runs after each test
  afterEach(() => {
    // Cleanup DOM elements
    // Find the input element by its class name
    const quantitySelector = document.querySelector('.js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    // If the input element exists, remove it from the document body
    if (quantitySelector) {
      document.body.removeChild(quantitySelector);
    }
  });

  // Define constants for productId and productName
  const productId = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productName = 'Black and Gray Athletic Cotton Socks - 6 Pairs';

  // Define a test case to check adding an existing product to the cart
  it('add an existing product to the cart', () => {
    // Call the addToCart function with the defined productId and productName
    addToCart(productId, productName);

    // Check that the cart length is now 1, meaning the product was added
    expect(cart.length).toEqual(1);
    // Check that localStorage.setItem was called exactly once
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // Check that the productId of the first item in the cart matches the defined productId
    expect(cart[0].productId).toEqual(productId);
    // Check that the quantity of the first item in the cart is 1
    expect(cart[0].quantity).toEqual(1);
  });
});
