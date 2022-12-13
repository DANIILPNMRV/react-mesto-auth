export default class Card {
  constructor (cardInfo, templateSelector, handleCardClick) {
    this._cardInfo = cardInfo;
    this._templateSelector = templateSelector;
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._handleCardClick = handleCardClick;
  }

   _deleteCard = () => {
   this._element.remove();
   this._element = null;
   }

   _likeCard = () => {
    this._likeBtn.classList.toggle('place__likebtn_active');
   }

    _setEventListeners() {
    this._deleteBtn = this._element.querySelector('.place__deletebtn');
    this._likeBtn = this._element.querySelector('.place__likebtn');
    this._placeImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});
    this._likeBtn.addEventListener('click', this._likeCard);
    this._deleteBtn.addEventListener('click',this._deleteCard);
    }   
    _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.place')
    .cloneNode(true);

    return cardElement;
    }

    createCard() {
    this._element = this._getTemplate();
    this._placeTitle = this._element.querySelector('.place__title');
    this._placeImage = this._element.querySelector('.place__image');
    this._placeImage.src = this._link; 
    this._placeImage.alt = this._name; 
    this._placeTitle.textContent = this._name; 
    this._setEventListeners(); 
    
    return this._element;
  }
}
  