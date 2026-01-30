import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import Alert from "./Alert.mjs";


const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCartHandler);

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


