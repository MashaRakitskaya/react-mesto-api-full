import React from 'react';
import { CurrentUserContext }  from "../contexts/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const isOwn = props.card.owner._id === currentUser._id;
    
    function handleClick() {
        props.onCardClick(props.card);
    };

    function handleLikeClick() {
        props.onCardLike(props.card);
    };
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    };
    
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked ? 'element__like_pressed' : ''}`
    );

    const cardDeleteButtonClassName = ( 
        `element__basket ${isOwn ? '' : 'element__basket_hidden'}`
    );
    
    return(
        <article className="element">
        <img onClick={handleClick} className="element__image" src={props.card.link} alt={props.card.name}  />
        <div className="element__position">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__like-number">
                <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
                <p className="element__number">{props.card.likes.length}</p>
            </div>
        </div>
        <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button"></button>
    </article>
    )
}
export default Card;