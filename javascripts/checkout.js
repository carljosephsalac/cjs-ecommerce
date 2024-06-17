import { renderOrderSummary } from "./checkout/oderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

loadProducts(() => { // ensures the product api response is executed first before calling this functions
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
