import "./index.css"
import Card  from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

import { 
  validationConfig,
  openButton,
  plusButton,
  profileForm,
  pictureForm,
  avatarForm,
  avatarBtn } from '../utils/constants.js';

import { api } from '../components/Api.js';
// import { data } from "autoprefixer"; што это и откуда префиксер???

const userValidate = new FormValidator(validationConfig, profileForm);
const cardValidate = new FormValidator(validationConfig, pictureForm);
const avatarValidate = new FormValidator(validationConfig, avatarForm)
userValidate.enableValidation();
cardValidate.enableValidation();
avatarValidate.enableValidation();

let userId;
Promise.all([api.getUserAvatar(), api.getInitialCards()])
.then(([userData, cards]) => {
  userId = userData._id;
  userInfo.setUserInfo(userData);
  newSection.renderCards(cards);
})

  .catch((err) => console.log(err))
  .finally(() => {});

  const newSection = new Section((card) => createNewCard(card), '.places__list');

const userInfo = new UserInfo({
  username: '.profile__name',
  subtitleUser: '.profile__subtitle',
  userAvatar: '.profile__avatar',
});

const userInfoEdit = new PopupWithForm('#profilePopup', (data) => {
  const { username, usersubtitle } = data;
  userInfoEdit.waitingUpdate(true);
  api
  .editUserProfile(username, usersubtitle)
  .then((data) => {
  userInfo.setUserInfo(data);
  userInfoEdit.close();
  })
  .catch((err) => console.log(err))
  .finally(() => userInfoEdit.waitingUpdate(false));
  });

  userInfoEdit.setEventListeners();

  const popupNewPhoto = new PopupWithForm('#picturePopup', (cardInfo) => {
    popupNewPhoto.waitingUpdate(true);
    const { name, link } = cardInfo;
    api
    .addCard(name, link)
    .then((newCardInfo) => {
      const card = createNewCard(newCardInfo);
      newSection.addItem(card);
      popupNewPhoto.close();
      cardValidate.deactivateButton();
    })
    .catch((err) => console.log(err))
    .finally(() => popupNewPhoto.waitingUpdate(false));
  });
  popupNewPhoto.setEventListeners();

const fullsreenCard = new PopupWithImage('#fullScreenImage');
fullsreenCard.setEventListeners();

const confirmDeletePopup = new PopupWithConfirm('#confirmPopup');
confirmDeletePopup.setEventListeners();

const userProfilePopup = new PopupWithForm('.popup-avatar',
(data) => {
  userProfilePopup.waitingUpdate(true);
  api
  .updateUserAvatar(data)
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userProfilePopup.close();
  })
  .catch((err) => console.log(err))
  .finally(() => userProfilePopup.waitingUpdate(false));
  });
  userProfilePopup.setEventListeners();

const createNewCard = (cardInfo) => {
  const card = new Card(cardInfo, '.template', (name,link) => { fullsreenCard.open(name, link); },
  (id) => {
    confirmDeletePopup.open();
    confirmDeletePopup.changeSubmitBtn(() => {
      confirmDeletePopup.waitingUpdate(true);
      api
      .deleteCard(id)
      .then((res) => {
        card.deleteThatCard();
        confirmDeletePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => confirmDeletePopup.waitingUpdate(false));
    });
  },
  (id) => {
    if (card.isLiked()) {
      api
      .deleteLike(id)
      .then((data) => {
        card.addLike(data.likes);
      })
      .catch((err) => console.log(err));//не забыть прописать логику виз. ошибки после пр
    } else {
      api
      .addLike(id)
      .then((data) => {
        card.addLike(data.likes);
      })
      .catch((err) => console.log(err));
    }
  },
  userId
  );
  return card.createCard();
};

avatarBtn.addEventListener('click', () => {
  avatarValidate.resetErrors();
  userProfilePopup.open();
});

openButton.addEventListener('click', () => {
  userInfoEdit.setInputValues(userInfo.getUserInfo());
  userValidate.deactivateButton();
  userValidate.resetErrors();
  userInfoEdit.open();
});

plusButton.addEventListener('click', () => {
  cardValidate.resetErrors();
  popupNewPhoto.open();
});

