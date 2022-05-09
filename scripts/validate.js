const showInputError = (inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

const hideInputError = (inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
};

const enableButton = (button, {inactiveButtonClass}) => {
    button.disabled = false;
    button.classList.remove(inactiveButtonClass);
}

const disableButton = (button, {inactiveButtonClass}) => {
    button.disabled = true;
    button.classList.add(inactiveButtonClass);
}

const toggleButton = (inputs, button, settings) => {
    if(hasInvalidInput(inputs)) enableButton(button, {inactiveButtonClass}); 
    else 
        disableButton(button, {inactiveButtonClass});
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
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach(formElement => {
        formElement.addEventListener("submit", (evt) => evt.preventDefault());
        
        const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
        const button = formElement.querySelector(settings.submitButtonSelector);

        inputs.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                checkInputValidity(inputElement);
                toggleButton(inputs, button, settings);
            });
        });
    });
};

enableValidation({
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input_error_visible"
}); 