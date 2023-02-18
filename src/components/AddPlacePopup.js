import PopupWithForm from './PopupWithForm';
import React, { useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onOverlayClick, onAddPlace }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleInputTitle(evt) {
    setTitle(evt.target.value);
  }
  function handleInputLink(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace(title, link);
  }

    return(
      <PopupWithForm
      isOpen={isOpen}
      title="Новое место"
      name="picture"
      buttonText="Создать"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}>
        <input
        className="popup__input popup__input_type_name"
        id="mesto-name"
        type="text"
        placeholder="Название"
        name="name"
        required=""
        minLength="2" 
        maxLength="30"
        value={title}
        onChange={handleInputTitle}
        />
        <span
        className="popup__input-error"
        id="mesto-name-error">
        </span>
        <input
        className="popup__input popup__input_type_subtitle"
        id="mesto-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
        value={link}
        onChange={handleInputLink}
        />
        <span
        className="popup__input-error"
        id="mesto-url-error">
        </span>
      </PopupWithForm>
    )
}
export default AddPlacePopup;
