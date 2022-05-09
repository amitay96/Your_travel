const validationSettings = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input_error_visible"
};

const showInputError = (inputElement, settings) => {
    const {inputErrorClass, errorClass} = settings;
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (inputElement, settings) => {
    const {inputErrorClass, errorClass} = settings;
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
};

const enableButton = (button, settings) => {
    const {inactiveButtonClass} = settings;
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
}

const disableButton = (button, settings) => {
    const {inactiveButtonClass} = settings;
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
}

const toggleButton = (inputs, button, settings) => {
    if(hasInvalidInput(inputs)) enableButton(button, settings); 
    else 
        disableButton(button, settings);
};

const checkInputValidity = (inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, settings);
        
    }
    else {
        hideInputError(inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
        return inputList.every((inputElement) => inputElement.validity.valid === true);
};

const enableValidation = (settings) => {
    const {formSelector,inputSelector, submitButtonSelector, ...rest} = settings;
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach(formElement => {
        formElement.addEventListener("submit", (evt) => evt.preventDefault());
        
        const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
        const button = formElement.querySelector(settings.submitButtonSelector);

        inputs.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                checkInputValidity(inputElement, rest);
                toggleButton(inputs, button, rest);
            });
        });
    });
};

enableValidation(validationSettings);