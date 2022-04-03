const profile = document.querySelector(".profile");
const form = document.querySelector(".form");
const popup = document.querySelector(".popup");

const editProfileButton = profile.querySelector(".profile__edit-button");
const profileName = profile.querySelector(".profile__name");
const profileTitle = profile.querySelector(".profile__title");

const inputName = form.querySelector(".form__input[name='name']");
const inputTitle = form.querySelector(".form__input[name='title']");

const closeButton = popup.querySelector(".popup__close-button");

function openForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  popup.classList.add("popup__active");
}

function closeForm() {
  popup.classList.remove("popup__active");
}

function formHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closeForm();
}

editProfileButton.addEventListener("click", openForm);
closeButton.addEventListener("click", closeForm);
form.addEventListener("submit", formHandler);
