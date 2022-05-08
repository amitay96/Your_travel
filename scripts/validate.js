const showInputError = inputElement => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("form__input_error_visible");
}

const hideInputError = inputElement => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove("form__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input_error_visible");
};

const checkInputValidity = inputElement => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement);
        
    }
    else {
        hideInputError(inputElement);
    }
};

const hasInvalidInput = (inputList) => {
        return inputList.every((inputElement) => inputElement.validity.valid === true);
};

const enableButton = (button) => {
    button.disabled = false;
    button.classList.remove("form__button_disabled");
}

const disableButton = (button) => {
    button.disabled = true;
    button.classList.add("form__button_disabled");
}

const toggleButton = (inputs, button) => {
    if(hasInvalidInput(inputs)) enableButton(button); 
    else 
        disableButton(button);
};

const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    
    formList.forEach(formElement => {
        formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            
        });
        
        const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
        const button = formElement.querySelector(".form__button");
        // toggleButton(inputs, button);

        inputs.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                checkInputValidity(inputElement);
                toggleButton(inputs, button);
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