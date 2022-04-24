const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


//----------------Modals----------------
const profile = document.querySelector(".profile");
const form = document.querySelector(".form");
const editPopup = document.querySelector(".edit-popup");
const addPopup = document.querySelector(".add-popup");
const imagePopup = document.querySelector(".image-popup");
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");
const inputName = form.querySelector(".form__input[name='name']");
const inputTitle = form.querySelector(".form__input[name='title']");

//----------------Buttons and DOM elements----------------
const editProfileButton = profile.querySelector(".profile__edit-button");
const editCloseButton = editPopup.querySelector(".popup__close-button");
const addPlaceButton = profile.querySelector(".profile__add-button");
const addCloseButton = addPopup.querySelector(".popup__close-button");
const imageCloseButton = imagePopup.querySelector(".popup__close-button");

const inputPlace = form.querySelector(".form__input[name='place-title']");
const inputURL = form.querySelector(".form__input[name='image-URL']");

//----------------Wrappers----------------

const placesList = document.querySelector(".places__list");


//----------------Functions----------------
function togglePopupWindow(modalWindow) {
  if(modalWindow.classList.contains("edit-popup")) {
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
  }
  modalWindow.classList.toggle("popup__active");
}

function formHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  togglePopupWindow(editPopup);
}

function createPlaceElement(card) {
  const placeTemplate = document.querySelector("#place-template").content.querySelector(".place");
  const placeElement = placeTemplate.cloneNode(true);

  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeLike = placeElement.querySelector(".place__like-button");

  placeImage.src = card.link;
  placeTitle.textContent = card.name;

  placeImage.addEventListener("click", () => imagePreview(card));

  placeLike.addEventListener("click", () => likeClick(card));
  
  return placeElement;
}

function renderCard(card, wrapper) {
  wrapper.append(createPlaceElement(card));
}

function likeClick(card) {
  // card.classList.add(".place__like-button_active");
  card.content.placeLike.classList.toggle(".place__like-button_active");
}

// const imagePreview = card => {
//   togglePopupWindow(card);
// };

initialCards.forEach(card => renderCard(card, placesList));

//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => togglePopupWindow(editPopup));

addPlaceButton.addEventListener("click", () => togglePopupWindow(addPopup));

editCloseButton.addEventListener("click", () => togglePopupWindow(editPopup));

addCloseButton.addEventListener("click", () => togglePopupWindow(addPopup));

imageCloseButton.addEventListener("click", () => togglePopupWindow(imagePopup));

form.addEventListener("submit", formHandler);
