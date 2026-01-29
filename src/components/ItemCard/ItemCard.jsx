import "./ItemCard.css";
import { useRef, useContext } from "react";
import clothingItemCards from "../../contexts/ClothingCardsContext.js";
import AuthContext from "../../contexts/CurrentUserContext.js";

function ItemCard({
  weather,
  name,
  imageUrl,
  onCardClick,
  cardId,
  owner,
  likes,
}) {
  const likeButtonRef = useRef(null);

  const { handleCardLike } = useContext(clothingItemCards);
  const { currentUser, isLoggedIn } = useContext(AuthContext);

  const handleCardClick = () => {
    onCardClick({ name, imageUrl, weather, cardId, owner });
  };

  const isLiked = likes.some((id) => id === currentUser._id);

  const onCardLike = (e) => {
    e.stopPropagation();
    handleCardLike({ id: cardId, isLiked });
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="card__header">
        <h2 className="card__name">{name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
            onClick={onCardLike}
            ref={likeButtonRef}
          ></button>
        )}
      </div>

      <img className="card__image" src={imageUrl} alt={name} />
    </div>
  );
}

export default ItemCard;
