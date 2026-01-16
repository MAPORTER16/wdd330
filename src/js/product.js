import { getLocalStorage, setLocalStorage } from "./utils.mjs";
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
