import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../utils/InitialCards.js';
import PopupWithImage from '../components/PicturePopup.js';
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
  const card = new Card(cardInfo, '.template', (name,link) => { openFullSreen.open(name, link) });
  return card.createCard()
}

const openFullSreen = new PopupWithImage('#fullScreenImage');
openFullSreen.setEventListeners();

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

const editUserInfo = new PopupWithForm('#profilePopup', (inputValues) => {
  editUserInfo.close();
  userInfo.setUserInfo(inputValues);
});
editUserInfo.setEventListeners();

const popupNewPhoto = new PopupWithForm('#picturePopup', (cardInfo) => {
  const card = createNewCard(cardInfo);
  newSection.addItem(card);
  popupNewPhoto.close();
  cardValidate.deactivateButton();
});
popupNewPhoto.setEventListeners();

openButton.addEventListener('click', () => {
  editUserInfo.setInputValues(userInfo.getUserInfo());
  userValidate.deactivateButton();
  userValidate.resetErrors();
  editUserInfo.open();
});

plusButton.addEventListener('click', () => {
  cardValidate.resetErrors();
  popupNewPhoto.open();
});