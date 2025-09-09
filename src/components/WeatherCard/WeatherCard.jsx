import "./WeatherCard.css";
import Sunny from "../../assets/Sunny.png";

function WeatherCard({ temp }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{temp}&deg;F</p>
      <img src={Sunny} alt="sunny card" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
