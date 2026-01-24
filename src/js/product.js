import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import Alert from "./Alert.mjs";

const dataSource = new ProductData("tents");
const alert = new Alert("alertContainer");

async function addToCartHandler() {
  const addToCartBtn = document.getElementById("addToCart");
  const productId = addToCartBtn.dataset.id;

  if (!productId) {
    console.error("Product ID missing");
    return;
  }

  const product = await dataSource.findProductById(productId);

  let cartItems = getLocalStorage("so-cart") || [];

  const exists = cartItems.some(item => item.Id === product.Id);

  if (exists) {
    alert.show("This item is already in your cart!", "warning");
    return;
  }

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount();

  alert.show("Item added to cart successfully!", "success");
}


// BUTTON LISTENER
const addToCartBtn = document.getElementById("addToCart");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", addToCartHandler);
}
