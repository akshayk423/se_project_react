import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import { defaultClothingItems } from "../../utils/defaultClothing.js";

function Main({ weatherData, handleCardClick }) {
  return (
    <>
      <main>
        <WeatherCard temp={weatherData.temp} />
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp}&deg; F / You may want to wear:
          </p>
          {/* Add TODO cards*/}
          <ul className="cards__list">
            {defaultClothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    name={item.name}
                    link={item.link}
                    weather={item.weather}
                    onCardClick={handleCardClick}
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
