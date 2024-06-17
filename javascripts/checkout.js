import { renderOrderSummary } from "./checkout/oderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

/* CALLBACK */
// loadProducts(() => { // ensures the product api response is executed first before calling this functions
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
//   }); 
// });

/* PROMISE */
// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value1'); // add value to resolve
//   });
// }).then((value) => { // put the value of the previous resolve parameter
//   console.log(value); // used the value of resolve
//   return new Promise((resolve) => {
//     loadCart(() => {
//      resolve();
//     });
//   });
// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
// });

/* PROMISE ALL */
// Promise.all([
//   new Promise((resolve) => {
//     loadProducts(() => {
//       resolve('products loaded successfully');
//     });
//   }),
//   new Promise((resolve) => {
//     loadCart(() => {
//      resolve('cart loaded successfully');
//     });
//   })
// ]).then((value1, value2) => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
//   // console.log(value1);
//   // console.log(value2);
// });

/* FETCH */
// Promise.all([
//   loadProductsFetch(),
//   new Promise((resolve) => {
//     loadCart(() => {
//      resolve('cart loaded successfully');
//     });
//   })
// ]).then((value1, value2) => {
//   renderOrderSummary();
//   renderPaymentSummary();
//   renderCheckoutHeader();
//   // console.log(value1);
//   // console.log(value2);
// });

/* Asynch Await */
/* Async/Await */

// Define an asynchronous function named loadPage
async function loadPage() { // This makes the function return a promise
  try {
    // Await the resolution of loadProductsFetch()
    // This pauses the execution of loadPage until loadProductsFetch() completes
    await loadProductsFetch();
    
    new Promise((resolve) => {
      loadCart(() => {
      resolve('cart loaded successfully');
      });
    });
  } catch (error) {
    console.error('Error loading products with fetch:', error);
  }
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();

  // Return 'value2' after loadProductsFetch() completes
  // This is similar to resolve('value2') in a promise
  return 'value2'; 
}
loadPage();
