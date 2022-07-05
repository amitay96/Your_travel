import { PopupWithImage } from "./PopupWithImage.js";


export default class Card {
    constructor({data, handleCardClick, handleDeleteCard, handleCardlike}, userId) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleCardlike = handleCardlike;
        this._id = data._id;
        this._likes = data.likes;

        this._userId = userId;
        this._ownerId = data.owner._id;
    }

    _getTemplate() {
        const cardElement = document.querySelector("#place-template")
            .content.querySelector('.place').cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._placeImage = this._element.querySelector(".place__image");
        const placeTitle = this._element.querySelector(".place__title");
        
        this._placeImage.src = this._link;
        this._placeImage.alt = `Photo of ${this._name}`;
        placeTitle.textContent = this._name;
        this._element.querySelector(".place__likes-count").textContent = this._likes.length;
        
        if(this._userId !== this._ownerId) {
            this._element.querySelector(".place__delete_button").style.display = "none";
        }
        
        this.updateLikes(this._likes);
        this._setEventListeners();

        return this._element;
    }
    
    _setEventListeners() {
        this._element.querySelector(".place__like-button")
            .addEventListener("click", () => this._handleCardlike(this._id));
        this._element.querySelector(".place__delete_button")
            .addEventListener("click", () => this._handleDeleteCard(this._id));
        this._placeImage.addEventListener("click", () => this._handleCardClick());
    }

    deleteCard = () => {
        this._element.remove();
        this._element = null;
    }

    updateLikes(newLikes) {
        this._likes = newLikes;
        this._element.querySelector(".place__likes-count").textContent = this._likes.length;
        if(this.isLiked()) this._element.querySelector(".place__like-button")
            .classList.add("place__like-button_active");
        else this._element.querySelector(".place__like-button")
            .classList.remove("place__like-button_active");
    }

    isLiked() {
        return this._likes.some((person) => person._id === this._userId);
    }
    
}