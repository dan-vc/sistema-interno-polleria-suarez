import { orders, products } from '/data/db.js';

document.addEventListener('DOMContentLoaded', () => {
    /* Obtener los elementos HTML */
    const ordersTable = document.getElementById('orders-table-body');
    const actualPageHTML = document.getElementById('actualPage');
    const totalPagesHTML = document.getElementById('totalPages');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const filterStatus = document.getElementById('filter-status');
    const filterReset = document.getElementById('filter-reset');
    const havePagination = nextPage && prevPage && totalPagesHTML;

    /* Renderizar pedidos */
    renderOrders();

    /* Verificar si existen los elementos de paginación */
    if (havePagination) {
        /* Al hacer click en página anterior */
        prevPage.addEventListener('click', () => {
            /* Disminuimos el offset y limit en 10 */
            ordersTable.dataset.offset -= 10
            ordersTable.dataset.limit -= 10
            /* Actualizamos el n° de página */
            actualPageHTML.textContent -= 1
            /* Actualizamos los pedidos */
            renderOrders();
        })

        /* Al hacer click en página siguiente */
        nextPage.addEventListener('click', () => {
            /* Aumentamos el offset y limit en 10 */
            ordersTable.dataset.offset = parseInt(ordersTable.dataset.offset) + 10
            ordersTable.dataset.limit = parseInt(ordersTable.dataset.limit) + 10
            /* Actualizamos el n° de página */
            actualPageHTML.textContent = parseInt(actualPageHTML.textContent) + 1
            /* Actualizamos los pedidos */
            renderOrders();
        })
    }

    /* Verificar si existen los elementos de filtro */
    if (filterStatus && filterReset) {
        /* Detectar el cambio del filtro de estado */
        filterStatus.addEventListener('change', () => {
            ordersTable.dataset.offset = "0"; // Reiniciar a la primera página al cambiar filtro
            actualPageHTML.textContent = "1"; // Actualizar el n° de página
            /* Actualizar los pedidos en base al filtro */
            renderOrders(filterStatus.value)
        })

        /* Detectar si se acciona el reset del filtro */
        filterReset.addEventListener('click', () => {
            filterStatus.value = ""; // Reiniciar filtro
            ordersTable.dataset.offset = "0"; // Volver a la primera página
            actualPageHTML.textContent = "1"; // Actualizar el n° de página
            /* Actualizar los pedidos */
            renderOrders();
        });
    }

    /* Función para mostrar pedidos */
    function renderOrders(status = "") {
        /* Definir los limites de cada página */
        const offset = ordersTable.dataset.offset;
        const limit = ordersTable.dataset.limit;

        let ordersUpdated = orders; // Obtener todos los pedidos

        /* Si existe el filtro de estado */
        if (status) {
            /* Actualizar los pedidos con el filtro */
            ordersUpdated = ordersUpdated.filter(order => order.status.toLowerCase() === status)
        }

        /* Si existen los elementos de paginación */
        if (havePagination) {
            /* Definir el total de páginas en base a los pedidos a mostrar */
            const totalPages = Math.ceil(ordersUpdated.length / limit)
            totalPagesHTML.innerHTML = totalPages;
            /* Actualizar la paginación en base a los pedidos a mostrar */
            updatePagination(ordersUpdated.length);
        }

        /* Actualizar los pedidos segun los límites */
        ordersUpdated = ordersUpdated.slice(offset, limit);


        /* Inicializar la plantila HTML */
        let HTMLTemplate = "";

        /* Recorrer pedidos y añadirlos a la plantilla */
        ordersUpdated.forEach((order) => {
            HTMLTemplate += `
                <tr>
                    <td>
                        <a class="link openPopup" data-target="orderDetailPopup" data-id="${order.id}">${order.id}</a>
                    </td>
                    <td>${order.customer}</td>
                    <td>${order.address}</td>
                    <td>${order.date}</td>
                    <td>S/. ${order.total.toFixed(2)}</td>
                    <td>
                        <div class="tag ${order.status.toLowerCase() === 'pendiente' ? 'tag-pending' : 'tag-success'}">${order.status}</div>
                    </td>
                </tr>
                `
        })

        /* Mostrar la plantilla */
        ordersTable.innerHTML = HTMLTemplate;

    }

    /* Función para actualizar la paginación */
    function updatePagination(totalOrdes) {
        /* Si el offset es igual a cero */
        if (ordersTable.dataset.offset == 0) {
            prevPage.classList.add('disabled') // Deshabilitar el boton de pág. ant.
        } else {
            prevPage.classList.remove('disabled')
        }

        /* Si el límite es mayor o igual al total de pedidos */
        if (ordersTable.dataset.limit >= totalOrdes) {
            nextPage.classList.add('disabled') // Deshabilitar el boton de pág. ant.
        } else {
            nextPage.classList.remove('disabled')
        }
    }


    // Delegación de eventos para los enlaces con clase "openPopup"
    document.addEventListener('click', (event) => {
        /* Si el elemento en el que se hace click tiene la case */
        if (event.target.classList.contains('openPopup')) {
            const orderId = event.target.dataset.id;

            if (event.target.dataset.target === 'orderDetailPopup') {
                
                const popupContent = document.querySelector('#orderDetailPopup .popup-content');
    
                const order = orders.find(order => order.id === orderId)
    
                popupContent.querySelector('#OrderID').innerHTML = order.id;
                popupContent.querySelector('#OrderDate').innerHTML = order.date;
                popupContent.querySelector('#CustomerName').innerHTML = order.customer;
                popupContent.querySelector('#CustomerAddress').innerHTML = order.address;
                popupContent.querySelector('#OrderTotal').innerHTML = order.total.toFixed(2);
    
                let HTMLTemplate = "";
                const orderProducts = products.filter(product => order.products.includes(product.id))
    
                orderProducts.forEach(product => {
                    HTMLTemplate += `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>
                                <div class="quantity">
                                    <div class="icon minus">
                                        <svg width="19" height="18" viewBox="0 0 19 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <rect x="5.71118" y="8.25" width="9" height="1.5" rx="0.75" fill="#222222" />
                                        </svg>
                                    </div>
                                    <p>01</p>
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
                            </td>
                            <td>S/. ${product.price.toFixed(2)}</td>
                            <td>S/. ${product.price.toFixed(2)}</td>
                        </tr>
                    `
                })
    
                popupContent.querySelector('#render-order-products').innerHTML = HTMLTemplate;
            }
        }
    });
})

