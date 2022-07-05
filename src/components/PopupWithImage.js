import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
    }

    open(data) {
        this._popupImage = this._popupElement.querySelector(".popup__image");
        const imageCaption = this._popupElement.querySelector(".popup__caption");

        this._popupImage.src = data.link;
        this._popupImage.alt =  `Photo of ${data.name}`;
        imageCaption.textContent = data.name;
        super.setEventListeners();
        super.open();
    }
}