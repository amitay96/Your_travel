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


//----------------Modals----------------
const profile = document.querySelector(".profile");
const editPopup = document.querySelector(".edit-popup");
const addPopup = document.querySelector(".add-popup");
const imagePopup = document.querySelector(".image-popup");

//----------------Buttons----------------
const editProfileButton = profile.querySelector(".profile__edit-button");
const editCloseButton = editPopup.querySelector(".popup__close-button");

const addPlaceButton = profile.querySelector(".profile__add-button");
const addCloseButton = addPopup.querySelector(".popup__close-button");

const imageCloseButton = imagePopup.querySelector(".popup__close-button");

//----------------Inputs----------------
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");

const inputName = editPopup.querySelector(".form__input[name='name']");
const inputTitle = editPopup.querySelector(".form__input[name='title']");

const inputPlace = addPopup.querySelector(".form__input[name='place-title']");
const inputURL = addPopup.querySelector(".form__input[name='image-URL']");

const popupURL = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");

//----------------Functions----------------
function togglePopupWindow(modalWindow) {
  if(modalWindow.classList.contains("edit-popup")) {
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
  }
  modalWindow.classList.toggle("popup__active");
}


function createPlaceElement(card) {
  const placeTemplate = document.querySelector("#place-template").content.querySelector(".place");
  const placeElement = placeTemplate.cloneNode(true);
  
  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeLike = placeElement.querySelector(".place__like-button");
  const placeDelete = placeElement.querySelector(".place__delete_button");
  
  placeImage.src = card.link;
  placeTitle.textContent = card.name;
  
  placeDelete.addEventListener("click", () => placeElement.remove());
  
  placeLike.addEventListener("click", () => placeLike.classList.toggle("place__like-button_active"));

  placeImage.addEventListener("click", () => {
    togglePopupWindow(imagePopup);
    popupURL.src = card.link;
    popupCaption.textContent = card.name;
  });
  
  return placeElement;
}

function editFormHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  togglePopupWindow(editPopup);
}

function addPlaceHandler(event) {
  event.preventDefault();
  placesList.prepend(createPlaceElement({name: inputPlace.value, link: inputURL.value}));
  addPopup.querySelector(".form").reset();
  togglePopupWindow(addPopup);
}

function renderCard(card, wrapper) {
  wrapper.append(createPlaceElement(card));
}

initialCards.forEach(card => renderCard(card, placesList));

//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => togglePopupWindow(editPopup));

addPlaceButton.addEventListener("click", () => togglePopupWindow(addPopup));

editCloseButton.addEventListener("click", () => togglePopupWindow(editPopup));

addCloseButton.addEventListener("click", () => togglePopupWindow(addPopup));

imageCloseButton.addEventListener("click", () => togglePopupWindow(imagePopup));

editPopup.addEventListener("submit", editFormHandler);

addPopup.addEventListener("submit", addPlaceHandler);
