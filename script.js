/* script.js */
// script.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.getElementById('cart-count').innerText = cart.length;
}

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(product.name + ' added to cart!');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = button.parentElement;
      const item = {
        id: product.dataset.id,
        name: product.dataset.name,
        price: parseInt(product.dataset.price)
      };
      addToCart(item);
    });
  });

  if (window.location.pathname.includes('cart.html')) {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalSpan = document.getElementById('cart-total');
    let total = 0;
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
      cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
          <div class="product">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;
      });
    }
    totalSpan.innerText = total;
  }
});

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

function checkout() {
  alert('Order placed successfully!');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
