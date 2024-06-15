export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

/* 
  If the id from deliveryOptions array is equal to deliveryOptionId from cart.js, 
  return that deliveryOptions object.
*/
export function getDeliveryOption(deliveryOptionId) { // deliveryOptionId is from cart object
  let deliveryOption; // container for matching deliveryOptions.id and deliveryOptionId (cart.deliveryOptionId)
  deliveryOptions.forEach((option) => { // iterate through products array
    if (option.id === deliveryOptionId) { // if option.id is equal to deliveryOptionId (cart.deliveryOptionId)
      deliveryOption = option; // save that option to deliveryOption container      
    }
  });
  // return to get the deliveryOption when this function is called
  return deliveryOption || deliveryOptions[0]; // add default value 
}
