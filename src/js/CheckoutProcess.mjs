import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
    this.externalServices = new ExternalServices();
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubtotal();
  }

  calculateItemSubtotal() {
    // calculate and display the total amount of items in the cart
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.FinalPrice * (item.quantity || 1),
      0
    );

    const subtotalEl = document.querySelector(`${this.outputSelector} #subtotal`);
    if (subtotalEl) {
      subtotalEl.textContent = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    // Tax: 6% sales tax
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 for first item + $2 for each additional
    const itemCount = this.list.reduce((count, item) => count + (item.quantity || 1), 0);
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    // Order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const outputEl = this.outputSelector;

    const subtotal = document.querySelector(`${outputEl} #subtotal`);
    const tax = document.querySelector(`${outputEl} #tax`);
    const shipping = document.querySelector(`${outputEl} #shipping`);
    const orderTotal = document.querySelector(`${outputEl} #orderTotal`);

    if (subtotal) subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
    if (tax) tax.textContent = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.textContent = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const json = formDataToJSON(form);

    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    const response = await this.externalServices.checkout(json);
    return response;
  }
}
