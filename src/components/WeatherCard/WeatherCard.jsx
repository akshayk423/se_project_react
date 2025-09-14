import "./WeatherCard.css";
import { weatherCardURLs } from "../../utils/weatherCardURLs";

function WeatherCard({ temp, isDay, condition }) {
  const cards = weatherCardURLs.find((item) => item.category === condition);

  const time = isDay ? "day" : "night";
  // fallback if no match
  const src = cards ? cards[time] : "/cards/Day/sunny.png";

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temp}&deg;F</p>
      <img
        src={src}
        alt={`${isDay ? "" : "night-"}${condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
