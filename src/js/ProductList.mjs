import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
  <li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image.replace('../images', '/images')}" alt="${product.Name}">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>

      <p class="product-card__price">
        $${product.FinalPrice}
        ${
          product.SuggestedRetailPrice > product.FinalPrice
            ? `<span class="original-price">$${product.SuggestedRetailPrice}</span>`
            : ""
        }
      </p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}