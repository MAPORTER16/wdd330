import { renderListWithTemplate } from './utils.mjs';
import { productCardTemplate } from './main.js';

export default class ProductList {
    constructor(catagory, datasource, listElement) {
        this.category = category
        this.datasource = datasource;
        this.listElement = listElement;
    }

    async init() {
        // the dataSource will return a Promise...so you can use await to resolve it.
        const list = await this.dataSpource.getData();
        //next render the list
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
    }
}
