import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import clothingItemCards from "../../contexts/ClothingCardsContext.js";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const ClothesSection = () => {
  const clothingItemsContext = useContext(clothingItemCards);
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button
          className="clothes-section__add-new-btn"
          onClick={clothingItemsContext.handleAddGarment}
        >
          + Add New
        </button>
      </div>

      <section className="clothes-section__cards">
        <ul className="cards__list">
          {clothingItemsContext.clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  weather={item.weather}
                  cardId={item._id}
                  onCardClick={clothingItemsContext.handleCardClick}
                  owner={item.owner}
                  likes={item.likes}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default ClothesSection;
