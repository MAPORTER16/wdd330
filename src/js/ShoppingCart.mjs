import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.renderCartContents(list);
  }

  renderCartContents(cartItems) {
    const parentElement = document.querySelector(this.parentSelector);

    if (!cartItems || cartItems.length === 0) {
      parentElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    renderListWithTemplate(cartItemTemplate, parentElement, cartItems, "afterbegin", true);

    // Calculate and display cart total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);
    const totalEl = document.getElementById("cart-total");
    const totalAmount = document.getElementById("total-amount");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (totalEl && totalAmount) {
      totalAmount.textContent = `$${total.toFixed(2)}`;
      totalEl.style.display = "block";
    }
    if (checkoutBtn) {
      checkoutBtn.style.display = "block";
    }
  }
}
