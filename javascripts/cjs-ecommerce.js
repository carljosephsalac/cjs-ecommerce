// how to create products data
const cjsProducts = [{
  image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090, // save in cents
}, {
  image: 'images/products/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  priceCents: 2095
}, {
  image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adult Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  priceCents: 799
}, {
  image: 'images/products/black-2-slot-toaster.jpg',
  name: '2 Slot Toaster - Black',
  rating: {
    stars: 5,
    count: 2197
  },
  priceCents: 1899
}];

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img src="${product.image}" class="product-image">
      </div>

      <div class="product-name">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10 /*convert to whole number*/}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2) /*convert to decimal(fixed to 2 places)*/}
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}">
          Add to Cart
      </button>
    </div>
  `;   
});

const productsGrid = document.querySelector('.js-products-grid');
productsGrid.innerHTML = productsHTML;

const addToCartBtn = document.querySelectorAll('.js-add-to-cart');
addToCartBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
    const productName = btn.dataset.productName;

    let matchingItem;
    
    // cart.forEach(item => item.productId === productId && (matchingItem = item)); // shorthand

    cart.forEach(item => { // longhand (verbose)
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity++;
    } else {
      cart.push({
        productId: productId,
        productName: productName,
        quantity: 1
      });
    }    
    console.log(cart);
  }); 
});

