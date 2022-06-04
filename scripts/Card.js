import * as all from "./script.js";

export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.place').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._placeImage = this._element.querySelector(".place__image");
        this._placeTitle = this._element.querySelector(".place__title");
        
        this._placeImage.src = this._link;
        this._placeImage.alt = `Photo of ${this._name}`;
        this._placeTitle.textContent = this._name;

        this._cardEventListeners();

        return this._element;
    }
    
    _cardEventListeners() {
        const placeLike = this._element.querySelector(".place__like-button");
        const placeDelete = this._element.querySelector(".place__delete_button");

        placeLike.addEventListener("click", () => this._toggleCardLike(placeLike));
        placeDelete.addEventListener("click", () => this._element.remove());

        this._placeImage.addEventListener("click", () => {
            all.openPopupWindow(all.imagePopup);
            all.popupImageURL.src = this._link;
            all.popupImageCaption.alt = `Photo of ${this._name}`;
            all.popupImageCaption.textContent = this._name;
        });
    }

    _toggleCardLike() {
        this._element.querySelector(".place__like-button").classList.toggle("place__like-button_active");
    }
    
}