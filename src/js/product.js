import { getLocalStorage, setLocalStorage, updateCartBadge, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  // Ensure cartItems is always an array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  //Check if the product already exists in cart
  const existingItem = cartItems.find((item) => item.Id === product.Id);

  if (existingItem) {
    //If it exists, increase quantity
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    //if new, add with quantity 1
    product.quantity = 1;
    cartItems.push(product);
  }

  setLocalStorage("so-cart", cartItems);
  updateCartBadge();
  showAddedToCartMessage();
}

function showAddedToCartMessage() {
  // Create notification if it doesn't exist
  let notification = document.querySelector(".cart-notification");
  if (!notification) {
    notification = document.createElement("div");
    notification.className = "cart-notification";
    document.body.appendChild(notification);
  }

  notification.textContent = "Item added to cart!";
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Render product details on the page
function renderProductDetails(product) {
  const productSection = document.querySelector(".product-detail");
  const imageSrc = product.Images?.PrimaryMedium || product.Image;

  productSection.innerHTML = `
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${imageSrc}"
      alt="${product.Name}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors?.[0]?.ColorName || ""}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple || ""}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;

  // Add event listener to the new button
  document
    .getElementById("addToCart")
    .addEventListener("click", () => addProductToCart(product));
}

// Initialize the product page
async function init() {
  const productId = getParam("product");

  if (productId) {
    const product = await dataSource.findProductById(productId);
    if (product) {
      renderProductDetails(product);
    }
  }

  updateCartBadge();
}

init();
