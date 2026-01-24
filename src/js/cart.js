import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  addRemoveListeners(); // attach remove button listeners
  renderCartTotal(cartItems); // update total every time cart is rendered
  updateCartCount(); // update cart icon superscript
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="remove-from-cart" data-id="${item.Id}">Remove</button>
  </li>`;
}

// TOTAL CALCULATOR
function renderCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.FinalPrice); // make sure it's a number
  }, 0);

  document.getElementById("cartTotal").textContent = total.toFixed(2);
}

// REMOVE BUTTON
function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      removeFromCart(productId);
    });
  });
}

function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter(item => item.Id !== productId);
  setLocalStorage("so-cart", cartItems); // save updated cart
  renderCartContents(); // re-render cart and total
}

// INITIAL RENDER
renderCartContents();
