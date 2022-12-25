import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmBtn = this._popup.querySelector('.popup__savebtn');
    this._form = this._popup.querySelector('.popup__form');
  } 


waitingUpdate(waiting) {
  if (waiting) {
    this._confirmBtn.textContent = "Удаляем...";
  } else {
    this._confirmBtn.textContent = "Да";
  }
}

changeSubmitBtn(newSubmitHandler) {
  this._handleSubmitBtn = newSubmitHandler;
}

setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    this._handleSubmitBtn();
  });
}
}
