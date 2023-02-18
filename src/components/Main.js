import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddCard,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__userdata">
          <button
            className="profile__avatar"
            onClick={onEditAvatar}
            style={{ backgroundImage: `url(${avatar})` }}
          ></button>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{name}</h1>
              <button
                className="profile__editbtn"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{about}</p>
          </div>
        </div>
        <button
          className="profile__addbtn"
          type="button"
          onClick={onAddCard}
        ></button>
      </section>

      <section className="places">
        <ul className="places__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
