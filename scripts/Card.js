import { imagePopup, popupImageURL, popupImageCaption} from "./script.js";
import { openPopupWindow} from "./utils.js";


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
        const placeTitle = this._element.querySelector(".place__title");
        
        this._placeImage.src = this._link;
        this._placeImage.alt = `Photo of ${this._name}`;
        placeTitle.textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
    
    _setEventListeners() {
        const placeLike = this._element.querySelector(".place__like-button");
        const placeDelete = this._element.querySelector(".place__delete_button");

        placeLike.addEventListener("click", this._toggleCardLike);
        placeDelete.addEventListener("click", () => this._element.remove());        // "this._element = null;" is not working

        this._placeImage.addEventListener("click", () => {
            openPopupWindow(imagePopup);
            popupImageURL.src = this._link;
            popupImageCaption.alt = `Photo of ${this._name}`;
            popupImageCaption.textContent = this._name;
        });
    }

    _toggleCardLike = () => {
        const likeButton = this._element.querySelector(".place__like-button");
        likeButton.classList.toggle("place__like-button_active");
    }
    
}