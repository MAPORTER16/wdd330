import { getLocalStorage, setLocalStorage, updateCartCount, addToRecentlyViewed, renderRecentlyViewed } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        //use the datasource to get the details fot the current product. findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, and a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));

        // Track recently viewed and render section
        addToRecentlyViewed(this.product);
        renderRecentlyViewed();
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        updateCartCount();
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    // Check for discount and display appropriately
    const priceElement = document.getElementById('productPrice');
    if (product.SuggestedRetailPrice && product.FinalPrice < product.SuggestedRetailPrice) {
        const discountPercent = Math.round((1 - product.FinalPrice / product.SuggestedRetailPrice) * 100);
        const savings = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);

        // Create and prepend discount flag
        const discountFlag = document.createElement('div');
        discountFlag.className = 'discount-flag';
        discountFlag.innerHTML = `
            <span class="discount-percent">${discountPercent}% OFF</span>
            <span class="discount-savings">You save $${savings}!</span>
        `;
        document.querySelector('.product-detail').prepend(discountFlag);

        // Show original and sale price
        priceElement.innerHTML = `
            <span class="original-price">$${product.SuggestedRetailPrice}</span>
            <span class="sale-price">$${product.FinalPrice}</span>
        `;
    } else {
        priceElement.textContent = `$${product.FinalPrice}`;
    }

    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
}
