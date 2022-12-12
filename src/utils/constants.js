const validationConfig = { 
  form: '.popup__form', //форма 
  input: '.popup__input', //инпуты 
  buttonSubmit: '.popup__savebtn', //сохр кнопка 
  error: 'popup__input-error', //спан 
  errorRedline: 'popup__input_error', // красная линия 
  errorVisible: 'popup__input-error_active' // спан вид 
}; 

const profilePopup = document.querySelector('#profilePopup'); 
const picturePopup = document.querySelector('#picturePopup');
const openButton = document.querySelector('.profile__editbtn');
const plusButton = document.querySelector('.profile__addbtn'); 
const userEdit = document.querySelector('[name="userinformation"]');
const cardAdd = document.querySelector('[name="pictureInfo"]');

export { validationConfig, profilePopup, picturePopup, openButton, plusButton, userEdit, cardAdd };