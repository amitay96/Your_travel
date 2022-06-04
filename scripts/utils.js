export function openPopupWindow(modalWindow) {
    modalWindow.classList.add("popup__active");
    document.addEventListener("keydown", handleKeyDown);
    modalWindow.addEventListener("mousedown", handleOverlayClick);
}

export function closePopupWindow(modalWindow) {
    modalWindow.classList.remove("popup__active");
    document.removeEventListener("keydown", handleKeyDown);
    modalWindow.removeEventListener("mousedown", handleOverlayClick);
}

export function handleOverlayClick(evt) {
    if(evt.target === evt.currentTarget) {
        const popupOpened = document.querySelector(".popup__active");
        closePopupWindow(popupOpened);
    }
}

export function handleKeyDown(evt) {
    if(evt.key == "Escape") {
        const popupOpened = document.querySelector(".popup__active");
        closePopupWindow(popupOpened);
    }
}
    