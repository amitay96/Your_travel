//----------------Imports----------------
import "./index.css";
import { validationSettings, editProfilePopup, addCardPopup,
  editProfileButton, addPlaceButton, newNameInput, newTitleInput, avatar, avatarEditPopup } from "../utils/constants.js";
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
  });

const generateCard = (data) => {
  const newCard = new Card({
    data,
    handleCardClick: () => {
      imagePopup.open(data)
      // console.log(api.getInitialCards());
    },
    handleDeleteCard: (id) => {
      deletePopup.open();
      
      deletePopup.setAction(() => {
        api.deleteCard(id).then(res => console.log(res));
        newCard.deleteCard();
      })},
    handleCardlike: (id) => {
      const likeActive = newCard.isLiked();
      if(likeActive) {
        api.toggleLike(id, likeActive).then(res => {
          newCard.updateLikes(res.likes);
          console.log("res", res);
        });
      } else {
        api.toggleLike(id, likeActive).then(res => {
          newCard.updateLikes(res.likes);
          console.log("res", res);
        });
        
      }
    }
  }, userId);
    
  const cardElement = newCard.generateCard();
  return cardElement;
};

const renderCard = (data) => {
  const card = generateCard(data);
  placesSection.addItem(card);
}


const fillProfileForm = () => {
  const info = userInfo.getUserInfo();
  newNameInput.value = info.name;
  newTitleInput.value = info.job;
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

const avatarPopup = new PopupWithForm(".avatar-popup", (data) => {
  console.log(data);
api.setUserAvatar(data.avatar)
.then(userInfo.setUserImage(data.avatar));
});

const imagePopup = new PopupWithImage(".image-popup");

const addPopup = new PopupWithForm(".add-popup", (data) => {
  api.createCard(data).then(res => {
    renderCard(res);
    addPlaceFormValidator.resetValidation();
  })
});

const editPopup = new PopupWithForm(".edit-popup", (data) => {
  api.setUserInfo(data.name, data.title)
  .then(userInfo.setUserInfo(data.name, data.title));
});
  
const profileFormValidator = new FormValidator(validationSettings, editProfilePopup);
const addPlaceFormValidator = new FormValidator(validationSettings, addCardPopup);
const avatarFormValidator = new FormValidator(validationSettings, avatarEditPopup);

  
editPopup.setEventListeners();
addPopup.setEventListeners();
deletePopup.setEventListeners();
profileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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

avatar.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});