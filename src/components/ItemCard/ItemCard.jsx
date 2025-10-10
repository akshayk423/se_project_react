import "./ItemCard.css";

function ItemCard({ weather, name, imageUrl, onCardClick, cardId }) {
  const handleCardClick = () => {
    onCardClick({ name, imageUrl, weather, cardId });
  };
  return (
    <div className="card" onClick={handleCardClick}>
      <h2 className="card__name">{name}</h2>
      <img className="card__image" src={imageUrl} alt={name} />
    </div>
  );
}

export default ItemCard;
