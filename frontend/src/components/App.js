import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { useState, useEffect, useCallback } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isBigPhotoPopupOpen, setIsBigPhotoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({ email: "" });
  const [isInfoTooltipInformation, setInfoTooltipInformation] = useState({
    title: "Вы успешно зарегистрировались!",
    icon: true,
  });
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  function handleInfoTooltip() {
    setInfoTooltipPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsBigPhotoPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsBigPhotoPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function closeByOverlay(event) {
    if (event.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInformation(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          console.log(currentUser);
          setData({ email: userData.email });
          setCards(cardsData);
        })
        .catch((err) => {
          console.error(err);
        });
      history.push("/main");
    }
  }, [history, loggedIn]);

  function handleUpdateUser({ name, about }) {
    api
      .addUserInfo({ name: name, about: about })
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => console.log(`Ошибка отправки информации${err}`))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .addUserAvatar({ avatar: avatar })
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => console.log(`Ошибка отправки информации${err}`))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name: name, link: link })
      .then((result) => {
        setCards([result, ...cards]);
      })
      .catch((err) => console.log(`Ошибка отправки информации${err}`))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleCardLike(card, isLiked) {
    (!isLiked ? api.addLike(card._id) : api.deleteLike(card._id))
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка отправки информации${err}`));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then((newCard) => {
        const removeCard = cards.filter((c) => c._id !== card._id);
        setCards(removeCard);
      })
      .catch((err) => console.log(`Ошибка отправки информации${err}`));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((result) => {
        handleInfoTooltip();
        history.push("/signin");
      })
      .catch((err) => {
        handleInfoTooltip();
        setInfoTooltipInformation({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: false,
        });
        history.push("/signup");
        console.log(`${err}`);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((result) => {
        if (result.token) {
          setLoggedIn(true);
          localStorage.setItem("token", result.token);
          setData({ email: email });
          history.push("/main");
        }
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((result) => {
          if (result) {
            setLoggedIn(true);
            setData({ email: result.data.email });
            history.push("/main");
          }
        })
        .catch((err) => {
          history.push("/signin");
          console.log(`${err}`);
        });
    }
  }, [history]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleSignOut() {
    localStorage.removeItem("token");
    setData({ email: "" });
    setLoggedIn(false);
    history.push("/signin");
  }

  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header onSignOut={handleSignOut} userEmail={data.email} />
          <Switch>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              component={Main}
              handleEditAvatarClick={handleEditAvatarClick}
              handleEditProfileClick={handleEditProfileClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleCardClick={handleCardClick}
              handleLikeClick={handleCardLike}
              handleCardDelete={handleCardDelete}
              cards={cards}
            />

            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>

            <Route path="/signin">
              <Login
                onLogin={handleLogin}
                handleTokenCheck={handleTokenCheck}
              />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          {loggedIn && <Footer />}

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            isOpen={isBigPhotoPopupOpen}
            onOvarlayClose={closeByOverlay}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOvarlayClose={closeByOverlay}
            onSubmit={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOvarlayClose={closeByOverlay}
            onSubmit={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOvarlayClose={closeByOverlay}
            onSubmit={handleUpdateAvatar}
          />

          <PopupWithForm
            name="deleteСard"
            title="Вы уверены?"
            children={
              <>
                <button
                  type="submit"
                  className="popup__save popup__save_type_deleteСard"
                >
                  Да
                </button>
              </>
            }
          />

          <InfoTooltip
            title={isInfoTooltipInformation.title}
            icon={isInfoTooltipInformation.icon}
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            onOvarlayClose={closeByOverlay}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}
export default App;
