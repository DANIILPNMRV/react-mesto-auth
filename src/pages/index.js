import "./index.css"
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/InitialCards.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { validationConfig, openButton, plusButton, userEdit, cardAdd } from '../utils/constants.js';



const newSection = new Section({
  items: initialCards,
  renderer: (cardInfo) => {
    const card = createNewCard(cardInfo);
    newSection.addItem(card);
  }
  }, '.places__list');

const createNewCard = (cardInfo) => {
  const card = new Card(cardInfo, '.template', (name,link) => { fullsreenCard.open(name, link) });
  return card.createCard()
}

const fullsreenCard = new PopupWithImage('#fullScreenImage');
fullsreenCard.setEventListeners();

newSection.renderCards();

// валидаторы (запуск) на формы - отдельно
const userValidate = new FormValidator(validationConfig, userEdit);
const cardValidate = new FormValidator(validationConfig, cardAdd);
userValidate.enableValidation();
cardValidate.enableValidation();

const userInfo = new UserInfo({
  username: '.profile__name',
  subtitleUser: '.profile__subtitle',
});

const userInfoEdit = new PopupWithForm('#profilePopup', (inputValues) => {
  userInfoEdit.close();
  userInfo.setUserInfo(inputValues);
});
userInfoEdit.setEventListeners();

const popupNewPhoto = new PopupWithForm('#picturePopup', (cardInfo) => {
  const card = createNewCard(cardInfo);
  newSection.addItem(card);
  popupNewPhoto.close();
});
popupNewPhoto.setEventListeners();

openButton.addEventListener('click', () => {
  userInfoEdit.setInputValues(userInfo.getUserInfo());
  userValidate.deactivateButton();
  userValidate.resetErrors();
  userInfoEdit.open();
});

plusButton.addEventListener('click', () => {
  cardValidate.resetErrors();
  cardValidate.deactivateButton();
  popupNewPhoto.open();
});