import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((id) => id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card, isLiked);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_pressed" : "element__like"
  }`;

  const cardDeleteButtonClassName = `element__basket ${
    isOwn ? "" : "element__basket_hidden"
  }`;

  return (
    <article className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt={card.name}
      />
      <div className="element__position">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-number">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <p className="element__number">{card.likes.length}</p>
        </div>
      </div>
      <button
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
        type="button"
      ></button>
    </article>
  );
}
export default Card;
