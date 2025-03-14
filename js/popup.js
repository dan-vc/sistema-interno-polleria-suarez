document.addEventListener("DOMContentLoaded", function () {
    
    // Delegación de eventos para los enlaces con clase "openPopup"
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('openPopup')) {
            const popup = document.getElementById(event.target.dataset.target);
            const closePopupElement = popup.querySelector("#closePopup");
            openPopup(popup);


            // Ocultar popup
            closePopupElement.addEventListener("click", function () {
                closePopup(popup);
            });

            // Cerrar al hacer clic fuera del contenido
            popup.addEventListener("click", function (event) {
                if (event.target === popup) {
                    closePopup(popup);
                }
            });

            // Cerrar al presionar la tecla ESC
            document.addEventListener("keydown", function (event) {
                if (event.key === "Escape") {
                    closePopup(popup);
                }
            });
        }
    });


    function openPopup(popup) {
        popup.style.display = "grid";
        setTimeout(() => {
            popup.style.opacity = 1;
            popup.querySelector(".popup-content").style.transform = "translateY(0)";
        });
    }

    function closePopup(popup) {
        popup.style.opacity = 0;
        popup.querySelector(".popup-content").style.transform = "translateY(10px)";

        setTimeout(() => {
            popup.style.display = "none";;
        }, 300);
    }
});