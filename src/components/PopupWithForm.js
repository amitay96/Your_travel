import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = handleSubmit;
    }

    _getInputValues() {
        this._inputsList = [...this._popupElement.querySelectorAll(".form__input")];
        const inputValues = {};
        
        this._inputsList.forEach((input) => {
            inputValues[input.name]= input.value;
        });
        
        return inputValues;
    }

    setEventListeners() {
        this._popupElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleSubmit(this._getInputValues());
            this.close();
            this._popupElement.querySelector(".form").reset();
        });
        super.setEventListeners();
    }
    
    close() {
        super.close();
    }
}