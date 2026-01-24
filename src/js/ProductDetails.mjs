import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";
import Alert from "./Alert.mjs";

const alert = new Alert("alertContainer");

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      ?.addEventListener("click", this.addProductToCart.bind(this));
  }
  
  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];
    
    const exists = cartItems.some(
      (item) => item.Id === this.product.Id
    );
    
    if (exists) {
      alert.show("This item is already in your cart!", "warning");
      return;
    }
    
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
    
    alert.show("Item added to cart!", "success");
  }


  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const img = document.getElementById("productImage");
  img.src = product.Image;
  img.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = `$${product.FinalPrice}`;
  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}