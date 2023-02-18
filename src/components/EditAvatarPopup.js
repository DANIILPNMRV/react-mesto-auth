import PopupWithForm from "./PopupWithForm";
import React, { useRef, useState, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onOverlayClick, onUpdateAvatar }) {
  const inputRefObj = useRef();
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRefObj.current.value,
    });
  }
  function handleInputLink(evt) {
    setLink(evt.target.value);
  }
  useEffect(() => {
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_subtitle"
        id="avatar-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
        ref={inputRefObj}
        value={link}
        onChange={handleInputLink}
      />
      <span className="popup__input-error" id="avatar-url-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
