//----------------Imports----------------
import "./index.css";
import { initialCards, validationSettings, editProfilePopup, addCardPopup,
  editProfileButton, addPlaceButton, newNameInput, newTitleInput } from "../utils/constants.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

// api.getInitialCards().then(res => {
//   placesSection.renderer();
// });

// api.getUserInfo().then(res => {
//   console.log(res);
// });
console.log(api.getInitialCards());

//----------------Functions----------------
const generateCard = (data) => {
  const newCard = new Card(data, "#place-template", () => imagePopup.open(data.link, data.name));
  const cardElement = newCard.generateCard();
  return cardElement;
}

const renderCard = (data) => {
  const card = generateCard(data);
  placesSection.addItem(card);
}

const fillProfileForm = () => {
  const info = userInfo.getUserInfo();
  newNameInput.value = info.name;
  newTitleInput.value = info.job;
}

//----------------Classes initialization----------------
const placesSection = new Section(
    {
    items: api.getInitialCards(),
    renderer: renderCard
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


// placesSection.renderer();
editPopup.setEventListeners();
addPopup.setEventListeners();
profileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => {
  profileFormValidator.resetValidation();
  editPopup.open();
  fillProfileForm();
});

addPlaceButton.addEventListener("click", () => {
  addPlaceFormValidator.resetValidation();
  addPopup.open();
});