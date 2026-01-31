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
document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = document.getElementById("checkout-form");

  const isValid = form.checkValidity();
  form.reportValidity();

  if (isValid) {
    myCheckout.checkout(form);
  }
});
