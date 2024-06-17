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
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
     resolve('cart loaded successfully');
    });
  })
]).then((value1, value2) => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
  // console.log(value1);
  // console.log(value2);
});
