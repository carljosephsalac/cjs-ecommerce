import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import toCents from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from "../data/deliveryOptions.js";

function renderOrderSummary() { // put all codes to this function in order to easily re-run the code
  // CREATE
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => { // generate cart cartItem html
    let matchingProduct;
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        matchingProduct = product;     
      }
    });

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === cartItem.deliveryOptionId) {
        deliveryOption = option;     
      }
    });
    const today = dayjs(); // date today
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days'); // add days base on delivery option
    const dateString = deliveryDate.format('dddd, MMMM, D'); // format the date

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${toCents(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                  ${cartItem.quantity}                    
                </span>                  
              </span>                
              <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input type="number" class="js-quantity-input-${matchingProduct.id} quantity-input">
              <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Save
                </span>
              <span class="js-delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}                            
          </div>
        </div>
      </div>
    `;     
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); // date today
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days'); // add days base on delivery option
      const dateString = deliveryDate.format('dddd, MMMM, D'); // format the date
      // calculate the price
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${toCents(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += 
        `
          <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-$${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
        `
    });
    return html;
  }

  // READ
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML; // updates the html

  const cartQuantity = document.querySelector('.js-return-to-home-link'); // declared outside foreach

  // DELETE
  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => { // get delete links DOM
    deleteLink.addEventListener('click', () => { // add event listener on each delete link
      const productId = deleteLink.dataset.productId; // get the unique id in dataset assigned to each delete link   
      removeFromCart(productId); // remove the specified id from cart
      const container = document.querySelector(`.js-cart-item-container-${productId}`); //get the container w/ unique id
      container.remove(); // remove the container 
      cartQuantity.innerHTML = (`${calculateCartQuantity()} items`); // updates cart quantity header  
    });
  });

  // UPDATE (Opposite of SAVE)
  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => { // get update links DOM
    updateLink.addEventListener('click', () => { // add event listener on each update link
      const productId = updateLink.dataset.productId; // get the unique id in dataset assigned to each update link   
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      // add class on container to apply specific style on child elements (display: none)
      container.classList.add('is-editing-quantity'); 
      // get the current quantity value in label
      const quantitylabelValue = document.querySelector(`.js-quantity-label-${productId}`).textContent.trim();
      // put the quantity value to input value
      document.querySelector(`.js-quantity-input-${productId}`).value = quantitylabelValue;
    });
  });  

  // SAVE (Opposite of UPDATE)
  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    const handleSave = () => { // put inside the function for reusability
      const productId = saveLink.dataset.productId; // get the unique id in dataset assigned to each save link
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      // remove class on container to make style (display) on child elements back to its default value
      container.classList.remove('is-editing-quantity');
      // get the value of input
      const quantityInputValue = document.querySelector(`.js-quantity-input-${productId}`).value;
      const newQuantity = Number(quantityInputValue); // convert the value of input to number

      if (newQuantity >= 0 && newQuantity < 1000) { // validation
        if (newQuantity === 0) {
          removeFromCart(productId); // remove the specified id from cart
          container.remove(); // remove the container        
        } else {
          // display the value of input to quantity label
          document.querySelector(`.js-quantity-label-${productId}`).textContent = newQuantity;        
          updateQuantity(productId, newQuantity); // updates the cart array
          // updates cart quantity header when the save link is clicked      
        }      
      } else {
        alert('Not a valid quantity');
      }    
      cartQuantity.innerHTML = (`${calculateCartQuantity()} items`);
    };

    // Add click event listener on each save link
    saveLink.addEventListener('click', handleSave);

    // Add keypress event listener for Enter key on each input field
    const inputField = document.querySelector(`.js-quantity-input-${saveLink.dataset.productId}`);
    inputField.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        handleSave();
      }
    });
  });

  // updates cart quantity header on the first load of the page
  cartQuantity.innerHTML = (`${calculateCartQuantity()} items`);

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset // get the data set
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // re-run all the code when clicked another delivery option
    });
  });
}

renderOrderSummary(); // run the all the code on the first load of the page