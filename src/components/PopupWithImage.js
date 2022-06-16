import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(image, caption) {
        this._popupImage = this._popupElement.querySelector(".popup__image");
        const imageCaption = this._popupElement.querySelector(".popup__caption");

        this._popupImage.src = image;
        this._popupImage.alt =  `Photo of ${caption}`;
        imageCaption.textContent = caption;
        super.setEventListeners();
        super.open();
    }
}