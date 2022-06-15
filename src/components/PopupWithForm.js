import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
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
            this._submitHandler(this._getInputValues());
            this.close();
        });
        super.setEventListeners();
    }
    
    close() {
        this._popupElement.querySelector(".form").reset();
        super.close();
    }
}