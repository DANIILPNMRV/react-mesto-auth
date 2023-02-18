import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api'
import CurrentUserContext from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isAvatarPopupOpened, setIsAvatarPopupOpened] = useState(false);
  const [isProfilePopupOpened, setIsProfilePopupOpened] = useState(false);
  const [isPicturePopupOpened, setIsPicturePopupOpened] = useState(false);
  const [isСonfirmPopupOpened, setIsСonfirmPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
      Promise.all([api.getUserAvatar(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);/// попробовать через currentUser - не забыть!
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
    }, []); 

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
  // api лайки
  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  //api удал
  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((thisCard) => thisCard._id !== card._id)
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  //api юзерданные
  function handleUpdateUser({ name, about }) {
    api
      .editUserProfile(name, about)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  //api смена аватара юзера
  function handleUpdateAvatar(avatar) {
    api
      .updateProfilePicture(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  //api новая card
  function handleAddPlaceSubmit(name, link) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main
      onEditProfile={handleEditProfileClick}
      onEditAvatar={handleEditAvatarClick}
      onAddCard={handleAddPlaceClick}
      onCardClick={handleCardClick}
      onCardLike={handleLikeClick}
      onCardDelete={handleDeleteClick}
      cards={cards}
      />
      <Footer />
      <PopupWithForm
      isOpen={isСonfirmPopupOpened}
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}>
      </PopupWithForm>

      <AddPlacePopup
      isOpen={isPicturePopupOpened}
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}
      onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup
      isOpen={isAvatarPopupOpened}
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}
      onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
      isOpen={isProfilePopupOpened}
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}
      onUpdateUser={handleUpdateUser}
      />

      <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
      onOverlayClick={handleOverlayClick}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
