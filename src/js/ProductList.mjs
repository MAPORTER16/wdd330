import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    // Calculate discount badge if FinalPrice < SuggestedRetailPrice
    let discountBadge = '';
    if (product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice) {
        const discountPercent = Math.round((1 - product.FinalPrice / product.SuggestedRetailPrice) * 100);
        discountBadge = `<span class="discount-badge">${discountPercent}% OFF</span>`;
    }

    return `<li class="product-card">
    ${discountBadge}
    <a href="/product_pages/?product=${product.Id}">
    <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p>
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
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        //next render the list
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
    }
}
