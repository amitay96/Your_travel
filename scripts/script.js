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
const editProfilePopup = document.querySelector(".edit-popup");
const addCardPopup = document.querySelector(".add-popup");
const imagePopup = document.querySelector(".image-popup");
const popups = document.querySelectorAll(".popup");
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

const popupImageURL = imagePopup.querySelector(".popup__image");
const popupImageCaption = imagePopup.querySelector(".popup__caption");

const placesList = document.querySelector(".places__list");
const placeTemplate = document.querySelector("#place-template").content.querySelector(".place");

//----------------Functions----------------
function openPopupWindow(modalWindow) {
  modalWindow.classList.add("popup__active");
  closeInputErrors(modalWindow);
  document.addEventListener("keydown", evt => handleKeyDown(evt, modalWindow));
  modalWindow.addEventListener("click", (evt) => handleOverlayClick(evt, modalWindow));
}

function handleOverlayClick(evt, modalWindow) {
  if(evt.target == modalWindow) closePopupWindow(modalWindow);
}

function handleKeyDown(evt, popup) {
  if(evt.key == "Escape") {
    closePopupWindow(popup);
  }
}

function closePopupWindow(modalWindow) {
  modalWindow.classList.remove("popup__active");
  
}

function closeInputErrors(modalWindow) {
  const toClose = modalWindow.querySelectorAll(".form__input");
  toClose.forEach(input => hideInputError(input));
}

function createPlaceElement(card) {
  const placeElement = placeTemplate.cloneNode(true);
  
  const placeImage = placeElement.querySelector(".place__image");
  const placeTitle = placeElement.querySelector(".place__title");
  const placeLike = placeElement.querySelector(".place__like-button");
  const placeDelete = placeElement.querySelector(".place__delete_button");
  
  placeImage.src = card.link;
  placeImage.alt = "some place in the US";
  placeTitle.textContent = card.name;
  
  placeDelete.addEventListener("click", () => placeElement.remove());
  
  placeLike.addEventListener("click", () => toggleLike(placeLike));
  
  placeImage.addEventListener("click", () => {
    openPopupWindow(imagePopup);
    popupImageURL.src = card.link;
    popupImageURL.alt = "some place in the US";
    popupImageCaption.textContent = card.name;
  });
  
  return placeElement;
}

function openEditProfile(editForm) {
  newNameInput.value = profileName.textContent;
  newTitleInput.value = profileTitle.textContent;
  toggleButton([...editForm.querySelectorAll(".form__input")], editForm.querySelector(".form__button"));
  openPopupWindow(editForm);
}

function openAddPlacePopup(cardPopup) {
  cardPopup.querySelector(".form").reset();
  openPopupWindow(cardPopup);
  disableButton(cardPopup.querySelector(".form__button"));
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = newNameInput.value;
  profileTitle.textContent = newTitleInput.value;
  closePopupWindow(editProfilePopup);
}

function handlePlaceFormSubmit(event) {
  event.preventDefault();
  placesList.prepend(createPlaceElement({name: newPlaceNameInput.value, link: newPlaceURLInput.value}));
  addCardPopup.querySelector(".form").reset();
  closePopupWindow(addCardPopup);
}

function toggleLike(card) {
  card.classList.toggle("place__like-button_active");
}

function renderCard(card, wrapper) {
  wrapper.append(createPlaceElement(card));
}

initialCards.forEach(card => renderCard(card, placesList));


//----------------Event handlers----------------
editProfileButton.addEventListener("click", () => openEditProfile(editProfilePopup));

addPlaceButton.addEventListener("click", () => openAddPlacePopup(addCardPopup));

editProfileCloseButton.addEventListener("click", () => closePopupWindow(editProfilePopup));

addPlaceCloseButton.addEventListener("click", () => closePopupWindow(addCardPopup));

imageCloseButton.addEventListener("click", () => closePopupWindow(imagePopup));

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);

addCardPopup.addEventListener("submit", handlePlaceFormSubmit);
