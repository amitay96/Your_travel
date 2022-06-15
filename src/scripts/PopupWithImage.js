import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(image, caption) {
        this._popupImage = this._popupElement.querySelector(".popup__image");
        this._popupImage.src = image;
        this._popupImage.alt =  `Photo of ${caption}`;
        this._popupElement.querySelector(".popup__caption").textContent = caption;
        super.open();
    }
}