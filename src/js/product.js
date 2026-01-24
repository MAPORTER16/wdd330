import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import Alert from "./Alert.mjs";
import { updateCartCount } from "./utils.mjs";


const dataSource = new ProductData("tents");

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];

  const existing = cartItems.find(item => item.Id === product.Id);
  if (existing) {
    alert("Product already in cart!");
  } else {
    cartItems.push(product);
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
    alert("Product added to cart!");
  }
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);