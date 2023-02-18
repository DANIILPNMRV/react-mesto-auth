import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [description, setDescription] = useState(""); //это subtitle - теперь дескрипшн
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  function handleNameChange({ target }) {
    setName(target.value);
  }
  function handleDescriptionChange({ target }) {
    setDescription(target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="user-name"
        type="text"
        placeholder="Имя"
        name="username"
        required=""
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name || ""} //при отсут. альтернативы эл-нт будет неотслеживаемым и приведет к ворнингу
        //undefined или null и не должны сюда падать - не ошибка по чек-листу, уточнить
      />
      <span className="popup__input-error" id="user-name-error"></span>
      <input
        className="popup__input popup__input_type_subtitle"
        id="user-surName"
        type="text"
        placeholder="О себе"
        name="usersubtitle"
        required=""
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
        value={description || ""}
      />
      <span className="popup__input-error" id="user-surName-error" />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
