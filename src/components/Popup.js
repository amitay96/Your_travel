export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._submitButton = this._popupElement.querySelector(".form__button");
        
        if (this._submitButton) {
            this._submitButtonText = this._submitButton.textContent;
        }
    }

    open() {
        this._popupElement.classList.add("popup__active");
        document.addEventListener("keydown", this._handleEscClose);
        this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
    }

    close() {
        this._popupElement.classList.remove("popup__active");
        document.removeEventListener("keydown", this._handleEscClose);
        this._popupElement.removeEventListener("mousedown", this._handleOverlayClick);
    }

    _handleEscClose = (evt) => {
        if(evt.key == "Escape") {
            this.close();
        }
    }

    _handleOverlayClick = (evt) => {
        if(evt.target === evt.currentTarget) {
            this.close();
        }
    }

    handleLoading(isLoading, loadingText = "Saving...") {
        if (this._submitButton) {
            if (isLoading) {
                this._submitButton.textContent = loadingText;
            } else {
                this._submitButton.textContent = this._submitButtonText;
            }
        }
    }

    setEventListeners() {
        const closeButton =  this._popupElement.querySelector(".popup__close-button");
        closeButton.addEventListener("mousedown", () => this.close());
    }
}