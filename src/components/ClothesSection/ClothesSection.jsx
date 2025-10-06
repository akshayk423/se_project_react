import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import clothingItemCards from "../../contexts/ClothingCardsContext.js";
import { useContext } from "react";
import WeatherDataContext from "../../contexts/WeatherDataContext.js";

const ClothesSection = () => {
  const clothingItemsContext = useContext(clothingItemCards);
  const weatherDataContext = useContext(WeatherDataContext);

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
            .filter(
              (item) => item.weather === weatherDataContext.weatherData.type
            )
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  name={item.name}
                  link={item.link}
                  weather={item.weather}
                  onCardClick={clothingItemsContext.handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default ClothesSection;
