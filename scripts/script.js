//----------------Imports----------------
import Card from "./Card.js";
import { openPopupWindow, closePopupWindow, handleOverlayClick, handleKeyDown } from "./utils.js";
import { FormValidator } from "./FormValidator.js";
//----------------Data----------------
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

export const validationSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input_error_visible"
};

//----------------Modals----------------
const profile = document.querySelector(".profile");
const editProfilePopup = document.querySelector(".edit-popup");
const addCardPopup = document.querySelector(".add-popup");
export const imagePopup = document.querySelector(".image-popup");

//----------------Buttons----------------
const editProfileButton = profile.querySelector(".profile__edit-button");
const editProfileCloseButton = editProfilePopup.querySelector(".popup__close-button");

const addPlaceButton = profile.querySelector(".profile__add-button");
const addPlaceCloseButton = addCardPopup.querySelector(".popup__close-button");

const imageCloseButton = imagePopup.querySelector(".popup__close-button");

//----------------Inputs----------------
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");

const newNameInput = editProfilePopup.querySelector(".form__input[name='name']");
const newTitleInput = editProfilePopup.querySelector(".form__input[name='title']");

const newPlaceNameInput = addCardPopup.querySelector(".form__input[name='place-title']");
const newPlaceURLInput = addCardPopup.querySelector(".form__input[name='image-URL']");

export const popupImageURL = imagePopup.querySelector(".popup__image");
export const popupImageCaption = imagePopup.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");
export const placeTemplate = document.querySelector("#place-template").content.querySelector(".place");


const profileFormValidator = new FormValidator(validationSettings, editProfilePopup);
const addPlaceFormValidator = new FormValidator(validationSettings, addCardPopup);
//----------------Functions----------------

profileFormValidator.enableValidation();

function openEditProfile(editForm) {
  profileFormValidator.resetValidation();
  fillProfileForm();
  openPopupWindow(editForm);
}

function fillProfileForm() {
  newNameInput.value = profileName.textContent;
  newTitleInput.value = profileTitle.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = newNameInput.value;
  profileTitle.textContent = newTitleInput.value;
  closePopupWindow(editProfilePopup);
}

function openAddPlacePopup(cardPopup) {
  addPlaceFormValidator.enableValidation();
  openPopupWindow(cardPopup);
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  const formButton = addCardPopup.querySelector(".form__button");
  const newCard = new Card({name: newPlaceNameInput.value, link: newPlaceURLInput.value}, ".place");
  placesList.prepend(newCard);
  addCardPopup.querySelector(".form").reset();
  closePopupWindow(addCardPopup);
}

initialCards.forEach(card => {
  const place = new Card(card, "#place-template");
  const cardElement = place.generateCard();
  placesList.append(cardElement);
});

//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => openEditProfile(editProfilePopup));

addPlaceButton.addEventListener("click", () => openAddPlacePopup(addCardPopup));

editProfileCloseButton.addEventListener("click", () => closePopupWindow(editProfilePopup));

addPlaceCloseButton.addEventListener("click", () => closePopupWindow(addCardPopup));

imageCloseButton.addEventListener("click", () => closePopupWindow(imagePopup));

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);

addCardPopup.addEventListener("submit", handlePlaceFormSubmit);
