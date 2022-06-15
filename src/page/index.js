//----------------Imports----------------
import "./index.css";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validationSettings, editProfilePopup, addCardPopup,
  editProfileButton, addPlaceButton, newNameInput, newTitleInput } from "../components/constants.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import { UserInfo} from "../components/UserInfo.js";



//----------------Classes initialization----------------
const placesSection = new Section(
    {
    items: initialCards,
    renderer: (data) => renderCard(data) 
    },
  ".places__list"
);

const editPopup = new PopupWithForm(".edit-popup", (data) => userInfo.setUserInfo(data.name, data.title));
const addPopup = new PopupWithForm(".add-popup", (data) => {
  renderCard(data);
  addPlaceFormValidator.resetValidation();
});
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
profileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

function generateCard(data) {
  const newCard = new Card(data, "#place-template", () => imagePopup.open(data.link, data.name));
  const cardElement = newCard.generateCard();
  return cardElement;
}

function renderCard(data) {
  const card = generateCard(data);
  placesSection.addItem(card);
}

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