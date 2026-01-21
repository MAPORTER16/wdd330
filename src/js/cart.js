import {
  getLocalStorage,
  removeFromCart,
  getCartSubtotal,
  updateCartBadge,
} from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  if (!cartItems || cartItems.length === 0) {
    productList.innerHTML = `
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a href="/index.html" class="continue-shopping">Continue Shopping</a>
      </div>`;
    if (cartFooter) cartFooter.style.display = "none";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // Show cart footer with subtotal
  if (cartFooter) {
    cartFooter.style.display = "block";
    updateCartSubtotal();
  }

  // Add event listeners to remove buttons
  addRemoveListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider" data-id="${item.Id}">
  <button class="remove-item" data-id="${item.Id}" aria-label="Remove ${item.Name} from cart">
    <span>&times;</span>
  </button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images?.PrimaryMedium || item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${(item.FinalPrice * (item.quantity || 1)).toFixed(2)}</p>
</li>`;

  return newItem;
}

function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemoveItem);
  });
}

function handleRemoveItem(e) {
  const productId = e.currentTarget.dataset.id;
  removeFromCart(productId);
  renderCartContents();
  updateCartBadge();
}

function updateCartSubtotal() {
  const subtotal = getCartSubtotal();
  const subtotalElement = document.querySelector(".cart-subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }
}

// Initialize cart
renderCartContents();
updateCartBadge();
