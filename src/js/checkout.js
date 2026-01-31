import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", "#order-summary");
myCheckout.init();

// Calculate order total when zip code is filled in
document.getElementById("zip").addEventListener("blur", () => {
  myCheckout.calculateOrderTotal();
});

// Handle form submission
document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = document.getElementById("checkout-form");

  try {
    const response = await myCheckout.checkout(form);
    console.log("Order response:", response);
    alert("Order placed successfully!");
  } catch (err) {
    console.error("Checkout error:", err);
    alert("There was a problem placing your order. Please try again.");
  }
});
