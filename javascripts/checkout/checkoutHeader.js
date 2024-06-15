import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const headerHTML = `${calculateCartQuantity()} items`;
  const cartQuantity = document.querySelector('.js-return-to-home-link');
  cartQuantity.innerHTML = headerHTML;
}