// import {card as data} from "./script.js";

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
        const placeImage = this._element.querySelector(".place__image");
        const placeTitle = this._element.querySelector(".place__title");
        
        placeImage.src = this._link;
        placeImage.alt = `Photo of ${this._name}`;
        placeTitle.textContent = this._name;

        this._cardEventListeners();

        return this._element;
    }
    
    _cardEventListeners() {
        const placeLike = this._element.querySelector(".place__like-button");
        const placeDelete = this._element.querySelector(".place__delete_button");

        placeLike.addEventListener("click", () => this._toggleCardLike(placeLike));
        placeDelete.addEventListener("click", () => this._element.remove());

        // placeImage.addEventListener("click", () => {
        //     openPopupWindow(imagePopup);
        //     popupImageURL.src = card.link;
        //     popupImageURL.alt = `Photo of ${card.name}`;
        //     popupImageCaption.textContent = card.name;
        // });
    }

    _toggleCardLike() {
        this._element.querySelector(".place__like-button").classList.toggle("place__like-button_active");
    }
    
}