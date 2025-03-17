document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("PrintOrderBtn").addEventListener("click", printOrder);

    function printOrder() {
        // Obtener el contenido del contenedor
        const content = document.getElementById("orderDetailPopup").innerHTML;

        // Crear una nueva ventana
        const windowToPrint = window.open();

        // Escribir el contenido en la nueva ventana
        windowToPrint.document.write(`
            <html>
            <head>
                <title>Detalles del Pedido</title>
                <link rel="stylesheet" href="/css/index.css">
                <link rel="stylesheet" href="/css/orders-table.css">
                <link rel="stylesheet" href="/css/popup.css">
                <link rel="stylesheet" href="/css/orderDetailPopup.css">
            </head>
            <body>
                ${content}
            </body>
            </html>`);
        // Cerrar el documento antes de imprimir
        windowToPrint.document.close();

        // Esperar un momento para cargar y luego imprimir
        windowToPrint.onload = function () {
            windowToPrint.print();
            windowToPrint.close();
        };
    }
});