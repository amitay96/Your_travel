//----------------Constants----------------
const initialCards = [
  {
    name: "Antelope Canyon",
    link: "https://images.unsplash.com/photo-1527285489-efa8f4ea8b0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
  },
  {
    name: "Salt Creek Falls",
    link: "https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
  },
  {
    name: "Truckee",
    link: "https://images.unsplash.com/photo-1516683179282-b7f603ab6eba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
  },
  {
    name: "Lake Powell",
    link: "https://images.unsplash.com/photo-1516557139510-13450f7d3124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    name: "Grand Canyon Village",
    link: "https://images.unsplash.com/photo-1482709746041-1adc5a8aef00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    name: "Miami Beach",
    link: "https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];
  
const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input_error_visible"
};

//----------------Modals----------------
const editProfilePopup = document.querySelector(".edit-popup");
const addCardPopup = document.querySelector(".add-popup");
const avatarEditPopup = document.querySelector(".avatar-popup");

//----------------Buttons----------------
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const avatar = document.querySelector(".profile__image-container");

export {
  initialCards, validationSettings, editProfilePopup, addCardPopup,
  editProfileButton, addPlaceButton, avatar, avatarEditPopup
};