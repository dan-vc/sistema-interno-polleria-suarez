import { products } from '/data/db.js';

document.addEventListener('DOMContentLoaded', () => {
    const productsWrapper = document.getElementById('render-products');

    renderProducts();

    function renderProducts() {
        const offset = productsWrapper.dataset.offset;
        const limit = productsWrapper.dataset.limit;
        const haveAddButton = productsWrapper.dataset.addBtn;
        const haveStockQuantity = productsWrapper.dataset.stockQuantity === 'true';
        
        const productsUpdated = products.slice(offset, limit);

        const addProductHTML = haveAddButton ? `
            <span class="product-add-icon">
                <svg width="24" height="24" viewBox="0 0 19 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect x="5.28857" y="8.25" width="9" height="1.5" rx="0.75" fill="#fff" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.5386 5.0625V12.9375C10.5386 13.2482 10.2028 13.5 9.78857 13.5C9.37436 13.5 9.03857 13.2482 9.03857 12.9375V5.0625C9.03857 4.75184 9.37436 4.5 9.78857 4.5C10.2028 4.5 10.5386 4.75184 10.5386 5.0625Z"
                        fill="#fff" />
                </svg>
            </span>
        ` : '';

        let HTMLTemplate = "";

        productsUpdated.forEach(product => {
            const stockHTML = haveStockQuantity ? `
            <div class="product-stock">
                <h3>Stock</h3>
                <div class="quantity">
                    <div class="icon minus">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="5.71118" y="8.25" width="9" height="1.5" rx="0.75" fill="#222222" />
                        </svg>
                    </div>
                    <p>${product.stock}</p>
                    <div class="icon plus">
                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="5.28857" y="8.25" width="9" height="1.5" rx="0.75" fill="#222222" />
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10.5386 5.0625V12.9375C10.5386 13.2482 10.2028 13.5 9.78857 13.5C9.37436 13.5 9.03857 13.2482 9.03857 12.9375V5.0625C9.03857 4.75184 9.37436 4.5 9.78857 4.5C10.2028 4.5 10.5386 4.75184 10.5386 5.0625Z"
                                fill="#222222" />
                        </svg>
                    </div>
                </div>
            </div>
        ` : '';

            HTMLTemplate += `
                <div class="product-card__wrapper">
                    <div class="product-card">
                        <img src="${product.img}" alt="Imagen del Producto">
                        <img src="${product.img}" alt="Imagen del Producto Difuminada">
                        <div class="product-info">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                            <span class="price">S/. ${product.price.toFixed(2)}</span>
                        </div>
                        ${stockHTML}
                        ${addProductHTML}
                    </div>
                </div>
                `
        })

        productsWrapper.innerHTML = HTMLTemplate;
    }
})

