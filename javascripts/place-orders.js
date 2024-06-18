import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import toCents from "./utils/money.js";
import { calculateCartQuantity } from "../data/cart.js";

export function renderPlacedOrders() {
  let placedOrdersHTML = '';

  orders.forEach(order => {
    const orderPlacedDate = dayjs(order.orderTime).format('MMMM D, YYYY');
    const total = toCents(order.totalCostCents);
    placedOrdersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderPlacedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${total}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        
        <div class="order-details-grid">
          ${productsHTML(order.products)}
        </div>
      </div>
    `;
    
  });

  function productsHTML(products) {
    let html = '';

    products.forEach(product => {
      const matchingProduct = getProduct(product.productId);
      const arrivingDate = dayjs(product.estimatedDeliveryTime).format('MMMM D, YYYY');
      html += `
        <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${arrivingDate}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <!--  
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            -->
          </div>

          <div class="product-actions">
            <!-- 
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            -->
          </div>
      `;
    });
    return html;
  }

  document.querySelector('.js-cart-quantity').textContent = calculateCartQuantity();

  const pageTitle = document.querySelector('.js-page-title');
  if (orders.length === 0) {
    pageTitle.textContent = 'You have no orders yet';
  } else {
    pageTitle.textContent = 'Your Orders';
  }

  document.querySelector('.js-orders-grid').innerHTML = placedOrdersHTML; 
}

// Define an async function to load products and render orders
async function loadAndRenderOrders() {
  try {
    await loadProductsFetch(); // Wait for the products to be loaded from the server
    renderPlacedOrders();  // Once products are loaded, render the placed orders
  } catch (error) {
    // If an error occurs during product loading, log it to the console
    console.error('Error loading products:', error);
  }
}

// Call the async function to load products and render orders
loadAndRenderOrders();

