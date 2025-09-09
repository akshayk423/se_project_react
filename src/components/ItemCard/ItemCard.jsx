import "./ItemCard.css";

function ItemCard({ weather, name, link, onCardClick }) {
  const handleCardClick = () => {
    onCardClick({ name, link, weather });
  };
  return (
    <div className="card" onClick={handleCardClick}>
      <h2 className="card__name">{name}</h2>
      <img className="card__image" src={link} alt={name} />
    </div>
  );
}

export default ItemCard;
