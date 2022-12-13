import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitBtn) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._handleSubmitBtn = handleSubmitBtn;
  } 

  _getInputValues() {
    this._inputs = {};
    this._inputList.forEach((input) => {
      this._inputs[input.name] = input.value;
    });
    return this._inputs;
  }
    setInputValues(info) {
      this._inputList.forEach(input => {
        input.value = info[input.name];
      })
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitBtn(this._getInputValues());
      this.close();
      });
    
    }

    close() {
          this._form.reset();
          super.close();
        }

    
}
