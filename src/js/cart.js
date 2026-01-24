import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");

  if (!productList) return;

  productList.innerHTML = cartItems.map(cartItemTemplate).join("");

  addRemoveListeners();
  renderCartTotal(cartItems);
  updateCartCount();
}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}">
    </a>

    <h2 class="card__name">${item.Name}</h2>

    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>

    <button class="remove-from-cart" data-id="${item.Id}">
      Remove
    </button>
  </li>`;
}

function renderCartTotal(cartItems) {
  const totalElement = document.getElementById("cartTotal");
  if (!totalElement) return;

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice),
    0
  );

  totalElement.textContent = total.toFixed(2);
}

function addRemoveListeners() {
  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.id);
    });
  });
}

function removeFromCart(productId) {
  const cartItems = (getLocalStorage("so-cart") || []).filter(
    (item) => item.Id !== productId
  );

  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

renderCartContents();
