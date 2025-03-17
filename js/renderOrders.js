import { orders } from '/data/db.js';

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
            const orderId = event.target.getAttribute('data-id');
            const popupContent = document.querySelector('#orderDetailPopup .popup-content');

            const order = orders.find(order => order.id === orderId)

            popupContent.querySelector('#OrderID').innerHTML = order.id;
            popupContent.querySelector('#OrderDate').innerHTML = order.date;
            popupContent.querySelector('#CustomerName').innerHTML = order.customer;
            popupContent.querySelector('#CustomerAddress').innerHTML = order.address;
            popupContent.querySelector('#OrderTotal').innerHTML = order.total.toFixed(2);

        }
    });
})

