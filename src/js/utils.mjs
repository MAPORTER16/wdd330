export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  const el = qs(selector);
  if (!el) return;

  el.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  el.addEventListener("click", callback);
}

export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) parentElement.innerHTML = "";

  const html = list.map(template).join("");
  parentElement.insertAdjacentHTML(position, html);
}

export function discountIndicator(product) {
  if (product.SuggestedRetailPrice > product.FinalPrice) {
    const discount =
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) *
      100;

    return `<span class="discount-badge">SALE -${Math.round(discount)}%</span>`;
  }

  return "";
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}
