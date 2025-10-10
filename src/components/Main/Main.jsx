import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import CurrentTemperaturUnitContext from "../../contexts/CurrentTemperaturUnitContext.js";
import { useContext } from "react";
import clothingItemCards from "../../contexts/ClothingCardsContext.js";

function Main({ weatherData }) {
  const currentTempContext = useContext(CurrentTemperaturUnitContext);
  const clothingItemsContext = useContext(clothingItemCards);

  return (
    <>
      <main>
        <WeatherCard
          temp={weatherData.temp}
          isDay={weatherData.isDay}
          condition={weatherData.condition}
        />
        <section className="cards">
          <p className="cards__text">
            Today is{" "}
            {currentTempContext.currentTemperatureUnit === "F"
              ? `${weatherData.temp.f} °F`
              : `${weatherData.temp.c} °C`}{" "}
            / You may want to wear:
          </p>
          <ul className="cards__list">
            {clothingItemsContext.clothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    weather={item.weather}
                    onCardClick={clothingItemsContext.handleCardClick}
                    cardId={item._id}
                  />
                );
              })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
