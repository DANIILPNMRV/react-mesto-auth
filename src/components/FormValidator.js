export default class FormValidator {
  constructor(validationSelectors, form) {
    this._validationSelectors = validationSelectors;
    this._form = form;
    this._input = this._validationSelectors.input
    this._errorRedline = this._validationSelectors.errorRedline;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonSubmit = validationSelectors.buttonSubmit;
    this._buttonElement = this._form.querySelector(this._buttonSubmit);
  }
  _isValid(input) {
    if (!input.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(input, input.validationMessage); 
    } else {
      // Если проходит, скроем
      this._hideInputError(input);
    }
  }
  _showInputError(input, validationMessage) {
    const { errorRedline, errorVisible } = this._validationSelectors;
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(errorRedline);
    error.textContent = validationMessage;
    error.classList.add(errorVisible);
  };
  _hideInputError(input) {
    const { errorRedline, errorVisible } = this._validationSelectors;
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(errorRedline);
    error.classList.remove(errorVisible);
    error.textContent = '';
  };
  _hasInvalidInput() {
    return this._inputList.some((input) => {
    return !input.validity.valid;
    })
  };
  deactivateButton() {
    this._buttonElement.setAttribute('disabled', true);
  }
  _activateButton() {
    this._buttonElement.removeAttribute('disabled');
  }
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.deactivateButton();
    } else {
    this._activateButton();
    }
  };
 //трем ошибки
  resetErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
  _setEventListeners() {
      this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
      this._isValid(input);
      this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._setEventListeners();
  }
}