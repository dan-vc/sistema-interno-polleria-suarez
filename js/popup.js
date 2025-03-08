document.addEventListener("DOMContentLoaded", function () {
    const openPopupElement = document.getElementById("openPopup");
    const closePopupElement = document.getElementById("closePopup");
    const popup = document.getElementById("popup");
    const popupContent = document.querySelector(".popup-content");

    // Mostrar popup
    openPopupElement.addEventListener("click", () => {
        openPopup();
    });

    // Ocultar popup
    closePopupElement.addEventListener("click", function () {
        closePopup();
    });

    // Cerrar al hacer clic fuera del contenido
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closePopup();
        }
    });

    // Cerrar al presionar la tecla ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closePopup();
        }
    });
    

    function openPopup() {
        popup.style.display = "grid";
        setTimeout(() => {
            popup.style.opacity = 1;
            popupContent.style.transform = "translateY(0)";
        });
    }

    function closePopup() {
        popup.style.opacity = 0;
        popupContent.style.transform = "translateY(10px)";

        setTimeout(() => {
            popup.style.display = "none";;
        }, 300);
    }
});