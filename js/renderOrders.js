import { orders } from '/data/db.js';

document.addEventListener('DOMContentLoaded', () => {
    const ordersTable = document.getElementById('orders-table-body');
    const actualPageHTML = document.getElementById('actualPage');
    const totalPagesHTML = document.getElementById('totalPages');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const filterStatus = document.getElementById('filter-status');
    const filterReset = document.getElementById('filter-reset');

    renderOrders();

    if (nextPage && prevPage && totalPagesHTML) {
        prevPage.addEventListener('click', () => {
            ordersTable.dataset.offset -= 10
            ordersTable.dataset.limit -= 10
            actualPageHTML.textContent -= 1
            renderOrders();
        })
        nextPage.addEventListener('click', () => {
            ordersTable.dataset.offset = parseInt(ordersTable.dataset.offset) + 10
            ordersTable.dataset.limit = parseInt(ordersTable.dataset.limit) + 10
            actualPageHTML.textContent = parseInt(actualPageHTML.textContent) + 1
            renderOrders();
        })
    }


    if (filterStatus && filterReset) {
        filterStatus.addEventListener('change', () => {
            ordersTable.dataset.offset = "0"; // Reiniciar a la primera página al cambiar filtro
            actualPageHTML.textContent = "1";
            renderOrders(filterStatus.value)
        })

        filterReset.addEventListener('click', () => {
            filterStatus.value = ""; // Resetear filtro
            ordersTable.dataset.offset = "0"; // Volver a la primera página
            actualPageHTML.textContent = "1";
            renderOrders();
        });
    }

    function renderOrders(status = "") {
        const offset = ordersTable.dataset.offset;
        const limit = ordersTable.dataset.limit;

        let ordersUpdated = orders;

        if (status) {
            ordersUpdated = ordersUpdated.filter(order => order.status.toLowerCase() === status)
        }

        if (nextPage && prevPage && totalPagesHTML) {
            const totalPages = Math.ceil(ordersUpdated.length / limit)
            totalPagesHTML.innerHTML = totalPages;
            updatePagination(ordersUpdated.length);
        }

        ordersUpdated = ordersUpdated.slice(offset, limit);


        let HTMLTemplate = "";

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

        ordersTable.innerHTML = HTMLTemplate;

    }

    function updatePagination(totalOrdes) {
        if (ordersTable.dataset.offset == 0) {
            prevPage.classList.add('disabled')
        } else {
            prevPage.classList.remove('disabled')
        }
        if (ordersTable.dataset.limit >= totalOrdes) {
            nextPage.classList.add('disabled')
        } else {
            nextPage.classList.remove('disabled')
        }
    }


    // Delegación de eventos para los enlaces con clase "openPopup"
    document.addEventListener('click', (event) => {
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

