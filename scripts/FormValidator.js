import { validationSettings as settings } from "./script.js";

export class FormValidator {
    constructor(settings, formToCheck) {
        this._form = formToCheck;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }
    
    _hasInvalidInput() {
        return this._inputsList.every((inputElement) => inputElement.validity.valid);
    }
    
    _toggleButton() {
        if(this._hasInvalidInput()) {
            this._enableButton(); 
        }
        else this._disableButton();
    }
    
    _enableButton() {
        this._button.disabled = false;
        this._button.classList.remove(this._inactiveButtonClass);
    }
    
    _disableButton() {
        this._button.disabled = true;
        this._button.classList.add(this._inactiveButtonClass);
    }
    
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        }
        else {
            this._hideInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }
    
    _hideInputError(inputElement) {
        const errorElement = document.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }
    
    _setEventListeners() {
        this._inputsList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._toggleButton();

        this._inputsList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButton();
            });
        });
    }


    enableValidation() {
        this._form.addEventListener("submit", (evt) => evt.preventDefault());
        this._setEventListeners();
    }

    resetValidation() {
        this._toggleButton();
        this._inputsList.forEach((input) => {
            this._hideInputError(input);
        });
    }
}