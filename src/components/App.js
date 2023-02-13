import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { useState } from 'react';

function App() {
  const [isAvatarPopupOpened, setIsAvatarPopupOpened] = useState(false);
  const [isProfilePopupOpened, setIsProfilePopupOpened] = useState(false);
  const [isPicturePopupOpened, setIsPicturePopupOpened] = useState(false);
  const [isСonfirmPopupOpened, setIsСonfirmPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  };

  function handleEditAvatarClick() {
    setIsAvatarPopupOpened(true);
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpened(true);
  }
  function handleAddPlaceClick() {
    setIsPicturePopupOpened(true);
  }
  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }
  function closeAllPopups() {
    setSelectedCard(null);
    setIsAvatarPopupOpened(false);
    setIsProfilePopupOpened(false);
    setIsPicturePopupOpened(false);
    setIsСonfirmPopupOpened(false);
  }
  return (
    <div className="page">
      <Header />
      <Main
      onEditProfile={handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddCard={handleAddPlaceClick}
      onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
      isOpen={isProfilePopupOpened}
      title="Редактировать профиль"
      name="profile"
      buttonText="Сохранить"
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}>
        <input
        className ="popup__input popup__input_type_name"
        id="user-name"
        type="text"
        placeholder=""
        name="username"
        required=""
        minLength="2"
        maxLength="40"
        />
        <span
        className="popup__input-error"
        id="user-name-error"
        >
        </span>
        <input
        className ="popup__input popup__input_type_subtitle"
        id="user-surName"
        type="text"
        placeholder=""
        name="usersubtitle"
        required=""
        minLength="2"
        maxLength="200"
        />
        <span
        className="popup__input-error"
        id="user-surName-error"
        />
      </PopupWithForm>

      <PopupWithForm
      isOpen={isPicturePopupOpened}
      title="Новое место"
      name="picture"
      buttonText="Создать"
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}>
        <input
        className="popup__input popup__input_type_name"
        id="mesto-name"
        type="text"
        placeholder="Название"
        name="name"
        required=""
        minLength="2" 
        maxLength="30"
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
        />
        <span
        className="popup__input-error"
        id="mesto-url-error">
        </span>
      </PopupWithForm>

      <PopupWithForm
      isOpen={isСonfirmPopupOpened}
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}>
      </PopupWithForm>

      <PopupWithForm
      isOpen={isAvatarPopupOpened}
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}>
        <input
        className="popup__input popup__input_type_subtitle"
        id="avatar-url"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required=""
        />
        <span
        className="popup__input-error"
        id="avatar-url-error">
        </span>
      </PopupWithForm>

      <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}
      />
    </div>
  );
}

export default App;
