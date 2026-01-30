import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import Alert from "./Alert.mjs";

const dataSource = new ProductData("tents");
const alert = new Alert("alertContainer");

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

  if (exists) {
    alert.show("This item is already in your cart!", "warning");
    return;
  }

  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount();

  alert.show("Item added to cart successfully!", "success");
}

// EVENT LISTENER
if (addToCartBtn) {
  addToCartBtn.addEventListener("click", addToCartHandler);
}
