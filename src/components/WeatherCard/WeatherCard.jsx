import "./WeatherCard.css";
import { weatherCardURLs } from "../../utils/weatherCardURLs";
import CurrentTemperaturUnitContext from "../../contexts/CurrentTemperaturUnitContext";
import { useContext } from "react";

function WeatherCard({ temp, isDay, condition }) {
  const currentTempContext = useContext(CurrentTemperaturUnitContext);

  const cards = weatherCardURLs.find((item) => item.category === condition);

  const time = isDay ? "day" : "night";
  // fallback if no match
  const src = cards ? cards[time] : "/cards/Day/sunny.png";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTempContext.currentTemperatureUnit === "F"
          ? `${temp.f} °F`
          : `${temp.c} °C`}
      </p>
      <img
        src={src}
        alt={`${isDay ? "" : "night-"}${condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
