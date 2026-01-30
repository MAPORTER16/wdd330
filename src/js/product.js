import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import Alert from "./Alert.mjs";


// BUTTON
const addToCartBtn = document.getElementById("addToCart");

async function addToCartHandler() {
  const productId = addToCartBtn.dataset.id;

  if (!productId) {
    alert.show("Product ID missing", "error");
    return;
  }

  const product = await dataSource.findProductById(productId);

  let cartItems = getLocalStorage("so-cart") || [];

  const exists = cartItems.some(item => item.Id === product.Id);

function addToCartHandler() {
  // Grab product info and save to localStorage
  const product = {
    id: getParam("product"),
    name: document.querySelector("h3").innerText,
    price: document.getElementById("productPrice").innerText,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Added to cart!");
}

// EVENT LISTENER
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", addToCartHandler);
}
