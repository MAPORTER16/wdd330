// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

//get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
 //if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Get the total number of items in the cart
export function getCartCount() {
  const cart = getLocalStorage("so-cart") || [];
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

// Update the cart count badge in the header
export function updateCartBadge() {
  const count = getCartCount();
  const badge = document.querySelector(".cart-badge");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

// Remove item from cart by product ID
export function removeFromCart(productId) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter(item => item.Id !== productId);
  setLocalStorage("so-cart", cart);
  return cart;
}

// Calculate cart subtotal
export function getCartSubtotal() {
  const cart = getLocalStorage("so-cart") || [];
  return cart.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + (item.FinalPrice * quantity);
  }, 0);
}
