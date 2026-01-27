import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function cartItemTemplate(item, index) {
  const quantity = item.quantity || 1;
  const itemTotal = (item.FinalPrice * quantity).toFixed(2);
  const imageSrc = item.Images?.PrimaryMedium || item.Image || '';
  const colorName = item.Colors?.[0]?.ColorName || 'N/A';

  return `<li class="cart-card divider" data-index="${index}">
    <button class="remove-item" data-index="${index}" aria-label="Remove item">&times;</button>
    <a href="/product_pages/?product=${item.Id}" class="cart-card__image">
      <img src="${imageSrc}" alt="${item.Name}" />
    </a>
    <a href="/product_pages/?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${colorName}</p>
    <p class="cart-card__quantity">qty: ${quantity}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <p class="cart-card__total">Item Total: $${itemTotal}</p>
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
    this.addEventListeners();
  }

  renderCartContents(cartItems) {
    const parentElement = document.querySelector(this.parentSelector);

    if (!cartItems || cartItems.length === 0) {
      parentElement.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty.</p>
          <a href="/" class="continue-shopping">Continue Shopping</a>
        </div>`;
      this.hideCartFooter();
      return;
    }

    // Render cart items with index
    const htmlStrings = cartItems.map((item, index) => cartItemTemplate(item, index));
    parentElement.innerHTML = htmlStrings.join('');

    // Calculate and display subtotal
    this.updateSubtotal(cartItems);
    updateCartCount();
  }

  updateSubtotal(cartItems) {
    const subtotal = cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + (item.FinalPrice * quantity);
    }, 0);

    let cartFooter = document.querySelector(".cart-footer");
    if (!cartFooter) {
      cartFooter = document.createElement("div");
      cartFooter.className = "cart-footer";
      document.querySelector("main").appendChild(cartFooter);
    }

    cartFooter.innerHTML = `
      <div class="cart-summary">
        <div class="cart-summary-row">
          <span>Subtotal:</span>
          <span class="cart-subtotal">$${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <a href="/checkout/index.html" class="checkout-btn">Proceed to Checkout</a>
      <button class="empty-cart-btn">Empty Cart</button>
      <a href="/" class="continue-shopping-link">Continue Shopping</a>
    `;

    cartFooter.style.display = "block";
  }

  hideCartFooter() {
    const cartFooter = document.querySelector(".cart-footer");
    if (cartFooter) {
      cartFooter.style.display = "none";
    }
  }

  addEventListeners() {
    // Remove item buttons
    document.querySelector(this.parentSelector).addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const index = parseInt(e.target.dataset.index);
        this.removeItem(index);
      }
    });

    // Empty cart button (delegated)
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("empty-cart-btn")) {
        this.emptyCart();
      }
    });
  }

  removeItem(index) {
    const cartItems = getLocalStorage(this.key) || [];
    cartItems.splice(index, 1);
    setLocalStorage(this.key, cartItems);
    this.renderCartContents(cartItems);
  }

  emptyCart() {
    if (confirm("Are you sure you want to empty your cart?")) {
      setLocalStorage(this.key, []);
      this.renderCartContents([]);
    }
  }
}
