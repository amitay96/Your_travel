//----------------Imports----------------
import "./styles/index.css";
import Card from "./scripts/Card.js";
import Section from "./scripts/Section.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { validationSettings, initialCards } from "./scripts/constants.js";
import {Popup} from "./scripts/Popup.js";
import {PopupWithImage} from "./scripts/PopupWithImage.js";
import {PopupWithForm} from "./scripts/PopupWithForm.js";
import { UserInfo} from "./scripts/UserInfo.js";

//----------------Modals----------------
const editProfilePopup = document.querySelector(".edit-popup");
const addCardPopup = document.querySelector(".add-popup");

//----------------Buttons----------------
const editProfileButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

//----------------Inputs----------------
const newNameInput = editProfilePopup.querySelector(".form__input[name='name']");
const newTitleInput = editProfilePopup.querySelector(".form__input[name='title']");

const newPlaceNameInput = addCardPopup.querySelector(".form__input[name='place-title']");
const newPlaceURLInput = addCardPopup.querySelector(".form__input[name='image-URL']");

const placesSection = new Section(
    {
    items: initialCards,
    renderer: (data) => renderCard(data) 
    },
  ".places__list"
);

const editPopup = new PopupWithForm(".edit-popup", (data) => userInfo.setUserInfo(data.link, data.name));
const addPopup = new PopupWithForm(".add-popup", (data) => renderCard(data));
const imagePopup = new PopupWithImage(".image-popup");

const profileFormValidator = new FormValidator(validationSettings, editProfilePopup);
const addPlaceFormValidator = new FormValidator(validationSettings, addCardPopup);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title"
});

//----------------Functions----------------

placesSection.renderer();
editPopup.setEventListeners();
addPopup.setEventListeners();


function generateCard(card) {
  const newCard = new Card(card, "#place-template", () => imagePopup.open(card.link, card.name));
  const cardElement = newCard.generateCard();
  return cardElement;
}

function renderCard(card) {
  const element = generateCard(card);
  placesSection.addItem(element);
}

profileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

// function handlePlaceFormSubmit(event) {
//   event.preventDefault();
//   renderCard({name: newPlaceNameInput.value, link: newPlaceURLInput.value}, placesList);
//   addPlaceFormValidator.resetValidation();
// }

//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  newNameInput.value = info.name;
  newTitleInput.value = info.job;
  profileFormValidator.resetValidation();
  editPopup.open();
});

addPlaceButton.addEventListener("click", () => {
  addPlaceFormValidator.resetValidation();
  addPopup.open();
});

