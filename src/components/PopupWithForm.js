import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)
        this._handleSubmit = handleSubmit;
        this._inputsList = [...this._popupElement.querySelectorAll(".form__input")];
        this._formElement = this._popupElement.querySelector(".form");
    }

    _getInputValues() {
        const inputValues = {};
        
        this._inputsList.forEach((input) => {
            inputValues[input.name]= input.value;
        });
        
        return inputValues;
    }
    
    setInputValues(data) {
        this._inputsList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        this._popupElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }
    
    close() {
        super.close();
        this._formElement.reset();
    }
}