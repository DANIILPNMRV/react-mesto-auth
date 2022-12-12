import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupSubtitle = this._popup.querySelector('.popup__subtitle');
  }
  // метод вместо openFullSreen
  open(name, link) {
    super.open();
    this._popupPhoto.src = link; 
    this._popupPhoto.setAttribute('alt', name); 
    this._popupSubtitle.textContent = name;
  }
}