//----------------Imports----------------
import "./index.css";
import { validationSettings, editProfilePopup, addCardPopup,
  editProfileButton, addPlaceButton, avatar, avatarEditPopup } from "../utils/constants.js";
import Card from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";

//----------------Functions----------------

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userId = userData._id;
    placesSection.renderer(cardData);
    fillProfileSection(userData);
  }).catch(res => console.log(res));

const generateCard = (data) => {
  const newCard = new Card({
    data, 
    handleCardClick: () => imagePopup.open(data),
    handleDeleteCard: (id) => {
      deletePopup.open();
      deletePopup.setAction(() => {
        deletePopup.handleLoading(true, "Deleting...");
        api.deleteCard(id).then(() => {
          newCard.deleteCard();
          deletePopup.close();
        }).catch(err => console.log("error", err))
          .finally(() => deletePopup.handleLoading(false));
        
      })},
    handleCardlike: (id) => {
      const likeActive = newCard.isLiked();
      if(likeActive) {
        api.toggleLike(id, likeActive).then(res => {
          newCard.updateLikes(res.likes);
        }).catch(res => console.log(res));
      } else {
        api.toggleLike(id, likeActive).then(res => {
          newCard.updateLikes(res.likes);
        }).catch(res => console.log(res));
      }
    }
  }, "#place-template", userId);
    
  const cardElement = newCard.generateCard();
  return cardElement;
};

const renderCard = (data) => {
  const card = generateCard(data);
  placesSection.addItem(card);
}

function fillProfileSection(res) {
  userInfo.setUserInfo(res.name, res.about);
  userInfo.setUserImage(res.avatar);
}

//----------------Classes initialization----------------
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__title",
  imageSelector: ".profile__image"
});

const placesSection = new Section(
  {
    renderer: renderCard
  },
  ".places__list"
);

//----------------Popups----------------
const deletePopup = new PopupWithSubmit(".delete-popup");

const imagePopup = new PopupWithImage(".image-popup");

const avatarPopup = new PopupWithForm(".avatar-popup", (data) => {
  avatarPopup.handleLoading(true)
  api.setUserAvatar(data.avatar)
    .then(() => {
      userInfo.setUserImage(data.avatar);
      avatarPopup.close();
    }).catch(err => console.log(err))
    .finally(() => avatarPopup.handleLoading(false));
});

const addPopup = new PopupWithForm(".add-popup", (data) => {
  addPopup.handleLoading(true, "Creating...");
  api.createCard(data).then(res => {
    renderCard(res);
    addPopup.close();
  }).catch(err => console.log(err))
  .finally(() => addPopup.handleLoading(false));
});

const editPopup = new PopupWithForm(".edit-popup", (data) => {
  editPopup.handleLoading(true);
  api.setUserInfo(data.name, data.job)
  .then(() => {
    userInfo.setUserInfo(data.name, data.job);
    editPopup.close();
  }).catch(err => console.log(err))
  .finally(() => editPopup.handleLoading(false));
});

//----------------Form Validators----------------
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

//----------------Event listeners----------------
editPopup.setEventListeners();
addPopup.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => {
  formValidators["edit-form"].resetValidation();
  editPopup.open();
  editPopup.setInputValues(userInfo.getUserInfo());
});

addPlaceButton.addEventListener("click", () => {
  formValidators["add-form"].resetValidation();
  addPopup.open();
});

avatar.addEventListener("click", () => {
  formValidators[ "edit-avatar-form"].resetValidation();
  avatarPopup.open();
});