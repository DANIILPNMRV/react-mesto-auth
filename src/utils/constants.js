const validationConfig = { 
  form: '.popup__form', //форма 
  input: '.popup__input', //инпуты 
  buttonSubmit: '.popup__savebtn', //сохр кнопка 
  error: 'popup__input-error', //спан 
  errorRedline: 'popup__input_error', // красная линия 
  errorVisible: 'popup__input-error_active' // спан вид 
}; 
const profilePopup = document.querySelector('.popup-profile'); 
const picturePopup = document.querySelector('.popup-picture');
// const confirmPopup = document.querySelector('.popup-confirm');//?проверить
const avatarPopup = document.querySelector('.popup-avatar');

const openButton = document.querySelector('.profile__editbtn');
const plusButton = document.querySelector('.profile__addbtn'); 
// const userEdit = document.querySelector('[name="userinformation"]');
// const cardAdd = document.querySelector('[name="pictureInfo"]');
const avatar = document.querySelector('.profile__avatar');

//формы попапов
const profileForm = profilePopup.querySelector('.popup__form');
const pictureForm = picturePopup.querySelector('.popup__form');
const avatarForm = avatarPopup.querySelector('.popup__form');

//кнопка аватара (сам аватар) 
const avatarBtn = document.querySelector('.profile__avatar');

export { 
  validationConfig, 
  profilePopup, 
  picturePopup, 
  avatarPopup,
  openButton, 
  plusButton, 
  profileForm, 
  pictureForm, 
  avatarForm, 
  avatarBtn,
  avatar };