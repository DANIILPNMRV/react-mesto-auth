import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isAvatarPopupOpened, setIsAvatarPopupOpened] = useState(false);
  const [isProfilePopupOpened, setIsProfilePopupOpened] = useState(false);
  const [isPicturePopupOpened, setIsPicturePopupOpened] = useState(false);
  const [isСonfirmPopupOpened, setIsСonfirmPopupOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isInfoPopupOpened, setInfoPopupOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserAvatar(), api.getInitialCards()])
        .then(([currentUser, cards]) => {
          setCurrentUser(currentUser);
          setCards(cards);
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [loggedIn]); //пригодился, сюда - логгед

  //что будет при 1ом входе?
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

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
  function handleInfoPopupClick() {
    setInfoPopupOpened(true);
  }
  function closeAllPopups() {
    setSelectedCard(null);
    setIsAvatarPopupOpened(false);
    setIsProfilePopupOpened(false);
    setIsPicturePopupOpened(false);
    setIsСonfirmPopupOpened(false);
    setInfoPopupOpened(false);
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

  //регистрация юзера
  function handleRegister(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        handleInfoPopupClick();
        setIsSuccessful(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        handleInfoPopupClick();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  //логин юзера
  function handleLogin(email, password) {
    return auth
      .login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        handleInfoPopupClick();
        setIsSuccessful(false);
        console.log(err);
      });
  }

  //выход юзера - забираем токен
  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setEmail("");
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
        <Header email={email} loggedIn={loggedIn} onSignOut={signOut} />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                handleRegister={handleRegister}
                name="register"
                title="Регистрация"
                buttonText="Зарегистрироваться"
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                name="login"
                title="Вход"
                buttonText="Войти"
              />
            }
          />
          <Route
            path="/"
            element={
              <>
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddCard={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleLikeClick}
                  onCardDelete={handleDeleteClick}
                  cards={cards}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
        </Routes>
        <PopupWithForm
          isOpen={isСonfirmPopupOpened}
          title="Вы уверены?"
          name="confirm"
          buttonText="Да"
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        ></PopupWithForm>

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
        <InfoTooltip
          isOpen={isInfoPopupOpened}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
          onOverlayClick={handleOverlayClick}
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
