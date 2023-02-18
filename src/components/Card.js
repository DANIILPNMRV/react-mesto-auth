import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const { link, name, likes, owner } = card;

  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((like) => like._id === currentUser._id);

  const cardLikeButtonClassName = `place__likebtn ${
    isLiked && "place__likebtn_active"
  }`;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  } //под пропс onCardDelete

  return (
    <li className="place">
      {isOwn && (
        <button
          className="place__deletebtn"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        src={link}
        alt={name}
        className="place__image"
        onClick={handleCardClick}
      />
      <div className="place__bar">
        <h3 className="place__title">{name}</h3>
        <div className="place__likecounter">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="place__likenbr">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
