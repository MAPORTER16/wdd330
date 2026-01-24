import ProductData from "./ProductData.mjs";
import { getParam, getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import Alert from "./Alert.mjs";

const dataSource = new ProductData("tents");
const alert = new Alert("alertContainer");

async function init() {
  const productId = getParam("product");
  
  if (!productId) {
    console.error("Product ID not found in URL");
    return;
  }

  try {
    const product = await dataSource.findProductById(productId);
    
    if (!product) {
      console.error("Product not found");
      return;
    }

    renderProductDetails(product);
    
    document.getElementById("addToCart").addEventListener("click", () => {
      addProductToCart(product);
    });

    updateCartCount();
  } catch (error) {
    console.error("Error loading product:", error);
  }
}

function renderProductDetails(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const img = document.getElementById("productImage");
  img.src = product.Image;
  img.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;
}

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart") || [];
  
  const exists = cartItems.some((item) => item.Id === product.Id);
  
  if (exists) {
    alert.show("This item is already in your cart!", "warning");
    return;
  }
  
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  updateCartCount();
  
  alert.show("Item added to cart!", "success");
}

init();
