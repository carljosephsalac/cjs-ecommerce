import { cart, calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import toCents from "../utils/money.js";

export function renderPaymentSummary() {
  /* MODEL */
  let productPriceCents = 0; 
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const estimatedTaxCents = totalBeforeTaxCents * 0.1;
  const orderTotalCents = totalBeforeTaxCents + estimatedTaxCents;

  /* VIEW */
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div class"js-items-quantity">Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">$${toCents(productPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${toCents(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${toCents(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${toCents(estimatedTaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${toCents(orderTotalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  
  console.log(`Items: $${toCents(productPriceCents)}`);
  console.log(`Shipping and handling: $${toCents(shippingPriceCents)}`);
  console.log(`Total before tax: $${toCents(totalBeforeTaxCents)}`);
  console.log(`Estimated tax (10%): $${toCents(estimatedTaxCents)}`);
  console.log(`Order total: $${toCents(orderTotalCents)}`);
}