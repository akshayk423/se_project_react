import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";
import CurrentTemperaturUnitContext from "../../contexts/CurrentTemperaturUnitContext.js";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, defaultClothingItems }) {
  const currentTempContext = useContext(CurrentTemperaturUnitContext);

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
