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
  return product
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
 //if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

// Render a single template into a parent element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Load a template from a file path
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Load header and footer templates
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);

  // Update cart count after header loads
  updateCartCount();

  // Initialize back to top button
  initBackToTop();

  // Initialize dark mode toggle
  initDarkMode();
}

// Update cart badge count
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? "flex" : "none";
  }
}

// Initialize back to top button
export function initBackToTop() {
  // Create button if it doesn't exist
  let backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "backToTop";
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "Back to top");
    backToTopBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-8 8h5v8h6v-8h5z" />
      </svg>
    `;
    document.body.appendChild(backToTopBtn);
  }

  // Show/hide on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Initialize dark mode toggle in header
export function initDarkMode() {
  const header = document.querySelector("#main-header");
  if (!header || header.querySelector(".dark-mode-toggle")) return;

  const toggle = document.createElement("button");
  toggle.className = "dark-mode-toggle";
  toggle.setAttribute("aria-label", "Toggle dark mode");
  toggle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
    </svg>
  `;
  header.insertBefore(toggle, header.querySelector(".cart"));

  // Restore saved preference
  if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
  });
}

// Save a product to recently viewed list
export function addToRecentlyViewed(product) {
  const key = "recently-viewed";
  let viewed = JSON.parse(localStorage.getItem(key)) || [];
  // Remove if already exists
  viewed = viewed.filter((p) => p.Id !== product.Id);
  // Add to front
  viewed.unshift({
    Id: product.Id,
    Name: product.NameWithoutBrand,
    Image: product.Images?.PrimaryMedium || product.Image,
    FinalPrice: product.FinalPrice,
  });
  // Keep max 6
  viewed = viewed.slice(0, 6);
  localStorage.setItem(key, JSON.stringify(viewed));
}

// Render recently viewed products section
export function renderRecentlyViewed(parentSelector = "main") {
  const key = "recently-viewed";
  const viewed = JSON.parse(localStorage.getItem(key)) || [];
  if (viewed.length === 0) return;

  const parent = document.querySelector(parentSelector);
  if (!parent || parent.querySelector(".recently-viewed")) return;

  const section = document.createElement("section");
  section.className = "recently-viewed";
  section.innerHTML = `
    <h3>Recently Viewed</h3>
    <ul class="recently-viewed-list">
      ${viewed
        .map(
          (p) => `
        <li>
          <a href="/product_pages/?product=${p.Id}">
            <img src="${p.Image}" alt="${p.Name}">
            <p>${p.Name}</p>
            <p><strong>$${p.FinalPrice}</strong></p>
          </a>
        </li>`
        )
        .join("")}
    </ul>
  `;
  parent.appendChild(section);
}
